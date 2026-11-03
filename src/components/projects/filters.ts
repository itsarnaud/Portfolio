import type { ProjectKind } from '@/content/types';

/** Les filtres de la page Projets, dans l'ordre. Les libellés sont dans messages (projects.filters). */
export const projectFilters = ['fullstack', 'frontend', 'backend', 'mobile', 'openSource'] as const;

export type ProjectFilter = (typeof projectFilters)[number];

/** Le filtre de chaque type de projet : un bot Discord est rangé dans « Back ». */
export const filterOfKind: Record<ProjectKind, ProjectFilter> = {
  fullstack: 'fullstack',
  frontend: 'frontend',
  backend: 'backend',
  bot: 'backend',
  mobile: 'mobile',
  'open-source': 'openSource',
};
