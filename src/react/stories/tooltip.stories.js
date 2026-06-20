import { TooltipFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Components/Base/Overlays/Tooltip",
  parameters: {
    docs: {
      description: {
        component:
          "Tooltip is a small dark bubble that labels a control on hover or focus. Use it to name an icon-only control, show a keyboard shortcut, or give a one-line hint; keep the content to a short phrase. It is presentational and passive: it does not position itself, manage hover state, or portal, so the caller owns placement and visibility. A tooltip is a hint, not a replacement for an accessible name, so set the trigger's own label too.",
      },
    },
  },
};

export const Playground = TooltipFamily;
