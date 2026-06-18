import { ColorInputFamily, ComboInputFamily, InputFieldFamily, NumericInputFamily, NumericInputMultiFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Base Components/InputField",
  parameters: {
    docs: {
      description: {
        component:
          "InputField is the base single-line text-entry control in Composa UI. Use it to collect typed text, a number, a color, or a value paired with a dropdown. The `variant` selects the shell shape: plain Text, Numeric, NumericMulti, Color, or Combo, all sharing one height, radius, and type scale. Choose the variant by data type, and give every input an accessible name through `label`, `placeholder`, or `aria-label`.",
      },
    },
  },
};

export const TextInput = InputFieldFamily;
export const ColorInput = ColorInputFamily;
export const NumericInput = NumericInputFamily;
export const NumericInputMulti = NumericInputMultiFamily;
export const ComboInput = ComboInputFamily;
