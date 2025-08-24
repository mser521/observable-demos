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
        test01: "./test01/index.html",
        test02: "./test02/index.html",
      },
      output: {
        manualChunks: undefined,
      },
    },
  },
});
