# Product Mental Model

Figma to Video is a Figma Slides-inspired video workbench.

The core object is not a screenshot. It is a composition tree:

- A project contains slides.
- A slide contains one frame tree.
- A frame contains layers.
- Layers can be text, shape, image, auto-layout frame, or timeline-driven media.
- The slide rail, canvas, layer list, inspector, timeline, and future video renderer all read from this same model.
- AI chat writes proposed changes to the same model: adding layers, adjusting properties, or creating keyframes.
- The live canvas is a renderer of the model. It may start as DOM/CSS, then move to Canvas/WebGL/WebGPU when performance or playback complexity requires it.

## Step 1 Vertical Slice

The first working slice proves that the UI is not fake:

1. Selecting a slide changes the canvas.
2. Selecting a slide changes the layer list.
3. Selecting a layer changes the inspector.
4. Adding text inserts a real text layer into the selected slide.
5. Wrapping a layer in auto layout changes the model and canvas representation.

Timeline and video export should build on the same composition model rather than creating a separate state system.

## Renderer Boundary

The product should keep three concerns separate:

1. React shell: property panels, component library, layer list, timeline UI, and AI chat.
2. Project model: slides, frame tree, layers, selection, tracks, keyframes, and easing.
3. Renderer/exporters: live editable canvas, preview playback, and final video rendering.

This lets us evaluate LeaferJS, PixiJS, Remotion, or another renderer without rewriting the Composa UI component library or changing how AI commands describe edits.
