<!-- Source: Figma UI3 "Grid" page 1:530439 — Spacing 1:530453 (table 1:530457),
     Radius 1:530546 (table 1:530578), Sizing sections 1:530510 / 1:530525.
     Token values: design/figma-tokens/spacing-radius.tokens.json.
     maintainer: px values are authoritative; Figma's rem fallbacks are inconsistent
     (spacer-1 = 4px tagged 0.3rem) — ignore them. No PAGE-LAYOUT column grid exists in the
     kit; "Grid" means the base-4 spacing grid. (There IS a property-panel column grid — 1/2/3
     columns for inspector controls — see the Property-panel columns section.) Sizing
     (24/40/32) is editor-context. -->

# Grid

Everything sizes and spaces on a **base-4 grid** — clean multiples of 4px. The keystone
is **8px**: it's the default gap for dense UI, and both the radius and sizing systems are
tuned around it. Building this grid into code keeps layouts consistent by default.

## Spacing

A base-4 scale. Most padding and margin for dense elements is **8px (`spacer-2`)** —
reach for it first.

| Token | px | Use for |
|---|---|---|
| `spacer-0` | 0 | No space |
| `spacer-1` | 4 | Smallest increment — tight gaps inside a control |
| `spacer-2` | 8 | **Default** padding/margin for dense elements |
| `spacer-3` | 16 | |
| `spacer-4` | 24 | |
| `spacer-5` | 32 | |
| `spacer-6` | 40 | Largest in the scale |

_The `Example` column renders a live square sized to each token._
`[Deferred: render spacing swatches — ref node 1:530457]`

## Radius

Radii are designed to **nest concentrically**. An inner element uses **5px
(`radius-medium`)**; its immediate parent container uses **13px (`radius-large`)**. With
the default 8px gap between them, the curves stay parallel — because **5 + 8 = 13**. Match
this pairing and rounded elements nest cleanly; break it and the curves drift.

| Token | px | Use for |
|---|---|---|
| `radius-none` | 0 | No rounding |
| `radius-small` | 2 | Smallest rounding (sharp chrome) |
| `radius-medium` | 5 | **Inner UI elements** (the default) |
| `radius-large` | 13 | **Parent containers** wrapping medium-radius elements |
| `radius-full` | 9999 | Pills and circles |

_The `Example` column renders a live square at each radius._
`[Deferred: render radius swatches — ref node 1:530578]`

## Sizing

Control and row heights also key off the 8px grid. _(These come from the editor context;
treat as defaults for dense product UI.)_

- **Control height — 24px** for the smallest buttons, dropdowns, and dense inputs
  (replacing the legacy 30/32px mix). A 24px control + 8px top/bottom fits a 40px row
  (24 + 8 + 8 = 40), so controls align inside rows by construction.
- **Row heights — two only:** a **heading row is 40px**, a **list item row is 32px**.
  Don't proliferate row sizes beyond these.

## Relational spacing _(proposed)_

The ramp says which values exist; this says how much space goes where. Three roles
(Carbon's vocabulary): **Inset** (padding inside a container/control), **Inline**
(horizontal gap between row items), **Stack** (vertical gap between stacked elements).
Inset/Inline default to **8px** (4px inside dense controls; 16px in panels/dialogs). Stack:
4–8px for tightly-related rows, **16px** between distinct sibling field rows, 24–32px for
section breaks. Principle: proximity signals relationship — widen the step to separate
groups and raise hierarchy. Values inferred from the keystone + component evidence
(dropdown rows 16px; toast zones 8px; input↔button 8px; menu nesting 4px); confirm.

## Property-panel columns _(proposed)_

Inside a property/inspector panel, controls snap to a **flexible column grid of 1, 2, or 3
columns** (how X/Y, W/H pairs align across a panel). This is an inspector layout aid, not a
page-layout grid — there are still no responsive breakpoints. Standard 8px inline gutter.
Source: UI3 dropdown guidance ("snap these controls to our flexible grid, locking to either
one, two, or three columns"). Figma's Col-2/Col-3 specimens rendered identically — confirm
whether intentional.

## Usage

- **Default to 8px.** It's the keystone gap; the radius-nesting and control-in-row math
  both depend on it.
- **Pair radii by nesting level** — `radius-medium` inside, `radius-large` on the parent.
  Don't pick a radius in isolation.
- **Reference the token, never a raw px** in component specs.

<!-- maintainer: a PAGE-LAYOUT grid (responsive columns, gutters, breakpoints) does NOT
     exist in the Figma kit and must be designed fresh — see breakpoints.md. The
     property-panel column grid (1/2/3 cols) above IS in the kit, distinct from that. -->
