# Composa annotation system — primer for agents

**Audience:** any AI agent (Figma agent, coding agent) authoring or editing Composa annotations.
**Point your agent at this one file.** It is the contract. If you follow it, your output will
render correctly and pass review; the mistakes in PRs #3 and #6 (inventing values that don't
exist in the code) come from *not* following it.

---

## 1. The one rule: author INTENT, never measured values

The annotation system is a **Storybook-side renderer**. It draws annotations over the *live,
rendered React component* and **derives** the factual values itself from the DOM at runtime:

- geometry (sizes, gaps, radii) ← `getBoundingClientRect()`
- color hex + the authored token name ← the matched CSS rule / `var(--composa-*)`
- the accessibility tree (role, name, states) ← the actual DOM

So you author **only intent**: *which* element, *what kind* of annotation, and the *semantic
name* of a token. You do **not** write the measured number, the hex, or the computed size — leave
those fields off and the renderer fills them in (and stays correct if the component changes).

> If you find yourself typing `value: "14px"` or `value: "#0969da"`, stop. Omit it. The renderer derives it.

---

## 2. How an annotation attaches to a component

Every annotation has a `target`: a **CSS selector** resolved against the rendered component.
Composa components expose their anatomy via `data-part` (Zag/Ark convention), so target parts by it:

```js
target: '.composa-checkbox [data-part="control"]'
```

`each: true` turns one annotation into **one marker per matching element** (use for composites —
every tab, every menu item). Without it, the first match is annotated.

**Before you author, verify the target and any enum value actually exist.** Grep the factory and CSS:
```
grep -n 'data-part' src/react/factory.js            # valid anatomy targets
grep -rno 'composa-button-[a-z-]*' styles/           # valid variant/width classes
```
A `variant`/`width`/`size` value that has no matching CSS class does **not** error — it renders an
**unstyled fallback**. That is exactly how a fabricated `variant: "groove"` or `width: "wide"`
slips past the build. **If the class isn't in the CSS, the value isn't real.**

---

## 3. The type vocabulary (15 types, 2 systems)

`type` is required on every annotation. Fields marked **(derived)** must be omitted — the renderer
supplies them. Author the **required** fields + semantic intent only.

### Accessibility system (from the GitHub/CVS toolkit — Figma can't tell you these)

| `type` | required | author these | derived (omit) |
|---|---|---|---|
| `button` | `target, element, role` | `element` (`<button>`), `role`, `keyboard`, `states` | `accessibleName` |
| `heading` | `target, level` | `level` (1–6) | — |
| `landmark` | `target, element` | `element`, `role` | `accessibleName` |
| `link` | `target, accessibleName` | `linkTarget`, `linkType` | `accessibleName` |
| `form-element` | `target, control` | `control`, `controlLabel`, `required`, `error` | `accessibleName` |
| `image` | `target` | `decorative` (bool) | `accessibleName` |
| `list` | `target, element, role` | `element`, `role` (list/menu/tablist), `itemRole`, `keyboard` | `accessibleName` |
| `listitem` | `target, role` | `role` (menuitem/tab/option) | `element`, `accessibleName` |
| `note` | `target, text` | `text` | — |

### Design-system system (Composa's own — Figma is the better reference for these)

| `type` | required | author these | derived (omit) |
|---|---|---|---|
| `variant` | `target` | `value` or `name` (which Figma variant this is) | — |
| `anatomy` | `target` | nothing — auto-derived from every `data-part` | label per part |
| `redline` | `target, dimension` | `dimension` (`width`/`height`/`radius`) | `value` |
| `radius` | `target` | `corner` (`top-left`/`top-right`/`bottom-left`/`bottom-right`) | `value` |
| `gap` | `target, targetB` | `target` + `targetB` (the two elements) | `value` |
| `token` | `target, kind` | `kind` (`color`/`typography`/`effect`), `name` (semantic token), `prop` | `value` (hex/size) |

### Cross-cutting fields (any type)
- `n` — the badge number (detail-card index).
- `marker` — `pin` | `bracket` | `lasso` | `caret`. **bracket** = parts/ranges; **pin** = a single
  point; **lasso** = an irregular grouped region; **caret** = a variant pointer.
- `side` — `top` | `bottom` | `left` | `right` (which side the label/leader sits).
- `anchor` — `edge` | `center`.
- `each` — `true` to emit one marker per matching element.
- `tier` — `{ priority, difficulty }` for a11y annotations.

---

## 4. Facets — which type goes in which story (and which doc tab)

Organize each component's annotation stories around these. (See `specs/_annotation-v2-plan.md`.)

- **Anatomy** → `type: "anatomy"` (one story; auto-brackets every part). → component's anatomy section.
- **Color** → `type: "token", kind: "color"`. → Style tab.
- **Typography** → `type: "token", kind: "typography"`. → Style tab.
- **Layout** → `redline` (width/height), `radius` (corners), `gap` (between elements). → Style tab.
- **Accessibility** → the a11y types; **composites use `list` on the container + `listitem` with
  `each: true` on the items**, never one `button` pin on the whole thing. → Accessibility tab.

---

## 5. Copy-paste examples (all real, all derive their values)

```js
// Anatomy — nothing to author beyond the target; every data-part gets a bracket.
{ type: "anatomy", target: ".composa-switch" }

// Layout — a width redline + a corner radius. No values; both are derived.
{ n: 1, type: "redline", target: '.composa-checkbox [data-part="control"]', dimension: "width" }
{ type: "radius", target: '.composa-checkbox [data-part="control"]', corner: "top-left" }

// Layout — gap between two elements (label and control).
{ type: "gap", target: '[data-part="control"]', targetB: '[data-part="label"]' }

// Color + Typography tokens — author the SEMANTIC name; hex/size are derived.
{ n: 1, type: "token", kind: "color", target: '.composa-switch [data-part="track"]', name: "color.bg.brand" }
{ n: 2, type: "token", kind: "typography", target: '.composa-switch .composa-switch-label', anchor: "center" }

// A11y — a single control.
{ n: 1, type: "button", target: ".composa-icon-button", element: "<button>", role: "button",
  keyboard: [{ keys: "Enter / Space", result: "activates" }] }

// A11y composite — container is a list, every item is bracketed (note `each: true`).
{ n: 1, type: "list", target: ".composa-tabs", element: "<div>", role: "tablist", itemRole: "tab" }
{ n: 2, each: true, type: "listitem", target: '.composa-tabs [data-part="tab"]', marker: "bracket", role: "tab" }
```

Stories attach annotations via the `withAnnotations` decorator + `parameters.annotations: [...]`:
```js
export const Layout = {
  render: () => React.createElement(Switch, { label: "Show grid" }),
  decorators: [withAnnotations],
  parameters: { annotations: [ /* the objects above */ ] },
};
```

---

## 6. Validate before you call it done

- **Storybook build is the gate:** `npm run build-storybook` must exit 0.
- **But the build does NOT catch fabricated values** (they fall back silently). So *also*:
  1. Confirm every `target` selector matches a real `data-part`/class in `src/react/factory.js`.
  2. Confirm every `variant`/`size`/`width`/`kind`/`role` value exists (grep the CSS / the schema).
  3. Never author a `value` the renderer derives (geometry, hex, type size, accessibleName).
- **Schema:** `src/annotation-kit/annotation.schema.json` is the machine-readable contract; validate
  annotation objects against it if your tooling can.

## 7. Recurring failure modes (every one of these has shipped and been caught — do not repeat)

These are real bugs from prior PRs. None throw at build time — `build-storybook` passes while the
story is silently wrong — so you MUST also open and look at the rendered story.

1. **Targeting a `data-part`/class that doesn't exist** → the overlay silently renders *nothing*
   (the renderer `continue`s on a null selector; anatomy auto-discovery finds zero parts).
   - *Shipped:* Notification stories targeted `[data-part="message"|"action"|"dismiss"]` but the
     component emitted **no `data-part` at all** — the Anatomy story rendered empty.
   - **Rule:** before targeting `[data-part="X"]` or `.composa-foo-bar`, grep `src/react/factory.js`
     and confirm the component emits it. If a part needs annotating but has no `data-part`, add the
     `data-part` to the factory (Zag/Ark convention) — don't target a selector that isn't there.

2. **Inventing an enum value** (variant / size / width / icon / tone) → silent *unstyled* fallback.
   - *Shipped:* `variant: "groove"`, `width: "wide"`, `icon: "pen"|"chevronDown"|"search"|"eye"`,
     `composa-button-brand`, `composa-avatar-org`.
   - **Rule:** `width` is `"fill"` not `"wide"`. Icons come ONLY from the alias map in
     `src/react/story-icons.js`. variant/size/tone must have a matching `composa-*` CSS class — grep
     `styles/`. If the class isn't there, the value isn't real.

3. **Hand-writing a generated artifact.** `annotation.schema.json` + `annotation.d.ts` are GENERATED.
   - *Shipped:* a hand-written schema missing ~18 enum constraints passed CI.
   - **Rule:** edit the type registry (`a11y/types.js` / `ds/types.js`), then run
     `node src/annotation-kit/scripts/generate-schema.mjs` and commit its output. Never edit the schema
     by hand. CI now runs `generate-schema --check` and fails on drift.

4. **Wrong relative-import depth in a subdirectory.** A story in `src/react/stories/templates/` must
   import `../../story-runtime.js` (two levels up), not `../story-runtime.js`.
   - *Shipped:* `../story-runtime.js` from a `templates/` subdir → unresolved import → build failed.
   - **Rule:** count the levels to `src/react/`. `build-storybook` catches this — run it.

5. **An `import { X }` binding colliding with an `export const X`** → `Duplicate declaration "X"`.
   - *Shipped:* `import { Button } from "@composa-ui/react"` alongside `export const Button = {...}`.
   - **Rule:** components are imported ALIASED (e.g. `Button as ButtonControl`) from `../story-runtime.js`
     precisely so they don't collide with story export names. Use those aliases; don't import from the package.

6. **`React.createElement` without `import React`** → `"React is not defined"` *at render only*
   (build-storybook passes — invisible unless you open the story).
   - **Rule:** if the file uses `React.createElement`, it must `import React from "react"`. Match the
     existing file (most use `const h = React.createElement` with React imported).

7. **Hardcoding a derived value** (px / hex / size / `accessibleName`) → rots the moment the token
   changes, defeating the self-correcting design. Author intent only; let the renderer derive.

8. **Additive only.** Editing an existing `*.stories.js`: never remove/rename an existing `export const`;
   append. Editing an `*.mdx`: every `<Canvas of={X} />` must reference a real export.

### Validation is two steps, not one
`build-storybook` exit 0 proves it *compiles* — NOT that it renders correctly. After the build, **open
each story** and confirm: no `"React is not defined"`, no `"?"` missing-icon boxes, no empty overlay, no
unstyled control. That second step is what catches failure modes 1, 2, and 6.
