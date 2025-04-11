<script>
    let { data, children } = $props();
    import Lightswitch from "$lib/assets/Lightswitch.svelte";
  </script>
  
  <header
    class="preset-gradient-one bg-surface-200-800/50 p-4 flex flex-row justify-between items-center"
  >
    <p class="text-2xl font-bold">EmpleoFacil</p>
  
    <nav class="flex flex-row space-x-4">
      <div class="flex flex-row justify-between">
        <p class="font-bold">Tema</p>
        <Lightswitch />
      </div>

    </nav>
  </header>
  
  <div class="p-8">
    {@render children()}
  </div>
  