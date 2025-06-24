<script lang="ts">
  import type { Stage } from "$lib/models/stage";
  import { page } from "$app/state";
  let { stages }: { stages: Stage[] } = $props();
</script>

<ul class="text-6xl">
  <li title="Home">
    <a
      class={[
        "block rounded-l-lg py-2 text-center",
        page.url.pathname === "/" && "bg-zinc-800",
      ]}
      href="/"
    >
      📍
    </a>
  </li>

  {#each stages as stage}
    <li title={stage.name}>
      <a
        class={[
          "block rounded-l-lg  py-2 text-center",
          page.params.slug === stage.name.toLowerCase() && "bg-zinc-800",
        ]}
        href={"/stages/" + stage.slug}
      >
        {stage.icon}
      </a>
    </li>
  {/each}
</ul>
