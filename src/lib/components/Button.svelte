<script>
  export let href = null;
  export let classes = '';
  export let download = null;
  export let variant = 'default';
  export let icon = null;

  const VARIANTS = {
    default: 'text-light-purple py-2 px-4 bg-white rounded-full duration-200 hover:ring-1 hover:ring-light-purple w-max',
    icon: 'flex items-center justify-center p-2 bg-white rounded-full duration-200 hover:ring-1 hover:ring-light-purple w-10 h-10'
  }
</script>

{#if href}
  <a {href} {download} target="_blank" class="{VARIANTS[variant]} {classes}">
    {#if icon && variant === 'icon'}
      <i class={icon}></i>
    {:else}
      <slot />
    {/if}
  </a>
{:else}
  <button class="{VARIANTS[variant]} {classes}">
    {#if icon && variant === 'icon'}
      <i class={icon}></i>
    {:else}
      <slot />
    {/if}
  </button>
{/if}
