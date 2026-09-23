import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";

// This config builds the *library* (src/ -> dist/), not the demo app.
// `npm run build` uses this file implicitly because it's the default
// vite.config.ts at the repo root; the demo has its own config.
export default defineConfig({
  plugins: [
    react(),
    // Generates dist/index.d.ts (and friends) from our TypeScript types,
    // since Vite's own build only handles JS, not .d.ts files.
    dts({ rollupTypes: true, tsconfigPath: "./tsconfig.app.json" }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      name: "KenyaMap",
      fileName: (format) => (format === "es" ? "kenya-map.js" : "kenya-map.cjs"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // Don't bundle react/react-dom into dist — consumers provide their
      // own copy (they're peerDependencies in package.json).
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    // dist/ is committed to git, so keep it clean on every build.
    emptyOutDir: true,
  },
});
