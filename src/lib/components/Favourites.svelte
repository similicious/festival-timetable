<script lang="ts">
  import type { Stage } from "$lib/models/stage";
  import { favouriteActIds } from "$lib/stores/favourite-act-ids";
  import { format, formatISO, parseISO, startOfDay } from "date-fns";
  import groupBy from "lodash-es/groupBy";
  import { getFlatActsAndStages } from "$lib/utils/get-acts-by-stage";
  import { isActActive } from "$lib/utils/is-act-active";
  import { attachScrollActiveActIntoView } from "$lib/utils/scroll-active-act-into-view";
  import Act from "./Act.svelte";

  let { stages }: { stages: Stage[] } = $props();

  const favouritesActs = $derived(
    getFlatActsAndStages(stages)
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

    <ol
      class="mb-4"
      {@attach attachScrollActiveActIntoView(favouriteActsByDay)}
    >
      {#each acts as { act, stage }}
        <li>
          <Act
            {act}
            {stage}
            showFavourite={false}
            timeDisplay={"absolute"}
            showActive={true}
          />
        </li>
      {/each}
    </ol>
  {/each}
{:else}
  <p>
    You have no favourites yet! Double tap an act in the timetable to add it to
    your favourites 🚀
  </p>
{/if}
