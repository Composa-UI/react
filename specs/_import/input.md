<!--
Source: Figma "Inputs" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2028:75376 (canvas "Inputs")
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Guideline frames transcribed: 2327:84616, 2327:85734, 2327:86469, 2327:86744, 2327:86901, 2327:87673
Capture method: get_metadata on the canvas; get_design_context per guideline frame and per Description sub-frame.
NOTE: Several frames exceeded the MCP context limit and returned sparse metadata; doc prose was captured by
fetching each section's Description frame directly. Per-instance specimen render is deferred (component-dependent).
NOTE: Redline row-label strings (State-Left labels) inside the matrices could not be transcribed verbatim
(host shell was unavailable — ENOSPC); they are flagged as deferred per section and map to the component state enums.
-->

# Input — Guidelines (1:1 Figma import)

The entry node `2028:75376` is a **canvas** named "Inputs" (not a single page frame). It holds **six** standalone "…Guidelines" documentation frames plus a set of off-canvas component-definition frames (`_Chit 24`, `_Chit 48`, `_Combo input dropdown`, `_Chip variable`, `_Chit input`, `Combo input`, `Color input`, `Text input`, `Numeric input`, `Numeric input multi`). Only the six Guidelines frames are documentation; they are transcribed below.

The six Guidelines frames (left→right by x position on canvas):

| Frame | Node | Size | _Status node |
|-------|------|------|--------------|
| Numeric input Guidelines | `2327:84616` | 1280 × 1240 | `2359:…` (inline `_Status`, label "UI3") |
| Combo Input Guidelines | `2327:85734` | 1280 × 1240 | — |
| Value Guidelines | `2327:86469` | 1280 × 3458 | `2359:96891` |
| Value - Paint Guidelines | `2327:86744` | 1280 × 1656 | — |
| Emphasized Text Input Guidelines | `2327:86901` | 1280 × 1459 | — |
| Text Input Nesting Guidelines | `2327:87673` | 1365 × 1572 | `2359:96881` |

Each frame follows the same chrome: a `_Status` bar at top (white, 64px tall, "UI3" label in Whyte Regular 13px uppercase, 1px bottom hairline `rgba(0,0,0,0.1)` at 32% opacity), then a "Frame 3" content frame holding stacked `_Section/Component` sections (64px gap, 64px bottom padding).

Doc text styles present across the page (consistent with the Switch import):
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `_doc/body/body.medium` / `body/body.medium`: family `body/medium/fontFamily`, Medium, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5

Section heading convention per `_Section/Component`:
- Intro section "Component Name" = Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px, width 412px.
- Sub-section "Component Name" = Whyte Regular 18px, color rgba(0,0,0,0.9), tracking 0.18px, width 320px.
- Section description = Whyte Book 13px, color rgba(0,0,0,0.6), tracking 0.13px, width 320px (412px in intro).

Light/Dark context panels (where present): two side-by-side panels, each ~352px wide. **Light** = bg `--color-bg` white, 1px `rgba(0,0,0,0.1)` border, "LIGHT MODE" label (Whyte Book 13px, rgba(0,0,0,0.3)). **Dark** = bg `--color-bg` #2c2c2c, "DARK MODE" label (Whyte Book 13px, rgba(255,255,255,0.3)). Specimen rows are laid out in a centered "Drop Zone" / "Paste Zone" with `_Label/Redline/State-Left` redline annotations down the left.

---

# FRAME 1 — Numeric input Guidelines

Node: `2327:84616` (1280 × 1240). `_Status` label "UI3".

## Section 1 — Intro / Definition

Node: `2327:84618` "Title" → `2327:84619` "Heading" (1280 × 216).

Component Name (`2327:84621`, Whyte Regular 36px):

> Numeric Input

Description (`2327:84622`, Whyte Regular 18px, width 412px), verbatim:

> Works a `<select>` menu, to allow a user to pick from a set of preset options

> Anomaly (faithful capture): this description text reads as a copy/paste leftover from a select/dropdown component — it does not describe a numeric input. Preserved as-authored.

## Section 2 — Default

Node: `2327:84623` "State" (1280 × 352).

Sub-heading (`2327:84625`, Whyte Regular 18px):

> Default

Description (`2327:84626`, Whyte Book 13px), verbatim:

> To create a consistent grid in our property panels, we can also snap these controls to our flexible grid, locking to either one, two, or three columns

Light/Dark context (`2327:84627`, 704px). Light panel `2327:84628`, Dark panel `2327:84633`. Each Drop Zone stacks two **Numeric input** specimens (vertical, gap 32px):
- Specimen A (`2327:84631` light / `2327:84636` dark): default — bg `--color-bg-secondary` (#f5f5f5 light / #383838 dark), 24px tall, 88px wide, radius `--radius-medium` (0.3125rem / 5px), leading `icon.24.prop-text` (glyph "X", color `--color-icon-fs-secondary` rgba(0,0,0,0.5) light / rgba(255,255,255,0.7) dark), value "24".
- Specimen B (`2327:84632` light / `2327:84637` dark): focused/selected — same bg, plus 1px border `--color-border-selected` (#0d99ff light / #0c8ce9 dark); value text wrapped in a highlight container bg `--color-texthighlight` (rgba(13,153,255,0.4)).

## Section 3 — Snap to grid

Node: `2327:84638` "State" (1280 × 352).

Sub-heading (`2327:84640`, Whyte Regular 18px):

> Snap to grid

Description (`2327:84641`, Whyte Book 13px), verbatim:

> To create a consistent grid in our property panels, we can also snap these controls to our flexible grid, locking to either one or two columns

Light/Dark context (`2327:84642`). Light `2327:84643`, Dark `2327:84651`. Drop Zone (gap 8px) interleaves redline column-measure bars with Numeric inputs:
- `_col1-wide` measure bar (`2680:3963` light / `2680:3961` dark): bg `--color-bg-measure-tertiary` (#ffe2e0 light / #60332a dark), 88px wide, redline label "col.1" (Inter Medium 11px, `--color-text-measure` #dc3412 light / #fca397 dark).
- Numeric input (`2327:84647` / `2327:84655`): 88px, value "24".
- 24px Spacer (`2327:84648` / `2327:84656`).
- `_col2-wide` measure bar (`2680:3969` light / `2680:3967` dark): same style, 184px wide, label "col.2".
- Numeric input (`2327:84650` / `2327:84658`): full-width, value "24".

---

# FRAME 2 — Combo Input Guidelines

Node: `2327:85734` (1280 × 1240).

## Section 1 — Intro / Definition

Description frame `2327:85738`.

Component Name (`2327:85739`, Whyte Regular 36px):

> Combo Input

Description (`2327:85740`, Whyte Regular 18px), verbatim:

> Works a `<select>` menu, to allow a user to pick from a set of preset options

## Section 2 — States

Description frame `2327:85742`.

Sub-heading (`2327:85743`):

> States

Description (`2327:85744`, Whyte Book 13px), verbatim:

> A combo input is typically used in areas where a user can choose between the precision of an exact typed value, and a dropdown that offers preset values. Their states are reflected respectively across the input portion, and the dropdown portion.

Specimens: a matrix of **Combo input** instances with `_Label/Redline/State-Left` row labels.
`[Deferred: render — ref Light/Dark context frame for this section]` — component-dependent specimen layout; redline state-label strings not transcribed verbatim.

## Section 3 — Dropdown

Description frame `2327:85775`.

Sub-heading (`2327:85776`):

> Dropdown

Description (`2327:85777`, Whyte Book 13px), verbatim:

> Clicking on the dropdown will toggle a menu with preset values that user can fall back on.

### Combo input component — variant axes (from component definition `2028:79408`)

`ComboInputProps` (as observed; this section's instances are all default):
- `state`: `"Default"` (only value observed on these instances)
- `iconLead`: `"False"`

`[Deferred: render — ref node 2327:85734 dropdown menu specimen]`.

---

# FRAME 3 — Value Guidelines

Node: `2327:86469` (1280 × 3458). `_Status` `2359:96891`. Eight `_Section/Component` sections.

## Section 1 — Intro / Definition

Description frame `2327:86473`. (Contains a hidden `_Label/Storybook` instance `2327:86476`.)

Component Name (`2327:86474`, Whyte Regular 36px):

> Value

Description (`2327:86475`, Whyte Regular 18px), verbatim:

> Our default text input, used for simple numerical or textual values.

## Section 2 — Default

Description frame `2327:86478`.

Sub-heading (`2327:86479`):

> Default

Description (`2327:86480`, Whyte Book 13px), verbatim:

> By default, we don't show borders around text inputs until a user focuses the input.

Light/Dark context `2327:86481`. Light `2327:86482` / Dark `2327:86499`. Drop Zone holds a **Frame 1** column of six **Text input** specimens (24px tall, 40px row pitch, 176px wide) with six `_Label/Redline/State-Left` row labels (one per state).
`[Deferred: render — ref nodes 2327:86484 (light), 2327:86501 (dark)]`. Six row-states correspond to the TextInput `state` enum (see component axes below).

## Section 3 — (icon option, no heading)

Description frame `2327:86517`. Heading text node `2327:86518` is **hidden**; only a description shows.

Description (`2327:86519`, Whyte Book 13px), verbatim:

> We can optionally include an icon as part of the input.

Light/Dark `2327:86520`. Light `2327:86521` / Dark `2327:86540`. "Paste Zone" with a column of seven **Numeric input** specimens (88px) and seven redline labels.
`[Deferred: render — ref nodes 2327:86523 (light), 2327:86542 (dark)]`.

## Section 4 — Applying variables

Description frame `2327:86560`. (Note: this frame has two stacked "Component Name" nodes; `2327:86561` is hidden, `2327:86562` is shown.)

Sub-heading (`2327:86562`):

> Applying variables

Description (`2327:86563`, Whyte Book 13px, multi-paragraph), verbatim:

> Some fields allow Variables to be applied through a hexagonal icon. Once variables are applied, they are represented as a pill.
>
> Focusing a field with a variable pill in it should automatically select that pill.

Light/Dark `2327:86564`. Light `2327:86565` / Dark `2327:86582`. Paste Zone of six **Numeric input** specimens + six redline labels.
`[Deferred: render — ref nodes 2327:86567 (light), 2327:86584 (dark)]`.

## Section 5 — Variable Applied Chips

Description frame `2327:86600`. (Hidden Component Name `2327:86601`; shown `2327:86602`.)

Sub-heading (`2327:86602`):

> Variable Applied Chips

Description (`2327:86603`, Whyte Book 13px), verbatim:

> When a variable is applied to an input field, a chip will appear. This chip contains its own states to showcase interactivity. The states are spelled as such.

Light/Dark `2327:86604`. Light `2327:86605` / Dark `2327:86628`. Paste Zone with **two** stacked Inputs groups (a single specimen `2327:86609` + an eight-specimen column `2327:86611`–`2327:86618`) and eight redline labels — i.e. the eight chip interaction states.
`[Deferred: render — ref nodes 2327:86607 (light), 2327:86630 (dark)]`. See `_Chip variable` component definition `2028:79753`.

## Section 6 — (multi-input, no heading)

Description frame `2327:86652`. Heading `2327:86653` hidden.

Description (`2327:86654`, Whyte Book 13px), verbatim:

> As well as combine stack multiple inputs horizontally together.

Light/Dark `2327:86655`. Light `2327:86656` / Dark `2327:86671`. Paste Zone of five **Numeric input multi** specimens (160px) + five redline labels. See `Numeric input multi` definition `2028:79619`.
`[Deferred: render — ref nodes 2327:86658 (light), 2680:4218 (dark)]`.

## Section 7 — Multiline

Description frame `2327:86686`.

Sub-heading (`2327:86687`):

> Multiline

Description (`2327:86688`, Whyte Book 13px, with one italicized word "do"), verbatim:

> However, for inputs that support multiple lines of text, we *do* show a border by default, and allow the container to grow in height.

Light/Dark `2327:86689`. Light `2327:86690` / Dark `2327:86702`. Paste Zone of three multiline **Text input** specimens (160px wide × 56px tall, 72px row pitch) + three redline labels.
`[Deferred: render — ref nodes 2327:86692 (light), 2680:4808 (dark)]`.

## Section 8 — With dropdown

Description frame `2327:86714`.

Sub-heading (`2327:86715`):

> With dropdown

Description (`2327:86716`, Whyte Book 13px), verbatim:

> For inputs like picking a font size, we give users the option to both enter a value directly (using their keyboard), or click on a  ▾ to select from a list of presets.

Light/Dark `2327:86717`. Light `2327:86718` / Dark `2327:86731`. Drop Zone of two columns × four **Dropdown** specimens (117px) each.
`[Deferred: render — ref nodes 2327:86720 (light), 2680:4698/2680:4703 (dark)]`.

---

# FRAME 4 — Value - Paint Guidelines

Node: `2327:86744` (1280 × 1656). `_Status` not separately captured.

## Section 1 — Intro / Definition

Description frame `2327:86748`.

Component Name (`2327:86749`, Whyte Regular 36px):

> Value - Paint

Description (`2327:86750`, Whyte Regular 18px), verbatim:

> Our text input for color, gradient, and image fills

## Section 2 — Solid Fills

Description frame `2327:86753`.

Sub-heading (`2327:86754`):

> Solid Fills

Description (`2327:86755`, Whyte Book 13px), verbatim:

> Our representation for editing hex values of solid fills, with an option to include a field for opacity as well.

Specimens use **Color input** instances. Sample values observed in the component (token-driven, captured): hex "FF24BD", opacity "24" / "100", and gradient/image type labels "Angular" / "Image".
`[Deferred: render — ref Light/Dark context for this section]`.

## Section 3 — Gradient fills

Description frame `2327:86784`.

Sub-heading (`2327:86785`):

> Gradient fills

Description (`2327:86786`, Whyte Book 13px), verbatim:

> Gradients are not directly editable, but opacity is.

## Section 4 — Image fills

Description frame `2327:86815`.

Sub-heading (`2327:86816`):

> Image fills

Description (`2327:86817`, Whyte Book 13px), verbatim:

> Images are not directly editable, but opacity is.

### Color input component — variant axes (from component definition `2028:79525`)

`ColorInputProps`:
- `state`: `"Default" | "Focus" | "Disabled"`
- `type`: `"Fill" | "Opacity" | "Image" | "Gradient"`
- `variant`: `"Square"`

Token-driven label behavior (captured from the component logic):
- Hex field shows "FF24BD" for Fill/Opacity types; "Angular" for Gradient; "Image" for Image.
- Opacity field shows "24" for Opacity type, "100" otherwise.

`[Deferred: render — ref node 2327:86744 paint specimens]`.

---

# FRAME 5 — Emphasized Text Input Guidelines

Node: `2327:86901` (1280 × 1459). Four `_Section/Component` sections.

## Section 1 — Intro / Definition

Description frame `2327:86905`.

Component Name (`2327:86906`, Whyte Regular 36px):

> Emphasized Text Input

Description (`2327:86907`, Whyte Regular 18px), verbatim:

> An alternative text input with a filled background, used when more visual emphasis is required for a field to stand out from other content in a layout.

## Section 2 — Small

Description frame `2327:86909`.

Sub-heading (`2327:86910`):

> Small

Description (`2327:86911`, Whyte Book 13px), verbatim:

> The small size matches the 32px height of the regular Value component, and is used in similar contexts like in Editor panels and dialogs.

## Section 3 — (icon option, no heading)

Description frame `2327:86934`. Heading `2327:86935` hidden.

Description (`2327:86936`, Whyte Book 13px), verbatim:

> We can optionally include an icon as part of the input.

## Section 4 — Large

Description frame `2327:86959`.

Sub-heading (`2327:86960`):

> Large

Description (`2327:86961`, Whyte Book 13px), verbatim:

> The large size is a taller 40px variant used in contexts where the field is the main interactive element, such as in interstitial views or in NUX.

`[Deferred: render — ref node 2327:86901 emphasized-input specimens (Small / Large, with and without icon)]`.

---

# FRAME 6 — Text Input Nesting Guidelines

Node: `2327:87673` (1365 × 1572). `_Status` `2359:96881`. Four `_Section/Component` sections. (This frame and the Emphasized frame share the same underlying **Text input** component, so their definition code overlaps.)

## Section 1 — Intro / Definition

Description frame `2327:87677` (412 × 184).

Component Name (`2327:87678`, Whyte Regular 36px):

> Text Input Nesting

Description (`2327:87679`, Whyte Regular 18px), verbatim:

> An alternative text input with a filled background, used when more visual emphasis is required for a field to stand out from other content in a layout.

> Anomaly (faithful capture): this intro description is identical to the Emphasized Text Input intro (`2327:86907`) — likely a duplicated description. Preserved as-authored.

## Section 2 — (no heading; matrix of Text input + Button)

Node: `2327:87680`. Light `2327:87686` / Dark `2327:87703`. Each side: an "Inputs" column of four **Text input** instances (`2327:87690`–`2327:87693`) at varying widths, four `_Label/Redline/State-Left` labels, and a "Buttoons" [sic] column of four **Button** instances (`2327:87699`–`2327:87702`, 53px). No description text node present in this section's first sub-frame.
`[Deferred: render — ref nodes 2327:87688 (light), 2327:87705 (dark)]`.

## Section 3 — With Dropdowns

Description frame `2327:87681`.

Sub-heading (`2327:87682`):

> With Dropdowns

Description (`2327:87683`, Whyte Book 13px, multi-paragraph), verbatim:

> In specific instances, we'll need to nest a dropdown inside an input field.
>
> In these particular cases, always use the larger input field to nest the dropdown component, and pair this with the Large button variant.
>
> Be sure to include 8px of space between the input and the button.

Light/Dark context `2327:87724`. Light `2327:87726` / Dark `2327:87743`. Layout "Group 5" → "Frame 2608812" of three rows, each a **Text input** (219px) + **Button** (53px) at 227px offset (so the 8px gap rule reads as: input 219px, gap 8px, button at 227px), with three redline labels.
`[Deferred: render — ref nodes 2327:87728 (light), 2327:87745 (dark)]`.

## Section 4 — Share Sheet

Description frame `2327:87721`.

Sub-heading (`2327:87722`):

> Share Sheet

Description (`2327:87723`, Whyte Book 13px, multi-paragraph), verbatim:

> Sometimes, chits can be nested inside forms such as those found in share sheets.
>
> A chit of a person's name will appear once their name registers with a 'close' butotn.

> Anomaly (faithful capture): "butotn" is a typo for "button" in the source. Preserved as-authored.

## Section 5 — Quick Actions

Description frame `2327:87761`.

Sub-heading (`2327:87762`):

> Quick Actions

Description (`2327:87763`, Whyte Book 13px), verbatim:

> In quick actions, your query will often appear with a chit that displays an identifier for an object.

`[Deferred: render — ref node 2327:87673 share-sheet and quick-action chit specimens]`. See `_Chit 24` (`2028:79673`), `_Chit 48` (`2028:79770`), `_Chit input` (`2028:79847`) component definitions.

---

# Component variant axes (from component definitions embedded across the page)

### Text input — `TextInputProps`
- `variant`: `"Single Line" | "Quick Action"`
- `size`: `"Default" | "Large"`
- `state`: `"Default" | "Focus" | "Disabled" | "Empty" | "Active Empty"`
- `iconLead`: boolean
- `dropdown`: boolean

(A reduced/older copy of this type also appears with `dropdown?: "False"`, `iconLead?: "False"`, `size?: "Default"`, `state?: "Default"`, `variant?: "Single Line"` — i.e. string-literal "False" rather than boolean. Flagged; reconcile during clean-up.)

### Numeric input
Not surfaced as a discrete prop type in the captured code; rendered structurally as: row 24px tall, bg `--color-bg-secondary`, radius `--radius-medium`, leading `icon.24.prop-text` glyph, value text via `body/medium`. Selected/focus variant adds 1px `--color-border-selected` and a `--color-texthighlight` value highlight. Definition: `Numeric input` `2028:79190`; multi-field variant `Numeric input multi` `2028:79619`.

### Combo input — `ComboInputProps`
- `state`: `"Default"` (observed)
- `iconLead`: `"False"` (string literal, observed)

Definition: `Combo input` `2028:79408`; dropdown menu `_Combo input dropdown` `2028:79874`.

### Color input — `ColorInputProps`
- `state`: `"Default" | "Focus" | "Disabled"`
- `type`: `"Fill" | "Opacity" | "Image" | "Gradient"`
- `variant`: `"Square"`

Definition: `Color input` `2028:79525`.

### Chit — `Chit24Props`
- `state`: `"Default" | "Focus" | "Disabled"` (observed)
- `type`: `"Opacity" | "Image" | "Gradient" | "Fill"` (observed; note this axis appears shared/copied from the paint component)

Definitions: `_Chit 24` `2028:79673`, `_Chit 48` `2028:79770`, `_Chit input` `2028:79847`.

> Note (faithful capture): the per-instance state/disabled props on the redline matrices (Value §2/§3/§4/§5, Combo §2) were not transcribed verbatim — the redline row-label strings, which name each state, were not readable in this capture session (host shell unavailable). They map onto the `state` enums above. Reconcile against the live file during clean-up.

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → light fallback / dark fallback where both observed):

- `--color-bg`: white / #2c2c2c
- `--color-bg-secondary`: #f5f5f5 / #383838
- `--color-bg-measure-tertiary`: #ffe2e0 / #60332a
- `--color-border-selected`: #0d99ff / #0c8ce9
- `--color-icon-fs-secondary`: rgba(0,0,0,0.5) / rgba(255,255,255,0.7)
- `--color-text`: rgba(0,0,0,0.9) / white
- `--color-text-measure`: #dc3412 / #fca397
- `--color-texthighlight`: rgba(13,153,255,0.4) (both modes)

Doc-chrome colors (not tokenized in capture):
- Heading text rgba(0,0,0,0.9); description text rgba(0,0,0,0.6); "LIGHT MODE" label rgba(0,0,0,0.3); "DARK MODE" label rgba(255,255,255,0.3); panel border rgba(0,0,0,0.1); _Status hairline rgba(0,0,0,0.1) @ 32% opacity.

Dimension/radius tokens:
- `--radius-medium`: 0.3125rem (5px) — Numeric/Value input radius
- Row height: 24px (inputs), 32px (Small emphasized / regular Value context), 40px (Large emphasized), 56px (multiline Text input)
- Default input width 88px (numeric), 176px (text), 117px (dropdown), 160px (multi / multiline), 219px (nested text input)
- Nesting gap rule: 8px between input and button (input 219px, button at x=227px, button width 53px)
- Icon box: 24px (`icon.24.prop-text`, glyph "X")
- Redline measure bars: `_col1-wide` 88px, `_col2-wide` 184px

Font assets observed: Whyte Regular, Whyte Book, Whyte Book Italic (doc text); Inter Medium / `body/medium` (component/redline text).
