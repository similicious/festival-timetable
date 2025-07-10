<script lang="ts">
  import type { Stage } from "$lib/models/stage";
  import { isActActive } from "$lib/utils/is-act-active";
  import { currentTime } from "$lib/stores/current-time";
  import Act from "./Act.svelte";
  import { isAfter } from "date-fns";

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

<ol>
  {#each activeActsByStages as stage}
    <li class="mb-4">
      <h2 class="text-xl font-bold">{stage.icon} {stage.name}</h2>
      {#if stage.activeAct}
        <Act
          act={stage.activeAct}
          showFavourite={true}
          showActive={false}
          timeDisplay={"absolute"}
        ></Act>
      {:else}
        currently closed ❌
      {/if}
      {#if stage.nextAct}
        <div class="-mt-1 text-sm text-zinc-400">
          <Act
            act={stage.nextAct}
            timeDisplay={"relative"}
            showActive={false}
            showFavourite={true}
          ></Act>
        </div>
      {/if}
    </li>
  {/each}
</ol>
