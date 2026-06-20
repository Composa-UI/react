# Composa UI — component catalog

The components exposed by `@composa-ui/react`. Use the exact prop values listed
here; do not invent props or variants. Every family is sourced from Figma UI3 and
implemented in `src/react/factory.js`. For full usage/anatomy/accessibility, see the
hosted Storybook (link in SKILL.md) or, if running it locally, the Storybook MCP.

## Controls

### Button — the one main action / supporting actions
`variant`: primary · secondary · ghost · link · link-danger · destructive · secondary-destruct · inverse · success
`size`: small (20px) · default (24px) · large (32px) — `width`: auto · wide(256px) — `disabled`
One `primary` per view. `primary` fill is brand orange `#ff5c16` (deliberate divergence; link/focus stay blue).

### IconButton — icon-only action (square, requires `label`)
`component`: iconbutton · togglebutton · dialogtogglebutton · splitbutton
`variant`: (same vocabulary as Button) — `size`: small(20) · default(24) · large(28) · xlarge — `disabled`
`label` is REQUIRED (becomes aria-label + title). ToggleButton: `pressed` → active = blue icon on pale-blue tint.

### InputField — text / numeric / color / combo entry
`componentSet`: text-input · color-input · numeric-input · numeric-input-multi · combo-input
`variant`: single-line · multi-line · quick-action — `size`: default · large — `width`: auto · fill — `state`, `disabled`

### Dropdown — pick one value from a list (styled as an INPUT, white through every state)
`size`: default(24) · large(32) — `width`: auto · fill — `stroke`: boolean — `iconLead`: boolean (needs both `icon`+`iconLead`) — `disabled`
`options`: (string | {label, value?, shortcut?, disabled?})[]. Active/open = blue border, NOT a fill.

### SegmentedControl — single-select, 2–6 options on one row
`variant`: icon · label — `options`: SegmentedOption[] — `width`: auto · fill — `disabled`
Exactly one selected; selected = white pill on gray track (not a brand fill).

### Tabs — switch page-level content regions
`variant`: underline · pill — `size`: default · compact — `tabs`: TabItem[]

### Switch — on/off toggle
`size`: default · compact — `checked`: boolean — `mixed`: boolean — `disabled`

### Radio — short, always-visible single choice
`variant`: input · button — `checked`: boolean — `label`: string — `disabled`

### Checkbox — multi-select / mixed
`type`: unchecked · checked · mixed — `muted` · `ghost` · `disabled` — `label`: boolean

## Overlays & menus

### Tooltip — `placement`: top·right·bottom·left·top-left·top-right — `tone`: default·inverse. Portals into OverlayHost.
### Dialog — `size`: 320·480·small·default·large — `variant`: basic·advanced·embed·create-project·create-team·sharing — `tone`: default·destructive
### MenuRow — `type`: simple·complex·checkmark·toggle·toolbar·heading — `lead`: avatar·icon — `trail`: shortcut·badge·checkbox. Compose inside `Menu`.

## Support components & primitives (from `supportComponents`)
ListCell · VerticalCell · TextPair · Label · Header/HeaderActions · Badge/BadgeAnchor/NotificationBell · Notification/VisualBell
**Overlays:** `OverlayHost` (mount point — REQUIRED ancestor for any tooltip/menu/dialog), `OverlayPortal`, `OverlayLayer`
**Editor shell:** EditorShell · SlidesEditorTemplate · EditorToolbar · EditorNavigator · SlidesNavigator · NavigatorHeader · SlideThumb/SlideList · AppNavigationRail/NavigationRailItem
**Comments:** CommentComposer · CommentItem · CommentThreadWindow
**Dialog parts:** DialogRow · DialogHeader/Body/Footer · DialogHeaderCell
