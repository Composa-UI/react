import { expect, fn, userEvent, within } from "storybook/test";
import {
  ButtonFamily,
  SplitButtonFamily,
  IconButtonFamily,
  ToggleButtonFamily,
} from "./composa-component-stories.js";

// All button types live on one page, matching Figma where buttons share a page.
export default {
  title: "Composa UI/Base Components/Buttons",
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
