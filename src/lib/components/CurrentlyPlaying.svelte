<script lang="ts">
  import type { Stage } from "$lib/models/stage";
  import { isActActive } from "$lib/utils/is-act-active";
  import Act from "./Act.svelte";

  let { stages }: { stages: Stage[] } = $props();

  let activeActsByStages = $derived(
    stages.map((stage) => {
      const stageActs = stage.days.flatMap((item) => item.acts);

      const activeActIndex = stageActs.findIndex((act) => isActActive(act));

      return {
        name: stage.name,
        icon: stage.icon,
        activeAct: stageActs.at(activeActIndex),
        nextAct: stageActs.at(activeActIndex + 1),
      };
    }),
  );
</script>

<ol>
  {#each activeActsByStages as stage}
    <li class="mb-4">
      <h2 class="text-xl font-bold">{stage.icon} {stage.name}</h2>
      {#if stage.activeAct}
        <p>
          <Act act={stage.activeAct}></Act>
        </p>
      {:else}
        closed ❌
      {/if}
      {#if stage.nextAct}
        <p class="text-sm text-zinc-400">
          <Act act={stage.nextAct} timeDisplay={"relative"}></Act>
        </p>
      {/if}
    </li>
  {/each}
</ol>
