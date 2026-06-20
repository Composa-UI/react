// Concatenate the per-component source files under styles/ into the single
// shippable styles.css. Mirrors the token pipeline (source -> build -> artifact):
// edit styles/*.css, run `npm run build:css`, commit the regenerated styles.css.
//
// The numeric filename prefixes (00-, 05-, 10- ...) lock the cascade order, so
// concatenating them is equivalent to the original monolithic file. Splitting by
// component lets separate agents/devs edit different components without conflicts.
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const dir = new URL("styles/", root);

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".css"))
  .sort();

if (files.length === 0) {
  console.error("build:css FAIL — no source files in styles/");
  process.exit(1);
}

const header =
  "/* GENERATED FILE — do not edit directly.\n" +
  " * Source: styles/*.css — edit those, then run `npm run build:css`.\n" +
  " * Files concatenate in filename order; the numeric prefixes lock the\n" +
  " * cascade order, so this artifact is equivalent to the original monolith.\n" +
  " *\n" +
  " * STYLE ISOLATION: all component CSS is wrapped in `@layer composa { … }`.\n" +
  " * Unlayered author styles (an app's global `button { … }`) always beat\n" +
  " * layered rules regardless of specificity, so app globals can no longer\n" +
  " * silently clobber DS internals. Apps that WANT to theme the DS should do it\n" +
  " * through the `--composa-*` custom properties (which cascade normally and are\n" +
  " * layer-independent), not by overriding our class selectors. */\n\n";

const body = files.map((f) => fs.readFileSync(new URL(f, dir), "utf8")).join("");

// Wrap the concatenated component CSS in a named cascade layer. Layered rules
// lose to any unlayered app rule of any specificity — exactly the isolation we
// want: DS internals stop fighting app globals on raw specificity. The body
// bytes are unchanged (only wrapped), so the in-place cascade order is preserved.
const layered = `@layer composa {\n${body}}\n`;

fs.writeFileSync(new URL("styles.css", root), header + layered);

console.log(`build:css — wrote styles.css from ${files.length} sources in @layer composa (${body.length} bytes body).`);
