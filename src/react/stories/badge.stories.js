import React from "react";
import { Badge, BadgeAnchor, IconButton, Avatar } from "../story-runtime.js";

const h = React.createElement;

const stage = (children, { dark = false, width, pad = 32 } = {}) =>
  h(
    "div",
    {
      style: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 16,
        padding: pad,
        minHeight: 120,
        background: dark
          ? "var(--composa-color-bg-inverse, #2c2c2c)"
          : "var(--composa-color-bg-secondary, #f5f5f5)",
        ...(width ? { width } : null),
      },
    },
    children
  );

const row = (label, node) =>
  h("div", { key: label, style: { display: "flex", flexDirection: "column", gap: 8 } }, [
    h("span", { key: "l", style: { fontSize: 11, color: "var(--composa-color-text-secondary)" } }, label),
    h("div", { key: "n", style: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" } }, node),
  ]);

const TONES = [
  "default", "brand", "figjam", "component", "danger", "warning", "success",
  "merged", "archived", "selected", "feedback", "invert",
];

// ── Badge ────────────────────────────────────────────────────────────────

export default {
  title: "Composa UI/Components/Feedback/Badge",
  component: Badge,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Badges call attention to status (UI3 Badges page 2012-32973). One component spans three shapes: " +
          "`dot` (the bare unread indicator), `count` (a number badge that clamps to `{max}+`), and `label`/children (a status pill). " +
          "`tone` picks the color family; `strong` switches the subtle tinted form to the strong filled form. " +
          "Badge composes onto buttons/avatars/nav items via **BadgeAnchor** (or the `overlay` prop) — that is the foundation the notification bell is built on.",
      },
    },
  },
};

export const Playground = (args) => stage([h(Badge, args)]);
Playground.args = { label: "New", tone: "brand", strong: false, size: "small" };

export const Tones = () =>
  stage([
    row("Subtle", TONES.map((tone) => h(Badge, { key: tone, label: tone, tone }))),
    row("Strong", TONES.map((tone) => h(Badge, { key: tone, label: tone, tone, strong: true }))),
    row("With icon (branch)", [
      h(Badge, { key: "m", label: "Merged", tone: "merged", icon: "move" }),
      h(Badge, { key: "a", label: "Archived", tone: "archived", icon: "move" }),
    ]),
  ]);

export const CountAndDot = () =>
  stage([
    row("Count", [
      h(Badge, { key: "1", count: 1, tone: "danger", strong: true }),
      h(Badge, { key: "9", count: 9, tone: "danger", strong: true }),
      h(Badge, { key: "42", count: 42, tone: "brand", strong: true }),
      h(Badge, { key: "max", count: 240, max: 99, tone: "danger", strong: true }),
    ]),
    row("Dot", [
      h(Badge, { key: "d1", dot: true, tone: "danger", strong: true }),
      h(Badge, { key: "d2", dot: true, tone: "brand", strong: true }),
      h(Badge, { key: "d3", dot: true, tone: "success", strong: true }),
    ]),
  ]);

export const OnHosts = () =>
  stage([
    row("On an IconButton", [
      h(BadgeAnchor, { key: "b1", badge: 3 }, h(IconButton, { icon: "comment", label: "Comments" })),
      h(BadgeAnchor, { key: "b2", badge: true }, h(IconButton, { icon: "more", label: "More" })),
    ]),
    row("On an Avatar", [
      h(BadgeAnchor, { key: "a1", badge: true, placement: "bottom-end" }, h(Avatar, { initials: "JW", variant: "blue" })),
      h(
        BadgeAnchor,
        { key: "a2", badge: { count: 5, tone: "brand" } },
        h(Avatar, { initials: "SK", variant: "yellow" })
      ),
    ]),
  ]);
