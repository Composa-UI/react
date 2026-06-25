import { expect, fn, userEvent, within } from "storybook/test";
import {
  ButtonFamily,
  SplitButtonFamily,
  IconButtonFamily,
  ToggleButtonFamily,
} from "./composa-component-stories.js";

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
  play: buttonClickPlay,
};

// One Toggle story. Flip the `Dialog` control on for the dialog-toggle (corner
// dot) variant — it is the same component, so it no longer needs its own story.
export const Toggle = {
  ...ToggleButtonFamily,
  args: { ...ToggleButtonFamily.args, onClick: fn() },
  play: buttonClickPlay,
};

// SplitButton has two handlers: the action (onClick) and the menu (onMenuClick).
// Assert each fires on its own half, and that both are blocked when disabled.
export const SplitButton = {
  ...SplitButtonFamily,
  args: { ...SplitButtonFamily.args, onClick: fn(), onMenuClick: fn() },
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

// Sidebar mock: dark bg, 232px wide (256px - 2x12px outer padding), 16px
// horizontal margin applied as padding inside the sidebar frame. Shows the
// three sidebar variants stacked with wide width, plus a bordered section
// containing a ghost action.
export const WideSidebarPlacement = {
  parameters: {
    docs: {
      description: {
        story:
          "In a 256px sidebar, buttons use `width=\"wide\"` and a 16px horizontal margin. Primary marks the irreplaceable next step; secondary is the default choice; ghost sits inside a section that already has a visible border.",
      },
    },
  },
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          background: "#1e1e1e",
          width: "232px",
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          borderRadius: "4px",
        },
      },
      React.createElement(ButtonFamily.render || (() => null), {
        ...(ButtonFamily.args || {}),
        variant: "primary",
        label: "Publish",
        width: "wide",
      }),
      React.createElement(ButtonFamily.render || (() => null), {
        ...(ButtonFamily.args || {}),
        variant: "secondary",
        label: "Save draft",
        width: "wide",
      }),
      React.createElement(
        "div",
        {
          style: {
            border: "1px solid #3a3a3a",
            borderRadius: "4px",
            padding: "6px",
            marginTop: "4px",
          },
        },
        React.createElement(ButtonFamily.render || (() => null), {
          ...(ButtonFamily.args || {}),
          variant: "ghost",
          label: "View history",
          width: "wide",
        })
      )
    ),
};

// Large-size variants in a flex row on a light gray background. Shows the
// standard Button variants (primary, secondary, ghost, destructive) and an
// IconButton all at size="large" so reviewers can compare the 32px height.
export const LargeVariants = {
  parameters: {
    docs: {
      description: {
        story:
          "32px (`size=\"large\"`) is reserved for control-focused toolbar surfaces like design editor toolbars. Do not use in dialogs, sidebars, or settings panels.",
      },
    },
  },
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          background: "#f0f0f0",
          padding: "16px",
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "center",
          flexWrap: "wrap",
          borderRadius: "4px",
        },
      },
      React.createElement(ButtonFamily.render || (() => null), {
        ...(ButtonFamily.args || {}),
        variant: "primary",
        label: "Primary",
        size: "large",
      }),
      React.createElement(ButtonFamily.render || (() => null), {
        ...(ButtonFamily.args || {}),
        variant: "secondary",
        label: "Secondary",
        size: "large",
      }),
      React.createElement(ButtonFamily.render || (() => null), {
        ...(ButtonFamily.args || {}),
        variant: "ghost",
        label: "Ghost",
        size: "large",
      }),
      React.createElement(ButtonFamily.render || (() => null), {
        ...(ButtonFamily.args || {}),
        variant: "destructive",
        label: "Destructive",
        size: "large",
      }),
      React.createElement(IconButtonFamily.render || (() => null), {
        ...(IconButtonFamily.args || {}),
        icon: "move",
        label: "Move",
        size: "large",
      })
    ),
};

// Two items side by side with small labels above: SplitButton (Figma "Multi-option")
// and ToggleButton (Figma "Bool Modifier"), both at size="large".
export const LargeMultiOptionBoolModifier = {
  parameters: {
    docs: {
      description: {
        story:
          "In Figma's Frame 2 taxonomy, \"Multi-option\" maps to `SplitButton size=\"large\"` and \"Bool Modifier\" maps to `ToggleButton size=\"large\"`. Use these components — not the Figma names — in code.",
      },
    },
  },
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          background: "#f0f0f0",
          padding: "16px",
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          alignItems: "flex-start",
          borderRadius: "4px",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              fontSize: "11px",
              color: "#666",
              fontFamily: "sans-serif",
            },
          },
          "Multi-option = SplitButton"
        ),
        React.createElement(SplitButtonFamily.render || (() => null), {
          ...(SplitButtonFamily.args || {}),
          label: "Publish",
          size: "large",
        })
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              fontSize: "11px",
              color: "#666",
              fontFamily: "sans-serif",
            },
          },
          "Bool Modifier = ToggleButton"
        ),
        React.createElement(ToggleButtonFamily.render || (() => null), {
          ...(ToggleButtonFamily.args || {}),
          icon: "move",
          label: "Lock",
          size: "large",
          pressed: false,
        })
      )
    ),
};

// Fixed-size transport row: skip-back IconButton, play/pause ToggleButton,
// skip-forward IconButton. Feedback from color only — the row does not reflow.
export const TogglePlayOption = {
  args: { onClick: fn() },
  parameters: {
    docs: {
      description: {
        story:
          "Transport row using a ToggleButton for play/pause. Color is the only feedback signal — the row does not reflow when toggled. `pressed={false}` is the default (stopped) state.",
      },
    },
  },
  render: (args) =>
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          alignItems: "center",
          padding: "8px",
          background: "#2c2c2c",
          borderRadius: "4px",
          width: "fit-content",
        },
      },
      React.createElement(IconButtonFamily.render || (() => null), {
        ...(IconButtonFamily.args || {}),
        icon: "skip-back",
        label: "Skip back",
        onClick: args.onClick,
      }),
      React.createElement(ToggleButtonFamily.render || (() => null), {
        ...(ToggleButtonFamily.args || {}),
        icon: "play",
        label: "Play / Pause",
        pressed: false,
        onClick: args.onClick,
      }),
      React.createElement(IconButtonFamily.render || (() => null), {
        ...(IconButtonFamily.args || {}),
        icon: "skip-forward",
        label: "Skip forward",
        onClick: args.onClick,
      })
    ),
};

// Two static ToggleButton instances with dialog={true}: one with the dialog
// closed (dialogOpen=false) and one with the dialog open (dialogOpen=true).
// Labels explain each state.
export const ToggleDialogExample = {
  parameters: {
    docs: {
      description: {
        story:
          "A dialog toggle (`dialog={true}`) is active — showing the corner dot as pressed — only while the dialog it controls is open. Two static instances show the closed and open states side by side.",
      },
    },
  },
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          alignItems: "flex-start",
          padding: "16px",
          background: "#2c2c2c",
          borderRadius: "4px",
          width: "fit-content",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "center",
          },
        },
        React.createElement(ToggleButtonFamily.render || (() => null), {
          ...(ToggleButtonFamily.args || {}),
          icon: "settings",
          label: "Settings",
          dialog: true,
          dialogOpen: false,
          pressed: false,
        }),
        React.createElement(
          "span",
          {
            style: {
              fontSize: "11px",
              color: "#aaa",
              fontFamily: "sans-serif",
            },
          },
          "Closed"
        )
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "center",
          },
        },
        React.createElement(ToggleButtonFamily.render || (() => null), {
          ...(ToggleButtonFamily.args || {}),
          icon: "settings",
          label: "Settings",
          dialog: true,
          dialogOpen: true,
          pressed: true,
        }),
        React.createElement(
          "span",
          {
            style: {
              fontSize: "11px",
              color: "#aaa",
              fontFamily: "sans-serif",
            },
          },
          "Open"
        )
      )
    ),
};

// Two static ToggleButton instances with variant="groove" (design-view toolbar
// subtype). Shows the off and on states side by side with labels.
// If the "groove" variant does not exist in the component, fall back to
// variant="secondary" — see the Groove section in the Style tab for context.
export const ToggleGroove = {
  parameters: {
    docs: {
      description: {
        story:
          "Groove is a ToggleButton subtype (`variant=\"groove\"`) for design-view toolbars only. It uses a deeper pressed fill than a standard dialog-toggle to signal that the tool is locked into a persistent design-view mode. Do not use in dialogs, settings panels, or anywhere the standard dialog-toggle fits.",
      },
    },
  },
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          alignItems: "flex-start",
          padding: "16px",
          background: "#2c2c2c",
          borderRadius: "4px",
          width: "fit-content",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "center",
          },
        },
        React.createElement(ToggleButtonFamily.render || (() => null), {
          ...(ToggleButtonFamily.args || {}),
          icon: "pen",
          label: "Pen tool",
          // Use variant="groove" for the design-view toolbar subtype.
          // Fall back to variant="secondary" if the groove variant is not yet shipped.
          variant: "groove",
          dialog: true,
          dialogOpen: false,
          pressed: false,
        }),
        React.createElement(
          "span",
          {
            style: {
              fontSize: "11px",
              color: "#aaa",
              fontFamily: "sans-serif",
            },
          },
          "Closed"
        )
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "center",
          },
        },
        React.createElement(ToggleButtonFamily.render || (() => null), {
          ...(ToggleButtonFamily.args || {}),
          icon: "pen",
          label: "Pen tool",
          // Use variant="groove" for the design-view toolbar subtype.
          // Fall back to variant="secondary" if the groove variant is not yet shipped.
          variant: "groove",
          dialog: true,
          dialogOpen: true,
          pressed: true,
        }),
        React.createElement(
          "span",
          {
            style: {
              fontSize: "11px",
              color: "#aaa",
              fontFamily: "sans-serif",
            },
          },
          "Open"
        )
      )
    ),
};
