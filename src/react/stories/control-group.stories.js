import React from "react";
import { ControlGroup, OverlayHost } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

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

// The annotation overlay wraps the Story itself; the meta's OverlayHost decorator still applies
// (decorators stack), so the icon-button tooltips have a host to portal into.

// Color — the group's container fill token (derived). Color facet.
export const Color = {
  render: () => React.createElement(ControlGroup, { label: "Alignment actions", items: actionItems }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: ".composa-control-group", marker: "pin", side: "top", type: "token", kind: "color", prop: "background" }] },
};

// Layout — track height redline + corner-radius (NEW v2 visual). Layout facet. Derived live.
export const Layout = {
  render: () => React.createElement(ControlGroup, { label: "Alignment actions", items: actionItems }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-control-group", type: "redline", dimension: "height" },
      { target: ".composa-control-group", type: "radius", corner: "top-left" },
    ],
  },
};

// Accessibility — COMPOSITE: the container is role=group (a toolbar of momentary actions) and
// EVERY action is bracketed as a button (each item is an icon-only <button>, named by aria-label).
export const Accessibility = {
  render: () => React.createElement(ControlGroup, { label: "Alignment actions", items: actionItems }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-control-group",
        marker: "pin",
        side: "top",
        type: "list",
        element: "<div>",
        role: "group",
        accessibleName: "aria-label (the `label` prop)",
        itemRole: "button",
        keyboard: [
          { keys: "Tab", result: "moves into / through the group" },
          { keys: "Enter / Space", result: "activates the focused action" },
        ],
        states: [{ state: "each action", aria: "<button> named by its own aria-label (the item `label`)" }],
        tier: { priority: "mandatory", difficulty: "moderate" },
      },
      {
        n: 2,
        each: true,
        target: ".composa-control-group .composa-control-group-item",
        marker: "bracket",
        side: "bottom",
        type: "listitem",
        role: "button",
      },
    ],
  },
};
