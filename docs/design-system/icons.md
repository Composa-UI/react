# Composa UI Icons

The icon renderer uses SVG assets exported from `UI3: Figma's UI Kit (Community)` and stored in `src/design-system/icon-assets.js`.

## Exact Figma UI3 Exports

| Code icon | Figma component | Component key |
| --- | --- | --- |
| `move` | `icon.24.move` | `d944d4c5f16d4f28930f71fe543b49852942c7ac` |
| `text` | `icon.24.text` | `dde3e1c7799062214851e9cea53313e0b6aa7185` |
| `image` | `icon.24.image` | `f49771978f9a2e516be3aac4fee75866489b745a` |
| `shapes` | `icon.24.shapes` | `faf2f3136d2b86b523638d6645784d39ef1a495f` |
| `table` | `icon.24.table` | `5394a4c645f0f04b0ef44fdd3d2f4fa0bf7516f8` |
| `comment` | `icon.24.comment` | `6335f32b1d16c7871a5e5f5c648b65b2883a1d50` |
| `ai` | `icon.24.qwand` | `1b5d77519af9e605a7d708dd9e6a31204a806776` |
| `plusSmall` | `icon.24.plus.small` | `cb177df749af47344a6d079d292cd1b11df2ca21` |
| `design` | `icon.24.design` | `5579e742967918b0393c01d0877ea42e51b7e24e` |
| `play` | `icon.24.play` | `04688d0571574f18c08a7aceb1805ddcce48799d` |
| `adjustTone` | `icon.16.adjust` | `6a59bbf042872ec285819886d00b735f943977d9` |
| `styles` | `icon.24.styles` | `b09ada5158e512c04358afba0ca84906b3aae53b` |
| `minus` | `icon.24.minus` | `19fe756262e2d6dd142b0d310b9b8e3fc7721d24` |
| `chevronDown` | `icon.16.chevron.down` | `29e28cbf72703ba01e5b74564f2c63cc8ce797af` |
| `sidebarOpen` | `icon.24.sidebar.open` | `63c1ba94baee09c807ec2dda60d1fc5c5d9a745f` |
| `figma` | `icon.24.figma` | `24c9b79baf3a039894cc2f72d84669384051fc91` |
| `interactive` | `icon.24.interactive` | `93f1c3e069c598cdb777e9be6bc203f5f757f9a4` |
| `generateNotes` | `icon.24.write` | `77856528c76a2391cd8765161dedb02aae23756d` |

## Current Aliases

| Code icon | Source | Reason |
| --- | --- | --- |
| `plus` | `plusSmall` | Same plus glyph needed in multiple button sizes. |
| `slideGrid` | `sidebarOpen` | Exact grid icon search timed out and needs follow-up extraction. |

`Icon()` normalizes exported black fills to `currentColor`, so selection and brand states can style icons without modifying SVG path data.
