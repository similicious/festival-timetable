import type { Act } from "$lib/models/stage";
import { isAfter, isBefore } from "date-fns";

export function isActActive(act: Act): boolean {
  const currentDate = new Date();
  return (
    isAfter(currentDate, act.startDate) && isBefore(currentDate, act.endDate)
  );
}
