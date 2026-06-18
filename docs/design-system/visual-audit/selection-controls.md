# Visual / Layout Fidelity Audit — Selection Controls

Scope: Checkbox, Radio, Switch. READ-ONLY visual audit focused on what a value-diff (hex/px token) audit cannot catch: centering, alignment, padding geometry, missing elements, and perceptual color. Storybook `http://127.0.0.1:6011`, playground stories. Light mode.

Method: screenshot to locate, tight `zoom` to inspect, plus in-page DOM measurement (`getBoundingClientRect`, computed styles, supersampled canvas ink-centroid analysis for the checkmark glyph).

## Headline result

**No real visual centering/alignment/geometry defects were found in the three rendered components.** The specific flagged concern (checkmark off-center after a Material Symbols swap) does **not reproduce** — see the build-mismatch note below. One genuine cross-finding: the running build does **not** use the Material Symbols SVG check glyph at all; it renders a Unicode text `✓`. That is a behavioral/source observation, not a visible defect, and it means the audit premise is stale against the running code.

---

## Build-vs-premise mismatch (READ THIS FIRST — explains why the flagged issue did not reproduce)

The task states the check glyph "was just swapped to Material Symbols rounded weight 300 (viewBox `0 -960 960 960`, filled path)." The **running build does not render that SVG**. The checkbox mark is the Unicode character `✓` (U+2713), and the mixed mark is `–`, both emitted as plain text by `src/react/factory.js:566`:

```
h("span", { key: "mark", className: "composa-checkbox-mark" }, mixed ? "–" : isChecked ? "✓" : "")
```

A Material-Symbols `Glyph` SVG helper *exists* in the same file (`factory.js:34-44`, `viewBox="0 -960 960 960"`, `fill="currentColor"`), but the Checkbox/Radio/Switch do **not** call it. So whatever centering risk the SVG path geometry carries is not currently on screen. Audited what renders.

---

## Defect table

| Component | State/variant | Issue (what's visually wrong) | Severity | Suspected source | Suggested fix |
|---|---|---|---|---|---|
| Checkbox | Checked (default) | **No visible defect.** Checkmark is optically centered. Measured ink centroid (supersampled canvas, real font/size) = (7.01, 7.17) in the 14px box; box center = 7.0. Horizontal off 0.01px, vertical off 0.17px low — both sub-pixel / imperceptible. Glyph bounding box is symmetric (offTop 1.0 = offBottom 1.0, offLeft 2.61 = offRight 2.61). | none | `styles/70-selection-controls.css` `.composa-checkbox-mark` (`display:grid; place-items:center`) + text `✓` from `factory.js:566` | No change needed for the **text-glyph** build. CAVEAT: if the Material Symbols SVG (`viewBox 0 -960 960 960`) is later switched on, re-audit — that glyph's path is bottom-heavy and will likely need vertical nudging; it is not what renders today. |
| Checkbox | Playground default (muted + ghost) | **Not a defect — expected.** The playground default args are `is-muted is-ghost`, so the box reads transparent border `#e6e6e6` + faint gray check (color `rgba(0,0,0,0.3)`, bg `#d9d9d9`). It "reads gray not blue" only because muted+ghost is the default arg combo, not because checked styling is wrong. Forcing a plain `is-checked` renders correctly: blue bg `#0d99ff`, white check. | none | `factory.js:549` default args; `styles/70-selection-controls.css:44-57` (`.is-muted`, `.is-ghost`) | None. (If reviewers expect the playground to open on a "normal" checked checkbox, that's a story-default choice, not a CSS defect.) |
| Radio | Checked (input variant) | **No visible defect.** Selected radio: blue ring `#0d99ff`, white dot 6px, centered. Dot is the sole grid child under `place-items:center` on a 14px circle, so it is exact-centered by construction; zoom confirms. Unselected render as clean `#fff`/`#e6e6e6` circles. | none | `styles/70-selection-controls.css:15-65` (`.composa-radio-mark` grid + `::after` dot) | None. |
| Switch | On (default) | **No visible defect.** Thumb vertically centered (gapTop 2.0px = gapBottom 2.0px). ON travel = `translateX(12px)` → thumb flush right, 2px inset (gapLeft 14, gapRight 2). Track blue `#0d99ff`. | none | `styles/65-switch.css:17-37`; `design/tokens.css` thumb size 12 / offset 12 | None. |
| Switch | Off | **No visible defect.** Thumb rests left (gapLeft 2, gapRight 14), vertically centered (top 2 = bottom 2). Travel symmetric. NOTE: OFF track measured as `#e6e6e6` (rgb 230,230,230) — i.e. bg-tertiary, the value the *value-diff* audit said was correct/expected. So the OFF-track-gray issue that audit flagged appears already resolved in this running build (it is **not** `#f5f5f5`). | none | `styles/65-switch.css:1-10`; `--composa-switch-bg` | None visually. (Cross-check with value audit: the `#f5f5f5` OFF-track claim does not match current render.) |

---

## Per-component verdict

- **Checkbox — visually correct.** Checkmark centering is fine in the rendered (text-glyph) build; sub-pixel offset only. The only thing of note is the source mismatch (text `✓` vs the assumed Material Symbols SVG). No alignment, padding, or missing-element defect.
- **Radio — visually correct.** Ring + dot centered, colors read correctly (blue selected, white dot).
- **Switch — visually correct.** Thumb vertically centered, travel symmetric in both states, track colors correct (blue ON, `#e6e6e6` OFF).

## Notes for a fix agent
- Do **not** apply a checkmark-centering nudge to the current `.composa-checkbox-mark` text glyph — it is already centered, and an offset would *introduce* a defect.
- The flagged Material Symbols centering risk is real **only if/when** the SVG glyph is wired in. At that point: the `0 -960 960 960` check path is not vertically symmetric within its em box; verify centroid and add a small `translateY` or use `place-items` on the inner `<svg>` with explicit `width/height` sized below the 14px box. Re-screenshot before/after.
- Perceptual-color cross-check: switch OFF track and disabled handling render `#e6e6e6`, consistent with Figma per the value audit; no "reads-wrong-color" issue observed on any of the three.
