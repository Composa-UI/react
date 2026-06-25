import { BUILTIN_GLYPHS } from "./builtin-glyphs.js";

const stateClass = (state = "default") => `is-${String(state).toLowerCase().replace(/\s+/g, "-")}`;
const boolData = (value) => (value ? "true" : "false");
const cx = (...parts) => parts.filter(Boolean).join(" ");
const optionValue = (option, index) => option.value ?? option.id ?? option.label ?? String(index);
const propToken = (value = "default") => String(value).trim().toLowerCase().replace(/\s+/g, "-");
// Width model used across the button family and the input-shaped components.
// "auto" hugs content (the default, no prop needed) and "fill" stretches to
// 100% of the container.
const normalizeWidth = (value = "auto") => propToken(value);
const colorInputPaint = (value) => {
  const text = String(value || "").trim();
  if (!text || text === "transparent") return "transparent";
  if (text.startsWith("#")) return text;
  if (/^[0-9a-f]{3,8}$/i.test(text)) return `#${text}`;
  return text;
};
const checkedValue = (checked) => {
  const value = String(checked).toLowerCase();
  if (checked === true || value === "checked") return "checked";
  if (value === "mixed") return "mixed";
  return "unchecked";
};

function isRenderableElement(value) {
  return typeof value === "object" && value !== null && typeof value.$$typeof === "symbol";
}

function iconSlot(h, child, decorative) {
  return h(
    "span",
    { className: "composa-icon", "data-icon-slot": "true", "aria-hidden": decorative ? "true" : "false" },
    child
  );
}

// Renders a built-in structural glyph (Material Symbols, rounded weight 300).
// Material Symbols paths use viewBox="0 -960 960 960" and are FILLED with
// currentColor (no stroke). The svg fills its container so the glyph scales
// with the wrapper box (e.g. per-size icon-button glyph sizing).
function builtinGlyph(h, glyph, decorative) {
  return h(
    "span",
    { className: "composa-icon", "data-icon-builtin": "true", "aria-hidden": decorative ? "true" : "false" },
    h(
      "svg",
      { width: "100%", height: "100%", viewBox: "0 -960 960 960", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg" },
      h("path", { d: glyph.d })
    )
  );
}

// Resolves an icon prop into a node. Accepts, in order of precedence:
//   1. a React element passed by the consumer (the slot)        e.g. icon={<Plus/>}
//   2. a component type passed by the consumer (the slot)       e.g. icon={Plus}
//   3. a built-in, license-clean structural glyph name          e.g. "chevronDown"
//   4. a legacy string name resolved by the injected renderer   e.g. "styles" (deprecated)
function iconNode(h, Icon, icon, options = {}) {
  if (icon == null || icon === false || icon === true || icon === "") return null;
  const decorative = options.decorative !== false;
  if (isRenderableElement(icon)) return iconSlot(h, icon, decorative);
  if (typeof icon === "function") return iconSlot(h, h(icon, null), decorative);
  const name = String(icon);
  if (/^[A-Za-z]$/.test(name)) {
    return h("span", { className: "composa-inline-glyph-text", "aria-hidden": decorative ? "true" : "false" }, name.toUpperCase());
  }
  if (Icon) return h(Icon, { name });
  if (BUILTIN_GLYPHS[name]) return builtinGlyph(h, BUILTIN_GLYPHS[name], decorative);
  return h("span", { className: `composa-icon composa-icon-${name}`, "aria-hidden": decorative ? "true" : "false" });
}

export function createComposaComponents(React, options = {}) {
  const h = React.createElement;
  const Icon = options.Icon;
  const createPortal = options.createPortal;
  const OverlayHostContext = React.createContext?.(null) ?? { Provider: "composa-overlay-host-context-provider", _currentValue: null };
  // Attach a stable key to an already-built element without wrapping it (so CSS
  // child selectors keep matching). Returns the element unchanged when it is
  // null or not a React element.
  const withKey = (node, key) =>
    React.isValidElement?.(node) && node.key == null ? React.cloneElement(node, { key }) : node;
  const keyedChildren = (children) =>
    Array.isArray(children)
      ? children.map((child, index) =>
          React.isValidElement?.(child) && child.key == null
            ? React.cloneElement(child, { key: child.props?.["data-composa-component"] || child.props?.label || index })
            : child
        )
      : children;

  function overlayOffset() {
    if (typeof document === "undefined") return 4;
    const value = getComputedStyle(document.documentElement).getPropertyValue("--composa-inspector-overlay-offset").trim();
    const number = Number.parseFloat(value);
    return Number.isFinite(number) ? number : 4;
  }

  function cssPixelValue(name, fallback) {
    if (typeof document === "undefined") return fallback;
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const number = Number.parseFloat(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function clampOverlayValue(value, min, max) {
    if (!Number.isFinite(value)) return min;
    if (max < min) return min;
    return Math.min(Math.max(value, min), max);
  }

  function clampOverlayGeometry(geometry, hostRect, overlayRect) {
    return {
      left: clampOverlayValue(geometry.left, 0, hostRect.width - overlayRect.width),
      top: clampOverlayValue(geometry.top, 0, hostRect.height - overlayRect.height),
    };
  }

  // Edge-aware flip: keep the preferred side when it fits inside the host,
  // otherwise flip to the opposite side when that one fits. Falls back to the
  // preferred value (clampOverlayGeometry then pins it inside the host).
  function preferEdgeFit(preferred, flipped, extent, size) {
    const fits = (value) => value >= 0 && value + size <= extent;
    if (fits(preferred)) return preferred;
    if (fits(flipped)) return flipped;
    return preferred;
  }

  function OverlayHost({ children, className = "", ...props }) {
    const [hostNode, setHostNode] = React.useState(null);
    return h(
      "div",
      {
        ...props,
        className: cx("composa-overlay-host-root", className),
        "data-composa-component": "OverlayHost",
      },
      h(
        OverlayHostContext.Provider,
        { value: hostNode },
        [
          children,
          h("div", {
            key: "overlay-host",
            ref: setHostNode,
            className: "composa-overlay-host",
            "data-composa-component": "OverlayHostLayer",
          }),
        ]
      )
    );
  }

  function resolveOverlayGeometry(anchorRect, hostRect, overlayRect, placement, align) {
    const gap = overlayOffset();
    const normalizedPlacement = propToken(placement);
    const normalizedAlign = propToken(align);
    const centerLeft = anchorRect.left - hostRect.left + anchorRect.width / 2 - overlayRect.width / 2;
    const startLeft = anchorRect.left - hostRect.left;
    const endLeft = anchorRect.right - hostRect.left - overlayRect.width;
    const alignedLeft = normalizedAlign === "end" ? endLeft : normalizedAlign === "center" ? centerLeft : startLeft;

    if (normalizedPlacement === "left-of-inspector" || normalizedPlacement === "inspector-dialog") {
      return clampOverlayGeometry({
        left: anchorRect.left - hostRect.left - overlayRect.width - gap,
        top: anchorRect.bottom - hostRect.top - overlayRect.height,
      }, hostRect, overlayRect);
    }

    if (normalizedPlacement === "top" || normalizedPlacement === "top-left" || normalizedPlacement === "top-right") {
      const aboveTop = anchorRect.top - hostRect.top - overlayRect.height - gap;
      const belowTop = anchorRect.bottom - hostRect.top + gap;
      return clampOverlayGeometry({
        left: normalizedPlacement === "top-left" ? startLeft : normalizedPlacement === "top-right" ? endLeft : alignedLeft,
        top: preferEdgeFit(aboveTop, belowTop, hostRect.height, overlayRect.height),
      }, hostRect, overlayRect);
    }

    if (normalizedPlacement === "left") {
      const preferredLeft = anchorRect.left - hostRect.left - overlayRect.width - gap;
      const flippedLeft = anchorRect.right - hostRect.left + gap;
      return clampOverlayGeometry({
        left: preferEdgeFit(preferredLeft, flippedLeft, hostRect.width, overlayRect.width),
        top: anchorRect.top - hostRect.top + anchorRect.height / 2 - overlayRect.height / 2,
      }, hostRect, overlayRect);
    }

    if (normalizedPlacement === "right") {
      const preferredLeft = anchorRect.right - hostRect.left + gap;
      const flippedLeft = anchorRect.left - hostRect.left - overlayRect.width - gap;
      return clampOverlayGeometry({
        left: preferEdgeFit(preferredLeft, flippedLeft, hostRect.width, overlayRect.width),
        top: anchorRect.top - hostRect.top + anchorRect.height / 2 - overlayRect.height / 2,
      }, hostRect, overlayRect);
    }

    const belowTop = anchorRect.bottom - hostRect.top + gap;
    const aboveTop = anchorRect.top - hostRect.top - overlayRect.height - gap;

    return clampOverlayGeometry({
      left: normalizedPlacement === "bottom-left" ? startLeft : normalizedPlacement === "bottom-right" ? endLeft : alignedLeft,
      top: preferEdgeFit(belowTop, aboveTop, hostRect.height, overlayRect.height),
    }, hostRect, overlayRect);
  }

  function resolveTooltipGeometry(anchorRect, hostRect, overlayRect, placement) {
    const gap = overlayOffset();
    const normalizedPlacement = propToken(placement);
    const arrowSize = cssPixelValue("--composa-tooltip-arrow-size", 8);
    const arrowEdgeOffset = cssPixelValue("--composa-tooltip-arrow-edge-offset", 8);
    const arrowCenterInset = arrowEdgeOffset + arrowSize / 2;
    const anchorCenterX = anchorRect.left - hostRect.left + anchorRect.width / 2;
    const anchorCenterY = anchorRect.top - hostRect.top + anchorRect.height / 2;
    const centerLeft = anchorCenterX - overlayRect.width / 2;
    const startLeft = anchorCenterX - arrowCenterInset;
    const endLeft = anchorCenterX - overlayRect.width + arrowCenterInset;
    const left = normalizedPlacement.includes("left") ? startLeft : normalizedPlacement.includes("right") ? endLeft : centerLeft;

    if (normalizedPlacement === "left") {
      const preferredLeft = anchorRect.left - hostRect.left - overlayRect.width - gap;
      const flippedLeft = anchorRect.right - hostRect.left + gap;
      return clampOverlayGeometry({
        left: preferEdgeFit(preferredLeft, flippedLeft, hostRect.width, overlayRect.width),
        top: anchorCenterY - overlayRect.height / 2,
      }, hostRect, overlayRect);
    }

    if (normalizedPlacement === "right") {
      const preferredLeft = anchorRect.right - hostRect.left + gap;
      const flippedLeft = anchorRect.left - hostRect.left - overlayRect.width - gap;
      return clampOverlayGeometry({
        left: preferEdgeFit(preferredLeft, flippedLeft, hostRect.width, overlayRect.width),
        top: anchorCenterY - overlayRect.height / 2,
      }, hostRect, overlayRect);
    }

    const preferredTop = normalizedPlacement.includes("top") ? anchorRect.top - hostRect.top - overlayRect.height - gap : anchorRect.bottom - hostRect.top + gap;
    const flippedTop = normalizedPlacement.includes("top") ? anchorRect.bottom - hostRect.top + gap : anchorRect.top - hostRect.top - overlayRect.height - gap;

    return clampOverlayGeometry({
      left,
      top: preferEdgeFit(preferredTop, flippedTop, hostRect.height, overlayRect.height),
    }, hostRect, overlayRect);
  }

  /**
   * Renders anchored transient content into the nearest `OverlayHost`.
   * REQUIRES an `OverlayHost` ancestor — without one the content has nowhere to
   * portal and falls back to inline rendering, where it clips inside scrollable
   * inspector content. Wrap the page/stage in `OverlayHost`.
   */
  function OverlayPortal({ open = true, anchorRef, placement = "below-trigger", align = "start", positioning = "trigger", followAnchor = true, role, label, className = "", children, ...props }) {
    const hostNode = React.useContext(OverlayHostContext);
    const layerRef = React.useRef(null);
    const [geometry, setGeometry] = React.useState(null);
    const canPortal = Boolean(open && hostNode && anchorRef?.current && createPortal);
    const resolvedPlacement = propToken(placement);
    const resolvedPositioning = propToken(positioning);
    const shouldFollowAnchor = followAnchor !== false;

    React.useLayoutEffect(() => {
      if (!canPortal) return undefined;
      let frame = 0;
      const update = () => {
        const anchorNode = anchorRef.current;
        const layerNode = layerRef.current;
        if (!anchorNode || !layerNode || !hostNode) return;
        const anchorRect = anchorNode.getBoundingClientRect();
        const hostRect = hostNode.getBoundingClientRect();
        const overlayRect = layerNode.getBoundingClientRect();
        setGeometry(
          resolvedPositioning === "tooltip"
            ? resolveTooltipGeometry(anchorRect, hostRect, overlayRect, placement)
            : resolveOverlayGeometry(anchorRect, hostRect, overlayRect, placement, align)
        );
      };
      const schedule = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(update);
      };
      schedule();
      window.addEventListener("resize", schedule);
      if (shouldFollowAnchor) window.addEventListener("scroll", schedule, true);
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", schedule);
        if (shouldFollowAnchor) window.removeEventListener("scroll", schedule, true);
      };
    }, [align, anchorRef, canPortal, hostNode, placement, resolvedPositioning, shouldFollowAnchor, children]);

    if (!open) return null;
    if (!canPortal) {
      return h(OverlayLayer, { ...props, placement, align, role, label, className }, children);
    }

    return createPortal(
      h(
        OverlayLayer,
        {
          ...props,
          overlayRef: layerRef,
          placement,
          align,
          role,
          label,
          className: cx("composa-overlay-layer-portal", !geometry && "is-measuring", className),
          style: {
            ...(props.style || {}),
            left: `${Math.round(geometry?.left ?? 0)}px`,
            top: `${Math.round(geometry?.top ?? 0)}px`,
          },
          "data-overlay-placement": resolvedPlacement,
          "data-overlay-positioning": resolvedPositioning,
        },
        children
      ),
      hostNode
    );
  }

  /**
   * Anchored hover/focus tooltip. REQUIRES an `OverlayHost` ancestor to portal
   * into; without one the `> .tooltip` hover rules no longer reach it. Every
   * IconButton/ControlGroup/AlignmentPicker that shows a tooltip inherits this
   * requirement, so any story or stage that shows hover tooltips must wrap its
   * content in `OverlayHost`.
   */
  function FloatingTooltip({ open, anchorRef, id, label, placement = "bottom", tone = "inverse", className = "" }) {
    if (!label) return null;
    return h(
      OverlayPortal,
      { open, anchorRef, placement, positioning: "tooltip", align: "center", className: "composa-tooltip-layer" },
      h(Tooltip, {
        id,
        label,
        placement,
        tone,
        className,
      })
    );
  }

  function Button({ label, variant = "secondary", tone, size = "medium", width = "auto", state = "rest", disabled = false, iconLead = false, icon, hotkey = false, className = "", children, ...props }) {
    const resolvedVariant = propToken(tone === "brand" ? "primary" : tone || variant);
    const resolvedSize = propToken(size);
    const resolvedWidth = normalizeWidth(width);
    const resolvedState = propToken(state);
    const iconLeadValue = iconLead === true ? "left-aligned" : propToken(iconLead || "false");
    return h(
      "button",
      {
        ...props,
        className: cx("composa-button", `composa-button-${resolvedVariant}`, `composa-button-${resolvedSize}`, `composa-button-width-${resolvedWidth}`, stateClass(resolvedState), className),
        "data-composa-component": "Button",
        "data-variant": resolvedVariant,
        "data-size": resolvedSize,
        "data-width": resolvedWidth,
        "data-state": resolvedState,
        "data-disabled": boolData(disabled),
        "data-icon-lead": iconLeadValue,
        "data-hotkey": boolData(hotkey),
        disabled,
      },
      children ?? [icon && iconLeadValue !== "false" ? h("span", { key: "icon", className: "composa-button-icon", "aria-hidden": "true", "data-scope": "button", "data-part": "icon" }, iconNode(h, Icon, icon)) : null, h("span", { key: "label", "data-scope": "button", "data-part": "label" }, label), hotkey ? h("kbd", { key: "hotkey", className: "composa-button-hotkey", "data-scope": "button", "data-part": "hotkey" }, "K") : null]
    );
  }

  function IconButton({
    icon,
    label,
    selected = false,
    pressed,
    dialogOpen,
    size = "medium",
    state = "rest",
    disabled = false,
    context = "default",
    variant = "standard",
    className = "",
    role,
    component = "IconButton",
    title: nativeTitle,
    tooltip = true,
    tooltipLabel,
    tooltipPlacement = "bottom",
    tooltipTone = "inverse",
    ...props
  }) {
    const resolvedVariant = propToken(variant);
    const resolvedSize = propToken(size);
    const tooltipId = React.useId();
    const tooltipAnchorRef = React.useRef(null);
    const [tooltipOpen, setTooltipOpen] = React.useState(false);
    const resolvedTooltipLabel = tooltipLabel || label;
    // `dialogOpen` (when defined) marks this as a DIALOG-OPENER button: it is the
    // active/selected state ONLY while its dialog/popover is open. The consumer
    // clears `dialogOpen` on outside-click or dialog-close, and the button drops
    // its active appearance with it — distinct from `selected`/`pressed`, which
    // is a PERSISTENT toggle whose state survives a click. While the dialog is
    // open we also suppress the tooltip (a tooltip over an open dialog trigger is
    // noise) per the overlay rule that a tooltip and its surface never co-show.
    const isDialogOpener = dialogOpen !== undefined;
    const resolvedSelected = isDialogOpener ? Boolean(dialogOpen) : selected;
    const showTooltip = tooltip !== false && Boolean(resolvedTooltipLabel) && !(isDialogOpener && dialogOpen);
    const resolvedTitle = nativeTitle === undefined ? undefined : nativeTitle;
    const attrs = {
      ...props,
      className: cx("composa-icon-button", `composa-icon-button-${resolvedVariant}`, `composa-icon-button-${resolvedSize}`, resolvedSelected && "is-selected", isDialogOpener && "composa-dialog-opener", stateClass(state), `composa-on-${context}`, className),
      "data-composa-component": component,
      "data-icon": icon,
      "data-size": resolvedSize,
      "data-state": state,
      "data-disabled": boolData(disabled),
      "data-context": context,
      "data-variant": resolvedVariant,
      "aria-label": label,
      "aria-describedby": showTooltip ? tooltipId : props["aria-describedby"],
      title: resolvedTitle || undefined,
      disabled,
      role,
    };
    if (isDialogOpener) {
      attrs["aria-haspopup"] = "dialog";
      attrs["aria-expanded"] = dialogOpen ? "true" : "false";
      attrs["data-dialog-open"] = boolData(Boolean(dialogOpen));
    }
    if (pressed !== undefined) attrs["aria-pressed"] = pressed ? "true" : "false";
    if (resolvedSelected !== undefined && role === "tab") attrs["aria-selected"] = resolvedSelected ? "true" : "false";
    const button = h("button", { ...attrs, key: "button" }, h("span", { className: "composa-icon-button-glyph", "data-scope": "icon-button", "data-part": "glyph" }, iconNode(h, Icon, icon)));
    if (!showTooltip) return button;
    return h(
      "span",
      {
        ref: tooltipAnchorRef,
        className: "composa-icon-button-tooltip-wrap",
        "data-composa-component": "IconButtonTooltipTrigger",
        onMouseEnter: () => setTooltipOpen(true),
        onMouseLeave: () => setTooltipOpen(false),
        onFocus: () => setTooltipOpen(true),
        onBlur: (event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setTooltipOpen(false);
        },
      },
      [
        button,
        h(FloatingTooltip, {
          key: "tooltip",
          open: tooltipOpen,
          anchorRef: tooltipAnchorRef,
          id: tooltipId,
          label: resolvedTooltipLabel,
          placement: tooltipPlacement,
          tone: tooltipTone,
          className: "composa-icon-button-tooltip",
        }),
      ]
    );
  }

  // ToggleButton is the icon-button family member with explicit on/off semantics.
  // Two mental models share this component:
  //   - PERSISTENT toggle (default): `pressed` is preserved across clicks.
  //   - DIALOG-OPENER (`dialog`): the button opens a dialog/popover and is active
  //     ONLY while that surface is open. Drive it with `dialogOpen` (controlled)
  //     and clear it on outside-click / dialog-close; the base IconButton then
  //     reflects the open/closed state (active appearance, aria-expanded) and
  //     untoggles automatically when `dialogOpen` goes false. `dialog` also adds
  //     the corner dot that marks "this opens a surface".
  function ToggleButton({ icon, label, pressed = false, dialog = false, dialogOpen, size = "medium", state = "rest", disabled = false, variant = "standard", className = "", ...props }) {
    const isDialogOpener = dialog && dialogOpen !== undefined;
    return h(IconButton, {
      ...props,
      icon,
      label,
      // Dialog-opener mode: open/closed state comes from `dialogOpen`, not the
      // persistent `pressed`. Otherwise keep the persistent-toggle behavior.
      ...(isDialogOpener ? { dialogOpen } : { pressed, selected: pressed }),
      size,
      state,
      disabled,
      variant,
      className: cx("composa-toggle-button", dialog && "composa-dialog-toggle", className),
      component: dialog ? "DialogToggleButton" : "ToggleButton",
    });
  }

  function SplitButton({
    label,
    icon,
    menuLabel = `${label} options`,
    actionTooltipLabel = label,
    menuTooltipLabel = menuLabel,
    tooltipPlacement = "bottom",
    variant = "secondary",
    size = "small",
    width = "auto",
    state = "rest",
    disabled = false,
    // `menuOpen` marks the split's menu surface as open. While it is open BOTH
    // halves suppress their tooltip (a tooltip over an open menu trigger is
    // noise) — same overlay rule the IconButton `dialogOpen` prop encodes: a
    // tooltip and the surface it opens never co-show. The menu half is driven as
    // a dialog-opener so it reflects the open state and drops its tooltip; the
    // action half suppresses its own hover tooltip via the flag below.
    menuOpen = false,
    className = "",
    onMenuClick,
    ...props
  }) {
    const resolvedVariant = propToken(variant);
    const resolvedSize = propToken(size);
    const resolvedWidth = normalizeWidth(width);
    const splitActionTooltipId = React.useId();
    const splitActionTooltipAnchorRef = React.useRef(null);
    const [splitActionTooltipOpen, setSplitActionTooltipOpen] = React.useState(false);
    const showActionTooltip = Boolean(actionTooltipLabel) && !menuOpen;
    return h(
      "div",
      {
        className: cx("composa-split-control", `composa-split-${resolvedVariant}`, `composa-split-${resolvedSize}`, `composa-split-width-${resolvedWidth}`, stateClass(state), className),
        "data-composa-component": "SplitButton",
        "data-variant": resolvedVariant,
        "data-state": state,
        "data-size": resolvedSize,
        "data-width": resolvedWidth,
        "data-disabled": boolData(disabled),
      },
      [
        h(
          "span",
          {
            key: "action",
            ref: splitActionTooltipAnchorRef,
            className: "composa-split-action-tooltip-wrap",
            onMouseEnter: () => setSplitActionTooltipOpen(true),
            onMouseLeave: () => setSplitActionTooltipOpen(false),
            onFocus: () => setSplitActionTooltipOpen(true),
            onBlur: (event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setSplitActionTooltipOpen(false);
            },
          },
          [
            h(
              "button",
              {
                ...props,
                key: "button",
                // Reuse Button's variant colors via `.composa-button-<variant>` so the
                // split shares Button's semantic variant tokens.
                className: cx("composa-split-action", `composa-button-${resolvedVariant}`),
                "data-composa-component": "SplitButtonAction",
                "data-variant": resolvedVariant,
                "data-state": state,
                "data-disabled": boolData(disabled),
                "aria-describedby": showActionTooltip ? splitActionTooltipId : props["aria-describedby"],
                disabled,
              },
              [iconNode(h, Icon, icon) ? h("span", { key: "icon", className: "composa-split-action-icon", "aria-hidden": "true" }, iconNode(h, Icon, icon)) : null, h("span", { key: "label" }, label)]
            ),
            showActionTooltip
              ? h(FloatingTooltip, {
                  key: "tooltip",
                  open: splitActionTooltipOpen && !menuOpen,
                  anchorRef: splitActionTooltipAnchorRef,
                  id: splitActionTooltipId,
                  label: actionTooltipLabel,
                  placement: tooltipPlacement,
                  className: "composa-icon-button-tooltip",
                })
              : null,
          ]
        ),
        h(IconButton, { key: "menu", icon: "chevronDown", label: menuLabel, tooltipLabel: menuTooltipLabel, tooltipPlacement, dialogOpen: menuOpen, className: "composa-split-menu", variant: resolvedVariant, state, disabled, onClick: onMenuClick, component: "SplitButtonMenu" }),
      ]
    );
  }

  function InputField({
    label,
    value = "",
    placeholder = "",
    mixed = false,
    suffix,
    icon,
    variant = "single-line",
    size = "medium",
    width = "auto",
    state = mixed ? "mixed" : "rest",
    disabled = false,
    dropdown = false,
    variable = false,
    iconLead = false,
    closeButton = false,
    tooltipLabel,
    tooltipPlacement = "top",
    multiline = false,
    onClear,
    className = "",
    onChange,
    onInput,
    ...props
  }) {
    const resolvedVariant = propToken(variant);
    const resolvedSize = propToken(size);
    const resolvedWidth = normalizeWidth(width);
    const resolvedState = propToken(state);
    const isDisabledTier = resolvedState === "disabled" || resolvedState === "disabled-secondary" || resolvedState === "disabled-tertiary";
    const resolvedDisabled = disabled || isDisabledTier;
    const hasIconLead = iconLead !== false && iconLead !== "false";
    const leadIcon = typeof iconLead === "string" && hasIconLead ? propToken(iconLead) : icon;
    const isTextLeadIcon = leadIcon === "w" || leadIcon === "h";
    const isMultiline = multiline || resolvedVariant === "multi-line";
    const tooltipId = React.useId();
    const tooltipAnchorRef = React.useRef(null);
    const [tooltipOpen, setTooltipOpen] = React.useState(false);
    const showTooltip = Boolean(tooltipLabel);
    const controlProps = {
      value: mixed ? "" : value,
      placeholder: mixed ? "Mixed" : placeholder,
      "aria-label": label || placeholder || "Input",
      "aria-describedby": showTooltip ? tooltipId : props["aria-describedby"],
      disabled: resolvedDisabled,
      onChange,
      onInput,
      readOnly: onChange || onInput ? undefined : true,
    };
    const control = isMultiline ? h("textarea", controlProps) : h("input", controlProps);

    return h(
      "label",
      {
        ...props,
        ref: tooltipAnchorRef,
        className: cx("composa-input-field", `composa-input-${resolvedVariant}`, `composa-input-${resolvedSize}`, `composa-input-width-${resolvedWidth}`, stateClass(resolvedState), mixed && "is-mixed", dropdown && "has-dropdown", variable && "has-variable", closeButton && "has-close-button", className),
        "data-composa-component": "InputField",
        "data-variant": resolvedVariant,
        "data-size": resolvedSize,
        "data-width": resolvedWidth,
        "data-state": resolvedState,
        "data-disabled": boolData(resolvedDisabled),
        "data-dropdown": boolData(dropdown),
        "data-variable": boolData(variable),
        "data-icon-lead": boolData(hasIconLead),
        "data-close-button": boolData(closeButton),
        onMouseEnter: showTooltip ? () => setTooltipOpen(true) : props.onMouseEnter,
        onMouseLeave: showTooltip ? () => setTooltipOpen(false) : props.onMouseLeave,
        onFocus: showTooltip ? () => setTooltipOpen(true) : props.onFocus,
        onBlur: showTooltip
          ? (event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setTooltipOpen(false);
            }
          : props.onBlur,
      },
      [
        // `label` is the accessible name (aria-label on the control), not a
        // visible element. The old 14px prefix slot overflowed real labels.
        h("span", { key: "shell", className: "composa-input-shell" }, [
          leadIcon && hasIconLead
            ? isTextLeadIcon
              ? h("span", { key: "axis", className: "composa-input-axis-glyph", "aria-hidden": "true" }, leadIcon.toUpperCase())
              : withKey(iconNode(h, Icon, leadIcon), "lead-icon")
            : null,
          variable ? h("span", { key: "variable", className: "composa-variable-pill" }, "var") : null,
          withKey(control, "control"),
          suffix ? h("span", { key: "suffix", className: "composa-input-suffix" }, suffix) : null,
          closeButton
            ? h(IconButton, { key: "clear", icon: "minus", label: "Clear input", className: "composa-input-clear", disabled: resolvedDisabled, onClick: onClear, component: "InputClearButton" })
            : null,
          dropdown ? withKey(iconNode(h, Icon, "chevronDown"), "dropdown-icon") : null,
        ]),
        showTooltip
          ? h(FloatingTooltip, {
              key: "tooltip",
              open: tooltipOpen,
              anchorRef: tooltipAnchorRef,
              id: tooltipId,
              label: tooltipLabel,
              placement: tooltipPlacement,
              className: "composa-input-tooltip",
            })
          : null,
      ]
    );
  }

  function NumericInput({ label, value = "0", state = "rest", disabled = false, varIcon = false, varPill = false, dropdown = false, iconLead = false, className = "", ...props }) {
    const leadIcon = iconLead && iconLead !== "false" ? iconLead : varIcon ? "styles" : null;
    return h(InputField, { ...props, label, value, variant: "Numeric", state, disabled, variable: varPill, icon: leadIcon, iconLead: Boolean(leadIcon), dropdown, className });
  }

  function NumericInputMulti({ values = ["0", "0", "0", "0"], state = "rest", variant = "standard", disabled = false, iconLead = false, partialDisable = false, onValueChange, className = "", ...props }) {
    const resolvedState = propToken(state);
    const resolvedVariant = propToken(variant);
    const normalizedValues = Array.from({ length: 4 }, (_, index) => values[index] ?? "");
    const leadIcon = iconLead && iconLead !== "false" ? (typeof iconLead === "string" ? propToken(iconLead) : "styles") : null;
    const enabledCells = resolvedVariant === "partial-disable" && partialDisable ? 3 : 4;
    return h(
      "div",
      {
        ...props,
        className: cx("composa-numeric-multi", `composa-numeric-multi-${resolvedVariant}`, stateClass(resolvedState), partialDisable && "is-partial-disabled", className),
        "data-composa-component": "NumericInputMulti",
        "data-state": resolvedState,
        "data-variant": resolvedVariant,
        "data-disabled": boolData(disabled),
        "data-icon-lead": boolData(Boolean(leadIcon)),
        "data-partial-disable": boolData(partialDisable),
      },
      [
        leadIcon ? h("span", { key: "lead", className: "composa-numeric-multi-lead", "aria-hidden": "true" }, iconNode(h, Icon, leadIcon)) : null,
        normalizedValues.map((cellValue, index) => {
          const cellDisabled = disabled || index >= enabledCells;
          return h(
            "span",
            {
              key: `value-${index}`,
              className: cx("composa-numeric-multi-value", index === normalizedValues.length - 1 && "is-last", index >= enabledCells && "is-disabled"),
              "data-disabled": boolData(cellDisabled),
            },
            // The cell hosts a real text input so the field is editable. When no
            // onValueChange is supplied the onChange is a no-op, so the value
            // stays put (display-only) without a React controlled-input warning.
            h("input", {
              className: "composa-numeric-multi-field",
              type: "text",
              inputMode: "decimal",
              value: cellValue,
              disabled: cellDisabled,
              "aria-label": `Value ${index + 1}`,
              onChange: (event) => onValueChange?.(index, event.currentTarget.value),
            })
          );
        }),
      ]
    );
  }

  function ChipVariable({ state = "rest", label = "Variable", className = "", ...props }) {
    const disabled = state.startsWith("disabled");
    return h(
      "span",
      { ...props, className: cx("composa-chip-variable", stateClass(state), className), "data-composa-component": "ChipVariable", "data-state": state, "data-disabled": boolData(disabled) },
      [withKey(iconNode(h, Icon, "styles"), "icon"), h("span", { key: "label" }, label)]
    );
  }

  function Chit({ variant = "square", type = "fill", size = 24, className = "", ...props }) {
    const swatchStyle =
      {
        fill: { background: "#7dd3fc" },
        opacity: { background: "linear-gradient(45deg, #fff 25%, #ddd 25% 50%, #fff 50% 75%, #ddd 75%)" },
        image: { background: "linear-gradient(135deg, #a7f3d0, #60a5fa)" },
        gradient: { background: "linear-gradient(135deg, #ff5c16, #ffd10a)" },
        instance: { background: "#9747ff" },
      }[type] || { background: "#7dd3fc" };
    return h(
      "span",
      {
        ...props,
        className: cx("composa-chit", `composa-chit-${size}`, `composa-chit-${variant}`, `composa-chit-${type}`, className),
        "data-composa-component": "Chit",
        "data-variant": variant,
        "data-type": type,
        "data-size": String(size),
        style: swatchStyle,
      },
      type === "instance" ? iconNode(h, Icon, "styles") : null
    );
  }

  function ColorInput({ type = "Fill", shape = "square", value, opacityValue, state = "rest", disabled = false, opacityDisabled = false, valueDisabled = false, opacityValueDisabled = false, className = "", onChange, onInput, onOpacityChange, onOpacityInput, ...props }) {
    const resolvedType = propToken(type);
    const resolvedShape = propToken(shape);
    const resolvedState = propToken(state);
    const displayValue = value ?? (resolvedType === "instance" ? "Instance" : resolvedType === "gradient" ? "Angular" : resolvedType === "image" ? "Image" : resolvedType === "opacity" ? "FF24BD" : "F7F5F1");
    const displayOpacity = opacityValue ?? (resolvedType === "opacity" ? "24" : "100");
    const swatchStyle = resolvedType === "opacity"
      ? "linear-gradient(90deg, #ff24bd 0 50%, rgba(255, 36, 189, 0.24) 50% 100%)"
      : resolvedType === "gradient"
        ? "linear-gradient(135deg, #ff5c16, #ffd10a)"
        : resolvedType === "image"
          ? "linear-gradient(135deg, #a7f3d0, #60a5fa)"
          : resolvedType === "instance"
            ? "#9747ff"
            : colorInputPaint(displayValue);
    return h(
      "label",
      {
        ...props,
        className: cx("composa-color-input", `composa-color-${resolvedType}`, `composa-color-shape-${resolvedShape}`, stateClass(resolvedState), disabled && "is-disabled", className),
        "data-composa-component": "ColorInput",
        "data-type": resolvedType,
        "data-shape": resolvedShape,
        "data-state": resolvedState,
        "data-disabled": boolData(disabled),
        "data-opacity-disabled": boolData(opacityDisabled),
        // `valueDisabled` / `opacityValueDisabled` read the affected value TEXT as
        // disabled while the input chrome stays active-looking — distinct from
        // `disabled` / `opacityDisabled`, which disable the whole control. The
        // hidden-paint (eye) action uses this: only the value segment greys out,
        // the split/input frame does not (founder field-section spec).
        "data-value-disabled": boolData(valueDisabled),
        "data-opacity-value-disabled": boolData(opacityValueDisabled),
      },
      [
        h(
          "span",
          { key: "chip-frame", className: "composa-color-chip-frame" },
          h("span", {
            className: cx("composa-color-chip", `composa-color-chip-${resolvedShape}`, resolvedType === "opacity" && "is-opacity"),
            style: resolvedType === "opacity" ? undefined : { background: swatchStyle },
          })
        ),
        h("input", {
          key: "input",
          className: cx("composa-color-value", valueDisabled && "is-value-disabled"),
          value: displayValue,
          "aria-label": `${type} value`,
          disabled,
          onChange,
          onInput,
          readOnly: onChange || onInput ? undefined : true,
        }),
        h("span", { key: "opacity", className: "composa-color-opacity" }, [
          h("input", {
            key: "opacity-input",
            className: cx("composa-color-opacity-value", opacityValueDisabled && "is-value-disabled"),
            value: displayOpacity,
            "aria-label": `${type} opacity`,
            disabled: disabled || opacityDisabled,
            onChange: onOpacityChange,
            onInput: onOpacityInput,
            readOnly: onOpacityChange || onOpacityInput ? undefined : true,
          }),
          h("span", { key: "suffix", className: "composa-input-suffix" }, "%"),
        ]),
      ]
    );
  }

  function ComboInput({ label, value = "16", state = "rest", iconLead = false, variable = false, disabled = false, dropdownState, onChange, onInput, onDropdownClick, className = "", ...props }) {
    const resolvedState = propToken(state);
    const resolvedDropdownState = propToken(dropdownState || (resolvedState === "selected-chevron" ? "Active" : resolvedState === "hover" ? "Hover" : "rest"));
    const selectedInput = resolvedState === "selected-input";
    const selectedChevron = resolvedState === "selected-chevron";
    const hover = resolvedState === "hover";
    const leadIcon = iconLead && iconLead !== "false" ? (typeof iconLead === "string" ? propToken(iconLead) : "styles") : null;
    // A variable value references a token and isn't free-typed (it stays a pill);
    // a plain value is an editable text field so the combo is interactive.
    const valueNode = variable
      ? h(
          "button",
          { key: "value", className: cx("composa-combo-input-value", selectedInput && "is-selected", selectedChevron && "is-chevron-selected", hover && "is-hover"), type: "button", disabled, "aria-label": label || "Combo input value" },
          [leadIcon ? iconNode(h, Icon, leadIcon) : null, h("span", { key: "variable", className: cx("composa-variable-pill", selectedInput && "is-on-selected") }, value)]
        )
      : h(
          "div",
          { key: "value", className: cx("composa-combo-input-value", selectedInput && "is-selected", selectedChevron && "is-chevron-selected", hover && "is-hover") },
          [
            leadIcon ? iconNode(h, Icon, leadIcon) : null,
            h("input", { key: "field", className: "composa-combo-input-field", type: "text", value, disabled, "aria-label": label || "Combo input value", onChange, onInput, readOnly: onChange || onInput ? undefined : true }),
          ]
        );
    return h(
      "div",
      {
        ...props,
        className: cx("composa-combo-input", stateClass(resolvedState), disabled && "is-disabled", className),
        "data-composa-component": "ComboInput",
        "data-state": resolvedState,
        "data-disabled": boolData(disabled),
        "data-icon-lead": boolData(Boolean(leadIcon)),
        "data-variable": boolData(variable),
      },
      [valueNode, h(ComboInputDropdown, { key: "dropdown", state: resolvedDropdownState, disabled, onClick: onDropdownClick })]
    );
  }

  function ComboInputDropdown({ state = "rest", disabled = false, className = "", ...props }) {
    const resolvedState = propToken(state);
    return h(
      "button",
      {
        ...props,
        className: cx("composa-combo-input-dropdown", stateClass(resolvedState), className),
        "data-composa-component": "ComboInputDropdown",
        "data-state": resolvedState,
        "data-disabled": boolData(disabled),
        type: "button",
        disabled,
        "aria-label": "Open combo input menu",
      },
      iconNode(h, Icon, "chevronDown")
    );
  }

  function ChitInput({ label = "Chip", state = "rest", closeButton = false, className = "", ...props }) {
    return h(
      "span",
      { ...props, className: cx("composa-chit-input", stateClass(state), className), "data-composa-component": "ChitInput", "data-state": state, "data-close-button": boolData(closeButton) },
      [h("span", { key: "label" }, label), closeButton ? iconNode(h, Icon, "minus") : null]
    );
  }

  function Switch({ label = "Switch", checked, defaultChecked = false, mixed = false, onCheckedChange, onClick, size = "medium", state = "rest", disabled = false, className = "", ...props }) {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const currentChecked = checked !== undefined ? checked : internalChecked;
    const handleClick = (event) => {
      if (disabled) return;
      const nextChecked = mixed ? true : !currentChecked;
      if (checked === undefined) setInternalChecked(nextChecked);
      onCheckedChange?.(nextChecked, event);
      onClick?.(event);
    };
    return h(
      "button",
      {
        ...props,
        className: cx("composa-switch", `composa-switch-${size}`, mixed ? "is-mixed" : currentChecked && "is-checked", stateClass(state), className),
        "data-composa-component": "Switch",
        // Part contract (Zag.js / Ark UI convention) — lets tooling anatomize the component.
        "data-scope": "switch",
        "data-part": "track",
        "data-size": size,
        "data-state": state,
        "data-type": mixed ? "mixed" : currentChecked ? "on" : "off",
        "data-checked": mixed ? "mixed" : boolData(currentChecked),
        "data-disabled": boolData(disabled),
        role: "switch",
        "aria-checked": mixed ? "mixed" : currentChecked ? "true" : "false",
        "aria-label": label,
        onClick: handleClick,
        disabled,
      },
      h("span", { className: "composa-switch-thumb", "data-scope": "switch", "data-part": "thumb" })
    );
  }

  function Radio({ label = "Option", variant = "input", checked, defaultChecked = false, onCheckedChange, onClick, state = "rest", disabled = false, className = "", ...props }) {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const currentChecked = checked !== undefined ? checked : internalChecked;
    const resolvedVariant = propToken(variant);
    const handleClick = (event) => {
      if (disabled) return;
      if (checked === undefined) setInternalChecked(true);
      onCheckedChange?.(true, event);
      onClick?.(event);
    };
    return h(
      "button",
      {
        ...props,
        className: cx("composa-radio", `composa-radio-${resolvedVariant}`, currentChecked && "is-checked", stateClass(state), className),
        "data-composa-component": "Radio",
        "data-variant": resolvedVariant,
        "data-state": state,
        "data-checked": boolData(currentChecked),
        "data-disabled": boolData(disabled),
        role: "radio",
        "aria-checked": currentChecked ? "true" : "false",
        onClick: handleClick,
        disabled,
      },
      resolvedVariant === "button"
        ? [h("span", { key: "label", className: "composa-selection-label" }, label)]
        : [h("span", { key: "mark", className: "composa-radio-mark", "data-scope": "radio", "data-part": "control" }), h("span", { key: "label", className: "composa-selection-label", "data-scope": "radio", "data-part": "label" }, label)]
    );
  }

  function Checkbox({
    label = true,
    labelText = "Option",
    description = false,
    descriptionText = "Description",
    type,
    checked,
    defaultType,
    defaultChecked = "unchecked",
    muted = false,
    ghost = false,
    onCheckedChange,
    onClick,
    state = "rest",
    disabled = false,
    className = "",
    ...props
  }) {
    const [internalChecked, setInternalChecked] = React.useState(checkedValue(defaultType ?? defaultChecked));
    const currentChecked = checkedValue(type ?? checked ?? internalChecked);
    const isChecked = currentChecked === "checked";
    const mixed = currentChecked === "mixed";
    const showLabel = label !== false;
    const resolvedLabelText = typeof label === "string" ? label : labelText;
    const showDescription = description === true;
    const resolvedDisabled = disabled;
    const handleClick = (event) => {
      if (resolvedDisabled) return;
      const nextChecked = isChecked ? "unchecked" : "checked";
      if (type === undefined && checked === undefined) setInternalChecked(nextChecked);
      onCheckedChange?.(nextChecked, event);
      onClick?.(event);
    };
    return h(
      "button",
      {
        ...props,
        className: cx("composa-checkbox", isChecked && "is-checked", mixed && "is-mixed", muted && "is-muted", ghost && "is-ghost", !showLabel && "is-icon-only", showDescription && "has-description", stateClass(state), className),
        "data-composa-component": "Checkbox",
        "data-state": state,
        "data-type": currentChecked,
        "data-checked": mixed ? "mixed" : boolData(isChecked),
        "data-disabled": boolData(resolvedDisabled),
        "data-muted": boolData(muted),
        "data-ghost": boolData(ghost),
        "data-label": boolData(showLabel),
        "data-description": boolData(showDescription),
        role: "checkbox",
        "aria-checked": mixed ? "mixed" : isChecked ? "true" : "false",
        "aria-label": showLabel ? undefined : resolvedLabelText,
        onClick: handleClick,
        disabled: resolvedDisabled,
      },
      [
        h(
          "span",
          { key: "mark", className: "composa-checkbox-mark", "data-scope": "checkbox", "data-part": "control" },
          mixed
            ? builtinGlyph(h, BUILTIN_GLYPHS.minus, true)
            : isChecked
              ? builtinGlyph(h, BUILTIN_GLYPHS.check, true)
              : null
        ),
        showLabel
          ? h("span", { key: "copy", className: "composa-selection-copy" }, [
              h("span", { key: "label", className: "composa-selection-label", "data-scope": "checkbox", "data-part": "label" }, resolvedLabelText),
              showDescription ? h("span", { key: "description", className: "composa-selection-description", "data-scope": "checkbox", "data-part": "description" }, descriptionText) : null,
            ])
          : null,
      ]
    );
  }

  /** Tooltip surface. Requires an `OverlayHost` ancestor to portal into. */
  function Tooltip({ label = "Tooltip", placement = "top", tone = "inverse", className = "", ...props }) {
    return h(
      "div",
      { ...props, className: cx("composa-tooltip", `composa-tooltip-${placement}`, `composa-tooltip-${tone}`, className), "data-composa-component": "Tooltip", "data-placement": placement, "data-tone": tone, role: "tooltip" },
      [h("span", { key: "label", className: "composa-tooltip-label", "data-scope": "tooltip", "data-part": "label" }, label), h("span", { key: "arrow", className: "composa-tooltip-arrow", "data-scope": "tooltip", "data-part": "arrow" })]
    );
  }

  function OverlayLayer({ open = true, placement = "below-trigger", align = "start", role, label, className = "", children, overlayRef, ...props }) {
    if (!open) return null;
    const resolvedPlacement = propToken(placement);
    const resolvedAlign = propToken(align);
    return h(
      "div",
      {
        ...props,
        ref: overlayRef,
        className: cx("composa-overlay-layer", `composa-overlay-layer-${resolvedPlacement}`, `composa-overlay-align-${resolvedAlign}`, className),
        "data-composa-component": "OverlayLayer",
        "data-placement": resolvedPlacement,
        "data-align": resolvedAlign,
        role,
        "aria-label": label,
      },
      children
    );
  }

  function DialogRow({
    leading = null,
    leadingContent = null,
    content,
    trailing = null,
    className = "",
    ...props
  }) {
    return h(ListCell, {
      ...props,
      componentName: "DialogRow",
      hierarchy: "property",
      level: 3,
      underline: false,
      leading,
      leadingContent,
      content,
      trailing,
      className: cx("composa-dialog-row", className),
    });
  }

  function DialogHeaderCell({
    title = "Dialog title",
    content,
    trailing = null,
    className = "",
    ...props
  }) {
    const contentNode = content ?? h("h2", { className: "composa-dialog-title" }, title);
    return h(ListCell, {
      ...props,
      componentName: "DialogHeaderCell",
      hierarchy: "panel",
      level: 1,
      underline: false,
      content: contentNode,
      trailing,
      className: cx("composa-dialog-header-cell", className),
    });
  }

  function DialogHeader({ children, className = "", ...props }) {
    return h(
      "header",
      {
        ...props,
        className: cx("composa-dialog-header", className),
        "data-composa-component": "DialogHeader",
        "data-scope": "dialog",
        "data-part": "header",
      },
      children
    );
  }

  function DialogBody({ children, className = "", ...props }) {
    return h(
      "div",
      {
        ...props,
        className: cx("composa-dialog-body", className),
        "data-composa-component": "DialogBody",
        "data-scope": "dialog",
        "data-part": "body",
      },
      children
    );
  }

  function DialogFooter({ children, className = "", ...props }) {
    return h(
      "footer",
      {
        ...props,
        className: cx("composa-dialog-actions", className),
        "data-composa-component": "DialogFooter",
        "data-scope": "dialog",
        "data-part": "actions",
      },
      children
    );
  }

  function Dialog({ title = "Dialog title", description = "Dialog body text", size = "medium", variant, tone = "default", primaryLabel = "Done", secondaryLabel = "Cancel", className = "", children, ...props }) {
    const resolvedSize = propToken(size);
    const resolvedVariant = variant ? propToken(variant) : undefined;
    return h(
      "section",
      {
        ...props,
        className: cx("composa-dialog", `composa-dialog-${resolvedSize}`, resolvedVariant && `composa-dialog-${resolvedVariant}`, `composa-dialog-${tone}`, className),
        "data-composa-component": "Dialog",
        "data-size": resolvedSize,
        "data-variant": resolvedVariant || "",
        "data-tone": tone,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": title,
      },
      [
        h(DialogHeader, { key: "header" },
          h(DialogHeaderCell, {
            title,
            trailing: h(IconButton, { key: "close", icon: "close", label: "Close dialog", className: "composa-dialog-close" }),
          })
        ),
        h(DialogBody, { key: "body" }, children ?? h("p", null, description)),
        h(DialogFooter, { key: "actions" }, [
          h(Button, { key: "secondary", label: secondaryLabel, variant: "secondary" }),
          h(Button, { key: "primary", label: primaryLabel, variant: tone === "destructive" ? "destructive" : "primary" }),
        ]),
      ]
    );
  }

  function Dropdown({ label, value, defaultValue, options, icon, size = "medium", width = "auto", state = "rest", disabled = false, stroke = true, iconLead = false, open, defaultOpen = false, onOpenChange, onValueChange, onClick, className = "", menuClassName = "", children, ...props }) {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? value ?? options?.[0]?.value ?? options?.[0]?.label ?? "");
    const dropdownOverlayId = React.useId();
    const isOpen = open !== undefined ? open : internalOpen;
    const hasOptions = Array.isArray(options) && options.length > 0;
    const resolvedSize = propToken(size);
    const resolvedWidth = normalizeWidth(width);
    const resolvedState = propToken(state);
    const rootRef = React.useRef(null);
    const displayValue = value ?? internalValue;
    React.useEffect(() => {
      if (value !== undefined) setInternalValue(value);
    }, [value]);
    React.useEffect(() => {
      if (!isOpen || !hasOptions) return undefined;
      const handlePointerDown = (event) => {
        if (rootRef.current?.contains(event.target)) return;
        if (event.target?.closest?.(`[data-composa-overlay-owner="${dropdownOverlayId}"]`)) return;
        if (open === undefined) setInternalOpen(false);
        onOpenChange?.(false, event);
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [dropdownOverlayId, hasOptions, isOpen, onOpenChange, open]);
    const handleClick = (event) => {
      if (disabled) return;
      const nextOpen = !isOpen;
      if (hasOptions) {
        if (open === undefined) setInternalOpen(nextOpen);
        onOpenChange?.(nextOpen, event);
      }
      onClick?.(event);
    };
    const trigger = h(
      "button",
      {
        ...props,
        // Keyed because the open Dropdown renders [trigger, menu-layer] as an
        // array (menu-layer is keyed); without this, React warns on the trigger.
        key: "trigger",
        className: cx("composa-dropdown", `composa-dropdown-${resolvedSize}`, `composa-dropdown-width-${resolvedWidth}`, isOpen && "is-open", stateClass(isOpen ? "active" : resolvedState), !stroke && "is-borderless", className),
        "data-composa-component": "Dropdown",
        "data-size": resolvedSize,
        "data-width": resolvedWidth,
        "data-state": isOpen ? "active" : resolvedState,
        "data-disabled": boolData(disabled),
        "data-open": boolData(isOpen),
        "data-options": boolData(hasOptions),
        "data-stroke": boolData(stroke),
        "data-icon-lead": boolData(iconLead),
        "aria-haspopup": "menu",
        "aria-expanded": isOpen ? "true" : "false",
        "aria-label": label,
        type: props.type || "button",
        onClick: handleClick,
        disabled,
      },
      children ?? [
        icon && iconLead ? h("span", { key: "leading-icon", className: "composa-dropdown-leading-icon", "aria-hidden": "true" }, iconNode(h, Icon, icon)) : null,
        h("span", { key: "value", className: "composa-dropdown-value" }, displayValue),
        h("span", { key: "chevron", className: "composa-dropdown-chevron", "aria-hidden": "true" }, iconNode(h, Icon, "chevronDown")),
      ]
    );
    if (!hasOptions) return trigger;

    return h(
      "span",
      {
        ref: rootRef,
        className: cx("composa-dropdown-root", `composa-dropdown-root-width-${resolvedWidth}`),
        "data-composa-component": "DropdownRoot",
        "data-open": boolData(isOpen),
      },
      [
        trigger,
        isOpen
          ? h(
              OverlayPortal,
              { key: "menu-layer", anchorRef: rootRef, placement: "below-trigger", align: "start", className: "composa-dropdown-menu-layer", "data-composa-overlay-owner": dropdownOverlayId },
              h(
                "div",
                { key: "menu", className: cx("composa-dropdown-menu", menuClassName), "data-composa-component": "DropdownMenu", role: "menu", "aria-label": `${label} options` },
                options.map((option) => {
                  const optionLabel = typeof option === "string" ? option : option.label;
                  const optionValue = typeof option === "string" ? option : option.value ?? option.label;
                  const selected = optionValue === displayValue;
                  return h(MenuRow, {
                    key: optionValue,
                    type: "checkmark",
                    label: optionLabel,
                    selected,
                    checkVariant: "check",
                    shortcut: typeof option === "string" ? undefined : option.shortcut,
                    trail: typeof option === "string" ? "false" : option.shortcut ? "shortcut" : "false",
                    disabled: typeof option === "string" ? false : option.disabled,
                    onClick: (event) => {
                      if (typeof option !== "string" && option.disabled) return;
                      if (value === undefined) setInternalValue(optionValue);
                      if (open === undefined) setInternalOpen(false);
                      onOpenChange?.(false, event);
                      onValueChange?.(optionValue, option, event);
                    },
                  });
                })
              )
            )
          : null,
      ]
    );
  }

  // Structural menu pieces are their own components (matching Figma's separate
  // "Menu row/Divider" and "Menu row/Footer" sets). MenuRow's type:"divider" /
  // type:"footer" delegate here, and they can also be composed directly.
  function MenuDivider({ className = "", ...props }) {
    return h("div", { ...props, className: cx("composa-menu-divider", className), "data-composa-component": "MenuDivider", role: "separator" });
  }

  function MenuFooter({ label = "Action", children, className = "", ...props }) {
    // A menu footer is a full-width secondary Button pinned to the menu's bottom.
    return h(
      "div",
      { ...props, className: cx("composa-menu-footer", className), "data-composa-component": "MenuFooter", role: "presentation" },
      children ?? h(Button, { label, width: "fill", variant: "secondary", role: "menuitem" })
    );
  }

  function MenuRow({
    type = "simple",
    label = "Row text",
    state = "rest",
    submenu = false,
    selected = false,
    lead = "false",
    trail = "false",
    shortcut,
    checkVariant = "check",
    toggleState = "off",
    hasIcon = false,
    expanded = false,
    alignment = "default",
    disabled = state === "disabled",
    children,
    ...props
  }) {
    if (type === "divider") {
      return h(MenuDivider, { ...props });
    }

    if (type === "heading") {
      // The heading row is the abstracted Label, wrapped in the menu-heading
      // shell so alignment (and the optional toggle label) still work. A menu
      // heading is a quiet level-3 label (secondary color by default), not a
      // prominent one.
      return h(
        "div",
        {
          ...props,
          className: cx("composa-menu-heading", `composa-menu-heading-${alignment}`, props.className),
          "data-composa-component": "MenuRow",
          "data-type": type,
          "data-alignment": alignment,
          role: "presentation",
        },
        [
          h(Label, { key: "label", hierarchy: 3, label }),
          alignment === "toggle" ? h(Label, { key: "toggle", hierarchy: 3, label: "On" }) : null,
        ]
      );
    }

    if (type === "toolbar") {
      // Figma "Menu row/Toolbar" (2327:96312) is a tool/shape SELECTION row, not a
      // strip of icon buttons: it carries BOTH a reserved checkmark slot and a
      // leading icon slot, then the label and an optional shortcut.
      //
      // The reserved checkmark slot uses the SAME leading geometry as every other
      // row type (the 20px `menu-leading` slot at the row's 8px left inset), so a
      // toolbar row's check lines up with a simple/checkmark/toggle row's leading
      // slot. A toolbar row therefore reads as one column wider than a simple row
      // (it adds the icon slot) while still starting on the same left line.
      const toolIcon = lead && lead !== "false" && lead !== "icon" ? lead : "image";
      return h(
        "button",
        {
          ...props,
          className: cx("composa-menu-row", "composa-menu-row-toolbar", stateClass(state), selected && "is-selected", props.className),
          "data-composa-component": "MenuRow",
          "data-type": type,
          "data-state": state,
          "data-selected": boolData(selected),
          "data-disabled": boolData(disabled),
          role: "menuitemradio",
          "aria-checked": selected ? "true" : "false",
          disabled,
        },
        [
          h(
            "span",
            { key: "check", className: cx("composa-menu-leading", "composa-menu-toolbar-check"), "aria-hidden": "true" },
            selected ? h("span", { className: "composa-menu-check composa-menu-check-check" }, "✓") : null
          ),
          h("span", { key: "icon", className: cx("composa-menu-leading", "composa-menu-toolbar-icon") }, iconNode(h, Icon, toolIcon)),
          h("span", { key: "label", className: "composa-menu-label" }, label),
          shortcut || trail === "shortcut" ? h("kbd", { key: "shortcut", className: "composa-menu-toolbar-shortcut" }, shortcut || "R") : null,
        ]
      );
    }

    if (type === "footer") {
      return h(MenuFooter, { ...props, label, children });
    }

    if (type === "toggle") {
      // Figma "Menu row/Toggle": [optional icon][switch][label][optional shortcut],
      // a flex row — the 32px switch is the LEADING control, wider than the
      // standard lead slot, so the toggle row uses its own layout.
      const on = toggleState === "on" || toggleState === true;
      return h(
        "button",
        {
          ...props,
          className: cx("composa-menu-row", "composa-menu-row-toggle", stateClass(state), props.className),
          "data-composa-component": "MenuRow",
          "data-type": type,
          "data-state": state,
          "data-toggle-state": on ? "on" : "off",
          "data-disabled": boolData(disabled),
          role: "menuitemcheckbox",
          "aria-checked": on ? "true" : "false",
          disabled,
        },
        [
          hasIcon ? h("span", { key: "icon", className: "composa-menu-leading" }, iconNode(h, Icon, "styles")) : null,
          h("span", { key: "switch", className: cx("composa-menu-switch", on && "is-on") }),
          h("span", { key: "label", className: "composa-menu-label" }, label),
          shortcut || trail === "shortcut" ? h("kbd", { key: "shortcut", className: "composa-menu-toggle-shortcut" }, shortcut || "⌥⇧⌘O") : null,
        ]
      );
    }

    // For a checkmark row (Figma "Menu row/Checkmark") the selection indicator
    // lives in the LEADING slot — a check for the Check variant, a dot for the
    // Dot (single-select / radio) variant — and the label is indented past it.
    // Selection toggles the glyph; the slot stays reserved so rows stay aligned.
    // Blue is the hover affordance only. This is distinct from a Complex row's
    // Trail=Checkbox (a trailing, multi-select checkbox).
    const selectionIndicator = h(
      "span",
      { className: cx("composa-menu-check", `composa-menu-check-${checkVariant}`), "aria-hidden": "true" },
      selected ? (checkVariant === "dot" ? null : "✓") : null
    );
    const leadNode =
      type === "checkmark"
        ? selectionIndicator
        : lead === "avatar"
          ? h("span", { className: "composa-menu-avatar" }, "W")
          : lead === "icon"
            ? iconNode(h, Icon, "styles")
            : h("span", { className: "composa-menu-item-spacer" });

    const trailNode = submenu
      ? h("span", { className: "composa-menu-submenu-icon" }, iconNode(h, Icon, "chevronDown"))
      : type === "expand"
          ? h("span", { className: "composa-menu-expand" }, expanded ? "-" : "+")
          : trail === "shortcut" || shortcut
            ? h("kbd", null, shortcut || "⌘/")
            : trail === "badge"
              ? h("span", { className: "composa-menu-badge" }, "12")
              : trail === "checkbox"
                ? h("span", { className: "composa-menu-checkbox" }, "✓")
                : trail === "mixed"
                  ? h("span", { className: "composa-menu-mixed" }, "—")
                  : null;

    return h(
      "button",
      {
        ...props,
        className: cx("composa-menu-row", `composa-menu-row-${type}`, stateClass(state), selected && "is-selected", props.className),
        "data-composa-component": "MenuRow",
        "data-scope": "menu",
        "data-part": "item",
        "data-type": type,
        "data-state": state,
        "data-submenu": boolData(submenu),
        "data-lead": lead,
        "data-trail": trail,
        "data-selected": boolData(selected),
        "data-disabled": boolData(disabled),
        "data-expanded": boolData(expanded),
        // A checkmark row is a single-choice option: expose it as a radio for the
        // dot variant, a checkbox for the check variant, with aria-checked state.
        role: type === "checkmark" ? (checkVariant === "dot" ? "menuitemradio" : "menuitemcheckbox") : "menuitem",
        "aria-checked": type === "checkmark" ? selected : undefined,
        disabled,
      },
      [h("span", { key: "lead", className: "composa-menu-leading" }, leadNode), h("span", { key: "label", className: "composa-menu-label" }, label), h("span", { key: "trail", className: "composa-menu-trailing" }, trailNode)]
    );
  }

  const menuVariantRows = {
    standard: [
      { type: "checkmark", label: "Design", selected: true, checkVariant: "check" },
      { type: "checkmark", label: "Prototype", selected: false, checkVariant: "check" },
      { type: "checkmark", label: "Dev mode", selected: true, checkVariant: "check" },
    ],
    "label-only": [
      { type: "simple", label: "Scale" },
      { type: "simple", label: "Rename" },
      { type: "simple", label: "Detach instance" },
    ],
    avatars: [
      { type: "complex", label: "Winnie", lead: "avatar", trail: "checkbox" },
      { type: "complex", label: "Sam", lead: "avatar", trail: "checkbox" },
      { type: "complex", label: "Mina", lead: "avatar", trail: "checkbox" },
    ],
    "mixed-icons": [
      { type: "complex", label: "Move", lead: "icon", trail: "shortcut", shortcut: "V" },
      { type: "complex", label: "Text", lead: "icon", trail: "shortcut", shortcut: "T" },
      { type: "complex", label: "Comment", lead: "icon", trail: "badge" },
    ],
  };

  // A row whose item carries a `submenu` array opens that nested menu as a flyout
  // to its right on hover/focus. The chevron is the affordance; aria-haspopup +
  // aria-expanded expose the relationship.
  function SubmenuRow({ item }) {
    const [open, setOpen] = React.useState(false);
    const { submenu, ...rowProps } = item;
    return h(
      "div",
      {
        className: "composa-menu-submenu-anchor",
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
        onFocus: () => setOpen(true),
        onBlur: (event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        },
      },
      [
        h(MenuRow, { key: "row", ...rowProps, submenu: true, "aria-haspopup": "menu", "aria-expanded": open ? "true" : "false" }),
        open ? h(Menu, { key: "flyout", label: `${rowProps.label} submenu`, items: submenu, className: "composa-menu-flyout" }) : null,
      ]
    );
  }

  /**
   * Menu surface. When rendered as a transient anchored popover it requires an
   * `OverlayHost` ancestor to portal into (else it clips inside scrollable
   * inspector content).
   */
  function Menu({ label = "Menu", variant = "standard", items, className = "", ...props }) {
    const resolvedVariant = propToken(variant);
    const rows = items ?? menuVariantRows[resolvedVariant] ?? menuVariantRows.standard;
    return h(
      "div",
      { ...props, className: cx("composa-menu", `composa-menu-${resolvedVariant}`, className), "data-composa-component": "Menu", "data-variant": resolvedVariant, role: "menu", "aria-label": label },
      rows.map((item, index) =>
        item && item.submenu
          ? h(SubmenuRow, { key: item.id ?? `submenu-${index}`, item })
          : h(MenuRow, { key: item.id ?? `${item.type ?? "row"}-${index}`, ...item })
      )
    );
  }

  function MenuMultiSelect({ variant = "standard", label = "Multi select menu", className = "", ...props }) {
    return h(
      "div",
      { ...props, className: cx("composa-menu", "composa-menu-multi-select", `composa-menu-multi-${variant}`, className), "data-composa-component": "MenuMultiSelect", "data-variant": variant, role: "menu", "aria-label": label },
      (menuVariantRows[variant] || menuVariantRows.standard).map((item, index) => h(MenuRow, { key: `${variant}-${index}`, ...item }))
    );
  }

  function MenuHeadingCell({
    label = "Layer",
    hierarchy,
    alignment = "default",
    trailing = null,
    content,
    className = "",
    ...props
  }) {
    // A menu heading is a quiet level-3 label (secondary color) by default; the
    // optional toggle "On" label is level 3 too.
    const headingLevel = hierarchy ?? 3;
    return h("div", {
      ...props,
      className: cx("composa-menu-heading", `composa-menu-heading-${alignment}`, className),
      "data-composa-component": "MenuHeadingCell",
      "data-alignment": alignment,
      role: "presentation",
    }, [
      content ?? h(Label, { key: "label", hierarchy: headingLevel, label }),
      trailing ?? (alignment === "toggle" ? h(Label, { key: "toggle", hierarchy: 3, label: "On" }) : null),
    ]);
  }

  function HeaderActions({ label = "Header actions", children = [], className = "", ...props }) {
    return h(
      "div",
      { ...props, className: cx("composa-header-actions", className), "data-composa-component": "HeaderActions", role: "group", "aria-label": label },
      keyedChildren(children)
    );
  }

  // TextPair is a three-slot vertical stack: `content` (the primary line),
  // `body` (supporting detail), and `metadata` (the quietest line). The slots map
  // 1:1 onto the three Label/body typography sizes: content -> large,
  // body -> medium, metadata -> small. `metadataPlacement` ("top" | "bottom",
  // default "bottom") moves the metadata slot above or below the body. A slot
  // that receives a plain string is wrapped in the matching styled element; a
  // ReactNode (e.g. a Label) is rendered as-is so callers can pass a Label and
  // get the same size ramp. Backward compatible: `title` aliases `content`,
  // `description`/`detail` alias `body`. `titleAs` still controls the content
  // wrapper tag for string content.
  function TextPair({
    content,
    body,
    metadata = null,
    metadataPlacement = "bottom",
    title,
    description,
    detail,
    titleAs = "strong",
    className = "",
    titleClassName = "",
    contentClassName = "",
    descriptionClassName = "",
    bodyClassName = "",
    metadataClassName = "",
    ...props
  }) {
    // Prefer the new slot props; fall back to the legacy `title`/`description`.
    // When a slot comes from a legacy prop we render the legacy class so existing
    // ListCell composition (which overrides `-title` per level) is pixel-stable;
    // the new slot props use the new `-content`/`-body` size ramp.
    const usingLegacyContent = content == null && title != null;
    const usingLegacyBody = body == null && (description != null || detail != null);
    const resolvedContent = content ?? title;
    const resolvedBody = body ?? description ?? detail ?? null;
    const ContentTag = titleAs;
    const slot = (value, key, baseClass, extraClass, Tag) => {
      if (value == null || value === false) return null;
      // A ReactNode (already an element) renders as-is so a passed Label keeps
      // its own size; only plain text/number gets the default styled wrapper.
      if (React.isValidElement(value)) {
        return h(React.Fragment, { key }, value);
      }
      return h(Tag, { key, className: cx(baseClass, extraClass), "data-scope": "text-pair", "data-part": key }, value);
    };
    const contentNode = slot(
      resolvedContent,
      "content",
      usingLegacyContent ? "composa-text-pair-title" : "composa-text-pair-content",
      cx(contentClassName, titleClassName),
      ContentTag
    );
    const bodyNode = slot(
      resolvedBody,
      "body",
      usingLegacyBody ? "composa-text-pair-description" : "composa-text-pair-body",
      cx(bodyClassName, descriptionClassName),
      "span"
    );
    const metadataNode = slot(metadata, "metadata", "composa-text-pair-metadata", metadataClassName, "span");
    const placeMetadataTop = metadataPlacement === "top";
    return h(
      "div",
      {
        ...props,
        className: cx("composa-text-pair", className),
        "data-composa-component": "TextPair",
        "data-metadata-placement": metadataPlacement === "top" ? "top" : "bottom",
      },
      [
        contentNode,
        placeMetadataTop ? metadataNode : null,
        bodyNode,
        placeMetadataTop ? null : metadataNode,
      ].filter(Boolean)
    );
  }

  // Normalizes a Label level. `level` is a real font hierarchy (1 = most
  // prominent, 3 = quietest) that maps 1:1 onto the three body typography sizes
  // (1 -> large, 2 -> medium, 3 -> small) so the hierarchy is visible between
  // every level. Pairs 1:1 with ListCell's `level`. Old `hierarchy` strings map
  // onto a level: menu->1, section->2, property->3, layer->3.
  const labelLevel = (value = 1) => {
    const token = propToken(value);
    if (token === "menu" || token === "1" || token === "level-1") return 1;
    if (token === "section" || token === "2" || token === "level-2") return 2;
    if (token === "property" || token === "layer" || token === "3" || token === "level-3") return 3;
    const numeric = Number(value);
    return Math.min(Math.max(Number.isFinite(numeric) ? numeric : 1, 1), 3);
  };

  // Default font-weight per level. Every level defaults to strong so the type
  // matches the ListCell title at the same level (ListCell titles are strong at
  // all levels). `weight` overrides this per instance (e.g. "regular" for a
  // quieter label).
  const labelDefaultWeight = () => "regular";
  const normalizeLabelWeight = (value, level) => {
    const token = propToken(value);
    if (token === "strong" || token === "regular") return token;
    return labelDefaultWeight(level);
  };

  // Label is a hierarchical text label for section headings and the like. Its
  // default color is secondary and stays contextual (inherits on dark
  // surfaces).
  function Label({ label, hierarchy, weight, as = "span", className = "", ...props }) {
    const Tag = as;
    const resolvedLevel = labelLevel(hierarchy ?? 1);
    const resolvedWeight = normalizeLabelWeight(weight, resolvedLevel);
    return h(
      Tag,
      {
        ...props,
        className: cx(
          "composa-label",
          `composa-label-level-${resolvedLevel}`,
          `composa-label-weight-${resolvedWeight}`,
          className
        ),
        "data-composa-component": "Label",
        "data-level": String(resolvedLevel),
        "data-weight": resolvedWeight,
      },
      label
    );
  }

  function VerticalCell({ children = [], gap = "2px", align = "stretch", className = "", ...props }) {
    return h(
      "div",
      {
        ...props,
        className: cx("composa-content-stack", className),
        "data-composa-component": "VerticalCell",
        style: {
          ...(props.style || {}),
          "--composa-content-stack-gap": gap,
          "--composa-content-stack-align": align,
        },
      },
      children
    );
  }

  function ComposaAppIcon({ label = "Composa", initials = "C", className = "", ...props }) {
    // Visible glyph is the Composa brand mark: a black rounded square with an
    // orange (#ff5c16) rounded square offset behind it to the bottom-right.
    // `label`/`initials` remain as the accessible name (and conceptual fallback);
    // the mark scales to the rail brand size token via CSS.
    return h(
      "span",
      {
        ...props,
        className: cx("composa-app-icon", className),
        "data-composa-component": "ComposaAppIcon",
        "data-composa-initials": String(initials || label || "C").trim().slice(0, 1).toUpperCase(),
        "aria-label": label,
        role: props.role || "img",
      },
      h(
        "svg",
        {
          className: "composa-app-icon-mark",
          viewBox: "0 0 37 37",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-hidden": "true",
          focusable: "false",
        },
        [
          h("rect", { key: "accent", x: 7, y: 7, width: 30, height: 30, rx: 7, fill: "#FF5C16" }),
          h("rect", { key: "mark", width: 30, height: 30, rx: 7, fill: "black" }),
        ]
      )
    );
  }

  function NavigationRailItem({ value, label, icon, selected = false, disabled = false, onClick, className = "", ...props }) {
    const resolvedValue = value ?? label;
    const resolvedLabel = label ?? String(resolvedValue ?? "");
    return h(
      "div",
      {
        ...props,
        className: cx("composa-navigation-rail-item", selected && "is-selected", className),
        "data-composa-component": "NavigationRailItem",
        "data-value": resolvedValue,
        "data-selected": boolData(selected),
      },
      h(
        VerticalCell,
        { className: "composa-navigation-rail-item-content", gap: "var(--composa-navigation-rail-item-gap)", align: "center" },
        [
          h(IconButton, {
            key: "button",
            icon,
            label: resolvedLabel,
            size: "xlarge",
            variant: "ghost",
            selected,
            pressed: selected,
            disabled,
            tooltip: false,
            className: "composa-navigation-rail-item-toggle",
            onClick,
          }),
          h("span", { key: "label", className: "composa-navigation-rail-item-label" }, resolvedLabel),
        ]
      )
    );
  }

  function AppNavigationRail({
    appIcon,
    appLabel = "Composa",
    items = [],
    value,
    defaultValue,
    onValueChange,
    onAppClick,
    label = "App navigation",
    className = "",
    ...props
  }) {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? items[0]?.value);
    const selectedValue = value ?? internalValue;
    const handleItemClick = (item) => (event) => {
      if (item.disabled) return;
      if (value === undefined) setInternalValue(item.value);
      onValueChange?.(item.value, item, event);
      item.onClick?.(event);
    };
    return h(
      "nav",
      {
        ...props,
        className: cx("composa-app-navigation-rail", className),
        "data-composa-component": "AppNavigationRail",
        "aria-label": label,
      },
      [
        h(
          "button",
          {
            key: "app",
            type: "button",
            className: "composa-app-navigation-rail-brand",
            "aria-label": appLabel,
            onClick: onAppClick,
          },
          appIcon ?? h(ComposaAppIcon, { label: appLabel })
        ),
        h("hr", {
          key: "brand-separator",
          className: "composa-app-navigation-rail-separator",
          "aria-hidden": "true",
        }),
        h(
          "div",
          { key: "items", className: "composa-app-navigation-rail-items" },
          items.map((item) =>
            h(NavigationRailItem, {
              key: item.value,
              ...item,
              selected: item.value === selectedValue,
              onClick: handleItemClick(item),
            })
          )
        ),
      ]
    );
  }

  // NavigatorHeader — the file-title header shared by the editor and slides
  // sidebars (Figma "Sidebar left/Header"). A bold file title with an optional
  // disclosure chevron sits over a subdued project name, with a trailing action
  // slot (defaults to a sidebar-toggle icon button). Presentational + controlled:
  // the consumer owns the title/project strings and the toggle handler.
  function NavigatorHeader({
    title = "Untitled",
    project,
    onTitleClick,
    titleMenu = true,
    trailing,
    onToggle,
    toggleLabel = "Toggle sidebar",
    toggleIcon = "panelLeft",
    label = "File",
    className = "",
    ...props
  }) {
    const trailingNode =
      trailing !== undefined
        ? trailing
        : h(IconButton, {
            icon: toggleIcon,
            label: toggleLabel,
            size: "medium",
            variant: "ghost",
            tooltip: false,
            onClick: onToggle,
            className: "composa-navigator-header-toggle",
          });
    return h(
      "div",
      {
        ...props,
        className: cx("composa-navigator-header", className),
        "data-composa-component": "NavigatorHeader",
        role: "group",
        "aria-label": label,
      },
      [
        h(
          "div",
          { key: "content", className: "composa-navigator-header-content" },
          [
            h(
              onTitleClick ? "button" : "div",
              {
                key: "title",
                ...(onTitleClick ? { type: "button", onClick: onTitleClick } : {}),
                className: "composa-navigator-header-title",
                "data-composa-component": "NavigatorHeaderTitle",
              },
              [
                h("span", { key: "text", className: "composa-navigator-header-title-text" }, title),
                titleMenu
                  ? h("span", { key: "chevron", className: "composa-navigator-header-title-chevron", "aria-hidden": "true" }, iconNode(h, Icon, "chevronDown"))
                  : null,
              ]
            ),
            project != null && project !== ""
              ? h("span", { key: "project", className: "composa-navigator-header-project" }, project)
              : null,
          ]
        ),
        h("div", { key: "trailing", className: "composa-navigator-header-actions" }, trailingNode),
      ]
    );
  }

  // CollapseHeader — the "Pages"/"Layers" section header (Figma "Collapse.Header").
  // A disclosure chevron + label on the lead, an optional trailing action slot
  // (e.g. the page-add plus button). Expansion is controlled/uncontrolled via
  // expanded/defaultExpanded/onToggle so the navigator can collapse a list.
  function CollapseHeader({
    label = "Section",
    expanded,
    defaultExpanded = true,
    onToggle,
    disclosure = true,
    trailing,
    className = "",
    ...props
  }) {
    const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded);
    const isExpanded = expanded !== undefined ? expanded : internalExpanded;
    const handleToggle = (event) => {
      if (expanded === undefined) setInternalExpanded((current) => !current);
      onToggle?.(!isExpanded, event);
    };
    return h(
      "div",
      {
        ...props,
        className: cx("composa-collapse-header", className),
        "data-composa-component": "CollapseHeader",
        "data-expanded": boolData(isExpanded),
      },
      [
        h(
          disclosure ? "button" : "div",
          {
            key: "lead",
            ...(disclosure
              ? { type: "button", onClick: handleToggle, "aria-expanded": isExpanded ? "true" : "false" }
              : {}),
            className: "composa-collapse-header-lead",
            "data-composa-component": "CollapseHeaderLead",
          },
          [
            disclosure
              ? h(
                  "span",
                  { key: "chevron", className: cx("composa-collapse-header-chevron", !isExpanded && "is-collapsed"), "aria-hidden": "true" },
                  iconNode(h, Icon, "chevronDown")
                )
              : null,
            h("span", { key: "label", className: "composa-collapse-header-label" }, label),
          ]
        ),
        trailing != null
          ? h("div", { key: "trail", className: "composa-collapse-header-trail" }, trailing)
          : null,
      ]
    );
  }

  // SlideThumb — a numbered slide preview row for the slides navigator (Figma
  // "Button - Slide N"). Introduced because neither Tree nor the simple row
  // primitives express a slide preview: it needs an index gutter plus a 16:9
  // thumbnail surface that can hold an image, a custom preview node, or a blank
  // placeholder. Presentational + controlled selection.
  function SlideThumb({
    index,
    label,
    thumbnail,
    selected = false,
    onClick,
    className = "",
    ...props
  }) {
    const resolvedLabel = label ?? (index != null ? `Slide ${index}` : "Slide");
    const preview = isRenderableElement(thumbnail)
      ? thumbnail
      : thumbnail
        ? h("img", { className: "composa-slide-thumb-image", src: thumbnail, alt: "", "aria-hidden": "true" })
        : h("span", { className: "composa-slide-thumb-placeholder", "aria-hidden": "true" });
    return h(
      "button",
      {
        ...props,
        type: "button",
        className: cx("composa-slide-thumb", selected && "is-selected", className),
        "data-composa-component": "SlideThumb",
        "data-selected": boolData(selected),
        "aria-pressed": selected ? "true" : "false",
        "aria-label": resolvedLabel,
        onClick,
      },
      [
        h("span", { key: "index", className: "composa-slide-thumb-index", "aria-hidden": "true" }, index != null ? String(index) : ""),
        h("span", { key: "preview", className: "composa-slide-thumb-preview" }, preview),
      ]
    );
  }

  // SlideList — the vertical stack of SlideThumb rows. Controlled/uncontrolled
  // selection mirrors Tree (selectedId / defaultSelectedId / onSelect). Each item:
  // { id, label?, thumbnail? }. Self-contained so a future video editor can reuse
  // it for a clip strip.
  function SlideList({ items = [], selectedId, defaultSelectedId, onSelect, label = "Slides", className = "", ...props }) {
    const [internalSelected, setInternalSelected] = React.useState(defaultSelectedId);
    const selected = selectedId !== undefined ? selectedId : internalSelected;
    const select = (id, item, event) => {
      if (selectedId === undefined) setInternalSelected(id);
      onSelect?.(id, item, event);
    };
    return h(
      "div",
      { ...props, className: cx("composa-slide-list", className), "data-composa-component": "SlideList", role: "listbox", "aria-label": label },
      items.length === 0
        ? h("div", { className: "composa-slide-list-empty", role: "presentation" }, "No slides yet")
        : items.map((item, position) =>
            h(SlideThumb, {
              key: item.id ?? position,
              index: item.index ?? position + 1,
              label: item.label,
              thumbnail: item.thumbnail,
              selected: (item.id ?? position) === selected,
              role: "option",
              "aria-selected": (item.id ?? position) === selected ? "true" : "false",
              onClick: (event) => select(item.id ?? position, item, event),
            })
          )
    );
  }

  // EditorNavigator — the design-editor left sidebar. Header over a split of two
  // stacked lists: a flat PAGE list (Tree without nesting, selection only) on top
  // and a nested LAYER list (Tree) on bottom, separated by a draggable divider
  // that resizes the page region. The split height is internal UI state (or
  // controlled via pageHeight/onPageHeightChange); document truth stays external.
  function EditorNavigator({
    title = "Untitled",
    project,
    onToggle,
    headerProps,
    pages = [],
    selectedPageId,
    defaultSelectedPageId,
    onPageSelect,
    onPageAdd,
    pagesLabel = "Pages",
    layers = [],
    selectedLayerId,
    defaultSelectedLayerId,
    onLayerSelect,
    layersLabel = "Layers",
    pageHeight,
    defaultPageHeight = 160,
    onPageHeightChange,
    minPageHeight = 72,
    maxPageHeight = 320,
    label = "Editor navigator",
    className = "",
    ...props
  }) {
    const [internalHeight, setInternalHeight] = React.useState(defaultPageHeight);
    const resolvedHeight = pageHeight !== undefined ? pageHeight : internalHeight;
    const draggingRef = React.useRef(null);
    const clamp = (value) => Math.min(Math.max(value, minPageHeight), maxPageHeight);
    const commitHeight = (next) => {
      const clamped = clamp(next);
      if (pageHeight === undefined) setInternalHeight(clamped);
      onPageHeightChange?.(clamped);
    };
    const onSeparatorPointerDown = (event) => {
      if (event.button != null && event.button !== 0) return;
      draggingRef.current = { startY: event.clientY, startHeight: resolvedHeight };
      event.currentTarget.setPointerCapture?.(event.pointerId);
    };
    const onSeparatorPointerMove = (event) => {
      const drag = draggingRef.current;
      if (!drag) return;
      commitHeight(drag.startHeight + (event.clientY - drag.startY));
    };
    const onSeparatorPointerUp = (event) => {
      if (!draggingRef.current) return;
      draggingRef.current = null;
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    };
    const onSeparatorKeyDown = (event) => {
      const step = event.shiftKey ? 24 : 8;
      if (event.key === "ArrowUp") {
        event.preventDefault();
        commitHeight(resolvedHeight - step);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        commitHeight(resolvedHeight + step);
      } else if (event.key === "Home") {
        event.preventDefault();
        commitHeight(minPageHeight);
      } else if (event.key === "End") {
        event.preventDefault();
        commitHeight(maxPageHeight);
      }
    };
    return h(
      "div",
      {
        ...props,
        className: cx("composa-editor-navigator", className),
        "data-composa-component": "EditorNavigator",
        "aria-label": label,
      },
      [
        h(NavigatorHeader, { key: "header", title, project, onToggle, ...(headerProps || {}) }),
        h(
          "div",
          {
            key: "pages",
            className: "composa-navigator-list composa-navigator-pages",
            "data-composa-component": "EditorNavigatorPages",
            style: { height: `${resolvedHeight}px` },
          },
          [
            h(CollapseHeader, {
              key: "pages-header",
              label: pagesLabel,
              disclosure: true,
              trailing: onPageAdd
                ? h(IconButton, { icon: "plusSmall", label: "Add page", size: "medium", variant: "ghost", tooltip: false, onClick: onPageAdd })
                : null,
            }),
            h(
              "div",
              { key: "pages-scroll", className: "composa-navigator-list-scroll" },
              h(Tree, {
                items: pages,
                selectedId: selectedPageId,
                defaultSelectedId: defaultSelectedPageId,
                onSelect: onPageSelect,
                label: pagesLabel,
                className: "composa-navigator-page-tree",
              })
            ),
          ]
        ),
        h("div", {
          key: "divider",
          className: "composa-navigator-split-divider",
          "data-composa-component": "NavigatorSplitDivider",
          role: "separator",
          tabIndex: 0,
          "aria-orientation": "horizontal",
          "aria-label": "Resize page list",
          "aria-valuenow": Math.round(resolvedHeight),
          "aria-valuemin": minPageHeight,
          "aria-valuemax": maxPageHeight,
          onPointerDown: onSeparatorPointerDown,
          onPointerMove: onSeparatorPointerMove,
          onPointerUp: onSeparatorPointerUp,
          onKeyDown: onSeparatorKeyDown,
        }),
        h(
          "div",
          {
            key: "layers",
            className: "composa-navigator-list composa-navigator-layers",
            "data-composa-component": "EditorNavigatorLayers",
          },
          [
            h(CollapseHeader, { key: "layers-header", label: layersLabel, disclosure: true }),
            h(
              "div",
              { key: "layers-scroll", className: "composa-navigator-list-scroll" },
              h(Tree, {
                items: layers,
                selectedId: selectedLayerId,
                defaultSelectedId: defaultSelectedLayerId,
                onSelect: onLayerSelect,
                label: layersLabel,
                className: "composa-navigator-layer-tree",
              })
            ),
          ]
        ),
      ]
    );
  }

  // SlidesNavigator — the slides bar: header, a create toolbar (New slide + add),
  // then a vertical SlideList of numbered thumbnails. Self-contained so a future
  // video editor can reuse the same module as a clip/scene strip.
  function SlidesNavigator({
    title = "Untitled",
    project,
    onToggle,
    headerProps,
    showHeader = true,
    slides = [],
    selectedSlideId,
    defaultSelectedSlideId,
    onSlideSelect,
    onNewSlide,
    onAddSlide,
    newSlideLabel = "New slide",
    slidesLabel = "Slides",
    label = "Slides navigator",
    className = "",
    ...props
  }) {
    return h(
      "div",
      {
        ...props,
        className: cx("composa-slides-navigator", className),
        "data-composa-component": "SlidesNavigator",
        "aria-label": label,
      },
      [
        showHeader
          ? h(NavigatorHeader, { key: "header", title, project, onToggle, ...(headerProps || {}) })
          : null,
        h(
          "div",
          { key: "toolbar", className: "composa-slides-navigator-toolbar", "data-composa-component": "SlidesNavigatorToolbar" },
          [
            h(
              Button,
              {
                key: "new",
                "aria-label": newSlideLabel,
                variant: "secondary",
                size: "small",
                width: "fill",
                className: "composa-slides-navigator-new",
                onClick: onNewSlide,
              },
              [
                h("span", { key: "label" }, newSlideLabel),
                h("span", { key: "chevron", className: "composa-slides-navigator-new-chevron", "aria-hidden": "true" }, iconNode(h, Icon, "chevronDown")),
              ]
            ),
            h(IconButton, { key: "add", icon: "plusSmall", label: "Add blank slide", size: "medium", variant: "ghost", tooltip: false, onClick: onAddSlide }),
          ]
        ),
        h(
          "div",
          { key: "scroll", className: "composa-slides-navigator-scroll" },
          h(SlideList, {
            items: slides,
            selectedId: selectedSlideId,
            defaultSelectedId: defaultSelectedSlideId,
            onSelect: onSlideSelect,
            label: slidesLabel,
          })
        ),
      ]
    );
  }

  function ListCell({
    componentName = "ListCell",
    level = 3,
    hierarchy = "property",
    underline = false,
    align = "center",
    width = "fill",
    leading = null,
    leadingContent = null,
    content,
    trailing = null,
    className = "",
    ...props
  }) {
    const resolvedLevel = Math.min(Math.max(Number(level) || 3, 1), 3);
    const resolvedAlign = propToken(align);
    const resolvedWidth = normalizeWidth(width);
    const leadingNode = leading ?? leadingContent;
    return h(
      "div",
      {
        ...props,
        className: cx(
          "composa-list-cell",
          `composa-list-cell-${hierarchy}`,
          `composa-list-cell-level-${resolvedLevel}`,
          `composa-list-cell-align-${resolvedAlign}`,
          `composa-list-cell-width-${resolvedWidth}`,
          underline && "has-underline",
          className
        ),
        "data-composa-component": componentName,
        "data-hierarchy": hierarchy,
        "data-level": String(resolvedLevel),
        "data-align": resolvedAlign,
        "data-width": resolvedWidth,
        "data-underline": boolData(underline),
        "data-has-leading": boolData(leadingNode !== null && leadingNode !== undefined && leadingNode !== false),
        "data-has-trailing": boolData(trailing !== null && trailing !== undefined && trailing !== false),
      },
      [
        leadingNode !== null && leadingNode !== undefined && leadingNode !== false
          ? h("div", { key: "leading", className: "composa-list-cell-leading", "data-scope": "list-cell", "data-part": "leading" }, leadingNode)
          : null,
        h("div", { key: "content", className: "composa-list-cell-content", "data-scope": "list-cell", "data-part": "content" }, content),
        trailing ? h(HeaderActions, { key: "actions", className: "composa-list-cell-trailing" }, keyedChildren(trailing)) : null,
      ]
    );
  }

  function Header({
    title,
    level = 3,
    hierarchy = "property",
    expanded,
    actions,
    content,
    trailing,
    className = "",
    underline,
    leading = "auto",
    leadingIcon = "chevronDown",
    leadingContent,
    onToggle,
    ...props
  }) {
    const headingLevel = Math.min(Math.max(level, 1), 6);
    const resolvedLevel = Math.min(Math.max(Number(level) || 3, 1), 3);
    const resolvedUnderline = underline ?? hierarchy === "layer";
    const trailingNode = trailing ?? actions;
    const shouldShowLeading = leading !== "none" && (leading !== "auto" || expanded !== undefined);
    const generatedLeadingNode = shouldShowLeading
        ? leading === "icon"
          ? h("span", { key: "disclosure", className: "composa-header-leading-icon", "aria-hidden": "true" }, iconNode(h, Icon, leadingIcon))
          : h(IconButton, {
              key: "disclosure",
              icon: leadingIcon,
              label: expanded !== undefined ? (expanded ? `Collapse ${title}` : `Expand ${title}`) : title,
              pressed: expanded,
              className: "composa-header-disclosure",
              onClick: onToggle,
            })
        : null;
    const resolvedLeadingNode = leadingContent ?? generatedLeadingNode;
    const contentNode = content ?? h(`h${headingLevel}`, { key: "title", className: "composa-header-title" }, title);
    return h(ListCell, {
      ...props,
      componentName: "Header",
      level: resolvedLevel,
      hierarchy,
      underline: resolvedUnderline,
      leading: resolvedLeadingNode,
      content: contentNode,
      trailing: trailingNode,
      className: cx("composa-header", `composa-header-${hierarchy}`, className),
      "data-leading": leading,
    });
  }

  function SegmentedControl({ label, options = [], value, defaultValue, onValueChange, variant, width = "auto", state = "rest", disabled = false, className = "", ...props }) {
    const selectedFromOptions = options.findIndex((option) => option.selected);
    const fallbackValue = defaultValue ?? (selectedFromOptions >= 0 ? optionValue(options[selectedFromOptions], selectedFromOptions) : optionValue(options[0] || {}, 0));
    const [internalValue, setInternalValue] = React.useState(fallbackValue);
    const selectedValue = value ?? internalValue;
    const resolvedWidth = normalizeWidth(width);
    // Default the variant from the options instead of always assuming "icon":
    // label-only options under the icon variant render BLANK (the IconButton has
    // no glyph). When no variant is passed and the options carry labels but no
    // icons, fall back to the label variant. Mixed/icon sets still default to icon.
    const hasAnyIcon = options.some((option) => option && option.icon != null && option.icon !== false && option.icon !== "");
    const hasAnyLabel = options.some((option) => option && option.label != null && option.label !== "");
    const resolvedVariant = variant ?? (!hasAnyIcon && hasAnyLabel ? "label" : "icon");
    const handleSelect = (nextValue, option, index, event) => {
      if (disabled || option.disabled) return;
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue, option, index, event);
      option.onClick?.(event);
    };
    return h(
      "div",
      {
        ...props,
        className: cx("composa-segmented-control", `composa-segmented-${resolvedVariant}`, `composa-segmented-width-${resolvedWidth}`, stateClass(state), className),
        "data-composa-component": "SegmentedControl",
        "data-variant": resolvedVariant,
        "data-width": resolvedWidth,
        "data-tab-count": String(options.length).padStart(2, "0"),
        "data-state": state,
        "data-disabled": boolData(disabled),
        role: "tablist",
        "aria-label": label,
      },
      options.map((option, index) => {
        const nextValue = optionValue(option, index);
        // Figma: a disabled segmented control shows NO selected segment. Keep the
        // value internally but drop the selected styling while disabled.
        const selected = !disabled && nextValue === selectedValue;
        return resolvedVariant === "label"
          ? h(
              "button",
              {
                key: option.id ?? option.label ?? index,
                className: cx("composa-segmented-label", selected && "is-selected"),
                "data-composa-component": "SegmentedControlItem",
                "data-scope": "segmented-control",
                "data-part": "segment",
                "data-value": nextValue,
                role: "tab",
                "aria-selected": selected ? "true" : "false",
                disabled: disabled || option.disabled,
                onClick: (event) => handleSelect(nextValue, option, index, event),
              },
              option.label
            )
          : h(IconButton, {
              key: option.id ?? option.icon ?? option.label ?? index,
              icon: option.icon,
              label: option.label,
              selected,
              disabled: disabled || option.disabled,
              role: "tab",
              component: "SegmentedControlItem",
              tooltipPlacement: option.tooltipPlacement || (index === 0 ? "top-left" : index === options.length - 1 ? "top-right" : "top"),
              "data-value": nextValue,
              onClick: (event) => handleSelect(nextValue, option, index, event),
            });
      })
    );
  }

  function ControlGroup({ label, items = [], size = "medium", variant = "ghost", disabled = false, tooltipPlacement = "top", className = "", onAction, ...props }) {
    return h(
      "div",
      {
        ...props,
        className: cx("composa-control-group", disabled && "is-disabled", className),
        "data-composa-component": "ControlGroup",
        "data-item-count": String(items.length).padStart(2, "0"),
        "data-disabled": boolData(disabled),
        role: "group",
        "aria-label": label,
      },
      items.map((item, index) =>
        h(IconButton, {
          key: item.id ?? item.icon ?? item.label ?? index,
          icon: item.icon,
          label: item.label,
          size,
          variant,
          disabled: disabled || item.disabled,
          tooltipPlacement: item.tooltipPlacement || (index === 0 ? "top-left" : index === items.length - 1 ? "top-right" : tooltipPlacement),
          component: "ControlGroupItem",
          className: cx("composa-control-group-item", item.className),
          "data-value": item.value ?? item.id ?? String(index),
          onClick: (event) => {
            if (disabled || item.disabled) return;
            item.onClick?.(event);
            onAction?.(item, index, event);
          },
        })
      )
    );
  }

  const alignmentPickerOptions = [
    { id: "top-left", label: "Align top left" },
    { id: "top-center", label: "Align top center" },
    { id: "top-right", label: "Align top right" },
    { id: "middle-left", label: "Align middle left" },
    { id: "center", label: "Align center" },
    { id: "middle-right", label: "Align middle right" },
    { id: "bottom-left", label: "Align bottom left" },
    { id: "bottom-center", label: "Align bottom center" },
    { id: "bottom-right", label: "Align bottom right" },
  ];

  function AlignmentPicker({ label = "Alignment", value, defaultValue = "top-left", options = alignmentPickerOptions, width = "auto", disabled = false, tooltipPlacement = "bottom", onValueChange, className = "", ...props }) {
    const pickerId = React.useId();
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const selectedValue = value ?? internalValue;
    const resolvedWidth = normalizeWidth(width);
    const handleSelect = (nextValue, option, index, event) => {
      if (disabled || option.disabled) return;
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue, option, index, event);
      option.onClick?.(event);
    };
    function AlignmentPickerPoint({ option, index }) {
      const pointRef = React.useRef(null);
      const [tooltipOpen, setTooltipOpen] = React.useState(false);
      const nextValue = optionValue(option, index);
      const selected = !disabled && nextValue === selectedValue;
      const tooltipId = `${pickerId}-${index}`;
      const tooltipLabel = option.tooltipLabel || option.label;
      const column = index % 3;
      const row = Math.floor(index / 3);
      const resolvedTooltipPlacement =
        option.tooltipPlacement ||
        (column === 0 ? (row === 0 ? "bottom-left" : "top-left") : column === 2 ? (row === 0 ? "bottom-right" : "top-right") : tooltipPlacement);
      return h(
        "span",
        {
          ref: pointRef,
          className: "composa-alignment-point-wrap",
          onMouseEnter: () => setTooltipOpen(true),
          onMouseLeave: () => setTooltipOpen(false),
          onFocus: () => setTooltipOpen(true),
          onBlur: (event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setTooltipOpen(false);
          },
        },
        [
          h(
            "button",
            {
              key: "button",
              type: "button",
              className: cx("composa-alignment-point", selected && "is-selected", option.className),
              "data-composa-component": "AlignmentPickerPoint",
              "data-value": nextValue,
              role: "radio",
              "aria-label": option.label,
              "aria-checked": selected ? "true" : "false",
              "aria-describedby": tooltipLabel ? tooltipId : undefined,
              disabled: disabled || option.disabled,
              onClick: (event) => handleSelect(nextValue, option, index, event),
            },
            h("span", { className: "composa-alignment-dot", "aria-hidden": "true" })
          ),
          tooltipLabel
            ? h(FloatingTooltip, {
                key: "tooltip",
                open: tooltipOpen,
                anchorRef: pointRef,
                id: tooltipId,
                label: tooltipLabel,
                placement: resolvedTooltipPlacement,
                className: "composa-alignment-tooltip",
              })
            : null,
        ]
      );
    }
    return h(
      "div",
      {
        ...props,
        className: cx("composa-alignment-picker", `composa-alignment-width-${resolvedWidth}`, disabled && "is-disabled", className),
        "data-composa-component": "AlignmentPicker",
        "data-value": selectedValue,
        "data-width": resolvedWidth,
        "data-disabled": boolData(disabled),
      },
      [
        label ? h("span", { key: "label", className: "composa-alignment-picker-label" }, label) : null,
        h(
          "div",
          {
            key: "grid",
            className: "composa-alignment-grid",
            role: "radiogroup",
            "aria-label": label,
          },
          options.map((option, index) =>
            h(AlignmentPickerPoint, { key: option.id ?? option.label ?? index, option, index })
          )
        ),
      ]
    );
  }

  function Tab({ label, selected = false, singleTab = false, state = "rest", className = "", ...props }) {
    return h(
      "button",
      {
        ...props,
        className: cx("composa-tab", selected && "is-selected", singleTab && "is-single", stateClass(state), className),
        "data-composa-component": "Tab",
        "data-scope": "tabs",
        "data-part": "tab",
        "data-state": state,
        role: "tab",
        "aria-selected": selected ? "true" : "false",
      },
      h("span", { className: "composa-tab-label" }, label)
    );
  }

  function Tabs({ tabs = [], value, defaultValue, onValueChange, variant = "underline", size = "medium", state = "rest", label = "Tabs", divider = true, className = "", ...props }) {
    const selectedFromTabs = tabs.findIndex((tab) => tab.selected);
    const fallbackValue = defaultValue ?? (selectedFromTabs >= 0 ? optionValue(tabs[selectedFromTabs], selectedFromTabs) : optionValue(tabs[0] || {}, 0));
    const [internalValue, setInternalValue] = React.useState(fallbackValue);
    const selectedValue = value ?? internalValue;
    const handleSelect = (nextValue, tab, index, event) => {
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue, tab, index, event);
      tab.onClick?.(event);
    };
    return h(
      "div",
      { ...props, className: cx("composa-tabs", `composa-tabs-${variant}`, `composa-tabs-${size}`, !divider && "composa-tabs-no-divider", stateClass(state), className), "data-composa-component": "Tabs", "data-variant": variant, "data-size": size, "data-state": state, "data-divider": boolData(divider), "data-tab-count": String(tabs.length), role: "tablist", "aria-label": label },
      tabs.map((tab, index) => {
        const nextValue = optionValue(tab, index);
        return h(Tab, { key: tab.id ?? tab.label ?? index, singleTab: tabs.length === 1, state, ...tab, selected: nextValue === selectedValue, "data-value": nextValue, onClick: (event) => handleSelect(nextValue, tab, index, event) });
      })
    );
  }

  function Avatar({ initials = "A", src, alt, variant = "yellow", size = "medium", shape = "circle", state = "default", className = "", ...props }) {
    const resolvedVariant = propToken(variant);
    const resolvedSize = propToken(size);
    const resolvedShape = propToken(shape);
    const resolvedState = propToken(state);
    return h(
      "span",
      {
        ...props,
        className: cx("composa-avatar", `composa-avatar-${resolvedVariant}`, `composa-avatar-${resolvedSize}`, `composa-avatar-${resolvedShape}`, `composa-avatar-${resolvedState}`, className),
        "data-composa-component": "Avatar",
        "data-variant": resolvedVariant,
        "data-size": resolvedSize,
        "data-shape": resolvedShape,
        "data-state": resolvedState,
        "aria-label": alt || props["aria-label"],
        "aria-hidden": alt || props["aria-label"] ? undefined : "true",
      },
      [
        src
          ? h("img", { key: "image", className: "composa-avatar-image", src, alt: alt || "", "data-scope": "avatar", "data-part": "image" })
          : h("span", { key: "label", className: "composa-avatar-label", "data-scope": "avatar", "data-part": "label" }, String(initials || "").slice(0, 2).toUpperCase()),
      ]
    );
  }

  function MultiplayerControl({ initials = "W", label = "Collaborators", tooltipLabel = "Multiplayer tools", tooltipPlacement = "bottom", expanded = false, color = "yellow", avatar, className = "", ...props }) {
    const avatarProps = typeof avatar === "object" && avatar !== null ? avatar : {};
    const tooltipId = React.useId();
    const tooltipAnchorRef = React.useRef(null);
    const [tooltipOpen, setTooltipOpen] = React.useState(false);
    return h(
      "span",
      {
        ref: tooltipAnchorRef,
        className: "composa-multiplayer-tooltip-wrap",
        "data-composa-component": "MultiplayerControlTooltipTrigger",
        onMouseEnter: () => setTooltipOpen(true),
        onMouseLeave: () => setTooltipOpen(false),
        onFocus: () => setTooltipOpen(true),
        onBlur: (event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setTooltipOpen(false);
        },
      },
      [
        h(
          "button",
          {
            ...props,
            key: "button",
            className: cx("composa-multiplayer-control", className),
            "data-composa-component": "MultiplayerControl",
            "data-color": color,
            "aria-label": label,
            "aria-describedby": tooltipLabel ? tooltipId : props["aria-describedby"],
            "aria-expanded": expanded ? "true" : "false",
            type: props.type || "button",
          },
          [
            h(Avatar, { key: "avatar", initials, variant: color, ...avatarProps }),
            h("span", { key: "chevron", className: "composa-multiplayer-chevron", "aria-hidden": "true" }, iconNode(h, Icon, "chevronDown")),
          ]
        ),
        tooltipLabel
          ? h(FloatingTooltip, {
              key: "tooltip",
              open: tooltipOpen,
              anchorRef: tooltipAnchorRef,
              id: tooltipId,
              label: tooltipLabel,
              placement: tooltipPlacement,
              className: "composa-icon-button-tooltip composa-multiplayer-tooltip",
            })
          : null,
      ]
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Comments — the comment composer + thread window (Figma 4kilp0… nodes
  // 2012-63721 composer, 2012-63732 thread window).
  //
  // CommentComposer is deliberately a GENERAL composer, not a comment-only box.
  // The same component is the app's AI side-chat input: leading avatar (optional),
  // a growing text input, a trailing action cluster (emoji / mention / attach by
  // default, but fully slot-overridable), an optional `mode` scope slot (e.g. a
  // model/scope selector for the chat input), an attachments tray, and a submit
  // affordance. It is presentational + controlled: drive `value`/`onChange` and
  // handle `onSubmit`; it owns no message state.
  //
  // Two layouts share the component:
  //   - `card`  (default): the standalone composer card — growing textarea on top,
  //             a divider footer with the action toolbar + send. This is the chat
  //             input layout.
  //   - `inline`: the pill-shaped single-row reply used at the bottom of the
  //             thread window (avatar + rounded field + inline send).
  // ──────────────────────────────────────────────────────────────────────────

  // Resolves a composer action descriptor into an IconButton. Accepts a ready
  // element (rendered as-is), or a `{ icon, label, onClick, ... }` descriptor.
  function composerAction(action, key, extraProps = {}) {
    if (action == null || action === false) return null;
    if (React.isValidElement(action)) return h(React.Fragment, { key }, action);
    const { icon, label, tooltipLabel, onClick, disabled, ...rest } = action;
    return h(IconButton, {
      key,
      icon,
      label: label || tooltipLabel || "Action",
      tooltipLabel: tooltipLabel || label,
      size: "medium",
      variant: "standard",
      onClick,
      disabled,
      component: "CommentComposerAction",
      ...extraProps,
      ...rest,
    });
  }

  function CommentComposer({
    value = "",
    placeholder = "Reply",
    layout = "card",
    avatar = null,
    actions,
    mode = null,
    attachments = [],
    submitIcon = "arrowUp",
    submitLabel = "Send",
    submitDisabled = false,
    submitVariant,
    autoSubmitEmpty = false,
    disabled = false,
    rows = 1,
    name,
    onChange,
    onInput,
    onSubmit,
    onAttachmentRemove,
    className = "",
    ...props
  }) {
    const resolvedLayout = propToken(layout);
    const isInline = resolvedLayout === "inline";
    // Default action cluster matches the Figma composer footer: emoji, mention,
    // attach. The card layout shows them; the inline (reply) layout hides them by
    // default (the Figma reply pill is field + send only). Pass `actions` to
    // override, or `actions={[]}` to drop them entirely.
    const defaultActions = [
      { icon: "mood", label: "Add emoji" },
      { icon: "at", label: "Mention" },
      { icon: "image", label: "Attach image" },
    ];
    const resolvedActions = actions !== undefined ? actions : isInline ? [] : defaultActions;
    const actionList = Array.isArray(resolvedActions) ? resolvedActions.filter(Boolean) : resolvedActions ? [resolvedActions] : [];
    const hasValue = String(value ?? "").trim().length > 0;
    const resolvedSubmitDisabled = disabled || submitDisabled || (!autoSubmitEmpty && !hasValue);

    const submit = (event) => {
      if (resolvedSubmitDisabled) return;
      if (onSubmit) onSubmit(value, event);
    };
    const handleKeyDown = (event) => {
      // Enter submits, Shift+Enter inserts a newline — the standard chat-input
      // contract. Honor any consumer-provided onKeyDown first.
      if (props.onKeyDown) props.onKeyDown(event);
      if (event.key === "Enter" && !event.shiftKey && !event.defaultPrevented) {
        event.preventDefault();
        submit(event);
      }
    };

    const fieldProps = {
      className: "composa-comment-composer-input",
      value,
      placeholder,
      rows: isInline ? 1 : rows,
      disabled,
      "aria-label": props["aria-label"] || placeholder || "Message",
      onChange,
      onInput,
      onKeyDown: handleKeyDown,
      readOnly: onChange || onInput ? undefined : true,
    };
    // A growing textarea: the `rows` height is the floor; CSS field-sizing/min
    // lets it grow with content. Inline layout is a single visual row.
    const field = h("textarea", fieldProps);

    const submitButton = h(IconButton, {
      key: "submit",
      icon: submitIcon,
      label: submitLabel,
      tooltipLabel: submitLabel,
      size: "medium",
      variant: submitVariant || (isInline ? "standard" : "primary"),
      disabled: resolvedSubmitDisabled,
      className: "composa-comment-composer-submit",
      component: "CommentComposerSubmit",
      onClick: submit,
    });

    const attachmentList = Array.isArray(attachments) ? attachments.filter(Boolean) : [];
    const attachmentTray =
      attachmentList.length > 0
        ? h(
            "div",
            { key: "attachments", className: "composa-comment-composer-attachments", role: "list" },
            attachmentList.map((attachment, index) => {
              if (React.isValidElement(attachment)) return h(React.Fragment, { key: index }, attachment);
              const data = typeof attachment === "object" && attachment !== null ? attachment : { label: String(attachment) };
              return h(ChitInput, {
                key: data.id ?? data.label ?? index,
                label: data.label ?? "Attachment",
                closeButton: true,
                onClear: onAttachmentRemove ? () => onAttachmentRemove(data, index) : undefined,
              });
            })
          )
        : null;

    const rootProps = {
      ...props,
      className: cx(
        "composa-comment-composer",
        `composa-comment-composer-${resolvedLayout}`,
        disabled && "is-disabled",
        mode ? "has-mode" : null,
        attachmentList.length > 0 && "has-attachments",
        className
      ),
      "data-composa-component": "CommentComposer",
      "data-layout": resolvedLayout,
      "data-disabled": boolData(disabled),
    };
    delete rootProps.onKeyDown;

    const avatarNode = avatar
      ? h("span", { key: "avatar", className: "composa-comment-composer-avatar" }, React.isValidElement(avatar) ? avatar : h(Avatar, { size: "medium", ...avatar }))
      : null;

    if (isInline) {
      // Pill layout: [avatar] [ rounded field … inline send ].
      return h("div", rootProps, [
        avatarNode,
        h("div", { key: "field", className: "composa-comment-composer-pill" }, [
          withKey(field, "input"),
          h("div", { key: "trailing", className: "composa-comment-composer-pill-actions" }, [...actionList.map((a, i) => composerAction(a, `a${i}`)), submitButton]),
        ]),
      ]);
    }

    // Card layout: growing field, optional attachments, then a footer toolbar
    // with [mode? + leading actions] on the left and [send] on the right.
    return h("div", rootProps, [
      avatarNode && h("div", { key: "lead", className: "composa-comment-composer-lead" }, avatarNode),
      h("div", { key: "body", className: "composa-comment-composer-body" }, [
        h("div", { key: "field", className: "composa-comment-composer-field" }, field),
        attachmentTray,
        h("div", { key: "footer", className: "composa-comment-composer-footer" }, [
          h("div", { key: "start", className: "composa-comment-composer-actions" }, [
            mode ? h("span", { key: "mode", className: "composa-comment-composer-mode" }, mode) : null,
            ...actionList.map((a, i) => composerAction(a, `a${i}`)),
          ]),
          h("div", { key: "end", className: "composa-comment-composer-end" }, submitButton),
        ]),
      ]),
    ]);
  }

  // CommentItem — one comment row: avatar, an author/time header line, and a
  // body. Optional `footer` slot carries reactions / reply affordances. The
  // avatar is absolutely positioned in the row gutter to match the Figma layout
  // (body wraps full-width under the name, not indented per-line).
  function CommentItem({
    author = "",
    timestamp,
    body,
    avatar = null,
    footer = null,
    className = "",
    ...props
  }) {
    const avatarNode = avatar
      ? React.isValidElement(avatar)
        ? avatar
        : h(Avatar, { size: "medium", ...avatar })
      : h(Avatar, { size: "medium", initials: String(author || "?").slice(0, 1) });
    return h(
      "div",
      {
        ...props,
        className: cx("composa-comment-item", className),
        "data-composa-component": "CommentItem",
        role: "listitem",
      },
      [
        h("span", { key: "avatar", className: "composa-comment-item-avatar" }, avatarNode),
        h("div", { key: "main", className: "composa-comment-item-main" }, [
          h("div", { key: "head", className: "composa-comment-item-head" }, [
            author ? h("strong", { key: "author", className: "composa-comment-item-author" }, author) : null,
            timestamp != null && timestamp !== "" ? h("span", { key: "time", className: "composa-comment-item-time" }, timestamp) : null,
          ]),
          body != null && body !== "" ? h("div", { key: "body", className: "composa-comment-item-body" }, body) : null,
          footer ? h("div", { key: "footer", className: "composa-comment-item-footer" }, footer) : null,
        ]),
      ]
    );
  }

  // CommentThreadWindow — the floating comment surface (Figma 2012-63732): a
  // titlebar (title + actions), a scrollable thread list of CommentItems, and a
  // composer pinned at the bottom. `comments` is the data array; or pass
  // `children` to compose CommentItems directly. `composer` props feed the
  // pinned CommentComposer (inline layout). Set `emptyState` for the no-comments
  // surface.
  function CommentThreadWindow({
    title = "Comment",
    comments = [],
    children,
    actions,
    composer,
    emptyState = null,
    onResolve,
    onMore,
    onClose,
    className = "",
    ...props
  }) {
    const titlebarActions =
      actions !== undefined
        ? actions
        : [
            onMore !== undefined ? { icon: "more", label: "More options", onClick: onMore } : null,
            onResolve !== undefined ? { icon: "checkCircle", label: "Resolve thread", onClick: onResolve } : null,
            onClose !== undefined ? { icon: "close", label: "Close", onClick: onClose } : null,
          ].filter(Boolean);
    const actionNodes = Array.isArray(titlebarActions) ? titlebarActions : titlebarActions ? [titlebarActions] : [];

    const itemNodes =
      children != null
        ? children
        : Array.isArray(comments)
          ? comments.map((comment, index) =>
              React.isValidElement(comment)
                ? React.cloneElement(comment, { key: comment.key ?? comment.props?.id ?? index })
                : h(CommentItem, { key: comment.id ?? index, ...comment })
            )
          : null;
    const hasItems = (Array.isArray(itemNodes) ? itemNodes.length : itemNodes != null && itemNodes !== false) > 0 || (children != null);

    const composerNode = composer
      ? React.isValidElement(composer)
        ? composer
        : h(CommentComposer, { layout: "inline", placeholder: "Reply", ...composer })
      : null;

    return h(
      "section",
      {
        ...props,
        className: cx("composa-comment-thread", className),
        "data-composa-component": "CommentThreadWindow",
        "aria-label": typeof title === "string" ? title : "Comment thread",
      },
      [
        h("header", { key: "titlebar", className: "composa-comment-thread-titlebar" }, [
          h("span", { key: "title", className: "composa-comment-thread-title" }, title),
          actionNodes.length
            ? h(
                "div",
                { key: "actions", className: "composa-comment-thread-actions" },
                actionNodes.map((a, i) => composerAction(a, `t${i}`, { variant: "standard" }))
              )
            : null,
        ]),
        h(
          "div",
          { key: "list", className: "composa-comment-thread-list", role: "list" },
          hasItems ? itemNodes : h("div", { key: "empty", className: "composa-comment-thread-empty" }, emptyState ?? "No comments yet")
        ),
        composerNode ? h("footer", { key: "composer", className: "composa-comment-thread-composer" }, composerNode) : null,
      ]
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Badges, visual bell, notifications (Figma 4kilp0… pages "Badges" 2012-32973,
  // "Visual Bells" 2015-40421, "Notifications" 2028-109149).
  // ──────────────────────────────────────────────────────────────────────────

  // Badge — the count/label/dot indicator (Figma "Badges" page 2012-32973:
  // Badge large 2012-35016, Badge small 2012-35027, Badge small alt 2012-35077,
  // Badge Dot 2012-35086). One component spans three shapes:
  //   - `dot` → a tiny status dot (no text) — the bare unread indicator.
  //   - `count` (a number) → a number badge; `max` clamps to "{max}+".
  //   - `label`/children → a status or descriptive label pill.
  // `tone` picks the color family (default/brand/figjam/component/danger/warning/
  // success/merged/archived/invert/selected). `strong` switches the subtle
  // tinted form (light bg + colored text) to the strong filled form. `size`
  // is small (16px, default) or large. `icon` adds a leading glyph (e.g. the
  // branch glyph on merged/archived). When `overlay` is set the badge positions
  // itself at the host corner so it can sit on a button/avatar/nav item; the
  // shared BadgeAnchor wrapper provides the positioning context.
  const BADGE_TONES = new Set([
    "default", "brand", "figjam", "component", "danger", "warning", "success",
    "merged", "archived", "invert", "selected", "feedback", "menu",
  ]);

  function formatBadgeCount(count, max) {
    const n = Number(count);
    if (!Number.isFinite(n)) return String(count);
    if (Number.isFinite(max) && n > max) return `${max}+`;
    return String(n);
  }

  function Badge({
    label,
    children,
    count,
    dot = false,
    tone = "default",
    strong = false,
    size = "small",
    icon,
    max,
    overlay = false,
    overlayPlacement = "top-end",
    className = "",
    component = "Badge",
    ...props
  }) {
    const resolvedTone = BADGE_TONES.has(propToken(tone)) ? propToken(tone) : "default";
    const resolvedSize = propToken(size);
    const hasCount = count != null && count !== false && count !== "";
    const content = hasCount ? formatBadgeCount(count, max) : (label != null ? label : children);
    const isDot = dot && !hasCount && (content == null || content === "");
    const shape = isDot ? "dot" : hasCount ? "count" : "label";
    const iconLead = !isDot && icon != null && icon !== false;
    const ariaLabel =
      props["aria-label"] ?? (isDot ? "indicator" : hasCount ? `${formatBadgeCount(count, max)} items` : undefined);
    return h(
      "span",
      {
        ...props,
        className: cx(
          "composa-badge",
          `composa-badge-${resolvedTone}`,
          `composa-badge-${resolvedSize}`,
          `composa-badge-${shape}`,
          strong && "composa-badge-strong",
          iconLead && "composa-badge-has-icon",
          overlay && "composa-badge-overlay",
          overlay && `composa-badge-overlay-${propToken(overlayPlacement)}`,
          className
        ),
        "data-composa-component": component,
        "data-tone": resolvedTone,
        "data-shape": shape,
        "data-strong": boolData(strong),
        "aria-label": ariaLabel,
        "aria-hidden": isDot && ariaLabel == null ? "true" : undefined,
        role: hasCount ? "status" : undefined,
      },
      isDot
        ? null
        : [
            iconLead ? h("span", { key: "icon", className: "composa-badge-icon" }, iconNode(h, Icon, icon)) : null,
            h("span", { key: "label", className: "composa-badge-label" }, content),
          ]
    );
  }

  // BadgeAnchor — positions a host control (IconButton, Avatar, nav item) and an
  // overlay Badge in the same corner-positioned box. Pass the host as children
  // and the indicator via `badge` (Badge props, a number, true for a dot, or a
  // ready Badge element). This is how the notification bell composes Badge onto
  // IconButton without either component knowing about the other.
  function BadgeAnchor({ children, badge, placement = "top-end", className = "", ...props }) {
    let badgeNode = null;
    if (badge != null && badge !== false) {
      if (React.isValidElement(badge)) {
        badgeNode = React.cloneElement(badge, {
          overlay: true,
          overlayPlacement: badge.props.overlayPlacement ?? placement,
        });
      } else if (badge === true) {
        badgeNode = h(Badge, { dot: true, tone: "danger", strong: true, overlay: true, overlayPlacement: placement });
      } else if (typeof badge === "number" || typeof badge === "string") {
        badgeNode = h(Badge, { count: badge, tone: "danger", strong: true, overlay: true, overlayPlacement: placement });
      } else if (typeof badge === "object") {
        const { overlayPlacement: bp, ...rest } = badge;
        badgeNode = h(Badge, { tone: "danger", strong: true, ...rest, overlay: true, overlayPlacement: bp ?? placement });
      }
    }
    return h(
      "span",
      {
        ...props,
        className: cx("composa-badge-anchor", className),
        "data-composa-component": "BadgeAnchor",
      },
      [h("span", { key: "host", className: "composa-badge-anchor-host" }, children), withKey(badgeNode, "badge")]
    );
  }

  // NotificationBell — the bell icon button with an unread indicator (Figma bell
  // glyph icon.24.notification.bell.badged.small). Reuses IconButton + Badge via
  // BadgeAnchor: when `count` > 0 it shows a count badge, otherwise `dot` shows
  // the bare unread dot. `count`/`dot` falsey → no indicator. Presentational and
  // controlled; the app owns the unread state and click handling.
  function NotificationBell({
    icon = "notification",
    label = "Notifications",
    count,
    dot,
    max = 99,
    badgeTone = "danger",
    size = "medium",
    placement = "top-end",
    className = "",
    onClick,
    ...props
  }) {
    const hasCount = count != null && count !== false && count !== "" && Number(count) > 0;
    const showDot = !hasCount && (dot === true || (dot == null && false));
    let badge = null;
    if (hasCount) badge = { count, max, tone: badgeTone, strong: true, size: "small" };
    else if (showDot) badge = { dot: true, tone: badgeTone, strong: true };
    return h(
      BadgeAnchor,
      {
        ...props,
        badge,
        placement,
        className: cx("composa-notification-bell", className),
        "data-composa-component": "NotificationBell",
      },
      h(IconButton, { icon, label, size, onClick, tooltipLabel: label })
    );
  }

  // Notification — the toast / list-row notification (Figma "Notifications"
  // 2028-109149, component set 2028-111255: Single/Multi × 1-or-2 buttons). A
  // dark HUD card: a leading icon (or avatar), a message that can span up to two
  // lines and truncate, and a trailing actions column separated by a hairline
  // with one or two stacked CTA buttons (the second is conventionally Dismiss).
  // `actions` is the data array; `onAction`/`onDismiss` are convenience shorts.
  // Presentational + controlled.
  function notificationCta(action, key, fallbackTone) {
    if (React.isValidElement(action)) return action;
    const { label: actionLabel, tone, onClick, ...rest } = action || {};
    return h(
      "button",
      {
        key,
        type: "button",
        className: cx("composa-notification-cta", tone && `composa-notification-cta-${propToken(tone)}`),
        "data-composa-component": "NotificationCTA",
        "data-part": "action",
        onClick,
        ...rest,
      },
      h("span", { className: "composa-notification-cta-label" }, actionLabel)
    );
  }

  function Notification({
    message,
    children,
    icon,
    avatar,
    actions,
    onAction,
    actionLabel = "Action",
    onDismiss,
    dismissLabel = "Dismiss",
    multiline = false,
    tone = "default",
    className = "",
    component = "Notification",
    ...props
  }) {
    const body = message != null ? message : children;
    let actionList =
      actions !== undefined
        ? Array.isArray(actions)
          ? actions
          : actions
            ? [actions]
            : []
        : [
            onAction !== undefined ? { label: actionLabel, onClick: onAction } : null,
            onDismiss !== undefined ? { label: dismissLabel, onClick: onDismiss } : null,
          ].filter(Boolean);
    const leading = avatar
      ? React.isValidElement(avatar)
        ? avatar
        : h(Avatar, { size: "small", ...avatar })
      : icon != null && icon !== false
        ? h("span", { className: "composa-notification-icon" }, iconNode(h, Icon, icon))
        : null;
    return h(
      "div",
      {
        ...props,
        className: cx(
          "composa-notification",
          `composa-notification-${propToken(tone)}`,
          multiline && "composa-notification-multiline",
          className
        ),
        "data-composa-component": component,
        "data-tone": propToken(tone),
        "data-scope": "notification",
        role: "status",
        "aria-live": "polite",
      },
      [
        h("div", { key: "content", className: "composa-notification-content", "data-part": "content" }, [
          leading ? h("span", { key: "lead", className: "composa-notification-lead", "data-part": "lead" }, leading) : null,
          body != null && body !== "" ? h("span", { key: "msg", className: "composa-notification-message", "data-part": "message" }, body) : null,
        ]),
        actionList.length
          ? h(
              "div",
              { key: "actions", className: "composa-notification-actions", "data-part": "actions" },
              actionList.map((action, index) => notificationCta(action, `cta${index}`, tone))
            )
          : null,
      ]
    );
  }

  // VisualBell — Figma's in-app toast / snackbar (Figma "Visual Bells" page
  // 2015-40421, Bell component set 2015-42989: Default / Message / Message w
  // Dismiss / Danger). A compact dark rounded pill: an optional leading icon
  // (or spinner), a strong message, an optional secondary `count` ("1/134"),
  // an optional rail of bordered action buttons, and an optional dismiss (X)
  // separated by a hairline. `tone="danger"` switches to the red surface.
  // Presentational + controlled; the app owns timing/auto-dismiss.
  function visualBellAction(action, key) {
    if (React.isValidElement(action)) return action;
    const { label: actionLabel, onClick, ...rest } = action || {};
    return h(
      "button",
      {
        key,
        type: "button",
        className: "composa-visual-bell-action",
        "data-composa-component": "VisualBellAction",
        onClick,
        ...rest,
      },
      actionLabel
    );
  }

  function VisualBell({
    message,
    children,
    icon,
    loading = false,
    count,
    actions,
    onDismiss,
    dismissLabel = "Dismiss",
    tone = "default",
    className = "",
    component = "VisualBell",
    ...props
  }) {
    const body = message != null ? message : children;
    const actionList = Array.isArray(actions) ? actions : actions ? [actions] : [];
    const showDismiss = onDismiss !== undefined;
    const hasLead = loading || (icon != null && icon !== false);
    return h(
      "div",
      {
        ...props,
        className: cx("composa-visual-bell", `composa-visual-bell-${propToken(tone)}`, className),
        "data-composa-component": component,
        "data-tone": propToken(tone),
        "data-scope": "visual-bell",
        role: "status",
        "aria-live": "polite",
      },
      [
        hasLead
          ? h(
              "span",
              { key: "lead", className: cx("composa-visual-bell-lead", loading && "is-loading"), "data-part": "lead" },
              loading ? h("span", { className: "composa-visual-bell-spinner", "aria-hidden": "true" }) : iconNode(h, Icon, icon)
            )
          : null,
        h("span", { key: "label", className: "composa-visual-bell-label", "data-part": "label" }, [
          body != null && body !== "" ? h("span", { key: "msg", className: "composa-visual-bell-message", "data-part": "message" }, body) : null,
          count != null && count !== "" && count !== false
            ? h("span", { key: "count", className: "composa-visual-bell-count", "data-part": "count" }, count)
            : null,
        ]),
        actionList.length || showDismiss
          ? h("div", { key: "rail", className: "composa-visual-bell-rail", "data-part": "rail" }, [
              ...actionList.map((action, index) => visualBellAction(action, `a${index}`)),
              showDismiss
                ? h(
                    IconButton,
                    {
                      key: "dismiss",
                      icon: "close",
                      label: dismissLabel,
                      size: "medium",
                      tooltip: false,
                      className: "composa-visual-bell-dismiss",
                      onClick: onDismiss,
                    }
                  )
                : null,
            ])
          : null,
      ]
    );
  }

  function InspectorHeader({
    collaborator,
    tabs = [
      { id: "design", label: "Design" },
      { id: "animate", label: "Animate" },
    ],
    showTabs = true,
    selectedTab = "design",
    zoom = "100%",
    playLabel = "Present",
    shareLabel = "Share",
    onPlay,
    onPlayMenu,
    onShare,
    onTabChange,
    onZoomClick,
    onZoomChange,
    className = "",
    ...props
  }) {
    const collaboratorProps = typeof collaborator === "string" ? { initials: collaborator } : collaborator || {};
    const [internalZoomMenuOpen, setInternalZoomMenuOpen] = React.useState(false);
    const [internalZoom, setInternalZoom] = React.useState(zoom);
    const sectionRef = React.useRef(null);
    const zoomAnchorRef = React.useRef(null);
    const zoomOverlayId = React.useId();
    React.useEffect(() => setInternalZoom(zoom), [zoom]);
    React.useEffect(() => {
      if (!internalZoomMenuOpen) return undefined;
      const handlePointerDown = (event) => {
        if (sectionRef.current?.contains(event.target)) return;
        if (event.target?.closest?.(`[data-composa-overlay-owner="${zoomOverlayId}"]`)) return;
        setInternalZoomMenuOpen(false);
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [internalZoomMenuOpen, zoomOverlayId]);

    const handleZoomClick = (event) => {
      const nextOpen = !internalZoomMenuOpen;
      setInternalZoomMenuOpen(nextOpen);
      onZoomClick?.(event);
    };
    const handleZoomChange = (nextZoom, event) => {
      setInternalZoom(nextZoom);
      onZoomChange?.(nextZoom, event);
    };
    const handleZoomSelect = (nextZoom, event) => {
      handleZoomChange(nextZoom, event);
      setInternalZoomMenuOpen(false);
    };

    // The Design/Animate tabs are opt-out: pass showTabs={false} or tabs={null}
    // for inspector states that have no mode toggle, so the row doesn't leak a
    // dead control. The zoom dropdown stays — it lives in the same row.
    const tabsHidden = showTabs === false || tabs == null || (Array.isArray(tabs) && tabs.length === 0);

    return h(
      "section",
      {
        ...props,
        ref: sectionRef,
        className: cx("composa-inspector-header", tabsHidden && "composa-inspector-header-no-tabs", className),
        "data-composa-component": "InspectorHeader",
        "data-zoom-menu-open": boolData(internalZoomMenuOpen),
        "data-tabs-hidden": boolData(tabsHidden),
        "aria-label": props["aria-label"] || "Inspector header",
      },
      [
        h(ListCell, {
          key: "actions-row",
          componentName: "InspectorHeaderRow",
          level: 1,
          hierarchy: "property",
          className: "composa-inspector-header-row",
          content: h(MultiplayerControl, { key: "multiplayer", ...collaboratorProps }),
          trailing: [
            h(SplitButton, {
              key: "play",
              label: playLabel,
              icon: "play",
              size: "large",
              variant: "ghost",
              actionTooltipLabel: playLabel,
              menuLabel: `${playLabel} options`,
              menuTooltipLabel: `${playLabel} options`,
              className: "composa-inspector-play-split",
              onClick: onPlay,
              onMenuClick: onPlayMenu,
            }),
            h(Button, {
              key: "share",
              label: shareLabel,
              size: "large",
              variant: "primary",
              onClick: onShare,
            }),
          ],
        }),
        h(ListCell, {
          key: "mode-row",
          componentName: "InspectorHeaderRow",
          level: 3,
          hierarchy: "property",
          className: "composa-inspector-header-row",
          content: tabsHidden
            ? null
            : h(Tabs, {
                key: "tabs",
                label: "Inspector mode",
                tabs,
                value: selectedTab,
                variant: "pill",
                size: "compact",
                divider: false,
                onValueChange: onTabChange,
              }),
          trailing: h(
            "div",
            { className: "composa-inspector-zoom-anchor", ref: zoomAnchorRef },
            [
              h(Dropdown, {
                key: "trigger",
                label: "Canvas zoom",
                value: internalZoom,
                size: "medium",
                stroke: false,
                className: "composa-inspector-zoom",
                onClick: handleZoomClick,
              }),
              internalZoomMenuOpen
                  ? h(
                    OverlayPortal,
                    { key: "zoom-menu-layer", anchorRef: zoomAnchorRef, placement: "bottom-right", align: "end", className: "composa-zoom-menu-layer", "data-composa-overlay-owner": zoomOverlayId },
                    h(ZoomMenu, { value: internalZoom, onValueChange: handleZoomChange, onSelect: handleZoomSelect })
                  )
                : null,
            ]
          ),
        }),
      ]
    );
  }

  function ZoomMenu({ value = "100%", onValueChange, onSelect }) {
    const zoomRows = [
      { label: "Zoom in", shortcut: "⌘+" },
      { label: "Zoom out", shortcut: "⌘-" },
      { label: "Zoom to fit", shortcut: "⇧1" },
      { label: "Zoom to 50%" },
      { label: "Zoom to 100%", shortcut: "⌘0" },
      { label: "Zoom to 200%" },
      { type: "divider" },
      { label: "Pixel preview", submenu: true },
      { label: "Pixel grid", selected: true, shortcut: "⇧'" },
      { label: "Snap to pixel grid", selected: true, shortcut: "⇧⌘'" },
      { label: "Layout guides", selected: true, shortcut: "⇧G" },
      { label: "Rulers", shortcut: "⇧R" },
      { label: "Outlines", submenu: true },
      { label: "Multiplayer cursors", selected: true, shortcut: "⌥⌘\\" },
      { label: "Additional labels", selected: true },
      { type: "divider" },
      { label: "Comments", selected: true, shortcut: "⇧C" },
      { label: "Annotations", selected: true, shortcut: "⇧Y" },
    ];

    return h(
      "div",
      { className: "composa-zoom-menu", "data-composa-component": "ZoomMenu", role: "menu", "aria-label": "Canvas zoom options" },
      [
        h("label", { key: "input", className: "composa-zoom-menu-input" }, [
          h("span", { key: "label", className: "visually-hidden" }, "Zoom value"),
          h("input", {
            key: "control",
            value: String(value).replace("%", ""),
            "aria-label": "Zoom value",
            onChange: (event) => onValueChange?.(`${event.currentTarget.value}%`, event),
          }),
        ]),
        h(
          "div",
          { key: "rows", className: "composa-zoom-menu-rows" },
          zoomRows.map((row, index) =>
            row.type === "divider"
              ? h(MenuDivider, { key: `divider-${index}` })
              : h(MenuRow, {
                  key: row.label,
                  type: row.selected ? "checkmark" : "simple",
                  label: row.label,
                  selected: row.selected,
                  checkVariant: "check",
                  shortcut: row.shortcut,
                  trail: row.submenu ? "false" : row.shortcut ? "shortcut" : "false",
                  submenu: row.submenu,
                  onClick: (event) => {
                    const match = row.label.match(/Zoom to (\d+%)/);
                    if (match) onSelect?.(match[1], event);
                  },
                })
          )
        ),
      ]
    );
  }

  function LayerHeader({
    title = "Frame",
    actions = [
      { id: "more", icon: "more", label: "More layer actions" },
    ],
    onTitleClick,
    onAction,
    className = "",
    ...props
  }) {
    return h(
      "section",
      {
        ...props,
        className: cx("composa-layer-header", className),
        "data-composa-component": "LayerHeader",
        "aria-label": props["aria-label"] || "Layer header",
      },
      [
        h(Dropdown, {
          key: "dropdown",
          label: `Layer type: ${title}`,
          value: title,
          stroke: false,
          className: "composa-layer-header-dropdown",
          onClick: onTitleClick,
        }),
        h(
          "div",
          {
            key: "actions",
            className: "composa-layer-header-actions",
            "data-composa-component": "LayerHeaderActions",
            role: "group",
            "aria-label": "Layer actions",
          },
          actions.map((action) =>
            h(IconButton, {
              key: action.id || action.label || action.icon,
              icon: action.icon,
              label: action.label,
              size: "medium",
              variant: "ghost",
              className: "composa-layer-header-action",
              onClick: action.onClick || ((event) => onAction?.(action, event)),
            })
          )
        ),
      ]
    );
  }

  function PositionSection({
    title = "Position",
    alignment = { horizontal: "left", vertical: "top" },
    position = { x: "128", y: "446" },
    rotation = "0°",
    onAlignmentChange,
    onPositionChange,
    onRotationChange,
    onConstraintsClick,
    onMoreClick,
    onRotateClick,
    onFlipHorizontalClick,
    onFlipVerticalClick,
    className = "",
    ...props
  }) {
    const positionX = position?.x ?? "128";
    const positionY = position?.y ?? "446";
    const alignmentHorizontal = [
      { id: "left", icon: "alignLeft", label: "Align left" },
      { id: "center", icon: "alignHorizontalCenter", label: "Align horizontal centers" },
      { id: "right", icon: "alignRight", label: "Align right" },
    ];
    const alignmentVertical = [
      { id: "top", icon: "alignTop", label: "Align top" },
      { id: "middle", icon: "alignVerticalCenter", label: "Align vertical centers" },
      { id: "bottom", icon: "alignBottom", label: "Align bottom" },
    ];
    const iconGroup = (items, groupLabel, onAction) =>
      h(ControlGroup, {
        label: groupLabel,
        items,
        tooltipPlacement: "top-left",
        className: "composa-position-control-group",
        onAction: (item, index, event) => onAction?.(item.id ?? item.value ?? String(index), item, event),
      });
    const miniInput = (axis, value, onChange) =>
      h(NumericInput, {
        key: axis,
        label: `${axis.toUpperCase()} position`,
        value,
        iconLead: axis,
        className: "composa-position-mini-input",
        onChange: (event) => onChange?.(axis, event.currentTarget?.value, event),
      });
    const fieldSet = (label, children) =>
      h(
        "div",
        {
          key: label,
          className: "composa-position-fieldset",
          "data-composa-component": "PositionFieldSet",
        },
        [
          h("div", { key: "label", className: "composa-position-fieldset-label" }, label),
          h("div", { key: "controls", className: "composa-position-fieldset-controls" }, children),
        ]
      );

    return h(
      "section",
      {
        ...props,
        className: cx("composa-position-section", className),
        "data-composa-component": "PositionSection",
        "aria-label": props["aria-label"] || title,
      },
      [
        h("header", { key: "header", className: "composa-position-section-header" }, h("h3", { className: "composa-position-section-title" }, title)),
        fieldSet("Alignment", [
          iconGroup(alignmentHorizontal, "Horizontal alignment", (value, item, event) => onAlignmentChange?.("horizontal", value, item, event)),
          iconGroup(alignmentVertical, "Vertical alignment", (value, item, event) => onAlignmentChange?.("vertical", value, item, event)),
          h(IconButton, { key: "more", icon: "more", label: "More alignment actions", size: "medium", variant: "ghost", tooltipPlacement: "top-right", className: "composa-position-more", onClick: onMoreClick }),
        ]),
        fieldSet("Position", [
          miniInput("x", positionX, onPositionChange),
          miniInput("y", positionY, onPositionChange),
          h(IconButton, { key: "constraints", icon: "constraints", label: "Constraints", size: "medium", variant: "ghost", tooltipPlacement: "top-right", className: "composa-position-constraints", onClick: onConstraintsClick }),
        ]),
        fieldSet("Rotation", [
          h(NumericInput, {
            key: "rotation",
            label: "Rotation",
            value: rotation,
            iconLead: "rotation",
            className: "composa-position-mini-input",
            onChange: (event) => onRotationChange?.(event.currentTarget?.value, event),
          }),
          h(ControlGroup, {
            key: "actions",
            label: "Rotation actions",
            items: [
              { id: "rotate", icon: "rotate90", label: "Rotate 90 degrees right", onClick: onRotateClick },
              { id: "flip-horizontal", icon: "flipHorizontal", label: "Flip horizontal", onClick: onFlipHorizontalClick },
              { id: "flip-vertical", icon: "flipVertical", label: "Flip vertical", onClick: onFlipVerticalClick },
            ],
            className: "composa-position-control-group",
          }),
        ]),
      ]
    );
  }

  function PaintSection({
    title = "Fill",
    componentName = "PaintSection",
    items,
    defaultItems = [{ id: "paint-1", type: title, value: "FFFFFF", opacityValue: "100", visible: true }],
    showStylesAction = true,
    showAddAction = true,
    showAddActionWhenExpanded = true,
    hideWhenEmpty = false,
    renderCollapsedActions,
    renderItem,
    renderFooter,
    expanded,
    defaultExpanded,
    onExpandedChange,
    onAdd,
    onRemove,
    onVisibilityToggle,
    onValueChange,
    onOpacityChange,
    className = "",
    ...props
  }) {
    const hasControlledItems = items !== undefined;
    const [internalItems, setInternalItems] = React.useState(defaultItems);
    const resolvedItems = hasControlledItems ? items : internalItems;
    const hasItems = resolvedItems.length > 0;
    const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded ?? hasItems);
    const resolvedExpanded = expanded ?? (hasItems ? internalExpanded : false);
    const paintKind = propToken(title);
    const handleExpandedChange = (nextExpanded, event) => {
      if (expanded === undefined) setInternalExpanded(nextExpanded);
      onExpandedChange?.(nextExpanded, event);
    };
    const handleToggle = (event) => handleExpandedChange(!resolvedExpanded, event);
    const handleAdd = (event) => {
      if (!resolvedExpanded && hasItems) {
        handleExpandedChange(true, event);
        return;
      }
      if (!hasControlledItems) {
        setInternalItems((currentItems) => [
          ...currentItems,
          {
            ...(defaultItems[0] ?? { type: title, value: "FFFFFF", opacityValue: "100", visible: true }),
            id: `${paintKind}-${currentItems.length + 1}`,
          },
        ]);
      }
      handleExpandedChange(true, event);
      onAdd?.(event);
    };
    const handleRemove = (item, index, event) => {
      if (!hasControlledItems) {
        setInternalItems((currentItems) => currentItems.filter((_, itemIndex) => itemIndex !== index));
        if (resolvedItems.length <= 1) handleExpandedChange(false, event);
      }
      onRemove?.(item, index, event);
    };
    const handleVisibilityToggle = (item, index, event) => {
      const nextVisible = item.visible === false;
      if (!hasControlledItems) {
        setInternalItems((currentItems) =>
          currentItems.map((currentItem, itemIndex) => (itemIndex === index ? { ...currentItem, visible: nextVisible } : currentItem))
        );
      }
      onVisibilityToggle?.({ ...item, visible: nextVisible }, index, event);
    };

    if (hideWhenEmpty && !hasItems) return null;

    const collapsedActions =
      !resolvedExpanded && hasItems && renderCollapsedActions
        ? renderCollapsedActions({
            items: resolvedItems,
            onExpand: (event) => handleExpandedChange(true, event),
          })
        : null;

    return h(
      "section",
      {
        ...props,
        className: cx("composa-paint-section", `composa-paint-section-${paintKind}`, !hasItems && "is-empty", !resolvedExpanded && "is-collapsed", className),
        "data-composa-component": componentName,
        "data-section": paintKind,
        "data-empty": boolData(!hasItems),
        "aria-label": props["aria-label"] || title,
      },
      [
        h(Header, {
          key: "header",
          title,
          hierarchy: "property",
          expanded: resolvedExpanded,
          leading: "none",
          onToggle: handleToggle,
          className: "composa-paint-header",
          actions: [
            collapsedActions,
            showStylesAction ? h(IconButton, { key: "styles", icon: "styles", label: "Apply styles and variables", tooltipPlacement: "top-right", className: "composa-header-icon-action composa-styles-action" }) : null,
            showAddAction && (!resolvedExpanded || showAddActionWhenExpanded) ? h(IconButton, { key: "add", icon: "plusSmall", label: `Add ${title.toLowerCase()}`, tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: handleAdd }) : null,
          ],
        }),
        resolvedExpanded
          ? h(
              "div",
              { key: "rows", className: "composa-paint-rows", "data-composa-component": "PaintSectionRows" },
              resolvedItems.map((item, index) => {
                const key = item.id ?? `${paintKind}-${index}`;
                const itemType = item.type ?? title;
                if (renderItem) {
                  return renderItem({
                    item,
                    index,
                    key,
                    itemType,
                    onRemove: handleRemove,
                    onVisibilityToggle: handleVisibilityToggle,
                    onValueChange,
                    onOpacityChange,
                  });
                }
                return h(
                  "div",
                  { key, className: "composa-paint-row", "data-composa-component": "PaintSectionRow", "data-visible": boolData(item.visible !== false) },
                  [
                    h(ColorInput, {
                      key: "input",
                      type: itemType,
                      value: item.value,
                      opacityValue: item.opacityValue,
                      disabled: item.disabled,
                      // Hidden paint: read only the VALUE TEXT (hex + percent) as
                      // disabled, NOT the whole split/input — the input chrome
                      // stays active-looking (founder field-section spec; AGENTS
                      // "disable the affected value segment, not unrelated row
                      // controls"). The eye toggle stays interactive to re-show.
                      valueDisabled: item.visible === false,
                      opacityValueDisabled: item.visible === false,
                      onChange: (event) => onValueChange?.(item, index, event.currentTarget?.value, event),
                      onOpacityChange: (event) => onOpacityChange?.(item, index, event.currentTarget?.value, event),
                    }),
                    h(
                      HeaderActions,
                      { key: "actions", className: "composa-paint-row-actions", label: `${itemType} actions` },
                      [
                        h(IconButton, { key: "visible", icon: item.visible === false ? "eyeSlash" : "eyeSmall", label: item.visible === false ? `Show ${itemType}` : `Hide ${itemType}`, tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: (event) => handleVisibilityToggle(item, index, event) }),
                        h(IconButton, { key: "remove", icon: "minus", label: `Remove ${itemType}`, tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: (event) => handleRemove(item, index, event) }),
                      ]
                    ),
                  ]
                );
              })
            )
          : null,
        resolvedExpanded && renderFooter ? renderFooter({ items: resolvedItems }) : null,
      ]
    );
  }

  function SectionValueButton({ label, value, icon, chevron = false, width, className = "", ...props }) {
    return h(
      "button",
      {
        ...props,
        type: props.type || "button",
        className: cx("composa-section-value-button", icon ? "has-icon" : "no-icon", className),
        style: width ? { "--composa-section-value-width": width } : props.style,
        "data-composa-component": "SectionValueButton",
        "aria-label": label,
      },
      [
        icon ? h("span", { key: "icon", className: "composa-section-value-icon", "aria-hidden": "true" }, iconNode(h, Icon, icon)) : null,
        h("span", { key: "value", className: "composa-section-value-text" }, value),
        chevron ? h("span", { key: "chevron", className: "composa-section-value-chevron", "aria-hidden": "true" }, iconNode(h, Icon, "chevronDown")) : null,
      ]
    );
  }

  const renderSelectionColorRow = ({ item, index, itemType }) => {
    const selectionCount = Number(item.selectionCount);
    const targetLabel = Number.isFinite(selectionCount) && selectionCount > 0 ? `Select ${selectionCount === 1 ? "item" : selectionCount} using this color` : "Select items using this color";
    return h(
      "div",
      {
        key: item.id ?? `selection-color-${index}`,
        className: "composa-selection-color-row",
        "data-composa-component": "SelectionColorRow",
      },
      [
        h("button", { key: "color", type: "button", className: "composa-selection-color-button", "aria-label": item.label ?? itemType }, [
          h("span", { key: "swatch-frame", className: "composa-selection-color-swatch-frame" }, h("span", { className: "composa-selection-color-swatch", style: { background: item.value ?? "#000000" } })),
          h("span", { key: "label", className: "composa-selection-color-label" }, item.label ?? itemType),
        ]),
        h(HeaderActions, { key: "actions", className: "composa-section-row-actions composa-selection-color-row-actions", label: `${item.label ?? itemType} actions` }, [
          h(IconButton, { key: "styles", icon: "styles", label: "Apply styles and variables", tooltipPlacement: "top-right", className: "composa-header-icon-action composa-styles-action" }),
          h(IconButton, { key: "target", icon: "target", label: targetLabel, tooltipPlacement: "top-right", className: "composa-header-icon-action" }),
        ]),
      ]
    );
  };

  function SelectionColorSummary({ items = [], onClick }) {
    const visibleItems = items.slice(0, 3);
    const overflowCount = Math.max(items.length - visibleItems.length, 0);
    const handleClick = (event) => {
      event.stopPropagation();
      onClick?.(event);
    };
    return h(
      "button",
      {
        type: "button",
        className: "composa-selection-color-summary",
        "data-composa-component": "SelectionColorSummary",
        "aria-label": `${items.length} selection ${items.length === 1 ? "color" : "colors"}`,
        onClick: handleClick,
      },
      [
        ...visibleItems.map((item, index) =>
          h("span", {
            key: item.id ?? `summary-color-${index}`,
            className: "composa-selection-color-summary-swatch",
            style: { background: item.value ?? "#000000" },
            "aria-hidden": "true",
          })
        ),
        overflowCount > 0 ? h("span", { key: "overflow", className: "composa-selection-color-summary-overflow" }, `+${overflowCount}`) : null,
      ]
    );
  }

  const renderLayoutGuideRow = ({ item, index, onRemove, onVisibilityToggle }) => {
    const isVisible = item.visible !== false;
    const guideLabel = item.label ?? "Layout guide";
    const guideIcon = item.icon ?? "layoutGuideRows";
    return h(
      "div",
      {
        key: item.id ?? `layout-guide-${index}`,
        className: "composa-layout-guide-row",
        "data-composa-component": "LayoutGuideRow",
        "data-visible": boolData(isVisible),
      },
      [
        h("div", { key: "control", className: "composa-layout-guide-control" }, [
          h("span", { key: "glyph", className: "composa-layout-guide-glyph", "aria-hidden": "true" }, iconNode(h, Icon, guideIcon)),
          h(SectionValueButton, { key: "value", label: guideLabel, value: item.value ?? "1 row", chevron: true, width: "100%", className: "composa-layout-guide-value", disabled: item.disabled || !isVisible }),
        ]),
        h(HeaderActions, { key: "actions", className: "composa-section-row-actions composa-layout-guide-row-actions", label: `${guideLabel} actions` }, [
          h(IconButton, { key: "visible", icon: isVisible ? "eyeSmall" : "eyeSlash", label: isVisible ? "Hide" : "Show", tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: (event) => onVisibilityToggle?.(item, index, event) }),
          h(IconButton, { key: "remove", icon: "minus", label: "Remove", tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: (event) => onRemove?.(item, index, event) }),
        ]),
      ]
    );
  };

  function EffectValueButton({ label = "Effect", value = "Drop shadow", onClick }) {
    return h(
      "button",
      {
        type: "button",
        className: "composa-effect-value-button",
        "data-composa-component": "EffectValueButton",
        "aria-label": label,
        onClick,
      },
      [
        h("span", { key: "value", className: "composa-effect-value-text" }, value),
        h("span", { key: "chevron", className: "composa-effect-value-chevron", "aria-hidden": "true" }, iconNode(h, Icon, "chevronDown")),
      ]
    );
  }

  function EffectsSection({
    effectDialogOpenId,
    defaultEffectDialogOpenId,
    onEffectTypeToggle,
    onEffectValueClick,
    ...props
  }) {
    const [internalOpenEffectId, setInternalOpenEffectId] = React.useState(defaultEffectDialogOpenId);
    const resolvedOpenEffectId = effectDialogOpenId !== undefined ? effectDialogOpenId : internalOpenEffectId;
    const renderEffectRow = ({ item, index, onRemove, onVisibilityToggle }) => {
      const effectLabel = item.label ?? item.type ?? "Drop shadow";
      const isVisible = item.visible !== false;
      const isDialogOpen = item.dialogOpen === true || resolvedOpenEffectId === item.id;
      const handleEffectTypeToggle = (event) => {
        const nextOpenId = isDialogOpen ? undefined : item.id;
        if (effectDialogOpenId === undefined) setInternalOpenEffectId(nextOpenId);
        onEffectTypeToggle?.(item, index, !isDialogOpen, event);
      };
      return h(
        "div",
        {
          key: item.id ?? `effect-${index}`,
          className: "composa-effects-row",
          "data-composa-component": "EffectsRow",
          "data-dialog-open": boolData(isDialogOpen),
          "data-visible": boolData(isVisible),
        },
        [
          h("div", { key: "control", className: "composa-effect-control" }, [
            h(IconButton, {
              key: "type",
              icon: item.icon ?? "effectShadow",
              label: `${effectLabel} settings`,
              // Dialog-opener: active only while the effect's settings dialog is
              // open; clears when `resolvedOpenEffectId` no longer matches.
              dialogOpen: isDialogOpen,
              size: "medium",
              variant: "standard",
              tooltipPlacement: "top-left",
              className: "composa-effect-type-action",
              onClick: handleEffectTypeToggle,
            }),
            h(EffectValueButton, {
              key: "value",
              label: `${effectLabel} type`,
              value: effectLabel,
              onClick: (event) => onEffectValueClick?.(item, index, event),
            }),
          ]),
          h(HeaderActions, { key: "actions", className: "composa-section-row-actions composa-effect-row-actions", label: `${effectLabel} actions` }, [
            h(IconButton, {
              key: "visible",
              icon: isVisible ? "eyeSmall" : "eyeSlash",
              label: isVisible ? `Hide ${effectLabel}` : `Show ${effectLabel}`,
              tooltipPlacement: "top-right",
              className: "composa-header-icon-action",
              onClick: (event) => onVisibilityToggle?.(item, index, event),
            }),
            h(IconButton, {
              key: "remove",
              icon: "minus",
              label: `Remove ${effectLabel}`,
              tooltipPlacement: "top-right",
              className: "composa-header-icon-action",
              onClick: (event) => onRemove?.(item, index, event),
            }),
          ]),
        ]
      );
    };

    return h(PaintSection, {
      title: "Effects",
      componentName: "EffectsSection",
      defaultItems: [{ id: "drop-shadow", type: "Effect", label: "Drop shadow", icon: "effectShadow", visible: true }],
      renderItem: renderEffectRow,
      ...props,
    });
  }

  const exportColorProfileOptions = ["sRGB (same)", "Display P3", "Adobe RGB"];
  const exportResamplingOptions = ["Detailed", "Smooth", "Pixelated"];

  function ExportSettingsDialog({
    suffix = "None",
    colorProfile = exportColorProfileOptions[0],
    resampling = exportResamplingOptions[0],
    ignoreOverlap = true,
    onSuffixChange,
    onColorProfileChange,
    onResamplingChange,
    onIgnoreOverlapChange,
    onClose,
  }) {
    const [internalColorProfile, setInternalColorProfile] = React.useState(colorProfile);
    const [internalResampling, setInternalResampling] = React.useState(resampling);
    const [internalIgnoreOverlap, setInternalIgnoreOverlap] = React.useState(Boolean(ignoreOverlap));
    React.useEffect(() => setInternalColorProfile(colorProfile), [colorProfile]);
    React.useEffect(() => setInternalResampling(resampling), [resampling]);
    React.useEffect(() => setInternalIgnoreOverlap(Boolean(ignoreOverlap)), [ignoreOverlap]);

    // Suffix is a read-only display (disabled field); the two profile fields are
    // real dropdowns whose menus open and update the row on selection.
    const displayRow = (label, value) =>
      h("div", { key: label, className: "composa-export-settings-row" }, [
        h("span", { key: "label", className: "composa-export-settings-label" }, label),
        h(InputField, {
          key: "value",
          label,
          value,
          width: "fill",
          disabled: true,
          className: "composa-export-settings-field",
        }),
      ]);
    const selectRow = (label, value, options, onSelect) =>
      h("div", { key: label, className: "composa-export-settings-row" }, [
        h("span", { key: "label", className: "composa-export-settings-label" }, label),
        h(Dropdown, {
          key: "value",
          label,
          value,
          options,
          width: "fill",
          className: "composa-export-settings-field",
          menuClassName: "composa-export-settings-menu",
          onValueChange: (next, _option, event) => onSelect?.(next, event),
        }),
      ]);

    return h(
      "div",
      {
        className: "composa-export-settings-dialog",
        "data-composa-component": "ExportSettingsDialog",
        role: "dialog",
        "aria-label": "Export settings",
        onPointerDown: (event) => event.stopPropagation(),
      },
      [
        h("div", { key: "header", className: "composa-export-settings-header" }, [
          h("h4", { key: "title", className: "composa-export-settings-title" }, "Export"),
          h(IconButton, {
            key: "close",
            icon: "close",
            label: "Close export settings",
            tooltip: false,
            variant: "ghost",
            className: "composa-export-settings-close",
            onClick: onClose,
          }),
        ]),
        h("div", { key: "fields", className: "composa-export-settings-section" }, [
          displayRow("Suffix", suffix),
          selectRow("Color profile", internalColorProfile, exportColorProfileOptions, (next, event) => {
            setInternalColorProfile(next);
            onColorProfileChange?.(next, event);
          }),
          selectRow("Image resampling", internalResampling, exportResamplingOptions, (next, event) => {
            setInternalResampling(next);
            onResamplingChange?.(next, event);
          }),
        ]),
        h("div", { key: "options", className: "composa-export-settings-section composa-export-settings-options" }, [
          h("span", { key: "headline", className: "composa-export-settings-headline" }, "In addition"),
          h(Checkbox, {
            key: "ignore-overlap",
            labelText: "Ignore overlapping layers",
            checked: internalIgnoreOverlap ? "checked" : "unchecked",
            className: "composa-export-settings-checkbox",
            onCheckedChange: (next, event) => {
              const isChecked = next === "checked";
              setInternalIgnoreOverlap(isChecked);
              onIgnoreOverlapChange?.(isChecked, event);
            },
          }),
        ]),
      ]
    );
  }

  function ExportRow({ item, index, onRemove }) {
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [format, setFormat] = React.useState(item.format ?? "PNG");
    const rowRef = React.useRef(null);
    const settingsOverlayId = React.useId();

    React.useEffect(() => {
      if (!settingsOpen) return undefined;
      const handlePointerDown = (event) => {
        if (rowRef.current?.contains(event.target)) return;
        if (event.target?.closest?.(`[data-composa-overlay-owner="${settingsOverlayId}"]`)) return;
        // The settings dialog's own dropdowns portal their menus to the host as
        // sibling overlay layers; clicking an option there must not close the
        // dialog. Treat any portaled overlay layer as "inside" for this check.
        if (event.target?.closest?.(".composa-overlay-layer-portal")) return;
        setSettingsOpen(false);
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [settingsOpen, settingsOverlayId]);

    return h(
      "div",
      {
        key: item.id ?? `export-${index}`,
        ref: rowRef,
        className: "composa-export-row-wrap",
        "data-composa-component": "ExportRow",
        "data-dialog-open": boolData(settingsOpen),
      },
      [
        h(
          "div",
          {
            key: "row",
            className: "composa-export-row",
          },
          [
            h(ComboInput, { key: "scale", label: "Export scale", value: item.scale ?? "1x", className: "composa-export-scale" }),
            h(Dropdown, {
              key: "format",
              label: "Export format",
              value: format,
              options: ["PNG", "SVG", "JPEG", "PDF"],
              className: "composa-export-format",
              menuClassName: "composa-export-format-menu",
              onValueChange: (nextFormat) => setFormat(nextFormat),
            }),
            h(HeaderActions, { key: "actions", className: "composa-section-row-actions", label: "Export actions" }, [
              h(IconButton, {
                key: "settings",
                icon: "more",
                label: "Export settings",
                // Dialog-opener: active only while the export-settings dialog is
                // open. The outside-click handler above clears `settingsOpen`,
                // which untoggles this button automatically.
                dialogOpen: settingsOpen,
                tooltipPlacement: "top-right",
                className: "composa-header-icon-action composa-export-settings-action",
                onClick: () => setSettingsOpen((open) => !open),
              }),
              h(IconButton, { key: "remove", icon: "minus", label: "Remove", tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: (event) => onRemove?.(item, index, event) }),
            ]),
          ]
        ),
        settingsOpen
          ? h(
              OverlayPortal,
              { key: "dialog-layer", anchorRef: rowRef, placement: "left-of-inspector", align: "end", followAnchor: false, className: "composa-export-settings-layer", "data-composa-overlay-owner": settingsOverlayId },
              h(ExportSettingsDialog, { onClose: () => setSettingsOpen(false) })
            )
          : null,
      ]
    );
  }

  const renderExportRow = (props) => h(ExportRow, props);

  function FillSection(props) {
    return h(PaintSection, {
      title: "Fill",
      componentName: "FillSection",
      defaultItems: [{ id: "fill-1", type: "Fill", value: "FFFFFF", opacityValue: "100", visible: true }],
      ...props,
    });
  }

  function StrokeSection(props) {
    const { showControls = true, strokeControlsProps, renderFooter, ...sectionProps } = props;
    return h(PaintSection, {
      title: "Stroke",
      componentName: "StrokeSection",
      defaultItems: [{ id: "stroke-1", type: "Stroke", value: "000000", opacityValue: "100", visible: true }],
      renderFooter: (footerProps) => [
        renderFooter?.(footerProps),
        showControls ? h(StrokeControlsSection, { key: "stroke-controls", ...strokeControlsProps }) : null,
      ],
      ...sectionProps,
    });
  }

  function StrokeSettingsDialog({ strokeStyle = "solid", onStrokeStyleChange, onClose }) {
    const [internalStrokeStyle, setInternalStrokeStyle] = React.useState(propToken(strokeStyle));
    const resolvedStrokeStyle = internalStrokeStyle;
    const isDashed = resolvedStrokeStyle === "dashed";
    React.useEffect(() => setInternalStrokeStyle(propToken(strokeStyle)), [strokeStyle]);
    const settingRow = (label, control) =>
      h("div", { key: label, className: "composa-stroke-settings-row" }, [
        h("span", { key: "label", className: "composa-stroke-settings-label" }, label),
        control,
      ]);
    const handleStyleSelect = (nextStyle, event) => {
      setInternalStrokeStyle(nextStyle);
      onStrokeStyleChange?.(nextStyle, event);
    };

    return h(
      "div",
      {
        className: "composa-stroke-settings-dialog",
        "data-composa-component": "StrokeSettingsDialog",
        role: "dialog",
        "aria-label": "Stroke settings",
        onPointerDown: (event) => event.stopPropagation(),
      },
      [
        h("div", { key: "header", className: "composa-stroke-settings-header" }, [
          h("h4", { key: "title", className: "composa-stroke-settings-title" }, "Stroke settings"),
          h(IconButton, {
            key: "close",
            icon: "close",
            label: "Close stroke settings",
            tooltip: false,
            variant: "ghost",
            className: "composa-stroke-settings-close",
            onClick: onClose,
          }),
        ]),
        settingRow(
          "Style",
          h(Dropdown, {
            key: "style",
            label: "Stroke style",
            value: isDashed ? "Dashed" : "Solid",
            icon: "minus",
            iconLead: true,
            width: "fill",
            options: [
              { label: "Solid", value: "solid" },
              { label: "Dashed", value: "dashed" },
            ],
            menuClassName: "composa-stroke-style-menu",
            className: "composa-stroke-settings-field",
            onValueChange: (nextStyle, _option, event) => handleStyleSelect(nextStyle, event),
          })
        ),
        isDashed
          ? [
              settingRow(
                "Dash",
                h(InputField, {
                  key: "dash",
                  label: "Dash",
                  value: "2",
                  variant: "numeric",
                  width: "fill",
                  className: "composa-stroke-settings-field",
                })
              ),
              settingRow(
                "Gap",
                h(InputField, {
                  key: "gap",
                  label: "Gap",
                  value: "2",
                  variant: "numeric",
                  width: "fill",
                  className: "composa-stroke-settings-field",
                })
              ),
            ]
          : null,
      ]
    );
  }

  const strokeAlignOptions = [
    { value: "all", label: "All", icon: "strokeAlignAll" },
    { value: "top", label: "Top", icon: "strokeAlignTop" },
    { value: "bottom", label: "Bottom", icon: "strokeAlignBottom" },
    { value: "left", label: "Left", icon: "strokeAlignLeft" },
    { value: "right", label: "Right", icon: "strokeAlignRight" },
  ];

  function StrokeAlignMenu({ selected = "all", onSelect }) {
    return h(
      "div",
      { className: "composa-stroke-align-menu", "data-composa-component": "StrokeAlignMenu", role: "menu", "aria-label": "Stroke alignment" },
      strokeAlignOptions.map((option) =>
        h(MenuRow, {
          key: option.value,
          type: "toolbar",
          lead: option.icon,
          label: option.label,
          selected: option.value === selected,
          checkVariant: "check",
          onClick: (event) => onSelect?.(option.value, event),
        })
      )
    );
  }

  function StrokeControlsSection({
    position = "Center",
    weight = "1",
    align = "all",
    settingsOpen,
    onPositionChange,
    onWeightChange,
    onAlignChange,
    onSettingsOpenChange,
    className = "",
    ...props
  }) {
    const [internalSettingsOpen, setInternalSettingsOpen] = React.useState(Boolean(settingsOpen));
    const [internalAlignMenuOpen, setInternalAlignMenuOpen] = React.useState(false);
    const [internalAlign, setInternalAlign] = React.useState(align);
    const [internalPosition, setInternalPosition] = React.useState(position);
    const sectionRef = React.useRef(null);
    const settingsOverlayId = React.useId();
    const alignOverlayId = React.useId();
    const isSettingsOpen = internalSettingsOpen;
    const isAlignMenuOpen = internalAlignMenuOpen;
    const selectedAlignOption = strokeAlignOptions.find((option) => option.value === internalAlign) ?? strokeAlignOptions[0];

    React.useEffect(() => {
      if (settingsOpen !== undefined) setInternalSettingsOpen(settingsOpen);
    }, [settingsOpen]);
    React.useEffect(() => setInternalAlign(align), [align]);
    React.useEffect(() => setInternalPosition(position), [position]);
    React.useEffect(() => {
      if (!isSettingsOpen && !isAlignMenuOpen) return undefined;
      const handlePointerDown = (event) => {
        if (sectionRef.current?.contains(event.target) || event.target?.closest?.(".composa-stroke-controls-section")) return;
        if (event.target?.closest?.(`[data-composa-overlay-owner="${settingsOverlayId}"]`)) return;
        if (event.target?.closest?.(`[data-composa-overlay-owner="${alignOverlayId}"]`)) return;
        // Dropdowns inside the settings dialog portal their menus as sibling
        // overlay layers; clicking an option must not close the dialog.
        if (event.target?.closest?.(".composa-overlay-layer-portal")) return;
        setInternalSettingsOpen(false);
        setInternalAlignMenuOpen(false);
        onSettingsOpenChange?.(false, event);
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [isSettingsOpen, isAlignMenuOpen, onSettingsOpenChange, settingsOverlayId, alignOverlayId]);

    const setSettingsOpen = (nextOpen, event) => {
      setInternalSettingsOpen(nextOpen);
      if (nextOpen) setInternalAlignMenuOpen(false);
      onSettingsOpenChange?.(nextOpen, event);
    };
    const setAlignMenuOpen = (nextOpen) => {
      setInternalAlignMenuOpen(nextOpen);
      if (nextOpen) setInternalSettingsOpen(false);
    };
    const handleAlignSelect = (nextAlign, event) => {
      setInternalAlign(nextAlign);
      setInternalAlignMenuOpen(false);
      onAlignChange?.(nextAlign, event);
    };

    return h(
      "div",
      {
        ...props,
        ref: sectionRef,
        className: cx("composa-stroke-controls-section", className),
        "data-composa-component": "StrokeControlsSection",
        "data-settings-open": boolData(isSettingsOpen),
      },
      [
        h("div", { key: "fields", className: "composa-stroke-controls-fields" }, [
          h("div", { key: "position", className: "composa-stroke-control-field" }, [
            h("span", { key: "label", className: "composa-stroke-control-label" }, "Position"),
            h(Dropdown, {
              key: "input",
              label: "Stroke position",
              value: internalPosition,
              options: ["Inside", "Center", "Outside"],
              width: "fill",
              className: "composa-stroke-position-dropdown",
              onValueChange: (nextPosition, _option, event) => {
                setInternalPosition(nextPosition);
                onPositionChange?.(nextPosition, event);
              },
            }),
          ]),
          h("div", { key: "weight", className: "composa-stroke-control-field" }, [
            h("span", { key: "label", className: "composa-stroke-control-label" }, "Weight"),
            h(InputField, {
              key: "input",
              label: "Stroke weight",
              value: weight,
              variant: "numeric",
              icon: "strokeWeight",
              iconLead: true,
              width: "fill",
              className: "composa-stroke-weight-input",
              onChange: (event) => onWeightChange?.(event.currentTarget?.value, event),
            }),
          ]),
          h(HeaderActions, { key: "actions", className: "composa-stroke-control-actions", label: "Stroke controls actions" }, [
            h(IconButton, {
              key: "settings",
              icon: "strokeSettings",
              label: "Stroke settings",
              selected: isSettingsOpen,
              tooltipPlacement: "top-right",
              className: "composa-header-icon-action composa-stroke-settings-action",
              onClick: (event) => setSettingsOpen(!isSettingsOpen, event),
            }),
            h(IconButton, {
              key: "align",
              icon: selectedAlignOption.icon,
              label: "Individual strokes",
              selected: isAlignMenuOpen,
              tooltipPlacement: "top-right",
              className: "composa-header-icon-action composa-stroke-align-action",
              onClick: () => setAlignMenuOpen(!isAlignMenuOpen),
            }),
          ]),
        ]),
        isSettingsOpen
          ? h(
              OverlayPortal,
              { key: "dialog-layer", anchorRef: sectionRef, placement: "left-of-inspector", align: "end", followAnchor: false, className: "composa-stroke-settings-layer", "data-composa-overlay-owner": settingsOverlayId },
              h(StrokeSettingsDialog, { onClose: (event) => setSettingsOpen(false, event) })
            )
          : null,
        isAlignMenuOpen
          ? h(
              OverlayPortal,
              { key: "align-menu-layer", anchorRef: sectionRef, placement: "bottom-right", align: "end", className: "composa-stroke-align-menu-layer", "data-composa-overlay-owner": alignOverlayId },
              h(StrokeAlignMenu, { selected: internalAlign, onSelect: handleAlignSelect })
            )
          : null,
      ]
    );
  }

  // ---------------------------------------------------------------------------
  // Inspector dialogs (color/fill, typography, layout guides)
  //
  // These follow the StrokeSettingsDialog / ExportSettingsDialog contract: a
  // controlled, overlay-mounted, dense inspector surface. The dialog component
  // owns no placement — it renders a `composa-*-dialog` root with role="dialog";
  // the section/trigger mounts it through OverlayPortal with `inspector-dialog`
  // placement and `followAnchor={false}` so it floats beside the rail and keeps
  // its launch position while the inspector scrolls. Figma reference: board
  // node 89:94, child frames 89:4939 (color), 99:5566/99:4077 (typography),
  // 91:40246/91:38859 (layout guides) in file rMq1M35u1iyKB2QaQMipZb.
  // ---------------------------------------------------------------------------

  const colorPaintTypeOptions = [
    { value: "solid", label: "Solid", icon: "paintSolid" },
    { value: "gradient", label: "Gradient", icon: "paintGradient" },
    { value: "image", label: "Image", icon: "paintImage" },
    { value: "video", label: "Video", icon: "paintVideo" },
  ];

  const colorFormatOptions = [
    { value: "hex", label: "Hex" },
    { value: "rgb", label: "RGB" },
    { value: "hsl", label: "HSL" },
    { value: "css", label: "CSS" },
  ];

  // ---------------------------------------------------------------------------
  // Color math (WAVE 2): a small self-contained toolkit so the picker can do
  // real bidirectional round-tripping (hex <-> rgb <-> hsv/hsl) and parse typed
  // input in every format the format dropdown exposes — without pulling in a
  // color library. All conversions are pure; the dialog keeps an authoritative
  // HSV state and derives every other representation from it so the 2D area,
  // hue/alpha sliders, swatch, and the four format fields stay in sync.
  // ---------------------------------------------------------------------------
  function clampChannel(value) {
    if (!Number.isFinite(value)) return 0;
    return Math.min(255, Math.max(0, Math.round(value)));
  }

  function normalizeHex(input) {
    const raw = String(input ?? "").trim().replace(/^#/, "");
    if (/^[0-9a-fA-F]{3}$/.test(raw)) {
      return raw.split("").map((c) => c + c).join("").toUpperCase();
    }
    if (/^[0-9a-fA-F]{6}$/.test(raw)) return raw.toUpperCase();
    return null;
  }

  function hexToRgb(hex) {
    const normalized = normalizeHex(hex);
    if (!normalized) return null;
    return {
      r: parseInt(normalized.slice(0, 2), 16),
      g: parseInt(normalized.slice(2, 4), 16),
      b: parseInt(normalized.slice(4, 6), 16),
    };
  }

  function rgbToHex({ r, g, b }) {
    return [r, g, b]
      .map((channel) => clampChannel(channel).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
  }

  function rgbToHsv({ r, g, b }) {
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const delta = max - min;
    let hue = 0;
    if (delta !== 0) {
      if (max === rn) hue = ((gn - bn) / delta) % 6;
      else if (max === gn) hue = (bn - rn) / delta + 2;
      else hue = (rn - gn) / delta + 4;
      // Keep hue at full precision so a hex -> hsv -> hex round-trip is lossless
      // (rounding to whole degrees here drifts channels by ~1). Display strings
      // and slider positions round at the point of use, not in storage.
      hue = hue * 60;
      if (hue < 0) hue += 360;
    }
    const saturation = max === 0 ? 0 : delta / max;
    return { h: hue, s: saturation, v: max };
  }

  function hsvToRgb({ h, s, v }) {
    const hue = ((h % 360) + 360) % 360;
    const sat = Math.min(1, Math.max(0, s));
    const val = Math.min(1, Math.max(0, v));
    const c = val * sat;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = val - c;
    let rp = 0;
    let gp = 0;
    let bp = 0;
    if (hue < 60) [rp, gp, bp] = [c, x, 0];
    else if (hue < 120) [rp, gp, bp] = [x, c, 0];
    else if (hue < 180) [rp, gp, bp] = [0, c, x];
    else if (hue < 240) [rp, gp, bp] = [0, x, c];
    else if (hue < 300) [rp, gp, bp] = [x, 0, c];
    else [rp, gp, bp] = [c, 0, x];
    return {
      r: clampChannel((rp + m) * 255),
      g: clampChannel((gp + m) * 255),
      b: clampChannel((bp + m) * 255),
    };
  }

  function hsvToHex(hsv) {
    return rgbToHex(hsvToRgb(hsv));
  }

  // HSV (the area model) -> HSL (the display/CSS model). They share hue.
  function hsvToHsl({ h, s, v }) {
    const l = v * (1 - s / 2);
    const sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
    return { h: ((h % 360) + 360) % 360, s: sl, l };
  }

  function hslToHsv({ h, s, l }) {
    const sat = Math.min(1, Math.max(0, s));
    const light = Math.min(1, Math.max(0, l));
    const v = light + sat * Math.min(light, 1 - light);
    const sv = v === 0 ? 0 : 2 * (1 - light / v);
    return { h: ((h % 360) + 360) % 360, s: sv, v };
  }

  // --- Per-format parsers. Each returns an HSV object or null on invalid input
  // so the field can validate without committing a bad value. ---
  function parseColorInput(rawInput, format) {
    const raw = String(rawInput ?? "").trim();
    if (format === "hex" || format === "css") {
      const rgb = hexToRgb(raw);
      return rgb ? rgbToHsv(rgb) : null;
    }
    if (format === "rgb") {
      const match = raw.replace(/^rgb\(|\)$/gi, "").split(/[\s,]+/).filter(Boolean);
      if (match.length < 3) return null;
      const [r, g, b] = match.slice(0, 3).map((part) => Number.parseFloat(part));
      if (![r, g, b].every((n) => Number.isFinite(n) && n >= 0 && n <= 255)) return null;
      return rgbToHsv({ r, g, b });
    }
    if (format === "hsl") {
      const match = raw.replace(/^hsl\(|\)$/gi, "").split(/[\s,]+/).filter(Boolean);
      if (match.length < 3) return null;
      const h = Number.parseFloat(match[0]);
      const s = Number.parseFloat(match[1]) / 100;
      const l = Number.parseFloat(match[2]) / 100;
      if (![h, s, l].every((n) => Number.isFinite(n))) return null;
      if (s < 0 || s > 1 || l < 0 || l > 1) return null;
      return hslToHsv({ h, s, l });
    }
    return null;
  }

  // --- Per-format display strings derived from authoritative HSV. ---
  function formatColorValue(hsv, format) {
    const hex = hsvToHex(hsv);
    if (format === "css") return `#${hex.toLowerCase()}`;
    if (format === "rgb") {
      const { r, g, b } = hsvToRgb(hsv);
      return `${r}, ${g}, ${b}`;
    }
    if (format === "hsl") {
      const { h, s, l } = hsvToHsl(hsv);
      return `${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
    }
    return hex;
  }

  // Generic pointer-drag binder for the 2D area and the 1D tracks. Captures the
  // pointer, maps every pointermove to a normalized 0..1 (x, y) inside the
  // element's box, and reports it. Returns an onPointerDown handler.
  function useAreaPointer(onPick) {
    const onPickRef = React.useRef(onPick);
    onPickRef.current = onPick;
    return React.useCallback((event) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const report = (clientX, clientY) => {
        const x = rect.width ? clampOverlayValue((clientX - rect.left) / rect.width, 0, 1) : 0;
        const y = rect.height ? clampOverlayValue((clientY - rect.top) / rect.height, 0, 1) : 0;
        onPickRef.current?.(x, y);
      };
      report(event.clientX, event.clientY);
      const handleMove = (moveEvent) => {
        moveEvent.preventDefault();
        report(moveEvent.clientX, moveEvent.clientY);
      };
      const handleUp = () => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
      };
      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
      event.preventDefault();
    }, []);
  }

  const gradientTypeOptions = [
    { value: "linear", label: "Linear" },
    { value: "radial", label: "Radial" },
    { value: "angular", label: "Angular" },
    { value: "diamond", label: "Diamond" },
  ];

  const imageFillModeOptions = [
    { value: "fill", label: "Fill" },
    { value: "fit", label: "Fit" },
    { value: "crop", label: "Crop" },
    { value: "tile", label: "Tile" },
  ];

  function ColorPickerDialog({
    label = "Color",
    value = "FFFFFF",
    opacity = "100",
    paintType = "solid",
    format = "hex",
    tab = "custom",
    swatchSet = "On this page",
    swatches = ["383838", "F5F5F5", "1E1E1E"],
    gradientType = "linear",
    gradientStops,
    imageFillMode = "fill",
    onValueChange,
    onOpacityChange,
    onPaintTypeChange,
    onFormatChange,
    onTabChange,
    onGradientTypeChange,
    onGradientStopsChange,
    onImageFillModeChange,
    onImageUpload,
    onEyedropper,
    onClose,
    className = "",
    ...props
  }) {
    // Authoritative color state is HSV so the area + hue slider never lose
    // saturation/value when the color passes through grayscale. Hex/rgb/hsl/css
    // are all derived from it; typing in any field parses back into HSV.
    const initialHsv = React.useMemo(() => rgbToHsv(hexToRgb(normalizeHex(value) ?? "FFFFFF") ?? { r: 255, g: 255, b: 255 }), [value]);
    const [hsv, setHsv] = React.useState(initialHsv);
    const [internalOpacity, setInternalOpacity] = React.useState(opacity);
    const [internalPaintType, setInternalPaintType] = React.useState(propToken(paintType));
    const [internalFormat, setInternalFormat] = React.useState(propToken(format));
    const [internalTab, setInternalTab] = React.useState(propToken(tab));
    const [internalGradientType, setInternalGradientType] = React.useState(propToken(gradientType));
    const [internalFillMode, setInternalFillMode] = React.useState(propToken(imageFillMode));
    // Draft mirrors the focused value field so partially-typed input does not
    // get clobbered by the derived display string on every keystroke.
    const [valueDraft, setValueDraft] = React.useState(null);

    React.useEffect(() => setHsv(rgbToHsv(hexToRgb(normalizeHex(value) ?? "FFFFFF") ?? { r: 255, g: 255, b: 255 })), [value]);
    React.useEffect(() => setInternalOpacity(opacity), [opacity]);
    React.useEffect(() => setInternalPaintType(propToken(paintType)), [paintType]);
    React.useEffect(() => setInternalFormat(propToken(format)), [format]);
    React.useEffect(() => setInternalTab(propToken(tab)), [tab]);
    React.useEffect(() => setInternalGradientType(propToken(gradientType)), [gradientType]);
    React.useEffect(() => setInternalFillMode(propToken(imageFillMode)), [imageFillMode]);

    const resolvedHex = hsvToHex(hsv);
    const rgb = hsvToRgb(hsv);
    const hueColor = `hsl(${hsv.h}, 100%, 50%)`;
    const swatchFill = `#${resolvedHex}`;
    const formatValue = valueDraft !== null ? valueDraft : formatColorValue(hsv, internalFormat);
    const formatLabel = (colorFormatOptions.find((o) => o.value === internalFormat) ?? colorFormatOptions[0]).label;

    // Commit a new HSV from any source (area drag, slider, typed field, swatch)
    // and notify the controlling app with the resolved hex.
    const commitHsv = (nextHsv, event) => {
      setHsv(nextHsv);
      onValueChange?.(hsvToHex(nextHsv), event);
    };

    const setTab = (nextTab) => {
      setInternalTab(nextTab);
      onTabChange?.(nextTab);
    };
    const setPaintType = (nextType, event) => {
      setInternalPaintType(nextType);
      onPaintTypeChange?.(nextType, event);
    };
    const handleValueChange = (event) => {
      const next = event?.currentTarget?.value ?? "";
      setValueDraft(next);
      const parsed = parseColorInput(next, internalFormat);
      if (parsed) commitHsv(parsed, event);
    };
    const handleValueBlur = () => setValueDraft(null);
    const handleOpacityChange = (event) => {
      const next = event?.currentTarget?.value ?? "";
      setInternalOpacity(next);
      onOpacityChange?.(next, event);
    };
    const opacityPct = clampOverlayValue(Number.parseFloat(internalOpacity) || 0, 0, 100);

    // 2D area: x -> saturation, y -> 1 - value (top is brightest).
    const handleAreaPick = useAreaPointer((x, y) => commitHsv({ h: hsv.h, s: x, v: 1 - y }));
    const handleHuePick = useAreaPointer((x) => commitHsv({ h: Math.round(x * 360), s: hsv.s, v: hsv.v }));
    const handleAlphaPick = useAreaPointer((x) => {
      const next = String(Math.round(x * 100));
      setInternalOpacity(next);
      onOpacityChange?.(next);
    });

    const handleEyedropper = (event) => {
      // Prefer the real platform EyeDropper when present; fall back to the seam.
      if (typeof window !== "undefined" && typeof window.EyeDropper === "function") {
        try {
          const dropper = new window.EyeDropper();
          dropper
            .open()
            .then((result) => {
              const picked = rgbToHsv(hexToRgb(result?.sRGBHex) ?? rgb);
              commitHsv(picked, event);
            })
            .catch(() => {});
          return;
        } catch (error) {
          // Permission/abort — fall through to the host seam.
        }
      }
      onEyedropper?.(event);
    };

    const setGradientType = (nextType, event) => {
      setInternalGradientType(nextType);
      onGradientTypeChange?.(nextType, event);
    };
    const setFillMode = (nextMode, event) => {
      setInternalFillMode(nextMode);
      onImageFillModeChange?.(nextMode, event);
    };

    const tabsNode = h(Tabs, {
      key: "tabs",
      label: "Color source",
      variant: "pill",
      divider: false,
      value: internalTab,
      className: "composa-color-picker-tabs",
      tabs: [
        { id: "custom", label: "Custom" },
        { id: "libraries", label: "Libraries" },
      ],
      onValueChange: (nextTab) => setTab(nextTab),
    });

    const headerNode = h("div", { key: "header", className: "composa-color-picker-header" }, [
      tabsNode,
      h(HeaderActions, { key: "actions", className: "composa-color-picker-header-actions", label: "Color picker actions" }, [
        h(IconButton, { key: "new", icon: "plus", label: "New style or variable", tooltipPlacement: "top", className: "composa-header-icon-action", onClick: (event) => onValueChange?.(resolvedHex, event) }),
        h(IconButton, { key: "close", icon: "close", label: "Close color picker", tooltip: false, variant: "ghost", className: "composa-color-picker-close", onClick: onClose }),
      ]),
    ]);

    // Paint-row trailing actions differ per paint type (Figma 89:4939 solid =
    // contrast; 89:8771 gradient = reverse + rotate; 89:13859 image = rotate).
    const paintRowActions =
      internalPaintType === "gradient"
        ? [
            h(IconButton, { key: "reverse", icon: "gradientReverse", label: "Reverse gradient", tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: (event) => onGradientTypeChange?.(internalGradientType, event) }),
            h(IconButton, { key: "rotate", icon: "gradientRotate", label: "Rotate gradient", tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: (event) => onGradientTypeChange?.(internalGradientType, event) }),
          ]
        : internalPaintType === "image"
          ? [h(IconButton, { key: "rotate", icon: "gradientRotate", label: "Rotate image", tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: (event) => onImageFillModeChange?.(internalFillMode, event) })]
          : [h(IconButton, { key: "contrast", icon: "colorContrast", label: "Check color contrast", tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: (event) => onValueChange?.(resolvedHex, event) })];

    const paintRowNode = h("div", { key: "paint-type", className: "composa-color-picker-paint-row" }, [
      h("div", { key: "types", className: "composa-color-picker-paint-types", role: "group", "aria-label": "Paint type" },
        colorPaintTypeOptions.map((option) =>
          h(IconButton, {
            key: option.value,
            icon: option.icon,
            label: option.label,
            selected: option.value === internalPaintType,
            className: "composa-color-picker-paint-type",
            tooltipPlacement: "top",
            onClick: (event) => setPaintType(option.value, event),
          })
        )
      ),
      h("div", { key: "actions", className: "composa-color-picker-paint-actions" }, paintRowActions),
    ]);

    // --- Shared solid controls: 2D area, hue/alpha sliders, format fields. The
    // gradient body reuses these to edit the selected stop. ---
    const areaNode = h(
      "div",
      {
        key: "area",
        className: "composa-color-picker-area",
        "aria-label": "Saturation and brightness",
        style: { "--composa-color-picker-hue": hueColor },
        onPointerDown: handleAreaPick,
      },
      h("span", {
        key: "reticle",
        className: "composa-color-picker-reticle",
        style: {
          left: `${Math.round(hsv.s * 100)}%`,
          top: `${Math.round((1 - hsv.v) * 100)}%`,
          "--composa-color-picker-reticle-fill": swatchFill,
        },
      })
    );

    const slidersNode = h("div", { key: "sliders", className: "composa-color-picker-sliders" }, [
      h(IconButton, { key: "eyedropper", icon: "eyedropper", label: "Pick color from canvas", tooltipPlacement: "top-left", className: "composa-color-picker-eyedropper", onClick: handleEyedropper }),
      h("div", { key: "tracks", className: "composa-color-picker-tracks" }, [
        h(
          "div",
          { key: "hue", className: "composa-color-picker-track composa-color-picker-hue-track", "aria-label": "Hue", onPointerDown: handleHuePick },
          h("span", { className: "composa-color-picker-thumb", style: { left: `${Math.round((hsv.h / 360) * 100)}%`, "--composa-color-picker-thumb-fill": hueColor } })
        ),
        h(
          "div",
          { key: "alpha", className: "composa-color-picker-track composa-color-picker-alpha-track", "aria-label": "Opacity", style: { "--composa-color-picker-alpha-color": swatchFill }, onPointerDown: handleAlphaPick },
          h("span", { className: "composa-color-picker-thumb", style: { left: `${opacityPct}%`, "--composa-color-picker-thumb-fill": swatchFill } })
        ),
      ]),
    ]);

    const fieldsNode = h("div", { key: "fields", className: "composa-color-picker-fields" }, [
      h(Dropdown, {
        key: "format",
        label: "Color format",
        value: formatLabel,
        width: "auto",
        options: colorFormatOptions,
        className: "composa-color-picker-format",
        menuClassName: "composa-color-picker-format-menu",
        onValueChange: (nextFormat, _option, event) => {
          setValueDraft(null);
          setInternalFormat(nextFormat);
          onFormatChange?.(nextFormat, event);
        },
      }),
      h(InputField, {
        key: "value",
        label: `${formatLabel} value`,
        value: formatValue,
        width: "fill",
        className: "composa-color-picker-value-input",
        onChange: handleValueChange,
        onBlur: handleValueBlur,
      }),
      h(InputField, {
        key: "opacity",
        label: "Opacity",
        value: internalOpacity,
        suffix: "%",
        variant: "numeric",
        className: "composa-color-picker-opacity-input",
        onChange: handleOpacityChange,
      }),
    ]);

    const swatchesNode = h("div", { key: "swatches", className: "composa-color-picker-swatches" }, [
      h(Dropdown, {
        key: "set",
        label: "Swatch set",
        value: swatchSet,
        width: "fill",
        options: [swatchSet, "Document colors", "Library"],
        className: "composa-color-picker-swatch-set",
        menuClassName: "composa-color-picker-swatch-set-menu",
      }),
      h("div", { key: "row", className: "composa-color-picker-swatch-row", role: "group", "aria-label": "Saved swatches" },
        swatches.map((swatch, index) => {
          const swatchHex = normalizeHex(swatch) ?? "FFFFFF";
          return h("button", {
            key: `${swatchHex}-${index}`,
            type: "button",
            className: "composa-color-picker-swatch",
            "aria-label": `Use #${swatchHex}`,
            style: { "--composa-color-picker-swatch-fill": `#${swatchHex}` },
            onClick: (event) => commitHsv(rgbToHsv(hexToRgb(swatchHex)), event),
          });
        })
      ),
    ]);

    // --- Gradient body (Figma 89:8771) ---
    const defaultStops = [
      { position: 0, color: "000000", opacity: 100 },
      { position: 100, color: "666666", opacity: 100 },
    ];
    const [internalStops, setInternalStops] = React.useState(() =>
      (Array.isArray(gradientStops) && gradientStops.length ? gradientStops : defaultStops).map((stop) => ({ ...stop }))
    );
    React.useEffect(() => {
      if (Array.isArray(gradientStops) && gradientStops.length) setInternalStops(gradientStops.map((stop) => ({ ...stop })));
    }, [gradientStops]);
    const commitStops = (nextStops, event) => {
      setInternalStops(nextStops);
      onGradientStopsChange?.(nextStops, event);
    };
    const updateStop = (index, patch, event) => {
      commitStops(internalStops.map((stop, i) => (i === index ? { ...stop, ...patch } : stop)), event);
    };
    const removeStop = (index, event) => {
      if (internalStops.length <= 2) return;
      commitStops(internalStops.filter((_, i) => i !== index), event);
    };
    const addStop = (event) => {
      const last = internalStops[internalStops.length - 1] ?? { position: 100, color: "FFFFFF", opacity: 100 };
      const prev = internalStops[internalStops.length - 2] ?? { position: 0 };
      const midpoint = Math.round((Number(last.position) + Number(prev.position)) / 2);
      commitStops([...internalStops, { position: midpoint, color: normalizeHex(last.color) ?? "FFFFFF", opacity: 100 }], event);
    };
    const gradientPreview = (() => {
      const ordered = [...internalStops].sort((a, b) => Number(a.position) - Number(b.position));
      const stopList = ordered
        .map((stop) => {
          const stopHex = normalizeHex(stop.color) ?? "FFFFFF";
          const stopRgb = hexToRgb(stopHex) ?? { r: 0, g: 0, b: 0 };
          const alpha = clampOverlayValue(Number(stop.opacity) || 0, 0, 100) / 100;
          return `rgba(${stopRgb.r}, ${stopRgb.g}, ${stopRgb.b}, ${alpha}) ${clampOverlayValue(Number(stop.position) || 0, 0, 100)}%`;
        })
        .join(", ");
      if (internalGradientType === "radial" || internalGradientType === "diamond") return `radial-gradient(circle, ${stopList})`;
      if (internalGradientType === "angular") return `conic-gradient(${stopList})`;
      return `linear-gradient(to right, ${stopList})`;
    })();

    const gradientBody = [
      h("div", { key: "gradient-type", className: "composa-color-picker-gradient-type-row" }, [
        h(Dropdown, {
          key: "type",
          label: "Gradient type",
          value: (gradientTypeOptions.find((o) => o.value === internalGradientType) ?? gradientTypeOptions[0]).label,
          width: "fill",
          options: gradientTypeOptions,
          className: "composa-color-picker-gradient-type",
          menuClassName: "composa-color-picker-gradient-type-menu",
          onValueChange: (nextType, _option, event) => setGradientType(nextType, event),
        }),
        h(HeaderActions, { key: "actions", className: "composa-color-picker-gradient-type-actions", label: "Gradient transforms" }, [
          h(IconButton, { key: "reverse", icon: "gradientReverse", label: "Reverse stops", tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: (event) => commitStops([...internalStops].reverse().map((stop, i, arr) => ({ ...stop, position: arr.length === 1 ? stop.position : Math.round((i / (arr.length - 1)) * 100) })), event) }),
          h(IconButton, { key: "rotate", icon: "gradientRotate", label: "Rotate gradient", tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: (event) => onGradientTypeChange?.(internalGradientType, event) }),
        ]),
      ]),
      h("div", { key: "gradient-preview", className: "composa-color-picker-gradient-preview", style: { "--composa-color-picker-gradient-preview": gradientPreview }, role: "img", "aria-label": "Gradient preview" }),
      h("div", { key: "gradient-stops", className: "composa-color-picker-gradient-stops" }, [
        h("div", { key: "stops-header", className: "composa-color-picker-gradient-stops-header" }, [
          h("span", { key: "label", className: "composa-color-picker-gradient-stops-title" }, "Stops"),
          h(IconButton, { key: "add", icon: "plus", label: "Add stop", tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: addStop }),
        ]),
        h("div", { key: "stops-list", className: "composa-color-picker-gradient-stop-list", role: "list" },
          internalStops.map((stop, index) => {
            const stopHex = normalizeHex(stop.color) ?? "FFFFFF";
            return h("div", { key: `stop-${index}`, className: "composa-color-picker-gradient-stop", role: "listitem" }, [
              h(InputField, {
                key: "pos",
                label: `Stop ${index + 1} position`,
                value: String(stop.position),
                suffix: "%",
                variant: "numeric",
                className: "composa-color-picker-gradient-stop-pos",
                onChange: (event) => updateStop(index, { position: clampOverlayValue(Number.parseFloat(event.currentTarget.value) || 0, 0, 100) }, event),
              }),
              h("span", { key: "swatch", className: "composa-color-picker-gradient-stop-swatch", style: { "--composa-color-picker-swatch-fill": `#${stopHex}` }, "aria-hidden": "true" }),
              h(InputField, {
                key: "hex",
                label: `Stop ${index + 1} color`,
                value: stopHex,
                className: "composa-color-picker-gradient-stop-hex",
                onChange: (event) => {
                  const next = normalizeHex(event.currentTarget.value);
                  updateStop(index, { color: next ?? event.currentTarget.value }, event);
                },
              }),
              h(InputField, {
                key: "opacity",
                label: `Stop ${index + 1} opacity`,
                value: String(stop.opacity),
                suffix: "%",
                variant: "numeric",
                className: "composa-color-picker-gradient-stop-opacity",
                onChange: (event) => updateStop(index, { opacity: clampOverlayValue(Number.parseFloat(event.currentTarget.value) || 0, 0, 100) }, event),
              }),
              h(IconButton, {
                key: "remove",
                icon: "minus",
                label: `Remove stop ${index + 1}`,
                tooltipPlacement: "top-right",
                disabled: internalStops.length <= 2,
                className: "composa-color-picker-gradient-stop-remove",
                onClick: (event) => removeStop(index, event),
              }),
            ]);
          })
        ),
      ]),
    ];

    // --- Image body (Figma 89:13859) ---
    const fileInputRef = React.useRef(null);
    const handleUploadClick = () => fileInputRef.current?.click();
    const handleFileChange = (event) => {
      const file = event?.currentTarget?.files?.[0];
      if (file) onImageUpload?.(file, event);
    };
    const handleDropZoneDrop = (event) => {
      event.preventDefault();
      const file = event?.dataTransfer?.files?.[0];
      if (file) onImageUpload?.(file, event);
    };
    const imageBody = [
      h("div", { key: "image-mode", className: "composa-color-picker-image-mode-row" }, [
        h(Dropdown, {
          key: "mode",
          label: "Image fill mode",
          value: (imageFillModeOptions.find((o) => o.value === internalFillMode) ?? imageFillModeOptions[0]).label,
          width: "fill",
          options: imageFillModeOptions,
          className: "composa-color-picker-image-mode",
          menuClassName: "composa-color-picker-image-mode-menu",
          onValueChange: (nextMode, _option, event) => setFillMode(nextMode, event),
        }),
        h(IconButton, { key: "rotate", icon: "gradientRotate", label: "Rotate image", tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: (event) => onImageFillModeChange?.(internalFillMode, event) }),
      ]),
      h(
        "div",
        {
          key: "dropzone",
          className: "composa-color-picker-image-dropzone",
          onDragOver: (event) => event.preventDefault(),
          onDrop: handleDropZoneDrop,
        },
        [
          h(Button, { key: "upload", label: "Upload from computer", variant: "primary", size: "small", className: "composa-color-picker-image-upload", onClick: handleUploadClick }),
          h("input", { key: "file", ref: fileInputRef, type: "file", accept: "image/*", className: "composa-color-picker-image-file", onChange: handleFileChange }),
        ]
      ),
    ];

    const librariesBody = [
      h("div", { key: "libraries", className: "composa-color-picker-libraries" }, [
        h("p", { key: "empty", className: "composa-color-picker-libraries-empty" }, "No libraries are enabled for this file."),
        h(Button, { key: "manage", label: "Manage libraries", variant: "secondary", size: "small", className: "composa-color-picker-libraries-action", onClick: (event) => onTabChange?.("libraries", event) }),
      ]),
    ];

    let body;
    if (internalTab === "libraries") {
      body = librariesBody;
    } else if (internalPaintType === "gradient") {
      body = [...gradientBody, areaNode, slidersNode, fieldsNode, swatchesNode];
    } else if (internalPaintType === "image") {
      body = imageBody;
    } else {
      body = [areaNode, slidersNode, fieldsNode, swatchesNode];
    }

    return h(
      "div",
      {
        ...props,
        className: cx("composa-color-picker-dialog", className),
        "data-composa-component": "ColorPickerDialog",
        "data-paint-type": internalPaintType,
        "data-format": internalFormat,
        "data-tab": internalTab,
        "data-gradient-type": internalGradientType,
        role: "dialog",
        "aria-label": label,
        onPointerDown: (event) => event.stopPropagation(),
      },
      [headerNode, internalTab === "libraries" ? null : paintRowNode, ...body]
    );
  }

  function ColorPickerTrigger({
    open,
    defaultOpen = false,
    value = "FFFFFF",
    label = "Fill color",
    onOpenChange,
    dialogProps,
    className = "",
    ...props
  }) {
    const [internalOpen, setInternalOpen] = React.useState(Boolean(defaultOpen));
    const isOpen = open !== undefined ? open : internalOpen;
    const triggerRef = React.useRef(null);
    const overlayId = React.useId();
    React.useEffect(() => {
      if (open !== undefined) setInternalOpen(open);
    }, [open]);
    React.useEffect(() => {
      if (!isOpen) return undefined;
      const handlePointerDown = (event) => {
        if (triggerRef.current?.contains(event.target)) return;
        if (event.target?.closest?.(`[data-composa-overlay-owner="${overlayId}"]`)) return;
        // The picker's own dropdowns (format, swatch set) portal their menus as
        // sibling overlay layers; clicking an option must not close the picker.
        if (event.target?.closest?.(".composa-overlay-layer-portal")) return;
        if (open === undefined) setInternalOpen(false);
        onOpenChange?.(false, event);
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [isOpen, onOpenChange, open, overlayId]);
    const setOpen = (nextOpen, event) => {
      if (open === undefined) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen, event);
    };
    const swatchHex = normalizeHex(dialogProps?.value ?? value) ?? "FFFFFF";
    // When an opacity is supplied the swatch reads as a split preview (Figma
    // 91:41718): the left half is the solid color, the right half is the color
    // at its alpha over a checkerboard. Below 100% we expose the alpha fill so
    // the swatch reflects the opacity instead of rendering fully solid.
    const swatchOpacityRaw = dialogProps?.opacity;
    const swatchAlpha =
      swatchOpacityRaw === undefined || swatchOpacityRaw === null || swatchOpacityRaw === ""
        ? null
        : clampOverlayValue(Number.parseFloat(swatchOpacityRaw) || 0, 0, 100) / 100;
    const swatchRgb = hexToRgb(swatchHex) ?? { r: 255, g: 255, b: 255 };
    const showSplitSwatch = swatchAlpha !== null && swatchAlpha < 1;
    const swatchStyle = { "--composa-color-picker-swatch-fill": `#${swatchHex}` };
    if (showSplitSwatch) {
      swatchStyle["--composa-color-picker-swatch-alpha-fill"] = `rgba(${swatchRgb.r}, ${swatchRgb.g}, ${swatchRgb.b}, ${swatchAlpha})`;
    }
    return h(
      "div",
      { ...props, ref: triggerRef, className: cx("composa-color-picker-trigger", className), "data-composa-component": "ColorPickerTrigger", "data-dialog-open": boolData(isOpen) },
      [
        h("button", {
          key: "swatch",
          type: "button",
          className: cx("composa-color-picker-trigger-swatch", isOpen && "is-selected", showSplitSwatch && "has-opacity"),
          "aria-label": label,
          "aria-haspopup": "dialog",
          "aria-expanded": isOpen ? "true" : "false",
          style: swatchStyle,
          onClick: (event) => setOpen(!isOpen, event),
        }),
        isOpen
          ? h(
              OverlayPortal,
              { key: "dialog-layer", anchorRef: triggerRef, placement: "inspector-dialog", align: "end", followAnchor: false, className: "composa-color-picker-layer", "data-composa-overlay-owner": overlayId },
              h(ColorPickerDialog, { value, ...dialogProps, onClose: (event) => setOpen(false, event) })
            )
          : null,
      ]
    );
  }

  // Type-style picker data (Figma 99:4077). Each style carries an `Ag`
  // specimen rendered in its own face so the lead reads as the typeface, not a
  // generic glyph; `meta` is the size/line-height pair shown after the label.
  const typeStyleGroups = [
    {
      label: "Material 3 Design Kit",
      subgroups: [
        {
          label: "M3/display",
          styles: [
            { value: "m3-display-large", label: "large", meta: "57/64", specimen: "Ag" },
            { value: "m3-display-large-emphasized", label: "large-emphasized", meta: "57/64", specimen: "Ag", emphasized: true },
            { value: "m3-display-medium", label: "medium", meta: "45/52", specimen: "Ag" },
            { value: "m3-display-medium-emphasized", label: "medium-emphasized", meta: "45/52", specimen: "Ag", emphasized: true },
            { value: "m3-display-small", label: "small", meta: "36/44", specimen: "Ag" },
            { value: "m3-display-small-emphasized", label: "small-emphasized", meta: "36/44", specimen: "Ag", emphasized: true },
          ],
        },
        {
          label: "M3/headline",
          styles: [
            { value: "m3-headline-large", label: "large", meta: "32/40", specimen: "Ag" },
            { value: "m3-headline-large-emphasized", label: "large-emphasized", meta: "32/40", specimen: "Ag", emphasized: true },
            { value: "m3-headline-medium", label: "medium", meta: "28/36", specimen: "Ag" },
            { value: "m3-headline-medium-emphasized", label: "medium-emphasized", meta: "28/36", specimen: "Ag", emphasized: true },
            { value: "m3-headline-small", label: "small", meta: "24/32", specimen: "Ag" },
            { value: "m3-headline-small-emphasized", label: "small-emphasized", meta: "24/32", specimen: "Ag", emphasized: true },
          ],
        },
      ],
    },
  ];

  // Font-family list (Figma 99:1337). Each family carries the CSS face used to
  // render its own name in the list, matching the picker's "rendered in its own
  // face" behavior.
  const fontFamilyGroups = [
    {
      label: "All fonts",
      fonts: [
        { value: "Inria Serif", label: "Inria Serif", face: '"Inria Serif", Georgia, serif' },
        { value: "Inter", label: "Inter", face: '"Inter", system-ui, sans-serif' },
        { value: "Roboto", label: "Roboto", face: '"Roboto", system-ui, sans-serif' },
        { value: "Roboto Mono", label: "Roboto Mono", face: '"Roboto Mono", ui-monospace, monospace' },
        { value: "Lora", label: "Lora", face: '"Lora", Georgia, serif' },
        { value: "Playfair Display", label: "Playfair Display", face: '"Playfair Display", Georgia, serif' },
        { value: "Space Grotesk", label: "Space Grotesk", face: '"Space Grotesk", system-ui, sans-serif' },
        { value: "Source Serif 4", label: "Source Serif 4", face: '"Source Serif 4", Georgia, serif' },
        { value: "DM Sans", label: "DM Sans", face: '"DM Sans", system-ui, sans-serif' },
        { value: "Work Sans", label: "Work Sans", face: '"Work Sans", system-ui, sans-serif' },
      ],
    },
  ];

  // A single type-style row: an `Ag` specimen lead (rendered in the style's
  // face), the style label + size/line-height meta, and a trailing edit/filter
  // affordance revealed on the selected or hovered row (Figma 99:4077 "Button -
  // Edit style").
  function TypeStyleRow({ style, selected = false, onSelect, onEdit }) {
    return h(
      "div",
      {
        className: cx("composa-type-style-row", selected && "is-selected"),
        "data-composa-component": "TypeStyleRow",
        "data-selected": boolData(selected),
        role: "menuitemradio",
        "aria-checked": selected ? "true" : "false",
      },
      [
        h(
          "button",
          {
            key: "main",
            type: "button",
            className: "composa-type-style-row-main",
            onClick: (event) => onSelect?.(style.value, style, event),
          },
          [
            h("span", { key: "specimen", className: cx("composa-type-style-specimen", style.emphasized && "is-emphasized"), "aria-hidden": "true" }, style.specimen || "Ag"),
            h("span", { key: "label", className: "composa-type-style-row-label" }, style.label),
            style.meta ? h("span", { key: "meta", className: "composa-type-style-row-meta" }, `· ${style.meta}`) : null,
          ]
        ),
        h(IconButton, {
          key: "edit",
          icon: "typeStyleEdit",
          size: "small",
          variant: "ghost",
          label: "Edit style",
          tooltipPlacement: "top-right",
          className: "composa-type-style-row-edit",
          onClick: (event) => onEdit?.(style.value, style, event),
        }),
      ]
    );
  }

  function TypeStyleMenu({ selected, onSelect, onEdit, onClose }) {
    const [query, setQuery] = React.useState("");
    const normalizedQuery = query.trim().toLowerCase();
    return h(
      "div",
      { className: "composa-type-style-menu", "data-composa-component": "TypeStyleMenu", role: "menu", "aria-label": "Text styles", onPointerDown: (event) => event.stopPropagation() },
      [
        h("div", { key: "header", className: "composa-type-style-menu-header" }, [
          h("span", { key: "title", className: "composa-type-style-menu-title" }, "Text styles"),
          h(HeaderActions, { key: "actions", className: "composa-type-style-menu-actions", label: "Text style actions" }, [
            h(IconButton, { key: "browse", icon: "teamLibrary", label: "Browse team library", tooltipPlacement: "top", className: "composa-header-icon-action" }),
            h(IconButton, { key: "add", icon: "plus", label: "Create style", tooltipPlacement: "top", className: "composa-header-icon-action" }),
            h(IconButton, { key: "close", icon: "close", label: "Close text styles", tooltip: false, variant: "ghost", className: "composa-type-style-menu-close", onClick: onClose }),
          ]),
        ]),
        h(InputField, {
          key: "search",
          label: "Search text styles",
          placeholder: "Search",
          icon: "target",
          iconLead: true,
          width: "fill",
          value: query,
          className: "composa-type-style-menu-search",
          onChange: (event) => setQuery(event.currentTarget?.value ?? ""),
        }),
        h(
          "div",
          { key: "groups", className: "composa-type-style-menu-groups" },
          typeStyleGroups.map((group) =>
            h("div", { key: group.label, className: "composa-type-style-group", role: "group", "aria-label": group.label }, [
              h("div", { key: "label", className: "composa-type-style-group-label" }, group.label),
              ...group.subgroups.map((subgroup) => {
                const styles = normalizedQuery
                  ? subgroup.styles.filter((style) => `${subgroup.label} ${style.label}`.toLowerCase().includes(normalizedQuery))
                  : subgroup.styles;
                if (styles.length === 0) return null;
                return h("div", { key: subgroup.label, className: "composa-type-style-subgroup", role: "group", "aria-label": subgroup.label }, [
                  h("div", { key: "sublabel", className: "composa-type-style-subgroup-label" }, subgroup.label),
                  ...styles.map((style) =>
                    h(TypeStyleRow, {
                      key: style.value,
                      style,
                      selected: style.value === selected,
                      onSelect,
                      onEdit,
                    })
                  ),
                ]);
              }),
            ])
          )
        ),
      ]
    );
  }

  // Dedicated font-family picker (Figma 99:1337): search, an "All fonts"
  // source dropdown, and a font list with each family rendered in its own face.
  function FontsPickerMenu({ selected, query: queryProp, onQueryChange, onSelect, onClose, onApplyVariable }) {
    const [internalQuery, setInternalQuery] = React.useState(queryProp ?? "");
    React.useEffect(() => {
      if (queryProp !== undefined) setInternalQuery(queryProp);
    }, [queryProp]);
    const query = queryProp !== undefined ? queryProp : internalQuery;
    const normalizedQuery = query.trim().toLowerCase();
    const setQuery = (next) => {
      if (queryProp === undefined) setInternalQuery(next);
      onQueryChange?.(next);
    };
    return h(
      "div",
      { className: "composa-fonts-picker-menu", "data-composa-component": "FontsPickerMenu", role: "menu", "aria-label": "Fonts", onPointerDown: (event) => event.stopPropagation() },
      [
        h("div", { key: "header", className: "composa-fonts-picker-header" }, [
          h("span", { key: "title", className: "composa-fonts-picker-title" }, "Fonts"),
          h(HeaderActions, { key: "actions", className: "composa-fonts-picker-actions", label: "Fonts actions" }, [
            h(IconButton, { key: "variable", icon: "fontsApplyVariable", label: "Apply variable", tooltipPlacement: "top", className: "composa-header-icon-action", onClick: onApplyVariable }),
            h(IconButton, { key: "close", icon: "close", label: "Close fonts", tooltip: false, variant: "ghost", className: "composa-fonts-picker-close", onClick: onClose }),
          ]),
        ]),
        h(InputField, {
          key: "search",
          label: "Search fonts",
          placeholder: "Search fonts",
          icon: "target",
          iconLead: true,
          width: "fill",
          value: query,
          closeButton: query.length > 0,
          onClear: () => setQuery(""),
          className: "composa-fonts-picker-search",
          onChange: (event) => setQuery(event.currentTarget?.value ?? ""),
        }),
        h("div", { key: "source", className: "composa-fonts-picker-source" },
          h(Dropdown, {
            key: "source-dropdown",
            label: "Font source",
            value: "All fonts",
            width: "fill",
            options: ["All fonts", "In document", "Recently used"],
            className: "composa-fonts-picker-source-dropdown",
            menuClassName: "composa-fonts-picker-source-menu",
          })
        ),
        h(
          "div",
          { key: "list", className: "composa-fonts-picker-list" },
          fontFamilyGroups.flatMap((group) => {
            const fonts = normalizedQuery
              ? group.fonts.filter((font) => font.label.toLowerCase().includes(normalizedQuery))
              : group.fonts;
            return fonts.map((font) =>
              h(
                "button",
                {
                  key: font.value,
                  type: "button",
                  className: cx("composa-fonts-picker-row", font.value === selected && "is-selected"),
                  role: "menuitemradio",
                  "aria-checked": font.value === selected ? "true" : "false",
                  style: { fontFamily: font.face },
                  onClick: (event) => onSelect?.(font.value, font, event),
                },
                font.label
              )
            );
          })
        ),
      ]
    );
  }

  const typographyTabs = [
    { id: "basics", label: "Basics", value: "basics" },
    { id: "details", label: "Details", value: "details" },
    { id: "variable", label: "Variable", value: "variable" },
  ];

  // Basics-tab segment rows (Figma 99:5566). Each is a `SegmentedControl`
  // variant="icon" group; the first segment of the value-bearing rows is a
  // "none" dash so the control reads selected by default. Decoration adds a
  // trailing "underline details" overflow affordance.
  const typographyAlignOptions = [
    { value: "left", label: "Align left", icon: "textAlignLeft" },
    { value: "center", label: "Align center", icon: "textAlignCenter" },
    { value: "right", label: "Align right", icon: "textAlignRight" },
    { value: "justify", label: "Justify", icon: "textAlignJustify" },
  ];

  const typographyDecorationOptions = [
    { value: "none", label: "No decoration", icon: "textDecorationNone" },
    { value: "underline", label: "Underline", icon: "textUnderline" },
    { value: "strikethrough", label: "Strikethrough", icon: "textStrikethrough" },
  ];

  const typographyCaseOptions = [
    { value: "none", label: "Original case", icon: "textDecorationNone" },
    { value: "upper", label: "Uppercase", specimen: "AG" },
    { value: "lower", label: "Lowercase", specimen: "ag" },
    { value: "title", label: "Title case", specimen: "Ag" },
    { value: "small-caps", label: "Small caps", specimen: "Ag", specimenSmall: true },
  ];

  const typographyVerticalTrimOptions = [
    { value: "standard", label: "Standard trim", specimen: "Ag", boxed: true },
    { value: "cap-height", label: "Trim to cap height", specimen: "Ag" },
  ];

  const typographyListStyleOptions = [
    { value: "none", label: "No list", icon: "listStyleNone" },
    { value: "bulleted", label: "Bulleted list", icon: "listBulleted" },
    { value: "numbered", label: "Numbered list", icon: "listNumbered" },
  ];

  const typographyTruncateOptions = [
    { value: "none", label: "No truncation", icon: "truncateNone" },
    { value: "truncate", label: "Truncate text", icon: "truncate" },
  ];

  // A specimen segmented group: a row of 24px buttons where each segment shows a
  // text specimen (AG/ag/Ag) or a "none" dash icon, matching the case and
  // vertical-trim segments in Figma 99:5566 that render lettering rather than
  // Material icons. Mirrors SegmentedControl's icon-group geometry/active state.
  function TypographySpecimenSegmented({ label: groupLabel, name, defaultValue, options, onValueChange }) {
    const fallback = defaultValue ?? optionValue(options[0] || {}, 0);
    const [internalValue, setInternalValue] = React.useState(fallback);
    const handleSelect = (nextValue, option, index, event) => {
      setInternalValue(nextValue);
      onValueChange?.(nextValue, option, index, event);
    };
    return h(
      "div",
      {
        className: cx("composa-segmented-control", "composa-segmented-icon", "composa-typography-segmented", `composa-typography-segmented-${name}`),
        "data-composa-component": "SegmentedControl",
        "data-variant": "icon",
        "data-tab-count": String(options.length).padStart(2, "0"),
        role: "tablist",
        "aria-label": groupLabel,
      },
      options.map((option, index) => {
        const nextValue = optionValue(option, index);
        const selected = nextValue === internalValue;
        return h(
          "button",
          {
            key: option.value ?? index,
            type: "button",
            className: cx("composa-icon-button", "composa-icon-button-standard", "composa-icon-button-medium", "composa-typography-specimen-segment", selected && "is-selected"),
            "data-composa-component": "SegmentedControlItem",
            "data-value": nextValue,
            role: "tab",
            "aria-selected": selected ? "true" : "false",
            "aria-label": option.label,
            onClick: (event) => handleSelect(nextValue, option, index, event),
          },
          option.specimen
            ? h("span", { className: cx("composa-typography-segment-specimen", option.specimenSmall && "is-small", option.boxed && "is-boxed"), "aria-hidden": "true" }, option.specimen)
            : h("span", { className: "composa-icon-button-glyph" }, iconNode(h, Icon, option.icon))
        );
      })
    );
  }

  // A Basics-tab control row: an 11px label and a trailing segmented control.
  // Rows whose options carry a `specimen` use TypographySpecimenSegmented so the
  // Ag/AG/ag lettering renders; otherwise the shared icon SegmentedControl runs.
  function TypographyControlRow({ label: rowLabel, name, value, defaultValue, options, onValueChange, trailing }) {
    const hasSpecimen = options.some((option) => option.specimen);
    const control = hasSpecimen
      ? h(TypographySpecimenSegmented, { key: "segmented", label: rowLabel, name, defaultValue, options, onValueChange })
      : h(SegmentedControl, {
          key: "segmented",
          label: rowLabel,
          variant: "icon",
          value,
          defaultValue,
          className: cx("composa-typography-segmented", `composa-typography-segmented-${name}`),
          options,
          onValueChange,
        });
    return h("div", { className: "composa-typography-control-row", "data-composa-component": "TypographyControlRow", "data-control": name }, [
      h("span", { key: "label", className: "composa-typography-control-label" }, rowLabel),
      h("div", { key: "control", className: "composa-typography-control-cluster" }, [control, trailing || null]),
    ]);
  }

  // OpenType on/off toggle (Figma Details tab 99:9688). A two-segment icon group
  // — a "dash" off segment and a "check" on segment — sharing the same grouped
  // #f5f5f5 surface as the other Basics/Details segments, so a feature reads
  // either disabled (dash lifted) or enabled (check lifted).
  const typographyToggleOptions = [
    { value: "off", label: "Off", icon: "dash" },
    { value: "on", label: "On", icon: "check" },
  ];

  // Details "Numbers" multi-icon segments. Style picks the numeral set
  // (lining / oldstyle / tabular); Position picks normal / superscript /
  // subscript. Material glyphs stand in for the figure variants.
  const typographyNumberStyleOptions = [
    { value: "normal", label: "Default figures", icon: "dash" },
    { value: "oldstyle", label: "Oldstyle figures", icon: "numberOldstyle" },
    { value: "tabular", label: "Tabular figures", icon: "numberTabular" },
  ];

  const typographyNumberPositionOptions = [
    { value: "normal", label: "Normal position", icon: "dash" },
    { value: "superscript", label: "Superscript", icon: "numberSuperscript" },
    { value: "subscript", label: "Subscript", icon: "numberSubscript" },
  ];

  // A labelled on/off OpenType row: an 11px label and the two-segment dash/check
  // toggle pinned to the trailing edge. Controlled via value + onChange.
  function TypographyToggleRow({ label: rowLabel, name, value, defaultValue = "off", onValueChange }) {
    return h(TypographyControlRow, {
      label: rowLabel,
      name,
      value,
      defaultValue,
      options: typographyToggleOptions,
      onValueChange,
    });
  }

  // A labelled numeric row (Paragraph indent): an 11px label and a compact 72px
  // numeric field, matching the Basics paragraph-spacing field geometry.
  function TypographyNumberRow({ label: rowLabel, name, value, onValueChange }) {
    return h("div", { className: "composa-typography-control-row", "data-composa-component": "TypographyControlRow", "data-control": name }, [
      h("span", { key: "label", className: "composa-typography-control-label" }, rowLabel),
      h(InputField, {
        key: "input",
        label: rowLabel,
        value,
        variant: "numeric",
        className: "composa-typography-paragraph-input",
        onChange: (event) => onValueChange?.(event.currentTarget?.value, event),
      }),
    ]);
  }

  // A titled fieldset for the Details tab: an 11px semibold legend, the stacked
  // rows, and a shared edge-to-edge divider beneath every set except the last.
  function TypographyFieldset({ legend, children, last = false }) {
    return h("div", { className: cx("composa-typography-fieldset", last && "is-last"), "data-composa-component": "TypographyFieldset", role: "group", "aria-label": legend }, [
      h("div", { key: "legend", className: "composa-typography-legend" }, legend),
      h("div", { key: "rows", className: "composa-typography-fieldset-rows" }, children),
    ]);
  }

  // Variable-font axis slider (Typography Variable tab). A label, a value field,
  // and a horizontal track with a draggable thumb. `step` makes it discrete:
  // the track then shows evenly-spaced stop dots (one per step) with the active
  // stop highlighted, matching the Weight axis in the founder's reference; an
  // unset `step` gives the continuous Slant track. Controlled via value/onChange.
  function TypographyAxisSlider({ label: axisLabel, name, value, min = 0, max = 100, step, onChange }) {
    const numericValue = Number.isFinite(Number(value)) ? Number(value) : min;
    const span = max - min || 1;
    const clamp = (next) => Math.min(max, Math.max(min, next));
    const snap = (next) => (step ? Math.round((next - min) / step) * step + min : next);
    const pct = clampOverlayValue((numericValue - min) / span, 0, 1) * 100;
    const commit = (next, event) => {
      const resolved = clamp(snap(next));
      onChange?.(String(resolved), event);
    };
    const handlePick = useAreaPointer((x) => commit(min + x * span));
    const stops = step ? Math.round(span / step) + 1 : 0;
    return h("div", { className: "composa-typography-axis", "data-composa-component": "TypographyAxisSlider", "data-axis": name }, [
      h("div", { key: "head", className: "composa-typography-axis-head" }, [
        h("span", { key: "label", className: "composa-typography-axis-label" }, axisLabel),
        h(InputField, {
          key: "value",
          label: axisLabel,
          value: String(numericValue),
          variant: "numeric",
          className: "composa-typography-axis-input",
          onChange: (event) => {
            const next = Number(event.currentTarget?.value);
            if (Number.isFinite(next)) commit(next, event);
          },
        }),
      ]),
      h(
        "div",
        {
          key: "track",
          className: cx("composa-typography-axis-track", step && "is-stepped"),
          role: "slider",
          tabIndex: 0,
          "aria-label": axisLabel,
          "aria-valuemin": min,
          "aria-valuemax": max,
          "aria-valuenow": numericValue,
          onPointerDown: handlePick,
          onKeyDown: (event) => {
            const delta = step || (max - min) / 100;
            if (event.key === "ArrowRight" || event.key === "ArrowUp") { commit(numericValue + delta, event); event.preventDefault(); }
            else if (event.key === "ArrowLeft" || event.key === "ArrowDown") { commit(numericValue - delta, event); event.preventDefault(); }
          },
        },
        [
          h("span", { key: "fill", className: "composa-typography-axis-fill", style: { width: `${pct}%` } }),
          step
            ? h(
                "span",
                { key: "stops", className: "composa-typography-axis-stops", "aria-hidden": "true" },
                Array.from({ length: stops }, (_, index) => {
                  const stopValue = min + index * step;
                  return h("span", {
                    key: index,
                    className: cx("composa-typography-axis-stop", stopValue <= numericValue && "is-active"),
                    style: { left: `${(index / (stops - 1 || 1)) * 100}%` },
                  });
                })
              )
            : null,
          h("span", { key: "thumb", className: "composa-typography-axis-thumb", style: { left: `${pct}%` } }),
        ]
      ),
    ]);
  }

  function TypographyDialog({
    label = "Typography",
    tab = "basics",
    fontFamily = "Inter",
    fontStyle = "Regular",
    fontSize = "16",
    lineHeight = "Auto",
    letterSpacing = "0",
    align = "left",
    decoration = "none",
    textCase = "none",
    verticalTrim = "standard",
    listStyle = "none",
    paragraphSpacing = "0",
    truncate = "none",
    previewText = "Preview",
    typeStyle,
    // Variable tab — variable-font axis values.
    slant = "0",
    weight = "500",
    // Details tab — OpenType feature values.
    details = {},
    onTabChange,
    onFontFamilyChange,
    onFontStyleChange,
    onFontSizeChange,
    onLineHeightChange,
    onLetterSpacingChange,
    onAlignChange,
    onDecorationChange,
    onCaseChange,
    onVerticalTrimChange,
    onListStyleChange,
    onParagraphSpacingChange,
    onTruncateChange,
    onTypeStyleChange,
    onSlantChange,
    onWeightChange,
    onDetailChange,
    onClose,
    className = "",
    ...props
  }) {
    const [internalTab, setInternalTab] = React.useState(propToken(tab));
    const [internalAlign, setInternalAlign] = React.useState(propToken(align));
    const [internalFamily, setInternalFamily] = React.useState(fontFamily);
    const [internalStyle, setInternalStyle] = React.useState(fontStyle);
    const [internalTypeStyle, setInternalTypeStyle] = React.useState(typeStyle);
    const [fontsOpen, setFontsOpen] = React.useState(false);
    const familyRef = React.useRef(null);
    const fontsOverlayId = React.useId();
    React.useEffect(() => setInternalTab(propToken(tab)), [tab]);
    React.useEffect(() => setInternalAlign(propToken(align)), [align]);
    React.useEffect(() => setInternalFamily(fontFamily), [fontFamily]);
    React.useEffect(() => setInternalStyle(fontStyle), [fontStyle]);
    React.useEffect(() => setInternalTypeStyle(typeStyle), [typeStyle]);
    React.useEffect(() => {
      if (!fontsOpen) return undefined;
      const handlePointerDown = (event) => {
        if (familyRef.current?.contains(event.target)) return;
        if (event.target?.closest?.(`[data-composa-overlay-owner="${fontsOverlayId}"]`)) return;
        if (event.target?.closest?.(".composa-overlay-layer-portal")) return;
        setFontsOpen(false);
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [fontsOpen, fontsOverlayId]);

    const selectTab = (nextTab, tabObj, _index, event) => {
      setInternalTab(nextTab);
      onTabChange?.(nextTab, tabObj, event);
    };

    const basicsBody = [
      // Family + style + size/line-height/letter-spacing live in the preview
      // block so the Basics tab opens on the most-used metrics.
      h("div", { key: "metrics-group", className: "composa-typography-section" }, [
        h("div", { key: "family", ref: familyRef, className: "composa-typography-family" }, [
          h("button", {
            key: "family-trigger",
            type: "button",
            className: cx("composa-typography-family-trigger", fontsOpen && "is-selected"),
            "aria-haspopup": "menu",
            "aria-expanded": fontsOpen ? "true" : "false",
            "aria-label": "Font family",
            onClick: () => setFontsOpen((value) => !value),
          }, [
            h("span", { key: "value", className: "composa-typography-family-value" }, internalFamily),
            h("span", { key: "chevron", className: "composa-typography-family-chevron", "aria-hidden": "true" }, iconNode(h, Icon, "chevronDown")),
          ]),
          fontsOpen
            ? h(
                OverlayPortal,
                { key: "fonts-layer", anchorRef: familyRef, placement: "inspector-dialog", align: "end", followAnchor: false, className: "composa-fonts-picker-layer", "data-composa-overlay-owner": fontsOverlayId },
                h(FontsPickerMenu, {
                  selected: internalFamily,
                  onClose: () => setFontsOpen(false),
                  onSelect: (nextValue, font, event) => {
                    setInternalFamily(nextValue);
                    setFontsOpen(false);
                    onFontFamilyChange?.(nextValue, font, event);
                  },
                })
              )
            : null,
        ]),
        h("div", { key: "style-row", className: "composa-typography-row" }, [
          h("span", { key: "label", className: "composa-typography-label" }, "Style"),
          h(Dropdown, {
            key: "style",
            label: "Font style",
            value: internalStyle,
            width: "fill",
            options: ["Thin", "Light", "Regular", "Medium", "Semi Bold", "Bold", "Black"],
            className: "composa-typography-field",
            menuClassName: "composa-typography-style-menu",
            onValueChange: (nextStyle, _option, event) => {
              setInternalStyle(nextStyle);
              onFontStyleChange?.(nextStyle, event);
            },
          }),
        ]),
        h("div", { key: "metrics", className: "composa-typography-metrics" }, [
          h("div", { key: "size", className: "composa-typography-metric-field" }, [
            h("span", { key: "label", className: "composa-typography-metric-label" }, "Size"),
            h(InputField, { key: "input", label: "Font size", value: fontSize, variant: "numeric", icon: "text", iconLead: true, width: "fill", className: "composa-typography-input", onChange: (event) => onFontSizeChange?.(event.currentTarget?.value, event) }),
          ]),
          h("div", { key: "line", className: "composa-typography-metric-field" }, [
            h("span", { key: "label", className: "composa-typography-metric-label" }, "Line height"),
            h(InputField, { key: "input", label: "Line height", value: lineHeight, icon: "lineHeight", iconLead: true, width: "fill", className: "composa-typography-input", onChange: (event) => onLineHeightChange?.(event.currentTarget?.value, event) }),
          ]),
          h("div", { key: "letter", className: "composa-typography-metric-field" }, [
            h("span", { key: "label", className: "composa-typography-metric-label" }, "Letter spacing"),
            h(InputField, { key: "input", label: "Letter spacing", value: letterSpacing, variant: "numeric", icon: "letterSpacing", iconLead: true, width: "fill", className: "composa-typography-input", onChange: (event) => onLetterSpacingChange?.(event.currentTarget?.value, event) }),
          ]),
        ]),
      ]),
      // Section 1: Alignment / Decoration / Case (Figma 99:5598).
      h("div", { key: "section-1", className: "composa-typography-section composa-typography-section-divided" }, [
        h(TypographyControlRow, {
          key: "alignment",
          label: "Alignment",
          name: "alignment",
          value: internalAlign,
          options: typographyAlignOptions,
          onValueChange: (nextAlign, _option, _index, event) => {
            setInternalAlign(nextAlign);
            onAlignChange?.(nextAlign, event);
          },
        }),
        h(TypographyControlRow, {
          key: "decoration",
          label: "Decoration",
          name: "decoration",
          defaultValue: propToken(decoration),
          options: typographyDecorationOptions,
          onValueChange: (next, _option, _index, event) => onDecorationChange?.(next, event),
          trailing: h(IconButton, {
            key: "underline-details",
            icon: "textUnderlineDetails",
            size: "small",
            variant: "ghost",
            label: "Underline details",
            tooltipPlacement: "top-right",
            className: "composa-typography-underline-details",
          }),
        }),
        h(TypographyControlRow, {
          key: "case",
          label: "Case",
          name: "case",
          defaultValue: propToken(textCase),
          options: typographyCaseOptions,
          onValueChange: (next, _option, _index, event) => onCaseChange?.(next, event),
        }),
      ]),
      // Section 2: Vertical trim / List style / Paragraph spacing / Truncate.
      h("div", { key: "section-2", className: "composa-typography-section composa-typography-section-secondary" }, [
        h(TypographyControlRow, {
          key: "vertical-trim",
          label: "Vertical trim",
          name: "vertical-trim",
          defaultValue: propToken(verticalTrim),
          options: typographyVerticalTrimOptions,
          onValueChange: (next, _option, _index, event) => onVerticalTrimChange?.(next, event),
        }),
        h(TypographyControlRow, {
          key: "list-style",
          label: "List style",
          name: "list-style",
          defaultValue: propToken(listStyle),
          options: typographyListStyleOptions,
          onValueChange: (next, _option, _index, event) => onListStyleChange?.(next, event),
        }),
        h("div", { key: "paragraph", className: "composa-typography-control-row", "data-control": "paragraph-spacing" }, [
          h("span", { key: "label", className: "composa-typography-control-label" }, "Paragraph spacing"),
          h(InputField, { key: "input", label: "Paragraph spacing", value: paragraphSpacing, variant: "numeric", className: "composa-typography-paragraph-input", onChange: (event) => onParagraphSpacingChange?.(event.currentTarget?.value, event) }),
        ]),
        h(TypographyControlRow, {
          key: "truncate",
          label: "Truncate text",
          name: "truncate",
          defaultValue: propToken(truncate),
          options: typographyTruncateOptions,
          onValueChange: (next, _option, _index, event) => onTruncateChange?.(next, event),
        }),
      ]),
    ];

    // Variable tab (Typography Variable panel). Two variable-font axes: a
    // continuous Slant track and a stepped Weight track (one stop per 100,
    // 100..900). Controlled per axis.
    const variableBody = [
      h("div", { key: "axes", className: "composa-typography-axes" }, [
        h(TypographyAxisSlider, {
          key: "slant",
          label: "Slant",
          name: "slant",
          value: slant,
          min: -15,
          max: 15,
          onChange: (next, event) => onSlantChange?.(next, event),
        }),
        h(TypographyAxisSlider, {
          key: "weight",
          label: "Weight",
          name: "weight",
          value: weight,
          min: 100,
          max: 900,
          step: 100,
          onChange: (next, event) => onWeightChange?.(next, event),
        }),
      ]),
    ];

    // Details tab (Figma 99:9688). OpenType feature fieldsets: Indentation,
    // Letter case, Numbers, Letterforms, Stylistic sets, Character variants,
    // Horizontal spacing, More features. Each toggle row is a dash/check
    // segment; Case reuses the Basics 5-segment specimen; Numbers Style/Position
    // are multi-icon segments. Every value reads from `details[...]` and writes
    // back through onDetailChange(key, value).
    const detailValue = (key, fallback = "off") => details?.[key] ?? fallback;
    const emitDetail = (key) => (next, _option, _index, event) => onDetailChange?.(key, next, event);
    const toggleRow = (key, rowLabel) =>
      h(TypographyToggleRow, { key, name: key, label: rowLabel, value: detailValue(key), onValueChange: emitDetail(key) });

    const detailsBody = [
      h(TypographyFieldset, { key: "indentation", legend: "Indentation" }, [
        toggleRow("hangingPunctuation", "Hanging punctuation"),
        toggleRow("hangingLists", "Hanging lists"),
        h(TypographyNumberRow, {
          key: "paragraphIndent",
          name: "paragraph-indent",
          label: "Paragraph indent",
          value: detailValue("paragraphIndent", "0"),
          onValueChange: (next, event) => onDetailChange?.("paragraphIndent", next, event),
        }),
      ]),
      h(TypographyFieldset, { key: "letter-case", legend: "Letter case" }, [
        h(TypographyControlRow, {
          key: "case",
          name: "case",
          label: "Case",
          defaultValue: detailValue("case", "none"),
          options: typographyCaseOptions,
          onValueChange: emitDetail("case"),
        }),
        toggleRow("caseSensitiveForms", "Case-sensitive forms"),
        toggleRow("capitalSpacing", "Capital spacing"),
      ]),
      h(TypographyFieldset, { key: "numbers", legend: "Numbers" }, [
        h(TypographyControlRow, {
          key: "number-style",
          name: "number-style",
          label: "Style",
          defaultValue: detailValue("numberStyle", "normal"),
          options: typographyNumberStyleOptions,
          onValueChange: emitDetail("numberStyle"),
        }),
        h(TypographyControlRow, {
          key: "number-position",
          name: "number-position",
          label: "Position",
          defaultValue: detailValue("numberPosition", "normal"),
          options: typographyNumberPositionOptions,
          onValueChange: emitDetail("numberPosition"),
        }),
        toggleRow("fractions", "Fractions"),
        toggleRow("slashedZero", "Slashed zero"),
      ]),
      h(TypographyFieldset, { key: "letterforms", legend: "Letterforms" }, [
        toggleRow("rareLigatures", "Rare ligatures"),
        toggleRow("contextualAlternates", "Contextual alternates"),
        toggleRow("ordinals", "Ordinals"),
      ]),
      h(TypographyFieldset, { key: "stylistic-sets", legend: "Stylistic sets" }, [
        toggleRow("stylisticAlternates", "Stylistic alternates"),
        toggleRow("openDigits", "Open digits"),
        toggleRow("disambiguation", "Disambiguation"),
        toggleRow("rRoundNeighbors", "r curves into round neighbors"),
        toggleRow("disambiguationNoZero", "Disambiguation without slashed zero"),
      ]),
      h(TypographyFieldset, { key: "character-variants", legend: "Character variants" }, [
        toggleRow("alternateOne", "Alternate one"),
        toggleRow("openFour", "Open four"),
        toggleRow("openSix", "Open six"),
        toggleRow("openNine", "Open nine"),
        toggleRow("lTail", "Lower-case L with tail"),
        toggleRow("rCurvedTail", "r with curved tail"),
        toggleRow("germanDoubleS", "Alternate German double s"),
        toggleRow("iSerif", "Upper-case i with serif"),
        toggleRow("flatTopThree", "Flat-top three"),
        toggleRow("gSpur", "Capital G with spur"),
        toggleRow("singleStoreyA", "Single-storey a"),
      ]),
      h(TypographyFieldset, { key: "horizontal-spacing", legend: "Horizontal spacing" }, [
        toggleRow("kerningPairs", "Kerning pairs"),
      ]),
      h(TypographyFieldset, { key: "more-features", legend: "More features", last: true }, [
        toggleRow("fractionDenominators", "Fraction denominators"),
        toggleRow("fractionNumerators", "Fraction numerators"),
        toggleRow("scientificInferiors", "Scientific inferiors"),
      ]),
    ];

    return h(
      "div",
      {
        ...props,
        className: cx("composa-typography-dialog", className),
        "data-composa-component": "TypographyDialog",
        "data-tab": internalTab,
        role: "dialog",
        "aria-label": label,
        onPointerDown: (event) => event.stopPropagation(),
      },
      [
        h("div", { key: "header", className: "composa-typography-header" }, [
          h(Tabs, {
            key: "tabs",
            tabs: typographyTabs,
            value: internalTab,
            variant: "pill",
            divider: false,
            label: "Typography tabs",
            className: "composa-typography-tabs",
            onValueChange: selectTab,
          }),
          h(IconButton, { key: "close", icon: "close", label: "Close typography settings", tooltip: false, variant: "ghost", className: "composa-typography-close", onClick: onClose }),
        ]),
        h("div", { key: "preview", className: "composa-typography-preview", "aria-hidden": "true" },
          h("span", { className: "composa-typography-preview-text", style: { fontFamily: internalFamily } }, previewText)
        ),
        internalTab === "basics"
          ? h("div", { key: "basics-body", className: "composa-typography-body" }, basicsBody)
          : internalTab === "variable"
            ? h("div", { key: "variable-body", className: "composa-typography-body composa-typography-body-variable" }, variableBody)
            : h("div", { key: "details-body", className: "composa-typography-body composa-typography-body-details" }, detailsBody),
      ]
    );
  }

  const layoutGuideTypeOptions = [
    { value: "columns", label: "Columns", icon: "layoutGuideColumns" },
    { value: "rows", label: "Rows", icon: "layoutGuideRows" },
    { value: "grid", label: "Grid", icon: "layoutGuideGrid" },
  ];

  function LayoutGuideSettingsDialog({
    label = "Layout guide",
    guideType = "columns",
    count = "5",
    color = "FF0000",
    opacity = "10",
    behavior = "Stretch",
    size = "Auto",
    margin = "0",
    gutter = "20",
    onGuideTypeChange,
    onCountChange,
    onColorChange,
    onOpacityChange,
    onBehaviorChange,
    onSizeChange,
    onMarginChange,
    onGutterChange,
    onClose,
    className = "",
    ...props
  }) {
    const [internalType, setInternalType] = React.useState(propToken(guideType));
    const [internalBehavior, setInternalBehavior] = React.useState(behavior);
    React.useEffect(() => setInternalType(propToken(guideType)), [guideType]);
    React.useEffect(() => setInternalBehavior(behavior), [behavior]);
    const isGrid = internalType === "grid";
    const sizeLabel = internalType === "rows" ? "Height" : "Width";
    const selectedType = layoutGuideTypeOptions.find((option) => option.value === internalType) ?? layoutGuideTypeOptions[0];
    const colorHex = normalizeHex(color) ?? "FF0000";

    const settingRow = (rowLabel, control, { key, muted = false } = {}) =>
      h("div", { key: key ?? rowLabel, className: cx("composa-layout-guide-row", muted && "is-muted") }, [
        h("span", { key: "label", className: "composa-layout-guide-label" }, rowLabel),
        control,
      ]);

    return h(
      "div",
      {
        ...props,
        className: cx("composa-layout-guide-dialog", className),
        "data-composa-component": "LayoutGuideSettingsDialog",
        "data-guide-type": internalType,
        role: "dialog",
        "aria-label": label,
        onPointerDown: (event) => event.stopPropagation(),
      },
      [
        h("div", { key: "header", className: "composa-layout-guide-header" }, [
          h(Dropdown, {
            key: "type",
            label: "Guide type",
            value: selectedType.label,
            icon: selectedType.icon,
            iconLead: true,
            options: layoutGuideTypeOptions,
            className: "composa-layout-guide-type",
            menuClassName: "composa-layout-guide-type-menu",
            onValueChange: (nextType, _option, event) => {
              setInternalType(nextType);
              onGuideTypeChange?.(nextType, event);
            },
          }),
          h(IconButton, { key: "close", icon: "close", label: "Close layout guide settings", tooltip: false, variant: "ghost", className: "composa-layout-guide-close", onClick: onClose }),
        ]),
        settingRow(
          "Count",
          h(InputField, { key: "count", label: "Guide count", value: count, variant: "numeric", dropdown: true, width: "fill", className: "composa-layout-guide-field", onChange: (event) => onCountChange?.(event.currentTarget?.value, event) }),
          { key: "count" }
        ),
        settingRow(
          "Color",
          h("div", { key: "color", className: "composa-layout-guide-color" }, [
            h(ColorPickerTrigger, { key: "swatch", label: "Guide color", value: colorHex, dialogProps: { value: colorHex, opacity, onValueChange: onColorChange, onOpacityChange }, className: "composa-layout-guide-color-trigger" }),
            h(InputField, { key: "hex", label: "Guide color hex", value: colorHex, width: "fill", className: "composa-layout-guide-color-hex", onChange: (event) => onColorChange?.(event.currentTarget?.value, event) }),
            h(InputField, { key: "opacity", label: "Guide opacity", value: opacity, suffix: "%", variant: "numeric", className: "composa-layout-guide-color-opacity", onChange: (event) => onOpacityChange?.(event.currentTarget?.value, event) }),
          ]),
          { key: "color" }
        ),
        isGrid
          ? null
          : settingRow(
              "Type",
              h(Dropdown, {
                key: "behavior",
                label: "Guide behavior",
                value: internalBehavior,
                width: "fill",
                options: ["Stretch", "Left", "Center", "Right"],
                className: "composa-layout-guide-field",
                menuClassName: "composa-layout-guide-behavior-menu",
                onValueChange: (nextBehavior, _option, event) => {
                  setInternalBehavior(nextBehavior);
                  onBehaviorChange?.(nextBehavior, event);
                },
              }),
              { key: "behavior" }
            ),
        isGrid
          ? null
          : settingRow(
              sizeLabel,
              h(InputField, { key: "size", label: `Guide ${sizeLabel.toLowerCase()}`, value: size, placeholder: "Auto", width: "fill", className: "composa-layout-guide-field", onChange: (event) => onSizeChange?.(event.currentTarget?.value, event) }),
              { key: "size", muted: size === "Auto" }
            ),
        settingRow(
          isGrid ? "Size" : "Margin",
          h(InputField, { key: "margin", label: isGrid ? "Grid size" : "Margin", value: isGrid ? gutter : margin, variant: "numeric", width: "fill", className: "composa-layout-guide-field", onChange: (event) => (isGrid ? onGutterChange : onMarginChange)?.(event.currentTarget?.value, event) }),
          { key: "margin" }
        ),
        isGrid
          ? null
          : settingRow(
              "Gutter",
              h(InputField, { key: "gutter", label: "Gutter", value: gutter, variant: "numeric", width: "fill", className: "composa-layout-guide-field", onChange: (event) => onGutterChange?.(event.currentTarget?.value, event) }),
              { key: "gutter" }
            ),
      ]
    );
  }

  function SelectionColorsSection(props) {
    return h(PaintSection, {
      title: "Selection colors",
      componentName: "SelectionColorsSection",
      defaultItems: [
        { id: "black", type: "Selection color", label: "Black", value: "#000000" },
        { id: "white", type: "Selection color", label: "White", value: "#ffffff" },
      ],
      showStylesAction: false,
      showAddAction: false,
      hideWhenEmpty: true,
      renderCollapsedActions: ({ items, onExpand }) => h(SelectionColorSummary, { items, onClick: onExpand }),
      renderItem: renderSelectionColorRow,
      ...props,
    });
  }

  function LayoutGuideSection(props) {
    return h(PaintSection, {
      title: "Layout guide",
      componentName: "LayoutGuideSection",
      defaultItems: [
        { id: "row", label: "Rows", value: "1 row", icon: "layoutGuideRows", settingsIcon: "layoutGuideRows" },
      ],
      renderItem: renderLayoutGuideRow,
      ...props,
    });
  }

  function ExportPreviewDisclosure({ defaultOpen = false }) {
    const [open, setOpen] = React.useState(Boolean(defaultOpen));
    const previewId = React.useId();
    return h(
      "div",
      { className: "composa-export-preview", "data-composa-component": "ExportPreviewRow", "data-open": boolData(open) },
      [
        h(
          "button",
          {
            key: "toggle",
            type: "button",
            className: "composa-export-preview-row",
            "aria-expanded": open ? "true" : "false",
            "aria-controls": previewId,
            onClick: () => setOpen((value) => !value),
          },
          [
            h("span", { key: "icon", className: "composa-export-preview-icon", "aria-hidden": "true" }, iconNode(h, Icon, open ? "chevronDown" : "chevronRight")),
            h("span", { key: "label", className: "composa-export-preview-label" }, "Preview"),
          ]
        ),
        open
          ? h("div", { key: "panel", id: previewId, className: "composa-export-preview-panel" }, h("div", { className: "composa-export-preview-thumb", "aria-hidden": "true" }))
          : null,
      ]
    );
  }

  function ExportSection(props) {
    return h(PaintSection, {
      title: "Export",
      componentName: "ExportSection",
      defaultItems: [{ id: "export-1", scale: "1x", format: "PNG" }],
      showStylesAction: false,
      renderItem: renderExportRow,
      renderFooter: () => [
        h("div", { key: "export-action", className: "composa-export-action-row", "data-composa-component": "ExportActionRow" }, h(Button, { label: "Export Untitled", variant: "secondary", size: "small", width: "fill", className: "composa-export-action-button" })),
        h(ExportPreviewDisclosure, { key: "preview" }),
      ],
      ...props,
    });
  }

  const blendModeGroups = [
    ["Pass through", "Normal"],
    ["Darken", "Multiply", "Plus darker", "Color burn"],
    ["Lighten", "Screen", "Plus lighter", "Color dodge"],
    ["Overlay", "Soft light", "Hard light"],
    ["Difference", "Exclusion"],
    ["Hue", "Saturation", "Color", "Luminosity"],
  ];

  function BlendModeMenu({ selected = "Pass through", onSelect }) {
    return h(
      "div",
      { className: "composa-blend-mode-menu", "data-composa-component": "BlendModeMenu", role: "menu", "aria-label": "Blend mode" },
      blendModeGroups.map((group, groupIndex) =>
        h(
          "div",
          { key: `group-${groupIndex}`, className: "composa-blend-mode-group", role: "group" },
          group.map((mode) =>
            h(
              "button",
              {
                key: mode,
                type: "button",
                className: cx("composa-blend-mode-item", mode === selected && "is-selected"),
                role: "menuitemradio",
                "aria-checked": boolData(mode === selected),
                onClick: (event) => onSelect?.(mode, event),
              },
              [
                mode === selected ? h("span", { key: "check", className: "composa-blend-mode-check", "aria-hidden": "true" }, iconNode(h, Icon, "check")) : h("span", { key: "spacer", className: "composa-blend-mode-check", "aria-hidden": "true" }),
                h("span", { key: "label", className: "composa-blend-mode-label" }, mode),
              ]
            )
          )
        )
      )
    );
  }

  function AppearanceSection({
    opacity = "100%",
    cornerRadius = "0",
    visible = true,
    blendMode = "Pass through",
    blendMenuOpen = false,
    individualCorners = false,
    onOpacityChange,
    onCornerRadiusChange,
    onVisibilityToggle,
    onBlendModeToggle,
    onBlendModeChange,
    onIndividualCornersToggle,
    className = "",
    ...props
  }) {
    const [internalVisible, setInternalVisible] = React.useState(visible);
    const [internalBlendMenuOpen, setInternalBlendMenuOpen] = React.useState(blendMenuOpen);
    const [internalBlendMode, setInternalBlendMode] = React.useState(blendMode);
    const [internalIndividualCorners, setInternalIndividualCorners] = React.useState(individualCorners);
    const sectionRef = React.useRef(null);
    const blendOverlayId = React.useId();

    React.useEffect(() => setInternalVisible(visible), [visible]);
    React.useEffect(() => setInternalBlendMenuOpen(blendMenuOpen), [blendMenuOpen]);
    React.useEffect(() => setInternalBlendMode(blendMode), [blendMode]);
    React.useEffect(() => setInternalIndividualCorners(individualCorners), [individualCorners]);
    React.useEffect(() => {
      if (!internalBlendMenuOpen) return undefined;
      const handlePointerDown = (event) => {
        if (sectionRef.current?.contains(event.target)) return;
        if (event.target?.closest?.(`[data-composa-overlay-owner="${blendOverlayId}"]`)) return;
        setInternalBlendMenuOpen(false);
        onBlendModeToggle?.(false, event);
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [blendOverlayId, internalBlendMenuOpen, onBlendModeToggle]);

    const handleVisibilityToggle = (event) => {
      const nextVisible = !internalVisible;
      setInternalVisible(nextVisible);
      onVisibilityToggle?.(nextVisible, event);
    };
    const handleBlendModeToggle = (event) => {
      const nextOpen = !internalBlendMenuOpen;
      setInternalBlendMenuOpen(nextOpen);
      onBlendModeToggle?.(nextOpen, event);
    };
    const handleBlendModeSelect = (nextMode, event) => {
      setInternalBlendMode(nextMode);
      setInternalBlendMenuOpen(false);
      onBlendModeChange?.(nextMode, event);
    };
    const handleIndividualCornersToggle = (event) => {
      const nextValue = !internalIndividualCorners;
      setInternalIndividualCorners(nextValue);
      onIndividualCornersToggle?.(nextValue, event);
    };
    const handleBlendModeRemove = (event) => {
      setInternalBlendMode("Pass through");
      setInternalBlendMenuOpen(false);
      onBlendModeChange?.("Pass through", event);
    };
    const blendIcon = internalBlendMode === "Pass through" ? "blendMode" : "blendModeActive";
    const showsBlendValue = internalBlendMode !== "Pass through";

    return h(
      "section",
      {
        ...props,
        ref: sectionRef,
        className: cx("composa-appearance-section", className),
        "data-composa-component": "AppearanceSection",
        "data-visible": boolData(internalVisible),
        "data-blend-menu-open": boolData(internalBlendMenuOpen),
        "aria-label": props["aria-label"] || "Appearance",
      },
      [
        h("header", { key: "header", className: "composa-appearance-header" }, [
          h("h3", { key: "title", className: "composa-appearance-title" }, "Appearance"),
          h(HeaderActions, { key: "actions", className: "composa-appearance-header-actions", label: "Appearance actions" }, [
            h(IconButton, { key: "visible", icon: internalVisible ? "eyeSmall" : "eyeSlash", label: internalVisible ? "Hide" : "Show", tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: handleVisibilityToggle }),
            h(IconButton, { key: "blend", icon: blendIcon, label: "Blend mode", selected: internalBlendMenuOpen, tooltipPlacement: "top-right", className: "composa-header-icon-action", onClick: handleBlendModeToggle }),
          ]),
        ]),
        h("div", { key: "fields", className: "composa-appearance-fieldset", "data-composa-component": "AppearanceFields" }, [
          h("div", { key: "opacity", className: "composa-appearance-field" }, [
            h("span", { key: "label", className: "composa-appearance-field-label" }, "Opacity"),
            // The opacity field shows an editable value ("100%"), so it must
            // expose a setter — without onOpacityChange the InputField renders
            // read-only (a value the consumer cannot drive). Surfaced as the
            // string value + raw event so the app owns parsing.
            h(InputField, {
              key: "input",
              label: "Opacity",
              value: opacity,
              variant: "Numeric",
              icon: "blendMode",
              iconLead: true,
              className: "composa-appearance-input",
              onChange: onOpacityChange ? (event) => onOpacityChange(event.currentTarget.value, event) : undefined,
            }),
          ]),
          h("div", { key: "corner-radius", className: "composa-appearance-field" }, [
            h("span", { key: "label", className: "composa-appearance-field-label" }, "Corner radius"),
            h(InputField, {
              key: "input",
              label: "Corner radius",
              value: cornerRadius,
              variant: "Numeric",
              icon: "cornerRadius",
              iconLead: true,
              className: "composa-appearance-input",
              onChange: onCornerRadiusChange ? (event) => onCornerRadiusChange(event.currentTarget.value, event) : undefined,
            }),
          ]),
          h(IconButton, { key: "individual-corners", icon: "individualCorners", label: "Individual corners", selected: internalIndividualCorners, tooltipPlacement: "top-right", className: "composa-appearance-corners-action", onClick: handleIndividualCornersToggle }),
        ]),
        showsBlendValue
          ? h("div", { key: "blend-value", className: "composa-appearance-blend-row", "data-composa-component": "AppearanceBlendModeRow" }, [
              h("span", { key: "label", className: "composa-appearance-field-label" }, "Blend mode"),
              h(Dropdown, {
                key: "value",
                label: `Blend mode: ${internalBlendMode}`,
                value: internalBlendMode,
                icon: blendIcon,
                iconLead: true,
                width: "fill",
                className: "composa-appearance-blend-dropdown",
                onClick: handleBlendModeToggle,
              }),
              h(IconButton, {
                key: "remove",
                icon: "minus",
                label: "Remove blend mode",
                tooltipPlacement: "top-right",
                className: "composa-header-icon-action composa-appearance-blend-remove",
                onClick: handleBlendModeRemove,
              }),
            ])
          : null,
        internalBlendMenuOpen
          ? h(
              OverlayPortal,
              { key: "blend-menu-layer", anchorRef: sectionRef, placement: "bottom-right", align: "end", className: "composa-blend-mode-menu-layer", "data-composa-overlay-owner": blendOverlayId },
              h(BlendModeMenu, { selected: internalBlendMode, onSelect: handleBlendModeSelect })
            )
          : null,
      ]
    );
  }

  const editingInspectorSelectionColors = [
    { id: "black", type: "Selection color", label: "Black", value: "#000000", selectionCount: 1 },
    { id: "white", type: "Selection color", label: "White", value: "#ffffff", selectionCount: 2 },
    { id: "blue", type: "Selection color", label: "Blue", value: "#0d99ff", selectionCount: 1 },
    { id: "green", type: "Selection color", label: "Green", value: "#14ae5c", selectionCount: 1 },
    { id: "red", type: "Selection color", label: "Red", value: "#f24822", selectionCount: 1 },
  ];

  /**
   * Full inspector panel. Its tooltips, dropdown menus, and floating
   * inspector-dialogs all portal through `OverlayPortal`, so the inspector
   * REQUIRES an `OverlayHost` ancestor (wrap the scrollable inspector template
   * in `OverlayHost`). Without it, transient surfaces clip inside scroll content.
   */
  function EditingInspector({
    layerTitle = "Frame",
    layoutMode = "autoLayout",
    selectionColors = editingInspectorSelectionColors,
    showInspectorHeader = true,
    showLayerHeader = true,
    showLayoutSpacing = false,
    showLayoutClipContent = false,
    onLayoutModeChange,
    onLayoutFlowChange,
    onClipContentChange,
    onIndividualPaddingChange,
    onLockAspectRatioChange,
    className = "",
    children,
    ...props
  }) {
    const scrollRef = React.useRef(null);
    const dragRef = React.useRef(null);
    const [scrollbar, setScrollbar] = React.useState({ visible: false, top: 0, height: 24 });
    const [inspectorLayoutMode, setInspectorLayoutMode] = React.useState(layoutMode);
    const [layoutFlow, setLayoutFlow] = React.useState(layoutMode === "autoLayout" ? "horizontal" : "none");
    const [clipContent, setClipContent] = React.useState(false);
    const [individualPadding, setIndividualPadding] = React.useState(false);
    const [lockAspectRatio, setLockAspectRatio] = React.useState(false);

    React.useEffect(() => {
      setInspectorLayoutMode(layoutMode);
      setLayoutFlow(layoutMode === "autoLayout" ? "horizontal" : "none");
    }, [layoutMode]);

    const updateScrollbar = React.useCallback(() => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;

      const { clientHeight, scrollHeight, scrollTop } = scrollEl;
      if (scrollHeight <= clientHeight + 1) {
        setScrollbar({ visible: false, top: 0, height: 24 });
        return;
      }

      const height = Math.max(24, Math.round((clientHeight / scrollHeight) * clientHeight));
      const maxTop = clientHeight - height;
      const top = Math.round((scrollTop / (scrollHeight - clientHeight)) * maxTop);
      setScrollbar({ visible: true, top, height });
    }, []);

    React.useEffect(() => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return undefined;

      updateScrollbar();
      scrollEl.addEventListener("scroll", updateScrollbar, { passive: true });
      window.addEventListener("resize", updateScrollbar);

      const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateScrollbar) : null;
      observer?.observe(scrollEl);
      observer?.observe(scrollEl.firstElementChild || scrollEl);

      return () => {
        scrollEl.removeEventListener("scroll", updateScrollbar);
        window.removeEventListener("resize", updateScrollbar);
        observer?.disconnect();
      };
    }, [updateScrollbar, children, inspectorLayoutMode, layoutFlow, individualPadding, selectionColors]);

    const setLayoutMode = (nextMode, event) => {
      setInspectorLayoutMode(nextMode);
      onLayoutModeChange?.(nextMode, event);
    };

    const handleLayoutFlowChange = (nextFlow, option, index, event) => {
      setLayoutFlow(nextFlow);
      onLayoutFlowChange?.(nextFlow, option, index, event);

      if (nextFlow === "none") {
        setLayoutMode("selection", event);
      } else if (inspectorLayoutMode !== "autoLayout") {
        setLayoutMode("autoLayout", event);
      }
    };

    const handleAutoLayoutToggle = (event) => {
      const nextMode = inspectorLayoutMode === "autoLayout" ? "selection" : "autoLayout";
      setLayoutMode(nextMode, event);
      setLayoutFlow(nextMode === "autoLayout" ? "horizontal" : "none");
    };

    const handleClipContentChange = (nextChecked, event) => {
      const isChecked = nextChecked === "checked";
      setClipContent(isChecked);
      onClipContentChange?.(isChecked, event);
    };

    const handleIndividualPaddingToggle = (event) => {
      const nextValue = !individualPadding;
      setIndividualPadding(nextValue);
      onIndividualPaddingChange?.(nextValue, event);
    };

    const handleLockAspectRatioToggle = (event) => {
      setLockAspectRatio((currentValue) => {
        const nextValue = !currentValue;
        onLockAspectRatioChange?.(nextValue, event);
        return nextValue;
      });
    };

    const handleScrollbarPointerDown = (event) => {
      const scrollEl = scrollRef.current;
      if (!scrollEl || !scrollbar.visible) return;

      event.preventDefault();
      dragRef.current = {
        startY: event.clientY,
        startScrollTop: scrollEl.scrollTop,
        maxThumbTop: Math.max(1, scrollEl.clientHeight - scrollbar.height),
        maxScrollTop: Math.max(1, scrollEl.scrollHeight - scrollEl.clientHeight),
      };

      const handlePointerMove = (moveEvent) => {
        const drag = dragRef.current;
        if (!drag) return;
        const delta = moveEvent.clientY - drag.startY;
        scrollEl.scrollTop = drag.startScrollTop + (delta / drag.maxThumbTop) * drag.maxScrollTop;
      };

      const handlePointerUp = () => {
        dragRef.current = null;
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp, { once: true });
    };

    return h(
      "aside",
      {
        ...props,
        className: cx("composa-editing-inspector", className),
        "data-composa-component": "EditingInspector",
        "aria-label": props["aria-label"] || "Editing inspector",
      },
      [
        showInspectorHeader ? h(InspectorHeader, { key: "inspector-header" }) : null,
        h(
          "div",
          { key: "scroll-shell", className: "composa-editing-inspector-scroll-shell", "data-composa-component": "EditingInspectorScroll" },
          [
            h(
              "div",
              { key: "scroll", ref: scrollRef, className: "composa-editing-inspector-scroll", "data-composa-component": "EditingInspectorSections" },
              [
                showLayerHeader ? h(LayerHeader, { key: "layer-header", title: layerTitle }) : null,
                ...(children
                  ? [children]
                  : [
                      h(PositionSection, { key: "position" }),
                      h(LayoutSection, {
                        key: "layout",
                        mode: inspectorLayoutMode,
                        flow: inspectorLayoutMode === "autoLayout" ? layoutFlow : "none",
                        resizing: inspectorLayoutMode === "frame" ? { width: "auto-width", height: "auto-height" } : { width: "fixed", height: "hug" },
                        showSpacing: inspectorLayoutMode === "selection" && showLayoutSpacing,
                        showClipContent: inspectorLayoutMode === "autoLayout" || (inspectorLayoutMode === "selection" && showLayoutClipContent),
                        clipContent,
                        individualPadding,
                        lockAspectRatio,
                        onFlowChange: handleLayoutFlowChange,
                        onAutoLayoutToggle: handleAutoLayoutToggle,
                        onLockAspectRatio: handleLockAspectRatioToggle,
                        onClipContentChange: handleClipContentChange,
                        onIndividualPaddingToggle: handleIndividualPaddingToggle,
                      }),
                      h(AppearanceSection, { key: "appearance" }),
                      h(FillSection, { key: "fill" }),
                      h(StrokeSection, { key: "stroke" }),
                      h(EffectsSection, { key: "effects", defaultExpanded: false }),
                      h(SelectionColorsSection, { key: "selection-colors", items: selectionColors, defaultExpanded: false }),
                      h(LayoutGuideSection, { key: "layout-guide", defaultExpanded: false }),
                      h(ExportSection, { key: "export", defaultExpanded: false }),
                    ]),
              ]
            ),
            h("div", {
              key: "scrollbar",
              className: cx("composa-editing-inspector-scrollbar", scrollbar.visible && "is-visible"),
              "aria-hidden": "true",
              onPointerDown: handleScrollbarPointerDown,
              style: {
                "--composa-scrollbar-thumb-top": `${scrollbar.top}px`,
                "--composa-scrollbar-thumb-height": `${scrollbar.height}px`,
              },
            }),
          ]
        ),
      ]
    );
  }

  function AutoLayoutSettingsDialog({ onClose }) {
    const settingRow = (label, control) =>
      h("div", { key: label, className: "composa-auto-layout-settings-row" }, [
        h("span", { key: "label", className: "composa-auto-layout-settings-label" }, label),
        control,
      ]);

    return h(
      "div",
      {
        className: "composa-auto-layout-settings-dialog",
        "data-composa-component": "AutoLayoutSettingsDialog",
        role: "dialog",
        "aria-label": "Auto layout settings",
      },
      [
        h("div", { key: "header", className: "composa-auto-layout-settings-header" }, [
          h("h4", { key: "title", className: "composa-auto-layout-settings-title" }, "Auto layout settings"),
          h(IconButton, {
            key: "close",
            icon: "plusSmall",
            label: "Close auto layout settings",
            tooltip: false,
            variant: "ghost",
            className: "composa-auto-layout-settings-close",
            onClick: onClose,
          }),
        ]),
        settingRow("Strokes", h(Dropdown, { key: "strokes", label: "Auto layout strokes", value: "Excluded", width: "fill", className: "composa-auto-layout-settings-field" })),
        settingRow("Canvas stacking", h(Dropdown, { key: "stacking", label: "Canvas stacking", value: "Last on top", width: "fill", className: "composa-auto-layout-settings-field" })),
        settingRow(
          "Align text baseline",
          h(SegmentedControl, {
            key: "baseline",
            label: "Align text baseline",
            value: "off",
            width: "fill",
            className: "composa-auto-layout-baseline-toggle",
            options: [
              { id: "off", icon: "minus", label: "Do not align text baseline", value: "off" },
              { id: "on", icon: "check", label: "Align text baseline", value: "on" },
            ],
          })
        ),
      ]
    );
  }

  function LayoutSection({
    mode = "frame",
    title,
    flow = mode === "autoLayout" ? "horizontal" : "none",
    resizing = { width: mode === "frame" ? "auto-width" : "fixed", height: "hug" },
    dimensions = { width: "1200", height: mode === "frame" ? "115" : "189" },
    alignment = "top-left",
    spacing = "24",
    padding = { horizontal: "0", vertical: "0" },
    clipContent = false,
    individualPadding = false,
    lockAspectRatio = false,
    showFlow,
    showResizing,
    showSpacing = false,
    showClipContent,
    onFlowChange,
    onResizingChange,
    onDimensionChange,
    onAlignmentChange,
    onSpacingChange,
    onPaddingChange,
    onResizeToFit,
    onAutoLayoutToggle,
    onLockAspectRatio,
    onAutoLayoutSettings,
    onIndividualPaddingToggle,
    onClipContentChange,
    className = "",
    ...props
  }) {
    const sectionRef = React.useRef(null);
    const [internalSettingsOpen, setInternalSettingsOpen] = React.useState(false);
    const settingsOverlayId = React.useId();
    const resolvedMode = propToken(mode);
    const isAutoLayout = resolvedMode === "auto-layout" || resolvedMode === "autoLayout" || resolvedMode === "autolayout";
    const isSelection = resolvedMode === "selection";
    const resolvedTitle = title ?? (isAutoLayout ? "Auto layout" : "Layout");
    const resolvedFlow = flow || (isAutoLayout ? "horizontal" : "none");
    const resolvedShowFlow = showFlow ?? (isAutoLayout || isSelection);
    const resolvedShowResizing = showResizing ?? !resolvedShowFlow;
    const resolvedShowSpacing = showSpacing === true;
    const resolvedShowClipContent = showClipContent ?? isAutoLayout;
    const resizingOptions = [
      { id: "auto-width", icon: "layoutAutoWidth", label: "Auto width" },
      { id: "auto-height", icon: "layoutAutoHeight", label: "Auto height" },
      { id: "fixed", icon: "layoutFixedSize", label: "Fixed size" },
    ];
    const flowOptions = [
      { id: "none", icon: "flowNone", label: "No auto layout flow" },
      { id: "horizontal", icon: "flowHorizontal", label: "Horizontal auto layout" },
      { id: "vertical", icon: "flowVertical", label: "Vertical auto layout" },
      { id: "wrap", icon: "flowWrap", label: "Wrap auto layout" },
    ];
    const fieldSet = (label, children, classNameValue = "") =>
      h(
        "div",
        {
          key: label,
          className: cx("composa-layout-fieldset", classNameValue),
          "data-composa-component": "LayoutFieldSet",
        },
        [
          h("div", { key: "label", className: "composa-layout-fieldset-label" }, label),
          h("div", { key: "controls", className: "composa-layout-fieldset-controls" }, children),
        ]
      );
    const numericField = (axis, value, icon, onChange, tooltipLabel, tooltipPlacement) =>
      h(NumericInput, {
        key: axis,
        label: axis,
        value,
        iconLead: icon,
        tooltipLabel,
        tooltipPlacement,
        className: "composa-layout-mini-input",
        onChange: (event) => onChange?.(axis, event.currentTarget?.value, event),
      });
    const resizingInput = (axis, value, selected) =>
      h(NumericInput, {
        key: axis,
        label: `${axis.toUpperCase()} resizing: ${selected}`,
        value,
        iconLead: axis,
        dropdown: true,
        className: "composa-layout-mini-input composa-layout-resize-input",
        onChange: (event) => onDimensionChange?.(axis === "w" ? "width" : "height", event.currentTarget?.value, event),
      });
    const lockAspectRatioButton = h(ToggleButton, {
      key: "lock",
      icon: "lockAspect",
      label: "Lock aspect ratio",
      pressed: lockAspectRatio,
      size: "medium",
      variant: "ghost",
      tooltipPlacement: "top-right",
      className: "composa-layout-field-action",
      onClick: onLockAspectRatio,
    });
    React.useEffect(() => {
      if (!internalSettingsOpen) return undefined;
      const handlePointerDown = (event) => {
        if (sectionRef.current?.contains(event.target)) return;
        if (event.target?.closest?.(`[data-composa-overlay-owner="${settingsOverlayId}"]`)) return;
        setInternalSettingsOpen(false);
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [internalSettingsOpen, settingsOverlayId]);

    const handleAutoLayoutSettings = (event) => {
      const nextOpen = !internalSettingsOpen;
      setInternalSettingsOpen(nextOpen);
      onAutoLayoutSettings?.(nextOpen, event);
    };

    const headerActions = isAutoLayout
      ? h(ToggleButton, {
          key: "auto-layout",
          icon: "autoLayout",
          label: "Auto layout",
          pressed: true,
          size: "medium",
          variant: "standard",
          className: "composa-layout-header-action",
          onClick: onAutoLayoutToggle,
        })
      : isSelection
        ? [
            h(IconButton, { key: "resize", icon: "resizeToFit", label: "Resize to fit", size: "medium", variant: "ghost", className: "composa-layout-header-action", onClick: onResizeToFit }),
            h(ToggleButton, { key: "auto-layout", icon: "autoLayout", label: "Auto layout", pressed: false, size: "medium", variant: "ghost", className: "composa-layout-header-action", onClick: onAutoLayoutToggle }),
          ]
        : null;

    return h(
      "section",
      {
        ...props,
        ref: sectionRef,
        className: cx("composa-layout-section", className),
        "data-composa-component": "LayoutSection",
        "data-mode": resolvedMode,
        "data-settings-open": boolData(internalSettingsOpen),
        "aria-label": props["aria-label"] || resolvedTitle,
      },
      [
        h(
          "header",
          { key: "header", className: "composa-layout-section-header" },
          [
            h("h3", { key: "title", className: "composa-layout-section-title" }, resolvedTitle),
            headerActions ? h(HeaderActions, { key: "actions", className: "composa-layout-header-actions", label: "Layout actions" }, headerActions) : null,
          ]
        ),
        resolvedShowFlow
          ? fieldSet("Flow", h(SegmentedControl, { label: "Flow", options: flowOptions, value: resolvedFlow, variant: "icon", width: "fill", className: "composa-layout-wide-segmented", onValueChange: onFlowChange }))
          : resolvedShowResizing
            ? fieldSet("Resizing", h(SegmentedControl, { label: "Resizing", options: resizingOptions, value: resizing?.width ?? "auto-width", variant: "icon", width: "fill", className: "composa-layout-wide-segmented", onValueChange: (value, option, index, event) => onResizingChange?.("width", value, option, event) }))
            : null,
        isAutoLayout
          ? fieldSet("Dimensions", [
              resizingInput("w", dimensions?.width ?? "1200", resizing?.width ?? "fixed"),
              resizingInput("h", dimensions?.height ?? "189", resizing?.height ?? "hug"),
              lockAspectRatioButton,
            ])
          : isSelection
            ? fieldSet("Dimensions", [
                numericField("width", dimensions?.width ?? "1200", "w", onDimensionChange),
                numericField("height", dimensions?.height ?? "189", "h", onDimensionChange),
                lockAspectRatioButton,
              ])
            : fieldSet("Dimensions", [
                resizingInput("w", dimensions?.width ?? "1200", resizing?.width ?? "auto-width"),
                resizingInput("h", dimensions?.height ?? "115", resizing?.height ?? "hug"),
                lockAspectRatioButton,
              ]),
        isAutoLayout
          ? h(
              "div",
              { key: "alignment-gap", className: "composa-layout-combo-row", "data-composa-component": "LayoutAlignmentGapRow" },
              [
                h(AlignmentPicker, { key: "align", label: "Alignment", value: alignment, width: "fill", className: "composa-layout-alignment-picker", onValueChange: onAlignmentChange }),
                h("div", { key: "gap", className: "composa-layout-gap-field" }, [
                  h("span", { key: "label", className: "composa-layout-fieldset-label" }, "Gap"),
                numericField("gap", spacing, "spacingGap", onSpacingChange),
                ]),
                h(IconButton, { key: "settings", icon: "autoLayoutSettings", label: "Auto layout settings", selected: internalSettingsOpen, size: "medium", variant: "ghost", tooltipPlacement: "top-right", className: "composa-layout-field-action", onClick: handleAutoLayoutSettings }),
              ]
            )
          : isSelection && resolvedShowSpacing
            ? fieldSet("Spacing", numericField("spacing", spacing, "spacingGap", onSpacingChange))
            : null,
        isAutoLayout
          ? fieldSet(
              "Padding",
              individualPadding
                ? [
                    numericField("top", padding?.top ?? padding?.individual?.top ?? "0", "paddingVertical", onPaddingChange, "Top padding", "top-left"),
                    numericField("right", padding?.right ?? padding?.individual?.right ?? "0", "paddingHorizontal", onPaddingChange, "Right padding"),
                    h(ToggleButton, { key: "individual", icon: "individualPadding", label: "Individual padding", pressed: true, size: "medium", variant: "ghost", tooltipPlacement: "top-right", className: "composa-layout-field-action", onClick: onIndividualPaddingToggle }),
                    numericField("bottom", padding?.bottom ?? padding?.individual?.bottom ?? "0", "paddingVertical", onPaddingChange, "Bottom padding", "top-left"),
                    numericField("left", padding?.left ?? padding?.individual?.left ?? "0", "paddingHorizontal", onPaddingChange, "Left padding"),
                  ]
                : [
                    numericField("horizontal", padding?.horizontal ?? "0", "paddingHorizontal", onPaddingChange, "Horizontal padding", "top-left"),
                    numericField("vertical", padding?.vertical ?? "0", "paddingVertical", onPaddingChange, "Vertical padding"),
                    h(ToggleButton, { key: "individual", icon: "individualPadding", label: "Individual padding", pressed: false, size: "medium", variant: "ghost", tooltipPlacement: "top-right", className: "composa-layout-field-action", onClick: onIndividualPaddingToggle }),
                  ],
              individualPadding ? "has-expanded-padding" : ""
            )
          : null,
        resolvedShowClipContent
          ? h(
              "div",
              { key: "clip", className: "composa-layout-clip-row", "data-composa-component": "LayoutClipRow" },
              h(Checkbox, { labelText: "Clip content", checked: clipContent ? "checked" : "unchecked", onCheckedChange: onClipContentChange })
            )
          : null,
        internalSettingsOpen
          ? h(
              OverlayPortal,
              { key: "settings-dialog-layer", anchorRef: sectionRef, placement: "left-of-inspector", align: "end", followAnchor: false, className: "composa-auto-layout-settings-layer", "data-composa-overlay-owner": settingsOverlayId },
              h(AutoLayoutSettingsDialog, { onClose: () => setInternalSettingsOpen(false) })
            )
          : null,
      ]
    );
  }

  // EditorToolbar — the floating creation toolbar that drops into EditorShell's
  // `canvasToolbar` slot (rendered through the canvas OverlayHost/OverlayPortal).
  // It is PURELY PRESENTATIONAL and controlled: it owns no canvas engine, no
  // selection, and no document model. It only reflects the active tool and emits
  // `onToolChange`; the app repo wires that to real tool commands.
  //
  // Scope matches what a tldraw-style canvas supports, mirroring Figma
  // rMq1M35u1iyKB2QaQMipZb node 86-5602 — four groups, left to right:
  //   - Move group:  Move (pointer) / Hand (pan)   — SplitButton (action + caret)
  //   - Frame group: Frame (Grid 3x3)              — single 32px icon button
  //   - Shape group: Rectangle / Circle            — SplitButton (action + caret)
  //   - Text group:  Text                          — single 32px icon button
  // Multi-tool groups reuse SplitButton (action + 16px caret + tooltips) and open
  // a tool-picker menu through OverlayPortal with MenuRow type="toolbar" radio
  // rows — the same tool-picker pattern as the inspector zoom menu. Single-tool
  // groups (Frame, Text) have NO caret in Figma, so they render as a plain
  // IconButton action. Carets and menus are NOT hand-rolled here.
  const EDITOR_TOOLBAR_GROUPS = [
    {
      id: "move",
      label: "Move",
      menuLabel: "Move tools",
      tools: [
        { id: "move", label: "Move", icon: "move", shortcut: "V" },
        { id: "hand", label: "Hand", icon: "hand", shortcut: "H" },
      ],
    },
    {
      id: "frame",
      label: "Frame",
      // Single-tool group: Frame uses the Grid 3x3 glyph (founder spec).
      tools: [{ id: "frame", label: "Frame", icon: "grid3x3", shortcut: "F" }],
    },
    {
      id: "shape",
      label: "Shape",
      menuLabel: "Shape tools",
      tools: [
        { id: "rectangle", label: "Rectangle", icon: "rectangle", shortcut: "R" },
        { id: "circle", label: "Circle", icon: "circle", shortcut: "O" },
      ],
    },
    {
      id: "text",
      label: "Text",
      // Single-tool group: Text.
      tools: [{ id: "text", label: "Text", icon: "text", shortcut: "T" }],
    },
  ];

  function EditorToolbarGroup({ group, activeTool, lastToolInGroup, onToolChange }) {
    const anchorRef = React.useRef(null);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const overlayId = React.useId();
    const groupToolIds = group.tools.map((tool) => tool.id);
    const groupIsActive = groupToolIds.includes(activeTool);
    const isMultiTool = group.tools.length > 1;
    // The action half reflects the group's current tool: the active tool when this
    // group is active, otherwise the last tool used in this group (default: first).
    const displayedToolId = groupIsActive ? activeTool : lastToolInGroup || group.tools[0].id;
    const displayedTool = group.tools.find((tool) => tool.id === displayedToolId) || group.tools[0];

    React.useEffect(() => {
      if (!menuOpen) return undefined;
      const handlePointerDown = (event) => {
        if (anchorRef.current?.contains(event.target)) return;
        if (event.target?.closest?.(`[data-composa-overlay-owner="${overlayId}"]`)) return;
        setMenuOpen(false);
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [menuOpen, overlayId]);

    const selectTool = (toolId, event) => {
      onToolChange?.(toolId, event);
    };

    return h(
      "div",
      {
        ref: anchorRef,
        className: cx("composa-editor-toolbar-group", groupIsActive && "is-active", menuOpen && "is-menu-open", !isMultiTool && "is-single-tool"),
        "data-composa-component": "EditorToolbarGroup",
        "data-group": group.id,
        "data-active": boolData(groupIsActive),
        "data-menu-open": boolData(menuOpen),
      },
      [
        // Single-tool groups (Frame, Text) have no caret in Figma — render the
        // 32px icon action alone. Its tooltip shows on hover only (IconButton
        // owns that), so there is no tooltip+menu collision here.
        isMultiTool
          ? h(SplitButton, {
              key: "split",
              label: displayedTool.label,
              icon: displayedTool.icon,
              variant: groupIsActive ? "primary" : "ghost",
              size: "large",
              className: "composa-editor-toolbar-split",
              actionTooltipLabel: displayedTool.label,
              menuLabel: group.menuLabel,
              menuTooltipLabel: group.menuLabel,
              // Drive the split's open state so it reflects the menu AND suppresses
              // both halves' tooltips while the menu is open (no tooltip+menu
              // co-show — the founder saw exactly that in the last two stories).
              menuOpen,
              state: menuOpen ? "active" : "rest",
              onClick: (event) => selectTool(displayedTool.id, event),
              onMenuClick: () => setMenuOpen((open) => !open),
            })
          : h(IconButton, {
              key: "single",
              icon: displayedTool.icon,
              label: displayedTool.label,
              tooltipLabel: displayedTool.label,
              tooltipPlacement: "bottom",
              size: "large",
              // The active single-tool gets its solid brand-orange fill from the
              // `primary` variant — the SAME fill the split-tool action half uses.
              // Do NOT also pass `selected`: `.is-selected` would override the
              // primary orange with the blue selected-tint (30-button-family.css),
              // making single-tools inconsistent with split-tools.
              variant: groupIsActive ? "primary" : "ghost",
              className: "composa-editor-toolbar-single",
              component: "EditorToolbarTool",
              onClick: (event) => selectTool(displayedTool.id, event),
            }),
        isMultiTool && menuOpen
          ? h(
              OverlayPortal,
              {
                key: "menu",
                anchorRef,
                placement: "bottom",
                align: "start",
                className: "composa-editor-toolbar-menu-layer",
                "data-composa-overlay-owner": overlayId,
              },
              h(
                "div",
                { className: "composa-editor-toolbar-menu", role: "menu", "aria-label": group.menuLabel },
                group.tools.map((tool) =>
                  h(MenuRow, {
                    key: tool.id,
                    type: "toolbar",
                    label: tool.label,
                    lead: tool.icon,
                    shortcut: tool.shortcut,
                    selected: tool.id === activeTool,
                    onClick: (event) => {
                      selectTool(tool.id, event);
                      setMenuOpen(false);
                    },
                  })
                )
              )
            )
          : null,
      ]
    );
  }

  function EditorToolbar({
    activeTool,
    defaultActiveTool = "move",
    onToolChange,
    label = "Editor tools",
    className = "",
    ...props
  }) {
    const [internalTool, setInternalTool] = React.useState(defaultActiveTool);
    const resolvedTool = activeTool !== undefined ? activeTool : internalTool;
    // Remember the last-used tool per group so a group's action half keeps showing
    // that tool's icon after the user switches to another group.
    const [lastToolByGroup, setLastToolByGroup] = React.useState(() => {
      const map = {};
      EDITOR_TOOLBAR_GROUPS.forEach((group) => {
        const match = group.tools.find((tool) => tool.id === defaultActiveTool);
        map[group.id] = match ? match.id : group.tools[0].id;
      });
      return map;
    });

    const handleToolChange = (toolId, event) => {
      const group = EDITOR_TOOLBAR_GROUPS.find((entry) => entry.tools.some((tool) => tool.id === toolId));
      if (group) setLastToolByGroup((current) => ({ ...current, [group.id]: toolId }));
      if (activeTool === undefined) setInternalTool(toolId);
      onToolChange?.(toolId, event);
    };

    return h(
      "div",
      {
        ...props,
        className: cx("composa-editor-toolbar", className),
        "data-composa-component": "EditorToolbar",
        "data-active-tool": resolvedTool,
        role: "toolbar",
        "aria-label": label,
      },
      EDITOR_TOOLBAR_GROUPS.map((group) =>
        h(EditorToolbarGroup, {
          key: group.id,
          group,
          activeTool: resolvedTool,
          lastToolInGroup: lastToolByGroup[group.id],
          onToolChange: handleToolChange,
        })
      )
    );
  }

  // EditorShell is a PURELY PRESENTATIONAL layout template. It owns the editor's
  // four-region CSS grid and the responsive behavior of those regions — nothing
  // else. It never owns selection, a document model, undo/redo, or any engine
  // command; the future app repo provides that and feeds rendered content into
  // the slot props below.
  //
  // Regions, left to right:
  //   [ navigationRail ] [ navigator ] [ canvas ] [ inspector ]
  // There is deliberately NO top toolbar row, NO status bar, and NO timeline.
  // The editor toolbar is NOT a shell row: it is a floating overlay anchored
  // inside the canvas region. The canvas region wraps its content in OverlayHost
  // and the `canvasToolbar` slot is rendered through OverlayPortal positioned
  // within the canvas, so it floats over canvas content instead of consuming a
  // grid row. By default it anchors BOTTOM-CENTER of the canvas (Figma/standard-
  // editor convention): the OverlayPortal targets a zero-size anchor pinned to
  // the canvas bottom edge and the toolbar hangs above it (placement "top").
  // Internal hook for a single resizable shell side (navigator / inspector).
  // Controlled-or-uncontrolled width with pointer drag + keyboard arrow nudging.
  // `edge` is "right" for the navigator (drag handle on its right edge, so a
  // rightward drag grows it) and "left" for the inspector (handle on its left
  // edge, so a leftward drag grows it).
  function useShellResize({ enabled, width, defaultWidth, min, max, onWidthChange, edge }) {
    const clamp = (value) => Math.min(Math.max(value, min), max);
    const [internalWidth, setInternalWidth] = React.useState(() => clamp(defaultWidth));
    const resolvedWidth = width !== undefined ? clamp(width) : internalWidth;
    const draggingRef = React.useRef(null);
    const commit = (next) => {
      const clamped = clamp(next);
      if (width === undefined) setInternalWidth(clamped);
      onWidthChange?.(clamped);
    };
    const dir = edge === "left" ? -1 : 1;
    const onPointerDown = (event) => {
      if (!enabled) return;
      if (event.button != null && event.button !== 0) return;
      draggingRef.current = { startX: event.clientX, startWidth: resolvedWidth };
      event.currentTarget.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    };
    const onPointerMove = (event) => {
      const drag = draggingRef.current;
      if (!drag) return;
      commit(drag.startWidth + dir * (event.clientX - drag.startX));
    };
    const onPointerUp = (event) => {
      if (!draggingRef.current) return;
      draggingRef.current = null;
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    };
    const onKeyDown = (event) => {
      const step = (event.shiftKey ? 24 : 8) * dir;
      // Left/Right arrows always move the visible boundary in their literal
      // direction; `dir` maps that to growing or shrinking the owned side.
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        commit(resolvedWidth - step);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        commit(resolvedWidth + step);
      } else if (event.key === "Home") {
        event.preventDefault();
        commit(min);
      } else if (event.key === "End") {
        event.preventDefault();
        commit(max);
      }
    };
    return { resolvedWidth, min, max, onPointerDown, onPointerMove, onPointerUp, onKeyDown };
  }

  function EditorShell({
    navigationRail = null,
    navigator = null,
    canvas = null,
    inspector = null,
    canvasToolbar = null,
    // The floating canvas toolbar anchors to the BOTTOM-CENTER of the canvas
    // (Figma / standard-editor convention). It hangs ABOVE a zero-size anchor
    // pinned to the canvas bottom edge, so `top` placement + `center` align lands
    // it bottom-center with a comfortable offset (the offset is the toolbar
    // layer's margin token). Consumers can still override either prop.
    canvasToolbarPlacement = "top",
    canvasToolbarAlign = "center",
    resizableSides = false,
    navigatorWidth,
    defaultNavigatorWidth = 240,
    onNavigatorWidthChange,
    minNavigatorWidth = 200,
    maxNavigatorWidth = 420,
    inspectorWidth,
    defaultInspectorWidth = 240,
    onInspectorWidthChange,
    minInspectorWidth = 200,
    maxInspectorWidth = 420,
    label = "Editor",
    className = "",
    children,
    ...props
  }) {
    const canvasRef = React.useRef(null);
    const toolbarAnchorRef = React.useRef(null);
    // `resizableSides` may be a boolean (both) or { left, right } for per-side opt-in.
    const sides =
      resizableSides && typeof resizableSides === "object"
        ? { left: !!resizableSides.left, right: !!resizableSides.right }
        : { left: !!resizableSides, right: !!resizableSides };

    const leftResize = useShellResize({
      enabled: sides.left,
      width: navigatorWidth,
      defaultWidth: defaultNavigatorWidth,
      min: minNavigatorWidth,
      max: maxNavigatorWidth,
      onWidthChange: onNavigatorWidthChange,
      edge: "right",
    });
    const rightResize = useShellResize({
      enabled: sides.right,
      width: inspectorWidth,
      defaultWidth: defaultInspectorWidth,
      min: minInspectorWidth,
      max: maxInspectorWidth,
      onWidthChange: onInspectorWidthChange,
      edge: "left",
    });

    const shellStyle = { ...(props.style || {}) };
    if (sides.left) shellStyle["--composa-editor-shell-navigator-width"] = `${leftResize.resolvedWidth}px`;
    if (sides.right) shellStyle["--composa-editor-shell-inspector-width"] = `${rightResize.resolvedWidth}px`;

    const resizeHandle = (side, resize, ariaLabel) =>
      h("div", {
        key: `${side}-resize`,
        className: cx("composa-editor-shell-resize", `is-${side}`),
        "data-composa-component": "EditorShellResizeHandle",
        role: "separator",
        tabIndex: 0,
        "aria-orientation": "vertical",
        "aria-label": ariaLabel,
        "aria-valuenow": Math.round(resize.resolvedWidth),
        "aria-valuemin": resize.min,
        "aria-valuemax": resize.max,
        onPointerDown: resize.onPointerDown,
        onPointerMove: resize.onPointerMove,
        onPointerUp: resize.onPointerUp,
        onKeyDown: resize.onKeyDown,
      });

    const { style: _ignoredStyle, ...restProps } = props;

    return h(
      "div",
      {
        ...restProps,
        className: cx("composa-editor-shell", sides.left && "is-resizable-left", sides.right && "is-resizable-right", className),
        "data-composa-component": "EditorShell",
        role: "application",
        "aria-label": label,
        style: shellStyle,
      },
      [
        h(
          "div",
          {
            key: "navigation-rail",
            className: "composa-editor-shell-rail",
            "data-composa-region": "navigationRail",
          },
          navigationRail
        ),
        h(
          "div",
          {
            key: "navigator",
            className: "composa-editor-shell-navigator",
            "data-composa-region": "navigator",
          },
          [
            navigator,
            sides.left ? resizeHandle("left", leftResize, "Resize navigator") : null,
          ]
        ),
        h(
          OverlayHost,
          {
            key: "canvas",
            className: "composa-editor-shell-canvas",
            "data-composa-region": "canvas",
          },
          [
            h(
              "div",
              { key: "canvas-anchor", className: "composa-editor-shell-canvas-anchor" },
              h(
                "div",
                { key: "canvas-content", ref: canvasRef, className: "composa-editor-shell-canvas-content" },
                canvas ?? children
              )
            ),
            // Zero-size anchor pinned to the canvas BOTTOM-CENTER. The floating
            // toolbar hangs ABOVE it (placement "top", align "center") via
            // OverlayPortal, so it sits bottom-center inside the canvas with a
            // comfortable offset rather than top-anchored or off-canvas.
            h("div", { key: "toolbar-anchor", ref: toolbarAnchorRef, className: "composa-editor-shell-canvas-toolbar-anchor", "aria-hidden": "true" }),
            canvasToolbar
              ? h(
                  OverlayPortal,
                  {
                    key: "canvas-toolbar",
                    open: true,
                    anchorRef: toolbarAnchorRef,
                    placement: canvasToolbarPlacement,
                    align: canvasToolbarAlign,
                    followAnchor: false,
                    className: "composa-editor-shell-canvas-toolbar-layer",
                    "data-composa-region": "canvasToolbar",
                  },
                  canvasToolbar
                )
              : null,
          ]
        ),
        h(
          "div",
          {
            key: "inspector",
            className: "composa-editor-shell-inspector",
            "data-composa-region": "inspector",
          },
          [
            sides.right ? resizeHandle("right", rightResize, "Resize inspector") : null,
            inspector,
          ]
        ),
      ]
    );
  }

  // SlidesEditorTemplate is a thin slides-oriented preset of EditorShell. It owns
  // no document model either; it only supplies slides-flavored defaults (a
  // present-mode toggle placeholder, a slides class hook) and forwards every slot
  // straight to EditorShell. The app repo overrides slots with real content.
  function SlidesEditorTemplate({
    navigationRail = null,
    navigator = null,
    canvas = null,
    inspector = null,
    canvasToolbar = null,
    presentMode = false,
    onPresentModeChange,
    label = "Slides editor",
    className = "",
    ...props
  }) {
    const presentToggle = h(
      "button",
      {
        type: "button",
        className: cx("composa-slides-editor-present-toggle", presentMode && "is-active"),
        "data-composa-component": "SlidesPresentToggle",
        "aria-pressed": presentMode ? "true" : "false",
        onClick: (event) => onPresentModeChange?.(!presentMode, event),
      },
      presentMode ? "Exit present" : "Present"
    );
    return h(EditorShell, {
      ...props,
      label,
      className: cx("composa-slides-editor", presentMode && "is-presenting", className),
      navigationRail,
      navigator,
      canvas,
      inspector,
      "data-composa-component": "SlidesEditorTemplate",
      "data-present-mode": boolData(presentMode),
      // Default the floating canvas toolbar to the slides present-mode toggle
      // placeholder when the consumer has not supplied its own toolbar content.
      canvasToolbar: canvasToolbar ?? presentToggle,
    });
  }

  function CanvasSelectionOverlay({ type = "standard", label, width, height, direction, showDimensions = true, className = "", ...props }) {
    const tone = type === "component" || type === "instance" ? "component" : type;
    const dimensions = label || (width && height ? `${Math.round(width)} x ${Math.round(height)}` : "");
    const smartSelection = type.startsWith("smartSelection");
    const handles = ["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => h("span", { key: corner, className: `canvas-selection-handle is-${corner}` }));
    const smartMarkers = [
      h("span", { key: "marker-first", className: "canvas-smart-marker is-first" }),
      h("span", { key: "marker-last", className: "canvas-smart-marker is-last" }),
      h("span", { key: "space-first", className: "canvas-smart-space is-first" }),
      h("span", { key: "space-last", className: "canvas-smart-space is-last" }),
    ];
    const names = {
      component: "Component",
      instance: "Instance",
      autoLayout: "Frame",
      textEdit: "Text",
      imageCrop: "Crop",
      slice: "Slice",
      vector: "Vector",
      reparenting: "Reparent",
      cover: "Cover",
    };
    const badges = [
      showDimensions && dimensions ? h("span", { key: "size", className: "canvas-selection-badge is-size" }, dimensions) : null,
      names[type] ? h("span", { key: "name", className: "canvas-selection-name" }, names[type]) : null,
      type === "autoLayout" && direction ? h("span", { key: "cue", className: `canvas-auto-layout-cue is-${direction}`, "aria-hidden": "true" }) : null,
    ];

    return h(
      "div",
      {
        ...props,
        className: cx("canvas-selection-overlay", `is-${type}`, `is-${tone}`, className),
        "data-composa-component": "CanvasSelectionOverlay",
        "data-type": type,
        "data-tone": tone,
        "data-direction": direction || "",
        "aria-hidden": "true",
      },
      [...(smartSelection ? smartMarkers : handles), ...badges]
    );
  }

  // Default glyphs per layer kind. Frame-family kinds (frame / autoLayout /
  // section) use the license-clean Grid 3x3 built-in glyph — the same symbol the
  // EditorToolbar uses for the Frame tool, so a frame reads identically in the
  // toolbar and the layer list (founder spec). The remaining kinds keep their
  // license-clean plain-character placeholders. Consumers can pass an `icon` slot
  // per item to override either.
  const TREE_KIND_GLYPH_ICONS = { frame: "grid3x3", autoLayout: "grid3x3", section: "grid3x3" };
  // Component / instance rows read as ❖ "Black Diamond Minus White X" (U+2756),
  // the founder-provided component mark, rendered as a license-clean text glyph.
  // The remaining kinds keep their plain-character placeholders.
  const TREE_KIND_GLYPHS = { group: "#", component: "❖", instance: "❖", shape: "◇", vector: "◇", text: "T", image: "▢", locked: "▢" };

  function TreeRow({ id, label = "Layer", icon, kind = "frame", depth = 0, selected = false, secondarySelected = false, expanded, hasChildren = false, onToggle, onClick, className = "", style, ...props }) {
    const showDisclosure = expanded !== undefined || hasChildren;
    const resolvedExpanded = expanded === undefined && hasChildren ? true : expanded;
    const layerGlyph =
      icon != null
        ? iconNode(h, Icon, icon)
        : TREE_KIND_GLYPH_ICONS[kind]
          ? iconNode(h, Icon, TREE_KIND_GLYPH_ICONS[kind])
          : TREE_KIND_GLYPHS[kind] || iconNode(h, Icon, TREE_KIND_GLYPH_ICONS.frame);
    return h(
      "button",
      {
        ...props,
        className: cx("composa-tree-row", selected && "is-selected", secondarySelected && "is-secondary-selected", `composa-tree-kind-${kind}`, className),
        "data-composa-component": "TreeRow",
        "data-layer-id": id,
        "data-depth": String(depth),
        "data-kind": kind,
        "data-selected": boolData(selected),
        role: "treeitem",
        "aria-selected": selected ? "true" : "false",
        "aria-level": String(depth + 1),
        ...(showDisclosure ? { "aria-expanded": resolvedExpanded ? "true" : "false" } : {}),
        "aria-label": typeof label === "string" ? label : undefined,
        style: { ...(style || {}), "--tree-depth": String(depth) },
        onClick,
      },
      [
        showDisclosure
          ? h(
              "span",
              { key: "disclosure", className: cx("composa-tree-disclosure", !resolvedExpanded && "is-collapsed"), role: "presentation", onClick: onToggle ? (event) => { event.stopPropagation(); onToggle(id, event); } : undefined },
              iconNode(h, Icon, "chevronDown")
            )
          : h("span", { key: "spacer", className: "composa-tree-disclosure-spacer" }),
        h("span", { key: "icon", className: "composa-layer-icon", "aria-hidden": "true" }, layerGlyph),
        h("span", { key: "label", className: "composa-tree-label" }, label),
      ]
    );
  }

  // Tree flattens a nested `items` array (id, name, type/kind, children, expanded,
  // secondarySelected, icon) into indented treeitem rows. Top-level items are
  // depth 0 (e.g. pages). Selection + expand/collapse are uncontrolled by default
  // and controllable via selectedId/onSelect (+ each item's `expanded`).
  //
  // Child highlight: when a node is selected, its EXPOSED (currently rendered)
  // descendant rows are tinted with the muted/secondary selection color so the
  // selected subtree reads as a group, distinct from the primary selection. This
  // is automatic; an explicit `node.secondarySelected` still forces the tint
  // (`childHighlight={false}` opts out of the automatic behavior).
  function Tree({ items = [], selectedId, defaultSelectedId, onSelect, childHighlight = true, label = "Layers", className = "", ...props }) {
    const [internalSelected, setInternalSelected] = React.useState(defaultSelectedId);
    const [collapsedMap, setCollapsedMap] = React.useState({});
    const selected = selectedId !== undefined ? selectedId : internalSelected;
    const toggle = (id) => setCollapsedMap((current) => ({ ...current, [id]: !current[id] }));
    const select = (id, node, event) => {
      if (selectedId === undefined) setInternalSelected(id);
      onSelect?.(id, node, event);
    };
    const rows = [];
    // `inSelectedSubtree` flags rows that descend from the selected node. The
    // selected node itself takes the primary selection, not the secondary tint.
    const walk = (nodes, depth, inSelectedSubtree) => {
      nodes.forEach((node) => {
        const children = Array.isArray(node.children) ? node.children : [];
        const hasChildren = children.length > 0;
        const expanded = hasChildren ? !(collapsedMap[node.id] ?? node.expanded === false) : undefined;
        const isSelected = node.id === selected;
        rows.push({ node, depth, hasChildren, expanded, inSelectedSubtree: inSelectedSubtree && !isSelected });
        // A child is in the selected subtree if its parent already was, or this
        // node is the selected one.
        if (hasChildren && expanded) walk(children, depth + 1, inSelectedSubtree || isSelected);
      });
    };
    walk(items, 0, false);
    return h(
      "div",
      { ...props, className: cx("composa-tree", className), "data-composa-component": "Tree", role: "tree", "aria-label": label },
      rows.map(({ node, depth, hasChildren, expanded, inSelectedSubtree }) =>
        h(TreeRow, {
          key: node.id,
          id: node.id,
          label: node.name ?? node.label,
          icon: node.icon,
          kind: node.kind ?? node.type ?? "frame",
          depth,
          hasChildren,
          expanded,
          selected: node.id === selected,
          secondarySelected: Boolean(node.secondarySelected) || (childHighlight && inSelectedSubtree),
          onToggle: () => toggle(node.id),
          onClick: (event) => select(node.id, node, event),
        })
      )
    );
  }

  return {
    Button,
    Tree,
    TreeRow,
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
    OverlayLayer,
    OverlayHost,
    OverlayPortal,
    Dialog,
    Dropdown,
    Menu,
    MenuRow,
    MenuDivider,
    MenuFooter,
    MenuMultiSelect,
    VerticalCell,
    ComposaAppIcon,
    NavigationRailItem,
    AppNavigationRail,
    NavigatorHeader,
    CollapseHeader,
    SlideThumb,
    SlideList,
    EditorNavigator,
    SlidesNavigator,
    TextPair,
    Label,
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
    ControlGroup,
    AlignmentPicker,
    Tab,
    Tabs,
    Avatar,
    MultiplayerControl,
    CommentComposer,
    CommentItem,
    CommentThreadWindow,
    Badge,
    BadgeAnchor,
    NotificationBell,
    Notification,
    VisualBell,
    InspectorHeader,
    LayerHeader,
    PositionSection,
    LayoutSection,
    FillSection,
    StrokeSection,
    StrokeControlsSection,
    EffectsSection,
    ColorPickerDialog,
    ColorPickerTrigger,
    TypographyDialog,
    TypeStyleMenu,
    TypeStyleRow,
    FontsPickerMenu,
    LayoutGuideSettingsDialog,
    SelectionColorsSection,
    LayoutGuideSection,
    ExportSection,
    AppearanceSection,
    EditingInspector,
    EditorToolbar,
    EditorShell,
    SlidesEditorTemplate,
    CanvasSelectionOverlay,
  };
}
