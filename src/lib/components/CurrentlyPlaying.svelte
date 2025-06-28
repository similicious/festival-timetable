<script lang="ts">
  import type { Stage } from "$lib/models/stage";
  import { isActActive } from "$lib/utils/is-act-active";
  import { currentTime } from "$lib/stores/current-time";
  import Act from "./Act.svelte";
  import { isAfter, isBefore } from "date-fns";

  let { stages }: { stages: Stage[] } = $props();

  let activeActsByStages = $derived(
    stages.map((stage) => {
      // Force reactivity by referencing the store value
      $currentTime;

      const stageActs = stage.days.flatMap((item) => item.acts);

      const activeAct = stageActs.find((act) => isActActive(act));

      // The list is sorted already
      const nextAct = stageActs.find((act) =>
        isAfter(act.startDate, new Date()),
      );

      return {
        name: stage.name,
        icon: stage.icon,
        activeAct: activeAct,
        nextAct: nextAct,
      };
    }),
  );
</script>

<h2 class="mb-2 text-2xl font-bold text-pink-300">Now playing</h2>
<ol>
  {#each activeActsByStages as stage}
    <li class="mb-4">
      <h2 class="text-xl font-bold">{stage.icon} {stage.name}</h2>
      {#if stage.activeAct}
        <p>
          <Act act={stage.activeAct}></Act>
        </p>
      {:else}
        currently closed ❌
      {/if}
      {#if stage.nextAct}
        <p class="text-sm text-zinc-400">
          <Act act={stage.nextAct} timeDisplay={"relative"}></Act>
        </p>
      {/if}
    </li>
  {/each}
</ol>
