import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 2321,
      host: "0.0.0.0",
    },
    build: {
      outDir: "../",
    },
  };
});
