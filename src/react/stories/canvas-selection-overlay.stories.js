import { CanvasSelectionOverlayFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Components/Base/CanvasSelectionOverlay",
  parameters: {
    docs: {
      description: {
        component:
          "CanvasSelectionOverlay draws the selection chrome over a layer on a canvas: the bounding outline, corner handles, a size badge, a type name, and smart-selection and auto-layout cues. The `type` prop picks the layer kind, which sets the accent color and which extras appear. It is decorative only: it renders `aria-hidden`, ignores pointer events, and does no hit-testing or resizing. Wrap it in a `position: relative` parent sized to the layer; the host canvas owns geometry and interaction.",
      },
    },
  },
};

export const Playground = CanvasSelectionOverlayFamily;
