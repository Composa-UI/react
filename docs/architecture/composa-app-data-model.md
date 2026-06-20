# Composa app data model — Figma Slides + Video

> Status: v0 synthesis from the founder's design chats (June 2026). This describes the
> **future `composa/app`**, not this design-system repo. Composa (this repo) is the
> presentational `ui-components/` layer that *reads* this model; it never owns it.
> Confirm the core assumption (see "Resolved intent") before treating this as final.

## Resolved intent (the important correction)

An earlier exploration drifted toward a **Premiere-style multi-track NLE** (a timeline of
`video_track` / `subtitle_track` with clips). That was a misread. The actual model is:

**Figma *Slides* + Video** — a single video plays underneath, and a tldraw "slides"
composition is layered on top, synced to the video's clock. Think *Figma Slides*, not
*Figma*, and not Premiere.

- **Video engine (bottom layer):** a standard `<video>` (or low-level playback engine) sits
  statically at the bottom of the stack. It is the single source of truth for time
  (`video.currentTime`). It handles decode/playback only.
- **Graphic engine (top layer): tldraw**, absolutely positioned over the video with a
  transparent background. It manages vector/text/frames/groups. It does **not** render video.
- **The linkage:** every tldraw shape has temporal props `startTime` / `endTime`. The video
  clock *drives* tldraw visibility + camera — not the other way around. A `timeupdate` /
  rAF loop reads `video.currentTime`, then shows/hides shapes and moves the camera.

## Spatial = linear deck, Time = camera

Figma Slides constrains the infinite canvas to a **linear sequence**:

- Slide 1 @ `(0,0)`, Slide 2 @ `(1920,0)`, Slide 3 @ `(3840,0)` … each slide is a tldraw
  **Frame** acting as an artboard over the video.
- Each slide is assigned a **time segment**: Slide 1 `0:00–0:10`, Slide 2 `0:10–0:30`, …
- **Playhead = camera:** when the clock crosses a slide boundary, the app smoothly pans the
  tldraw camera to the next slide's coordinates (`editor.animateToPageSpace(...)`). Shared
  elements Smart-Animate (scale/opacity/move) while the video keeps playing beneath.
- **Grid / macro view:** zoom out to see all slides as a grid where each slide's width ∝ its
  duration; dragging a slide to reorder updates both canvas coordinates and playback order.

## The schema (single source of truth)

The app state is one document. The UI reads it to render; exporters translate it.

```jsonc
{
  "project": { "fps": 30, "resolution": [1920, 1080], "schemaVersion": 1 },
  "video":   { "source": "s3://…/base.mp4", "duration": 45.0 },   // the bottom layer
  "slides": [
    {
      "id": "slide_1",
      "name": "Intro",
      "order": 0,
      "canvas": { "x": 0, "y": 0 },          // position on the infinite tldraw canvas
      "time":   { "start": 0.0, "end": 10.0 },
      "shapes": [                              // tldraw shapes (the slide's composition)
        {
          "id": "title_1",
          "type": "text",                      // text | rect | ellipse | image | group | frame
          "transform": { "x": 80, "y": 120, "width": 760, "height": 96,
                          "rotation": 0, "scale": 1, "opacity": 1 },
          "time":   { "start": 0.5, "end": 9.5 },   // optional per-shape enter/exit
          "z": 3,                              // layer order = render stacking
          "content": "Hello",
          "styles": { "font": "Inter", "size": 48 }
        }
      ]
    }
  ]
}
```

Notes:
- **Time lives on slides and (optionally) shapes** as `start`/`end`, not on tracks. There are
  no NLE tracks in the model; tracks only appear as an *export translation* target (OTIO).
- `transform` leaves room for future **3D** (`z`, `rotation` as a vector) if the canvas engine
  is later swapped to a WebGL one — but ship 2D first.
- This is the `core-schema/` package (lives in `composa/app` or a shared `@composa/schema`),
  not Composa.

## How Composa (this repo) maps onto it

Composa is the "skin" that visualizes the document. It stays presentational/controlled:

- **`SlidesEditorTemplate`** = the app's primary shell (rail · `SlidesNavigator` · canvas · inspector).
  The full-Figma **`EditorNavigator`** is the *design-system editor* mode, a secondary surface.
- **`SlidesNavigator`** ← the `slides[]` array (each `SlideThumb` = a slide; order/selection).
- **canvas slot** ← tldraw rendering the slide shapes over the `<video>`.
- **inspector** ← the selected shape's `transform` (position/size), appearance (opacity/blend),
  and a **Time group** (`start`/`end`, and for the slide: its segment) — these are exactly the
  inspector dialogs/sections being built.
- **Typed seam alignment** (in `src/react/index.d.ts`): `SlideItem` should carry `order`,
  `time {start,end}`, and optional `canvas {x,y}`; `LayerNode` ≈ a shape (UI subset:
  id/name/type/icon/children/visible/locked/selected) with optional `time {start,end}`.
  *(Refine these when the in-flight lanes merge, to avoid index.d.ts conflicts.)*

## Pipelines (separate `composa/app` packages, future)

- **`importer-figma/`** — Figma REST/plugin → parse nodes → slides+shapes; rasterize complex
  groups to PNG/SVG hosted on object storage.
- **`exporter-timeline/`** — document → **OpenTimelineIO (OTIO)** / FCP7 XML for DaVinci
  Resolve. (Reference OTIO, *not* Penpot — Penpot is DOM/SVG/ClojureScript with no timeline.)
  Flatten rich CSS styling to primitive XML text/media nodes DaVinci can read.
- **`renderer-worker/`** — local preview (Canvas/WebGL/WebCodecs reads the document for 60fps
  playback) + cloud headless render (Remotion + Puppeteer + FFmpeg) stepping frame-by-frame
  for crisp 4K MP4/ProRes (browser `MediaRecorder` drops frames — don't use it for export).
- **Engine choice:** tldraw for the canvas (native Frames + Groups; Auto Layout / "ripple
  trim" is custom-built via tldraw Side Effects + a layout function). Swap to PixiJS/Three.js
  only if/when true 3D is needed.
