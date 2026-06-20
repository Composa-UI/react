# Claude handoff

Read `AGENTS.md` first, then read the component-builder workflow:

- `docs/design-system/composa-component-builder.md`

This repository is built component-first. For inspector work, fix repeated behavior at the primitive layer before patching individual sections:

- `Dropdown` owns trigger slots, chevron/value alignment, active state, and simple option menus.
- `MenuRow type="toolbar"` owns rows with both a reserved checkmark slot and a leading icon slot.
- `ControlGroup` owns visible separation between grouped icon buttons.
- `OverlayHost`, `OverlayPortal`, and `OverlayLayer` own tooltip, menu, and inspector-dialog placement.

Current inspector priority areas:

- overlay edge awareness and no top-left measuring flash;
- dropdown menus that stay within the overlay host and do not size to the full host;
- floating inspector dialogs beside the rail, not inside scroll content;
- consistent inspector section insets and bottom spacing;
- documented state matrices before adding more section-local branches.

Do not assume hidden local Codex skills are available. Repo-local guidance lives in `AGENTS.md`, this file, and `docs/design-system/composa-component-builder.md`.
