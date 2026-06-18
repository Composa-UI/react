import fs from "node:fs";
import {
  figmaButtonVariantSpecs,
  figmaChit24Specs,
  figmaChit48Specs,
  colorInputTypes,
  colorInputShapes,
  comboInputStates,
  figmaDialogToggleSpecs,
  figmaDropdownSpecs,
  figmaCheckboxSpecs,
  figmaChipVariableStates,
  figmaComboInputDropdownStates,
  figmaDialogSpecs,
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
} from "../src/design-system/variant-specs.js";
import { expectedVariantCellCount, variantCoverageManifest } from "../src/design-system/variant-manifest.js";
import * as reactPackage from "../src/react/index.js";
import { createComposaComponents } from "../src/react/factory.js";
import { storybookFamilyCoverage, storybookSupportCoverage, storybookVariantMatrix } from "../src/react/stories/story-coverage.js";

const componentApi = JSON.parse(fs.readFileSync(new URL("../design/component-api.json", import.meta.url), "utf8"));
const tokenCss = fs.readFileSync(new URL("../design/tokens.css", import.meta.url), "utf8");
const appCss = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const storybookPreview = fs.readFileSync(new URL("../.storybook/preview.js", import.meta.url), "utf8");
const storybookComponentStories = fs.readFileSync(new URL("../src/react/stories/composa-component-stories.js", import.meta.url), "utf8");
const dialogStories = fs.readFileSync(new URL("../src/react/stories/dialog.stories.js", import.meta.url), "utf8");
const headerStories = fs.readFileSync(new URL("../src/react/stories/header.stories.js", import.meta.url), "utf8");
const listCellStories = fs.readFileSync(new URL("../src/react/stories/list-cell.stories.js", import.meta.url), "utf8");
const verticalCellStories = fs.readFileSync(new URL("../src/react/stories/vertical-cell.stories.js", import.meta.url), "utf8");
const menuStories = fs.readFileSync(new URL("../src/react/stories/menu.stories.js", import.meta.url), "utf8");
const labelStories = fs.readFileSync(new URL("../src/react/stories/label.stories.js", import.meta.url), "utf8");

const colorInputCount = colorInputTypes.length * 3 + colorInputShapes.length;
const comboInputCount = comboInputStates.length * 2 * 2;
const chipVariableCount = figmaChipVariableStates.length;
const chitInputCount = 2 * 2;
const comboDropdownCount = figmaComboInputDropdownStates.length;

const counts = {
  Button: figmaButtonVariantSpecs.length,
  IconButton: figmaIconButtonSpecs.length + figmaIconToggleSpecs.length + figmaDialogToggleSpecs.length + figmaIconSplitSpecs.length,
  InputField:
    figmaTextInputSpecs.length +
    figmaNumericInputSpecs.length +
    figmaNumericInputMultiSpecs.length +
    colorInputCount +
    comboInputCount +
    chipVariableCount +
    figmaChit24Specs.length +
    figmaChit48Specs.length +
    chitInputCount +
    comboDropdownCount,
  Dropdown: figmaDropdownSpecs.length,
  Switch: figmaSwitchSpecs.length,
  Radio: figmaRadioSpecs.length,
  Checkbox: figmaCheckboxSpecs.length,
  Tooltip: figmaTooltipSpecs.length,
  Dialog: figmaDialogSpecs.length,
  SegmentedControl: figmaSegmentedControlSpecs.length,
  Tabs: figmaTabsSpecs.length + figmaTabSpecs.length,
  MenuRow:
    figmaMenuSimpleSpecs.length +
    figmaMenuComplexSpecs.length +
    figmaMenuCheckmarkSpecs.length +
    figmaMenuToggleSpecs.length +
    figmaMenuToolbarSpecs.length +
    figmaMenuHeadingSpecs.length +
    figmaMenuExpandSpecs.length +
    figmaMenuFooterSpecs.length +
    figmaMenuMultiSelectSpecs.length +
    figmaMenuResizingSpecs.length +
    figmaMenuDividerSpecs.length,
};

const groupedCounts = {
  buttons: counts.Button,
  iconButtons: counts.IconButton,
  inputs: counts.InputField,
  dropdownSegmentedTabs: counts.Dropdown + counts.SegmentedControl + counts.Tabs,
  controls: counts.Switch + counts.Radio + counts.Checkbox + counts.Tooltip + counts.Dialog,
  menu: counts.MenuRow,
};

const failures = [];

const requireSource = (label, source, needle) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

requireSource("tokens", tokenCss, "--composa-control-size-icon: 24px;");
requireSource("tokens", tokenCss, ":root,\n[data-composa-mode] {");
requireSource("tokens", tokenCss, "--composa-control-size-icon-glyph: 16px;");
requireSource("tokens", tokenCss, "--composa-segmented-icon-width-2: 42px;");
requireSource("tokens", tokenCss, "--composa-segmented-icon-width: 28px;");
requireSource("tokens", tokenCss, "--composa-tab-padding-inline: var(--composa-space-2);");
requireSource("tokens", tokenCss, "--composa-menu-divider-border:");
requireSource("tokens", tokenCss, "--composa-menu-row-gap: 2px;");
requireSource("tokens", tokenCss, "--composa-menu-footer-border:");
requireSource("styles", appCss, ".composa-icon-button {\n  width: var(--composa-control-size-icon);\n  height: var(--composa-control-size-icon);\n  display: grid;\n  place-items: center;");
requireSource("styles", appCss, ".composa-icon-button-glyph {\n  width: var(--composa-control-size-icon-glyph);\n  height: var(--composa-control-size-icon-glyph);\n  display: grid;\n  place-items: center;");
requireSource("styles", appCss, "width: var(--composa-segmented-icon-width-2);");
requireSource("styles", appCss, "width: var(--composa-segmented-icon-width);");
requireSource("styles", appCss, ".composa-tabs {\n  width: max-content;\n  max-width: 100%;");
requireSource("styles", appCss, ".composa-panel-right > .composa-tabs,\n.composa-inspector > .composa-tabs {\n  width: 100%;\n}");
requireSource("styles", appCss, "padding: 0 var(--composa-tab-padding-inline);");
requireSource("styles", appCss, "border-top: 1px solid var(--composa-menu-divider-border);");
requireSource("styles", appCss, "gap: var(--composa-menu-row-gap);");
requireSource("styles", appCss, "border-color: var(--composa-menu-footer-border);");
requireSource("styles", appCss, ".composa-button-primary:hover,\n.composa-button-primary.is-hover {\n  background: var(--composa-color-bg-brand-strong-pressed);\n  color: var(--composa-color-text-on-brand);\n}");
requireSource("storybook", storybookPreview, '"data-composa-mode": mode');
requireSource("storybook", storybookPreview, '{ name: "dark", value: "#2c2c2c" }');
requireSource("storybook", storybookComponentStories, "React.createElement(Menu, {");
requireSource("storybook", dialogStories, "export const Row = DialogRowFamily;");
requireSource("storybook", dialogStories, "export const Structured = StructuredDialogFamily;");
requireSource("storybook", verticalCellStories, 'title: "Composa UI/Base Components/VerticalCell"');
requireSource("storybook", verticalCellStories, "export const Playground = ListCellContentFamily;");
requireSource("storybook", headerStories, 'title: "Composa UI/Base Components/ListCell/Header"');
requireSource("storybook", menuStories, "export const Heading = MenuHeadingFamily;");
requireSource("storybook", labelStories, 'title: "Composa UI/Base Components/Label"');

for (const [family, actual] of Object.entries(counts)) {
  const expected = componentApi.componentFamilies[family]?.variantCount;
  if (expected !== actual) {
    failures.push(`${family}: component-api variantCount ${expected} does not match spec count ${actual}`);
  }
}

for (const [group, actual] of Object.entries(groupedCounts)) {
  const expected = variantCoverageManifest.groups[group]?.expectedCells;
  if (expected !== actual) {
    failures.push(`${group}: manifest expectedCells ${expected} does not match grouped spec count ${actual}`);
  }
}

const expectedTotal = expectedVariantCellCount();
const actualTotal = Object.values(groupedCounts).reduce((total, count) => total + count, 0);
if (expectedTotal !== actualTotal) {
  failures.push(`total: expectedVariantCellCount ${expectedTotal} does not match grouped total ${actualTotal}`);
}

if (componentApi.renderer.current !== "react-app" || componentApi.renderer.reactCompatible !== true) {
  failures.push("renderer: component-api must declare current react-app renderer and reactCompatible true");
}

if (componentApi.artifactTargets.openSourceLibrary.status !== "react-named-exports") {
  failures.push("artifactTargets.openSourceLibrary.status must be react-named-exports");
}

const fakeReact = {
  createElement(type, props, ...children) {
    return { type, props: props || {}, children };
  },
};
const reactComponents = createComposaComponents(fakeReact);
const expectedReactFamilies = Object.keys(componentApi.componentFamilies);
const missingReactFamilies = expectedReactFamilies.filter((family) => typeof reactComponents[family] !== "function");
if (missingReactFamilies.length) {
  failures.push(`react adapter missing component family exports: ${missingReactFamilies.join(", ")}`);
}

const missingReactPackageFamilies = expectedReactFamilies.filter((family) => typeof reactPackage[family] !== "function");
if (missingReactPackageFamilies.length) {
  failures.push(`react package entrypoint missing component family exports: ${missingReactPackageFamilies.join(", ")}`);
}

if (typeof reactPackage.createComposaComponents !== "function") {
  failures.push("react package entrypoint must export createComposaComponents");
}

const missingStoryFamilies = expectedReactFamilies.filter((family) => !storybookFamilyCoverage.includes(family));
if (missingStoryFamilies.length) {
  failures.push(`storybook coverage missing component families: ${missingStoryFamilies.join(", ")}`);
}

const requiredSupportCoverage = {
  ListCell: ["Playground", "Header"],
  VerticalCell: ["Playground"],
  Dialog: ["Playground", "Header", "Footer", "Row", "Structured"],
  Menu: ["Playground", "Heading"],
  Label: ["Playground"],
};

for (const [componentName, expectedStories] of Object.entries(requiredSupportCoverage)) {
  const actualStories = storybookSupportCoverage[componentName] || [];
  for (const storyName of expectedStories) {
    if (!actualStories.includes(storyName)) {
      failures.push(`storybook support coverage for ${componentName} must include ${storyName}`);
    }
  }
}

if (listCellStories.includes("export const DialogRow =")) {
  failures.push("ListCell stories should not expose DialogRow once Dialog owns that semantic review surface");
}

if (storybookVariantMatrix.expectedCells !== actualTotal) {
  failures.push(`storybook variant matrix expectedCells ${storybookVariantMatrix.expectedCells} does not match grouped total ${actualTotal}`);
}

for (const [group, actual] of Object.entries(groupedCounts)) {
  const expected = storybookVariantMatrix.groups[group];
  if (expected !== actual) {
    failures.push(`storybook variant matrix group ${group} expected ${expected} does not match grouped spec count ${actual}`);
  }
}

if (failures.length) {
  console.error("Design-system contract verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      totalVariantCells: actualTotal,
      counts,
      groupedCounts,
      renderer: componentApi.renderer.current,
      openSourceLibrary: componentApi.artifactTargets.openSourceLibrary.status,
      reactExports: expectedReactFamilies,
      reactPackageExports: expectedReactFamilies,
      storybookFamilies: storybookFamilyCoverage,
      storybookSupportCoverage,
      storybookVariantMatrix,
    },
    null,
    2
  )
);
