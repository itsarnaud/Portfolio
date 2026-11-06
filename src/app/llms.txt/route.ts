import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/components/layout/navLinks';
import { education, experiences } from '@/content/experiences';
import { getPosts } from '@/content/posts';
import { getProjects } from '@/content/projects';
import { toolGroups } from '@/content/skills';
import { absoluteUrl, SITE_URL } from '@/lib/seo';
import fr from '../../../messages/fr.json';

export const dynamic = 'force-static';

const pages: [label: string, path: string, summary: string][] = [
  ['Accueil', '', 'Qui je suis, ce que je fais, mes derniers projets et ce sur quoi je bosse en ce moment.'],
  ['Projets', '/projects', 'Tous mes projets, filtrables par type (fullstack, front, back, mobile, open source).'],
  ['Blog', '/blog', "Mes posts LinkedIn : mes projets, l'IA dans le métier de dev, le freelance et un peu d'actu."],
  ['À propos', '/about', 'Ce que je peux faire pour toi (site vitrine, appli web, back-office, appli mobile), ma méthode et ma boîte à outils.'],
  ['Parcours', '/experiences', 'Mes expériences et ma formation.'],
  ['Contact', '/contact', 'Formulaire de contact, email et réseaux.'],
];

const toolGroupLabels: Record<string, string> = {
  front: 'Front',
  back: 'Back',
  tools: 'Outils',
  learning: 'En apprentissage',
};

function build(): string {
  const lines = [
    '# Arnaud Royer',
    '',
    `> Le portfolio d'Arnaud Royer, développeur fullstack à Montpellier, en alternance chez Kollirama et en freelance. Je fabrique des sites, des applis web, des back-offices et des applis mobiles. Le site est en français (par défaut, \`/fr\`) et en anglais (\`/en\`).`,
    '',
    '## Pages principales',
    '',
    ...pages.map(([label, path, summary]) => `- [${label}](${absoluteUrl('fr', path)}): ${summary}`),
    `- [CV (PDF)](${SITE_URL}/files/cv.pdf): CV téléchargeable.`,
    '',
    '## Projets',
    '',
    ...getProjects().map(
      (project) =>
        `- [${project.title}](${absoluteUrl('fr', `/projects/${project.slug}`)}) (${project.year}, ${fr.projects.categories[project.category]}): ${project.description.fr} Stack : ${project.technologies.join(', ')}. Lien : ${project.url}`,
    ),
    '',
    '## Expériences',
    '',
    ...experiences.map(
      (job) => `- ${job.role.fr}, ${job.companyUrl ? `[${job.company}](${job.companyUrl})` : job.company} (${job.period.fr}, ${job.place}) : ${job.description.fr}`,
    ),
    '',
    '## Formation',
    '',
    ...education.map((school) => `- ${school.title.fr}, ${school.school.fr} (${school.period})`),
    '',
    '## Compétences',
    '',
    ...toolGroups.map(({ id, tools }) => `- ${toolGroupLabels[id]} : ${tools.map(({ name }) => name).join(', ')}.`),
    '',
    '## Blog',
    '',
    ...getPosts().map((post) => `- [${post.title.fr}](${absoluteUrl('fr', `/blog/${post.slug}`)}) (${post.date}): ${post.excerpt.fr}`),
    '',
    '## Notes',
    '',
    `- Chaque page existe en anglais : remplacer \`/fr\` par \`/en\` dans l'adresse.`,
    `- [Sitemap](${SITE_URL}/sitemap.xml): toutes les adresses du site, dans les deux langues.`,
    `- Contact : ${EMAIL}, [LinkedIn](${LINKEDIN_URL}), [GitHub](${GITHUB_URL}).`,
    '',
  ];
  return lines.join('\n');
}

export function GET() {
  return new Response(build(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
