<script>

  let menuOpen = false;

  const menuItems = [
    { name: 'À propos', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projets', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
  ];

</script>

<header class="flex justify-between items-center p-2 bg-white {menuOpen ? 'h-screen items-baseline' : ''} sm:bg-transparent sm:p-4 md:p-6 lg:p-8">
  <a href="/" class="sm:text-lg lg:text-2xl font-bold duration-300 hover:scale-110">AR</a>

  <!-- Mobile -->
  <nav class="flex flex-col items-end sm:hidden">
    {#if menuOpen}
      <button class="mb-10" on:click={() => menuOpen = !menuOpen}>
        <i class="fa-solid fa-xmark"></i>
      </button>
      {#each menuItems as navElt}
        <a href={navElt.href} class="text-2xl my-3 duration-300 hover:text-light-purple" on:click={() => menuOpen = !menuOpen}>{navElt.name}</a>
      {/each}
    {:else}
    <button on:click={() => menuOpen = !menuOpen}>
      <i class="fa-solid fa-bars"></i>
    </button>
    {/if}
  </nav>

  <!-- Desktop -->
  <nav class="hidden sm:block">
    <div class="flex items-center gap-7 bg-white rounded-full px-6 lg:gap-10">
      {#each menuItems as navElt}
        <a href={navElt.href} class="my-3 duration-300 hover:text-light-purple lg:text-lg">{navElt.name}</a>
      {/each}
    </div>
  </nav>

</header>


