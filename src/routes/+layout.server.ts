import { stageSchema } from "$lib/models/stage";
import type { LayoutServerLoad } from "./$types";

export const prerender = true;

export const load: LayoutServerLoad = async () => {
  const stages = Object.values(
    import.meta.glob("$lib/data/stages/*.json", { eager: true }),
  ) as any[];

  return {
    stages: stages.map((stage) => stageSchema.parse(stage)),
  };
};
