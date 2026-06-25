<!--
Source: Figma "Badges Guidelines" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2012:34868
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2012:34871, 2012:34876, 2012:34901, 2012:34930, 2012:34949, 2012:34968, 2012:34987
-->

# Badges — Guidelines (1:1 Figma import)

Page frame: `2012:34868` "Badges Guidelines" (1280 × 2904). Contains a `_Status` instance bar (`2359:58136`) and a content frame "Frame 3" (`2012:34870`) holding seven `_Section/Component` sections.

Doc text styles present across the page:
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `_doc/body/body.medium`: family `body/medium/fontFamily`, Medium, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5
- `_doc/body/body.large`: family `body/large/fontFamily`, Regular, size `body/large/fontSize`, weight `body/large/fontWeight`, lineHeight `body/large/lineHeight`, letterSpacing -0.25 (only Section 7)

---

## Section 1 — Component intro / Definition

Node: `2012:34871` (`_Section/Component`, 1280 × 216)

### Heading + description

Component Name (`2012:34873`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Badges

Description (`2012:34874`, Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 444px), verbatim:

> Badges are used to call attention to status, and come in a strong "filled" and light "outline" form. We typically use them to call attention to things like "New" or "Beta" features, descriptions like "Added", "Removed", and labels for individuals, like "Admin".

---

## Section 2 — Neutral / Invert Badge

Node: `2012:34876` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2012:34878`, Whyte Regular 18px):

> Neutral / Invert Badge

Description (`2012:34879`, Whyte Book 13px), verbatim:

> A generic label that has contrast against the background. We usually use these for labeling types of users, like "Admins" or "Guests"

### Light / Dark context (`2012:34880`, 704px wide)

Two panels side by side: **Light** (`2012:34881`, bg `--color-bg` white, 1px rgba(0,0,0,0.1) border) labeled "LIGHT MODE" (`2012:34882`), and **Dark** (`2012:34891`, bg `--color-bg` #2c2c2c) labeled "DARK MODE" (`2012:34892`).

Each panel has a Drop Zone (`2012:34883` light / `2012:34893` dark) laying out two `Badge small` specimens stacked (Strong above Light) with redline labels. The redline labels use `_Label/Redline/State-Left` styled with `--color-bg-assistive-tertiary` (#ffe0fc light / #68275e dark) and text `--color-text-assistive` (#ea10ac light / #fc9ce0 dark). A `Measurement` annotation (`2012:34888` light / `2012:34898` dark) shows the badge height **16** via `_Label/Redline/Vertical Bar` + `_Label/Redline/Text` (bg `--color-bg-measure` #f24822 light / #e03e1a dark; text `--color-text-onmeasure` white; bar `--color-border-measure-strong` #dc3412 light / #fca397 dark).

**The 2 badge specimens (by row), redline-labeled:**

| Row label (left) | Form | Badge node (light / dark) | Text | Text color var (light / dark) |
|------------------|------|---------------------------|------|-------------------------------|
| **Strong** (`2012:34886` / `2012:34896`) | filled, bg `--color-bg-inverse` | `2012:34884` / `2012:34894` | Admin | `--color-text-oninverse` (rgba(255,255,255,0.9) / rgba(0,0,0,0.9)) |
| **Light** (`2012:34887` / `2012:34897`) | outline, border `--color-border` | `2012:34885` / `2012:34895` | Guest | `--color-text` (rgba(0,0,0,0.9) / white) |

### Token / value capture (Neutral / Invert)

`Badge small` shared geometry: height 16px, `px-[--spacer-1]` (≈0.3rem / 4px), gap `--spacer-1`, radius `--radius-medium` (0.3125rem / 5px). Label uses `body/medium` (Inter Medium 11px, weight 450, tracking 0.055px, lineHeight 16px).

| Variant | Fill / border | Light fallback | Dark fallback |
|---------|---------------|----------------|---------------|
| Strong (filled) | bg `--color-bg-inverse`; text `--color-text-oninverse` | #2c2c2c / rgba(255,255,255,0.9) | white / rgba(0,0,0,0.9) |
| Light (outline) | border `--color-border`; text `--color-text` | #e6e6e6 / rgba(0,0,0,0.9) | #444 / white |

`[Deferred: render — ref nodes 2012:34883 (light DZ), 2012:34893 (dark DZ)]` — component-dependent specimen + redline/measurement layout. Token/text data above captured non-deferred.

---

## Section 3 — Brand / FigJam Badge

Node: `2012:34901` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2012:34903`, Whyte Regular 18px):

> Brand / FigJam Badge

Description (`2012:34904`, Whyte Book 13px), verbatim:

> When highlighting new or beta features, we should use a -brand (blue) or -figjam (purple) badge depending on where the badge will appear.

### Light / Dark context (`2012:34905`)

Light panel (`2012:34906`, "LIGHT MODE" `2012:34907`) and Dark panel (`2012:34918`, "DARK MODE" `2012:34919`). DZ `2012:34908` light / `2012:34920` dark. Two redline rows: **Brand** (`2012:34916` / `2012:34928`) and **FigJam** (`2012:34917` / `2012:34929`).

**Brand row** (`2012:34909` light / `2012:34921` dark) — three `Badge small`, gap 8px:

| Badge node (light / dark) | Text | Form | Text color var (light / dark) |
|---------------------------|------|------|-------------------------------|
| `2012:34910` / `2012:34922` | New | filled, bg `--color-bg-brand` | `--color-text-onbrand` white / white |
| `2012:34911` / `2012:34923` | Beta | outline, border `--color-border-brand` | `--color-text-brand` #007be5 / #7cc4f8 |
| `2012:34912` / `2012:34924` | Beta feedback | outline + trailing `icon.16.feedback`, border `--color-border-brand` | `--color-text-brand` #007be5 / #7cc4f8 |

**FigJam row** (`2012:34913` light / `2012:34925` dark) — two `Badge small`, gap 8px:

| Badge node (light / dark) | Text | Form | Text color var (light / dark) |
|---------------------------|------|------|-------------------------------|
| `2012:34914` / `2012:34926` | New | filled, bg `--color-bg-figjam` | `--color-text-onfigjam` white / white |
| `2012:34915` / `2012:34927` | Beta | outline, border `--color-border-figjam` | `--color-text-figjam` #8638e5 / #c5b2dc |

### Token / value capture (Brand / FigJam)

| Variant | Fill / border | Light fallback | Dark fallback |
|---------|---------------|----------------|---------------|
| Brand, filled | bg `--color-bg-brand` | #0d99ff | #0c8ce9 |
| Brand, outline | border `--color-border-brand` | #bde3ff | #105cad |
| FigJam, filled | bg `--color-bg-figjam` | #9747ff | #8a38f5 |
| FigJam, outline | border `--color-border-figjam` | #e4ccff | #652ca8 |

`icon.16.feedback` (component node `1:540381`) — 16px icon box with an 8px glyph inset (left 4 / top 4), trailing the "Beta feedback" label, rendered with `-scale-y-100`. Figma component description (keywords): "edit, knobs, settings, configure, config, admin". `[Deferred: render — ref node icon.16.feedback]` glyph itself.

`[Deferred: render — ref nodes 2012:34908 (light DZ), 2012:34920 (dark DZ)]` — component-dependent specimen + redline layout.

---

## Section 4 — Danger Badge

Node: `2012:34930` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2012:34932`, Whyte Regular 18px):

> Danger Badge

Description (`2012:34933`, Whyte Book 13px), verbatim:

> Used for destructive actions, errors, or something that urgently needs attention.

### Light / Dark context (`2012:34934`)

Light panel (`2012:34935`, "LIGHT MODE" `2012:34936`) and Dark panel (`2012:34942`, "DARK MODE" `2012:34943`). DZ `2012:34937` light / `2012:34944` dark. Two redline rows: **Strong** (`2012:34940` / `2012:34947`) and **Light** (`2012:34941` / `2012:34948`).

| Row label | Form | Badge node (light / dark) | Text | Text color var (light / dark) |
|-----------|------|---------------------------|------|-------------------------------|
| **Strong** | filled, bg `--color-bg-danger` | `2012:34938` / `2012:34945` | Removed | `--color-text-ondanger` white / white |
| **Light** | outline, border `--color-border-danger` | `2012:34939` / `2012:34946` | Removed | `--color-text-danger` #dc3412 / #fca397 |

### Token / value capture (Danger)

| Variant | Fill / border | Light fallback | Dark fallback |
|---------|---------------|----------------|---------------|
| Danger, filled | bg `--color-bg-danger` | #f24822 | #e03e1a |
| Danger, outline | border `--color-border-danger` | #ffc7c2 | #963323 |

`[Deferred: render — ref nodes 2012:34937 (light DZ), 2012:34944 (dark DZ)]` — component-dependent specimen + redline layout.

---

## Section 5 — Warning Badge

Node: `2012:34949` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2012:34951`, Whyte Regular 18px):

> Warning Badge

Description (`2012:34952`, Whyte Book 13px), verbatim:

> Used to draw attention to potential issues, or warn a user about a potential problem.

### Light / Dark context (`2012:34953`)

Light panel (`2012:34954`, "LIGHT MODE" `2012:34955`) and Dark panel (`2012:34961`, "DARK MODE" `2012:34962`). DZ `2012:34956` light / `2012:34963` dark. Two redline rows: **Strong** (`2012:34959` / `2012:34966`) and **Light** (`2012:34960` / `2012:34967`).

| Row label | Form | Badge node (light / dark) | Text | Text color var (light / dark) |
|-----------|------|---------------------------|------|-------------------------------|
| **Strong** | filled, bg `--color-icon-warning` | `2012:34957` / `2012:34964` | In review | `--color-text-onwarning` rgba(0,0,0,0.9) / rgba(0,0,0,0.9) |
| **Light** | outline, border `--color-border-warning` | `2012:34958` / `2012:34965` | Modified | `--color-text-warning` #b86200 / #f7d15f |

> Note (faithful capture): the Warning filled fill uses `--color-icon-warning` (not a `--color-bg-warning` token) — preserving the source var as authored.

### Token / value capture (Warning)

| Variant | Fill / border | Light fallback | Dark fallback |
|---------|---------------|----------------|---------------|
| Warning, filled | bg `--color-icon-warning` | #ffcd29 | #f3c11b |
| Warning, outline | border `--color-border-warning` | #ffe8a3 | #925711 |

`[Deferred: render — ref nodes 2012:34956 (light DZ), 2012:34963 (dark DZ)]` — component-dependent specimen + redline layout.

---

## Section 6 — Success Badge

Node: `2012:34968` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2012:34970`, Whyte Regular 18px):

> Success Badge

Description (`2012:34971`, Whyte Book 13px), verbatim:

> Used to indicate confirmation, approval, or when a task has completed.

### Light / Dark context (`2012:34972`)

Light panel (`2012:34973`, "LIGHT MODE" `2012:34974`) and Dark panel (`2012:34980`, "DARK MODE" `2012:34981`). DZ `2012:34975` light / `2012:34982` dark. Two redline rows: **Strong** (`2012:34978` / `2012:34985`) and **Light** (`2012:34979` / `2012:34986`).

| Row label | Form | Badge node (light / dark) | Text | Text color var (light / dark) |
|-----------|------|---------------------------|------|-------------------------------|
| **Strong** | filled, bg `--color-bg-success` | `2012:34976` / `2012:34983` | Approved | `--color-text-onsuccess` white / white |
| **Light** | outline, border `--color-border-success` | `2012:34977` / `2012:34984` | Approved | `--color-text-success` #009951 / #79d297 |

### Token / value capture (Success)

| Variant | Fill / border | Light fallback | Dark fallback |
|---------|---------------|----------------|---------------|
| Success, filled | bg `--color-bg-success` | #14ae5c | #198f51 |
| Success, outline | border `--color-border-success` | #aff4c6 | #0a5c35 |

`[Deferred: render — ref nodes 2012:34975 (light DZ), 2012:34982 (dark DZ)]` — component-dependent specimen + redline layout.

---

## Section 7 — Branching & Merging (Badge sizes: large / small)

Node: `2012:34987` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2012:34989`, Whyte Regular 18px):

> Branching & Merging

Description (`2012:34990`, Whyte Book 13px), verbatim:

> Used to indicate the status of a branch and whether it's merged or archived. There are two variants: large and small. The large variant lives in toolbar and the small lives in the branch and merging modal.

### Light / Dark context (`2012:34991`)

Light panel (`2012:34992`, "LIGHT MODE" `2012:34993`) and Dark panel (`2012:35004`, "DARK MODE" `2012:35005`). Two redline rows by **size**: **Large** (`2012:34995` / `2012:35007`) and **Small** (`2012:35000` / `2012:35012`). Each size row pairs a Merged (success-outline) and an Archived (disabled-outline) badge, gap 8px. All badges lead with `icon.16.unread`.

**Large row** (`2012:34996` group light / `2012:35008` dark):

| Badge node (light / dark) | Variant | Text | Text color var (light / dark) | Border var (light / dark) |
|---------------------------|---------|------|-------------------------------|---------------------------|
| `2012:34997` / `2012:35009` | Merged | Merged | `--color-text-success` #009951 / #79d297 | `--color-border-success` #aff4c6 / #0a5c35 |
| `2012:34998` / `2012:35010` | Archived | Archived | `--color-text-disabled` rgba(0,0,0,0.3) / rgba(255,255,255,0.4) | `--color-border-disabled` #e6e6e6 / #444 |

**Small row** (`2012:35001` group light / `2012:35013` dark):

| Badge node (light / dark) | Variant | Text | Text color var (light / dark) | Border var (light / dark) |
|---------------------------|---------|------|-------------------------------|---------------------------|
| `2012:35002` / `2012:35014` | Merged | Merged | `--color-text-success` #009951 / #79d297 | `--color-border-success` #aff4c6 / #0a5c35 |
| `2012:35003` / `2012:35015` | Archived | Archived | `--color-text-disabled` rgba(0,0,0,0.3) / rgba(255,255,255,0.4) | `--color-border-disabled` #e6e6e6 / #444 |

### Badge component — variant axes (from component definition embedded in this frame)

`BadgeLargeProps`:
- `variant`: `"Merged" | "Archived"` (default `"Merged"`)

`BadgeSmallProps`:
- `variant`: `"Merged" | "Archived"` (default `"Merged"`)
- `iconLead`: `"True"` (default `"True"`)
- `strong`: `"False"` (default `"False"`)

### Token / value capture (sizes)

Both sizes: bg `--color-bg` (white / #2c2c2c), border-solid, radius `--radius-medium` (0.3125rem / 5px), height 16px, leading `icon.16.unread` (16px box, 6px glyph centered).

- **Badge large** label uses `body/large` (Inter Regular 13px, weight 450, tracking -0.0325px, lineHeight 22px); container `pr-[--spacer-1]` (4px), icon flush left.
- **Badge small** label uses `body/medium` (Inter Medium 11px, weight 450, tracking 0.055px, lineHeight 16px); no extra horizontal padding (icon + label flush).

`icon.16.unread` (component node `1:540223`) — Figma component description (verbatim, note: mismatched, references zoom/full-screen): "Represents the action of 'zooming in', 'maximizing', 'full-screen-ing' an element. For instance used on the full-screen button in presentation mode." `[Deferred: render — ref node icon.16.unread]` glyph itself.

`[Deferred: render — ref nodes 2012:34994 (light DZ), 2012:35006 (dark DZ)]` — component-dependent two-size specimen + redline layout.

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → light fallback / dark fallback where both observed):

- `--color-bg`: white / #2c2c2c
- `--color-bg-inverse`: #2c2c2c / white
- `--color-bg-brand`: #0d99ff / #0c8ce9
- `--color-bg-figjam`: #9747ff / #8a38f5
- `--color-bg-danger`: #f24822 / #e03e1a
- `--color-bg-success`: #14ae5c / #198f51
- `--color-icon-warning`: #ffcd29 / #f3c11b (used as Warning fill)
- `--color-bg-assistive-tertiary`: #ffe0fc / #68275e
- `--color-bg-measure`: #f24822 / #e03e1a
- `--color-border`: #e6e6e6 / #444
- `--color-border-brand`: #bde3ff / #105cad
- `--color-border-figjam`: #e4ccff / #652ca8
- `--color-border-danger`: #ffc7c2 / #963323
- `--color-border-warning`: #ffe8a3 / #925711
- `--color-border-success`: #aff4c6 / #0a5c35
- `--color-border-disabled`: #e6e6e6 / #444
- `--color-border-measure-strong`: #dc3412 / #fca397
- `--color-text`: rgba(0,0,0,0.9) / white
- `--color-text-oninverse`: rgba(255,255,255,0.9) / rgba(0,0,0,0.9)
- `--color-text-onbrand`: white / white
- `--color-text-brand`: #007be5 / #7cc4f8
- `--color-text-onfigjam`: white / white
- `--color-text-figjam`: #8638e5 / #c5b2dc
- `--color-text-ondanger`: white / white
- `--color-text-danger`: #dc3412 / #fca397
- `--color-text-onwarning`: rgba(0,0,0,0.9) / rgba(0,0,0,0.9)
- `--color-text-warning`: #b86200 / #f7d15f
- `--color-text-onsuccess`: white / white
- `--color-text-success`: #009951 / #79d297
- `--color-text-disabled`: rgba(0,0,0,0.3) / rgba(255,255,255,0.4)
- `--color-text-assistive`: #ea10ac / #fc9ce0
- `--color-text-onmeasure`: white / white

Dimension/radius tokens:
- `--spacer-1`: ≈0.3rem (4px) — badge horizontal padding + internal gap
- `--radius-medium`: 0.3125rem (5px) — badge corner radius
- Badge height: 16px (confirmed by Section 2 measurement annotation = 16)
- `icon.16.unread` / `icon.16.feedback`: 16px box, 6–8px glyph inset

Type tokens:
- `body/medium`: Inter Medium 11px, weight 450, lineHeight 16px, tracking 0.055px — small badge label
- `body/large`: Inter Regular 13px, weight 450, lineHeight 22px, tracking -0.0325px — large badge label
