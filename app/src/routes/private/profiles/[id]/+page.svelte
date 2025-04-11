<script>
  let { data } = $props();
  import Icon from "@iconify/svelte";
  import { Avatar } from "@skeletonlabs/skeleton-svelte";
</script>

<svelte:head>
  <title>{data.profileview.full_name}</title>
</svelte:head>

<Avatar
  size="w-25 h-25 text-2xl"
  classes="mx-auto"
  name={data.profileview.full_name}
  srcset={data.profileview.avatar_url ??
    "https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=630&q=80"}
/>
<h1 class="h1 text-3xl text-center">{data.profileview.full_name}</h1>


  <p class="text-lg text-center text-primary-500">{data.profileview.email}</p>
  <h3 class="h3 text-xl text-center">
    {data.profileview.region.name}
  </h3>


<p class="h1 text-3xl">Información</p>

<div class="flex flex-col space-y-3">
  <div class="p-8 card flex flex-col preset-tonal ">
    <div class="flex flex-row space-x-5 items-center">
      <Icon icon="material-symbols:work-outline" class="text-2xl" />
      <h2 class="h2 text-2xl">
        Oficio
      </h2>
      <div class="chip bg-primary-500 text-md font-bold ">{data.profileview.job.category.name}</div>
    </div>
    <h3 class="my-3 text-xl">{data.profileview.job.name}</h3>
  </div>
</div>
<div class="flex flex-col space-y-3">
  <div class="p-8 card flex flex-col preset-tonal ">
    <div class="flex flex-row space-x-5 items-center">
      <Icon icon="material-symbols:person-outline" class="text-2xl" />
      <h2 class="h2 text-2xl">
        Acerca de mí
      </h2>
    </div>
    <div class="flex flex-col my-3">
      <h3 class=" text-md ">Descripción</h3>
      <h3 class="text-xl">{data.profileview.description}</h3>
    </div>
    <div class="flex flex-col my-3">
      <h3 class=" text-md ">Experiencia</h3>
      <h3 class="text-xl">{data.profileview.experience}</h3>
    </div>
  </div>
</div>
