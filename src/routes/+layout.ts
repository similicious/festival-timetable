import { PUBLIC_DEMO_MODE } from "$env/static/public";
import { overrideDatesForDemoMode } from "$lib/utils/override-dates-for-demo-mode";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ data }) => {
  return {
    stages:
      PUBLIC_DEMO_MODE === "on"
        ? overrideDatesForDemoMode(data.stages)
        : data.stages,
  };
};
