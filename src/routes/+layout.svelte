<script lang="ts">
  import "../app.css";

  import { pwaInfo } from "virtual:pwa-info";
  import { registerSW } from "virtual:pwa-register";

  import Navigation from "$lib/components/Navigation.svelte";

  const webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : "");

  let { children, data } = $props();
  const stages = data.stages;

  registerSW();
</script>

<svelte:head>
  {@html webManifestLink}
</svelte:head>

<nav class="fixed top-0 bottom-0 left-0 w-18 bg-zinc-700 pl-1">
  <Navigation {stages} />
</nav>

<main class="ml-18 p-4">
  {@render children()}
</main>
