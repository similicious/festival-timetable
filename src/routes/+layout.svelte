<script lang="ts">
  import "../app.css";

  import { pwaInfo } from "virtual:pwa-info";
  import { registerSW } from "virtual:pwa-register";
  import { page } from "$app/state";

  import Navigation from "$lib/components/Navigation.svelte";
  import { getNavigation } from "$lib/utils/get-navigation";

  const webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : "");

  let { children, data } = $props();
  const stages = data.stages;
  const navigation = getNavigation(stages);

  let navigationItem = $derived(
    navigation.find((item) => item.path === page.url.pathname),
  );

  let pageTitle = $derived(`${navigationItem?.icon} ${navigationItem?.name}`);

  registerSW();
</script>

<svelte:head>
  {@html webManifestLink}
</svelte:head>

<nav class="fixed top-0 bottom-0 left-0 w-18 bg-zinc-700 pl-1">
  <Navigation {stages} />
</nav>

<main class="ml-18 max-w-128 p-4">
  <h1
    class="fixed -mt-4 mb-4 w-full truncate bg-linear-to-b from-zinc-800 from-80% to-transparent pt-4 pb-4 text-4xl font-bold text-pink-500"
  >
    {pageTitle}
  </h1>

  <article class="mt-12">
    {@render children()}
  </article>
</main>
