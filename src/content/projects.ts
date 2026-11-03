import type { Project } from './types';

const img = (slug: string, file: string) => `/images/projects/${slug}/${file}.webp`;

/**
 * Les projets, du N°1 (le plus ancien) au N°12.
 * L'ordre du tableau n'a pas d'importance : getProjects() trie par numéro décroissant.
 */
const projects: Project[] = [
  {
    number: 1,
    slug: 'tiptap-fontsize-extension',
    title: 'Tiptap FontSize',
    year: 2024,
    kind: 'open-source',
    category: 'open-source',
    color: 'rose',
    badge: { fr: '6 étoiles sur GitHub', en: '6 stars on GitHub' },
    url: 'https://github.com/itsarnaud/tiptap-fontsize-extension',
    description: {
      fr: 'Une extension Tiptap pour régler la taille du texte, publiée sur npm.',
      en: 'A Tiptap extension to set the text size, published on npm.',
    },
    tagline: {
      fr: "Régler la taille du texte dans Tiptap, avec plus d'options que l'extension officielle.",
      en: 'Set the text size in Tiptap, with more options than the official extension.',
    },
    format: { fr: 'Extension open source', en: 'Open source extension' },
    team: { fr: 'Seul', en: 'Solo' },
    about: {
      fr: [
        "Une extension pour l'éditeur Tiptap qui permet de régler la taille du texte. On peut choisir une taille précise, l'augmenter ou la diminuer par paliers, et récupérer la taille actuelle.",
        "Elle va plus loin que l'extension officielle : la taille par défaut et les paliers se configurent. Elle est publiée sur npm.",
      ],
      en: [
        'An extension for the Tiptap editor to set the text size. You can pick an exact size, make it bigger or smaller step by step, and read the current size.',
        'It goes further than the official extension: the default size and the steps are configurable. It is published on npm.',
      ],
    },
    challenge: {
      fr: [
        'Faire plus que la version officielle tout en restant simple à utiliser. Il fallait gérer les sélections de texte multiples et rester compatible avec les autres extensions Tiptap.',
        "Une API claire et une doc propre ont fait le reste : l'extension a été reprise par d'autres devs.",
      ],
      en: [
        'Do more than the official version while staying simple to use. I had to handle multiple text selections and stay compatible with the other Tiptap extensions.',
        'A clear API and clean docs did the rest: other devs picked it up.',
      ],
    },
    highlights: {
      fr: ['Publiée sur npm', '6 étoiles', "Plus complète que l'officielle"],
      en: ['Published on npm', '6 stars', 'More complete than the official one'],
    },
    stack: ['JavaScript', 'Tiptap'],
    technologies: ['JavaScript', 'Tiptap'],
    media: { poster: img('tiptap-fontsize-extension', 'poster'), gallery: [] },
  },
  {
    number: 2,
    slug: 'benchmark',
    title: 'Template Bench',
    year: 2024,
    kind: 'open-source',
    category: 'internship',
    color: 'citron',
    url: 'https://github.com/itsarnaud/template-engine-bench',
    description: {
      fr: "Un benchmark des moteurs de template JavaScript : Pug, EJS, Handlebars et d'autres.",
      en: 'A benchmark of JavaScript template engines: Pug, EJS, Handlebars and more.',
    },
    tagline: {
      fr: 'Quel moteur de template JavaScript est le plus rapide ?',
      en: 'Which JavaScript template engine is the fastest?',
    },
    format: { fr: 'Outil open source', en: 'Open source tool' },
    team: { fr: 'Seul, avec des contributions externes', en: 'Solo, with outside contributions' },
    about: {
      fr: [
        'Un benchmark open source qui compare la vitesse de rendu des moteurs de template JavaScript : Pug, EJS, Handlebars, Liquid, Eta, Dust et Igodust.',
        'Il lance une série de tests (boucles, conditions, échappement HTML) et écrit les résultats directement dans le README. Ajouter un nouveau moteur prend quelques lignes.',
      ],
      en: [
        'An open source benchmark that compares the rendering speed of JavaScript template engines: Pug, EJS, Handlebars, Liquid, Eta, Dust and Igodust.',
        'It runs a set of tests (loops, conditions, HTML escaping) and writes the results straight into the README. Adding a new engine takes a few lines.',
      ],
    },
    challenge: {
      fr: [
        "Mesurer de façon juste des moteurs qui ont des syntaxes et des fonctionnements très différents, avec des résultats qu'on peut reproduire.",
        "Le projet devait aussi être facile à étendre, pour que d'autres devs ajoutent leur moteur. Il a eu 10 étoiles et des contributions externes.",
      ],
      en: [
        'Fairly measure engines with very different syntaxes and inner workings, with results anyone can reproduce.',
        'The project also had to be easy to extend, so other devs could add their own engine. It got 10 stars and outside contributions.',
      ],
    },
    highlights: {
      fr: ['7 moteurs comparés', '10 étoiles', 'Contributions externes'],
      en: ['7 engines compared', '10 stars', 'Outside contributions'],
    },
    stack: ['JavaScript'],
    technologies: ['JavaScript', 'Node.js'],
    media: { poster: img('benchmark', 'poster'), gallery: [] },
  },
  {
    number: 3,
    slug: 'igowall',
    title: 'Igowall',
    year: 2024,
    kind: 'frontend',
    category: 'work-study',
    color: 'violet',
    url: 'https://www.igowall.com',
    description: {
      fr: 'Une plateforme no-code pour créer son site internet.',
      en: 'A no-code platform to build your own website.',
    },
    tagline: {
      fr: 'Créer son site sans écrire une ligne de code.',
      en: 'Build your website without writing a line of code.',
    },
    format: { fr: 'Plateforme SaaS', en: 'SaaS platform' },
    team: { fr: "En équipe, à l'agence", en: 'As a team, at the agency' },
    about: {
      fr: [
        'Igowall permet de créer son site sans savoir coder : on assemble des blocs, on choisit ses couleurs, ses polices et son logo, et on peut tout modifier depuis son téléphone.',
        'Il y a aussi les réglages SEO et les intégrations (Google Analytics, Facebook Pixel, Hotjar), et on peut gérer plusieurs sites depuis le même compte.',
      ],
      en: [
        'Igowall lets you build a website without knowing how to code: you stack blocks, pick your colors, fonts and logo, and you can edit everything from your phone.',
        'It also has SEO settings and integrations (Google Analytics, Facebook Pixel, Hotjar), and you can manage several sites from the same account.',
      ],
    },
    challenge: {
      fr: [
        "J'étais chargé de la refonte visuelle de la plateforme et de nouvelles fonctionnalités. Il fallait moderniser l'interface sans perdre ce qui fait sa force : elle est simple.",
        "Chaque nouvelle fonctionnalité devait rester facile à comprendre pour quelqu'un qui n'a jamais fait de site.",
      ],
      en: [
        'I was in charge of the visual redesign of the platform and of new features. The interface had to feel modern without losing what makes it good: it is simple.',
        'Every new feature had to stay easy to understand for someone who has never built a website.',
      ],
    },
    highlights: {
      fr: ['Refonte visuelle', 'Éditeur par blocs', 'No-code'],
      en: ['Visual redesign', 'Block editor', 'No-code'],
    },
    stack: ['SvelteKit', 'Node.js', 'MySQL'],
    technologies: ['SvelteKit', 'Node.js', 'MySQL', 'Tailwind'],
    media: {
      poster: img('igowall', 'poster'),
      phone: img('igowall', 'home-mobile'),
      gallery: [
        { src: img('igowall', 'home-desktop'), alt: { fr: "La page d'accueil", en: 'The home page' } },
        { src: img('igowall', 'gallery-1'), alt: { fr: "Le choix d'un modèle", en: 'Picking a template' } },
        { src: img('igowall', 'gallery-2'), alt: { fr: "L'éditeur", en: 'The editor' } },
        { src: img('igowall', 'gallery-3'), alt: { fr: "Un site en cours d'édition", en: 'A site being edited' } },
        { src: img('igowall', 'home-mobile'), portrait: true, alt: { fr: 'Sur mobile', en: 'On mobile' } },
      ],
    },
  },
  {
    number: 4,
    slug: 'foliode',
    title: 'Foliode',
    year: 2025,
    kind: 'fullstack',
    category: 'school',
    color: 'soleil',
    url: 'https://github.com/itsarnaud/Foliode',
    description: {
      fr: 'Un générateur de portfolio en ligne.',
      en: 'An online portfolio generator.',
    },
    tagline: {
      fr: 'Un portfolio en ligne pour chaque étudiant, en quelques étapes.',
      en: 'An online portfolio for every student, in a few steps.',
    },
    format: { fr: 'Appli web fullstack', en: 'Fullstack web app' },
    team: { fr: 'Équipe de 5, chef de projet', en: 'Team of 5, project lead' },
    about: {
      fr: [
        'Un projet de cours à cinq : un générateur de portfolio pour les étudiants. On remplit un formulaire étape par étape, on choisit un template et on obtient son portfolio en ligne, sur son propre sous-domaine (pseudo.foliode.com).',
        'Le site a aussi des éléments 3D interactifs, modélisés dans Blender et affichés avec Three.js.',
      ],
      en: [
        'A school project with five of us: a portfolio generator for students. You fill in a step-by-step form, pick a template and get your portfolio online, on your own subdomain (username.foliode.com).',
        'The site also has interactive 3D elements, modeled in Blender and displayed with Three.js.',
      ],
    },
    challenge: {
      fr: [
        "J'étais chef de projet et Scrum Master, en plus de coder. Il fallait faire avancer l'équipe et ma propre partie en même temps.",
        'Côté technique, le plus dur a été de mettre en place les sous-domaines dynamiques pour héberger chaque portfolio, avec Next.js en front, Symfony en back et le tout dans Docker.',
      ],
      en: [
        'I was project lead and Scrum Master, on top of coding. I had to keep the team moving and my own part going at the same time.',
        'On the tech side, the hardest part was setting up dynamic subdomains to host every portfolio, with Next.js on the front, Symfony on the back and everything in Docker.',
      ],
    },
    highlights: {
      fr: ['Équipe de 5', 'Scrum Master', '3D avec Three.js'],
      en: ['Team of 5', 'Scrum Master', '3D with Three.js'],
    },
    stack: ['Next.js', 'Symfony', 'PostgreSQL'],
    technologies: ['Next.js', 'TypeScript', 'Symfony', 'PostgreSQL', 'Three.js', 'Docker', 'Tailwind'],
    media: { poster: img('foliode', 'poster'), gallery: [] },
  },
  {
    number: 5,
    slug: 'stellarica',
    title: 'Stellarica',
    year: 2025,
    kind: 'bot',
    category: 'personal',
    color: 'tomate',
    url: 'https://github.com/itsarnaud/Stellarica',
    description: {
      fr: 'Un bot de modération pour serveurs Discord.',
      en: 'A moderation bot for Discord servers.',
    },
    tagline: {
      fr: 'Les outils de modération essentiels, dans un bot Discord.',
      en: 'The essential moderation tools, in a Discord bot.',
    },
    format: { fr: 'Bot Discord', en: 'Discord bot' },
    team: { fr: 'Seul', en: 'Solo' },
    about: {
      fr: [
        "Stellarica est un bot de modération pour Discord, fait avec Discord.js 14. Il donne aux admins et aux modos les outils de base : ban, kick, mute et warn, avec l'historique des sanctions.",
        'Tout passe par des commandes slash, et les données sont stockées dans MySQL avec Prisma.',
      ],
      en: [
        'Stellarica is a moderation bot for Discord, built with Discord.js 14. It gives admins and mods the basic tools: ban, kick, mute and warn, with a history of every sanction.',
        'Everything goes through slash commands, and the data is stored in MySQL with Prisma.',
      ],
    },
    challenge: {
      fr: [
        "Éviter de charger tous les membres du serveur au démarrage. Le bot n'enregistre un membre que quand il en a besoin, ce qui le garde rapide même sur un gros serveur.",
        "J'ai rangé le code par modules (commandes, événements, utilitaires), chacun de son côté, avec une vraie gestion des erreurs.",
      ],
      en: [
        'Avoid loading every server member at startup. The bot only saves a member when it needs to, which keeps it fast even on a big server.',
        'I split the code into modules (commands, events, utilities), each on its own, with proper error handling.',
      ],
    },
    highlights: {
      fr: ['Commandes slash', 'Historique des sanctions', 'Discord.js 14'],
      en: ['Slash commands', 'Sanction history', 'Discord.js 14'],
    },
    stack: ['Discord.js', 'Prisma'],
    technologies: ['Discord.js', 'JavaScript', 'Prisma', 'MySQL'],
    media: { poster: img('stellarica', 'poster'), gallery: [] },
  },
  {
    number: 6,
    slug: 'igotrack',
    title: 'Igotrack',
    year: 2025,
    kind: 'fullstack',
    category: 'work-study',
    color: 'blanc',
    url: 'https://igotrack.co',
    description: {
      fr: "Une appli web de gestion de projet, utilisée en interne par l'agence.",
      en: 'A project management web app, used in-house by the agency.',
    },
    tagline: {
      fr: "L'outil de gestion de projet fait maison de l'agence.",
      en: "The agency's homemade project management tool.",
    },
    format: { fr: 'Appli web fullstack', en: 'Fullstack web app' },
    team: { fr: "En équipe, à l'agence", en: 'As a team, at the agency' },
    about: {
      fr: [
        'Chez Igocreate, on trouvait Jira et Linear trop lourds pour notre façon de travailler. Alors on a fait notre propre outil.',
        "Igotrack sert à suivre l'avancée des projets, à répartir les tâches et à voir les priorités d'un coup d'œil. J'ai travaillé sur le front et sur le back.",
      ],
      en: [
        'At Igocreate, we found Jira and Linear too heavy for the way we worked. So we built our own tool.',
        'Igotrack tracks project progress, splits up the tasks and shows the priorities at a glance. I worked on both the front and the back.',
      ],
    },
    challenge: {
      fr: [
        "Faire un outil qui colle vraiment à nos besoins sans refaire la complexité des outils qu'on voulait quitter. Il fallait trouver le bon équilibre entre simple et complet.",
        "C'était aussi l'occasion d'apprendre à travailler à plusieurs sur le même code.",
      ],
      en: [
        'Build a tool that really fits our needs without bringing back the complexity of the tools we wanted to leave. It had to be both simple and complete.',
        'It was also a chance to learn how to work with others on the same codebase.',
      ],
    },
    highlights: {
      fr: ['Fait en équipe', 'Front et back', 'Utilisé en interne'],
      en: ['Team project', 'Front and back', 'Used in-house'],
    },
    stack: ['SvelteKit', 'Node.js', 'MySQL'],
    technologies: ['SvelteKit', 'Node.js', 'MySQL', 'Tailwind'],
    media: { poster: img('igotrack', 'poster'), gallery: [] },
  },
  {
    number: 7,
    slug: 'kollirama',
    title: 'Kollirama',
    year: 2026,
    kind: 'fullstack',
    category: 'work-study',
    color: 'cobalt',
    url: 'https://kollirama.fr',
    description: {
      fr: 'Refonte du site vitrine en trois langues et de son back-office, en solo.',
      en: 'A redesign of the showcase site, in three languages, and of its back-office. Solo.',
    },
    tagline: {
      fr: 'Le site et le back-office de Kollirama, refaits de A à Z.',
      en: "Kollirama's website and back-office, rebuilt from A to Z.",
    },
    format: { fr: 'Site vitrine et back-office', en: 'Showcase site and back-office' },
    team: { fr: 'Seul, de A à Z', en: 'Solo, from A to Z' },
    about: {
      fr: [
        "Kollirama aménage des magasins et des entrepôts. J'y suis en alternance et je suis le seul dev, donc j'ai refait leur site de A à Z.",
        "C'est un monorepo avec le site vitrine en trois langues et un back-office. Le site a des formulaires de contact, de rappel et de téléchargement de catalogues, avec des mails envoyés automatiquement.",
        "Le back-office a un tableau de bord avec les stats, la gestion des utilisateurs et des rôles, la synchro des posts LinkedIn, un générateur de signatures mail et l'export des contacts en CSV.",
      ],
      en: [
        "Kollirama fits out shops and warehouses. I'm a work-study student there and the only dev, so I rebuilt their website from A to Z.",
        "It's a monorepo with the showcase site in three languages and a back-office. The site has contact, callback and catalog download forms, with emails sent automatically.",
        'The back-office has a stats dashboard, user and role management, LinkedIn post sync, an email signature generator and a CSV export of the contacts.',
      ],
    },
    challenge: {
      fr: [
        "Je n'avais jamais utilisé Astro, Prisma, Supabase ni MJML. J'ai dû concevoir toute l'architecture en apprenant ces outils en même temps.",
        "Pour la connexion au back-office, j'ai mis en place l'OAuth LinkedIn et des jetons JWT signés en RS256, rangés dans des cookies sécurisés.",
      ],
      en: [
        'I had never used Astro, Prisma, Supabase or MJML. I had to design the whole architecture while learning these tools at the same time.',
        'To log into the back-office, I set up LinkedIn OAuth and JWT tokens signed with RS256, stored in secure cookies.',
      ],
    },
    highlights: {
      fr: ['Monorepo', 'OAuth LinkedIn', 'JWT RS256'],
      en: ['Monorepo', 'LinkedIn OAuth', 'JWT RS256'],
    },
    stack: ['Astro', 'Svelte', 'Prisma', 'Supabase'],
    technologies: ['Astro', 'Svelte', 'TypeScript', 'Express', 'Prisma', 'Supabase', 'PostgreSQL', 'MJML', 'Tailwind'],
    media: {
      poster: img('kollirama', 'poster'),
      phone: img('kollirama', 'home-mobile'),
      gallery: [
        { src: img('kollirama', 'home-desktop'), alt: { fr: "La page d'accueil", en: 'The home page' } },
        { src: img('kollirama', 'gallery-1'), alt: { fr: 'Les pages par métier', en: 'The pages for each trade' } },
        { src: img('kollirama', 'gallery-2'), alt: { fr: 'Le téléchargement des catalogues', en: 'The catalog download' } },
        { src: img('kollirama', 'gallery-3'), alt: { fr: 'Les prestations', en: 'The services' } },
        { src: img('kollirama', 'home-mobile'), portrait: true, alt: { fr: 'Sur mobile', en: 'On mobile' } },
      ],
    },
  },
  {
    number: 8,
    slug: 'idk-concept',
    title: 'IDK Concept',
    year: 2026,
    kind: 'frontend',
    category: 'work-study',
    color: 'rose',
    url: 'https://www.idk-concept.fr',
    description: {
      fr: "Un site vitrine haut de gamme pour une entreprise d'agencement sur mesure.",
      en: 'A high-end showcase site for a custom shop-fitting company.',
    },
    tagline: {
      fr: "Un site vitrine qui donne envie d'entrer dans la boutique.",
      en: 'A showcase site that makes you want to walk into the shop.',
    },
    format: { fr: 'Site vitrine', en: 'Showcase site' },
    team: { fr: 'Seul, en alternance', en: 'Solo, as a work-study student' },
    about: {
      fr: [
        "IDK Concept fait de l'agencement sur mesure pour les commerces : pharmacies, épiceries fines et autres boutiques. Je leur ai fait un site vitrine qui met en avant leurs réalisations.",
        "Le site mise sur les animations au scroll et les transitions, avec des images légères et un formulaire de contact relié à Brevo pour l'envoi des mails.",
      ],
      en: [
        'IDK Concept does custom fittings for shops: pharmacies, delis and other stores. I built them a showcase site that puts their work forward.',
        'The site leans on scroll animations and transitions, with light images and a contact form hooked to Brevo to send the emails.',
      ],
    },
    challenge: {
      fr: [
        'Faire tenir des animations GSAP assez poussées dans des composants React, sans sacrifier la vitesse du site ni le référencement.',
        "J'ai utilisé l'App Router et les Server Components de Next.js pour garder le plus de choses côté serveur.",
      ],
      en: [
        'Fit fairly advanced GSAP animations into React components without giving up on speed or SEO.',
        'I used the Next.js App Router and Server Components to keep as much as possible on the server.',
      ],
    },
    highlights: {
      fr: ['Animations GSAP', 'Contact via Brevo', 'Server Components'],
      en: ['GSAP animations', 'Contact via Brevo', 'Server Components'],
    },
    stack: ['Next.js', 'GSAP', 'Brevo'],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'GSAP', 'Brevo'],
    media: {
      poster: img('idk-concept', 'poster'),
      phone: img('idk-concept', 'home-mobile'),
      gallery: [
        { src: img('idk-concept', 'home-desktop'), alt: { fr: "La page d'accueil", en: 'The home page' } },
        { src: img('idk-concept', 'gallery-1'), alt: { fr: 'La fabrication sur mesure', en: 'Custom manufacturing' } },
        { src: img('idk-concept', 'gallery-2'), alt: { fr: "Le processus, de l'idée à la pose", en: 'The process, from idea to install' } },
        { src: img('idk-concept', 'home-mobile'), portrait: true, alt: { fr: 'Sur mobile', en: 'On mobile' } },
      ],
    },
  },
  {
    number: 9,
    slug: 'atelier-maha',
    title: 'Atelier Maha',
    year: 2026,
    kind: 'frontend',
    category: 'client',
    color: 'soleil',
    url: 'https://ateliermaha.fr',
    description: {
      fr: "Le site d'un studio d'architecture d'intérieur. Mon premier client en freelance.",
      en: 'The website of an interior design studio. My first freelance client.',
    },
    tagline: {
      fr: "Le site d'un studio d'architecture d'intérieur, fait main.",
      en: 'A handmade website for an interior design studio.',
    },
    format: { fr: 'Site vitrine', en: 'Showcase site' },
    team: { fr: 'Seul, avec la cliente', en: 'Solo, with the client' },
    about: {
      fr: [
        "Atelier Maha est un studio d'architecture d'intérieur. C'est mon premier client en freelance.",
        "Le site présente les prestations et les réalisations du studio, avec des animations au scroll, une galerie de projets et un formulaire de contact. J'ai fait chaque choix avec la cliente, pour que le site lui ressemble.",
      ],
      en: [
        "Atelier Maha is an interior design studio. It's my first freelance client.",
        "The site shows the studio's services and work, with scroll animations, a project gallery and a contact form. I made every choice with the client, so the site feels like her.",
      ],
    },
    challenge: {
      fr: [
        'Garder un site très visuel, avec des animations GSAP et des sections en plein écran, tout en restant rapide et agréable sur mobile.',
        'Les images passent par next/image et le SEO est soigné : métadonnées, JSON-LD, sitemap et robots.',
      ],
      en: [
        'Keep a very visual site, with GSAP animations and full-screen sections, while staying fast and pleasant on mobile.',
        'Images go through next/image and the SEO is taken care of: metadata, JSON-LD, sitemap and robots.',
      ],
    },
    highlights: {
      fr: ['Premier client', 'Animations GSAP', 'SEO soigné'],
      en: ['First client', 'GSAP animations', 'Careful SEO'],
    },
    stack: ['Next.js', 'GSAP', 'Swiper'],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'GSAP', 'Swiper', 'EmailJS'],
    media: {
      poster: img('atelier-maha', 'poster'),
      phone: img('atelier-maha', 'home-mobile'),
      gallery: [
        { src: img('atelier-maha', 'home-desktop'), alt: { fr: "La page d'accueil", en: 'The home page' } },
        { src: img('atelier-maha', 'gallery-1'), alt: { fr: 'Les prestations du studio', en: "The studio's services" } },
        { src: img('atelier-maha', 'gallery-2'), alt: { fr: 'Les réalisations', en: 'Past projects' } },
        { src: img('atelier-maha', 'home-mobile'), portrait: true, alt: { fr: 'Sur mobile', en: 'On mobile' } },
      ],
    },
  },
  {
    number: 10,
    slug: 'futurekawa',
    title: 'FutureKawa',
    year: 2026,
    kind: 'backend',
    category: 'school',
    color: 'citron',
    url: 'https://github.com/itsarnaud/FutureKawa',
    description: {
      fr: 'Une API qui suit les stocks de café dans plusieurs pays, avec des capteurs IoT.',
      en: 'An API that tracks coffee stocks across several countries, with IoT sensors.',
    },
    tagline: {
      fr: 'Une API qui suit les stocks de café, avec des capteurs IoT.',
      en: 'An API that tracks coffee stocks, with IoT sensors.',
    },
    format: { fr: 'API et backend', en: 'API and backend' },
    team: { fr: "En équipe, sur l'API et la doc", en: 'As a team, on the API and the docs' },
    about: {
      fr: [
        "Un projet de cours (MSPR) en équipe : suivre des stocks de café vert dans trois pays, le Brésil, l'Équateur et la Colombie. Je me suis occupé de l'API et de la documentation technique.",
        "Chaque pays a son propre backend dans des conteneurs : une base de données, un broker MQTT, une API REST et un service d'alertes. Un backend central regroupe les données des trois pays pour le front.",
        "Des capteurs envoient la température et l'humidité en MQTT. Si un seuil est dépassé, une alerte part par mail.",
      ],
      en: [
        'A team school project (MSPR): tracking green coffee stocks in three countries, Brazil, Ecuador and Colombia. I took care of the API and the technical documentation.',
        'Each country has its own containerized backend: a database, an MQTT broker, a REST API and an alerting service. A central backend gathers the data from all three countries for the front.',
        'Sensors send the temperature and humidity over MQTT. When a threshold is crossed, an alert goes out by email.',
      ],
    },
    challenge: {
      fr: [
        "Les données des pays se mélangeaient, parce qu'ils partageaient la même base. J'ai donné une base à chaque pays, sans casser le regroupement côté backend central.",
        "J'ai aussi sorti les alertes dans un microservice à part, comme le demandait le sujet, et tout lancé avec Docker Compose : bases, brokers, APIs, alertes et Mailpit pour tester les mails, en une seule commande.",
      ],
      en: [
        'Data from the countries got mixed up, because they all shared the same database. I gave each country its own database without breaking the central backend.',
        'I also moved the alerts into their own microservice, as the brief asked, and started everything with Docker Compose: databases, brokers, APIs, alerts and Mailpit to test the emails, in a single command.',
      ],
    },
    highlights: {
      fr: ['3 pays', 'Capteurs en MQTT', 'Docker Compose'],
      en: ['3 countries', 'MQTT sensors', 'Docker Compose'],
    },
    stack: ['NestJS', 'MQTT', 'PostgreSQL', 'Docker'],
    technologies: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'MQTT', 'Docker'],
    media: { poster: img('futurekawa', 'poster'), gallery: [] },
  },
  {
    number: 11,
    slug: 'quested',
    title: 'Quested',
    year: 2026,
    kind: 'fullstack',
    category: 'personal',
    color: 'violet',
    url: 'https://quested.cc',
    description: {
      fr: 'Le Letterboxd des jeux vidéo : on note ses jeux, on écrit des avis, on suit ses potes.',
      en: 'Letterboxd for video games: rate your games, write reviews, follow your friends.',
    },
    tagline: {
      fr: 'Le Letterboxd des jeux vidéo. Gratuit, sans pub et open source.',
      en: 'Letterboxd for video games. Free, no ads and open source.',
    },
    format: { fr: 'Appli web fullstack', en: 'Fullstack web app' },
    team: { fr: 'Seul, de A à Z', en: 'Solo, from A to Z' },
    about: {
      fr: [
        "L'idée m'est venue en utilisant Letterboxd pour les films. Je ne trouvais pas d'équivalent pour les jeux qui me plaisait, alors j'ai fait le mien.",
        'On cherche un jeu, il est importé depuis IGDB et RAWG. On peut lui donner un statut, une note sur 10 et écrire un avis. Chaque compte a un profil public avec ses jeux, ses avis et ses listes.',
        'Depuis août, on peut aussi lier son compte Steam : la bibliothèque, le temps de jeu et les succès arrivent tout seuls.',
      ],
      en: [
        "The idea came to me while using Letterboxd for movies. I couldn't find an equivalent for games that I liked, so I made my own.",
        'You search for a game and it gets imported from IGDB and RAWG. You can give it a status, a rating out of 10 and write a review. Every account has a public profile with its games, reviews and lists.',
        'Since August, you can also link your Steam account: your library, playtime and achievements come in on their own.',
      ],
    },
    challenge: {
      fr: [
        "Importer des jeux depuis deux sources sans créer de doublons. IGDB et RAWG n'ont pas les mêmes identifiants, donc je rapproche les jeux par titre et par année.",
        "J'ai aussi mis en place la connexion avec Google et Discord (on peut lier les deux au même compte), les abonnements entre joueurs, les likes et les notifications en temps réel.",
      ],
      en: [
        "Import games from two sources without creating duplicates. IGDB and RAWG don't share the same IDs, so I match games by title and year.",
        'I also set up login with Google and Discord (you can link both to the same account), follows between players, likes and real-time notifications.',
      ],
    },
    highlights: {
      fr: ['Import IGDB + RAWG', 'Liaison Steam', 'Notifs en temps réel'],
      en: ['IGDB + RAWG import', 'Steam linking', 'Real-time notifications'],
    },
    stack: ['Next.js', 'tRPC', 'Prisma', 'Redis'],
    technologies: ['Next.js', 'TypeScript', 'tRPC', 'Prisma', 'PostgreSQL', 'Auth.js', 'Upstash Redis', 'Tailwind'],
    media: {
      poster: img('quested', 'poster'),
      phone: img('quested', 'home-mobile'),
      gallery: [
        { src: img('quested', 'home-desktop'), alt: { fr: "La page d'accueil", en: 'The home page' } },
        { src: img('quested', 'game-desktop'), alt: { fr: "La fiche d'un jeu, avec les notes des joueurs", en: 'A game page, with the player ratings' } },
        { src: img('quested', 'profile-desktop'), alt: { fr: 'Un profil public, rangé par statut', en: 'A public profile, sorted by status' } },
        { src: img('quested', 'home-mobile'), portrait: true, alt: { fr: 'Sur mobile', en: 'On mobile' } },
      ],
    },
  },
  {
    number: 12,
    slug: 'tengo',
    title: 'Tengo!',
    year: 2026,
    kind: 'mobile',
    category: 'personal',
    color: 'tomate',
    badge: { fr: 'En bêta', en: 'In beta' },
    url: 'https://playtengo.app',
    description: {
      fr: "Le Killer entre potes : l'appli tire les cibles, donne les missions secrètes et compte les kills. En bêta sur iPhone et Android.",
      en: 'The Killer game with friends: the app picks the targets, hands out secret missions and counts the kills. In beta on iPhone and Android.',
    },
    tagline: {
      fr: 'Le Killer entre potes, sans papier ni maître du jeu.',
      en: 'The Killer game with friends, no paper and no game master.',
    },
    format: { fr: 'Appli mobile', en: 'Mobile app' },
    team: { fr: 'Seul, de A à Z', en: 'Solo, from A to Z' },
    about: {
      fr: [
        "Le Killer, c'est le jeu où chacun reçoit en secret une cible et une mission. Quand tu élimines ta cible, tu récupères la sienne. D'habitude il faut des bouts de papier et quelqu'un pour arbitrer. Avec Tengo!, c'est l'appli qui fait le maître du jeu.",
        "Un joueur crée la partie et partage un code. L'appli tire les cibles au hasard et donne à chacun une mission secrète, parmi 357. Quand ta cible a fait sa mission sans s'en rendre compte, tu déclares le kill : elle confirme ou elle conteste.",
        "L'appli est en bêta sur TestFlight et en test fermé sur Google Play.",
      ],
      en: [
        'Killer is the game where everyone secretly gets a target and a mission. When you take out your target, you inherit theirs. Usually you need scraps of paper and someone to referee. With Tengo!, the app is the game master.',
        'One player creates the game and shares a code. The app randomly assigns targets and gives everyone a secret mission, out of 357. When your target has done their mission without noticing, you claim the kill: they confirm or they dispute it.',
        'The app is in beta on TestFlight and in closed testing on Google Play.',
      ],
    },
    challenge: {
      fr: [
        "Monter toute la chaîne seul : l'appli en Expo et React Native, une API en Hono et tRPC hébergée sur Render, une base Postgres sur Neon et la connexion avec Better Auth.",
        "Puis passer par la publication sur l'App Store et Google Play, qui ont chacun leurs propres règles.",
      ],
      en: [
        'Build the whole chain on my own: the app with Expo and React Native, an API with Hono and tRPC hosted on Render, a Postgres database on Neon and login with Better Auth.',
        'Then go through publishing on the App Store and Google Play, which each have their own rules.',
      ],
    },
    highlights: {
      fr: ['357 missions', 'iPhone et Android', 'Hono + tRPC'],
      en: ['357 missions', 'iPhone and Android', 'Hono + tRPC'],
    },
    stack: ['React Native', 'Expo', 'tRPC', 'Prisma'],
    technologies: [
      'Expo',
      'React Native',
      'TypeScript',
      'Expo Router',
      'NativeWind',
      'TanStack Query',
      'Hono',
      'tRPC',
      'Prisma',
      'PostgreSQL',
      'Better Auth',
    ],
    media: {
      poster: img('tengo', 'poster'),
      phone: img('tengo', 'app-1'),
      gallery: [
        { src: img('tengo', 'app-1'), portrait: true, alt: { fr: "L'accueil de l'appli", en: "The app's home screen" } },
        { src: img('tengo', 'app-2'), portrait: true, alt: { fr: 'Créer une partie', en: 'Creating a game' } },
        { src: img('tengo', 'app-3'), portrait: true, alt: { fr: "La salle d'attente, avec le code de la partie", en: 'The waiting room, with the game code' } },
        { src: img('tengo', 'app-4'), portrait: true, alt: { fr: 'Choisir son pseudo', en: 'Picking a nickname' } },
        { src: img('tengo', 'home-desktop'), alt: { fr: 'Le site playtengo.app', en: 'The playtengo.app website' } },
      ],
    },
  },
];

/** Tous les projets, du plus récent (N°12) au plus ancien. */
export function getProjects(): Project[] {
  return [...projects].sort((a, b) => b.number - a.number);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Le projet affiché en « Projet suivant » : le numéro d'en dessous, et on boucle après le N°1. */
export function getNextProject(slug: string): Project {
  const sorted = getProjects();
  const index = sorted.findIndex((project) => project.slug === slug);
  return sorted[(index + 1) % sorted.length];
}
