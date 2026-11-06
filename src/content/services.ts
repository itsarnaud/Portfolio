import type { ProcessStep, Service } from './types';

export const services: Service[] = [
  {
    id: 'website',
    color: 'soleil',
    title: { fr: 'Un site vitrine', en: 'A showcase website' },
    description: {
      fr: 'Un site rapide, bien référencé, que tu peux mettre à jour toi-même.',
      en: 'A fast website, easy to find on Google, that you can update yourself.',
    },
    examples: ['atelier-maha', 'idk-concept'],
  },
  {
    id: 'web-app',
    color: 'violet',
    title: { fr: 'Une appli web', en: 'A web app' },
    description: {
      fr: 'Un outil sur mesure, avec des comptes, une base de données et un tableau de bord.',
      en: 'A custom tool, with accounts, a database and a dashboard.',
    },
    examples: ['quested', 'igotrack'],
  },
  {
    id: 'back-office',
    color: 'citron',
    title: { fr: 'Un back-office', en: 'A back-office' },
    description: {
      fr: 'Pour gérer ton contenu, tes utilisateurs et tes stats au même endroit.',
      en: 'To manage your content, your users and your stats in one place.',
    },
    examples: ['kollirama'],
  },
  {
    id: 'mobile-app',
    color: 'tomate',
    title: { fr: 'Une appli mobile', en: 'A mobile app' },
    description: {
      fr: 'Une appli pour iPhone et Android, simple à prendre en main.',
      en: 'An app for iPhone and Android, easy to pick up.',
    },
    examples: ['tengo'],
  },
];

export const processSteps: ProcessStep[] = [
  {
    color: 'soleil',
    title: { fr: 'On discute', en: 'We talk' },
    description: {
      fr: 'Je te pose des questions pour bien comprendre ce dont tu as besoin.',
      en: 'I ask you questions to really understand what you need.',
    },
  },
  {
    color: 'rose',
    title: { fr: 'Je te montre une maquette', en: 'I show you a mockup' },
    description: {
      fr: 'Tu vois à quoi ça va ressembler avant que je code quoi que ce soit.',
      en: "You see what it's going to look like before I write any code.",
    },
  },
  {
    color: 'citron',
    title: { fr: 'Je développe', en: 'I build it' },
    description: {
      fr: "Tu as accès à une version en ligne pour suivre l'avancée et me faire tes retours.",
      en: 'You get an online version to follow the progress and send me feedback.',
    },
  },
  {
    color: 'cobalt',
    title: { fr: 'On met en ligne', en: 'We go live' },
    description: {
      fr: "Je m'occupe de la mise en prod et je reste dispo si tu as besoin après :)",
      en: "I handle the launch and I'm still around if you need me afterwards :)",
    },
  },
];
