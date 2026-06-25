/*
 * Design-system annotation types — Composa's ORIGINAL additive contribution (not from the
 * GitHub/CVS a11y toolkit). Becomes the publishable `@composa/ds-annotations` package.
 *   variant  — which Figma variant/state an instance is (its own rounded-rect label + caret).
 *   redline  — a measurement: a dimension line + value (sourced from tokens / get_variable_defs).
 * Same DATA shape as the a11y types so the shared core renders them uniformly.
 */
export const dsTypes = {
  variant: { system: "variant", color: "#8957e5", badge: null, label: (a) => a.value || a.name || "" },
  redline: { system: "redline", color: "#be185d" },
  // Structure: auto-derived from the component's `data-part` declarations (Zag/Ark convention).
  // One bracket per declared part; the label is the part name (derived, not authored).
  anatomy: { system: "anatomy", color: "#6e7781", badge: "number", label: (a) => a.label || "part" },
  // Token: semantic name (authored) + actual value DERIVED from computed style (self-correcting).
  // kind: "color" (swatch + hex) | "typography" (size/line-height) | "effect" (shadow).
  token: { system: "token", color: "#4f46e5", badge: null, label: (a) => a.name || "token" },
  // NEW VISUAL (v2, needs owner review) — corner-radius measurement: an arc traced on one corner
  // + the derived border-radius value. Layout facet. Same self-correcting derive-from-DOM rule.
  radius: { system: "radius", color: "#be185d", badge: null, label: (a) => a.value || "" },
  // NEW VISUAL (v2, needs owner review) — gap: the spacing BETWEEN two elements (`target` and
  // `targetB`), drawn as a dimension line across the void between their facing edges + value.
  gap: { system: "gap", color: "#be185d", badge: null, label: (a) => a.value || "" },
};
