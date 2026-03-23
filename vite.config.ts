import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { execSync } from "node:child_process";
import festival from "./src/lib/data/timetable/festival.json";

const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
const timeTableCommitHash = execSync(
  "git -C ./src/lib/data/timetable rev-parse --short HEAD",
)
  .toString()
  .trim();

export default defineConfig({
  define: {
    BUILD_COMMIT: JSON.stringify(commitHash),
    BUILD_DATE: JSON.stringify(new Date()),
    BUILD_TIMETABLE_COMMIT: JSON.stringify(timeTableCommitHash),
  },
  plugins: [
    devtoolsJson(),
    tailwindcss(),
    sveltekit(),
    SvelteKitPWA({
      registerType: "autoUpdate",
      injectRegister: "script",
      base: "/",
      kit: {
        adapterFallback: "index.html",
        spa: true,
      },
      manifest: {
        start_url: "/",
        name: `${festival.name} Timetable`,
        short_name: `${festival.name}`,
        theme_color: "#3f3f47",
        background_color: "#2a2627",
        icons: [
          {
            src: "images/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "images/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "images/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        additionalManifestEntries: [
          // Manually adding the env.js file as it's generated after the service worker build
          // https://github.com/vite-pwa/sveltekit/issues/98#issuecomment-2566411227
          { revision: new Date().valueOf().toString(), url: "_app/env.js" },
        ],
        globPatterns: [
          "client/**/*.{js,css,ico,png,svg,webp,webmanifest}",
          "prerendered/**/*.{html,json,svg}",
        ],
        // Don't add precache @sveltia/cms
        manifestTransforms: [
          (entries) => ({
            manifest: entries.filter((e) => e.size < 500_000),
          }),
        ],
      },
    }),
    // visualizer({
    //   emitFile: true,
    //   filename: "stats.html",
    // }),
  ],
});
