/*
 * annotation-kit — public entry. Code-native, AI-readable component annotations for Storybook.
 *
 * Three systems, one `parameters.annotations` source (see README + specs/_annotation-system.md):
 *   1. accessibility — codified GitHub/CVS toolkit (a11y/types.js)        → @composa/a11y-annotations
 *   2. variant + 3. measurement — Composa's additive work (ds/types.js)   → @composa/ds-annotations
 *   shared core (registry.js + the renderer)                              → @composa/annotation-core
 *
 * The registry engine (registry.js + a11y/ds type data) and the renderer (core/overlay.js)
 * now both live here, so the kit is self-contained. Remaining: split into the three npm
 * packages (see README "Extraction plan").
 */
export { withAnnotations } from "./core/overlay.js";
export { TYPES, getType, validate, registerTypes, present, cap } from "./registry.js";
export { a11yTypes } from "./a11y/types.js";
export { dsTypes } from "./ds/types.js";
