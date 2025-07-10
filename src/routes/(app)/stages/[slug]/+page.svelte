<script lang="ts">
  import { page } from "$app/state";
  import StageDay from "$lib/components/StageDay.svelte";
  import { attachScrollActiveActIntoView } from "$lib/utils/scroll-active-act-into-view";
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();

  let stage = $derived(
    data.stages.find((stage) => stage.slug === page.params.slug),
  );
</script>

{#if stage}
  <ol {@attach attachScrollActiveActIntoView(stage)}>
    {#each stage.days as stageDay}
      <li class="mb-4">
        <StageDay {stageDay} />
      </li>
    {/each}
  </ol>
{/if}

<p class="text-sm text-zinc-400">
  Douple tap an act to add it to your favourites.
</p>
