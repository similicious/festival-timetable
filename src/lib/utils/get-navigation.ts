import type { NavigationItem } from "$lib/models/navigation-item";
import type { Stage } from "$lib/models/stage";

export function getNavigation(stages: Stage[]) {
  const overview: NavigationItem = {
    path: "/",
    icon: "🗓️",
    name: "Overview",
  };

  const favourites: NavigationItem = {
    path: "/favourites",
    icon: "❤️",
    name: "Favourites",
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

  return [overview, favourites, ...stageNavigationItems, about];
}
