import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const MAPSHAPER_BIN = fileURLToPath(new URL("../../node_modules/.bin/mapshaper", import.meta.url));

/**
 * Runs the mapshaper CLI with the given arguments and returns its stdout.
 * We shell out to the CLI (rather than mapshaper's programmatic API) so
 * every step is a plain, copy-pasteable command you can also run by hand
 * to debug — see the printed command for each pipeline step.
 */
export function runMapshaper(args) {
  console.log(`  $ mapshaper ${args.join(" ")}`);
  return execFileSync(MAPSHAPER_BIN, args, { encoding: "utf8", maxBuffer: 1024 * 1024 * 256 });
}
