import { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [solidPlugin(), dts({ rollupTypes: true })],
  server: {
    port: 3030,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "live2d-widget",
      fileName: (format) => `live2d-widget.${format}.js`,
    },
  },
});
