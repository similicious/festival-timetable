import type { Festival } from "$lib/models/festival";
import type { NavigationItem } from "$lib/models/navigation-item";

export function getPageTitle(
  festival: Festival,
  navigationItem?: Pick<NavigationItem, "name">,
) {
  return [festival.name, navigationItem?.name].filter(Boolean).join(" | ");
}
