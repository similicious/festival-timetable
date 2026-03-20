import { stageSchema, type Stage } from "$lib/models/stage";
import { overrideDatesForDemoMode } from "$lib/utils/override-dates-for-demo-mode";
import type { LayoutLoad } from "./$types";
import { getFestival } from "$lib/utils/get-festival";

export const ssr = false;

export const load: LayoutLoad = async () => {
  const festival = getFestival();
  const stages = Object.values(
    import.meta.glob("$lib/data/timetable/stages/*.json", {
      import: "default",
      eager: true,
    }),
  );

  const stageOrder = festival.stageOrder ?? [];
  const allStages = stages.map((stage) => stageSchema.parse(stage));

  const orderdStages = stageOrder
    .map((stageId) => allStages.find((stage) => stage.id === stageId))
    .filter(Boolean) as Stage[];

  const nonOrderdStages = allStages.filter(
    (stage) => !stageOrder.includes(stage.id),
  ) as Stage[];

  const orderedStages = [...orderdStages, ...nonOrderdStages];

  return {
    stages: festival.demoMode
      ? overrideDatesForDemoMode(orderedStages)
      : orderedStages,
    festival,
  };
};
