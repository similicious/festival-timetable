import type { ActType } from "../models/stage";

export function getActIcon(type: ActType) {
  const actTypeIconMap: Record<ActType, string> = {
    band: "🎸",
    dj: "🎧",
    performance: "💃",
    workshop: "🧑‍🏫",
    other: "❓",
  };

  return actTypeIconMap[type];
}
