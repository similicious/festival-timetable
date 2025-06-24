<script lang="ts">
  import type { PageProps } from "./$types";
  import { page } from "$app/state";
  import StageDay from "$lib/components/StageDay.svelte";

  let { data }: PageProps = $props();

  let stage = $derived(
    data.stages.find((stage) => stage.slug === page.params.slug),
  );
</script>

{#if stage}
  <h1
    class="fixed -mt-4 mb-4 w-full bg-linear-to-b from-zinc-800 from-80% to-transparent pt-4 pb-4 text-4xl font-bold text-pink-500"
  >
    {stage.icon}
    {stage.name}
  </h1>
  <ol class="mt-12">
    {#each stage.days as stageDay}
      <li class="mb-4">
        <StageDay {stageDay} />
      </li>
    {/each}
  </ol>
{/if}
