<!--
Source: Figma "Notifications Guidelines" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2028:111193
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2028:111196, 2028:111200, 2028:111205, 2028:111224
Note: get_design_context for frames 2028:111200 (editor-in-context) and 2028:111224 (truncation) initially hit the Figma MCP rate limit; both have since been re-fetched and their verbatim prose / structure captured in full (Section 4 heading "Truncation" + description, truncation specimen Message/CTA strings, and Section 2 editor.template detail). Remaining `[Deferred: render — …]` markers are deliberate: they defer the rendered/screenshot visual of component-dependent specimens, not text capture.
-->

# Notifications — Guidelines (1:1 Figma import)

Page frame: `2028:111193` "Notifications Guidelines" (1280 × 1638). Contains a `_Status` instance bar (`2359:115666`) and a content frame "Frame 3" (`2028:111195`) holding four `_Section/Component` sections.

Doc text styles present across the page:
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `body/body.medium`: family `body/medium/fontFamily`, Medium, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5
- `body/body.medium.strong`: family `body/medium/strong/fontFamily`, Semi Bold, size `body/medium/strong/fontSize`, weight `body/medium/strong/fontWeight`, lineHeight `body/medium/strong/lineHeight`, letterSpacing 0.5
- `_Legacy/LEGACY - HUD shadow`: DROP_SHADOW #00000033 offset (0,5) radius 17 spread 0; DROP_SHADOW #00000026 offset (0,2) radius 7 spread 0

---

## Section 1 — Component intro / Definition

Node: `2028:111196` (`_Section/Component`, 1280 × 152)

### Heading + description

Component Name (`2028:111198`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Notifications

Description (`2028:111199`, Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 467px), verbatim:

> Heads-up-display notifications alerts the user about changes to conditions and provides some choices to the user.

The Description frame (`2028:111197`) stacks Component Name + Description with 24px gap, offset 64px from left.

---

## Section 2 — Notifications in context (editor template)

Node: `2028:111200` (`_Section/Component`, 1280 × 482)

A "Stuff" frame (`2028:111202`, 1152 × 480, bg `--color-bg-tertiary` #e6e6e6, radius 13px, overflow clipped) embeds the full editor demo `editor.template` (`2658:63588`, 1280 × 720, positioned at -170/-273 so the editor crops into view) plus a single live Notifications instance (`2028:111204`, 292 × 56) placed at x784/y382 over the editor canvas — showing a notification floating in-context above the editor surface. That in-context instance is the `variant="Multi"`, `prop2Button=true` Notifications (message "Message can span across multiple lines. Try to keep it short.", CTAs "Action" + "Dismiss").

The embedded `editor.template` (`2658:63588`) is the editor chrome specimen, containing:
- `_editor.toolbar` (`2658:67811`, 1280 × 48): Left Hand Title (`2658:67824`) with back/sidebar icons and a File Name breadcrumb ("Drafts" `2658:67828` / "Untitled" `2658:67832` + chevron); Right Hand Side (`2658:67812`) with audio icon, Avatar ("A" `2658:67866`, green #14ae5c), a "Share" Button (`2658:67892`), and a Controls cluster (`2658:67816`: play, a `.Dropdown` reading "100%" `2658:67953`, view settings).
- Help "?" affordance (`2658:68075`, bottom-right).
- Layer HUD (`2658:68170`, 240 × 132): sidebar rows — `_sidebar.row.layer` "Cart" (`2658:68193`), `_sidebar.row.child` "Footer" (`2658:68243`), `_sidebar.row.child` "Button / Active" (`2658:68312`, selected, #8638e5 text on #e5f4ff highlight), and `Sidebar row simple` "Row text" (`2658:68438`) — with frame/instance icons and a layer state-icons cluster (`2658:68358`: lock.unlocked + visible).
- Design toolbelt (`2658:68691`, centered bottom): a Tools group (`2658:68692`) of seven `_Toolbelt button` instances — the first four are chevron split-buttons (`2658:68725` with a #0d99ff active primary segment, then `2658:68799`, `2658:68868`, `2658:68960`), followed by three plain icon buttons (`2658:69123`, `2658:69193`, `2658:69226`) — plus a `_Toolbelt mode toggle` (`2658:69275`, 65px, left border #e6e6e6) containing a Switch (`2658:69276`) whose Knob carries `icon.24.dev` (`2658:69297`).
- `editor` canvas (`2658:69325`, 1110 × 447, at left 170/top 273): an image fill (`imgEditor`), object-cover, pointer-events none.

`[Deferred: render — ref node 2658:63588 (editor.template) + instance 2028:111204 (Notifications)]` — this section is a contextual render of the Notifications component floating over the editor chrome (rendered visual deferred); the editor template is a separate composed specimen. The Notifications component itself is fully captured in Section 3 below; the in-context instance's variant/strings are noted above.

---

## Section 3 — Types (states matrix, Light & Dark)

Node: `2028:111205` (`_Section/Component`, 1280 × 373)

### Heading + description

Component Name (`2028:111207`, Whyte Regular 18px, color rgba(0,0,0,0.9), tracking 0.18px, width 320px):

> Types

Description (`2028:111208`, Whyte Book 13px, color rgba(0,0,0,0.8), tracking 0.13px, lineHeight 22px, width 320px), verbatim (multi-paragraph, blank lines preserved as `​`):

> Heads-up-display notifications alerts the user about changes to conditions and provides some choices to the user.
>
> For example, if there's a new version of a component available, or if the request for duplicating a file completed.
>
> These notifications stay around on the screen until the user takes an action on it (i.e. they are persistent.) For instance, asking the user what they want to do with component updates: Review or Dismiss.

### Light / Dark context (`2028:111209`, 704px wide)

Two panels side by side: **Light** (`2028:111210`, bg #f5f5f5, 1px rgba(0,0,0,0.1) border) labeled "LIGHT MODE" (`2028:111211`, Whyte Book 13px, rgba(0,0,0,0.3)), and **Dark** (`2028:111217`, bg #2c2c2c) labeled "DARK MODE" (`2028:111218`, Whyte Book 13px, rgba(255,255,255,0.3)).

Each panel contains a Notifications stack (light `2028:111212` / dark `2028:111219`) — a vertical column, gap 8px, of four Notifications instances.

**The 4 specimens (light `2028:111213`–`2028:111216` / dark `2028:111220`–`2028:111223`), in order top→bottom:**

| # | variant | prop2Button | Message text | Actions | Light node / Dark node |
|---|---------|-------------|--------------|---------|------------------------|
| 1 | Single | false | "Short descriptive message" | Action | `2028:111213` / `2028:111220` |
| 2 | Single | **true** | "Short descriptive message" | Action + Dismiss | `2028:111214` / `2028:111221` |
| 3 | Multi | false | "Message can span across multiple lines. Try to keep it short." | Action | `2028:111215` / `2028:111222` |
| 4 | Multi | **true** | "Message can span across multiple lines. Try to keep it short." | Action + Dismiss | `2028:111216` / `2028:111223` |

### Notifications component — variant axes (from component definition embedded in this frame)

`NotificationsProps`:
- `variant`: `"Multi" | "Single"` (default `"Single"`) — controls message line allowance (Single = short one-liner; Multi = multi-line message)
- `prop2Button`: boolean (default `false`) — when true, adds a second stacked CTA ("Dismiss") below the first ("Action"), separated by a horizontal separator

### Token / value capture (component styling — token-driven, captured)

Container (`Notifications`, 292 × 56 / h-56px):
- Background: `--color-bg-menu` (fallback #1e1e1e)
- Radius: `--radius-medium` (fallback 0.3125rem / 5px)
- Left padding: `--spacer-2` (0.5rem / 8px)
- Drop shadow: `0px 2px 3.5px rgba(0,0,0,0.15), 0px 5px 8.5px rgba(0,0,0,0.2)` (HUD shadow)
- Layout: row, items center; Content region + vertical Separator + Actions region.

Content region (`Content`, width 212px): row, gap `--spacer-1` (0.3rem / 4px), right padding `--spacer-1`. Holds:
- `icon.24.component.small` (24px box; Primary Fill glyph 13.964px at offset 5.02/5.02) — `imgPrimaryFill` asset.
- Message text (width 176px): `body/medium` (Inter Medium, `body/medium/fontSize` 11px, weight 450, lineHeight 16px, tracking 0.055px), color `--color-text-menu` (fallback white), overflow hidden + ellipsis.

Separator between Content and Actions: 1px line, rotated 90° (vertical), `imgSeparator` asset.

Actions region (`Actions`, width 72px): column, items center, justify end. Each CTA:
- CTA (`CTA`): row, flex 1, justify end, horizontal padding `--spacer-2` (8px).
- CTA label (width 56px): `body/medium/strong` (Inter Semi Bold, `body/medium/strong/fontSize` 11px, weight 550, lineHeight 16px, tracking 0.055px), color `--color-text-menu` (white), text center, overflow hidden + ellipsis.
- First CTA label: **"Action"**. When `prop2Button`, a horizontal Separator (`imgSeparator1`) + second CTA label **"Dismiss"** are appended.

Message strings used by the component:
- Single: "Short descriptive message"
- Multi: "Message can span across multiple lines. Try to keep it short."

Image assets (Figma MCP, 7-day expiry):
- `imgPrimaryFill`: https://www.figma.com/api/mcp/asset/66fd46f9-d160-484e-8c81-a93e36151e8c
- `imgSeparator`: https://www.figma.com/api/mcp/asset/d328ea8d-aef0-406c-8d28-c4de71288d2b
- `imgSeparator1`: https://www.figma.com/api/mcp/asset/7d91289b-2cb1-4c5b-acf2-c9aca27ef505

`[Deferred: render — ref nodes 2028:111212 (light stack), 2028:111219 (dark stack)]` — component-dependent specimen layout (4-instance Notifications column). Token/variant data above captured non-deferred.

---

## Section 4 — Truncation

Node: `2028:111224` (`_Section/Component`, 1280 × 247)

### Heading + description

Component Name (`2028:111226`, text node, Whyte Regular 18px, color rgba(0,0,0,0.9), tracking 0.18px, lineHeight 32px, width 320px), verbatim:

> Truncation

Description (`2028:111227`, text node, Whyte Book 13px, color rgba(0,0,0,0.6), tracking 0.13px, lineHeight 22px, width 320px, height 88px), verbatim:

> In the event content gets too long, the text will truncate. The width and heights of the notification bars are fixed to limit the amount of real estate it occupies so the user can focus on the canvas.

### Light / Dark context (`2028:111228`, 704px wide)

Two panels: **Light** (`2028:111229`) labeled "LIGHT MODE" (`2028:111230`) and **Dark** (`2028:111242`) labeled "DARK MODE" (`2028:111243`). Each holds a single Truncation specimen (light `2028:111231` / dark `2028:111244`, 278 × 48) demonstrating message + action truncation.

Each Truncation specimen (from metadata structure):
- `Content` (`2028:111232` / `2028:111245`, 216 × 48): `icon.24.component.small` instance (`2028:111233` / `2028:111246`, 24px, at y12) + `Message` text (`2028:111234` / `2028:111247`, 184 × 32, at x28/y8) — message constrained to a width that forces truncation. Message text (`body/medium`, overflow hidden + ellipsis), verbatim: "Long messages that span more than two lines are truncated with..." (the trailing "..." is part of the literal string in the source, demonstrating the truncated state).
- Vertical `Separator` line (`2028:111235` / `2028:111248`, ~0px wide × 48px) between Content and Actions.
- `Actions` (`2028:111236` / `2028:111249`, 58 × 48): two stacked CTAs split by a horizontal `Separator` (`2028:111239` / `2028:111252`):
  - CTA 1 (`2028:111237` / `2028:111250`, 51 × 24) — CTA label (`2028:111238` / `2028:111251`, 35 × 16, at x8/y4), `body/medium/strong`, overflow hidden + ellipsis, verbatim: "Truncation".
  - CTA 2 (`2028:111240` / `2028:111253`, 58 × 24) — CTA label (`2028:111241` / `2028:111254`, 42 × 16, at x8/y4), `body/medium/strong`, overflow hidden + ellipsis, verbatim: "Cation". [Captured verbatim from source — likely a truncated "Caption"/"Action"; preserved as-is.]

This section reuses the same Notifications component structure (Content / Separator / Actions / stacked CTAs) as Section 3, here demonstrating how an over-long message and CTA labels truncate within the fixed component widths (Message 184px, CTA labels overflow-hidden + ellipsis).

`[Deferred: render — ref nodes 2028:111231 (light), 2028:111244 (dark)]` — component-dependent truncation specimen (rendered visual deferred). Structure and exact text strings (Message + both CTA labels) now captured above.

Truncation specimen token/value notes (captured): container `Notifications` 278 × 48px, bg `--color-bg-menu` (#1e1e1e), 0.5px border `--color-border-menu` (#383838), radius `--radius-medium` (5px), left padding `--spacer-1` (4px), HUD drop shadow `0px 2px 3.5px rgba(0,0,0,0.15), 0px 5px 8.5px rgba(0,0,0,0.2)`. Light panel places the specimen at left 36px / top 99px; dark panel at left 37px / top 100px. Image assets (Figma MCP, 7-day expiry): light `imgPrimaryFill` https://www.figma.com/api/mcp/asset/39732b76-dcba-41a0-a724-46fed588c780, dark `imgPrimaryFill1` https://www.figma.com/api/mcp/asset/28e1f537-bb3a-4286-ae91-3ba26d6573ba; separators `imgSeparator` https://www.figma.com/api/mcp/asset/de3fdd23-83dd-498c-82c4-7b4c7c472b1d, `imgSeparator1` https://www.figma.com/api/mcp/asset/cc752583-062b-48f5-afe1-fc2c15cb7dcf.

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → fallback where observed):

- `--color-bg-menu`: #1e1e1e — notification container background
- `--color-text-menu`: white — notification message + CTA text

Non-token color literals observed (panel chrome, not component tokens):
- Light panel bg: #f5f5f5; border rgba(0,0,0,0.1)
- Dark panel bg: #2c2c2c
- "LIGHT MODE" label: rgba(0,0,0,0.3); "DARK MODE" label: rgba(255,255,255,0.3)
- Section heading: rgba(0,0,0,0.9); Section 1 description: rgba(0,0,0,0.6); Section 3 description: rgba(0,0,0,0.8)

Dimension/radius/spacing tokens:
- `--spacer-1`: 0.3rem (4px) — Content gap + right padding
- `--spacer-2`: 0.5rem (8px) — container left padding, CTA horizontal padding, light/dark stack gap
- `--radius-medium`: 0.3125rem (5px) — notification container radius
- Container: 292 × 56px; Content region: 212px wide; Message: 176px wide; Actions region: 72px wide; CTA label: 56px wide
- HUD drop shadow: 0px 2px 3.5px rgba(0,0,0,0.15), 0px 5px 8.5px rgba(0,0,0,0.2)

Typography tokens:
- `body/medium`: `body/medium/fontFamily` (Inter Medium), `body/medium/fontSize` (11px), weight `body/medium/fontWeight` (450), lineHeight `body/medium/lineHeight` (16px), tracking 0.055px — message text
- `body/medium/strong`: `body/medium/strong/fontFamily` (Inter Semi Bold), `body/medium/strong/fontSize` (11px), weight 550, lineHeight 16px, tracking 0.055px — CTA labels
