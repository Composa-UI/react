import { create } from "storybook/theming";

// Composa Storybook theme.
//
// Values are pulled straight from the design tokens so the manager, preview,
// and docs chrome match the component canvas:
//   --composa-brand-orange         #ff5c16  (logo / brandImage identity ONLY)
//   --composa-accent-blue          #0d99ff  (selection line / active controls / "…")
//   --composa-brand-black          #111111  (wordmark / primary text ink)
//   --composa-color-bg             #ffffff  (app + content surface)
//   --composa-color-bg-secondary   #f5f5f5  (bars / secondary surface)
//   --composa-color-bg-tertiary    #e6e6e6  (borders)
//   surface (Storybook canvas)     #f7f7f7  (matches stories "Composa surface")
//   font family                    Inter stack from --composa-font-family
const FONT_BASE =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const FONT_CODE =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

// HEADINGS in the Storybook chrome (docs h1–h6 + brand title + sidebar) use
// IBM Plex Sans, applied via .storybook/plex-headings.css with Inter as the
// fallback. Plex is theme/chrome only — design-system components stay on the
// Inter token stack. IBM Plex Sans is open/free (SIL OFL), self-hosted via
// @fontsource/ibm-plex-sans, so a clean public clone needs no missing font.
// (We borrow the heading face from Carbon's own Storybook, whose fontBase is
// "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif".)

export default create({
  base: "light",

  // Brand — wordmark TEXT only (no logo image). The header renders the
  // brandTitle as IBM Plex text (via plex-headings.css). The orange "UI" mark
  // lived in the SVG logo; with the image removed the title is plain ink text.
  brandTitle: "Composa UI",
  brandUrl: "https://github.com/composa-ui",
  brandTarget: "_self",

  // Accent colors — Composa ACCENT BLUE (#0d99ff). In Storybook, colorSecondary
  // drives the sidebar selection line, the row-hover "…" context-menu button,
  // and other active controls — these previously rendered bright orange (the
  // artifacts). They're now the accent blue. The brand orange survives ONLY as
  // the logo/brandImage identity, never as a selection/control accent.
  colorPrimary: "#0d99ff", // Composa accent blue
  colorSecondary: "#0d99ff", // Composa accent blue (selection / "…" button / controls)

  // App chrome surfaces
  appBg: "#f7f7f7", // manager sidebar / shell — Composa surface
  appContentBg: "#ffffff", // story + docs content panel — --composa-color-bg
  appPreviewBg: "#ffffff",
  appBorderColor: "#e6e6e6", // --composa-color-bg-tertiary
  // Carbon-inspired sharper chrome. Carbon's UI reads engineered/restrained
  // largely because its surfaces are near-rectilinear. We drop the manager
  // shell off radius-large (13px) to radius-small (2px) — the brand orange and
  // logo carry the identity, the corners no longer need to. (Was 13.)
  appBorderRadius: 2, // --composa-radius-small

  // Typography
  fontBase: FONT_BASE,
  fontCode: FONT_CODE,

  // Text colors
  textColor: "#111111", // --composa-brand-black
  textInverseColor: "#ffffff",
  textMutedColor: "rgba(0, 0, 0, 0.5)", // --composa-color-text-secondary

  // Toolbar / top bar — restrained accent. The accent blue marks the *selected*
  // tab/control only; hover resolves to ink rather than a second tint, so the
  // bar isn't blanket-colored.
  barTextColor: "rgba(0, 0, 0, 0.5)",
  barSelectedColor: "#0d99ff", // Composa accent blue (selected tab/control)
  barHoverColor: "#111111", // --composa-brand-black (neutral hover, not accent)
  barBg: "#ffffff",

  // Form controls (search, addon inputs)
  inputBg: "#ffffff",
  inputBorder: "#e6e6e6",
  inputTextColor: "#111111",
  // Sharper inputs to match the shell. radius-medium (5px) -> radius-small (2px).
  inputBorderRadius: 2, // --composa-radius-small (was 5)
});
