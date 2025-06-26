import { persisted } from "svelte-persisted-store";

export const favouriteActIds = persisted<string[]>("tmtbl-favourites", []);
