<script lang="ts">
  import type { Stage } from "$lib/models/stage";
  import { page } from "$app/state";
  import { getNavigation } from "$lib/utils/get-navigation";
  let { stages }: { stages: Stage[] } = $props();

  const navigationItems = getNavigation(stages);
</script>

<ul class="h-full overflow-y-auto text-4xl">
  {#each navigationItems as item}
    {@const isCurrentPage = page.url.pathname === item.path}
    <li
      title={item.name}
      class={[
        "block rounded-l-lg py-3 text-center",
        isCurrentPage && "bg-zinc-800",
      ]}
    >
      <a href={item.path} class="block px-1">
        {item.icon}
        <div class={["mt-1 w-full truncate text-xs "]}>
          {item.name}
        </div>
      </a>
    </li>
  {/each}
</ul>
