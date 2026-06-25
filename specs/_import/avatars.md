<!--
Source: Figma "Avatar Guidelines" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2012:31795
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2012:31798, 2012:31803, 2012:31856, 2012:31904, 2012:31959
COMPLETE IMPORT — all five frames captured via get_design_context. Verbatim prose, redline labels, and
token/color values are present for every section. Structure (positions/sizes/node ids/instance names)
came from get_metadata; verbatim text + tokens from get_design_context.
-->

# Avatar — Guidelines (1:1 Figma import)

Page frame: `2012:31795` "Avatar Guidelines" (1280 × 2072). Contains a `_Status` instance bar (`2359:58126`, 1280 × 64) and a content frame "Frame 3" (`2012:31797`, 1280 × 1880) holding five `_Section/Component` sections.

Doc text styles present across the page (from frame-1 design context):
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1

---

## Section 1 — Component intro / Definition

Node: `2012:31798` (`_Section/Component`, 1280 × 216)

### Heading + description

Description frame (`2012:31799`, Whyte Regular, gap 24px, leading 32px, left 64px, top 0).

Component Name (`2012:31800`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Avatar

Description (`2012:31801`, Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 412px), verbatim:

> Typically, we represent people and orgs using a 24x24 circular avatar. If we don't have a photo available, we fall back to using the first initial of their name.

---

## Section 2 — [BLOCKED] Sizes / spacing (Light & Dark)

Node: `2012:31803` (`_Section/Component`, 1280 × 352)

### Heading + description

Description frame (`2012:31804`, 64,0, 320 × 120).

Component Name (`2012:31805`, Whyte Regular 18px, color rgba(0,0,0,0.9), tracking 0.18px, width 320px):

> Default User Avatar

Description (`2012:31806`, Whyte Book 13px, color rgba(0,0,0,0.6), leading 22px, tracking 0.13px, width 320px), verbatim:

> Our default user avatars are 24x24, which work well across most contexts, like avatars in our toolbar, our share modal, member lists, file cards, and comment pins.

### Structure

- Light / Dark Context `2012:31807` (512,0, 704 × 352):
  - **Light** panel `2012:31808` (352 × 352, bg white, border rgba(0,0,0,0.1)): label `2012:31809` (7,7) "LIGHT MODE" (Whyte Book 13px, rgba(0,0,0,0.3), tracking 0.13px). Drop Zone `2012:31810` (39,99, 288 × 116):
    - "Frame 1" `2012:31811` (72,36, gap 8px): 4 `Avatar` instances `2012:31812`–`2012:31815` (24 × 24, Photo variant — circular photo).
    - "Frame 1" `2012:31816` (72,92, gap 8px): 7 initial `Avatar` instances `2012:31817`–`2012:31823` (24 × 24), one per multiplayer color in order Purple / Blue / Pink / Red / Yellow / Green / Grey, each showing the initial "A".
    - Two `_Label/Redline/State-Left` row labels: `2012:31824` (0,40) verbatim **"Photo"** and `2012:31825` (0,96) verbatim **"Initials"** (Inter Medium 11px, color `--color-text-assistive` #ea10ac, on `--color-bg-assistive-tertiary` #ffe0fc).
    - Measurement `2012:31826` (192,36, 40 × 24): `_Label/Redline/Vertical Bar` `2012:31827` + `_Label/Redline/Text` `2012:31828` verbatim **"24"**.
    - Measurement `2012:31829` (168,0, 24 × 36): `_Label/Redline/Text` `2012:31830` verbatim **"24"** + `_Label/Redline/Horizontal Bar` `2012:31831`.
  - **Dark** panel `2012:31832` (352,0, 352 × 352, bg #2c2c2c): mirror of Light. Label `2012:31833` (8,8) "DARK MODE" (Whyte Book 13px, rgba(255,255,255,0.3)). Drop Zone `2012:31834` (40,100, 288 × 116) with "Frame 1" `2012:31835` (4 photo avatars `2012:31836`–`2012:31839`) and "Frame 1" `2012:31840` (7 initial avatars `2012:31841`–`2012:31847`, Purple→Grey, initial "A"); redline row labels `2012:31848` "Photo" / `2012:31849` "Initials"; Measurements `2012:31850` ("24", bars `2012:31851`/`2012:31852`) and `2012:31853` ("24", `2012:31854`/`2012:31855`).

#### Token / color values (captured)

- Multiplayer fills (avatar background per color), `var(token, fallback)`:
  - `--color-multiplayerpurple` #9747ff — text `--color-textonmultiplayerpurple` white
  - `--color-multiplayerblue` #007be5 — text `--color-textonmultiplayerblue` white
  - `--color-multiplayerpink` #ff24bd — text `--color-textonmultiplayerpink` white
  - `--color-multiplayerred` #f24822 — text `--color-textonmultiplayerred` white
  - `--color-multiplayeryellow` #ffcd29 — text `--color-textonmultiplayeryellow` rgba(0,0,0,0.9)
  - `--color-multiplayergreen` #14ae5c — text `--color-textonmultiplayergreen` white
  - `--color-multiplayergrey` #679 — text `--color-textonmultiplayergrey` white
- Avatar initial text: `body/large` — Inter Regular, `--body/large/fontsize` 13px, `--body/large/fontweight` 450, `--body/large/lineheight` 22px, tracking −0.0325px.
- Avatar radius: `--radius-full` 9999px (instances also render `rounded-[1000px]`).
- Redline label: Inter Medium 11px, `--color-text-assistive` #ea10ac on `--color-bg-assistive-tertiary` #ffe0fc, radius 2px.
- Measurement text: Inter Medium 11px, `--color-text-onmeasure` white on `--color-bg-measure` #f24822; redline bars `--color-border-measure-strong` #dc3412.

`[Render available — ref nodes 2012:31808 (light), 2012:31832 (dark)]` Rows of 4 photo avatars then 7 initial avatars, redline-annotated 24 × 24.

---

## Section 3 — [BLOCKED] Avatar variants / photo / status

Node: `2012:31856` (`_Section/Component`, 1280 × 352)

### Heading + description

Description frame (`2012:31857`, 64,0, 320 × 208).

Component Name (`2012:31858`, Whyte Regular 18px, color rgba(0,0,0,0.9), tracking 0.18px, width 320px):

> Toolbar Avatar

Description (`2012:31859`, Whyte Book 13px, color rgba(0,0,0,0.6), leading 22px, tracking 0.13px, width 320px), verbatim (three paragraphs, with an empty paragraph between):

> Our editor toolbar avatars include special indicator states, which include a randomized cursor color.
>
> There are 5 states of avatar. Default, dash, design, follow, and disabled. Note, these states are tucked into a nest component in the core avatar component for design consumption purposes. The component should feature all of them in one avatar component.

### Structure

- Light / Dark Context `2012:31860` (512,0, 704 × 352):
  - **Light** panel `2012:31861`: label `2012:31862` (7,7) "LIGHT MODE". Drop zone `2012:31863` (39, vertically centered +2px):
    - "Right Hand Side" toolbar pill `2012:31864` (136 × 32, backdrop-blur 20px, bg rgba(245,245,245,0.9), gap `--spacer-2` 8px, radius 13px): 4 photo `Avatar` instances `2012:31865`–`2012:31868` showing the avatar status states — Default, a yellow "Color bar" dash (`--color-multiplayeryellow` #ffcd29), "Ring, Solid", and "Ring, Dash Spotlight".
    - "Right Hand Side" pill `2012:31869` (120,160, opacity 30%): `Avatar` `2012:31870` (24 × 24); then three photo-variant instances — `Avatar/Photo/Dash/Default` `2012:31871` (24 × 32, with yellow color-bar dash), `Avatar/Photo/Design/Default` `2012:31872` (24 × 24, Ring Solid), `Avatar/Photo/Spotlight/Default` `2012:31873` (24 × 24, Ring Dash Spotlight).
    - "Right Hand Side" pill `2012:31874` (120,228, 136 × 32): 4 bare `_Avatar status` instances `2012:31875`–`2012:31878` (24 × 24) — Default, color-bar dash, Ring Solid, Ring Dash Spotlight, all over white.
    - Three `_Label/Redline/State-Left` row labels: `2012:31879` (40,104) verbatim **"Design"**, `2012:31880` (40,168) verbatim **"FigJam"**, `2012:31881` (40,236) verbatim **"States"** (Inter Medium 11px, `--color-text-assistive` #ea10ac on `--color-bg-assistive-tertiary` #ffe0fc).
    - "Frame 14" `2012:31882` (127,259, 120 × 24) — empty.
  - **Dark** panel `2012:31883` (352,0, 352 × 352, bg #2c2c2c): mirror. Label `2012:31884` (8,8) "DARK MODE". Drop zone `2012:31885` with row `2012:31886` (photo+status avatars `2012:31887`–`2012:31890`, pill bg rgba(245,245,245,0.08)), row `2012:31891` (`2012:31892` Avatar + `Avatar/Photo/Dash/Default` `2012:31893` + `Avatar/Photo/Design/Default` `2012:31894` + `Avatar/Photo/Spotlight/Default` `2012:31895`), row `2012:31896` (bare `_Avatar status` `2012:31897`–`2012:31900`); redline labels `2012:31901` "Design" / `2012:31902` "FigJam" / `2012:31903` "States".

#### Variant + status component names (verbatim node names)

- Photo variants: `Avatar/Photo/Dash/Default`, `Avatar/Photo/Design/Default`, `Avatar/Photo/Spotlight/Default`.
- Status nest: `_Avatar status`, with internal states named **"Default"**, **"−  Color bar"** (the dash indicator), **"Ring, Solid"**, **"Ring, Dash Spotlight"**.

#### Token / color values (captured)

- Toolbar pill: backdrop-blur 20px; light bg rgba(245,245,245,0.9), dark bg rgba(245,245,245,0.08); inner gap `--spacer-2` 8px; radius 13px.
- Color-bar dash indicator: `--color-multiplayeryellow` #ffcd29 (Legacy alias `_Legacy/_Legacy-Multiplayer/Y` #FFC700), 14px wide, radius `--radius-small` 2px, offset 4px above the avatar.
- Avatar radius `--radius-full` 9999px; status rings render at 29–30px (solid / dash-spotlight).
- Redline labels: Inter Medium 11px, `--color-text-assistive` #ea10ac on `--color-bg-assistive-tertiary` #ffe0fc.

`[Render available — ref nodes 2012:31861 (light), 2012:31883 (dark)]` Three toolbar pills demonstrating Design / FigJam / States status indicators on photo and bare-status avatars.

---

## Section 4 — [BLOCKED] Avatar 32px size + stacking/grouping

Node: `2012:31904` (`_Section/Component`, 1280 × 352)

### Heading + description

Description frame (`2012:31905`, 64,0, 320 × 76).

Component Name (`2012:31906`, Whyte Regular 18px, color rgba(0,0,0,0.9), tracking 0.18px, width 320px):

> Large User Avatar

Description (`2012:31907`, Whyte Book 13px, color rgba(0,0,0,0.6), leading 22px, tracking 0.13px, width 320px), verbatim:

> In a few contexts like Community resource views and internal profiles, we scale up avatars to 32x32

### Structure

- Light / Dark Context `2012:31908` (512,0, 704 × 352):
  - **Light** panel `2012:31909`: label `2012:31910` (7,7) "LIGHT MODE". Drop Zone `2012:31911` (39,65, 263 × 182):
    - Two `_Label/Redline/State-Left` row labels: `2012:31912` (40,108) verbatim **"Photo"** and `2012:31913` (40,164) verbatim **"Initials"**.
    - "Frame 1" `2012:31914` (112,104, gap 8px): 4 photo `Avatar` instances `2012:31915`–`2012:31918` (**32 × 32**), variant name "Default".
    - "Frame 2" `2012:31919` (112,160, gap 8px): 4 initial `Avatar` instances `2012:31920`–`2012:31923` (32 × 32, "Large" variant) — Purple / Blue / Pink / Red, initial "A".
    - "Frame 3" `2012:31924` (112,216, gap 8px): 3 initial `Avatar` instances `2012:31925`–`2012:31927` (32 × 32, "Large" variant) — Yellow / Green / Grey, initial "A".
    - Measurement `2012:31928` (263,102, 40 × 32): `_Label/Redline/Vertical Bar` `2012:31929` + `_Label/Redline/Text` `2012:31930` verbatim **"32"**.
    - Measurement `2012:31931` (231,66, 32 × 36): `_Label/Redline/Text` `2012:31932` verbatim **"32"** + `_Label/Redline/Horizontal Bar` `2012:31933`.
  - **Dark** panel `2012:31934` (352,0, 352 × 352, bg #2c2c2c): mirror. Label `2012:31935` (8,8) "DARK MODE". Drop Zone `2012:31936` with redline labels `2012:31937` "Photo" / `2012:31938` "Initials"; "Frame 1" `2012:31939` (photo avatars `2012:31940`–`2012:31943`, 32 × 32), "Frame 2" `2012:31944` (initial avatars `2012:31945`–`2012:31948`, Purple→Red), "Frame 3" `2012:31949` (initial avatars `2012:31950`–`2012:31952`, Yellow→Grey); Measurements `2012:31953` ("32", `2012:31954`/`2012:31955`) and `2012:31956` ("32", `2012:31957`/`2012:31958`).

Avatar size here is **32 × 32** (vs 24 × 24 in Section 2), 40px horizontal pitch.

#### Token / color values (captured)

- Same multiplayer fill / text-on tokens as Section 2 (Purple #9747ff … Grey #679; yellow text rgba(0,0,0,0.9), all others white).
- Initial text at this size: `body/large/strong` — Inter Medium, `--body/large/strong/fontsize` 13px, `--body/large/strong/fontweight` 550, `--body/large/strong/lineheight` 22px, tracking −0.0325px (the avatar's internal initial sub-variant is named **"Large"**).
- Avatar radius `--radius-full` 9999px (rendered `rounded-[1000px]`).
- Measurement text Inter Medium 11px, `--color-text-onmeasure` white on `--color-bg-measure` #f24822; bars `--color-border-measure-strong` #dc3412.

`[Render available — ref nodes 2012:31909 (light), 2012:31934 (dark)]` 32 × 32 photo row plus two rows of initial avatars (Purple→Grey), redline-annotated 32 × 32.

---

## Section 5 — [BLOCKED] Avatar 16px size

Node: `2012:31959` (`_Section/Component`, 1280 × 352)

### Heading + description

Description frame (`2012:31960`, 64,0, 320 × 98).

Component Name (`2012:31961`, Whyte Regular 18px, color rgba(0,0,0,0.9), tracking 0.18px, no-wrap):

> Small User Avatar

Description (`2012:31962`, Whyte Book 13px, color rgba(0,0,0,0.6), leading 22px, tracking 0.13px, width 320px), verbatim (note the double space and original misspelling are preserved):

> In cases where we need to nest an avatar underneath a line of text (for example, in branching),  we occassionally use a 16x16 size.

### Structure

- Light / Dark Context `2012:31963` (512,0, 704 × 352):
  - **Light** panel `2012:31964`: label `2012:31965` (7,7) "LIGHT MODE". Drop Zone `2012:31966` (39,103, 232 × 108):
    - "Frame 2" `2012:31967` (72,36, gap 8px): 4 photo `Avatar` instances `2012:31968`–`2012:31971` (**16 × 16**, "Small" variant).
    - "Frame 1" `2012:31972` (72,92, gap 8px): 7 initial `Avatar` instances `2012:31973`–`2012:31979` (16 × 16, "Small" variant) — Purple / Blue / Pink / Red / Yellow / Green / Grey, initial "A".
    - Two `_Label/Redline/State-Left` row labels: `2012:31980` (0,36) verbatim **"Photo"** and `2012:31981` (0,92) verbatim **"Initials"**.
    - Measurement `2012:31982` (160,36, 16 tall): `_Label/Redline/Vertical Bar` `2012:31983` + `_Label/Redline/Text` `2012:31984` verbatim **"16"**.
    - Measurement `2012:31985` (144,0, 16 wide): `_Label/Redline/Text` `2012:31986` verbatim **"16"** + `_Label/Redline/Horizontal Bar` `2012:31987`.
  - **Dark** panel `2012:31988` (352,0, 352 × 352, bg #2c2c2c): mirror. Label `2012:31989` (8,8) "DARK MODE". Drop Zone `2012:31990` (40,104, 232 × 108) with "Frame 2" `2012:31991` (photo avatars `2012:31992`–`2012:31995`, 16 × 16), "Frame 1" `2012:31996` (7 initial avatars `2012:31997`–`2012:32003`, Purple→Grey); redline labels `2012:32004` "Photo" / `2012:32005` "Initials"; Measurements `2012:32006` ("16", `2012:32007`/`2012:32008`) and `2012:32009` ("16", `2012:32010`/`2012:32011`).
- Stray `Avatar` instance `2012:32012` (1248,57, 16 × 16, empty) at the section's right edge.

Avatar size here is **16 × 16**, 24px horizontal pitch.

#### Token / color values (captured)

- Same multiplayer fill / text-on tokens as Sections 2 and 4.
- Initial text at this size: `body/small/strong` — Inter Medium, `--body/small/strong/fontsize` 9px, `--body/small/strong/fontweight` 550, `--body/small/strong/lineheight` 14px, tracking 0.045px (avatar internal initial sub-variant named **"Small"**).
- Avatar radius `--radius-full` 9999px (rendered `rounded-[1000px]`).
- Measurement text Inter Medium 11px, `--color-text-onmeasure` white on `--color-bg-measure` #f24822; bars `--color-border-measure-strong` #dc3412.

`[Render available — ref nodes 2012:31964 (light), 2012:31988 (dark)]` 16 × 16 photo row plus a 7-up row of initial avatars (Purple→Grey), redline-annotated 16 × 16.

---

## Cross-section token summary (captured values)

All five sections were retrieved via get_design_context. Captured:

### Doc text styles

- Section 1 heading (`2012:31800`): Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px.
- Section 1 description (`2012:31801`): Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 412px.
- Section 2–5 component-name headings: Whyte Regular 18px, rgba(0,0,0,0.9), tracking 0.18px.
- Section 2–5 descriptions: Whyte Book 13px, rgba(0,0,0,0.6), leading 22px, tracking 0.13px.
- `_doc/heading` text style: Whyte Regular 18 / weight 400 / lineHeight 32 / letterSpacing 1.
- `_doc/description` text style: Whyte Book 13 / weight 350 / lineHeight 22 / letterSpacing 1.

### Multiplayer color tokens (avatar fill / text-on), `var(token, fallback)`

| Color | Fill token | Fill hex | Text-on token | Text-on |
| --- | --- | --- | --- | --- |
| Purple | `--color-multiplayerpurple` | #9747ff | `--color-textonmultiplayerpurple` | white |
| Blue | `--color-multiplayerblue` | #007be5 | `--color-textonmultiplayerblue` | white |
| Pink | `--color-multiplayerpink` | #ff24bd | `--color-textonmultiplayerpink` | white |
| Red | `--color-multiplayerred` | #f24822 | `--color-textonmultiplayerred` | white |
| Yellow | `--color-multiplayeryellow` | #ffcd29 | `--color-textonmultiplayeryellow` | rgba(0,0,0,0.9) |
| Green | `--color-multiplayergreen` | #14ae5c | `--color-textonmultiplayergreen` | white |
| Grey | `--color-multiplayergrey` | #679 | `--color-textonmultiplayergrey` | white |

Legacy alias: `_Legacy/_Legacy-Multiplayer/Y` = #FFC700 (yellow).

### Avatar initial text styles (per size)

- 16 × 16 ("Small"): `body/small/strong` — Inter Medium, 9px, weight 550, lineHeight 14px, tracking 0.045px.
- 24 × 24 ("Default"): `body/large` — Inter Regular, 13px, weight 450, lineHeight 22px, tracking −0.0325px.
- 32 × 32 ("Large"): `body/large/strong` — Inter Medium, 13px, weight 550, lineHeight 22px, tracking −0.0325px.

### Radius / spacer / redline tokens

- Avatar radius: `--radius-full` 9999px (instances render `rounded-[1000px]`).
- Indicator color-bar radius: `--radius-small` 2px.
- Toolbar pill: gap `--spacer-2` 8px, radius 13px, backdrop-blur 20px; light bg rgba(245,245,245,0.9), dark bg rgba(245,245,245,0.08).
- Redline state labels: Inter Medium 11px, text `--color-text-assistive` #ea10ac on bg `--color-bg-assistive-tertiary` #ffe0fc, radius 2px.
- Measurement labels: Inter Medium 11px, text `--color-text-onmeasure` white on bg `--color-bg-measure` #f24822; redline bars `--color-border-measure-strong` #dc3412.
- Panel chrome: light bg white with rgba(0,0,0,0.1) border; dark bg #2c2c2c.

### Redline state-label strings (verbatim)

- Section 2 & 4 & 5 rows: "Photo", "Initials".
- Section 3 toolbar rows: "Design", "FigJam", "States".

### Avatar specimen sizes observed across sections

- Section 2: 24 × 24, 32px pitch (rows of 4 and 7).
- Section 3: 24 × 24 (default), plus photo variants (`Avatar/Photo/Dash/Default` 24 × 32, `Avatar/Photo/Design/Default` 24 × 24, `Avatar/Photo/Spotlight/Default` 24 × 24) and `_Avatar status` 24 × 24 (states: Default, Color bar, Ring Solid, Ring Dash Spotlight).
- Section 4: 32 × 32, 40px pitch (rows of 4, 4, 3).
- Section 5: 16 × 16, 24px pitch (rows of 4 and 7).

Import complete — no blocked sections remain.
