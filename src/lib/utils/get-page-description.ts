import type { Festival } from "$lib/models/festival";

export function getPageDescription(festival: Festival) {
  return `Timetable app for ${festival.name} ${festival.year}`;
}
