import type { ColorName, PostCategory } from '@/content/types';

export const categoryColor: Record<PostCategory, ColorName> = {
  projects: 'violet',
  ai: 'cobalt',
  freelance: 'citron',
  society: 'soleil',
};

export const postCategories: PostCategory[] = ['projects', 'ai', 'freelance', 'society'];
