<script>
  import { page }     from '$app/stores';
  import { projects } from '$lib/config/projects'
  import { register } from 'swiper/element/bundle'

  $: project = projects.find(p => p.href === $page.params.slug);

  register()
</script>

{#if project}

  <!-- Blobs -->
  <img src="/blobs/Blob1.png" alt="blob1" class="hidden absolute w-[800px] top-0 left-2/4 -z-10 select-none lg:block">
  <img src="/blobs/Blob2.png" alt="blob2" class="hidden absolute w-[500px] bottom-0 left-0 -z-10 select-none lg:block">
  <img src="/blobs/Blob3.png" alt="blob2" class="hidden absolute w-[500px] top-72 right-0 -z-10 select-none lg:block">
  
  <main>

    <section>

      <div class="w-10/12 mx-auto mt-10">
        <h2 class="text-light-purple font-bold text-xl mb-2 lg:text-2xl xl:text-3xl">{project.title}</h2>
        <swiper-container navigation=true autoplay={{ delay: 5000 }} loop=true>
          {#each project.img as img}
            <swiper-slide><img src={img} alt="projects images" class="w-full"></swiper-slide>
          {/each}
        </swiper-container>
      </div>

      <div class="w-10/12 mx-auto mt-10">
        <h3 class="text-light-purple font-bold text-lg mb-2 lg:text-xl xl:text-2xl">Description : </h3>
        <p class="text-sm lg:text-base">{@html project.description}</p>
      </div>

      <div class="w-10/12 mx-auto mt-10">
        <h3 class="text-light-purple font-bold text-lg mb-2 lg:text-xl xl:text-2xl">Technologies utilisées : </h3>
        <div class="flex gap-3">
          {#each project.technos as techno}
            <img src="{techno}" alt="techno utilisé" class="h-10">
          {/each}
        </div>
      </div>

      <div class="w-10/12 mx-auto mt-10">
        {#if project.link}
          <a href={project.link} target="_blank" class="text-light-purple font-bold text-md mb-2 lg:text-lg xl:text-xl hover:underline">Lien du site ici !</a>
        {:else}
          <a href={project.github} target="_blank" class="text-light-purple font-bold text-md mb-2 lg:text-lg xl:text-xl hover:underline">Lien du repository ici !</a>
        {/if}
      </div>
    </section>

  </main>

{/if}