// Lecture minimale d'une police TrueType : les métriques et le contour de quelques glyphes,
// pour écrire du texte en tracés SVG (un fichier SVG ne peut pas charger une police web).
// Seuls les glyphes simples sont gérés (pas les glyphes composés), ce qui suffit pour « ar ».

/** Lit une police TTF et renvoie ses métriques et une fonction qui donne le tracé d'un caractère. */
export function readTtf(buffer) {
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const u16 = (offset) => view.getUint16(offset);
  const i16 = (offset) => view.getInt16(offset);
  const u32 = (offset) => view.getUint32(offset);

  const tables = {};
  for (let i = 0; i < u16(4); i++) {
    const entry = 12 + i * 16;
    const tag = String.fromCharCode(...buffer.subarray(entry, entry + 4));
    tables[tag] = u32(entry + 8);
  }
  for (const tag of ['head', 'hhea', 'hmtx', 'cmap', 'loca', 'glyf']) {
    if (tables[tag] === undefined) throw new Error(`Table ${tag} absente : police TrueType attendue.`);
  }

  const unitsPerEm = u16(tables.head + 18);
  const longLoca = i16(tables.head + 50) === 1;
  const ascender = i16(tables.hhea + 4);
  const descender = i16(tables.hhea + 6);
  const numberOfHMetrics = u16(tables.hhea + 34);
  // Hauteur des minuscules (table OS/2, version 2 et plus), sinon une valeur courante.
  const xHeight = tables['OS/2'] !== undefined && u16(tables['OS/2']) >= 2 ? i16(tables['OS/2'] + 86) : unitsPerEm / 2;

  // cmap : sous-table Windows Unicode (3, 1), format 4.
  let cmap4;
  for (let i = 0; i < u16(tables.cmap + 2); i++) {
    const record = tables.cmap + 4 + i * 8;
    const subtable = tables.cmap + u32(record + 4);
    if (u16(record) === 3 && u16(record + 2) === 1 && u16(subtable) === 4) cmap4 = subtable;
  }
  if (cmap4 === undefined) throw new Error('Sous-table cmap (3, 1, format 4) absente.');

  function glyphIndex(char) {
    const code = char.codePointAt(0);
    const segCount = u16(cmap4 + 6) / 2;
    const ends = cmap4 + 14;
    const starts = ends + segCount * 2 + 2;
    const deltas = starts + segCount * 2;
    const rangeOffsets = deltas + segCount * 2;
    for (let s = 0; s < segCount; s++) {
      if (u16(ends + s * 2) < code) continue;
      if (u16(starts + s * 2) > code) return 0;
      const rangeOffset = u16(rangeOffsets + s * 2);
      if (rangeOffset === 0) return (code + i16(deltas + s * 2)) & 0xffff;
      const glyph = u16(rangeOffsets + s * 2 + rangeOffset + (code - u16(starts + s * 2)) * 2);
      return glyph === 0 ? 0 : (glyph + i16(deltas + s * 2)) & 0xffff;
    }
    return 0;
  }

  function advanceWidth(glyph) {
    return u16(tables.hmtx + 4 * Math.min(glyph, numberOfHMetrics - 1));
  }

  /** Les contours du glyphe, chacun une liste de points { x, y, onCurve } en unités de la police. */
  function contours(glyph) {
    const start = longLoca ? u32(tables.loca + glyph * 4) : u16(tables.loca + glyph * 2) * 2;
    const end = longLoca ? u32(tables.loca + glyph * 4 + 4) : u16(tables.loca + glyph * 2 + 2) * 2;
    if (start === end) return [];
    const base = tables.glyf + start;
    const contourCount = i16(base);
    if (contourCount < 0) throw new Error(`Glyphe ${glyph} composé : non géré.`);

    const endPoints = Array.from({ length: contourCount }, (_, i) => u16(base + 10 + i * 2));
    const pointCount = endPoints.at(-1) + 1;
    let offset = base + 10 + contourCount * 2;
    offset += 2 + u16(offset); // instructions

    const flags = [];
    while (flags.length < pointCount) {
      const flag = buffer[offset++];
      flags.push(flag);
      if (flag & 8) for (let repeat = buffer[offset++]; repeat > 0; repeat--) flags.push(flag);
    }

    const readCoords = (shortBit, sameBit) => {
      const values = [];
      let value = 0;
      for (const flag of flags) {
        if (flag & shortBit) value += flag & sameBit ? buffer[offset++] : -buffer[offset++];
        else if (!(flag & sameBit)) {
          value += i16(offset);
          offset += 2;
        }
        values.push(value);
      }
      return values;
    };
    const xs = readCoords(2, 16);
    const ys = readCoords(4, 32);

    const result = [];
    let first = 0;
    for (const last of endPoints) {
      const points = [];
      for (let p = first; p <= last; p++) points.push({ x: xs[p], y: ys[p], onCurve: (flags[p] & 1) === 1 });
      result.push(points);
      first = last + 1;
    }
    return result;
  }

  return { unitsPerEm, ascender, descender, xHeight, glyphIndex, advanceWidth, contours };
}

const round = (value) => Math.round(value * 100) / 100;

/**
 * Le texte en tracé SVG (attribut d), avec la ligne de base en `y` et le texte commençant en `x`.
 * `letterSpacing` est en em, comme en CSS (ajouté après chaque lettre, la dernière comprise).
 * Renvoie aussi la largeur, calculée comme le navigateur (espacement final inclus).
 */
export function textPath(font, text, { x = 0, y = 0, size, letterSpacing = 0 }) {
  const scale = size / font.unitsPerEm;
  const commands = [];
  let penX = x;

  for (const char of text) {
    const glyph = font.glyphIndex(char);
    const px = (point) => round(penX + point.x * scale);
    const py = (point) => round(y - point.y * scale);

    for (const points of font.contours(glyph)) {
      // Point de départ : un point sur la courbe, sinon le milieu des deux premiers points.
      const startIndex = points.findIndex((point) => point.onCurve);
      const ordered = startIndex === -1 ? points : [...points.slice(startIndex), ...points.slice(0, startIndex)];
      const start =
        startIndex === -1
          ? { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2, onCurve: true }
          : ordered[0];
      commands.push(`M${px(start)} ${py(start)}`);

      const rest = startIndex === -1 ? [...points.slice(1), points[0]] : ordered.slice(1);
      let control = null;
      for (const point of [...rest, start]) {
        if (point.onCurve) {
          commands.push(control ? `Q${px(control)} ${py(control)} ${px(point)} ${py(point)}` : `L${px(point)} ${py(point)}`);
          control = null;
        } else if (control) {
          // Deux points hors courbe de suite : le point sur la courbe est implicite, au milieu.
          const middle = { x: (control.x + point.x) / 2, y: (control.y + point.y) / 2 };
          commands.push(`Q${px(control)} ${py(control)} ${px(middle)} ${py(middle)}`);
          control = point;
        } else {
          control = point;
        }
      }
      commands.push('Z');
    }
    penX += font.advanceWidth(glyph) * scale + letterSpacing * size;
  }

  return { d: commands.join(''), width: penX - x };
}
