import { stageSchema, type Stage } from "$lib/models/stage";
import { overrideDatesForDemoMode } from "$lib/utils/override-dates-for-demo-mode";
import type { LayoutLoad } from "./$types";
import festival from "$lib/data/festival.json";

export const ssr = false;

export const load: LayoutLoad = async () => {
  const stagesRaw = Object.values(
    import.meta.glob("$lib/data/stages/*.json", { eager: true }),
  ) as any[];

  const stageOrder = festival.stage_order ?? [];
  const allStages = stagesRaw.map((stage) => stageSchema.parse(stage));

  const orderdStages = stageOrder
    .map((stageId) => allStages.find((stage) => stage.id === stageId))
    .filter(Boolean) as Stage[];

  const nonOrderdStages = allStages.filter(
    (stage) => !stageOrder.includes(stage.id),
  ) as Stage[];

  const data = { stages: [...orderdStages, ...nonOrderdStages] };

  return {
    stages: festival.demo_mode
      ? overrideDatesForDemoMode(data.stages)
      : data.stages,
    festival,
  };
};
