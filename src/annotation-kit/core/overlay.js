import React from "react";
import { getType, validate, present, cap } from "../registry.js";

const { createElement: h, useRef, useState, useLayoutEffect } = React;

/*
 * withAnnotations — Composa's code-native annotation system (see specs/_annotation-system.md,
 * "Model v2"). Three systems sharing line markers (pin/bracket/lasso/caret):
 *   1. ACCESSIBILITY — a per-type registry codifying the GitHub/CVS toolkit. Each type
 *      (interactive/button, heading, landmark, link, form-element, image, note) has its own
 *      icon + colour + label; the Detail card is OPTIONAL (only when it carries fields/notes).
 *      Label pill = [badge][type-icon][text]; heading's badge is its level (h1..h6).
 *   2. VARIANT (additive) — its own Figma-aligned label (diamond glyph + variant name).
 *   3. REDLINE / measurement (additive) — a dimension line + value.
 * Data is stamped on the real element (`data-annotation*`) and lives in the story source.
 */

const text = "var(--composa-color-text)";
const dvd = "var(--composa-color-border-translucent)";

// rgb(a)(...) → "#rrggbb" (+ " NN%" when translucent). For deriving color-token values.
function rgbToHex(rgb) {
  const m = typeof rgb === "string" && rgb.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((s) => s.trim());
  const [r, g, b] = parts.map((p) => parseInt(p, 10));
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  const hex = "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
  const a = parts[3] != null ? parseFloat(parts[3]) : 1;
  return a < 1 ? `${hex} ${Math.round(a * 100)}%` : hex;
}

// Canonical "r,g,b,a" key for matching a colour against the token table (handles hex + rgb(a)).
function parseColor(str) {
  if (typeof str !== "string") return null;
  let r, g, b, a = 1;
  const hx = str.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (hx) {
    let h = hx[1];
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    r = parseInt(h.slice(0, 2), 16); g = parseInt(h.slice(2, 4), 16); b = parseInt(h.slice(4, 6), 16);
    if (h.length === 8) a = parseInt(h.slice(6, 8), 16) / 255;
  } else {
    const m = str.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(",").map((s) => s.trim());
    r = parseInt(p[0], 10); g = parseInt(p[1], 10); b = parseInt(p[2], 10);
    a = p[3] != null ? parseFloat(p[3]) : 1;
  }
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return `${r},${g},${b},${Math.round(a * 100) / 100}`;
}

// Reverse map { colour → token name } from the live `--composa-color-*` custom properties, so a
// token's NAME is DERIVED (not authored) from the computed value. Built per measure (theme-fresh).
function buildColorMap() {
  const map = {};
  try {
    const cs = getComputedStyle(document.documentElement);
    for (const prop of cs) {
      if (!prop.startsWith("--composa-color")) continue;
      const key = parseColor(cs.getPropertyValue(prop).trim());
      if (key && !map[key]) map[key] = prop.replace("--composa-", "").replace(/-/g, ".");
    }
  } catch (e) { /* stylesheet not enumerable */ }
  return map;
}

// The EXACT token name the component authored: walk the CSS rules the element matches and read
// the property's authored value, which retains `var(--composa-…)`. No ambiguity, no authoring —
// the component already declares its token; we just read it. (Falls back to the reverse-map.)
function authoredTokenName(el, cssProps) {
  let found = null;
  const walk = (rules) => {
    for (const rule of rules) {
      if (rule.cssRules) walk(rule.cssRules);
      if (!rule.selectorText) continue;
      let hit = false;
      try { hit = el.matches(rule.selectorText); } catch (e) { /* :has() etc. */ }
      if (!hit) continue;
      for (const prop of cssProps) {
        const m = (rule.style.getPropertyValue(prop) || "").match(/var\(\s*(--composa-[a-z0-9-]+)/i);
        if (m) found = m[1].replace("--composa-", "").replace(/-/g, ".");
      }
    }
  };
  for (const sheet of document.styleSheets) { try { walk(sheet.cssRules); } catch (e) { /* cross-origin */ } }
  return found;
}

// per-type icon (13px). `c` = colour (white on the coloured pill, type-colour in the card).
function typeIcon(type, c = "#fff") {
  // Real toolkit icon (SVG string with currentColor) from the type config, when present.
  const tc = getType(type);
  if (tc && tc.icon) return h("span", { style: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 13, height: 13, color: c, flexShrink: 0 }, dangerouslySetInnerHTML: { __html: tc.icon } });
  const svg = (...kids) => h("svg", { width: 13, height: 13, viewBox: "0 0 12 12", style: { flexShrink: 0, display: "block" } }, ...kids);
  switch (type) {
    case "heading": return svg(h("text", { x: 6, y: 9.3, fill: c, fontSize: 9, fontWeight: 800, textAnchor: "middle", fontFamily: "sans-serif" }, "H"));
    case "landmark": return svg(h("rect", { x: 1, y: 1.5, width: 10, height: 9, rx: 1.5, stroke: c, strokeWidth: 1.2, fill: "none" }), h("rect", { x: 1, y: 1.5, width: 10, height: 3, rx: 1.5, fill: c }));
    case "link": return svg(h("path", { d: "M3.5 8.5 L8.5 3.5 M5.6 3.5 H8.5 V6.4", stroke: c, strokeWidth: 1.3, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }));
    case "form-element": return svg(h("rect", { x: 1, y: 3.5, width: 10, height: 5, rx: 1, stroke: c, strokeWidth: 1.2, fill: "none" }), h("line", { x1: 3, y1: 5.1, x2: 3, y2: 6.9, stroke: c, strokeWidth: 1.2, strokeLinecap: "round" }));
    case "image": return svg(h("rect", { x: 1, y: 2, width: 10, height: 8, rx: 1.2, stroke: c, strokeWidth: 1.2, fill: "none" }), h("circle", { cx: 4, cy: 5, r: 1, fill: c }), h("path", { d: "M2 9.5 L4.8 6.8 L8 10", stroke: c, strokeWidth: 1.2, fill: "none", strokeLinejoin: "round" }));
    case "variant": return svg(h("path", { d: "M6 1 L11 6 L6 11 L1 6 Z", stroke: c, strokeWidth: 1.2, fill: "none" }));
    default: // interactive / button / note — stacked layers
      return svg(h("rect", { x: 1, y: 2.2, width: 10, height: 1.9, rx: 0.9, fill: c }), h("rect", { x: 1, y: 5, width: 10, height: 1.9, rx: 0.9, fill: c, opacity: 0.75 }), h("rect", { x: 1, y: 7.8, width: 10, height: 1.9, rx: 0.9, fill: c, opacity: 0.5 }));
  }
}

// Type registry (data) + validator live in the annotation-kit package (imported above).
// These derived helpers read it; the renderer below stays generic and iterates the config.
const def = (a) => getType(a);
const cfg = (a) => { const t = def(a); return { system: t.system, color: t.color, t }; };
const a11yLabel = (a) => def(a).label(a);
const cardTitle = (a) => (a.type === "note" ? a.label || "Note" : (a.title || cap(a.type)) + " Details");
const hasDetail = (a) => { const t = def(a); return t.system === "a11y" && (t.fields || []).some((f) => present(a[f.key])); };

const monoPill = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 11, background: "var(--composa-color-bg-secondary)",
  border: "1px solid var(--composa-color-border-translucent)", borderRadius: 4, padding: "1px 6px", color: text, whiteSpace: "nowrap",
};

function rowEl(label, value, { mono, first } = {}) {
  return h("div", { key: label, style: { display: "flex", gap: 12, padding: "7px 12px", borderTop: first ? "none" : `1px solid ${dvd}` } },
    h("span", { style: { fontWeight: 600, fontSize: 12, minWidth: 92, flexShrink: 0, color: text } }, label),
    h("span", { style: { fontSize: 12, color: text, flex: 1, minWidth: 0 } }, mono ? h("span", { style: monoPill }, value) : value));
}

// generic Detail card body — iterates the type's `fields` config
function cardBody(a) {
  const t = def(a);
  if (a.type === "note") return h("div", { style: { padding: "8px 12px 10px", fontSize: 12, color: text, borderTop: `1px solid ${dvd}`, lineHeight: 1.45 } }, a.text || "");
  const rows = [];
  let first = true;
  for (const f of t.fields || []) {
    let v = a[f.key];
    if (!present(v)) continue;
    if (f.format) v = f.format(v);
    else if (f.bool) v = String(v);
    rows.push(rowEl(f.label || f.key, v, { mono: f.mono, first }));
    first = false;
  }
  return rows;
}

// ---- label renderers ----
const numBadge = { display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 16, height: 16, padding: "0 3px", borderRadius: 4, background: "rgba(255,255,255,0.22)", fontSize: 11, fontWeight: 700 };
function a11yPill(badge, type, txt, color, base) {
  return h("span", { key: "lbl", style: { ...base, display: "inline-flex", alignItems: "center", gap: 6, background: color, color: "#fff", borderRadius: 999, padding: "3px 12px", fontFamily: "var(--composa-font-family)", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" } },
    h("span", { style: { fontWeight: 700 } }, badge), typeIcon(type), txt ? h("span", null, txt) : null);
}
// Label chrome by what the label REPRESENTS: property (stroke, primary text) | component (solid
// fill) | instance (tinted fill + coloured text). Same color, three meanings.
function labelChrome(rep, color) {
  if (rep === "component") return { background: color, color: "#fff", border: "1.5px solid " + color };
  if (rep === "instance") return { background: `color-mix(in srgb, ${color} 14%, transparent)`, color, border: `1.5px solid color-mix(in srgb, ${color} 45%, transparent)` };
  return { background: "var(--composa-color-bg)", color: "var(--composa-color-text)", border: "1.5px solid " + color }; // property
}
// SVG chrome (fill / stroke / text) for the single-path bubble, by what the label represents.
function chromeSvg(rep, color) {
  if (rep === "component") return { fill: color, stroke: "none", text: "#fff" };
  if (rep === "instance") return { fill: `color-mix(in srgb, ${color} 14%, transparent)`, stroke: `color-mix(in srgb, ${color} 45%, transparent)`, text: color };
  return { fill: "var(--composa-color-bg)", stroke: color, text: "var(--composa-color-text)" }; // property
}
// One SVG path: rounded rect + caret notch on the element-facing edge (true union, clean stroke).
// `lx,ly` is the caret-base centre (from the caret geometry); the box extends away from the element.
function bubblePath(side, lx, ly, w, h) {
  const r = 6, LEN = 8, HW = 5, n = (v) => Math.round(v * 10) / 10;
  let x0, y0, x1, y1;
  if (side === "top") { x0 = lx - w / 2; x1 = lx + w / 2; y0 = ly - h; y1 = ly; }
  else if (side === "bottom") { x0 = lx - w / 2; x1 = lx + w / 2; y0 = ly; y1 = ly + h; }
  else if (side === "left") { x0 = lx - w; x1 = lx; y0 = ly - h / 2; y1 = ly + h / 2; }
  else { x0 = lx; x1 = lx + w; y0 = ly - h / 2; y1 = ly + h / 2; }
  let d;
  if (side === "top") // caret on bottom edge, tip down
    d = `M${n(x0 + r)},${n(y0)} L${n(x1 - r)},${n(y0)} Q${n(x1)},${n(y0)} ${n(x1)},${n(y0 + r)} L${n(x1)},${n(y1 - r)} Q${n(x1)},${n(y1)} ${n(x1 - r)},${n(y1)} L${n(lx + HW)},${n(y1)} L${n(lx)},${n(y1 + LEN)} L${n(lx - HW)},${n(y1)} L${n(x0 + r)},${n(y1)} Q${n(x0)},${n(y1)} ${n(x0)},${n(y1 - r)} L${n(x0)},${n(y0 + r)} Q${n(x0)},${n(y0)} ${n(x0 + r)},${n(y0)} Z`;
  else if (side === "bottom") // caret on top edge, tip up
    d = `M${n(x0 + r)},${n(y0)} L${n(lx - HW)},${n(y0)} L${n(lx)},${n(y0 - LEN)} L${n(lx + HW)},${n(y0)} L${n(x1 - r)},${n(y0)} Q${n(x1)},${n(y0)} ${n(x1)},${n(y0 + r)} L${n(x1)},${n(y1 - r)} Q${n(x1)},${n(y1)} ${n(x1 - r)},${n(y1)} L${n(x0 + r)},${n(y1)} Q${n(x0)},${n(y1)} ${n(x0)},${n(y1 - r)} L${n(x0)},${n(y0 + r)} Q${n(x0)},${n(y0)} ${n(x0 + r)},${n(y0)} Z`;
  else if (side === "left") // caret on right edge, tip right
    d = `M${n(x0 + r)},${n(y0)} L${n(x1 - r)},${n(y0)} Q${n(x1)},${n(y0)} ${n(x1)},${n(y0 + r)} L${n(x1)},${n(ly - HW)} L${n(x1 + LEN)},${n(ly)} L${n(x1)},${n(ly + HW)} L${n(x1)},${n(y1 - r)} Q${n(x1)},${n(y1)} ${n(x1 - r)},${n(y1)} L${n(x0 + r)},${n(y1)} Q${n(x0)},${n(y1)} ${n(x0)},${n(y1 - r)} L${n(x0)},${n(y0 + r)} Q${n(x0)},${n(y0)} ${n(x0 + r)},${n(y0)} Z`;
  else // right: caret on left edge, tip left
    d = `M${n(x0 + r)},${n(y0)} L${n(x1 - r)},${n(y0)} Q${n(x1)},${n(y0)} ${n(x1)},${n(y0 + r)} L${n(x1)},${n(y1 - r)} Q${n(x1)},${n(y1)} ${n(x1 - r)},${n(y1)} L${n(x0 + r)},${n(y1)} Q${n(x0)},${n(y1)} ${n(x0)},${n(y1 - r)} L${n(x0)},${n(ly + HW)} L${n(x0 - LEN)},${n(ly)} L${n(x0)},${n(ly - HW)} L${n(x0)},${n(y0 + r)} Q${n(x0)},${n(y0)} ${n(x0 + r)},${n(y0)} Z`;
  return { d, tx: (x0 + x1) / 2, ty: (y0 + y1) / 2 };
}
// anatomy (parts): rounded-rect (not capsule), no icon, capitalized label — consistent with
// the variant/measurement labels.
function anatomyPill(badge, txt, color, base) {
  return h("span", { key: "lbl", style: { ...base, display: "inline-flex", alignItems: "center", gap: 6, background: color, color: "#fff", borderRadius: 5, padding: "4px 10px", fontFamily: "var(--composa-font-family)", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" } },
    h("span", { style: { fontWeight: 700 } }, badge), cap(txt));
}
// token: white bg / text colour / subtle stroke (Composa tokens) — semantic name on top,
// derived value beneath. Leading glyph is a swatch (colour) or an "Ag" specimen (typography).
function tokenLabel(name, value, kind, swatch, fontFam, side, base) {
  let glyph = null;
  if (kind === "color" && swatch)
    glyph = h("span", { key: "sw", style: { width: 14, height: 14, borderRadius: 3, background: swatch, border: "1px solid var(--composa-color-border)", flexShrink: 0 } });
  else if (kind === "typography")
    glyph = h("span", { key: "ag", style: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, fontFamily: fontFam || "var(--composa-font-family)", fontSize: 13, fontWeight: 600, flexShrink: 0 } }, "Ag");
  return h("span", { key: "lbl", style: { ...base, display: "inline-flex", alignItems: "center", gap: 7, background: "var(--composa-color-bg)", color: "var(--composa-color-text)", border: "1px solid var(--composa-color-border)", borderRadius: 5, padding: "4px 9px", fontFamily: "var(--composa-font-family)", whiteSpace: "nowrap" } },
    glyph,
    h("span", { style: { display: "inline-flex", flexDirection: "column", lineHeight: 1.2 } },
      h("span", { style: { fontSize: 12, fontWeight: 500 } }, name),
      value ? h("span", { style: { fontSize: 10.5, opacity: 0.7, fontFamily: "ui-monospace, Menlo, monospace" } }, value) : null));
}
const valueTag = (color) => ({ background: color, color: "#fff", fontSize: 11, fontWeight: 600, fontFamily: "var(--composa-font-family)", padding: "2px 7px", borderRadius: 4, whiteSpace: "nowrap" });

// ---- geometry: marker shape (solid lines, dashedRect for lasso, caret poly) + connector + label pos ----
function markerGeometry(marker, side, r, sb, overlap) {
  const cx = r.left + r.width / 2 - sb.left, cy = r.top + r.height / 2 - sb.top;
  const top = r.top - sb.top, bottom = r.bottom - sb.top, left = r.left - sb.left, right = r.right - sb.left;
  const CONN = 24, base = { lines: [], dashedRect: null, polys: [] };

  if (marker === "caret") {
    const G = 10, LEN = 8, HW = 4; // gap from element, caret length, half-width (narrow)
    switch (side) {
      case "bottom": { const t = bottom + G, b = t + LEN; return { ...base, polys: [`${cx},${t} ${cx - HW},${b} ${cx + HW},${b}`], lx: cx, ly: b, lt: "translate(-50%, 0)" }; }
      case "left": { const t = left - G, b = t - LEN; return { ...base, polys: [`${t},${cy} ${b},${cy - HW} ${b},${cy + HW}`], lx: b, ly: cy, lt: "translate(-100%, -50%)" }; }
      case "right": { const t = right + G, b = t + LEN; return { ...base, polys: [`${t},${cy} ${b},${cy - HW} ${b},${cy + HW}`], lx: b, ly: cy, lt: "translate(0, -50%)" }; }
      default: { const t = top - G, b = t - LEN; return { ...base, polys: [`${cx},${t} ${cx - HW},${b} ${cx + HW},${b}`], lx: cx, ly: b, lt: "translate(-50%, -100%)" }; }
    }
  }

  if (marker === "lasso") {
    const P = 8;
    const rx0 = left - P, ry0 = top - P, rw = right - left + 2 * P, rh = bottom - top + 2 * P;
    const dashedRect = { x: rx0, y: ry0, w: rw, h: rh, rx: 6 };
    switch (side) {
      case "bottom": { const e = ry0 + rh; return { ...base, lines: [{ x1: cx, y1: e, x2: cx, y2: e + CONN, dash: true }], dashedRect, lx: cx, ly: e + CONN, lt: "translate(-50%, 0)" }; }
      case "left": { const e = rx0; return { ...base, lines: [{ x1: e, y1: cy, x2: e - CONN, y2: cy, dash: true }], dashedRect, lx: e - CONN, ly: cy, lt: "translate(-100%, -50%)" }; }
      case "right": { const e = rx0 + rw; return { ...base, lines: [{ x1: e, y1: cy, x2: e + CONN, y2: cy, dash: true }], dashedRect, lx: e + CONN, ly: cy, lt: "translate(0, -50%)" }; }
      default: { const e = ry0; return { ...base, lines: [{ x1: cx, y1: e, x2: cx, y2: e - CONN, dash: true }], dashedRect, lx: cx, ly: e - CONN, lt: "translate(-50%, -100%)" }; }
    }
  }

  if (marker === "bracket") {
    const O = 12, C = 6;
    switch (side) {
      case "left": { const x = left - O; return { ...base, lines: [{ x1: x, y1: top, x2: x, y2: bottom }, { x1: x, y1: top, x2: x + C, y2: top }, { x1: x, y1: bottom, x2: x + C, y2: bottom }, { x1: x, y1: cy, x2: x - CONN, y2: cy }], lx: x - CONN, ly: cy, lt: "translate(-100%, -50%)" }; }
      case "right": { const x = right + O; return { ...base, lines: [{ x1: x, y1: top, x2: x, y2: bottom }, { x1: x, y1: top, x2: x - C, y2: top }, { x1: x, y1: bottom, x2: x - C, y2: bottom }, { x1: x, y1: cy, x2: x + CONN, y2: cy }], lx: x + CONN, ly: cy, lt: "translate(0, -50%)" }; }
      case "top": { const y = top - O; return { ...base, lines: [{ x1: left, y1: y, x2: right, y2: y }, { x1: left, y1: y, x2: left, y2: y + C }, { x1: right, y1: y, x2: right, y2: y + C }, { x1: cx, y1: y, x2: cx, y2: y - CONN }], lx: cx, ly: y - CONN, lt: "translate(-50%, -100%)" }; }
      default: { const y = bottom + O; return { ...base, lines: [{ x1: left, y1: y, x2: right, y2: y }, { x1: left, y1: y, x2: left, y2: y - C }, { x1: right, y1: y, x2: right, y2: y - C }, { x1: cx, y1: y, x2: cx, y2: y + CONN }], lx: cx, ly: y + CONN, lt: "translate(-50%, 0)" }; }
    }
  }

  const L = 22; // pin. `overlap` anchors the inner end at the element CENTRE (for NESTED targets —
  // e.g. text in an input) so the line targets the content; otherwise it sits at the edge. `dot`
  // is the small terminus circle where the connector touches the component.
  switch (side) {
    case "bottom": { const iy = overlap ? cy : bottom; return { ...base, lines: [{ x1: cx, y1: iy, x2: cx, y2: bottom + L }], dot: { x: cx, y: iy }, lx: cx, ly: bottom + L, lt: "translate(-50%, 0)" }; }
    case "left": { const ix = overlap ? cx : left; return { ...base, lines: [{ x1: ix, y1: cy, x2: left - L, y2: cy }], dot: { x: ix, y: cy }, lx: left - L, ly: cy, lt: "translate(-100%, -50%)" }; }
    case "right": { const ix = overlap ? cx : right; return { ...base, lines: [{ x1: ix, y1: cy, x2: right + L, y2: cy }], dot: { x: ix, y: cy }, lx: right + L, ly: cy, lt: "translate(0, -50%)" }; }
    default: { const iy = overlap ? cy : top; return { ...base, lines: [{ x1: cx, y1: iy, x2: cx, y2: top - L }], dot: { x: cx, y: iy }, lx: cx, ly: top - L, lt: "translate(-50%, -100%)" }; }
  }
}

function redlineGeometry(a, r, sb) {
  const dim = a.dimension || "width", OFF = 14, T = 4, base = { dashedRect: null, polys: [] };
  const top = r.top - sb.top, bottom = r.bottom - sb.top, left = r.left - sb.left, right = r.right - sb.left;
  if (dim === "height") {
    const x = right + OFF, midY = (top + bottom) / 2;
    return { ...base, lines: [{ x1: x, y1: top, x2: x, y2: bottom }, { x1: x - T, y1: top, x2: x + T, y2: top }, { x1: x - T, y1: bottom, x2: x + T, y2: bottom }], lx: x + 11, ly: midY, lt: "translate(0, -50%)" };
  }
  const y = bottom + OFF, midX = (left + right) / 2;
  return { ...base, lines: [{ x1: left, y1: y, x2: right, y2: y }, { x1: left, y1: y - T, x2: left, y2: y + T }, { x1: right, y1: y - T, x2: right, y2: y + T }], lx: midX, ly: y + 12, lt: "translate(-50%, 0)" };
}

// NEW VISUAL (v2) — corner-radius: trace the rounded corner as an SVG arc, with an ORTHOGONAL
// (bracket-style) leader straight out from the corner to the value tag — no diagonal. `radius` is
// the live border-radius (px). `corner` picks which corner (default top-left).
function radiusGeometry(a, rect, sb, radius) {
  const corner = a.corner || "top-left", L = 24;
  const top = rect.top - sb.top, bottom = rect.bottom - sb.top, left = rect.left - sb.left, right = rect.right - sb.left;
  const rad = Math.max(radius, 0.01);
  const isTop = corner.startsWith("top");
  const x = corner.endsWith("left") ? left : right; // leader rides the vertical edge at the corner
  const ly = isTop ? top - L : bottom + L;
  let arc;
  if (corner === "top-left") arc = `M${left},${top + rad} A${rad},${rad} 0 0 1 ${left + rad},${top}`;
  else if (corner === "top-right") arc = `M${right - rad},${top} A${rad},${rad} 0 0 1 ${right},${top + rad}`;
  else if (corner === "bottom-left") arc = `M${left},${bottom - rad} A${rad},${rad} 0 0 0 ${left + rad},${bottom}`;
  else arc = `M${right - rad},${bottom} A${rad},${rad} 0 0 0 ${right},${bottom - rad}`;
  // vertical (orthogonal) leader from the corner out to the tag; small dot at the corner touchpoint.
  return {
    lines: [{ x1: x, y1: isTop ? top : bottom, x2: x, y2: ly }],
    polys: [], dashedRect: null, radiusArc: arc,
    dot: { x, y: isTop ? top : bottom },
    lx: x, ly, lt: isTop ? "translate(-50%, -100%)" : "translate(-50%, 0)",
  };
}

// NEW VISUAL (v2) — gap: dimension line across the void between two elements' facing edges. Picks
// the axis from their relative position (horizontal if side by side, else vertical). Minimal first
// pass — flagged for owner review.
function gapGeometry(rA, rB, sb) {
  const T = 4;
  const aL = rA.left - sb.left, aR = rA.right - sb.left, aT = rA.top - sb.top, aB = rA.bottom - sb.top;
  const bL = rB.left - sb.left, bR = rB.right - sb.left, bT = rB.top - sb.top, bB = rB.bottom - sb.top;
  const horizGap = Math.max(bL - aR, aL - bR);
  const vertGap = Math.max(bT - aB, aT - bB);
  if (horizGap >= vertGap) {
    // side by side: line spans the horizontal void at the shared vertical centre
    const x1 = aR <= bL ? aR : bR, x2 = aR <= bL ? bL : aL;
    const y = (Math.max(aT, bT) + Math.min(aB, bB)) / 2;
    const value = Math.round(Math.abs(x2 - x1));
    return { lines: [{ x1, y1: y, x2, y2: y }, { x1, y1: y - T, x2: x1, y2: y + T }, { x1: x2, y1: y - T, x2, y2: y + T }], polys: [], dashedRect: null, lx: (x1 + x2) / 2, ly: y - 12, lt: "translate(-50%, -100%)", measured: value };
  }
  const y1 = aB <= bT ? aB : bB, y2 = aB <= bT ? bT : aT;
  const x = (Math.max(aL, bL) + Math.min(aR, bR)) / 2;
  const value = Math.round(Math.abs(y2 - y1));
  return { lines: [{ x1: x, y1, x2: x, y2 }, { x1: x - T, y1, x2: x + T, y2: y1 }, { x1: x - T, y1: y2, x2: x + T, y2 }], polys: [], dashedRect: null, lx: x + 12, ly: (y1 + y2) / 2, lt: "translate(0, -50%)", measured: value };
}

// Rough label footprint (no DOM measure needed) for collision math.
function estimateBox(s) {
  const a = s.a, sys = s.c.system;
  if (sys === "token") {
    const name = String(s.tokenName || a.name || "token");
    const val = s.tokenValue ? String(s.tokenValue) : "";
    return { w: Math.max(name.length, val.length) * 7 + 36, h: 40 };
  }
  if (sys === "variant") return { w: String(a.value || a.name || "").length * 7.5 + 24, h: 26 };
  if (sys === "redline" || sys === "radius" || sys === "gap") return { w: 40, h: 22 };
  if (sys === "anatomy") return { w: String(a.label || "part").length * 7.5 + 32, h: 26 };
  return { w: String(a11yLabel(a) || "").length * 7 + 54, h: 26 }; // a11y pill
}

// Smart layout: stagger labels that would overlap on the same side to deeper tiers, lengthening
// their connectors. Greedy (not a full solver) — handles the common dense/row cases. Mutates stamps.
function resolveCollisions(stamps) {
  const AXIS = { top: "x", bottom: "x", left: "y", right: "y" };
  const DIR = { top: -1, bottom: 1, left: -1, right: 1 };
  const groups = {};
  for (const s of stamps) {
    if (!s.lines || !s.lines.length) continue; // need a line connector to lengthen
    // Measurement geometry (redline/radius/gap) marks a SPECIFIC dimension/edge — its position is
    // meaningful, not a staggerable label. Skip it (it also carries no explicit `side`).
    if (s.c && (s.c.system === "redline" || s.c.system === "radius" || s.c.system === "gap")) continue;
    const side = s.a.side || "top";
    if (!AXIS[side]) continue;
    (groups[side] = groups[side] || []).push(s);
  }
  for (const side of Object.keys(groups)) {
    const axis = AXIS[side], dir = DIR[side];
    const list = groups[side].map((s) => ({ s, box: estimateBox(s) }));
    list.sort((p, q) => (axis === "x" ? p.s.lx - q.s.lx : p.s.ly - q.s.ly));
    const tiers = [];
    for (const it of list) {
      const center = axis === "x" ? it.s.lx : it.s.ly;
      const ext = axis === "x" ? it.box.w : it.box.h;
      const iv = [center - ext / 2 - 8, center + ext / 2 + 8];
      let tier = 0;
      while (tiers[tier] && tiers[tier].some((r) => iv[0] < r[1] && iv[1] > r[0])) tier++;
      (tiers[tier] = tiers[tier] || []).push(iv);
      if (tier > 0) {
        const depthSize = axis === "x" ? it.box.h : it.box.w;
        const offset = tier * (depthSize + 14) * dir;
        const oldLx = it.s.lx, oldLy = it.s.ly;
        if (axis === "x") it.s.ly += offset; else it.s.lx += offset;
        for (const l of it.s.lines) {
          if (Math.abs(l.x2 - oldLx) < 0.5 && Math.abs(l.y2 - oldLy) < 0.5) { l.x2 = it.s.lx; l.y2 = it.s.ly; }
        }
      }
    }
  }
}

function AnnotationsOverlay({ Story, annotations }) {
  const stageRef = useRef(null);
  const [stamps, setStamps] = useState([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const sb = stage.getBoundingClientRect();
      const cmap = buildColorMap();
      const next = [];
      for (const a of annotations) {
        // Anatomy: auto-derive one bracket per DECLARED part (`data-part`, Zag/Ark convention).
        // The label is the part name — derived from the component, never authored.
        if (a.type === "anatomy") {
          const root = a.target ? stage.querySelector(a.target) : stage;
          if (!root) continue;
          const partEls = [];
          if (root.getAttribute && root.getAttribute("data-part")) partEls.push(root);
          root.querySelectorAll("[data-part]").forEach((p) => partEls.push(p));
          const SIDES = ["top", "bottom", "left", "right"];
          partEls.forEach((pel, i) => {
            const part = pel.getAttribute("data-part");
            const side = a.side || SIDES[i % SIDES.length];
            const synth = { n: i + 1, type: "anatomy", label: part, marker: "bracket", side };
            pel.setAttribute("data-annotation", part);
            pel.setAttribute("data-annotation-type", "anatomy");
            pel.setAttribute("data-annotation-index", String(i + 1));
            next.push({ a: synth, c: cfg(synth), ...markerGeometry("bracket", side, pel.getBoundingClientRect(), sb) });
          });
          continue;
        }
        // `each: true` — repeat ONE annotation across every element matching `target` (composite
        // items: each menuitem / tab / segment). One stamp per match, numbered from `a.n` (or 1).
        // Default marker is a bracket (items get brackets; single points get pins). Used to give a
        // composite list-semantics — container role + each item bracketed — instead of one pin.
        if (a.each) {
          const els = a.target ? Array.from(stage.querySelectorAll(a.target)) : [];
          const marker = a.marker || "bracket";
          const start = a.n != null ? a.n : 1;
          els.forEach((iel, i) => {
            const synth = { ...a, n: start + i, each: false };
            const ic = cfg(synth);
            const ir = iel.getBoundingClientRect();
            const stamp = ic.system === "redline"
              ? { a: synth, c: ic, ...redlineGeometry(synth, ir, sb) }
              : { a: synth, c: ic, ...markerGeometry(marker, synth.side || "left", ir, sb, synth.anchor === "center") };
            iel.setAttribute("data-annotation", ic.system === "a11y" ? (synth.role || synth.element || synth.type) : String(synth.value || synth.label || ""));
            iel.setAttribute("data-annotation-type", synth.type || "note");
            iel.setAttribute("data-annotation-index", String(start + i));
            next.push(stamp);
          });
          continue;
        }
        // NEW VISUAL (v2) — gap: measures the void between TWO elements (target + targetB).
        if (a.type === "gap") {
          const elA = a.target ? stage.querySelector(a.target) : null;
          const elB = a.targetB ? stage.querySelector(a.targetB) : null;
          if (!elA || !elB) continue;
          const g = gapGeometry(elA.getBoundingClientRect(), elB.getBoundingClientRect(), sb);
          g.lineColor = cfg(a).color;
          next.push({ a, c: cfg(a), ...g });
          continue;
        }
        const el = a.target ? stage.querySelector(a.target) : null;
        if (!el) continue;
        const c = cfg(a);
        const r = el.getBoundingClientRect();
        // NEW VISUAL (v2) — corner-radius: arc on one corner + the live border-radius value.
        if (c.system === "radius") {
          const radius = Math.round(parseFloat(getComputedStyle(el)[`border${(a.corner || "top-left").split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join("")}Radius`]) || parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0);
          const g = radiusGeometry(a, r, sb, radius);
          g.measured = radius;
          g.lineColor = c.color;
          next.push({ a, c, ...g });
          continue;
        }
        // Measurement is DERIVED from the live element — never hardcoded — so it can't drift.
        // `value` is an optional override (e.g. to show a token name like "radius-full").
        let measured;
        if (c.system === "redline") {
          const dim = a.dimension || "width";
          measured = dim === "height" ? Math.round(r.height) : dim === "radius" ? Math.round(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0) : Math.round(r.width);
        }
        // Token: the actual VALUE is derived from computed style (self-correcting); the
        // semantic name is authored. color → hex + swatch, typography → size/line-height.
        let tokenValue, swatch, fontFamily, tokenName = a.name;
        if (c.system === "token") {
          const cs = getComputedStyle(el);
          const kind = a.kind || "color";
          if (kind === "typography") {
            const fs = Math.round(parseFloat(cs.fontSize));
            const lh = parseFloat(cs.lineHeight);
            tokenValue = `${fs}/${Number.isFinite(lh) ? Math.round(lh) : "auto"}`;
            fontFamily = cs.fontFamily;
          } else if (kind === "effect") {
            tokenValue = cs.boxShadow && cs.boxShadow !== "none" ? cs.boxShadow : "(none)";
          } else {
            const raw = a.prop === "text" ? cs.color : a.prop === "border" ? cs.borderTopColor : cs.backgroundColor;
            swatch = raw;
            tokenValue = rgbToHex(raw) || raw;
            // Name, in order of truth: the component's authored CSS var (exact) → authored prop →
            // reverse-map (ambiguous, last resort). The component is tokenized, so the var wins.
            const cssProps = a.prop === "text" ? ["color"] : a.prop === "border" ? ["border-color", "border-top-color", "border"] : ["background", "background-color"];
            tokenName = authoredTokenName(el, cssProps) || a.name || cmap[parseColor(raw)];
          }
        }
        const stampText = c.system === "redline" ? (a.value != null ? a.value : measured) : c.system === "variant" ? (a.value || a.name) : c.system === "token" ? `${tokenName || ""} ${tokenValue}`.trim() : a11yLabel(a);
        el.setAttribute("data-annotation", c.system === "a11y" ? (a.role || a.element || a.type) : String(stampText));
        el.setAttribute("data-annotation-index", String(a.n));
        el.setAttribute("data-annotation-type", a.type || "note");
        // Edge by default. Anchor at the centre (overlap into the component) ONLY for NESTED
        // targets — opt in with `anchor: "center"` (e.g. text inside an input).
        const g = c.system === "redline" ? redlineGeometry(a, r, sb) : markerGeometry(a.marker || "pin", a.side || "top", r, sb, a.anchor === "center");
        if (c.system === "redline") g.measured = measured;
        if (c.system === "token") { g.tokenValue = tokenValue; g.swatch = swatch; g.fontFamily = fontFamily; g.tokenName = tokenName; g.lineColor = "var(--composa-color-border)"; }
        next.push({ a, c, ...g });
      }
      resolveCollisions(next);
      setStamps(next);
      setDims({ w: stage.scrollWidth, h: stage.scrollHeight });
    };
    measure();
    const raf = requestAnimationFrame(measure);
    // Re-measure on theme switch so derived colours/values aren't stale. `data-composa-mode` may
    // sit on any wrapping element (e.g. Storybook's shell div), so observe the subtree for it.
    const mo = new MutationObserver(() => measure());
    mo.observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ["data-composa-mode", "class"] });
    return () => { cancelAnimationFrame(raf); mo.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardAnns = annotations.filter((a) => cfg(a).system === "a11y" && hasDetail(a));
  const errs = validate(annotations);

  return h(
    "div",
    { style: { margin: "16px 0 28px" } },
    errs.length
      ? h("div", { style: { marginBottom: 16, padding: "10px 14px", borderRadius: 8, background: "rgba(207,34,46,0.08)", border: "1px solid #cf222e", color: "#cf222e", fontFamily: "var(--composa-font-family)", fontSize: 12.5, lineHeight: 1.6 } },
          h("strong", null, "Annotation validation:"), ...errs.map((e, i) => h("div", { key: i }, "• " + e)))
      : null,
    h(
      "div",
      { style: { display: "inline-flex", alignItems: "flex-start", gap: 56 } },
      h(
        "div",
        { ref: stageRef, style: { position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "64px 80px", background: "transparent" } },
        h("div", { style: { position: "relative", zIndex: 1 } }, h(Story)),
        h(
          "svg",
          { width: dims.w, height: dims.h, style: { position: "absolute", left: 0, top: 0, pointerEvents: "none", overflow: "visible", zIndex: 2 } },
          [
            ...stamps.filter((s) => s.dashedRect).map((s) => h("rect", { key: `${s.a.n}-rect`, x: s.dashedRect.x, y: s.dashedRect.y, width: s.dashedRect.w, height: s.dashedRect.h, rx: s.dashedRect.rx, fill: "none", stroke: s.c.color, strokeWidth: 2, strokeDasharray: "3 3" })),
            // NEW VISUAL (v2) — corner-radius arc tracing the rounded corner.
            ...stamps.filter((s) => s.radiusArc).map((s) => h("path", { key: `${s.a.n}-arc`, d: s.radiusArc, fill: "none", stroke: s.c.color, strokeWidth: 2.5 })),
            // caret markers for non-variant types (variant renders as a single bubble path below)
            ...stamps.filter((s) => s.c.system !== "variant").flatMap((s) => (s.polys || []).map((p, i) => h("polygon", { key: `${s.a.n}-p${i}`, points: p, fill: s.c.color }))),
            // variant labels = ONE SVG path (rounded rect + caret notch) + text — true union.
            ...stamps.filter((s) => s.c.system === "variant").flatMap((s) => {
              const bx = estimateBox(s), bp = bubblePath(s.a.side || "top", s.lx, s.ly, bx.w, bx.h), ch = chromeSvg(s.a.represents, s.c.color);
              return [
                h("path", { key: `${s.a.n}-bub`, d: bp.d, fill: ch.fill, stroke: ch.stroke, strokeWidth: ch.stroke === "none" ? 0 : 2 }),
                h("text", { key: `${s.a.n}-txt`, x: bp.tx, y: bp.ty, fill: ch.text, fontSize: 12, fontWeight: 600, textAnchor: "middle", dominantBaseline: "central", fontFamily: "var(--composa-font-family)" }, s.a.value || s.a.name),
              ];
            }),
            ...stamps.flatMap((s) => s.lines.map((l, i) => h("line", { key: `${s.a.n}-l${i}`, x1: l.x1, y1: l.y1, x2: l.x2, y2: l.y2, stroke: s.lineColor || s.c.color, strokeWidth: 2, strokeDasharray: l.dash ? "3 3" : undefined }))),
            ...stamps.filter((s) => s.dot).map((s) => h("circle", { key: `${s.a.n}-dot`, cx: s.dot.x, cy: s.dot.y, r: 3, fill: s.lineColor || s.c.color })),
          ]
        ),
        stamps.map((s) => {
          const base = { position: "absolute", left: s.lx, top: s.ly, transform: s.lt, zIndex: 2 };
          if (s.c.system === "variant") return null; // rendered as an SVG bubble path above
          if (s.c.system === "redline") return h("span", { key: s.a.n, style: { ...valueTag(s.c.color), ...base } }, s.a.value != null ? s.a.value : s.measured);
          // NEW VISUAL (v2) — radius value tag shows "Nr" (radius); gap shows the spacing px.
          if (s.c.system === "radius") return h("span", { key: s.a.n, style: { ...valueTag(s.c.color), ...base } }, s.a.value != null ? s.a.value : `${s.measured}r`);
          if (s.c.system === "gap") return h("span", { key: s.a.n, style: { ...valueTag(s.c.color), ...base } }, s.a.value != null ? s.a.value : s.measured);
          if (s.c.system === "anatomy") return h("span", { key: s.a.n }, anatomyPill(s.a.n, a11yLabel(s.a), s.c.color, base));
          if (s.c.system === "token") return h("span", { key: s.a.n }, tokenLabel(s.tokenName || s.a.name || a11yLabel(s.a), s.tokenValue, s.a.kind || "color", s.swatch, s.fontFamily, s.a.side || "top", base));
          const badge = s.a.type === "heading" ? (s.a.level || "h?") : s.a.n;
          return h("span", { key: s.a.n }, a11yPill(badge, s.a.type, a11yLabel(s.a), s.c.color, base));
        })
      ),
      cardAnns.length
        ? h(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 16, paddingTop: 8 } },
            cardAnns.map((a) => {
              const c = cfg(a);
              return h(
                "div",
                { key: a.n, style: { width: 280, background: "var(--composa-color-bg)", border: `1.5px solid ${c.color}`, borderRadius: 10, overflow: "hidden", fontFamily: "var(--composa-font-family)" } },
                // Header: the number+icon badge is a corner tab flush to the card's top-left. The
                // card's overflow:hidden + radius round its top-left, so it reads as ONE unified
                // shape with the top edge (per the GitHub toolkit reference). Title sits beside it.
                h("div", { style: { display: "flex", alignItems: "stretch" } },
                  h("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, background: c.color, color: "#fff", padding: "8px 11px", fontWeight: 700, fontSize: 13, lineHeight: 1 } },
                    a.type === "heading" ? (a.level || a.n) : a.n, typeIcon(a.type, "#fff")),
                  h("span", { style: { display: "flex", alignItems: "center", padding: "0 12px", fontWeight: 700, fontSize: 13, color: text } }, cardTitle(a))),
                cardBody(a)
              );
            })
          )
        : null
    )
  );
}

export function withAnnotations(Story, context) {
  const annotations = context && context.parameters && context.parameters.annotations;
  if (!annotations || !annotations.length) return h(Story);
  return h(AnnotationsOverlay, { Story, annotations });
}
