// Built-in structural glyphs for Composa's own component anatomy.
//
// These are Material Symbols (rounded style, weight 300, Apache-2.0), embedded
// as raw SVG path data so there is NO runtime font or icon-set dependency. They
// exist so a Dropdown, Checkbox, or Dialog can render its own affordances with
// zero bundled proprietary assets and zero configuration.
//
// Material Symbols SVGs use viewBox="0 -960 960 960" and are FILLED (not
// stroked); the render in factory.js fills with currentColor and applies no
// stroke. Our names map to Material Symbol names as follows:
//   chevronDown  -> expand_more    chevronUp    -> expand_less
//   chevronLeft  -> chevron_left   chevronRight -> chevron_right
//   check        -> check          dash/minus   -> remove
//   close        -> close          plusSmall    -> add
//
// This is NOT a content-icon library. Content icons (a toolbar's text/image
// glyphs, a button's leading icon) are passed in as slots, so Composa stays
// agnostic to the set the host uses. We recommend Material Symbols as the
// default content-icon set for visual consistency with these structural glyphs
// (pass a Material Symbols element/component into a component's `icon` slot).

export const BUILTIN_GLYPHS = {
  // expand_more
  chevronDown: { d: "M480-370.078q-6 0-10.808-2-4.807-2-9.423-6.615L269.847-568.616q-6.692-6.692-6.885-15.807-.192-9.115 6.885-16.192t16.307-7.077q9.231 0 16.307 7.077L480-423.076l177.539-177.539q6.692-6.692 15.807-6.884 9.115-.193 16.192 6.884t7.077 16.307q0 9.231-7.077 16.308L500.231-378.693q-4.616 4.615-9.423 6.615-4.808 2-10.808 2Z" },
  // expand_less
  chevronUp: { d: "M480-552.616 302.461-375.078q-6.692 6.693-16.115 7.193-9.422.5-16.499-6.577-7.077-7.077-7.077-16.307 0-9.231 7.077-16.308l189.922-189.922q4.616-4.616 9.423-6.808Q474-605.999 480-605.999t10.808 2.192q4.807 2.192 9.423 6.808l189.307 189.307q6.692 6.692 7.192 15.807t-6.577 15.807q-7.077 7.077-16.307 7.077-9.231 0-16.307-7.077L480-552.616Z" },
  // chevron_right
  chevronRight: { d: "M536.92-480.62 358.77-659.15q-7.08-6.7-6.77-15.81.31-9.12 7.39-16 7.07-6.89 16.3-6.89t16.31 7.08l189.92 189.92q4.62 4.62 6.81 9.43 2.19 4.8 2.19 10.61T588.73-470q-2.19 5-6.81 9.62L391.38-269.85q-6.69 6.7-15.8 6.58-9.12-.12-16.19-7.19-7.08-7.08-7.08-16.31 0-9.23 7.08-16.31l177.53-177.54Z" },
  // chevron_left
  chevronLeft: { d: "m399.08-480.62 178.53 178.16q6.7 6.69 6.39 15.81-.31 9.11-7.39 16.19-7.07 7.07-16.3 7.07T544-270.46L354.08-460.38q-4.62-4.62-6.62-9.62-2-5-2-10.81 0-5.81 2-10.61 2-4.81 6.62-9.43l190.54-190.92q6.69-6.69 16.3-6.88 9.62-.2 16.5 6.88 6.89 7.08 6.89 16.5t-6.7 16.12L399.08-480.62Z" },
  // check
  check: { d: "m379.15-323.15 363-363.39q6.7-6.31 16.12-6.5 9.42-.19 16.5 6.69 7.08 6.89 7.08 16.31 0 9.42-7.08 16.12L399.38-278.54q-8.61 8.62-20.23 8.62-11.61 0-20.23-8.62l-174.3-174.31q-6.7-6.69-6.58-16.11.11-9.42 7.19-16.31 7.08-6.88 16.31-6.88 9.23 0 16.31 6.69l161.3 162.31Z" },
  // remove
  dash: { d: "M242.69-457.31q-9.64 0-16.16-6.58-6.53-6.58-6.53-16.31 0-9.72 6.53-16.11 6.52-6.38 16.16-6.38h474.62q9.64 0 16.16 6.58 6.53 6.58 6.53 16.31 0 9.72-6.53 16.11-6.52 6.38-16.16 6.38H242.69Z" },
  // remove
  minus: { d: "M242.69-457.31q-9.64 0-16.16-6.58-6.53-6.58-6.53-16.31 0-9.72 6.53-16.11 6.52-6.38 16.16-6.38h474.62q9.64 0 16.16 6.58 6.53 6.58 6.53 16.31 0 9.72-6.53 16.11-6.52 6.38-16.16 6.38H242.69Z" },
  // add
  plusSmall: { d: "M457.31-457.31H242.69q-9.64 0-16.16-6.58-6.53-6.58-6.53-16.31 0-9.72 6.53-16.11 6.52-6.38 16.16-6.38h214.62v-214.62q0-9.64 6.58-16.16 6.58-6.53 16.31-6.53 9.72 0 16.11 6.53 6.38 6.52 6.38 16.16v214.62h214.62q9.64 0 16.16 6.58 6.53 6.58 6.53 16.31 0 9.72-6.53 16.11-6.52 6.38-16.16 6.38H502.69v214.62q0 9.64-6.58 16.16-6.58 6.53-16.31 6.53-9.72 0-16.11-6.53-6.38-6.52-6.38-16.16v-214.62Z" },
  // close
  close: { d: "M480-448 266.92-234.92q-6.69 6.69-15.8 6.88-9.12.19-16.2-6.88-7.07-7.08-7.07-16 0-8.93 7.07-16L448-480 234.92-693.08q-6.69-6.69-6.88-15.8-.19-9.12 6.88-16.2 7.08-7.07 16-7.07 8.93 0 16 7.07L480-512l213.08-213.08q6.69-6.69 15.8-6.88 9.12-.19 16.2 6.88 7.07 7.08 7.07 16 0 8.93-7.07 16L512-480l213.08 213.08q6.69 6.69 6.88 15.8.19 9.12-6.88 16.2-7.08 7.07-16 7.07-8.93 0-16-7.07L480-448Z" },
};

export function isBuiltinGlyph(name) {
  return Object.prototype.hasOwnProperty.call(BUILTIN_GLYPHS, name);
}
