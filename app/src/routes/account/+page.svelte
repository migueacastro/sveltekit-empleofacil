<script>
    let {data } = $props();
    import { Avatar } from '@skeletonlabs/skeleton-svelte';
</script>
<svelte:head>
    <title>Mi cuenta</title>
</svelte:head>
<div
  class="flex flex-col space-y-3 mx-auto w-1/2 bg-surface-200-800/50 rounded-3xl p-[4rem]"
>
    <Avatar size="w-25 h-25 text-2xl" classes="mx-auto"  name={data.profile.full_name} srcset={data.profile.avatar_url ?? "https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=630&q=80"} />
    <h1 class="h1 text-3xl text-center">{data.profile.full_name}</h1>

    {#if data.profile.role_id == 2}
    <p class="text-sm text-center">Elige tu estatus actual</p>
    <form action="?/change_status" class=" flex justify-center w-full" method="POST">
        <button class="btn py-3 px-4" class:preset-filled-primary-500={data.profile.status == "employed"} class:preset-outlined-primary-500={data.profile.status == "unemployed"}  type="submit">
            {data.profile.status == "unemployed" ? "Desempleado" : "Empleado"}
        </button>
    </form>
    {/if}

    

    <p class="h3 text-xl">Configuración de la cuenta</p>
    <div class="flex flex-col space-y-3">
        <a href="/account/edit" class="font-bold btn py-3 px-4 bg-surface-200/50 hover:bg-primary-200/50  dark:hover:bg-surface-900  dark:bg-surface-900/50">
            Editar perfil
        </a>
        <a href="/account/email" class="font-bold btn py-3 px-4 bg-surface-200/50 hover:bg-primary-200/50 dark:hover:bg-surface-900 dark:bg-surface-900/50">
            Cambiar correo
        </a>
        <a href="/account/password" class="font-bold btn py-3 px-4 bg-surface-200/50 hover:bg-primary-200/50 dark:hover:bg-surface-900 dark:bg-surface-900/50">
            Cambiar contraseña
        </a>
        <form action="/account?/signout" class="text-center" method="POST">
            <button type="submit" class="font-bold btn py-3 px-4 bg-surface-200/50 hover:bg-primary-200/50 dark:hover:bg-surface-900 dark:bg-surface-900/50 w-full">
                Cerrar sesión
            </button>
        </form>
    </div>
</div>
