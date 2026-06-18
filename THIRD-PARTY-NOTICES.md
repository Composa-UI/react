# Third-Party Notices

`@composa-ui/react` is licensed under the MIT License (see [`LICENSE`](./LICENSE)).
It includes third-party material as noted below.

## Material Symbols (Google)

[`src/react/builtin-glyphs.js`](./src/react/builtin-glyphs.js) embeds a small set
of **structural** UI glyphs — the chevrons, check, minus, and close/add affordances
that components draw for their own anatomy — as raw SVG path data. These vector
paths are derived from Google's **Material Symbols** icon set (Rounded style,
weight 300).

- **Source:** https://github.com/google/material-design-icons
- **License:** Apache License, Version 2.0 — a full copy is included as
  [`LICENSE-APACHE-2.0.txt`](./LICENSE-APACHE-2.0.txt) (also at
  https://www.apache.org/licenses/LICENSE-2.0)
- **Copyright** © Google LLC

Glyphs used (Composa name → Material Symbol name):

| Composa | Material Symbol |
| --- | --- |
| `chevronDown` | `expand_more` |
| `chevronUp` | `expand_less` |
| `chevronLeft` | `chevron_left` |
| `chevronRight` | `chevron_right` |
| `check` | `check` |
| `minus` / `dash` | `remove` |
| `plusSmall` | `add` |
| `close` | `close` |

No Material Symbols font or npm package is bundled — only the listed path data is
embedded, so the package has no icon-set runtime dependency. Composa does **not**
ship any content-icon set: content icons (a button's leading glyph, a toolbar's
shape icons) are passed in as slots by the host application.
