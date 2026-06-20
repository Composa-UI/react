import { addons } from "storybook/manager-api";
import composaTheme from "./theme";
// Self-hosted IBM Plex Sans faces (open/free, SIL OFL) for the manager chrome
// (brand title / sidebar / headings). Imported as JS modules so esbuild resolves
// the bare specifier and bundles the @font-face + woff2 — no missing/trial font.
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
// Apply IBM Plex to the chrome headings + sidebar (Inter fallback). Theme only.
import "./plex-headings.css";
// Carbon-inspired manager chrome refinements (sharper 2px rows, blue selection
// accent, clearer nav/canvas/panel separation, comfortable density). Chrome only.
import "./manager.css";

// Theme the Storybook manager (sidebar, toolbar, panels) with the Composa theme.
addons.setConfig({
  theme: composaTheme,
  enableShortcuts: true,
  sidebar: {
    showRoots: true,
  },
});
