// Story + internal-app runtime. This wires the components with the UI3-derived
// `iconAssets` so Storybook and the Figma-Video app can render string-named
// content icons (icon="move", etc.). It is NOT part of the published package —
// the proprietary assets must not ship. The public entry is ./index.js, which
// wires no icon set (content icons are passed in as slots; structural glyphs are
// the built-in license-clean set).
import React from "react";
import { createComposaComponents } from "./factory.js";
import { ComposaIcon, iconAssets } from "./story-icons.js";

const components = createComposaComponents(React, { Icon: ComposaIcon });

export const {
  Button,
  IconButton,
  ToggleButton,
  SplitButton,
  InputField,
  NumericInput,
  NumericInputMulti,
  ChipVariable,
  Chit,
  ColorInput,
  ComboInput,
  ComboInputDropdown,
  ChitInput,
  Switch,
  Radio,
  Checkbox,
  Tooltip,
  Dialog,
  Dropdown,
  Menu,
  MenuRow,
  MenuMultiSelect,
  VerticalCell,
  TextPair,
  Label,
  Tree,
  TreeRow,
  ListCell,
  DialogRow,
  DialogHeaderCell,
  DialogHeader,
  DialogBody,
  DialogFooter,
  MenuHeadingCell,
  HeaderActions,
  Header,
  SegmentedControl,
  Tab,
  Tabs,
  CanvasSelectionOverlay,
} = components;

export { ComposaIcon, iconAssets, createComposaComponents };

export default components;
