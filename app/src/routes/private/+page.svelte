<script lang="ts">
  import { goto } from "$app/navigation";
  const { data } = $props();
  const job_categories: Array<any> = data?.job_categories ?? [];
  import Icon from "@iconify/svelte";
  import { Avatar } from "@skeletonlabs/skeleton-svelte";

  let search = $state("");
  let selectedJobCategory = $state(
    job_categories[job_categories.length - 1]?.name ?? ""
  );
  let filteredJobs = $derived(
    data?.jobs?.filter((job) => job.category.name === selectedJobCategory) ?? []
  );
  let selectedJob = $derived(filteredJobs[0]?.name ?? "");
  let filteredProfiles = $derived(
    search
      ? (data?.profiles?.filter((profile) =>
          profile.full_name.toLowerCase().includes(search.toLowerCase())
        ) ?? [])
      : (data?.profiles?.filter(
          (profile) => profile.job.name === selectedJob
        ) ?? [])
  );
</script>
<svelte:head>
    <title>Inicio</title>
</svelte:head>

<div class="flex flex-col space-y-6">
  <h1 class="h1 text-3xl text-start">Perfiles</h1>
  <!-- Search -->
  <div class="input-group flex flex-row">
    <input
      class="ig-input bg-surface-200/50 dark:bg-surface-500/50"
      type="search"
      placeholder="Buscar por el nombre del perfil..."
      bind:value={search}
    />
    <div class="ig-btn p-2">
      <Icon
        icon="material-symbols:search-rounded"
        class="ig-icon"
        width="30"
        height="30"
      />
    </div>
  </div>

  <div class="flex flex-col space-y-2">
    <!-- Categorias -->
    <div class="flex flex-col">
      <p class="text-sm my-2">Categorias</p>
      <div class="flex flex-row flex-wrap space-x-2">
        {#each job_categories as job_category}
          <button
            class={`chip capitalize ${selectedJobCategory === job_category.name ? "bg-primary-500" : "preset-tonal"}`}
            onclick={() => (selectedJobCategory = job_category.name)}
          >
            <span>{job_category.name}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Trabajos -->
    <div class="flex flex-col">
      <p class="text-sm my-2">Trabajos</p>
      <div class="flex flex-row flex-wrap space-x-2">
        {#each filteredJobs as job}
          <button
            class={`chip capitalize ${selectedJob === job.name ? "bg-primary-500" : "preset-tonal"}`}
            onclick={() => (selectedJob = job.name)}
          >
            <span>{job.name}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Perfiles -->
  <div class="flex flex-col space-y-2">
    {#if filteredProfiles.length > 0}
      {#each filteredProfiles as profile}
        <button
          class="card flex flex-row preset-tonal p-4 hover:bg-surface-200 dark:hover:bg-surface-500"
          onclick={() => {
            if (data?.profile.role_id === 3) {
              goto(`/private/profiles/${profile.id}`);
            }
          }}
        >
          <Avatar
            src={profile.avatar_url}
            name={profile.full_name}
            classes="text-xl m-auto text-surface-100 border-3 border-primary-500"
          />
          <div class="ml-4 flex flex-row justify-between w-full">
            <div class="flex flex-col">
              <h2 class="text-start h2 text-xl">{profile.full_name}</h2>
              <p>{profile.email}</p>
            </div>
            <div class="flex-row flex justify-evenly my-auto">
              <h2 class="h3 text-lg ml-5">{profile.job.name}</h2>
              <h2 class="h3 text-lg ml-5">{profile.region.name}</h2>
            </div>
          </div>
        </button>
      {/each}
    {:else}
      <p>No hay perfiles disponibles</p>
    {/if}
  </div>
</div>
