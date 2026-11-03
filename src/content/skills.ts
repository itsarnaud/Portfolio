import type { Tool, ToolGroup } from './types';

/** La boîte à outils de la page À propos, par groupe. Les titres des groupes sont dans messages (about.toolbox). */
export const toolGroups: ToolGroup[] = [
  {
    id: 'front',
    tools: [
      { name: 'SvelteKit', color: 'tomate' },
      { name: 'React / Next.js', color: 'cobalt' },
      { name: 'React Native', color: 'rose' },
      { name: 'TypeScript', color: 'blanc' },
      { name: 'Tailwind', color: 'violet' },
      { name: 'Astro', color: 'blanc' },
      { name: 'GSAP', color: 'blanc' },
    ],
  },
  {
    id: 'back',
    tools: [
      { name: 'Node.js / Express', color: 'citron' },
      { name: 'Python', color: 'soleil' },
      { name: 'NestJS', color: 'blanc' },
      { name: 'PostgreSQL', color: 'cobalt' },
      { name: 'MySQL', color: 'blanc' },
      { name: 'Prisma', color: 'rose' },
      { name: 'Supabase', color: 'citron' },
      { name: 'PHP / Symfony', color: 'blanc' },
    ],
  },
  {
    id: 'tools',
    tools: [
      { name: 'Git', color: 'blanc' },
      { name: 'Docker', color: 'citron' },
      { name: 'Figma', color: 'tomate' },
      { name: 'Illustrator', color: 'blanc' },
      { name: 'Photoshop', color: 'blanc' },
    ],
  },
  {
    id: 'learning',
    tools: [
      { name: 'Java', color: 'blanc' },
      { name: 'Spring', color: 'blanc' },
      { name: 'Payload CMS', color: 'blanc' },
    ],
  },
];

/** Les stickers de la boîte à outils de l'accueil (une sélection). */
export const homeTools: Tool[] = [
  { name: 'Svelte / SvelteKit', color: 'tomate' },
  { name: 'React / Next.js', color: 'cobalt' },
  { name: 'TypeScript', color: 'blanc' },
  { name: 'Node.js / Express', color: 'citron' },
  { name: 'PostgreSQL', color: 'soleil' },
  { name: 'Prisma', color: 'rose' },
  { name: 'Tailwind CSS', color: 'violet' },
  { name: 'React Native', color: 'rose' },
  { name: 'Supabase', color: 'citron' },
  { name: 'Python', color: 'soleil' },
  { name: 'Astro', color: 'blanc' },
  { name: 'Docker', color: 'cobalt' },
];

/** Ce que j'apprends en ce moment (accueil et page À propos). */
export const learning = ['Java', 'Spring', 'Payload'];
