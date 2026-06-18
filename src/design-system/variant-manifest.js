export const variantCoverageManifest = {
  source: "UI3 Figma's UI Kit (Community)",
  fileKey: "4kilp0ShQiYsoUPJdleqEH",
  groups: {
    buttons: {
      figmaNode: "2012:46721",
      expectedCells: 184,
    },
    iconButtons: {
      figmaNode: "2012:46721",
      expectedCells: 62,
    },
    inputs: {
      figmaNode: "2028:75376",
      expectedCells: 119,
    },
    dropdownSegmentedTabs: {
      figmaNodes: ["2028:36589", "2015:20960", "2015:25519"],
      expectedCells: 47,
    },
    controls: {
      figmaNodes: ["2015:24697", "2015:32842", "2015:20365", "2012:55461", "2327:122027"],
      expectedCells: 78,
    },
    menu: {
      figmaNode: "2028:86486",
      expectedCells: 63,
    },
  },
};

export function expectedVariantCellCount() {
  return Object.values(variantCoverageManifest.groups).reduce((total, group) => total + group.expectedCells, 0);
}
