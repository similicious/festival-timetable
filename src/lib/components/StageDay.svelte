<script lang="ts">
  import { format } from "date-fns";
  import { onMount, onDestroy } from "svelte";
  import type { StageDay } from "$lib/models/stage";
  import { isActActive } from "$lib/utils/is-act-active";
  import ActListItem from "./ActListItem.svelte";

  let { stageDay }: { stageDay: StageDay } = $props();

  // Make currentDate reactive
  let currentDate = $state(new Date());
  let intervalId: number;

  function scrollActiveActIntoView() {
    const activeActElement = document.querySelector("[data-act-active]");
    if (activeActElement) {
      activeActElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  onMount(() => {
    scrollActiveActIntoView();

    intervalId = setInterval(() => {
      currentDate = new Date();

      setTimeout(scrollActiveActIntoView, 0);
    }, 60 * 1000);
  });

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  // Use $effect to run scrollActiveActIntoView whenever stageDay changes
  $effect(() => {
    stageDay;
    setTimeout(scrollActiveActIntoView, 0);
  });
</script>

<h2 class="mb-2 text-2xl font-bold text-pink-300">
  {format(stageDay.date, "EEEE, dd. MMMM")}
</h2>
<ol>
  {#each stageDay.acts as act}
    {@const isActive = isActActive(act)}
    <ActListItem {act} {isActive} showFavourite={true}></ActListItem>
  {/each}
</ol>
