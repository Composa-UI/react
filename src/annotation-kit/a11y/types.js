/*
 * a11y type registry — codified from the GitHub Annotation Toolkit (forked from CVS Health's
 * Web Accessibility Annotation Kit), CC-BY 4.0. PURE DATA: { system, color, badge, label, fields }.
 * The renderer iterates this — adding/changing a type or its Detail fields is a data edit, never
 * renderer code. `required` fields are validated. Icons are attached in registry.js (kept out of
 * here so this module stays importable in plain Node — e.g. the schema generator). Becomes the
 * publishable `@composa/a11y-annotations` package (attribution lives in the package README).
 *
 * field = { key, label?, required?, mono?, format?, bool? }
 */

const fmtKeyboard = (arr) => arr.map((k) => `${k.keys} → ${k.result}`).join("  ·  ");
const fmtStates = (arr) => arr.map((s) => `${s.state}: ${s.aria}`).join("  ·  ");

export const a11yTypes = {
  button: {
    system: "a11y", color: "#45691d", badge: "number", label: (a) => a.label || "Button",
    fields: [
      { key: "element", required: true, mono: true },
      { key: "role", required: true, mono: true },
      { key: "accessibleName", label: "name" },
      { key: "keyboard", format: fmtKeyboard },
      { key: "states", format: fmtStates },
    ],
  },
  heading: {
    system: "a11y", color: "#0d7d7d", badge: "level", label: (a) => a.label || "",
    fields: [{ key: "level", required: true }],
  },
  landmark: {
    system: "a11y", color: "#bf3989", badge: "number", label: (a) => a.label || a.element || "Landmark",
    fields: [
      { key: "element", required: true, mono: true },
      { key: "role", mono: true },
      { key: "accessibleName", label: "accessible name" },
    ],
  },
  link: {
    system: "a11y", color: "#0969da", badge: "number", label: (a) => a.label || "Link",
    fields: [
      { key: "accessibleName", label: "name", required: true },
      { key: "linkTarget", label: "target" },
      { key: "linkType", label: "link type" },
    ],
  },
  "form-element": {
    system: "a11y", color: "#9a6700", badge: "number", label: (a) => a.label || a.control || "Field",
    fields: [
      { key: "control", required: true, mono: true },
      { key: "accessibleName", label: "name" },
      { key: "controlLabel", label: "label" },
      { key: "required", bool: true },
      { key: "error" },
      { key: "describedBy", label: "describedby" },
    ],
  },
  image: {
    system: "a11y", color: "#8250df", badge: "number", label: (a) => a.label || "Image",
    fields: [
      { key: "decorative", bool: true },
      { key: "accessibleName", label: "alt" },
    ],
  },
  // Video — WCAG 1.2.x media requirements: captions (1.2.2), audio descriptions (1.2.5).
  // Separate from `image` because the required-alternative fields differ fundamentally.
  video: {
    system: "a11y", color: "#6639ba", badge: "number", label: (a) => a.label || "Video",
    fields: [
      { key: "accessibleName", label: "title / label" },
      { key: "captions", label: "captions (WCAG 1.2.2)", bool: true, required: true },
      { key: "audioDescription", label: "audio description (WCAG 1.2.5)", bool: true },
      { key: "transcript", label: "transcript", bool: true },
    ],
  },
  // Audio — WCAG 1.2.1: pre-recorded audio-only requires a transcript alternative.
  audio: {
    system: "a11y", color: "#4e2788", badge: "number", label: (a) => a.label || "Audio",
    fields: [
      { key: "accessibleName", label: "title / label" },
      { key: "transcript", label: "transcript (WCAG 1.2.1)", bool: true, required: true },
    ],
  },
  // List (ol / ul / li) — a real GitHub/CVS toolkit type. The CONTAINER carries the list role
  // (list / menu / tablist); each ITEM is bracketed with the item type below. Use `list` on the
  // container and `listitem` on each child (menuitem / tab / option, surfaced via `role`).
  list: {
    system: "a11y", color: "#1f883d", badge: "number", label: (a) => a.label || a.role || "List",
    fields: [
      { key: "element", required: true, mono: true },
      { key: "role", required: true, mono: true },
      { key: "accessibleName", label: "name" },
      { key: "itemRole", label: "item role", mono: true },
      { key: "keyboard", format: fmtKeyboard },
      { key: "states", format: fmtStates },
    ],
  },
  listitem: {
    system: "a11y", color: "#1f883d", badge: "number", label: (a) => a.label || a.role || "Item",
    fields: [
      { key: "element", mono: true },
      { key: "role", required: true, mono: true },
      { key: "accessibleName", label: "name" },
      { key: "states", format: fmtStates },
    ],
  },
  // Live region — maps to the GitHub/CVS "System Feedback" (live region) type. Annotates dynamic
  // content that is announced to screen readers without a focus change. `role` drives the
  // announcement model: "status" and "alert" are the primary ARIA roles; "log", "progressbar",
  // and "timer" are more specific. `ariaLive` makes the polite/assertive contract explicit.
  // Valid feedbackType: "error" | "warning" | "success" | "info" | "status"
  // Valid role: "status" | "alert" | "log" | "progressbar" | "timer"
  // Valid ariaLive: "polite" | "assertive"
  "live-region": {
    system: "a11y", color: "#bc4c00", badge: "number", label: (a) => a.label || a.feedbackType || "Live region",
    fields: [
      { key: "feedbackType", label: "feedback type" },
      { key: "role", required: true, mono: true },
      { key: "ariaLive", label: "aria-live", required: true, mono: true },
      { key: "atomic", label: "aria-atomic", bool: true },
      { key: "template", label: "template" },
    ],
  },
  note: {
    system: "a11y", color: "#45691d", badge: "number", label: (a) => a.label || "Note",
    fields: [{ key: "text", required: true }],
  },
};
