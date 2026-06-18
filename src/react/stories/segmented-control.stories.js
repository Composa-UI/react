import { SegmentedControlFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Base Components/SegmentedControl",
  parameters: {
    docs: {
      description: {
        component:
          "SegmentedControl is a single-select control: a row of mutually exclusive segments on a shared track, with one selected at a time. Use it to switch between a small set of views or modes inside one surface, ideally 2 to 6 options that fit on one row. The selected segment is a white raised pill on a gray track. Use Tabs instead for page-level content regions, or Dropdown when there are too many options to fit on one row.",
      },
    },
  },
};

export const Playground = SegmentedControlFamily;
