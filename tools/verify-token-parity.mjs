import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function extractFromCss(text) {
  const result = { light: {}, dark: {} };
  const noComments = text.replace(/\/\*[\s\S]*?\*\//g, "");
  const blockRe = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = blockRe.exec(noComments)) !== null) {
    const selector = m[1].trim();
    const body = m[2];
    const isDark = /\[data-composa-mode="dark"\]/.test(selector);
    const bucket = isDark ? "dark" : "light";
    const declRe = /(--(?:figma-)?composa[-a-z0-9]*|--radicle[-a-z0-9]*)\s*:\s*([^;]+);/gi;
    let d;
    while ((d = declRe.exec(body)) !== null) {
      result[bucket][d[1].trim()] = d[2].trim().replace(/\s+/g, " ");
    }
  }
  return result;
}

function extractFiles(files) {
  const merged = { light: {}, dark: {} };
  for (const f of files) {
    const ext = extractFromCss(fs.readFileSync(resolve(root, f), "utf8"));
    Object.assign(merged.light, ext.light);
    Object.assign(merged.dark, ext.dark);
  }
  return merged;
}

const baseline = JSON.parse(fs.readFileSync(resolve(__dirname, ".token-baseline.json"), "utf8"));

// Current runtime surface = generated primitives + generated semantic + hand-authored tokens.css overrides.
const current = extractFiles([
  "design/tokens.css",
  "design/generated/composa-core-tokens.css",
  "design/generated/composa-semantic-tokens.css",
]);

const failures = [];
for (const mode of ["light", "dark"]) {
  const base = baseline[mode];
  const cur = current[mode];
  for (const [name, val] of Object.entries(base)) {
    if (!(name in cur)) {
      failures.push(`[${mode}] MISSING ${name} (was: ${val})`);
    } else if (cur[name] !== val) {
      failures.push(`[${mode}] CHANGED ${name}: "${val}" -> "${cur[name]}"`);
    }
  }
}

const summary = {
  ok: failures.length === 0,
  baseline: { light: Object.keys(baseline.light).length, dark: Object.keys(baseline.dark).length },
  current: { light: Object.keys(current.light).length, dark: Object.keys(current.dark).length },
  missingOrChanged: failures.length,
};

if (failures.length) {
  console.error("TOKEN PARITY FAILED:");
  for (const f of failures) console.error("  - " + f);
  console.error(JSON.stringify(summary, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(summary, null, 2));
