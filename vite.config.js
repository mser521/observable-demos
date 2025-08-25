import { defineConfig } from "vite";

export default defineConfig({
  base: "", // Root domain for custom GitHub Pages
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: "dist", // Specify build output directory
    rollupOptions: {
      input: {
        main: "./index.html",
        "01-dot-plot": "./demos/01-scatter-plot/index.html",
        "02-bar-chart": "./demos/02-bar-chart/index.html",
        "03-table": "./demos/03-table/index.html",
      },
      output: {
        manualChunks: undefined,
      },
    },
  },
});
