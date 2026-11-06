// Encodeur de QR code minimal : mode octet, correction d'erreur M, versions 1 à 3
// (jusqu'à 42 caractères, assez pour une adresse). Suit la norme ISO 18004 et
// l'implémentation de référence de Nayuki. Renvoie une grille de booléens (true = module noir).

const VERSIONS = {
  // version: [nombre total d'octets, octets de correction, positions des motifs d'alignement]
  1: [26, 10, []],
  2: [44, 16, [6, 18]],
  3: [70, 26, [6, 22]],
};
const FORMAT_BITS_M = 0;

function gfMultiply(x, y) {
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d);
    z ^= ((y >>> i) & 1) * x;
  }
  return z;
}

function reedSolomon(data, degree) {
  const divisor = new Array(degree).fill(0);
  divisor[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      divisor[j] = gfMultiply(divisor[j], root);
      if (j + 1 < degree) divisor[j] ^= divisor[j + 1];
    }
    root = gfMultiply(root, 0x02);
  }
  const result = new Array(degree).fill(0);
  for (const byte of data) {
    const factor = byte ^ result.shift();
    result.push(0);
    divisor.forEach((coef, i) => (result[i] ^= gfMultiply(coef, factor)));
  }
  return result;
}

const MASKS = [
  (x, y) => (x + y) % 2 === 0,
  (x, y) => y % 2 === 0,
  (x) => x % 3 === 0,
  (x, y) => (x + y) % 3 === 0,
  (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
  (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
  (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
  (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
];

/** Pénalité d'un masque (règles 1 à 4 de la norme) : on garde le masque qui en a le moins. */
function penalty(grid) {
  const size = grid.length;
  let score = 0;
  const lines = [...grid, ...grid.map((_, x) => grid.map((row) => row[x]))];
  for (const line of lines) {
    let run = 1;
    for (let i = 1; i <= size; i++) {
      if (i < size && line[i] === line[i - 1]) run++;
      else {
        if (run >= 5) score += run - 2;
        run = 1;
      }
    }
    const text = line.map((dark) => (dark ? '1' : '0')).join('');
    for (const pattern of ['10111010000', '00001011101']) {
      for (let i = text.indexOf(pattern); i !== -1; i = text.indexOf(pattern, i + 1)) score += 40;
    }
  }
  for (let y = 0; y < size - 1; y++) {
    for (let x = 0; x < size - 1; x++) {
      const color = grid[y][x];
      if (grid[y][x + 1] === color && grid[y + 1][x] === color && grid[y + 1][x + 1] === color) score += 3;
    }
  }
  const dark = grid.flat().filter(Boolean).length;
  score += Math.floor(Math.abs((dark * 20) / (size * size) - 10)) * 10;
  return score;
}

export function encodeQr(text) {
  const bytes = [...new TextEncoder().encode(text)];
  const version = Object.keys(VERSIONS)
    .map(Number)
    .find((v) => 4 + 8 + bytes.length * 8 <= (VERSIONS[v][0] - VERSIONS[v][1]) * 8);
  if (!version) throw new Error('Texte trop long pour ce petit encodeur QR.');
  const [totalCodewords, ecCodewords, alignments] = VERSIONS[version];
  const dataCodewords = totalCodewords - ecCodewords;

  // Données : mode octet (0100), longueur sur 8 bits, octets, fin, remplissage.
  const bits = [];
  const push = (value, length) => {
    for (let i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1);
  };
  push(0b0100, 4);
  push(bytes.length, 8);
  bytes.forEach((byte) => push(byte, 8));
  push(0, Math.min(4, dataCodewords * 8 - bits.length));
  push(0, (8 - (bits.length % 8)) % 8);
  for (let pad = 0xec; bits.length < dataCodewords * 8; pad ^= 0xec ^ 0x11) push(pad, 8);
  const data = Array.from({ length: dataCodewords }, (_, i) => parseInt(bits.slice(i * 8, i * 8 + 8).join(''), 2));
  const codewords = [...data, ...reedSolomon(data, ecCodewords)];

  // Motifs fixes.
  const size = version * 4 + 17;
  const modules = Array.from({ length: size }, () => new Array(size).fill(false));
  const isFunction = Array.from({ length: size }, () => new Array(size).fill(false));
  const set = (x, y, dark) => {
    modules[y][x] = dark;
    isFunction[y][x] = true;
  };
  for (let i = 0; i < size; i++) {
    set(6, i, i % 2 === 0);
    set(i, 6, i % 2 === 0);
  }
  for (const [cx, cy] of [[3, 3], [size - 4, 3], [3, size - 4]]) {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const x = cx + dx;
        const y = cy + dy;
        const distance = Math.max(Math.abs(dx), Math.abs(dy));
        if (x >= 0 && x < size && y >= 0 && y < size) set(x, y, distance !== 2 && distance !== 4);
      }
    }
  }
  for (const ax of alignments) {
    for (const ay of alignments) {
      const nearFinder = (ax === 6 && ay === 6) || (ax === 6 && ay === size - 7) || (ax === size - 7 && ay === 6);
      if (nearFinder) continue;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
      }
    }
  }

  const drawFormat = (mask) => {
    const value = (FORMAT_BITS_M << 3) | mask;
    let rem = value;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    const format = ((value << 10) | rem) ^ 0x5412;
    const bit = (i) => ((format >>> i) & 1) === 1;
    for (let i = 0; i <= 5; i++) set(8, i, bit(i));
    set(8, 7, bit(6));
    set(8, 8, bit(7));
    set(7, 8, bit(8));
    for (let i = 9; i < 15; i++) set(14 - i, 8, bit(i));
    for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(i));
    for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(i));
    set(8, size - 8, true);
  };
  drawFormat(0); // réserve les zones de format

  // Données en zigzag, de bas à droite vers le haut, deux colonnes à la fois.
  let index = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const x = right - j;
        const upward = ((right + 1) & 2) === 0;
        const y = upward ? size - 1 - vert : vert;
        if (!isFunction[y][x] && index < codewords.length * 8) {
          modules[y][x] = ((codewords[index >>> 3] >>> (7 - (index & 7))) & 1) === 1;
          index++;
        }
      }
    }
  }

  let best;
  for (let mask = 0; mask < MASKS.length; mask++) {
    drawFormat(mask);
    const grid = modules.map((row, y) => row.map((dark, x) => (isFunction[y][x] ? dark : dark !== MASKS[mask](x, y))));
    const score = penalty(grid);
    if (!best || score < best.score) best = { score, grid };
  }
  return best.grid;
}

/** Le QR code en SVG : un seul tracé, une marge de 4 modules (zone de silence). */
export function qrSvg(text, { color = '#121212', background = '#FFFFFF' } = {}) {
  const grid = encodeQr(text);
  const margin = 4;
  const size = grid.length + margin * 2;
  const d = grid
    .flatMap((row, y) => row.map((dark, x) => (dark ? `M${x + margin} ${y + margin}h1v1h-1z` : '')))
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="${background}"/><path d="${d}" fill="${color}"/></svg>`;
}
