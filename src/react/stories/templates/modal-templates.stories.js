import React from "react";
import { Dialog } from "../../story-runtime.js";

export default {
  title: "Composa UI/Templates/Modal",
  parameters: {
    docs: {
      description: {
        component:
          "Assembled modal templates from the Figma spec (node 2327:122333, " +
          "file 4kilp0ShQiYsoUPJdleqEH). Each template composes a Modal header, " +
          "body, and footer into a complete surface ready for a product task. " +
          "Widths follow the Figma rule: 320 for text-only tasks, 480 for forms " +
          "and lists. See the Dialog component docs for individual part documentation.",
      },
    },
  },
};

const ce = React.createElement;

// Tiny helpers keep the raw createElement calls below readable.
function dlg(width, ...parts) {
  return ce("div", { className: `composa-dialog composa-dialog-${width}` }, ...parts);
}
function hdr(title) {
  return ce(
    "div",
    { className: "composa-dialog-header", "data-part": "header" },
    ce("h2", { className: "composa-dialog-title" }, title),
  );
}
function body(...children) {
  return ce("div", { className: "composa-dialog-body", "data-part": "body" }, ...children);
}
function foot(left, ...buttons) {
  return ce(
    "div",
    { className: "composa-dialog-actions", "data-part": "footer" },
    left
      ? ce("span", { style: { marginRight: "auto", fontSize: 11, color: "var(--composa-color-text-secondary)" } }, left)
      : null,
    ...buttons,
  );
}
function row(...children) {
  return ce(
    "div",
    { className: "composa-list-cell composa-dialog-row" },
    ...children,
  );
}
function label(text) {
  return ce("span", { className: "composa-list-cell-content", style: { fontSize: 11, color: "var(--composa-color-text-secondary)" } }, text);
}

// ---------------------------------------------------------------------------
// 320 / Basic
// Figma node 2327:134405 — text-only dialog, single CTA.
// ---------------------------------------------------------------------------
export const Basic320 = {
  name: "320 / Basic",
  render: () =>
    ce(Dialog, {
      size: "320",
      title: "Title",
      description:
        "Hello, I'm a dialog, quite a flexible sight, stretch me left, stretch me right, " +
        "in any size, I'll fit just right, adapting to your needs, day or night. " +
        "Mold me, fold me, as you please, I'll reshape with the greatest ease, " +
        "from tiny to wide, I'll be your guide.",
      primaryLabel: "Button",
    }),
};

// ---------------------------------------------------------------------------
// 320 / Advanced
// Figma node 2327:134401 — text-only dialog with a richer description and
// a sharing-style list of people below the lead copy.
// ---------------------------------------------------------------------------
export const Advanced320 = {
  name: "320 / Advanced",
  render: () =>
    dlg(
      "320",
      hdr("Title"),
      body(
        ce("p", null,
          "Hello, I’m a dialog, quite a flexible sight, stretch me left, stretch me right, " +
          "in any size, I’ll fit just right, adapting to your needs, day or night. " +
          "Mold me, fold me, as you please, I’ll reshape with the greatest ease, " +
          "from tiny to wide, I’ll be your guide.",
        ),
        row(
          ce("span", { className: "composa-list-cell-leading" }),
          ce("span", { className: "composa-list-cell-content" }, "Lizzy Lasagna (you)"),
          ce("span", { className: "composa-list-cell-trailing", style: { fontSize: 11 } }, "can edit"),
        ),
        row(
          ce("span", { className: "composa-list-cell-leading" }),
          ce("span", { className: "composa-list-cell-content" }, "Lizzy Lasagna (you)"),
          ce("span", { className: "composa-list-cell-trailing", style: { fontSize: 11 } }, "can edit"),
        ),
        row(
          ce("span", { className: "composa-list-cell-content" }, "Anyone can view this file"),
        ),
        row(
          ce("span", { className: "composa-list-cell-content" }, "••• More"),
        ),
      ),
      foot(null,
        ce("button", { className: "composa-button" }, "Button"),
      ),
    ),
};

// ---------------------------------------------------------------------------
// 480 / Sharing
// Figma node 2327:134402 — sharing panel with invite input, access list,
// and multi-action footer.
// ---------------------------------------------------------------------------
export const Sharing480 = {
  name: "480 / Sharing",
  render: () =>
    dlg(
      "480",
      hdr("Share this team"),
      body(
        row(
          ce("span", { className: "composa-list-cell-content", style: { flex: 1 } },
            ce("input", {
              placeholder: "Text, Default",
              style: { width: "100%", font: "inherit", fontSize: 11, border: "none", outline: "none", background: "transparent" },
            }),
          ),
          ce("span", { className: "composa-list-cell-trailing", style: { fontSize: 11 } }, "can view"),
          ce("button", { className: "composa-button composa-button-primary", style: { fontSize: 11 } }, "Share"),
        ),
        ce("div", { style: { borderTop: "1px solid var(--composa-color-border)", margin: "0 calc(-1 * var(--composa-space-2-5))" } }),
        row(ce("span", { className: "composa-list-cell-content" }, "Anyone can view this file")),
        row(ce("span", { className: "composa-list-cell-content" }, "Only invited people can access")),
        ce("div", { style: { borderTop: "1px solid var(--composa-color-border)", margin: "0 calc(-1 * var(--composa-space-2-5))" } }),
        row(
          ce("span", { className: "composa-list-cell-content" }, "Lizzy Lasagna (you)"),
          ce("span", { className: "composa-list-cell-trailing", style: { fontSize: 11 } }, "Owner"),
        ),
        row(
          ce("span", { className: "composa-list-cell-content" }, "Allen Anabelle"),
          ce("span", { className: "composa-list-cell-trailing", style: { fontSize: 11 } }, "can edit"),
        ),
        row(
          ce("span", { className: "composa-list-cell-content" }, "Bobby Bucatini"),
          ce("span", { className: "composa-list-cell-trailing", style: { fontSize: 11 } }, "can edit"),
        ),
        row(
          ce("span", { className: "composa-list-cell-content" }, "Pedro Penne"),
          ce("span", { className: "composa-list-cell-trailing", style: { fontSize: 11 } }, "can edit"),
        ),
        row(ce("span", { className: "composa-list-cell-content" }, "Start open session")),
        row(ce("span", { className: "composa-list-cell-content" }, "Publish template")),
        row(ce("span", { className: "composa-list-cell-content" }, "••• More")),
      ),
      ce(
        "div",
        { className: "composa-dialog-actions", "data-part": "footer", style: { justifyContent: "space-between" } },
        ce("span", { style: { display: "flex", gap: 8, alignItems: "center", fontSize: 11 } },
          ce("button", { className: "composa-button composa-button-ghost" }, "Copy Link"),
          ce("button", { className: "composa-button composa-button-ghost" }, "Get Embed"),
          ce("label", { style: { display: "flex", gap: 4, alignItems: "center", fontSize: 11, cursor: "pointer" } },
            ce("input", { type: "checkbox" }),
            "Link to selection",
          ),
        ),
        ce("button", { className: "composa-button composa-button-primary" }, "Button"),
      ),
    ),
};

// ---------------------------------------------------------------------------
// 480 / Create Project
// Figma node 2327:134403 — multi-step form: title input + access dropdown,
// stepper in footer.
// ---------------------------------------------------------------------------
export const CreateProject480 = {
  name: "480 / Create Project",
  render: () =>
    dlg(
      "480",
      hdr("Create new project"),
      body(
        ce("p", null,
          "We recommend creating workspaces based on product areas, business units, " +
          "or working groups in your organization.",
        ),
        ce("div", { style: { display: "grid", gap: 4 } },
          label("Title"),
          ce("input", {
            placeholder: "eg Top Secret Ideas",
            style: { font: "inherit", fontSize: 11, padding: "4px 8px", border: "1px solid var(--composa-color-border)", borderRadius: 4, background: "var(--composa-color-bg-secondary)" },
          }),
        ),
        ce("div", { style: { display: "grid", gap: 4 } },
          label("Who has access"),
          ce("select", { style: { font: "inherit", fontSize: 11, padding: "4px 8px", border: "1px solid var(--composa-color-border)", borderRadius: 4 } },
            ce("option", null, "Teamwork"),
          ),
        ),
      ),
      foot(
        "Step 1 of 3",
        ce("button", { className: "composa-button" }, "Cancel"),
        ce("button", { className: "composa-button composa-button-primary" }, "Continue"),
      ),
    ),
};

// ---------------------------------------------------------------------------
// 480 / Create Team
// Figma node 2327:134404 — multi-step form: title, description (0/160),
// workspace + access dropdowns, hidden toggle, stepper in footer.
// ---------------------------------------------------------------------------
export const CreateTeam480 = {
  name: "480 / Create Team",
  render: () =>
    dlg(
      "480",
      hdr("Create team"),
      body(
        ce("p", null,
          "Hello, I’m a dialog, quite a flexible sight, stretch me left, stretch me right, " +
          "in any size, I’ll fit just right, adapting to your needs, day or night. " +
          "Mold me, fold me, as you please, I’ll reshape with the greatest ease, " +
          "from tiny to wide, I’ll be your guide.",
        ),
        ce("div", { style: { display: "grid", gap: 4 } },
          label("Title"),
          ce("input", {
            placeholder: "Add an optional description",
            style: { font: "inherit", fontSize: 11, padding: "4px 8px", border: "1px solid var(--composa-color-border)", borderRadius: 4, background: "var(--composa-color-bg-secondary)" },
          }),
        ),
        ce("div", { style: { display: "grid", gap: 4 } },
          label("Title"),
          ce("textarea", {
            placeholder: "Add an optional description",
            rows: 3,
            style: { font: "inherit", fontSize: 11, padding: "4px 8px", border: "1px solid var(--composa-color-border)", borderRadius: 4, background: "var(--composa-color-bg-secondary)", resize: "vertical" },
          }),
          ce("span", { style: { fontSize: 11, textAlign: "right", color: "var(--composa-color-text-secondary)" } }, "0/160"),
        ),
        ce("div", { style: { display: "grid", gap: 4 } },
          label("Workspace"),
          ce("select", { style: { font: "inherit", fontSize: 11, padding: "4px 8px", border: "1px solid var(--composa-color-border)", borderRadius: 4 } },
            ce("option", null, "Teamwork"),
          ),
        ),
        ce("div", { style: { display: "grid", gap: 4 } },
          label("Who has access"),
          ce("select", { style: { font: "inherit", fontSize: 11, padding: "4px 8px", border: "1px solid var(--composa-color-border)", borderRadius: 4 } },
            ce("option", null, "Teamwork"),
          ),
        ),
        label("Supporting text goes here."),
        ce("label", { style: { display: "flex", gap: 8, alignItems: "center", fontSize: 11, cursor: "pointer", color: "var(--composa-color-text)" } },
          ce("input", { type: "checkbox", defaultChecked: true }),
          "Make it hidden",
        ),
      ),
      foot(
        "1 of 3",
        ce("button", { className: "composa-button" }, "Cancel"),
        ce("button", { className: "composa-button composa-button-primary" }, "Continue"),
      ),
    ),
};

// ---------------------------------------------------------------------------
// 480 / Embed
// Figma node 2327:134406 — embed dialog: description, iframe code block,
// copy instruction, share-strip footer.
// ---------------------------------------------------------------------------
export const Embed480 = {
  name: "480 / Embed",
  render: () =>
    dlg(
      "480",
      hdr("Title"),
      body(
        ce("p", null,
          "Mold me, fold me, as you please, I’ll reshape with the greatest ease, " +
          "from tiny to wide, I’ll be your guide.",
        ),
        ce("input", {
          placeholder: "Add an optional description",
          style: { font: "inherit", fontSize: 11, padding: "4px 8px", border: "1px solid var(--composa-color-border)", borderRadius: 4, background: "var(--composa-color-bg-secondary)", width: "100%", boxSizing: "border-box" },
        }),
        ce("p", { style: { color: "var(--composa-color-text-secondary)", fontSize: 11 } }, "Supporting text to describe more specifics goes here."),
        ce("pre", {
          style: {
            font: "11px/1.6 monospace",
            background: "var(--composa-color-bg-secondary)",
            border: "1px solid var(--composa-color-border)",
            borderRadius: 4,
            padding: "8px",
            overflowX: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            margin: 0,
            color: "var(--composa-color-text-secondary)",
          },
        },
          `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450"\n  src="https://staging.figma.com/embed?embed_host=share&url=..."\n  allowfullscreen></iframe>`,
        ),
        ce("p", { style: { fontSize: 11, color: "var(--composa-color-text-secondary)" } }, "Click to copy and paste."),
      ),
      ce(
        "div",
        { className: "composa-dialog-actions", "data-part": "footer", style: { justifyContent: "space-between" } },
        ce("span", { style: { display: "flex", gap: 8, alignItems: "center", fontSize: 11, color: "var(--composa-color-text-secondary)" } },
          "Text, Default",
        ),
        ce("span", { style: { display: "flex", gap: 8, alignItems: "center" } },
          ce("span", { style: { fontSize: 11, color: "var(--composa-color-text-secondary)" } }, "can view"),
          ce("button", { className: "composa-button composa-button-primary" }, "Share"),
        ),
      ),
    ),
};
