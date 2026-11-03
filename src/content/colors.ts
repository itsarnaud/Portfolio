import type { ColorName } from './types';

/**
 * Couleur du texte posé sur chaque couleur de fond (tableau de la D.A.).
 * Tous les couples passent le contraste de 4.5:1.
 */
export const textOn: Record<ColorName, 'blanc' | 'encre'> = {
  violet: 'blanc',
  cobalt: 'blanc',
  citron: 'encre',
  tomate: 'encre',
  soleil: 'encre',
  rose: 'encre',
  blanc: 'encre',
};

/**
 * Classes Tailwind écrites en entier : Tailwind ne détecte pas les classes construites
 * à la volée (`bg-${color}`), il faut passer par ces tables.
 */
export const bgClass: Record<ColorName, string> = {
  violet: 'bg-violet text-blanc',
  cobalt: 'bg-cobalt text-blanc',
  citron: 'bg-citron text-encre',
  tomate: 'bg-tomate text-encre',
  soleil: 'bg-soleil text-encre',
  rose: 'bg-rose text-encre',
  blanc: 'bg-blanc text-encre',
};

/** Valeurs hexadécimales, pour les rares cas hors Tailwind (image de partage, SVG, styles inline). */
export const hex: Record<ColorName | 'encre' | 'papier', string> = {
  encre: '#121212',
  papier: '#f7f7f2',
  blanc: '#ffffff',
  violet: '#6b3cf0',
  cobalt: '#2e5bff',
  citron: '#c8f54a',
  tomate: '#ff5b37',
  soleil: '#ffcb3d',
  rose: '#ff9bd0',
};
