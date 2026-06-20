import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export default {
  stories: [
    "../src/react/stories/**/*.mdx",
    "../src/react/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-mcp"],

  // Chrome fonts (IBM Plex Sans) are self-hosted via @fontsource/ibm-plex-sans
  // and imported as JS modules in manager.js / preview.js, so the bundler resolves
  // and ships the faces directly. No staticDirs / managerHead / previewHead font
  // wiring is needed — and no trial/missing font binary is referenced.

  // In a git-worktree checkout, node_modules is a SYMLINK to the main repo's
  // node_modules, which lives OUTSIDE this worktree root. Vite's dev server then
  // 404s the @fontsource woff2 (`/@fs/.../Composa/react/node_modules/...`) because
  // that real path is not in server.fs.allow — so IBM Plex silently fails to load
  // in the preview iframe and docs headings fall back to Inter/system. Allow the
  // Composa parent dir so the symlinked font files are servable. (A production
  // build-storybook bundles the fonts and is unaffected; this is dev-only.)
  async viteFinal(config) {
    const here = dirname(fileURLToPath(import.meta.url));
    const composaRoot = resolve(here, "../../.."); // .storybook -> editor-foundation -> wt -> Composa
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    const allow = new Set(config.server.fs.allow || []);
    allow.add(composaRoot);
    config.server.fs.allow = [...allow];
    return config;
  },
};
