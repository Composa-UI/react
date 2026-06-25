# Switch — Carbon gap analysis

Oracle: Carbon **Toggle** (`usage.mdx`, `style.mdx`, `accessibility.mdx`, all fetched OK).
Subject: `src/react/stories/switch.mdx` (LOCKED EXEMPLAR — 4-tab shape Usage/Style/Code/Accessibility is fixed; gaps below are content-only).

## Coverage diff

| Category | Carbon covers | We cover | Gap? |
|---|---|---|---|
| Sizing variants (default vs small toggle) | Yes — two sizes: Default 48×24 w/ 18px handle, Small 32×16 w/ 10px handle. Default needs visible label + state text; Small makes both optional | Partial — we document one size only (Track 32×16, Knob 14×14, Row 24) — i.e. roughly Carbon's *small* footprint but our 24px row. No second variant | **Yes** — no default/small distinction |
| States: on / off | Yes — base states | Yes — On/Off variants | No |
| States: disabled | Yes — dims, removes interaction; dims label | Yes — dims control + label | No |
| States: focus | Yes — focus ring on Tab/click | Yes — selection-blue ring | No |
| States: read-only | Yes — "Allows review without modification; remains focusable and screen-reader accessible"; transparent bg + `$border-subtle` + `$icon-primary` handle | No | **Yes** |
| States: skeleton | Yes — loading placeholder on initial page load | No | **Yes (likely N/A)** |
| Mixed / indeterminate | Not in Carbon Toggle | Yes — Mixed variant + `aria-checked="mixed"` | No (we exceed Carbon) |
| Label placement & on/off text labels | Yes — label "must accompany" default; state text "three words or less … displayed on the side"; both optional for small | Partial — we have label + optional description, but **no on/off state-text concept** and no side-placement rule | **Yes** — on/off state text missing |
| Keyboard | Yes — in tab order; Space/Enter toggles | Yes — Tab; Space/Enter | No |
| Screen-reader semantics (role switch vs checkbox, aria-checked) | Yes — button w/ `role="switch"`; `aria-checked` true/false; on/off text `aria-hidden` | Yes — `switch` role, `aria-checked` true/false/mixed | Partial — missing `aria-hidden` on state text (only matters once state text added) |
| Immediate-effect vs save guidance | Yes — immediate, reversible, no confirmation | Yes — strong "immediate effect" framing | No |
| Content rules | Yes — adjectives not verbs; sentence case; ≤3 words; **label must not change with state** | No — no content/labeling-voice rules | **Yes** |
| Do / Don't | Implicit (when-not-to-use list) | Yes — Do/Don't pair | No |
| When-to-use vs checkbox | Yes — not for >2 options, not for non-binary, not when confirmation needed | Yes — Switch vs Checkbox immediate-effect rule | No |

## Proposed fills

1. **On/off state text (label placement).** Add an optional state-text element rendered to the side of the track, `body.medium`, `color.text.secondary`, `spacer-2` (8) gap. _(proposed)_ — Target: **Usage → Behavior** (and a Structure row "State text gap — `spacer-3`"). Carbon: state text "is displayed on the side of a toggle" and "three words or less".

2. **Content / labeling-voice rules.** Add a short list: use adjectives not verbs for the setting name; sentence case; keep to ~3 words; **the label must not change with on/off state** (only the state text/visual changes). _(proposed)_ — Target: **Usage → Do / Don't**. Carbon: "Use adjectives rather than verbs…"; "The label's text should not change based on the on/off state."

3. **Read-only state.** Add a read-only variant: non-interactive but focusable and announced; transparent track with `color.border` (subtle) outline and `color.icon` (primary) knob. _(proposed)_ — Target: **Usage → Behavior** + a Color row (`Track — read-only` → transparent + `color.border`; `Knob — read-only` → `color.icon`). Carbon: read-only "remains focusable and screen-reader accessible"; transparent bg + `$border-subtle` + `$icon-primary`.

4. **`aria-hidden` on state text.** Once on/off state text exists, mark it `aria-hidden` so SRs read role + `aria-checked` only, not redundant "on/off". _(proposed)_ — Target: **Accessibility → Screen reader & labeling**. Carbon: "'On' and 'off' text is marked `aria-hidden`."

5. **Size posture note (default vs small).** One sentence clarifying Composa ships a single dense size (24px row) intentionally — i.e. Carbon's two-size system collapses to our base-4 dense 24px control. _(proposed)_ — Target: **Style → Structure** (note under the table). Carbon: Default 24px / Small 16px height.

## Not applicable

- **Skeleton state** — Carbon page-load loading affordance; not part of this control's locked scope. Skip unless Composa adopts a global skeleton pattern.
- **Two-size system (default 48×24 + small 32×16)** — Composa is a dense desktop app on a base-4 grid with 24px dense controls; we deliberately ship one size rather than Carbon's two. Surface only as the posture note (fill #5), not as a new variant.
- **Carbon raw token names** (`$support-success`, `$toggle-off`, `$focus`, `$label-01`, etc.) — map to Composa token names already in the Style tab; no 1:1 import.
