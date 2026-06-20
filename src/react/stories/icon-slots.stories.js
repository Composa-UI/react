import React from "react";
import { Button, IconButton } from "../story-runtime.js";

import "../../../design/tokens.css";
import "../../../styles.css";

const h = React.createElement;

// Stand-in for a Lucide / React Icons component: any component that returns an
// <svg> with stroke="currentColor". Composa renders it directly in an icon slot,
// so it inherits the component's 16px box and color with no extra wiring.
function PlusIcon(props) {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
    },
    h("path", { d: "M12 5v14M5 12h14" })
  );
}

// Recommended content-icon pattern: a Material Symbols glyph (rounded, the same
// family as the built-in structural glyphs). Material Symbols are
// FILLED and use viewBox="0 -960 960 960"; in a slot it inherits the 16px box and color.
// This `home` path is Material Symbols rounded, weight 300 (Apache-2.0).
function MaterialHomeIcon(props) {
  return h(
    "svg",
    { viewBox: "0 -960 960 960", fill: "currentColor", ...props },
    h("path", {
      d: "M225.39-185.39h155.76v-216.15q0-12.26 8.3-20.55 8.29-8.29 20.55-8.29h140q12.26 0 20.55 8.29 8.3 8.29 8.3 20.55v216.15h155.76v-375.89q0-3.08-1.34-5.58-1.35-2.5-3.66-4.42l-242.3-182.18q-3.08-2.31-7.31-2.31-4.23 0-7.31 2.31l-242.3 182.18q-2.31 1.92-3.66 4.42-1.34 2.5-1.34 5.58v375.89Zm-45.39 0v-375.76q0-13.96 5.94-26.04 5.95-12.08 17.29-20.04l242.31-182.69q14.79-11.62 34.24-11.62 19.45 0 34.68 11.62l242.31 182.69q11.34 7.96 17.29 20.04 5.94 12.08 5.94 26.04v375.76q0 18.51-13.44 31.95Q753.12-140 734.61-140h-172.3q-12.26 0-20.55-8.29-8.3-8.3-8.3-20.56V-385H426.54v216.15q0 12.26-8.3 20.56-8.29 8.29-20.55 8.29h-172.3q-18.51 0-31.95-13.44Q180-166.88 180-185.39Zm300-286.07Z",
    })
  );
}

// An already-rendered element passed as a slot.
const circleNode = h(
  "svg",
  { viewBox: "0 0 24 24", fill: "currentColor" },
  h("circle", { cx: 12, cy: 12, r: 7 })
);

function Row(label, control) {
  return h(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "220px auto",
        alignItems: "center",
        gap: "16px",
      },
    },
    h("code", { style: { fontSize: "12px", opacity: 0.8 } }, label),
    control
  );
}

export default {
  title: "Composa UI/Foundations/Icon Slots",
  parameters: {
    docs: {
      description: {
        component:
          "Components accept icons as slots. Pass a component type or a rendered node from any icon library. The built-in structural glyphs (chevrons, check, close, etc.) are Material Symbols embedded as fallback paths. For content icons we recommend the self-hosted @composa-ui/icons Material Symbols runtime so fill, weight, grade, and optical size stay adjustable; the current runtime default is rounded weight 200. String names are supported for backward compatibility and resolve to a built-in glyph or the injected renderer.",
      },
    },
  },
};

export const Slots = () =>
  h(
    "div",
    { style: { display: "grid", gap: "20px", padding: "8px" } },
    Row(
      "icon={PlusIcon}  (component type)",
      h(Button, { label: "Add", iconLead: true, icon: PlusIcon })
    ),
    Row(
      "icon={<svg…/>}  (rendered node)",
      h(Button, { label: "Select", iconLead: true, icon: circleNode })
    ),
    Row(
      "icon={PlusIcon}  (IconButton)",
      h(IconButton, { label: "Add", icon: PlusIcon })
    ),
    Row(
      'icon="chevronDown"  (built-in glyph, string)',
      h(Button, { label: "Sort", iconLead: true, icon: "chevronDown" })
    ),
    Row(
      "icon={MaterialHomeIcon}  (recommended: Material Symbols)",
      h(Button, { label: "Home", iconLead: true, icon: MaterialHomeIcon })
    )
  );

Slots.storyName = "Icon slots";
