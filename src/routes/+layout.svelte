<script lang="ts">
  import "../app.css";

  import Navigation from "$lib/components/Navigation.svelte";
  import { pwaInfo } from "virtual:pwa-info";

  const webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : "");
  const registerScriptTag = $derived(
    pwaInfo ? pwaInfo.registerSW?.scriptTag : "",
  );

  let { children, data } = $props();
  const stages = data.stages;
</script>

<svelte:head>
  {@html webManifestLink}
  {@html registerScriptTag}
</svelte:head>

<nav class="fixed top-0 bottom-0 left-0 w-18 bg-zinc-700 pl-1">
  <Navigation {stages} />
</nav>

<main class="ml-18 p-4">
  {@render children()}
</main>
