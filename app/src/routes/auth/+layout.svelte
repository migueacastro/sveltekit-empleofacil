<script>
  import Lightswitch from "$lib/assets/Lightswitch.svelte";
  let { data, children } = $props();
</script>

<header
  class="preset-gradient-one bg-surface-200-800/50 p-4 flex-row flex justify-between"
>
  <p class="text-2xl font-bold">EmpleoFacil</p>
  <div class="flex flex-row items-center">
    <p class="text-xl font-bold">Tema</p>
    <Lightswitch />
  </div>
</header>

<div class="p-8">
  {@render children()}
</div>
