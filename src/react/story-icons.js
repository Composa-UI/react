import React from "react";
import { iconAssets } from "../design-system/icon-assets.js";
import { MaterialSymbol } from "../../packages/icons/src/index.js";
import "../../packages/icons/src/material-symbols-rounded.css";

const materialSymbolByComposaName = {
  chevronDown: { name: "expand_more", weight: 200 },
  chevronUp: { name: "expand_less", weight: 200 },
  chevronLeft: { name: "chevron_left", weight: 200 },
  chevronRight: { name: "chevron_right", weight: 200 },
  check: { name: "check", weight: 200 },
  dash: { name: "remove", weight: 200 },
  minus: { name: "remove", weight: 200 },
  plus: { name: "add", weight: 200 },
  plusSmall: { name: "add", weight: 200 },
  close: { name: "close", weight: 200 },
  // Navigator header panel-toggle (Figma editor sidebar 4kilp0ShQiYsoUPJdleqEH
  // node 1027347-6458): the sidebar-layout / dock glyph. Mirrors the built-in
  // `panelLeft` glyph so the navigator header renders a real toggle icon in
  // Storybook (where `Icon` resolves through this map) instead of the "?"
  // missing-icon box.
  panelLeft: { name: "left_panel_open", weight: 200 },
  panelRight: { name: "right_panel_open", weight: 200 },
  // Editor-toolbar tool glyphs render at 24px on the white toolbar surface, so
  // they carry weight 300 (not 200) to avoid reading thin (founder icon-weight
  // audit). `frame` is the Frame tool / layer-kind glyph: the Grid 3x3 symbol.
  move: { name: "near_me", weight: 300 },
  hand: { name: "back_hand", weight: 300 },
  rectangle: { name: "rectangle", weight: 300 },
  circle: { name: "circle", weight: 300 },
  text: { name: "title", weight: 300 },
  frame: { name: "grid_3x3", weight: 300 },
  grid3x3: { name: "grid_3x3", weight: 300 },
  image: { name: "image", weight: 200 },
  // Comments-composer action glyphs (Figma composer 2012-63721). These mirror the
  // builtin-glyphs.js defaults so the composer renders real icons in Storybook
  // (where `Icon` resolves through this map) instead of the "?" missing-icon box.
  //   arrowUp -> arrow_upward  mood -> mood  at -> alternate_email
  //   send (paper plane) -> send   notification (bell) -> notifications
  arrowUp: { name: "arrow_upward", weight: 300 },
  mood: { name: "mood", weight: 200 },
  at: { name: "alternate_email", weight: 200 },
  send: { name: "send", weight: 200 },
  notification: { name: "notifications", weight: 200 },
  comment: { name: "chat_bubble", weight: 200 },
  play: { name: "play_arrow", weight: 200 },
  // Transport controls + common a11y-story glyphs. Added so the button usage
  // stories (transport row, dialog toggle) and the IconButton/Toggle a11y stories
  // render real icons instead of the "?" missing-icon box. The full Material
  // Symbols Rounded font is bundled, so these ligatures all resolve.
  pause: { name: "pause", weight: 200 },
  skipBack: { name: "skip_previous", weight: 200 },
  skipForward: { name: "skip_next", weight: 200 },
  search: { name: "search", weight: 200 },
  eye: { name: "visibility", weight: 200 },
  settings: { name: "settings", weight: 200 },
  dev: { name: "code", weight: 200 },
  componentSmall: { name: "category", weight: 200 },
  more: { name: "more_horiz", weight: 300 },
  styles: { name: "gamepad_circle_up", weight: 200 },
  effectShadow: { name: "shadow", weight: 200 },
  eyeSmall: { name: "visibility", weight: 200 },
  eyeSlash: { name: "visibility_off", weight: 200 },
  blendMode: { name: "humidity_low", weight: 200 },
  blendModeActive: { name: "humidity_mid", weight: 200 },
  cornerRadius: { name: "rounded_corner", weight: 200 },
  individualCorners: { name: "crop_square", weight: 200 },
  strokeWeight: { name: "line_weight", weight: 200 },
  strokeAlignInside: { name: "crop_square", weight: 200 },
  strokeAlignAll: { name: "border_outer", weight: 200 },
  strokeAlignTop: { name: "border_top", weight: 200 },
  strokeAlignBottom: { name: "border_bottom", weight: 200 },
  strokeAlignLeft: { name: "border_left", weight: 200 },
  strokeAlignRight: { name: "border_right", weight: 200 },
  strokeSettings: { name: "tune", weight: 200 },
  strokeWidthProfile: { name: "line_weight", weight: 200 },
  strokeJoinMiter: { name: "crop_square", weight: 200 },
  layoutGuideRows: { name: "table_rows", weight: 200 },
  layoutGuideColumns: { name: "view_column", weight: 200 },
  layoutGuideGrid: { name: "grid_on", weight: 200 },
  paintSolid: { name: "square", weight: 300 },
  paintGradient: { name: "gradient", weight: 200 },
  paintImage: { name: "image", weight: 200 },
  paintVideo: { name: "play_circle", weight: 200 },
  eyedropper: { name: "colorize", weight: 200 },
  colorContrast: { name: "contrast", weight: 200 },
  gradientReverse: { name: "swap_horiz", weight: 200 },
  gradientRotate: { name: "rotate_right", weight: 200 },
  lineHeight: { name: "format_line_spacing", weight: 200 },
  letterSpacing: { name: "format_letter_spacing", weight: 200 },
  // Typography dialog (Figma 99:5566). Paragraph-alignment glyphs are the
  // text-flow `format_align_*` family, distinct from the object-alignment
  // `align_horizontal_*` glyphs used by multi-select alignment. Decoration,
  // list-style, vertical-trim, and truncate use their Material text glyphs.
  textAlignLeft: { name: "format_align_left", weight: 200 },
  textAlignCenter: { name: "format_align_center", weight: 200 },
  textAlignRight: { name: "format_align_right", weight: 200 },
  textAlignJustify: { name: "format_align_justify", weight: 200 },
  textDecorationNone: { name: "remove", weight: 200 },
  textUnderline: { name: "format_underlined", weight: 200 },
  textStrikethrough: { name: "format_strikethrough", weight: 200 },
  textUnderlineDetails: { name: "chevron_right", weight: 200 },
  listStyleNone: { name: "remove", weight: 200 },
  listBulleted: { name: "format_list_bulleted", weight: 200 },
  listNumbered: { name: "format_list_numbered", weight: 200 },
  truncateNone: { name: "remove", weight: 200 },
  truncate: { name: "more_horiz", weight: 200 },
  // Typography Details tab (Figma 99:9688) — OpenType figure-set glyphs.
  numberOldstyle: { name: "looks_one", weight: 200 },
  numberTabular: { name: "tab", weight: 200 },
  numberSuperscript: { name: "superscript", weight: 200 },
  numberSubscript: { name: "subscript", weight: 200 },
  fontsApplyVariable: { name: "hexagon", weight: 200 },
  teamLibrary: { name: "menu_book", weight: 200 },
  typeStyleEdit: { name: "tune", weight: 200 },
  exportSettings: { name: "page_info", weight: 200 },
  exportPreview: { name: "visibility", weight: 200 },
  target: { name: "target", weight: 200 },
  alignLeft: { name: "align_horizontal_left", weight: 200 },
  alignHorizontalCenter: { name: "align_horizontal_center", weight: 200 },
  alignRight: { name: "align_horizontal_right", weight: 200 },
  alignTop: { name: "align_vertical_top", weight: 200 },
  alignVerticalCenter: { name: "align_vertical_center", weight: 200 },
  alignBottom: { name: "align_vertical_bottom", weight: 200 },
  constraints: { name: "settings_overscan", weight: 200 },
  rotation: { name: "360", weight: 200 },
  rotate90: { name: "rotate_90_degrees_cw", weight: 200 },
  flipHorizontal: { name: "flip", weight: 200 },
  flipVertical: { name: "flip", weight: 200 },
  resizeToFit: { name: "fit_screen", weight: 200 },
  autoLayout: { name: "auto_awesome_mosaic", weight: 200 },
  layoutFixed: { name: "width", weight: 200 },
  layoutAutoWidth: { name: "width", weight: 200 },
  layoutAutoHeight: { name: "height", weight: 200 },
  layoutFixedSize: { name: "open_in_full", weight: 200 },
  height: { name: "height", weight: 200 },
  layoutHug: { name: "compress", weight: 200 },
  layoutFill: { name: "open_in_full", weight: 200 },
  flowNone: { name: "web_asset", weight: 200 },
  flowHorizontal: { name: "flex_direction", weight: 200 },
  flowVertical: { name: "flex_direction", weight: 200 },
  flowWrap: { name: "grid_view", weight: 200 },
  lockAspect: { name: "aspect_ratio", weight: 200 },
  spacingGap: { name: "space_bar", weight: 200 },
  pageInfo: { name: "page_info", weight: 200 },
  autoLayoutSettings: { name: "page_info", weight: 200 },
  paddingHorizontal: { name: "padding", weight: 200 },
  paddingVertical: { name: "padding", weight: 200 },
  individualPadding: { name: "crop_square", weight: 200 },
};

function normalizeSvg(svg) {
  return svg
    .replaceAll('fill="black" fill-opacity="0.9"', 'fill="currentColor"')
    .replaceAll('fill="black"', 'fill="currentColor"');
}

export function ComposaIcon({ name, decorative = true }) {
  const materialSymbol = materialSymbolByComposaName[name];
  if (materialSymbol) {
    return React.createElement(MaterialSymbol, {
      name: materialSymbol.name,
      weight: materialSymbol.weight,
      size: "var(--composa-runtime-icon-size, 16px)",
      className: `composa-icon composa-material-symbol-icon composa-material-symbol-icon-${name}`,
      decorative,
      "data-icon": name,
      "data-icon-source": "material-symbols-runtime",
    });
  }

  const asset = iconAssets[name];
  if (!asset) {
    return React.createElement(
      "span",
      {
        className: `composa-icon composa-icon-${name}`,
        "data-icon": name,
        "data-icon-missing": "true",
        "aria-hidden": decorative ? "true" : "false",
      },
      "?"
    );
  }

  return React.createElement("span", {
    className: `composa-icon composa-icon-${name}`,
    "data-icon": name,
    "data-figma-icon": asset.figmaName,
    "aria-hidden": decorative ? "true" : "false",
    dangerouslySetInnerHTML: { __html: normalizeSvg(asset.svg) },
  });
}

export const StoryIcon = ComposaIcon;
export { iconAssets };
