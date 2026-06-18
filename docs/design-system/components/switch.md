# Switch

Switch turns a single setting on or off. It applies the change immediately and supports a mixed (indeterminate) state.

## Overview

Switch is the control for an instant on/off setting, like a hardware toggle. Flipping it takes effect at once, with no separate confirm step. Use the mixed state when a switch governs several items that are not all on.

Reach for a sibling instead when the shape does not fit:

| Use instead | When |
|---|---|
| Checkbox | The option is part of a form that applies on submit. |
| Radio | The user picks one option from a mutually exclusive set. |
| ToggleButton | The control is an icon button that stays pressed. |

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function Switch`) |
| Composa CSS | `styles/65-switch.css` |
| Published exports | `@composa-ui/react`: `Switch` |

**Figma source** (file `4kilp0ShQiYsoUPJdleqEH`, "Figma's UI Kit")

| Family | Figma component set | Node id |
|---|---|---|
| Switch | Switch | `2015:24697` |

The Figma Switch set carries 24 variants across Type (On / Off / Mixed), State (Default / Focused), and Disabled.

## Anatomy

Switch renders a native `<button>` with one child:

1. **Thumb**. A `<span class="composa-switch-thumb">`. A 12px circle that slides from left (off) to right (on). It carries a small canvas elevation shadow.

Container: `inline-flex`, a pill track 28px wide and 16px tall, 2px internal padding, fully rounded. The label is not rendered as visible text; it becomes the accessible name (see Accessibility). On checked, the thumb translates 12px to the right. In the mixed state the thumb stretches to the full track width instead of showing a glyph.

## Props

From `function Switch({ ... })` in `src/react/factory.js` and the `Switch` family in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `"Switch"` | Accessible name. Mapped to `aria-label`, not visible text. |
| `checked` | `boolean` | none | Controlled on/off. When set, overrides internal state. |
| `defaultChecked` | `boolean` | `false` | Uncontrolled initial state. |
| `mixed` | `boolean` | `false` | Renders the indeterminate state. A click from mixed resolves to on. |
| `size` | `"default" \| "compact"` | `"default"` | Track size. `compact` is a smaller track. See Sizes & width. |
| `state` | `"default" \| "hover" \| "focused" \| "disabled"` | `"default"` | Forces a visual state for docs and screenshots. Real interaction is browser-driven. |
| `disabled` | `boolean` | `false` | Disables the control. Sets the native `disabled` attribute. |
| `onCheckedChange` | `(next, event) => void` | none | Fires with the next boolean state. |
| `className` | `string` | `""` | Extra classes, appended to the Composa classes. |

Any other prop spreads onto the root `<button>` (for example `onClick`, `id`, `aria-*`).

Notes on the API:

- `mixed` takes priority over `checked` for rendering. The factory emits `is-mixed` instead of `is-checked` when `mixed` is true.
- A click while `mixed` always advances to on (`nextChecked = true`), not a toggle.
- `compact` is a Composa addition with no Figma counterpart (Figma has no compact axis). See Sizes & width.

## Variants

Switch has no `variant` axis. Its display states are Off, On, and Mixed, driven by `checked` and `mixed`.

| Display | Reached by | Notes |
|---|---|---|
| Off | resting / `checked={false}` | Gray track, thumb left. |
| On | `checked` | Blue track, thumb right. |
| Mixed | `mixed` | Blue track, full-width thumb (see States divergence). |

## Sizes & width

Switch has a size axis but no width prop. Width is fixed by the track.

| Size | Track (W x H) | Thumb | Source |
|---|---|---|---|
| `default` | 28px x 16px | 12px | Composa |
| `compact` | 24px x 14px | 10px | **Composa addition. No Figma source.** |

The `default` track is 28px wide; Figma's track is 32px and its thumb is 14px. These dimension gaps are recorded in `docs/design-system/fidelity-controls.md`. The `compact` size has no Figma counterpart at all.

## States

The track colors come from the switch tokens. The OFF track is bg-tertiary; the ON and mixed tracks are the accent blue.

| State | Reached by | Treatment |
|---|---|---|
| Off | resting | Track `--composa-switch-bg` `#e6e6e6` (bg-tertiary). White thumb, left. |
| On | `checked` | Track `--composa-switch-bg-checked` `#0d99ff` (accent blue). White thumb, translated 12px right. |
| Mixed | `mixed` | Track accent blue. Thumb stretches to full track width. |
| Focus-visible | keyboard focus, or `state="focused"` | Global 2px blue ring (`#0d99ff`), 2px offset, from `button:focus-visible`. |
| Disabled | `disabled` prop | Track `--composa-color-bg-tertiary` `#e6e6e6` in every type, `cursor: default`, native `disabled`. |

The ON and mixed tracks use the accent blue `#0d99ff`, the raw primitive, not the Composa brand orange `#ff5c16`.

One state divergence from Figma, recorded in `docs/design-system/fidelity-controls.md`:

- **Mixed renders a full-width thumb, not a minus glyph.** Figma's mixed switch shows a centered minus mark on the blue track. The Composa CSS stretches the thumb to the full track width instead. Same intent (an indeterminate read on a brand track); different rendering.

The OFF and disabled tracks now resolve to bg-tertiary `#e6e6e6`, matching Figma. (The fidelity audit recorded an earlier `#f5f5f5` OFF track and `#d9d9d9` disabled track; the current CSS binds `--composa-switch-bg` and the disabled rule to `--composa-color-bg-tertiary`.)

The `state` prop forces a visual state for documentation and screenshots. It does not replace real browser interaction. Disabled is a real prop, not a forced visual state, and it suppresses click events.

## Usage

**Do**

- Use a switch for a setting that takes effect the moment it flips.
- Write the `label` as the thing being toggled ("Snap to grid"), since it is the accessible name.
- Place the label beside the switch in the surrounding row so sighted users see it too.
- Use `mixed` only when the switch governs a set of items that are partially on.

**Don't**

- Use a switch for an action that needs a separate Save or Apply step; use Checkbox.
- Use a switch for a one-of-many choice; use Radio.
- Add an extra confirm dialog for a low-stakes toggle; the immediacy is the point.
- Rely on the `compact` size where the standard size fits; it has no Figma source.

## Accessibility

- **Role.** Switch renders a native `<button>` with `role="switch"`.
- **Keyboard.** Tab moves focus to the control. Enter and Space flip it.
- **Checked state.** The factory sets `aria-checked` to `"true"`, `"false"`, or `"mixed"` from the resolved state.
- **Accessible label.** The switch has no visible text, so **the `label` prop is required for a meaningful name**; the factory maps it to `aria-label`. Provide a real label rather than the `"Switch"` default.
- **Focus ring.** Focus shows the global 2px blue ring at 2px offset.
- **Disabled.** The `disabled` prop sets the native `disabled` attribute, removing the control from the tab order and suppressing clicks.

## Code

```jsx
import { Switch } from "@composa-ui/react";
```

A controlled switch with a meaningful label:

```jsx
<Switch
  label="Snap to grid"
  checked={snap}
  onCheckedChange={(next) => setSnap(next)}
/>
```

An uncontrolled switch that defaults to on:

```jsx
<Switch label="Include captions" defaultChecked />
```

A mixed switch for a partially-on group, and the compact size:

```jsx
<Switch label="All layers visible" mixed onCheckedChange={showAll} />

<Switch label="Auto-save" size="compact" checked={autoSave} onCheckedChange={setAutoSave} />
```
