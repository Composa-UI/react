# Figma UI3 Variant Coverage

This file tracks the component-set axes currently represented in code and in the harness.

## Buttons

Source: Figma UI3 Buttons page, node `2012:46721`.

- `Button`: exact `Button` component set coverage from Figma node `2012:48557`: 175 variants.
- `Button`: axes observed in Figma are variant, size, state, disabled, icon lead, label, and hotkey.
- `IconButton`: exact `Button icon` component set coverage from Figma node `2324:46757`: 9 variants.
- `ToggleButton`: exact `Button icon toggle` component set coverage from Figma node `2324:46776`: 20 variants.
- `DialogToggleButton`: exact `Button icon dialog toggle` component set coverage from Figma node `2324:46817`: 19 variants.
- `SplitButton`: exact `Button icon split` component set coverage from Figma node `2324:46856`: 14 variants.

## Inputs

Source: Figma UI3 Inputs page, node `2028:75376`.

- `TextInput` / `InputField`: exact `Text input` component set coverage from Figma node `2028:79255`: 35 variants.
- `NumericInput`: exact `Numeric input` component set coverage from Figma node `2028:79190`: 13 variants.
- `NumericInputMulti`: exact `Numeric input multi` component set coverage from Figma node `2028:79619`: 5 variants.
- `ColorInput`: exact `Color input` component set coverage from Figma node `2028:79525`: 15 variants.
- `ComboInput`: exact `Combo input` component set coverage from Figma node `2028:79408`: 16 variants.
- `ChipVariable`: exact `_Chip variable` component set coverage from Figma node `2028:79753`: 8 variants.
- `Chit`: exact `_Chit 24` and `_Chit 48` component set coverage from Figma nodes `2028:79673` and `2028:79770`: 11 variants.
- `ChitInput`: exact `_Chit input` component set coverage from Figma node `2028:79847`: 4 variants.
- `ComboInputDropdown`: exact `_Combo input dropdown` component set coverage from Figma node `2028:79874`: 3 variants.

## Dropdown

Source: Figma UI3 Dropdown component, node `2028:36589`.

- `Dropdown`: exact published symbol coverage from Figma node `2028:36589`: 16 variants.
- Published axes are size, state, disabled, stroke, and icon lead.
- The harness intentionally does not render the full axis cross-product because Figma UI3 publishes only a subset of combinations.

## Segmented Control

Source: Figma UI3 Segmented control, node `2015:20960`.

- `SegmentedControl`: exact published symbol coverage from Figma node `2015:20960`: 20 variants.
- Published axes are variant `icon`/`label`, tab counts `02` through `06`, and state `default`/`disabled`.

## Tabs

Source: Figma UI3 Tabs page, node `2015:25519`.

- `Tabs`: exact component-set coverage from Figma node `2015:27780`: 4 variants.
- `_Tab`: exact component-set coverage from Figma node `2015:27758`: 7 variants.
- `_Tab` publishes only these combinations:
  - multi-tab selected true/default and true/focused.
  - multi-tab selected false/default, false/focused, and false/hover.
  - single-tab selected false/default and false/hover.
- Additional code styles: variants `pill`, `underline`; sizes `default`, `compact`.

## Controls, Tooltips, Dialogs

Source: Figma UI3 nodes shared for the current foundation pass.

- `Switch`: local readiness coverage from node `2015:24697`: 16 variants.
- `Radio`: local readiness coverage from node `2015:20365`: 8 variants.
- `Checkbox`: local readiness coverage from node `2012:55461`: 12 cells modeled as type x state x disabled. Figma property panel shows State `Default`/`Focused`, Type `Unchecked`/`Checked`/`Mixed`, plus Disabled, Muted, Ghost, Label, and Description toggles.
- `Tooltip`: local readiness coverage from node `2015:32842`: 8 variants.
- `Dialog`: local readiness coverage from node `2327:122027`: 6 variants.
- These counts are not yet a claim of exact published Figma variant parity. Refresh them from live Figma component metadata when Code Connect context is available.

## Menu

Source: Figma UI3 Menu, node `2028:86486`.

- `Menu row/Simple`: exact component-set coverage from Figma node `2327:96028`: 5 variants.
- `Menu row/Complex`: exact component-set coverage from Figma node `2327:96049`: 30 variants.
- `Menu row/Checkmark`: exact component-set coverage from Figma node `2327:96252`: 7 variants.
- `Menu row/Toggle`: exact component-set coverage from Figma node `2327:96288`: 4 variants.
- `Menu row/Toolbar`: exact component-set coverage from Figma node `2327:96311`: 3 variants.
- `Menu row/Heading`: exact component-set coverage from Figma node `2327:96347`: 2 variants.
- `Menu row/Expand`: exact component-set coverage from Figma node `2327:96333`: 4 variants.
- `Menu row/Footer`: exact component-set coverage from Figma node `2327:96342`: 1 variant.
- `MenuMultiSelect`: exact component-set coverage from Figma node `2327:96387`: 4 variants.
- `_Menu resizing`: exact component-set coverage from Figma node `2327:96662`: 2 variants.
- `Menu row/Divider`: standalone Menu row component from Figma node `2327:96331`: 1 variant.

## Verification

The harness renders the variant matrices under `harness.html`.

Expected current browser audit:

- `VariantMatrix`: 5
- `VariantCell`: 507
- `Button`: 181
- `IconButton`: 25
- `ToggleButton`: 21
- `DialogToggleButton`: 19
- `SplitButton`: 15
- `InputField`: 96
- `NumericInputMulti`: 5
- `ColorInput`: 15
- `ComboInput`: 16
- `ChipVariable`: 8
- `Chit`: 11
- `ChitInput`: 4
- `ComboInputDropdown`: 3
- `Dropdown`: 18
- `Switch`: 16
- `Radio`: 8
- `Checkbox`: 12
- `Tooltip`: 8
- `Dialog`: 6
- `SegmentedControl`: 21
- `MenuRow`: 78
- `MenuMultiSelect`: 5
- `MenuExample`: 5
- `Tab`: 21
- `Tabs`: 6
- `missingIcons`: 0
