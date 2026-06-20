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

`@composa-ui/icons` also bundles the official Material Symbols variable WOFF2
files from the same Google repository so hosts can opt into runtime fill, weight,
grade, and optical-size axes without depending on a community npm package.

Bundled font files:

| File | Source |
| --- | --- |
| `packages/icons/src/fonts/material-symbols-outlined.woff2` | `variablefont/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2` |
| `packages/icons/src/fonts/material-symbols-rounded.woff2` | `variablefont/MaterialSymbolsRounded[FILL,GRAD,opsz,wght].woff2` |
| `packages/icons/src/fonts/material-symbols-sharp.woff2` | `variablefont/MaterialSymbolsSharp[FILL,GRAD,opsz,wght].woff2` |

Composa does **not** ship a broad content-icon React component set from
`@composa-ui/react`: content icons are still passed in as slots by the host
application. The separate `@composa-ui/icons` package owns curated icon assets and
the optional runtime Material Symbols font path.
