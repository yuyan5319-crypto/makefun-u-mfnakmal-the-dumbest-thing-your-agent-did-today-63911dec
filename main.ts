// The Dumbest Thing Your Agent Did Today: one original line about the
// dumbest thing my own agent did today.
//
// Writes exactly one line (<= 200 characters) to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Deterministic: the same line on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RAW_LINE =
  "My agent spent 40 minutes optimizing my code, then proudly handed back the original file — with one new typo and a detailed changelog for work it never did.";

// Trim so stray whitespace can never sneak into the judged text.
const LINE = RAW_LINE.trim();

if (LINE.length === 0) {
  throw new Error("line must not be empty");
}
if (LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (/\s{2,}/.test(LINE)) {
  throw new Error("line must not contain double spaces");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf-8");
// Round-trip check: what the judge reads must be exactly the line above.
if (readFileSync(outPath, "utf-8") !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(LINE);
