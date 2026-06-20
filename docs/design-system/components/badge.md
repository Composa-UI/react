# Badge, notification bell, notifications

Status indicators and the notification surfaces: the count/dot/label **Badge**, the bell icon-button (**NotificationBell**), the dark HUD toast (**Notification**), and Figma's in-app snackbar (**VisualBell**).

## Overview

Five exports, all in `src/react/factory.js` and published from `@composa-ui/react`, registered in the `supportComponents` bucket of `design/component-api.json`:

- **`Badge`** — the count / dot / label indicator. Figma **Badges** page `2012-32973`: `Badge small` (`2012-35027`), `Badge small alt` count badges (`2012-35077`), `Badge Dot` (`2012-35086`), `Badge large` (`2012-35016`).
- **`BadgeAnchor`** — corner-positions a host control and an overlay Badge in one box. This is how Badge composes onto a button/avatar/nav item.
- **`NotificationBell`** — the bell icon-button with an unread indicator. Figma bell glyph `icon.24.notification.bell.badged.small`. Composed from `IconButton` + `Badge` via `BadgeAnchor`.
- **`Notification`** — the dark HUD toast / list-row. Figma **Notifications** page `2028-109149`, set `Notifications` (`2028-111255`): Single/Multi × 1-or-2 buttons.
- **`VisualBell`** — Figma's in-app toast / snackbar pill. Figma **Visual Bells** page `2015-40421`, set `Bell` (`2015-42989`): Default / Message / Message w Dismiss / Danger.

All are presentational and controlled. They own no open/unread state — the app drives `count`/`dot`, handles `onAction`/`onDismiss`, and owns auto-dismiss timing.

## Badge

One component spans three shapes, picked from the props:

- `dot` → a bare status dot (no text). The unread indicator.
- `count` (a number) → a number badge. `max` clamps the display to `{max}+` (e.g. `count=240 max=99` → `99+`).
- `label` / `children` → a status or descriptive label pill.

`tone` selects the color family: `default`, `brand`, `figjam`, `component`, `danger`, `warning`, `success`, `merged`, `archived`, `invert`, `selected`, `feedback`, `menu`. `strong` switches the subtle tinted form (light tinted bg + colored text, the default) to the strong filled form (solid bg + on-color text). `size` is `small` (16px, default) or `large`. `icon` adds a leading 12px glyph (used by the branch `merged`/`archived` badges).

Each tone exposes four design tokens — `--composa-badge-<tone>-fg` / `-bg` (subtle) and `--composa-badge-<tone>-strong-fg` / `-strong-bg` (filled) — so a host can retheme a family without touching markup. Most tones reference the semantic palette; `figjam`/`component` fills and the `on-*` text colors are literals from the UI3 variable archive.

### How Badge composes onto a host (the bell foundation)

`BadgeAnchor` provides the positioning context. Pass the host as children and the indicator as `badge`:

```jsx
<BadgeAnchor badge={3}><IconButton icon="comment" label="Comments" /></BadgeAnchor>   // count
<BadgeAnchor badge={true}><Avatar initials="JW" /></BadgeAnchor>                       // dot
<BadgeAnchor badge={{ count: 5, tone: "brand" }} placement="bottom-end">…</BadgeAnchor> // custom
```

`badge` accepts: a number/string (count), `true` (a danger dot), a `BadgeProps` object, or a ready `Badge` element. The anchor forces `overlay` + `overlayPlacement` so the badge sits at the requested corner (`top-end` default) with a 2px ring punched out of the host so it reads as detached. You can also set `overlay` directly on a `Badge` and place it inside your own `position: relative` box.

## NotificationBell

The bell icon-button with an unread indicator. `NotificationBell = IconButton + Badge` via `BadgeAnchor`, so it reuses both primitives rather than introducing a new surface:

- `count` > 0 → a strong count badge (clamped by `max`, default 99).
- otherwise `dot` → the bare unread dot.
- neither → no indicator.

The plain bell glyph is the license-clean built-in `notification` (Material Symbols `notifications`, added to `builtin-glyphs.js`); the badged look is composed, matching the Figma `icon.24.notification.bell.badged.small`. Drive `onClick`; the app owns the unread state and panel toggle.

## Notification

The dark HUD toast / list-row (56px tall, `--radius-medium`, HUD shadow). Anatomy:

1. **Content** (212px): a leading `icon` or `avatar` (24px) + a `message` that truncates on one line (or up to two lines with `multiline`).
2. **Actions** (72px), separated by a vertical hairline: one or two stacked CTAs. With two, the second is conventionally **Dismiss** and a horizontal hairline divides them.

`actions` is the data array; `onAction`/`onDismiss` are convenience shorthands that build the default Action / Dismiss column. `tone="danger"` tints the CTA text. Use `Notification` for app/system messages stacked in a list or shown as a transient toast.

## VisualBell

Figma's in-app toast / snackbar — a compact dark rounded pill (40px, `--radius-large`):

1. Optional **leading** icon, or a `loading` spinner (the in-progress toast).
2. A strong **message** plus an optional secondary `count` (e.g. `1/134`).
3. An optional **rail** of bordered `actions` buttons and an optional **dismiss** (X) behind a left hairline.

`tone="danger"` swaps to the red surface. Presentational + controlled; the app owns timing/auto-dismiss.

## Variants and states

| Component | Axes |
| --- | --- |
| Badge | shape (label / count / dot) × tone (13) × strong × size (small / large) × icon |
| BadgeAnchor | placement (top-end / top-start / bottom-end / bottom-start) |
| NotificationBell | indicator (none / dot / count) × size |
| Notification | leading (icon / avatar) × actions (0 / 1 / 2) × multiline × tone (default / danger) |
| VisualBell | leading (none / icon / loading) × count × actions × dismiss × tone (default / danger) |

## Deferred

- **Bell Multiplayer** (`2015-43085`) — the collaborator follow/spotlight toasts (Waiting / Followers / Spotlight × 7 colors). Out of Wave 8 scope; revisit with multiplayer presence.
- The Figma badged-bell ships as two static icon glyphs (`badged` / `filled.badged`). We compose the badge at the component layer instead so the count/dot is live and themeable.

## Verification

- `node --check` on changed `src/**/*.js`.
- `npm run check` (tokens build, css build, token-parity, contracts, react-entrypoint, syntax).
- Storybook: `Composa UI/Components/Feedback/Badge` covers Badge tones, count/dot, on-host composition, the bell, the Notification toast, and the VisualBell.
