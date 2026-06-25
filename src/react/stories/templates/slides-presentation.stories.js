import React from "react";
import { AppTopBar, shellStage } from "./_shell-helpers.js";

// Slide preview card used in both PresenterView and AudienceView.
function SlidePreview({ title, body, dark }) {
  return React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
        padding: 16,
        boxSizing: "border-box",
        background: dark ? "#111" : "var(--composa-color-bg)",
        textAlign: "left",
      },
    },
    React.createElement(
      "strong",
      { style: { fontSize: dark ? 22 : 11, color: dark ? "#fff" : "var(--composa-color-text)", fontFamily: "var(--composa-font-family)" } },
      title
    ),
    body
      ? React.createElement(
          "span",
          { style: { fontSize: dark ? 12 : 8, color: dark ? "rgba(255,255,255,0.6)" : "var(--composa-color-text-secondary)", fontFamily: "var(--composa-font-family)" } },
          body
        )
      : null
  );
}

var SLIDES = [
  { id: "s1", title: "Slide Deck Title", body: "This is just the opening of something big." },
  { id: "s2", title: "Highlight", body: "Use this slide to highlight a single important thing." },
  { id: "s3", title: "Agenda", body: "Three things to cover today." },
  { id: "s4", title: "Wrap up", body: "Next steps and owners." },
];

var SPEAKER_NOTES = "Welcome everyone. Today we\'ll walk through the product refresh roadmap for Earthling Mobile, " +
  "covering the three main themes: simplicity, speed, and accessibility. " +
  "Feel free to jump in with questions at any time.";

// PresenterLayout — two-column layout dedicated to the presenter.
// Left column: main slide (large) + speaker notes below.
// Right column: slide thumbnail carousel.
// Figma: 'Presenter view' node 2723:240998 (file 4kilp0ShQiYsoUPJdleqEH).
function PresenterLayout({
  slides,
  currentSlideIndex,
  notes,
  appLabel,
  fileName,
}) {
  var idx = currentSlideIndex != null ? currentSlideIndex : 0;
  var current = slides[idx];

  var topBar = React.createElement(AppTopBar, {
    appLabel: appLabel || "Composa",
    fileName: fileName || "Earthling Mobile Refresh",
    collaborators: [
      { initials: "W", color: "yellow", label: "Wendy" },
    ],
    shareLabel: "Share",
  });

  var mainContent = React.createElement(
    "div",
    {
      style: {
        display: "flex",
        height: "100%",
        overflow: "hidden",
        background: "var(--composa-color-bg)",
      },
    },
    // Left — large slide + speaker notes
    React.createElement(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRight: "1px solid var(--composa-color-border)",
        },
      },
      // Main slide
      React.createElement(
        "div",
        {
          style: {
            flex: 1,
            background: "#111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--composa-space-4, 24px)",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              width: "100%",
              maxWidth: 720,
              aspectRatio: "16 / 9",
              background: "#1a1a1a",
              borderRadius: "var(--composa-radius-medium, 5px)",
              overflow: "hidden",
            },
          },
          React.createElement(SlidePreview, { title: current.title, body: current.body, dark: true })
        )
      ),
      // Speaker notes
      React.createElement(
        "div",
        {
          style: {
            height: 160,
            flexShrink: 0,
            padding: "var(--composa-space-2, 8px) var(--composa-space-3, 16px)",
            borderTop: "1px solid var(--composa-color-border)",
            overflow: "auto",
            background: "var(--composa-color-bg)",
          },
        },
        React.createElement(
          "p",
          {
            style: {
              margin: 0,
              fontSize: "var(--composa-body-medium-size, 11px)",
              color: "var(--composa-color-text-secondary)",
              fontFamily: "var(--composa-font-family)",
              lineHeight: 1.6,
            },
          },
          notes || "No speaker notes."
        )
      )
    ),
    // Right — slide carousel
    React.createElement(
      "div",
      {
        style: {
          width: 200,
          flexShrink: 0,
          overflow: "auto",
          padding: "var(--composa-space-2, 8px)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--composa-space-2, 8px)",
          background: "var(--composa-color-bg)",
        },
      },
      ...slides.map(function (s, i) {
        var isActive = i === idx;
        return React.createElement(
          "div",
          {
            key: s.id,
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "var(--composa-space-1, 4px)",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                width: "100%",
                aspectRatio: "16 / 9",
                background: "var(--composa-color-bg-secondary)",
                border: "2px solid " + (isActive ? "var(--composa-color-bg-brand, #ff5c16)" : "var(--composa-color-border)"),
                borderRadius: "var(--composa-radius-small, 2px)",
                overflow: "hidden",
                cursor: "pointer",
              },
            },
            React.createElement(SlidePreview, { title: s.title })
          ),
          React.createElement(
            "span",
            {
              style: {
                fontSize: "var(--composa-body-small-size, 10px)",
                color: isActive ? "var(--composa-color-text)" : "var(--composa-color-text-secondary)",
                fontFamily: "var(--composa-font-family)",
                textAlign: "center",
              },
            },
            String(i + 1)
          )
        );
      })
    )
  );

  return shellStage(topBar, mainContent);
}

// AudienceLayout — full-screen view for viewers / presenter screencasting.
// Slide fills the viewport; minimal nav controls at the bottom.
// Figma: 'Audience view' node 2723:241123 (file 4kilp0ShQiYsoUPJdleqEH).
function AudienceLayout({ slides, currentSlideIndex, appLabel, fileName }) {
  var idx = currentSlideIndex != null ? currentSlideIndex : 0;
  var current = slides[idx];
  var total = slides.length;

  return React.createElement(
    "div",
    {
      className: "composa-shell-stage",
      style: { background: "#000" },
    },
    // Full-bleed slide
    React.createElement(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--composa-space-4, 24px)",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            width: "100%",
            maxWidth: 960,
            aspectRatio: "16 / 9",
            background: "#1a1a1a",
            borderRadius: "var(--composa-radius-medium, 5px)",
            overflow: "hidden",
          },
        },
        React.createElement(SlidePreview, { title: current.title, body: current.body, dark: true })
      )
    ),
    // Navigation bar
    React.createElement(
      "div",
      {
        style: {
          height: "var(--composa-height-heading, 40px)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--composa-space-2, 8px)",
          background: "rgba(255,255,255,0.06)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        },
      },
      React.createElement(
        "button",
        {
          style: {
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.7)",
            cursor: idx === 0 ? "default" : "pointer",
            opacity: idx === 0 ? 0.3 : 1,
            fontSize: 14,
            padding: "0 var(--composa-space-1, 4px)",
          },
        },
        "‹"
      ),
      React.createElement(
        "span",
        {
          style: {
            color: "rgba(255,255,255,0.7)",
            fontSize: "var(--composa-body-medium-size, 11px)",
            fontFamily: "var(--composa-font-family)",
            minWidth: 48,
            textAlign: "center",
          },
        },
        (idx + 1) + " / " + total
      ),
      React.createElement(
        "button",
        {
          style: {
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.7)",
            cursor: idx === total - 1 ? "default" : "pointer",
            opacity: idx === total - 1 ? 0.3 : 1,
            fontSize: 14,
            padding: "0 var(--composa-space-1, 4px)",
          },
        },
        "›"
      )
    )
  );
}

export default {
  title: "Composa UI/Templates/Editor/SlidesPresentations",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Presenter and Audience view layouts for Slides. These are full-viewport " +
          "compositions that differ structurally from the EditorShell grid — " +
          "they do not use SlidesEditorTemplate. " +
          "Figma references: Presenter view node 2723:240998, " +
          "Audience view node 2723:241123 (file 4kilp0ShQiYsoUPJdleqEH).",
      },
    },
  },
};

export const PresenterView = {
  name: "Presenter view",
  render: function () {
    return React.createElement(PresenterLayout, {
      slides: SLIDES,
      currentSlideIndex: 0,
      notes: SPEAKER_NOTES,
      appLabel: "Composa",
      fileName: "Earthling Mobile Refresh",
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Presenter view: main slide (large, dark background) + speaker notes below on the left; " +
          "slide thumbnail carousel on the right. The active slide is highlighted with an accent border.",
      },
    },
  },
};

export const AudienceView = {
  name: "Audience view",
  render: function () {
    return React.createElement(AudienceLayout, {
      slides: SLIDES,
      currentSlideIndex: 0,
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Audience view: full-bleed slide on a dark background with minimal navigation " +
          "controls at the bottom (‹ 1 / 4 ›). Used for viewer browsing and presenter screencasting.",
      },
    },
  },
};

export const AudienceViewMidDeck = {
  name: "Audience view — mid-deck",
  render: function () {
    return React.createElement(AudienceLayout, {
      slides: SLIDES,
      currentSlideIndex: 2,
    });
  },
  parameters: {
    docs: {
      description: {
        story: "Audience view with the third slide active. Previous and next arrows are both enabled.",
      },
    },
  },
};
