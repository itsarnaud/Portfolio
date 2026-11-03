// Captures des sites des projets, en desktop et en mobile, converties en WebP.
//
//   npm run captures                 tous les projets
//   npm run captures -- quested      un ou plusieurs slugs
//
// Les PNG bruts vont dans .captures/ (ignoré par git).
// Les WebP vont dans public/images/projects/<slug>/<page>-<appareil>.webp
//
// Les autres images du dossier ne viennent pas de ce script, il ne les touche pas :
//   gallery-N.webp   captures de la v2 converties (galerie de la page projet)
//   tengo/app-N.webp écrans de l'appli Tengo!, plus cover.webp et icon.webp

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium, devices } from 'playwright';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const RAW_DIR = path.join(ROOT, '.captures');
const OUT_DIR = path.join(ROOT, 'public/images/projects');

// Temps laissé aux animations d'arrivée avant la capture.
const SETTLE_MS = 3000;
const WEBP_QUALITY = 82;

const VIEWPORTS = {
  desktop: {
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  },
  mobile: {
    ...devices['iPhone 13'],
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  },
};

// "page" donne le nom du fichier : home-desktop.webp, game-mobile.webp…
const SITES = [
  {
    slug: 'quested',
    pages: [
      { page: 'home', url: 'https://quested.cc' },
      { page: 'game', url: 'https://quested.cc/games/clair-obscur-expedition-33-2025' },
      { page: 'profile', url: 'https://quested.cc/u/cestarnaud' },
    ],
  },
  { slug: 'tengo', pages: [{ page: 'home', url: 'https://playtengo.app' }] },
  { slug: 'kollirama', pages: [{ page: 'home', url: 'https://kollirama.fr' }] },
  { slug: 'atelier-maha', pages: [{ page: 'home', url: 'https://ateliermaha.fr' }] },
  { slug: 'idk-concept', pages: [{ page: 'home', url: 'https://www.idk-concept.fr' }] },
  { slug: 'igowall', pages: [{ page: 'home', url: 'https://www.igowall.com' }] },
  // Igotrack n'est pas capturé : sans compte, le site n'affiche que la page de connexion.
];

// Boutons qui ferment ce qui cache la page : bannières de cookies, invitation
// à installer l'appli (« Compris » sur Quested)…
const DISMISS_BUTTONS = [
  '#tarteaucitronPersonalize2',
  '#axeptio_btn_acceptAll',
  '#didomi-notice-agree-button',
  '#onetrust-accept-btn-handler',
  '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
  'button:text-matches("^\\\\s*(tout accepter|accepter tout|accepter|j\'accepte|accept all|accept|ok|got it|compris)\\\\s*$", "i")',
];

async function dismissOverlays(page) {
  const clicked = [];
  for (const selector of DISMISS_BUTTONS) {
    const buttons = page.locator(selector);
    for (const button of await buttons.all()) {
      if (!(await button.isVisible().catch(() => false))) continue;
      const label = (await button.textContent().catch(() => ''))?.trim() || selector;
      await button.click({ timeout: 2000 }).catch(() => {});
      clicked.push(label);
      await page.waitForTimeout(500);
    }
  }
  return clicked;
}

async function capture(browser, slug, { page: name, url }, device) {
  const context = await browser.newContext({ ...VIEWPORTS[device], locale: 'fr-FR' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.evaluate(() => document.fonts.ready);
    // Laisse aux bannières le temps d'apparaître avant de les fermer.
    await page.waitForTimeout(1000);
    const dismissed = await dismissOverlays(page);
    await page.waitForTimeout(SETTLE_MS);

    const png = await page.screenshot({ type: 'png' });
    const file = `${name}-${device}`;

    await mkdir(path.join(RAW_DIR, slug), { recursive: true });
    await writeFile(path.join(RAW_DIR, slug, `${file}.png`), png);

    await mkdir(path.join(OUT_DIR, slug), { recursive: true });
    const { size } = await sharp(png)
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(path.join(OUT_DIR, slug, `${file}.webp`));

    const dismissedInfo = dismissed.length ? `, fermé : ${dismissed.join(', ')}` : '';
    console.log(`  ok  ${slug}/${file}.webp  ${Math.round(size / 1024)} Ko${dismissedInfo}`);
    return true;
  } catch (error) {
    console.error(`  ERREUR  ${slug}/${name}-${device} : ${error.message.split('\n')[0]}`);
    return false;
  } finally {
    await context.close();
  }
}

const wanted = process.argv.slice(2);
const sites = wanted.length ? SITES.filter((site) => wanted.includes(site.slug)) : SITES;

if (!sites.length) {
  console.error(`Slug inconnu. Slugs possibles : ${SITES.map((site) => site.slug).join(', ')}`);
  process.exit(1);
}

const browser = await chromium.launch();
let failures = 0;

for (const site of sites) {
  console.log(site.slug);
  for (const target of site.pages) {
    for (const device of Object.keys(VIEWPORTS)) {
      if (!(await capture(browser, site.slug, target, device))) failures += 1;
    }
  }
}

await browser.close();

if (failures) {
  console.error(`\n${failures} capture(s) en échec.`);
  process.exit(1);
}
