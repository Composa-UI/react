export const buttonVariants = ["primary", "secondary", "ghost", "link", "link-danger", "destructive", "secondary-destruct", "inverse", "success"];
export const buttonSizes = ["small", "medium", "large"];
export const buttonWidths = ["auto", "fill"];
export const buttonStates = ["rest", "hover", "active", "focused"];
export const iconLeadOptions = ["false", "left-aligned", "center-aligned"];

export const figmaButtonVariantGroups = [
  ["medium", "destructive", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["medium", "destructive", "left-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["medium", "ghost", "false", ["active/false", "rest/false", "rest/true", "focused/false", "hover/false"]],
  ["medium", "ghost", "left-aligned", ["active/false", "rest/false", "rest/true", "focused/false", "hover/false"]],
  ["medium", "inverse", "false", ["rest/false", "rest/true", "focused/false"]],
  ["medium", "inverse", "left-aligned", ["rest/false", "rest/true", "focused/false"]],
  ["medium", "link-danger", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["medium", "link-danger", "left-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["medium", "link", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["medium", "link", "left-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["medium", "primary", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["medium", "primary", "left-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["medium", "secondary-destruct", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["medium", "secondary", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["medium", "secondary", "left-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["medium", "success", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["medium", "success", "left-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["large", "destructive", "center-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["large", "destructive", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["large", "ghost", "center-aligned", ["active/false", "rest/false", "rest/true", "focused/false", "hover/false"]],
  ["large", "ghost", "false", ["active/false", "rest/false", "rest/true", "focused/false", "hover/false"]],
  ["large", "inverse", "center-aligned", ["rest/false", "rest/true", "focused/false"]],
  ["large", "inverse", "false", ["rest/false", "rest/true", "focused/false"]],
  ["large", "primary", "center-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["large", "primary", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["large", "secondary-destruct", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["large", "secondary", "center-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["large", "secondary", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["large", "success", "center-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["large", "success", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["fill", "ghost", "center-aligned", ["active/false", "rest/false", "rest/true", "focused/false", "hover/false"]],
  ["fill", "ghost", "false", ["active/false", "rest/false", "rest/true", "focused/false", "hover/false"]],
  ["fill", "ghost", "left-aligned", ["active/false", "rest/false", "rest/true", "focused/false", "hover/false"]],
  ["fill", "primary", "center-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["fill", "primary", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["fill", "primary", "left-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["fill", "secondary", "center-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["fill", "secondary", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["fill", "secondary", "left-aligned", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["small", "primary", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["small", "secondary", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["small", "ghost", "false", ["active/false", "rest/false", "rest/true", "focused/false", "hover/false"]],
  ["small", "link", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["small", "link-danger", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
  ["small", "destructive", "false", ["active/false", "rest/false", "rest/true", "focused/false"]],
];

export const figmaButtonVariantSpecs = figmaButtonVariantGroups.flatMap(([size, variant, iconLead, statePairs]) =>
  statePairs.map((statePair) => {
    const [state, disabled] = statePair.split("/");
    // The "fill" rows in figmaButtonVariantGroups encode the width axis in the
    // size column; map them onto width:fill + size:medium. Everything else is
    // a default-width (auto) button at its own height.
    const width = size === "fill" ? "fill" : "auto";
    const realSize = size === "fill" ? "medium" : size;
    return { size: realSize, width, variant, state, disabled: disabled === "true", iconLead };
  })
);

export const iconButtonStates = ["rest", "hover", "active", "focused"];
export const iconButtonContexts = ["default", "on-selected"];

export const figmaIconButtonSpecs = [
  { component: "IconButton", variant: "standard", state: "rest", disabled: false },
  { component: "IconButton", variant: "standard", state: "hover", disabled: false },
  { component: "IconButton", variant: "standard", state: "active", disabled: false },
  { component: "IconButton", variant: "standard", state: "focused", disabled: false },
  { component: "IconButton", variant: "standard", state: "rest", disabled: true },
  { component: "IconButton", variant: "secondary", state: "rest", disabled: false },
  { component: "IconButton", variant: "secondary", state: "active", disabled: false },
  { component: "IconButton", variant: "secondary", state: "focused", disabled: false },
  { component: "IconButton", variant: "secondary", state: "rest", disabled: true },
];

const iconToggleBaseSpecs = ["standard", "highlighted"].flatMap((variant) =>
  [false, true].flatMap((on) => [
    { variant, state: "rest", disabled: false, on },
    { variant, state: "hover", disabled: false, on },
    { variant, state: "active", disabled: false, on },
    { variant, state: "focused", disabled: false, on },
    { variant, state: "rest", disabled: true, on },
  ])
);

export const figmaIconToggleSpecs = iconToggleBaseSpecs.map((spec) => ({ ...spec, component: "ToggleButton" }));

export const figmaDialogToggleSpecs = [
  ...iconToggleBaseSpecs.slice(0, 10).map((spec) => ({ ...spec, variant: "standard", component: "DialogToggleButton" })),
  { variant: "secondary", state: "rest", disabled: false, on: false, component: "DialogToggleButton" },
  { variant: "secondary", state: "active", disabled: true, on: false, component: "DialogToggleButton" },
  { variant: "secondary", state: "focused", disabled: false, on: false, component: "DialogToggleButton" },
  { variant: "secondary", state: "rest", disabled: true, on: false, component: "DialogToggleButton" },
  { variant: "secondary", state: "rest", disabled: false, on: true, component: "DialogToggleButton" },
  { variant: "secondary", state: "hover", disabled: false, on: true, component: "DialogToggleButton" },
  { variant: "secondary", state: "active", disabled: false, on: true, component: "DialogToggleButton" },
  { variant: "secondary", state: "focused", disabled: false, on: true, component: "DialogToggleButton" },
  { variant: "secondary", state: "rest", disabled: true, on: true, component: "DialogToggleButton" },
];

export const figmaIconSplitSpecs = ["small", "large"].flatMap((size) =>
  ["rest", "hover", "primary-active", "secondary-active", "primary-focus", "secondary-focus", "disabled"].map((state) => ({
    component: "SplitButton",
    size,
    state,
    disabled: state === "disabled",
  }))
);

export const menuItemStates = ["rest", "hover", "active", "selected", "disabled"];
export const menuRowTypes = ["simple", "complex", "checkmark", "toggle", "toolbar", "heading", "divider", "expand", "footer"];
export const menuRowStates = ["rest", "hover", "disabled"];
export const menuComplexLeadOptions = ["false", "avatar", "icon"];
export const menuComplexTrailOptions = ["false", "shortcut", "badge", "checkbox", "mixed"];
export const menuMultiSelectVariants = ["standard", "label-only", "avatars", "mixed-icons"];
export const menuExampleTypes = ["in-product", "slides-toolbar", "property-dropdown", "context-menu"];
export const figmaMenuSimpleSpecs = [
  { state: "rest", submenu: false },
  { state: "disabled", submenu: false },
  { state: "hover", submenu: false },
  { state: "rest", submenu: true },
  { state: "hover", submenu: true },
];
export const figmaMenuComplexSpecs = menuComplexTrailOptions.flatMap((trail) =>
  menuComplexLeadOptions.flatMap((lead) =>
    ["rest", "hover"].map((state) => ({
      state,
      trail,
      lead,
    }))
  )
);
export const figmaMenuCheckmarkSpecs = [
  { checkVariant: "check", state: "rest", submenu: false },
  { checkVariant: "check", state: "disabled", submenu: false },
  { checkVariant: "check", state: "hover", submenu: false },
  { checkVariant: "check", state: "rest", submenu: true },
  { checkVariant: "check", state: "hover", submenu: true },
  { checkVariant: "dot", state: "rest", submenu: true },
  { checkVariant: "dot", state: "hover", submenu: true },
];
export const figmaMenuToggleSpecs = [
  { toggleState: "on", hasIcon: false },
  { toggleState: "off", hasIcon: false },
  { toggleState: "on", hasIcon: true },
  { toggleState: "off", hasIcon: true },
];
export const figmaMenuToolbarSpecs = ["rest", "disabled", "hover"].map((state) => ({ state }));
export const figmaMenuHeadingSpecs = ["default", "toggle"].map((alignment) => ({ alignment }));
export const figmaMenuExpandSpecs = ["rest", "hover"].flatMap((state) =>
  [false, true].map((expanded) => ({
    state,
    expanded,
  }))
);
export const figmaMenuFooterSpecs = [{ variant: "standard" }];
export const figmaMenuMultiSelectSpecs = ["standard", "label-only", "avatars", "mixed-icons"].map((variant) => ({ variant }));
export const figmaMenuResizingSpecs = ["width", "height"].map((dimension) => ({ dimension }));
export const figmaMenuDividerSpecs = [{ type: "divider" }];

export const textInputVariants = ["single-line", "multi-line", "quick-action"];
export const textInputSizes = ["medium", "large"];
export const textInputStates = ["rest", "focus", "active", "empty", "disabled", "disabled-secondary", "disabled-tertiary", "variable", "active-empty", "active-filled"];
export const numericInputStates = ["rest", "hover", "focused", "empty"];
export const colorInputTypes = ["fill", "opacity", "image", "gradient", "variable", "instance"];
export const colorInputShapes = ["circle", "square"];
export const comboInputStates = ["rest", "hover", "selected-input", "selected-chevron"];
export const chitInputStates = ["rest", "focused"];
export const figmaTextInputSpecs = [
  { variant: "single-line", size: "medium", state: "rest", iconLead: false, dropdown: false },
  { variant: "single-line", size: "medium", state: "focus", iconLead: false, dropdown: false },
  { variant: "single-line", size: "medium", state: "active", iconLead: false, dropdown: false },
  { variant: "single-line", size: "medium", state: "empty", iconLead: false, dropdown: false },
  { variant: "single-line", size: "medium", state: "disabled", iconLead: false, dropdown: false },
  { variant: "single-line", size: "medium", state: "rest", iconLead: true, dropdown: false },
  { variant: "single-line", size: "medium", state: "focus", iconLead: true, dropdown: false },
  { variant: "single-line", size: "medium", state: "active", iconLead: true, dropdown: false },
  { variant: "single-line", size: "medium", state: "empty", iconLead: true, dropdown: false },
  { variant: "single-line", size: "medium", state: "disabled", iconLead: true, dropdown: false },
  { variant: "single-line", size: "medium", state: "variable", iconLead: false, dropdown: false, variable: true },
  { variant: "single-line", size: "large", state: "rest", iconLead: false, dropdown: false },
  { variant: "single-line", size: "large", state: "focus", iconLead: false, dropdown: false },
  { variant: "single-line", size: "large", state: "active", iconLead: false, dropdown: false },
  { variant: "single-line", size: "large", state: "empty", iconLead: false, dropdown: false },
  { variant: "single-line", size: "large", state: "disabled", iconLead: false, dropdown: false },
  { variant: "single-line", size: "large", state: "rest", iconLead: true, dropdown: false },
  { variant: "single-line", size: "large", state: "focus", iconLead: true, dropdown: false },
  { variant: "single-line", size: "large", state: "active", iconLead: true, dropdown: false },
  { variant: "single-line", size: "large", state: "empty", iconLead: true, dropdown: false },
  { variant: "single-line", size: "large", state: "disabled", iconLead: true, dropdown: false },
  { variant: "multi-line", size: "medium", state: "rest", iconLead: false, dropdown: false },
  { variant: "multi-line", size: "medium", state: "focus", iconLead: false, dropdown: false },
  { variant: "multi-line", size: "medium", state: "disabled", iconLead: false, dropdown: false },
  { variant: "single-line", size: "large", state: "rest", iconLead: false, dropdown: true },
  { variant: "single-line", size: "large", state: "focus", iconLead: false, dropdown: true },
  { variant: "single-line", size: "large", state: "active-empty", iconLead: false, dropdown: true },
  { variant: "single-line", size: "large", state: "active-filled", iconLead: false, dropdown: true },
  { variant: "single-line", size: "large", state: "empty", iconLead: false, dropdown: true },
  { variant: "single-line", size: "large", state: "disabled", iconLead: false, dropdown: true },
  { variant: "quick-action", size: "large", state: "rest", iconLead: true, dropdown: false },
  { variant: "quick-action", size: "large", state: "focus", iconLead: true, dropdown: false },
  { variant: "quick-action", size: "large", state: "active", iconLead: true, dropdown: false },
  { variant: "quick-action", size: "large", state: "empty", iconLead: true, dropdown: false },
  { variant: "quick-action", size: "large", state: "disabled", iconLead: true, dropdown: false },
  { variant: "single-line", size: "medium", state: "rest", iconLead: false, dropdown: false, closeButton: true },
  { variant: "single-line", size: "large", state: "rest", iconLead: false, dropdown: false, closeButton: true },
  { variant: "single-line", size: "medium", state: "disabled-secondary", iconLead: false, dropdown: false, disabled: true },
  { variant: "single-line", size: "medium", state: "disabled-tertiary", iconLead: false, dropdown: false, disabled: true },
];
export const figmaNumericInputSpecs = [
  { state: "rest", varIcon: false, disabled: false, varPill: false, dropdown: false },
  { state: "rest", varIcon: false, disabled: false, varPill: false, dropdown: true },
  { state: "rest", varIcon: false, disabled: false, varPill: true, dropdown: false },
  { state: "hover", varIcon: false, disabled: false, varPill: false, dropdown: false },
  { state: "hover", varIcon: true, disabled: false, varPill: false, dropdown: false },
  { state: "hover", varIcon: false, disabled: false, varPill: false, dropdown: true },
  { state: "hover", varIcon: false, disabled: false, varPill: true, dropdown: false },
  { state: "focused", varIcon: false, disabled: false, varPill: false, dropdown: false },
  { state: "focused", varIcon: true, disabled: false, varPill: false, dropdown: false },
  { state: "focused", varIcon: false, disabled: false, varPill: false, dropdown: true },
  { state: "focused", varIcon: false, disabled: false, varPill: true, dropdown: false },
  { state: "empty", varIcon: false, disabled: false, varPill: false, dropdown: false },
  { state: "rest", varIcon: false, disabled: true, varPill: false, dropdown: false },
];
export const figmaNumericInputMultiSpecs = [
  { state: "rest", variant: "standard", disabled: false, partialDisable: false },
  { state: "focused", variant: "standard", disabled: false, partialDisable: false },
  { state: "empty", variant: "standard", disabled: false, partialDisable: false },
  { state: "rest", variant: "standard", disabled: true, partialDisable: false },
  { state: "rest", variant: "partial-disable", disabled: true, partialDisable: true },
];
export const figmaChipVariableStates = ["rest", "hover", "on-selected", "selected", "value-not-rendered", "soft-deleted", "disabled-secondary", "disabled-tertiary"];
export const figmaChit24Specs = [
  { variant: "square", type: "fill", size: 24 },
  { variant: "square", type: "opacity", size: 24 },
  { variant: "square", type: "image", size: 24 },
  { variant: "square", type: "gradient", size: 24 },
  { variant: "circle", type: "fill", size: 24 },
  { variant: "square", type: "instance", size: 24 },
];
export const figmaChit48Specs = [
  { variant: "square", type: "opacity", size: 48 },
  { variant: "square", type: "image", size: 48 },
  { variant: "square", type: "gradient", size: 48 },
  { variant: "square", type: "fill", size: 48 },
  { variant: "circle", type: "fill", size: 48 },
];
export const figmaComboInputDropdownStates = ["rest", "hover", "active"];

export const switchSizes = ["medium", "compact"];
export const switchStates = ["rest", "hover", "focused", "disabled"];
export const switchTypes = ["off", "on", "mixed"];
export const figmaSwitchSpecs = switchSizes.flatMap((size) =>
  switchTypes.flatMap((type) =>
    switchStates.map((state) => ({
      size,
      type,
      checked: type === "on",
      mixed: type === "mixed",
      state,
      disabled: state === "disabled",
    }))
  )
);

export const selectionControlStates = ["rest", "hover", "focused", "disabled"];
export const radioVariants = ["input", "button"];
export const radioStates = ["rest", "hover", "active", "focused", "disabled"];
export const figmaRadioSpecs = radioVariants.flatMap((variant) =>
  [false, true].flatMap((checked) =>
    radioStates.map((state) => ({
      variant,
      checked,
      state,
      disabled: state === "disabled",
    }))
  )
);
export const figmaCheckboxStates = ["Rest", "Focused"];
export const figmaCheckboxSpecs = ["Unchecked", "Checked", "Mixed"].flatMap((type) =>
  figmaCheckboxStates.flatMap((state) =>
    [false, true].map((disabled) => ({
      type,
      state,
      disabled,
      muted: true,
      ghost: true,
      label: true,
      description: false,
    }))
  )
);

export const tooltipPlacements = ["top", "right", "bottom", "left", "top-left", "top-right", "bottom-left", "bottom-right"];
export const tooltipTones = ["standard", "inverse"];
export const figmaTooltipSpecs = tooltipPlacements.flatMap((placement) => tooltipTones.map((tone) => ({ placement, tone })));

export const dialogSizes = ["320", "480"];
export const dialogTones = ["default", "destructive"];
export const dialogTemplates = {
  "320": ["basic", "advanced"],
  "480": ["embed", "create-project", "create-team", "sharing"],
};
export const figmaDialogSpecs = dialogSizes.flatMap((size) =>
  dialogTemplates[size].map((template) => ({ size, template, tone: template === "create-team" ? "destructive" : "default" }))
);

export const dropdownSizes = ["medium", "large"];
export const dropdownStates = ["rest", "focused", "active"];
export const figmaDropdownSpecs = [
  { size: "medium", state: "rest", disabled: false, stroke: true, iconLead: false },
  { size: "medium", state: "rest", disabled: false, stroke: false, iconLead: false },
  { size: "medium", state: "focused", disabled: false, stroke: true, iconLead: false },
  { size: "medium", state: "active", disabled: false, stroke: true, iconLead: false },
  { size: "medium", state: "rest", disabled: true, stroke: true, iconLead: false },
  { size: "medium", state: "rest", disabled: false, stroke: true, iconLead: true },
  { size: "medium", state: "focused", disabled: false, stroke: true, iconLead: true },
  { size: "medium", state: "active", disabled: false, stroke: true, iconLead: true },
  { size: "medium", state: "rest", disabled: true, stroke: true, iconLead: true },
  { size: "large", state: "rest", disabled: false, stroke: true, iconLead: false },
  { size: "large", state: "focused", disabled: false, stroke: true, iconLead: false },
  { size: "large", state: "active", disabled: false, stroke: true, iconLead: false },
  { size: "large", state: "rest", disabled: true, stroke: true, iconLead: false },
  { size: "large", state: "rest", disabled: false, stroke: true, iconLead: true },
  { size: "large", state: "focused", disabled: false, stroke: true, iconLead: true },
  { size: "large", state: "rest", disabled: true, stroke: true, iconLead: true },
];

export const tabVariants = ["underline", "pill"];
export const tabSizes = ["medium", "compact"];
export const tabStates = ["rest", "focused", "hover"];
export const tabCounts = [1, 2, 3, 4];
export const figmaSegmentedControlSpecs = ["icon", "label"].flatMap((variant) =>
  [2, 3, 4, 5, 6].flatMap((count) =>
    ["rest", "disabled"].map((state) => ({
      variant,
      count,
      state,
      disabled: state === "disabled",
    }))
  )
);
export const figmaTabsSpecs = [2, 3, 4, 1];
export const figmaTabSpecs = [
  { singleTab: false, selected: true, state: "rest" },
  { singleTab: false, selected: true, state: "focused" },
  { singleTab: false, selected: false, state: "rest" },
  { singleTab: false, selected: false, state: "focused" },
  { singleTab: false, selected: false, state: "hover" },
  { singleTab: true, selected: false, state: "rest" },
  { singleTab: true, selected: false, state: "hover" },
];
