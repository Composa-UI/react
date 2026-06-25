/*
 * Generate annotation.schema.json (JSON Schema) + annotation.d.ts (TypeScript types) from the
 * type registry — one source of truth. Run: `node src/annotation-kit/scripts/generate-schema.mjs`.
 * Imports the PURE type data only (no renderer / no ?raw icons), so it runs in plain Node.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { a11yTypes } from "../a11y/types.js";
import { dsTypes } from "../ds/types.js";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..");
const TYPES = { ...a11yTypes, ...dsTypes };

// Props that exist on every annotation.
const BASE = {
  n: { type: "number", desc: "stamp number" },
  target: { type: "string", desc: "CSS selector for the annotated element", required: true },
  marker: { enum: ["pin", "bracket", "lasso", "caret"], desc: "line treatment" },
  side: { enum: ["top", "bottom", "left", "right"], desc: "which side the label sits" },
  label: { type: "string", desc: "label override" },
  anchor: { enum: ["edge", "center"], desc: "anchor the connector at the element edge (default) or centre (nested targets)" },
  each: { bool: true, desc: "repeat this annotation across EVERY element matching target (composite items)" },
  tier: { tier: true, desc: "priority/difficulty (a11y)" },
};
// System-specific props not captured by the registry `fields` (the card fields).
const EXTRA = {
  redline: { dimension: { enum: ["width", "height", "radius"], required: true }, value: { type: "string", desc: "override; else derived" } },
  token: { kind: { enum: ["color", "typography", "effect"], required: true }, prop: { enum: ["background", "text", "border"] }, name: { type: "string", desc: "override; else derived from the CSS var" }, value: { type: "string" } },
  variant: { value: { type: "string" }, name: { type: "string" } },
  anatomy: {}, // auto-derives from data-part; target optional
  // NEW VISUAL (v2) — Layout facet additions.
  radius: { corner: { enum: ["top-left", "top-right", "bottom-left", "bottom-right"], desc: "which corner to trace" }, value: { type: "string", desc: "override; else derived" } },
  gap: { targetB: { type: "string", required: true, desc: "selector for the second element" }, value: { type: "string", desc: "override; else derived" } },
};

const jsonOf = (key, f) => {
  if (key === "keyboard") return { type: "array", items: { type: "object", properties: { keys: { type: "string" }, result: { type: "string" } }, required: ["keys", "result"] } };
  if (key === "states") return { type: "array", items: { type: "object", properties: { state: { type: "string" }, aria: { type: "string" } }, required: ["state", "aria"] } };
  if (f && f.enum) return { enum: f.enum };
  if (f && f.bool) return { type: "boolean" };
  if (f && f.tier) return { type: "object", properties: { priority: { enum: ["mandatory", "ideal", "nice-to-have"] }, difficulty: { enum: ["easy", "moderate", "advanced"] } } };
  if (f && f.type === "number") return { type: "number" };
  return { type: "string" };
};
const tsOf = (key, f) => {
  if (key === "keyboard") return "KeyboardEntry[]";
  if (key === "states") return "StateEntry[]";
  if (f && f.enum) return f.enum.map((v) => JSON.stringify(v)).join(" | ");
  if (f && f.bool) return "boolean";
  if (f && f.tier) return "Tier";
  if (f && f.type === "number") return "number";
  return "string";
};

// Build, per type: the full prop set (base + registry fields + system extras) and required list.
function propsFor(typeKey) {
  const def = TYPES[typeKey];
  const props = {};
  const required = ["type"];
  for (const [k, f] of Object.entries(BASE)) {
    props[k] = { ...f };
    if (f.required && !(typeKey === "anatomy" && k === "target")) required.push(k);
  }
  for (const f of def.fields || []) {
    props[f.key] = { ...f };
    if (f.required) required.push(f.key);
  }
  for (const [k, f] of Object.entries(EXTRA[typeKey] || {})) {
    props[k] = { ...f };
    if (f.required) required.push(k);
  }
  return { props, required: [...new Set(required)] };
}

// ---- JSON Schema ----
const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Composa annotation",
  description: "An entry in a story's parameters.annotations. Generated from the type registry.",
  oneOf: Object.keys(TYPES).map((typeKey) => {
    const { props, required } = propsFor(typeKey);
    const properties = { type: { const: typeKey } };
    for (const [k, f] of Object.entries(props)) properties[k] = jsonOf(k, f);
    return { title: typeKey, type: "object", properties, required, additionalProperties: false };
  }),
};
writeFileSync(join(out, "annotation.schema.json"), JSON.stringify(schema, null, 2) + "\n");

// ---- TypeScript types ----
const iface = (typeKey) => {
  const { props, required } = propsFor(typeKey);
  const lines = [`  type: ${JSON.stringify(typeKey)};`];
  for (const [k, f] of Object.entries(props)) {
    if (k === "target" && required.includes("target")) lines.push(`  target: string;`);
    else lines.push(`  ${JSON.stringify(k).replace(/"/g, "")}${required.includes(k) ? "" : "?"}: ${tsOf(k, f)};`);
  }
  const name = typeKey.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase()) + "Annotation";
  return { name, body: `export interface ${name} {\n${lines.join("\n")}\n}` };
};
const ifaces = Object.keys(TYPES).map(iface);
const ts = `// Generated from the annotation-kit type registry — do not edit by hand.
// Regenerate: node src/annotation-kit/scripts/generate-schema.mjs

export type Marker = "pin" | "bracket" | "lasso" | "caret";
export type Side = "top" | "bottom" | "left" | "right";
export interface KeyboardEntry { keys: string; result: string; }
export interface StateEntry { state: string; aria: string; }
export interface Tier { priority?: "mandatory" | "ideal" | "nice-to-have"; difficulty?: "easy" | "moderate" | "advanced"; }

${ifaces.map((i) => i.body).join("\n\n")}

export type Annotation =\n  | ${ifaces.map((i) => i.name).join("\n  | ")};
`;
writeFileSync(join(out, "annotation.d.ts"), ts);

console.log(`Wrote annotation.schema.json (${schema.oneOf.length} types) + annotation.d.ts (${ifaces.length} interfaces)`);
