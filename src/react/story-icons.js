import React from "react";
import { iconAssets } from "../design-system/icon-assets.js";

function normalizeSvg(svg) {
  return svg
    .replaceAll('fill="black" fill-opacity="0.9"', 'fill="currentColor"')
    .replaceAll('fill="black"', 'fill="currentColor"');
}

export function ComposaIcon({ name, decorative = true }) {
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
