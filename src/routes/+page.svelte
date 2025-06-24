<script lang="ts">
  import type { PageProps } from "./$types";

  import CurrentlyPlaying from "$lib/components/CurrentlyPlaying.svelte";

  let { data }: PageProps = $props();
</script>

<CurrentlyPlaying stages={data.stages}></CurrentlyPlaying>
