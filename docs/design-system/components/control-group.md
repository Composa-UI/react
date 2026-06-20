# ControlGroup

ControlGroup is a compact grouping primitive for adjacent icon actions. Use it when several controls sit together visually but do not represent one selected value.

## Use

| Use ControlGroup | Use a different component |
| --- | --- |
| Alignment action groups, rotate/flip groups, transform utilities, and other adjacent icon actions. | Use `SegmentedControl` when one option is the current selected choice. Use `SplitButton` for one primary action plus one menu action. |

## Anatomy

ControlGroup renders one visual control surface with repeated icon-button slots:

1. Container surface.
2. One slot per action.
3. Tokenized visual split between slots.
4. Optional selected or active state per slot when the action is a toggle.
5. Tooltip per action when a label is provided.

## Contract

- The group owns visible segment separation. Sections should not add their own divider lines or white backgrounds around grouped icon buttons.
- Only the OUTER edges round. The whole group reads as one rounded rectangle: the first segment rounds its left corners (top-left + bottom-left), the last segment rounds its right corners (top-right + bottom-right), and every middle segment is square. A single-segment group keeps all four corners rounded. Do not round each segment independently. The same edge-rounding contract applies to the multi-value input (`NumericInputMulti`).
- The frame stays dense: 24px control height by default.
- Icon sizing should be chosen at the primitive level and verified at right-panel width. If icons overpower the 24px frame, reduce the glyph size in ControlGroup rather than patching each section.
- Hover state belongs to the hovered action only. A selected action may keep selected styling, but hover text/color should not bleed into another segment.
- Tooltips belong to each action, not the entire group, unless the whole group is a single target.
- Use official Material Symbols names for icons. Do not draw local fallback paths.

## Inspector Usage

Common inspector groups:

| Context | Expected behavior |
| --- | --- |
| Position alignment | Horizontal and vertical alignment controls show visible split spacing between each action. |
| Rotation/flip | Rotation and flip controls share one grouped action surface. |
| Stroke side utilities | If choices need a menu with checkmark and side icons, use `MenuRow type="toolbar"` instead of ControlGroup. |

## Storybook Checks

ControlGroup stories should show:

- default grouped actions without a white story-only background;
- hover on one action without preserving hover on the previous action;
- selected or active action state when a toggle use case exists;
- 24px right-panel density;
- visible split spacing at normal and fill widths.
