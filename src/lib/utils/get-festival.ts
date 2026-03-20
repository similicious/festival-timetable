import { festivalSchema } from "$lib/models/festival";
import festival from "$lib/data/timetable/festival.json";

export function getFestival() {
  return festivalSchema.parse(festival);
}
