import React from "react";
import "../design/tokens.css";
import "../styles.css";
import "../src/react/stories/storybook.css";

// Storybook 10 removed the main.js `docs.autodocs` flag; autodocs is enabled by
// tagging stories. This global tag gives every component an auto-generated Docs
// page (prop tables from argTypes + the component description).
export const tags = ["autodocs"];

export const parameters = {
  layout: "centered",
  options: {
    storySort: {
      order: ["Composa UI", ["Overview", "Foundations", "Base Components", "Modules"]],
    },
  },
  controls: {
    expanded: true,
  },
  backgrounds: {
    default: "Composa surface",
    values: [
      { name: "light", value: "#f7f7f7" },
      { name: "dark", value: "#2c2c2c" },
      { name: "Composa surface", value: "#f7f7f7" },
      { name: "Canvas", value: "#ededed" },
      { name: "Panel", value: "#ffffff" },
    ],
  },
};

export const decorators = [
  (Story, context) => {
    const backgroundValue = context.globals?.backgrounds?.value || context.globals?.backgrounds;
    const mode = backgroundValue === "dark" || backgroundValue === "#2c2c2c" ? "dark" : "light";
    return React.createElement("div", { className: "storybook-composa-shell", "data-composa-mode": mode }, React.createElement(Story));
  },
];
