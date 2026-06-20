import React from "react";
import { ControlGroup, OverlayHost } from "../story-runtime.js";

const actionItems = [
  { id: "left", icon: "alignLeft", label: "Align left" },
  { id: "center", icon: "alignHorizontalCenter", label: "Align horizontal centers" },
  { id: "right", icon: "alignRight", label: "Align right" },
];

export default {
  title: "Composa UI/Components/Base/ControlGroup",
  component: ControlGroup,
  // The MDX page (control-group.mdx) owns the Docs tab. Opt this meta out of the
  // global `autodocs` tag so there is no duplicate auto-generated Docs page.
  tags: ["!autodocs"],
  // Each ControlGroup item is an IconButton with an intrinsic FloatingTooltip
  // (W3b). The tooltip portals into the nearest OverlayHost, so wrap the stage in
  // one — otherwise the tooltip has nowhere to mount and hovering shows nothing.
  decorators: [
    (Story) =>
      React.createElement(
        OverlayHost,
        { style: { display: "inline-block", padding: "48px" } },
        React.createElement(Story)
      ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "ControlGroup clusters related icon actions on one dense 24px track with visible split spacing between actions. Use it for momentary actions where the group does not own a selected value. Use SegmentedControl when one option is currently selected.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Accessible label for the grouped actions.",
      table: { defaultValue: { summary: "Alignment actions" } },
    },
    items: {
      control: "object",
      description: "Icon action items rendered inside the control group.",
    },
    disabled: {
      control: "boolean",
      description: "Disables every action in the group.",
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export const Default = {
  args: {
    label: "Alignment actions",
    items: actionItems,
    disabled: false,
  },
  render: (args) => React.createElement(ControlGroup, args),
  parameters: {
    docs: {
      description: {
        story: "Shows a three-action icon group without selected state.",
      },
    },
  },
};
