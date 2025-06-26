<script lang="ts">
  import Act from "./Act.svelte";
  import type { Act as ActType, Stage } from "$lib/models/stage";
  import { favouriteActIds } from "$lib/stores/favourite-act-ids";

  let {
    act,
    stage,
    isActive = false,
    showFavourite = false,
  }: {
    act: ActType;
    stage?: Stage;
    isActive?: boolean;
    showFavourite?: boolean;
  } = $props();

  function toggleFavourite(act: ActType) {
    favouriteActIds.update((ids) => {
      const existingActIndex = ids.indexOf(act.id);

      if (existingActIndex === -1) {
        return [...ids, act.id];
      } else {
        return [...ids.filter((id) => id !== act.id)];
      }
    });
  }
</script>

<li
  data-act-active={isActive === true ? true : null}
  class="cursor-pointer py-1 select-none"
  ondblclick={() => toggleFavourite(act)}
>
  <span class={{ "animate-pulse font-bold text-pink-500": isActive }}>
    <Act {act} {stage}></Act>
    {#if showFavourite && $favouriteActIds.includes(act.id)}
      ❤️
    {/if}
  </span>
</li>
