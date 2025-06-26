<script lang="ts">
  import { format, formatDistanceToNowStrict } from "date-fns";
  import type { Act, Stage } from "$lib/models/stage";

  let {
    act,
    stage,
    timeDisplay = "absolute",
  }: {
    act: Act;
    stage?: Stage;
    timeDisplay?: "relative" | "absolute";
  } = $props();
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
{#if stage}
  at {stage.icon} {stage.name}
{/if}
