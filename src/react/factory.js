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

// Renders a built-in structural glyph (Material Symbols, rounded weight 200).
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
  if (BUILTIN_GLYPHS[name]) return builtinGlyph(h, BUILTIN_GLYPHS[name], decorative);
  if (Icon) return h(Icon, { name });
  return h("span", { className: `composa-icon composa-icon-${name}`, "aria-hidden": decorative ? "true" : "false" });
}

export function createComposaComponents(React, options = {}) {
  const h = React.createElement;
  const Icon = options.Icon;

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
      children ?? [icon && iconLeadValue !== "false" ? iconNode(h, Icon, icon) : null, h("span", { key: "label" }, label), hotkey ? h("kbd", { key: "hotkey", className: "composa-button-hotkey" }, "K") : null]
    );
  }

  function IconButton({ icon, label, selected = false, pressed, size = "medium", state = "rest", disabled = false, context = "default", variant = "standard", className = "", role, component = "IconButton", ...props }) {
    const resolvedVariant = propToken(variant);
    const resolvedSize = propToken(size);
    const attrs = {
      ...props,
      className: cx("composa-icon-button", `composa-icon-button-${resolvedVariant}`, `composa-icon-button-${resolvedSize}`, selected && "is-selected", stateClass(state), `composa-on-${context}`, className),
      "data-composa-component": component,
      "data-icon": icon,
      "data-size": resolvedSize,
      "data-state": state,
      "data-disabled": boolData(disabled),
      "data-context": context,
      "data-variant": resolvedVariant,
      "aria-label": label,
      title: label,
      disabled,
      role,
    };
    if (pressed !== undefined) attrs["aria-pressed"] = pressed ? "true" : "false";
    if (selected !== undefined && role === "tab") attrs["aria-selected"] = selected ? "true" : "false";
    return h("button", attrs, h("span", { className: "composa-icon-button-glyph" }, iconNode(h, Icon, icon)));
  }

  function ToggleButton({ icon, label, pressed = false, dialog = false, size = "medium", state = "rest", disabled = false, variant = "standard", className = "", ...props }) {
    return h(IconButton, {
      ...props,
      icon,
      label,
      pressed,
      selected: pressed,
      size,
      state,
      disabled,
      variant,
      className: cx("composa-toggle-button", dialog && "composa-dialog-toggle", className),
      component: dialog ? "DialogToggleButton" : "ToggleButton",
    });
  }

  function SplitButton({ label, icon, menuLabel = `${label} options`, variant = "secondary", size = "small", width = "auto", state = "rest", disabled = false, className = "", onMenuClick, ...props }) {
    const resolvedVariant = propToken(variant);
    const resolvedSize = propToken(size);
    const resolvedWidth = normalizeWidth(width);
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
          "button",
          {
            ...props,
            key: "action",
            // Reuse Button's variant colors via `.composa-button-<variant>` so the
            // split shares Button's semantic variant tokens.
            className: cx("composa-split-action", `composa-button-${resolvedVariant}`),
            "data-composa-component": "SplitButtonAction",
            "data-variant": resolvedVariant,
            "data-state": state,
            "data-disabled": boolData(disabled),
            disabled,
          },
          [iconNode(h, Icon, icon), h("span", { key: "label" }, label)]
        ),
        h(IconButton, { key: "menu", icon: "chevronDown", label: menuLabel, className: "composa-split-menu", variant: resolvedVariant, state, disabled, onClick: onMenuClick, component: "SplitButtonMenu" }),
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
    const isMultiline = multiline || resolvedVariant === "multi-line";
    const controlProps = {
      value: mixed ? "" : value,
      placeholder: mixed ? "Mixed" : placeholder,
      "aria-label": label || placeholder || "Input",
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
      },
      [
        // `label` is the accessible name (aria-label on the control), not a
        // visible element. The old 14px prefix slot overflowed real labels.
        h("span", { key: "shell", className: "composa-input-shell" }, [
          leadIcon && hasIconLead ? iconNode(h, Icon, leadIcon) : null,
          variable ? h("span", { key: "variable", className: "composa-variable-pill" }, "var") : null,
          control,
          suffix ? h("span", { key: "suffix", className: "composa-input-suffix" }, suffix) : null,
          closeButton
            ? h(IconButton, { key: "clear", icon: "minus", label: "Clear input", className: "composa-input-clear", disabled: resolvedDisabled, onClick: onClear, component: "InputClearButton" })
            : null,
          dropdown ? iconNode(h, Icon, "chevronDown") : null,
        ]),
      ]
    );
  }

  function NumericInput({ label, value = "0", state = "rest", disabled = false, varIcon = false, varPill = false, dropdown = false, iconLead = false, className = "", ...props }) {
    const leadIcon = iconLead && iconLead !== "false" ? iconLead : varIcon ? "styles" : null;
    const resolvedLabel = varPill ? label : null;
    return h(InputField, { ...props, label: resolvedLabel, value, variant: "Numeric", state, disabled, variable: varPill, icon: leadIcon, iconLead: Boolean(leadIcon), dropdown, className });
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
      [iconNode(h, Icon, "styles"), h("span", { key: "label" }, label)]
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

  function ColorInput({ type = "Fill", shape = "square", value, opacityValue, state = "rest", disabled = false, className = "", onChange, onInput, onOpacityChange, onOpacityInput, ...props }) {
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
        className: cx("composa-color-input", `composa-color-${resolvedType}`, `composa-color-shape-${resolvedShape}`, stateClass(resolvedState), className),
        "data-composa-component": "ColorInput",
        "data-type": resolvedType,
        "data-shape": resolvedShape,
        "data-state": resolvedState,
        "data-disabled": boolData(disabled),
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
          className: "composa-color-value",
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
            value: displayOpacity,
            "aria-label": `${type} opacity`,
            disabled,
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
            h("input", { key: "field", className: "composa-combo-input-field", type: "text", value, disabled, "aria-label": label || "Combo input value", onChange, onInput }),
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
      h("span", { className: "composa-switch-thumb" })
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
        : [h("span", { key: "mark", className: "composa-radio-mark" }), h("span", { key: "label", className: "composa-selection-label" }, label)]
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
          { key: "mark", className: "composa-checkbox-mark" },
          mixed
            ? builtinGlyph(h, BUILTIN_GLYPHS.minus, true)
            : isChecked
              ? builtinGlyph(h, BUILTIN_GLYPHS.check, true)
              : null
        ),
        showLabel
          ? h("span", { key: "copy", className: "composa-selection-copy" }, [
              h("span", { key: "label", className: "composa-selection-label" }, resolvedLabelText),
              showDescription ? h("span", { key: "description", className: "composa-selection-description" }, descriptionText) : null,
            ])
          : null,
      ]
    );
  }

  function Tooltip({ label = "Tooltip", placement = "top", tone = "inverse", className = "", ...props }) {
    return h(
      "div",
      { ...props, className: cx("composa-tooltip", `composa-tooltip-${placement}`, `composa-tooltip-${tone}`, className), "data-composa-component": "Tooltip", "data-placement": placement, "data-tone": tone, role: "tooltip" },
      [h("span", { key: "label", className: "composa-tooltip-label" }, label), h("span", { key: "arrow", className: "composa-tooltip-arrow" })]
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
            trailing: h(IconButton, { key: "close", icon: "plusSmall", label: "Close dialog", className: "composa-dialog-close" }),
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

  function Dropdown({ label, value, icon, size = "medium", width = "auto", state = "rest", disabled = false, stroke = true, iconLead = false, open, onOpenChange, onClick, className = "", children, ...props }) {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isOpen = open !== undefined ? open : internalOpen;
    const resolvedSize = propToken(size);
    const resolvedWidth = normalizeWidth(width);
    const resolvedState = propToken(state);
    const handleClick = (event) => {
      if (disabled) return;
      const nextOpen = !isOpen;
      if (open === undefined) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen, event);
      onClick?.(event);
    };
    return h(
      "button",
      {
        ...props,
        className: cx("composa-dropdown", `composa-dropdown-${resolvedSize}`, `composa-dropdown-width-${resolvedWidth}`, isOpen && "is-open", stateClass(isOpen ? "active" : resolvedState), !stroke && "is-borderless", className),
        "data-composa-component": "Dropdown",
        "data-size": resolvedSize,
        "data-width": resolvedWidth,
        "data-state": isOpen ? "active" : resolvedState,
        "data-disabled": boolData(disabled),
        "data-open": boolData(isOpen),
        "data-stroke": boolData(stroke),
        "data-icon-lead": boolData(iconLead),
        "aria-haspopup": "menu",
        "aria-expanded": isOpen ? "true" : "false",
        "aria-label": label,
        onClick: handleClick,
        disabled,
      },
      children ?? [icon && iconLead ? iconNode(h, Icon, icon) : null, h("span", { key: "value" }, value), iconNode(h, Icon, "chevronDown")]
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
      // strip of icon buttons: [leading check when selected][shape icon][label]
      // [shortcut]. Multiple stacked rows form a shape picker; the selected one
      // carries the check.
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
          selected ? h("span", { key: "check", className: "composa-menu-toolbar-check", "aria-hidden": "true" }, "✓") : null,
          h("span", { key: "icon", className: "composa-menu-leading" }, iconNode(h, Icon, toolIcon)),
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
      children
    );
  }

  function TextPair({ title, description = null, titleAs = "strong", className = "", titleClassName = "", descriptionClassName = "", ...props }) {
    const TitleTag = titleAs;
    return h(
      "div",
      {
        ...props,
        className: cx("composa-text-pair", className),
        "data-composa-component": "TextPair",
      },
      [
        h(TitleTag, { key: "title", className: cx("composa-text-pair-title", titleClassName) }, title),
        description ? h("span", { key: "description", className: cx("composa-text-pair-description", descriptionClassName) }, description) : null,
      ]
    );
  }

  // Normalizes a Label level. `level` is a real font hierarchy (1 = most
  // prominent, 3 = quietest) and pairs 1:1 with ListCell's `level`. Old
  // `hierarchy` strings map onto a level: menu->1, section->2, property->3,
  // layer->3.
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
          ? h("div", { key: "leading", className: "composa-list-cell-leading" }, leadingNode)
          : null,
        h("div", { key: "content", className: "composa-list-cell-content" }, [content]),
        trailing ? h(HeaderActions, { key: "actions", className: "composa-list-cell-trailing" }, Array.isArray(trailing) ? trailing : [trailing]) : null,
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

  function SegmentedControl({ label, options = [], value, defaultValue, onValueChange, variant = "icon", state = "rest", disabled = false, className = "", ...props }) {
    const selectedFromOptions = options.findIndex((option) => option.selected);
    const fallbackValue = defaultValue ?? (selectedFromOptions >= 0 ? optionValue(options[selectedFromOptions], selectedFromOptions) : optionValue(options[0] || {}, 0));
    const [internalValue, setInternalValue] = React.useState(fallbackValue);
    const selectedValue = value ?? internalValue;
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
        className: cx("composa-segmented-control", `composa-segmented-${variant}`, stateClass(state), className),
        "data-composa-component": "SegmentedControl",
        "data-variant": variant,
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
        return variant === "label"
          ? h(
              "button",
              {
                key: option.id ?? option.label ?? index,
                className: cx("composa-segmented-label", selected && "is-selected"),
                "data-composa-component": "SegmentedControlItem",
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
              "data-value": nextValue,
              onClick: (event) => handleSelect(nextValue, option, index, event),
            });
      })
    );
  }

  function Tab({ label, selected = false, singleTab = false, state = "rest", className = "", ...props }) {
    return h(
      "button",
      {
        ...props,
        className: cx("composa-tab", selected && "is-selected", singleTab && "is-single", stateClass(state), className),
        "data-composa-component": "Tab",
        "data-state": state,
        role: "tab",
        "aria-selected": selected ? "true" : "false",
      },
      h("span", { className: "composa-tab-label" }, label)
    );
  }

  function Tabs({ tabs = [], value, defaultValue, onValueChange, variant = "underline", size = "medium", state = "rest", label = "Tabs", className = "", ...props }) {
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
      { ...props, className: cx("composa-tabs", `composa-tabs-${variant}`, `composa-tabs-${size}`, stateClass(state), className), "data-composa-component": "Tabs", "data-variant": variant, "data-size": size, "data-state": state, "data-tab-count": String(tabs.length), role: "tablist", "aria-label": label },
      tabs.map((tab, index) => {
        const nextValue = optionValue(tab, index);
        return h(Tab, { key: tab.id ?? tab.label ?? index, singleTab: tabs.length === 1, state, ...tab, selected: nextValue === selectedValue, "data-value": nextValue, onClick: (event) => handleSelect(nextValue, tab, index, event) });
      })
    );
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

  // License-clean default glyphs per layer kind (plain characters, not shipped
  // icon assets). Consumers can pass an `icon` slot per item to override.
  const TREE_KIND_GLYPHS = { frame: "#", group: "#", autoLayout: "#", section: "#", component: "◇", instance: "◇", shape: "◇", vector: "◇", text: "T", image: "▢", locked: "▢" };

  function TreeRow({ id, label = "Layer", icon, kind = "frame", depth = 0, selected = false, secondarySelected = false, expanded, hasChildren = false, onToggle, onClick, className = "", style, ...props }) {
    const showDisclosure = expanded !== undefined || hasChildren;
    const resolvedExpanded = expanded === undefined && hasChildren ? true : expanded;
    const layerGlyph = icon != null ? iconNode(h, Icon, icon) : TREE_KIND_GLYPHS[kind] || TREE_KIND_GLYPHS.frame;
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
  function Tree({ items = [], selectedId, defaultSelectedId, onSelect, label = "Layers", className = "", ...props }) {
    const [internalSelected, setInternalSelected] = React.useState(defaultSelectedId);
    const [collapsedMap, setCollapsedMap] = React.useState({});
    const selected = selectedId !== undefined ? selectedId : internalSelected;
    const toggle = (id) => setCollapsedMap((current) => ({ ...current, [id]: !current[id] }));
    const select = (id, node, event) => {
      if (selectedId === undefined) setInternalSelected(id);
      onSelect?.(id, node, event);
    };
    const rows = [];
    const walk = (nodes, depth) => {
      nodes.forEach((node) => {
        const children = Array.isArray(node.children) ? node.children : [];
        const hasChildren = children.length > 0;
        const expanded = hasChildren ? !(collapsedMap[node.id] ?? node.expanded === false) : undefined;
        rows.push({ node, depth, hasChildren, expanded });
        if (hasChildren && expanded) walk(children, depth + 1);
      });
    };
    walk(items, 0);
    return h(
      "div",
      { ...props, className: cx("composa-tree", className), "data-composa-component": "Tree", role: "tree", "aria-label": label },
      rows.map(({ node, depth, hasChildren, expanded }) =>
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
          secondarySelected: Boolean(node.secondarySelected),
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
  };
}
