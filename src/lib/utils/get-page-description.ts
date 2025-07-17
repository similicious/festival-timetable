import festival from "$lib/data/festival.json";

export function getPageDescription() {
  return `Timetable app for ${festival.name} ${festival.year}`;
}
