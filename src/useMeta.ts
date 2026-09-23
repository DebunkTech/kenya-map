import { useEffect, useState } from "react";

interface MapMeta {
  maxZoomWard: {
    code: string;
    name: string;
    bbox: [number, number, number, number];
  };
}

type MetaState = { status: "loading" } | { status: "ready"; data: MapMeta } | { status: "error" };

const cache = new Map<string, MapMeta>();

/** Fetches data/meta.json — small, unlike the boundary files, so no retry/lazy-loading machinery: if it fails, callers just fall back to a default. */
export function useMapMeta(baseUrl: string): MetaState {
  const url = `${baseUrl}/meta.json`;
  const [state, setState] = useState<MetaState>(() => {
    const cached = cache.get(url);
    return cached ? { status: "ready", data: cached } : { status: "loading" };
  });

  useEffect(() => {
    const cached = cache.get(url);
    if (cached) {
      setState({ status: "ready", data: cached });
      return;
    }
    let cancelled = false;
    setState({ status: "loading" });
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
        return res.json() as Promise<MapMeta>;
      })
      .then((data) => {
        cache.set(url, data);
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}
