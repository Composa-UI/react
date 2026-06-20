import React from "react";
import { fn } from "storybook/test";
import { SlidesNavigator } from "../../story-runtime.js";

// Lightweight inline preview nodes stand in for slide artwork so the story has no
// external image dependency. A real app passes an image URL or a live preview.
function Preview({ title, body, align = "left" }) {
  return React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
        padding: 12,
        boxSizing: "border-box",
        background: "var(--composa-color-bg)",
        textAlign: align,
      },
    },
    [
      React.createElement("strong", { key: "t", style: { fontSize: 9, color: "var(--composa-color-text)" } }, title),
      body ? React.createElement("span", { key: "b", style: { fontSize: 6, color: "var(--composa-color-text-secondary)" } }, body) : null,
    ]
  );
}

const slides = [
  { id: "s1", thumbnail: React.createElement(Preview, { title: "Slide Deck Title", body: "This is just the opening of something big." }) },
  { id: "s2", thumbnail: React.createElement(Preview, { title: "Highlight", body: "Use this slide to highlight a single important thing." }) },
  { id: "s3", thumbnail: React.createElement(Preview, { title: "Agenda", body: "Three things to cover today." }) },
];

function Stage({ children, width = 240 }) {
  return React.createElement(
    "div",
    { style: { height: 560, width, display: "flex", border: "1px solid var(--composa-color-border)", borderRadius: 8, overflow: "hidden" } },
    children
  );
}

export default {
  title: "Composa UI/Components/Modules/Navigator/SlidesNavigator",
  component: SlidesNavigator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "SlidesNavigator is the slides bar: a NavigatorHeader, a create toolbar (New slide + add), then a vertical SlideList of numbered thumbnails. It is self-contained and presentational so a future video editor can reuse it as a clip/scene strip. Selection is controlled or internally stateful.",
      },
    },
  },
  args: {
    title: "Earthling Mobile Refresh",
    project: "Mobile Refresh",
    slides,
    defaultSelectedSlideId: "s1",
    onToggle: fn(),
    onSlideSelect: fn(),
    onNewSlide: fn(),
    onAddSlide: fn(),
  },
  argTypes: {
    title: { control: "text", description: "Bold file title in the header." },
    project: { control: "text", description: "Subdued project name under the title." },
    showHeader: { control: "boolean", description: "Render the file-title header." },
    slides: { control: "object", description: "Slide items: { id, label?, thumbnail? }." },
  },
  render: (args) => React.createElement(Stage, null, React.createElement(SlidesNavigator, args)),
};

export const Default = {};

export const Selected = {
  args: { defaultSelectedSlideId: "s2" },
  parameters: { docs: { description: { story: "Slide 2 selected — the blue tint and full-opacity index move with selection." } } },
};

export const Empty = {
  args: { slides: [] },
  parameters: { docs: { description: { story: "No slides — the toolbar stays and the list shows its empty state." } } },
};

export const ManyItems = {
  args: {
    slides: Array.from({ length: 14 }, (_, i) => ({
      id: `slide-${i}`,
      thumbnail: React.createElement(Preview, { title: `Slide ${i + 1}`, body: "Body copy placeholder." }),
    })),
    defaultSelectedSlideId: "slide-0",
  },
  parameters: { docs: { description: { story: "Many slides so the thumbnail list scrolls under a fixed toolbar." } } },
};

export const Narrow = {
  render: (args) => React.createElement(Stage, { width: 220 }, React.createElement(SlidesNavigator, args)),
  parameters: { docs: { description: { story: "A realistic narrow product width." } } },
};

export const WithoutHeader = {
  args: { showHeader: false },
  parameters: {
    docs: { description: { story: "Header hidden — the reuse mode for embedding the slide strip inside another shell (e.g. a video editor)." } },
  },
};
