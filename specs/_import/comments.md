<!--
Source: Figma "Comments" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2012:56281
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2012:63567 (Comment Thread Guidelines), 2012:63534 (Comment Sidebar Guidelines).
Component-definition frames on the page (not transcribed as doc sections; referenced as render sources):
  2012:64105 _Comment Pin Base, 2012:63691 _Comment window reply, 2012:63679 _Comment window row,
  2012:63685 _Comment window titlebar, 2012:63889 _Editor comment sidebar, 2012:63712 Comment compose,
  2012:63899 Comments/Pin, 2012:63731 Comment thread window, 2012:63744 Sidebar row comment.
-->

# Comments — Guidelines (1:1 Figma import)

Page: `2012:56281` "Comments". Two guideline frames (each 1408 wide), plus a set of component-definition frames holding the pin / window / sidebar-row variant sets.

Doc text styles present across the page:
- `.doc/title`: Whyte, Regular, size 36, weight 400, lineHeight 32, letterSpacing 1
- `.doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `_doc/body/body.large` & `body/body.large`: family `body/large/fontFamily`, Regular, size `body/large/fontSize`, weight `body/large/fontWeight`, lineHeight `body/large/lineHeight`, letterSpacing -0.25
- `_doc/body/body.medium`: family `body/medium/fontFamily`, Medium, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5

Both frames open with a `_Status` instance bar (label "UI3", `1:595944`) and a `_Doc/Heading` block.

---

# Frame A — Comment Thread Guidelines

Node: `2012:63567` (1408 × 2376). Layout: column, gap 64px, white bg, bottom padding 64px. Contains `_Status` (`2359:66859`), `_Doc/Heading` (`2012:63569`), and three `Section` frames (each 1408 × 600), each split into a left Description column (x=64) and a right "Light" specimen panel (x=512).

### Doc heading (`2012:63569`)

Title (`I2012:63569;1:596375`, Whyte Regular 36px, rgba(0,0,0,0.9), tracking 0.36px):

> Comment Thread

Description (`I2012:63569;1:596376`, Whyte Regular 18px, `--color-text-secondary`, tracking 0.18px, width 412px), verbatim:

> When clicking on a comment pin, we'll show a reskinned thread view that allows users to quickly read and reply to a thread.

---

## Section A1 — Construction

Node: `2012:63579` (1280 × 600). Description column `2012:63580`.

### Heading + description

Component Name (`2012:63581`, Whyte Regular 18px, rgba(0,0,0,0.9), width 320px):

> Construction

Description (`2012:63582`, Whyte Book 13px, rgba(0,0,0,0.6), tracking 0.13px, width 320px), verbatim:

> We'll increase the width to a clean multiple of 120 (360), and adjust the typography to make use of our new large body text style.

### Numbered labels (`2012:63583` "Labels")

Each label is a `_Label/Num` chip (24px, bg #f5f5f5, Whyte Regular 13px) + Whyte Book 13px description.

| # | Label node | Text (verbatim) |
|---|------------|-----------------|
| 1 | `2012:63586` | Title |
| 2 | `2012:63589` | Thread level actions |
| 3 | `2012:63592` | Reply input |

### Light specimen panel (`2012:63593`)

Panel bg #f5f5f5, radius 13px. Holds one **Comment thread window** specimen (`2012:63594`, 360px wide, bg `--color-bg` white, radius `--radius-large`, shadow `0 0 0.5px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.15)`), composed of:
- `_Comment window titlebar` (`2012:63685` instance) — bg white, 1px `--color-border` border, 40px high.
- `Threads` (`I2012:63594;2012:63734`) — column, gap `--spacer-2`, pt `--spacer-2`; two `_Comment window row` instances, each `pl-[48px] pr-[16px] py-[4px]`.
- `_Comment window reply` (`CommentWindowReply`) — bg white, 64px high, 360px wide.

**Titlebar (`_Comment window titlebar` `2012:63685`):** title text (`2012:63690`) = "Comment". Right-aligned `Icons` group (`2012:63686`): `icon.24.more`, `icon.24.resolve`, `icon.24.close.small`.

**Comment row content** (from `_Comment window row` render): avatar "A", name "Jenny Wen" (`body/large/strong`, 22px line), timestamp "6 hours ago" (`body/large`), body text (`body/large`), verbatim:

> I love where this is headed, but I'm not quite sure about the spacing here. I think things could be nudged over a bit to get to a tighter rhythm.

**Reply input** (`comment.compose.input` `2012:63694`, Typing=False): bg `--color-bg-secondary` #f5f5f5, 32px high, radius `--radius-large`, placeholder text "Reply" (`body/large`).

Redline measures present in this panel (`_Label/Redline/Text`, Inter Medium 11px on `--color-bg-measure` #f24822, white text, radius 2px): 16, 16, 16, 40, 32. Directional-subtle pointer chips numbered 2 and 3 (`_Label/Directional-Subtle` `2012:63618`/`2012:63619`/`2012:63620`) tie the redlines to the numbered labels. Dashed guide lines border #ffc7c2.

`[Deferred: render — ref node 2012:63593 (light panel)]` — component-dependent thread-window construction layout. Prose, labels, redline values captured non-deferred above.

---

## Section A2 — Replies

Node: `2012:63621` (1280 × 600). Description column `2012:63622`.

### Heading + description

Component Name (`2012:63623`):

> Replies

Description (`2012:63624`, Whyte Book 13px), verbatim:

> Similar to today, as a user starts typing into the reply input, we'll increase the height of the reply area to reveal additional controls, and flip the send arrow to a primary state.

### Numbered labels (`2012:63625`)

| # | Label node | Text (verbatim) |
|---|------------|-----------------|
| 1 | `2012:63628` | Add emoji |
| 2 | `2012:63631` | Add mention |
| 3 | `2012:63634` | Send |

### Light specimen panel (`2012:63635`)

One **Comment thread window** specimen (`2012:63636`, `Typing=True` variant) — same titlebar + thread rows, but the reply area is the expanded composer (`CommentWindowReply typing`, bg white, `flex gap-[8px] p-[16px]`, 360px wide). The expanded composer reveals action icons `icon.24.emoji`, `icon.24.mention`, `icon.24.image.small`, and a `icon.24.send` flipped to primary state. Redline measure: 40 (`2012:63639`). Directional-subtle chips `2012:63640`–`2012:63642`.

State axis here: `Typing` = `False | True` on the **Comment thread window** symbol set (`2012:63731`: `2012:63732` Typing=False, `2012:63738` Typing=True) and the **_Comment window reply** symbol set (`2012:63691`: `2012:63692` Typing=False, `2012:63699` Typing=True).

`[Deferred: render — ref node 2012:63635 (light panel)]` — component-dependent typing/expanded reply layout.

---

## Section A3 — On-canvas composer

Node: `2012:63643` (1280 × 600). Description column `2012:63644`.

### Heading + description

Component Name (`2012:63645`):

> On-canvas composer

Description (`2012:63646`, Whyte Book 13px), verbatim:

> The on-canvas comment composer can make use of the same reply interaction, with the "outer" radius style.

### Numbered labels (`2012:63647`)

| # | Label node | Text (verbatim) |
|---|------------|-----------------|
| 1 | `2012:63650` | Add emoji |
| 2 | `2012:63653` | Add mention |
| 3 | `2012:63656` | Send |

### Light specimen panel (`2012:63657`)

Stack of two **Comment compose** specimens (`2012:63661` "Frame 14703", 360px wide):
- `2012:63662` Comment compose, `Typing=False` (56px high) — `comment.compose.input` placeholder "Add a comment", bg white, radius `--radius-large`, shadow `0 0 0.5px rgba(0,0,0,0.18), 0 3px 8px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.1)`, input left 56px / top 12px / 40px high.
- `2012:63663` Comment compose, `Typing=True` (112px high) — expanded composer, input 96px high.

The **Comment compose** symbol set lives at `2012:63712`: `2012:63713` Typing=False (56px), `2012:63720` Typing=True (112px). Note the "outer" radius style (the shadowed floating card on `--color-bg` white) vs. the thread-window reply's inset `--color-bg-secondary` field — this is the distinction the description calls out.

Redline measures: 40 (`2012:63660`), 40 (`2012:63668`). Directional-subtle chips `2012:63676`–`2012:63678`. Dashed guides #ffc7c2.

`[Deferred: render — ref node 2012:63657 (light panel)]` — component-dependent on-canvas composer layout.

---

# Frame B — Comment Sidebar Guidelines

Node: `2012:63534` (1408 × 1248). Layout: column, gap 64px, white bg, bottom padding 64px. Contains `_Status` (`2359:66849`), `_Doc/Heading` (`2012:63536`), and one `Section` (`2012:63539`, 1408 × 800) with Description column (x=64) + "Light" panel (x=476).

### Doc heading (`2012:63536`)

Title (`I2012:63536;1:596375`, Whyte Regular 36px):

> Comment Sidebar

Description (`I2012:63536;1:596376`, Whyte Regular 18px, `--color-text-secondary`, width 412px), verbatim:

> Comments (and similar content types) are shown in a dismissible sidebar on the right when the comment tool is selected.

---

## Section B1 — Row States

Node: `2012:63539` (1280 × 800). Description column `2012:63540`.

### Heading + description

Component Name (`2012:63541`, Whyte Regular 18px):

> Row States

Description (`2012:63542`, Whyte Book 13px), verbatim:

> For each row in the comment sidebar, we can apply these new row hover / selection styles, and tighten our type. Note that here we're showing the unread dot on the right (rather than the left), which also allows us to align this with section header in the collapsed state.

### Light specimen panel (`2012:63543`)

Panel bg white, 1px `--color-border` border, radius 13px. Holds a flex-wrap grid (`2012:63544`, 608px wide, gap `0 128px`) of seven **Sidebar row comment** specimens, with redline state annotations.

**Matrix axes (redline annotations — `_Label/Redline/State-Left` row labels, `_Label/Redline/State-Above` column labels; bg `--color-bg-assistive-tertiary` #ffe0fc, text `--color-text-assistive` #ea10ac, Inter Medium 11px):**

- Column labels (above): **Unread** (`2012:63562`), **Read** (`2012:63563`)
- Row labels (left, top→bottom): **Default** (`2012:63561`), **Replies** (`2012:63564`), **Hover** (`2012:63565`), **Selected** (`2012:63566`)

**The seven specimens (`2012:63545`–`2012:63551`), by props:**

| Node | state | unread | replies |
|------|-------|--------|---------|
| `2012:63545` | Default | true | false |
| `2012:63546` | Default | false | false |
| `2012:63547` | Default | true | true |
| `2012:63548` | Default | false | true |
| `2012:63549` | Hover | true | true |
| `2012:63550` | Hover | false | true |
| `2012:63551` | Selected | false | true |

### Sidebar row comment — variant axes (from `Sidebar row comment` symbol set `2012:63744`)

`SidebarRowCommentProps`:
- `state`: `"Default" | "Hover"` (the Selected specimen `2012:63551` is authored as a flattened instance, bg `--color-bg-selected` #e5f4ff, not a `state` enum value)
- `unread`: boolean (default false)
- `replies`: boolean (default true)
- `message`: string (default below)
- `name`: string (default "Wayne Sun")
- `numPage`: string (default "#3 ∙ Page 1")
- `replyCount`: string (default "2 replies")
- `timestamp`: string (default "Just now")

Symbol set members (`2012:63744`), 10 combinations of `State × Unread × Replies`:

| Symbol node | State | Unread | Replies |
|-------------|-------|--------|---------|
| `2012:63745` | Default | False | True |
| `2012:63759` | Default | False | False |
| `2012:63773` | Hover | False | True |
| `2012:63787` | Hover | False | False |
| `2012:63801` | Selected | False | True |
| `2012:63815` | Selected | False | False |
| `2012:63829` | Default | True | True |
| `2012:63844` | Default | True | False |
| `2012:63859` | Hover | True | True |
| `2012:63874` | Hover | True | False |

### Default specimen content (token capture)

Default text strings (placeholders used across the row specimens):
- `numPage` (`2012:63750`, `body/medium`, `--color-text-secondary`): "#3 ∙ Page 1"
- `name` (`2012:63752`, `body/medium`, `--color-text`): "Wayne Sun"
- `timestamp` (`2012:63753`, `body/medium`, `--color-text-secondary`): "Just now"
- `message` (`2012:63754`, `body/medium`, `--color-text-secondary`, width 208px), verbatim:

  > What happens if we adjust this to handle a light and dark mode? I'm not sure we're ready to handle that quite...

- `replyCount` (`2012:63755`): "2 replies" — `--color-text-secondary` when read, `--color-text-brand` #007be5 when unread (`2012:63839`).

**Row styling (token-driven, captured):**
- Outer row: bg `--color-bg`, `px-[8px] py-[4px]`.
- Inner Content card: `px-[8px] py-[var(--spacer-2,8px)]`, radius `--radius-medium` (0.3125rem / 5px), width 224px.
  - Hover (with replies): bg `--color-bg-hover` #f5f5f5.
  - Selected: bg `--color-bg-selected` #e5f4ff.
- Avatar list (`Avatar List`): gap `--spacer-1` (0.3rem / 4px), pb `--spacer-1`. Avatars 24px, rounded 1000px.
  - First avatar "W": unread/default-no-replies fill `--color-multiplayeryellow` #ffcd29 (text `--color-textonmultiplayeryellow` rgba(0,0,0,0.9)); otherwise bg `--color-bg-secondary` #f5f5f5 with inner `--color-bg-tertiary` #e6e6e6 (text `--color-text`).
  - Second avatar "K" (replies only): unread fill `--color-multiplayergreen` #14ae5c (text `--color-textonmultiplayergreen` white); otherwise `--color-bg-tertiary`.
  - `_Avatar status` ring overlay present on unread states.
- Unread indicator: `icon.16.unread` dot, positioned `right-[4px] top-[12px]` (i.e. on the right) — per the description note.
- Hover (with replies) reveals `Icons` group top-right (`right-[8px] top-[8px]`, gap `--spacer-2`): `icon.24.more`, `icon.24.resolve`.

Note (faithful capture): `icon.16.unread` (`1:540223`) carries a Figma component description that is unrelated boilerplate ("Represents the action of 'zooming in'…full-screen…"); this is a stale/wrong component note in the source, preserved as-is.

Redline guides #ffc7c2 frame the grid (`2012:63552`–`2012:63560`).

`[Deferred: render — ref node 2012:63543 (light panel)]` — component-dependent 7-cell row-state grid. Variant axes, props, strings, and token styling captured non-deferred above.

---

# Component-definition frames (render sources, not doc sections)

These frames on the page hold the symbol/variant sets the guideline specimens instance. Listed for reference; not transcribed as prose.

- **`2012:64105` `_Comment Pin Base`** (96 × 464) — 8 base pin symbols across `State` (Unread/Read) × `Selected` (True/False) × `Active` (True/False) × `Type` (Pin 32px / Cluster 64px). Pin shape: bg `--color-bg-brand` #0d99ff, asymmetric radius (`--radius-small` 2px bottom-left, 16px other corners), shadow `0 0 0.5px rgba(0,0,0,0.18), 0 3px 8px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.1)`.
- **`2012:63899` `Comments/Pin`** (1038 × 545) — full pin component variant matrix: `Variant` (1, 2, 3, 4, 5+) × `Type` (Pin/Cluster) × `Hover` (False/True) × `Read` (False/True) × `Selected` (False/True) × `Active` (True/False). Pin widths grow with avatar count (32 → 52 → 72px); Cluster is 64px. Hover variants expand to 240px preview cards (88px / 148px tall).
- **`2012:63731` `Comment thread window`** (424 × 782) — `Typing` False (360 × 312) / True (360 × 374).
- **`2012:63712` `Comment compose`** (424 × 264) — `Typing` False (360 × 56) / True (360 × 112).
- **`2012:63691` `_Comment window reply`** (424 × 286) — `Typing` False (360 × 64) / True (360 × 126).
- **`2012:63679` `_Comment window row`** (360 × 96) — single symbol.
- **`2012:63685` `_Comment window titlebar`** (360 × 40) — single symbol.
- **`2012:63889` `_Editor comment sidebar`** (240 × 664) — single symbol.
- **`2012:63744` `Sidebar row comment`** (619 × 932) — 10-member `State × Unread × Replies` set (table above).

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → light fallback observed; dark not present in these light-only frames):

- `--color-bg`: white
- `--color-bg-secondary`: #f5f5f5
- `--color-bg-tertiary`: #e6e6e6
- `--color-bg-brand`: #0d99ff
- `--color-bg-disabled`: #d9d9d9
- `--color-bg-hover`: #f5f5f5
- `--color-bg-selected`: #e5f4ff
- `--color-bg-assistive-tertiary`: #ffe0fc
- `--color-bg-measure`: #f24822
- `--color-bg-measure-tertiary`: #ffe2e0
- `--color-border`: #e6e6e6
- `--color-border-measure-strong`: #dc3412
- `--color-text`: rgba(0,0,0,0.9)
- `--color-text-secondary`: rgba(0,0,0,0.5)
- `--color-text-tertiary`: rgba(0,0,0,0.3)
- `--color-text-brand`: #007be5
- `--color-text-assistive`: #ea10ac
- `--color-text-onmeasure`: white
- `--color-multiplayeryellow`: #ffcd29
- `--color-multiplayergreen`: #14ae5c
- `--color-textonmultiplayeryellow`: rgba(0,0,0,0.9)
- `--color-textonmultiplayergreen`: white
- `--ramp-grey-300`: #d9d9d9 (directional-subtle num chip)
- Guide / redline dashed line: #ffc7c2 (hardcoded, not tokenized)

Dimension / radius tokens:
- `--spacer-1`: 0.3rem (4px)
- `--spacer-2`: 0.5rem (8px)
- `--radius-small`: 0.125rem (2px) — pin bottom-left corner
- `--radius-medium`: 0.3125rem (5px) — sidebar row inner card
- `--radius-large`: 0.8125rem (~13px) — comment window, compose & reply input radius
- `--radius-full`: 9999px — avatar / unread-replies chip
- Comment thread window: 360px wide; titlebar 40px high; reply row pl 48px / pr 16px.
- Sidebar row inner card: 224px wide; message/replyCount text 208px wide; avatar 24px.
- Redline label text: Inter Medium 11px, tracking 0.055px, on #f24822 (measure) or #ffe0fc (state).
