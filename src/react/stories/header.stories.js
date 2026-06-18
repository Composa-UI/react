import { HeaderFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Base Components/ListCell/Header",
  parameters: {
    docs: {
      description: {
        component:
          "Header composes ListCell into a section or panel header. It generates a leading disclosure control, a title in a real heading element, and a trailing actions group. Use it instead of raw ListCell slots so the disclosure and ARIA come for free. `level` is overloaded: it picks both the heading element (`h1`-`h6`) and the row height step, so choose it for outline order, not only height.",
      },
    },
  },
};

export const Playground = HeaderFamily;
