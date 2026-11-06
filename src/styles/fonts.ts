import { Bricolage_Grotesque, JetBrains_Mono, Karla } from 'next/font/google';

// wdth pour le titre de l'accueil (88), opsz pour adapter le dessin à la taille.
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['wdth', 'opsz'],
  variable: '--font-bricolage',
  display: 'swap',
});

const body = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
  display: 'swap',
});

// Pas de préchargement : la bande passante va d'abord aux polices des titres et du texte.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false,
});

export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
