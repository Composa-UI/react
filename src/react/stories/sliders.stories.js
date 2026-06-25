import React from "react";
import { Slider } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

export default {
  title: "Composa UI/Components/Base/Sliders",
  parameters: {
    docs: {
      description: {
        component:
          "Slider lets the user adjust a value continuously between a minimum and maximum by dragging a handle along a track. Variants: `range` (fill from left edge), `delta` (fill from center default tick), `stepper` (discrete ticks), `color` (track previews hue/opacity), `gradient` (chit stop handles), `cornerRadius`. A non-interactive `disabled` state is also supported. Minimum track width: 100px.",
      },
    },
  },
};

// Playground — shows all six variants in a vertical stack.
export const Playground = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 20, padding: "24px 32px" } },
      React.createElement(Slider, { label: "Position", variant: "range", value: 50 }),
      React.createElement(Slider, { label: "Exposure", variant: "delta", min: -100, max: 100, value: 30 }),
      React.createElement(Slider, { label: "Weight", variant: "stepper", steps: 7, value: 40 }),
      React.createElement(Slider, { label: "Hue", variant: "color", value: 60 }),
      React.createElement(Slider, { label: "Opacity", variant: "gradient", value: 75 }),
      React.createElement(Slider, { label: "Radius", variant: "cornerRadius", value: 33 }),
      React.createElement(Slider, { label: "Position", variant: "range", disabled: true, value: 0 })
    ),
};

// Anatomy — auto-derives every data-part present on the rendered Slider.
// The `anatomy` type emits one bracket per `data-part` element automatically;
// nothing is authored here beyond the root selector.
export const Anatomy = {
  render: () =>
    React.createElement(
      "div",
      { style: { padding: "32px 64px" } },
      React.createElement(Slider, { label: "Position", variant: "stepper", steps: 5, value: 50 })
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [{ type: "anatomy", target: ".composa-slider" }],
  },
};

// Color — track fill token and track background token (both derived by the renderer).
// Two slider instances side-by-side so we can annotate fill vs background separately.
export const Color = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 40, padding: "40px 40px 40px 112px" } },
      React.createElement("div", { className: "sl-filled" },
        React.createElement(Slider, { label: "Range fill", variant: "range", value: 60 })
      ),
      React.createElement("div", { className: "sl-empty" },
        React.createElement(Slider, { label: "Disabled (no fill)", variant: "range", disabled: true, value: 0 })
      )
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      // Fill color — the brand accent that grows from the left edge.
      {
        n: 1,
        target: ".sl-filled .composa-slider-fill",
        type: "token",
        kind: "color",
        prop: "background",
        marker: "pin",
        side: "top",
      },
      // Track background — the secondary surface the fill sits over.
      {
        n: 2,
        target: ".sl-filled .composa-slider-track",
        type: "token",
        kind: "color",
        prop: "background",
        marker: "pin",
        side: "bottom",
      },
      // Handle background — white fill from color.bg.
      {
        n: 3,
        target: ".sl-filled .composa-slider-handle",
        type: "token",
        kind: "color",
        prop: "background",
        marker: "pin",
        side: "top",
      },
    ],
  },
};

// Layout — track and handle dimension redlines (derived live from the DOM — no drift).
export const Layout = {
  render: () =>
    React.createElement(
      "div",
      { style: { padding: "40px 64px" } },
      React.createElement(Slider, { label: "Position", variant: "range", value: 50 })
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-slider", type: "redline", dimension: "width" },
      { n: 2, target: ".composa-slider", type: "redline", dimension: "height" },
      { n: 3, target: ".composa-slider-handle", type: "redline", dimension: "width" },
      { n: 4, target: ".composa-slider-handle", type: "redline", dimension: "height" },
      { n: 5, target: ".composa-slider-track", type: "radius", corner: "top-left" },
    ],
  },
};

// States — variant identity labels (top) across the five interactive states.
export const States = {
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(3, 240px)",
          gap: "52px 40px",
          padding: "64px 24px 32px 24px",
        },
      },
      React.createElement("div", { className: "st-default" },
        React.createElement(Slider, { label: "Default", variant: "range", value: 50 })
      ),
      React.createElement("div", { className: "st-focused" },
        React.createElement(Slider, { label: "Focused", variant: "range", value: 50, state: "focused" })
      ),
      React.createElement("div", { className: "st-disabled" },
        React.createElement(Slider, { label: "Disabled", variant: "range", value: 0, disabled: true })
      ),
      React.createElement("div", { className: "st-modified" },
        React.createElement(Slider, { label: "Modified", variant: "delta", min: -100, max: 100, value: 40 })
      ),
      React.createElement("div", { className: "st-mod-focus" },
        React.createElement(Slider, {
          label: "Focused + Modified",
          variant: "delta",
          min: -100,
          max: 100,
          value: 40,
          state: "focused",
        })
      )
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { target: ".st-default .composa-slider", type: "variant", marker: "caret", side: "top", value: "Default" },
      { target: ".st-focused .composa-slider", type: "variant", marker: "caret", side: "top", value: "Focused" },
      { target: ".st-disabled .composa-slider", type: "variant", marker: "caret", side: "top", value: "Disabled" },
      { target: ".st-modified .composa-slider", type: "variant", marker: "caret", side: "top", value: "Modified" },
      {
        target: ".st-mod-focus .composa-slider",
        type: "variant",
        marker: "caret",
        side: "top",
        value: "Focused + Modified",
      },
    ],
  },
};

// Variants — the six structural shapes laid out in a grid with caret labels.
export const Variants = {
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 240px)",
          gap: "52px 48px",
          padding: "64px 24px 32px 24px",
        },
      },
      React.createElement("div", { className: "vr-range" },
        React.createElement(Slider, { label: "Range", variant: "range", value: 50 })
      ),
      React.createElement("div", { className: "vr-delta" },
        React.createElement(Slider, { label: "Delta", variant: "delta", min: -100, max: 100, value: 40 })
      ),
      React.createElement("div", { className: "vr-stepper" },
        React.createElement(Slider, { label: "Stepper", variant: "stepper", steps: 7, value: 40 })
      ),
      React.createElement("div", { className: "vr-color" },
        React.createElement(Slider, { label: "Color", variant: "color", value: 60 })
      ),
      React.createElement("div", { className: "vr-gradient" },
        React.createElement(Slider, { label: "Gradient", variant: "gradient", value: 75 })
      ),
      React.createElement("div", { className: "vr-corner" },
        React.createElement(Slider, { label: "Corner Radius", variant: "cornerRadius", value: 33 })
      )
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { target: ".vr-range .composa-slider", type: "variant", marker: "caret", side: "top", value: "Range" },
      { target: ".vr-delta .composa-slider", type: "variant", marker: "caret", side: "top", value: "Delta" },
      { target: ".vr-stepper .composa-slider", type: "variant", marker: "caret", side: "top", value: "Stepper" },
      { target: ".vr-color .composa-slider", type: "variant", marker: "caret", side: "top", value: "Color" },
      { target: ".vr-gradient .composa-slider", type: "variant", marker: "caret", side: "top", value: "Gradient" },
      { target: ".vr-corner .composa-slider", type: "variant", marker: "caret", side: "top", value: "Corner Radius" },
    ],
  },
};

// Accessibility — slider exposes role="slider" with the full ARIA value contract.
export const Accessibility = {
  render: () =>
    React.createElement(
      "div",
      { style: { padding: "32px 64px" } },
      React.createElement(Slider, { label: "Position", variant: "range", value: 50 })
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-slider",
        marker: "pin",
        side: "top",
        type: "form-element",
        control: '<div role="slider"',
        controlLabel: "the `label` prop (aria-label)",
        tier: { priority: "mandatory", difficulty: "easy" },
        keyboard: [
          { keys: "Arrow keys", result: "adjust value along the track" },
          { keys: "Home / End", result: "jump to minimum / maximum" },
          { keys: "Tab", result: "move focus to the handle" },
        ],
      },
    ],
  },
};
