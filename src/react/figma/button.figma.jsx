import figma from "@figma/code-connect";
import React from "react";
import { Button, IconButton, ToggleButton, SplitButton } from "@composa-ui/react";

const url = (nodeId) =>
  `https://www.figma.com/design/4kilp0ShQiYsoUPJdleqEH?node-id=${nodeId.replace(":", "-")}`;

// ─── Button ───────────────────────────────────────────────────────────────────
figma.connect(Button, url("2012:48557"), {
  props: {
    variant: figma.enum("👥 Variant", {
      Primary: "primary",
      Secondary: "secondary",
      Ghost: "ghost",
      Link: "link",
      "Link Danger": "link-danger",
      Destructive: "destructive",
      "Secondary Destruct": "secondary-destruct",
      Inverse: "inverse",
      Success: "success",
    }),
    // "Default" → omit (component default is medium).
    // "Wide"    → deprecated; rendered via the `width` prop below.
    size: figma.enum("👥 Size", {
      Large: "large",
    }),
    width: figma.enum("👥 Size", {
      Wide: "fill",
    }),
    disabled: figma.enum("🎛️ Disabled", {
      True: true,
      False: undefined,
    }),
    iconLead: figma.enum("🎛️ Icon Lead", {
      "Left-aligned": "left-aligned",
      "Center-aligned": "center-aligned",
    }),
  },
  example: ({ variant, size, width, disabled, iconLead }) => (
    <Button
      label="Button"
      variant={variant}
      size={size}
      width={width}
      disabled={disabled}
      iconLead={iconLead}
    />
  ),
});

// ─── IconButton ───────────────────────────────────────────────────────────────
// Figma ships only Default/Secondary; code supports the full variant vocabulary.
figma.connect(IconButton, url("2324:46757"), {
  props: {
    variant: figma.enum("👥 Variant", {
      Default: "secondary",
      Secondary: "secondary",
    }),
    disabled: figma.enum("🎛️ Disabled", {
      True: true,
      False: undefined,
    }),
  },
  example: ({ variant, disabled }) => (
    <IconButton
      icon="move"
      label="Action"
      variant={variant}
      disabled={disabled}
    />
  ),
});

// ─── ToggleButton ─────────────────────────────────────────────────────────────
figma.connect(ToggleButton, url("2324:46776"), {
  props: {
    pressed: figma.enum("🎛️ On", {
      True: true,
      False: false,
    }),
    disabled: figma.enum("🎛️ Disabled", {
      True: true,
      False: undefined,
    }),
  },
  example: ({ pressed, disabled }) => (
    <ToggleButton
      icon="move"
      label="Toggle"
      pressed={pressed}
      disabled={disabled}
      onClick={() => {}}
    />
  ),
});

// Dialog-opener variant — corner dot; active only while its dialog/popover is open.
figma.connect(ToggleButton, url("2324:46817"), {
  props: {
    dialogOpen: figma.enum("🎛️ On", {
      True: true,
      False: false,
    }),
    disabled: figma.enum("🎛️ Disabled", {
      True: true,
      False: undefined,
    }),
  },
  example: ({ dialogOpen, disabled }) => (
    <ToggleButton
      dialog
      icon="move"
      label="Open dialog"
      dialogOpen={dialogOpen}
      disabled={disabled}
    />
  ),
});

// ─── SplitButton ──────────────────────────────────────────────────────────────
figma.connect(SplitButton, url("2324:46856"), {
  props: {
    size: figma.enum("👥 Size", {
      Small: "small",
      Large: "large",
    }),
    disabled: figma.enum("🐣 State", {
      Disabled: true,
    }),
  },
  example: ({ size, disabled }) => (
    <SplitButton
      label="Action"
      icon="move"
      size={size}
      disabled={disabled}
      onClick={() => {}}
      onMenuClick={() => {}}
    />
  ),
});
