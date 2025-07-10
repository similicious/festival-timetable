import { PUBLIC_DEMO_MODE } from "$env/static/public";
import { stageSchema } from "$lib/models/stage";
import { overrideDatesForDemoMode } from "$lib/utils/override-dates-for-demo-mode";
import type { LayoutLoad } from "./$types";
import festival from "$lib/data/festival.json";

export const ssr = false;

export const load: LayoutLoad = async () => {
  const stages = Object.values(
    import.meta.glob("$lib/data/stages/*.json", { eager: true }),
  ) as any[];

  const data = { stages: stages.map((stage) => stageSchema.parse(stage)) };

  return {
    stages:
      PUBLIC_DEMO_MODE === "on"
        ? overrideDatesForDemoMode(data.stages)
        : data.stages,
    festival,
  };
};
