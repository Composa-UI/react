/*
 * Storybook preview entry for the addon. A global decorator no-ops on stories without
 * `parameters.annotations`, so it's safe to apply everywhere.
 */
import { withAnnotations } from "./core/overlay.js";

export const decorators = [withAnnotations];
