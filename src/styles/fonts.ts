import { Bricolage_Grotesque, JetBrains_Mono, Karla } from 'next/font/google';

// Polices variables : un seul fichier par police, toutes les graisses incluses.

/** Titres. Axes wdth (titre de l'accueil en 88) et opsz (dessin adapté à la taille). */
export const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['wdth', 'opsz'],
  variable: '--font-bricolage',
  display: 'swap',
});

/** Texte courant (400, 500, 700). */
export const body = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
  display: 'swap',
});

/**
 * Étiquettes : N°, dates, chips de techno (400, 600).
 * Pas de préchargement : ces petits textes peuvent attendre, et la bande passante
 * va d'abord aux polices des titres et du texte.
 */
export const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false,
});

export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
