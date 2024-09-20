<script>
  import Button from "./Button.svelte";

  export let project = [];
</script>


  <div class="flex flex-col gap-3 md:w-full">
    <div class="rounded-2xl overflow-hidden">
      <a href={project.link}><img src={project.img[0]} alt={project.title} class="hover:scale-105 transition-all duration-300"></a>
    </div>
    <div class="flex justify-between w-full">
      <span>{project.title}</span>
      <Button href={project.link}><img src="/projects/arrow.svg" alt="arrow" class="w-5"></Button>
    </div>
  </div>