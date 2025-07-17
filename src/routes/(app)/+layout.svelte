<script lang="ts">
  import "../../app.css";

  import { pwaInfo } from "virtual:pwa-info";
  import { registerSW } from "virtual:pwa-register";
  import { page } from "$app/state";

  import Navigation from "$lib/components/Navigation.svelte";
  import { getNavigation } from "$lib/utils/get-navigation";
  import { getPageTitle } from "$lib/utils/get-page-title";

  const webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : "");

  let { children, data } = $props();
  const stages = data.stages;
  const navigation = getNavigation(stages);

  let navigationItem = $derived(
    navigation.find((item) => item.path === page.url.pathname),
  );

  let pageHeading = $derived(`${navigationItem?.icon} ${navigationItem?.name}`);
  let pageTitle = $derived(getPageTitle(navigationItem));

  registerSW();
</script>

<svelte:head>
  {@html webManifestLink}
  <title>{pageTitle}</title>
</svelte:head>

<nav class="fixed top-0 bottom-0 left-0 w-18 bg-zinc-700 pl-1">
  <Navigation {stages} />
</nav>

<main class="ml-18 max-w-128 p-4">
  <h1
    class="fixed right-0 left-18 z-10 -mt-4 mb-4 truncate bg-linear-to-b from-zinc-800 from-80% to-transparent p-4 text-3xl font-bold text-pink-500"
  >
    {pageHeading}
  </h1>

  <article class="mt-11">
    {@render children()}
  </article>
</main>
