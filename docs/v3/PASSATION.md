# Refonte du portfolio arnaudroyer.fr : passation pour Claude Code

Ce document décrit la nouvelle direction artistique (D.A.) validée en maquette et la façon de l'intégrer dans le repo `Portfolio` (Next.js 16, React 19, Tailwind 4, GSAP, next-intl).

- **Maquette de référence** : https://claude.ai/artifact/BtqBUByb6SMsEtkmNDAwDe (canvas avec toutes les pages, desktop et mobile).
- **Sources des maquettes** : dossier `maquettes/` livré avec ce document. Chaque fichier `.dc.html` contient le HTML et le CSS d'un écran (styles en ligne, animations dans le bloc `<style>`, données dans le script `renderVals`). Ils servent de référence visuelle et de source pour les textes. Ils ne sont pas à copier tels quels : le runtime `support.js` n'est pas fourni.

## Ce qu'Arnaud attend de cette refonte

- **Ne plus ressembler à un template IA.** Le site actuel est propre mais générique : noir et blanc, phrases creuses, barres de compétences en %, structure vue partout. La v3 doit avoir une vraie personnalité.
- **Un site coloré et créatif**, fidèle à la D.A. des maquettes : néo-brutal, couleurs franches, projets en cartes à collectionner.
- **Beaucoup d'interactivité**, sur toutes les pages, pour donner envie de rester : apparitions, petits détails qui bougent en permanence, survols, curseur, transitions entre pages.
- **Une expérience mobile aussi soignée que le desktop**, avec ses propres interactions (menu plein écran, carrousels, cartes qu'on retourne au toucher).
- **Un ton simple et sympa**, avec quelques smileys texte, à l'image d'Arnaud.
- **Rien de cassé** : mêmes URLs, même référencement, formulaire de contact fonctionnel, FR et EN.
- **Un site rapide malgré les animations** (voir « Performance »).
- **Du code propre et lisible**, qu'Arnaud peut faire évoluer seul : TypeScript strict, composants simples, contenu séparé du code.

## Règles de travail

1. Travailler sur la branche `v3`, créée par Arnaud (voir « Repartir de zéro »).
2. Avancer étape par étape (voir le plan en bas) et **faire valider chaque étape à Arnaud** avant la suivante.
3. Ne rien supprimer sans demander.
4. **Ne jamais commit ni push.** C'est Arnaud qui le fait. À la fin de chaque étape, lui donner les commandes à lancer (`git add`, `git commit -m "..."` avec un message proposé, `git push`).
5. Garder l'i18n (FR et EN) et le hook `usePrefersReducedMotion` existant.
6. Ton des textes : simple, direct, tutoiement. Pas de tirets cadratins, pas de petits titres en police mono au-dessus des titres, pas de formules creuses (« passionné », « expériences digitales »). Quelques smileys texte (`:)`, `;)`, `:D`) sont bienvenus, avec parcimonie. Jamais dans le CV.
7. **À retirer** : la mention d'Hermès dans `about.bio2` (`messages/fr.json` et `messages/en.json`). Arnaud n'a pas le droit d'en parler.
8. Ne jamais lire, afficher ni copier le contenu de `.env` ou `.env.local`. Seuls les noms des variables sont utiles (voir `.env.example`).
9. Ne rien modifier dans `../portfolio-v2-ref` : ce dossier sert uniquement à relire la v2.
10. Pas de nouvelle dépendance lourde sans demander (lib d'animation en plus de GSAP, UI kit, CMS…). Les petites libs utilitaires peuvent être proposées au cas par cas.
11. En cas de doute sur un texte ou un comportement, regarder d'abord la maquette correspondante, puis demander à Arnaud.

## Les maquettes : quel fichier pour quel écran

| Écran | Desktop (1440px) | Mobile (390px) |
|---|---|---|
| Accueil | `Main.dc.html` | `MobileAccueil.dc.html` |
| Projets | `Projets.dc.html` | `MobileProjets.dc.html` |
| Détail d'un projet (exemple Quested) | `Projet.dc.html` | `MobileProjet.dc.html` |
| À propos | `APropos.dc.html` | `MobileAPropos.dc.html` |
| Parcours | `Parcours.dc.html` | `MobileParcours.dc.html` |
| Blog | `Blog.dc.html` | `MobileBlog.dc.html` |
| Contact | `Contact.dc.html` | `MobileContact.dc.html` |
| Navigation | `Nav.dc.html` | `MobileNav.dc.html` (barre et menu plein écran, props `active` et `menuOpen`) |
| Bloc contact et pied de page | `Footer.dc.html` | `MobileFooter.dc.html` |

Autres fichiers :
- `Interactions.dc.html` : le curseur custom (ses états) et les deux variantes de transition entre pages ;
- `Systeme.dc.html` : couleurs, typos, boutons, chips, stickers ;
- `Logo.dc.html` : le logo ;
- `CV.dc.html` : le CV A4 ;
- `Banniere.dc.html` : la bannière LinkedIn ;
- `Og.dc.html` : l'image de partage.

Comment lire un `.dc.html` :
- `<dc-import name="X">` insère le composant `X.dc.html` ;
- `<sc-for list="{{...}}" as="p">` est une boucle, `<sc-if value="{{...}}">` une condition ;
- `{{p.title}}` est une valeur calculée dans `renderVals()`, le script en bas du fichier. C'est là que sont les données (projets, articles, filtres) et la petite logique d'état (filtre actif, paquet de cartes, formulaire) ;
- les classes d'animation (`pop`, `rise`, `wobble`, `fl`, `spin`, `pulse`, `cin-a`/`cin-b`…) sont définies dans le `<style>` du `<helmet>`.

La page d'articles du blog n'a pas de maquette dédiée : la reprendre du détail projet (en-tête coloré, texte en colonne lisible de 680px environ, tags en chips, lien « Lire sur LinkedIn », articles suivant et précédent).

## Repartir de zéro (v3)

On recode le projet entièrement sur une branche `v3`. L'ancien code (v2) reste disponible sur `main` et dans un dossier de référence à côté du repo (voir les commandes ci-dessous), pour y reprendre ce qui doit survivre.

### Ce qu'Arnaud lance lui-même avant de commencer

```bash
git switch main && git pull
git switch -c v3
git worktree add ../portfolio-v2-ref main
git rm -r -q src messages public middleware.ts next.config.ts package.json package-lock.json tsconfig.json postcss.config.mjs eslint.config.mjs next-env.d.ts
rm -rf .next node_modules tsconfig.tsbuildinfo
```

`../portfolio-v2-ref` contient l'ancienne version, en lecture seule, pour s'y référer. On garde `.git`, `.github`, `.gitignore`, `.nvmrc`, `.env`, `.env.example`, `LICENSE`, `README.md` et le dossier `passation/`.

### Ce qui doit survivre (à reprendre depuis la v2)

- **Les URLs, à l'identique** : `/fr` et `/en`, `/[locale]/projects`, `/[locale]/projects/[slug]`, `/[locale]/blog`, `/[locale]/blog/[slug]`, `/[locale]/about`, `/[locale]/experiences`, `/[locale]/contact`. Les slugs des projets et des articles ne changent pas. Si une URL doit changer, prévoir une redirection 301.
- **Le SEO** :
  - les métadonnées par page, la balise canonique et les `hreflang` FR/EN ;
  - la vérification Google Search Console ;
  - `robots.ts`, `sitemap.ts`, `manifest.ts`, le JSON-LD (`components/seo/JsonLd.tsx`) et `public/llms.txt` ;
  - l'image de partage.
- **Le formulaire de contact** : `app/api/contact/route.ts`, `lib/mailer.ts`, `services/email.service.ts` (nodemailer) et les variables de `.env`.
- **L'i18n** avec next-intl, le routing et le middleware.
- **Vercel Analytics et Speed Insights.**
- **Le contenu** de `lib/data.js` (projets, articles du blog, expériences), à migrer en TypeScript typé avec les changements listés plus bas.
- **Les fichiers utiles de `public/`** : `pfp.png` et `files/cv.pdf` (à remplacer par le nouveau CV).
- **Les skills du repo** : `.claude/skills/` (design, design-system, ui-styling, ui-ux-pro-max, banner-design, brand, slides) et `.agents/skills/` (animate, animate-expo, animation-vocabulary, apple-design, find-animation-opportunities, improve-animations, review-animations, emil-design-eng, ask-sonner). La commande `git rm` ne les touche pas. Les skills d'animation sont utiles pour relire les animations à la fin de chaque page.

### État des lieux de la v2 (ce qu'on sait du code actuel)

**Configuration**
- Node 25.3 (`.nvmrc`). Scripts : `dev`, `build`, `start`, `lint` (ESLint 9 avec `eslint-config-next`).
- Dépendances : next 16.1.6, react 19.2.4, next-intl 4, gsap 3.14 avec `@gsap/react`, swiper 12, nodemailer 9, `@vercel/analytics`, `@vercel/speed-insights`, playwright en dépendance de dev.
- `next.config.ts` : plugin next-intl (`./src/i18n/request.ts`), `compress: true`. Les images sont en `unoptimized: true`, avec les formats AVIF/WebP, un cache d'un an et des tailles personnalisées.
- Alias d'import : `@/src/...`.

**i18n**
- `defineRouting({ locales: ['fr', 'en'], defaultLocale: 'fr' })`.
- Le middleware next-intl a pour matcher `/((?!api|_next|_vercel|.*\..*).*)`.
- `app/page.tsx` redirige `/` vers `/fr`. `app/layout.tsx` ne fait que renvoyer `children` : le `<html>` est dans `[locale]/layout.tsx`.
- `app/not-found.tsx` est une 404 globale, avec son propre `<html lang="fr">`.

**Métadonnées**
- Chaque route a un `layout.tsx` avec `generateMetadata` : titre via `meta.<page>.title`, description, Open Graph (`type` website, profile ou article), Twitter (`summary_large_image`, `creator: @cestarnaud`).
- `alternates` : la balise canonique, plus `fr`, `en` et `x-default` (qui pointe vers le FR).
- Le layout racine contient aussi :
  - `metadataBase` = `https://arnaudroyer.fr` et le modèle de titre `%s | Arnaud Royer` ;
  - `robots index, follow` et des mots-clés ;
  - la vérification Google `LwvwuxH4t00ZYrf3QLNcFgRRC8AhZhLpJNk2QZfTrFQ` ;
  - `themeColor` (clair `#ffffff`, sombre `#0a0a0a`).
- Les pages `projects/[slug]` et `blog/[slug]` ont un `generateStaticParams` pour les deux langues.

**SEO technique**
- `robots.ts` : tout est autorisé sauf `/api/`, `/_next/` et `/admin/`, avec le sitemap et l'hôte.
- `sitemap.ts` : les pages statiques des deux langues avec des priorités (accueil 1, projets 0.9, à propos et blog 0.8, expériences 0.7, contact 0.6), puis chaque projet (0.7) et chaque article (0.6, avec `lastModified` = la date du post).
- `manifest.ts` : nom, `short_name`, couleurs `#0a0a0a` à remplacer par celles de la D.A., icônes `public/icons/icon-192x192.png` et `icon-512x512.png`.
- `app/icon.png` et `app/apple-icon.png` servent de favicon et d'icône Apple. Ils sont à refaire avec le nouveau logo.
- JSON-LD :
  - `Person` : `jobTitle`, `sameAs` GitHub et LinkedIn, `knowsAbout`, `alumniOf` EPSI Montpellier et IUT de Meaux, `worksFor` Kollirama ;
  - `WebSite` ;
  - `CreativeWork` par projet et `BlogPosting` par article ;
  - `BreadcrumbList` sur les pages de projet et d'article.
  
  À reprendre en mettant à jour la description (plus de « passionné… expériences modernes ») et `knowsAbout` (ajouter React Native, Python, Supabase).
- `public/llms.txt` : résumé du site pour les IA, à mettre à jour. Retirer les « valeurs », ajouter Tengo!, mettre à jour les compétences et garder les liens.

**Formulaire de contact**
- `POST /api/contact` attend `{ from_name, from_email, subject, message }`. Tous les champs sont obligatoires et l'email est vérifié par une regex. La route répond 400 si un champ est invalide, 500 si l'envoi échoue.
- L'envoi passe par nodemailer en SMTP OVH (`ssl0.ovh.net`, port 465, `secure`). Variables : `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`.
- Le mail arrive sur `SMTP_USER`, avec l'objet `[Portfolio] <sujet>`, `replyTo` sur le visiteur et un template HTML sobre.
- Le formulaire v3 remplace la liste déroulante par des chips. Le champ `subject` reçoit le libellé de la chip choisie (« Un site vitrine », « Une appli web », « Une alternance », « Un renfort sur un projet », « Autre chose »). Garder la validation et les messages d'erreur, mais les afficher dans la D.A.

**Animations et interface**
- `SmoothScroll` utilise GSAP ScrollSmoother, seulement à partir de 1024px et désactivé en mode « animations réduites ».
- `PageTransition` est un rideau `scaleY` à chaque changement de `pathname`.
- `CustomCursor` et `MagneticButton` existent aussi. Swiper sert au carrousel de la page projet.

**Contenu (`src/lib/data.js`)**
- `projectsData` : 11 projets, chacun avec :
  - `id`, `title`, `slug`, `year`, `type` ;
  - `description`, `longDescription` et `challenge` (en FR et EN) ;
  - `technologies`, `image[]` (chemins dans `public/images/projects/`), `link` et `category` (FR et EN).
  
  `getProjects(locale)` renvoie la liste à l'envers (le plus récent d'abord).
- `blogPostsData` : 8 posts, chacun avec `title`, `excerpt` et `content` (FR et EN), `slug`, `date`, `linkedinUrl` et `tags`.
- `experiencesData` : 4 expériences (freelance, Kollirama, Igocreate, stage graphiste chez Olivier Nonis / Graphevent).
- `skills` et `valuesData` : les compétences avec un pourcentage et les « valeurs », toutes les deux supprimées en v3.

**À ne pas reprendre**
- Les barres de compétences, les valeurs et les textes « passionné ».
- « Disponible pour du remote » et « Disponible pour de nouveaux projets » (Arnaud ne veut plus afficher de disponibilité).
- Le vouvoiement : la v3 tutoie.
- Le README v2 parle d'EmailJS, alors que le site utilise nodemailer. Il est à réécrire en fin de projet.

### Points de vigilance techniques

- **ScrollSmoother et `position: sticky` ne font pas bon ménage** : ScrollSmoother déplace le contenu avec `transform`. Pour les cartes empilées de l'accueil, soit on garde le smooth scroll et on fait l'empilement avec ScrollTrigger `pin`, soit on retire le smooth scroll. Demander à Arnaud.
- **Le curseur custom et les transitions de page** doivent survivre aux navigations client de Next (pas de double écouteur, nettoyage au démontage).
- **Les animations en boucle** ne doivent pas provoquer de re-render React : uniquement du CSS.
- **Le paquet de cartes** se mélange tout seul. Il faut arrêter le minuteur hors écran, quand l'onglet est caché (`visibilitychange`) et en mode « animations réduites ».
- **Swiper n'est plus nécessaire** : les carrousels mobiles se font en CSS (`scroll-snap`). Proposer de retirer la dépendance.
- **Images** : `unoptimized: true` en v2. Demander à Arnaud s'il veut activer l'optimisation Vercel, ou garder des images déjà optimisées à la main.
- **Les textes en cercle** (tampons) doivent faire exactement le tour : `textLength` égal à environ 2πr moins 10, `lengthAdjust="spacing"`, sans `letter-spacing` en plus.

### Stack conseillée

Next.js 16 (App Router), React 19, TypeScript strict, Tailwind 4, next-intl, GSAP avec ScrollTrigger, `next/font`. Pas de nouvelle grosse dépendance sans demander.

### Architecture proposée (à présenter à Arnaud à l'étape 0, ajustable)

```
src/
  app/
    [locale]/
      layout.tsx            polices, Nav, Footer, Cursor, PageTransition, Analytics
      page.tsx              accueil
      projects/page.tsx
      projects/[slug]/page.tsx
      blog/page.tsx
      blog/[slug]/page.tsx
      about/page.tsx
      experiences/page.tsx
      contact/page.tsx
      not-found.tsx
    api/contact/route.ts    repris de la v2
    robots.ts  sitemap.ts  manifest.ts  layout.tsx  not-found.tsx
  components/
    ui/          Button, Chip, Sticker, Stamp, Badge, BrowserFrame, PhoneFrame
    layout/      Nav, MobileNav, Footer, PageTransition, ScrollProgress
    motion/      Cursor, Reveal, Marquee, TextPop, Wave (soulignement en vague)
    projects/    ProjectCard, ProjectCardCompact, ProjectDeck, ProjectStack, ProjectFilters
    sections/    blocs propres à chaque page (Hero, Now, Toolbox, Services, Process, Timeline…)
    seo/         JsonLd
  content/       projects.ts, posts.ts, experiences.ts, skills.ts, services.ts (typés)
  lib/           mailer.ts, email.service.ts, utils
  hooks/         usePrefersReducedMotion, useIsTouch
  i18n/          routing.ts, navigation.ts, request.ts
  styles/        globals.css (variables de couleurs, @theme Tailwind, keyframes)
messages/        fr.json, en.json
middleware.ts
```

Conventions :
- composants serveur par défaut, `"use client"` uniquement pour ce qui anime ou réagit ;
- GSAP chargé seulement côté client, avec un nettoyage propre (`gsap.context`, `useGSAP`) ;
- pas de texte en dur dans les composants : il vient de `messages/` ou de `content/` ;
- un composant par fichier, avec des noms explicites.

## Les pages, section par section

Les maquettes font foi. Ce résumé sert à ne rien oublier. Le desktop est fluide jusqu'à 1200px de contenu (1440px d'écran). Le mobile est pensé à 390px, avec un point de rupture autour de 768px.

**Accueil**
- Desktop :
  - hero : le titre mot par mot (« sites » qui se balance, « applis » qui flotte, « outils » souligné en vague), une phrase dont le dernier mot change tout seul et deux boutons ;
  - à droite du hero, le paquet de cartes avec le tampon tournant ;
  - double bandeau croisé ;
  - les projets empilés au scroll ;
  - « Qui c'est ? » et « En ce moment » ;
  - la boîte à outils en stickers, puis le Footer.
- Mobile : même ordre, menu plein écran, paquet qu'on touche pour mélanger, projets en carrousel horizontal avec des points.

**Projets** : titre, filtres et compteur.
- Desktop : grille de cartes, avec une vue « Liste » en plus.
- Mobile : filtres qui défilent et cartes compactes.

**Détail projet (exemple : Quested)**
- Retour aux projets.
- Hero dans la couleur du projet, lettres qui rebondissent. La capture est dans un navigateur en desktop, dans un téléphone en mobile.
- Type, équipe et stack.
- « Le projet » et « Le plus dur », avec des stickers.
- Galerie : agrandissable en desktop, carrousel en mobile.
- Projet suivant.

**À propos**
- Titre, polaroïd qui se balance et texte.
- Quatre cartes de services qui se retournent : site vitrine, appli web, back-office, appli mobile.
- « Comment je travaille » en quatre étapes.
- La boîte à outils par groupe, avec « J'apprends ».

**Parcours (`/experiences`)** : frise des expériences qui se déplient, avec le badge « En cours », puis les cartes de formation.

**Blog** : filtres par sujet, le dernier post en grand avec son tampon, puis les autres. Les pages `/blog/[slug]` existantes sont à refaire dans la même D.A. (titre, date, sujet, texte, lien LinkedIn).

**Contact** : formulaire (nom, email, sujet en chips, message avec petit texte qui réagit, envoi animé, confirmation avec confettis), puis les contacts directs (copier l'email, LinkedIn, GitHub) et l'heure de Montpellier.

**404** : non maquettée. Proposer une page dans la D.A., par exemple une carte « N°404 » avec un bouton de retour à l'accueil.

## Accessibilité

- Contraste d'au moins 4.5:1 pour le texte (les couples couleur et texte du tableau le respectent).
- Focus visible sur tout ce qui est cliquable, avec un contour pointillé violet.
- Cibles tactiles d'au moins 44px.
- Vrais `<button>` et `<a>` partout, jamais de `div` cliquable.
- Le menu mobile se ferme avec Échap, garde le focus à l'intérieur quand il est ouvert et le rend au bouton en se fermant.
- Les animations décoratives sont en `aria-hidden`. Le paquet de cartes est un bouton avec un libellé.
- Avec `prefers-reduced-motion`, plus aucune animation en boucle, plus de curseur custom, et des apparitions instantanées.

## Performance

- Objectifs Lighthouse mobile : au moins 90 en Performance, 100 en Accessibilité et en SEO. Côté Core Web Vitals : LCP sous 2.5s, CLS sous 0.1, INP sous 200ms.
- Images en WebP ou AVIF avec `next/image`, aux bonnes tailles, en lazy loading sauf dans le hero.
- Polices avec `next/font` (affichage en swap, sous-ensembles latins).
- Animations en boucle en CSS (`transform`, `opacity`), pas en JavaScript. GSAP seulement pour le scroll et les interactions.
- Animations mises en pause quand elles sont hors écran, si possible.

## La D.A. en bref

Néo-brutal coloré : fond papier, encre noire, bordures de 2px, ombres dures décalées, couleurs franches. Le concept : les projets sont des **cartes à collectionner** numérotées (N°1 à N°12), chacune avec sa couleur.

### Couleurs

| Nom | Hex | Texte dessus |
|---|---|---|
| Encre | `#121212` | `#F7F7F2` |
| Papier (fond) | `#F7F7F2` | encre |
| Violet (marque, actions) | `#6B3CF0` | blanc |
| Cobalt | `#2E5BFF` | blanc |
| Citron | `#C8F54A` | encre |
| Tomate | `#FF5B37` | encre |
| Soleil | `#FFCB3D` | encre |
| Rose | `#FF9BD0` | encre |
| Texte secondaire | `#3A3A35` / `#4A4A44` | |

Couleurs de projet : Tengo! tomate, Quested violet, FutureKawa citron, Atelier Maha soleil, IDK Concept rose, Kollirama cobalt, Igotrack blanc, Stellarica tomate, Foliode soleil, Igowall violet, Template Bench citron, Tiptap FontSize rose. Une couleur par projet, la même partout (carte, page détail, image de partage).

### Typographie (via `next/font/google`)

- **Bricolage Grotesque** 800 pour les titres : `letter-spacing` entre -0.02em et -0.05em, `line-height` 0.9 à 1.05. Le titre de l'accueil utilise aussi `font-variation-settings: 'wdth' 88`.
- **Karla** 400/500/700 pour le texte courant (16 à 19px, interligne 1.5 à 1.6).
- **JetBrains Mono** 400/600 pour les étiquettes (N°, dates, chips de techno), entre 11 et 14px.

### Formes

- Bordure : `2px solid #121212` partout (1.5px pour les petites chips).
- Ombres dures : `4px 4px 0 #121212` (boutons, petits blocs) et `6px 6px 0 #121212` (cartes). Au survol, la carte monte de 4 à 5px et l'ombre passe à 10 ou 11px.
- Rayons : 14px pour les boutons, 18 à 26px pour les cartes, 999px pour les pills.
- Étoile à 4 branches (motif récurrent) : `M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z`.
- Soulignement en zig-zag (sous « outils » et sous arnaudroyer.fr) : SVG `M0 5 Q5 0 10 5 T20 5 … T160 5`, trait tomate de 3px.

### Logo (piste A, validée)

Une petite carte violette inclinée à -6°, avec « ar » en Bricolage 800 blanc, bordure et ombre dure, plus une étoile citron qui tourne dans le coin en haut à droite. Dans la nav : la carte à côté de « arnaud royer » en Bricolage 800. Favicon : un carré violet arrondi avec « ar », sans étoile. Voir le plan de travail « Nouveau logo ».

## Composants à créer

- `Button` : variantes violet, blanc et citron, ombre 4px. Au survol, il monte de 2px. Au clic, il s'enfonce et l'ombre disparaît.
- `Chip` / `Sticker` : pill colorée, légèrement tournée, qui flotte et tremble au survol.
- `ProjectCard` : en-tête mono (N° · type · année), faux navigateur avec la capture, titre, description, chips de stack, badge. Au survol, ses points de navigateur se colorent et la flèche tourne de 45°.
- `Nav` (desktop) : barre blanche arrondie avec ombre, liens soulignés au survol, lien actif en pill encre, bouton FR / EN. Pas de mention « Dispo pour missions ».
- `MobileNav` : bouton menu, menu plein écran violet qui s'ouvre en cercle depuis le bouton, gros liens qui arrivent un par un, lien actif en pill citron.
- `Footer` : bloc violet « On en parle ? » (point d'interrogation qui se balance), email en grand, boutons, puis la ligne « © 2026 Arnaud Royer ».
- `Cursor` : point qui suit la souris avec un léger retard, puis devient une étiquette (« Voir le projet », « Mélanger », « Écris-moi »…) sur les éléments qui ont `data-cursor`. Désactivé sur tactile et en mode « animations réduites ».
- `Marquee` : bandeau défilant, en version double et croisée sur l'accueil.
- `Stamp` : tampon rond qui tourne, texte « DÉVELOPPEUR FULLSTACK · MONTPELLIER · » sur un `textPath`, avec `textLength` égal au périmètre et `lengthAdjust="spacing"` pour éviter les chevauchements.

Ces composants remplacent `CustomCursor` et `MagneticButton`. On supprime aussi les barres de compétences en % et les blocs « valeurs ».

## Animations

Tout est à couper si l'utilisateur limite les animations (`prefers-reduced-motion`).

**Apparition**
- Titres mot par mot : opacité 0 vers 1, translation de 0.55em, rotation de 7° vers 0. Durée 0.7s, `cubic-bezier(.2,1.5,.4,1)`, décalage de 70 à 90ms par mot.
- Textes et blocs : montée de 30px en 0.8s.
- Au scroll : montée de 70px avec scale 0.94, ou entrée par la gauche ou la droite. Dans la maquette, c'est fait en CSS `animation-timeline: view()`. **En production, utiliser GSAP ScrollTrigger**, car Firefox ne gère pas `view()`.

**En boucle, très légères**
- Mot surligné qui se balance (rotation de -3° à 2° en 2.6s).
- Pill qui flotte (6 à 8px en 2.2 à 3.4s).
- Soulignement en vague qui défile, étoiles qui tournent (6s), tampons (16s).
- Pastille qui pulse.

**Interactions**
- **Paquet de cartes de l'accueil** : se mélange tout seul toutes les 3.8s (en pause au survol). Au clic, la carte du dessus s'envole et repasse sous le paquet. Au survol, les cartes s'étalent en éventail.
- **Cartes de projets empilées au scroll (accueil desktop)** : `position: sticky` avec un `top` décalé de 26px par carte.
- **Filtres (Projets, Blog)** : à chaque changement, les cartes réapparaissent en cascade.
- **Page À propos** : cartes de services qui se retournent en 3D, au survol sur desktop et au toucher sur mobile.
- **Page Parcours** : la frise se dessine au scroll, et chaque expérience se déplie avec « Ce que j'y ai fait ».
- **Page Contact** :
  - le sujet choisi rebondit et un petit texte réagit à la longueur du message ;
  - à l'envoi, l'avion s'envole puis des confettis apparaissent ;
  - un bouton copie l'email, et l'heure de Montpellier s'affiche en direct.
- **Transitions entre pages** : quatre bandes de couleur (violet, citron, tomate, soleil) montent en cascade avec le nom de la page d'arrivée, puis repartent vers le haut. La variante « cercle » est sur le plan de travail « Curseur et transitions ». À brancher sur le `PageTransition` existant.
- **Barre de progression** de lecture en haut de chaque page, dans la couleur de la page.

## Contenus à mettre à jour

### Contenu (repris de `src/lib/data.js` de la v2, vers `src/content/`)

- Ajouter **Tengo!** en N°12 (2026, Mobile, projet perso, en bêta) :
  - description : « Le Killer entre potes : l'appli tire les cibles, donne les missions secrètes et compte les kills. En bêta sur iPhone et Android. » ;
  - stack : React Native, Expo, tRPC, Prisma ;
  - lien : https://playtengo.app.
- Ajouter à chaque projet un numéro (N°1 = Tiptap, … N°11 = Quested, N°12 = Tengo!), une couleur, et une couleur de texte (encre ou blanc).
- Réécrire les descriptions courtes dans le ton de la maquette. Les textes sont dans `Projets.dc.html`.
- Compétences :
  - Front et mobile : SvelteKit, React / Next.js, React Native, TypeScript, Tailwind, Astro, GSAP.
  - Back : Node.js / Express, Python, NestJS, PostgreSQL, MySQL, Prisma, Supabase, puis PHP / Symfony en dernier (peu utilisé).
  - Outils : Git, Docker, Figma, Illustrator, Photoshop.
  - J'apprends : Java, Spring, Payload CMS.
  - Pas de Vue.js ni de Ruby.
- Services (page À propos) : site vitrine, appli web, back-office, appli mobile. Pas d'API.

### Infos à connaître sur chaque projet (d'après `data.js`)

| N° | Projet | Slug | Année | Catégorie v2 | Lien | À savoir |
|---|---|---|---|---|---|---|
| 1 | Tiptap FontSize Extension | `tiptap-fontsize-extension` | 2024 | Open-source | GitHub itsarnaud | Publiée sur npm, plus complète que l'extension officielle. |
| 2 | Template Engine Benchmark | `benchmark` | 2024 | Stage | GitHub itsarnaud | Compare Pug, EJS, Handlebars, Liquid, Eta, Dust, Igodust. Contributions externes. |
| 3 | Igowall | `igowall` | 2024 | Alternance | igowall.com | SaaS no-code. Arnaud a fait la refonte visuelle et de nouvelles fonctionnalités. |
| 4 | Foliode | `foliode` | 2025 | Cours | GitHub itsarnaud | Équipe de 5. Arnaud était chef de projet et Scrum Master. Éléments 3D (Blender, Three.js). |
| 5 | Stellarica | `stellarica` | 2025 | Perso | GitHub itsarnaud | Bot Discord de modération (Discord.js 14, Prisma, MySQL). |
| 6 | Igotrack | `igotrack` | 2025 | Alternance | igotrack.co | Outil de gestion de projet interne, fait en équipe. |
| 7 | Kollirama | `kollirama` | 2026 | Alternance | kollirama.fr | Seul dev. Monorepo, site vitrine FR/EN et back-office (Astro, Prisma, Supabase, MJML, OAuth LinkedIn, JWT RS256). |
| 8 | IDK Concept | `idk-concept` | 2026 | Alternance | idk-concept.fr | Site vitrine d'agencement, GSAP, Brevo pour le contact. |
| 9 | Atelier Maha | `atelier-maha` | 2026 | Client (premier projet freelance) | ateliermaha.fr | Studio d'architecture d'intérieur. |
| 10 | FutureKawa | `futurekawa` | 2026 | Cours (MSPR) | GitHub itsarnaud | Backend par pays, MQTT, IoT, Docker Compose. Arnaud a fait l'API et la doc technique. |
| 11 | Quested | `quested` | 2026 | Perso | quested.cc | Letterboxd du jeu vidéo, open source. IGDB et RAWG, Google et Discord, Upstash Redis, Neon, import Steam. |
| 12 | Tengo! | `tengo` | 2026 | Perso | playtengo.app | Nouveau, voir ci-dessous. |

- Les catégories v2 (« Projet perso », « de cours », « d'alternance », « client », « open-source », « de stage ») servent de chips sur les cartes et de filtres. Les filtres de la maquette Projets sont à aligner dessus.
- Les champs `longDescription` et `challenge` (FR et EN) alimentent la page détail (« Le projet » et « Le défi »). Les garder, en retirant les formules creuses et les tirets cadratins.
- `getProjects(locale)` renvoie la liste à l'envers. En v3, trier explicitement par numéro décroissant, plutôt que de dépendre de l'ordre du tableau.
- Images existantes dans `public/images/projects/<slug>/` : à garder en secours si une capture échoue.

**Tengo!** (source : les notes Obsidian d'Arnaud) :
- jeu du Killer entre potes : l'appli tire les cibles, donne des missions secrètes (357 missions) et compte les kills ;
- appli : Expo, React Native, TypeScript, Expo Router, NativeWind, TanStack Query ;
- API : Hono et tRPC, hébergée sur Render, avec Prisma, Postgres sur Neon, Better Auth et pg-boss ;
- le site playtengo.app est sur Vercel ;
- statut : bêta sur TestFlight et en test fermé sur Google Play. Une version Pro à 5 € est prévue (ne pas l'afficher pour l'instant) ;
- le logo de Tengo! existe en SVG dans les notes d'Arnaud (`Obsidian/Notes/10_Concepts`). Lui demander de le copier dans `public/images/projects/tengo/` pour la couverture.

### Blog

- 8 articles dans `blogPostsData`, chacun avec `title`, `excerpt`, `content` (texte complet, FR et EN), `slug`, `date`, `linkedinUrl` et `tags`.
- Les URLs `/blog/<slug>` existent et sont indexées : garder les mêmes slugs.
- Les catégories de la maquette (Mes projets, IA, Freelance, Société) sont nouvelles. Ajouter un champ `category` à chaque article, en s'inspirant des tags existants, puis faire valider le classement à Arnaud.
- Le `content` utilise des `\n\n` pour séparer les paragraphes : le découper en `<p>`.
- Sur la liste, chaque carte renvoie vers la page de l'article sur le site, avec un lien secondaire « Lire sur LinkedIn » (les maquettes simplifient avec un lien direct vers LinkedIn, mais la page interne est meilleure pour le SEO).

### Parcours

4 expériences dans `experiencesData` : freelance, Kollirama (alternance), Igocreate (alternance) et un stage de graphiste chez Olivier Nonis / Graphevent. Les formations sont l'EPSI Montpellier et l'IUT de Meaux (voir le JSON-LD `alumniOf`). Les textes « Ce que j'y ai fait » de la maquette `Parcours.dc.html` sont à réutiliser.

### `messages/fr.json` et `messages/en.json`

Reprendre les textes des maquettes : accueil, À propos, Projets, Parcours, Blog et Contact. La version anglaise est à traduire dans le même ton.

Clés v2 existantes : `meta.*`, `nav.*`, `footer.rights`, `home.*`, `about.*`, `projects.*`, `project.*`, `blog.*`, `blogPost.*`, `experiences.*`, `contact.*`, `notFound.*`. Garder ce découpage par page, mais réécrire les valeurs :
- `meta.*` : nouveaux titres et descriptions, toujours sous 60 et 155 caractères ;
- `about.*` : retirer Hermès, les valeurs et les barres de compétences ;
- `contact.*` : remplacer les options de sujet (`subjectProject`, `subjectCollaboration`, `subjectJob`, `subjectOther`) par les chips de la maquette, et retirer « Disponible pour du remote ». Arnaud doit valider la phrase sur le délai de réponse (la v2 dit « je réponds généralement sous 24h ») ;
- `notFound.*` : nouvelle 404 dans la D.A., avec un petit clin d'œil, à proposer à Arnaud.

## Captures des projets (étape 1)

Playwright est déjà dans les dépendances. Faire un script `scripts/captures.mjs` qui capture chaque site :

- en desktop, 1440×900, `deviceScaleFactor: 2` ;
- en mobile, 390×844, `deviceScaleFactor: 3`, `isMobile: true` ;
- en attendant le chargement des polices et des animations (`networkidle` puis une petite pause), avec les bannières de cookies fermées si besoin.

Sites à capturer :
- Quested : https://quested.cc (accueil, fiche d'un jeu, profil, import Steam)
- Tengo! : https://playtengo.app
- Kollirama : https://kollirama.fr
- Atelier Maha : https://ateliermaha.fr
- IDK Concept : https://www.idk-concept.fr
- Igowall : https://www.igowall.com
- Igotrack : https://igotrack.co

Enregistrer dans `public/images/projects/<slug>/desktop.png` et `mobile.png`, puis convertir en WebP.

Pour les projets sans site (Foliode, Stellarica, FutureKawa, Template Bench, Tiptap FontSize), proposer une couverture générée dans la D.A. : carte couleur du projet, nom et stack. Pas de capture de GitHub.

## Visuels à exporter

Depuis le canvas (Partager › Exporter) :
- la bannière LinkedIn, 1584×396 ;
- l'image de partage, 1200×630, qui remplace `public/images/og-image.png` ;
- le CV en PDF A4, qui remplace `public/files/cv.pdf`.

À créer en code : le logo en SVG propre, à partir de la piste A, et les favicons en 16, 32, 180 et 512px.

## Plan d'intégration (valider chaque étape avec Arnaud)

0. Proposer l'arborescence du nouveau projet (dossiers, fichiers clés, conventions), la faire valider, puis l'installer : Next.js, TypeScript, Tailwind, next-intl, GSAP, lint. Brancher l'i18n et le middleware, et vérifier que `npm run build` passe.
1. Script de captures et images optimisées.
2. Couleurs, polices et formes dans `globals.css` et le layout.
3. Contenu typé (projets, articles, expériences) migré depuis la v2, avec les changements de ce document (y compris le retrait d'Hermès), puis `fr.json` et `en.json`.
4. Composants de base : Button, Chip, Sticker, ProjectCard, Stamp, Marquee.
5. Nav desktop et mobile, Footer, Cursor, transitions entre pages.
6. Accueil, desktop puis mobile.
7. Projets et détail projet.
8. À propos, Parcours, Blog (avec les pages d'articles), Contact (avec l'API reprise de la v2).
9. SEO repris de la v2 : métadonnées, canonical, hreflang, sitemap, robots, manifest, JSON-LD, llms.txt, vérification Google. Puis logo, favicons et image de partage.
10. Tests : toutes les anciennes URLs répondent, mobile, mode « animations réduites », accessibilité (contraste, focus visible, cibles de 44px), Lighthouse.
11. Preview Vercel, puis production.

## Points encore ouverts

- Mode sombre : la v2 en avait un, les maquettes v3 n'en ont pas. À demander à Arnaud avant l'étape 2.
- Le jeu du moment d'Arnaud, pour le bloc « En ce moment ».
- Le lien du dernier post LinkedIn (les liens exacts sont dans `data.js`).
- Les liens App Store et Play Store de Tengo!, une fois l'appli publiée.
- Smooth scroll : garder ScrollSmoother (et faire les cartes empilées avec ScrollTrigger `pin`) ou le retirer pour garder le `sticky` en CSS ? À demander avant l'étape 6.
- Optimisation des images : activer celle de Vercel ou garder `unoptimized: true` avec des WebP faits à la main ?
- Le template HTML du mail de contact : le garder tel quel ou le passer dans la D.A. ?
- Le dossier vide `src/app/wrapped/` de la v2 : Arnaud prévoyait peut-être une page `/wrapped`. Lui demander s'il faut la réserver.
- Retirer Swiper des dépendances (remplacé par du `scroll-snap`) : à confirmer.
- Le classement des articles du blog dans les catégories (Mes projets, IA, Freelance, Société).
- Le texte de la 404.
