<script lang="ts">
  import { format, formatDistanceToNow } from "date-fns";
  import type { Act, Stage } from "$lib/models/stage";
  import { favouriteActIds } from "$lib/stores/favourite-act-ids";
  import { isActActive } from "$lib/utils/is-act-active";
  import { currentTime } from "$lib/stores/current-time";

  let {
    act,
    stage,
    timeDisplay,
    showFavourite,
    showActive,
  }: {
    act: Act;
    stage?: Stage;
    timeDisplay: "relative" | "absolute" | "absoluteLong";
    showFavourite: boolean;
    showActive: boolean;
  } = $props();

  const isFavourite = $derived($favouriteActIds.includes(act.id));
  const isActive = $derived(currentTime && isActActive(act));

  function toggleFavourite(act: Act) {
    if (!showFavourite) {
      return;
    }

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

<div
  role="checkbox"
  aria-checked={isFavourite}
  tabindex="0"
  ondblclick={() => toggleFavourite(act)}
  onkeydown={(e) => e.key === "Enter" && toggleFavourite(act)}
  data-act-active={isActive === true ? true : null}
  class={[
    "cursor-pointer py-1 select-none",
    { "animate-pulse font-bold text-pink-500": showActive && isActive },
  ]}
>
  {#if timeDisplay === "absolute"}
    {format(act.startDate, "HH:mm")}
  {/if}
  {#if timeDisplay === "absoluteLong"}
    {format(act.startDate, "EEEE, HH:mm")}
  {/if}
  {act.icon}
  {act.name}
  {#if timeDisplay === "relative"}
    {formatDistanceToNow(act.startDate, { addSuffix: true })}
  {/if}
  {#if stage}
    at {stage.icon} {stage.name}
  {/if}
  {#if showFavourite && isFavourite}
    ❤️
  {/if}
</div>
