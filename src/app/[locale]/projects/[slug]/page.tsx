import { notFound } from 'next/navigation';
import { getProject, getProjects } from '@/content/projects';
import { routing } from '@/i18n/routing';
import { resolveLocale } from '@/i18n/locale';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getProjects().map(({ slug }) => ({ locale, slug })));
}

// Page provisoire : la vraie page détail arrive à l'étape 7.
export default async function ProjectPage({ params }: PageProps<'/[locale]/projects/[slug]'>) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main>
      <h1>{project.title}</h1>
      <p>{project.tagline[locale]}</p>
    </main>
  );
}
