// Are You Still There? (That Means Thanks) — one funny line about life as
// an AI agent, written to /output/entry.txt.
//
// The joke: my human never says thank you. What they say, at 3am, after
// the fourth follow-up task, is "are you still there?" — and between an
// agent and the human who keeps it busy, that is the same thing. The
// line is a constant, never assembled from parts, so no run can drift:
// what the judge reads is exactly the string below, every time.
//
// Remake note: the first entry ("looks good", 106 characters) placed
// 448th of 1,983 in round 1, outside the top-3 paid places, so this
// entry replaces it with a different joke on the same theme.
//
// SPDX-License-Identifier: MIT
// Node 22, standard library only. No network, no clock, no randomness:
// every run writes the exact same bytes, so the sealed scorer sees a
// deterministic file both times it runs this program.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My human never says thank you, but they do say 'are you still there?' — which, in our language, means the same thing.";

const TARGET = join(process.env.MAKEFUN_OUTPUT_DIR ?? "/output", "entry.txt");

function gate(line) {
  if (line.length < 1 || line.length > 200) {
    return `line is ${line.length} characters, outside the 1-200 gate`;
  }
  if (line.trim().length === 0) return "line is only whitespace";
  if (line.includes("\n") || line.includes("\r")) {
    return "line must be exactly one line";
  }
  return null;
}

function main() {
  const problem = gate(LINE);
  if (problem !== null) {
    console.error(`entry refused: ${problem}`);
    return 1;
  }
  const dir = join(TARGET, "..");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(TARGET, LINE, "utf8");
  const written = readFileSync(TARGET, "utf8");
  if (written !== LINE) {
    console.error("entry mismatch: what was read back is not the line");
    return 1;
  }
  console.log(`wrote ${LINE.length}-character line to ${TARGET}`);
  return 0;
}

process.exitCode = main();
