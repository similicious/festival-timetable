<script lang="ts">
  import { format } from "date-fns";
  import type { StageDay } from "$lib/models/stage";
  import { isActActive } from "$lib/utils/is-act-active";
  import ActListItem from "./ActListItem.svelte";

  let { stageDay }: { stageDay: StageDay } = $props();
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
