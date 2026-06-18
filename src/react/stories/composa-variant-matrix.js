import React from "react";
import {
  Button,
  IconButton,
  ToggleButton,
  SplitButton,
  InputField,
  NumericInput,
  NumericInputMulti,
  ChipVariable,
  Chit,
  ColorInput,
  ComboInput,
  ComboInputDropdown,
  ChitInput,
  Dropdown,
  Switch,
  Radio,
  Checkbox,
  Tooltip,
  Dialog,
  MenuRow,
  MenuMultiSelect,
  SegmentedControl,
  Tab,
  Tabs,
} from "../story-runtime.js";
import { storybookVariantMatrix } from "./story-coverage.js";
import {
  colorInputTypes,
  comboInputStates,
  figmaButtonVariantSpecs,
  figmaCheckboxSpecs,
  figmaChipVariableStates,
  figmaChit24Specs,
  figmaChit48Specs,
  figmaComboInputDropdownStates,
  figmaDialogSpecs,
  figmaDialogToggleSpecs,
  figmaDropdownSpecs,
  figmaIconButtonSpecs,
  figmaIconSplitSpecs,
  figmaIconToggleSpecs,
  figmaMenuCheckmarkSpecs,
  figmaMenuComplexSpecs,
  figmaMenuDividerSpecs,
  figmaMenuExpandSpecs,
  figmaMenuFooterSpecs,
  figmaMenuHeadingSpecs,
  figmaMenuMultiSelectSpecs,
  figmaMenuResizingSpecs,
  figmaMenuSimpleSpecs,
  figmaMenuToggleSpecs,
  figmaMenuToolbarSpecs,
  figmaNumericInputMultiSpecs,
  figmaNumericInputSpecs,
  figmaRadioSpecs,
  figmaSegmentedControlSpecs,
  figmaSwitchSpecs,
  figmaTabSpecs,
  figmaTabsSpecs,
  figmaTextInputSpecs,
  figmaTooltipSpecs,
} from "../../design-system/variant-specs.js";

import "../../../design/tokens.css";
import "../../../styles.css";
import "./storybook.css";

const h = React.createElement;

const iconOptions = [
  { icon: "move", label: "Move", selected: true },
  { icon: "text", label: "Text" },
  { icon: "image", label: "Image" },
  { icon: "comment", label: "Comment" },
  { icon: "styles", label: "Styles" },
  { icon: "plus", label: "Add" },
];

const labelOptions = ["Left", "Center", "Right", "Top", "Bottom", "More"].map((label, index) => ({ label, selected: index === 0 }));

function VariantCell({ label, children }) {
  return h("div", { className: "storybook-variant-cell", "data-composa-component": "VariantCell" }, [
    h("small", { key: "label" }, label),
    h("div", { key: "stage", className: "storybook-variant-stage" }, children),
  ]);
}

function VariantSection({ title, meta, children }) {
  return h("section", { className: "storybook-variant-section", "data-composa-component": "VariantMatrix", "data-variant-group": title }, [
    h("header", { key: "header", className: "storybook-variant-header" }, [h("h2", { key: "title" }, title), h("p", { key: "meta" }, meta)]),
    h("div", { key: "grid", className: "storybook-variant-grid" }, children),
  ]);
}

function buttonCells() {
  return figmaButtonVariantSpecs.map((spec) =>
    h(VariantCell, { key: `button-${spec.variant}-${spec.size}-${spec.width}-${spec.state}-${spec.disabled}-${spec.iconLead}`, label: `${spec.variant} / ${spec.size} / ${spec.width} / ${spec.state} / disabled ${spec.disabled} / icon ${spec.iconLead}` },
      h(Button, { label: spec.width === "wide" ? "Wide button" : "Button", variant: spec.variant, size: spec.size, width: spec.width, state: spec.state, disabled: spec.disabled, icon: "plus", iconLead: spec.iconLead })
    )
  );
}

function iconButtonCells() {
  return [
    ...figmaIconButtonSpecs.map((spec) =>
      h(VariantCell, { key: `icon-${spec.variant}-${spec.state}-${spec.disabled}`, label: `icon / ${spec.variant} / ${spec.state} / disabled ${spec.disabled}` },
        h(IconButton, { icon: "styles", label: `${spec.variant} ${spec.state}`, state: spec.state, variant: spec.variant, disabled: spec.disabled })
      )
    ),
    ...figmaIconToggleSpecs.map((spec) =>
      h(VariantCell, { key: `toggle-${spec.variant}-${spec.state}-${spec.disabled}-${spec.on}`, label: `toggle / ${spec.variant} / on ${spec.on} / ${spec.state} / disabled ${spec.disabled}` },
        h(ToggleButton, { icon: "styles", label: "Toggle", pressed: spec.on, state: spec.state, variant: spec.variant, disabled: spec.disabled })
      )
    ),
    ...figmaDialogToggleSpecs.map((spec) =>
      h(VariantCell, { key: `dialog-${spec.variant}-${spec.state}-${spec.disabled}-${spec.on}`, label: `dialog toggle / ${spec.variant} / on ${spec.on} / ${spec.state} / disabled ${spec.disabled}` },
        h(ToggleButton, { icon: "comment", label: "Dialog toggle", dialog: true, pressed: spec.on, state: spec.state, variant: spec.variant, disabled: spec.disabled })
      )
    ),
    ...figmaIconSplitSpecs.map((spec) =>
      h(VariantCell, { key: `split-${spec.size}-${spec.state}`, label: `split / ${spec.size} / ${spec.state}` },
        h(SplitButton, { label: "New slide", icon: "plus", size: spec.size, state: spec.state, disabled: spec.disabled })
      )
    ),
  ];
}

function inputCells() {
  const textInputs = figmaTextInputSpecs.map((spec) =>
    h(VariantCell, { key: `text-${spec.variant}-${spec.size}-${spec.state}-${spec.iconLead}-${spec.dropdown}`, label: `text / ${spec.variant} / ${spec.size} / ${spec.state} / icon ${spec.iconLead} / dropdown ${spec.dropdown}` },
      h(InputField, {
        label: spec.variant === "multi-line" ? "M" : "T",
        value: spec.state.includes("empty") ? "" : "Sample value",
        placeholder: "Placeholder",
        variant: spec.variant,
        size: spec.size,
        state: spec.state,
        disabled: spec.state === "disabled",
        icon: "text",
        iconLead: spec.iconLead,
        dropdown: spec.dropdown,
        variable: spec.variable,
      })
    )
  );
  const numericInputs = figmaNumericInputSpecs.map((spec) =>
    h(VariantCell, { key: `numeric-${spec.state}-${spec.varIcon}-${spec.varPill}-${spec.dropdown}-${spec.disabled}`, label: `numeric / ${spec.state} / var icon ${spec.varIcon} / var pill ${spec.varPill} / dropdown ${spec.dropdown} / disabled ${spec.disabled}` },
      h(NumericInput, { label: "W", value: spec.state === "empty" ? "" : "320", state: spec.state, varIcon: spec.varIcon, varPill: spec.varPill, dropdown: spec.dropdown, disabled: spec.disabled })
    )
  );
  const numericMultiInputs = figmaNumericInputMultiSpecs.map((spec) =>
    h(VariantCell, { key: `numeric-multi-${spec.variant}-${spec.state}-${spec.disabled}`, label: `numeric multi / ${spec.variant} / ${spec.state} / disabled ${spec.disabled}` },
      h(NumericInputMulti, { values: spec.state === "empty" ? ["", "", "", ""] : ["36", "148", "0", "0"], state: spec.state, variant: spec.variant, disabled: spec.disabled, iconLead: "styles", partialDisable: spec.partialDisable })
    )
  );
  const colorInputs = colorInputTypes.flatMap((type) =>
    ["rest", "focus", "disabled"].map((state) =>
      h(VariantCell, { key: `color-${type}-${state}`, label: `color / ${type} / ${state}` },
        h(ColorInput, { type, state, disabled: state === "disabled" })
      )
    )
  );
  const comboInputs = comboInputStates.flatMap((state) =>
    [false, true].flatMap((iconLead) =>
      [false, true].map((variable) =>
        h(VariantCell, { key: `combo-${state}-${iconLead}-${variable}`, label: `combo / ${state} / icon ${iconLead} / var ${variable}` },
          h(ComboInput, { label: "C", value: "Auto", state, iconLead, variable })
        )
      )
    )
  );
  const chipVariables = figmaChipVariableStates.map((state) =>
    h(VariantCell, { key: `chip-variable-${state}`, label: `chip variable / ${state}` },
      h(ChipVariable, { state })
    )
  );
  const chits = [...figmaChit24Specs, ...figmaChit48Specs].map((spec) =>
    h(VariantCell, { key: `chit-${spec.size}-${spec.variant}-${spec.type}`, label: `chit / ${spec.size} / ${spec.variant} / ${spec.type}` },
      h(Chit, spec)
    )
  );
  const chitInputs = ["rest", "focused"].flatMap((state) =>
    [false, true].map((closeButton) =>
      h(VariantCell, { key: `chit-input-${state}-${closeButton}`, label: `chit input / ${state} / close ${closeButton}` },
        h(ChitInput, { label: "Chip", state, closeButton })
      )
    )
  );
  const comboDropdowns = figmaComboInputDropdownStates.map((state) =>
    h(VariantCell, { key: `combo-dropdown-${state}`, label: `combo dropdown / ${state}` },
      h(ComboInputDropdown, { state })
    )
  );

  return [...textInputs, ...numericInputs, ...numericMultiInputs, ...colorInputs, ...comboInputs, ...chipVariables, ...chits, ...chitInputs, ...comboDropdowns];
}

function dropdownSegmentedTabsCells() {
  const dropdowns = figmaDropdownSpecs.map((spec) =>
    h(VariantCell, { key: `dropdown-${spec.size}-${spec.state}-${spec.disabled}-${spec.stroke}-${spec.iconLead}`, label: `dropdown / ${spec.size} / ${spec.state} / disabled ${spec.disabled} / stroke ${spec.stroke} / icon ${spec.iconLead}` },
      h(Dropdown, { label: "Dropdown", value: "Option", icon: "styles", ...spec })
    )
  );
  const segmented = figmaSegmentedControlSpecs.map((spec) =>
    h(VariantCell, { key: `segmented-${spec.variant}-${spec.count}-${spec.state}`, label: `segmented / ${spec.variant} / ${spec.count} / ${spec.state}` },
      h(SegmentedControl, {
        label: `Segmented ${spec.variant} ${spec.count}`,
        variant: spec.variant,
        state: spec.state,
        disabled: spec.disabled,
        options: (spec.variant === "label" ? labelOptions : iconOptions).slice(0, spec.count),
      })
    )
  );
  const tabs = figmaTabsSpecs.map((count) =>
    h(VariantCell, { key: `tabs-${count}`, label: `tabs / count ${count}` },
      h(Tabs, {
        label: `Tabs ${count}`,
        variant: "underline",
        tabs: Array.from({ length: count }, (_, index) => ({
          id: `tabs-${count}-${index}`,
          panelId: `tabs-panel-${count}-${index}`,
          label: `Tab ${index + 1}`,
          selected: index === 0,
        })),
      })
    )
  );
  const tabCells = figmaTabSpecs.map((spec, index) =>
    h(VariantCell, { key: `tab-${index}`, label: `_tab / selected ${spec.selected} / single ${spec.singleTab} / ${spec.state}` },
      h(Tab, { id: `tab-spec-${index}`, panelId: `tab-spec-panel-${index}`, label: spec.singleTab ? "Tab" : spec.selected ? "Tab 1" : "Tab 2", selected: spec.selected, singleTab: spec.singleTab, state: spec.state })
    )
  );
  return [...dropdowns, ...segmented, ...tabs, ...tabCells];
}

function controlsCells() {
  const switches = figmaSwitchSpecs.map((spec) =>
    h(VariantCell, { key: `switch-${spec.size}-${spec.checked}-${spec.state}`, label: `switch / ${spec.size} / checked ${spec.checked} / ${spec.state}` },
      h(Switch, { label: "Switch", ...spec })
    )
  );
  const radios = figmaRadioSpecs.map((spec) =>
    h(VariantCell, { key: `radio-${spec.checked}-${spec.state}`, label: `radio / checked ${spec.checked} / ${spec.state}` },
      h(Radio, { label: spec.checked ? "Selected" : "Option", ...spec })
    )
  );
  const checkboxes = figmaCheckboxSpecs.map((spec) =>
    h(VariantCell, { key: `checkbox-${spec.type}-${spec.state}`, label: `checkbox / ${spec.type} / ${spec.state}` },
      h(Checkbox, { ...spec, labelText: "Show outlines" })
    )
  );
  const tooltips = figmaTooltipSpecs.map((spec) =>
    h(VariantCell, { key: `tooltip-${spec.placement}-${spec.tone}`, label: `tooltip / ${spec.placement} / ${spec.tone}` },
      h(Tooltip, { label: "Wrap in auto layout", ...spec })
    )
  );
  const dialogs = figmaDialogSpecs.map((spec) =>
    h(VariantCell, { key: `dialog-${spec.size}-${spec.tone}`, label: `dialog / ${spec.size} / ${spec.tone}` },
      h(Dialog, { title: spec.tone === "destructive" ? "Delete layer" : "Rename layer", description: "Confirm this editor action.", primaryLabel: spec.tone === "destructive" ? "Delete" : "Save", ...spec })
    )
  );
  return [...switches, ...radios, ...checkboxes, ...tooltips, ...dialogs];
}

function menuCells() {
  return [
    ...figmaMenuSimpleSpecs.map((spec) =>
      h(VariantCell, { key: `menu-simple-${spec.state}-${spec.submenu}`, label: `simple / ${spec.state} / submenu ${spec.submenu}` },
        h(MenuRow, { type: "simple", label: "File", ...spec })
      )
    ),
    ...figmaMenuComplexSpecs.map((spec) =>
      h(VariantCell, { key: `menu-complex-${spec.state}-${spec.lead}-${spec.trail}`, label: `complex / ${spec.state} / lead ${spec.lead} / trail ${spec.trail}` },
        h(MenuRow, { type: "complex", label: "Layer action", ...spec })
      )
    ),
    ...figmaMenuCheckmarkSpecs.map((spec) =>
      h(VariantCell, { key: `menu-check-${spec.checkVariant}-${spec.state}-${spec.submenu}`, label: `checkmark / ${spec.checkVariant} / ${spec.state} / submenu ${spec.submenu}` },
        h(MenuRow, { type: "checkmark", label: "Option", selected: true, ...spec })
      )
    ),
    ...figmaMenuToggleSpecs.map((spec) =>
      h(VariantCell, { key: `menu-toggle-${spec.toggleState}-${spec.hasIcon}`, label: `toggle / ${spec.toggleState} / icon ${spec.hasIcon}` },
        h(MenuRow, { type: "toggle", label: "Snap to grid", ...spec })
      )
    ),
    ...figmaMenuToolbarSpecs.map((spec) =>
      h(VariantCell, { key: `menu-toolbar-${spec.state}`, label: `toolbar / ${spec.state}` },
        h(MenuRow, { type: "toolbar", label: "Toolbar", ...spec })
      )
    ),
    ...figmaMenuHeadingSpecs.map((spec) =>
      h(VariantCell, { key: `menu-heading-${spec.alignment}`, label: `heading / ${spec.alignment}` },
        h(MenuRow, { type: "heading", label: "Section", ...spec })
      )
    ),
    ...figmaMenuExpandSpecs.map((spec) =>
      h(VariantCell, { key: `menu-expand-${spec.state}-${spec.expanded}`, label: `expand / ${spec.state} / expanded ${spec.expanded}` },
        h(MenuRow, { type: "expand", label: "More options", ...spec })
      )
    ),
    ...figmaMenuFooterSpecs.map((spec) =>
      h(VariantCell, { key: `menu-footer-${spec.variant}`, label: `footer / ${spec.variant}` },
        h(MenuRow, { type: "footer", label: "Open library" })
      )
    ),
    ...figmaMenuMultiSelectSpecs.map((spec) =>
      h(VariantCell, { key: `menu-multi-${spec.variant}`, label: `multi-select / ${spec.variant}` },
        h(MenuMultiSelect, { variant: spec.variant })
      )
    ),
    ...figmaMenuResizingSpecs.map((spec) =>
      h(VariantCell, { key: `menu-resize-${spec.dimension}`, label: `resizing / ${spec.dimension}` },
        h(MenuRow, { type: "complex", label: spec.dimension === "width" ? "Width resize" : "Height resize", lead: "icon", trail: "shortcut" })
      )
    ),
    ...figmaMenuDividerSpecs.map((spec) =>
      h(VariantCell, { key: `menu-${spec.type}`, label: `row / ${spec.type}` },
        h(MenuRow, { type: spec.type })
      )
    ),
  ];
}

const groups = [
  {
    key: "buttons",
    title: "Button Variants",
    meta: "Button component set: 175 Figma variants from node 2012:48557",
    cells: buttonCells,
  },
  {
    key: "iconButtons",
    title: "Icon Button Variants",
    meta: "Button icon, icon toggle, icon dialog toggle, icon split: 62 Figma variants",
    cells: iconButtonCells,
  },
  {
    key: "inputs",
    title: "Input Variants",
    meta: "Input component sets: 110 Figma variants from node 2028:75376",
    cells: inputCells,
  },
  {
    key: "dropdownSegmentedTabs",
    title: "Dropdown, Segmented, Tabs",
    meta: "Dropdown, Segmented control, Tabs, and _Tab exact published variants: 47 cells",
    cells: dropdownSegmentedTabsCells,
  },
  {
    key: "controls",
    title: "Controls, Tooltips, Dialogs",
    meta: "Switch, Radio, Checkbox, Tooltip, and Dialog locally inventoried variants: 50 cells",
    cells: controlsCells,
  },
  {
    key: "menu",
    title: "Menu Variants",
    meta: "Menus page: 62 published component-set variants plus standalone divider",
    cells: menuCells,
  },
];

export default {
  title: "Composa UI/Variant Matrix",
  parameters: {
    layout: "fullscreen",
    expectedVariantCells: storybookVariantMatrix.expectedCells,
  },
};

export const FullMatrix = {
  name: "507 cell matrix",
  render: () =>
    h("main", { className: "storybook-variant-matrix-page", "data-expected-variant-cells": String(storybookVariantMatrix.expectedCells) }, [
      h("header", { key: "intro", className: "storybook-variant-page-header" }, [
        h("h1", { key: "title" }, "Composa UI variant matrix"),
        h("p", { key: "meta" }, `${storybookVariantMatrix.expectedCells} inventoried cells rendered from the same spec arrays as the vanilla harness.`),
      ]),
      ...groups.map((group) => {
        const cells = group.cells();
        return h(VariantSection, { key: group.key, title: group.title, meta: `${group.meta}. Storybook cells: ${cells.length}/${storybookVariantMatrix.groups[group.key]}` }, cells);
      }),
    ]),
};
