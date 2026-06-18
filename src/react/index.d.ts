import type * as React from "react";

/**
 * A legacy icon name resolved by the injected icon renderer or a built-in
 * structural glyph (e.g. "chevronDown").
 * @deprecated Pass an icon node or component type via {@link IconSlot} instead.
 */
export type IconName = string;

/**
 * An icon prop. Pass a rendered node — `icon={<Plus />}` — or a component type
 * — `icon={Plus}` — from any icon library (Lucide, React Icons, Heroicons).
 * String names still resolve to a built-in glyph or the injected renderer for
 * backward compatibility, but are deprecated.
 */
export type IconSlot = React.ReactNode | React.ComponentType<Record<string, unknown>>;

export type ComposaState = "rest" | "hover" | "active" | "focused" | "focus" | "empty" | "disabled";

// Shape of an injected icon renderer (createComposaComponents(React, { Icon })).
// The public package ships no icon renderer; this types the option you pass.
export interface ComposaIconProps {
  name: IconName;
  decorative?: boolean;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visible button text. Required: a button needs a name. */
  label: string;
  variant?: "Primary" | "Secondary" | "Ghost" | "Link" | "Link Danger" | "Destructive" | "Secondary Destruct" | "Inverse" | "Success" | "Link-danger" | "Secondary-destruct" | "primary" | "secondary" | "ghost" | "link" | "link-danger" | "destructive" | "secondary-destruct" | "inverse" | "success";
  tone?: "brand" | ButtonProps["variant"];
  /**
   * Button height.
   */
  size?:
    | "Medium"
    | "Large"
    | "Small"
    | "medium"
    | "large"
    | "small"
    /** @deprecated Use `width="fill"` instead. Kept for backward compatibility; treated as `size="medium"` + `width="fill"`. */
    | "Wide"
    /** @deprecated Use `width="fill"` instead. Kept for backward compatibility; treated as `size="medium"` + `width="fill"`. */
    | "wide";
  /**
   * Button width, orthogonal to {@link size} (height). `auto` hugs content
   * (the default); `fill` stretches to 100% of the container. The legacy
   * `default`/`wide` values still resolve to `auto`/`fill`.
   */
  width?: "auto" | "fill" | "default" | "wide";
  state?: "Rest" | "Hover" | "Active" | "Focused" | "rest" | "hover" | "active" | "focused";
  disabled?: boolean;
  iconLead?: boolean | "False" | "Left-aligned" | "Center-aligned" | "false" | "left-aligned" | "center-aligned";
  icon?: IconSlot;
  hotkey?: boolean;
}

export declare function Button(props: ButtonProps): React.ReactElement;

/**
 * Shared Button variant vocabulary. The whole button family (Button, IconButton,
 * ToggleButton, SplitButton) accepts the same `variant` values so they render
 * with the same semantic color tokens. (DELIBERATE Composa divergence from
 * Figma, whose IconButton ships only Default/Secondary — see
 * docs/design-system/fidelity-buttons.md.)
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "link-danger" | "destructive" | "secondary-destruct" | "inverse" | "success";

/**
 * Shared button-family size axis. For IconButton/ToggleButton these map to the
 * icon BOX (square): small 20px / default 24px / large 28px.
 */
export type ButtonFamilySize = "small" | "medium" | "large";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconSlot;
  label: string;
  selected?: boolean;
  pressed?: boolean;
  /** Icon box size — Composa addition (square): small 20px / default 24px / large 28px. */
  size?: ButtonFamilySize;
  state?: "rest" | "hover" | "active" | "focused" | "primary-active" | "secondary-active" | "primary-focus" | "secondary-focus" | "disabled";
  disabled?: boolean;
  context?: "default" | "on-selected";
  /** Shares Button's variant vocabulary. `highlighted` kept for backward compatibility. */
  variant?: ButtonVariant | "highlighted";
  component?: "IconButton" | "ToggleButton" | "DialogToggleButton" | "SplitButton" | string;
}

export declare function IconButton(props: IconButtonProps): React.ReactElement;

export interface ToggleButtonProps extends Omit<IconButtonProps, "component" | "selected"> {
  dialog?: boolean;
}

export declare function ToggleButton(props: ToggleButtonProps): React.ReactElement;

export interface SplitButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  icon?: IconSlot;
  menuLabel?: string;
  /** Shares Button's variant vocabulary (defaults to `secondary`). */
  variant?: ButtonVariant;
  size?: ButtonFamilySize;
  /** Width axis, same pattern as Button: hug content (`auto`) or fill 100% (`fill`). Legacy `default`/`wide` still resolve. */
  width?: "auto" | "fill" | "default" | "wide";
  state?: IconButtonProps["state"];
  disabled?: boolean;
  onMenuClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export declare function SplitButton(props: SplitButtonProps): React.ReactElement;

export interface InputFieldProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Accessible name for the field. Required. */
  label: string;
  value?: string;
  placeholder?: string;
  mixed?: boolean;
  suffix?: string;
  icon?: IconSlot;
  variant?: "Single Line" | "Multi Line" | "Quick Action" | "single-line" | "multi-line" | "quick-action" | "numeric" | "combo";
  size?: "Medium" | "Large" | "medium" | "large";
  /** `auto` hugs content (default); `fill` stretches to 100% of the container. */
  width?: "auto" | "fill";
  state?: "Rest" | "Focus" | "Focused" | "Hover" | "Active" | "Empty" | "Disabled" | "Disabled Secondary" | "Disabled Tertiary" | "Variable" | "Active Empty" | "Active Filled" | "Selected Input" | "Selected Chevron" | "rest" | "focus" | "focused" | "hover" | "active" | "empty" | "disabled" | "disabled-secondary" | "disabled-tertiary" | "variable" | "active-empty" | "active-filled" | "selected-input" | "selected-chevron" | "mixed";
  disabled?: boolean;
  dropdown?: boolean;
  variable?: boolean;
  iconLead?: boolean;
  closeButton?: boolean;
  multiline?: boolean;
  onClear?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onInput?: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export declare function InputField(props: InputFieldProps): React.ReactElement;

export interface NumericInputProps extends Omit<InputFieldProps, "variant" | "iconLead" | "icon" | "variable" | "label"> {
  /** Numeric inputs label themselves via the var pill, so the label is optional. */
  label?: string;
  varIcon?: boolean;
  varPill?: boolean;
  iconLead?: boolean | "False" | IconSlot;
}

export declare function NumericInput(props: NumericInputProps): React.ReactElement;

export interface NumericInputMultiProps extends React.HTMLAttributes<HTMLDivElement> {
  values?: [string, string, string, string] | string[];
  state?: "Rest" | "Focused" | "Empty" | "rest" | "focused" | "empty";
  variant?: "Standard" | "Partial Disable" | "standard" | "partial-disable";
  disabled?: boolean;
  iconLead?: boolean | "False" | IconSlot;
  partialDisable?: boolean;
  /** Fires when a cell is edited, with the cell index and its new value. */
  onValueChange?: (index: number, value: string) => void;
}

export declare function NumericInputMulti(props: NumericInputMultiProps): React.ReactElement;

export interface ChipVariableProps extends React.HTMLAttributes<HTMLSpanElement> {
  state?: string;
  label?: string;
}

export declare function ChipVariable(props: ChipVariableProps): React.ReactElement;

export interface ChitProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "square" | "circle";
  type?: "fill" | "opacity" | "image" | "gradient" | "instance" | string;
  size?: 24 | 48 | number;
}

export declare function Chit(props: ChitProps): React.ReactElement;

export interface ColorInputProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  type?: "Fill" | "Opacity" | "Image" | "Gradient" | "Variable" | "Instance" | "fill" | "opacity" | "image" | "gradient" | "variable" | "instance";
  shape?: "Circle" | "Square" | "circle" | "square";
  value?: string;
  opacityValue?: string;
  state?: "Rest" | "Focus" | "Disabled" | "rest" | "focus" | "disabled";
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onInput?: React.FormEventHandler<HTMLInputElement>;
  onOpacityChange?: React.ChangeEventHandler<HTMLInputElement>;
  onOpacityInput?: React.FormEventHandler<HTMLInputElement>;
}

export declare function ColorInput(props: ColorInputProps): React.ReactElement;

export interface ComboInputProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  value?: string;
  state?: "Rest" | "Hover" | "Selected Input" | "Selected Chevron" | "Selected input" | "Selected chevron" | "rest" | "hover" | "selected-input" | "selected-chevron";
  iconLead?: boolean | IconSlot;
  variable?: boolean;
  disabled?: boolean;
  dropdownState?: ComboInputDropdownProps["state"];
  /** Fires when the editable value changes. */
  onChange?: React.FormEventHandler<HTMLInputElement>;
  onInput?: React.FormEventHandler<HTMLInputElement>;
  /** Fires when the dropdown trigger is clicked (open your option menu here). */
  onDropdownClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export declare function ComboInput(props: ComboInputProps): React.ReactElement;

export interface ComboInputDropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state?: "Rest" | "Hover" | "Active" | "rest" | "hover" | "active";
  disabled?: boolean;
}

export declare function ComboInputDropdown(props: ComboInputDropdownProps): React.ReactElement;

export interface ChitInputProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  state?: "rest" | "focused";
  closeButton?: boolean;
}

export declare function ChitInput(props: ChitInputProps): React.ReactElement;

export interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  mixed?: boolean;
  onCheckedChange?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "medium" | "compact";
  state?: "rest" | "hover" | "focused" | "disabled";
  disabled?: boolean;
}

export declare function Switch(props: SwitchProps): React.ReactElement;

export interface RadioProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: "input" | "button";
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  state?: "rest" | "hover" | "active" | "focused" | "disabled";
  disabled?: boolean;
}

export declare function Radio(props: RadioProps): React.ReactElement;

export interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: boolean | string;
  labelText?: string;
  description?: boolean;
  descriptionText?: string;
  type?: "Unchecked" | "Checked" | "Mixed" | "unchecked" | "checked" | "mixed";
  checked?: boolean | "unchecked" | "checked" | "mixed";
  defaultType?: "Unchecked" | "Checked" | "Mixed" | "unchecked" | "checked" | "mixed";
  defaultChecked?: boolean | "unchecked" | "checked" | "mixed";
  onCheckedChange?: (checked: "unchecked" | "checked", event: React.MouseEvent<HTMLButtonElement>) => void;
  state?: "Rest" | "Focused" | "rest" | "focused";
  disabled?: boolean;
  muted?: boolean;
  ghost?: boolean;
}

export declare function Checkbox(props: CheckboxProps): React.ReactElement;

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  placement?: "top" | "right" | "bottom" | "left" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  tone?: "standard" | "inverse";
}

export declare function Tooltip(props: TooltipProps): React.ReactElement;

export interface DialogProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  size?: "320" | "480" | "small" | "medium" | "large";
  variant?: "basic" | "advanced" | "embed" | "create-project" | "create-team" | "sharing";
  tone?: "default" | "destructive";
  primaryLabel?: string;
  secondaryLabel?: string;
}

export declare function Dialog(props: DialogProps): React.ReactElement;

export interface DropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name for the trigger. Required. */
  label: string;
  value?: string;
  icon?: IconSlot;
  size?: "Medium" | "Large" | "medium" | "large";
  /** `auto` hugs content (default, matches Figma); `fill` stretches to 100%. */
  width?: "auto" | "fill";
  state?: "Rest" | "Focused" | "Active" | "rest" | "focused" | "active";
  disabled?: boolean;
  stroke?: boolean;
  iconLead?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export declare function Dropdown(props: DropdownProps): React.ReactElement;

export type MenuRowType = "simple" | "complex" | "checkmark" | "toggle" | "toolbar" | "heading" | "divider" | "expand" | "footer";

export interface MenuRowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: MenuRowType;
  label?: string;
  state?: "rest" | "hover" | "disabled";
  submenu?: boolean;
  selected?: boolean;
  lead?: "false" | "avatar" | "icon";
  trail?: "false" | "shortcut" | "badge" | "checkbox" | "mixed";
  shortcut?: string;
  /**
   * Glyph for the selected indicator (shown when `selected`): a check for
   * toggle/multi-select menus, or a dot for single-select / radio-style menus.
   */
  checkVariant?: "check" | "dot";
  toggleState?: "on" | "off";
  hasIcon?: boolean;
  expanded?: boolean;
  alignment?: "default" | "toggle";
  disabled?: boolean;
}

export declare function MenuRow(props: MenuRowProps): React.ReactElement;

/** A thin separator rule between menu groups (Figma "Menu row/Divider"). */
export interface MenuDividerProps extends React.HTMLAttributes<HTMLDivElement> {}
export declare function MenuDivider(props: MenuDividerProps): React.ReactElement;

/** A full-width secondary Button pinned to the bottom of a menu (Figma "Menu row/Footer"). */
export interface MenuFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Footer button label (ignored when `children` is supplied). */
  label?: React.ReactNode;
  /** Custom footer content; replaces the default secondary button. */
  children?: React.ReactNode;
}
export declare function MenuFooter(props: MenuFooterProps): React.ReactElement;

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  variant?: "standard" | "label-only" | "avatars" | "mixed-icons";
  items?: MenuRowProps[];
}

export declare function Menu(props: MenuProps): React.ReactElement;

export interface MenuMultiSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "label-only" | "avatars" | "mixed-icons";
  label?: string;
}

export declare function MenuMultiSelect(props: MenuMultiSelectProps): React.ReactElement;

export interface TextPairProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  description?: React.ReactNode;
  titleAs?: keyof JSX.IntrinsicElements;
  titleClassName?: string;
  descriptionClassName?: string;
}

export declare function TextPair(props: TextPairProps): React.ReactElement;

export interface LabelProps extends React.HTMLAttributes<HTMLElement> {
  /** Label text. */
  label?: React.ReactNode;
  /**
   * Font hierarchy. Accepts "Level 1" to "Level 3" (or 1 to 3); 1 is most
   * prominent, 3 is quietest. Pairs 1:1 with ListCell's `level`.
   */
  hierarchy?: "Level 1" | "Level 2" | "Level 3" | 1 | 2 | 3;
  /** Font-weight. Defaults to "regular". */
  weight?: "regular" | "strong";
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Label is a hierarchical text label for section headings and the like. Its
 * default color is secondary and stays contextual (inherits on dark surfaces).
 */
export declare function Label(props: LabelProps): React.ReactElement;

/** A node in a Tree. Top-level nodes render at depth 0 (e.g. pages). */
export interface TreeItem {
  id: string;
  /** Row label (also accepts `label`). */
  name?: React.ReactNode;
  label?: React.ReactNode;
  /** Layer kind, drives the type glyph + accent (e.g. "frame" | "group" | "text" | "component" | "instance" | "image"). Also accepts `type`. */
  kind?: string;
  type?: string;
  /** Per-row icon slot (ReactNode or icon name); overrides the kind glyph. */
  icon?: React.ReactNode;
  /** Child nodes; presence renders a disclosure chevron. */
  children?: TreeItem[];
  /** Whether the node is expanded (defaults to true). */
  expanded?: boolean;
  /** Highlights the row as part of a secondary selection (e.g. parent of the selected node). */
  secondarySelected?: boolean;
}

export interface TreeRowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  kind?: string;
  depth?: number;
  selected?: boolean;
  secondarySelected?: boolean;
  expanded?: boolean;
  hasChildren?: boolean;
  onToggle?: (id: string, event: React.MouseEvent) => void;
}
export declare function TreeRow(props: TreeRowProps): React.ReactElement;

export interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Nested layer items. */
  items?: TreeItem[];
  /** Accessible name for the tree. */
  label?: string;
  /** Controlled selected node id. */
  selectedId?: string;
  /** Uncontrolled initial selected node id. */
  defaultSelectedId?: string;
  /** Fires when a row is selected. */
  onSelect?: (id: string, node: TreeItem, event: React.MouseEvent) => void;
}
export declare function Tree(props: TreeProps): React.ReactElement;

export interface VerticalCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  gap?: string;
  align?: "stretch" | "start" | "center" | "end";
}

export declare function VerticalCell(props: VerticalCellProps): React.ReactElement;

export interface ListCellProps extends React.HTMLAttributes<HTMLDivElement> {
  componentName?: string;
  level?: 1 | 2 | 3 | number;
  hierarchy?: "panel" | "layer" | "property";
  underline?: boolean;
  /** Vertical alignment of the leading/content/trailing slots. Default `center`. */
  align?: "start" | "center" | "end";
  /** `fill` spans the row (default); `auto` hugs content. */
  width?: "auto" | "fill";
  leading?: React.ReactNode;
  leadingContent?: React.ReactNode;
  content: React.ReactNode;
  trailing?: React.ReactNode;
}

export declare function ListCell(props: ListCellProps): React.ReactElement;

export interface DialogRowProps extends React.HTMLAttributes<HTMLDivElement> {
  leading?: React.ReactNode;
  leadingContent?: React.ReactNode;
  content: React.ReactNode;
  trailing?: React.ReactNode;
}

export declare function DialogRow(props: DialogRowProps): React.ReactElement;

export interface DialogHeaderCellProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  content?: React.ReactNode;
  trailing?: React.ReactNode;
}

export declare function DialogHeaderCell(props: DialogHeaderCellProps): React.ReactElement;

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export declare function DialogHeader(props: DialogHeaderProps): React.ReactElement;

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export declare function DialogBody(props: DialogBodyProps): React.ReactElement;

export interface DialogFooterProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export declare function DialogFooter(props: DialogFooterProps): React.ReactElement;

export interface MenuHeadingCellProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  /** Heading label font hierarchy (default "Level 3"). */
  hierarchy?: "Level 1" | "Level 2" | "Level 3" | 1 | 2 | 3;
  alignment?: "default" | "toggle";
  trailing?: React.ReactNode;
  content?: React.ReactNode;
}

export declare function MenuHeadingCell(props: MenuHeadingCellProps): React.ReactElement;

export interface HeaderActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  children?: React.ReactNode;
}

export declare function HeaderActions(props: HeaderActionsProps): React.ReactElement;

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6 | number;
  hierarchy?: "panel" | "layer" | "property" | string;
  expanded?: boolean;
  actions?: React.ReactNode;
  content?: React.ReactNode;
  trailing?: React.ReactNode;
  underline?: boolean;
  leading?: "auto" | "none" | "icon" | "icon-button";
  leadingIcon?: IconSlot;
  leadingContent?: React.ReactNode;
  onToggle?: React.MouseEventHandler<HTMLButtonElement>;
}

export declare function Header(props: HeaderProps): React.ReactElement;

export interface SegmentedOption {
  id?: string;
  value?: string;
  label: string;
  icon?: IconSlot;
  selected?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface SegmentedControlProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, option: SegmentedOption, index: number, event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "icon" | "label";
  state?: "rest" | "disabled";
  disabled?: boolean;
}

export declare function SegmentedControl(props: SegmentedControlProps): React.ReactElement;

export interface TabItem {
  id?: string;
  value?: string;
  panelId?: string;
  label: string;
  selected?: boolean;
  singleTab?: boolean;
  state?: "rest" | "focused" | "hover";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, TabItem {}

export declare function Tab(props: TabProps): React.ReactElement;

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, tab: TabItem, index: number, event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "underline" | "pill";
  size?: "medium" | "compact";
  state?: "rest" | "focused" | "hover";
}

export declare function Tabs(props: TabsProps): React.ReactElement;

export interface CanvasSelectionOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "standard" | "textEdit" | "component" | "instance" | "autoLayout" | "smartSelectionHorizontal" | "smartSelectionVertical" | "smartSelectionGrid" | "imageCrop" | "vector" | "slice" | "reparenting" | "cover";
  label?: string;
  width?: number;
  height?: number;
  direction?: "horizontal" | "vertical" | "both";
  showDimensions?: boolean;
}

export declare function CanvasSelectionOverlay(props: CanvasSelectionOverlayProps): React.ReactElement;

declare const components: {
  Button: typeof Button;
  IconButton: typeof IconButton;
  ToggleButton: typeof ToggleButton;
  SplitButton: typeof SplitButton;
  InputField: typeof InputField;
  NumericInput: typeof NumericInput;
  NumericInputMulti: typeof NumericInputMulti;
  ChipVariable: typeof ChipVariable;
  Chit: typeof Chit;
  ColorInput: typeof ColorInput;
  ComboInput: typeof ComboInput;
  ComboInputDropdown: typeof ComboInputDropdown;
  ChitInput: typeof ChitInput;
  Switch: typeof Switch;
  Radio: typeof Radio;
  Checkbox: typeof Checkbox;
  Tooltip: typeof Tooltip;
  Dialog: typeof Dialog;
  Dropdown: typeof Dropdown;
  Menu: typeof Menu;
  MenuRow: typeof MenuRow;
  MenuMultiSelect: typeof MenuMultiSelect;
  VerticalCell: typeof VerticalCell;
  TextPair: typeof TextPair;
  Label: typeof Label;
  ListCell: typeof ListCell;
  DialogRow: typeof DialogRow;
  DialogHeaderCell: typeof DialogHeaderCell;
  DialogHeader: typeof DialogHeader;
  DialogBody: typeof DialogBody;
  DialogFooter: typeof DialogFooter;
  MenuHeadingCell: typeof MenuHeadingCell;
  HeaderActions: typeof HeaderActions;
  Header: typeof Header;
  SegmentedControl: typeof SegmentedControl;
  Tab: typeof Tab;
  Tabs: typeof Tabs;
  CanvasSelectionOverlay: typeof CanvasSelectionOverlay;
};

export interface ComposaReactFactoryOptions {
  Icon?: React.ComponentType<ComposaIconProps>;
}

export declare function createComposaComponents(ReactRuntime: typeof React, options?: ComposaReactFactoryOptions): typeof components;

export default components;
