/*
 * Storybook addon preset. Consumers add the package to `.storybook/main.js` `addons: [...]`
 * and this auto-applies the global decorator — no per-story wiring needed:
 *
 *   // .storybook/main.js
 *   export default { addons: ["@composa/annotation-kit"] };
 *
 * (Composa's own Storybook applies `withAnnotations` per-story instead, so it does NOT load
 * this preset — that would double-wrap. This file documents the consumer path.)
 */
export function previewAnnotations(entry = []) {
  return [...entry, require.resolve("./preview.js")];
}
