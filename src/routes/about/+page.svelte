<script>
  import About from "$lib/data/about.md";
  import Prose from "$lib/components/Prose.svelte";
  import { onMount } from "svelte";
  import { pageTitle } from "$lib/stores/page-title";

  onMount(() => {
    pageTitle.set("📍 About");
  });
</script>

<Prose>
  <About></About>
</Prose>
