<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  export let form: any;
  export let data: any;


  let loading = false;
  let selectedRole = "2";
  const handleSubmit: any = () => {
    loading = true;
    return async ({ update }: any) => {
      update();
      console.log(form);
      loading = false;
    };
  };
</script>

<svelte:head>
  <title>Crear Perfil</title>
</svelte:head>

<form
  class="flex flex-col space-y-3 mx-auto w-1/2 bg-surface-200-800/50 rounded-3xl p-[4rem]"
  method="POST"
  action="/account?/update"
  use:enhance={handleSubmit}
>
  <div class="space-y-3 flex justify-center flex-col">
    <h1 class="text-2xl font-bold text-center">Crear perfil</h1>

    {#if form?.message !== undefined}
      <div class="success {form?.success ? '' : 'fail'}">
        {form?.message}
      </div>
    {/if}
    <div class="flex flex-col space-y-1">
      <label for="full_name">Nombre</label>
      <input
        id="full_name"
        name="full_name"
        class="input p-2 rounded-lg indent-2"
        type="text"
        value={form?.full_name ?? ""}
      />
    </div>
    {#if form?.errors?.full_name}
      <span class="flex items-center text-sm text-error-500">
        {form?.errors?.full_name}
      </span>
    {/if}
    <div class="flex flex-col space-y-1">
      <label for="region_id">Region</label>
      <select class="select p-2" name="region_id">
        {#each data?.regions as region}
          <option value={region.id}>{region.name}</option>
        {/each}
      </select>
    </div>

    <fieldset class="space-y-2 my-4">
      <label class="flex items-center space-x-2">
        <input
          class="radio"
          type="radio"
          name="role_id"
          id="role_id"
          value="2"
          bind:group={selectedRole}
        />
        <p>Busco trabajo</p>
      </label>

      <label class="flex items-center space-x-2">
        <input
          class="radio"
          type="radio"
          name="role_id"
          id="role_id"
          value="3"
          bind:group={selectedRole}
        />
        <p>Busco empleados</p>
      </label>
    </fieldset>
    {#if selectedRole == "2"}
      <div class="flex flex-col space-y-1">
        <label for="job_id">Trabajo</label>
        <select class="select p-2" name="job_id">
          {#each data?.jobs as job}
            <option value={job.id}>{job.name}</option>
          {/each}
        </select>
      </div>
      <div class="flex flex-col space-y-1">
        <label for="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          class="input p-2 rounded-lg indent-2"
        >{form?.description ?? ""}</textarea>
      </div>
      {#if form?.errors?.description}
        <span class="flex items-center text-sm text-error-500">
          {form?.errors?.description}
        </span>
      {/if}
      <div class="flex flex-col space-y-1">
        <label for="experience">Experiencia/label>
        <textarea
          id="experience"
          name="experience"
          class="input p-2 rounded-lg indent-2"
        >{form?.experience?? ""}</textarea>
      </div>
      {#if form?.errors?.experience}
        <span class="flex items-center text-sm text-error-500">
          {form?.errors?.dexperience}
        </span>
      {/if}
    {:else}
      <div class="flex flex-col space-y-1">
        <label for="company_name">Nombre de la empresa</label>
        <input
          id="company_name"
          name="company_name"
          class="input p-2 rounded-lg indent-2"
          type="text"
          value={form?.company_name ?? ""}
        />
      </div>
      {#if form?.errors?.company_name}
        <span class="flex items-center text-sm text-error-500">
          {form?.errors?.company_name}
        </span>
      {/if}
    {/if}

    <button class=" btn preset-filled-primary-500 px-6 py-2 w-fit mx-auto mt-2">
      {loading ? "Cargando" : "Crear Perfil"}
    </button>
  </div>
</form>
