// Public entry for @composa-ui/react. License-clean: it bundles NO proprietary icon
// set. Components resolve the built-in structural glyphs (chevrons, check, close,
// etc. from builtin-glyphs.js) for their own anatomy, and accept content icons as
// slots — pass a React node or component, or a string name resolved by an icon
// renderer you inject via createComposaComponents(React, { Icon }). The UI3-derived
// asset set used by Storybook and the demo app lives in ./story-runtime.js and is
// excluded from the published package.
import React from "react";
import { createComposaComponents } from "./factory.js";

const components = createComposaComponents(React);

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
  MenuDivider,
  MenuFooter,
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

export { createComposaComponents };

export default components;
