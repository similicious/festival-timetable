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
  <ol>
    {#each stage.days as stageDay}
      <li class="mb-4">
        <StageDay {stageDay} />
      </li>
    {/each}
  </ol>
{/if}
