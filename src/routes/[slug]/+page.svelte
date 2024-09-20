<script>
  import { page }     from '$app/stores';
  import { projects } from '$lib/config/projects'
  import { register } from 'swiper/element/bundle'

  $: project = projects.find(p => p.link === $page.params.slug);

  register()
</script>

{#if project}
  
  <main>

    <section>

      <h2 class="">{project.title}</h2>
      <swiper-container navigation=true autoplay={{ delay: 5000 }} loop=true class="py-4 z-0">
        {#each project.img as img}
          <swiper-slide><img src={img} alt=""></swiper-slide>
        {/each}
      </swiper-container>
      <h3>Description : </h3>

      <h3>Technos : </h3>

    </section>

  </main>

{/if}