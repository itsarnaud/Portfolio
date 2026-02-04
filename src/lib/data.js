export const projects = [
  {
    id: 1,
    title: 'Kollirama',
    slug: 'kollirama',
    year: '2026',
    description: 'Site vitrine de Kollirama.',
    longDescription: 'Plateforme web B2B complète développée en monorepo, comprenant un site vitrine multilingue (FR/EN) et un back-office d\'administration. Le site public propose des formulaires de contact, de demande de rappel et de téléchargement de catalogues avec envoi d\'emails automatiques. Le back-office inclut un dashboard analytique avec statistiques en temps réel, la gestion des utilisateurs avec système de rôles, l\'intégration OAuth LinkedIn pour synchroniser les posts, un générateur de signatures email HTML personnalisées, et l\'export CSV des contacts. L\'authentification repose sur JWT RS256 avec cookies sécurisés.',
    challenge: 'J\'étais le seul développeur sur ce projet, ce qui m\'a permis de gérer l\'intégralité du cycle de développement. Le principal défi a été de monter en compétences sur des technologies que je n\'avais jamais utilisées auparavant : Astro pour le frontend, Prisma comme ORM, Supabase pour la base de données et le stockage, ainsi que MJML pour les templates d\'emails. J\'ai dû concevoir une architecture complète from scratch tout en apprenant ces nouveaux outils.',
    technologies: ['Astro', 'Svelte', 'Express.js', 'Prisma', 'Supabase', 'PostgreSQL', 'Tailwind', 'TypeScript'],
    image: ['/images/projects/Logo_Kollirama.png'],
    link: '',
    category: 'Projet d\'alternance'
  },
  {
    id: 2,
    title: 'Igotrack',
    slug: 'igotrack',
    year: '2025',
    description: 'Application web de gestion de projet.',
    longDescription: 'Application web de gestion de projet développée en équipe pour répondre à un besoin interne. Face aux limites des outils existants comme Jira ou Linear, jugés trop complexes ou peu adaptés à notre workflow, nous avons conçu une solution sur mesure. L\'application permet de suivre l\'avancement des projets, de répartir les tâches efficacement et d\'avoir une vision claire des priorités. J\'ai contribué au développement, en travaillant à la fois sur les interfaces utilisateur côté frontend et sur les fonctionnalités serveur côté backend.',
    challenge: 'Le défi principal était de concevoir un outil qui réponde réellement à nos besoins sans reproduire la complexité des solutions existantes. Il fallait trouver le bon équilibre entre simplicité d\'utilisation et richesse fonctionnelle. Travailler en équipe sur ce projet m\'a permis de développer mes compétences en collaboration et en gestion de code partagé.',
    technologies: ['SvelteKit', 'Node.js', 'MySQL', 'Tailwind'],
    image: ['/images/projects/Igotrack.png'],
    link: 'https://igotrack.co',
    category: 'Projet d\'alternance'
  },
  {
    id: 3,
    title: 'Stellarica',
    slug: 'stellarica',
    year: '2025',
    description: 'Bot de modération discord.',
    longDescription: 'Bot Discord de modération développé avec Discord.js v14, offrant des outils essentiels pour les administrateurs et modérateurs de serveurs. Stellarica propose un système complet de modération (ban, kick, mute, warn) avec historique des actions, une gestion optimisée des utilisateurs avec enregistrement automatique à la demande, et des commandes slash modernes. Les données sont stockées de manière sécurisée dans une base MySQL via Prisma ORM.',
    challenge: 'Le principal défi était d\'optimiser les performances du bot en évitant la synchronisation massive des utilisateurs au démarrage. J\'ai implémenté un système d\'enregistrement intelligent où les utilisateurs sont ajoutés uniquement lorsque nécessaire. J\'ai également structuré le code de manière modulaire avec une séparation claire entre les commandes, les événements et les utilitaires, tout en assurant une gestion robuste des erreurs.',
    technologies: ['Discord.js', 'JavaScript', 'Prisma'],
    image: ['/images/projects/Stellarica.png'],
    link: 'https://github.com/itsarnaud/Stellarica',
    category: 'Projet perso'
  },
  {
    id: 4,
    title: 'Hermes HLine',
    slug: 'hermes-hline',
    year: '2025',
    description: 'Gestion de file d\'attente en ligne. Application web & mobile.',
    longDescription: 'Application web et mobile de gestion de file d\'attente développée pour Hermès, permettant d\'organiser les rendez-vous clients via un système de tirage au sort quotidien. L\'application propose trois interfaces distinctes : une inscription simplifiée pour les clients souhaitant participer au tirage, un tableau de bord complet pour les vendeurs disponible en version web et mobile (suivi des présences, statut d\'achat, prise de rendez-vous en temps réel), et une interface d\'administration pour superviser l\'ensemble de la file d\'attente. Le cœur du système repose sur un algorithme de tirage au sort équitable intégrant des mécanismes anti-bot et anti-spam.',
    challenge: 'Le défi majeur était de concevoir un algorithme de tirage au sort à la fois équitable et sécurisé, garantissant une chance réelle à chaque participant tout en bloquant les tentatives de fraude (bots, inscriptions multiples, spam). Le développement d\'une application mobile dédiée aux vendeurs ajoutait une couche de complexité, nécessitant une synchronisation en temps réel des données entre les interfaces web et mobile pour assurer une expérience fluide sur le terrain.',
    technologies: ['Express.js', 'JavaScript', 'Bootstrap', 'React Native'],
    image: ['/images/projects/Hermes.png'],
    link: 'https://rendezvousparis.hermes.com/client/welcome',
    category: 'Projet d\'alternance'
  },
  {
    id: 5,
    title: 'Foliode',
    slug: 'foliode',
    year: '2025',
    description: 'Générateur de Portfolio en ligne.',
    longDescription: 'Générateur de portfolios en ligne développé en équipe de 5 personnes, destiné aux étudiants souhaitant présenter leurs compétences et projets de manière professionnelle. Les utilisateurs sont guidés étape par étape via un formulaire intuitif, peuvent choisir parmi différents templates et obtiennent un portfolio hébergé sous un sous-domaine personnalisé (username.foliode.com). L\'application intègre des éléments 3D interactifs créés avec Blender et Three.js pour une expérience visuelle immersive.',
    challenge: 'En tant que Chef de projet et Scrum Master, j\'ai coordonné une équipe de 5 développeurs tout en contribuant activement au développement. Le défi technique majeur était la mise en place d\'un système de sous-domaines dynamiques pour héberger chaque portfolio utilisateur. L\'intégration de modèles 3D interactifs avec Three.js et la gestion d\'une architecture full-stack (Next.js/React en frontend, Symfony en backend) dans un environnement Docker ont également représenté des challenges techniques.',
    technologies: ['Next.js', 'TypeScript', 'Symfony', 'PostgreSQL', 'Docker', 'Tailwind'],
    image: ['/images/projects/Foliode.png'],
    link: 'https://github.com/itsarnaud/Foliode',
    category: 'Projet de cours'
  },
  {
    id: 6,
    title: 'Igowall',
    slug: 'igowall',
    year: '2024',
    description: 'Plateforme de création de site internet.',
    longDescription: 'Plateforme SaaS de création de sites web no-code permettant aux utilisateurs de concevoir leur présence en ligne sans compétences techniques. L\'outil propose un éditeur intuitif avec système de blocs prédéfinis, une personnalisation complète (couleurs, typographies, logo), une édition responsive depuis mobile et tablette, ainsi que des fonctionnalités SEO avancées (balises meta, intégrations Google Analytics, Facebook Pixel, HotJar). Les utilisateurs peuvent gérer plusieurs sites depuis un même espace et choisir parmi différents templates.',
    challenge: 'J\'ai été chargé de la refonte visuelle complète de la plateforme ainsi que du développement de nouvelles fonctionnalités. Le défi était de moderniser l\'interface utilisateur tout en conservant la simplicité d\'utilisation qui fait la force du produit. Il fallait également intégrer de nouvelles features sans complexifier l\'expérience utilisateur, en gardant l\'accessibilité au cœur de la conception pour que même les non-initiés puissent créer leur site facilement.',
    technologies: ['SvelteKit', 'Node.js', 'MySQL', 'Tailwind'],
    image: ['/images/projects/Igowall.png'],
    link: 'https://www.igowall.com/',
    category: 'Projet d\'alternance'
  },
  {
    id: 7,
    title: 'Template Engine Benchmark',
    slug: 'benchmark',
    year: '2024',
    description: 'Benchmark de moteur de template.',
    longDescription: 'Outil de benchmark open-source permettant d\'évaluer et comparer les performances de rendu des principaux moteurs de templates JavaScript (Pug, EJS, Handlebars, Liquid, Eta, Dust, Igodust). Le projet exécute une série de tests sur différents scénarios (boucles, conditions, échappement HTML) et génère automatiquement un rapport de résultats dans le README. L\'architecture modulaire permet d\'ajouter facilement de nouveaux moteurs de templates à la suite de tests.',
    challenge: 'Le défi était de concevoir un système de benchmark fiable et reproductible, capable de mesurer équitablement les performances de moteurs aux syntaxes et fonctionnements très différents. Il fallait également rendre le projet extensible pour que d\'autres développeurs puissent contribuer en ajoutant leurs propres moteurs de templates. Le projet a attiré l\'attention de la communauté avec 10 stars et des contributions externes.',
    technologies: ['JavaScript'],
    image: ['/images/projects/benchmark.png'],
    link: 'https://github.com/itsarnaud/template-engine-bench',
    category: 'Projet de stage'
  },
  {
    id: 8,
    title: 'Tiptap FontSize Extension',
    slug: 'tiptap-fontsize-extension',
    year: '2024',
    description: 'Extension Tiptap pour la gestion de la taille de police.',
    longDescription: 'Extension open-source pour l\'éditeur Tiptap permettant d\'ajuster la taille de police dans les éditeurs de texte riches. L\'extension propose des commandes avancées pour définir une taille spécifique, augmenter ou diminuer la taille par incréments, ainsi qu\'une fonction pour récupérer la taille actuelle. Plus complète que la version officielle, elle offre une configuration flexible avec taille par défaut personnalisable et système d\'incréments. Publiée sur npm, l\'extension a été adoptée par la communauté avec 6 stars sur GitHub.',
    challenge: 'Le défi était de créer une extension qui soit à la fois plus riche fonctionnellement que la version officielle tout en restant simple d\'utilisation et bien intégrée dans l\'écosystème Tiptap. Il fallait gérer les cas limites liés aux sélections de texte multiples, assurer la compatibilité avec les autres extensions Tiptap, et proposer une API intuitive pour les développeurs. La publication sur npm et la documentation claire ont permis une adoption rapide par la communauté.',
    technologies: ['JavaScript', 'Tiptap'],
    image: ['/images/projects/Tiptap.png'],
    link: 'https://github.com/itsarnaud/tiptap-fontsize-extension',
    category: 'Projet open-source'
  },
];

export const skills = {
  frontend: [
    { name: "Svelte / SvelteKit",      level: 90 },
    { name: "React / Next.js",         level: 80 },
    { name: "JavaScript / TypeScript", level: 85 },
    { name: "Tailwind CSS",            level: 90 },
    { name: "Astro",                   level: 70 },
  ],
  backend: [
    { name: "Node.js / Express",  level: 90 },
    { name: "PostgreSQL / MySQL", level: 85 },
    { name: "REST API",           level: 85 },
    { name: "Prisma",             level: 80 },
    { name: "PHP / Symfony",      level: 60 },
  ],
  tools:    ["Git", "Docker", "Figma", "Illustrator", "Photoshop", "InDesign"],
  learning: ["Vue.js", "Ruby", "Supabase"],
}

export const values = [
  {
    title: "Qualité du code",
    description:
      "Je crois fermement qu'un code propre et bien structuré est la base de tout projet réussi. Tests, documentation et maintenabilité sont mes priorités.",
  },
  {
    title: "Design soigné",
    description:
      "L'attention aux détails fait la différence. Je travaille au pixel près pour créer des interfaces qui allient esthétique et fonctionnalité.",
  },
  {
    title: "Performance",
    description:
      "Chaque milliseconde compte. J'optimise systématiquement mes applications pour offrir la meilleure expérience utilisateur possible.",
  },
  {
    title: "Communication",
    description:
      "Un projet réussi passe par une communication claire. Je m'assure de comprendre vos besoins et de vous tenir informé à chaque étape.",
  },
]

export const experiences = [
  {
    id: 1,
    role: "Développeur Fullstack",
    company: "Kollirama",
    companyUrl: "https://kollirama.fr",
    location: "Bernis, France",
    period: "2025 — Présent",
    description:
      "Développement fullstack de projets internes et refonte complète du site vitrine de l'entreprise. Conception et développement en autonomie d'applications web sur mesure.",
    achievements: [
      "Refonte complète du site kollirama.fr en monorepo (site vitrine multilingue + back-office)",
      "Développement en totale autonomie, de la conception à la mise en production",
      "Création d'un back-office avec dashboard analytique, gestion des rôles et intégrations tierces",
      "Montée en compétences sur de nouvelles technologies (Astro, Prisma, Supabase)",
    ],
    technologies: ['Astro', 'Svelte', 'Express.js', 'Prisma', 'Supabase', 'PostgreSQL', 'Tailwind', 'TypeScript'],
  },
  {
    id: 2,
    role: "Développeur Fullstack",
    company: "Igocreate",
    companyUrl: "https://igocreate.com",
    location: "Paris, France",
    period: "2024 — 2025",
    description:
      "Développement de projets internes et clients au sein d'une agence spécialisée dans les solutions web sur mesure. Contribution à la documentation technique des outils internes.",
    achievements: [
      "Développement de la plateforme no-code Igowall (création de sites web)",
      "Contribution au développement d'Igotrack, outil de gestion de projet interne",
      "Développement de l'application Hermès HLine (gestion de file d'attente web & mobile)",
      "Rédaction de documentation pour le framework et le moteur de template internes",
    ],
    technologies: ["SvelteKit", "Node.js", "Express.js", "MySQL", "React Native", "Tailwind"],
  },
  {
    id: 3,
    role: "Graphiste",
    company: "Olivier Nonis",
    companyUrl: "https://graphevent.com",
    location: "Quincy-Voisins, France",
    period: "2023",
    description:
      "Stage en graphisme au sein d'un studio créatif. Création de supports de communication print et mise à jour de site web.",
    achievements: [
      "Création de logos, affiches et flyers",
      "Utilisation de la suite Adobe (InDesign, Illustrator, Photoshop)",
      "Mise à jour d'un site WordPress (Elementor)",
    ],
    technologies: ["InDesign", "Illustrator", "Photoshop", "WordPress", "Elementor"],
  }
];

export const education = [
  {
    degree: "Mastère Expert en Informatique et SI",
    school: "EPSI, Montpellier",
    period: "2025 — 2027",
    description: "Spécialité Développement",
  },
  {
    degree: "BUT Métiers du Multimédia et de l'Internet",
    school: "Université Gustave Eiffel, IUT Meaux",
    period: "2022 — 2025",
    description: "Parcours Développement Web",
  },
]
