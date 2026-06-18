import { DropdownFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Base Components/Dropdown",
  parameters: {
    docs: {
      description: {
        component:
          "Dropdown is a closed select trigger. It shows the current value and a chevron, and opens a menu when activated. Use it to pick one value from a list too long for a SegmentedControl or a row of radios, and pair it with a Menu for the open list. It is styled as an input, not a button: a white surface with a 1px border that stays white on interaction rather than filling.",
      },
    },
  },
};

export const Playground = DropdownFamily;
