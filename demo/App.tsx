import { KenyaMap } from "@debunktech/kenya-map";

export function App() {
  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <h1>kenya-map demo</h1>
      <div style={{ height: 600, border: "1px solid #e5e5e5" }}>
        {/* /data is served locally by demo/vite.config.ts's serveRepoData
            plugin, standing in for the jsDelivr URL a real consumer's
            boundariesBaseUrl would point at once this package is tagged. */}
        <KenyaMap boundariesBaseUrl="/data" />
      </div>
    </div>
  );
}
