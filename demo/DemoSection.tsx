import type { ReactNode } from "react";

/** Consistent heading/description/map-frame wrapper for each demo section. */
export function DemoSection({ title, description, children }: { title: string; description: ReactNode; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ marginBottom: 4 }}>{title}</h2>
      <p style={{ color: "#525252", fontSize: 14, marginTop: 0, maxWidth: 700 }}>{description}</p>
      <div style={{ height: 520, border: "1px solid #e5e5e5" }}>{children}</div>
    </section>
  );
}
