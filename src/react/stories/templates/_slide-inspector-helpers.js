// Template-layer slide inspector compositions.
// SlideInspector is the right panel when a slide (not a layer) is selected
// in Slides Editor. It owns the Design / Animate tab state and conditionally
// renders either the slide Design panel or the AnimatePanel.
// None of these are factory components or part of the published package.
import React from "react";
import {
  InspectorHeader,
  EditingInspector,
  Header,
  Dropdown,
  NumericInput,
} from "../story-runtime.js";

// TemplateStyleSection — slide theme row shown in the Design tab above Fill.
// Displays theme color swatches, theme name, and font family pair.
// Matches the 'Template style' section in the Figma Slides Default template
// (node 2723:238794, file 4kilp0ShQiYsoUPJdleqEH).
export function TemplateStyleSection({
  themeName,
  fonts,
  colors,
}) {
  var name = themeName || "Radicle";
  var fontPair = fonts || "Whyte Inktrap, Inter";
  var swatches = colors || ["#000000", "#ff5c16", "#ffffff", "#f5e642"];

  return React.createElement(
    "div",
    { "data-part": "template-style-section" },
    React.createElement(Header, {
      title: "Template style",
      level: 3,
      hierarchy: "property",
    }),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "var(--composa-space-2, 8px)",
          padding: "var(--composa-space-1, 4px) var(--composa-space-2, 8px) var(--composa-space-2, 8px)",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            borderRadius: "var(--composa-radius-small, 2px)",
            overflow: "hidden",
            flexShrink: 0,
            border: "1px solid var(--composa-color-border)",
          },
        },
        ...swatches.map(function (c, i) {
          return React.createElement("div", {
            key: String(i),
            style: { width: 10, height: 20, background: c },
          });
        })
      ),
      React.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.createElement(
          "div",
          {
            style: {
              fontSize: "var(--composa-body-medium-size, 11px)",
              color: "var(--composa-color-text)",
              fontFamily: "var(--composa-font-family)",
              fontWeight: 500,
              lineHeight: "1.4",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          },
          name
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: "var(--composa-body-small-size, 10px)",
              color: "var(--composa-color-text-secondary)",
              fontFamily: "var(--composa-font-family)",
              lineHeight: "1.4",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          },
          fontPair
        )
      )
    )
  );
}

// AnimatePanel — slide-to-slide transition settings shown when the Animate tab
// is active. Controls match the Figma Animate template right sidebar
// (node 2723:240665): Animation type, Curve, Duration, Trigger.
export function AnimatePanel({
  slideTitle,
  animation,
  curve,
  duration,
  trigger,
  onAnimationChange,
  onCurveChange,
  onDurationChange,
  onTriggerChange,
  onApplyToAll,
}) {
  var title = slideTitle || "Slide 1";
  var animValue = animation || "smart-animate";
  var curveValue = curve || "ease-in";
  var durationValue = duration != null ? duration : 300;
  var triggerValue = trigger || "on-click";

  var ANIMATION_OPTIONS = [
    { value: "none", label: "None" },
    { value: "smart-animate", label: "Smart animate" },
    { value: "dissolve", label: "Dissolve" },
    { value: "move-in", label: "Move in" },
    { value: "slide-in", label: "Slide in" },
    { value: "push", label: "Push" },
  ];
  var CURVE_OPTIONS = [
    { value: "linear", label: "Linear" },
    { value: "ease-in", label: "Ease in" },
    { value: "ease-out", label: "Ease out" },
    { value: "ease-in-out", label: "Ease in & out" },
    { value: "custom", label: "Custom…" },
  ];
  var TRIGGER_OPTIONS = [
    { value: "on-click", label: "On click" },
    { value: "after-delay", label: "After delay" },
    { value: "on-drag", label: "On drag" },
  ];

  var animLabel = (ANIMATION_OPTIONS.find(function (o) { return o.value === animValue; }) || {}).label || animValue;
  var curveLabel = (CURVE_OPTIONS.find(function (o) { return o.value === curveValue; }) || {}).label || curveValue;
  var triggerLabel = (TRIGGER_OPTIONS.find(function (o) { return o.value === triggerValue; }) || {}).label || triggerValue;

  return React.createElement(
    "div",
    { "data-part": "animate-panel", style: { display: "flex", flexDirection: "column" } },
    React.createElement(Header, { title: title, level: 3, hierarchy: "layer" }),
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gap: "var(--composa-space-1, 4px)",
          padding: "var(--composa-space-1, 4px) var(--composa-space-2, 8px)",
        },
      },
      React.createElement(Dropdown, {
        label: "Animation",
        value: animLabel,
        options: ANIMATION_OPTIONS,
        onChange: onAnimationChange,
      }),
      React.createElement(Dropdown, {
        label: "Curve",
        value: curveLabel,
        options: CURVE_OPTIONS,
        onChange: onCurveChange,
      }),
      React.createElement(NumericInput, {
        label: "Duration",
        value: durationValue,
        unit: "ms",
        min: 0,
        max: 10000,
        step: 100,
        onChange: onDurationChange,
      }),
      React.createElement(Dropdown, {
        label: "Trigger",
        value: triggerLabel,
        options: TRIGGER_OPTIONS,
        onChange: onTriggerChange,
      })
    ),
    React.createElement(
      "div",
      {
        style: {
          margin: "var(--composa-space-2, 8px)",
          height: 72,
          background: "var(--composa-color-bg-secondary)",
          borderRadius: "var(--composa-radius-medium, 5px)",
          border: "1px solid var(--composa-color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        },
      },
      React.createElement(
        "span",
        {
          style: {
            fontSize: "var(--composa-body-small-size, 10px)",
            color: "var(--composa-color-text-secondary)",
            fontFamily: "var(--composa-font-family)",
          },
        },
        "Preview"
      )
    ),
    React.createElement(
      "button",
      {
        style: {
          display: "block",
          width: "100%",
          padding: "var(--composa-space-2, 8px)",
          background: "none",
          border: "none",
          borderTop: "1px solid var(--composa-color-border)",
          textAlign: "center",
          fontSize: "var(--composa-body-medium-size, 11px)",
          color: "var(--composa-color-text)",
          fontFamily: "var(--composa-font-family)",
          cursor: "pointer",
        },
        onClick: onApplyToAll,
      },
      "Apply to all slides"
    )
  );
}

// SlideInspector — right panel slot for SlidesEditorTemplate when a slide is
// selected. Owns the Design / Animate tab state via React.useState.
//
// initialTab — which tab to start on (default "design"). Used by AnimateView
// story to open directly on the Animate tab.
//
// Design tab: TemplateStyleSection + EditingInspector (showInspectorHeader: false).
// Animate tab: AnimatePanel with transition controls.
// Wrap in OverlayHost in the parent slot so Dropdown menus portal correctly.
export function SlideInspector({
  slideTitle,
  templateStyle,
  selectionColors,
  layoutMode,
  animateProps,
  initialTab,
}) {
  var tabState = React.useState(initialTab || "design");
  var tab = tabState[0];
  var setTab = tabState[1];

  var title = slideTitle || "Slide 1";
  var mode = layoutMode || "frame";
  var colors = selectionColors || [];

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(InspectorHeader, {
      selectedTab: tab,
      onTabChange: setTab,
    }),
    tab === "design"
      ? React.createElement(
          React.Fragment,
          null,
          React.createElement(TemplateStyleSection, templateStyle || {}),
          React.createElement(EditingInspector, {
            layerTitle: title,
            layoutMode: mode,
            selectionColors: colors,
            showInspectorHeader: false,
            showLayerHeader: true,
          })
        )
      : React.createElement(
          AnimatePanel,
          Object.assign({ slideTitle: title }, animateProps || {})
        )
  );
}
