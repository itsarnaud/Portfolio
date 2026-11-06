import type { Education, Experience } from './types';

export const experiences: Experience[] = [
  {
    id: 'freelance',
    current: true,
    period: { fr: 'Depuis février 2026', en: 'Since February 2026' },
    place: 'Montpellier',
    role: { fr: 'Développeur fullstack indépendant', en: 'Freelance fullstack developer' },
    company: 'Freelance',
    color: 'tomate',
    description: {
      fr: "En parallèle de l'alternance, je crée des sites et des applis web sur mesure, du premier rendez-vous à la mise en ligne.",
      en: 'Alongside my work-study, I build custom websites and web apps, from the first meeting to going live.',
    },
    points: {
      fr: [
        'Analyse des besoins et conseil client',
        'Intégration UX/UI et responsive',
        "Premier client : l'Atelier Maha, studio d'architecture d'intérieur",
      ],
      en: [
        'Needs analysis and client advice',
        'UX/UI integration and responsive design',
        'First client: Atelier Maha, an interior design studio',
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
  },
  {
    id: 'kollirama',
    current: true,
    period: { fr: 'Depuis septembre 2025', en: 'Since September 2025' },
    place: 'Bernis',
    role: { fr: 'Alternant développeur fullstack', en: 'Work-study fullstack developer' },
    company: 'Kollirama',
    companyUrl: 'https://kollirama.fr',
    color: 'cobalt',
    description: {
      fr: "Je m'occupe seul des sites et des outils web de l'entreprise, de la conception à la mise en production.",
      en: "I handle the company's websites and web tools on my own, from design to production.",
    },
    points: {
      fr: [
        'Refonte de kollirama.fr en monorepo : site en trois langues et back-office',
        'Back-office avec tableau de bord, gestion des rôles et OAuth',
        'Montée en compétences sur Astro, Prisma et Supabase',
      ],
      en: [
        'Rebuilt kollirama.fr as a monorepo: a site in three languages and a back-office',
        'Back-office with a dashboard, role management and OAuth',
        'Learned Astro, Prisma and Supabase on the job',
      ],
    },
    stack: ['Astro', 'Svelte', 'Express', 'Prisma', 'Supabase', 'PostgreSQL'],
  },
  {
    id: 'igocreate',
    current: false,
    period: { fr: 'Avril 2024 à septembre 2025', en: 'April 2024 to September 2025' },
    place: 'Paris',
    role: { fr: 'Alternant développeur fullstack', en: 'Work-study fullstack developer' },
    company: 'Igocreate',
    companyUrl: 'https://igocreate.com',
    color: 'rose',
    description: {
      fr: "Une agence qui fait des solutions web sur mesure. J'y ai travaillé sur des projets internes et clients.",
      en: 'An agency that builds custom web solutions. I worked there on in-house and client projects.',
    },
    points: {
      fr: [
        "Développement d'Igowall, une plateforme no-code de création de sites",
        "Contribution à Igotrack, l'outil de gestion de projet interne",
        "Appli de gestion de file d'attente, en web et en mobile",
        'Documentation du framework et du moteur de template maison',
      ],
      en: [
        'Built Igowall, a no-code website builder',
        'Contributed to Igotrack, the in-house project management tool',
        'A queue management app, on web and mobile',
        'Documentation for the in-house framework and template engine',
      ],
    },
    stack: ['SvelteKit', 'Node.js', 'Express', 'MySQL', 'React Native', 'Tailwind'],
  },
  {
    id: 'olivier-nonis',
    current: false,
    period: { fr: '2023', en: '2023' },
    place: 'Quincy-Voisins',
    role: { fr: 'Stagiaire graphiste', en: 'Graphic design intern' },
    company: 'Olivier Nonis',
    companyUrl: 'https://graphevent.com',
    color: 'soleil',
    description: {
      fr: 'Un stage dans un studio créatif, entre print et web.',
      en: 'An internship in a creative studio, between print and web.',
    },
    points: {
      fr: [
        "Création de logos, d'affiches et de flyers",
        'Suite Adobe : InDesign, Illustrator, Photoshop',
        "Mise à jour d'un site WordPress",
      ],
      en: [
        'Designed logos, posters and flyers',
        'Adobe suite: InDesign, Illustrator, Photoshop',
        'Updated a WordPress site',
      ],
    },
    stack: ['InDesign', 'Illustrator', 'Photoshop', 'WordPress'],
  },
];

export const education: Education[] = [
  {
    period: '2025 - 2027',
    title: { fr: 'Mastère Expert en Informatique et SI', en: "Master's degree in Computer Science and IS" },
    school: { fr: 'EPSI Montpellier, spécialité développement', en: 'EPSI Montpellier, development track' },
    color: 'violet',
  },
  {
    period: '2022 - 2025',
    title: { fr: "BUT Métiers du Multimédia et de l'Internet", en: 'Bachelor in Multimedia and Internet (BUT MMI)' },
    school: {
      fr: 'IUT de Meaux, Université Gustave Eiffel, parcours développement web',
      en: 'IUT de Meaux, Gustave Eiffel University, web development track',
    },
    color: 'citron',
  },
  {
    period: '2022',
    title: { fr: 'Bac général avec mention', en: 'High school diploma with honors' },
    school: { fr: 'Lycée Henri Moissan, Meaux', en: 'Lycée Henri Moissan, Meaux' },
    color: 'blanc',
  },
];
