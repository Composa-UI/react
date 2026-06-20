import React from "react";
import { CommentComposer, CommentItem, CommentThreadWindow, Avatar, SegmentedControl } from "../story-runtime.js";

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
    body: "I love where this is headed, but I’m not quite sure about the spacing here. I think things could be nudged over a bit to get to a tighter rhythm.",
  },
  {
    id: "c2",
    author: "Jenny Wen",
    timestamp: "6 hours ago",
    avatar: { src: JENNY_SRC, alt: "Jenny Wen" },
    body: "I love where this is headed, but I’m not quite sure about the spacing here. I think things could be nudged over a bit to get to a tighter rhythm.",
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

// ── Thread window states ──────────────────────────────────────────────────

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

// ── Composer states ────────────────────────────────────────────────────────

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
          body: "I love where this is headed, but I’m not quite sure about the spacing here. I think things could be nudged over a bit to get to a tighter rhythm.",
        })
      ),
      360
    ),
  parameters: {
    docs: { description: { story: "A single CommentItem row: gutter avatar, an author/timestamp header line, and a wrapping body." } },
  },
};
