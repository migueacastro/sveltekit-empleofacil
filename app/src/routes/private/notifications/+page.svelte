<script lang="ts">
  import Icon from "@iconify/svelte";

  let { data } = $props();
  let notifications = data?.notifications ?? [];
</script>

<h1 class="h1 text-3xl text-start">Notificaciones</h1>
<div class="flex flex-col space-y-2">
  {#if notifications.length > 0}
    {#each notifications as notification}
      <div
        class="card flex flex-row p-4"
        class:preset-tonal={notification.read}
        class:bg-surface-500={!notification.read}
        class:bg-surface-200={!notification.read}
      >
        <div class="ml-4 flex flex-row justify-between items-center w-full">
          <div class="">
            <h2 class="text-start h2 text-xl">
              La empresa {notification.from_user.corporation_name} está interesada
              en ti
            </h2>
          </div>
          <form method="POST" action="?/remove">
            <input
              type="hidden"
              name="id"
              value={notification.id}
            />
            <button type="submit">
              <Icon icon="material-symbols:remove" class="text-2xl" />
            </button>
          </form>
        </div>
      </div>
    {/each}
  {:else}
    <p>Sin notificaciones</p>
  {/if}
</div>
