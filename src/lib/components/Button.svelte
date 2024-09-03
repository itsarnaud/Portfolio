<script>

  export let href = null;
  export let classes = '';

</script>

{#if href}
  <a {href} class="text-light-purple py-2 px-4 bg-white rounded-full duration-200 hover:ring-1 hover:ring-light-purple w-max {classes}">
    <slot />
  </a>
{:else}
  <button class="text-light-purple py-2 px-4 bg-white rounded-full duration-200 hover:ring-1 hover:ring-light-purple w-max {classes}">
    <slot />
  </button>
{/if}

