import { KenyaMap } from "@debunktech/kenya-map";
import { DemoSection } from "../DemoSection";
import { pointLayers } from "../sampleData";

/** Point layers, the layer-visibility toggles, and a custom `renderPointPopup`. Markers stay a constant on-screen size while zooming; clicking one opens its own popup without also drilling into whatever area is underneath it. */
export function PointLayersDemo() {
  return (
    <DemoSection
      title="Point layers"
      description="Two made-up point layers (story locations, field offices) with independent visibility toggles. Story-location markers are colored by category; clicking one opens a custom popup."
    >
      <KenyaMap
        boundariesBaseUrl="/data"
        pointLayers={pointLayers}
        showLayerToggles
        renderPointPopup={(point) => {
          const url = point.data && typeof point.data === "object" && "url" in point.data ? (point.data as { url: string }).url : undefined;
          return (
            <div>
              <strong>{point.label}</strong>
              {url && (
                <div>
                  <a href={url}>{url}</a>
                </div>
              )}
            </div>
          );
        }}
      />
    </DemoSection>
  );
}
