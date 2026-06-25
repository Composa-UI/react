# Badge — Carbon gap analysis

Compares Composa **Badge** (`src/react/stories/badges.mdx`) against Carbon **Tag** (oracle).
Carbon = oracle, but the mapping is **loose**: Carbon Tag is a broadly interactive, category/
filter component (read-only / dismissible / selectable / operational), whereas our Badge is a
**static status indicator** with label/count/dot shapes and a host-anchor composition. Divergences
are flagged inline. Sources: Carbon `tag/usage.mdx`, `tag/style.mdx`, `tag/accessibility.mdx`
(all fetched 2026-06; no 404s).

## Coverage diff

| Category | Composa Badge | Carbon Tag | Verdict |
|---|---|---|---|
| **Variants — read-only** | Yes — label badge is the core static marker | "Tags that have no interactive functionality… categorizing and labeling" | Covered (our whole component ≈ Carbon read-only) |
| **Variants — dismissible** | None (badge is explicitly non-interactive) | "can be dismissed, closed, or removed… filtering and user-generated content" | **Diverges — N/A** (see Not applicable) |
| **Variants — selectable** | None | "can be selected or deselected… filter data in the context of a page" | **Diverges — N/A** |
| **Variants — operational** | None | "can disclose additional or overflow tags… popover, modal, or breadcrumb" | **Diverges — N/A** |
| **Color / tone semantics (what each color MEANS)** | Strong: each tone documented by *meaning* (danger=errors, warning=potential issues, success=approval, brand/figjam=new/beta, neutral=user labels, merged/archived=branch status) | Carbon's *meaning* is the **opposite philosophy**: "use multiple colors to denote different categories"; "Don't use the same color for every tag." Color = category distinction, not fixed semantic | **Both have semantics, but they MEAN different things** — we encode status, Carbon encodes category. Our semantics are stronger/clearer for a status badge. Minor gap: we don't state the rule "don't rely on tone to carry the only signal" as a content rule (we do say it in a11y). |
| **Sizes** | small (`body.medium`) / large (`body.large`); height fixed 16 | small (18px) / medium (24px, default) / large (32px); "small in condensed/inline, medium default" | Partial gap — we have 2 sizes vs Carbon's 3; our 16px height is denser than Carbon's smallest (18). No when-to-use-which-size guidance in ours. |
| **Count vs dot vs label** | All three: label pill, count (clamps `{max}+`), bare dot | Carbon has none of these — no count/dot concept | **Composa superset.** Carbon silent; no oracle to cite. |
| **Truncation / max-width** | **Not documented** | "title can be truncated with an ellipsis" when too long; "use a browser tooltip to show full length"; "Don't wrap overflow title text to multiple lines"; titles "under 20 characters when possible" | **GAP** — Carbon has explicit truncation rules, we have none. |
| **Interactive vs static** | Explicitly static/non-interactive; host carries any interaction | Carbon spans static → fully interactive across its 4 variants | Diverges by design — we are the read-only slice only. Clearly stated in ours. |
| **Keyboard** (only if dismissible/selectable) | None — "not focusable," host owns keyboard | dismissible/selectable/operational tags are in tab order, `Enter`/`Space` to dismiss/toggle/disclose | **N/A** — no interactive variants in ours. |
| **Screen reader — status announcement** | Label reads as text; count/dot must be carried by host's accessible name ("Comments, 3 unread"); don't encode by color alone | Carbon a11y doc is **silent** on SR announcements / ARIA (noted omission) | **Composa stronger.** No oracle to cite; our guidance stands. |
| **When-to-use badge vs tag vs notification** | "When to use" + "Not a badge" (use a Button/control if interactive); count/dot is "the foundation the notification bell is built on" | "Do not use tags as links… to a different page"; "Avoid tags with multiple functions"; selectable groups: ">6 tags wrap, >5 lines → use multi-select dropdown" | Partial gap — we contrast badge-vs-control well, but lack Carbon's escape-hatch guidance ("if it grows past N, use a different component"). |
| **Do / Don't** | Embedded in prose (content rules, behaviors); no explicit Do/Don't block | Explicit Do/Don't on color, truncation | Gap — ours has the substance but not a scannable Do/Don't section. |

## Proposed fills

Inferred for Composa (dense desktop-app, base-4 grid). Token names are proposals.

1. **Truncation / max-width rule** → add to **Usage › Content rules** and **Style › Structure**.
   Badges that host user-generated or long labels should truncate with an ellipsis at a max width
   rather than wrap. Proposed: `badge.max-width = spacer-40` _(proposed; base-4)_, single-line,
   `text-overflow: ellipsis`, full text exposed via `title`/tooltip on hover and on focus-of-host.
   _(proposed)_ Carbon: "the title can be truncated with an ellipsis… use a browser tooltip to show
   the full length… Don't wrap overflow title text to multiple lines" (`tag/usage.mdx`). Also adopt
   the soft cap "under 20 characters when possible" as a content guideline _(proposed)_.

2. **Third (medium) size + size-selection guidance** → **Usage › Behaviors** and **Style › Structure**.
   We ship small/large only at a fixed 16px height. Propose documenting *when* to use which and,
   optionally, a `medium` height for non-dense surfaces. Proposed heights on base-4: `badge.height.small`
   = 16, `badge.height.medium` = 20, `badge.height.large` = 24 _(proposed)_ — note ours stays denser
   than Carbon (18/24/32) per the desktop-app brief. Carbon: "three different tag sizes — small,
   medium, and large. Use small tags in condensed or inline spaces. The medium tag size is the
   default" (`tag/usage.mdx`, `tag/style.mdx`).

3. **Explicit "don't rely on color/tone alone" as a content rule** → **Usage › Content rules**
   (promote from Accessibility). Tone is a redundant cue; the label or host name must carry the
   meaning. _(proposed)_ Mirrors Carbon's color-as-meaning caution and our existing a11y note.

4. **Scannable Do / Don't block** → **Usage**. Convert the embedded prose into an explicit Do/Don't,
   e.g. Do: pick tone by meaning, truncate long labels; Don't: use a badge as a control/link, encode
   status by color alone, wrap label text. _(proposed)_ Carbon: "Do not use tags as links…"; "Don't
   wrap overflow tag title text to multiple lines" (`tag/usage.mdx`).

5. **Overflow / "too many badges" escape hatch** → **Usage › When to use**. When status badges
   accumulate on one row, cap the visible set and surface the rest (e.g. a `+N` count badge that
   opens a popover) rather than wrapping indefinitely. _(proposed)_ Inferred from Carbon's selectable-
   group rule ">6 wrap… >5 lines → use a multi-select dropdown" (`tag/usage.mdx`) and operational-tag
   overflow disclosure — adapted to our static model as a read-only `+N` summary.

## Not applicable

Our Badge is a **purely static status indicator**; Carbon's interactive Tag behaviors do not map and
are intentionally excluded:

- **Dismissible tags** (close icon, `Enter`/`Space` to remove) — Composa: "if the element is
  interactive… use a Button or a control. Badges annotate; they don't act." A removable chip is a
  different component.
- **Selectable tags** (toggle on/off, filter data) — interactive selection belongs to a control
  (toggle/chip/segmented), not a status badge.
- **Operational tags** (click to disclose overflow in a popover) — interaction belongs to the host;
  see proposed fill #5 for a static read-only adaptation.
- **All associated keyboard behavior** (tab order, `Enter`/`Space`, focus ring on the tag) — by
  design our badge takes no focus; the host owns keyboard (`tag/accessibility.mdx` vs Badge a11y tab).
- **AI variant** (inline AI label + explainability popover) — no Composa analog.
