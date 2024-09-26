import { defineConfig } from "vite";
import devServer from "@hono/vite-dev-server";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "hono/jsx",
  },
  build: {
    rollupOptions: {
      input: {
        client: "src/client.ts",
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
    copyPublicDir: true,
  },
  plugins: [
    devServer({
      entry: "src/server.tsx",
    }),
  ],
});
