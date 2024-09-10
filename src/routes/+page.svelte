<script>

  import Button       from "$lib/components/Button.svelte";
  import { skills }   from "$lib/config/skills";
  import { projects } from "$lib/config/projects";

</script>

<!-- Blobs -->
<img src="/Blob1.png" alt="blob1" class="hidden absolute w-[800px] top-0 left-1/4 -z-10 lg:block">
<img src="/Blob2.png" alt="blob2" class="hidden absolute w-[800px] top-3/12 left-0 -z-10 lg:block">
<img src="/Blob3.png" alt="blob2" class="hidden absolute w-[800px] bottom-9/12 right-0 -z-10 lg:block">

<main>

  <section class="flex flex-col items-center justify-around h-screen">
    
    <div class="flex flex-col items-center relative">
      <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl xl:text-7xl">Arnaud Royer</h1>
      <h2 class="text-xl lg:text-2xl xl:text-4xl">Développeur Fullstack</h2>
      <Button href="#about" classes="mt-2 sm:mt-3 lg:text-lg xl:text-xl xl:mt-4">C'est parti !</Button>
      <img src="/blob.gif" alt="blob1" class="absolute -top-1/2 -z-10 opacity-20 hidden lg:block">
    </div>

    <a href="#about"><i class="fa-solid fa-arrow-down-long text-light-purple animate-bounce mt-28 text-xl"></i></a>

  </section>

  <section id="about">

    <h2 class="text-light-purple font-bold px-3 mb-7 text-lg lg:text-xl xl:text-2xl xl:px-10">01 | À propos de moi</h2>

    <div class="flex flex-col justify-center items-center gap-5 md:flex-row md:px-5 xl:px-16">
      <img src="/portrait.JPEG" alt="Moi" class="w-[200px] sm:w-[300px] lg:w-[400px] xl:w-[500px] rounded-lg">
      <div class="px-3 text-sm md:p-0 lg:text-base">
        <p>Salut, c’est Arnaud :) <br/><br/></p>
        <p>J’ai 20 ans, je suis actuellement étudiant en 3ème année de BUT Métiers du Multimédia et de l’Internet et je suis alternant développeur fullstack.<br/><br/></p>
        <p>J’ai toujours été passionné par la programmation et l’informatique en générale. J’ai commencé par bricoler et apprendre des choses en python, puis j’ai découvert le web et c’était le coup de foudre.<br/><br/></p>
        <p>Mon objectif est de devenir développeur fullstack et m’orienter vers un Master en développement web.<br/><br/></p>
        <Button href="/CV.pdf" download="CV_Arnaud_Royer.pdf" classes="">Télécharge mon CV !</Button>
      </div>
    </div>

  </section>

  <section id="skills" class="my-7">

    <h2 class="text-light-purple font-bold px-3 text-lg lg:text-xl xl:text-2xl xl:px-10">02 | Skills</h2>

    <div class="flex flex-col items-center justify-center md:flex-row md:gap-20 md:items-start lg:gap-32 xl:gap-40">
      {#each skills as category}
        <div class="flex flex-col gap-4 items-center justify-center md:items-start">
          <h3 class="text-lg font-bold my-7 lg:text-xl xl:text-2xl">{category.title}</h3>
          {#each category.skills as skill}
            <div class="flex items-center gap-2 lg:gap-4">
              <img src={skill.image} alt={skill.name} class="h-10">
              <p class="text-sm lg:text-base">{skill.name}</p>
            </div>
          {/each}
        </div>
      {/each}
    </div>
    
  </section>

  <section id="projects">

    <h2 class="text-light-purple font-bold px-3 text-lg mb-7 lg:text-xl xl:text-2xl xl:px-10">03 | Projets</h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 px-5 justify-items-center xl:px-16">
      {#each projects as project}
        <div class="flex flex-col w-10/12 gap-3 md:w-full">
          <img src={project.img} alt={project.title} class="rounded-2xl">
          <div class="flex justify-between w-full">
            <span>{project.title}</span>
            <Button href={project.link}><img src="/projects/arrow.svg" alt="arrow" class="w-5"></Button>
          </div>
        </div>
      {/each}
    </div>

  </section>

</main>