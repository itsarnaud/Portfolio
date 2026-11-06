import type { ProjectKind } from '@/content/types';

export const projectFilters = ['fullstack', 'frontend', 'backend', 'mobile', 'openSource'] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export const filterOfKind: Record<ProjectKind, ProjectFilter> = {
  fullstack: 'fullstack',
  frontend: 'frontend',
  backend: 'backend',
  bot: 'backend',
  mobile: 'mobile',
  'open-source': 'openSource',
};
