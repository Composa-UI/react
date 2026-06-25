import { expect, fn, userEvent, within } from "storybook/test";
import {
  ButtonFamily,
  SplitButtonFamily,
  IconButtonFamily,
  ToggleButtonFamily,
} from "./composa-component-stories.js";
import React from "react";
import { Button as ButtonControl, IconButton as IconButtonControl, ToggleButton as ToggleButtonControl, SplitButton as SplitButtonControl, OverlayHost } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

// The icon-button family carries an intrinsic FloatingTooltip that opens on
// hover/focus and portals into the nearest OverlayHost. The interaction tests
// (`play`) click — and therefore focus — the button, which opens that tooltip.
// Without an OverlayHost the tooltip falls back to INLINE rendering (factory.js
// OverlayPortal) and lands on top of the button, hiding it. Wrapping the stage
// in an OverlayHost lets the tooltip portal + position correctly instead.
const withOverlayHost = (Story) =>
  React.createElement(OverlayHost, { style: { display: "inline-block", padding: "40px" } }, React.createElement(Story));

// All button types live on one page, matching Figma where buttons share a page.
export default {
  title: "Composa UI/Components/Base/Buttons",
  // The MDX page (buttons.mdx) owns the Docs tab for the whole button family.
  tags: ["!autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Button is the primary action control in Composa UI. Use it to start an action, submit a form, confirm a choice, or open a dialog. The `variant` carries the intent: `primary` for the one main action in a view, `secondary` for supporting actions, `destructive` for irreversible ones. This page also covers the shared button family (`IconButton`, `ToggleButton`, `SplitButton`), which reuses Button's variant vocabulary.",
      },
    },
  },
};

// The Button story carries its own interaction test (no separate story).
export const Button = {
  ...ButtonFamily,
  args: { ...ButtonFamily.args, onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

// Asserts the single button-family control fires its handler on click, and that
// a disabled instance does not. A native `disabled` <button> dispatches no click
// event, so clicking it (pointer-events check skipped) must leave the spy at 0.
const buttonClickPlay = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button");
  await userEvent.click(button);
  await expect(args.onClick).toHaveBeenCalledTimes(1);

  button.disabled = true;
  await userEvent.click(button, { pointerEventsCheck: 0 });
  await expect(args.onClick).toHaveBeenCalledTimes(1);

  // Restore the working state so the default story view shows an enabled
  // control rather than the disabled end-state of the interaction test.
  button.disabled = false;
};

export const IconButton = {
  ...IconButtonFamily,
  args: { ...IconButtonFamily.args, onClick: fn() },
  decorators: [withOverlayHost],
  play: buttonClickPlay,
};

// One Toggle story. Flip the `Dialog` control on for the dialog-toggle (corner
// dot) variant — it is the same component, so it no longer needs its own story.
export const Toggle = {
  ...ToggleButtonFamily,
  args: { ...ToggleButtonFamily.args, onClick: fn() },
  decorators: [withOverlayHost],
  play: buttonClickPlay,
};

// SplitButton has two handlers: the action (onClick) and the menu (onMenuClick).
// Assert each fires on its own half, and that both are blocked when disabled.
export const SplitButton = {
  ...SplitButtonFamily,
  args: { ...SplitButtonFamily.args, onClick: fn(), onMenuClick: fn() },
  decorators: [withOverlayHost],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const action = canvas.getByRole("button", { name: SplitButtonFamily.args.label });
    const menu = canvas.getByRole("button", { name: `${SplitButtonFamily.args.label} options` });

    await userEvent.click(action);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    await userEvent.click(menu);
    await expect(args.onMenuClick).toHaveBeenCalledTimes(1);

    action.disabled = true;
    menu.disabled = true;
    await userEvent.click(action, { pointerEventsCheck: 0 });
    await userEvent.click(menu, { pointerEventsCheck: 0 });
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await expect(args.onMenuClick).toHaveBeenCalledTimes(1);

    // Restore both halves so the default story view shows working buttons.
    action.disabled = false;
    menu.disabled = false;
  },
};

// Anatomy — Button's declared parts (label, hotkey; icon when present).
export const Anatomy = {
  render: () => React.createElement(ButtonControl, { label: "Save", hotkey: true, variant: "primary" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-button" }] },
};

// Color — the button fill token (derived). Color facet.
export const Color = {
  render: () => React.createElement(ButtonControl, { label: "Save", variant: "primary" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: ".composa-button", marker: "pin", side: "top", type: "token", kind: "color", prop: "background" }] },
};

// Typography — the label type token (derived). Typography facet.
export const Typography = {
  render: () => React.createElement(ButtonControl, { label: "Save", variant: "primary" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: '.composa-button [data-part="label"]', marker: "pin", side: "bottom", type: "token", kind: "typography", anchor: "center" }] },
};

// Layout — Layout facet: height redline (existing), corner-radius (NEW v2 visual, needs owner
// review), and the gap between the label and the hotkey kbd (NEW v2 visual). All derived live.
export const Layout = {
  render: () => React.createElement(ButtonControl, { label: "Save", hotkey: true, variant: "primary" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-button", type: "redline", dimension: "height" },
      { target: ".composa-button", type: "radius", corner: "top-left" },
      { target: '.composa-button [data-part="label"]', targetB: ".composa-button-hotkey", type: "gap" },
    ],
  },
};

// Accessibility — native <button>, name from the visible label.
export const Accessibility = {
  render: () => React.createElement(ButtonControl, { label: "Save changes", variant: "primary" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-button",
        marker: "pin",
        side: "top",
        type: "button",
        element: "<button>",
        role: "button",
        accessibleName: "the visible label text",
        keyboard: [{ keys: "Enter / Space", result: "activates the button" }],
        states: [{ state: "disabled", aria: "the disabled attribute (not focusable)" }],
        tier: { priority: "mandatory", difficulty: "easy" },
      },
    ],
  },
};

// IconButton — glyph-only; the accessible name MUST come from the `label` prop (no visible text).
export const IconButtonAnatomy = {
  render: () => React.createElement(IconButtonControl, { icon: "search", label: "Search", tooltip: false }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-icon-button" }] },
};
export const IconButtonAccessibility = {
  render: () => React.createElement(IconButtonControl, { icon: "search", label: "Search", tooltip: false }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-icon-button",
        marker: "pin",
        side: "top",
        type: "button",
        element: "<button>",
        role: "button",
        accessibleName: "the `label` prop (aria-label — REQUIRED; there is no visible text)",
        keyboard: [{ keys: "Enter / Space", result: "activates" }],
        states: [{ state: "disabled", aria: "the disabled attribute" }],
        tier: { priority: "mandatory", difficulty: "easy" },
      },
    ],
  },
};

// ToggleButton — IconButton with on/off semantics surfaced as aria-pressed.
export const ToggleAccessibility = {
  render: () => React.createElement(ToggleButtonControl, { icon: "eye", label: "Toggle visibility", pressed: true, tooltip: false }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-icon-button",
        marker: "pin",
        side: "top",
        type: "button",
        element: "<button>",
        role: "button",
        accessibleName: "the `label` prop (aria-label)",
        keyboard: [{ keys: "Enter / Space", result: "toggles pressed / unpressed" }],
        states: [{ state: "pressed / not", aria: "aria-pressed: true | false" }],
        tier: { priority: "mandatory", difficulty: "easy" },
      },
    ],
  },
};

// WideSidebarPlacement — Three fill-width buttons stacked in a narrow sidebar container,
// demonstrating how primary, secondary, and ghost variants coexist in a confined column.
export const WideSidebarPlacement = {
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          width: "200px",
          display: "flex",
          flexDirection: "column",
          gap: "var(--composa-space-1)",
          padding: "var(--composa-space-2)",
          background: "var(--composa-color-bg-secondary)",
          borderRadius: "var(--composa-radius-medium)",
        },
      },
      React.createElement(ButtonControl, { label: "Publish", variant: "primary", width: "fill" }),
      React.createElement(ButtonControl, { label: "Save draft", variant: "secondary", width: "fill" }),
      React.createElement(ButtonControl, { label: "View history", variant: "ghost", width: "fill" })
    ),
  parameters: {
    docs: {
      description: {
        story: "Three width fill buttons in a sidebar context — primary, secondary, ghost.",
      },
    },
  },
};

// LargeVariants — All button variants rendered at size=large (32px) in a flex row,
// including text buttons and icon buttons, for toolbar surface reference.
export const LargeVariants = {
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "var(--composa-space-1)",
          flexWrap: "wrap",
        },
      },
      React.createElement(ButtonControl, { label: "Primary", variant: "primary", size: "large" }),
      React.createElement(ButtonControl, { label: "Secondary", variant: "secondary", size: "large" }),
      React.createElement(ButtonControl, { label: "Ghost", variant: "ghost", size: "large" }),
      React.createElement(ButtonControl, { label: "Destructive", variant: "destructive", size: "large" }),
      React.createElement(IconButtonControl, { icon: "move", label: "Move", size: "large", tooltip: false }),
      React.createElement(IconButtonControl, { icon: "text", label: "Text", size: "large", tooltip: false })
    ),
  parameters: {
    docs: {
      description: {
        story: "All button variants at size=large (32px). Use in control-focused toolbar surfaces.",
      },
    },
  },
};

// LargeMultiOptionBoolModifier — Figma's Multi-option (SplitButton) and Bool Modifier
// (ToggleButton) patterns side by side at size=large.
export const LargeMultiOptionBoolModifier = {
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-end",
          gap: "var(--composa-space-3)",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "var(--composa-space-1)",
            alignItems: "flex-start",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              fontSize: "11px",
              color: "var(--composa-color-text-secondary)",
              fontFamily: "var(--composa-font-family)",
            },
          },
          "Multi-option"
        ),
        React.createElement(SplitButtonControl, { label: "Action", size: "large" })
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "var(--composa-space-1)",
            alignItems: "flex-start",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              fontSize: "11px",
              color: "var(--composa-color-text-secondary)",
              fontFamily: "var(--composa-font-family)",
            },
          },
          "Bool Modifier"
        ),
        React.createElement(ToggleButtonControl, { icon: "move", label: "Lock", size: "large", pressed: false, tooltip: false })
      )
    ),
  parameters: {
    docs: {
      description: {
        story: "Figma's 'Multi-option' maps to SplitButton and 'Bool Modifier' maps to ToggleButton, both at size=large.",
      },
    },
  },
};

// TogglePlayOption — A transport control row with prev, play/pause toggle, and next.
// "minus" is used for prev and "plus" for next — the valid icon set has no skip-back/forward.
export const TogglePlayOption = {
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "2px",
        },
      },
      React.createElement(IconButtonControl, { icon: "skipBack", label: "Previous", tooltip: false }),
      React.createElement(ToggleButtonControl, { icon: "play", label: "Play", pressed: false, tooltip: false }),
      React.createElement(IconButtonControl, { icon: "skipForward", label: "Next", tooltip: false })
    ),
  parameters: {
    docs: {
      description: {
        story: "Play-option toggle in a transport row. All controls stay the same size; pressed state is communicated by icon color only, not layout reflow.",
      },
    },
  },
};

// ToggleDialogExample — Two dialog-opener toggles showing closed vs open state side by side.
// The corner dot signals the dialog association; when dialogOpen is true the toggle
// shows the active/selected appearance.
export const ToggleDialogExample = {
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-end",
          gap: "var(--composa-space-3)",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "var(--composa-space-1)",
            alignItems: "flex-start",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              fontSize: "11px",
              color: "var(--composa-color-text-secondary)",
              fontFamily: "var(--composa-font-family)",
            },
          },
          "Closed"
        ),
        React.createElement(ToggleButtonControl, { icon: "settings", label: "Closed", dialog: true, dialogOpen: false, tooltip: false })
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "var(--composa-space-1)",
            alignItems: "flex-start",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              fontSize: "11px",
              color: "var(--composa-color-text-secondary)",
              fontFamily: "var(--composa-font-family)",
            },
          },
          "Open"
        ),
        React.createElement(ToggleButtonControl, { icon: "settings", label: "Open", dialog: true, dialogOpen: true, tooltip: false })
      )
    ),
  parameters: {
    docs: {
      description: {
        story: "Dialog-opener toggle: active only while the dialog is open. The corner dot signals the association.",
      },
    },
  },
};
