const projectsData = [
  {
    id: 1,
    title: "Tiptap FontSize Extension",
    slug: "tiptap-fontsize-extension",
    year: "2024",
    description: {
      fr: "Extension Tiptap pour la gestion de la taille de police.",
      en: "Tiptap extension for font size management.",
    },
    longDescription: {
      fr: "Extension open-source pour l'éditeur Tiptap permettant d'ajuster la taille de police dans les éditeurs de texte riches. L'extension propose des commandes avancées pour définir une taille spécifique, augmenter ou diminuer la taille par incréments, ainsi qu'une fonction pour récupérer la taille actuelle. Plus complète que la version officielle, elle offre une configuration flexible avec taille par défaut personnalisable et système d'incréments. Publiée sur npm, l'extension a été adoptée par la communauté avec 6 stars sur GitHub.",
      en: "Open-source extension for the Tiptap editor that allows adjusting font size in rich text editors. The extension provides advanced commands to set a specific size, increase or decrease the size in increments, and a function to retrieve the current size. More complete than the official version, it offers flexible configuration with a customizable default size and increment system. Published on npm, the extension has been adopted by the community with 6 stars on GitHub.",
    },
    challenge: {
      fr: "Le défi était de créer une extension qui soit à la fois plus riche fonctionnellement que la version officielle tout en restant simple d'utilisation et bien intégrée dans l'écosystème Tiptap. Il fallait gérer les cas limites liés aux sélections de texte multiples, assurer la compatibilité avec les autres extensions Tiptap, et proposer une API intuitive pour les développeurs. La publication sur npm et la documentation claire ont permis une adoption rapide par la communauté.",
      en: "The challenge was to create an extension that is both more feature-rich than the official version while remaining easy to use and well-integrated into the Tiptap ecosystem. It was necessary to handle edge cases related to multiple text selections, ensure compatibility with other Tiptap extensions, and provide an intuitive API for developers. Publishing on npm with clear documentation allowed for quick community adoption.",
    },
    technologies: ["JavaScript", "Tiptap"],
    image: ["/images/projects/Tiptap.png"],
    link: "https://github.com/itsarnaud/tiptap-fontsize-extension",
    category: {
      fr: "Projet open-source",
      en: "Open-source project",
    },
  },
  {
    id: 2,
    title: "Template Engine Benchmark",
    slug: "benchmark",
    year: "2024",
    description: {
      fr: "Benchmark de moteur de template.",
      en: "JavaScript template engine benchmark.",
    },
    longDescription: {
      fr: "Outil de benchmark open-source permettant d'évaluer et comparer les performances de rendu des principaux moteurs de templates JavaScript (Pug, EJS, Handlebars, Liquid, Eta, Dust, Igodust). Le projet exécute une série de tests sur différents scénarios (boucles, conditions, échappement HTML) et génère automatiquement un rapport de résultats dans le README. L'architecture modulaire permet d'ajouter facilement de nouveaux moteurs de templates à la suite de tests.",
      en: "Open-source benchmarking tool to evaluate and compare the rendering performance of major JavaScript template engines (Pug, EJS, Handlebars, Liquid, Eta, Dust, Igodust). The project runs a series of tests on different scenarios (loops, conditions, HTML escaping) and automatically generates a results report in the README. The modular architecture makes it easy to add new template engines to the test suite.",
    },
    challenge: {
      fr: "Le défi était de concevoir un système de benchmark fiable et reproductible, capable de mesurer équitablement les performances de moteurs aux syntaxes et fonctionnements très différents. Il fallait également rendre le projet extensible pour que d'autres développeurs puissent contribuer en ajoutant leurs propres moteurs de templates. Le projet a attiré l'attention de la communauté avec 10 stars et des contributions externes.",
      en: "The challenge was to design a reliable and reproducible benchmark system, capable of fairly measuring the performance of engines with very different syntaxes and behaviors. The project also needed to be extensible so other developers could contribute by adding their own template engines. The project attracted community attention with 10 stars and external contributions.",
    },
    technologies: ["JavaScript"],
    image: ["/images/projects/Benchmark.png"],
    link: "https://github.com/itsarnaud/template-engine-bench",
    category: {
      fr: "Projet de stage",
      en: "Internship project",
    },
  },
  {
    id: 3,
    title: "Igowall",
    slug: "igowall",
    year: "2024",
    description: {
      fr: "Plateforme de création de site internet.",
      en: "Website creation platform.",
    },
    longDescription: {
      fr: "Plateforme SaaS de création de sites web no-code permettant aux utilisateurs de concevoir leur présence en ligne sans compétences techniques. L'outil propose un éditeur intuitif avec système de blocs prédéfinis, une personnalisation complète (couleurs, typographies, logo), une édition responsive depuis mobile et tablette, ainsi que des fonctionnalités SEO avancées (balises meta, intégrations Google Analytics, Facebook Pixel, HotJar). Les utilisateurs peuvent gérer plusieurs sites depuis un même espace et choisir parmi différents templates.",
      en: "No-code SaaS website creation platform allowing users to design their online presence without technical skills. The tool offers an intuitive editor with a predefined block system, complete customization (colors, typography, logo), responsive editing from mobile and tablet, and advanced SEO features (meta tags, Google Analytics, Facebook Pixel, HotJar integrations). Users can manage multiple sites from the same space and choose from various templates.",
    },
    challenge: {
      fr: "J'ai été chargé de la refonte visuelle complète de la plateforme ainsi que du développement de nouvelles fonctionnalités. Le défi était de moderniser l'interface utilisateur tout en conservant la simplicité d'utilisation qui fait la force du produit. Il fallait également intégrer de nouvelles features sans complexifier l'expérience utilisateur, en gardant l'accessibilité au cœur de la conception pour que même les non-initiés puissent créer leur site facilement.",
      en: "I was responsible for the complete visual overhaul of the platform and the development of new features. The challenge was to modernize the user interface while maintaining the simplicity of use that makes the product strong. New features also had to be integrated without complicating the user experience, keeping accessibility at the heart of the design so even non-technical users could create their site easily.",
    },
    technologies: ["SvelteKit", "Node.js", "MySQL", "Tailwind"],
    image: [
      "/images/projects/igowall/Igowall.png",
      "/images/projects/igowall/IW-1.png",
      "/images/projects/igowall/IW-2.png",
      "/images/projects/igowall/IW-3.png",
      "/images/projects/igowall/IW-4.png",
      "/images/projects/igowall/IW-5.png",
    ],
    link: "https://www.igowall.com/",
    category: {
      fr: "Projet d'alternance",
      en: "Work-study project",
    },
  },
  {
    id: 4,
    title: "Foliode",
    slug: "foliode",
    year: "2025",
    description: {
      fr: "Générateur de Portfolio en ligne.",
      en: "Online portfolio generator.",
    },
    longDescription: {
      fr: "Générateur de portfolios en ligne développé en équipe de 5 personnes, destiné aux étudiants souhaitant présenter leurs compétences et projets de manière professionnelle. Les utilisateurs sont guidés étape par étape via un formulaire intuitif, peuvent choisir parmi différents templates et obtiennent un portfolio hébergé sous un sous-domaine personnalisé (username.foliode.com). L'application intègre des éléments 3D interactifs créés avec Blender et Three.js pour une expérience visuelle immersive.",
      en: "Online portfolio generator developed in a team of 5, aimed at students who want to present their skills and projects professionally. Users are guided step by step through an intuitive form, can choose from different templates, and get a portfolio hosted at a personalized subdomain (username.foliode.com). The app integrates interactive 3D elements created with Blender and Three.js for an immersive visual experience.",
    },
    challenge: {
      fr: "En tant que Chef de projet et Scrum Master, j'ai coordonné une équipe de 5 développeurs tout en contribuant activement au développement. Le défi technique majeur était la mise en place d'un système de sous-domaines dynamiques pour héberger chaque portfolio utilisateur. L'intégration de modèles 3D interactifs avec Three.js et la gestion d'une architecture full-stack (Next.js/React en frontend, Symfony en backend) dans un environnement Docker ont également représenté des challenges techniques.",
      en: "As Project Manager and Scrum Master, I coordinated a team of 5 developers while actively contributing to the development. The major technical challenge was setting up a dynamic subdomain system to host each user's portfolio. Integrating interactive 3D models with Three.js and managing a full-stack architecture (Next.js/React on frontend, Symfony on backend) in a Docker environment were also significant technical challenges.",
    },
    technologies: ["Next.js", "TypeScript", "Symfony", "PostgreSQL", "Docker", "Tailwind"],
    image: ["/images/projects/Foliode.png"],
    link: "https://github.com/itsarnaud/Foliode",
    category: {
      fr: "Projet de cours",
      en: "School project",
    },
  },
  {
    id: 5,
    title: "Stellarica",
    slug: "stellarica",
    year: "2025",
    description: {
      fr: "Bot de modération discord.",
      en: "Discord moderation bot.",
    },
    longDescription: {
      fr: "Bot Discord de modération développé avec Discord.js v14, offrant des outils essentiels pour les administrateurs et modérateurs de serveurs. Stellarica propose un système complet de modération (ban, kick, mute, warn) avec historique des actions, une gestion optimisée des utilisateurs avec enregistrement automatique à la demande, et des commandes slash modernes. Les données sont stockées de manière sécurisée dans une base MySQL via Prisma ORM.",
      en: "Discord moderation bot developed with Discord.js v14, providing essential tools for server administrators and moderators. Stellarica offers a complete moderation system (ban, kick, mute, warn) with action history, optimized user management with on-demand automatic registration, and modern slash commands. Data is securely stored in a MySQL database via Prisma ORM.",
    },
    challenge: {
      fr: "Le principal défi était d'optimiser les performances du bot en évitant la synchronisation massive des utilisateurs au démarrage. J'ai implémenté un système d'enregistrement intelligent où les utilisateurs sont ajoutés uniquement lorsque nécessaire. J'ai également structuré le code de manière modulaire avec une séparation claire entre les commandes, les événements et les utilitaires, tout en assurant une gestion robuste des erreurs.",
      en: "The main challenge was optimizing the bot's performance by avoiding massive user synchronization at startup. I implemented a smart registration system where users are only added when necessary. I also structured the code modularly with a clear separation between commands, events, and utilities, while ensuring robust error handling.",
    },
    technologies: ["Discord.js", "JavaScript", "Prisma"],
    image: ["/images/projects/Stellarica.png"],
    link: "https://github.com/itsarnaud/Stellarica",
    category: {
      fr: "Projet perso",
      en: "Personal project",
    },
  },
  {
    id: 6,
    title: "Igotrack",
    slug: "igotrack",
    year: "2025",
    description: {
      fr: "Application web de gestion de projet.",
      en: "Project management web application.",
    },
    longDescription: {
      fr: "Application web de gestion de projet développée en équipe pour répondre à un besoin interne. Face aux limites des outils existants comme Jira ou Linear, jugés trop complexes ou peu adaptés à notre workflow, nous avons conçu une solution sur mesure. L'application permet de suivre l'avancement des projets, de répartir les tâches efficacement et d'avoir une vision claire des priorités. J'ai contribué au développement, en travaillant à la fois sur les interfaces utilisateur côté frontend et sur les fonctionnalités serveur côté backend.",
      en: "Project management web application developed as a team to address an internal need. Facing the limitations of existing tools like Jira or Linear, considered too complex or poorly adapted to our workflow, we designed a custom solution. The app allows tracking project progress, efficiently distributing tasks, and having a clear view of priorities. I contributed to the development, working on both user interfaces on the frontend and server-side features on the backend.",
    },
    challenge: {
      fr: "Le défi principal était de concevoir un outil qui réponde réellement à nos besoins sans reproduire la complexité des solutions existantes. Il fallait trouver le bon équilibre entre simplicité d'utilisation et richesse fonctionnelle. Travailler en équipe sur ce projet m'a permis de développer mes compétences en collaboration et en gestion de code partagé.",
      en: "The main challenge was designing a tool that truly meets our needs without reproducing the complexity of existing solutions. Finding the right balance between ease of use and feature richness was key. Working as a team on this project helped me develop my collaboration and shared code management skills.",
    },
    technologies: ["SvelteKit", "Node.js", "MySQL", "Tailwind"],
    image: [
      "/images/projects/igotrack/Igotrack.png",
      "/images/projects/igotrack/IT-1.png",
      "/images/projects/igotrack/IT-2.png",
      "/images/projects/igotrack/IT-3.png",
      "/images/projects/igotrack/IT-4.png",
    ],
    link: "https://igotrack.co",
    category: {
      fr: "Projet d'alternance",
      en: "Work-study project",
    },
  },
  {
    id: 7,
    title: "Kollirama",
    slug: "kollirama",
    year: "2026",
    description: {
      fr: "Site vitrine de Kollirama.",
      en: "Kollirama showcase website.",
    },
    longDescription: {
      fr: "Plateforme web B2B complète développée en monorepo, comprenant un site vitrine multilingue (FR/EN) et un back-office d'administration. Le site public propose des formulaires de contact, de demande de rappel et de téléchargement de catalogues avec envoi d'emails automatiques. Le back-office inclut un dashboard analytique avec statistiques en temps réel, la gestion des utilisateurs avec système de rôles, l'intégration OAuth LinkedIn pour synchroniser les posts, un générateur de signatures email HTML personnalisées, et l'export CSV des contacts. L'authentification repose sur JWT RS256 avec cookies sécurisés.",
      en: "Complete B2B web platform developed as a monorepo, including a multilingual showcase website (FR/EN) and an admin back-office. The public site features contact forms, callback request forms, and catalog download forms with automatic email sending. The back-office includes an analytics dashboard with real-time statistics, user management with role system, LinkedIn OAuth integration to sync posts, a custom HTML email signature generator, and CSV contact export. Authentication is based on JWT RS256 with secure cookies.",
    },
    challenge: {
      fr: "J'étais le seul développeur sur ce projet, ce qui m'a permis de gérer l'intégralité du cycle de développement. Le principal défi a été de monter en compétences sur des technologies que je n'avais jamais utilisées auparavant : Astro pour le frontend, Prisma comme ORM, Supabase pour la base de données et le stockage, ainsi que MJML pour les templates d'emails. J'ai dû concevoir une architecture complète from scratch tout en apprenant ces nouveaux outils.",
      en: "I was the sole developer on this project, which allowed me to manage the entire development cycle. The main challenge was upskilling on technologies I had never used before: Astro for the frontend, Prisma as ORM, Supabase for the database and storage, and MJML for email templates. I had to design a complete architecture from scratch while learning these new tools.",
    },
    technologies: ["Astro", "Svelte", "Express.js", "Prisma", "Supabase", "PostgreSQL", "Tailwind", "TypeScript"],
    image: [
      "/images/projects/kollirama/Logo_Kollirama.png",
      "/images/projects/kollirama/KO-1.png",
      "/images/projects/kollirama/KO-2.png",
      "/images/projects/kollirama/KO-3.png",
      "/images/projects/kollirama/KO-4.png",
      "/images/projects/kollirama/KO-5.png"
    ],
    link: "https://kollirama.fr",
    category: {
      fr: "Projet d'alternance",
      en: "Work-study project",
    },
  },
  {
    id: 8,
    title: "IDK Concept",
    slug: "idk-concept",
    year: "2026",
    description: {
      fr: "Site vitrine premium pour une entreprise d'agencement sur-mesure.",
      en: "Premium showcase website for a custom fitting company.",
    },
    longDescription: {
      fr: "Site vitrine haut de gamme conçu pour une entreprise française spécialisée dans l'architecture commerciale et l'agencement sur-mesure (pharmacies, épiceries fines, etc.). L'application offre une expérience utilisateur fluide et immersive grâce à des animations avancées au défilement et des transitions dynamiques. Le site intègre également une gestion optimisée des images de nouvelle génération, un SEO performant, ainsi qu'un formulaire de contact relié à une API personnalisée pour l'envoi d'emails transactionnels.",
      en: "High-end showcase website designed for a French company specializing in commercial architecture and custom fitting (pharmacies, delicatessens, etc.). The app delivers a smooth and immersive user experience through advanced scroll animations and dynamic transitions. The site also integrates optimized next-generation image management, strong SEO, and a contact form connected to a custom API for transactional email sending.",
    },
    challenge: {
      fr: "Le principal défi a été d'allier un design très visuel avec des animations complexes (réalisées avec GSAP et intégrées dans des composants React) tout en maintenant de hautes performances web et un excellent référencement naturel. J'ai conçu une architecture frontend robuste tirant parti des dernières fonctionnalités de Next.js (App Router, Server Components) et géré l'intégration du service Brevo pour un système de contact fiable.",
      en: "The main challenge was combining a highly visual design with complex animations (built with GSAP and integrated into React components) while maintaining high web performance and excellent SEO. I designed a robust frontend architecture leveraging the latest Next.js features (App Router, Server Components) and managed the integration of the Brevo service for a reliable contact system.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP", "Brevo"],
    image: [
      "/images/projects/idk-concept/idk-concept.png",
      "/images/projects/idk-concept/IC-1.png",
      "/images/projects/idk-concept/IC-2.png",
      "/images/projects/idk-concept/IC-3.png",
      "/images/projects/idk-concept/IC-4.png",
    ],
    link: "https://www.idk-concept.fr",
    category: {
      fr: "Projet d'alternance",
      en: "Work-study project",
    },
  },
  {
    id: 9,
    title: "Atelier Maha",
    slug: "atelier-maha",
    year: "2026",
    description: {
      fr: "Site vitrine pour un studio d'architecture d'intérieur.",
      en: "Showcase website for an interior design studio.",
    },
    longDescription: {
      fr: "Site vitrine haut de gamme développé pour Atelier Maha, un studio français d'architecture d'intérieur. Le site met en avant les prestations et réalisations via une expérience éditoriale riche, des animations avancées au scroll, et une navigation fluide orientée conversion. L'application intègre une galerie de projets, un formulaire de contact connecté à EmailJS, et une base SEO solide (metadata, JSON-LD, sitemap, robots).",
      en: "High-end showcase website developed for Atelier Maha, a French interior design studio. The site highlights services and achievements through a rich editorial experience, advanced scroll animations, and smooth conversion-oriented navigation. The app integrates a project gallery, a contact form connected to EmailJS, and a solid SEO foundation (metadata, JSON-LD, sitemap, robots).",
    },
    challenge: {
      fr: "Le défi principal a été de concilier une direction artistique très visuelle (animations GSAP, transitions, effets de scroll, sections immersives) avec de bonnes performances web et une navigation robuste sur desktop/mobile. L'architecture Next.js App Router, l'optimisation des médias avec next/image, et une stratégie SEO complète ont permis de maintenir un bon équilibre entre impact visuel, fluidité et référencement.",
      en: "The main challenge was reconciling a highly visual art direction (GSAP animations, transitions, scroll effects, immersive sections) with good web performance and robust desktop/mobile navigation. The Next.js App Router architecture, media optimization with next/image, and a comprehensive SEO strategy maintained a good balance between visual impact, fluidity, and search ranking.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Swiper", "EmailJS"],
    image: [
      "/images/projects/atelier-maha/Atelier_Maha.png",
      "/images/projects/atelier-maha/AM-1.png",
      "/images/projects/atelier-maha/AM-2.png",
      "/images/projects/atelier-maha/AM-3.png",
      "/images/projects/atelier-maha/AM-4.png",
    ],
    link: "https://ateliermaha.fr",
    category: {
      fr: "Projet client",
      en: "Client project",
    },
  },
];

export const getProjects = (locale = 'fr') =>
  projectsData
    .map((p) => ({
      ...p,
      description: p.description[locale] ?? p.description.fr,
      longDescription: p.longDescription[locale] ?? p.longDescription.fr,
      challenge: p.challenge[locale] ?? p.challenge.fr,
      category: p.category[locale] ?? p.category.fr,
    }))
    .reverse();

export const skills = {
  frontend: [
    { name: "Svelte / SvelteKit", level: 90 },
    { name: "React / Next.js", level: 80 },
    { name: "JavaScript / TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Astro", level: 70 },
  ],
  backend: [
    { name: "Node.js / Express", level: 90 },
    { name: "PostgreSQL / MySQL", level: 85 },
    { name: "REST API", level: 85 },
    { name: "Prisma", level: 80 },
    { name: "PHP / Symfony", level: 60 },
  ],
  tools: ["Git", "Docker", "Figma", "Illustrator", "Photoshop", "InDesign"],
  learning: ["Vue.js", "Ruby", "Supabase"],
};

const valuesData = [
  {
    title: { fr: "Qualité du code", en: "Code quality" },
    description: {
      fr: "Je crois fermement qu'un code propre et bien structuré est la base de tout projet réussi. Tests, documentation et maintenabilité sont mes priorités.",
      en: "I firmly believe that clean, well-structured code is the foundation of every successful project. Tests, documentation, and maintainability are my priorities.",
    },
  },
  {
    title: { fr: "Design soigné", en: "Careful design" },
    description: {
      fr: "L'attention aux détails fait la différence. Je travaille au pixel près pour créer des interfaces qui allient esthétique et fonctionnalité.",
      en: "Attention to detail makes the difference. I work pixel-perfect to create interfaces that combine aesthetics and functionality.",
    },
  },
  {
    title: { fr: "Performance", en: "Performance" },
    description: {
      fr: "Chaque milliseconde compte. J'optimise systématiquement mes applications pour offrir la meilleure expérience utilisateur possible.",
      en: "Every millisecond counts. I systematically optimize my applications to deliver the best possible user experience.",
    },
  },
  {
    title: { fr: "Communication", en: "Communication" },
    description: {
      fr: "Un projet réussi passe par une communication claire. Je m'assure de comprendre vos besoins et de vous tenir informé à chaque étape.",
      en: "A successful project requires clear communication. I make sure to understand your needs and keep you informed at every step.",
    },
  },
];

export const getValues = (locale = 'fr') =>
  valuesData.map((v) => ({
    title: v.title[locale] ?? v.title.fr,
    description: v.description[locale] ?? v.description.fr,
  }));

const experiencesData = [
  {
    id: 1,
    role: { fr: "Développeur Fullstack", en: "Fullstack Developer" },
    company: "Kollirama",
    companyUrl: "https://kollirama.fr",
    location: "Bernis, France",
    period: "2025 — Présent",
    description: {
      fr: "Développement fullstack de projets internes et refonte complète du site vitrine de l'entreprise. Conception et développement en autonomie d'applications web sur mesure.",
      en: "Full-stack development of internal projects and complete overhaul of the company's showcase website. Independent design and development of custom web applications.",
    },
    achievements: {
      fr: [
        "Refonte complète du site kollirama.fr en monorepo (site vitrine multilingue + back-office)",
        "Développement en totale autonomie, de la conception à la mise en production",
        "Création d'un back-office avec dashboard analytique, gestion des rôles et intégrations tierces",
        "Montée en compétences sur de nouvelles technologies (Astro, Prisma, Supabase)",
      ],
      en: [
        "Complete overhaul of kollirama.fr as a monorepo (multilingual showcase site + back-office)",
        "Full autonomous development, from conception to production deployment",
        "Creation of a back-office with analytics dashboard, role management, and third-party integrations",
        "Upskilling on new technologies (Astro, Prisma, Supabase)",
      ],
    },
    technologies: ["Astro", "Svelte", "Express.js", "Prisma", "Supabase", "PostgreSQL", "Tailwind", "TypeScript"],
  },
  {
    id: 2,
    role: { fr: "Développeur Fullstack", en: "Fullstack Developer" },
    company: "Igocreate",
    companyUrl: "https://igocreate.com",
    location: "Paris, France",
    period: "2024 — 2025",
    description: {
      fr: "Développement de projets internes et clients au sein d'une agence spécialisée dans les solutions web sur mesure. Contribution à la documentation technique des outils internes.",
      en: "Development of internal and client projects within an agency specializing in custom web solutions. Contribution to technical documentation of internal tools.",
    },
    achievements: {
      fr: [
        "Développement de la plateforme no-code Igowall (création de sites web)",
        "Contribution au développement d'Igotrack, outil de gestion de projet interne",
        "Développement d'une application de gestion de file d'attente (web & mobile)",
        "Rédaction de documentation pour le framework et le moteur de template internes",
      ],
      en: [
        "Development of the Igowall no-code platform (website creation)",
        "Contribution to the development of Igotrack, an internal project management tool",
        "Development of a queue management application (web & mobile)",
        "Writing documentation for the internal framework and template engine",
      ],
    },
    technologies: ["SvelteKit", "Node.js", "Express.js", "MySQL", "React Native", "Tailwind"],
  },
  {
    id: 3,
    role: { fr: "Graphiste", en: "Graphic Designer" },
    company: "Olivier Nonis",
    companyUrl: "https://graphevent.com",
    location: "Quincy-Voisins, France",
    period: "2023",
    description: {
      fr: "Stage en graphisme au sein d'un studio créatif. Création de supports de communication print et mise à jour de site web.",
      en: "Graphic design internship at a creative studio. Creation of print communication materials and website updates.",
    },
    achievements: {
      fr: [
        "Création de logos, affiches et flyers",
        "Utilisation de la suite Adobe (InDesign, Illustrator, Photoshop)",
        "Mise à jour d'un site WordPress (Elementor)",
      ],
      en: [
        "Creation of logos, posters, and flyers",
        "Use of the Adobe suite (InDesign, Illustrator, Photoshop)",
        "Updating a WordPress website (Elementor)",
      ],
    },
    technologies: ["InDesign", "Illustrator", "Photoshop", "WordPress", "Elementor"],
  },
];

export const getExperiences = (locale = 'fr') =>
  experiencesData.map((e) => ({
    ...e,
    role: e.role[locale] ?? e.role.fr,
    description: e.description[locale] ?? e.description.fr,
    achievements: e.achievements[locale] ?? e.achievements.fr,
  }));

const educationData = [
  {
    degree: { fr: "Mastère Expert en Informatique et SI", en: "Master's Expert in Computer Science and IS" },
    school: "EPSI, Montpellier",
    period: "2025 — 2027",
    description: { fr: "Spécialité Développement", en: "Web Development specialization" },
  },
  {
    degree: { fr: "BUT Métiers du Multimédia et de l'Internet", en: "BUT Multimedia and Internet Professions" },
    school: "Université Gustave Eiffel, IUT Meaux",
    period: "2022 — 2025",
    description: { fr: "Parcours Développement Web", en: "Web Development track" },
  },
];

export const getEducation = (locale = 'fr') =>
  educationData.map((e) => ({
    ...e,
    degree: e.degree[locale] ?? e.degree.fr,
    description: e.description[locale] ?? e.description.fr,
  }));
