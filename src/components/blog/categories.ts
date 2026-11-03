import type { ColorName, PostCategory } from '@/content/types';

/** Couleur de chaque catégorie du blog (carte mise en avant, en-tête de l'article). */
export const categoryColor: Record<PostCategory, ColorName> = {
  projects: 'violet',
  ai: 'cobalt',
  freelance: 'citron',
  society: 'soleil',
};

/** L'ordre des filtres de la page Blog. */
export const postCategories: PostCategory[] = ['projects', 'ai', 'freelance', 'society'];
