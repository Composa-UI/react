/*
 * Real GitHub Annotation Toolkit icons (CC-BY) for the a11y types. The full 37-icon set lives in
 * ./icons/<category>/; these are the ones wired to our current types. The source SVGs are
 * white-filled (for coloured pills) — we swap white → currentColor so the same icon can render
 * white on a pill and type-coloured in the detail card, and normalise the box to 13px.
 *
 * NB `?raw` is a Vite/Storybook feature (Composa's builder). A bundler-agnostic build would inline
 * these strings instead. The other icons (Form subtypes, Landmark variants) are copied in ./icons/
 * for when the type taxonomy expands further.
 */
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

const norm = (svg) =>
  svg.replace(/fill="white"/g, 'fill="currentColor"').replace(/width="\d+"\s+height="\d+"/, 'width="13" height="13"');

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
};
