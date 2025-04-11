<script>
  let { data, children } = $props();
  import Lightswitch from "$lib/assets/Lightswitch.svelte";
</script>

<header
  class="preset-gradient-one bg-surface-200-800/50 p-4 flex flex-row justify-between items-center"
>
  <a href="/"><p class="text-2xl font-bold">EmpleoFacil</p></a>

  <nav class="flex flex-row space-x-4">
    <a href="/private/" class="font-bold"> Inicio </a>
    {#if data?.profile?.role_id == 2}
    <a href="/private/notifications" class="font-bold">Notificaciones</a>
    {/if}
    <a href="/account" class="font-bold">
      {data.profile.full_name}
    </a>
    <div class="flex flex-row justify-between">
      <p class="font-bold">Tema</p>
      <Lightswitch />
    </div>
    <form action="/account?/signout" method="POST">
      <button type="submit" class="font-bold"> Cerrar Sesión </button>
    </form>
  </nav>
</header>

<div class="p-8">
  <div class="flex flex-col space-y-3 mx-auto w-4/5 bg-surface-200-800/50 rounded-3xl p-[4rem]">
    {@render children()}
  </div>
  
</div>
