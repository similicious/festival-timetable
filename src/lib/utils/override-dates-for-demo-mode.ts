import type { Stage } from "$lib/models/stage";
import { add, addDays, getHours, getMinutes, set } from "date-fns";

export function overrideDatesForDemoMode(stages: Stage[]) {
  return stages.map((stage) => ({
    ...stage,
    days: stage.days.map(({ acts }, index) => {
      // If the demo mode is active, pretend the festival is currently running
      const date = addDays(new Date(), index - 1);
      return {
        date,
        acts: acts.map((act) => {
          const startDate = applyHoursMinutes(date, act.startDate);
          const endDate = add(startDate, { minutes: act.duration });
          return {
            ...act,
            startDate,
            endDate,
          };
        }),
      };
    }),
  }));
}

function applyHoursMinutes(target: Date, source: Date) {
  return set(target, {
    hours: getHours(source),
    minutes: getMinutes(source),
  });
}
