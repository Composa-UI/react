// Foundations verifier — turns Composa's opinionated, hard-won foundational
// rules into machine-truth so they cannot be violated silently. Wired into
// `npm run check`. Each check is a STATIC source check (no rendering), so it is
// fast and deterministic. Rules that are not reliably checkable statically are
// emitted as a "guideline" list (printed, never failed) so Lane C can surface
// them in Storybook docs instead of shipping a flaky check.
//
// Run: node tools/verify-foundations.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.resolve(root, rel), "utf8");
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");

const failures = [];
const fail = (rule, msg) => failures.push(`[${rule}] ${msg}`);

const factorySrc = read("src/react/factory.js");
const storyIconsSrc = read("src/react/story-icons.js");
const builtinGlyphsSrc = read("src/react/builtin-glyphs.js");
const iconAssetsSrc = read("src/design-system/icon-assets.js");
const tokensCss = read("design/tokens.css");
const stylesCss = read("styles.css");
const segmentedCss = read("styles/88-segmented.css");
const colorInputCss = read("styles/55-color-input.css");
const navRailCss = read("styles/77-navigation-rail.css");
const buttonFamilyCss = read("styles/30-button-family.css");

// ---------------------------------------------------------------------------
// CHECK 1 — Icon coverage. Every icon name a component references in factory.js
// MUST resolve to a glyph. The resolution surface is the union of:
//   - materialSymbolByComposaName (story-icons.js)  -> Material Symbols runtime
//   - iconAssets (icon-assets.js)                   -> copied Figma UI3 SVGs
//   - BUILTIN_GLYPHS (builtin-glyphs.js)            -> license-clean inline SVGs
// A referenced name outside that union renders the "?" missing-icon box at
// runtime, so fail the build instead of shipping a hole.
// ---------------------------------------------------------------------------
const objectKeys = (src, declAnchor) => {
  const keys = new Set();
  const start = declAnchor ? src.indexOf(declAnchor) : 0;
  const body = start >= 0 ? src.slice(start) : src;
  for (const m of body.matchAll(/^\s*([a-zA-Z][a-zA-Z0-9]*)\s*:/gm)) keys.add(m[1]);
  return keys;
};

const mapKeys = new Set();
{
  // Parse only the materialSymbolByComposaName object literal so we do not pick
  // up unrelated identifiers elsewhere in the file.
  const anchor = "materialSymbolByComposaName = {";
  const start = storyIconsSrc.indexOf(anchor);
  const body = start >= 0 ? storyIconsSrc.slice(start + anchor.length) : "";
  const end = body.indexOf("\n};");
  const objBody = end >= 0 ? body.slice(0, end) : body;
  for (const m of stripComments(objBody).matchAll(/^\s*([a-zA-Z][a-zA-Z0-9]*)\s*:\s*\{\s*name:/gm)) {
    mapKeys.add(m[1]);
  }
}
const iconAssetKeys = objectKeys(iconAssetsSrc, "iconAssets = {");
const builtinGlyphKeys = objectKeys(builtinGlyphsSrc, "BUILTIN_GLYPHS = {");
const coveredIcons = new Set([...mapKeys, ...iconAssetKeys, ...builtinGlyphKeys]);

const referencedIcons = new Set();
for (const m of factorySrc.matchAll(/\bicon:\s*"([a-zA-Z][a-zA-Z0-9]*)"/g)) referencedIcons.add(m[1]);
for (const m of factorySrc.matchAll(/iconNode\([^,]+,[^,]+,\s*"([a-zA-Z][a-zA-Z0-9]*)"/g)) referencedIcons.add(m[1]);

const missingIcons = [...referencedIcons].filter((name) => !coveredIcons.has(name)).sort();
if (missingIcons.length) {
  fail(
    "icon-coverage",
    `factory.js references icon name(s) not mapped in story-icons.js / icon-assets.js / builtin-glyphs.js: ${missingIcons.join(", ")}. ` +
      `Add them to materialSymbolByComposaName (story-icons.js) or the asset/glyph maps before use.`
  );
}

// Sanity: the parser must actually find the icon map. If it ever returns empty
// (e.g. story-icons.js was renamed/restructured) the coverage check is silently
// useless, so fail loudly.
if (mapKeys.size === 0) {
  fail("icon-coverage", "could not parse materialSymbolByComposaName from src/react/story-icons.js — the icon-coverage check would be a no-op.");
}

// ---------------------------------------------------------------------------
// CHECK 2 — Hardcoded spacing where a token exists. The inspector inset and
// dialog inset rules are token-backed; raw px in those properties is a smell.
// We scan the inspector/dialog style sources for `padding`/`margin`/`gap`
// declarations whose value is a bare pixel where a spacing token exists. The map
// below mirrors the EXACT --composa-space-* scale (4/8/12/16/24/32); values with
// no token (6px, 10px, 1px hairlines, 0) are intentionally not flagged so we
// never demand a token that does not exist.
// ---------------------------------------------------------------------------
const spacingTokenForPx = {
  "4px": "--composa-space-1",
  "8px": "--composa-space-2",
  "12px": "--composa-space-2-5",
  "16px": "--composa-space-3",
  "24px": "--composa-space-4",
  "32px": "--composa-space-5",
};
const spacingProps = /\b(padding|padding-(?:inline|block|top|right|bottom|left)|margin|margin-(?:inline|block|top|right|bottom|left)|gap|row-gap|column-gap)\s*:\s*([^;{}]+);/g;
const spacingScopedFiles = [
  ["styles/78-inspector-header.css", read("styles/78-inspector-header.css")],
  ["styles/98-inspector.css", read("styles/98-inspector.css")],
  ["styles/80-dialog.css", read("styles/80-dialog.css")],
];
for (const [file, css] of spacingScopedFiles) {
  const clean = stripComments(css);
  for (const m of clean.matchAll(spacingProps)) {
    const prop = m[1];
    const value = m[2].trim();
    // Allow token usage, 0, 1px hairlines, calc(), and non-pixel units.
    if (value.includes("var(") || value.includes("calc(")) continue;
    for (const part of value.split(/\s+/)) {
      const token = spacingTokenForPx[part];
      if (token) {
        fail(
          "hardcoded-spacing",
          `${file}: \`${prop}: ${value};\` hardcodes ${part} where ${token} exists. Use the token.`
        );
      }
    }
  }
}

// ---------------------------------------------------------------------------
// CHECK 3 — Overlay host wrapping in stories. Components with intrinsic hover
// tooltips (ControlGroup, AlignmentPicker) portal their tooltip into the nearest
// OverlayHost; a standalone story that renders them without an OverlayHost shows
// nothing on hover (the bug that cost real debugging time). So: any *.stories.js
// that imports ControlGroup or AlignmentPicker MUST also reference OverlayHost.
// ---------------------------------------------------------------------------
const storiesDir = path.resolve(root, "src/react/stories");
const collectStories = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectStories(full));
    else if (entry.name.endsWith(".stories.js")) out.push(full);
  }
  return out;
};
const overlayDependentImports = ["ControlGroup", "AlignmentPicker"];
for (const file of collectStories(storiesDir)) {
  const src = fs.readFileSync(file, "utf8");
  const importsOverlayDependent = overlayDependentImports.some((name) =>
    new RegExp(`\\b${name}\\b`).test(src)
  );
  if (importsOverlayDependent && !src.includes("OverlayHost")) {
    fail(
      "overlay-host-story",
      `${path.relative(root, file)}: renders a tooltip-bearing component (ControlGroup/AlignmentPicker) ` +
        `but never references OverlayHost. Wrap the story stage in OverlayHost (a meta decorator host) ` +
        `or its hover tooltips have nowhere to portal.`
    );
  }
}

// ---------------------------------------------------------------------------
// CHECK 4 — Edge-only rounding on segmented / control-group / numeric-multi, and
// the color-input right-edge clip. The contract is: round only the OUTER corners
// (first-child left, last-child right) by clipping children to the rounded
// container (`overflow: hidden`) rather than rounding every inner cell. We assert
// the load-bearing anchors are present so a refactor can't silently drop them.
// ---------------------------------------------------------------------------
const requireAnchor = (rule, file, css, needle, why) => {
  if (!css.includes(needle)) fail(rule, `${file}: missing \`${needle}\` — ${why}`);
};
// Segmented selected pill is a single white raised cell; the container owns the
// radius, inner segments inherit the container clip via the medium-radius track.
requireAnchor("edge-rounding", "styles/88-segmented.css", segmentedCss, "border-radius: var(--composa-radius-medium);", "the segmented track must own the outer radius.");
// Color input clips children so the right-edge opacity box picks up the
// container's top-right/bottom-right radius instead of a square corner.
requireAnchor("edge-rounding", "styles/55-color-input.css", colorInputCss, "overflow: hidden;", "the color input must clip children so the right-edge box inherits the container radius.");
// NumericInputMulti rounds only the outer edges of the segment row.
const numericMultiCss = read("styles/50-input.css");
requireAnchor("edge-rounding", "styles/50-input.css", numericMultiCss, "border-top-left-radius: var(--composa-radius-medium);", "NumericInputMulti must round only the outer (first-child) edge.");

// ---------------------------------------------------------------------------
// CHECK 5 — Active = ICON turns accent (founder defect). The shared selected-
// glyph token must exist and the toggle + nav-rail ON rules must drive the glyph
// color from it (the glyph reads currentColor, so this is the `color` property).
// This locks the fix in: a future edit that reverts the nav-rail glyph back to
// plain text color, or drops the dialog-opener `is-selected` branch, fails here.
// ---------------------------------------------------------------------------
requireAnchor("active-icon-token", "design/tokens.css", tokensCss, "--composa-control-fg-selected:", "the active/selected glyph color must be a token.");
requireAnchor("active-icon-token", "design/tokens.css", tokensCss, "--composa-navigation-rail-item-icon-selected:", "the nav-rail selected glyph color must be a token.");
requireAnchor("active-icon-navrail", "styles/77-navigation-rail.css", navRailCss, "color: var(--composa-navigation-rail-item-icon-selected);", "the selected nav-rail destination must color its ICON accent, not just the container.");
requireAnchor("active-icon-toggle", "styles/30-button-family.css", buttonFamilyCss, "color: var(--composa-control-fg-selected);", "the ToggleButton ON state must color its ICON accent via the shared token.");
// The dialog-opener toggle is active via .is-selected / [data-dialog-open], not
// aria-pressed; assert those branches are enumerated in the ON rule.
requireAnchor("active-icon-toggle", "styles/30-button-family.css", buttonFamilyCss, '.composa-toggle-button[data-variant="standard"][data-dialog-open="true"]', "an open dialog-opener toggle must show the active (accent) state.");

// ---------------------------------------------------------------------------
// GUIDELINES — rules that are not reliably statically checkable. Printed for
// Lane C to surface in Storybook docs; never fails the build.
// ---------------------------------------------------------------------------
const guidelines = [
  "OverlayHost is the intended mount path for ALL tooltips/menus/inspector-dialogs. Any page, stage, or app surface that shows transient overlays must have an OverlayHost ancestor (the inline FloatingTooltip fallback in 75-tooltip.css / 87-alignment-picker.css is a safety net, not the design).",
  "Icon sizing: icon-button glyphs default to 20px inside a 24px (medium) frame; the navigation-rail destination uses a 24px glyph in a 32px container; editor-toolbar tool glyphs render at 24px. Pick the box size for the surface, not the glyph alone.",
  "Icon weight: default weight 200; weight 300 is reserved for glyphs that render on a light/white surface at 24px (editor-toolbar tools, the comments composer arrow/more) so they don't read thin. Use 300 only when a 200 glyph looks underweight on white.",
  "Dialogs use the inset spacing token (--composa-inspector-dialog-inset = 12px) plus the 8/12/16 block scale; never hand-pad with raw px. Section dividers are real, full-bleed border elements where the spec calls for them — do not fake them with uniform surface padding.",
  "Edge-only rounding: segmented / ControlGroup / NumericInputMulti round only their OUTER corners (clip inner cells to the rounded container); the color-input opacity box on the right edge must inherit the container radius via overflow:hidden.",
  "ToggleButton / NavigationRailItem active state colors the ICON accent (blue), not only the container background.",
  "Style isolation: DS CSS ships inside `@layer composa`, so app globals (e.g. `button { … }`) cannot override DS internals on specificity. Theme the DS through --composa-* custom properties, not by overriding class selectors.",
];

if (failures.length) {
  console.error("Foundations verification FAILED:");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      iconCoverage: { referenced: referencedIcons.size, covered: coveredIcons.size, missing: 0 },
      checks: [
        "icon-coverage",
        "hardcoded-spacing",
        "overlay-host-story",
        "edge-rounding",
        "active-icon (token + nav-rail + toggle, incl. dialog-opener)",
      ],
      guidelines,
    },
    null,
    2
  )
);
