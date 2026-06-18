import { iconAssets } from "./icon-assets.js";

function normalizeSvg(svg) {
  return svg
    .replaceAll('fill="black" fill-opacity="0.9"', 'fill="currentColor"')
    .replaceAll('fill="black"', 'fill="currentColor"');
}

export function Icon(name, options = {}) {
  const icon = document.createElement("span");
  icon.className = `composa-icon composa-icon-${name}`;
  icon.dataset.icon = name;
  const asset = iconAssets[name];
  if (asset) {
    icon.dataset.figmaIcon = asset.figmaName;
    icon.innerHTML = normalizeSvg(asset.svg);
  } else {
    icon.dataset.iconMissing = "true";
    icon.textContent = "?";
  }
  icon.setAttribute("aria-hidden", options.decorative === false ? "false" : "true");
  return icon;
}

export { iconAssets };
