<script>

  import Button       from "$lib/components/Button.svelte";
  import Project      from "$lib/components/Project.svelte";
  import Category     from "$lib/components/Category.svelte";

  import { skills }   from "$lib/config/skills";
  import { projects } from "$lib/config/projects";


</script>

<svelte:head>
  <title>Arnaud Royer - HOME</title>
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
      <img src="/blobs/blob.gif" alt="blob1" class="absolute -top-1/2 -z-10 opacity-20 hidden lg:block">
    </div>

    <a href="#about"><i class="fa-solid fa-arrow-down-long text-light-purple animate-bounce mt-28 text-xl"></i></a>

  </section>

  <section id="about" class="relative">

    <!-- Blobs -->
    <img src="/blobs/Blob4.png" alt="blob2" class="hidden absolute w-[800px] top-36 left-40 -z-10 select-none lg:block">

    <h2 class="text-light-purple font-bold px-3 mb-20 text-lg lg:text-xl xl:text-2xl xl:px-10">01 | À propos de moi</h2>

    <div class="flex flex-col justify-center items-center gap-5 lg:gap-20 md:flex-row md:px-5 xl:px-16">
      <img src="/portrait.JPEG" alt="Moi" class="w-[200px] sm:w-[300px] lg:w-[400px] xl:w-[500px] rounded-lg">
      <div class="px-5 text-sm md:p-0 lg:text-base">
        <p>Salut, c’est Arnaud :) <br/><br/></p>
        <p>J’ai 20 ans, je suis actuellement étudiant en 3ème année de BUT Métiers du Multimédia et de l’Internet et je suis alternant développeur fullstack.<br/><br/></p>
        <p>J’ai toujours été passionné par la programmation et l’informatique en générale. J’ai commencé par bricoler et apprendre des choses en python, puis j’ai découvert le web et c’était le coup de foudre.<br/><br/></p>
        <p>Mon objectif est de devenir développeur fullstack et m’orienter vers un Master en développement web.<br/><br/></p>
        <Button href="/CV.pdf" download="CV_Arnaud_Royer.pdf" classes="">Télécharge mon CV !</Button>
      </div>
    </div>

  </section>

  <section id="skills" class="relative">

    <!-- Blobs -->
    <img src="/blobs/Blob3.png" alt="blob2" class="hidden absolute w-[800px] -top-40 right-0 -z-10 select-none lg:block">
    <img src="/blobs/Blob2.png" alt="blob2" class="hidden absolute w-[800px] -top-64 left-0 -z-10 select-none lg:block">

    <h2 class="text-light-purple font-bold px-3 text-lg my-20 lg:text-xl xl:text-2xl xl:px-10">02 | Skills</h2>

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

  <section id="contact" class="relative">

    <!-- Blobs -->
    <img src="/blobs/Blob3.png" alt="blob2" class="hidden absolute w-[800px] bottom-0 right-0 -z-10 select-none lg:block">

    <h2 class="text-light-purple font-bold px-3 text-lg my-20 lg:text-xl xl:text-2xl xl:px-10">04 | Me contacter</h2>

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