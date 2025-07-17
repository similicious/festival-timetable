import festival from "$lib/data/festival.json";
import type { NavigationItem } from "$lib/models/navigation-item";

export function getPageTitle(navigationItem?: Pick<NavigationItem, "name">) {
  return [festival.name, navigationItem?.name].filter(Boolean).join(" | ");
}
