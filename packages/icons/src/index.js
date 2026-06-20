import React from "react";

export const iconNames = ["chevron-down", "component-small", "dev", "more", "play-arrow"];

export const materialSymbolNames = {
  chevronDown: "keyboard_arrow_down",
  componentSmall: "category",
  dev: "code",
  more: "more_horiz",
  playArrow: "play_arrow",
};

export const materialSymbolClassNames = {
  outlined: "material-symbols-outlined",
  rounded: "material-symbols-rounded",
  sharp: "material-symbols-sharp",
};

export const materialSymbolDefaults = {
  variant: "rounded",
  fill: 0,
  weight: 200,
  grade: 0,
  opticalSize: 24,
  size: 24,
};

export const iconPaths = {
  "chevron-down": {
    viewBox: "0 -960 960 960",
    paths: [
      {
        d: "M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z",
        fill: "currentColor",
      },
    ],
    source: "material-symbols-rounded:keyboard_arrow_down",
  },
  "play-arrow": {
    viewBox: "0 -960 960 960",
    paths: [
      {
        d: "M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Zm80-207Zm0 134 210-134-210-134v268Z",
        fill: "currentColor",
      },
    ],
    source: "material-symbols-rounded:play_arrow",
  },
  dev: {
    viewBox: "0 -960 960 960",
    paths: [
      {
        d: "m193-479 155 155q11 11 11 28t-11 28q-11 11-28 11t-28-11L108-452q-6-6-8.5-13T97-480q0-8 2.5-15t8.5-13l184-184q12-12 28.5-12t28.5 12q12 12 12 28.5T349-635L193-479Zm574-2L612-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L668-268q-12 12-28 11.5T612-269q-12-12-12-28.5t12-28.5l155-155Z",
        fill: "currentColor",
      },
    ],
    source: "material-symbols-rounded:code",
  },
  "component-small": {
    viewBox: "0 -960 960 960",
    paths: [
      {
        d: "m297-581 149-243q6-10 15-14.5t19-4.5q10 0 19 4.5t15 14.5l149 243q6 10 6 21t-5 20q-5 9-14 14.5t-21 5.5H331q-12 0-21-5.5T296-540q-5-9-5-20t6-21ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-60v-240q0-17 11.5-28.5T160-420h240q17 0 28.5 11.5T440-380v240q0 17-11.5 28.5T400-100H160q-17 0-28.5-11.5T120-140Zm580-20q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z",
        fill: "currentColor",
      },
    ],
    source: "material-symbols-rounded:category",
  },
  more: {
    viewBox: "0 -960 960 960",
    paths: [
      {
        d: "M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z",
        fill: "currentColor",
      },
    ],
    source: "material-symbols-rounded:more_horiz",
  },
};

export function Icon({
  name,
  size = 24,
  title,
  decorative = true,
  className = "",
  strokeWidth,
  ...props
}) {
  const icon = iconPaths[name];

  if (!icon) {
    return null;
  }

  const labelled = Boolean(title) || decorative === false;

  return React.createElement(
    "svg",
    {
      ...props,
      className,
      width: size,
      height: size,
      viewBox: icon.viewBox,
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": labelled ? undefined : "true",
      role: labelled ? "img" : undefined,
      focusable: "false",
    },
    [
      title ? React.createElement("title", { key: "title" }, title) : null,
      ...icon.paths.map((path, index) =>
        React.createElement("path", {
          key: index,
          ...path,
          strokeWidth: strokeWidth ?? path.strokeWidth,
        })
      ),
    ]
  );
}

export function MaterialSymbol({
  name,
  variant = materialSymbolDefaults.variant,
  fill = materialSymbolDefaults.fill,
  weight = materialSymbolDefaults.weight,
  grade = materialSymbolDefaults.grade,
  opticalSize = materialSymbolDefaults.opticalSize,
  size = materialSymbolDefaults.size,
  title,
  decorative = true,
  className = "",
  style,
  ...props
}) {
  const classNameForVariant =
    materialSymbolClassNames[variant] ?? materialSymbolClassNames[materialSymbolDefaults.variant];
  const ariaLabel = props["aria-label"] ?? title;
  const labelled = Boolean(ariaLabel) || decorative === false;

  return React.createElement(
    "span",
    {
      ...props,
      className: [classNameForVariant, className].filter(Boolean).join(" "),
      style: {
        fontVariationSettings: `"FILL" ${fill}, "wght" ${weight}, "GRAD" ${grade}, "opsz" ${opticalSize}`,
        fontSize: size,
        lineHeight: 1,
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      },
      "aria-label": ariaLabel,
      "aria-hidden": labelled ? undefined : "true",
      role: labelled ? "img" : undefined,
      title,
    },
    name
  );
}

export function ChevronDownIcon(props) {
  return React.createElement(Icon, { ...props, name: "chevron-down" });
}

export function PlayArrowIcon(props) {
  return React.createElement(Icon, { ...props, name: "play-arrow" });
}

export function DevIcon(props) {
  return React.createElement(Icon, { ...props, name: "dev" });
}

export function ComponentSmallIcon(props) {
  return React.createElement(Icon, { ...props, name: "component-small" });
}

export function MoreIcon(props) {
  return React.createElement(Icon, { ...props, name: "more" });
}
