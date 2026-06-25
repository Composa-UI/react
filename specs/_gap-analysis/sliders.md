# Slider — Carbon gap analysis

Oracle: Carbon **Slider** (`usage.mdx`, `style.mdx`, `accessibility.mdx`, all fetched OK).
Subject: `src/react/stories/sliders.mdx` (prose-only — no live story yet; Canvas/Controls deferred. Gaps below are content-only).

Note: our doc is product-derived (Figma "Slider Guidelines" 2015:23027) and is organized around *visual* variants (Range / Delta / Stepper / Color / Gradient / Corner Radius / Disabled). Carbon is organized around *interaction* variants (Default single-value vs Range two-handle) and carries the **paired number-input** model that our doc lacks entirely. That is the central divergence.

## Coverage diff

| Category | Carbon covers | We cover | Gap? |
|---|---|---|---|
| Variant — single value | Yes — "Default slider … allows selection of a single value" | Yes — Range/Delta/Stepper/Color/etc. are all single-value | No |
| Variant — range (two handles, min+max) | Yes — "Range slider … enables users to define minimum and maximum values"; adds two number inputs + two handles | **No** — our "Range" is a single-handle scrubber, not a two-handle min/max selector | **Yes** — two-handle range variant absent |
| Variant — with text input (editable number-input pairing) | Yes — Default includes a "number input field"; Range adds two; "input value and slider position are in sync" | **No** — we pair a *read-only* numeric heading; no editable input | **Yes** — biggest content gap |
| State — enabled | Yes ("Enabled", default) | Yes (Default) | No |
| State — hover | Yes ("Hover", cursor over fields/handles) | No explicit hover state | **Yes** (minor) |
| State — focus | Yes ("Focus"); handle gets `$focus` border, track → `$interactive` | Yes — Focused handle w/ focus ring | No |
| State — active/pressing | Yes ("Active"); handle+track `$interactive`; Default handle expands 14→20px | Partial — "continuous drag" behavior but no distinct active styling | **Yes** (minor) |
| State — error | Yes ("Error" — required unfilled or out-of-range); `$support-error`/`$text-error` | **No** | **Yes** |
| State — warning | Yes ("Warning" — e.g. range min > max); `$support-warning`/`$text-primary` | **No** | **Yes** (range-only) |
| State — disabled | Yes ("Disabled") | Yes — Disabled variant (flat shadowless handle, no fill) | No |
| State — read-only | Yes ("Read-only" — reviewable, non-modifiable) | No (Disabled only) | **Yes (likely N/A)** |
| State — skeleton | Yes (loading) | No | **Yes (likely N/A)** |
| Min / max / step labels | Yes — "Min and max value text indicate a slider's minimum and maximum value range" | Partial — we mark common stopping points with vertical index bars + a numeric heading, but no min/max end-labels concept and no explicit `step` exposure | **Yes** — min/max end labels missing |
| Keyboard — arrows (single-step) | Yes — "Arrow keys modify slider values in single-step increments" | Yes — "Arrow keys move the handle" | No |
| Keyboard — Shift+Arrow (large increment) | Yes — "Shift + Arrow changes the slider value by a larger increment"; `stepMultiplier` ≈ "a tenth of the total range" | **No** | **Yes** — increment model gap |
| Keyboard — Home / End | We document; Carbon implies via ARIA APG ref (not stated in fetched prose) | Yes — Home/End jump to min/max | No (we meet/exceed) |
| Keyboard — PageUp / PageDown | Not stated in fetched Carbon prose (defers to W3C ARIA APG) | No | Partial — APG-implied, see fill |
| Keyboard — Tab order | Yes — Default "slider → number input"; Range "first input → first handle → second handle → second input" | Partial — "Tab moves focus to the slider handle"; no input in the order | **Yes** — once input added |
| Screen-reader — role slider | Defers to W3C ARIA APG (role=slider) | Yes — exposes `slider` role | No |
| SR — aria-valuemin/max/now | Implied by APG ref | Yes — documents all three | No |
| SR — aria-valuetext | APG recommends for non-numeric/units values | **No** | **Yes** — esp. for Color/Gradient/non-numeric |
| SR — aria-labelledby / naming | Yes — "Labels inform users what kind of value(s) they are selecting"; on a single line above | Yes — `label` + property heading | No |
| Input↔slider sync semantics | Yes — "An update to either causes the other to update"; auto-corrects out-of-range to boundaries | **No** | **Yes** — depends on input fill |
| Content rules — label voice | Yes — sentence case, "no more than three words", concise single line above | Partial — we require heading+value pairing but no voice/case/length rule | **Yes** |
| Tooltip on hover/focus/active (no-input sliders) | Yes — "use a tooltip on hover, focus, and active to show the selected values" | No | **Yes** |
| When-to-use vs number-input / range bounds | Yes — avoid extremely large (1–1000) or too-small (1–3) ranges; "Do not use complex inputted values that are not numbers" | Partial — we have "When to use" by variant, but no range-size or numeric-only guardrails, and no slider-vs-number-input decision | **Yes** |
| Do / Don't | Implicit (avoid-list + "use date picker for dates, describe ranges numerically not temporally") | No explicit Do/Don't pair | **Yes** |

## Proposed fills

1. **Editable number-input pairing (with-text-input variant).** Add a variant that pairs the track with an editable numeric input (Composa's existing dense Input, 24px). Spec the two-way sync: typing updates the handle, dragging updates the field, out-of-range entries clamp to min/max. _(proposed)_ — Target: **Usage → Variants** + **Code** (`showInput` / `<Slider.Input>` prop). Tokens: reuse input field tokens (`color.bg`, `color.border`, `color.text`); `spacer-2` (8) gap track→input. Carbon: Default includes a "number input field"; "The input value and slider position are in sync. An update to either causes the other to update."

2. **Two-handle range (min/max) variant.** Add a true range slider with two handles + two value labels selecting a min and a max from one track; fill spans between handles. _(proposed)_ — Target: **Usage → Variants** (rename our current single-handle "Range" to "Scrubber"/"Position" to avoid collision) + **Code** (`variant="range"` with `value={[min,max]}`). Carbon: "Range slider … enables users to define minimum and maximum values from a predefined range … two number inputs … two handles."

3. **Keyboard increment model (Shift+Arrow + PageUp/Down).** Document the increment hierarchy: Arrow = one `step`; Shift+Arrow (or PageUp/PageDown) = large increment ≈ a tenth of the range (`stepMultiplier`); Home/End = min/max. Add a `step` and `stepMultiplier` prop to the API. _(proposed)_ — Target: **Accessibility → Keyboard** (extend the table) + **Code**. Carbon: "Shift + Arrow changes the slider value by a larger increment"; `stepMultiplier` "a tenth of the total range" (e.g. `10` for 0–100).

4. **`aria-valuetext` for non-numeric / unit values.** Add `aria-valuetext` so the Color/Gradient/Opacity and unit-bearing sliders announce a human label (e.g. "210° hue", "40% opacity", "12 px radius") instead of a bare number. _(proposed)_ — Target: **Accessibility → Screen reader & labeling**. Carbon: defers to W3C ARIA APG, which specifies `aria-valuetext` "when the value … is not represented as a number" or carries units.

5. **Error & warning states (range-oriented).** Add an error state (value out of range / required-unfilled when paired with an input) and a warning state for logically inconsistent range entries (min > max), each with a message line. Tokens: `color.text.error` / `color.border` (error) and a warning equivalent; message `body.medium`, `spacer-4` (16) top margin. _(proposed)_ — Target: **Usage → States table** + **Style → Color**. Carbon: "Error (required field unfilled or values out of range)"; "Range sliders generate warning messages when … minimum exceeding maximum"; `$support-error`/`$text-error`, `$support-warning`/`$text-primary`.

6. **Min / max end labels + step exposure.** Document optional min/max text anchored at the track ends (distinct from our property heading+value), and surface `step` for stepped sliders. _(proposed)_ — Target: **Usage → Anatomy** + **Content rules**; **Style → Structure** (min/max label `body.medium`, `color.text.secondary`). Carbon: "Min and max value text indicate a slider's minimum and maximum value range … must accurately reflect user selections."

7. **Tooltip-on-interaction for input-less sliders.** For variants without a visible input/heading, show a value tooltip on hover/focus/active. _(proposed)_ — Target: **Usage → Behaviors**. Tokens: tooltip surface (`color.bg.assistive` / `color.text.assistive`, matching our redline label). Carbon: "For sliders without number inputs, use a tooltip on hover, focus, and active to show the selected values."

8. **When-to-use guardrails + Do/Don't.** Add: prefer a number input over a slider for precise/large ranges; avoid extremely large ranges (e.g. 1–1000) and trivially small ones (e.g. 1–3); sliders are for numeric values only; for dates use a date picker and describe ranges numerically, not temporally. Pair as a Do/Don't. _(proposed)_ — Target: **Usage → When to use** + a new **Do / Don't**. Carbon: the avoid-list + "avoid date selection — use the date picker … Describe ranges numerically, not temporally."

9. **Content / labeling-voice rule.** Add: label in sentence case, concise (~3 words), on a single line above the slider; label names the *value kind*, the numeric value reads alongside. _(proposed)_ — Target: **Usage → Content rules**. Carbon: "sentence case … no more than three words"; "Labels … should remain concise on a single line above the slider."

10. **Hover & active styling.** Note a hover affordance on handle/track and an active (pressing) treatment. (Carbon expands the Default handle 14→20px on active; Composa likely keeps 16px and shifts color instead, consistent with our dense 16px handle.) _(proposed)_ — Target: **Usage → States table** + **Style → Color** (`Handle — active` → `color.bg.brand`-pressed). Carbon: "Active (user pressing handles)"; handle+track `$interactive`.

## Not applicable

- **Read-only state** — Carbon's reviewable-but-not-modifiable mode; our Disabled covers the non-interactive case. Skip unless Composa adopts a global read-only pattern across controls.
- **Skeleton state** — Carbon page-load loading affordance; not in this control's scope. Skip unless a global skeleton pattern is adopted.
- **Carbon two-size active expansion (14→20px / 16px handles, 200–640px track widths)** — Composa is a dense desktop app on a base-4 grid with 16px handles / 208px track / 100px min width; we deliberately keep one dense sizing rather than Carbon's recommended desktop widths. Surface only as fill #10's posture note, not a new size.
- **Carbon raw token names** (`$icon-primary`, `$border-subtle`, `$border-inverse`, `$interactive`, `$focus`, `$support-error`, `$label-01`, `$body-compact-01`, etc.) — map to Composa token names already in the Style tab; no 1:1 import.
- **Composa-only visual variants** (Delta center-emanating fill, Color/Gradient preview tracks, Gradient chits, Corner-Radius tick) — product-specific, beyond Carbon's two-variant model; retain as-is, no Carbon obligation.
