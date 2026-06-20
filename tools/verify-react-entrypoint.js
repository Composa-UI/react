import * as reactPackage from "../src/react/index.js";
import componentApi from "../design/component-api.json" with { type: "json" };
import fs from "node:fs";
import { createComposaComponents } from "../src/react/factory.js";

const expectedFamilies = Object.keys(componentApi.componentFamilies);
const expectedSupportComponents = Object.keys(componentApi.supportComponents || {});
const failures = [];
const declarationPath = new URL("../src/react/index.d.ts", import.meta.url);
const factoryDeclarationPath = new URL("../src/react/factory.d.ts", import.meta.url);
const storyControlsPath = new URL("../src/react/stories/composa-component-stories.js", import.meta.url);
const dialogStoriesPath = new URL("../src/react/stories/dialog.stories.js", import.meta.url);
const menuStoriesPath = new URL("../src/react/stories/menu.stories.js", import.meta.url);
const labelStoriesPath = new URL("../src/react/stories/label.stories.js", import.meta.url);
const packagePath = new URL("../package.json", import.meta.url);
const declarations = fs.existsSync(declarationPath) ? fs.readFileSync(declarationPath, "utf8") : "";
const factoryDeclarations = fs.existsSync(factoryDeclarationPath) ? fs.readFileSync(factoryDeclarationPath, "utf8") : "";
const storyControls = fs.existsSync(storyControlsPath) ? fs.readFileSync(storyControlsPath, "utf8") : "";
const dialogStories = fs.existsSync(dialogStoriesPath) ? fs.readFileSync(dialogStoriesPath, "utf8") : "";
const menuStories = fs.existsSync(menuStoriesPath) ? fs.readFileSync(menuStoriesPath, "utf8") : "";
const labelStories = fs.existsSync(labelStoriesPath) ? fs.readFileSync(labelStoriesPath, "utf8") : "";
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const fakeReact = {
  createElement(type, props, ...children) {
    return { type, props: props || {}, children };
  },
};
const reactFactory = createComposaComponents(fakeReact);

for (const family of expectedFamilies) {
  if (typeof reactPackage[family] !== "function") {
    failures.push(`Missing React export: ${family}`);
  }
}

for (const supportComponent of expectedSupportComponents) {
  if (typeof reactPackage[supportComponent] !== "function") {
    failures.push(`Missing React support component export: ${supportComponent}`);
  }
  if (typeof reactFactory[supportComponent] !== "function") {
    failures.push(`Missing React factory support component export: ${supportComponent}`);
  }
}

if (!dialogStories) {
  failures.push("Missing Dialog story source: src/react/stories/dialog.stories.js");
}

if (!menuStories) {
  failures.push("Missing Menu story source: src/react/stories/menu.stories.js");
}

if (!labelStories) {
  failures.push("Missing Label story source: src/react/stories/label.stories.js");
}

// The public entry is license-clean: it exports the factory but NOT the
// UI3-derived ComposaIcon/iconAssets (those live in the unpublished
// story-runtime.js). Only createComposaComponents is a required support export.
for (const extra of ["createComposaComponents"]) {
  if (typeof reactPackage[extra] !== "function") {
    failures.push(`Missing React support export: ${extra}`);
  }
}

if (!declarations) {
  failures.push("Missing React type declarations: src/react/index.d.ts");
}

if (!factoryDeclarations) {
  failures.push("Missing React factory type declarations: src/react/factory.d.ts");
}

if (!storyControls) {
  failures.push("Missing React Storybook controls source: src/react/stories/composa-component-stories.js");
}

for (const family of expectedFamilies) {
  if (declarations && !declarations.includes(`function ${family}`)) {
    failures.push(`Missing React declaration: ${family}`);
  }
}

for (const supportComponent of expectedSupportComponents) {
  if (declarations && !declarations.includes(`function ${supportComponent}`)) {
    failures.push(`Missing React support component declaration: ${supportComponent}`);
  }
}

if (packageJson.types !== "./src/react/index.d.ts") {
  failures.push("package.json must publish src/react/index.d.ts as the package types entry");
}

if (packageJson.exports?.["."]?.types !== "./src/react/index.d.ts") {
  failures.push("package.json must publish root (.) types");
}

if (packageJson.exports?.["./factory"]?.types !== "./src/react/factory.d.ts") {
  failures.push("package.json must publish ./factory types");
}

const requiredStoryControls = {
  Button: ["variant", "size", "state", "disabled", "iconLead", "label", "hotkey"],
  IconButton: ["icon", "state", "variant", "disabled", "pressed"],
  InputField: ["variant", "size", "state", "dropdown", "iconLead", "type", "varIcon", "disabled", "varPill", "variable", "dropdownState"],
  Dropdown: ["size", "state", "disabled", "stroke", "iconLead"],
  Switch: ["checked", "size", "state", "disabled"],
  Radio: ["checked", "state", "disabled", "label"],
  Checkbox: ["type", "state", "disabled", "muted", "ghost", "label", "description"],
  Tooltip: ["label", "placement", "tone"],
  Dialog: ["title", "description", "size", "tone", "primaryLabel", "secondaryLabel"],
  SegmentedControl: ["variant", "state", "disabled", "count"],
  Tabs: ["variant", "size", "state", "count"],
  MenuRow: ["type", "label", "state", "lead", "trail", "submenu", "selected", "checkVariant", "toggleState", "hasIcon", "expanded", "alignment"],
  CanvasSelectionOverlay: ["type", "direction", "width", "height", "showDimensions"],
};

for (const [family, props] of Object.entries(requiredStoryControls)) {
  for (const prop of props) {
    if (storyControls && !storyControls.includes(`${prop}: { control`)) {
      failures.push(`Storybook controls for ${family} must expose ${prop}`);
    }
  }
}

if (dialogStories && !dialogStories.includes("export const Row = DialogRowFamily;")) {
  failures.push("Dialog stories must expose DialogRow under Dialog/Row");
}

if (dialogStories && !dialogStories.includes("export const Header = DialogHeaderFamily;")) {
  failures.push("Dialog stories must expose DialogHeaderCell under Dialog/Header");
}

if (dialogStories && !dialogStories.includes("export const Footer = DialogFooterFamily;")) {
  failures.push("Dialog stories must expose DialogFooter under Dialog/Footer");
}

if (menuStories && !menuStories.includes("export const Heading = MenuHeadingFamily;")) {
  failures.push("Menu stories must expose MenuHeadingCell under Menu/Heading");
}

if (labelStories && !labelStories.includes('title: "Composa UI/Components/Base/Label"')) {
  failures.push("Label stories must register under Composa UI/Components/Base/Label");
}

if (failures.length) {
  console.error("React entrypoint verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      reactPackageExports: expectedFamilies,
      reactSupportComponentExports: expectedSupportComponents,
      reactFactorySupportComponentExports: expectedSupportComponents,
      supportExports: ["createComposaComponents"],
      types: "./src/react/index.d.ts",
    },
    null,
    2
  )
);
