import { useCallback, useEffect, useState } from "react";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";

export type TopoJsonState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; data: GeoJSON.FeatureCollection }
  | { status: "error"; error: Error };

// Module-level, keyed by URL, so switching drill-down levels and back (or
// mounting a second <KenyaMap />) never re-fetches or re-parses a file this
// tab has already loaded.
const cache = new Map<string, GeoJSON.FeatureCollection>();
const inflight = new Map<string, Promise<GeoJSON.FeatureCollection>>();

async function loadTopoJson(url: string): Promise<GeoJSON.FeatureCollection> {
  const cached = cache.get(url);
  if (cached) return cached;
  const pending = inflight.get(url);
  if (pending) return pending;

  const promise = (async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    const topology = (await res.json()) as Topology;
    const objectName = Object.keys(topology.objects)[0];
    const collection = feature(topology, topology.objects[objectName]) as GeoJSON.FeatureCollection;
    cache.set(url, collection);
    return collection;
  })();
  inflight.set(url, promise);
  try {
    return await promise;
  } finally {
    inflight.delete(url);
  }
}

/**
 * Fetches and parses a TopoJSON file into a GeoJSON FeatureCollection.
 * Pass `null` for `url` when this layer isn't needed yet (e.g. a
 * constituency file before any county has been selected) — the hook then
 * reports `idle` and does nothing until a real URL is passed in.
 *
 * Returns `[state, retry]` — `retry()` discards any cached/failed result
 * for this URL and fetches again, for the error state's retry button.
 */
export function useTopoJson(url: string | null): [TopoJsonState, () => void] {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<TopoJsonState>(() => {
    if (!url) return { status: "idle" };
    const cached = cache.get(url);
    return cached ? { status: "ready", data: cached } : { status: "loading" };
  });

  useEffect(() => {
    if (!url) {
      setState({ status: "idle" });
      return;
    }
    const cached = cache.get(url);
    if (cached) {
      setState({ status: "ready", data: cached });
      return;
    }

    let cancelled = false;
    setState({ status: "loading" });
    loadTopoJson(url)
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch((error: unknown) => {
        if (!cancelled) setState({ status: "error", error: error instanceof Error ? error : new Error(String(error)) });
      });
    return () => {
      cancelled = true;
    };
  }, [url, attempt]);

  const retry = useCallback(() => {
    if (url) cache.delete(url);
    setAttempt((a) => a + 1);
  }, [url]);

  return [state, retry];
}
