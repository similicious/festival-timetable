import type { NavigationItem } from "$lib/models/navigation-item";
import type { Stage } from "$lib/models/stage";
import { readable } from "svelte/store";

export function getNavigation(stages: Stage[]) {
  const overview: NavigationItem = {
    path: "/",
    icon: "🗓️",
    name: "Overview",
  };

  const about: NavigationItem = {
    path: "/about",
    icon: "🧭",
    name: "About",
  };

  const stageNavigationItems: NavigationItem[] = stages.map(
    ({ icon, name, slug }) => ({
      path: `/stages/${slug}`,
      icon,
      name,
    }),
  );

  return [overview, ...stageNavigationItems, about];
}
