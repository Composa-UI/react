// Generated from the annotation-kit type registry — do not edit by hand.
// Regenerate: node src/annotation-kit/scripts/generate-schema.mjs

export type Marker = "pin" | "bracket" | "lasso" | "caret";
export type Side = "top" | "bottom" | "left" | "right";
export interface KeyboardEntry { keys: string; result: string; }
export interface StateEntry { state: string; aria: string; }
export interface Tier { priority?: "mandatory" | "ideal" | "nice-to-have"; difficulty?: "easy" | "moderate" | "advanced"; }

export interface ButtonAnnotation {
  type: "button";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  element: string;
  role: string;
  accessibleName?: string;
  keyboard?: KeyboardEntry[];
  states?: StateEntry[];
}

export interface HeadingAnnotation {
  type: "heading";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  level: string;
}

export interface LandmarkAnnotation {
  type: "landmark";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  element: string;
  role?: string;
  accessibleName?: string;
}

export interface LinkAnnotation {
  type: "link";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  accessibleName: string;
  linkTarget?: string;
  linkType?: string;
}

export interface FormElementAnnotation {
  type: "form-element";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  control: string;
  accessibleName?: string;
  controlLabel?: string;
  required?: boolean;
  error?: string;
  describedBy?: string;
}

export interface ImageAnnotation {
  type: "image";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  decorative?: boolean;
  accessibleName?: string;
}

export interface ListAnnotation {
  type: "list";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  element: string;
  role: string;
  accessibleName?: string;
  itemRole?: string;
  keyboard?: KeyboardEntry[];
  states?: StateEntry[];
}

export interface ListitemAnnotation {
  type: "listitem";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  element?: string;
  role: string;
  accessibleName?: string;
  states?: StateEntry[];
}

export interface NoteAnnotation {
  type: "note";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  text: string;
}

export interface VariantAnnotation {
  type: "variant";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  value?: string;
  name?: string;
}

export interface RedlineAnnotation {
  type: "redline";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  dimension: "width" | "height" | "radius";
  value?: string;
}

export interface AnatomyAnnotation {
  type: "anatomy";
  n?: number;
  target?: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
}

export interface TokenAnnotation {
  type: "token";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  kind: "color" | "typography" | "effect";
  prop?: "background" | "text" | "border";
  name?: string;
  value?: string;
}

export interface RadiusAnnotation {
  type: "radius";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  value?: string;
}

export interface GapAnnotation {
  type: "gap";
  n?: number;
  target: string;
  marker?: "pin" | "bracket" | "lasso" | "caret";
  side?: "top" | "bottom" | "left" | "right";
  label?: string;
  anchor?: "edge" | "center";
  each?: boolean;
  tier?: Tier;
  targetB: string;
  value?: string;
}

export type Annotation =
  | ButtonAnnotation
  | HeadingAnnotation
  | LandmarkAnnotation
  | LinkAnnotation
  | FormElementAnnotation
  | ImageAnnotation
  | ListAnnotation
  | ListitemAnnotation
  | NoteAnnotation
  | VariantAnnotation
  | RedlineAnnotation
  | AnatomyAnnotation
  | TokenAnnotation
  | RadiusAnnotation
  | GapAnnotation;
