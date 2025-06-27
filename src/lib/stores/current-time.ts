import { writable } from "svelte/store";
import { browser } from "$app/environment";

function createCurrentTimeStore() {
  const { subscribe, set } = writable(new Date());

  let interval: number;

  if (browser) {
    set(new Date());

    interval = setInterval(() => {
      set(new Date());
    }, 1000);
  }

  return {
    subscribe,
    destroy: () => {
      if (interval) {
        clearInterval(interval);
      }
    },
  };
}

export const currentTime = createCurrentTimeStore();
