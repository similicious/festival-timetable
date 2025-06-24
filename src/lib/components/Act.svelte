<script lang="ts">
  import { format, formatDistanceToNowStrict } from "date-fns";
  import type { Act } from "$lib/models/stage";

  let {
    act,
    timeDisplay = "absolute",
  }: { act: Act; timeDisplay?: "relative" | "absolute" } = $props();
</script>

{#if timeDisplay === "absolute"}
  {format(act.startDate, "HH:mm")}
{/if}
{act.icon}
{act.name}
{#if timeDisplay === "relative"}
  {formatDistanceToNowStrict(act.startDate, {
    addSuffix: true,
    unit: "minute",
  })}
{/if}
