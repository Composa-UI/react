# Visual verification harness

Render any Storybook story headlessly to a PNG, then compare it against the
component's Figma node. This is the "show me the pixels" gate that catches
empty-icon / clipped / off-spec components **before** they ship — the kinds of
regressions a contract verifier or a green `npm run check` cannot see.

The tool is `tools/verify-visual.mjs`. It boots (or reuses) Storybook, navigates
to the story's `iframe.html`, waits for the component to mount, and writes a PNG
of the rendered story root plus a JSON sidecar.

## The loop

```
render story  →  pull the Figma node  →  compare  →  fix  →  repeat
```

1. **Render** the story to a PNG:

   ```sh
   npm run verify:visual -- composa-ui-components-modules-editor-editortoolbar--default
   ```

   Output lands in `tools/.visual-output/<storyId>.png` (gitignored) alongside a
   `<storyId>.json` sidecar (title, viewport, console errors, Figma reference,
   capture time).

2. **Pull the Figma node** for that component. With the Figma MCP:

   ```
   get_screenshot({ fileKey: "<KEY>", nodeId: "<NODE-ID>" })
   ```

   (The EditorToolbar reference, for example, is Figma node `86-5602` per
   `AGENTS.md`.) Save or note that reference image.

3. **Compare** the rendered PNG against the Figma screenshot side by side — a
   human eyeballs them, or an agent reads both images and reports diffs
   (missing icons, wrong spacing, clipped overlays, off-spec colours). v1 does
   not compute a pixel-diff number; the value is having both images in hand.

4. **Fix** at the primitive layer (per `CLAUDE.md` / `AGENTS.md`), then re-render
   and confirm.

## Usage

```sh
# Self-booting: the tool starts its own Storybook from this worktree,
# screenshots, and shuts the server down on exit.
npm run verify:visual -- <storyId>

# Against an already-running Storybook (faster for repeated runs):
npm run verify:visual -- <storyId> --url http://127.0.0.1:6011

# Options
npm run verify:visual -- <storyId> --viewport 1440x900
npm run verify:visual -- <storyId> --full-page
npm run verify:visual -- <storyId> --out tools/.visual-output
npm run verify:visual -- <storyId> --figma-file <KEY> --figma-node <NODE-ID>
```

### Story ids

A story id is the kebab-cased meta `title` + `--` + the kebab-cased export.
You don't have to get it exact: pass a **fragment** and the tool resolves it
against the live Storybook index, erroring with candidates if it is ambiguous.

```sh
npm run verify:visual -- buttons--toggle          # → composa-ui-components-base-buttons--toggle
npm run verify:visual -- editortoolbar--default   # → composa-ui-...-editortoolbar--default
```

To list every story id, open Storybook and read `/<host>/index.json`, or pass a
nonsense fragment and read the suggestions the tool prints.

## How it works

- **Storybook**: with no `--url`, the tool spawns `storybook dev` on a free port
  from this worktree, waits for `/index.json`, and kills it on exit. This
  guarantees the rendered story matches the **current** source taxonomy (a stale
  long-running Storybook may serve old story ids). Pass `--url` to reuse a server
  you already have running.
- **Browser**: it reuses the locally installed **system Chrome** (`/Applications/
  Google Chrome.app`) over the DevTools protocol, so **no browser download** is
  needed (important on a disk-tight machine). If system Chrome is absent it falls
  back to Playwright's bundled chromium — that download honours
  `PLAYWRIGHT_BROWSERS_PATH`, which should point at the SSD.
- **Render wait**: it waits for `#storybook-root` to have children and the
  network to go idle, awaits `document.fonts.ready`, then screenshots the story
  root element (tightly cropped to the component) — or the full page with
  `--full-page`.
- **Console errors** during render are captured into the sidecar JSON, so a
  silent 404 on an icon asset shows up even if the screenshot looks plausible.

## Disk hygiene

This machine's root volume is tight; keep installs and caches on the SSD:

```sh
export npm_config_cache=/Volumes/SatechiSSD/.npm-cache
export PLAYWRIGHT_BROWSERS_PATH=/Volumes/SatechiSSD/.playwright-browsers
```

The harness itself adds **no new dependencies** — it uses the already-installed
`@playwright/test` plus system Chrome.

## Known limits (v1)

- No automated pixel-diff number. Comparison is human/agent eyeballing the two
  PNGs. (Adding `pixelmatch` + `pngjs` is the obvious v2 step but was skipped to
  avoid new installs on a disk-tight machine.)
- The static `build-storybook` currently fails when the trial ABC Whyte font is
  absent, so the harness uses the **dev server** path. The tool auto-creates a
  gitignored 0-byte font placeholder so the dev server build resolves the import
  and falls back to Inter.
- Hover/menu-open states are whatever the story renders by default (e.g. the
  `Toggle` story shows its tooltip because its meta wraps in `OverlayHost`). To
  capture a specific interaction state, add a dedicated story.
