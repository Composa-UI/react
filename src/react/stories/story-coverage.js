export const storybookFamilyCoverage = [
  "Button",
  "IconButton",
  "InputField",
  "Dropdown",
  "Switch",
  "Radio",
  "Checkbox",
  "Tooltip",
  "Dialog",
  "SegmentedControl",
  "Tabs",
  "MenuRow",
  "CanvasSelectionOverlay",
];

export const storybookSupportCoverage = {
  ListCell: ["Playground", "Header"],
  VerticalCell: ["Playground"],
  TextPair: ["Playground"],
  Tree: ["Playground"],
  Dialog: ["Playground", "Header", "Footer", "Row", "Structured"],
  Menu: ["Playground", "Heading"],
  Label: ["Playground"],
};

export const storybookVariantMatrix = {
  expectedCells: 553,
  groups: {
    buttons: 184,
    iconButtons: 62,
    inputs: 119,
    dropdownSegmentedTabs: 47,
    controls: 78,
    menu: 63,
  },
};
