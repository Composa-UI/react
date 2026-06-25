import React from "react";
import { CommentComposer, CommentItem, CommentThreadWindow, Avatar, SegmentedControl } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

const h = React.createElement;

// A small portrait used by the Figma reference rows.
const JENNY_SRC =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces";

const sampleComments = [
  {
    id: "c1",
    author: "Jenny Wen",
    timestamp: "6 hours ago",
    avatar: { src: JENNY_SRC, alt: "Jenny Wen" },
    body: "I love where this is headed, but I'm not quite sure about the spacing here. I think things could be nudged over a bit to get to a tighter rhythm.",
  },
  {
    id: "c2",
    author: "Jenny Wen",
    timestamp: "6 hours ago",
    avatar: { src: JENNY_SRC, alt: "Jenny Wen" },
    body: "I love where this is headed, but I'm not quite sure about the spacing here. I think things could be nudged over a bit to get to a tighter rhythm.",
  },
];

// A controlled composer wrapper so the stories type/submit like the real thing.
function useComposerState(initial = "") {
  const [value, setValue] = React.useState(initial);
  const [log, setLog] = React.useState([]);
  return {
    value,
    onChange: (event) => setValue(event.target.value),
    onSubmit: (next) => {
      if (!String(next).trim()) return;
      setLog((entries) => [...entries, next]);
      setValue("");
    },
    log,
  };
}

const stage = (children, width = 420) =>
  h(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "center",
        padding: 32,
        background: "var(--composa-color-bg-secondary, #f5f5f5)",
        minHeight: 360,
      },
    },
    h("div", { style: { width } }, children)
  );

export default {
  title: "Composa UI/Components/Collaboration/Comments",
  component: CommentThreadWindow,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Comments is the collaboration surface from the UI3 kit (Figma 4kilp0… nodes 2012-63721 composer, 2012-63732 thread window). " +
          "**CommentComposer** is modeled as a *reusable composer / chat input*, not a comment-only box: an optional leading avatar, a growing text field, a trailing/footer action cluster (emoji/mention/attach by default, fully slot-overridable), an optional `mode` scope slot, an attachments tray, and a submit affordance. " +
          "It is presentational + controlled — drive `value`/`onChange` and handle `onSubmit` (Enter submits, Shift+Enter inserts a newline). The same component is the app's AI side-chat input via the `card` layout plus `mode` and `attachments`. " +
          "**CommentItem** is one thread row, and **CommentThreadWindow** stacks a titlebar, a scrollable CommentItem list, and a pinned inline composer.",
      },
    },
  },
};

// ── Thread window states ────────────────────────────────────────────

export const Playground = {
  render: () => {
    const composer = useComposerState();
    return stage(
      h(CommentThreadWindow, {
        title: "Comment",
        comments: sampleComments,
        onMore: () => {},
        onResolve: () => {},
        onClose: () => {},
        composer: {
          avatar: { variant: "yellow", initials: "A" },
          placeholder: "Reply",
          value: composer.value,
          onChange: composer.onChange,
          onSubmit: composer.onSubmit,
        },
      })
    );
  },
  parameters: {
    docs: { description: { story: "The full thread window matching Figma 2012-63732: titlebar actions, two comments, and the pinned reply composer." } },
  },
};

export const WithComments = Playground;

export const EmptyThread = {
  render: () => {
    const composer = useComposerState();
    return stage(
      h(CommentThreadWindow, {
        title: "Comment",
        comments: [],
        emptyState: "No comments yet. Start the conversation.",
        onMore: () => {},
        onResolve: () => {},
        onClose: () => {},
        composer: {
          avatar: { variant: "yellow", initials: "A" },
          placeholder: "Add a comment",
          value: composer.value,
          onChange: composer.onChange,
          onSubmit: composer.onSubmit,
        },
      })
    );
  },
  parameters: {
    docs: { description: { story: "Empty-state thread — the list shows the `emptyState` slot while the composer stays pinned and ready." } },
  },
};

// ── Composer states ─────────────────────────────────────────────────────────

export const Composer = {
  render: () => {
    const composer = useComposerState("Have we thought about");
    return stage(
      h(CommentComposer, {
        layout: "card",
        placeholder: "Add a comment",
        value: composer.value,
        onChange: composer.onChange,
        onSubmit: composer.onSubmit,
      }),
      312
    );
  },
  parameters: {
    docs: { description: { story: "The standalone composer card (Figma 2012-63721): growing field, the emoji/mention/attach action cluster, and the blue circular send." } },
  },
};

export const ComposerFocused = {
  render: () => {
    const composer = useComposerState("Have we thought about");
    const ref = React.useRef(null);
    React.useEffect(() => {
      const field = ref.current?.querySelector(".composa-comment-composer-input");
      if (field) {
        field.focus();
        const end = field.value.length;
        field.setSelectionRange(end, end);
      }
    }, []);
    return stage(
      h("div", { ref }, h(CommentComposer, {
        layout: "card",
        placeholder: "Add a comment",
        value: composer.value,
        onChange: composer.onChange,
        onSubmit: composer.onSubmit,
      })),
      312
    );
  },
  parameters: {
    docs: { description: { story: "Composer focused with text and an active caret — the send becomes enabled once the field is non-empty." } },
  },
};

export const ChatInput = {
  render: () => {
    const composer = useComposerState();
    const [mode, setMode] = React.useState("agent");
    const modeSelector = h(SegmentedControl, {
      variant: "label",
      options: [
        { value: "ask", label: "Ask" },
        { value: "agent", label: "Agent" },
      ],
      value: mode,
      onValueChange: setMode,
      "aria-label": "Chat mode",
    });
    return stage(
      h(CommentComposer, {
        layout: "card",
        placeholder: "Ask Composa to build something…",
        value: composer.value,
        onChange: composer.onChange,
        onSubmit: composer.onSubmit,
        mode: modeSelector,
        actions: [{ icon: "image", label: "Attach" }, { icon: "at", label: "Reference a layer" }],
        attachments: composer.value.includes("@") ? [{ id: "sel", label: "Selection" }] : [],
        submitLabel: "Send",
      }),
      360
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Composer as the AI side-chat input.** The same CommentComposer drives the app's AI chat: a `mode` scope slot (a SegmentedControl Ask/Agent selector), an attach/reference action cluster, an attachments tray, and a send action. This is the variant the Composa app reuses on the left rail.",
      },
    },
  },
};

export const ReplyInline = {
  render: () => {
    const composer = useComposerState();
    return stage(
      h(
        "div",
        { style: { border: "1px solid var(--composa-color-border)", borderRadius: 13, overflow: "hidden", background: "var(--composa-color-bg)" } },
        h(CommentComposer, {
          layout: "inline",
          placeholder: "Reply",
          avatar: { variant: "yellow", initials: "A" },
          value: composer.value,
          onChange: composer.onChange,
          onSubmit: composer.onSubmit,
        })
      ),
      360
    );
  },
  parameters: {
    docs: { description: { story: "The inline reply pill (Figma 2012-63692) used at the bottom of the thread window: avatar + rounded field + inline send." } },
  },
};

export const Item = {
  render: () =>
    stage(
      h(
        "div",
        { style: { background: "var(--composa-color-bg)", borderRadius: 13, padding: "8px 0", border: "1px solid var(--composa-color-border)" } },
        h(CommentItem, {
          author: "Jenny Wen",
          timestamp: "6 hours ago",
          avatar: { src: JENNY_SRC, alt: "Jenny Wen" },
          body: "I love where this is headed, but I'm not quite sure about the spacing here. I think things could be nudged over a bit to get to a tighter rhythm.",
        })
      ),
      360
    ),
  parameters: {
    docs: { description: { story: "A single CommentItem row: gutter avatar, an author/timestamp header line, and a wrapping body." } },
  },
};

// ── Annotation stories ──────────────────────────────────────────────────

// Anatomy — CommentItem: avatar gutter, author/timestamp head, body text
export const AnatomyItem = {
  render: () =>
    stage(
      h(
        "div",
        { style: { background: "var(--composa-color-bg)", borderRadius: 13, padding: "8px 0", border: "1px solid var(--composa-color-border)" } },
        h(CommentItem, {
          author: "Jenny Wen",
          timestamp: "6 hours ago",
          avatar: { src: JENNY_SRC, alt: "Jenny Wen" },
          body: "I love where this is headed, but I'm not quite sure about the spacing here.",
        })
      ),
      360
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, type: "note", target: ".composa-comment-item-avatar", marker: "bracket", side: "left", text: "Avatar gutter — flex-none, margin-top aligns to author baseline" },
      { n: 2, type: "note", target: ".composa-comment-item-author", marker: "bracket", side: "top", text: "Author — body.large strong-weight" },
      { n: 3, type: "note", target: ".composa-comment-item-time", marker: "bracket", side: "top", text: "Timestamp — body.large regular, text-secondary" },
      { n: 4, type: "note", target: ".composa-comment-item-body", marker: "bracket", side: "bottom", text: "Body — body.large regular, wraps at container width" },
    ],
    docs: { description: { story: "Anatomy of a single CommentItem row: the avatar gutter, author/timestamp head line, and wrapping body." } },
  },
};

// Anatomy — CommentComposer card: field area, footer, action cluster, submit
export const AnatomyComposer = {
  render: () => {
    const composer = useComposerState("Have we thought about");
    return stage(
      h(CommentComposer, {
        layout: "card",
        placeholder: "Add a comment",
        value: composer.value,
        onChange: composer.onChange,
        onSubmit: composer.onSubmit,
      }),
      312
    );
  },
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, type: "note", target: ".composa-comment-composer-card", marker: "bracket", side: "left", text: "Card — bg, radius-large, elevation shadow" },
      { n: 2, type: "note", target: ".composa-comment-composer-field", marker: "bracket", side: "left", text: "Field area — growing textarea, body.large, 16px inset" },
      { n: 3, type: "note", target: ".composa-comment-composer-footer", marker: "bracket", side: "bottom", text: "Footer — 40px, top hairline, actions left + submit right" },
      { n: 4, type: "note", target: ".composa-comment-composer-actions", marker: "bracket", side: "bottom", text: "Action cluster — emoji / mention / attach icon buttons" },
      { n: 5, type: "note", target: ".composa-comment-composer-card .composa-comment-composer-submit", marker: "pin", side: "right", text: "Submit — circular, accent-blue fill, disabled when field is empty" },
    ],
    docs: { description: { story: "Anatomy of the CommentComposer card layout (Figma 2012-63721): growing field area, footer with action cluster on the left and circular submit on the right." } },
  },
};

// Color — CommentComposer card: bg, footer border, accent-blue submit, input text
export const Color = {
  render: () => {
    const composer = useComposerState("Have we thought about");
    return stage(
      h(CommentComposer, {
        layout: "card",
        placeholder: "Add a comment",
        value: composer.value,
        onChange: composer.onChange,
        onSubmit: composer.onSubmit,
      }),
      312
    );
  },
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, type: "token", kind: "color", target: ".composa-comment-composer-card", prop: "background-color", side: "left" },
      { n: 2, type: "token", kind: "color", target: ".composa-comment-composer-footer", prop: "border-top-color", side: "bottom" },
      { n: 3, type: "token", kind: "color", target: ".composa-comment-composer-card .composa-comment-composer-submit", prop: "background-color", side: "right" },
      { n: 4, type: "token", kind: "color", target: ".composa-comment-composer-input", prop: "color", side: "top" },
    ],
    docs: { description: { story: "Color tokens for the CommentComposer card: surface background, footer top-border, accent-blue submit fill, and input text color." } },
  },
};

// Color — CommentItem: author text, timestamp, body text
export const ColorItem = {
  render: () =>
    stage(
      h(
        "div",
        { style: { background: "var(--composa-color-bg)", borderRadius: 13, padding: "8px 0", border: "1px solid var(--composa-color-border)" } },
        h(CommentItem, {
          author: "Jenny Wen",
          timestamp: "6 hours ago",
          avatar: { src: JENNY_SRC, alt: "Jenny Wen" },
          body: "I love where this is headed, but I'm not quite sure about the spacing here.",
        })
      ),
      360
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, type: "token", kind: "color", target: ".composa-comment-item-author", prop: "color", side: "top" },
      { n: 2, type: "token", kind: "color", target: ".composa-comment-item-time", prop: "color", side: "top" },
      { n: 3, type: "token", kind: "color", target: ".composa-comment-item-body", prop: "color", side: "bottom" },
    ],
    docs: { description: { story: "Color tokens for CommentItem text: author uses the primary text token; timestamp uses text-secondary; body uses the primary text token." } },
  },
};

// Typography — CommentItem: all text uses body.large; author name uses strong-weight
export const Typography = {
  render: () =>
    stage(
      h(
        "div",
        { style: { background: "var(--composa-color-bg)", borderRadius: 13, padding: "8px 0", border: "1px solid var(--composa-color-border)" } },
        h(CommentItem, {
          author: "Jenny Wen",
          timestamp: "6 hours ago",
          avatar: { src: JENNY_SRC, alt: "Jenny Wen" },
          body: "I love where this is headed, but I'm not quite sure about the spacing here.",
        })
      ),
      360
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, type: "token", kind: "typography", target: ".composa-comment-item-author", anchor: "center", side: "top" },
      { n: 2, type: "token", kind: "typography", target: ".composa-comment-item-time", anchor: "center", side: "top" },
      { n: 3, type: "token", kind: "typography", target: ".composa-comment-item-body", anchor: "center", side: "bottom" },
    ],
    docs: { description: { story: "Typography tokens — all CommentItem text uses body.large. Author name uses the strong weight; timestamp and body use the regular weight." } },
  },
};

// Accessibility — CommentComposer: textarea (form-element) + submit button
export const Accessibility = {
  render: () => {
    const composer = useComposerState();
    return stage(
      h(CommentComposer, {
        layout: "card",
        placeholder: "Add a comment",
        value: composer.value,
        onChange: composer.onChange,
        onSubmit: composer.onSubmit,
      }),
      312
    );
  },
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        type: "form-element",
        target: ".composa-comment-composer-input",
        control: "<textarea>",
        controlLabel: "Placeholder text is the visible label; pair with an aria-label on the form when no visible heading names the composer",
        required: false,
        tier: { priority: "ideal", difficulty: "medium" },
      },
      {
        n: 2,
        type: "button",
        target: ".composa-comment-composer-card .composa-comment-composer-submit",
        element: "<button>",
        role: "button",
        keyboard: [{ keys: "Enter (in field)", result: "submits when field is non-empty; Shift+Enter inserts newline" }],
        tier: { priority: "required", difficulty: "easy" },
      },
    ],
    docs: { description: { story: "Accessibility of the CommentComposer: the growing textarea is a controlled form element; Enter submits when non-empty (Shift+Enter = newline). The circular send is a standard button." } },
  },
};

// Accessibility — CommentThreadWindow: titlebar close button + thread list reading order
export const AccessibilityThread = {
  render: () => {
    const composer = useComposerState();
    return stage(
      h(CommentThreadWindow, {
        title: "Comment",
        comments: sampleComments,
        onMore: () => {},
        onResolve: () => {},
        onClose: () => {},
        composer: {
          avatar: { variant: "yellow", initials: "A" },
          placeholder: "Reply",
          value: composer.value,
          onChange: composer.onChange,
          onSubmit: composer.onSubmit,
        },
      })
    );
  },
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        type: "button",
        target: ".composa-comment-thread-actions .composa-icon-button",
        element: "<button>",
        role: "button",
        keyboard: [{ keys: "Enter / Space", result: "activates the titlebar action (resolve or close)" }],
        each: true,
        tier: { priority: "required", difficulty: "easy" },
      },
      {
        n: 2,
        type: "note",
        target: ".composa-comment-thread-list",
        marker: "bracket",
        side: "left",
        text: "Thread list — comment items read in document order; no list role. Count/unread meaning must be expressed in the titlebar label, not the dot alone.",
      },
    ],
    docs: { description: { story: "Accessibility of the CommentThreadWindow: titlebar resolve/close are standard icon buttons. The thread list renders items in document order; screen readers encounter each body in sequence." } },
  },
};
