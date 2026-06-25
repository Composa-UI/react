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
  note: {
    system: "a11y", color: "#45691d", badge: "number", label: (a) => a.label || "Note",
    fields: [{ key: "text", required: true }],
  },
};
