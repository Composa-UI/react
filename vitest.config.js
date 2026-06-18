import { defineConfig } from "vitest/config";

// Composa's tests render components to static markup with react-dom/server and
// assert on the produced classes/attributes. That keeps the suite fast and
// dependency-light: it needs no browser and no Playwright download. A future
// Storybook browser-mode (addon-vitest) layer can run the stories themselves.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/react/__tests__/**/*.test.{js,jsx}"],
    globals: false,
  },
});
