<script lang="ts">
  import { format } from "date-fns";
  import type { StageDay } from "$lib/models/stage";
  import Act from "./Act.svelte";

  let { stageDay }: { stageDay: StageDay } = $props();
</script>

<h2 class="mb-2 text-xl font-bold text-pink-300">
  {format(stageDay.date, "EEEE, dd. MMMM")}
</h2>
<ol>
  {#each stageDay.acts as act}
    <li>
      <Act
        {act}
        showActive={true}
        showFavourite={true}
        timeDisplay={"absolute"}
      />
    </li>
  {/each}
</ol>
