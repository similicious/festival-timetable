<script lang="ts">
  import type { Stage } from "$lib/models/stage";
  import { getFlatActsAndStages } from "$lib/utils/get-acts-by-stage";
  import deburr from "lodash-es/deburr";
  import ActListItem from "./ActListItem.svelte";

  let {
    stages,
    isSearching = $bindable(false),
  }: { stages: Stage[]; isSearching: boolean } = $props();

  let searchTerm = $state("");

  $effect(() => {
    isSearching = searchTerm.length > 0;
  });
  const actsByStage = $derived(getFlatActsAndStages(stages));

  const searchResults = $derived(
    searchTerm.length >= 3
      ? actsByStage.filter(({ act }) =>
          deburr(act.name.toLowerCase()).includes(
            deburr(searchTerm.toLowerCase()),
          ),
        )
      : [],
  );

  function resetSearchTerm() {
    searchTerm = "";
  }
</script>

<section class="flex">
  <input
    name="act-search"
    class="w-full py-2 text-xl"
    bind:value={searchTerm}
    placeholder="Search for acts ..."
  />
  <button type="button" class="px-4" onclick={resetSearchTerm}>❌</button>
</section>

{#if searchResults.length > 0}
  <ol class="mt-2">
    {#each searchResults as { act, stage }}
      <ActListItem {act} {stage} showFavourite={true}></ActListItem>
    {/each}
  </ol>
{/if}
{#if searchResults.length === 0 && searchTerm.length >= 3}
  <p>❌ Sorry, could not find anything.</p>
{/if}
