import path from "path";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 2321,
      host: "0.0.0.0",
    },
    build: {
      outDir: "../",
    },
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        },
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
        manifest: {
          name: "Nguyen Thai Son Portfolio",
          short_name: "Portfolio",
          description: "Software Engineer & Creative Developer Portfolio",
          theme_color: "#0f172a",
          background_color: "#0f172a",
          display: "standalone",
          icons: [
            {
              src: "pwa-192x192.svg",
              sizes: "192x192",
              type: "image/svg+xml",
            },
            {
              src: "pwa-512x512.svg",
              sizes: "512x512",
              type: "image/svg+xml",
            },
          ],
        },
      }),
    ],
  };
});
