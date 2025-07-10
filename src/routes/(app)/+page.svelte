<script lang="ts">
  import type { PageProps } from "./$types";

  import CurrentlyPlaying from "$lib/components/CurrentlyPlaying.svelte";
  import Search from "$lib/components/Search.svelte";

  let { data }: PageProps = $props();

  let isSearching = $state(false);
</script>

<Search stages={data.stages} bind:isSearching></Search>

{#if !isSearching}
  <CurrentlyPlaying stages={data.stages}></CurrentlyPlaying>
{/if}
