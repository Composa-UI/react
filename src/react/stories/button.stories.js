import { expect, fn, userEvent, within } from "storybook/test";
import {
  ButtonFamily,
  SplitButtonFamily,
  IconButtonFamily,
  ToggleButtonFamily,
} from "./composa-component-stories.js";
import { Button, IconButton, ToggleButton, SplitButton } from "@composa-ui/react";

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

// WideSidebarPlacement — sidebar mock with three stacked full-width buttons.
// Background uses a CSS custom property so no hardcoded dark hex is present.
export const WideSidebarPlacement = {
  name: "Wide: Sidebar placement",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "16px",
        width: "256px",
        background: "var(--color-bg-secondary, #f5f5f5)",
        borderRadius: "8px",
      }}
    >
      <Button variant="primary" width="fill" label="Publish" />
      <Button variant="secondary" width="fill" label="Save draft" />
      <Button variant="ghost" width="fill" label="View history" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Sidebar placement: use `width=\"fill\"` so stacked buttons share the same 256px column. Apply one `primary` action, one `secondary` action, and `ghost` for low-emphasis tertiary actions. Spacing between buttons is 8px (half the 16px base unit).",
      },
    },
  },
};

// LargeVariants — row of primary/secondary/ghost/destructive at size="large",
// plus two IconButtons at size="large". Icons chosen from valid_icon_names.
export const LargeVariants = {
  name: "Large: Variant row",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
      <Button variant="primary" size="large" label="Primary" />
      <Button variant="secondary" size="large" label="Secondary" />
      <Button variant="ghost" size="large" label="Ghost" />
      <Button variant="destructive" size="large" label="Destructive" />
      <IconButton size="large" icon="plus" label="Add" />
      <IconButton size="large" icon="close" label="Close" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Large buttons (32px) are appropriate in toolbar contexts and standalone CTA placement where touch targets need to be larger. Avoid mixing large and medium/small buttons in the same action group.",
      },
    },
  },
};

// LargeMultiOptionBoolModifier — SplitButton and ToggleButton both at size="large".
// Static render; no interaction test needed for a visual reference story.
export const LargeMultiOptionBoolModifier = {
  name: "Large: Multi-option & Bool Modifier",
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <SplitButton
        size="large"
        label="Multi-option"
        icon="chevronDown"
        onClick={fn()}
        onMenuClick={fn()}
      />
      <ToggleButton size="large" icon="check" label="Bool Modifier" pressed={false} onClick={fn()} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A `SplitButton` with `size=\"large\"` is used when the primary multi-option action needs a 32px touch target (e.g. a prominent toolbar slot). A large `ToggleButton` labelled Bool Modifier illustrates the on/off toggle at the large size — the same blue-icon-on-pale-tint active state applies regardless of size.",
      },
    },
  },
};

// TogglePlayOption — three controls in a row: prev / play toggle / next.
// All three use fn() for onClick so interaction tests can hook them.
export const TogglePlayOption = {
  name: "Toggle: Play option row",
  render: (args) => (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      <IconButton icon="chevronLeft" label="Previous" onClick={args.onPrev} />
      <ToggleButton icon="play" label="Play" pressed={args.pressed} onClick={args.onPlay} />
      <IconButton icon="chevronRight" label="Next" onClick={args.onNext} />
    </div>
  ),
  args: {
    pressed: false,
    onPrev: fn(),
    onPlay: fn(),
    onNext: fn(),
  },
  argTypes: {
    pressed: { control: "boolean", description: "Whether the play toggle is active." },
  },
  parameters: {
    docs: {
      description: {
        story:
          "A common media-control pattern: back (`IconButton`, `chevronLeft`), play/pause (`ToggleButton`, `play`), forward (`IconButton`, `chevronRight`). The `ToggleButton` holds its `pressed` state externally. When `pressed` is true the glyph recolors to selection-blue — the same active rule that applies to all `ToggleButton` instances.",
      },
    },
  },
};

// ToggleDialogExample — two ToggleButton instances with dialog={true},
// one inactive (dialogOpen=false) and one active (dialogOpen=true), side by side.
export const ToggleDialogExample = {
  name: "Toggle: Dialog opener",
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "center" }}>
        <ToggleButton
          icon="styles"
          label="Design panel"
          pressed={false}
          dialog={true}
          dialogOpen={false}
          onClick={fn()}
        />
        <span style={{ fontSize: "11px", color: "var(--color-text-secondary, #666)" }}>
          Closed
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "center" }}>
        <ToggleButton
          icon="styles"
          label="Design panel"
          pressed={true}
          dialog={true}
          dialogOpen={true}
          onClick={fn()}
        />
        <span style={{ fontSize: "11px", color: "var(--color-text-secondary, #666)" }}>
          Open (active)
        </span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A dialog-opener `ToggleButton` (`dialog={true}`) shows a corner dot to signal that it opens a panel rather than toggling a boolean setting. It is `pressed` (active, blue glyph + pale-blue fill) only while its dialog is open (`dialogOpen={true}`). When the dialog is closed the button returns to its default visual state.",
      },
    },
  },
};
