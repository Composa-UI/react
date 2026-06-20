import React from "react";

const { createElement: h, useState, Children, isValidElement } = React;

// Carbon-style in-page documentation tabs for Storybook 10 MDX docs.
//
// The archived `storybook-addon-docs-tabs` is Storybook-6-era and the author
// admits "the Storybook API does not support this at all." Rather than depend on
// it, this is a plain React component used directly inside an `.mdx` doc:
//
//   import { DocTabs, DocTab } from "./_doc-tabs";
//
//   <DocTabs>
//     <DocTab label="Usage">…markdown + <Canvas>…</DocTab>
//     <DocTab label="Style">…</DocTab>
//     <DocTab label="Code"><Controls /></DocTab>
//     <DocTab label="Accessibility">…</DocTab>
//   </DocTabs>
//
// Content inside each <DocTab> is normal MDX (markdown + doc blocks like
// <Canvas>/<Controls>), so it renders in the same DocsContext and the Storybook
// MCP still serves all of it from the MDX source. Styling lives in
// `storybook.css` under `.composa-doctabs`.

// Marker component: a tab's content is its children; `label` names the tab.
export function DocTab({ children }) {
  return children;
}

export function DocTabs({ children, initial = 0 }) {
  const tabs = Children.toArray(children).filter(isValidElement);
  const [active, setActive] = useState(initial);
  const current = Math.min(active, tabs.length - 1);

  return h("div", { className: "composa-doctabs", "data-composa-doc": "tabs" }, [
    h(
      "div",
      { key: "bar", className: "composa-doctabs-bar", role: "tablist", "aria-label": "Documentation sections" },
      tabs.map((tab, i) =>
        h(
          "button",
          {
            key: i,
            type: "button",
            role: "tab",
            "aria-selected": i === current ? "true" : "false",
            tabIndex: i === current ? 0 : -1,
            className: "composa-doctab-trigger" + (i === current ? " is-active" : ""),
            onClick: () => setActive(i),
          },
          tab.props.label
        )
      )
    ),
    h(
      "div",
      { key: "panel", className: "composa-doctabs-panel", role: "tabpanel" },
      tabs[current]
    ),
  ]);
}
