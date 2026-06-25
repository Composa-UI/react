/*
 * annotation-kit core registry — the shared engine both packages build on (becomes
 * `@composa/annotation-core`). It owns the merged type table, the field validator, and the
 * `registerType` extension hook. The renderer (the decorator) iterates whatever lives here, so
 * third parties add a type by registering DATA — no renderer changes.
 */
import { a11yTypes } from "./a11y/types.js";
import { dsTypes } from "./ds/types.js";
import { a11yIcons } from "./a11y/icons.js";

export const present = (v) => !(v == null || v === "" || (Array.isArray(v) && !v.length));
export const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// merged registry: a11y (codified GitHub/CVS) + ds (variant + measurement)
export const TYPES = { ...a11yTypes, ...dsTypes };
// attach real toolkit icons here (kept out of types.js so that stays Node-importable for codegen)
for (const k of Object.keys(a11yIcons)) if (TYPES[k]) TYPES[k].icon = a11yIcons[k];

// extension hook — register custom types (data only)
export function registerTypes(obj) {
  Object.assign(TYPES, obj);
  return TYPES;
}

// resolve a type config from an annotation (or a type string); unknown → note
export function getType(a) {
  const key = typeof a === "string" ? a : a && a.type;
  return TYPES[key] || TYPES.note;
}

// validate required fields per type → human-readable errors (surfaced in the overlay)
export function validate(annotations) {
  const errs = [];
  for (const a of annotations || []) {
    const t = TYPES[a.type];
    if (!t) {
      errs.push(`#${a.n}: unknown type "${a.type}"`);
      continue;
    }
    for (const f of t.fields || []) {
      if (f.required && !present(a[f.key])) errs.push(`#${a.n} (${a.type}): missing required field "${f.key}"`);
    }
  }
  return errs;
}
