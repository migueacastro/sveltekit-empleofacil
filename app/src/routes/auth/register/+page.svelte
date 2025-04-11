<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types.js";

  export let form: any;

  let loading = false;

  const handleSubmit: any = () => {
    loading = true;
    return async ({ update }: any) => {
      update();
      loading = false;
    };
  };
</script>

<svelte:head>
  <title>Iniciar Sesión</title>
</svelte:head>

<form
  class="flex flex-col space-y-3 mx-auto w-1/2 bg-surface-200-800/50 rounded-3xl p-[4rem]"
  method="POST"
  use:enhance={handleSubmit}
>
  <div class="space-y-3 flex justify-center flex-col">
    <h1 class="text-2xl font-bold text-center">Registrarse</h1>
    <p class="description text-center">
     Registrate introduciendo los siguientes datos
    </p>
    {#if form?.message !== undefined}
      <div class="success {form?.success ? '' : 'fail'}">
        {form?.message}
      </div>
    {/if}
    <div class="flex flex-col space-y-1">
      <label for="email">Correo</label>
      <input
        id="email"
        name="email"
        class="input p-2 rounded-lg indent-2"
        type="email"
        placeholder="Tu correo electrónico"
        value={form?.email ?? ""}
      />
    </div>
    {#if form?.errors?.email}
      <span class="flex items-center text-sm text-error-500">
        {form?.errors?.email}
      </span>
    {/if}
    <div class="flex flex-col space-y-1">
      <label for="password">Contraseña</label>
      <input
        id="password"
        name="password"
        class="input p-2 rounded-lg indent-2"
        type="password"
        placeholder="Tu contraseña"
        value={form?.password ?? ""}
      />
    </div>
    {#if form?.errors?.password}
      <span class="flex items-center text-sm text-error-500">
        {form?.errors?.password}
      </span>
    {/if}
    <div class="flex flex-col space-y-1">
      <label for="password">Confirmar Contraseña</label>
      <input
        id="password"
        name="password"
        class="input p-2 rounded-lg indent-2"
        type="password"
        placeholder="Tu contraseña"
        value={form?.password ?? ""}
      />
    </div>
    {#if form?.errors?.password}
      <span class="flex items-center text-sm text-error-500">
        {form?.errors?.password}
      </span>
    {/if}

    <button class=" btn preset-filled-primary-500 px-6 py-2 w-fit mx-auto mt-2">
      {loading ? "Cargando" : "Registrarte"}
    </button>
    <p>¿Ya tienes cuenta? <a href="/auth/login" class="text-primary-500">Inicia Sesión</a></p>
  </div>
</form>
