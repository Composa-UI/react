# Composa round-2 plan — founder pre-sleep batch #2 (post-Wave 5)

> Continues `_rework-plan.md`. DS lanes are sequential on `composa/editor-foundation` (shared factory.js).
> App work is in the separate `composa/app` repo. Visual verification encouraged (pull Figma
> screenshots via figma MCP to compare; headless Chrome only if disk is comfortable).

## Figma references
- UI3 Kit file `4kilp0ShQiYsoUPJdleqEH`:
  - **Comments composer**: node 2012-63721 (its composer = candidate for the app's AI chat input)
  - **AI thread window**: node 2012-63732
  - **Badges, visual bell, notifications**: elsewhere in that file's pages — find via get_metadata.
  - Editor sidebar 1027347-6458, left rail 103-10421 (already used).
- Typography (from W1/critique): 99:5566 (Basics/Details/Variable panel), 99:4077 (text-styles), 99:1337 (Fonts picker). File `rMq1M35u1iyKB2QaQMipZb`.

## DS lanes (sequential, post-W5)
**W6 — Typography dialog full rework (GREENLIT).** Rebuild TypographyDialog to Figma 99:5566: Basics/Details/Variable tabs, a Preview specimen, Alignment, Decoration, Case, Vertical-trim, List-style, Paragraph-spacing, Truncate. Add the dedicated **Fonts picker (99:1337)** and wire the family trigger to it (currently opens TypeStyleMenu). Polish TypeStyleMenu (Ag specimen lead, per-row filter). The biggest dialog culprit.

**W7 — Comments component. (DONE)** Built `CommentComposer` (2012-63721) + `CommentItem` (2012-63679) + `CommentThreadWindow` (2012-63732) as DS support components (factory.js, registered in index/story-runtime/d.ts/component-api, styles/93-comments.css, docs/design-system/components/comments.md, comments.stories.js). The **composer is reusable as a chat input**: `layout="card"` with a `mode` scope slot (e.g. a SegmentedControl Ask/Agent selector), trailing `actions` cluster, `attachments` tray, and `onSubmit` (Enter submits, Shift+Enter newlines) — see the `ChatInput` story. `layout="inline"` is the thread reply pill. Slots: avatar, growing input, attach/emoji/mention actions, submit. Presentational + controlled.

**W8 — Badges, visual bell, notifications. (DONE)** Built `Badge` + `BadgeAnchor` + `NotificationBell` + `Notification` + `VisualBell` as DS support components (factory.js, registered in index/story-runtime/d.ts/component-api/story-coverage, styles/95-badge.css, design/tokens.css badge/bell/notification tokens, builtin `notification` bell glyph, docs/design-system/components/badge.md, badge.stories.js). Figma UI3 (4kilp0ShQiYsoUPJdleqEH): Badges page 2012-32973 (Badge small 2012-35027, Badge small alt count badges 2012-35077, Badge Dot 2012-35086, Badge large 2012-35016) → `Badge` (dot/count/label × 13 tones × strong × size). **Badge composes onto buttons/avatars via `BadgeAnchor`** (or the `overlay` prop) — that is the foundation for **`NotificationBell`** (IconButton + Badge: count→count badge, dot→unread dot). Visual Bells page 2015-40421 (Bell 2015-42989) → `VisualBell` (the in-app snackbar pill: icon/spinner + message + count + action rail + dismiss; default/danger). Notifications page 2028-109149 (Notifications 2028-111255) → `Notification` (dark HUD toast/list-row: icon/avatar + truncating message + 1-2 stacked CTAs). All presentational + controlled. Deferred: Bell Multiplayer collaborator-follow toasts (2015-43085).

## App direction (composa/app) — "more than a POC"
Goal: a **basic slides editor with a video timeline underneath**, intuitive UX, Figma-Slides-level element moving. Answers to the POC's open Qs:
1. **Resize via props** — connect props to shapes as much as possible. Add a **context menu to shapes** (right-click) and to the **slides navigator rail**. Push to Figma-Slides level of moving an element.
2. **Magic Move: reconcile ONE identity** across the boundary (not outgoing+hidden-incoming).
3. **Wire the in-app authoring loop** (tag sharedId → move element on slide B → re-diff). 
4. Adjacency-only matching is fine.

Bigger vision:
- **Visible video timeline UI** (Canva-style simple — the master clock needs a visible scrubber/timeline since we support background video). Founder couldn't see a timeline on localhost (we only had the clock).
- **Animation via the right property panel + AI side-chat on the left may be enough** — keyframes are for extra granularity, not the primary path. Study & lean into **grouped animations** (Figma Slides added Keynote-style: https://help.figma.com/hc/en-us/articles/30601608159383-Animate-objects-on-a-slide) and **Keynote** (https://support.apple.com/en-by/guide/keynote/tanf96d92cb6/mac). Avoid a timeline/keyframe "frenzy."
- **Autolayout is important** — Shift+A on a text adds an autolayout frame around it; maximize the inspector (a full day of work).
- **AI sidebar reference: faces.app** (https://faces.app/, founder @ignaciosoffia / x.com/ignaciosoffia posts demos) — AI makes controls in the sidebar; simple full-loop value. Study via web/Twitter.
- The Comments composer (W7) feeds the app's AI chat input.

## Notes
- Founder freed 3.5GB (CleanMyMac) — more disk headroom now.
- Founder will spend a block tomorrow visually verifying; build to Figma fidelity.
- Close any browser tabs opened for study when done.
