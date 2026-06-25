# Carbon gap-analysis — synthesis

14 components diffed against IBM Carbon's raw GitHub MDX (usage/style/accessibility).
Per-component reports are the files alongside this one. This is the cross-cutting view +
the queue of things that need **your ruling** before they can be filled.

Method: Carbon as the oracle for *what category* of guidance is missing; proposed Composa
fills are inferred for a dense desktop app and tagged `_(proposed)_`. Carbon content cited
only where actually fetched. All Carbon pages resolved cleanly except `components/menus/*`
(real path is singular `components/menu/`).

## The dominant pattern: we document the happy path

Nearly every form control documents only default / hover / focus / disabled. Carbon treats
a fuller **state matrix** as baseline. This is the single biggest systemic gap.

| Missing category | Affects | Confidence to auto-fill |
|---|---|---|
| **read-only** state | checkbox, radio, input, dropdown, switch | High |
| **error / invalid** state + message | checkbox, radio, input, dropdown | High |
| **warning** state | input, dropdown, (checkbox/radio optional) | Medium |
| **loading / in-progress** state | button | Medium |
| **group semantics** (fieldset/legend, group label, group-level error/helper) | checkbox, radio | High |
| **required-field + helper-text + placeholder** rules | input, dropdown | High |
| **roving-focus / arrow-key** keyboard model | radio, tabs, menu, slider, segmented-control | High (radio/tabs/menu); RULING (segmented-control) |
| **truncation / max-width** (ellipsis + tooltip) | badge, tabs, menu, dropdown labels | High |
| **auto-dismiss timing** (Carbon: ~5s, dismiss-on-interaction) | notification, visual-bell | High |
| **status/severity axis** (info/success/warning/error w/ semantic color) | notification, visual-bell | Medium |

## Needs YOUR ruling (do not auto-fill — flagged in each doc's Open decisions)

1. **SegmentedControl accessibility semantics — a real conflict.** Our doc authors it as
   "a list where each item contains a button" (N tab stops). Carbon's Content Switcher
   mandates `tablist` + `role=tab` with **roving focus** (one tab stop). Because our control
   *picks a value* (not switches a view), it may actually be a **`radiogroup`**. Three
   different a11y contracts; pick one. (`segmented-control.md`)
2. **Tooltip: Tooltip vs Toggletip split.** Our "Action tooltip" variant embeds interactive
   content (Edit / Send). Carbon forbids interactive content in a hover **tooltip** and
   routes it to a click-triggered **toggletip**. Decide whether Action-tooltip becomes a
   Toggletip/popover. Also: keyboard-reveal + `Esc`-dismiss are still "open" in our spec but
   Carbon treats them as required; and we use `aria-describedby` where Carbon uses
   `aria-labelledby` + `role=tooltip`. (`tooltip.md`)
3. **Modal danger variant.** Carbon's passive / transactional / **danger** axis is absent —
   we only have header-layout variants. Danger modals also change initial focus (→ Cancel,
   to avoid accidental destructive activation). Adopt the behavioral-variant taxonomy?
   (`modals-dialogs.md`)
4. **Notification focus model.** We deliberately use no focus trap; Carbon's actionable
   notification is an `alertdialog` with a trap. If intentional, document it as an *owned
   decision* (with rationale) rather than leaving it implicit. (`notifications.md`)
5. **Tabs activation mode.** Automatic (selection-follows-focus) vs manual (Space/Enter)
   is never named; Carbon requires teams to declare it. We imply manual — confirm.
   (`tabs.md`)
6. **Menu danger row + content cap.** Adopt a destructive/danger row kind? Carbon also caps
   menus at ~12 items with label-truncation tooltips — adopt? (`menus.md`)

## Auto-fillable now (high confidence, additive, marked proposed)

Per-control state-matrix rows (read-only/error/warning), the standard roving-focus keyboard
rows (radio/tabs/menu), truncation rules, auto-dismiss timing, and group-semantics notes —
none of these conflict with existing prose; they extend it. Applied in the follow-up commit,
each tagged `_(proposed)_` so you can accept/reject per item.

## Explicitly NOT copied from Carbon (anti-cargo-cult)

Fluid/responsive widths, IBM Productive-vs-Expressive type sets, multiselect/combobox
dropdown variants (we're single-select by design), interactive/dismissable Tag behaviors
(our badge is a static status indicator), Carbon's two-size toggle (we're single 24px dense).
Each report's `## Not applicable` section has the details.
