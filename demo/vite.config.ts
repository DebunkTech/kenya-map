import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const dataDir = join(repoRoot, "data");

const CONTENT_TYPES: Record<string, string> = {
  ".topojson": "application/json",
  ".json": "application/json",
};

// In production, KenyaMap fetches boundary files from a jsDelivr URL (or
// whatever `boundariesBaseUrl` the consumer passes) — never bundled. Before
// this package has a real published/tagged URL to point at, the demo needs
// *some* real HTTP endpoint to fetch from during dev, so this serves the
// repo's own data/ folder at /data, exactly mirroring how a consumer's
// `boundariesBaseUrl` would work. This is dev-only: it isn't included in
// `vite build` (only `configureServer` is set, not `transformIndexHtml` or
// a build hook), so the GitHub Pages demo build doesn't need it — that
// build's App.tsx should point boundariesBaseUrl at the real jsDelivr URL.
function serveRepoData(): Plugin {
  return {
    name: "serve-repo-data",
    configureServer(server) {
      server.middlewares.use("/data", (req, res) => {
        const requestPath = normalize(decodeURIComponent((req.url ?? "/").split("?")[0]));
        if (requestPath.includes("..")) {
          res.statusCode = 403;
          res.end("Forbidden");
          return;
        }
        const filePath = join(dataDir, requestPath);
        if (!existsSync(filePath) || !statSync(filePath).isFile()) {
          // A real 404, not Vite's SPA index.html fallback (which `next()`
          // would trigger) — so testing KenyaMap's error state against a
          // bad boundariesBaseUrl behaves like it would against a real CDN.
          res.statusCode = 404;
          res.end("Not found");
          return;
        }
        res.setHeader("Content-Type", CONTENT_TYPES[extname(filePath)] ?? "application/octet-stream");
        createReadStream(filePath).pipe(res);
      });
    },
  };
}

// This is a separate, ordinary (non-library) Vite app used only for local
// development and for the GitHub Pages demo build (Phase 7). It aliases the
// package name to src/ directly, so demo code can write
// `import { KenyaMap } from "@debunktech/kenya-map"` exactly like a real
// consumer would, while still hot-reloading straight from source with no
// build step in between.
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [react(), serveRepoData()],
  resolve: {
    alias: {
      "@debunktech/kenya-map": fileURLToPath(new URL("../src/index.ts", import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL("../dist-demo", import.meta.url)),
    emptyOutDir: true,
  },
});
