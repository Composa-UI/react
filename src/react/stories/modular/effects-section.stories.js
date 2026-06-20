import React from "react";
import { fn } from "storybook/test";
import { EffectsSection } from "../../story-runtime.js";

const panel = (story) =>
  React.createElement(
    "div",
    {
      style: {
        width: 240,
        borderLeft: "1px solid var(--composa-color-border)",
        background: "var(--composa-color-bg)",
      },
    },
    story
  );

const effectItems = [
  { id: "drop-shadow", type: "Effect", label: "Drop shadow", icon: "effectShadow", visible: true },
];

export default {
  title: "Composa UI/Components/Modules/Inspector/EffectsSection",
  component: EffectsSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "EffectsSection is the inspector section for visual effects. Empty effect state collapses to a secondary property header; effect rows expose type, visibility, and remove controls.",
      },
    },
  },
  args: {
    items: effectItems,
    onExpandedChange: fn(),
    onAdd: fn(),
    onRemove: fn(),
    onVisibilityToggle: fn(),
    onEffectTypeToggle: fn(),
    onEffectValueClick: fn(),
  },
  argTypes: {
    items: {
      control: "object",
      description: "Effect rows rendered by the section. An empty array renders the collapsed no-value state.",
      table: { type: { summary: "PaintSectionItem[]" } },
    },
    effectDialogOpenId: {
      control: "text",
      description: "Marks the effect row whose effect editor is open.",
      table: { type: { summary: "string" } },
    },
    expanded: {
      control: "boolean",
      description: "Controls whether rows are visible. Empty sections remain collapsed.",
    },
    defaultExpanded: {
      control: "boolean",
      description: "Initial expanded state for uncontrolled usage.",
    },
  },
};

export const Default = {
  render: (args) => React.createElement(EffectsSection, args),
};

export const Collapsed = {
  args: {
    items: undefined,
    defaultItems: [],
  },
  render: (args) => React.createElement(EffectsSection, args),
  parameters: {
    docs: {
      description: {
        story: "No effect value: the property collapses back to a secondary-color section header.",
      },
    },
  },
};

export const DialogOpen = {
  args: {
    effectDialogOpenId: "drop-shadow",
  },
  render: (args) => React.createElement(EffectsSection, args),
  parameters: {
    docs: {
      description: {
        story: "The left effect-type action uses the selected state while the effect editor is open.",
      },
    },
  },
};

export const HiddenValue = {
  args: {
    items: [
      { id: "drop-shadow", type: "Effect", label: "Drop shadow", icon: "effectShadow", visible: false },
    ],
  },
  render: (args) => React.createElement(EffectsSection, args),
  parameters: {
    docs: {
      description: {
        story: "Hidden effect value: the visibility action changes to the hidden state while the effect row remains editable.",
      },
    },
  },
};

export const RightPanelWidth = {
  render: (args) => panel(React.createElement(EffectsSection, args)),
  parameters: {
    docs: {
      description: {
        story: "Shows EffectsSection in the 240px inspector width.",
      },
    },
  },
};
