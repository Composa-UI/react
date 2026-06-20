import React from "react";
import { fn } from "storybook/test";
import { NavigatorHeader, CollapseHeader, SlideThumb, SlideList } from "../story-runtime.js";

// The new navigator primitives shown on their own, so each can be reviewed
// outside the EditorNavigator / SlidesNavigator modules that compose them.
export default {
  title: "Composa UI/Components/Modules/Navigator/Primitives",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Standalone views of the navigator primitives: NavigatorHeader (file-title header), CollapseHeader (page/layer section header), SlideThumb (numbered slide preview), and SlideList. SlideThumb is the one genuinely new primitive — Tree cannot express a thumbnail preview, so the slides bar needs it.",
      },
    },
  },
};

function Frame({ children, width = 240 }) {
  return React.createElement(
    "div",
    { style: { width, border: "1px solid var(--composa-color-border)", borderRadius: 8, overflow: "hidden", background: "var(--composa-color-bg)" } },
    children
  );
}

export const Header = {
  name: "NavigatorHeader / Playground",
  render: () =>
    React.createElement(Frame, null, [
      React.createElement(NavigatorHeader, {
        key: "a",
        title: "Earthling Mobile Refresh",
        project: "Mobile Refresh",
        onToggle: fn(),
      }),
      React.createElement(NavigatorHeader, {
        key: "b",
        title: "No project, no menu",
        titleMenu: false,
        onToggle: fn(),
      }),
    ]),
};

export const Collapse = {
  name: "CollapseHeader / Playground",
  render: () =>
    React.createElement(Frame, null, [
      React.createElement(CollapseHeader, { key: "a", label: "Pages", defaultExpanded: true }),
      React.createElement(CollapseHeader, { key: "b", label: "Layers", defaultExpanded: false }),
    ]),
};

export const Thumb = {
  name: "SlideThumb / Playground",
  render: () =>
    React.createElement(Frame, { width: 240 }, [
      React.createElement(SlideThumb, { key: "rest", index: 1, label: "Slide 1" }),
      React.createElement(SlideThumb, { key: "selected", index: 2, label: "Slide 2", selected: true }),
    ]),
};

export const List = {
  name: "SlideList / Playground",
  render: () =>
    React.createElement(Frame, { width: 240 }, [
      React.createElement(SlideList, {
        key: "list",
        items: [{ id: "1" }, { id: "2" }, { id: "3" }],
        defaultSelectedId: "1",
        onSelect: fn(),
      }),
    ]),
};

export const ListEmpty = {
  name: "SlideList / Empty",
  render: () => React.createElement(Frame, { width: 240 }, React.createElement(SlideList, { items: [] })),
};
