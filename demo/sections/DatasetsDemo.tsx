import { useState } from "react";
import { KenyaMap } from "@debunktech/kenya-map";
import { DemoSection } from "../DemoSection";
import { voterDatasets, winnerDataset } from "../sampleData";

const datasets = [...voterDatasets, winnerDataset];

/** Multiple datasets, the built-in switcher and legend, and the default popup (no `renderPopup` given). The switcher shows all 4 datasets but marks the 3 that don't apply at whatever level is currently on screen; picking one ahead of drilling down still works, it just won't color anything until you're at its level. */
export function DatasetsDemo() {
  const [activeDatasetId, setActiveDatasetId] = useState("voters-county");

  return (
    <DemoSection
      title="Datasets, switcher, legend & default popup"
      description={
        <>
          Registered-voter datasets use real 2022 IEBC figures. "Winning party" is a made-up sample, included to show
          categorical (as opposed to gradient) coloring. Click any area for the default popup — its name plus every
          dataset's value for it.
        </>
      }
    >
      <KenyaMap
        boundariesBaseUrl="/data"
        datasets={datasets}
        activeDatasetId={activeDatasetId}
        onDatasetChange={setActiveDatasetId}
        showDatasetSwitcher
        showLegend
      />
    </DemoSection>
  );
}
