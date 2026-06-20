import React from "react";
import { fn } from "storybook/test";
import { TypographyDialog, TypeStyleMenu, FontsPickerMenu, OverlayHost } from "../../story-runtime.js";

const stage = (story) =>
  React.createElement(
    OverlayHost,
    { className: "storybook-composa-inspector-stage" },
    React.createElement(
      "div",
      { className: "storybook-composa-inspector-rail" },
      React.createElement(
        "div",
        { style: { width: "100%", padding: "12px", boxSizing: "border-box" } },
        story
      )
    )
  );

const menuStage = (story) =>
  React.createElement(
    OverlayHost,
    { className: "storybook-composa-inspector-stage" },
    React.createElement("div", { style: { padding: "24px" } }, story)
  );

export default {
  title: "Composa UI/Components/Modules/Inspector/TypographyDialog",
  component: TypographyDialog,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "TypographyDialog is the full text panel from Figma 99:5566. The header hosts Basics / Details / Variable tabs; under it a Preview specimen box. Basics: font family (opening the dedicated Fonts picker, 99:1337), font style, size / line-height / letter-spacing, then two divided control sections — Alignment, Decoration, Case, then Vertical trim, List style, Paragraph spacing, and Truncate. Details (99:9688): eight scrolling OpenType fieldsets of dash/check feature toggles plus Case, Numbers, and Paragraph indent controls. Variable: Slant (continuous) and Weight (stepped) variable-font axis sliders. Controls are icon SegmentedControls (with Ag/AG/ag specimen segments for case and vertical trim). The font-family trigger opens FontsPickerMenu; the type-style picker (TypeStyleMenu, 99:4077) leads each style with an Ag specimen and reveals an edit/filter affordance on the active row.",
      },
    },
  },
  args: {
    tab: "basics",
    fontFamily: "Inter",
    fontStyle: "Regular",
    fontSize: "16",
    lineHeight: "Auto",
    letterSpacing: "0",
    align: "left",
    decoration: "none",
    textCase: "none",
    verticalTrim: "standard",
    listStyle: "none",
    paragraphSpacing: "0",
    truncate: "none",
    previewText: "Preview",
    slant: "0",
    weight: "500",
    details: {},
    onTabChange: fn(),
    onFontFamilyChange: fn(),
    onFontStyleChange: fn(),
    onFontSizeChange: fn(),
    onLineHeightChange: fn(),
    onLetterSpacingChange: fn(),
    onAlignChange: fn(),
    onDecorationChange: fn(),
    onCaseChange: fn(),
    onVerticalTrimChange: fn(),
    onListStyleChange: fn(),
    onParagraphSpacingChange: fn(),
    onTruncateChange: fn(),
    onTypeStyleChange: fn(),
    onSlantChange: fn(),
    onWeightChange: fn(),
    onDetailChange: fn(),
    onClose: fn(),
  },
  argTypes: {
    tab: { control: "select", options: ["basics", "details", "variable"], description: "Active panel tab." },
    fontFamily: { control: "text", description: "Font family shown in the family trigger and Preview." },
    fontStyle: { control: "text", description: "Selected font style/weight." },
    fontSize: { control: "text", description: "Font size value." },
    lineHeight: { control: "text", description: "Line height value (Auto or a number)." },
    letterSpacing: { control: "text", description: "Letter spacing value." },
    align: { control: "select", options: ["left", "center", "right", "justify"], description: "Paragraph alignment." },
    decoration: { control: "select", options: ["none", "underline", "strikethrough"], description: "Text decoration." },
    textCase: { control: "select", options: ["none", "upper", "lower", "title", "small-caps"], description: "Letter case." },
    verticalTrim: { control: "select", options: ["standard", "cap-height"], description: "Vertical trim." },
    listStyle: { control: "select", options: ["none", "bulleted", "numbered"], description: "List style." },
    paragraphSpacing: { control: "text", description: "Paragraph spacing value." },
    truncate: { control: "select", options: ["none", "truncate"], description: "Truncate text." },
    previewText: { control: "text", description: "Specimen text shown in the Preview box." },
    slant: { control: "text", description: "Variable tab: Slant axis value (degrees)." },
    weight: { control: "text", description: "Variable tab: Weight axis value (100..900)." },
    details: { control: "object", description: "Details tab: OpenType feature values keyed by feature id." },
  },
};

export const FloatingOverRail = {
  render: (args) => stage(React.createElement(TypographyDialog, args)),
  parameters: {
    docs: {
      description: {
        story: "The typography dialog floating beside the inspector rail over an overflow stage.",
      },
    },
  },
};

export const Basics = {
  args: { tab: "basics" },
  render: (args) => React.createElement(TypographyDialog, args),
  parameters: {
    docs: { description: { story: "The Basics tab: preview, family/style/metrics, and the alignment/decoration/case/trim/list/paragraph/truncate controls." } },
  },
};

export const DetailsTab = {
  args: { tab: "details" },
  render: (args) => React.createElement(TypographyDialog, args),
  parameters: {
    docs: { description: { story: "The Details tab (Figma 99:9688): eight OpenType feature fieldsets — Indentation, Letter case, Numbers, Letterforms, Stylistic sets, Character variants, Horizontal spacing, More features. Each feature is a dash/check toggle; Case reuses the Basics specimen segment, Numbers Style/Position are multi-icon segments, and Paragraph indent is a numeric field. The body scrolls past the dialog frame." } },
  },
};

export const DetailsTabEngaged = {
  args: {
    tab: "details",
    details: {
      hangingPunctuation: "on",
      paragraphIndent: "16",
      case: "title",
      slashedZero: "on",
      numberStyle: "tabular",
      rareLigatures: "on",
      contextualAlternates: "on",
      stylisticAlternates: "on",
      kerningPairs: "on",
    },
  },
  render: (args) => React.createElement(TypographyDialog, args),
  parameters: {
    docs: { description: { story: "The Details tab with several OpenType features engaged, showing the on (check) state and a non-default numeric indent / figure style." } },
  },
};

export const VariableTab = {
  args: { tab: "variable", slant: "0", weight: "500" },
  render: (args) => React.createElement(TypographyDialog, args),
  parameters: {
    docs: { description: { story: "The Variable tab: variable-font axis sliders. Slant is a continuous track (blue fill + white thumb); Weight is a stepped track with one stop dot per 100 (100..900), active stops highlighted. Each axis is wired controlled via value + onChange." } },
  },
};

export const VariableTabAdjusted = {
  args: { tab: "variable", slant: "-8", weight: "700" },
  render: (args) => React.createElement(TypographyDialog, args),
  parameters: {
    docs: { description: { story: "The Variable tab with a negative Slant and a 700 Weight, showing the thumb positions and the highlighted Weight stops up to the active value." } },
  },
};

export const HeavyHeading = {
  args: {
    fontFamily: "Playfair Display",
    fontStyle: "Bold",
    fontSize: "48",
    lineHeight: "56",
    align: "center",
    textCase: "upper",
    decoration: "underline",
    listStyle: "bulleted",
    truncate: "truncate",
    previewText: "Ag",
  },
  render: (args) => React.createElement(TypographyDialog, args),
  parameters: {
    docs: { description: { story: "A heavy display heading with every control set away from its default segment." } },
  },
};

export const FontsPickerOpen = {
  args: { tab: "basics" },
  render: (args) => {
    function OpenedDialog(props) {
      const ref = React.useRef(null);
      React.useEffect(() => {
        const trigger = ref.current?.querySelector(".composa-typography-family-trigger");
        if (trigger && trigger.getAttribute("aria-expanded") !== "true") trigger.click();
      }, []);
      return React.createElement("div", { ref }, React.createElement(TypographyDialog, props));
    }
    return stage(React.createElement(OpenedDialog, args));
  },
  parameters: {
    docs: {
      description: {
        story: "The dialog with the Fonts picker (99:1337) opened from the family trigger: search, an All fonts source dropdown, and a font list where each family renders in its own face.",
      },
    },
  },
};

export const TypeStylePicker = {
  render: () =>
    menuStage(
      React.createElement(TypeStyleMenu, {
        selected: "m3-display-large",
        onSelect: fn(),
        onEdit: fn(),
        onClose: fn(),
      })
    ),
  parameters: {
    docs: {
      description: {
        story: "TypeStyleMenu (Figma 99:4077): the Text styles picker. Each row leads with an Ag specimen, shows the style label and size/line-height meta, and reveals an edit/filter affordance on the selected or hovered row.",
      },
    },
  },
};

export const FontsPicker = {
  render: () =>
    menuStage(
      React.createElement(FontsPickerMenu, {
        selected: "Inter",
        onSelect: fn(),
        onClose: fn(),
        onApplyVariable: fn(),
      })
    ),
  parameters: {
    docs: {
      description: {
        story: "FontsPickerMenu (Figma 99:1337) on its own: header with apply-variable + close, a clearable search, an All fonts source dropdown, and font rows each rendered in their own face.",
      },
    },
  },
};
