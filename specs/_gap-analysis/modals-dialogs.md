<!-- maintainer: Carbon-as-oracle gap analysis for Modals / Dialogs.
     Our doc: src/react/stories/modals-dialogs.mdx (component name: Dialog)
     Carbon sources fetched 2026-06-20 (all 3 returned, none 404):
       - components/modal/usage.mdx
       - components/modal/style.mdx
       - components/modal/accessibility.mdx
     Method: use Carbon to surface CATEGORIES of guidance we lack, then infer
     Composa-appropriate fills (dense desktop, base-4 grid, 24px dense controls,
     token NAMES not hex). Cite only Carbon content actually returned. -->

# Modals / Dialogs — Carbon gap analysis

Carbon component: **Modal**. Our doc: **Dialog**.

## Coverage diff

| Category | Carbon covers | We cover | Gap? |
|---|---|---|---|
| Variants — passive / transactional / danger | Named taxonomy: **passive** ("no actions for the user to take"), **transactional** ("cancel and primary action buttons"), **danger** ("destructive or irreversible actions"; replaces primary with danger button), plus **acknowledgment** (single OK button) and **progress** (Cancel + Previous/Next) | Default / Navigation / Tabs / Dropdown *header* variants; footer can show primary + Cancel; "confirming a delete" mentioned in passing | **Yes — big gap.** We have no passive/transactional/danger/acknowledgment *behavioral* taxonomy; only header-layout variants. No danger variant at all. |
| Sizes | Four responsive: **xs** (24%w / 48% max-h), **sm** (36% / 72%), **md** (48% / 84%), **lg** (72% / 96%); "Choose based on content volume" | Fixed widths 240 / 320 / 480; relative heights `70vh` / `50vh`; "width follows depth of controls" | **Partial.** We have widths/heights but no named size scale and no max-height-per-size constraint. Ours is fixed-px (correct for dense desktop) vs Carbon's %-responsive. |
| States | Implied via overflow + focus; no explicit state table | Open / Scrolled-overflowing / Dismissing table | No (ours is richer). |
| Button placement in footer | Explicit: 1 btn **flush right at 50% width**; 2 btns **50% each, full bleed**; 3 btns **flush right** or **1 flush left + 2 flush right**, each 25%; danger replaces primary | Primary (brand) right + optional Cancel (outlined); left side may carry stepper / helper / checkbox / action link | **Partial.** We name the slots but give **no ordering/width rule** for the action buttons themselves, and no danger-button placement. |
| Dismissal — Esc / scrim-click / X | Passive: x, **click outside**, Esc. Transactional: complete task, cancel, x, Esc | Scrim click, header X, Esc — all three covered | No. (Note divergence below.) |
| Focus mgmt — trap / initial / return | **Initial focus depends on type**: passive → close (X); confirmation → **primary button**; **danger → cancel button** (prevent accidental activation); input dialogs → **first input field**. Trap: "tab order constrained to modal's controls"; wraps back to X. Return focus: not stated in returned content | Initial → first control or primary for confirmation; trap cycles; return → trigger | **Partial.** We lack the **danger → focus Cancel** rule and the passive → focus-X rule. |
| Screen reader — role / aria-modal / labelledby / describedby | `role="dialog"`, `aria-modal="true"`, name via `aria-label` (title) or `aria-labelledby`; references W3C APG | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (or `aria-label`) | No (parity). Neither states `aria-describedby`; neither uses `alertdialog`. |
| Content rules — title / body length / overflow | Title = "brief verb phrase"; **sentence case**; match trigger button label. Body **text 80% of width, components 100%**. Overflow = **body scrolls vertically, header+footer fixed; never horizontal — use larger size** | Title short, no trailing punctuation; body one idea/screen; inputs placeholder + counter; overflow scrolls beneath footer + scroll-affordance pill | **Partial.** Missing **sentence-case** rule, the **80%-width body text** rule, "match trigger label", and explicit "never scroll horizontally". |
| When-to-use vs inline / non-modal / notification | "Modals are highly disruptive"; for non-critical messaging prefer **toast / inline notifications** (non-disruptive) | Modal vs non-modal surface (tutorial/popover); width-to-controls guidance | **Partial.** We cover non-modal popovers but **not the notification/toast boundary** for non-critical messaging. |
| Do / Don't | Implied throughout (horizontal scroll, disruption, size-by-content) | None as an explicit do/don't set | **Yes.** No do/don't section. |

## Proposed fills

Each maps to a real gap above; cites the Carbon line that prompted it. Tokens named, dense-desktop-appropriate.

1. **Behavioral variant taxonomy: passive / transactional / danger** _(proposed — Usage › new "Variants" subsection)_
   Prompted by Carbon: passive = *"Presents information the user needs to be aware of… Contains no actions"*; transactional = *"Requires an action… Contains a cancel and primary action buttons"*; danger = *"a specific variant of transactional modal used for destructive or irreversible actions."* Reframe our header-layout variants (Default/Navigation/Tabs/Dropdown) as *anatomy* options, and add an orthogonal **behavioral** axis: **passive** (header + body, no footer CTAs — dismiss via X/scrim/Esc only), **transactional** (primary `color.bg.brand` + Cancel `color.bordertranslucent`), and **danger** (below). This is the highest-value addition — our doc has no behavioral taxonomy today.

2. **Danger variant** _(proposed — Usage › Variants + Style › Color)_
   Prompted by Carbon: *"used for destructive or irreversible actions"* + the a11y rule *"destructively-themed dialogs prioritize the cancel button over delete/danger buttons."* Add a danger Dialog: primary CTA swaps brand fill for a destructive fill (token NAMES `color.bg.danger` / `color.text.ondanger` — proposed; reconcile against color.md), Cancel stays outlined. For our dense 24px footer controls the button heights are unchanged. Pair with fill #5 (initial focus on Cancel).

3. **Footer action-button ordering & width** _(proposed — Usage › Footer, new "Placement & order")_
   Prompted by Carbon: *"Single buttons… flush right at 50% width… Two buttons span 50% each in full bleed… Three buttons… flush right or 1 flush left, 2 flush right."* Carbon's full-bleed 50/50 is web-product styling; for a **dense desktop app** state our own rule: action buttons sit **flush right** at intrinsic width, **primary rightmost, secondary to its left**, separated by `spacer-2` (8). Left-side affordances (stepper / helper / checkbox / action link) stay flush left. Don't full-bleed buttons in our fixed 320/480 windows.

4. **Initial-focus by variant** _(proposed — Accessibility › Focus)_
   Prompted by Carbon: *"For passive dialogs, the close button (X) receives focus. For confirmation dialogs, the primary button takes focus… Destructively-themed dialogs prioritize the cancel button… For transactional dialogs with input fields… the first input field should receive focus."* Expand our single "first control or primary" line into a per-variant table: **passive → X**, **transactional w/ inputs → first input**, **confirmation (no inputs) → primary**, **danger → Cancel** (prevents accidental destructive activation). Highest-value a11y fill.

5. **Sentence case + 80%-width body + no horizontal scroll** _(proposed — Usage › Content rules; Style › Structure)_
   Prompted by Carbon: titles/headings *"sentence case"* and *"concise"*; *"Ensure that the text is 80% of the modal's width. The components can span 100%"*; *"Never scroll horizontally; use a larger modal size instead."* Add: (a) title + body copy in **sentence case** (matches our existing "no trailing punctuation"); (b) body **prose** caps at ~80% of window width for readability while inputs/rows span 100%; (c) overflow is **vertical only** — if content needs horizontal room, step up 320 → 480 rather than scroll sideways. Also add Carbon's *"match button labels when modal is triggered by a button."*

6. **Named size scale w/ max-height** _(proposed — Style › Structure)_
   Prompted by Carbon's four sizes *"Choose based on content volume"* each with a max-height. Keep our fixed-px widths (correct for dense desktop) but **name** them — `dialog-xs` 240 (tutorial), `dialog-sm` 320 (text-only), `dialog-md` 480 (controls) — and bind each to a max-height (`50vh` / `70vh`) so overflow scrolling triggers predictably rather than per-instance.

7. **When-to-use: notification/toast boundary** _(proposed — Usage › When to use)_
   Prompted by Carbon: *"Modals are highly disruptive,"* prefer *"toast or inline notifications"* that *"provide… non-disruptive feedback… without breaking their workflow."* Add a third bullet alongside our modal / non-modal options: for **non-critical status or feedback** (saved, synced, undo) use a **notification/toast**, not a dialog — dialogs are for blocking tasks that must be completed or dismissed.

8. **Do / Don't section** _(proposed — Usage › new "Do / Don't")_
   Composa has none. Seed from Carbon-derived rules: **Do** size by content volume and keep titles to a brief verb phrase; **Don't** use a dialog for non-critical messaging (use a notification), **don't** scroll the body horizontally (step up a size), **don't** focus a destructive button on open.

## Not applicable

- **`alertdialog` role** — neither Carbon's returned content nor our doc uses it; our danger variant could adopt `role="alertdialog"` but that's a forward proposal, not a Carbon-sourced gap, so left out.
- **Progress / acknowledgment variants** — Carbon's progress (Cancel + Previous/Next) overlaps our existing **stepper** footer affordance ("1 of 3"), and acknowledgment (single OK) is a degenerate passive+1-button case; no new category needed, fold into fill #1.
- **%-based responsive widths / mobile 100% breakpoints** — Carbon's xs–lg %-of-viewport scaling and `320px` mobile collapse target responsive web; Composa is a fixed-layout dense desktop app, so fixed-px widths are the deliberate, correct choice.
- **`$spacing-09` 48px content margins, 48×48 close button** — Carbon's web spacing scale; our dense base-4 grid uses `spacer-*` tokens and 24px controls, already authored.
