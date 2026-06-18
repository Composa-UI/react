import { MenuRowFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Base Components/MenuRow",
  parameters: {
    docs: {
      description: {
        component:
          "MenuRow is the row primitive inside a Menu surface. It renders a `button` with an optional leading slot, a required label, and an optional trailing slot (shortcut, chevron, checkbox, or toggle). The `type` prop drives which slots render and can swap the whole row for a divider, heading, footer, or toolbar. Use `checkmark` rows for single-choice settings and `toggle` rows for on/off settings.",
      },
    },
  },
};

export const Playground = MenuRowFamily;
