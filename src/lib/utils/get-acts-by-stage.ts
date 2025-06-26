import type { Stage } from "$lib/models/stage";

export function getFlatActsAndStages(stages: Stage[]) {
  return stages.flatMap((stage) =>
    stage.days
      .flatMap((day) => day.acts)
      .map((act) => ({
        act: act,
        stage,
      })),
  );
}
