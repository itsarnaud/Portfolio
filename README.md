# Portfolio d'Arnaud Royer

Mon portfolio de développeur fullstack, en ligne sur [arnaudroyer.fr](https://arnaudroyer.fr). Mes projets y sont présentés comme des cartes à collectionner, avec mon parcours, mes posts et un formulaire de contact, en français et en anglais.

## Stack

- Next.js 16 (App Router) et React 19
- TypeScript
- Tailwind CSS 4
- next-intl pour le français et l'anglais
- GSAP pour les animations au scroll et les transitions
- Nodemailer pour le formulaire de contact
- Vercel Analytics et Speed Insights

## Installation

Il faut Node.js, dans la version indiquée par `.nvmrc`.

```bash
npm install
cp .env.example .env
npm run dev
```

Le site tourne ensuite sur [localhost:3000](http://localhost:3000).

| Commande | Rôle |
|---|---|
| `npm run dev` | Lance le site en développement |
| `npm run build` | Construit le site pour la production |
| `npm run start` | Lance le site construit |
| `npm run lint` | Vérifie le code avec ESLint |

## Variables d'environnement

Elles servent à envoyer les messages du formulaire de contact. Les valeurs vont dans `.env`, qui n'est pas versionné.

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

## Structure

```
messages/             textes du site, fr.json et en.json
public/
  files/              le CV en PDF
  icons/              icônes du manifest
  images/             photo, logo, images de partage, images des projets
src/
  app/                pages, API de contact, sitemap, robots, manifest, llms.txt
  components/
    blog/             cartes et filtres du blog
    layout/           nav, pied de page, transitions, changement de page
    motion/           animations réutilisables
    projects/         cartes, carrousel et filtres des projets
    sections/         blocs propres à chaque page
    seo/              données structurées
    ui/               boutons, chips, stickers, cadres
  content/            projets, articles, expériences, compétences, services
  hooks/              hooks React
  i18n/               configuration de next-intl
  lib/                SEO, validation du contact, envoi du mail, utilitaires
  styles/             tokens de la D.A., animations et polices
  proxy.ts            redirection selon la langue
```

## Ajouter un projet

1. Crée le dossier `public/images/projects/<slug>/` et mets-y les images en WebP : `poster.webp` pour l'affiche, plus les captures de la galerie.
2. Ajoute une image de partage de 1200×630 dans `public/images/og/<slug>.png`. Les pages projet pointent vers ce fichier.
3. Ajoute le projet dans `src/content/projects.ts`, avec le numéro suivant. Les champs sont décrits par le type `Project` dans `src/content/types.ts`.
4. Donne-lui une phrase courte dans `pitch` : elle s'affiche sur le paquet de cartes de l'accueil (sinon, c'est la description).

L'accueil montre tout seul les projets les plus récents : 4 dans le paquet de cartes, 5 dans les projets empilés. La page du projet, le sitemap et `llms.txt` se mettent aussi à jour tout seuls. Pour un projet privé, sans site ni code public, laisse `url` vide.

## Ajouter un article

Ajoute une entrée dans `src/content/posts.ts`, en français et en anglais, avec un `slug` unique, la date au format `AAAA-MM-JJ`, une catégorie (`projects`, `ai`, `freelance` ou `society`) et le lien du post LinkedIn.

L'ordre d'affichage suit la date. La page de l'article, le sitemap et `llms.txt` se mettent à jour tout seuls.

## Licence

[MIT](LICENSE)
