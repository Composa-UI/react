import { RadioFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Base Components/Radio",
  parameters: {
    docs: {
      description: {
        component:
          "Radio picks one option from a mutually exclusive set. Group radios so selecting one clears the rest; the factory drives a single control, so the parent owns the selected value. Use the `input` variant for standard radio lists and the `button` variant when the choice reads as a selectable pill or mode switch. Reach for Checkbox when more than one option can be selected.",
      },
    },
  },
};

export const Playground = RadioFamily;
