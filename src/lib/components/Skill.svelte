<script>
  export let skill = {};
</script>

<div class="flex items-center gap-2 lg:gap-4">
  <img src={skill.image} alt={skill.name} class="h-10">
  <p class="text-sm lg:text-base">{skill.name}</p>
</div>