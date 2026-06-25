<!-- Source: Figma UI3 "Color" page 2012:298199 — 7 guideline frames: Getting Started
     2012:300741, System Overview 2012:298757/298787/298811, Role Guide 2012:300677,
     Text 2012:299906, Icon 2012:300061, Background 2012:300329, Border 2012:300218;
     light/dark ramps 2012:299809, pale variants 2658:2366, naming schema 2012:299840.
     Token values: design/figma-tokens/Colors/*.tokens.json (220 ramps + 707 semantic/mode).
     maintainer: founder ruling — keep all roles except FigJam (dropped); the Figma-workflow
     roles (design/component/assistive/measure/multiplayer) are private/internal, not public.
     Slides folds into light/dark as an accent. -->

# Color

Color is a **two-tier system**. A fixed palette of **ramps** (raw hex, by hue × brightness
100→1000) feeds **semantic tokens** named by *how a color is used*. Components reference
**semantic tokens only** — never a ramp step, never a hex — so a component re-themes by data.

## Themes

A theme recolors all UI at once. Composa ships **light** and **dark**. Under the hood every
hue has a separate **light and dark ramp** (the dark one darkened and desaturated, because a
color reads relative to its surroundings); semantic tokens pick the right ramp per theme, so
you never hand-pick a per-theme value. Many colors also have **pale variants** — softer
versions for hierarchy and to stop saturated colors from feeling harsh, especially in dark
mode. _(Slides is an accent override, not a separate theme — it differs only in the brand
accent. FigJam themes are dropped.)_

## How a token is named

Parameters chain in a fixed order:

1. **Type** *(required)* — `bg` · `text` · `icon` · `border`.
2. **UI element** *(optional)* — for always-dark surfaces: `toolbar` · `menu` · `tooltip`.
3. **Role** *(optional)* — meaning, not hue (below).
4. **Prominence** *(optional)* — `-secondary` / `-tertiary` for bg/text/icon; borders use
   default (divider) and `-strong` (prominent outline).

Red error text is `color.text.danger`; a red surface is `color.bg.danger`.

## Color roles

Roles map a consistent meaning to a hue so intent survives a theme switch.

**Public:** `brand` (the accent) · `selected` (light blue — selected bg / focused border) ·
`disabled` (light grey — non-interactive) · `inverse` (the opposite of the background) ·
`danger` (red — errors) · `warning` (yellow — potential problem) · `success` (green —
confirmation) · `info` (light blue/purple — non-blocking informational).

**Private / internal** (kept for an internal build, not the public surface): `design` (blue,
design concepts) · `component` (purple, component features) · `assistive` (pink, e.g.
auto-layout aids) · `measure` (red canvas guides) · multiplayer cursor colors. **`figjam`
is dropped.**

## Text colors

**Basic** — `color.text` is the default for body, titles, and tabs. `-secondary` is lighter,
for hierarchy (labels, inactive tabs, timestamps). `-tertiary` is for placeholders and the
level below secondary — **it sits below the contrast threshold and may not be readable to
all users, so never use it for reading content.** `-disabled` marks truly non-interactive
text and is visually identical to `-tertiary`.

**Tinted** — role-colored text that can chain with prominence (`-secondary`/`-tertiary`):
`-brand` for links, `-danger`, `-warning`, `-success`. (Private: `-design`, `-component`,
`-assistive`.)

**On content** — context-independent text that always renders the same over user
content/images, chosen by a 50%-lightness rule: `color.text.onlightcanvas` (+ `-secondary`)
over backgrounds **lighter than 50%**, `color.text.ondarkcanvas` (+ `-secondary`) at **50%
or darker**.

## Icon colors

**Basic** — `color.icon` default; `-secondary` for inactive/hierarchy; `-tertiary` mainly
for carets; `-disabled` (identical to `-tertiary`).

**Tinted** — `-brand`, `-danger`, `-warning`, `-success` (same meanings as text).

**On content** — `color.icon.onlightcanvas` (bg >50% lightness) / `color.icon.ondarkcanvas`
(≤50%).

## Background colors

**Hierarchy** — `color.bg` default → `-secondary` (most containers) → `-tertiary`
(containers sitting *on* a secondary bg).

**Interaction states** — `-hover` (light grey behind icons/selectable items), `-selected`
(light blue), `-disabled` (non-interactive fill). **Rule: on a disabled fill, switch text and
icons to the `-ondisabled` tokens** (`color.text.ondisabled`, `color.icon.ondisabled`).

**Role surfaces** — `-brand`, `-danger`, `-warning`, `-success`, typically with a `-hover`
state and a `-secondary` container variant. **Rule: text and icons on a tinted surface use
the `-on{role}` token** (e.g. `color.text.ondanger`), not the standard one — so contrast
holds.

**Tertiary role backgrounds** — the lightest version of a hue, designed to pair with the
*default* `color.text` / `color.icon` rather than an on-color.

**Special UI surfaces** (always dark, regardless of theme): `color.bg.toolbar` (+ `-hover`,
`-selected`), `color.bg.menu` (darker than toolbar), `color.bg.tooltip` (darker still).

## Border colors

**Default** — `color.border` is the common case: a divider between sections or the outline
around an input. `-strong` is the heavier outline for a prominent element (e.g. a text input
that needs to stand off its background).

**Selection** — `color.border.selected` (blue) for a focused/selected input; `-selected-strong`
raises prominence when a selected border sits on an already-selected background.

**Toolbar / menu** — inside a dark toolbar or menu, add `-toolbar` / `-menu`
(`color.border.toolbar`, `color.border.menu`).

## Usage rules

- **Semantic over atomic** — `color.text.danger`, not `red.600`, never `#dc3412`. Drop to a
  ramp step only when a precise one-off shade is genuinely required.
- **On a tinted background, use the `-on{role}` text/icon token.**
- **On a disabled fill, use the `-ondisabled` text/icon token.**
- **`-strong` borders** only to raise prominence against a low-contrast background.
- **Over user content, use the on-canvas tokens** by the 50%-lightness rule.

## Accessibility

- **`color.text.tertiary` is below the contrast threshold** — placeholders and lowest-priority
  hierarchy only, never primary reading text (`disabled` looks the same by design).
- The light/dark ramp split and pale variants keep *perceived* contrast balanced across
  themes; the on-canvas 50%-lightness rule keeps text/icons legible over arbitrary content.

## Palette

22 hue families (`black` · `white` · `grey` · `blue` · `purple` · `violet` · `pink` · `teal`
· `red` · `persimmon` · `orange` · `yellow` · `green`, each with a `pale_` variant), every
ramp running steps **100 → 1000** with light/dark variants. The full value set lives in the
token files; ramps render as swatches revealing token name + value on hover.
`[Deferred: ColorRamp helper + Tooltip — ref node 2012:298811]`
