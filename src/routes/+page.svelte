<script lang="ts">
  import type { PageProps } from "./$types";

  import CurrentlyPlaying from "$lib/components/CurrentlyPlaying.svelte";
  import Search from "$lib/components/Search.svelte";

  let { data }: PageProps = $props();

  let isSearching = $state(false);
</script>

<Search stages={data.stages} bind:isSearching></Search>

{#if !isSearching}
  <h2 class="mb-2 text-2xl font-bold text-pink-300">Now playing</h2>
  <CurrentlyPlaying stages={data.stages}></CurrentlyPlaying>
{/if}
