import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Button, Label, MenuRow, NumericInputMulti, Checkbox, Radio, Switch } from "../index.js";

const html = (el) => renderToStaticMarkup(el);

describe("Button", () => {
  it("normalizes any-case variant to the kebab CSS class", () => {
    expect(html(React.createElement(Button, { variant: "Primary", label: "Go" }))).toContain("composa-button-primary");
    expect(html(React.createElement(Button, { variant: "secondary", label: "Go" }))).toContain("composa-button-secondary");
  });

  it("renders its label text", () => {
    expect(html(React.createElement(Button, { label: "Save" }))).toContain("Save");
  });
});

describe("Label", () => {
  it("maps hierarchy 'Level 1' to level-1 and defaults weight to regular", () => {
    const out = html(React.createElement(Label, { hierarchy: "Level 1", label: "Layers" }));
    expect(out).toContain("composa-label-level-1");
    expect(out).toContain("composa-label-weight-regular");
  });

  it("accepts a numeric hierarchy too", () => {
    expect(html(React.createElement(Label, { hierarchy: 3, label: "x" }))).toContain("composa-label-level-3");
  });
});

describe("MenuRow checkmark — Figma places the indicator in the LEADING slot", () => {
  it("renders the check before the label (leading), with checkbox semantics", () => {
    const out = html(React.createElement(MenuRow, { type: "checkmark", label: "Snap", selected: true, checkVariant: "check" }));
    // The selection indicator must appear before the label in source order (leading).
    expect(out.indexOf("composa-menu-check")).toBeGreaterThanOrEqual(0);
    expect(out.indexOf("composa-menu-check")).toBeLessThan(out.indexOf("composa-menu-label"));
    expect(out).toContain('role="menuitemcheckbox"');
    expect(out).toContain('aria-checked="true"');
  });

  it("uses a dot + radio semantics for the single-select variant", () => {
    const out = html(React.createElement(MenuRow, { type: "checkmark", label: "Opt", selected: true, checkVariant: "dot" }));
    expect(out).toContain("composa-menu-check-dot");
    expect(out).toContain('role="menuitemradio"');
  });

  it("reserves the leading slot but hides the glyph when unselected", () => {
    const out = html(React.createElement(MenuRow, { type: "checkmark", label: "Opt", selected: false, checkVariant: "check" }));
    expect(out).toContain('aria-checked="false"');
    // No check glyph drawn when unselected.
    expect(out).not.toContain("✓");
  });
});

describe("NumericInputMulti is editable", () => {
  it("renders four chromeless input cells", () => {
    const out = html(React.createElement(NumericInputMulti, { values: ["1", "2", "3", "4"] }));
    const fields = out.match(/composa-numeric-multi-field/g) || [];
    expect(fields.length).toBe(4);
    expect(out).toContain('inputMode="decimal"');
  });
});

describe("Selection controls expose accessible state", () => {
  it("checkbox reflects checked state", () => {
    const out = html(React.createElement(Checkbox, { checked: true, label: "On" }));
    expect(out).toContain("is-checked");
  });

  it("radio reflects checked state", () => {
    const out = html(React.createElement(Radio, { checked: true, label: "A" }));
    expect(out).toContain("is-checked");
  });

  it("switch renders with a label", () => {
    expect(html(React.createElement(Switch, { checked: false, label: "Grid" }))).toContain("Grid");
  });
});
