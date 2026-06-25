# AI interaction patterns to borrow (founder notes — for the AI direction)

> Working note for the documentation pass: incorporate into the corrected app-model / AI-direction
> doc (`docs/architecture/composa-app-data-model.md`). AI's home is the LEFT sidebar, opened from
> the navigation rail (Figma-style); these are the richer, in-context patterns layered on top.

## 1. Selection-overlay contextual AI (Figma pattern)
When an element is selected, a **small button appears at the top-right of the selection overlay**.
Clicking it opens a **small anchored window** (styled like the comment dialog / a popover anchored
to the selection) containing an AI prompt input. The user **annotates / describes what they want AI
to do with the selected element**, and AI acts on that specific element. This is the closest pattern
to "point at this thing and say what to change" — in-context, per-element AI.
- **Composa pieces this maps to:** `CanvasSelectionOverlay` (the overlay + the corner button) +
  `CommentComposer` (the anchored prompt window — same composer that powers the left-sidebar chat).
  So this is a composition of existing DS primitives, not a new surface.

## 2. Batch / "hold" annotations before sending (Cursor pattern)
The AI composer's **send button can toggle to a "save" (hold) button**: instead of sending an
annotation immediately, the user **holds** it, **adds another**, accumulating **multiple
annotations**, then **sends them all together** as one batched request. Lets the user assemble a
multi-part instruction (e.g. several per-element annotations) and dispatch them as a set.
- **Composa pieces this maps to:** a `CommentComposer` mode — the trailing submit action toggles
  between **Send** and **Save/Hold**; held annotations render as the composer's `attachments`/chips
  (or a pending list) until a final Send flushes the batch.

## How these fit together
- **Left sidebar (from nav rail):** the primary AI chat — the conversational, project/slide-scoped
  surface (Figma-style placement).
- **Selection-overlay button (#1):** in-context, per-element AI — annotate the thing you selected.
- **Batch hold/send (#2):** a composer behavior usable in BOTH surfaces — accumulate several
  annotations (including several per-element ones via #1) and send as one set.
- The granular **inspector** stays the direct-manipulation surface; AI is the "equalizer" layered
  over it (annotate + describe → AI edits the same fields the inspector edits).
