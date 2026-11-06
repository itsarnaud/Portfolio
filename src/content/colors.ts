import type { ColorName } from './types';

// Classes écrites en entier : Tailwind ne détecte pas celles construites à la volée.
export const bgClass: Record<ColorName, string> = {
  violet: 'bg-violet text-blanc',
  cobalt: 'bg-cobalt text-blanc',
  citron: 'bg-citron text-encre',
  tomate: 'bg-tomate text-encre',
  soleil: 'bg-soleil text-encre',
  rose: 'bg-rose text-encre',
  blanc: 'bg-blanc text-encre',
};

export function screenClass(color: ColorName): string {
  return color === 'violet' || color === 'cobalt' ? 'bg-blanc/15' : 'bg-encre/7';
}

export function cursorColorOn(color: ColorName): string {
  return color === 'violet' || color === 'cobalt' || color === 'blanc' ? hex.citron : hex.blanc;
}

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
