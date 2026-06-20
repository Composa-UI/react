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
 * icon BOX (square): small 20px / default 24px / large 28px / xlarge 32px.
 */
export type ButtonFamilySize = "small" | "medium" | "large" | "xlarge";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconSlot;
  label: string;
  /** Persistent selected/pressed-on state (survives a click). */
  selected?: boolean;
  pressed?: boolean;
  /**
   * Marks this as a DIALOG-OPENER: the button is active ONLY while its
   * dialog/popover is open. Drive it with the dialog's open state and clear it on
   * outside-click / dialog-close — the button reflects open/closed (active
   * appearance + `aria-expanded`) and untoggles automatically. Distinct from the
   * persistent `selected`/`pressed`. While open, the intrinsic tooltip is
   * suppressed. When undefined the button is a normal action/toggle.
   */
  dialogOpen?: boolean;
  /** Icon box size — Composa addition (square): small 20px / default 24px / large 28px / xlarge 32px. */
  size?: ButtonFamilySize;
  state?: "rest" | "hover" | "active" | "focused" | "primary-active" | "secondary-active" | "primary-focus" | "secondary-focus" | "disabled";
  disabled?: boolean;
  context?: "default" | "on-selected";
  /** Shares Button's variant vocabulary. `highlighted` kept for backward compatibility. */
  variant?: ButtonVariant | "highlighted";
  component?: "IconButton" | "ToggleButton" | "DialogToggleButton" | "SplitButton" | string;
  /** Render a Composa Tooltip for the icon-only control. Defaults to true. */
  tooltip?: boolean;
  /** Tooltip copy. Defaults to `label`. */
  tooltipLabel?: string;
  /** Tooltip placement around the icon button. */
  tooltipPlacement?: TooltipProps["placement"];
  /** Tooltip tone. */
  tooltipTone?: TooltipProps["tone"];
}

export declare function IconButton(props: IconButtonProps): React.ReactElement;

export interface ToggleButtonProps extends Omit<IconButtonProps, "component" | "selected"> {
  /** Adds the corner dot marking a toggle that opens a dialog/popover. */
  dialog?: boolean;
  /**
   * When `dialog` is set, drives the dialog-opener open/closed state instead of
   * the persistent `pressed`. Clear it on outside-click / dialog-close and the
   * button untoggles automatically.
   */
  dialogOpen?: boolean;
}

export declare function ToggleButton(props: ToggleButtonProps): React.ReactElement;

export interface SplitButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  icon?: IconSlot;
  menuLabel?: string;
  /** Tooltip copy for the action half. Defaults to `label`; set to empty string to suppress. */
  actionTooltipLabel?: string;
  /** Tooltip copy for the menu half. Defaults to `menuLabel`; set to empty string to suppress. */
  menuTooltipLabel?: string;
  /** Tooltip placement for both halves. */
  tooltipPlacement?: TooltipProps["placement"];
  /** Shares Button's variant vocabulary (defaults to `secondary`). */
  variant?: ButtonVariant;
  size?: ButtonFamilySize;
  /** Width axis, same pattern as Button: hug content (`auto`) or fill 100% (`fill`). Legacy `default`/`wide` still resolve. */
  width?: "auto" | "fill" | "default" | "wide";
  state?: IconButtonProps["state"];
  disabled?: boolean;
  /**
   * Marks the split's menu surface as open. While true, BOTH halves suppress
   * their tooltip (no tooltip + menu co-show) and the menu half reflects the
   * open state, mirroring the IconButton `dialogOpen` rule.
   */
  menuOpen?: boolean;
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
  /** Optional Composa Tooltip copy for the input control. */
  tooltipLabel?: string;
  /** Tooltip placement around the input control. */
  tooltipPlacement?: TooltipProps["placement"];
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
  /** Disables the whole control (frame + both value inputs). */
  disabled?: boolean;
  /** Disables the whole opacity sub-input (chrome + value). */
  opacityDisabled?: boolean;
  /**
   * Reads only the color VALUE text as disabled while the input chrome stays
   * active-looking — used by the hidden-paint (eye) action so just the value
   * greys out, not the whole split/input.
   */
  valueDisabled?: boolean;
  /** Reads only the opacity VALUE text (e.g. "100") as disabled; chrome stays active. */
  opacityValueDisabled?: boolean;
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

export interface OverlayLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  placement?: "below-trigger" | "bottom-left" | "bottom-right" | "top" | "top-left" | "top-right" | "left" | "right" | "left-of-inspector" | "inspector-dialog" | "tooltip";
  align?: "start" | "center" | "end";
  positioning?: "trigger" | "tooltip";
  role?: React.AriaRole;
  label?: string;
  children?: React.ReactNode;
  overlayRef?: React.Ref<HTMLDivElement>;
}

export declare function OverlayLayer(props: OverlayLayerProps): React.ReactElement | null;

export interface OverlayHostProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export declare function OverlayHost(props: OverlayHostProps): React.ReactElement;

export interface OverlayPortalProps extends OverlayLayerProps {
  anchorRef: React.RefObject<HTMLElement | null>;
  followAnchor?: boolean;
}

export declare function OverlayPortal(props: OverlayPortalProps): React.ReactElement | null;

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
  defaultValue?: string;
  options?: Array<string | { label: string; value?: string; shortcut?: string; disabled?: boolean }>;
  icon?: IconSlot;
  size?: "Medium" | "Large" | "medium" | "large";
  /** `auto` hugs content (default, matches Figma); `fill` stretches to 100%. */
  width?: "auto" | "fill";
  state?: "Rest" | "Focused" | "Active" | "rest" | "focused" | "active";
  disabled?: boolean;
  stroke?: boolean;
  iconLead?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  menuClassName?: string;
  onOpenChange?: (open: boolean, event: Event | React.SyntheticEvent) => void;
  onValueChange?: (value: string, option: string | { label: string; value?: string; shortcut?: string; disabled?: boolean }, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export declare function Dropdown(props: DropdownProps): React.ReactElement;

export type MenuRowType = "simple" | "complex" | "checkmark" | "toggle" | "toolbar" | "heading" | "divider" | "expand" | "footer";

export interface MenuRowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: MenuRowType;
  label?: string;
  state?: "rest" | "hover" | "disabled";
  submenu?: boolean;
  selected?: boolean;
  lead?: "false" | "avatar" | "icon" | string;
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
  /** Primary slot. Maps to body-large. A string is wrapped in the styled element; a ReactNode (e.g. a Label) renders as-is. */
  content?: React.ReactNode;
  /** Supporting slot. Maps to body-medium. */
  body?: React.ReactNode;
  /** Quietest slot. Maps to body-small. Sits below the body by default. */
  metadata?: React.ReactNode;
  /** Whether the metadata slot sits above or below the body. Defaults to "bottom". */
  metadataPlacement?: "top" | "bottom";
  /** Backward-compatible alias for `content`. */
  title?: React.ReactNode;
  /** Backward-compatible alias for `body`. */
  description?: React.ReactNode;
  /** Backward-compatible alias for `body`. */
  detail?: React.ReactNode;
  /** Tag for string `content`/`title`. Defaults to "strong". */
  titleAs?: keyof JSX.IntrinsicElements;
  titleClassName?: string;
  contentClassName?: string;
  descriptionClassName?: string;
  bodyClassName?: string;
  metadataClassName?: string;
}

/**
 * TextPair is a three-slot vertical text stack: `content` (body-large),
 * `body` (body-medium), and `metadata` (body-small). `metadataPlacement` moves
 * the metadata slot above or below the body. String slots are wrapped in the
 * styled element; a ReactNode (e.g. a Label) renders as-is so it keeps its own
 * size. `title`/`description` remain as backward-compatible aliases.
 */
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
  /**
   * When a node is selected, tint its exposed descendant rows with the muted
   * secondary selection color so the selected subtree reads as a group. Defaults
   * to true; set false to opt out (explicit `item.secondarySelected` still tints).
   */
  childHighlight?: boolean;
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

export interface ComposaAppIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Accessible name for the brand mark (also the conceptual fallback). */
  label?: string;
  /** Initial letter kept as an accessible/fallback hint; the visible glyph is the Composa brand mark. */
  initials?: string;
}

export declare function ComposaAppIcon(props: ComposaAppIconProps): React.ReactElement;

export interface NavigationRailItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  label: string;
  icon?: React.ReactNode | string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export declare function NavigationRailItem(props: NavigationRailItemProps): React.ReactElement;

export interface AppNavigationRailItem extends Omit<NavigationRailItemProps, "onClick" | "value"> {
  value: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface AppNavigationRailProps extends React.HTMLAttributes<HTMLElement> {
  appIcon?: React.ReactNode;
  appLabel?: string;
  items?: AppNavigationRailItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, item: AppNavigationRailItem, event: React.MouseEvent<HTMLButtonElement>) => void;
  onAppClick?: React.MouseEventHandler<HTMLButtonElement>;
  label?: string;
}

export declare function AppNavigationRail(props: AppNavigationRailProps): React.ReactElement;

export interface NavigatorHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Bold file title. */
  title?: React.ReactNode;
  /** Subdued project / context name shown below the title. */
  project?: React.ReactNode;
  /** Click handler for the title row (renders as a button when set). */
  onTitleClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Shows the title disclosure chevron (defaults to true). */
  titleMenu?: boolean;
  /** Overrides the trailing action slot (defaults to a sidebar-toggle icon button). */
  trailing?: React.ReactNode;
  /** Click handler for the default sidebar-toggle action. */
  onToggle?: React.MouseEventHandler<HTMLButtonElement>;
  /** Accessible label for the toggle action. */
  toggleLabel?: string;
  /** Icon name/node for the toggle action. */
  toggleIcon?: React.ReactNode | string;
  /** Accessible label for the header group. */
  label?: string;
}

export declare function NavigatorHeader(props: NavigatorHeaderProps): React.ReactElement;

export interface CollapseHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section label (e.g. "Pages", "Layers"). */
  label?: React.ReactNode;
  /** Controlled expanded state. */
  expanded?: boolean;
  /** Uncontrolled initial expanded state (defaults to true). */
  defaultExpanded?: boolean;
  /** Fires with the next expanded state when the disclosure is toggled. */
  onToggle?: (expanded: boolean, event: React.MouseEvent) => void;
  /** Renders the disclosure chevron + button (defaults to true). */
  disclosure?: boolean;
  /** Trailing action slot (e.g. an add button). */
  trailing?: React.ReactNode;
}

export declare function CollapseHeader(props: CollapseHeaderProps): React.ReactElement;

export interface SlideThumbProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 1-based slide index shown in the gutter. */
  index?: number;
  /** Accessible label (defaults to "Slide {index}"). */
  label?: string;
  /** Thumbnail source string or a custom preview node. */
  thumbnail?: React.ReactNode | string;
  /** Selected (current) slide. */
  selected?: boolean;
}

export declare function SlideThumb(props: SlideThumbProps): React.ReactElement;

export interface SlideListItem {
  id?: string;
  /** Override the displayed index (defaults to position + 1). */
  index?: number;
  label?: string;
  thumbnail?: React.ReactNode | string;
}

export interface SlideListProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: SlideListItem[];
  /** Controlled selected slide id. */
  selectedId?: string | number;
  /** Uncontrolled initial selected slide id. */
  defaultSelectedId?: string | number;
  onSelect?: (id: string | number, item: SlideListItem, event: React.MouseEvent) => void;
  label?: string;
}

export declare function SlideList(props: SlideListProps): React.ReactElement;

export interface EditorNavigatorProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  project?: React.ReactNode;
  onToggle?: React.MouseEventHandler<HTMLButtonElement>;
  headerProps?: Partial<NavigatorHeaderProps>;
  /** Flat page list (Tree without nesting). */
  pages?: TreeItem[];
  selectedPageId?: string;
  defaultSelectedPageId?: string;
  onPageSelect?: (id: string, node: TreeItem, event: React.MouseEvent) => void;
  onPageAdd?: React.MouseEventHandler<HTMLButtonElement>;
  pagesLabel?: string;
  /** Nested layer list (Tree). */
  layers?: TreeItem[];
  selectedLayerId?: string;
  defaultSelectedLayerId?: string;
  onLayerSelect?: (id: string, node: TreeItem, event: React.MouseEvent) => void;
  layersLabel?: string;
  /** Controlled page-region height in px. */
  pageHeight?: number;
  /** Uncontrolled initial page-region height in px. */
  defaultPageHeight?: number;
  onPageHeightChange?: (height: number) => void;
  minPageHeight?: number;
  maxPageHeight?: number;
  label?: string;
}

export declare function EditorNavigator(props: EditorNavigatorProps): React.ReactElement;

export interface SlidesNavigatorProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  project?: React.ReactNode;
  onToggle?: React.MouseEventHandler<HTMLButtonElement>;
  headerProps?: Partial<NavigatorHeaderProps>;
  /** Renders the file-title header (defaults to true). */
  showHeader?: boolean;
  slides?: SlideListItem[];
  selectedSlideId?: string | number;
  defaultSelectedSlideId?: string | number;
  onSlideSelect?: (id: string | number, item: SlideListItem, event: React.MouseEvent) => void;
  onNewSlide?: React.MouseEventHandler<HTMLButtonElement>;
  onAddSlide?: React.MouseEventHandler<HTMLButtonElement>;
  newSlideLabel?: string;
  slidesLabel?: string;
  label?: string;
}

export declare function SlidesNavigator(props: SlidesNavigatorProps): React.ReactElement;

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
  /**
   * Segment rendering. Defaults are inferred from the options: label-only
   * options (labels, no icons) default to `"label"`; otherwise `"icon"`. Set
   * explicitly to override. (Previously always defaulted to `"icon"`, which
   * rendered label-only options blank.)
   */
  variant?: "icon" | "label";
  /** `auto` hugs segments; `fill` stretches segments evenly across the available width. */
  width?: "auto" | "fill";
  state?: "rest" | "disabled";
  disabled?: boolean;
}

export declare function SegmentedControl(props: SegmentedControlProps): React.ReactElement;

export interface ControlGroupItem {
  id?: string;
  value?: string;
  label: string;
  icon?: IconSlot;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ControlGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  items: ControlGroupItem[];
  size?: "small" | "medium" | "large" | string;
  variant?: "ghost" | "secondary" | "primary" | string;
  disabled?: boolean;
  onAction?: (item: ControlGroupItem, index: number, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export declare function ControlGroup(props: ControlGroupProps): React.ReactElement;

export type AlignmentPickerValue =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | string;

export interface AlignmentPickerOption {
  id?: string;
  value?: AlignmentPickerValue;
  label: string;
  tooltipLabel?: string;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface AlignmentPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  value?: AlignmentPickerValue;
  defaultValue?: AlignmentPickerValue;
  options?: AlignmentPickerOption[];
  /** `auto` renders the compact 88px picker; `fill` stretches the 3x3 grid to the available width. */
  width?: "auto" | "fill";
  disabled?: boolean;
  tooltipPlacement?: TooltipProps["placement"];
  onValueChange?: (value: AlignmentPickerValue, option: AlignmentPickerOption, index: number, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export declare function AlignmentPicker(props: AlignmentPickerProps): React.ReactElement;

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
  /**
   * Full-width baseline rule below the tab row. Defaults to `true`. Set `false`
   * to remove it — e.g. inspector tabs, which per Figma carry no underline. The
   * underline variant's per-tab selected indicator is independent of this rule.
   */
  divider?: boolean;
}

export declare function Tabs(props: TabsProps): React.ReactElement;

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  initials?: string;
  src?: string;
  alt?: string;
  variant?: "yellow" | "blue" | "green" | "purple" | "grey" | "red" | "pink" | "overflow-unread" | "overflow-read" | string;
  size?: "small" | "medium" | "large";
  shape?: "circle" | "square";
  state?: "default" | "disabled";
}

export declare function Avatar(props: AvatarProps): React.ReactElement;

export interface MultiplayerControlProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  initials?: string;
  label?: string;
  tooltipLabel?: string;
  tooltipPlacement?: TooltipProps["placement"];
  expanded?: boolean;
  color?: "yellow" | "blue" | "green" | "purple" | string;
  avatar?: AvatarProps;
}

export declare function MultiplayerControl(props: MultiplayerControlProps): React.ReactElement;

/** A composer action descriptor (becomes an IconButton) or a ready node. */
export interface CommentComposerAction {
  icon?: IconSlot | string;
  label?: string;
  tooltipLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export interface CommentComposerAttachment {
  id?: string | number;
  label?: string;
}

/**
 * Reusable composer / chat input. Presentational + controlled. Drive
 * `value`/`onChange`; handle `onSubmit`. Enter submits, Shift+Enter newlines.
 * Doubles as the app's AI side-chat input via `mode` (a scope/model selector
 * slot), `attachments`, and the trailing `actions` cluster.
 */
export interface CommentComposerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onInput" | "onSubmit"> {
  value?: string;
  placeholder?: string;
  layout?: "card" | "inline";
  avatar?: AvatarProps | React.ReactElement | null;
  /** Trailing action cluster. Defaults to emoji/mention/attach on the card layout. Pass [] to drop. */
  actions?: Array<CommentComposerAction | React.ReactElement> | CommentComposerAction | React.ReactElement;
  /** Leading scope/mode slot (e.g. a model or scope selector for the chat input). */
  mode?: React.ReactNode;
  attachments?: Array<CommentComposerAttachment | React.ReactElement>;
  submitIcon?: IconSlot | string;
  submitLabel?: string;
  submitDisabled?: boolean;
  submitVariant?: IconButtonProps["variant"];
  /** Allow submit even when the field is empty (e.g. attachment-only sends). */
  autoSubmitEmpty?: boolean;
  disabled?: boolean;
  rows?: number;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onInput?: React.FormEventHandler<HTMLTextAreaElement>;
  onSubmit?: (value: string, event: React.SyntheticEvent) => void;
  onAttachmentRemove?: (attachment: CommentComposerAttachment | React.ReactElement, index: number) => void;
}

export declare function CommentComposer(props: CommentComposerProps): React.ReactElement;

export interface CommentItemProps extends React.HTMLAttributes<HTMLDivElement> {
  author?: string;
  timestamp?: React.ReactNode;
  body?: React.ReactNode;
  avatar?: AvatarProps | React.ReactElement | null;
  /** Reactions / reply affordances rendered under the body. */
  footer?: React.ReactNode;
}

export declare function CommentItem(props: CommentItemProps): React.ReactElement;

export interface CommentThreadWindowProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  comments?: Array<CommentItemProps | React.ReactElement>;
  /** Titlebar action cluster. Defaults from onMore/onResolve/onClose if provided. */
  actions?: Array<CommentComposerAction | React.ReactElement> | CommentComposerAction | React.ReactElement;
  composer?: CommentComposerProps | React.ReactElement;
  emptyState?: React.ReactNode;
  onResolve?: React.MouseEventHandler<HTMLButtonElement>;
  onMore?: React.MouseEventHandler<HTMLButtonElement>;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

export declare function CommentThreadWindow(props: CommentThreadWindowProps): React.ReactElement;

export type BadgeTone =
  | "default"
  | "brand"
  | "figjam"
  | "component"
  | "danger"
  | "warning"
  | "success"
  | "merged"
  | "archived"
  | "invert"
  | "selected"
  | "feedback"
  | "menu";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Text/label badge content. */
  label?: React.ReactNode;
  /** Number badge content; clamps to `{max}+` when over `max`. */
  count?: number | string;
  /** Bare status dot (no text) — the unread indicator. */
  dot?: boolean;
  tone?: BadgeTone;
  /** Strong filled form instead of the subtle tinted form. */
  strong?: boolean;
  size?: "small" | "large";
  /** Leading glyph (e.g. the branch glyph for merged/archived). */
  icon?: React.ReactNode | string;
  max?: number;
  /** Corner-position the badge so it can overlay a host (button/avatar). */
  overlay?: boolean;
  overlayPlacement?: "top-end" | "top-start" | "bottom-end" | "bottom-start";
}

export declare function Badge(props: BadgeProps): React.ReactElement;

export interface BadgeAnchorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The host control the badge overlays (IconButton, Avatar, nav item). */
  children?: React.ReactNode;
  /** Indicator: Badge props, a number (count), true (dot), or a Badge element. */
  badge?: BadgeProps | number | string | boolean | React.ReactElement | null;
  placement?: "top-end" | "top-start" | "bottom-end" | "bottom-start";
}

export declare function BadgeAnchor(props: BadgeAnchorProps): React.ReactElement;

export interface NotificationBellProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: React.ReactNode | string;
  label?: string;
  /** Unread count; > 0 shows a count badge. */
  count?: number | string;
  /** Show the bare unread dot when there is no count. */
  dot?: boolean;
  max?: number;
  badgeTone?: BadgeTone;
  size?: "small" | "medium" | "large";
  placement?: "top-end" | "top-start" | "bottom-end" | "bottom-start";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export declare function NotificationBell(props: NotificationBellProps): React.ReactElement;

export interface NotificationAction {
  label?: React.ReactNode;
  tone?: "default" | "danger";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: React.ReactNode;
  icon?: React.ReactNode | string;
  avatar?: AvatarProps | React.ReactElement;
  /** Action column; 1-2 stacked CTAs. Defaults from onAction/onDismiss. */
  actions?: Array<NotificationAction | React.ReactElement>;
  onAction?: React.MouseEventHandler<HTMLButtonElement>;
  actionLabel?: React.ReactNode;
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
  dismissLabel?: React.ReactNode;
  /** Allow the message to span up to two lines (truncates). */
  multiline?: boolean;
  tone?: "default" | "danger";
}

export declare function Notification(props: NotificationProps): React.ReactElement;

export interface VisualBellAction {
  label?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface VisualBellProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: React.ReactNode;
  icon?: React.ReactNode | string;
  /** Show a spinner in the leading slot (in-progress toast). */
  loading?: boolean;
  /** Secondary trailing count, e.g. "1/134". */
  count?: React.ReactNode;
  actions?: Array<VisualBellAction | React.ReactElement> | VisualBellAction | React.ReactElement;
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
  dismissLabel?: string;
  tone?: "default" | "danger";
}

export declare function VisualBell(props: VisualBellProps): React.ReactElement;

export interface InspectorHeaderProps extends React.HTMLAttributes<HTMLElement> {
  collaborator?: string | MultiplayerControlProps;
  /**
   * Design/Animate mode tabs. Pass `null` (or an empty array) to render no tabs
   * — equivalent to `showTabs={false}`. The zoom control stays regardless.
   */
  tabs?: TabItem[] | null;
  /**
   * Render the mode tabs (defaults to true). Set `false` for inspector states
   * with no mode toggle, so the header doesn't leak a dead Design/Animate control.
   */
  showTabs?: boolean;
  selectedTab?: string;
  zoom?: string;
  playLabel?: string;
  shareLabel?: string;
  onPlay?: React.MouseEventHandler<HTMLButtonElement>;
  onPlayMenu?: React.MouseEventHandler<HTMLButtonElement>;
  onShare?: React.MouseEventHandler<HTMLButtonElement>;
  onTabChange?: TabsProps["onValueChange"];
  onZoomClick?: React.MouseEventHandler<HTMLButtonElement>;
  onZoomChange?: (value: string, event: Event | React.SyntheticEvent) => void;
}

export declare function InspectorHeader(props: InspectorHeaderProps): React.ReactElement;

export interface LayerHeaderAction {
  id?: string;
  icon: React.ReactNode | React.ComponentType | string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface LayerHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  actions?: LayerHeaderAction[];
  onTitleClick?: React.MouseEventHandler<HTMLButtonElement>;
  onAction?: (action: LayerHeaderAction, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export declare function LayerHeader(props: LayerHeaderProps): React.ReactElement;

export interface PositionSectionAlignment {
  horizontal?: "left" | "center" | "right" | string;
  vertical?: "top" | "middle" | "bottom" | string;
}

export interface PositionSectionPosition {
  x?: string;
  y?: string;
}

export interface PositionSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  alignment?: PositionSectionAlignment;
  position?: PositionSectionPosition;
  rotation?: string;
  onAlignmentChange?: (axis: "horizontal" | "vertical", value: string, option: unknown, event: React.MouseEvent<HTMLButtonElement>) => void;
  onPositionChange?: (axis: "x" | "y", value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onRotationChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onConstraintsClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMoreClick?: React.MouseEventHandler<HTMLButtonElement>;
  onRotateClick?: React.MouseEventHandler<HTMLButtonElement>;
  onFlipHorizontalClick?: React.MouseEventHandler<HTMLButtonElement>;
  onFlipVerticalClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export declare function PositionSection(props: PositionSectionProps): React.ReactElement;

export interface LayoutSectionResizing {
  width?: "auto-width" | "auto-height" | "fixed" | "hug" | "fill" | string;
  height?: "auto-width" | "auto-height" | "fixed" | "hug" | "fill" | string;
}

export interface LayoutSectionDimensions {
  width?: string;
  height?: string;
}

export interface LayoutSectionPadding {
  horizontal?: string;
  vertical?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export interface LayoutSectionProps extends React.HTMLAttributes<HTMLElement> {
  mode?: "frame" | "selection" | "autoLayout" | "auto-layout";
  title?: string;
  flow?: "none" | "horizontal" | "vertical" | "wrap" | string;
  resizing?: LayoutSectionResizing;
  dimensions?: LayoutSectionDimensions;
  alignment?: AlignmentPickerValue;
  spacing?: string;
  padding?: LayoutSectionPadding;
  clipContent?: boolean;
  individualPadding?: boolean;
  onFlowChange?: SegmentedControlProps["onValueChange"];
  onResizingChange?: (axis: string, value: string, option: unknown, event: React.MouseEvent<HTMLButtonElement>) => void;
  onDimensionChange?: (axis: string, value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onAlignmentChange?: AlignmentPickerProps["onValueChange"];
  onSpacingChange?: (axis: string, value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onPaddingChange?: (axis: string, value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onResizeToFit?: React.MouseEventHandler<HTMLButtonElement>;
  onAutoLayoutToggle?: React.MouseEventHandler<HTMLButtonElement>;
  onLockAspectRatio?: React.MouseEventHandler<HTMLButtonElement>;
  onAutoLayoutSettings?: React.MouseEventHandler<HTMLButtonElement>;
  onIndividualPaddingToggle?: React.MouseEventHandler<HTMLButtonElement>;
  onClipContentChange?: CheckboxProps["onCheckedChange"];
}

export declare function LayoutSection(props: LayoutSectionProps): React.ReactElement;

export interface PaintSectionItem {
  id?: string;
  type?: string;
  label?: string;
  value?: string;
  opacityValue?: string;
  visible?: boolean;
  disabled?: boolean;
  dialogOpen?: boolean;
  icon?: string;
  settingsIcon?: string;
  scale?: string;
  format?: string;
  selectionCount?: number;
}

export interface PaintSectionProps extends React.HTMLAttributes<HTMLElement> {
  items?: PaintSectionItem[];
  defaultItems?: PaintSectionItem[];
  showStylesAction?: boolean;
  showAddAction?: boolean;
  showAddActionWhenExpanded?: boolean;
  hideWhenEmpty?: boolean;
  renderCollapsedActions?: (context: { items: PaintSectionItem[] }) => React.ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  onAdd?: React.MouseEventHandler<HTMLButtonElement>;
  onRemove?: (item: PaintSectionItem, index: number, event: React.MouseEvent<HTMLButtonElement>) => void;
  onVisibilityToggle?: (item: PaintSectionItem, index: number, event: React.MouseEvent<HTMLButtonElement>) => void;
  onValueChange?: (item: PaintSectionItem, index: number, value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onOpacityChange?: (item: PaintSectionItem, index: number, value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type FillSectionProps = PaintSectionProps;
export interface StrokeControlsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: string;
  weight?: string;
  align?: "inside" | "center" | "outside" | string;
  settingsOpen?: boolean;
  onPositionChange?: (position: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  onWeightChange?: (weight: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onAlignChange?: (align: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  onSettingsOpenChange?: (open: boolean, event: Event | React.SyntheticEvent) => void;
}
export interface StrokeSectionProps extends PaintSectionProps {
  showControls?: boolean;
  strokeControlsProps?: StrokeControlsSectionProps;
}
export interface EffectsSectionProps extends PaintSectionProps {
  effectDialogOpenId?: string;
  defaultEffectDialogOpenId?: string;
  onEffectTypeToggle?: (item: PaintSectionItem, index: number, open: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  onEffectValueClick?: (item: PaintSectionItem, index: number, event: React.MouseEvent<HTMLButtonElement>) => void;
}
export type SelectionColorsSectionProps = PaintSectionProps;
export type LayoutGuideSectionProps = PaintSectionProps;
export type ExportSectionProps = PaintSectionProps;

export interface ColorPickerDialogProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  label?: string;
  value?: string;
  opacity?: string;
  paintType?: "solid" | "gradient" | "image" | "video";
  format?: "hex" | "rgb" | "hsl" | "css";
  tab?: "custom" | "libraries";
  swatchSet?: string;
  swatches?: string[];
  gradientType?: "linear" | "radial" | "angular" | "diamond";
  gradientStops?: Array<{ position: number; color: string; opacity: number }>;
  imageFillMode?: "fill" | "fit" | "crop" | "tile";
  onValueChange?: (value: string, event?: React.SyntheticEvent) => void;
  onOpacityChange?: (opacity: string, event?: React.SyntheticEvent) => void;
  onPaintTypeChange?: (paintType: string, event?: React.SyntheticEvent) => void;
  onFormatChange?: (format: string, event?: React.SyntheticEvent) => void;
  onTabChange?: (tab: string, event?: React.SyntheticEvent) => void;
  onGradientTypeChange?: (gradientType: string, event?: React.SyntheticEvent) => void;
  onGradientStopsChange?: (stops: Array<{ position: number; color: string; opacity: number }>, event?: React.SyntheticEvent) => void;
  onImageFillModeChange?: (fillMode: string, event?: React.SyntheticEvent) => void;
  onImageUpload?: (file: File, event?: React.SyntheticEvent) => void;
  onEyedropper?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClose?: (event?: React.SyntheticEvent) => void;
}
export interface ColorPickerTriggerProps extends React.HTMLAttributes<HTMLElement> {
  open?: boolean;
  defaultOpen?: boolean;
  value?: string;
  label?: string;
  onOpenChange?: (open: boolean, event?: Event | React.SyntheticEvent) => void;
  dialogProps?: ColorPickerDialogProps;
}
export interface TypographyDialogProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  tab?: "basics" | "details" | "variable";
  fontFamily?: string;
  fontStyle?: string;
  fontSize?: string;
  lineHeight?: string;
  letterSpacing?: string;
  align?: "left" | "center" | "right" | "justify";
  decoration?: "none" | "underline" | "strikethrough";
  textCase?: "none" | "upper" | "lower" | "title" | "small-caps";
  verticalTrim?: "standard" | "cap-height";
  listStyle?: "none" | "bulleted" | "numbered";
  paragraphSpacing?: string;
  truncate?: "none" | "truncate";
  previewText?: string;
  typeStyle?: string;
  /** Variable tab: Slant axis value (degrees, as a string). */
  slant?: string;
  /** Variable tab: Weight axis value (100..900, as a string). */
  weight?: string;
  /** Details tab: OpenType feature values keyed by feature id (e.g. `{ ligatures: "on" }`). */
  details?: Record<string, string>;
  onTabChange?: (value: string, tab: Record<string, unknown>, event?: React.SyntheticEvent) => void;
  onFontFamilyChange?: (value: string, font?: Record<string, unknown>, event?: React.SyntheticEvent) => void;
  onFontStyleChange?: (value: string, event?: React.SyntheticEvent) => void;
  onFontSizeChange?: (value: string, event?: React.SyntheticEvent) => void;
  onLineHeightChange?: (value: string, event?: React.SyntheticEvent) => void;
  onLetterSpacingChange?: (value: string, event?: React.SyntheticEvent) => void;
  onAlignChange?: (value: string, event?: React.SyntheticEvent) => void;
  onDecorationChange?: (value: string, event?: React.SyntheticEvent) => void;
  onCaseChange?: (value: string, event?: React.SyntheticEvent) => void;
  onVerticalTrimChange?: (value: string, event?: React.SyntheticEvent) => void;
  onListStyleChange?: (value: string, event?: React.SyntheticEvent) => void;
  onParagraphSpacingChange?: (value: string, event?: React.SyntheticEvent) => void;
  onTruncateChange?: (value: string, event?: React.SyntheticEvent) => void;
  onTypeStyleChange?: (value: string, style: Record<string, unknown>, event?: React.SyntheticEvent) => void;
  /** Variable tab: fired when the Slant axis slider/value changes. */
  onSlantChange?: (value: string, event?: React.SyntheticEvent) => void;
  /** Variable tab: fired when the Weight axis slider/value changes. */
  onWeightChange?: (value: string, event?: React.SyntheticEvent) => void;
  /** Details tab: fired when an OpenType feature changes. `key` is the feature id, `value` the new value. */
  onDetailChange?: (key: string, value: string, event?: React.SyntheticEvent) => void;
  onClose?: (event?: React.SyntheticEvent) => void;
}
export interface TypeStyleMenuProps {
  selected?: string;
  onSelect?: (value: string, style: Record<string, unknown>, event?: React.SyntheticEvent) => void;
  onEdit?: (value: string, style: Record<string, unknown>, event?: React.SyntheticEvent) => void;
  onClose?: (event?: React.SyntheticEvent) => void;
}
export interface TypeStyleRowProps {
  style: Record<string, unknown>;
  selected?: boolean;
  onSelect?: (value: string, style: Record<string, unknown>, event?: React.SyntheticEvent) => void;
  onEdit?: (value: string, style: Record<string, unknown>, event?: React.SyntheticEvent) => void;
}
export interface FontsPickerMenuProps {
  selected?: string;
  query?: string;
  onQueryChange?: (value: string) => void;
  onSelect?: (value: string, font: Record<string, unknown>, event?: React.SyntheticEvent) => void;
  onClose?: (event?: React.SyntheticEvent) => void;
  onApplyVariable?: (event?: React.SyntheticEvent) => void;
}
export interface LayoutGuideSettingsDialogProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  guideType?: "columns" | "rows" | "grid";
  count?: string;
  color?: string;
  opacity?: string;
  behavior?: string;
  size?: string;
  margin?: string;
  gutter?: string;
  onGuideTypeChange?: (value: string, event?: React.SyntheticEvent) => void;
  onCountChange?: (value: string, event?: React.SyntheticEvent) => void;
  onColorChange?: (value: string, event?: React.SyntheticEvent) => void;
  onOpacityChange?: (value: string, event?: React.SyntheticEvent) => void;
  onBehaviorChange?: (value: string, event?: React.SyntheticEvent) => void;
  onSizeChange?: (value: string, event?: React.SyntheticEvent) => void;
  onMarginChange?: (value: string, event?: React.SyntheticEvent) => void;
  onGutterChange?: (value: string, event?: React.SyntheticEvent) => void;
  onClose?: (event?: React.SyntheticEvent) => void;
}

export declare function FillSection(props: FillSectionProps): React.ReactElement;
export declare function StrokeSection(props: StrokeSectionProps): React.ReactElement;
export declare function StrokeControlsSection(props: StrokeControlsSectionProps): React.ReactElement;
export declare function EffectsSection(props: EffectsSectionProps): React.ReactElement;
export declare function ColorPickerDialog(props: ColorPickerDialogProps): React.ReactElement;
export declare function ColorPickerTrigger(props: ColorPickerTriggerProps): React.ReactElement;
export declare function TypographyDialog(props: TypographyDialogProps): React.ReactElement;
export declare function TypeStyleMenu(props: TypeStyleMenuProps): React.ReactElement;
export declare function TypeStyleRow(props: TypeStyleRowProps): React.ReactElement;
export declare function FontsPickerMenu(props: FontsPickerMenuProps): React.ReactElement;
export declare function LayoutGuideSettingsDialog(props: LayoutGuideSettingsDialogProps): React.ReactElement;
export declare function SelectionColorsSection(props: SelectionColorsSectionProps): React.ReactElement;
export declare function LayoutGuideSection(props: LayoutGuideSectionProps): React.ReactElement;
export declare function ExportSection(props: ExportSectionProps): React.ReactElement;

export interface AppearanceSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Opacity value shown in the field. String-valued (e.g. `"100%"`), not a number. */
  opacity?: string;
  /** Corner-radius value shown in the field. String-valued (e.g. `"8"`), not a number. */
  cornerRadius?: string;
  visible?: boolean;
  blendMode?: string;
  blendMenuOpen?: boolean;
  individualCorners?: boolean;
  /**
   * Fires with the next opacity string when the opacity field is edited. The
   * field renders read-only until this is supplied — pass it so the editable
   * "100%" value is actually settable.
   */
  onOpacityChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Fires with the next corner-radius string when the corner-radius field is edited. */
  onCornerRadiusChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onVisibilityToggle?: (visible: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  onBlendModeToggle?: (open: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  onBlendModeChange?: (mode: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  onIndividualCornersToggle?: (enabled: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export declare function AppearanceSection(props: AppearanceSectionProps): React.ReactElement;

export interface EditingInspectorProps extends React.HTMLAttributes<HTMLElement> {
  layerTitle?: string;
  layoutMode?: LayoutSectionProps["mode"];
  selectionColors?: PaintSectionItem[];
  showInspectorHeader?: boolean;
  showLayerHeader?: boolean;
  onLayoutModeChange?: (mode: NonNullable<LayoutSectionProps["mode"]>, event?: React.SyntheticEvent) => void;
  onLayoutFlowChange?: LayoutSectionProps["onFlowChange"];
  onClipContentChange?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  onIndividualPaddingChange?: (enabled: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export declare function EditingInspector(props: EditingInspectorProps): React.ReactElement;

/* ------------------------------------------------------------------ *
 * Editor template seam
 *
 * These interfaces are the CONTRACT the future editor app repo codes
 * against. This (the design-system) repo owns layout and composition;
 * the app repo owns the document model, selection, undo/redo, and the
 * canvas engine. The shapes below are intentionally thin and are kept
 * Tree-compatible (see TreeItem) so a navigator built on Tree can map
 * directly onto PageItem / SlideItem / LayerNode without translation.
 * ------------------------------------------------------------------ */

/** A page entry for a page navigator. Tree-compatible (id + name). */
export interface PageItem {
  id: string;
  name: string;
  thumbnail?: string;
  selected?: boolean;
}

/** A slide entry for a slide navigator. Tree-compatible (id + name). */
export interface SlideItem {
  id: string;
  name: string;
  thumbnail?: string;
  selected?: boolean;
}

/**
 * A node in the editor layer tree. Shaped to be Tree-compatible (id, name,
 * children, type) so it can drive the Tree primitive directly.
 *
 * NOTE: This is the seam where future motion metadata will live. Timing and
 * keyframe fields (e.g. `keyframes`, `timing`, `duration`, `easing`) will be
 * added to LayerNode in a later iteration; keep additions additive and
 * optional so existing app-repo code continues to compile.
 */
export interface LayerNode {
  id: string;
  name: string;
  type: string;
  icon?: React.ReactNode;
  depth?: number;
  children?: LayerNode[];
  visible?: boolean;
  locked?: boolean;
  selected?: boolean;
  /* room for future timing/keyframes metadata */
}

/**
 * EditorToolbar is the floating canvas creation toolbar. It is purely
 * presentational and controlled: it reflects the active tool and emits
 * `onToolChange`, owning no canvas engine, selection, or document model. It
 * drops into EditorShell's `canvasToolbar` slot and renders its tool-picker
 * menus through the canvas OverlayHost. Four groups, left to right (Figma
 * 86-5602): Move group ("move", "hand", SplitButton); Frame ("frame", single
 * Grid 3x3 icon button); Shape group ("rectangle", "circle", SplitButton); Text
 * ("text", single icon button). While a group's tool-picker menu is open that
 * group suppresses its tooltip (no tooltip + menu co-show).
 */
export interface EditorToolbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controlled active tool id. */
  activeTool?: "move" | "hand" | "frame" | "rectangle" | "circle" | "text" | string;
  /** Uncontrolled initial active tool id. */
  defaultActiveTool?: "move" | "hand" | "frame" | "rectangle" | "circle" | "text" | string;
  /** Fires when a tool is activated (action click or menu selection). */
  onToolChange?: (toolId: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessible name for the toolbar region. */
  label?: string;
}

export declare function EditorToolbar(props: EditorToolbarProps): React.ReactElement;

/**
 * EditorShell is the four-region editor layout template. It is purely
 * presentational and controlled: it owns the CSS grid and responsive behavior
 * of its regions only, never selection or any document/data model. Each region
 * is a slot prop. The `canvasToolbar` slot is rendered as a floating overlay
 * anchored inside the canvas region (not a shell row).
 */
export interface EditorShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Left navigation rail slot (e.g. AppNavigationRail). */
  navigationRail?: React.ReactNode;
  /** Navigator panel slot (pages / slides / layers). */
  navigator?: React.ReactNode;
  /** Center canvas slot; shrinks responsively. */
  canvas?: React.ReactNode;
  /** Right inspector slot. */
  inspector?: React.ReactNode;
  /** Floating editor toolbar, rendered through OverlayPortal inside the canvas. */
  canvasToolbar?: React.ReactNode;
  /** Placement of the floating canvas toolbar within the canvas region. */
  canvasToolbarPlacement?: "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Alignment of the floating canvas toolbar. */
  canvasToolbarAlign?: "start" | "center" | "end";
  /**
   * Opt-in resizable side columns. `true` enables both the navigator (left) and
   * inspector (right); `{ left, right }` opts in per side. Each resizable side
   * gets a draggable `role="separator"` handle on its boundary edge with pointer
   * drag and keyboard support (Left/Right arrows, Shift for a larger step,
   * Home/End for min/max). The center canvas absorbs the change; the side tracks
   * never wrap. Defaults to `false`.
   */
  resizableSides?: boolean | { left?: boolean; right?: boolean };
  /** Controlled navigator (left) column width in px. */
  navigatorWidth?: number;
  /** Uncontrolled initial navigator width in px. Defaults to 240. */
  defaultNavigatorWidth?: number;
  /** Fires with the new navigator width while resizing. */
  onNavigatorWidthChange?: (width: number) => void;
  /** Minimum navigator width in px. Defaults to 200. */
  minNavigatorWidth?: number;
  /** Maximum navigator width in px. Defaults to 420. */
  maxNavigatorWidth?: number;
  /** Controlled inspector (right) column width in px. */
  inspectorWidth?: number;
  /** Uncontrolled initial inspector width in px. Defaults to 240. */
  defaultInspectorWidth?: number;
  /** Fires with the new inspector width while resizing. */
  onInspectorWidthChange?: (width: number) => void;
  /** Minimum inspector width in px. Defaults to 200. */
  minInspectorWidth?: number;
  /** Maximum inspector width in px. Defaults to 420. */
  maxInspectorWidth?: number;
  /** Accessible name for the editor application region. */
  label?: string;
  /** Fallback canvas content when `canvas` is not provided. */
  children?: React.ReactNode;
}

export declare function EditorShell(props: EditorShellProps): React.ReactElement;

/**
 * SlidesEditorTemplate is a thin slides-oriented preset of EditorShell. It adds
 * slides defaults (a present-mode toggle placeholder) and forwards all slots to
 * EditorShell. It owns no document model.
 */
export interface SlidesEditorTemplateProps extends Omit<EditorShellProps, "canvasToolbarPlacement" | "canvasToolbarAlign"> {
  /** Whether present mode is active (placeholder; app repo owns real present mode). */
  presentMode?: boolean;
  /** Fires when the present-mode toggle is pressed. */
  onPresentModeChange?: (presenting: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export declare function SlidesEditorTemplate(props: SlidesEditorTemplateProps): React.ReactElement;

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
  OverlayLayer: typeof OverlayLayer;
  OverlayHost: typeof OverlayHost;
  OverlayPortal: typeof OverlayPortal;
  Dialog: typeof Dialog;
  Dropdown: typeof Dropdown;
  Menu: typeof Menu;
  MenuRow: typeof MenuRow;
  MenuMultiSelect: typeof MenuMultiSelect;
  VerticalCell: typeof VerticalCell;
  ComposaAppIcon: typeof ComposaAppIcon;
  NavigationRailItem: typeof NavigationRailItem;
  AppNavigationRail: typeof AppNavigationRail;
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
  ControlGroup: typeof ControlGroup;
  AlignmentPicker: typeof AlignmentPicker;
  Tab: typeof Tab;
  Tabs: typeof Tabs;
  Avatar: typeof Avatar;
  MultiplayerControl: typeof MultiplayerControl;
  Badge: typeof Badge;
  BadgeAnchor: typeof BadgeAnchor;
  NotificationBell: typeof NotificationBell;
  Notification: typeof Notification;
  VisualBell: typeof VisualBell;
  InspectorHeader: typeof InspectorHeader;
  LayerHeader: typeof LayerHeader;
  PositionSection: typeof PositionSection;
  LayoutSection: typeof LayoutSection;
  FillSection: typeof FillSection;
  StrokeSection: typeof StrokeSection;
  StrokeControlsSection: typeof StrokeControlsSection;
  EffectsSection: typeof EffectsSection;
  ColorPickerDialog: typeof ColorPickerDialog;
  ColorPickerTrigger: typeof ColorPickerTrigger;
  TypographyDialog: typeof TypographyDialog;
  TypeStyleMenu: typeof TypeStyleMenu;
  TypeStyleRow: typeof TypeStyleRow;
  FontsPickerMenu: typeof FontsPickerMenu;
  LayoutGuideSettingsDialog: typeof LayoutGuideSettingsDialog;
  SelectionColorsSection: typeof SelectionColorsSection;
  LayoutGuideSection: typeof LayoutGuideSection;
  ExportSection: typeof ExportSection;
  AppearanceSection: typeof AppearanceSection;
  EditingInspector: typeof EditingInspector;
  EditorToolbar: typeof EditorToolbar;
  EditorShell: typeof EditorShell;
  SlidesEditorTemplate: typeof SlidesEditorTemplate;
  CanvasSelectionOverlay: typeof CanvasSelectionOverlay;
};

export interface ComposaReactFactoryOptions {
  Icon?: React.ComponentType<ComposaIconProps>;
  createPortal?: (children: React.ReactNode, container: Element | DocumentFragment) => React.ReactElement;
}

export declare function createComposaComponents(ReactRuntime: typeof React, options?: ComposaReactFactoryOptions): typeof components;

export default components;
