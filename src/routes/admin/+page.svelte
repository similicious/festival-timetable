<script>
  import { env } from "$env/dynamic/public";
  import { getFestival } from "$lib/utils/get-festival";
  import CMS from "@sveltia/cms";

  const festival = getFestival();
  const siteDomain = new URL(festival.publicUrl).host;
  const repo = new URL(env.PUBLIC_TIMETABLE_REPO).pathname.substring(1);

  CMS.init({
    config: {
      backend: {
        name: "github",
        repo: repo,
        site_domain: siteDomain,
      },
    },
  });
</script>
