import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import devtoolsJson from "vite-plugin-devtools-json";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
  plugins: [
    devtoolsJson(),
    tailwindcss(),
    sveltekit(),
    SvelteKitPWA({
      registerType: "autoUpdate",
      injectRegister: "script",
      base: "/",
      manifest: {
        start_url: "/",
        name: "Festival Timetable App",
        short_name: "Timetable",
        theme_color: "#f6339a",
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
      },
    }),
    visualizer({
      emitFile: true,
      filename: "stats.html",
    }),
  ],
});
