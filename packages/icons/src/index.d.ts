import * as React from "react";

export type IconName = "chevron-down" | "component-small" | "dev" | "more" | "play-arrow";
export type MaterialSymbolVariant = "outlined" | "rounded" | "sharp";

export interface IconPath {
  d: string;
  fill?: string;
  stroke?: string;
  strokeLinecap?: "butt" | "round" | "square" | "inherit";
  strokeLinejoin?: "arcs" | "bevel" | "miter" | "miter-clip" | "round" | "inherit";
  strokeWidth?: number;
}

export interface IconDefinition {
  viewBox: string;
  paths: IconPath[];
  source: string;
}

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number | string;
  title?: string;
  decorative?: boolean;
  strokeWidth?: number;
}

export interface MaterialSymbolProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  name: string;
  variant?: MaterialSymbolVariant;
  fill?: number;
  weight?: number;
  grade?: number;
  opticalSize?: number;
  size?: number | string;
  title?: string;
  decorative?: boolean;
}

export declare const iconNames: IconName[];
export declare const materialSymbolNames: {
  chevronDown: "keyboard_arrow_down";
  componentSmall: "category";
  dev: "code";
  more: "more_horiz";
  playArrow: "play_arrow";
};
export declare const materialSymbolClassNames: Record<MaterialSymbolVariant, string>;
export declare const materialSymbolDefaults: {
  variant: "rounded";
  fill: 0;
  weight: 200;
  grade: 0;
  opticalSize: 24;
  size: 24;
};
export declare const iconPaths: Record<IconName, IconDefinition>;
export declare function Icon(props: IconProps): React.ReactElement | null;
export declare function MaterialSymbol(props: MaterialSymbolProps): React.ReactElement;
export declare function ChevronDownIcon(props: Omit<IconProps, "name">): React.ReactElement | null;
export declare function PlayArrowIcon(props: Omit<IconProps, "name">): React.ReactElement | null;
export declare function DevIcon(props: Omit<IconProps, "name">): React.ReactElement | null;
export declare function ComponentSmallIcon(props: Omit<IconProps, "name">): React.ReactElement | null;
export declare function MoreIcon(props: Omit<IconProps, "name">): React.ReactElement | null;
