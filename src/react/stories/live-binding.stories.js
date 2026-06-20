import React from "react";
import { PositionSection, OverlayHost } from "../story-runtime.js";

// LIVE-BINDING REFERENCE
// ----------------------
// Every other story uses fn() stubs and sample data, so they show LAYOUT but
// never two-way binding. This story shows the real loop a consumer must build:
//
//   selection  ->  section value IN  ->  onChange OUT  ->  model mutation  ->  re-render
//
// A single layer object is the model. PositionSection (a CONTROLLABLE primitive)
// reads its x/y/alignment from that model and writes back through its onChange
// callbacks. The live JSON panel proves the model actually moved — not a stub.

export default {
  title: "Composa UI/Patterns/Live binding",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The end-to-end consuming loop: a layer model drives a controllable inspector section, and the section's onChange callbacks mutate the model and re-render. This is the pattern the other stories' fn() stubs stand in for.",
      },
    },
  },
};

function LiveBindingDemo() {
  // 1. THE MODEL. A real selected layer, owned by the consumer (here, useState;
  //    in an app this is your store / reducer / document model).
  const [layer, setLayer] = React.useState({
    id: "layer-1",
    name: "Rectangle",
    x: "128",
    y: "446",
    alignment: { horizontal: "left", vertical: "top" },
    rotation: "0°",
  });

  // 2. onChange OUT -> MODEL MUTATION. The section calls these; we write the
  //    model. value IN (below) then flows back, so the section always reflects
  //    the model rather than any private internal state.
  const handlePositionChange = (axis, value) =>
    setLayer((prev) => ({ ...prev, [axis]: value }));

  const handleAlignmentChange = (direction, value) =>
    setLayer((prev) => ({ ...prev, alignment: { ...prev.alignment, [direction]: value } }));

  const handleRotationChange = (value) =>
    setLayer((prev) => ({ ...prev, rotation: value }));

  return React.createElement(
    OverlayHost,
    { style: { display: "flex", gap: 24, alignItems: "flex-start", padding: 24 } },
    [
      // The inspector rail at product width. value IN is read from the model.
      React.createElement(
        "div",
        {
          key: "rail",
          style: {
            width: 240,
            outline: "1px solid var(--composa-color-border)",
            background: "var(--composa-color-bg)",
          },
        },
        React.createElement(PositionSection, {
          title: "Position",
          // 3. value IN — straight from the model.
          position: { x: layer.x, y: layer.y },
          alignment: layer.alignment,
          rotation: layer.rotation,
          // onChange OUT — mutate the model.
          onPositionChange: handlePositionChange,
          onAlignmentChange: handleAlignmentChange,
          onRotationChange: handleRotationChange,
        })
      ),
      // 4. RE-RENDER proof. The live model. Edit X/Y or alignment on the left
      //    and watch this object change — the section is genuinely two-way bound.
      React.createElement(
        "pre",
        {
          key: "model",
          style: {
            margin: 0,
            padding: 12,
            minWidth: 220,
            fontSize: 12,
            lineHeight: 1.5,
            fontFamily: "monospace",
            background: "var(--composa-color-bg-secondary)",
            border: "1px solid var(--composa-color-border)",
            borderRadius: 6,
            color: "var(--composa-color-text)",
          },
        },
        JSON.stringify(layer, null, 2)
      ),
    ]
  );
}

export const SelectionToModel = {
  name: "Selection → value → onChange → model",
  render: () => React.createElement(LiveBindingDemo),
};
