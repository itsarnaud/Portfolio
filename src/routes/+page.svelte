<script>

  import Button       from "$lib/components/Button.svelte";
  import Project      from "$lib/components/Project.svelte";
  import Category     from "$lib/components/Category.svelte";

  import { skills }   from "$lib/config/skills";
  import { projects } from "$lib/config/projects";


</script>

<svelte:head>
  <title>Arnaud Royer - Portfolio</title>
  <meta name="description" content="Portfolio d'Arnaud Royer, développeur fullstack en alternance chez Kollirama. Spécialisé en SvelteKit, React, Vue.js, Node.js et technologies web modernes. Découvrez mes 11+ projets et compétences." />
  <meta name="keywords" content="Arnaud Royer, développeur fullstack, SvelteKit, React, Vue.js, JavaScript, TypeScript, Node.js, portfolio, développeur web, Montpellier, EPSI, alternance" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Arnaud Royer - Portfolio" />
  <meta property="og:description" content="Portfolio d'Arnaud Royer, développeur fullstack en alternance chez Kollirama. Spécialisé en SvelteKit, React, Vue.js, Node.js et technologies web modernes." />
  <meta property="og:url" content="https://arnaud-royer.fr" />
  
  <!-- Twitter -->
  <meta name="twitter:title" content="Arnaud Royer - Portfolio" />
  <meta name="twitter:description" content="Portfolio d'Arnaud Royer, développeur fullstack en alternance chez Kollirama. Spécialisé en SvelteKit, React, Vue.js, Node.js et technologies web modernes." />
</svelte:head>

<!-- Blobs -->
<img src="/blobs/Blob1.png" alt="blob1" class="hidden absolute w-[800px] top-0 left-1/4 -z-10 select-none lg:block">
<img src="/blobs/Blob2.png" alt="blob2" class="hidden absolute w-[800px] top-3/12 left-0 -z-10 select-none lg:block">
<img src="/blobs/Blob3.png" alt="blob2" class="hidden absolute w-[800px] bottom-9/12 right-0 -z-10 select-none lg:block">

<main>

  <section class="flex flex-col items-center justify-around h-screen">
    
    <div class="flex flex-col items-center relative">
      <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl xl:text-7xl">Arnaud Royer</h1>
      <h2 class="text-xl lg:text-2xl xl:text-4xl">Développeur Fullstack</h2>
      <Button href="#about" classes="mt-2 sm:mt-3 lg:text-lg xl:text-xl xl:mt-4">C'est parti !</Button>
      <img src="/blobs/blob.gif" alt="Animation décorative" class="absolute -top-1/2 -z-10 opacity-20 hidden lg:block">
    </div>

    <a href="#about" aria-label="Aller à la section À propos"><i class="fa-solid fa-arrow-down-long text-light-purple animate-bounce mt-28 text-xl"></i></a>

  </section>

  <section id="about" class="relative" aria-labelledby="about-title">

    <!-- Blobs -->
    <img src="/blobs/Blob4.png" alt="" class="hidden absolute w-[800px] top-36 left-40 -z-10 select-none lg:block" aria-hidden="true">

    <h2 id="about-title" class="text-light-purple font-bold px-3 mb-20 text-lg lg:text-xl xl:text-2xl xl:px-10">01 | À propos de moi</h2>

    <div class="flex flex-col justify-center items-center gap-5 lg:gap-20 md:flex-row md:px-5 xl:px-16">
      <img src="/portrait.JPEG" alt="Portrait d'Arnaud Royer" class="w-[200px] sm:w-[300px] lg:w-[400px] xl:w-[500px] rounded-lg">
      <div class="px-5 text-sm md:p-0 lg:text-base">
        <p>Salut, c’est Arnaud :) <br/><br/></p>
        <p>Je suis développeur fullstack en alternance chez Kollirama et actuellement en 1ère année de Master Expert en Informatique et SI à l'école EPSI de Montpellier.<br/><br/></p>
        <p>Passionné par le web et la tech en général, j’ai découvert la programmation avec Python, puis j’ai plongé dans le développement web, et là… c’était une évidence. Aujourd’hui, je continue d’apprendre tous les jours, en entreprise comme sur mes projets persos.<br/><br/></p>
        <!-- <p>Parmi eux, il y a Infranéo, une application de gestion de parc informatique que je développe actuellement avec des amis. C’est un vrai terrain d’expérimentation, et vous pouvez suivre l’évolution du projet sur ma page LinkedIn (cliquez sur le bouton juste en dessous ;)).<br/><br/></p> -->
        <div class="flex space-x-2">
          <Button href="/CV.pdf" download="CV_Arnaud_Royer.pdf">Télécharge mon CV !</Button>
          <Button variant="icon" icon="fa-brands fa-linkedin text-[#0e76a8]" href="http://linkedin.com/in/royer-arnaud/" />
          <Button variant="icon" icon="fa-brands fa-github" href="http://github.com/itsarnaud" />
        </div>
      </div>
    </div>

  </section>

  <section id="skills" class="relative">

    <!-- Blobs -->
    <img src="/blobs/Blob3.png" alt="blob2" class="hidden absolute w-[800px] -top-40 right-0 -z-10 select-none lg:block">
    <img src="/blobs/Blob2.png" alt="blob2" class="hidden absolute w-[800px] -top-64 left-0 -z-10 select-none lg:block">

    <h2 class="text-light-purple font-bold px-3 text-lg my-20 lg:text-xl xl:text-2xl xl:px-10">02 | Compétences</h2>

    <div class="flex flex-col items-center justify-center md:flex-row md:gap-20 md:items-start lg:gap-32 xl:gap-40">
      {#each skills as category}
        <Category {category} />
      {/each}
    </div>
    
  </section>

  <section id="projects" class="relative">

    <!-- Blobs -->
    <img src="/blobs/Blob2.png" alt="blob2" class="hidden absolute w-[800px] -top-28 left-0 -z-10 select-none lg:block">

    <h2 class="text-light-purple font-bold px-3 text-lg my-20 lg:text-xl xl:text-2xl xl:px-10">03 | Projets</h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-7 justify-items-center px-5 md:px-20 xl:px-16">
      {#each projects as project}
        <Project {project} />
      {/each}
    </div>

  </section>

  <section id="tech" class="relative">
    <h2 class="text-light-purple font-bold px-3 text-lg my-20 lg:text-xl xl:text-2xl xl:px-10">04 | Veille technologique</h2>

    <div class="px-5 md:w-full md:px-20 xl:px-16">
      <p class="text-sm lg:text-base">Ma veille technologique porte sur la recherche et l'analyse des dernières tendances dans le développement web, l'intelligence artificielle et les frameworks. Pour ce faire, j'utilise surtout <a href="https://app.daily.dev/" class="text-light-purple hover:underline">Daily.dev</a> pour voir une multitude d'article dans ces sujets, les réseaux sociaux pour suivre des experts et des newsletters (sur l'IA par exemple) pour rester informé des évolutions et des découvertes dans ce secteur. J'utilise aussi YouTube pour regarder des vidéos de développeurs sur les nouveautés ou juste pour de l'apprentissage.</p>
    </div>

    <!-- <h3 class="px-5 md:w-full md:px-20 xl:px-16 font-bold text-md mt-6 lg:text-lg xl:text-xl">Quelques articles intéressants :</h3>
    <div class="px-5 md:w-full md:px-20 xl:px-16 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <a href="https://tailwindcss.com/blog/tailwindcss-v4" target="_blank" class="block bg-white shadow-md rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <img src="/articles/tailwind4.jpg" alt="TailwindCSS v4" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="font-bold text-base lg:text-lg text-light-purple">TailwindCSS v4.0</h3>
        </div>
      </a>
      <a href="https://www.showwcase.com/article/34961/orbstack-blazingly-fast-docker-desktop-alternative-for-macos" target="_blank" class="block bg-white shadow-md rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <img src="/articles/orbstack.png" alt="Orbstack" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="font-bold text-lg text-light-purple">OrbStack : une alternative de bureau Docker ultra rapide pour MacOS</h3>
        </div>
      </a>
      <a href="https://blog.bitsrc.io/top-7-alternatives-to-next-js-in-2025-917bf9d5ffba" target="_blank" class="block bg-white shadow-md rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <img src="/articles/next.webp" alt="next" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="font-bold text-lg text-light-purple">Les 7 meilleures alternatives à Next.js en 2025</h3>
        </div>
      </a>
    </div> -->
  </section>

  <section id="contact" class="relative">

    <!-- Blobs -->
    <img src="/blobs/Blob3.png" alt="blob2" class="hidden absolute w-[800px] bottom-0 right-0 -z-10 select-none lg:block">

    <h2 class="text-light-purple font-bold px-3 text-lg my-20 lg:text-xl xl:text-2xl xl:px-10">05 | Me contacter</h2>

    <div class="px-5 md:w-full md:px-20 xl:px-16">
      <h3 class="text-lg font-medium lg:text-xl xl:text-2xl">Une idée ? Un projet ? Une envie ? Allons en discuter !</h3>
      <div class="flex flex-col gap-y-4 mt-7">
        <div>
          <i class="fa-solid fa-phone fa-lg mx-2"></i>
          <a href="tel:+33781521620" class="text-sm lg:text-base hover:underline">07 81 52 16 20</a>
        </div>
        <div>
          <i class="fa-solid fa-envelope fa-lg mx-2"></i>
          <a href="mailto:arnaud.royer77@gmail.com" class="text-sm lg:text-base hover:underline">arnaud.royer77@gmail.com</a>
        </div>
        <div>
          <i class="fa-brands fa-github fa-lg mx-2"></i>
          <a href="https://www.github.com/itsarnaud" class="text-sm lg:text-base hover:underline">itsarnaud</a>
        </div>
        <div>
          <i class="fa-brands fa-linkedin fa-lg mx-2"></i>
          <a href="http://linkedin.com/in/royer-arnaud/" class="text-sm lg:text-base hover:underline">Arnaud Royer</a>
        </div>
      </div>

    </div>


  </section>

</main>