<!--
Source: Figma "Modals / Dialogs" guideline page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2028:91765
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2327:121785 (Modal Overview), 2327:121906 (Modal Attributes), 2327:122333 (Modal Templates)
Component definition frames on the page: 2327:122026 (Modal header), 2327:122060 (Modal footer), 2327:121997 (Modal body/Input), 2327:122194 (Modal body/Row), 2327:123068 (_Chit 24 plugin icon)
NOTE: Figma MCP rate limit was reached mid-capture. Template-instance specimen interiors are component-dependent and deferred (see below); all guideline prose, structure, node ids, and tokens were captured.
-->

# Modals / Dialogs — Guidelines (1:1 Figma import)

Entry node `2028:91765` is the canvas "Modals, Dialogs". It holds three guideline page-frames (each 1280 wide, each with a `_Status` instance bar + a "Frame 3" content frame of `_Section/Component` sections) plus standalone component-definition frames for the Modal sub-components.

The three guideline frames:
- `2327:121785` "Modal Overview Guidelines" (1280 × 2432)
- `2327:121906` "Modals Attributes Guidelines" (1280 × 1926)
- `2327:122333` "Modals Templates" (1280 × 3415)

Doc text styles present across the page:
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `_doc/body/body.medium`: family `body/medium/fontFamily`, Medium, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5
- `_doc/body/body.medium.strong`: family `body/medium/strong/fontFamily`, Semi Bold, letterSpacing 0.5
- `body (Deprecated)/medium`: Medium variant flagged "Deprecated" — still referenced by some specimen body text (anomaly, see below)

Modal-window elevation effect `light/elevation-500-modal-window`: four drop shadows — `#00000026 0 2 5 0`, `#0000002E 0 10 24 0`, `#00000014 0 0 0.5 0`, `#0000000D 0 3 12 0`.

---

# Frame A — Modal Overview Guidelines (`2327:121785`)

## Section 1 — Component intro / Definition

Node: `2327:121788` (`_Section/Component`, 1280 × 216)

### Heading + description

Component Name (`2327:121790`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Modal Overview

Description (`2327:121791`, Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 412px), verbatim:

> A modal places content over the page, preventing interaction with the underlying page until the user completes a task or dismisses it.

---

## Section 2 — Structure

Node: `2327:121792` (`_Section/Component`, 1280 × 442)

### Heading + description

Component Name (`2327:121794`, Whyte Regular 18px):

> Structure

Description (`2327:121795`, Whyte Book 13px; **Modal Header, Modal Content, and Modal Footer** set in Whyte Bold), verbatim:

> A modal contains three standardized pieces: **Modal Header, Modal Content, and Modal Footer**. When creating modals, make sure to use the appropriate Modal-specific components.
>
> The goal of this guidance is to be as minimally intrusive as possible, so you can focus on what's most important -- the content within the modal.

### Light context (`2327:121796`, 704px wide)

Single Light panel (`2327:121797`) containing one specimen: a `Templates/480 / Sharing` instance (`2726:30419`, sized 240 × 252 here).

`[Deferred: render — ref node 2726:30419 (Sharing template instance)]` — component-dependent specimen.

---

## Section 3 — Modal Header

Node: `2327:121815` (`_Section/Component`, 1280 × 442)

### Heading + description

Component Name (`2327:121817`, Whyte Regular 18px):

> Modal Header

Description (`2327:121818`, Whyte Book 13px; **Modal Header**, **Default, Tabs, and Navigation** in Whyte Bold), verbatim:

> **Modal Header** gives you ready-made controls so you can focus more on your content. Navigation controls are set up the way users usually expect them to be.
>
> There are three variants: **Default, Tabs, and Navigation**.
>
> Each respective variant contains necessary links, buttons, titles, navigation elements, and tabs that you might need. These are wired up to visibility props for easy fiddling from the properties panel.

### Light context (`2327:121819`, 704px wide)

- Drop Zone (`2327:121828`, 400 × 184) — a vertical stack of four `Modal header` instances (`2327:121829`–`2327:121832`, each 400 × 40, 8px gap), showing the header variants.
- One `Templates/480 / Sharing` instance (`2726:30895`, 480 × 504).

`[Deferred: render — ref nodes 2327:121828 (header stack), 2726:30895 (Sharing template)]` — component-dependent.

> Note (faithful capture): prose says "three variants" (Default, Tabs, Navigation) but the `Modal header` component definition (`2327:122026`) ships four symbols: Default, Navigation, Tabs, **Dropdown**. Preserved as-is; reconcile during clean-up.

---

## Section 4 — Modal Body

Node: `2327:121848` (`_Section/Component`, 1280 × 442)

### Heading + description

Component Name (`2327:121850`, Whyte Regular 18px):

> Modal Body

Description (`2327:121851`, Whyte Book 13px; **Modal Body**, **Inputs and Sharing**, **#design-ui3**, **Wayne Sun** in Whyte Bold), verbatim:

> **Modal Body** areas are more expressive and we're continuing to build usable, standardized controls for inputs and sharing.
>
> Thus far, we offer two types of components for Modal Content to address our various use cases:** Inputs and Sharing. **We're constantly growing this component set to make sure it fits your needs.
>
> We're constantly growing this component set! Please reach out in **#design-ui3** or message **Wayne Sun** for any needs.

### Light context (`2327:121852`, 704px wide)

Single Light panel (`2327:121853`) with one `Templates/480 / Sharing` instance (`2726:31993`, 480 × 504).

`[Deferred: render — ref node 2726:31993 (Sharing template)]` — component-dependent.

---

## Section 5 — Modal Footer

Node: `2327:121881` (`_Section/Component`, 1280 × 442)

### Heading + description

Component Name (`2327:121883`, Whyte Regular 18px):

> Modal Footer

Description (`2327:121884`, Whyte Book 13px; **Modal Footer**, **Action, Pagination, and Share Modal**, **#design-ui3**, **Wayne Sun** in Whyte Bold), verbatim:

> **Modal Footer** gives you ready-made controls so you can focus more on your content. Navigation controls are set up the way users usually expect them to be.
>
> There are three variants to address a variety of use cases: **Action, Pagination, and Share Modal**. In particular, Action contains visibility props that for steppers, helper text, checkboxes, or links.
>
> We're constantly growing this component set! Please reach out in **#design-ui3** or message **Wayne Sun** for any needs.

### Light context (`2327:121885`, 704px wide)

- Drop Zone (`2327:121894`, 634 × 232) — a vertical stack of five `Modal footer` instances (`2327:121895`–`2327:121899`, each 634 × 40, 8px gap), showing footer variants.
- "Embed" composition (`2327:121900`, 480 × 248): `Modal header` (`2327:121901`) + Content (`2327:121902`) wrapping a `Modal body/Input` instance (`2327:121904`, 448 × 136) + `Modal footer` (`2327:121905`).

`[Deferred: render — ref nodes 2327:121894 (footer stack), 2327:121900 (Embed composition)]` — component-dependent.

> Note (faithful capture): prose names footer variants "Action, Pagination, and Share Modal", but the `Modal footer` component definition (`2327:122060`) ships twelve symbols (see component inventory below). The named three are conceptual groupings, not the literal variant enum.

---

# Frame B — Modals Attributes Guidelines (`2327:121906`)

## Section 1 — Component intro / Definition

Node: `2327:121909` (`_Section/Component`, 1280 × 216)

### Heading + description

Component Name (`2327:121911`, Whyte Regular 36px):

> Modal Attributes

Description (`2327:121912`, Whyte Regular 18px, color rgba(0,0,0,0.6), width 412px), verbatim:

> A modal places content over the page, preventing interaction with the underlying page until the user completes a task or dismisses it.

---

## Section 2 — Z-Index, Scrims

Node: `2772:2949` (`_Section/Component`, 1280 × 442)

### Heading + description

Component Name (`2772:2951`, Whyte Regular 18px):

> Z-Index, Scrims

Description (`2772:2953`, Whyte Book 13px, color rgba(0,0,0,0.8), width 320px), verbatim:

> Our modals generally contain the modal itself, and a scrim which places content over a page on the z-index, preventing interactions with the underlying pages until a task is done.

Numbered rows (`2772:2954` "Rows"; index in Whyte Book 13px rgba(0,0,0,0.6), body indented 8px), verbatim:

1. special/modalbackdrop is the color token this should be applied consistently
2. Background content shouldn't be readable when a modal is triggered
3. Clicking on the scrim or the X dismisses the modal

### Light context (`2772:2963`, 704px wide, bg `--color-modalbackdrop` rgba(0,0,0,0.5))

The right panel is filled with the scrim color and centers a "Branch Review" modal (`2772:3032`, 715 × 447): a `--color-bg` white window, `--radius-large` corners, `light/elevation-500-modal-window` shadow, holding a "--- Content ---" area (`2772:3033`) with a scroll affordance (`2772:3034`, 4 × 70px pill, bg #e6e6e6, `--radius-full`) and a Bottom (`2772:3035`) carrying a `Modal footer` instance (`2772:3036`, `helperText` variant — text "Embed **Figma Filename** in your webpage").

`[Deferred: render — ref node 2772:3032 (Branch Review modal on scrim)]` — component-dependent; token data captured below.

---

## Section 3 — Sizing, Fixed

Node: `2327:121939` (`_Section/Component`, 1280 × 442)

### Heading + description

Component Name (`2327:121941`, Whyte Regular 18px):

> Sizing, Fixed

Description (`2327:121943`, Whyte Book 13px, color rgba(0,0,0,0.8)), verbatim:

> Our modals are offered in standard widths (240, 320, 480px) to play well with our 8px grid. The width of the modal depends on the depth of controls inside the content area.

Rows (`2327:121944`; index labels in color rgba(0,0,0,0.5)), verbatim:

| Width | Use |
|-------|-----|
| 240px | Tutorial bubbles |
| 320px | A modal dialog with text only. |
| 480px | A modal with controls such as labeled input fields, dropdowns, checkboxes, and more |

### Light context (`2327:121957`, 704px wide, bg `--color-bg-secondary` #f5f5f5)

Drop Zone (`2327:121959`) is a vertical stack (gap `--spacer-2` 8px) of three labeled specimens. Each label is a Badge (bg `--color-bg-assistive-tertiary` #ffe0fc, `--radius-medium`, text `--color-text-assistive` #ea10ac, Whyte Book 13px):

- Badge "240px" (`2327:121960`/`2327:121961`) → `Popover/Feature education` (`2726:32255`, 240px wide): `Modal header` (close only) + Text + `Modal footer` (`1 of 3` stepper + Cancel/Action CTAs) + a top-center pointer vector (`2726:32260`). Title text: "Crisp header without punctuation". Body text (`2726:32258`): "Add supporting details here, punctuated. Only one idea per screen: There's more to read after this." Drop shadow `0 0 0.25 / 0 10 12 / 0 2 2.5` rgba family.
- Badge "320px" (`2327:121963`/`2327:121964`) → `Window` (`2726:32331`, 320 × 128): `Modal header` (title "Title") + Text (`2726:32334`) + `Modal footer` (single "Action" CTA). Body text: "An example of a simpler modal dialog with text only or one input field."
- Badge "480px" (`2327:121966`/`2327:121967`) → `Window` (`2769:17533`, 480 × 112): `Modal header` + Text (`2769:17536`) + `Modal footer` (single "Action" CTA). Body text: "An example of a simpler modal dialog with text only or one input field."

`[Deferred: render — ref nodes 2726:32255 (240 popover), 2726:32331 (320 window), 2769:17533 (480 window)]` — component-dependent specimens; the verbatim strings above are captured non-deferred.

> Note (faithful capture): the 320 and 480 specimen body text (`2726:32334`, `2769:17536`) is authored with the **`body (Deprecated)/medium`** text style; the 240 popover body (`2726:32258`) uses the live `body/medium`. Preserved as-is.

---

## Section 4 — Sizing, Relative

Node: `2327:121975` (`_Section/Component`, 1280 × 442)

### Heading + description

Component Name (`2327:121977`, Whyte Regular 18px):

> Sizing, Relative

Description (`2327:121979`, Whyte Book 13px, color rgba(0,0,0,0.8); multi-paragraph), verbatim:

> In special cases, our modals can take on sizing relative to the viewport height. These modals include those for Branching, Merging, and Account Settings.
>
> These modals also contain a special/modalbackdrop scrim to provide further separation between foreground and background.
>
> When a modal reaches its viewport height limit, content should overflow beneath the footer and a scrollbar should appear as a visual affordance.

Rows (`2327:121980`; index labels color rgba(0,0,0,0.6)), verbatim:

| Value | Behavior |
|-------|----------|
| 70vh | Modal resizes to 70% of viewport height |
| 50vh | Modal resizes to 50% of viewport height |

### Light context (`2769:35576`, 704px wide, bg `--color-modalbackdrop` rgba(0,0,0,0.5))

Centered "Branch Review" modal (`2769:35577`, 544 × 309): `Modal header` (`2769:35578`) + "--- Content ---" (`2769:35579`) with a scroll affordance (`2769:35580`, 4 × 70px pill, bg #d9d9d9, `--radius-full`) + Bottom (`2769:35581`) holding a `Modal footer` (`2769:35582`, `helperText` variant).

`[Deferred: render — ref node 2769:35577 (Branch Review modal on scrim)]` — component-dependent.

---

# Frame C — Modals Templates (`2327:122333`)

## Section 1 — Component intro / Definition

Node: `2327:122336` (`_Section/Component`, 1280 × 216)

### Heading + description

Component Name (`2327:122338`, Whyte Regular 36px):

> Modal Templates

Description (`2327:122339`, Whyte Regular 18px, color rgba(0,0,0,0.6), width 412px), verbatim:

> Templates to use at your leisure to make your starting points easier. To access these, go into the Assets panel and find them under Local Templates.

---

## Section 2 — Fixed Examples, 320

Node: `2327:122340` (`_Section/Component`, 1280 × 782)

### Heading + description

Component Name (`2327:122342`, Whyte Regular 18px):

> Fixed Examples, 320

Description (`2327:122344`, Whyte Book 13px), verbatim:

> Our modals are offered in standard widths (240, 320, 480px) to play well with our 8px grid. The width of the modal depends on the depth of controls inside the content area.

Rows (`2327:122345`), verbatim:

| Width | Use |
|-------|-----|
| 240px | Tutorial bubbles |
| 320px | A modal dialog with text only. |
| 480px | A modal with controls such as labeled input fields, dropdowns, checkboxes, and more |

### Light context (`2327:122358`, 704px wide)

Light panel (`2327:122359`) with two 320-class template instances:
- `Templates/320 / Basic` (`2327:122361`, 320 × 176)
- `Templates/320 / Advanced` (`2327:122360`, 320 × 360)

`[Deferred: render — ref nodes 2327:122361 (320 Basic), 2327:122360 (320 Advanced)]` — instances of canvas symbols `2327:134405` / `2327:134401`.

---

## Section 3 — Fixed Examples, 480

Node: `2327:122362` (`_Section/Component`, 1280 × 2001)

### Heading + description

Component Name (`2327:122364`, Whyte Regular 18px):

> Fixed Examples, 480

Description (`2327:122366`, Whyte Book 13px) — same copy as the 320 section, verbatim:

> Our modals are offered in standard widths (240, 320, 480px) to play well with our 8px grid. The width of the modal depends on the depth of controls inside the content area.

Rows (`2327:122367`) — identical to the 320 section: 240px → Tutorial bubbles; 320px → A modal dialog with text only.; 480px → A modal with controls such as labeled input fields, dropdowns, checkboxes, and more.

### Light context (`2327:122380`, 704px wide)

Light panel (`2327:122381`) → inner frame `2327:122382` (480px wide) stacking four 480-class template instances (32px gap):
- `Templates/480 / Create Project` (`2327:122383`, 480 × 288)
- `Templates/480 / Create Team` (`2327:122384`, 480 × 623)
- `Templates/480 / Sharing` (`2327:122385`, 480 × 504)
- `Templates/480 / Embed` (`2327:122386`, 480 × 248)

`[Deferred: render — ref nodes 2327:122383, 2327:122384, 2327:122385, 2327:122386]` — instances of canvas symbols `2327:134403` (Create Project), `2327:134404` (Create Team), `2327:134402` (Sharing), `2327:134406` (Embed).

**Specimen text strings captured (from template interiors, faithful):** "Create new project" / "We recommend creating workspaces based on product areas, business, units, or working groups in your organization." / "eg Top Secret Ideas" / "Step 1 of 3" / "Continue"; "Create team" / "Workspace" / "Teamwork"; "Share this team" / "Who has access" / "Lizzy Lasagna (you)" / "Anyone can view this file" / "Owner" / "can view" / "can edit" / "Change" / "More" / "Allen Anabelle" / "Bobby Bucatini" / "Pedro Penne" / "Make it hidden" / "Start open session" / "Publish template" / "Get Embed" / "Link to selection" / "Copy Link" / "Share"; "Copy public embed code" / "Click to copy and paste." / "0/160" / "Descriptive text goes here" / "Supporting text to describe more specifics goes here." / "Title" / "Cancel" / "Action".

---

# Component inventory (definition frames on the canvas)

These are the Modal sub-component definitions referenced by every specimen above. Variant axes captured (not raw render).

## Modal header (`2327:122026`, frame 432 × 204) — 4 variant symbols

- `2327:122027` Default · `2327:122037` Navigation · `2327:122048` Tabs · `2327:122054` Dropdown (each 400 × 40)

`ModalHeaderProps` (from embedded definition): `icon2?: boolean` (default false), `link?: boolean` (default false), `title?: string` (default "Title"), `variant?: "Default"`. Composition: left **Title** (Inter Semi Bold 11px via `body/medium/strong`, `--color-text`), right **Icons** group — optional **Link** ("Copy Link", `icon.24.link.small`, text `--color-text-brand` #007be5), optional `icon.24.plus.small`, and a close **Button icon** (`icon.24.close.small`, 11px glyph). Bottom 1px **Border**.

## Modal footer (`2327:122060`, frame 666 × 556) — 12 variant symbols

- `2327:122061` Default · `2327:122070` DS Library Enabled · `2327:122082` DS Library Swap · `2327:122094` DS Library Count · `2327:122105` DS Publishing · `2327:122119` DS Compare Changes · `2327:122135` DS Analytics · `2327:122147` Sharing Actions · `2327:122159` Growth Stepper · `2327:122173` QA Tabs · `2327:122183` QA Plugin · `2327:122192` Blank (each 634 × 40)

`ModalFooterProps` (from embedded definition): `action?: boolean` (false), `border?: boolean` (true), `checkbox?: boolean` (false), `helperText?: boolean` (false), `prop2ndCta?: boolean` (true), `stepper?: boolean` (false), `variant?: "Default"`. Sub-elements (left, mutually-positioned by prop):
- `checkbox` → "Don't show this again" with a checked `icon.16.check` box (bg `--color-bg-brand`, border `--color-border-selected-strong`, `--radius-medium`).
- `stepper` → "1 of 3" (text `--color-text-secondary`).
- `helperText` → "Embed **Figma Filename** in your webpage" (Figma Filename in Inter Semi Bold).
- `action` → "Advanced" link (text `--color-text-brand`).
- **CTAs** (right): optional `prop2ndCta` Button 1 "Cancel" (1px `--color-bordertranslucent` border, `--radius-medium`, text `--color-text`) + Button 2 "Action" (bg `--color-bg-brand`, text `--color-text-onbrand`).
- Top 1px **Border** when `border`.

## Modal body/Input (`2327:121997`, frame 480 × 607) — 5 variant symbols

- `2327:121998` Text Single Line (448 × 80) · `2327:122004` Text Multi Line (448 × 151) · `2327:122012` Dropdown (448 × 80) · `2327:122018` Code Embed (448 × 136) · `2327:122023` Invite (448 × 32)

## Modal body/Row (`2327:122194`, frame 483 × 528) — 13 variant symbols (Variant × State)

State=Default: `2327:122195` Tabs · `2327:122201` Dropdown · `2327:122206` Header · `2327:122210` Avatar w Label (Sharing) · `2327:122219` Label (Sharing) · `2327:122228` Label w Description (Sharing) · `2327:122238` Icon w Label Secondary (Sharing) · `2327:122247` Icon w Label (QA) · `2327:122261` Label (QA) · `2327:122275` Chit w Label (QA).
State=Hover: `2327:122290` Icon w Label (QA) · `2327:122304` Label Only (QA) · `2327:122318` Chit w Label (QA).

## _Chit 24 plugin icon (`2327:123068`, frame 56 × 88) — 2 variant symbols

- `2327:123069` Square · `2327:123071` Circle (each 24 × 24)

## Templates (canvas-level component symbols)

- `2327:134405` Templates/320 / Basic (320 × 176) · `2327:134401` Templates/320 / Advanced (320 × 360)
- `2327:134403` Templates/480 / Create Project (480 × 288) · `2327:134404` Templates/480 / Create Team (480 × 623) · `2327:134402` Templates/480 / Sharing (480 × 504) · `2327:134406` Templates/480 / Embed (480 × 248)

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → fallback observed):

- `--color-bg`: white
- `--color-bg-brand`: #0d99ff
- `--color-bg-secondary`: #f5f5f5
- `--color-bg-disabled`: #d9d9d9
- `--color-bg-assistive-tertiary`: #ffe0fc (badge bg)
- `--color-border`: #e6e6e6
- `--color-bordertranslucent`: rgba(0,0,0,0.1)
- `--color-border-selected-strong`: #007be5
- `--color-modalbackdrop`: rgba(0,0,0,0.5) (scrim — token name in copy is `special/modalbackdrop`)
- `--color-text`: rgba(0,0,0,0.9)
- `--color-text-secondary`: rgba(0,0,0,0.5)
- `--color-text-tertiary`: rgba(0,0,0,0.3)
- `--color-text-brand`: #007be5
- `--color-text-onbrand`: white
- `--color-text-ondisabled`: white
- `--color-text-assistive`: #ea10ac (badge text)
- `--color-multiplayergreen`: #14ae5c
- `--color-textonmultiplayergreen`: white

Dimension / radius tokens:
- `--spacer-0`: 0rem (0px) · `--spacer-1`: 0.3rem (4px) · `--spacer-2`: 0.5rem (8px) · `--spacer-3`: 1rem (16px) · `--spacer-6`: 2.5rem (40px — modal header/footer row height)
- `--radius-medium`: 0.3125rem (5px) — buttons, badges, checkbox, button-icon
- `--radius-large`: 0.8125rem (13px) — modal window corners
- `--radius-full`: 9999px — scroll-affordance pill
- Standard modal widths: 240 / 320 / 480px. Relative sizing: 70vh / 50vh. Header & footer rows: 40px tall. Scroll affordance: 4 × 70px pill.

Modal-window elevation: `light/elevation-500-modal-window` (4 stacked drop shadows, listed in header).
