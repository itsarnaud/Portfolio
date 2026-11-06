// Visuels du site, générés en code à partir des maquettes (docs/v3/maquettes) :
//
//   npm run visuals            tout
//   npm run visuals -- logo    seulement le logo et les icônes (aussi : og, cv)
//
// Sorties :
//   public/images/logo.svg               le logo (piste A : carte violette « ar » et étoile)
//   src/app/icon.svg, favicon.ico         favicons (16, 32 et 48px dans le .ico)
//   src/app/apple-icon.png                icône Apple, 180px
//   public/icons/icon-*.png               icônes du manifest (192, 512, et 512 « maskable »)
//   public/images/og-image.png            image de partage (maquette Og.dc.html), 1200×630
//   public/images/og/<slug>.png           image de partage de chaque projet, dans sa couleur
//   public/files/cv.pdf                   le CV en A4 (maquette CV.dc.html, photo dans scripts/assets/)
//
// Les polices (Bricolage Grotesque 800, en TTF) sont téléchargées une fois dans .captures/fonts/.
// Le texte du logo et des icônes est vectorisé : un SVG ne peut pas charger une police web.

import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { readTtf, textPath } from './lib/ttf.mjs';
import { qrSvg } from './lib/qr.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const MOCKUPS = path.join(ROOT, 'docs/v3/maquettes');
const FONT_DIR = path.join(ROOT, '.captures/fonts');
const out = (...parts) => path.join(ROOT, ...parts);

const C = {
  encre: '#121212',
  papier: '#F7F7F2',
  blanc: '#FFFFFF',
  violet: '#6B3CF0',
  cobalt: '#2E5BFF',
  citron: '#C8F54A',
  tomate: '#FF5B37',
  soleil: '#FFCB3D',
  rose: '#FF9BD0',
};
const STAR = 'M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z';
const GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Karla:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap';

/* ------------------------------------------------------------------ */
/* Polices                                                             */
/* ------------------------------------------------------------------ */

/** Bricolage Grotesque 800 en TTF statique, à une taille optique donnée (opsz). */
async function bricolage(opsz) {
  const file = path.join(FONT_DIR, `bricolage-800-opsz${opsz}.ttf`);
  if (!existsSync(file)) {
    // Avec un vieux navigateur comme agent, Google Fonts renvoie un TTF statique au lieu d'un woff2 variable.
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@${opsz},800`, {
        headers: { 'User-Agent': 'Mozilla/4.0' },
      })
    ).text();
    const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!url) throw new Error('TTF introuvable dans la réponse de Google Fonts.');
    await mkdir(FONT_DIR, { recursive: true });
    await writeFile(file, Buffer.from(await (await fetch(url)).arrayBuffer()));
  }
  return readTtf(await readFile(file));
}

/* ------------------------------------------------------------------ */
/* Logo et icônes                                                      */
/* ------------------------------------------------------------------ */

const fmt = (value) => Math.round(value * 100) / 100;

/**
 * Le logo de la maquette Logo.dc.html (piste A, la grande version) : carte de 132×164,
 * bordure de 3, coins de 24, ombre de 7, inclinée à -6°, « ar » en 76px (interlettrage -0.07em,
 * 6px de marge à droite), étoile citron de 52px qui dépasse de 20px en haut à droite.
 */
function logoSvg(font) {
  const W = 132;
  const H = 164;
  const border = 3;
  const size = 76;
  const text = textPath(font, 'ar', { size, letterSpacing: -0.07 });
  // Centré comme en CSS : ligne de texte centrée dans la carte, à gauche de la marge de 6px.
  const centerX = (border + (W - border - 6)) / 2;
  const baseline = H / 2 + ((font.ascender + font.descender) / 2 / font.unitsPerEm) * size;
  const glyphs = textPath(font, 'ar', { x: centerX - text.width / 2, y: baseline, size, letterSpacing: -0.07 });

  const view = { x: -14, y: -22, w: 176, h: 204 };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view.x} ${view.y} ${view.w} ${view.h}" width="${view.w}" height="${view.h}" role="img" aria-label="Arnaud Royer">
  <g transform="rotate(-6 ${W / 2} ${H / 2})">
    <rect x="7" y="7" width="${W}" height="${H}" rx="24" fill="${C.encre}"/>
    <rect x="${border / 2}" y="${border / 2}" width="${W - border}" height="${H - border}" rx="${24 - border / 2}" fill="${C.violet}" stroke="${C.encre}" stroke-width="${border}"/>
    <path d="${glyphs.d}" fill="${C.blanc}"/>
  </g>
  <path d="${STAR}" transform="translate(100 -20) scale(${fmt(52 / 24)})" fill="${C.citron}" stroke="${C.encre}" stroke-width="1.3" stroke-linejoin="round"/>
</svg>
`;
}

/**
 * Le favicon de la maquette : un carré violet arrondi avec « ar », sans étoile.
 * Les petites tailles ont leurs propres réglages (bordure plus épaisse en proportion), comme sur la maquette.
 * `fullBleed` : fond violet jusqu'aux bords, sans bordure (iOS et Android arrondissent eux-mêmes).
 */
function iconSvg(font, { size, border, radius, fontSize, letterSpacing = -0.07, fullBleed = false }) {
  const text = textPath(font, 'ar', { size: fontSize, letterSpacing });
  // Centrage optique : le milieu de la hauteur des minuscules au centre du carré.
  const baseline = size / 2 + (font.xHeight / font.unitsPerEm) * fontSize * 0.5;
  // L'espacement final ajouté par le calcul « à la CSS » décalerait le texte : on le retire pour centrer.
  const inkWidth = text.width - letterSpacing * fontSize;
  const glyphs = textPath(font, 'ar', { x: size / 2 - inkWidth / 2, y: baseline, size: fontSize, letterSpacing });
  const background = fullBleed
    ? `<rect width="${size}" height="${size}" fill="${C.violet}"/>`
    : `<rect x="${border / 2}" y="${border / 2}" width="${size - border}" height="${size - border}" rx="${radius - border / 2}" fill="${C.violet}" stroke="${C.encre}" stroke-width="${border}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${background}<path d="${glyphs.d}" fill="${C.blanc}"/></svg>`;
}

/** Fichier .ico contenant des PNG (accepté par tous les navigateurs actuels). */
function ico(pngs) {
  const header = Buffer.alloc(6 + pngs.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...pngs.map(({ data }) => data)]);
}

const png = (svg, size) => sharp(Buffer.from(svg), { density: 72 * 4 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

async function buildLogoAndIcons() {
  const large = await bricolage(76);
  const small = await bricolage(24);

  await writeFile(out('public/images/logo.svg'), logoSvg(large));

  // Réglages de la maquette pour 16 et 32px ; au-delà, ceux de la version 64px mis à l'échelle.
  const icon16 = iconSvg(small, { size: 16, border: 1.5, radius: 4, fontSize: 9, letterSpacing: -0.05 });
  const icon32 = iconSvg(small, { size: 32, border: 2, radius: 8, fontSize: 18 });
  const icon64 = iconSvg(small, { size: 64, border: 3, radius: 16, fontSize: 36 });
  const fullBleed = (fontSize) => iconSvg(small, { size: 64, border: 0, radius: 0, fontSize, fullBleed: true });

  await writeFile(out('src/app/icon.svg'), icon32);
  await writeFile(
    out('src/app/favicon.ico'),
    ico([
      { size: 16, data: await png(icon16, 16) },
      { size: 32, data: await png(icon32, 32) },
      { size: 48, data: await png(icon64, 48) },
    ]),
  );
  await writeFile(out('src/app/apple-icon.png'), await png(fullBleed(34), 180));
  await mkdir(out('public/icons'), { recursive: true });
  await writeFile(out('public/icons/icon-192.png'), await png(icon64, 192));
  await writeFile(out('public/icons/icon-512.png'), await png(icon64, 512));
  // « maskable » : Android peut rogner jusqu'à un cercle de 80%, le texte reste dans la zone sûre.
  await writeFile(out('public/icons/icon-maskable-512.png'), await png(fullBleed(28), 512));
  console.log('✓ logo et icônes');
}

/* ------------------------------------------------------------------ */
/* Maquettes rendues dans le navigateur                                */
/* ------------------------------------------------------------------ */

/** Retire ce qui ne sert qu'au canvas des maquettes (script support.js, logique dc). */
function stripCanvas(html) {
  return html
    .replace(/<script src="\.\/support\.js"><\/script>/, '')
    .replace(/<script type="text\/x-dc"[\s\S]*?<\/script>/, '');
}

/** Les valeurs calculées par la maquette (sa méthode renderVals), pour remplir ses boucles. */
function mockupValues(html) {
  const code = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  if (!code) return {};
  const Component = new Function('DCLogic', `${code}\nreturn Component;`)(class {});
  return new Component().renderVals();
}

const escapeHtml = (value) =>
  String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]);

/** Remplit les <sc-for list="{{…}}" as="…"> (imbriqués compris) et les {{…}} de la maquette. */
function fillTemplate(html, scope) {
  const lookup = (expression) => expression.split('.').reduce((value, key) => value?.[key], scope);
  let result = '';
  let rest = html;
  for (;;) {
    const open = rest.match(/<sc-for list="\{\{([^}]+)\}\}" as="(\w+)"[^>]*>/);
    if (!open) break;
    // Trouve la balise fermante qui correspond (en tenant compte des boucles imbriquées).
    let depth = 1;
    let cursor = open.index + open[0].length;
    const tags = /<sc-for\b|<\/sc-for>/g;
    tags.lastIndex = cursor;
    let match;
    while (depth > 0 && (match = tags.exec(rest))) {
      depth += match[0] === '</sc-for>' ? -1 : 1;
      cursor = match.index;
    }
    const inner = rest.slice(open.index + open[0].length, cursor);
    result += rest.slice(0, open.index);
    result += (lookup(open[1]) ?? []).map((item) => fillTemplate(inner, { ...scope, [open[2]]: item })).join('');
    rest = rest.slice(cursor + '</sc-for>'.length);
  }
  return (result + rest).replace(/\{\{([^}]+)\}\}/g, (_, expression) => escapeHtml(lookup(expression.trim()) ?? ''));
}

async function dataUri(file, type) {
  return `data:${type};base64,${(await readFile(file)).toString('base64')}`;
}

async function renderPage(browser, html, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  // Passe par un fichier (dans .captures/) plutôt que setContent, pour attendre le réseau (polices web).
  const file = path.join(ROOT, '.captures', `render-${Date.now()}.html`);
  await writeFile(file, html);
  await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

async function buildOgImage(browser) {
  const html = stripCanvas(await readFile(path.join(MOCKUPS, 'Og.dc.html'), 'utf8'));
  const page = await renderPage(browser, html, { width: 1200, height: 630 });
  await page.locator('x-dc > div').first().screenshot({ path: out('public/images/og-image.png') });
  await page.close();
  console.log('✓ image de partage');
}

/** L'image de partage d'un projet : même univers que Og.dc.html, dans la couleur du projet. */
function projectOgHtml(project, posterUri) {
  const color = C[project.color];
  const onColor = ['violet', 'cobalt'].includes(project.color) ? C.blanc : C.encre;
  const circle = project.color === 'citron' ? C.soleil : C.citron;
  const square = project.color === 'rose' ? C.soleil : C.rose;
  const starColors = [C.citron, C.tomate, C.soleil, C.rose];
  const tape = project.technologies
    .map((tech, i) => `<span>${escapeHtml(tech)}</span><span style="color:${starColors[i % starColors.length]}">✦</span>`)
    .join('');
  const chips = project.stack
    .map(
      (tech, i) =>
        `<span style="padding:8px 18px;border:2px solid ${C.encre};border-radius:999px;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:20px;background:${i === 0 ? color : C.blanc};color:${i === 0 ? onColor : C.encre};${i === 0 ? `box-shadow:4px 4px 0 ${C.encre}` : ''}">${escapeHtml(tech)}</span>`,
    )
    .join('');

  return `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<link rel="stylesheet" href="${GOOGLE_FONTS}">
<style>body{margin:0}*{box-sizing:border-box}</style></head><body>
<div id="og" style="position:relative;width:1200px;height:630px;overflow:hidden;background:${C.papier};color:${C.encre};font-family:'Karla',sans-serif">
  <div style="position:absolute;right:-90px;top:-110px;width:360px;height:360px;border-radius:50%;background:${circle};border:3px solid ${C.encre}"></div>
  <div style="position:absolute;left:560px;bottom:-70px;width:170px;height:170px;border-radius:36px;background:${square};border:3px solid ${C.encre};transform:rotate(16deg)"></div>

  <div style="position:absolute;left:72px;top:64px;width:560px;display:flex;flex-direction:column;gap:26px">
    <div style="display:flex;align-items:center;gap:16px">
      <div style="position:relative;width:46px;height:56px">
        <div style="position:absolute;inset:0;background:${C.violet};border:2.5px solid ${C.encre};border-radius:11px;box-shadow:3px 3px 0 ${C.encre};transform:rotate(-6deg);display:flex;align-items:center;justify-content:center;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:26px;letter-spacing:-0.07em;color:#fff">ar</div>
        <svg viewBox="0 0 24 24" style="position:absolute;right:-10px;top:-10px;width:22px;height:22px"><path d="${STAR}" fill="${C.citron}" stroke="${C.encre}" stroke-width="1.6" stroke-linejoin="round"/></svg>
      </div>
      <span style="font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:32px;letter-spacing:-0.03em">arnaud royer</span>
    </div>
    <span style="align-self:flex-start;padding:7px 16px;background:${C.blanc};border:2px solid ${C.encre};border-radius:999px;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:20px">N°${project.number} · ${project.year}</span>
    <h1 id="title" style="margin:0;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:120px;letter-spacing:-0.045em;line-height:0.92">${escapeHtml(project.title)}</h1>
    <div style="display:flex;flex-wrap:wrap;gap:12px">${chips}</div>
  </div>

  <div style="position:absolute;left:700px;top:96px;width:400px;padding:18px;background:${color};color:${onColor};border:3px solid ${C.encre};border-radius:26px;box-shadow:9px 9px 0 ${C.encre};transform:rotate(5deg);display:flex;flex-direction:column;gap:14px">
    <div style="display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:600"><span>N°${project.number}</span><span>${project.year}</span></div>
    <div style="aspect-ratio:16/9;border:2.5px solid ${C.encre};border-radius:14px;background:#fff url('${posterUri}') center/cover"></div>
    <span style="font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:40px;letter-spacing:-0.03em;line-height:1">${escapeHtml(project.title)}</span>
  </div>

  <div style="position:absolute;left:-20px;right:-20px;bottom:34px;height:54px;transform:rotate(-2deg);background:${C.encre};color:${C.papier};display:flex;align-items:center;gap:26px;padding-left:60px;white-space:nowrap;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:26px">${tape.repeat(4)}</div>
</div></body></html>`;
}

async function buildProjectOgImages(browser) {
  const { getProjects } = await import(pathToFileURL(out('src/content/projects.ts')).href);
  await mkdir(out('public/images/og'), { recursive: true });
  for (const project of getProjects()) {
    const posterUri = await dataUri(out('public', project.media.poster), 'image/webp');
    const page = await renderPage(browser, projectOgHtml(project, posterUri), { width: 1200, height: 630 });
    // Titre long : on réduit la taille jusqu'à tenir en deux lignes dans la colonne.
    await page.evaluate(() => {
      const title = document.getElementById('title');
      let size = 120;
      while (size > 56 && (title.scrollWidth > title.clientWidth || title.offsetHeight > size * 0.92 * 2 + 2)) {
        size -= 4;
        title.style.fontSize = `${size}px`;
      }
    });
    const image = await page.locator('#og').screenshot();
    await sharp(image).png({ compressionLevel: 9 }).toFile(out('public/images/og', `${project.slug}.png`));
    await page.close();
  }
  console.log('✓ images de partage des projets');
}

async function buildCv(browser) {
  const source = await readFile(path.join(MOCKUPS, 'CV.dc.html'), 'utf8');
  const [photoBlob, qrBlob] = [...new Set(source.match(/\/_blob\/[a-f0-9]+/g))];
  let html = fillTemplate(stripCanvas(source), mockupValues(source));
  html = html
    .replace(photoBlob, await dataUri(out('scripts/assets/cv-photo.webp'), 'image/webp'))
    .replace(qrBlob, `data:image/svg+xml;base64,${Buffer.from(qrSvg('https://arnaudroyer.fr')).toString('base64')}`)
    .replace('</helmet>', '<style>@page{size:A4;margin:0}</style></helmet>');

  const page = await renderPage(browser, html, { width: 794, height: 1123 });
  await page.pdf({ path: out('public/files/cv.pdf'), format: 'A4', printBackground: true, pageRanges: '1' });
  await page.close();
  console.log('✓ CV');
}

/* ------------------------------------------------------------------ */

const only = process.argv.slice(2);
const wants = (name) => only.length === 0 || only.includes(name);

if (wants('logo')) await buildLogoAndIcons();
if (wants('og') || wants('cv')) {
  const browser = await chromium.launch();
  try {
    if (wants('og')) {
      await buildOgImage(browser);
      await buildProjectOgImages(browser);
    }
    if (wants('cv')) await buildCv(browser);
  } finally {
    await browser.close();
    for (const file of await readdir(path.join(ROOT, '.captures'))) {
      if (file.startsWith('render-')) await rm(path.join(ROOT, '.captures', file));
    }
  }
}
