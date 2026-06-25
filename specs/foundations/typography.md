<!-- Source: Figma UI3 "Typography Tokens" 1:547050 (file 4kilp0ShQiYsoUPJdleqEH).
     Token values: design/figma-tokens/typography.tokens.json.
     maintainer: Figma specifies Whyte for display (licensed trial — removed here);
     Composa uses IBM Plex Sans for display. Kit labels body.small "9/16" but its
     line-height token is 14 — 9/14 is correct. -->

# Typography

Type is organized around three t-shirt sizes — **large, medium, small** — for both body
text and headings, so you compose hierarchy from a small, consistent set. Body text adds
a **strong** variant for emphasis, so you never reach for an ad-hoc bold weight.

## Type scale

| Token | Font | Size / line-height | Weight | Tracking | Use for |
|---|---|---|---|---|---|
| `heading.display` | IBM Plex Sans | 48 / 56 | 450 | −3 | Expressive, heavily-branded moments |
| `heading.large` | Inter | 24 / 32 | 550 | −1.7 | The primary page title in large views |
| `heading.medium` | Inter | 15 / 25 | 550 | −0.5 | Section headings |
| `heading.small` | Inter | 13 / 22 | 550 | −0.25 | Sub-section headings |
| `body.large` | Inter | 13 / 22 | 450 | −0.25 | The largest body text — multi-line reading copy |
| `body.large.strong` | Inter | 13 / 22 | 550 | −0.25 | Emphasis within large body text |
| `body.medium` | Inter | 11 / 16 | 450 | +0.5 | **The default** for UI — inputs, buttons, most controls |
| `body.medium.strong` | Inter | 11 / 16 | 550 | +0.5 | Emphasis and labels |
| `body.small` | Inter | 9 / 14 | 450 | +0.5 | The smallest text — avatars, badges |
| `body.small.strong` | Inter | 9 / 14 | 550 | +0.5 | Emphasis within small text |

## Families & weights

- **Inter** is the default UI typeface; **IBM Plex Sans** is used only for display
  headings; **Roboto Mono** for monospaced values.
- Two weights do all the work: **regular (450)** and **strong (550)**. Use the `.strong`
  token for emphasis rather than choosing a weight directly.

## Usage

- **`body.medium` is the default** for nearly all interface text — inputs, buttons,
  control labels. Reach for another size only to create deliberate hierarchy.
- Use a **`.strong`** variant for emphasis, never a hand-picked heavier weight.
- **`body.small`** is for genuinely small chrome (badges, avatars), not running copy.
- Headings structure a page or section; to emphasize inline interface text, use
  `body.*.strong` instead of a heading.
