import { SwitchFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Components/Base/Switch",
  parameters: {
    docs: {
      description: {
        component:
          "Switch turns a single setting on or off, like a hardware toggle. Flipping it takes effect at once, with no separate confirm step, so reach for Checkbox instead when the option is part of a form that applies on submit. It supports a `mixed` state for when a switch governs several items that are not all on. The `label` is the accessible name rather than visible text, so always set a meaningful one.",
      },
    },
  },
};

export const Playground = SwitchFamily;
