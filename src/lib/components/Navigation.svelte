<script lang="ts">
  import type { Stage } from "$lib/models/stage";
  import { page } from "$app/state";
  import { getNavigation } from "$lib/utils/get-navigation";
  let { stages }: { stages: Stage[] } = $props();

  const navigationItems = getNavigation(stages);
</script>

<ul class="text-4xl">
  {#each navigationItems as item}
    <li title={item.name}>
      <a
        class={[
          "block rounded-l-lg  py-4 text-center",
          page.url.pathname === item.path && "bg-zinc-800",
        ]}
        href={item.path}
      >
        {item.icon}
      </a>
    </li>
  {/each}
</ul>
