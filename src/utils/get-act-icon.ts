import type { ActType } from "@app/content.config";

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
