import { TabsFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Base Components/Tabs",
  parameters: {
    docs: {
      description: {
        component:
          "Tabs switch between sibling content regions in the same view, with one tab selected at a time. Use them for page-level or panel-level content the user moves between, like an inspector's Design / Prototype / Inspect. Tabs sit at the top of the region they control and carry a bottom rule that anchors the row. Use SegmentedControl instead for an inline mode toggle rather than a content switch.",
      },
    },
  },
};

export const Playground = TabsFamily;
