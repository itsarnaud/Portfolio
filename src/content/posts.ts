import type { Post, PostCategory } from './types';

const posts: Post[] = [
  {
    slug: 'nouveau-portfolio',
    date: '2026-11-06',
    category: 'projects',
    title: {
      fr: 'Mon portfolio a changé de tête :D',
      en: 'My portfolio got a new look :D',
    },
    excerpt: {
      fr: "Adieu le noir et blanc et bonjour les couleurs ! J'ai refait mon site de zéro avec une seule idée en tête, qu'il me ressemble et qu'on ait envie d'y rester un peu plus :)",
      en: 'Goodbye black and white, hello colours! I rebuilt my site from scratch with one idea in mind: that it looks like me and makes you want to stay a little longer :)',
    },
    content: {
      fr: [
        'Mon portfolio a changé de tête :D',
        "Adieu le noir et blanc et bonjour les couleurs ! J'ai refait mon site de zéro avec une seule idée en tête, qu'il me ressemble et qu'on ait envie d'y rester un peu plus :)",
        'Au programme : des projets, des animations à chaque coin de page, un curseur custom et un nouveau logo (et un CV assorti 👀)',
        'https://arnaudroyer.fr',
        "Petit défi : trouvez la page 404 et attrapez l'étoile ;)",
      ],
      en: [
        'My portfolio got a new look :D',
        'Goodbye black and white, hello colours! I rebuilt my site from scratch with one idea in mind: that it looks like me and makes you want to stay a little longer :)',
        'On the menu: projects, animations in every corner of the page, a custom cursor and a new logo (and a matching CV 👀)',
        'https://arnaudroyer.fr',
        'Little challenge: find the 404 page and catch the star ;)',
      ],
    },
    linkedinUrl: 'https://lnkd.in/p/e9ixE3Vs',
    tags: ['Portfolio', 'Next.js', 'Projet perso'],
  },
  {
    slug: 'quested-letterboxd-jeux-video-coulisses',
    date: '2026-10-16',
    category: 'projects',
    title: {
      fr: "J'ai codé mon propre Letterboxd, mais pour les jeux vidéo",
      en: 'I built my own Letterboxd, but for video games',
    },
    excerpt: {
      fr: "Ça fait quelques mois que je bricole Quested le soir et j'ai eu envie de tout remettre au même endroit pour ceux qui découvrent.",
      en: "I've been tinkering with Quested in the evenings for a few months, and I wanted to put everything in one place for newcomers.",
    },
    content: {
      fr: [
        "Ça fait quelques mois que je bricole Quested le soir et j'ai eu envie de tout remettre au même endroit pour ceux qui découvrent.",
        "En gros c'est un Letterboxd pour les jeux vidéo : tu log tes jeux, tu les notes, tu suis tes potes. Et maintenant ta bibliothèque Steam, PlayStation ou Xbox s'importe toute seule.",
        "D'où ça vient ? Je joue aux jeux vidéo depuis tout petit. Je voulais un endroit pour garder une trace de tout ce que j'ai joué, noter les jeux et voir ce que jouent les autres. Il existe déjà de très bons outils pour ça, mais j'avais envie de faire le mien, à ma façon. Je l'ai construit moi-même, de A à Z. Surtout pour apprendre.",
        "Concrètement, tu log tes jeux (backlog, en cours, terminé, abandonné, liste de souhaits), tu les notes sur 10, à la décimale près, et tu donnes ton avis. Tu peux aussi faire des listes, ton top 10 des jeux d'horreur par exemple.",
        "Mes features préférées : tu peux suivre ce que jouent les autres. Un fil d'activité pour voir les avis des joueurs que tu suis en arrivant, des recommandations basées sur ce que tes abonnements ont adoré, et un score de compatibilité pour savoir à quel point tes goûts collent avec ceux d'un autre joueur.",
        "Le gros morceau : tu lies ton compte, ta bibliothèque arrive toute seule. Steam (jeux, temps de jeu, succès), PlayStation (jeux, succès) et Xbox (jeux déjà lancés, succès). Sans jamais toucher à tes identifiants. Aucun risque de ban.",
        "Pour les devs, sous le capot il y a Next.js, TypeScript, tRPC, Prisma, PostgreSQL, Auth.js et Tailwind CSS. Les jeux viennent d'IGDB et RAWG, et si un jeu existe déjà en base, il n'est pas créé deux fois. Le site est dispo en français et en anglais.",
        "Gratuit, sans pub, open source. Je le développe encore aujourd'hui. Si tu testes et que quelque chose manque ou casse, dis-le moi, ça m'aide énormément :)",
        'https://quested.cc',
      ],
      en: [
        "I've been tinkering with Quested in the evenings for a few months, and I wanted to put everything in one place for newcomers.",
        'Basically, it\'s a Letterboxd for video games: you log your games, rate them and follow your friends. And now your Steam, PlayStation or Xbox library imports itself.',
        "Where does it come from? I've been playing video games since I was little. I wanted a place to keep track of everything I've played, rate games and see what others are playing. There are already very good tools for that, but I wanted to make my own, my way. I built it myself, from A to Z. Mostly to learn.",
        'In practice, you log your games (backlog, playing, finished, dropped, wishlist), rate them out of 10, down to the decimal, and share your opinion. You can also make lists, like your top 10 horror games.',
        'My favourite features: you can follow what others are playing. An activity feed to see the reviews of the players you follow when you arrive, recommendations based on what the people you follow loved, and a compatibility score to see how well your tastes match another player\'s.',
        'The big one: link your account and your library shows up by itself. Steam (games, playtime, achievements), PlayStation (games, achievements) and Xbox (games already launched, achievements). Without ever touching your credentials. No risk of a ban.',
        "For devs, under the hood there's Next.js, TypeScript, tRPC, Prisma, PostgreSQL, Auth.js and Tailwind CSS. Games come from IGDB and RAWG, and if a game already exists in the database, it isn't created twice. The site is available in French and English.",
        "Free, no ads, open source. I'm still working on it today. If you try it and something is missing or broken, let me know, it helps a lot :)",
        'https://quested.cc',
      ],
    },
    linkedinUrl: 'https://lnkd.in/p/eFZKxThy',
    tags: ['Quested', 'Next.js', 'Projet perso'],
  },
  {
    slug: 'contraste-sites-web-accessibilite',
    date: '2026-10-16',
    category: 'freelance',
    title: {
      fr: '70 % des sites échouent au test de contraste',
      en: '70% of websites fail the contrast test',
    },
    excerpt: {
      fr: "J'ai découvert un chiffre qui m'a un peu surpris, la grande majorité des sites ratent le test de contraste. Et pas parce que les devs s'en fichent !",
      en: "I came across a number that surprised me a little: the vast majority of websites fail the contrast test. And not because devs don't care!",
    },
    content: {
      fr: [
        "J'ai découvert un chiffre qui m'a un peu surpris, la grande majorité des sites ratent le test de contraste.",
        "Et pas parce que les devs s'en fichent ! C'est juste le genre de détail qu'on laisse passer sur un bouton ou un placeholder et qui finit par rendre une page pénible à lire...",
        "Et c'est pas une impression. Sur le million de pages d'accueil les plus visitées, WebAIM a trouvé du texte trop peu contrasté sur 83,9 % d'entre elles. Et ce chiffre bouge à peine d'une année sur l'autre.",
        "Concrètement, c'est quoi ? L'écart de luminosité entre ton texte et son fond. La norme WCAG demande au moins 4,5:1 pour du texte normal, 3:1 pour du gros texte.",
        "Et ça gêne qui ? Bien plus de monde qu'on ne le pense : les personnes âgées, dont la vue baisse, les personnes daltoniennes, et toi, sur ton téléphone, en plein soleil.",
        "Les coupables habituels ? Pas par négligence, juste sur les petits détails : un placeholder gris clair, un bouton aux couleurs de la marque, une légende ou un texte secondaire. Un par un, ça passe. Mis bout à bout, la page devient pénible à lire.",
        "Bonne nouvelle quand même : CSS sait maintenant choisir la couleur du texte tout seul, avec color: contrast-color(var(--marque)). Le navigateur prend le noir ou le blanc selon ce qui se lit le mieux sur le fond. Une ligne, aucune librairie. Pense à vérifier la compatibilité navigateur avant de t'en servir partout.",
        "À ton tour : teste ton site en 2 minutes. L'onglet Lighthouse de Chrome, ou n'importe quel vérificateur de contraste en ligne, te montre tout de suite les textes trop pâles.",
        'Et toi, tu y penses quand tu choisis tes couleurs ?',
        'Sources : WebAIM Million 2026, Smashing Magazine, mai 2026.',
      ],
      en: [
        'I came across a number that surprised me a little: the vast majority of websites fail the contrast test.',
        "And not because devs don't care! It's just the kind of detail that slips through on a button or a placeholder and ends up making a page painful to read...",
        "And it's not just an impression. Across the million most visited home pages, WebAIM found low-contrast text on 83.9% of them. And that number barely moves from one year to the next.",
        'So what is it, exactly? The difference in brightness between your text and its background. The WCAG standard asks for at least 4.5:1 for normal text and 3:1 for large text.',
        'And who does it bother? Far more people than you would think: older people whose eyesight is fading, colour-blind people, and you, on your phone, in full sunlight.',
        "The usual suspects? Not out of carelessness, just the small details: a light grey placeholder, a button in the brand colours, a caption or some secondary text. One at a time, they get by. Put together, the page becomes painful to read.",
        "Good news though: CSS can now pick the text colour by itself, with color: contrast-color(var(--brand)). The browser picks black or white depending on what reads best on the background. One line, no library. Check browser support before using it everywhere.",
        "Your turn: test your site in 2 minutes. Chrome's Lighthouse tab, or any online contrast checker, instantly shows you the text that is too pale.",
        'What about you, do you think about it when you pick your colours?',
        'Sources: WebAIM Million 2026, Smashing Magazine, May 2026.',
      ],
    },
    linkedinUrl: 'https://lnkd.in/p/eBmc6WvQ',
    tags: ['Accessibilité', 'CSS', 'DeveloppementWeb'],
  },
  {
    slug: 'loi-reseaux-sociaux-mineurs-15-ans',
    date: '2026-07-28',
    category: 'society',
    title: {
      fr: "Loi interdisant les réseaux sociaux aux moins de 15 ans : une bonne idée qui m'interroge",
      en: 'The new law banning social media for under-15s: good news, but it raises a question',
    },
    excerpt: {
      fr: "Une bonne nouvelle pour protéger les enfants, sauf qu'il y a un truc qui me turlupine : comment vérifier l'âge de tout le monde sans exposer les données de tout le monde ?",
      en: "Great news to protect children, except something is bugging me: how do you check everyone's age without exposing everyone's data?",
    },
    content: {
      fr: [
        "Le Parlement vient d'adopter la loi interdisant les réseaux sociaux aux moins de 15 ans. Une bonne nouvelle pour protéger les enfants.",
        "Sauf qu'il y a un truc qui me turlupine.",
        "Pour vérifier l'âge des utilisateurs, les plateformes vont devoir mettre en place des systèmes d'identification. Concrètement, ça veut dire que tout le monde, pas seulement les mineurs, devra prouver son identité pour créer un compte.",
        "Et c'est là que ça coince.",
        "Depuis le début de l'année 2026, la France a cumulé plus de 300 services piratés et 250 millions de données exposées. La CNIL a recensé plus de 8 600 violations de données en un an, soit une fuite par heure. On est aujourd'hui le pays le plus attaqué d'Europe.",
        "Alors oui, protéger les enfants c'est essentiel. Mais confier ses documents d'identité à des plateformes dont la sécurité est loin d'être garantie, c'est un vrai sujet.",
        "La question c'est pas \"faut-il protéger les mineurs ?\", bien sûr que oui. La question c'est \"comment on fait ça sans exposer tout le monde ?\"",
      ],
      en: [
        'Parliament just passed a law banning social media for under-15s. Great news to protect children.',
        "Except there's something bugging me about it.",
        "To verify users' age, platforms will have to set up identification systems. In practice, that means everyone, not just minors, will have to prove their identity to create an account.",
        "And that's where it gets tricky.",
        "Since the start of 2026, France has racked up over 300 hacked services and 250 million exposed records. The CNIL recorded more than 8,600 data breaches in a year, roughly one leak per hour. We're now the most attacked country in Europe.",
        'So yes, protecting children is essential. But handing over ID documents to platforms whose security is far from guaranteed is a real issue.',
        "The question isn't \"should we protect minors?\", of course we should. The question is \"how do we do it without exposing everyone?\"",
      ],
    },
    linkedinUrl: 'https://www.linkedin.com/posts/royer-arnaud_le-parlement-vient-dadopter-la-loi-interdisant-activity-7487764636348469248-UuhV',
    tags: ['RGPD','Société','Cybersécurité'],
  },
  {
    slug: 'webdev-arena-classement-ia-juillet-2026',
    date: '2026-07-25',
    category: 'ai',
    title: {
      fr: "WebDev Arena : le classement des IA n'a jamais été aussi serré",
      en: 'WebDev Arena: the AI rankings have never been this tight',
    },
    excerpt: {
      fr: "Un classement où des modèles d'IA s'affrontent sur des tâches de dev web, notés à l'aveugle par des humains. Juillet 2026, c'est peut-être le plus serré depuis le début.",
      en: 'A leaderboard where AI models compete on web dev tasks, blind-rated by humans. July 2026 might be the tightest race yet.',
    },
    content: {
      fr: [
        "La WebDev Arena c'est un classement où des modèles d'IA s'affrontent sur des tâches de dev web, notés à l'aveugle par des humains. Chaque mois le classement bouge et juillet 2026 c'est peut-être le plus serré depuis le début !",
        "Claude Fable 5 reste en tête, mais GPT-5.6 revient fort et prend la première place sur React. Grok lui cartonne en HTML. Les modèles chinois comme GLM 5.2 progressent aussi et commencent à s'installer dans le top.",
        "Ce qui m'intéresse là-dedans c'est que les résultats changent selon la techno. Il n'y a pas un seul modèle qui écrase tout partout. Ça veut dire que choisir son outil IA en fonction de ce sur quoi on bosse a vraiment du sens.",
        "En React je teste GPT, pour le reste j'utilise surtout Claude. Et vous, vous utilisez quoi pour coder ?",
      ],
      en: [
        'WebDev Arena is a leaderboard where AI models compete on web dev tasks, blind-rated by humans. The ranking shifts every month, and July 2026 might be the tightest race yet!',
        'Claude Fable 5 stays on top, but GPT-5.6 is coming back strong and takes the lead on React. Grok is crushing it on HTML. Chinese models like GLM 5.2 are also progressing and starting to break into the top.',
        "What interests me here is that results shift depending on the tech stack. No single model dominates everywhere. That means choosing your AI tool based on what you're actually working on really makes sense.",
        'For React I test GPT, for everything else I mostly use Claude. What about you, what do you use to code?',
      ],
    },
    linkedinUrl: 'https://www.linkedin.com/posts/royer-arnaud_developpementweb-ia-react-activity-7486345639900028930-qsSG',
    tags: ['IA','React','DeveloppementWeb'],
  },
  {
    slug: 'lancement-site-atelier-maha',
    date: '2026-05-28',
    category: 'freelance',
    title: {
      fr: "Lancement du nouveau site de l'Atelier Maha",
      en: "Launching Atelier Maha's new website",
    },
    excerpt: {
      fr: "Le nouveau site de l'Atelier Maha, un studio d'architecture d'intérieur, est en ligne. C'est mon premier projet en freelance.",
      en: "The new website for Atelier Maha, an interior design studio, is live. It's my first freelance project.",
    },
    content: {
      fr: [
        "C'est avec beaucoup de plaisir que je vous présente le nouveau site de l'Atelier Maha, studio d'architecture d'intérieur.",
        "Pour cette première réalisation client, l'enjeu était de concevoir une vitrine entièrement sur mesure, en parfaite adéquation avec l'identité du studio.",
        "Le projet a été mené en étroite collaboration avec la cliente afin que chaque choix graphique et ergonomique reflète précisément son approche métier. L'ensemble du design, ainsi que la sélection des textes et des visuels, ont été pensés pour assurer une cohérence totale avec l'image de l'Atelier Maha.",
        "Mon rôle a consisté à l'accompagner dans la traduction de son expertise en une expérience web fluide. De la présentation des prestations à la mise en valeur du portfolio, le site a été structuré pour offrir une navigation agréable et intuitive.",
        "Je remercie l'Atelier Maha pour la confiance accordée lors de cette belle collaboration créative et technique.",
        "Le site est consultable à l'adresse suivante : https://ateliermaha.fr",
      ],
      en: [
        "I'm delighted to present the new website for Atelier Maha, an interior design studio.",
        "For this first client project, the challenge was to design a fully custom showcase site, in perfect alignment with the studio's identity.",
        "The project was carried out in close collaboration with the client so that every graphic and UX choice precisely reflected her professional approach. The overall design, as well as the selection of copy and visuals, were crafted to ensure total consistency with Atelier Maha's image.",
        'My role was to help translate her expertise into a smooth web experience. From presenting services to showcasing the portfolio, the site was structured to offer pleasant, intuitive navigation.',
        'Thanks to Atelier Maha for the trust placed in me during this great creative and technical collaboration.',
        'The site is live at: https://ateliermaha.fr',
      ],
    },
    linkedinUrl: 'https://www.linkedin.com/posts/royer-arnaud_developpementweb-developpeur-freelance-activity-7465295802664611840-xE7M',
    tags: ['Next.js','TypeScript','Tailwind CSS','GSAP','Freelance'],
  },
  {
    slug: 'developpeur-foutu-ia-replit',
    date: '2026-02-28',
    category: 'ai',
    title: {
      fr: '« Le métier de développeur est foutu, passe sur Replit »',
      en: '"The developer job is dead, switch to Replit"',
    },
    excerpt: {
      fr: "Une phrase que j'ai entendue pendant une discussion sur la refonte d'un site. On m'a conseillé, très sérieusement, de tout supprimer et de tout refaire avec Replit et l'IA.",
      en: 'Something I heard during a discussion about a website redesign. I was advised, very seriously, to delete everything and rebuild it all with Replit and AI.',
    },
    content: {
      fr: [
        '"Le métier de développeur est foutu, passe sur Replit" 🤯',
        "C'est une phrase que j'ai entendue récemment lors d'une discussion sur la refonte d'un projet web.",
        "Un peu de contexte : je travaille sur un projet de refonte d'un site avec un objectif de performance et de référencement.",
        "Alors que je m'attendais à débattre d'architecture ou de SEO, on m'a suggéré le plus sérieusement du monde :",
        "« Tu te compliques la vie. Le métier de dev est fini. Supprime tout et refais-le avec Replit et l'IA. »",
        "J'ai cru à une blague.",
        'On me suggère sérieusement de remplacer une architecture SSR optimisée, sécurisée et propriétaire… par un environnement de prototypage cloud généré par IA ?',
        "C'est comme demander à un architecte de raser une maison en briques pour la reconstruire en Lego « parce que c'est plus rapide ».",
        "L'IA est un outil formidable, Replit est super pour prototyper. Mais confondre « générer du code » et « construire une architecture », c'est la preuve qu'on a plus que jamais besoin de développeurs qui comprennent ce qu'ils font.",
        'Le « vieux monde » du code a encore de beaux jours devant lui. 🚀',
      ],
      en: [
        '"The developer job is dead, switch to Replit" 🤯',
        'A sentence I recently heard during a discussion about a web project revamp.',
        "Some context: I'm working on revamping a website with a performance and SEO goal.",
        'While I expected to debate architecture or SEO, I was told, dead serious:',
        "\"You're overcomplicating things. The dev job is over. Delete everything and rebuild it with Replit and AI.\"",
        'I thought it was a joke.',
        "I'm seriously being told to replace an optimized, secure, proprietary SSR architecture… with an AI-generated cloud prototyping environment?",
        "It's like asking an architect to tear down a brick house to rebuild it in Lego \"because it's faster\".",
        "AI is a fantastic tool, Replit is great for prototyping. But confusing \"generating code\" with \"building an architecture\" is proof that we need developers who understand what they're doing more than ever.",
        'The "old world" of code still has good days ahead. 🚀',
      ],
    },
    linkedinUrl: 'https://www.linkedin.com/posts/royer-arnaud_developpementweb-ia-hype-share-7425695272032157696-ZM9Q',
    tags: ['IA','DeveloppementWeb'],
  },
  {
    slug: 'lancement-quested',
    date: '2026-07-29',
    category: 'projects',
    title: {
      fr: 'Quested, mon tracker de jeux vidéo façon Letterboxd',
      en: 'Quested, my Letterboxd-style video game tracker',
    },
    excerpt: {
      fr: "Je viens de sortir un projet perso : Quested, un site pour suivre les jeux vidéo auxquels on joue. L'idée m'est venue en utilisant Letterboxd pour les films.",
      en: 'I just released a personal project: Quested, a site to track the video games you play. The idea came from using Letterboxd for movies.',
    },
    content: {
      fr: [
        'Je viens de sortir un projet perso : Quested, un site pour suivre les jeux vidéo auxquels on joue.',
        "L'idée m'est venue en utilisant Letterboxd pour les films. Il n'existait pas vraiment d'équivalent pour les jeux qui me convenait, alors j'ai construit le mien, à ma sauce, et surtout pour apprendre en le faisant de A à Z.",
        "Concrètement on peut logger ses jeux, les noter, écrire des avis et suivre d'autres joueurs pour voir ce qu'ils jouent. Il y a aussi des trucs plus sympa comme un système de recommandations ou un comparateur de goûts entre profils, et plein d'autres petits détails que j'ai pris plaisir à construire.",
        "Côté tech, c'est du Next.js, TypeScript, Prisma et tRPC. Gratuit, sans pub, open source.",
        "Je le développe encore activement, donc si vous voulez tester et me remonter ce qui manque ou ce qui casse, ça m'aide beaucoup !",
        "C'est par ici : quested.cc :D",
      ],
      en: [
        'I just released a personal project: Quested, a site to track the video games you play.',
        "The idea came from using Letterboxd for movies. There wasn't really an equivalent for games that suited me, so I built my own, my way, and mostly to learn by doing it from A to Z.",
        "Concretely, you can log your games, rate them, write reviews and follow other players to see what they're playing. There are also some nicer touches like a recommendation system or a taste-compatibility comparator between profiles, plus plenty of other little details I enjoyed building.",
        "On the tech side, it's Next.js, TypeScript, Prisma and tRPC. Free, ad-free, open source.",
        "I'm still actively developing it, so if you want to test it and report what's missing or broken, it helps a lot!",
        "It's over here: quested.cc :D",
      ],
    },
    linkedinUrl: 'https://www.linkedin.com/posts/royer-arnaud_quested-share-7488157952059629568-ZIox',
    tags: ['Next.js','DeveloppementWeb','Projet perso'],
  },
  {
    slug: 'update-quested-steam',
    date: '2026-08-03',
    category: 'projects',
    title: {
      fr: 'Petit update sur Quested : liaison de compte Steam',
      en: 'Small update on Quested: Steam account linking',
    },
    excerpt: {
      fr: 'Nouvelle grosse feature : on peut lier son compte Steam et importer sa bibliothèque, son temps de jeu et ses succès sans rien logger à la main.',
      en: 'New big feature: you can link your Steam account and import your library, playtime and achievements without logging anything by hand.',
    },
    content: {
      fr: [
        'Petit update sur Quested !',
        "J'adore continuer à bricoler ce projet le soir. Dernier grosse feature : la liaison de compte Steam. Une fois connecté, ta bibliothèque et ton temps de jeu s'importent automatiquement, avec tes succès en plus ! Si tu joues sur Steam, tu peux commencer à utiliser Quested sans rien logger à la main, tout est déjà là.",
        "J'aurais bien aimé faire pareil avec PSN, Xbox ou Epic Games, mais ça n'arrivera pas... Ces plateformes n'ont pas d'API publique pour ça. Il existe des méthodes non-officielles mais elles reposent sur du reverse engineering et ça met les comptes des joueurs en risque de ban. Pas question de faire prendre ce risque à qui que ce soit !",
        "Steam restera donc probablement la seule plateforme importable pour l'instant.",
        "Sinon le site continue d'avancer, plein de petits ajustements toutes les semaines. Toujours gratuit, sans pub, open source.",
        "C'est par ici : quested.cc :D",
      ],
      en: [
        'Small update on Quested!',
        'I love continuing to tinker with this project in the evenings. Latest big feature: Steam account linking. Once connected, your library and playtime are imported automatically, along with your achievements! If you play on Steam, you can start using Quested without logging anything manually, everything is already there.',
        "I would have loved to do the same with PSN, Xbox or Epic Games, but that won't happen... These platforms don't have a public API for this. There are unofficial methods, but they rely on reverse engineering and that puts players' accounts at risk of being banned. No way I'm making anyone take that risk!",
        'So Steam will probably remain the only importable platform for now.',
        'Otherwise the site keeps moving forward, lots of little tweaks every week. Still free, ad-free, open source.',
        "It's over here: quested.cc :D",
      ],
    },
    linkedinUrl: 'https://www.linkedin.com/posts/royer-arnaud_quested-share-7489953231771615232-jYLx',
    tags: ['Quested','Steam','Projet perso'],
  },
  {
    slug: 'figma-canva-code-no-code-vs-sur-mesure',
    date: '2026-08-04',
    category: 'freelance',
    title: {
      fr: "Figma, Canva Code 2.0... le no-code n'a jamais été aussi puissant",
      en: 'Figma, Canva Code 2.0... no-code has never been this powerful',
    },
    excerpt: {
      fr: "Les outils pour faire son site soi-même n'ont jamais été aussi bons. Mais est-ce qu'ils remplacent vraiment un site sur mesure ?",
      en: 'DIY website tools have never been this good. But do they really replace a custom-built site?',
    },
    content: {
      fr: [
        "Figma qui intègre du code natif, Canva Code 2.0 ouvert à tout le monde... les outils pour \"faire son site soi-même\" n'ont jamais été aussi puissants.",
        "Et franchement, c'est cool !",
        "Quand on lance une activité, un site Canva ou Squarespace fait très bien le job. C'est rapide, accessible et ça permet de tester son marché sans se ruiner.",
        "Sauf qu'à un moment on touche le plafond. Identité visuelle trop générique, animations impossibles à personnaliser, perfs limitées, intégrations qui manquent... c'est là que le sur-mesure devient nécessaire.",
        "Ces outils et le dev custom ne s'opposent pas vraiment. Ils répondent juste à des étapes différentes d'un projet :)",
      ],
      en: [
        'Figma now integrates native code, Canva Code 2.0 is open to everyone... the tools to "build your own site" have never been this powerful.',
        "And honestly, that's cool!",
        "When you're starting out, a Canva or Squarespace site does the job really well. It's fast, accessible, and lets you test your market without breaking the bank.",
        "Except at some point you hit the ceiling. Generic visual identity, animations you can't customize, limited performance, missing integrations... that's when custom development becomes necessary.",
        "These tools and custom dev aren't really opposed. They just answer different stages of a project :)",
      ],
    },
    linkedinUrl: 'https://www.linkedin.com/posts/royer-arnaud_figma-qui-int%C3%A8gre-du-code-natif-canva-code-share-7486341657085464576-0cpC/',
    tags: ['Figma','Canva','NoCode','Freelance'],
  },
  {
    slug: 'loi-reseaux-sociaux-mineurs-censuree-conseil-constitutionnel',
    date: '2026-08-26',
    category: 'society',
    title: {
      fr: 'Réseaux sociaux et mineurs : le Conseil constitutionnel censure la loi',
      en: 'Social media and minors: the Constitutional Council strikes down the law',
    },
    excerpt: {
      fr: 'Le 14 août, le Conseil constitutionnel a censuré la loi interdisant les réseaux sociaux aux moins de 15 ans, faute de garanties claires sur la vie privée. La suite de mon post sur le sujet.',
      en: 'On August 14, the Constitutional Council struck down the law banning social media for under-15s, citing a lack of clear privacy guarantees. A follow-up to my earlier post on the topic.',
    },
    content: {
      fr: [
        "Il y a quelques semaines je publiais un post sur cette loi en me demandant comment vérifier l'âge des utilisateurs sans exposer les données de tout le monde.",
        "Le 14 août, le Conseil constitutionnel a censuré la loi interdisant les réseaux sociaux aux moins de 15 ans. Pas parce qu'il était contre la protection des enfants, il a d'ailleurs reconnu que l'objectif était tout à fait légitime. Mais parce que l'interdiction était jugée disproportionnée et que la loi ne prévoyait aucune garantie claire sur la vie privée pour le système de vérification d'âge.",
        "C'est exactement la question que je posais.",
        "L'exécutif a demandé un nouveau texte qui devra cette fois intégrer un cadre légal clair sur la protection des données. Le sujet n'est pas enterré, il repart juste sur de meilleures bases.",
        "Protéger les mineurs sur internet, c'est ok ! Mais comment on fait ça sans créer de nouveaux risques pour tout le monde ?",
      ],
      en: [
        "A few weeks ago I published a post about this law, wondering how to verify users' age without exposing everyone's data.",
        'On August 14th, the Constitutional Council struck down the law banning social media for under-15s. Not because it opposed protecting children, it actually acknowledged that the goal was entirely legitimate. But because the ban was deemed disproportionate and the law provided no clear privacy guarantees for the age verification system.',
        "That's exactly the question I was asking.",
        "The government has requested a new text that will this time need to include a clear legal framework for data protection. The topic isn't buried, it's just starting over on better foundations.",
        "Protecting minors online, that's fine! But how do we do it without creating new risks for everyone?",
      ],
    },
    linkedinUrl: 'https://lnkd.in/p/emX2_nXN',
    tags: ['RGPD','Société','Cybersécurité'],
  },
];

export function getPosts(category?: PostCategory): Post[] {
  return posts
    .filter((post) => !category || post.category === category)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string): { newer?: Post; older?: Post } {
  const sorted = getPosts();
  const index = sorted.findIndex((post) => post.slug === slug);
  return { newer: sorted[index - 1], older: sorted[index + 1] };
}
