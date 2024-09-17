<script>
  import Skill from "./Skill.svelte";

  export let category = [];
</script>

<div class="flex flex-col gap-4 items-center justify-center md:items-start">
  <h3 class="text-lg font-bold my-7 lg:text-xl xl:text-2xl">{category.title}</h3>
  {#each category.skills as skill}
    <Skill {skill} />
  {/each}
</div>