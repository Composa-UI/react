# Comments

The collaboration surface: a reusable composer / chat input, a single comment row, and a floating comment thread window.

## Overview

Comments covers three exports, all in `src/react/factory.js` and published from `@composa-ui/react`:

- **`CommentComposer`** — a reusable, controlled composer. Figma component set `comment.compose.input` (node `2012-63721`); the inline reply pill is `comment.window.reply` (node `2012-63692`). It is modeled as a *general composer*, not a comment-only box, so the same component is the app's AI side-chat input.
- **`CommentItem`** — one thread row. Figma `_comment.window.row` (node `2012-63679`).
- **`CommentThreadWindow`** — the floating comment surface. Figma `comment.thread.window` (node `2012-63732`).

All three are slot-based composites and live in the `supportComponents` bucket of `design/component-api.json`. They are presentational and controlled: drive `value`/`onChange`, handle `onSubmit`; the components own no message state.

Use `CommentComposer layout="card"` for a standalone composer or the AI chat input. Use `layout="inline"` for the reply pill at the bottom of a thread. Reach for `InputField` instead when you need a labeled single-value form field, not a message composer.

## Anatomy

**CommentComposer — card layout** (render order):

1. Optional leading avatar (`avatar`).
2. Growing text field (`textarea`, grows with content; `rows` sets the floor).
3. Optional attachments tray (`attachments`, rendered as `ChitInput` chips).
4. Footer toolbar on a top hairline: leading `mode` slot + action cluster (emoji / mention / attach by default), and a trailing blue circular send.

**CommentComposer — inline layout**: leading avatar, then a rounded pill containing the field and an inline send.

**CommentItem**: gutter avatar, an author + timestamp header line, a wrapping body, and an optional `footer` slot for reactions / replies.

**CommentThreadWindow**: a titlebar (title + more / resolve / close actions), a scrollable `CommentItem` list (or an empty state), and a `CommentComposer` (inline) pinned at the bottom.

## Props

### CommentComposer

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `""` | Controlled field value. |
| `placeholder` | `string` | `"Reply"` | Placeholder text. |
| `layout` | `"card" \| "inline"` | `"card"` | Card = standalone composer / chat input; inline = reply pill. |
| `avatar` | `AvatarProps \| ReactElement` | `null` | Optional leading avatar. |
| `actions` | `CommentComposerAction[] \| ReactElement[]` | emoji/mention/attach on `card`, `[]` on `inline` | Trailing action cluster. Pass `[]` to drop. |
| `mode` | `ReactNode` | `null` | Leading scope/mode slot (e.g. a model/scope selector for the chat input). Card layout only. |
| `attachments` | `CommentComposerAttachment[] \| ReactElement[]` | `[]` | Attachment chips. |
| `submitIcon` | `IconSlot \| string` | `"arrowUp"` | Send glyph. |
| `submitLabel` | `string` | `"Send"` | Send accessible label / tooltip. |
| `submitDisabled` | `boolean` | `false` | Force-disable send. |
| `autoSubmitEmpty` | `boolean` | `false` | Allow send when the field is empty (e.g. attachment-only sends). |
| `disabled` | `boolean` | `false` | Disable the whole composer. |
| `rows` | `number` | `1` | Floor height of the growing field (card layout). |
| `onChange` | `ChangeEventHandler` | — | Field change handler. |
| `onSubmit` | `(value, event) => void` | — | Submit handler (Enter or send click). |
| `onAttachmentRemove` | `(attachment, index) => void` | — | Called from an attachment chip's close button. |

Send is disabled when the field is empty unless `autoSubmitEmpty` is set. Extra props spread to the root element.

### CommentItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `author` | `string` | `""` | Author name (body-large strong). |
| `timestamp` | `ReactNode` | — | Relative time (body-large secondary). |
| `body` | `ReactNode` | — | Comment body. |
| `avatar` | `AvatarProps \| ReactElement` | derived from `author` initial | Gutter avatar. |
| `footer` | `ReactNode` | `null` | Reactions / reply affordances under the body. |

### CommentThreadWindow

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | `"Comment"` | Titlebar title (body-medium strong). |
| `comments` | `CommentItemProps[] \| ReactElement[]` | `[]` | Thread data. Or pass `children` to compose `CommentItem`s directly. |
| `actions` | `CommentComposerAction[] \| ReactElement[]` | derived from `onMore`/`onResolve`/`onClose` | Titlebar action cluster. |
| `composer` | `CommentComposerProps \| ReactElement` | — | Pinned composer (defaults to `layout="inline"`). Omit to hide. |
| `emptyState` | `ReactNode` | `"No comments yet"` | Shown when the list is empty. |
| `onResolve` / `onMore` / `onClose` | `MouseEventHandler` | — | Titlebar action handlers (each adds the matching button when provided). |

## Variants

| Component | Variant | Use when | Notes |
|---|---|---|---|
| `CommentComposer` | `card` | Standalone composer, or the AI side-chat input | The chat-input layout; shows the footer toolbar + mode slot. |
| `CommentComposer` | `inline` | Reply pill inside a thread window | Single-row rounded pill; actions default to empty. |

The card-layout send is the Figma accent-blue circle (`--composa-color-accent-blue`), deliberately distinct from the orange product brand, to match the comment composer reference. Inline send uses the quiet standard icon-button variant.

## Sizes & width

`CommentComposer` and `CommentItem` are width-fill (`width: 100%`). `CommentThreadWindow` is a fixed `360px` (the Figma window width), capped at `max-width: 100%`. Avatars default to `medium` (24px) to match Figma. The card field has a 48px minimum; the inline pill is 32px tall.

## States

| State | How reached | Treatment |
|---|---|---|
| Field empty | no `value` | Send disabled (unless `autoSubmitEmpty`). |
| Field focused | browser focus | Caret in the field; outline removed in favor of the container. |
| Disabled | `disabled` | Composer dimmed, pointer-events off. |
| Submit disabled | empty field or `submitDisabled` | Send uses the disabled icon-button treatment. |
| Empty thread | `comments={[]}` and no `children` | List shows the `emptyState` slot. |

`Enter` submits; `Shift+Enter` inserts a newline.

## Usage

**Do**

- Drive `value`/`onChange` and handle `onSubmit`; the composer is controlled.
- Use `layout="inline"` for the thread reply and `layout="card"` everywhere else.
- Use the `mode` slot for a chat scope/model selector rather than a separate bar.
- Pass `actions={[]}` to strip the default emoji/mention/attach cluster.

**Don't**

- Don't expect the composer to store the message; it holds no state.
- Don't hand-build a send button; the composer owns it (`submitIcon`/`submitLabel`).
- Don't use it as a labeled form field — reach for `InputField`.

## Accessibility

The composer field is a native `textarea` with an `aria-label` (from `aria-label` or `placeholder`). Send is an `IconButton` with `submitLabel` as its accessible name and tooltip. `CommentItem` is a `role="listitem"`; the thread list is `role="list"`; the window is a `section` labeled by its `title`. Titlebar and composer actions are real `IconButton`s with explicit labels.

## Code

```jsx
import { CommentComposer, CommentItem, CommentThreadWindow } from "@composa-ui/react";

// Thread window
<CommentThreadWindow
  title="Comment"
  comments={[
    { id: "c1", author: "Jenny Wen", timestamp: "6 hours ago", body: "I love where this is headed." },
  ]}
  onResolve={resolve}
  onClose={close}
  composer={{ avatar: { variant: "yellow", initials: "A" }, value, onChange, onSubmit }}
/>

// The same composer as the app's AI side-chat input
<CommentComposer
  layout="card"
  placeholder="Ask Composa to build something…"
  value={value}
  onChange={onChange}
  onSubmit={onSubmit}
  mode={<SegmentedControl variant="label" options={askAgent} value={mode} onValueChange={setMode} />}
  actions={[{ icon: "image", label: "Attach" }, { icon: "at", label: "Reference a layer" }]}
  attachments={attachments}
/>
```
