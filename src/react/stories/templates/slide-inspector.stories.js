import React from "react";
import { fn } from "storybook/test";
import { OverlayHost } from "../../story-runtime.js";
import {
  TemplateStyleSection,
  AnimatePanel,
  SlideInspector,
} from "./_slide-inspector-helpers.js";

// Inspector rail stage — matches the pattern in editing-inspector.stories.js.
// OverlayHost is required so Dropdown menus and any other overlay surfaces
// portal correctly out of the scrollable rail.
var rail = function (story) {
  return React.createElement(
    OverlayHost,
    { className: "storybook-composa-inspector-stage" },
    React.createElement("div", { className: "storybook-composa-inspector-rail" }, story)
  );
};

var DEFAULT_TEMPLATE_STYLE = {
  themeName: "Radicle",
  fonts: "Whyte Inktrap, Inter",
  colors: ["#000000", "#ff5c16", "#ffffff", "#f5e642"],
};

var DEFAULT_SELECTION_COLORS = [
  { id: "ink", type: "Selection color", label: "Ink", value: "#111111", selectionCount: 1 },
  { id: "orange", type: "Selection color", label: "Orange", value: "#ff5c16", selectionCount: 1 },
];

var DEFAULT_ANIMATE_PROPS = {
  animation: "smart-animate",
  curve: "ease-in",
  duration: 300,
  trigger: "on-click",
  onAnimationChange: fn(),
  onCurveChange: fn(),
  onDurationChange: fn(),
  onTriggerChange: fn(),
  onApplyToAll: fn(),
};

export default {
  title: "Composa UI/Templates/Inspector/SlideInspector",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "SlideInspector is the right panel shown when a slide (not a layer within a slide) " +
          "is selected in Slides Editor. It is a template-layer composition — not a factory component.\n\n" +
          "It owns the Design / Animate tab state via useState and conditionally renders:\n" +
          "- **Design tab**: TemplateStyleSection (theme swatch + name + font pair) above " +
          "a stripped EditingInspector (showInspectorHeader: false, showLayerHeader: true).\n" +
          "- **Animate tab**: AnimatePanel with Animation / Curve / Duration / Trigger controls, " +
          "a preview placeholder, and an Apply to all slides row.\n\n" +
          "Figma reference: Default template node 2723:238794, Animate panel node 2723:240665 " +
          "(file 4kilp0ShQiYsoUPJdleqEH).",
      },
    },
  },
};

// SlideProperties — Design tab in isolation. TemplateStyleSection above the
// standard editing section stack with slide-level layer context.
export const SlideProperties = {
  render: function () {
    return rail(
      React.createElement(
        React.Fragment,
        null,
        React.createElement(TemplateStyleSection, DEFAULT_TEMPLATE_STYLE),
        React.createElement("div", {
          style: {
            borderTop: "1px solid var(--composa-color-border)",
            margin: "0 var(--composa-space-2, 8px)",
          },
        })
      )
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "TemplateStyleSection in isolation — the theme row that appears at the top of " +
          "the Design tab when a slide is selected. Shows color swatches, theme name, and font pair.",
      },
    },
  },
};

// AnimatePanelView — Animate tab content in isolation.
export const AnimatePanelView = {
  render: function () {
    return rail(React.createElement(AnimatePanel, DEFAULT_ANIMATE_PROPS));
  },
  parameters: {
    docs: {
      description: {
        story:
          "AnimatePanel in isolation — slide-to-slide transition controls matching the " +
          "Figma Animate template (node 2723:240665). Controls: Animation type (Smart animate, " +
          "None, Dissolve, Move in, Slide in, Push), Curve (ease variants + Custom), " +
          "Duration (ms), Trigger (On click, After delay, On drag).",
      },
    },
  },
};

// SlideInspectorDefault — full panel with tab switching. Starts on Design tab;
// click Animate to switch to the transition controls.
export const SlideInspectorDefault = {
  name: "SlideInspector (tab-switchable)",
  render: function () {
    return rail(
      React.createElement(SlideInspector, {
        slideTitle: "Slide 1",
        templateStyle: DEFAULT_TEMPLATE_STYLE,
        selectionColors: DEFAULT_SELECTION_COLORS,
        layoutMode: "frame",
        animateProps: DEFAULT_ANIMATE_PROPS,
      })
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Full SlideInspector with controlled tab switching. Click the Design / Animate " +
          "tabs in InspectorHeader to switch between the Template style + section stack " +
          "and the Animate transition controls.",
      },
    },
  },
};

// NativeSlide — slide without a template style applied (templateStyle omitted).
export const NoTemplateStyle = {
  name: "No template style",
  render: function () {
    return rail(
      React.createElement(SlideInspector, {
        slideTitle: "Slide 2",
        selectionColors: [],
        layoutMode: "frame",
        animateProps: DEFAULT_ANIMATE_PROPS,
      })
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Slide with no template style applied. TemplateStyleSection is omitted.",
      },
    },
  },
};
