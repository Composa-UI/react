<!-- maintainer: Carbon-as-oracle gap analysis for NOTIFICATIONS.
     Carbon folds toast / inline / actionable / callout into ONE "notification".
     We split that surface across TWO components:
       - src/react/stories/notifications.mdx     (component: Notification) — persistent HUD bar, always carries an action
       - src/react/stories/visual-bells.mdx      (component: Visual Bell)  — transient toast/snackbar, auto-dismisses
     Mapping onto Carbon variants:
       Carbon toast            -> Visual Bell (auto-dismiss, transient feedback)
       Carbon actionable toast -> Notification (persistent, carries Action/Dismiss CTAs)
       Carbon inline           -> NEITHER (we have no in-flow inline notification)
       Carbon callout          -> NEITHER (no contextual, never-dismissed callout)
     Carbon sources fetched 2026-06-20 (all 3 returned, none 404):
       - components/notification/usage.mdx
       - components/notification/style.mdx
       - components/notification/accessibility.mdx
     Method: use Carbon to surface CATEGORIES of guidance we lack, then infer
     Composa-appropriate fills (dense desktop, base-4 grid, token NAMES not hex).
     Cite only Carbon content actually returned. -->

# Notifications — Carbon gap analysis

Carbon component: **Notification** (variants: inline, toast, actionable, callout).
Our docs: **Notification** (persistent HUD bar) + **Visual Bell** (transient toast).

## Coverage diff

| Category | Carbon covers | We cover | Gap? |
|---|---|---|---|
| Variants — inline / toast / actionable / callout | Four: **inline** ("show up in task flows… appear at the top of the primary content area"), **toast** ("non-modal, time-based… disappear after a few seconds"), **actionable** ("interactive elements within a notification styled like an inline or toast notification"), **callout** ("highlight important information that loads with the contents of the page… cannot be dismissed") | Visual Bell ≈ toast; Notification ≈ actionable-toast. Bell sub-variants: heads-up / tabular-numbers / multiplayer / error | **Yes.** We have **no inline** (in-flow, at top of content area) and **no callout** (loads-with-page, never-dismissed) surface at all. |
| Status / severity — info / success / warning / error | Explicit 4-status taxonomy with semantic color: **info** (blue), **success** (green), **warning** (yellow), **error** (red), each with purpose ("Confirm a task was completed"; "Inform users… not desirable or might have unexpected results"; etc.) | Visual Bell: only **default** + **danger/error**. Notification: **none** — no status axis at all | **Yes — big gap.** No info / success / warning split in either doc. Bell has only default vs danger; Notification is status-agnostic. |
| Dismissal — manual close vs auto-dismiss timing | Toast: "persist by default, but… coded to dismiss automatically **after five seconds**"; "should always be easily dismissed". Inline/actionable/callout: do **not** auto-dismiss | Bell: "removes itself after a short interval" (**no number**). Notification: "no timed auto-dismiss," cleared by action | **Partial.** Bell auto-dismisses but gives **no timing**; Carbon names **5s**. We never state a default duration or pause-on-hover/focus. |
| Persistence — when NOT to auto-dismiss | Explicit: actionable (persist "until a user dismisses them"; toast-styled actionable "remain on screen until the user dismisses it… enough time to interact with the button"), callouts (never), errors/critical, inline by default | Notification = always persistent (good). Bell error = "persists until the user closes it" | No (parity on the cases we have). We lack the **actionable-toast-must-not-time-out** rationale ("enough time to interact"). |
| High vs low contrast | Explicit pair: "High-contrast… best for critical messaging; low-contrast… less visually disruptive"; "never mix styles within each notification variant. When in doubt, use low-contrast." Tokens differ (`$text-primary`+status bg vs `$text-inverse`+`$background-inverse`) | Neither doc has a contrast axis. Bell danger uses `color.bg.danger`; Notification uses `color.bg.menu` | **Yes.** No high/low-contrast concept; no "don't mix within a variant" rule. |
| Actions inside notifications | Inline: "ghost button… adjacent to the title and body"; toast: "tertiary button at the end of body content"; "short and should take users to a page or modal"; labels "one or two words"; links allowed to "redirect to next steps"; callouts carry **no** action | Notification: Action + optional stacked Dismiss CTA. Bell: up to two Action buttons + optional Close | **Partial.** We allow up to 2 bell actions; Carbon caps practical guidance at one tertiary/ghost and warns labels = 1–2 words. We don't cover **links** inside notifications. |
| Screen reader — role status vs alert / aria-live polite vs assertive | a11y page: "roles `alert`, `log`, or `status` for notifications that **do not require user action**"; "`alertdialog` for notifications that **require user action**"; callouts have "**no aria-live**… not automatically announced". Politeness levels (polite/assertive) **not** discussed in returned content | Both docs already prescribe `role="status"`/`aria-live="polite"` for routine and assertive/`role="alert"` for urgent/error | No — **we are richer here** than Carbon's returned text. But note divergence: Carbon says actionable → `alertdialog`; we use `role="status"`+focusable buttons. |
| Focus management | a11y: inline/toast "do not contain interactive elements… do not receive focus"; **actionable "grabs and traps focus until an action is taken or… dismissed"**; "optionally closed by pressing `Escape`" | Notification: "focus is not stolen from the canvas when the notification appears" — **opposite of Carbon**. Bell: "does not steal focus" | **Yes — divergence to flag.** Carbon traps focus for actionable; we explicitly do *not*. Likely correct for a dense canvas HUD, but should be a stated, justified decision. |
| Keyboard | "action gets focus first"; `Tab` between action and close `x`; close via `Enter`/`Space` on x or `Esc` | Notification: Tab to actions, Space/Enter activate (no Esc). Bell: Tab, Space/Enter, **Esc to close** | **Partial.** Notification lacks an `Esc`-to-dismiss key (and has no Close anyway — see fills). |
| Stacking / placement | Toast: "slide in/out from the **top right**"; "stack with `$spacing-03`"; "New… appear at the top… older pushed down". Inline: near related items, "bottom of forms, above submit/cancel". Callout: contextual, "Avoid… multiple callouts… refrain from stacking" | Notification: stacks vertically, `spacer-2` (8) gap, anchored bottom-right of editor. Bell: single, centered above toolbar | **Partial.** Bell has **no stacking model** (what if two fire at once?). Placement differs intentionally (bottom-right HUD vs Carbon top-right) — fine, but undocumented as a deliberate choice. |
| Content rules — title + body length | Title "short and descriptive… most important piece"; "Don't use a period to end a title"; "tell users what stopped… in the title" for errors. Body "one or two short sentences… Don't repeat the title… include troubleshooting/next steps." Sentence case. **Overflow → if longer than two lines, use an actionable notification + short message + 'View more' link.** Action labels 1–2 words | Notification: message short, single/multi line, **truncates with ellipsis**; CTA = short verbs. Bell: single short phrase; count slot for figures | **Partial.** We **truncate**; Carbon says **don't truncate — switch to actionable + "View more"**. Missing: no-trailing-period rule, sentence case, error-title-says-what-stopped, "don't repeat the title." |
| When to use notification vs visual-bell vs modal | "notifications… disruptive and should be used sparingly"; for non-critical messaging prefer toast/inline over modal; callout = loads-with-page guidance (not reactive) | Bell↔Notification boundary covered ("Notification instead — for messages that must persist… or originate from the system"). Modal boundary only in modals doc | **Partial.** Strong Bell↔Notification boundary; **no notification↔modal** boundary in either notifications doc. |
| Do / Don't | Rich implicit set: use sparingly; don't mix contrast; no close on critical-must-read; don't stack callouts; don't repeat title; no period after title; labels ≤2 words; toasts always dismissable | Neither doc has an explicit do/don't block | **Yes.** No do/don't section in either doc. |

## Proposed fills

Each maps to a real gap above and cites the Carbon line that prompted it. Tokens named; dense-desktop / base-4 appropriate. The hardest call is **which of the two docs** each fill lands in — stated per item.

1. **Auto-dismiss default timing + pause-on-interaction** _(proposed — visual-bells.mdx › Usage › Behaviors, and Style if a token is added)_
   Prompted by Carbon: toast "coded to dismiss automatically **after five seconds**." Our Bell says only "after a short interval." Add a named default (propose **`duration.toast` = 5000ms** _(proposed)_, matching Carbon) and the companion rule that the timer **pauses on hover/focus** and resets on a new bell, so a user reading or tabbing into an Action isn't cut off — Carbon's own rationale for actionable toasts ("enough time to interact with the button"). Target tab: **Usage › Behaviors**. This is one of the two biggest gaps.

2. **Status / severity axis — info / success / warning / error** _(proposed — BOTH docs; primary on visual-bells.mdx › Usage › Variants + Style › Color)_
   Prompted by Carbon's 4-status taxonomy (info blue / success green / warning yellow / error red, each with a stated purpose). Bell today has only default + danger. Add a **status** axis with token NAMES `color.bg.info` / `color.bg.success` / `color.bg.warning` / `color.bg.danger` and matching `color.text.on*` / `color.icon.*` _(proposed — reconcile against color.md)_, plus a leading status icon. Keep it lightweight for the dense canvas: status drives icon + accent, not a heavy left-border slab. For **Notification**, add at least an **error/warning** affordance so a failed background task reads as a failure, not a neutral HUD. Carbon: "Inform users of an error or critical failure." Target tabs: Usage (Variants), Style (Color).

3. **Inline notification surface** _(proposed — NEW section in notifications.mdx, or a note that it is intentionally out of scope)_
   Prompted by Carbon inline: "show up in task flows… at the top of the primary content area," e.g. "at the bottom of forms, just above the submission and cancel buttons." We have no in-flow notification — only floating HUD + toast. For a dense desktop editor this may be genuinely N/A (most messaging is HUD/toast), **but the absence should be a documented decision**, not a silent gap. If adopted, it reuses Notification's tokens minus the float/shadow. Cite Carbon inline placement. See "Not applicable" — flagged there as a candidate to decline.

4. **Callout (loads-with-page, never-dismissed) — decline-and-document** _(proposed — note in notifications.mdx)_
   Prompted by Carbon callout: "highlight important information that loads with the contents of the page… cannot be dismissed." This is a static-page pattern; in our canvas product its role is filled by inline help / empty-state copy, not a notification. Recommend an explicit **"Carbon's callout is intentionally not a Composa notification"** line so the maintainer set is complete. See "Not applicable."

5. **High vs low contrast guidance + "don't mix within a variant"** _(proposed — visual-bells.mdx & notifications.mdx › Style › Color)_
   Prompted by Carbon: "High-contrast… best for critical messaging while low-contrast… less visually disruptive"; "never mix styles within each notification variant." We already run two surface treatments (Bell's neutral `color.bg` vs danger `color.bg.danger`; multiplayer tints) without naming the principle. Add a short Style note: error/critical = higher-contrast surface; routine = low-contrast; **don't mix contrast within one status**. No new tokens required — this is a usage rule over existing tokens. Target tab: Style › Color.

6. **Overflow rule: switch to actionable + "View more" instead of truncating** _(proposed — notifications.mdx › Usage › Content rules; reconsider visual-bells.mdx)_
   Prompted by Carbon: "If a toast or inline notification requires a message longer than two lines, use an actionable notification and include a short message with a 'View more' link." Our Notification currently **truncates with an ellipsis** — Carbon's anti-pattern. Add: when the message can't fit, keep the bar short and surface the detail behind a **Review / View more** action rather than clipping mid-word. Reconciles with our fixed-footprint goal (bar stays small; detail moves to the action). Target tab: Usage › Content rules.

7. **Title/body content rules — no trailing period, sentence case, error-title-says-what-stopped, don't repeat title** _(proposed — BOTH docs › Usage › Content rules)_
   Prompted by Carbon: "Don't use a period to end a title"; sentence case ("only the first word is capitalized"); for errors "tell users what stopped or can't be done in the title"; body "Don't repeat or paraphrase the title… include troubleshooting actions or next steps." Add these as bullet rules. Cheap, high-value, no tokens. Target tab: Usage › Content rules in each doc.

8. **Bell stacking model** _(proposed — visual-bells.mdx › Usage › Behaviors)_
   Prompted by Carbon toast stacking: "stack with `$spacing-03`… New… appear at the top… older pushed down." Bell is documented as a single centered pill with no answer for concurrent bells. Define behavior: either **queue** (one at a time) or **stack upward above the toolbar** with `spacer-2` (8) gap, newest nearest the toolbar. Pick one and state it. Target tab: Usage › Behaviors.

9. **`role`/focus divergence — state it as a deliberate decision** _(proposed — notifications.mdx › Accessibility)_
   Prompted by Carbon a11y: actionable notifications use `alertdialog` and "grab and trap focus until an action is taken or… dismissed." We deliberately do the **opposite** (`role="status"`, focus not stolen) so the canvas HUD never interrupts work. Keep our behavior, but add an explicit note: *Composa's Notification is a non-modal canvas HUD; unlike Carbon's actionable notification it does not trap focus — the user Tabs to it voluntarily.* This converts a silent divergence into an owned decision. Add `Esc`-to-dismiss only if a Close is introduced. Target tab: Accessibility.

10. **Action-label + links rules** _(proposed — BOTH docs › Usage › Content rules)_
    Prompted by Carbon: action labels "one or two words"; links may "redirect the user to next steps." We say "short verbs" — tighten to the explicit 1–2-word cap, and note that an Action may instead be a **link** when it routes elsewhere (pairs with fill #6's "View more"). Target tab: Usage › Content rules.

11. **Do / Don't block** _(proposed — both docs, end of Usage)_
    Prompted by Carbon's implicit set. Add a short Do/Don't, e.g. Do: use sparingly; give errors a next step; auto-dismiss only routine confirmations. Don't: truncate mid-message (use View more); auto-dismiss errors or anything needing acknowledgement; mix contrast within a status; put a Close on a notification the user must read. Cite Carbon "disruptive and should be used sparingly" + "should always be easily dismissed."

## Not applicable

- **Carbon `callout`** — a loads-with-page, never-dismissed static-page element. In a canvas editor this role is served by inline help / empty states, not a notification surface. Recommend documenting the decline (fill #4) rather than building it.
- **Carbon `inline` notification** — at-top-of-content / above-form-submit placement assumes a document/form layout. Likely N/A for our HUD-centric canvas, but treat as a *decision to record* (fill #3), not a certainty — if forms grow in the product this may need revisiting.
- **`$background-inverse` high-contrast token swap** — Carbon's specific inverse-token recipe is a Carbon theming artifact; our equivalent is the existing `color.bg.menu` / `color.bg.danger` / multiplayer tints. We adopt the *principle* (fill #5), not the token names.
- **Carbon `%`-relative widths / `rem` sizes (toast 288, inline min-height 48)** — Carbon's responsive sizing; ours is fixed-px on a base-4 grid (Notification 292×56, Bell h40), which is correct for a dense desktop app. No change.
