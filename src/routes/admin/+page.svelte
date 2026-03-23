<script>
  import { env } from "$env/dynamic/public";
  import { getFestival } from "$lib/utils/get-festival";

  import { onMount } from "svelte";

  const festival = getFestival();
  const siteDomain = new URL(festival.publicUrl).host;
  const repo = new URL(env.PUBLIC_TIMETABLE_REPO).pathname.substring(1);

  onMount(() => {
    import("@sveltia/cms").then((CMS) =>
      CMS.init({
        config: {
          backend: {
            name: "github",
            repo: repo,
            site_domain: siteDomain,
          },
        },
      }),
    );
  });
</script>
