<script lang="ts">
  import type { PageProps } from "./$types";

  import CurrentlyPlaying from "$lib/components/CurrentlyPlaying.svelte";
  import Favourites from "$lib/components/Favourites.svelte";

  let { data }: PageProps = $props();
</script>

<Favourites stages={data.stages}></Favourites>
