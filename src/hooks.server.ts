import { getPageDescription } from "$lib/utils/get-page-description";
import { getPageTitle } from "$lib/utils/get-page-title";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  if (response.headers.get("Content-Type") !== "text/html") {
    return response;
  }

  let body = await response.text();

  const pageTitle = getPageTitle();
  const pageDescription = getPageDescription();

  body = body.replace("%app.initialTitle%", pageTitle);
  body = body.replace("%app.description%", pageDescription);

  return new Response(body, response);
};
