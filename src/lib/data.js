const projectsData = [
  {
    id: 1,
    title: "Tiptap FontSize Extension",
    slug: "tiptap-fontsize-extension",
    year: "2024",
    type: "Frontend",
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
    type: "Benchmark",
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
    type: "Frontend",
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
    type: "Fullstack",
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
    type: "Discord",
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
    type: "Fullstack",
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
    type: "Fullstack",
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
    type: "Frontend",
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
    type: "Frontend",
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
  {
    id: 10,
    title: "FutureKawa",
    slug: "futurekawa",
    year: "2026",
    type: "Backend",
    description: {
      fr: "API de suivi multi-pays de stocks de café avec surveillance IoT.",
      en: "Multi-country coffee stock tracking API with IoT monitoring.",
    },
    longDescription: {
      fr: "Backend d'une application de suivi de stocks de café vert répartis sur trois pays (Brésil, Équateur, Colombie), développée en équipe dans le cadre d'un projet scolaire (MSPR). J'ai été responsable de la partie API et de la documentation technique. L'architecture repose sur un backend conteneurisé par pays (base de données, broker MQTT, API REST et microservice d'alerting dédiés), avec un backend central qui agrège les données des trois pays pour le frontend. Les capteurs IoT publient les mesures de température et d'humidité via MQTT, ce qui déclenche des alertes automatiques par e-mail en cas de dépassement de seuil.",
      en: "Backend for a green coffee stock tracking application spanning three countries (Brazil, Ecuador, Colombia), built as a team for a school project (MSPR). I was responsible for the API and the technical documentation. The architecture is built around a per-country containerized backend (dedicated database, MQTT broker, REST API and alerting microservice), with a central backend aggregating data from all three countries for the frontend. IoT sensors publish temperature and humidity readings over MQTT, automatically triggering email alerts when thresholds are exceeded.",
    },
    challenge: {
      fr: "Le principal défi était de corriger un mélange de données entre pays causé par une base de données partagée, en migrant vers une base dédiée par pays sans casser l'agrégation côté backend central. J'ai également extrait la logique d'alerting dans un microservice indépendant pour rester conforme à l'architecture demandée par le sujet, et mis en place Docker Compose pour démarrer toute la stack backend (bases, brokers MQTT, APIs, alerting, Mailpit pour les tests d'e-mails) en une seule commande. J'ai enfin rédigé l'ensemble du dossier technique du projet.",
      en: "The main challenge was fixing data bleed between countries caused by a shared database, by migrating to one dedicated database per country without breaking aggregation on the central backend. I also extracted the alerting logic into an independent microservice to stay aligned with the architecture required by the project brief, and set up Docker Compose to start the entire backend stack (databases, MQTT brokers, APIs, alerting, Mailpit for email testing) with a single command. I also wrote the project's full technical documentation.",
    },
    technologies: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "MQTT", "Docker"],
    image: ["/images/projects/futurekawa/futurekawa.png"],
    link: "https://github.com/itsarnaud/FutureKawa",
    category: {
      fr: "Projet de cours",
      en: "School project",
    },
  },
  {
    id: 11,
    title: "Quested",
    slug: "quested",
    year: "2026",
    type: "Fullstack",
    description: {
      fr: "Tracker de jeux vidéo façon Letterboxd.",
      en: "Letterboxd-style video game tracker.",
    },
    longDescription: {
      fr: "Application façon Letterboxd pour suivre ses jeux vidéo, gratuite, sans publicité et open source. La recherche importe automatiquement les jeux depuis IGDB et RAWG (avec déduplication par titre et année), et chaque jeu peut être logué avec un statut, une note sur 10 à la décimale près et un avis texte, avec filtres par genre, plateforme et année. Chaque compte a un profil public avec ses jeux (paginés par statut), ses avis, ses likes et des listes personnalisées, plus 4 jeux favoris épinglés. Un système de follow alimente un fil d'activité avec des recommandations basées sur les notes de ses abonnements et un score de compatibilité de goûts entre joueurs, complété par des notifications (follows, likes) et un rate limiting sur les endpoints publics. Disponible en français et en anglais, projet personnel toujours en développement actif.",
      en: "Letterboxd-style app for tracking video games, free, ad-free and open source. Search automatically imports games from IGDB and RAWG (deduplicated by title and year), and each game can be logged with a status, a rating out of 10 to the decimal, and a text review, with filters by genre, platform and year. Every account has a public profile with its games (paginated by status), reviews, likes and custom lists, plus 4 pinned favorite games. A follow system powers an activity feed with recommendations based on your follows' ratings and a taste-compatibility score between players, backed by notifications (follows, likes) and rate limiting on public endpoints. Available in French and English, a personal project still under active development.",
    },
    challenge: {
      fr: "Le principal défi était de fiabiliser l'import de jeux depuis deux sources externes (IGDB et RAWG) en évitant les doublons, en les rapprochant par titre et année plutôt que par identifiant exact. J'ai aussi mis en place l'authentification via Google et Discord avec possibilité de lier les deux à un même compte, ainsi qu'un système de suivi, de likes et de notifications en temps réel. Le tout repose sur une architecture pensée pour la sécurité et la scalabilité : rate limiting via Upstash Redis sur les endpoints publics, headers de sécurité, et une base Postgres sur Neon avec la région du serveur Vercel alignée pour éviter la latence réseau.",
      en: "The main challenge was making game imports from two external sources (IGDB and RAWG) reliable while avoiding duplicates, matching games by title and year rather than exact ID. I also built authentication via Google and Discord with the ability to link both to the same account, plus a follow, like and real-time notification system. The whole thing is built with security and scalability in mind: rate limiting via Upstash Redis on public endpoints, security headers, and a Postgres database on Neon with the Vercel server region aligned to avoid network latency.",
    },
    technologies: ["Next.js", "TypeScript", "Prisma", "tRPC", "PostgreSQL", "Auth.js", "Upstash Redis", "Tailwind"],
    image: ["/images/projects/quested/Quested.png"],
    link: "https://quested.cc",
    category: {
      fr: "Projet perso",
      en: "Personal project",
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

const blogPostsData = [
  {
    id: 1,
    title: {
      fr: "Loi interdisant les réseaux sociaux aux moins de 15 ans : une bonne idée qui m'interroge",
      en: "The new law banning social media for under-15s: good news, but it raises a question",
    },
    slug: "loi-reseaux-sociaux-mineurs-15-ans",
    date: "2026-07-28",
    excerpt: {
      fr: "Le Parlement vient d'adopter la loi interdisant les réseaux sociaux aux moins de 15 ans. Une bonne nouvelle pour protéger les enfants, sauf qu'il y a un truc qui me turlupine.",
      en: "Parliament just passed a law banning social media for under-15s. Great news to protect children, except there's something bugging me about it.",
    },
    content: {
      fr: "Le Parlement vient d'adopter la loi interdisant les réseaux sociaux aux moins de 15 ans. Une bonne nouvelle pour protéger les enfants.\n\nSauf qu'il y a un truc qui me turlupine.\n\nPour vérifier l'âge des utilisateurs, les plateformes vont devoir mettre en place des systèmes d'identification. Concrètement, ça veut dire que tout le monde, pas seulement les mineurs, devra prouver son identité pour créer un compte.\n\nEt c'est là que ça coince.\n\nDepuis le début de l'année 2026, la France a cumulé plus de 300 services piratés et 250 millions de données exposées. La CNIL a recensé plus de 8 600 violations de données en un an, soit une fuite par heure. On est aujourd'hui le pays le plus attaqué d'Europe.\n\nAlors oui, protéger les enfants c'est essentiel. Mais confier ses documents d'identité à des plateformes dont la sécurité est loin d'être garantie, c'est un vrai sujet.\n\nLa question c'est pas \"faut-il protéger les mineurs ?\", bien sûr que oui. La question c'est \"comment on fait ça sans exposer tout le monde ?\"",
      en: "Parliament just passed a law banning social media for under-15s. Great news to protect children.\n\nExcept there's something bugging me about it.\n\nTo verify users' age, platforms will have to set up identification systems. In practice, that means everyone, not just minors, will have to prove their identity to create an account.\n\nAnd that's where it gets tricky.\n\nSince the start of 2026, France has racked up over 300 hacked services and 250 million exposed records. The CNIL recorded more than 8,600 data breaches in a year, roughly one leak per hour. We're now the most attacked country in Europe.\n\nSo yes, protecting children is essential. But handing over ID documents to platforms whose security is far from guaranteed is a real issue.\n\nThe question isn't \"should we protect minors?\", of course we should. The question is \"how do we do it without exposing everyone?\"",
    },
    linkedinUrl: "https://www.linkedin.com/posts/royer-arnaud_le-parlement-vient-dadopter-la-loi-interdisant-activity-7487764636348469248-UuhV",
    tags: ["RGPD", "Société", "Cybersécurité"],
  },
  {
    id: 2,
    title: {
      fr: "WebDev Arena : le classement des IA n'a jamais été aussi serré",
      en: "WebDev Arena: the AI rankings have never been this tight",
    },
    slug: "webdev-arena-classement-ia-juillet-2026",
    date: "2026-07-25",
    excerpt: {
      fr: "La WebDev Arena c'est un classement où des modèles d'IA s'affrontent sur des tâches de dev web, notés à l'aveugle par des humains. Juillet 2026, c'est peut-être le plus serré depuis le début.",
      en: "WebDev Arena is a leaderboard where AI models compete on web dev tasks, blind-rated by humans. July 2026 might be the tightest race yet.",
    },
    content: {
      fr: "La WebDev Arena c'est un classement où des modèles d'IA s'affrontent sur des tâches de dev web, notés à l'aveugle par des humains. Chaque mois le classement bouge et juillet 2026 c'est peut-être le plus serré depuis le début !\n\nClaude Fable 5 reste en tête, mais GPT-5.6 revient fort et prend la première place sur React. Grok lui cartonne en HTML. Les modèles chinois comme GLM 5.2 progressent aussi et commencent à s'installer dans le top.\n\nCe qui m'intéresse là-dedans c'est que les résultats changent selon la techno. Il n'y a pas un seul modèle qui écrase tout partout. Ça veut dire que choisir son outil IA en fonction de ce sur quoi on bosse a vraiment du sens.\n\nEn React je teste GPT, pour le reste j'utilise surtout Claude. Et vous, vous utilisez quoi pour coder ?",
      en: "WebDev Arena is a leaderboard where AI models compete on web dev tasks, blind-rated by humans. The ranking shifts every month, and July 2026 might be the tightest race yet!\n\nClaude Fable 5 stays on top, but GPT-5.6 is coming back strong and takes the lead on React. Grok is crushing it on HTML. Chinese models like GLM 5.2 are also progressing and starting to break into the top.\n\nWhat interests me here is that results shift depending on the tech stack. No single model dominates everywhere. That means choosing your AI tool based on what you're actually working on really makes sense.\n\nFor React I test GPT, for everything else I mostly use Claude. What about you, what do you use to code?",
    },
    linkedinUrl: "https://www.linkedin.com/posts/royer-arnaud_developpementweb-ia-react-activity-7486345639900028930-qsSG",
    tags: ["IA", "React", "DeveloppementWeb"],
  },
  {
    id: 3,
    title: {
      fr: "Lancement du nouveau site de l'Atelier Maha",
      en: "Launching Atelier Maha's new website",
    },
    slug: "lancement-site-atelier-maha",
    date: "2026-05-28",
    excerpt: {
      fr: "C'est avec beaucoup de plaisir que je vous présente le nouveau site de l'Atelier Maha, studio d'architecture d'intérieur. Ma première réalisation en tant que freelance.",
      en: "I'm delighted to present the new website for Atelier Maha, an interior design studio, and my first freelance client project.",
    },
    content: {
      fr: "C'est avec beaucoup de plaisir que je vous présente le nouveau site de l'Atelier Maha, studio d'architecture d'intérieur.\n\nPour cette première réalisation client, l'enjeu était de concevoir une vitrine entièrement sur mesure, en parfaite adéquation avec l'identité du studio.\n\nLe projet a été mené en étroite collaboration avec la cliente afin que chaque choix graphique et ergonomique reflète précisément son approche métier. L'ensemble du design, ainsi que la sélection des textes et des visuels, ont été pensés pour assurer une cohérence totale avec l'image de l'Atelier Maha.\n\nMon rôle a consisté à l'accompagner dans la traduction de son expertise en une expérience web fluide. De la présentation des prestations à la mise en valeur du portfolio, le site a été structuré pour offrir une navigation agréable et intuitive.\n\nJe remercie l'Atelier Maha pour la confiance accordée lors de cette belle collaboration créative et technique.\n\nLe site est consultable à l'adresse suivante : https://ateliermaha.fr",
      en: "I'm delighted to present the new website for Atelier Maha, an interior design studio.\n\nFor this first client project, the challenge was to design a fully custom showcase site, in perfect alignment with the studio's identity.\n\nThe project was carried out in close collaboration with the client so that every graphic and UX choice precisely reflected her professional approach. The overall design, as well as the selection of copy and visuals, were crafted to ensure total consistency with Atelier Maha's image.\n\nMy role was to help translate her expertise into a smooth web experience. From presenting services to showcasing the portfolio, the site was structured to offer pleasant, intuitive navigation.\n\nThanks to Atelier Maha for the trust placed in me during this great creative and technical collaboration.\n\nThe site is live at: https://ateliermaha.fr",
    },
    linkedinUrl: "https://www.linkedin.com/posts/royer-arnaud_developpementweb-developpeur-freelance-activity-7465295802664611840-xE7M",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Freelance"],
  },
  {
    id: 4,
    title: {
      fr: "\"Le métier de développeur est foutu, passe sur Replit\"",
      en: "\"The developer job is dead, switch to Replit\"",
    },
    slug: "developpeur-foutu-ia-replit",
    date: "2026-02-28",
    excerpt: {
      fr: "C'est une phrase que j'ai entendue récemment lors d'une discussion sur la refonte d'un projet web. On m'a suggéré le plus sérieusement du monde de tout supprimer et refaire avec Replit et l'IA.",
      en: "A sentence I recently heard during a discussion about a web project revamp. I was seriously told to delete everything and rebuild it with Replit and AI.",
    },
    content: {
      fr: "\"Le métier de développeur est foutu, passe sur Replit\" 🤯\n\nC'est une phrase que j'ai entendue récemment lors d'une discussion sur la refonte d'un projet web.\n\nUn peu de contexte : je travaille sur un projet de refonte d'un site avec un objectif de performance et de référencement.\n\nAlors que je m'attendais à débattre d'architecture ou de SEO, on m'a suggéré le plus sérieusement du monde :\n\n« Tu te compliques la vie. Le métier de dev est fini. Supprime tout et refais-le avec Replit et l'IA. »\n\nJ'ai cru à une blague.\n\nOn me suggère sérieusement de remplacer une architecture SSR optimisée, sécurisée et propriétaire… par un environnement de prototypage cloud généré par IA ?\n\nC'est comme demander à un architecte de raser une maison en briques pour la reconstruire en Lego « parce que c'est plus rapide ».\n\nL'IA est un outil formidable, Replit est super pour prototyper. Mais confondre « générer du code » et « construire une architecture », c'est la preuve qu'on a plus que jamais besoin de développeurs qui comprennent ce qu'ils font.\n\nLe « vieux monde » du code a encore de beaux jours devant lui. 🚀",
      en: "\"The developer job is dead, switch to Replit\" 🤯\n\nA sentence I recently heard during a discussion about a web project revamp.\n\nSome context: I'm working on revamping a website with a performance and SEO goal.\n\nWhile I expected to debate architecture or SEO, I was told, dead serious:\n\n\"You're overcomplicating things. The dev job is over. Delete everything and rebuild it with Replit and AI.\"\n\nI thought it was a joke.\n\nI'm seriously being told to replace an optimized, secure, proprietary SSR architecture… with an AI-generated cloud prototyping environment?\n\nIt's like asking an architect to tear down a brick house to rebuild it in Lego \"because it's faster\".\n\nAI is a fantastic tool, Replit is great for prototyping. But confusing \"generating code\" with \"building an architecture\" is proof that we need developers who understand what they're doing more than ever.\n\nThe \"old world\" of code still has good days ahead. 🚀",
    },
    linkedinUrl: "https://www.linkedin.com/posts/royer-arnaud_developpementweb-ia-hype-share-7425695272032157696-ZM9Q",
    tags: ["IA", "DeveloppementWeb"],
  },
  {
    id: 5,
    title: {
      fr: "Quested, mon tracker de jeux vidéo façon Letterboxd",
      en: "Quested, my Letterboxd-style video game tracker",
    },
    slug: "lancement-quested",
    date: "2026-07-29",
    excerpt: {
      fr: "Je viens de sortir un projet perso : Quested, un site pour suivre les jeux vidéo auxquels on joue. L'idée m'est venue en utilisant Letterboxd pour les films.",
      en: "I just released a personal project: Quested, a site to track the video games you play. The idea came from using Letterboxd for movies.",
    },
    content: {
      fr: "Je viens de sortir un projet perso : Quested, un site pour suivre les jeux vidéo auxquels on joue.\n\nL'idée m'est venue en utilisant Letterboxd pour les films. Il n'existait pas vraiment d'équivalent pour les jeux qui me convenait, alors j'ai construit le mien, à ma sauce, et surtout pour apprendre en le faisant de A à Z.\n\nConcrètement on peut logger ses jeux, les noter, écrire des avis et suivre d'autres joueurs pour voir ce qu'ils jouent. Il y a aussi des trucs plus sympa comme un système de recommandations ou un comparateur de goûts entre profils, et plein d'autres petits détails que j'ai pris plaisir à construire.\n\nCôté tech, c'est du Next.js, TypeScript, Prisma et tRPC. Gratuit, sans pub, open source.\n\nJe le développe encore activement, donc si vous voulez tester et me remonter ce qui manque ou ce qui casse, ça m'aide beaucoup !\n\nC'est par ici : quested.cc :D",
      en: "I just released a personal project: Quested, a site to track the video games you play.\n\nThe idea came from using Letterboxd for movies. There wasn't really an equivalent for games that suited me, so I built my own, my way, and mostly to learn by doing it from A to Z.\n\nConcretely, you can log your games, rate them, write reviews and follow other players to see what they're playing. There are also some nicer touches like a recommendation system or a taste-compatibility comparator between profiles, plus plenty of other little details I enjoyed building.\n\nOn the tech side, it's Next.js, TypeScript, Prisma and tRPC. Free, ad-free, open source.\n\nI'm still actively developing it, so if you want to test it and report what's missing or broken, it helps a lot!\n\nIt's over here: quested.cc :D",
    },
    linkedinUrl: "https://www.linkedin.com/posts/royer-arnaud_quested-share-7488157952059629568-ZIox",
    tags: ["Next.js", "DeveloppementWeb", "Projet perso"],
  },
  {
      id: 6,
      title: {
        fr: "Petit update sur Quested : liaison de compte Steam",
        en: "Small update on Quested: Steam account linking",
      },
      slug: "update-quested-steam",
      date: "2026-08-03",
      excerpt: {
        fr: "Nouvelle grosse feature sur Quested : la liaison de compte Steam. Importez automatiquement votre bibliothèque, votre temps de jeu et vos succès sans rien logger à la main !",
        en: "New big feature on Quested: Steam account linking. Automatically import your library, playtime, and achievements without logging anything manually!",
      },
      content: {
        fr: "Petit update sur Quested !\n\nJ'adore continuer à bricoler ce projet le soir. Dernier grosse feature : la liaison de compte Steam. Une fois connecté, ta bibliothèque et ton temps de jeu s'importent automatiquement, avec tes succès en plus ! Si tu joues sur Steam, tu peux commencer à utiliser Quested sans rien logger à la main, tout est déjà là.\n\nJ'aurais bien aimé faire pareil avec PSN, Xbox ou Epic Games, mais ça n'arrivera pas... Ces plateformes n'ont pas d'API publique pour ça. Il existe des méthodes non-officielles mais elles reposent sur du reverse engineering et ça met les comptes des joueurs en risque de ban. Pas question de faire prendre ce risque à qui que ce soit !\n\nSteam restera donc probablement la seule plateforme importable pour l'instant.\n\nSinon le site continue d'avancer, plein de petits ajustements toutes les semaines. Toujours gratuit, sans pub, open source.\n\nC'est par ici : quested.cc :D",
        en: "Small update on Quested!\n\nI love continuing to tinker with this project in the evenings. Latest big feature: Steam account linking. Once connected, your library and playtime are imported automatically, along with your achievements! If you play on Steam, you can start using Quested without logging anything manually, everything is already there.\n\nI would have loved to do the same with PSN, Xbox or Epic Games, but that won't happen... These platforms don't have a public API for this. There are unofficial methods, but they rely on reverse engineering and that puts players' accounts at risk of being banned. No way I'm making anyone take that risk!\n\nSo Steam will probably remain the only importable platform for now.\n\nOtherwise the site keeps moving forward, lots of little tweaks every week. Still free, ad-free, open source.\n\nIt's over here: quested.cc :D",
      },
      linkedinUrl: "https://www.linkedin.com/posts/royer-arnaud_quested-share-7489953231771615232-jYLx",
      tags: ["Quested", "Steam", "Projet perso"],
    }
];

export const getBlogPosts = (locale = 'fr') =>
  blogPostsData
    .map((p) => ({
      ...p,
      title: p.title[locale] ?? p.title.fr,
      excerpt: p.excerpt[locale] ?? p.excerpt.fr,
      content: p.content[locale] ?? p.content.fr,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

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
    id: 0,
    role: { fr: "Développeur Fullstack Indépendant", en: "Freelance Fullstack Developer" },
    company: "Indépendant",
    companyUrl: null,
    location: "Montpellier, France",
    period: "2026 — Présent",
    description: {
      fr: "Activité freelance menée en parallèle de l'alternance. Création d'applications web sur mesure de A à Z, de l'analyse des besoins à la mise en production.",
      en: "Freelance activity carried out alongside the apprenticeship. Creation of custom web applications from A to Z, from needs analysis to production deployment.",
    },
    achievements: {
      fr: [
        "Analyse des besoins et conseil client",
        "Conception et développement d'applications web sur mesure",
        "Intégration UX/UI et responsive design",
      ],
      en: [
        "Needs analysis and client advisory",
        "Design and development of custom web applications",
        "UX/UI integration and responsive design",
      ],
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
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
