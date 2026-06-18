import React from "react";
import {
  Button,
  IconButton,
  ToggleButton,
  SplitButton,
  InputField,
  NumericInput,
  NumericInputMulti,
  ColorInput,
  ComboInput,
  ComboInputDropdown,
  Dropdown,
  Switch,
  Radio,
  Checkbox,
  Tooltip,
  Dialog,
  DialogHeaderCell,
  DialogBody,
  DialogFooter,
  DialogRow,
  Menu,
  MenuRow,
  ListCell,
  MenuHeadingCell,
  VerticalCell,
  TextPair,
  Label,
  Tree,
  Header,
  SegmentedControl,
  Tabs,
  CanvasSelectionOverlay,
} from "../story-runtime.js";
import { storybookFamilyCoverage } from "./story-coverage.js";

import "../../../design/tokens.css";
import "../../../styles.css";

const iconNames = ["move", "text", "image", "comment", "styles", "chevronDown", "plus", "minus", "eyeSmall"];
const states = ["rest", "hover", "active", "focused", "disabled"];
const menuRowTypes = ["simple", "complex", "checkmark", "toggle", "toolbar", "heading", "divider", "expand", "footer"];
const menuTrailOptions = ["false", "shortcut", "badge", "checkbox", "mixed"];
const menuLeadOptions = ["false", "avatar", "icon"];
const canvasOverlayTypes = [
  "standard",
  "textEdit",
  "component",
  "instance",
  "autoLayout",
  "smartSelectionHorizontal",
  "smartSelectionVertical",
  "smartSelectionGrid",
  "imageCrop",
  "vector",
  "slice",
  "reparenting",
  "cover",
];

function InteractiveDropdown(args) {
  const options = ["Pass through", "Normal", "Multiply", "Screen"];
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(args.value);
  return React.createElement(
    "div",
    { className: "storybook-composa-interactive-stack" },
    React.createElement(Dropdown, {
      ...args,
      value,
      open,
      onOpenChange: setOpen,
    }),
    open
      ? React.createElement(Menu, {
          label: `${args.label || "Dropdown"} options`,
          items: options.map((option) => ({
            type: "checkmark",
            label: option,
            selected: option === value,
            onClick: () => {
              setValue(option);
              setOpen(false);
            },
          })),
        })
      : null
  );
}

function InteractiveSwitch(args) {
  const [checked, setChecked] = React.useState(args.checked);
  return React.createElement(Switch, { ...args, checked: args.mixed ? undefined : checked, onCheckedChange: setChecked, label: "Snap to grid" });
}

function InteractiveRadio(args) {
  const [selected, setSelected] = React.useState(args.label);
  const labels = [args.label || "Text", "Prototype", "Dev mode"];
  return React.createElement(
    "div",
    { className: "storybook-composa-interactive-stack" },
    labels.map((label) =>
      React.createElement(Radio, {
        key: label,
        ...args,
        label,
        checked: selected === label,
        onCheckedChange: () => setSelected(label),
      })
    )
  );
}

function InteractiveCheckbox(args) {
  const [type, setType] = React.useState(args.type);
  React.useEffect(() => setType(args.type), [args.type]);
  return React.createElement(Checkbox, { ...args, type, onCheckedChange: setType });
}

function InteractiveToggleButton(args) {
  const [pressed, setPressed] = React.useState(args.pressed);
  React.useEffect(() => setPressed(args.pressed), [args.pressed]);
  return React.createElement(ToggleButton, {
    ...args,
    pressed,
    onClick: (event) => {
      setPressed((current) => !current);
      args.onClick?.(event);
    },
    label: args.label || (args.dialog ? "Dialog toggle" : "Text"),
  });
}

function InteractiveInputField(args) {
  const [value, setValue] = React.useState(args.value || "");
  React.useEffect(() => setValue(args.value || ""), [args.value]);
  return React.createElement(InputField, {
    ...args,
    value,
    icon: "styles",
    label: args.label ?? null,
    disabled: args.disabled || args.state === "disabled",
    onChange: (event) => setValue(event.currentTarget.value),
  });
}

function InteractiveColorInput(args) {
  const defaultColorValue = args.type === "opacity" ? "FF24BD" : args.type === "gradient" ? "Angular" : args.type === "image" ? "Image" : "F7F5F1";
  const defaultOpacityValue = args.type === "opacity" ? "24" : "100";
  const [value, setValue] = React.useState(args.value || defaultColorValue);
  const [opacityValue, setOpacityValue] = React.useState(args.opacityValue || defaultOpacityValue);
  React.useEffect(() => setValue(args.value || defaultColorValue), [args.value, defaultColorValue]);
  React.useEffect(() => setOpacityValue(args.opacityValue || defaultOpacityValue), [args.opacityValue, defaultOpacityValue]);
  return React.createElement(ColorInput, {
    ...args,
    value,
    opacityValue,
    disabled: args.disabled || args.state === "disabled",
    onChange: (event) => setValue(event.currentTarget.value),
    onOpacityChange: (event) => setOpacityValue(event.currentTarget.value),
  });
}

function InteractiveNumericInput(args) {
  const [value, setValue] = React.useState("320");
  return React.createElement(NumericInput, {
    ...args,
    label: "W",
    value,
    onChange: (event) => setValue(event.currentTarget.value),
    onInput: (event) => setValue(event.currentTarget.value),
  });
}

function InteractiveNumericInputMulti(args) {
  const [values, setValues] = React.useState(["320", "140", "0", "0"]);
  return React.createElement(NumericInputMulti, {
    ...args,
    values,
    partialDisable: args.variant === "partial-disable",
    onValueChange: (index, next) =>
      setValues((current) => current.map((value, i) => (i === index ? next : value))),
  });
}

function InteractiveComboInput(args) {
  const options = ["8", "12", "16", "20", "24", "32"];
  const [value, setValue] = React.useState(args.variable ? "24" : "16");
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => setValue(args.variable ? "24" : "16"), [args.variable]);
  return React.createElement(
    "div",
    { className: "storybook-composa-interactive-stack" },
    React.createElement(ComboInput, {
      label: "Mode",
      state: args.state,
      iconLead: args.iconLead,
      variable: args.variable,
      dropdownState: args.dropdownState,
      value,
      onChange: (event) => setValue(event.currentTarget.value),
      onInput: (event) => setValue(event.currentTarget.value),
      onDropdownClick: () => setOpen((current) => !current),
    }),
    open
      ? React.createElement(Menu, {
          label: "Mode options",
          items: options.map((option) => ({
            type: "checkmark",
            label: option,
            selected: option === value,
            onClick: () => {
              setValue(option);
              setOpen(false);
            },
          })),
        })
      : null
  );
}

function InteractiveSegmentedControl(args) {
  const [value, setValue] = React.useState("0");
  return React.createElement(SegmentedControl, {
    label: "Sidebar view",
    variant: args.variant,
    state: args.state,
    disabled: args.disabled || args.state === "disabled",
    value,
    onValueChange: setValue,
    options: Array.from({ length: args.count }, (_, index) => ({
      id: String(index),
      label: args.variant === "label" ? `Tab ${index + 1}` : ["Design", "Layers", "Assets", "Notes", "Video", "AI"][index],
      icon: ["move", "text", "image", "comment", "styles", "plus"][index],
    })),
  });
}

function InteractiveTabs(args) {
  const [value, setValue] = React.useState("0");
  return React.createElement(Tabs, {
    label: "Inspector mode",
    variant: args.variant,
    size: args.size,
    state: args.state,
    value,
    onValueChange: setValue,
    tabs: Array.from({ length: args.count }, (_, index) => ({
      id: String(index),
      label: ["Design", "Animate", "Comments", "Code"][index],
    })),
  });
}

function StoryRowFrame({ children, width = 380 }) {
  return React.createElement(
    "div",
    {
      style: {
        width: `${width}px`,
        maxWidth: "100%",
      },
    },
    children
  );
}

// Leading chevron rendered as a real SVG glyph, identical to the icon the
// `Header` component generates for `leading="icon"`. The ListCell/VerticalCell
// playgrounds previously passed a raw "⌄" text character, which sits high in
// its line box and looked vertically misaligned next to the SVG-based Header
// story. Using the same SVG glyph keeps the leading icon centered everywhere.
function LeadingChevronIcon() {
  return React.createElement(
    "span",
    { className: "composa-header-leading-icon", "aria-hidden": "true" },
    React.createElement(
      "span",
      { className: "composa-icon", "data-icon-builtin": "true", "aria-hidden": "true" },
      React.createElement(
        "svg",
        { width: "100%", height: "100%", viewBox: "0 -960 960 960", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", {
          d: "M480-370.078q-6 0-10.808-2-4.807-2-9.423-6.615L269.847-568.616q-6.692-6.692-6.885-15.807-.192-9.115 6.885-16.192t16.307-7.077q9.231 0 16.307 7.077L480-423.076l177.539-177.539q6.692-6.692 15.807-6.884 9.115-.193 16.192 6.884t7.077 16.307q0 9.231-7.077 16.308L500.231-378.693q-4.616 4.615-9.423 6.615-4.808 2-10.808 2Z",
        })
      )
    )
  );
}

export default {
  title: "Composa UI/Components",
  parameters: {
    layout: "centered",
    componentFamilies: storybookFamilyCoverage,
  },
};

export const ListCellFamily = {
  name: "ListCell",
  args: {
    hierarchy: "Level 3",
    content: "Text",
    underline: false,
    leading: "icon",
  },
  argTypes: {
    hierarchy: { control: "select", name: "Hierarchy", options: ["Level 1", "Level 2", "Level 3"], table: { defaultValue: { summary: "Level 3" } } },
    // content/leading are node SLOTS (ReactNode), not primitives. The type column
    // reflects that; the text/select controls are demo affordances that compose a
    // node behind the scenes (a text control fills content; a preset picks the
    // leading composition).
    content: { control: "text", name: "Content", type: { required: true }, table: { type: { summary: "ReactNode" }, defaultValue: { summary: "Text" } } },
    underline: { control: "boolean", name: "Underline", table: { defaultValue: { summary: "false" } } },
    leading: { control: "select", name: "Leading", options: ["none", "icon", "icon-button"], table: { type: { summary: "ReactNode" }, defaultValue: { summary: "icon" } } },
    // Public API documented for completeness (not interactive controls here). The
    // Hierarchy select above is a story harness mapping to the numeric `level`.
    leadingContent: { name: "Leading Content", control: false, description: "Alternate leading slot, used when `leading` is omitted.", table: { type: { summary: "ReactNode" } } },
    trailing: { name: "Trailing", control: false, description: "Trailing slot (actions, controls).", table: { type: { summary: "ReactNode" } } },
    align: { name: "Align", control: false, description: "Vertical alignment of the slots.", table: { type: { summary: '"start" | "center" | "end"' }, defaultValue: { summary: "center" } } },
    width: { name: "Width", control: false, description: "fill spans the row; auto hugs content.", table: { type: { summary: '"auto" | "fill"' }, defaultValue: { summary: "fill" } } },
    level: { name: "Level", control: false, description: "Numeric font/spacing hierarchy (1 to 3).", table: { type: { summary: "1 | 2 | 3" }, defaultValue: { summary: "3" } } },
  },
  render: ({ hierarchy, content, leading, underline }) => {
    const levelMap = { "Level 1": 1, "Level 2": 2, "Level 3": 3 };
    const resolvedLevel = levelMap[hierarchy] || 3;
    const leadingContent = leading === "none"
      ? null
      : leading === "icon"
        ? React.createElement(LeadingChevronIcon)
        : React.createElement(IconButton, { icon: "chevronDown", label: "Toggle", className: "composa-header-disclosure" });
    return React.createElement(
      StoryRowFrame,
      null,
      React.createElement(ListCell, {
        hierarchy: "property",
        level: resolvedLevel,
        underline,
        leading: leadingContent,
        content: React.createElement("span", { className: "composa-header-title" }, content),
        trailing: [
          React.createElement(IconButton, { key: "styles", icon: "styles", label: "Open styles", className: "composa-header-icon-action" }),
          React.createElement(IconButton, { key: "plus", icon: "plusSmall", label: "Add property", className: "composa-header-icon-action" }),
        ],
      })
    );
  },
};

export const ListCellContentFamily = {
  name: "VerticalCell",
  args: {
    align: "stretch",
    gap: "8px",
  },
  argTypes: {
    align: { control: "select", name: "Align", options: ["stretch", "start", "center", "end"], table: { type: { summary: '"stretch" | "start" | "center" | "end"' }, defaultValue: { summary: "stretch" } } },
    gap: { control: "text", name: "Gap", table: { type: { summary: "string" }, defaultValue: { summary: "2px" } } },
    // children is a node SLOT, not a primitive value — typed as ReactNode with no
    // editable control (you compose it from components, e.g. a label + an input).
    children: { name: "Children", control: false, table: { type: { summary: "ReactNode" } } },
  },
  render: ({ align, gap }) =>
    React.createElement(
      StoryRowFrame,
      { width: 320 },
      React.createElement(
        VerticalCell,
        { align, gap },
        [
          React.createElement("span", { key: "label", className: "composa-header-title" }, "Poster title"),
          React.createElement(InputField, {
            key: "input",
            value: "Poster frame",
            variant: "single-line",
            size: "medium",
            state: "rest",
            style: { width: "100%" },
          }),
          React.createElement(Button, { key: "apply", label: "Apply", variant: "secondary", width: "fill" }),
        ]
      )
    ),
};

export const TextPairFamily = {
  name: "TextPair",
  args: {
    title: "Poster frame",
    description: "Swap the still image used before playback begins.",
  },
  argTypes: {
    title: { control: "text", name: "Title", type: { required: true }, table: { type: { summary: "ReactNode" }, defaultValue: { summary: "Poster frame" } } },
    description: { control: "text", name: "Description", table: { type: { summary: "ReactNode" }, defaultValue: { summary: "null" } } },
    // Public API documented for completeness (not interactive controls here).
    titleAs: { name: "Title As", control: false, description: "Element/tag the title renders as.", table: { type: { summary: "keyof JSX.IntrinsicElements" }, defaultValue: { summary: "strong" } } },
  },
  render: ({ title, description }) =>
    React.createElement(
      StoryRowFrame,
      { width: 320 },
      React.createElement(TextPair, { title, description })
    ),
};

const treeSampleItems = [
  {
    id: "cover",
    name: "Cover",
    kind: "frame",
    children: [
      {
        id: "hero",
        name: "Hero",
        kind: "frame",
        children: [
          { id: "title", name: "Title", kind: "text" },
          { id: "logo", name: "Logo", kind: "component" },
        ],
      },
      { id: "background", name: "Background", kind: "image" },
    ],
  },
  {
    id: "specs",
    name: "Specs",
    kind: "frame",
    children: [
      { id: "spec-table", name: "Spec table", kind: "instance" },
      { id: "footnote", name: "Footnote", kind: "text" },
    ],
  },
];

export const TreeFamily = {
  name: "Tree",
  parameters: {
    docs: {
      source: {
        code: `const [selected, setSelected] = useState("title");

<Tree
  label="Layers"
  selectedId={selected}
  onSelect={setSelected}
  items={[
    { id: "cover", name: "Cover", kind: "frame", children: [
      { id: "hero", name: "Hero", kind: "frame", children: [
        { id: "title", name: "Title", kind: "text" },
        { id: "logo", name: "Logo", kind: "component" },
      ]},
      { id: "background", name: "Background", kind: "image" },
    ]},
  ]}
/>`,
      },
    },
  },
  args: {
    label: "Layers",
    defaultSelectedId: "title",
  },
  argTypes: {
    label: { control: "text", name: "Label", table: { type: { summary: "string" }, defaultValue: { summary: "Layers" } } },
    defaultSelectedId: { control: "text", name: "Default Selected Id", table: { type: { summary: "string" }, defaultValue: { summary: "undefined" } } },
    // The rest of the public API (documented; not tweakable widgets here).
    items: { name: "Items", control: false, type: { required: true }, description: "Nested layer items ({ id, name, kind, children }).", table: { type: { summary: "TreeItem[]" }, defaultValue: { summary: "[]" } } },
    selectedId: { name: "Selected Id", control: false, description: "Controlled selected node id.", table: { type: { summary: "string" } } },
    onSelect: { name: "On Select", control: false, description: "Fires when a row is selected.", table: { type: { summary: "(id, node, event) => void" } } },
  },
  render: ({ label, defaultSelectedId }) =>
    React.createElement(
      StoryRowFrame,
      { width: 260 },
      React.createElement(Tree, { label, items: treeSampleItems, defaultSelectedId: defaultSelectedId || "title" })
    ),
};

export const MenuHeadingFamily = {
  name: "MenuHeading",
  args: {
    hierarchy: "Level 3",
    alignment: "default",
    label: "Text",
  },
  argTypes: {
    hierarchy: { control: "select", name: "Hierarchy", options: ["Level 1", "Level 2", "Level 3"], table: { defaultValue: { summary: "Level 3" } } },
    alignment: { control: "select", name: "Alignment", options: ["default", "toggle"], table: { defaultValue: { summary: "default" } } },
    label: { control: "text", name: "Label", type: { required: true }, table: { defaultValue: { summary: "Text" } } },
    // Public API documented for completeness (not interactive controls here).
    content: { name: "Content", control: false, description: "Custom content node replacing the default label.", table: { type: { summary: "ReactNode" } } },
    trailing: { name: "Trailing", control: false, description: "Trailing slot (e.g. a toggle label).", table: { type: { summary: "ReactNode" } } },
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: ({ hierarchy, alignment, label }) =>
    React.createElement(
      StoryRowFrame,
      { width: 240 },
      React.createElement(
        "div",
        {
          className: "composa-menu",
          style: {
            "--composa-menu-width": "240px",
          },
        },
        React.createElement(MenuHeadingCell, { label, hierarchy, alignment })
      )
    ),
};

export const LabelFamily = {
  name: "Label",
  args: {
    hierarchy: "Level 1",
    label: "Text",
    weight: "regular",
  },
  argTypes: {
    hierarchy: { control: "select", name: "Hierarchy", options: ["Level 1", "Level 2", "Level 3"], table: { defaultValue: { summary: "Level 1" } } },
    label: { control: "text", name: "Label", type: { required: true }, table: { defaultValue: { summary: "Text" } } },
    weight: { control: "select", name: "Weight", options: ["regular", "strong"], table: { defaultValue: { summary: "regular" } } },
    // Public API documented for completeness (not interactive controls here).
    as: { name: "As", control: false, description: "Element/tag the label renders as.", table: { type: { summary: "keyof JSX.IntrinsicElements" } } },
  },
  render: ({ hierarchy, label, weight }) => {
    // Light vs dark is handled by tokens, not a prop. Color is contextual: the
    // Label defaults to secondary text and inherits the surrounding foreground.
    // The dark-surface example renders the same label on the menu surface so the
    // contextual-color model stays demonstrable.
    return React.createElement(
      StoryRowFrame,
      { width: 240 },
      React.createElement(
        "div",
        { style: { display: "grid", gap: "12px" } },
        React.createElement(Label, { key: "light", hierarchy, label, weight }),
        React.createElement(
          "div",
          {
            key: "dark",
            // Light vs dark is token-driven: on the dark menu surface the
            // secondary text token resolves light, so the same Label adopts the
            // menu's light text. No `surface` prop is involved.
            style: {
              background: "var(--composa-menu-surface-bg)",
              color: "var(--composa-menu-row-fg)",
              "--composa-color-text-secondary": "var(--composa-menu-row-fg-secondary)",
              padding: "6px 8px",
              borderRadius: "var(--composa-radius-medium)",
            },
          },
          React.createElement(Label, { hierarchy, label, weight })
        )
      )
    );
  },
};

export const ButtonFamily = {
  name: "Button",
  args: {
    label: "Text",
    variant: "primary",
    size: "medium",
    width: "auto",
    state: "rest",
    disabled: false,
    iconLead: "false",
    icon: "plus",
    hotkey: false,
  },
  argTypes: {
    variant: { control: "select", name: "Variant", options: ["primary", "secondary", "ghost", "link", "link-danger", "destructive", "secondary-destruct", "inverse", "success"], table: { defaultValue: { summary: "primary" } } },
    size: { control: "select", name: "Size", options: ["medium", "large", "small"], table: { defaultValue: { summary: "medium" } } },
    width: { control: "select", name: "Width", options: ["auto", "fill"], table: { defaultValue: { summary: "auto" } } },
    state: { control: "select", name: "State", options: ["rest", "hover", "active", "focused"], table: { defaultValue: { summary: "rest" } } },
    disabled: { control: "boolean", name: "Disabled", table: { defaultValue: { summary: "false" } } },
    iconLead: { control: "select", name: "Icon Lead", options: ["false", "left-aligned", "center-aligned"], table: { defaultValue: { summary: "false" } } },
    label: { control: "text", name: "Label", type: { required: true }, table: { defaultValue: { summary: "Text" } } },
    hotkey: { control: "boolean", name: "Hotkey", table: { defaultValue: { summary: "false" } } },
    icon: { table: { disable: true } },
    // Public API documented for completeness (not interactive controls here).
    tone: { name: "Tone", control: false, description: "Semantic color tone; defaults to the variant's tone.", table: { type: { summary: '"brand" | ButtonProps["variant"]' } } },
    onClick: { name: "On Click", control: false, description: "Fires when the button is activated.", table: { type: { summary: "(event) => void" } } },
  },
  render: (args) => React.createElement(Button, args),
};

// Shared button-family vocabulary. IconButton/Toggle/Split accept the same
// `variant` values as Button (deliberate Composa consistency choice; Figma's
// icon-button ships only Default/Secondary). `highlighted` kept for back-compat.
const buttonFamilyVariantOptions = ["secondary", "primary", "ghost", "link", "link-danger", "destructive", "secondary-destruct", "inverse", "success", "highlighted"];
const buttonFamilySizeOptions = ["small", "medium", "large"];

export const IconButtonFamily = {
  name: "IconButton",
  args: {
    icon: "move",
    label: "Text",
    size: "medium",
    state: "rest",
    variant: "secondary",
    disabled: false,
  },
  argTypes: {
    icon: { control: "select", name: "Icon", options: iconNames, type: { required: true }, table: { defaultValue: { summary: "move" } } },
    label: { control: "text", name: "Label", type: { required: true }, table: { defaultValue: { summary: "Text" } } },
    size: { control: "select", name: "Size", options: buttonFamilySizeOptions, table: { defaultValue: { summary: "medium" } } },
    state: { control: "select", name: "State", options: ["rest", "hover", "active", "focused", "primary-active", "secondary-active", "primary-focus", "secondary-focus", "disabled"], table: { defaultValue: { summary: "rest" } } },
    variant: { control: "select", name: "Variant", options: buttonFamilyVariantOptions, table: { defaultValue: { summary: "secondary" } } },
    disabled: { control: "boolean", name: "Disabled", table: { defaultValue: { summary: "false" } } },
    // Public API documented for completeness (not interactive controls here).
    selected: { name: "Selected", control: false, description: "Marks the button as currently selected/pressed-on.", table: { type: { summary: "boolean" } } },
    pressed: { name: "Pressed", control: false, description: "Toggle pressed state (aria-pressed).", table: { type: { summary: "boolean" } } },
    context: { name: "Context", control: false, description: "Rendering context; on-selected adjusts colors for selected surfaces.", table: { type: { summary: '"default" | "on-selected"' }, defaultValue: { summary: "default" } } },
    onClick: { name: "On Click", control: false, description: "Fires when the button is activated.", table: { type: { summary: "(event) => void" } } },
  },
  render: (args) => React.createElement(IconButton, { ...args, label: args.label || "Text" }),
};

// Single Toggle family. `dialog` is a control (default off): flip it on for the
// "opens-a-dialog" corner dot. Figma ships Button icon toggle and Button icon
// dialog toggle as separate component sets; we model the difference as one prop.
export const ToggleButtonFamily = {
  name: "ToggleButton",
  args: {
    icon: "move",
    label: "Text",
    size: "medium",
    state: "rest",
    variant: "secondary",
    disabled: false,
    pressed: true,
    dialog: false,
  },
  argTypes: {
    icon: { control: "select", name: "Icon", options: iconNames, type: { required: true }, table: { defaultValue: { summary: "move" } } },
    label: { control: "text", name: "Label", type: { required: true }, table: { defaultValue: { summary: "Text" } } },
    size: { control: "select", name: "Size", options: buttonFamilySizeOptions, table: { defaultValue: { summary: "medium" } } },
    state: { control: "select", name: "State", options: ["rest", "hover", "active", "focused", "primary-active", "secondary-active", "primary-focus", "secondary-focus", "disabled"], table: { defaultValue: { summary: "rest" } } },
    variant: { control: "select", name: "Variant", options: buttonFamilyVariantOptions, table: { defaultValue: { summary: "secondary" } } },
    disabled: { control: "boolean", name: "Disabled", table: { defaultValue: { summary: "false" } } },
    pressed: { control: "boolean", name: "Pressed", table: { defaultValue: { summary: "true" } } },
    dialog: { control: "boolean", name: "Dialog", description: "Adds the corner dot marking a toggle that opens a dialog/popover.", table: { defaultValue: { summary: "false" } } },
    // Public API documented for completeness (not interactive controls here).
    context: { name: "Context", control: false, description: "Rendering context; on-selected adjusts colors for selected surfaces.", table: { type: { summary: '"default" | "on-selected"' }, defaultValue: { summary: "default" } } },
    onClick: { name: "On Click", control: false, description: "Fires when the toggle is activated.", table: { type: { summary: "(event) => void" } } },
  },
  render: (args) => React.createElement(InteractiveToggleButton, args),
};

export const SplitButtonFamily = {
  name: "SplitButton",
  args: {
    label: "Text",
    icon: "plus",
    variant: "secondary",
    size: "small",
    width: "auto",
    state: "rest",
    disabled: false,
  },
  argTypes: {
    label: { control: "text", name: "Label", type: { required: true }, table: { defaultValue: { summary: "Text" } } },
    icon: { control: "select", name: "Icon", options: iconNames, table: { defaultValue: { summary: "plus" } } },
    variant: { control: "select", name: "Variant", options: buttonFamilyVariantOptions.filter((v) => v !== "highlighted"), table: { defaultValue: { summary: "secondary" } } },
    size: { control: "select", name: "Size", options: buttonFamilySizeOptions, table: { defaultValue: { summary: "small" } } },
    width: { control: "select", name: "Width", options: ["auto", "fill"], table: { defaultValue: { summary: "auto" } } },
    state: { control: "select", name: "State", options: ["rest", "hover", "active", "focused", "disabled"], table: { defaultValue: { summary: "rest" } } },
    disabled: { control: "boolean", name: "Disabled", table: { defaultValue: { summary: "false" } } },
    // Public API documented for completeness (not interactive controls here).
    menuLabel: { name: "Menu Label", control: false, description: "Accessible name for the dropdown half (defaults to `${label} options`).", table: { type: { summary: "string" } } },
    onMenuClick: { name: "On Menu Click", control: false, description: "Fires when the dropdown (menu) half is clicked.", table: { type: { summary: "(event) => void" } } },
    onClick: { name: "On Click", control: false, description: "Fires when the primary button half is clicked.", table: { type: { summary: "(event) => void" } } },
  },
  render: (args) => React.createElement(SplitButton, args),
};

export const InputFieldFamily = {
  name: "TextInput",
  args: {
    label: "Text",
    value: "Layer name",
    variant: "single-line",
    size: "medium",
    state: "rest",
    dropdown: false,
    iconLead: false,
    closeButton: false,
  },
  argTypes: {
    label: { control: "text", name: "Label", type: { required: true }, table: { defaultValue: { summary: "Text" } } },
    variant: { control: "select", name: "Variant", options: ["single-line", "multi-line", "quick-action"], table: { defaultValue: { summary: "single-line" } } },
    size: { control: "select", name: "Size", options: ["medium", "large"], table: { defaultValue: { summary: "medium" } } },
    state: { control: "select", name: "State", options: ["rest", "focus", "active", "empty", "disabled", "disabled-secondary", "disabled-tertiary", "variable", "active-empty", "active-filled"], table: { defaultValue: { summary: "rest" } } },
    iconLead: { control: "boolean", name: "Icon Lead", table: { defaultValue: { summary: "false" } } },
    dropdown: { control: "boolean", name: "Dropdown", table: { defaultValue: { summary: "false" } } },
    closeButton: { control: "boolean", name: "Close Button", table: { defaultValue: { summary: "false" } } },
    value: { table: { disable: true } },
    // Public API documented for completeness (not interactive controls here).
    placeholder: { name: "Placeholder", control: false, description: "Placeholder text shown when empty.", table: { type: { summary: "string" } } },
    mixed: { name: "Mixed", control: false, description: "Shows the mixed (multiple values) state.", table: { type: { summary: "boolean" } } },
    suffix: { name: "Suffix", control: false, description: "Trailing unit/suffix text (e.g. px).", table: { type: { summary: "string" } } },
    icon: { name: "Icon", control: false, description: "Leading icon node or component.", table: { type: { summary: "IconSlot" } } },
    width: { name: "Width", control: false, description: "auto hugs content; fill stretches to 100%.", table: { type: { summary: '"auto" | "fill"' }, defaultValue: { summary: "auto" } } },
    variable: { name: "Variable", control: false, description: "Renders the variable-binding affordance.", table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } } },
    multiline: { name: "Multiline", control: false, description: "Renders a textarea instead of a single-line input.", table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } } },
    onClear: { name: "On Clear", control: false, description: "Fires when the close/clear button is clicked.", table: { type: { summary: "(event) => void" } } },
    onChange: { name: "On Change", control: false, description: "Fires on input value change.", table: { type: { summary: "(event) => void" } } },
    onInput: { name: "On Input", control: false, description: "Fires on each input event.", table: { type: { summary: "(event) => void" } } },
  },
  render: (args) => React.createElement(InteractiveInputField, args),
};

export const ColorInputFamily = {
  name: "ColorInput",
  args: {
    state: "rest",
    type: "fill",
    shape: "square",
    value: "F7F5F1",
    opacityValue: "100",
  },
  argTypes: {
    state: { control: "select", name: "State", options: ["rest", "focus", "disabled"], table: { defaultValue: { summary: "rest" } } },
    type: { control: "select", name: "Type", options: ["fill", "opacity", "image", "gradient", "variable", "instance"], table: { defaultValue: { summary: "fill" } } },
    shape: { control: "select", name: "Shape", options: ["square", "circle"], table: { defaultValue: { summary: "square" } } },
    value: { table: { disable: true } },
    opacityValue: { table: { disable: true } },
    // Public API documented for completeness (not interactive controls here).
    disabled: { name: "Disabled", control: false, description: "Greys out the control and blocks interaction.", table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } } },
    onChange: { name: "On Change", control: false, description: "Fires when the color value changes.", table: { type: { summary: "(event) => void" } } },
    onInput: { name: "On Input", control: false, description: "Fires on each color input event.", table: { type: { summary: "(event) => void" } } },
    onOpacityChange: { name: "On Opacity Change", control: false, description: "Fires when the opacity value changes.", table: { type: { summary: "(event) => void" } } },
    onOpacityInput: { name: "On Opacity Input", control: false, description: "Fires on each opacity input event.", table: { type: { summary: "(event) => void" } } },
  },
  render: (args) => React.createElement(InteractiveColorInput, args),
};

export const HeaderFamily = {
  name: "Header",
  args: {
    title: "Text",
    hierarchy: "Level 3",
    underline: false,
    leading: "icon",
  },
  argTypes: {
    title: { control: "text", name: "Title", type: { required: true }, table: { defaultValue: { summary: "Text" } } },
    hierarchy: { control: "select", name: "Hierarchy", options: ["Level 1", "Level 2", "Level 3"], table: { defaultValue: { summary: "Level 3" } } },
    underline: { control: "boolean", name: "Underline", table: { defaultValue: { summary: "false" } } },
    leading: { control: "select", name: "Leading", options: ["none", "icon", "icon-button"], table: { defaultValue: { summary: "icon" } } },
    // Public API documented for completeness (not interactive controls here). The
    // Hierarchy select above is a story harness mapping to the numeric `level`.
    level: { name: "Level", control: false, description: "Numeric heading level (1 to 6).", table: { type: { summary: "number" }, defaultValue: { summary: "3" } } },
    expanded: { name: "Expanded", control: false, description: "Disclosure state for the leading toggle.", table: { type: { summary: "boolean" } } },
    actions: { name: "Actions", control: false, description: "Trailing action nodes (icon buttons, etc.).", table: { type: { summary: "ReactNode" } } },
    content: { name: "Content", control: false, description: "Custom content node replacing the default title.", table: { type: { summary: "ReactNode" } } },
    trailing: { name: "Trailing", control: false, description: "Trailing slot (alias for actions).", table: { type: { summary: "ReactNode" } } },
    leadingIcon: { name: "Leading Icon", control: false, description: "Icon used for the generated leading glyph.", table: { type: { summary: "IconSlot" }, defaultValue: { summary: "chevronDown" } } },
    leadingContent: { name: "Leading Content", control: false, description: "Custom leading node.", table: { type: { summary: "ReactNode" } } },
    onToggle: { name: "On Toggle", control: false, description: "Fires when the leading disclosure button is clicked.", table: { type: { summary: "(event) => void" } } },
  },
  render: ({ level, leading, underline, ...args }) => {
    const levelMap = {
      "Level 1": 1,
      "Level 2": 2,
      "Level 3": 3,
    };
    const resolvedLevel = levelMap[level] || 3;
    return React.createElement(
      StoryRowFrame,
      null,
      React.createElement(Header, {
        ...args,
        hierarchy: "property",
        level: resolvedLevel,
        underline,
        leading,
        expanded: leading === "icon-button" ? true : undefined,
        actions: [
          React.createElement(IconButton, { key: "styles", icon: "styles", label: "Open styles", className: "composa-header-icon-action" }),
          React.createElement(IconButton, { key: "plus", icon: "plusSmall", label: "Add property", className: "composa-header-icon-action" }),
        ],
      })
    );
  },
};

export const FillSectionFamily = {
  name: "FillSection",
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => {
    const rows = [
      { key: "solid", type: "Fill", value: "FFFFFF", opacityValue: "100" },
      { key: "gradient", type: "Gradient", value: "Angular", opacityValue: "100" },
      { key: "image", type: "Image", value: "Image", opacityValue: "100" },
    ];
    return React.createElement(
      "section",
      { className: "composa-fill-section", "aria-label": "Fill" },
      [
        React.createElement(Header, {
          key: "header",
          title: "Fill",
          hierarchy: "property",
          actions: [
            React.createElement(IconButton, { key: "styles", icon: "styles", label: "Open fill styles", className: "composa-header-icon-action" }),
            React.createElement(IconButton, { key: "plus", icon: "plusSmall", label: "Add fill", className: "composa-header-icon-action" }),
          ],
        }),
        ...rows.map((row) =>
          React.createElement(
            "div",
            { key: row.key, className: "composa-fill-row" },
            [
              React.createElement(ColorInput, {
                key: "input",
                type: row.type,
                value: row.value,
                opacityValue: row.opacityValue,
              }),
              React.createElement(
                "div",
                { key: "actions", className: "composa-fill-row-actions", role: "group", "aria-label": `${row.type} actions` },
                [
                  React.createElement(IconButton, { key: "visible", icon: "eyeSmall", label: `Hide ${row.type}`, className: "composa-header-icon-action" }),
                  React.createElement(IconButton, { key: "remove", icon: "minus", label: `Remove ${row.type}`, className: "composa-header-icon-action" }),
                ]
              ),
            ]
          )
        ),
      ]
    );
  },
};

export const NumericInputFamily = {
  name: "NumericInput",
  args: {
    state: "rest",
    varIcon: false,
    disabled: false,
    varPill: false,
    dropdown: true,
    iconLead: "w",
  },
  argTypes: {
    state: { control: "select", name: "State", options: ["rest", "hover", "focused", "empty"], table: { defaultValue: { summary: "rest" } } },
    varIcon: { control: "boolean", name: "Var Icon", table: { defaultValue: { summary: "false" } } },
    disabled: { control: "boolean", name: "Disabled", table: { defaultValue: { summary: "false" } } },
    varPill: { control: "boolean", name: "Var Pill", table: { defaultValue: { summary: "false" } } },
    dropdown: { control: "boolean", name: "Dropdown", table: { defaultValue: { summary: "true" } } },
    iconLead: { control: "select", name: "Icon Lead", options: ["false", "w", "h", "x", "y", "styles", "move", "plus"], table: { defaultValue: { summary: "w" } } },
    // Public API documented for completeness (not interactive controls here).
    label: { name: "Label", control: false, description: "Optional field label (numeric inputs label via the var pill).", table: { type: { summary: "string" } } },
    value: { name: "Value", control: false, description: "Current numeric value (controlled).", table: { type: { summary: "string" } } },
    size: { name: "Size", control: false, description: "Field height.", table: { type: { summary: '"medium" | "large"' }, defaultValue: { summary: "medium" } } },
    onChange: { name: "On Change", control: false, description: "Fires when the value changes.", table: { type: { summary: "(event) => void" } } },
    onInput: { name: "On Input", control: false, description: "Fires on each input event.", table: { type: { summary: "(event) => void" } } },
  },
  render: (args) => React.createElement(InteractiveNumericInput, args),
};

export const NumericInputMultiFamily = {
  name: "NumericInputMulti",
  args: {
    state: "rest",
    variant: "standard",
    disabled: false,
    iconLead: "styles",
  },
  argTypes: {
    state: { control: "select", name: "State", options: ["rest", "focused", "empty"], table: { defaultValue: { summary: "rest" } } },
    variant: { control: "select", name: "Variant", options: ["standard", "partial-disable"], table: { defaultValue: { summary: "standard" } } },
    disabled: { control: "boolean", name: "Disabled", table: { defaultValue: { summary: "false" } } },
    iconLead: { control: "select", name: "Icon Lead", options: ["false", "styles", "move", "plus"], table: { defaultValue: { summary: "styles" } } },
    // Public API documented for completeness (not interactive controls here).
    values: { name: "Values", control: false, description: "The four field values (top, right, bottom, left).", table: { type: { summary: "[string, string, string, string]" } } },
    partialDisable: { name: "Partial Disable", control: false, description: "Disables the non-primary fields (paired with variant=partial-disable).", table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } } },
    onValueChange: { name: "On Value Change", control: false, description: "Fires when any field changes; receives (index, nextValue).", table: { type: { summary: "(index, value) => void" } } },
  },
  render: (args) => React.createElement(InteractiveNumericInputMulti, args),
};

export const ComboInputFamily = {
  name: "ComboInput",
  args: {
    state: "rest",
    iconLead: "false",
    variable: false,
    dropdownState: "rest",
  },
  argTypes: {
    state: { control: "select", name: "State", options: ["rest", "hover", "selected-input", "selected-chevron"], table: { defaultValue: { summary: "rest" } } },
    iconLead: { control: "select", name: "Icon Lead", options: ["false", "styles", "move", "plus"], table: { defaultValue: { summary: "false" } } },
    variable: { control: "boolean", name: "Variable", table: { defaultValue: { summary: "false" } } },
    dropdownState: { control: "select", name: "Dropdown State", options: ["rest", "hover", "active"], table: { defaultValue: { summary: "rest" } } },
    // Public API documented for completeness (not interactive controls here).
    label: { name: "Label", control: false, description: "Field label.", table: { type: { summary: "string" } } },
    value: { name: "Value", control: false, description: "Current value (controlled).", table: { type: { summary: "string" } } },
    disabled: { name: "Disabled", control: false, description: "Greys out the control and blocks interaction.", table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } } },
    onChange: { name: "On Change", control: false, description: "Fires when the value changes.", table: { type: { summary: "(event) => void" } } },
    onInput: { name: "On Input", control: false, description: "Fires on each input event.", table: { type: { summary: "(event) => void" } } },
    onDropdownClick: { name: "On Dropdown Click", control: false, description: "Fires when the dropdown chevron is clicked.", table: { type: { summary: "(event) => void" } } },
  },
  render: (args) => React.createElement(InteractiveComboInput, args),
};

export const DropdownFamily = {
  name: "Dropdown",
  args: {
    label: "Text",
    value: "Pass through",
    size: "medium",
    width: "auto",
    state: "rest",
    disabled: false,
    stroke: true,
    iconLead: false,
    icon: "styles",
  },
  argTypes: {
    size: { control: "select", name: "Size", options: ["medium", "large"], table: { defaultValue: { summary: "medium" } } },
    width: { control: "select", name: "Width", options: ["auto", "fill"], table: { defaultValue: { summary: "auto" } } },
    state: { control: "select", name: "State", options: ["rest", "focused", "active"], table: { defaultValue: { summary: "rest" } } },
    disabled: { control: "boolean", name: "Disabled", table: { defaultValue: { summary: "false" } } },
    stroke: { control: "boolean", name: "Stroke", table: { defaultValue: { summary: "true" } } },
    iconLead: { control: "boolean", name: "Icon Lead", table: { defaultValue: { summary: "false" } } },
    value: { table: { disable: true } },
    label: { control: "text", name: "Label", type: { required: true }, table: { defaultValue: { summary: "Text" } } },
    icon: { table: { disable: true } },
    // Public API documented for completeness (not interactive controls here).
    open: { name: "Open", control: false, description: "Controlled open state of the attached menu.", table: { type: { summary: "boolean" } } },
    onOpenChange: { name: "On Open Change", control: false, description: "Fires when the open state should change.", table: { type: { summary: "(open, event) => void" } } },
    onClick: { name: "On Click", control: false, description: "Fires when the trigger is clicked.", table: { type: { summary: "(event) => void" } } },
  },
  render: (args) => React.createElement(InteractiveDropdown, args),
};

export const SwitchFamily = {
  name: "Switch",
  args: {
    checked: true,
    mixed: false,
    size: "medium",
    state: "rest",
    disabled: false,
  },
  argTypes: {
    checked: { control: "boolean", name: "Checked", table: { defaultValue: { summary: "true" } } },
    mixed: { control: "boolean", name: "Mixed", table: { defaultValue: { summary: "false" } } },
    size: { control: "select", name: "Size", options: ["medium", "compact"], table: { defaultValue: { summary: "medium" } } },
    state: { control: "select", name: "State", options: ["rest", "hover", "focused", "disabled"], table: { defaultValue: { summary: "rest" } } },
    disabled: { control: "boolean", name: "Disabled", table: { defaultValue: { summary: "false" } } },
    // Public API documented for completeness (not interactive controls here).
    label: { name: "Label", control: false, description: "Accessible label text for the switch.", table: { type: { summary: "string" } } },
    defaultChecked: { name: "Default Checked", control: false, description: "Uncontrolled initial checked state.", table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } } },
    onCheckedChange: { name: "On Checked Change", control: false, description: "Fires when the checked state changes.", table: { type: { summary: "(checked, event) => void" } } },
    onClick: { name: "On Click", control: false, description: "Fires when the switch is clicked.", table: { type: { summary: "(event) => void" } } },
  },
  render: (args) => React.createElement(InteractiveSwitch, args),
};

export const RadioFamily = {
  name: "Radio",
  parameters: {
    docs: {
      source: {
        code: `const [selected, setSelected] = useState("Design mode");

// Radio is a single control; render one per option to form a group.
["Design mode", "Prototype", "Dev mode"].map((label) => (
  <Radio
    key={label}
    label={label}
    checked={selected === label}
    onCheckedChange={() => setSelected(label)}
  />
))`,
      },
    },
  },
  args: {
    label: "Text",
    variant: "input",
    checked: true,
    state: "rest",
    disabled: false,
  },
  argTypes: {
    label: { control: "text", name: "Label", type: { required: true }, table: { defaultValue: { summary: "Text" } } },
    variant: { control: "select", name: "Variant", options: ["input", "button"], table: { defaultValue: { summary: "input" } } },
    checked: { control: "boolean", name: "Checked", table: { defaultValue: { summary: "true" } } },
    state: { control: "select", name: "State", options: ["rest", "hover", "active", "focused", "disabled"], table: { defaultValue: { summary: "rest" } } },
    disabled: { control: "boolean", name: "Disabled", table: { defaultValue: { summary: "false" } } },
    // Public API documented for completeness (not interactive controls here).
    defaultChecked: { name: "Default Checked", control: false, description: "Uncontrolled initial checked state.", table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } } },
    onCheckedChange: { name: "On Checked Change", control: false, description: "Fires when the checked state changes.", table: { type: { summary: "(checked, event) => void" } } },
    onClick: { name: "On Click", control: false, description: "Fires when the radio is clicked.", table: { type: { summary: "(event) => void" } } },
  },
  render: (args) => React.createElement(InteractiveRadio, args),
};

export const CheckboxFamily = {
  name: "Checkbox",
  args: {
    state: "rest",
    type: "checked",
    disabled: false,
    muted: false,
    ghost: false,
    label: true,
    description: false,
    labelText: "Text",
    descriptionText: "Secondary helper text",
  },
  argTypes: {
    state: { control: "select", name: "State", options: ["rest", "focused"], description: "Visual state. Focused draws the focus ring.", table: { defaultValue: { summary: "rest" } } },
    type: {
      control: "select",
      name: "Type",
      options: ["unchecked", "checked", "mixed"],
      description: "Mark shown in the box: Unchecked is empty (no mark), Checked is the check glyph, Mixed is the dash for partial selection.",
      table: { defaultValue: { summary: "checked" } },
    },
    disabled: { control: "boolean", name: "Disabled", description: "Greys out the control and blocks interaction.", table: { defaultValue: { summary: "false" } } },
    muted: { control: "boolean", name: "Muted", description: "Recolors the box to the neutral/disabled palette instead of the blue selection fill. A muted Checked box stays grey, not blue (the dark/non-blue selection state).", table: { defaultValue: { summary: "false" } } },
    ghost: { control: "boolean", name: "Ghost", description: "Hides the box outline and fill while Unchecked, so the control reads as an empty slot until checked.", table: { defaultValue: { summary: "false" } } },
    label: { control: "boolean", name: "Label", table: { defaultValue: { summary: "true" } } },
    description: { control: "boolean", name: "Description", table: { defaultValue: { summary: "false" } } },
    labelText: { control: "text", name: "Label Text", type: { required: true }, table: { defaultValue: { summary: "Text" } } },
    descriptionText: { control: "text", name: "Description Text", table: { defaultValue: { summary: "Secondary helper text" } } },
    // Public API documented for completeness (not interactive controls here).
    checked: { name: "Checked", control: false, description: "Controlled checked state (boolean or unchecked/checked/mixed).", table: { type: { summary: 'boolean | "unchecked" | "checked" | "mixed"' } } },
    defaultType: { name: "Default Type", control: false, description: "Uncontrolled initial mark.", table: { type: { summary: '"unchecked" | "checked" | "mixed"' } } },
    defaultChecked: { name: "Default Checked", control: false, description: "Uncontrolled initial checked state.", table: { type: { summary: 'boolean | "unchecked" | "checked" | "mixed"' } } },
    onCheckedChange: { name: "On Checked Change", control: false, description: "Fires when the checked state changes; receives unchecked/checked.", table: { type: { summary: "(checked, event) => void" } } },
    onClick: { name: "On Click", control: false, description: "Fires when the checkbox is clicked.", table: { type: { summary: "(event) => void" } } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox supports several state combinations. Type controls the mark (Unchecked has no check, Checked shows the check, Mixed shows a dash). Muted swaps the box to a neutral/non-blue fill — a muted Checked box stays grey rather than blue. Ghost removes the box outline while Unchecked. Combine these controls to reach states like an empty ghost slot, a grey muted check, or a standard blue check.",
      },
    },
  },
  render: (args) => React.createElement(InteractiveCheckbox, args),
};

export const TooltipFamily = {
  name: "Tooltip",
  args: {
    label: "Text",
    placement: "top",
    tone: "inverse",
  },
  argTypes: {
    label: { control: "text", name: "Label", type: { required: true }, table: { defaultValue: { summary: "Text" } } },
    placement: { control: "select", name: "Placement", options: ["top", "right", "bottom", "left", "top-left", "top-right", "bottom-left", "bottom-right"], table: { defaultValue: { summary: "top" } } },
    tone: { control: "select", name: "Tone", options: ["standard", "inverse"], table: { defaultValue: { summary: "inverse" } } },
  },
  render: (args) => React.createElement(Tooltip, args),
};

export const DialogFamily = {
  name: "Dialog",
  args: {
    title: "Rename layer",
    description: "Update this layer name for everyone in the file.",
    size: "320",
    variant: "basic",
    tone: "default",
    primaryLabel: "Rename",
    secondaryLabel: "Cancel",
  },
  argTypes: {
    title: { control: "text", name: "Title", type: { required: true }, table: { defaultValue: { summary: "Rename layer" } } },
    description: { control: "text", name: "Description", table: { defaultValue: { summary: "Update this layer name for everyone in the file." } } },
    size: { control: "select", name: "Size", options: ["320", "480", "small", "medium", "large"], table: { defaultValue: { summary: "320" } } },
    variant: { control: "select", name: "Variant", options: ["basic", "advanced", "embed", "create-project", "create-team", "sharing"], table: { defaultValue: { summary: "basic" } } },
    tone: { control: "select", name: "Tone", options: ["default", "destructive"], table: { defaultValue: { summary: "default" } } },
    primaryLabel: { control: "text", name: "Primary Label", table: { defaultValue: { summary: "Rename" } } },
    secondaryLabel: { control: "text", name: "Secondary Label", table: { defaultValue: { summary: "Cancel" } } },
    // Public API documented for completeness (not interactive controls here).
    children: { name: "Children", control: false, description: "Custom dialog body content (DialogBody/DialogRow, etc.).", table: { type: { summary: "ReactNode" } } },
  },
  render: (args) => React.createElement(Dialog, args),
};

export const DialogHeaderFamily = {
  name: "Header",
  args: {
    title: "Replace poster frame",
  },
  argTypes: {
    title: { control: "text", name: "Title", type: { required: true }, table: { defaultValue: { summary: "Replace poster frame" } } },
    // Public API documented for completeness (not interactive controls here).
    content: { name: "Content", control: false, description: "Custom content node replacing the default title element.", table: { type: { summary: "ReactNode" } } },
    trailing: { name: "Trailing", control: false, description: "Trailing slot (e.g. a close button).", table: { type: { summary: "ReactNode" } } },
  },
  render: ({ title }) =>
    React.createElement(
      StoryRowFrame,
      { width: 420 },
      React.createElement(DialogHeaderCell, {
        title,
        trailing: React.createElement(IconButton, {
          icon: "plusSmall",
          label: "Close dialog",
          className: "composa-dialog-close",
        }),
      })
    ),
};

export const DialogFooterFamily = {
  name: "Footer",
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () =>
    React.createElement(
      StoryRowFrame,
      { width: 420 },
      React.createElement(
        DialogFooter,
        null,
        [
          React.createElement(Button, { key: "secondary", label: "Cancel", variant: "Secondary" }),
          React.createElement(Button, { key: "primary", label: "Apply", variant: "Primary" }),
        ]
      )
    ),
};

export const DialogRowFamily = {
  name: "DialogRow",
  args: {
    mode: "text-pair",
    leading: "image",
    trailing: "button",
    title: "Replace poster frame",
    description: "Use ListCell as the horizontal shell while content owns its own stacked copy.",
  },
  argTypes: {
    mode: { control: "select", name: "Mode", options: ["text-pair", "content-stack"], table: { defaultValue: { summary: "text-pair" } } },
    leading: { control: "select", name: "Leading", options: ["none", "image"], table: { defaultValue: { summary: "image" } } },
    trailing: { control: "select", name: "Trailing", options: ["none", "button", "dropdown", "switch"], table: { defaultValue: { summary: "button" } } },
    title: { control: "text", name: "Title", type: { required: true }, table: { defaultValue: { summary: "Replace poster frame" } } },
    description: { control: "text", name: "Description", table: { defaultValue: { summary: "Use ListCell as the horizontal shell while content owns its own stacked copy." } } },
    // Public API documented for completeness. The Mode/Leading/Trailing selects
    // above are story harness affordances that compose the real ReactNode slots.
    content: { name: "Content", control: false, type: { required: true }, description: "Main row content (TextPair, fields, etc.). Required.", table: { type: { summary: "ReactNode" } } },
    leadingContent: { name: "Leading Content", control: false, description: "Alternate leading slot, used when `leading` is omitted.", table: { type: { summary: "ReactNode" } } },
  },
  render: ({ mode, leading, trailing, title, description }) =>
    React.createElement(
      StoryRowFrame,
      { width: 420 },
      React.createElement(DialogRow, {
        leading:
          leading === "image"
            ? React.createElement(IconButton, { icon: "image", label: "Preview asset", className: "composa-header-disclosure" })
            : null,
        content:
          mode === "text-pair"
            ? React.createElement(TextPair, {
                title,
                description,
              })
            : React.createElement(
                VerticalCell,
                { gap: "4px" },
                [
                  React.createElement("span", { key: "label", className: "composa-header-title" }, "Poster title"),
                  React.createElement(InputField, {
                    key: "input",
                    value: "Poster frame",
                    variant: "Single Line",
                    size: "medium",
                    state: "rest",
                    style: { width: "100%" },
                  }),
                ]
              ),
        trailing:
          trailing === "button"
            ? React.createElement(Button, { label: "Choose", size: "medium", variant: "Secondary" })
            : trailing === "dropdown"
              ? React.createElement(Dropdown, { label: "Blend mode", value: "Pass through", state: "Focused", stroke: true })
              : trailing === "switch"
                ? React.createElement(Switch, { label: "Include captions", checked: true })
                : null,
      })
    ),
};

export const ListCellDialogRowFamily = DialogRowFamily;

export const StructuredDialogFamily = {
  name: "Structured",
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () =>
    React.createElement(
      Dialog,
      {
        title: "Replace poster frame",
        description: "",
        size: "medium",
        tone: "default",
        primaryLabel: "Apply",
        secondaryLabel: "Cancel",
      },
      React.createElement(
        DialogBody,
        null,
        [
          React.createElement(DialogRow, {
            key: "asset",
            leading: React.createElement(IconButton, { icon: "image", label: "Asset preview", className: "composa-header-disclosure" }),
            content: React.createElement(TextPair, {
              title: "Poster frame",
              description: "Swap the still image used before playback begins.",
            }),
            trailing: React.createElement(Button, { label: "Choose", variant: "Secondary" }),
          }),
          React.createElement(DialogRow, {
            key: "title-field",
            content: React.createElement(
              VerticalCell,
              { gap: "4px" },
              [
                React.createElement("span", { key: "label", className: "composa-header-title" }, "Poster title"),
                React.createElement(InputField, {
                  key: "input",
                  value: "Poster frame",
                  variant: "Single Line",
                  size: "medium",
                  state: "rest",
                  style: { width: "100%" },
                }),
              ]
            ),
          }),
          React.createElement(DialogRow, {
            key: "blend",
            content: React.createElement(TextPair, {
              title: "Blend mode",
              description: "Choose how this still image composites before playback starts.",
            }),
            trailing: React.createElement(InteractiveDropdown, { label: "Blend mode", value: "Pass through", stroke: true }),
          }),
          React.createElement(DialogRow, {
            key: "caption",
            content: React.createElement(TextPair, {
              title: "Include captions",
              description: "Carry subtitle timing into the exported composition.",
            }),
            trailing: React.createElement(Switch, { label: "Include captions", checked: true }),
          }),
        ]
      )
    ),
};

export const SegmentedControlFamily = {
  name: "SegmentedControl",
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState("design");

<SegmentedControl
  label="Sidebar view"
  variant="icon"
  value={value}
  onValueChange={setValue}
  options={[
    { id: "design", label: "Design", icon: "move" },
    { id: "layers", label: "Layers", icon: "text" },
    { id: "assets", label: "Assets", icon: "image" },
  ]}
/>`,
      },
    },
  },
  args: {
    variant: "icon",
    state: "rest",
    disabled: false,
    count: 3,
  },
  argTypes: {
    variant: { control: "select", name: "Variant", options: ["icon", "label"], table: { defaultValue: { summary: "icon" } } },
    state: { control: "select", name: "State", options: ["rest", "disabled"], table: { defaultValue: { summary: "rest" } } },
    disabled: { control: "boolean", name: "Disabled", table: { defaultValue: { summary: "false" } } },
    count: { control: "select", name: "Count", options: [2, 3, 4, 5, 6], description: "Storybook harness control only; code derives count from options.length.", table: { defaultValue: { summary: "3" } } },
    // The rest of the public API — documented here (with types) even though they
    // aren't tweakable widgets: collection, controlled value, label, and callback.
    label: { name: "Label", control: false, type: { required: true }, description: "Accessible group label. Required.", table: { type: { summary: "string" } } },
    options: { name: "Options", control: false, type: { required: true }, description: "Segment items ({ id, label, icon }). Required.", table: { type: { summary: "SegmentedOption[]" }, defaultValue: { summary: "[]" } } },
    value: { name: "Value", control: false, description: "Controlled selected segment value/id.", table: { type: { summary: "string" } } },
    defaultValue: { name: "Default Value", control: false, description: "Uncontrolled initial selected segment.", table: { type: { summary: "string" } } },
    onValueChange: { name: "On Value Change", control: false, description: "Fires when the selected segment changes.", table: { type: { summary: "(value, option, index, event) => void" } } },
  },
  render: (args) => React.createElement(InteractiveSegmentedControl, args),
};

export const TabsFamily = {
  name: "Tabs",
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState("design");

<Tabs
  label="Inspector mode"
  variant="pill"
  value={value}
  onValueChange={setValue}
  tabs={[
    { id: "design", label: "Design" },
    { id: "animate", label: "Animate" },
    { id: "comments", label: "Comments" },
  ]}
/>`,
      },
    },
  },
  args: {
    variant: "pill",
    size: "medium",
    state: "rest",
    count: 2,
  },
  argTypes: {
    // Interactive controls (tweakable primitives).
    variant: { control: "select", name: "Variant", options: ["underline", "pill"], table: { type: { summary: '"underline" | "pill"' }, defaultValue: { summary: "pill" } } },
    size: { control: "select", name: "Size", options: ["medium", "compact"], table: { type: { summary: '"medium" | "compact"' }, defaultValue: { summary: "medium" } } },
    state: { control: "select", name: "State", options: ["rest", "focused", "hover"], table: { type: { summary: '"rest" | "focused" | "hover"' }, defaultValue: { summary: "rest" } } },
    label: { control: "text", name: "Label", table: { type: { summary: "string" }, defaultValue: { summary: "Tabs" } } },
    count: { control: "select", name: "Count", options: [1, 2, 3, 4], description: "Storybook harness control only; code derives count from tabs.length.", table: { defaultValue: { summary: "2" } } },
    // The rest of the public API — documented here (with types) even though they
    // aren't tweakable widgets: collections, controlled value, and the callback.
    tabs: { name: "Tabs", control: false, type: { required: true }, description: "Tab items ({ id, label }). Required.", table: { type: { summary: "TabItem[]" }, defaultValue: { summary: "[]" } } },
    value: { name: "Value", control: false, description: "Controlled selected tab id.", table: { type: { summary: "string" } } },
    defaultValue: { name: "Default Value", control: false, description: "Uncontrolled initial selected tab id.", table: { type: { summary: "string" } } },
    onValueChange: { name: "On Value Change", control: false, description: "Fires when the selected tab changes.", table: { type: { summary: "(value, tab, index, event) => void" } } },
  },
  render: (args) => React.createElement(InteractiveTabs, args),
};

export const MenuRows = {
  name: "Menu / MenuRow",
  args: {
    state: "rest",
  },
  argTypes: {
    state: { control: "select", name: "State", options: ["rest", "hover", "disabled"], table: { defaultValue: { summary: "rest" } } },
    // Menu public API documented for completeness (the State select is a story
    // harness control applied to the demo rows).
    label: { name: "Label", control: false, description: "Accessible name for the menu.", table: { type: { summary: "string" } } },
    variant: { name: "Variant", control: false, description: "Menu container variant.", table: { type: { summary: '"standard" | "label-only" | "avatars" | "mixed-icons"' }, defaultValue: { summary: "standard" } } },
    items: { name: "Items", control: false, description: "Menu rows to render ({ type, label, ... }).", table: { type: { summary: "MenuRowProps[]" } } },
  },
  render: (args) =>
    React.createElement(Menu, {
      label: "Editor menu",
      items: [
        { type: "heading", label: "Layer" },
        { type: "complex", label: "Bring to front", lead: "icon", trail: "shortcut", shortcut: "Shift ]", state: args.state },
        {
          type: "complex",
          label: "Move to page",
          lead: "icon",
          state: args.state,
          submenu: [
            { type: "simple", label: "Cover" },
            { type: "simple", label: "Page 1" },
            { type: "simple", label: "Page 2" },
            { type: "divider" },
            { type: "simple", label: "New page…" },
          ],
        },
        { type: "divider" },
        { type: "checkmark", label: "Snap to grid", selected: true, state: args.state },
        { type: "toggle", label: "Show outlines", toggleState: "on", hasIcon: true, state: args.state },
        { type: "toolbar", label: "Rectangle", lead: "image", shortcut: "R", selected: true, state: args.state },
        { type: "footer", label: "Open library" },
      ],
    }),
};

export const MenuContainerVariants = {
  name: "Menu / Container Variant",
  args: {
    variant: "standard",
  },
  argTypes: {
    variant: { control: "select", name: "Variant", options: ["standard", "label-only", "avatars", "mixed-icons"], table: { defaultValue: { summary: "standard" } } },
    // Menu public API documented for completeness (not interactive controls here).
    label: { name: "Label", control: false, description: "Accessible name for the menu.", table: { type: { summary: "string" } } },
    items: { name: "Items", control: false, description: "Menu rows to render ({ type, label, ... }).", table: { type: { summary: "MenuRowProps[]" } } },
  },
  render: (args) => React.createElement(Menu, { label: "Container menu", variant: args.variant }),
};

export const MenuRowFamily = {
  name: "MenuRow",
  args: {
    type: "complex",
    label: "Text",
    state: "rest",
    lead: "icon",
    trail: "shortcut",
    submenu: false,
    selected: false,
    checkVariant: "check",
    toggleState: "off",
    hasIcon: false,
    expanded: false,
    alignment: "default",
  },
  argTypes: {
    type: { control: "select", name: "Type", options: menuRowTypes, table: { defaultValue: { summary: "complex" } } },
    label: { control: "text", name: "Label", type: { required: true }, table: { defaultValue: { summary: "Text" } } },
    state: { control: "select", name: "State", options: ["rest", "hover", "disabled"], table: { defaultValue: { summary: "rest" } } },
    lead: { control: "select", name: "Lead", options: menuLeadOptions, table: { defaultValue: { summary: "icon" } } },
    trail: { control: "select", name: "Trail", options: menuTrailOptions, table: { defaultValue: { summary: "shortcut" } } },
    submenu: { control: "boolean", name: "Submenu", table: { defaultValue: { summary: "false" } } },
    selected: { control: "boolean", name: "Selected", table: { defaultValue: { summary: "false" } } },
    checkVariant: { control: "select", name: "Check Variant", options: ["check", "dot"], table: { defaultValue: { summary: "check" } } },
    toggleState: { control: "select", name: "Toggle State", options: ["on", "off"], table: { defaultValue: { summary: "off" } } },
    hasIcon: { control: "boolean", name: "Has Icon", table: { defaultValue: { summary: "false" } } },
    expanded: { control: "boolean", name: "Expanded", table: { defaultValue: { summary: "false" } } },
    alignment: { control: "select", name: "Alignment", options: ["default", "toggle"], table: { defaultValue: { summary: "default" } } },
    // Public API documented for completeness (not interactive controls here).
    shortcut: { name: "Shortcut", control: false, description: "Keyboard-shortcut hint shown in the trailing slot (when trail=shortcut).", table: { type: { summary: "string" } } },
    disabled: { name: "Disabled", control: false, description: "Disables the row (also implied by state=disabled).", table: { type: { summary: "boolean" } } },
    onClick: { name: "On Click", control: false, description: "Fires when the row is activated.", table: { type: { summary: "(event) => void" } } },
  },
  // MenuRow uses the dark-menu-surface foreground tokens, so it is designed to
  // sit inside a menu. On the light story canvas it reads as white-on-white and
  // is invisible until hover. Render it on a dark menu surface like the
  // Label menu/section fix so the row is legible by default.
  render: (args) =>
    React.createElement(
      "div",
      {
        style: {
          background: "var(--composa-menu-surface-bg)",
          padding: "8px",
          borderRadius: "var(--composa-radius-large)",
          minWidth: 260,
        },
      },
      React.createElement(MenuRow, args)
    ),
};

export const CanvasSelectionOverlayFamily = {
  name: "CanvasSelectionOverlay",
  args: {
    type: "standard",
    direction: "horizontal",
    width: 320,
    height: 140,
    showDimensions: true,
  },
  argTypes: {
    type: { control: "select", name: "Type", type: { required: true }, options: canvasOverlayTypes, table: { defaultValue: { summary: "standard" } } },
    direction: { control: "select", name: "Direction", options: ["horizontal", "vertical", "both"], table: { defaultValue: { summary: "horizontal" } } },
    width: { control: "number", name: "Width", table: { defaultValue: { summary: "320" } } },
    height: { control: "number", name: "Height", table: { defaultValue: { summary: "140" } } },
    showDimensions: { control: "boolean", name: "Show Dimensions", table: { defaultValue: { summary: "true" } } },
    // Public API documented for completeness (not interactive controls here).
    label: { name: "Label", control: false, description: "Optional overlay label (e.g. component/instance name).", table: { type: { summary: "string" } } },
  },
  render: (args) =>
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          width: `${args.width}px`,
          height: `${args.height}px`,
          background: "#f7f5f1",
        },
      },
      React.createElement(CanvasSelectionOverlay, args)
    ),
};
