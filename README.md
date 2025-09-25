# Portfolio Arnaud Royer

Mon portfolio personnel développé avec **SvelteKit** et **Tailwind CSS**. Ce site présente mes projets, compétences et mon parcours en tant que développeur fullstack.

## 🚀 Technologies utilisées

- **Framework** : SvelteKit
- **Styling** : Tailwind CSS
- **Language** : JavaScript
- **Bundler** : Vite
- **Carrousel** : Swiper.js
- **Icons** : Font Awesome
- **Déploiement** : Vercel

## 📁 Structure du projet

```txt
src/
├── lib/
│   ├── components/          # Composants réutilisables
│   │   ├── Button.svelte
│   │   ├── Navbar.svelte
│   │   ├── Project.svelte
│   │   └── ...
│   └── config/              # Configuration et données
│       ├── projects.js      # Liste des projets
│       └── skills.js        # Compétences par catégorie
├── routes/
│   ├── +layout.svelte      # Layout principal
│   ├── +page.svelte        # Page d'accueil
│   ├── [slug]/             # Pages de détail des projets
│   └── mentions-legales/   # Mentions légales
└── static/                 # Assets statiques
```

## 🛠️ Installation et développement

### Prérequis

- Node.js 22 (voir `.nvmrc`)
- npm, pnpm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/itsarnaud/Portfolio.git
cd Portfolio

# Installer les dépendances
npm install
```

### Développement

```bash
# Lancer le serveur de développement
npm run dev
```

## 🎨 Fonctionnalités

- **Design responsive** : Optimisé pour tous les écrans
- **Carrousel d'images** : Galerie interactive pour les projets
- **Animations** : Effets visuels avec Tailwind CSS
- **Routing dynamique** : Pages de détail générées automatiquement

## 📱 Sections

- **À propos** : Présentation personnelle
- **Compétences** : Technologies maîtrisées par catégorie
- **Projets** : Portfolio de réalisations avec détails
- **Veille technologique** : Ressources
- **Contact** : Moyens de me contacter

## 🎯 Projets mis en avant

Le portfolio présente 11 projets couvrant diverses technologies :

- **Stellarica** : Bot Discord (JavaScript, Prisma)
- **Infranéo** : Gestion de parc informatique (Vue.js, Java Spring)
- **Igotrack** : Gestion de projet (Svelte, Node.js)
- **Foliode** : Générateur de portfolios (Next.js, Symfony)
- Et bien d'autres...

## 🔧 Configuration

### Tailwind CSS

Le thème personnalisé inclut :

- Couleur principale : `light-purple` (#7E30E1)
- Configuration responsive complète
- Utilities personnalisées

### Adapter

Le projet utilise `@sveltejs/adapter-auto` pour un déploiement automatique sur diverses plateformes.

## 📄 Licence

© 2025 Arnaud Royer. Tous droits réservés.

## 📞 Contact

- **Email** : <arnaud.royer77@gmail.com>
- **Portfolio** : [en ligne](https://arnaud-royer.xyz)
- **GitHub** : [@itsarnaud](https://github.com/itsarnaud)
