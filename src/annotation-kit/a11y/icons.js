/*
 * Real GitHub Annotation Toolkit icons (CC-BY) for the a11y types. The full 37-icon set lives in
 * ./icons/<category>/; these are wired to our current types and field-driven sub-maps.
 * Source SVGs are white-filled (for coloured pills) — we swap white → currentColor so the same
 * icon renders white on a pill and type-coloured in the detail card, normalised to 13px.
 *
 * NB `?raw` is a Vite/Storybook feature (Composa's builder). A bundler-agnostic build would inline
 * these strings instead.
 *
 * Exports:
 *   a11yIcons      — one icon per top-level a11y type, attached to the type config in registry.js.
 *   formIcons      — icon per `control` value for form-element field-driven rendering.
 *   listIcons      — icon per `element` value (angle-brackets stripped) for list/listitem.
 *   linkTypeIcons  — icon per `linkType` value for link field-driven rendering.
 *
 * Landmark icons are intentionally absent from the field-driven maps: the Landmark/ directory
 * uses generic numbered files (_Landmark icon.svg, _Landmark icon-1.svg, …) that are not named
 * by ARIA role, so a static role→icon mapping cannot be derived.
 */

// ── Top-level type icons ─────────────────────────────────────────────────────────────────────
import button from "./icons/button.svg?raw";
import link from "./icons/link.svg?raw";
import landmark from "./icons/landmark.svg?raw";
import formElement from "./icons/form-element.svg?raw";
import image from "./icons/image.svg?raw";
import video from "./icons/Media/video.svg?raw";
import audio from "./icons/Media/audio.svg?raw";
import note from "./icons/note.svg?raw";
import list from "./icons/List/ul.svg?raw";
import listitem from "./icons/List/li.svg?raw";
import liveRegion from "./icons/live-region.svg?raw";
import concern from "./icons/Notes and UI Guides/concern.svg?raw";
import question from "./icons/Notes and UI Guides/question.svg?raw";

// ── Form control icons ────────────────────────────────────────────────────────────────────────
// Keyed by the `control` field value on a form-element annotation.
import formInput from "./icons/Form/input.svg?raw";
import formTextarea from "./icons/Form/textarea.svg?raw";
import formCheckbox from "./icons/Form/checkbox.svg?raw";
import formRadio from "./icons/Form/radio.svg?raw";
import formSelect from "./icons/Form/select.svg?raw";
import formRange from "./icons/Form/range.svg?raw";
import formFieldset from "./icons/Form/fieldset.svg?raw";
import formLabel from "./icons/Form/label.svg?raw";
import formLegend from "./icons/Form/legend.svg?raw";
import formHint from "./icons/Form/hint.svg?raw";
import formDateInput from "./icons/Form/date_input.svg?raw";
import formEmailInput from "./icons/Form/email_input.svg?raw";
import formNumberInput from "./icons/Form/number_input.svg?raw";
import formPhoneInput from "./icons/Form/phone_input.svg?raw";
import formTimeInput from "./icons/Form/time_input.svg?raw";

// ── List element icons ────────────────────────────────────────────────────────────────────────
// Keyed by the `element` field value with angle brackets stripped (e.g. "<ul>" → "ul").
import listUl from "./icons/List/ul.svg?raw";
import listOl from "./icons/List/ol.svg?raw";
import listLi from "./icons/List/li.svg?raw";
import listDt from "./icons/List/dt.svg?raw";
import listDd from "./icons/List/dd.svg?raw";
import listNesting from "./icons/List/nesting.svg?raw";

// ── Link-type icons ───────────────────────────────────────────────────────────────────────────
// Keyed by the `linkType` field value (e.g. "skip" → skipLink.svg).
import skipLink from "./icons/Button and Link/skipLink.svg?raw";

const norm = (svg) =>
  svg.replace(/fill="white"/g, 'fill="currentColor"').replace(/width="\d+"\s+height="\d+"/, 'width="13" height="13"');

// Primary icon map — one entry per top-level a11y type, attached to the type config in registry.js.
export const a11yIcons = {
  button: norm(button),
  link: norm(link),
  landmark: norm(landmark),
  "form-element": norm(formElement),
  image: norm(image),
  video: norm(video),
  audio: norm(audio),
  note: norm(note),
  list: norm(list),
  listitem: norm(listitem),
  "live-region": norm(liveRegion),
  concern: norm(concern),
  question: norm(question),
};

// Field-driven sub-maps — used by the overlay renderer to resolve a type-specific icon from the
// annotation's field value instead of the generic type icon. See overlay.js resolveTypeIcon().
export const formIcons = {
  // Toolkit-named control types
  input: norm(formInput),
  textarea: norm(formTextarea),
  checkbox: norm(formCheckbox),
  radio: norm(formRadio),
  select: norm(formSelect),
  range: norm(formRange),
  fieldset: norm(formFieldset),
  label: norm(formLabel),
  legend: norm(formLegend),
  hint: norm(formHint),
  date: norm(formDateInput),
  email: norm(formEmailInput),
  number: norm(formNumberInput),
  phone: norm(formPhoneInput),
  time: norm(formTimeInput),
  // Composa InputField componentSet variants → closest toolkit icon
  "text-input": norm(formInput),
  "color-input": norm(formInput),
  "numeric-input": norm(formNumberInput),
  "numeric-input-multi": norm(formNumberInput),
  "combo-input": norm(formSelect),
  "_combo-input-dropdown": norm(formSelect),
};

export const listIcons = {
  ul: norm(listUl),
  ol: norm(listOl),
  dl: norm(listUl), // no dl.svg in toolkit; ul is the closest semantic match
  li: norm(listLi),
  dt: norm(listDt),
  dd: norm(listDd),
  nesting: norm(listNesting),
};

export const linkTypeIcons = {
  skip: norm(skipLink),
};
