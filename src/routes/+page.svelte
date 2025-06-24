<script lang="ts">
  import type { PageProps } from "./$types";
  import { isActActive } from "$lib/utils/is-act-active";
  import Act from "$lib/components/Act.svelte";
  import { onMount } from "svelte";
  import { pageTitle } from "$lib/stores/page-title";
  import CurrentlyPlaying from "$lib/components/CurrentlyPlaying.svelte";

  let { data }: PageProps = $props();

  onMount(() => {
    pageTitle.set("🗓️ Overview");
  });
</script>

<CurrentlyPlaying stages={data.stages}></CurrentlyPlaying>
