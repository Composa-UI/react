<!--
Source: Figma "Buttons" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2012:46721
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2012:47604 (Button Default Guidelines), 2012:47920 (Button Large Guidelines), 2012:48139 (Wide Button Guidelines), 2012:48341 (Icon Button Guidelines)
Also present on page (not guideline docs): 1025196:6217 (Labels), 2324:46856 / 2324:46817 / 2324:46776 / 2324:46757 (component spec frames), 2012:48557 / 1027276:19226 (Button)
-->

# Buttons — Guidelines (1:1 Figma import)

Page: `2012:46721` "Buttons". This page contains four guideline doc frames plus several component/spec frames and a "Labels" frame.

Top-level frames on the page (`get_metadata` on `2012:46721`):

| Node id | Name | Size (w×h) |
| --- | --- | --- |
| `1025196:6217` | Labels | 1496×1310 |
| `2012:48341` | Icon Button Guidelines | 1280×2488 |
| `2012:48139` | Wide Button Guidelines | 1280×1656 |
| `2012:47920` | Button Large Guidelines | 1280×3640 |
| `2012:47604` | Button Default Guidelines | 1280×5080 |
| `2324:46856` | Button icon split | 471×104 |
| `2324:46817` | Button icon dialog toggle | 416×96 |
| `2324:46776` | Button icon toggle | 816×56 |
| `2324:46757` | Button icon | 384×64 |
| `2012:48557` | Button | 1728×1261 |
| `1027276:19226` | Button | 60×32 |

Each guideline frame begins with a `_Status` instance bar and a content frame "Frame 3" holding the `_Section/Component` sections.

`_Status` bar (e.g. `2359:63829`) — a doc-status banner, height 64px, reads (verbatim, uppercase): **UI3**, with a hairline divider beneath (`rgba(0,0,0,0.1)`, opacity 32%).

Doc text styles present across the page:
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `_doc/body/body.medium`: family `body/medium/fontFamily`, Medium, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5

Section heading text (the "Component Name" node) renders in Whyte Regular **36px**, color `rgba(0,0,0,0.9)`, tracking 0.36px for top-level intro headings, and Whyte Regular **18px**, color `rgba(0,0,0,0.9)`, for per-style section headings. Section description prose renders in Whyte Book **13px**, color `rgba(0,0,0,0.6)`, lineHeight 22px. Intro-section descriptions use Whyte Regular **18px**, color `rgba(0,0,0,0.6)`.

Recurring specimen conventions (apply to every per-style section below unless noted):
- Each section's specimen sits in a **Light / Dark Context** frame (offset to right, width 704px) split into a **Light** panel (white bg, 1px `rgba(0,0,0,0.1)` border, label "LIGHT MODE") and a **Dark** panel (bg `--color-bg` #2c2c2c, label "DARK MODE"), each 352px wide. Panel labels are Whyte Book 13px.
- State rows are annotated with `_Label/Redline/State-Left` redline chips. Chips use `--color-bg-assistive-tertiary` (#ffe0fc light / #68275e dark) with text `--color-text-assistive` (#ea10ac light / #fc9ce0 dark), 11px Inter Medium.
- Buttons are the design-system `Button` instance. Default/most sections: text-only column at left, icon+text column at right (leading `icon.24.star.small`, 24px). Default button height **24px**; radius `--radius-medium` (0.3125rem / 5px); label font token `body/medium` (Inter Medium, 11px, lineHeight 16px, weight 450, tracking 0.055px). Padding via spacer tokens `--spacer-0` (0px) / `--spacer-1` (4px) / `--spacer-2` (8px) / `--spacer-3` (16px).
- Brand fill colors shift between light and dark themes (e.g. brand `#0d99ff` light / `#0c8ce9` dark). Token names below; light/dark hex values noted where observed.

---

# Frame: Button Default Guidelines

Frame `2012:47604` (1280×5080) → `_Status` `2359:63829` + "Frame 3" `2012:47606` (1280×4888) holding 11 `_Section/Component` frames.

## Intro / Definition `node 2012:47607`

### Button, Default

> Buttons let users initiate an action, acknowledge something, make a choice, or navigate. By default, our buttons are 24px tall, come in two styles (primary and secondary), and can optionally include an icon.

(Heading `2012:47609` "Button, Default", Whyte Regular 36px; description `2012:47610`, Whyte Regular 18px, width 412px.)

## Primary Button `node 2012:47611`

> The primary action in a view, like “Share”. When used in a dialog for navigation, we use terms like “Next”, “Done”, and “Got it”.

**Specimen (Light + Dark redline grid):** 2-column matrix — text-only buttons (left, at left-138) and icon+text buttons (right, at left-217) — over 4 rows. Redline STATE LABELS (top→bottom): **Rest**, **Active**, **Focus**, **Disabled**. The text-only Rest/primary button carries a `⏎` enter glyph in `--color-text-onbrand-secondary` (rgba(255,255,255,0.8)).
- Rest fill `--color-bg-brand` (#0d99ff light / #0c8ce9 dark).
- Active/pressed fill `--color-bg-brand-pressed` (#007be5 light / #0a6dc2 dark).
- Focus = `--color-border-selected` outline (#0d99ff light / #0c8ce9 dark) over a `--color-bg-brand` fill, with an inset 2px white ring.
- Disabled fill `--color-bg-disabled` (#d9d9d9 light / #757575 dark), text `--color-text-ondisabled` (white light / #2c2c2c dark).
- Text `--color-text-onbrand` (white). Radius `--radius-medium` (5px). Font `body/medium`.

## (Theme-hue note) `node 2012:47646`

(No "Component Name" heading — description prose only.)

> Note that these primary buttons might not always be blue, since they will automatically shift hue based on the theme color of the current product.

**Specimen (Light + Dark redline grid):** 2-column matrix pairing **Brand** (blue) and **FigJam** (purple) rows. Row 1: text-only Brand button (with `⏎` glyph) + icon+text Brand button. Row 2: text-only FigJam button + icon+text FigJam button. Redline STATE LABELS (top→bottom): **Default**, **FigJam**.
- Brand fill `--color-bg-brand` (#0d99ff light / #0c8ce9 dark); text `--color-text-onbrand` (white).
- FigJam fill `--color-bg-figjam` (#9747ff light / #8a38f5 dark); text `--color-text-onfigjam` (white).

## Secondary Button `node 2012:47668`

> When we have an action that isn’t critical, or paired with a primary button (like a “Skip” or “Cancel” button), we use this outline style.

**Specimen (Light + Dark redline grid):** 2-column matrix (text-only left, icon+text right), 4 rows. Redline STATE LABELS (top→bottom): **Rest**, **Active**, **Focus**, **Disabled**.
- Rest = transparent/outline; border `--color-bordertranslucent` (rgba(0,0,0,0.1) light / rgba(255,255,255,0.1) dark); text `--color-text` (rgba(0,0,0,0.9) light / white dark).
- Active fill `--color-bg-pressed` (#f5f5f5 light / #383838 dark).
- Focus = `--color-border-selected` (#0d99ff light / #0c8ce9 dark).
- Disabled = border `--color-border-disabled` (#e6e6e6 light / #444 dark) with `--color-text-disabled`.
- Radius `--radius-medium` (5px). Font `body/medium`.

## FigJam Button `node 2012:47703`

> When a button opens in FigJam, or refers to a concept that is specific to FigJam (like “Try it out” in FigJam), we should use a purple themed button.

**Specimen (Light + Dark redline grid):** 2-column matrix (text-only left, icon+text right), 4 rows. Redline STATE LABELS (top→bottom): **Rest**, **Active**, **Focus**, **Disabled**.
- Rest fill `--color-bg-figjam` (#9747ff light / #8a38f5 dark).
- Active fill `--color-bg-figjam-pressed` (#8638e5 light / #7a2ed6 dark).
- Focus = `--color-border-selected` outline (#0d99ff light / #0c8ce9 dark) over the FigJam-purple fill, inset 2px white ring.
- Disabled fill `--color-bg-disabled` (#d9d9d9 light / #757575 dark) with `--color-text-ondisabled` (white light / #2c2c2c dark).
- Text `--color-text-onfigjam` (white). Radius `--radius-medium` (5px). Font `body/medium`.

## Destructive Button `node 2012:47738`

> Whenever an action is destructive / dangerous (like “Delete”), we use a red fill to indicate to users that they need to be careful.

**Specimen (Light + Dark redline grid):** 2-column matrix (text-only left, icon+text right), 4 rows. Redline STATE LABELS (top→bottom): **Rest**, **Active**, **Focus**, **Disabled**.
- Rest fill `--color-bg-danger` (#f24822 light / #e03e1a dark).
- Active fill `--color-bg-danger-pressed` (#dc3412 light / #c4381c dark).
- Focus = `--color-border-selected` outline (#0d99ff light / #0c8ce9 dark) over the danger-red fill, inset 2px white ring.
- Disabled fill `--color-bg-disabled` (#d9d9d9 light / #757575 dark) with `--color-text-ondisabled` (white light / #2c2c2c dark).
- Text `--color-text-ondanger` (white). Radius `--radius-medium` (5px). Font `body/medium`.

## Secondary Destructive Button `node 2012:47773`

> When an action is destructive, but is the secondary action in a view (usually because it’s sitting next to a primary button), we fall back to using this secondary button style.

**Specimen (Light + Dark redline grid):** Single column of text-only buttons (no icon variant), 4 rows. Redline STATE LABELS (top→bottom): **Rest**, **Active**, **Focus**, **Disabled**.
- Rest = outline; border `--color-border-danger` (#ffc7c2 light / #963323 dark); text `--color-text-danger` (#dc3412 light / #fca397 dark).
- Active adds fill `--color-bg-pressed` (#f5f5f5 light / #383838 dark) over the danger border.
- Focus = `--color-border-selected` (#0d99ff light / #0c8ce9 dark) with danger text.
- Disabled = border `--color-border-disabled` (#e6e6e6 light / #444 dark) with `--color-text-disabled`.
- Radius `--radius-medium` (5px). Font `body/medium`.

## Inverse Button `node 2012:47800`

> We sometimes have buttons that flip between an *on* and an *off* state, like a button that flips between “Install” and “Installed”.
>
> For these cases, we use a secondary button in the *off* state, and an inverse button in the *on* state.

(Source note: "on" / "off" render in Whyte Book *Italic*.)

**Specimen (Light + Dark redline grid):** Single column of icon+text buttons, only 3 rows (no Active state shown). Redline STATE LABELS (top→bottom): **Rest**, **Focus**, **Disabled**.
- Rest fill `--color-bg-inverse` (#2c2c2c light / white dark).
- Focus = `--color-border-selected` outline (#0d99ff light / #0c8ce9 dark) over the inverse fill, inset 2px white ring.
- Disabled fill `--color-bg-disabled` (#d9d9d9 light / #757575 dark).
- Text `--color-text-oninverse` (rgba(255,255,255,0.9) light / rgba(0,0,0,0.9) dark) and `--color-text-ondisabled` (white light / #2c2c2c dark). Radius `--radius-medium` (5px). Font `body/medium`.

## Sign Up Button `node 2012:47823`

> For users who are logged out, we use a green indicator to highlight buttons to “Sign up”.

**Specimen (Light + Dark redline grid):** Single column of text-only buttons (no icon variant), 4 rows. Redline STATE LABELS (top→bottom): **Rest**, **Active**, **Focus**, **Disabled**.
- Rest fill `--color-bg-success` (#14ae5c light / #198f51 dark).
- Active fill `--color-bg-success-pressed` (#009951 light / #078348 dark).
- Focus = `--color-border-selected` outline (#0d99ff light / #0c8ce9 dark) over the success-green fill, inset 2px white ring.
- Disabled fill `--color-bg-disabled` (#d9d9d9 light / #757575 dark) with `--color-text-ondisabled` (white light / #2c2c2c dark).
- Text `--color-text-onbrand` (white). Radius `--radius-medium` (5px). Font `body/medium`.

## Link Button `node 2012:47850`

> Sometimes we show buttons that visually look like links. The button has no visual background and the text is the brand color.

**Specimen (Light + Dark redline grid):** 2-column matrix (text-only left, icon+text right), 4 rows. Redline STATE LABELS (top→bottom): **Rest**, **Active**, **Focus**, **Disabled**. Text-only variant carries a `⏎` enter glyph.
- Rest = fully transparent (no background); text `--color-text-brand` (#007be5 light / #7cc4f8 dark).
- Active fill `--color-bg-brand-tertiary` (#e5f4ff light / #394360 dark) with brand text.
- Focus = `--color-border-selected` outline (#0d99ff light / #0c8ce9 dark) with brand text.
- Disabled = no fill (icon variant adds border `--color-border-disabled` #e6e6e6 light / #444 dark) with `--color-text-disabled`.
- Radius `--radius-medium` (5px). Font `body/medium`.

## Ghost Button `node 2012:47885`

> Occasionally, we’ll use ghost buttons to communicate buttons that need focus states in screen readers. They might look like links, but they function like buttons for accessibility.

**Specimen (Light + Dark redline grid):** 2-column matrix (text-only left, icon+text right), 4 rows. Redline STATE LABELS (top→bottom): **Rest**, **Active**, **Focus**, **Disabled**.
- Rest = fully transparent (no background); text `--color-text` (rgba(0,0,0,0.9) light / white dark).
- Active fill `--color-bgtransparent-secondary-pressed` (rgba(0,0,0,0.15) light / rgba(255,255,255,0.15) dark).
- Focus = `--color-border-selected` outline (#0d99ff light / #0c8ce9 dark).
- Disabled = no fill (icon variant adds border `--color-border-disabled` #e6e6e6 light / #444 dark) with `--color-text-disabled` (rgba(0,0,0,0.3) light / rgba(255,255,255,0.4) dark).
- Radius `--radius-medium` (5px). Font `body/medium`.

---

# Frame: Button Large Guidelines

Frame `2012:47920` (1280×3640) → `_Status` `2359:63859` + "Frame 3" `2012:47922` (1280×3448) holding 8 `_Section/Component` frames. These are the LARGE button size: **height 32px**, text-only padding `px-[12px]`, with-icon padding `pl-[--spacer-1] (4px) pr-[--spacer-2] (8px)`, vertical `py-[--spacer-1] (4px)`, radius `--radius-medium` (5px), label font token `body/medium`.

## Intro / Definition `node 2012:47923`

### Button, Large

> Large buttons are typically used in Growth and Community projects. Our large buttons are 32px tall, come in two styles (primary and secondary), and can optionally include an icon.

(Intro section — description block only, no Light/Dark Context. Heading Whyte Regular 36px; prose Whyte Regular 18px, width 412px.)

## Primary Button `node 2012:47927`

> The primary action in a Growth or Community view. These buttons are typically used to drive a very specific transactional behavior.. for example, “Buy”, “Subscribe”, or “Open in Figma”.

**Specimen (Light + Dark redline grid):** Two columns of Large buttons per panel — left text-only ("Button"), right with leading `icon.24.star.small` (24px). Redline STATE LABELS (top→bottom): **Rest**, **Active**, **Focus**, **Disabled**.
- Rest/default fill `--color-bg-brand` (#0d99ff light / #0c8ce9 dark); pressed `--color-bg-brand-pressed` (#007be5 light / #0a6dc2 dark).
- Focus = `--color-border-selected` (#0d99ff light / #0c8ce9 dark) with 2px inset shadow ring (white / #2c2c2c).
- Disabled `--color-bg-disabled` (#d9d9d9 light / #757575 dark) with `--color-text-ondisabled`.
- Text `--color-text-onbrand` (white).

## (Theme-hue note) `node 2012:47962`

> Note that these primary buttons might not always be blue, since they will automatically shift hue based on the theme color of the current product.

**Specimen (Light + Dark redline grid):** Reduced matrix — a **Default** (brand blue) row and a **FigJam** (purple) row per panel, each with a text-only Large button (left) and a with-icon Large button (right, `icon.24.star.small`). Redline STATE LABELS: **Default**, **FigJam**.
- Default fill `--color-bg-brand` (#0d99ff light / #0c8ce9 dark), text `--color-text-onbrand` (white).
- FigJam fill `--color-bg-figjam` (#9747ff light / #8a38f5 dark), text `--color-text-onfigjam` (white).

## Secondary Button `node 2012:47984`

> When we have an action that isn’t critical, or paired with a primary button (like a “Skip” or “Cancel” button), we use this outline style. In growth and community cases, this can say things like ‘Start trial’ or ‘Get free preview’.

(Source note: the Description block has a trailing blank paragraph after the prose.)

**Specimen (Light + Dark redline grid):** Two columns per panel — left text-only, right with leading `icon.24.star.small` (24px). Redline STATE LABELS (top→bottom): **Rest**, **Active**, **Focus**, **Disabled**.
- Rest = transparent with border `--color-bordertranslucent` (rgba(0,0,0,0.1) light / rgba(255,255,255,0.1) dark); text `--color-text` (rgba(0,0,0,0.9) light / white dark).
- Active fill `--color-bg-pressed` (#f5f5f5 light / #383838 dark) over the translucent border.
- Focus = `--color-border-selected` (#0d99ff light / #0c8ce9 dark).
- Disabled fill `--color-bg-disabled` (#d9d9d9 light / #757575 dark) with `--color-text-ondisabled`.

## FigJam Button `node 2012:48019`

> When a button opens in FigJam, or refers to a concept that is specific to FigJam (like “Try it out” in FigJam), we should use a purple themed button.

**Specimen (Light + Dark redline grid):** Two columns per panel — left text-only, right with leading `icon.24.star.small` (24px) — all purple FigJam-themed Large buttons. Redline STATE LABELS (top→bottom): **Rest**, **Active**, **Focus**, **Disabled**.
- Rest fill `--color-bg-figjam` (#9747ff light / #8a38f5 dark); pressed `--color-bg-figjam-pressed` (#8638e5 light / #7a2ed6 dark).
- Focus = `--color-border-selected` (#0d99ff light / #0c8ce9 dark) over a `--color-bg-figjam` fill with 2px inset ring (white / #2c2c2c).
- Disabled `--color-bg-disabled` (#d9d9d9 light / #757575 dark).
- Text `--color-text-onfigjam` (white) / `--color-text-ondisabled`.

## Destructive Button `node 2012:48054`

> Whenever an action is destructive / dangerous (like “Delete”), we use a red fill to indicate to users that they need to be careful.

**Specimen (Light + Dark redline grid):** Two columns per panel — left text-only, right with leading `icon.24.star.small` (24px) — red-filled Large buttons. Redline STATE LABELS (top→bottom): **Rest**, **Active**, **Focus**, **Disabled**.
- Rest fill `--color-bg-danger` (#f24822 light / #e03e1a dark); pressed `--color-bg-danger-pressed` (#dc3412 light / #c4381c dark).
- Focus = `--color-border-selected` (#0d99ff / #0c8ce9) over a `--color-bg-danger` fill with 2px inset ring (white / #2c2c2c).
- Disabled `--color-bg-disabled` (#d9d9d9 / #757575).
- Text `--color-text-ondanger` (white) / `--color-text-ondisabled`.

## Secondary Destructive Button `node 2012:48089`

> When an action is destructive, but is the secondary action in a view (usually because it’s sitting next to a primary button), we fall back to using this secondary button style.

**Specimen (Light + Dark redline grid):** Single column of text-only Large buttons per panel (no with-icon column). Redline STATE LABELS (top→bottom): **Rest**, **Active**, **Focus**, **Disabled**.
- Rest = transparent with border `--color-border-danger` (#ffc7c2 light / #963323 dark); text `--color-text-danger` (#dc3412 light / #fca397 dark).
- Active adds fill `--color-bg-pressed` (#f5f5f5 light / #383838 dark) with the danger border.
- Focus = `--color-border-selected` (#0d99ff / #0c8ce9).
- Disabled = border `--color-border-disabled` (#e6e6e6 light / #444 dark) with text `--color-text-disabled` (rgba(0,0,0,0.3) light / rgba(255,255,255,0.4) dark).

## Inverse Button `node 2012:48116`

> We sometimes have buttons that flip between an *on* and an *off* state, like a button that flips between “Install” and “Installed”.
>
> For these cases, we use a secondary button in the *off* state, and an inverse button in the *on* state.

(Source note: "on" / "off" set in Whyte Book *Italic*; a blank paragraph separates the two prose paragraphs.)

**Specimen (Light + Dark redline grid):** Single column of with-icon Large buttons per panel (leading `icon.24.star.small`, 24px, + "Button" label). Only 3 rows. Redline STATE LABELS (top→bottom): **Rest**, **Focus**, **Disabled** (no Active row).
- Rest fill `--color-bg-inverse` (#2c2c2c light / white dark); text `--color-text-oninverse` (rgba(255,255,255,0.9) light / rgba(0,0,0,0.9) dark).
- Focus = `--color-border-selected` (#0d99ff / #0c8ce9) over a `--color-bg-inverse` fill with 2px inset white ring.
- Disabled fill `--color-bg-disabled` (#d9d9d9 / #757575) with `--color-text-ondisabled`.

---

# Frame: Wide Button Guidelines

Frame `2012:48139` (1280×1656) → `_Status` `2359:63839` + "Frame 3" `2012:48141` (1280×1464) holding 4 `_Section/Component` frames. Wide buttons fill the available width; specimens live inside a 240px narrow grid cell (`_property/grid/dualinputoptionallabel.narrow`) with content width 208px, padded `--spacer-3` (16px) sides + `--spacer-1` (4px) top/bottom. The 16px side margins are annotated with **Measurement redlines reading "16"** (`_Label/Redline/Horizontal Bar` + `_Label/Redline/Text`; bg `--color-bg-measure` #f24822 light / #e03e1a dark, text `--color-text-onmeasure` white, measure-strong bar #dc3412 light / #fca397 dark). Button height 24px.

## Intro / Definition `node 2012:48142`

### Wide Sidebar Button

> When placing a button in a sidebar (like in our design editor), we typically use a wider button that fills the width of the sidebar, with 16px margin on each side.

(Intro section — description block only, no Light/Dark Context. Heading Whyte Regular 36px; prose Whyte Regular 18px.)

## Wide Primary Button `node 2012:48146`

> If the action is the primary action in the view, we should use a wider primary button instead.

**Specimen (Light + Dark redline grid):** Each Drop Zone (dashed `--color-border`) holds three stacked full-width primary buttons: text-only ("Button"), with-icon (`icon.24.star.small` + label), and a third with-icon variant. Button fill `--color-bg-brand` (#0d99ff light / #0c8ce9 dark), text `--color-text-onbrand` (white), radius `--radius-medium` (5px), label `body/medium`. Side margins annotated with "16" / "16" measurement redlines. Full-width: the 208px button fills the content area within the 240px cell, 16px margins each side.

## Wide Secondary Button `node 2012:48211`

> Most of the time, these actions aren’t the primary next step in the views, so we usually use secondary buttons here.

**Specimen (Light + Dark redline grid):** Each Drop Zone holds three stacked full-width secondary buttons: text-only ("Button"), with-icon (`icon.24.star.small` + label; one instance carries a drop shadow `0px 4px 4px rgba(0,0,0,0.25)`), and a second with-icon variant. Transparent fill with 1px solid border `--color-bordertranslucent` (rgba(0,0,0,0.1) light / rgba(255,255,255,0.1) dark); text `--color-text` (rgba(0,0,0,0.9) light / white dark); radius `--radius-medium` (5px); label `body/medium`. Side margins annotated with "16" / "16" redlines. Full-width: 208px fills the content area, 16px margins each side.

## Wide Ghost Button `node 2012:48276`

> Occasionally, we use a wide ghost button if the desire is to not have a border or background.

**Specimen (Light + Dark redline grid):** Each Drop Zone holds three stacked full-width ghost buttons: text-only ("Button"), with-icon (`icon.24.star.small` + label), and a second with-icon variant. NO border and NO background (ghost); buttons flex-grow to fill (`flex-[1_0_0]`); text `--color-text` (rgba(0,0,0,0.9) light / white dark); radius `--radius-medium` (5px); label `body/medium`. Side margins annotated with "16" / "16" redlines. Full-width: ghost buttons stretch to fill the cell width, 16px margins each side.

---

# Frame: Icon Button Guidelines

Frame `2012:48341` (1280×2488) → `_Status` `2359:63849` + "Frame 3" `2012:48343` (1280×2296) holding 6 `_Section/Component` frames. Icon buttons are **icon-only** with a **24×24 click-target container**, radius `--radius-medium` (5px). State annotations use vertical `_Label/Redline/State-Left` chips and, for toggle sections, `_Label/Redline/State-Above` chips marking "Off" (left column) / "On" (right column) / "Toggled".

## Intro / Definition `node 2012:48344`

### Button Icon

> For icons that act as buttons, we use a 24x24 container to ensure that we have a consistent click target. In most cases, we should accompany icons with a corresponding tooltip.

(Intro section — description block only, no Light/Dark Context. Heading Whyte Regular 36px; prose Whyte Regular 18px.)

## Button Icon `node 2012:48349`

> Typically when we see a clickable icon, we apply a light grey hover state, and use a blue filled active state when a related panel is in view.

**Specimen (Light + Dark redline grid):** A column of icon-only `Button icon` instances (24×24 container; `icon.24.al.padding-sides`, 10px icon, rotated -90°). Redline STATE LABELS (top→bottom): **Rest**, **Focus**, **Hover**, **Disabled**.
- Rest = no fill.
- Focus = 1px solid border `--color-border-selected` (#0d99ff light / #0c8ce9 dark).
- Hover = fill `--color-bghovertransparent` (rgba(0,0,0,0.05) light / rgba(255,255,255,0.05) dark), cursor pointer.
- Disabled = no fill (dimmed icon).

## Button Icon (alternate-icon swap) `node 2012:48380`

(Note: description prose only — NO "Component Name" heading; the heading node is absent. Prose at `2012:48382`.)

> Occasionally, the icon button will switch to display an alternate icon variant. This feature is available in areas such as the Assets panel, particularly when you are searching for items and aiming to modify the information density.

**Specimen (Light + Dark redline grid):** TWO columns of icon-only `Button icon` instances side by side — left column `icon.24.list-view`, right column `icon.24.grid-view` (12px icons, 24×24 containers). Vertical STATE LABELS (top→bottom): **Rest**, **Focus**, **Hover**, **Disabled**; plus a single `_Label/Redline/State-Above` chip **Toggled** above the right (grid-view) column. State styling matches the prior section (Rest none / Focus `--color-border-selected` / Hover `--color-bghovertransparent` / Disabled dimmed).

## Button Icon, Toggle (fka Option Button) `node 2012:48422`

(Heading verbatim: "Button Icon, Toggle " with "(fka Option Button)" rendered in muted `rgba(0,0,0,0.5)`. Description has *on*/*off* in Whyte Book Italic and "option button" underlined.)

> When an icon has a toggleable state (where clicking on the icon flips between an *on* and an *off* state), we use an option button that includes a grey fill to indicate when the state is “on”.

**Specimen (Light + Dark redline grid):** Two columns of icon-only `Button icon toggle` instances — left column = "Off" state (`icon.24.link-broken`), right column = "On" state (`icon.24.link-connected`); 24×24 containers. Vertical STATE LABELS (top→bottom): **Rest**, **Focus**, **Hover**, **Disabled**; plus `_Label/Redline/State-Above` chips **Off** (left) and **On** (right). State styling: Rest none / Focus `--color-border-selected` (#0d99ff / #0c8ce9) / Hover `--color-bghovertransparent` (rgba(0,0,0,0.05) / rgba(255,255,255,0.05), rendered as `<button>`) / Disabled dimmed. (Note: the prose-described grey "on" fill is represented here via the connected-vs-broken link icon distinction rather than a separate fill swatch.)

## Button Icon, Dialog Toggle `node 2012:48467`

(Description: *on*/*off* in Whyte Book Italic, "option button" underlined.)

> When an icon has a toggleable state (where clicking on the icon flips between an *on* and an *off* state), we use an option button that includes a grey fill to indicate when the state is “on”.

**Specimen (Light + Dark redline grid):** Light/Dark Context offset (left 512px, height 352px). Two columns of icon-only `Button icon dialog toggle` instances, both `icon.24.styles` (12px icon, 24×24 container) — left column "Off" states, right column "On" states carrying the selected fills. Vertical STATE LABELS (top→bottom): **Rest**, **Focus**, **Hover**, **Disabled**; plus `_Label/Redline/State-Above` chips **Off** (left) / **On** (right).
- On-state per row: Rest fill `--color-bg-selected` (#e5f4ff light / #4a5878 dark); Focus = `--color-border-selected` (#0d99ff / #0c8ce9) over `--color-bg-selected`; Hover fill `--color-bg-selected-secondary` (#f2f9ff light / #394360 dark); Disabled fill `--color-bg-disabled` (#d9d9d9 light / #757575 dark).
- Off-column states follow the standard Rest / Focus (`--color-border-selected`) / Hover (`--color-bghovertransparent`) / Disabled pattern.

## Button Icon, Dialog Toggle w/ Stroke `node 2012:48512`

(Description is two paragraphs separated by a blank line; *on*/*off* in Whyte Book Italic, "option button" underlined.)

> When an icon has a toggleable state (where clicking on the icon flips between an *on* and an *off* state), we use an option button that includes a grey fill to indicate when the state is “on”.
>
> These are found in file browser and monetization surfaces, where the parent containers generally are larger and the button icons need a stroke to be grounded.

**Specimen (Light + Dark redline grid):** Light/Dark Context offset (left 512px, height 352px). Two columns of icon-only `Button icon dialog toggle` instances using `icon.24.styles` (12px icon, 24×24 container) — the **stroked** variant. Vertical STATE LABELS (top→bottom): **Rest**, **Focus**, **Hover**, **Disabled**; plus `_Label/Redline/State-Above` chips **Off** (left) / **On** (right).
- Off-column Rest and Disabled rows carry a 1px solid stroke `--color-bordertranslucent` (rgba(0,0,0,0.1) light / rgba(255,255,255,0.1) dark) to ground the icon; Focus = `--color-border-selected` border; Hover = `--color-bghovertransparent` (rgba(0,0,0,0.05) / rgba(255,255,255,0.05)).
- On-column (right) fills: Rest `--color-bg-selected` (#e5f4ff / #4a5878); Focus `--color-border-selected` border (#0d99ff / #0c8ce9) over selected fill; Hover `--color-bg-selected-secondary` (#f2f9ff / #394360); Disabled `--color-bg-disabled` (#d9d9d9 / #757575).

---

# Other page artifacts (not guideline docs)

These frames sit on the page but are component/spec artifacts rather than prose guideline sections. Captured here for completeness; render from the built component when needed.

- `1025196:6217` "Labels" (1496×1310) — a frame of `_Label/Directional-Text-Bold` redline-annotation label instances used to build the specimen redlines above. `[Deferred: render — ref node 1025196:6217]`
- `2324:46757` "Button icon" (384×64) — component spec frame. `[Deferred: render — ref node 2324:46757]`
- `2324:46776` "Button icon toggle" (816×56) — component spec frame. `[Deferred: render — ref node 2324:46776]`
- `2324:46817` "Button icon dialog toggle" (416×96) — component spec frame. `[Deferred: render — ref node 2324:46817]`
- `2324:46856` "Button icon split" (471×104) — component spec frame. `[Deferred: render — ref node 2324:46856]`
- `2012:48557` "Button" (1728×1261) — the master Button component / variant set. `[Deferred: render — ref node 2012:48557]`
- `1027276:19226` "Button" (60×32) — a single Button instance. `[Deferred: render — ref node 1027276:19226]`
