export const figmaLibraries = {
  ui3: {
    name: "UI3: Figma's UI Kit (Community)",
    fileKey: "4kilp0ShQiYsoUPJdleqEH",
    libraryKey:
      "lk-dee9f0a64468ca432655aeea169c4df2d6487d06b641f884035a053d2c3c5d671cca9202b5dde04576f9daaa2cca6ae9981ff40c3466df8b0589e17e761880ae",
    role: "primary",
  },
  ui2Community: {
    name: "UI2: Figma's Design System (Community)",
    fileKey: "uKsUypDbWE5Wbxmk7koRa3",
    libraryKey:
      "lk-842b421945829d2533bb3ad174da5d1aac12a182dbfa5f427bd87041a47014f0bf48245bdb7196f11908b7adace86bec1995879d4e71ad52b6be088b073d579b",
    role: "historical",
  },
  ui2Copy: {
    name: "UI2: Figma's Design System (Copy)",
    fileKey: "cbX5pzBo8cL0e8GE0UtKDh",
    libraryKey:
      "lk-46de1dbbb9dea01b43941da5ae8e233299587b964e743bec241a3b4b2211b075e7577d1673b69049d877c9f6b45a131c7eac82ef4bdf599d27d555e18ad898d2",
    role: "fallback",
  },
};

export const figmaComponentRegistry = {
  WorkbenchShell: {
    figma: ["@ slides.template"],
    code: "WorkbenchShell",
    status: "implemented",
  },
  Panel: {
    figma: ["slides.sidebar.left", "slides.sidebar.right"],
    code: "Panel",
    status: "implemented",
  },
  IconButton: {
    figma: ["Button icon", "Button icon toggle", "Button icon dialog toggle", "_toolbar.button", "_toolbelt.button.v2"],
    componentKeys: {
      icon: "b7e9cc243ccae745eadff33c3b52e48d7742b563",
      toggle: "03e4f29cca1d229597f6928e3be5dbceb2a79dc1",
      dialogToggle: "e5407d20a1d355008218d33f6504edd30aaf9a3d",
    },
    variantAxes: ["state: default/hover/active/focused", "context: default/on-selected", "disabled"],
    code: "IconButton",
    status: "variant-matrix",
  },
  Button: {
    figma: ["Button", "Button icon", "Button toggle", "Button toggle split", "node 2012:46721"],
    componentKeys: {
      button: "f7de0805266e001123fb3e2ec254b0643ea42caa",
      icon: "b7e9cc243ccae745eadff33c3b52e48d7742b563",
    },
    variantAxes: ["variant", "size", "state", "disabled", "icon lead"],
    code: "Button",
    status: "variant-matrix",
  },
  ToggleButton: {
    figma: ["Button toggle", "node 2012:46721"],
    code: "ToggleButton",
    status: "implemented",
  },
  SplitButton: {
    figma: ["Button icon split", "Button toggle split", "node 2012:46721"],
    componentKeys: {
      iconSplit: "d7f54554ac05c4bb7c4529a276762c88431ae815",
    },
    variantAxes: ["state", "disabled"],
    code: "SplitButton",
    status: "variant-matrix",
  },
  MenuButton: {
    figma: ["menu trigger", "Figma menu"],
    code: "MenuButton",
    status: "implemented",
  },
  Menu: {
    figma: ["Menu", "Menu multi-select", "In-product examples", "node 2028:86486"],
    variantAxes: ["menu item state", "selected", "disabled", "destructive", "composition variant"],
    code: "Menu",
    status: "variant-matrix",
  },
  MenuMultiSelect: {
    figma: ["Menu multi-select", "Default", "Label Only", "Avatars", "Mixed Icons", "node 2028:86486"],
    variantAxes: ["variant: default/label-only/avatars/mixed-icons"],
    code: "MenuMultiSelect",
    status: "variant-matrix",
  },
  MenuExample: {
    figma: ["In-product examples", "node 2028:86486"],
    variantAxes: ["type: in-product/slides-toolbar/property-dropdown/context-menu"],
    code: "MenuExample",
    status: "variant-matrix",
  },
  MenuItem: {
    figma: ["Menu item", "node 2028:86486"],
    code: "MenuItem",
    status: "implemented",
  },
  MenuRow: {
    figma: [
      "Menu row/Simple",
      "Menu row/Complex",
      "Menu row/Checkmark",
      "Menu row/Toggle",
      "Menu row/Toolbar",
      "Menu row/Heading",
      "Menu row/Divider",
      "Menu row/Expand",
      "Menu row/Footer",
      "node 2028:86486",
    ],
    variantAxes: ["type", "state", "submenu", "lead", "trail", "toggle state", "expanded", "alignment"],
    code: "MenuRow",
    status: "variant-matrix",
  },
  InputField: {
    figma: ["Text input", "Numeric input", "Numeric input multi", "Color input", "Combo input", "Chit input", "node 2028:75376"],
    componentKeys: {
      combo: "7f2e18f7e734444c627f685d267d6f64cf0a2f6d",
      text: "5c603007626c89107cf974560ce7bae9ec8ce52a",
      color: "4566e7e594c3fd93de9ff6cdc2555df6fc1abdfe",
      numeric: "a04cf9ee178394e1e64632ab78befb20142af5a1",
      numericMulti: "1ebd0a34c392054de99ac8bf0933e9a2f9428014",
    },
    variantAxes: ["variant", "size", "state", "icon lead", "dropdown", "variable", "disabled"],
    code: "InputField",
    status: "variant-matrix",
  },
  TextInput: {
    figma: ["Text input", "node 2028:79255"],
    componentKeys: {
      text: "5c603007626c89107cf974560ce7bae9ec8ce52a",
    },
    variantAxes: ["variant: single-line/multi-line/quick-action", "size: default/large", "state", "icon lead", "dropdown", "disabled"],
    code: "InputField",
    status: "variant-matrix",
  },
  NumericInput: {
    figma: ["Numeric input", "node 2028:79190"],
    componentKeys: {
      numeric: "a04cf9ee178394e1e64632ab78befb20142af5a1",
    },
    variantAxes: ["state", "var icon", "var pill", "dropdown", "disabled"],
    code: "NumericInput",
    status: "variant-matrix",
  },
  NumericInputMulti: {
    figma: ["Numeric input multi", "node 2028:79619"],
    componentKeys: {
      numericMulti: "1ebd0a34c392054de99ac8bf0933e9a2f9428014",
    },
    variantAxes: ["state", "partial disable", "disabled"],
    code: "NumericInputMulti",
    status: "variant-matrix",
  },
  ColorInput: {
    figma: ["Color input", "node 2028:79525"],
    componentKeys: {
      color: "4566e7e594c3fd93de9ff6cdc2555df6fc1abdfe",
    },
    variantAxes: ["type: fill/opacity/image/gradient/variable", "state: default/focus/disabled"],
    code: "ColorInput",
    status: "variant-matrix",
  },
  ComboInput: {
    figma: ["Combo input", "node 2028:79408"],
    componentKeys: {
      combo: "7f2e18f7e734444c627f685d267d6f64cf0a2f6d",
    },
    variantAxes: ["state", "icon lead", "variable", "dropdown state via _Combo input dropdown"],
    code: "ComboInput",
    status: "variant-matrix",
  },
  ChitInput: {
    figma: ["_Chit input", "node 2028:79847"],
    variantAxes: ["state", "close button"],
    code: "ChitInput",
    status: "variant-matrix",
  },
  ChipVariable: {
    figma: ["_Chip variable", "node 2028:79753"],
    variantAxes: ["state"],
    code: "ChipVariable",
    status: "variant-matrix",
  },
  Chit: {
    figma: ["_Chit 24", "_Chit 48", "nodes 2028:79673, 2028:79770"],
    variantAxes: ["size", "variant", "type"],
    code: "Chit",
    status: "variant-matrix",
  },
  ComboInputDropdown: {
    figma: ["_Combo input dropdown", "node 2028:79874"],
    variantAxes: ["state"],
    code: "ComboInputDropdown",
    status: "variant-matrix",
  },
  Dropdown: {
    figma: ["Dropdown", "node 2028:36589"],
    componentKeys: {
      dropdown: "728ddf9daf16adc02975b2b8d5762ee1684e9fd1",
    },
    variantAxes: ["size", "state", "disabled", "stroke", "icon lead"],
    code: "Dropdown",
    status: "variant-matrix",
  },
  Switch: {
    figma: ["Switch", "node 2015:24697"],
    variantAxes: ["size", "state", "checked", "disabled"],
    code: "Switch",
    status: "local-readiness",
  },
  Radio: {
    figma: ["Radio", "node 2015:20365"],
    variantAxes: ["state", "checked", "disabled"],
    code: "Radio",
    status: "local-readiness",
  },
  Checkbox: {
    figma: ["Checkbox", "node 2012:55461"],
    variantAxes: ["state", "checked: unchecked/checked/mixed", "disabled"],
    code: "Checkbox",
    status: "local-readiness",
  },
  Tooltip: {
    figma: ["Tooltip", "node 2015:32842"],
    variantAxes: ["placement", "tone"],
    code: "Tooltip",
    status: "local-readiness",
  },
  Dialog: {
    // The previous anchor (node 2327:122027) resolved to a 400x40 "Variant=Default" atom,
    // not a modal. The real UI3 modal is a composite of published component sets
    // (Modal header / Modal body / Modal footer) assembled into size templates
    // (Templates/320 Basic+Advanced, Templates/480 Embed/Create Project/Create Team/Sharing),
    // located via search_design_system in the UI3 library (fileKey 4kilp0ShQiYsoUPJdleqEH).
    figma: ["Modal header", "Modal body/Row", "Modal body/Input", "Modal footer", "Templates/320", "Templates/480"],
    componentKeys: {
      modalHeader: "74660ec89b32ce349cd41e6bc4a62b512c1241a1",
      modalBodyRow: "15a19007abbac5646ca017d2215a582b15d44063",
      modalBodyInput: "f04e916ef33342876d961c01e679674d3392958c",
      modalFooter: "6637886303b456f8c5888202dff4d0e666725016",
      template320Basic: "b952d5f98a4b5603c2d8444d004fc5e207d222c6",
      template320Advanced: "60ff72ec2e62d2f2f54cd6293ad48563339b30ec",
      template480Embed: "8d3eb67be432498ce121c163a030f83d8824b24f",
      template480CreateProject: "e15bbffa8c46526050ba62f7b997d1c644043428",
      template480CreateTeam: "2e50bfd07ddc90f76e4e0e28c9ff37a11801991d",
      template480Sharing: "f598a6d25275a6194e9fa8441bc523cb3042f592",
    },
    variantAxes: ["size: 320/480", "template: basic/advanced/embed/create-project/create-team/sharing", "header", "body", "footer"],
    code: "Dialog",
    status: "variant-matrix",
  },
  SegmentedControl: {
    figma: ["segmented control", "node 2015:20960"],
    componentKeys: {
      segmentedControl: "8cd670750e0419c181baf6bc9d1b545da5bef1b6",
    },
    variantAxes: ["variant: icon/label", "tab count: 02-06", "state: default/disabled"],
    code: "SegmentedControl",
    status: "variant-matrix",
  },
  SegmentedPicker: {
    figma: ["segmented picker", "node 2015:20960"],
    code: "SegmentedPicker",
    status: "implemented",
  },
  Tabs: {
    figma: ["tabs__tabStrip", "node 2015:25519"],
    variantAxes: ["tab count: 1-4", "variant", "size", "state"],
    code: "Tabs",
    status: "variant-matrix",
  },
  Tab: {
    figma: ["_Tab", "node 2015:27758"],
    variantAxes: ["single tab", "selected", "state: default/focused/hover"],
    code: "Tab",
    status: "variant-matrix",
  },
  Header: {
    figma: ["Layer header", "Property header"],
    code: "Header",
    status: "implemented",
  },
  HeaderActions: {
    figma: ["Header icon group"],
    code: "HeaderActions",
    status: "implemented",
  },
  SlideRail: {
    figma: ["_slides.list.item", "ThumbnailItem"],
    code: "SlideRail",
    status: "implemented",
  },
  SlideThumbnail: {
    figma: ["ThumbnailItem"],
    code: "SlideThumbnail",
    status: "implemented",
  },
  LayerTree: {
    figma: ["Sidebar row layer"],
    ui2Community: [
      {
        name: "Layer list row",
        componentKey: "73b2067cf2c699fea6774afabeefa321b2f23b66",
      },
      {
        name: "Layer list row - SEL",
        componentKey: "52d2bf558886c7999bd4460d06095368c7b54485",
      },
    ],
    code: "LayerTree",
    status: "implemented",
  },
  TreeRow: {
    figma: ["TreeRow", "Layer list row"],
    code: "TreeRow",
    status: "implemented",
  },
  FloatingToolbar: {
    figma: ["Slide-Toolbelt", "Tools", "_toolbelt.button.v2"],
    code: "FloatingToolbar",
    status: "implemented",
  },
  CanvasFrame: {
    figma: ["canvas", "Viewport"],
    code: "CanvasFrame",
    status: "implemented",
  },
  CanvasSelectionOverlay: {
    figma: ["Selection bounds / Standard", "Selection bounds / Component", "Selection bounds / Instance", "Selection bounds / Auto Layout frame"],
    ui2Community: [
      {
        name: "Canvas decorations",
        nodeId: "0:20495",
      },
    ],
    code: "CanvasSelectionOverlay",
    status: "implemented",
  },
  Inspector: {
    figma: ["slides.sidebar.right"],
    code: "Inspector",
    status: "implemented",
  },
  InspectorSection: {
    figma: ["PropertyRow", "ControlGroup"],
    code: "InspectorSection",
    status: "implemented",
  },
  PropertyRow: {
    figma: ["PropertyRow"],
    code: "PropertyRow",
    status: "implemented",
  },
};

export const firstPassComponentSet = Object.keys(figmaComponentRegistry);
