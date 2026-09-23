import { useEffect, useMemo, useState } from "react";
import { KenyaMap, type Selection } from "@debunktech/kenya-map";
import { DemoSection } from "../DemoSection";

// codes.json's shape (see data/README.md) — this demo fetches it itself,
// exactly like a real consumer would, to get area names/codes for the
// dropdowns. The component never fetches this file on its own.
interface CodeEntry {
  code: string;
  name: string;
  level: "county" | "constituency" | "ward";
  county_code?: string;
  constituency_code?: string;
}

const selectStyle = { font: "inherit", fontSize: 13, padding: "4px 8px" };

/** Controlled selection, driven by three cascading <select> dropdowns instead of clicking the map — and the reverse works too: clicking the map updates the dropdowns, since both read/write the same lifted `selection` state via `selection`/`onSelect`. */
export function ControlledDemo() {
  const [selection, setSelection] = useState<Selection>({});
  const [codes, setCodes] = useState<CodeEntry[] | null>(null);

  useEffect(() => {
    fetch("/data/codes.json")
      .then((res) => res.json())
      .then(setCodes)
      .catch(() => setCodes([]));
  }, []);

  const counties = useMemo(() => codes?.filter((c) => c.level === "county") ?? [], [codes]);
  const constituencies = useMemo(
    () => codes?.filter((c) => c.level === "constituency" && c.county_code === selection.county) ?? [],
    [codes, selection.county],
  );
  const wards = useMemo(
    () => codes?.filter((c) => c.level === "ward" && c.constituency_code === selection.constituency) ?? [],
    [codes, selection.constituency],
  );

  return (
    <DemoSection
      title="Controlled mode, driven by dropdowns"
      description="These three <select> elements and the map both read/write the same selection state (lifted here, via the selection/onSelect props) — pick from a dropdown or click the map, either drives the other. Options come from data/codes.json, fetched by this demo the same way any consumer would."
    >
      <div style={{ display: "flex", gap: 8, padding: 8, borderBottom: "1px solid #e5e5e5" }}>
        <select
          style={selectStyle}
          value={selection.county ?? ""}
          onChange={(event) => setSelection(event.target.value ? { county: event.target.value } : {})}
        >
          <option value="">County…</option>
          {counties.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          style={selectStyle}
          value={selection.constituency ?? ""}
          disabled={!selection.county}
          onChange={(event) =>
            setSelection(event.target.value ? { county: selection.county, constituency: event.target.value } : { county: selection.county })
          }
        >
          <option value="">Constituency…</option>
          {constituencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          style={selectStyle}
          value={selection.ward ?? ""}
          disabled={!selection.constituency}
          onChange={(event) =>
            setSelection(
              event.target.value
                ? { county: selection.county, constituency: selection.constituency, ward: event.target.value }
                : { county: selection.county, constituency: selection.constituency },
            )
          }
        >
          <option value="">Ward…</option>
          {wards.map((w) => (
            <option key={w.code} value={w.code}>
              {w.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ height: "calc(100% - 39px)" }}>
        <KenyaMap boundariesBaseUrl="/data" selection={selection} onSelect={setSelection} />
      </div>
    </DemoSection>
  );
}
