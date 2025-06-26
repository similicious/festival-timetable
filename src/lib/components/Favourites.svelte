<script lang="ts">
  import type { Stage } from "$lib/models/stage";
  import { favouriteActIds } from "$lib/stores/favourite-act-ids";
  import { format, formatISO, parseISO, startOfDay } from "date-fns";
  import Act from "./Act.svelte";
  import { groupBy } from "lodash-es";

  let { stages }: { stages: Stage[] } = $props();

  const favouritesActs = $derived(
    stages
      .flatMap((stage) =>
        stage.days
          .flatMap((day) => day.acts)
          .map((act) => ({
            act: act,
            stage,
          })),
      )
      .filter(({ act }) => $favouriteActIds.includes(act.id))
      .sort(
        ({ act: a }, { act: b }) =>
          a.startDate.valueOf() - b.startDate.valueOf(),
      ),
  );

  const favouriteActsByDay = $derived(
    Object.entries(
      groupBy(favouritesActs, ({ act }) =>
        formatISO(startOfDay(act.startDate)),
      ),
    ).sort(([a], [b]) => new Date(a).valueOf() - new Date(b).valueOf()),
  );
</script>

{#if favouritesActs.length > 0}
  {#each favouriteActsByDay as [day, acts]}
    <h2 class="mb-2 text-xl font-bold text-pink-300">
      {format(parseISO(day), "EEEE, dd. MMMM")}
    </h2>

    <ol class="mb-4">
      {#each acts as { act, stage }}
        <li class="py-1"><Act {act} {stage}></Act></li>
      {/each}
    </ol>
  {/each}
{:else}
  <p>
    You have no favourites yet! Double tap an act in the timetable to add it to
    your favourites 🚀
  </p>
{/if}
