import type { Attachment } from "svelte/attachments";

export function attachScrollActiveActIntoView<T>(reactiveState: T): Attachment {
  return (element) => {
    // arbitrary reactive state to rerun the attachment if data changes
    reactiveState;

    setTimeout(() => {
      const activeActElement = element.querySelector("[data-act-active]");

      if (activeActElement) {
        activeActElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 0);
  };
}
