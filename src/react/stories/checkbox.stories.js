import { CheckboxFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Components/Base/Checkbox",
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox toggles a single option on or off. Use it for opt-in settings, multi-select lists, and \"select all\" rows. It supports a third `Mixed` (indeterminate) state for a parent row when some but not all of its children are selected. Use a Switch instead when the setting applies immediately, or Radio when the user picks one option from a mutually exclusive set.",
      },
    },
  },
};

export const Playground = CheckboxFamily;
