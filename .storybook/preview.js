import React from "react";
import composaTheme from "./theme";
import "../design/tokens.css";
import "../styles.css";
import "../src/react/stories/storybook.css";
// IBM Plex Sans heading typeface for the docs chrome (theme only — DS components
// stay on the Inter token stack). Self-hosted, open/free (SIL OFL) via
// @fontsource/ibm-plex-sans; imported as JS modules so Vite bundles the faces.
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "./plex-headings.css";

// Storybook 10 removed the main.js `docs.autodocs` flag; autodocs is enabled by
// tagging stories. This global tag gives every component an auto-generated Docs
// page (prop tables from argTypes + the component description).
export const tags = ["autodocs"];

export const parameters = {
  layout: "centered",
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Composa UI", ["Overview", "Foundations", "Components", ["Base", "Modules"], "Patterns", "Templates"]],
    },
  },
  controls: {
    expanded: true,
  },
  // Theme the autodocs pages with the same Composa theme as the manager so
  // docs chrome (typography, accent, logo) matches the canvas.
  docs: {
    theme: composaTheme,
  },
  backgrounds: {
    default: "Composa surface",
    values: [
      // Driven by Composa surface tokens:
      //   Composa surface  #f7f7f7  (default story stage)
      //   Panel            #ffffff  (--composa-color-bg)
      //   Canvas           #ededed  (editor canvas)
      //   dark             #2c2c2c  (--composa-color-bg dark mode)
      { name: "Composa surface", value: "#f7f7f7" },
      { name: "Panel", value: "#ffffff" },
      { name: "Canvas", value: "#ededed" },
      { name: "light", value: "#f7f7f7" },
      { name: "dark", value: "#2c2c2c" },
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
