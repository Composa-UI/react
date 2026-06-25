<!-- Source: Figma UI3 "Tooltip" 2015:39095, Guidelines 2015:39039 (file 4kilp0ShQiYsoUPJdleqEH).
     Implementation: FloatingTooltip/Tooltip in src/react/factory.js, styles/75-tooltip.css.
     maintainer: Figma ships canvas-only action variants (Page/Prototype/Frame/File) —
     dropped; the generic "label + inline action" pattern is kept. Behavior facts
     (80ms fade, bottom default, aria-describedby wiring) are from the implementation. -->

# Tooltip

A small, transient label that names an unlabeled or icon-only control, or surfaces a
bit of secondary information on hover or focus.

## Usage

**Use a tooltip to**
- Name an icon-only control — a toolbar tool, an icon button.
- Surface short, secondary information tied to one element.

**Avoid a tooltip when**
- The control already has a visible label — it rarely needs one. Use a tooltip only when
  it clearly adds value.
- You need to explain *how* to use something at length — use a callout or popover with a
  heading and supporting text instead.

**Content**
- Keep it short — ideally 3–20 characters, basic information only.
- An optional keyboard-shortcut hint (e.g. `⌘V`) can appear alongside the label.
- Don't put essential information *only* in a tooltip — it's transient and unavailable to
  touch users.

## Style

**Anatomy** — a dark, rounded, elevated container with a small tail pointing at its
anchor; a text label; and an optional secondary-colored shortcut hint.

**Tokens** — surface `color.bg.tooltip`, text `color.text.tooltip`, shortcut
`color.text.tooltip-secondary`; `radius.medium`; padding `spacer.2` × `spacer.1`; text
`body.medium`; elevation `elevation.tooltip`; max width 200px.

**Variants**
- **Tone** — `inverse` (default) reads on light surfaces; both tones work in light and
  dark mode.
- **Action tooltip** — a richer form pairing a label with an inline action (for example,
  an editable URL, email, or phone number with an Edit or Send action).

## Behavior

- **Appearance** — shown while the pointer rests on (or keyboard focus is on) the anchor;
  fades in and out over 80ms.
- **Placement** — defaults to **below** the anchor, centered; also top, left, right, and
  corners. Position adapts to the anchor's location near screen edges.
- **Dismissal** — hides when the pointer leaves or focus moves. A tooltip and a surface
  opened from the same control never show at once.

## Code

A tooltip renders into the nearest **[OverlayHost](../primitives/overlay-host.md)** — the
shared mount point for all transient surfaces. Without an `OverlayHost` ancestor it has
nowhere to portal and won't appear. Icon-only controls carry a tooltip automatically from
their `label`, so you rarely mount one by hand:

```jsx
import { OverlayHost, IconButton } from "@composa-ui/react";

<OverlayHost>
  <IconButton icon="lock" label="Lock layer" /> {/* tooltip comes from label */}
</OverlayHost>
```

## Accessibility

- The anchor is wired with `aria-describedby` to the tooltip, so screen readers announce
  the tooltip as the element's description.
- For icon-only controls the `label` is also the accessible name, so the visible tooltip
  and the screen-reader name come from one source — keep `label` meaningful.
- Don't rely on the tooltip alone for anything essential; touch and some assistive-tech
  users never see it.

## Open decisions

- **Appearance delay** — should the tooltip wait a beat before showing on hover (proposed:
  ~500ms on hover, immediate on keyboard focus), or stay immediate?
- **Keyboard** — confirm focus shows the tooltip and `Esc` dismisses it without moving
  focus.
- **Reduced motion** — drop the 80ms fade under `prefers-reduced-motion`.
