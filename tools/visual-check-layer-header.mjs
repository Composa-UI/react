import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { chromium } from "@playwright/test";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (existsSync(chromePath) ? chromePath : undefined);
const baseUrl = process.env.STORYBOOK_URL || "http://127.0.0.1:6124";
const outputDir = process.env.VISUAL_OUTPUT_DIR || "/tmp/composa-visual";

const stories = {
  layerHeader: `${baseUrl}/iframe.html?id=composa-ui-components-modules-sections-layerheader--default&viewMode=story`,
  inspectorHeader: `${baseUrl}/iframe.html?id=composa-ui-components-modules-sections-inspectorheader--right-panel-width&viewMode=story`,
};

const round = (value) => Math.round(value * 100) / 100;
const within = (actual, expected, tolerance = 0.5) => Math.abs(actual - expected) <= tolerance;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForJson(url, attempts = 80) {
  for (let index = 0; index < attempts; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {
      // Chrome may still be starting.
    }
    await sleep(100);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function launchBrowser() {
  if (!executablePath) {
    return {
      browser: await chromium.launch({ headless: true }),
      cleanup: async () => {},
    };
  }

  const port = Number(process.env.PLAYWRIGHT_CDP_PORT || 9335);
  const profile = path.join("/tmp", `composa-playwright-profile-${Date.now()}`);
  const stderrLines = [];
  const chrome = spawn(executablePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--no-first-run",
    "--remote-debugging-address=127.0.0.1",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "--window-size=714,849",
    stories.layerHeader,
  ], { stdio: ["ignore", "ignore", "pipe"] });

  chrome.stderr.on("data", (chunk) => {
    stderrLines.push(String(chunk));
    if (stderrLines.length > 8) stderrLines.shift();
  });

  try {
    await waitForJson(`http://127.0.0.1:${port}/json/version`);
    return {
      browser: await chromium.connectOverCDP(`http://127.0.0.1:${port}`),
      cleanup: async () => {
        chrome.kill("SIGTERM");
      },
    };
  } catch (error) {
    chrome.kill("SIGTERM");
    throw new Error(`${error.message}\nChrome stderr:\n${stderrLines.join("").trim()}`);
  }
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const { browser, cleanup } = await launchBrowser();

  try {
    const context = await browser.newContext({ viewport: { width: 714, height: 849 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(stories.layerHeader, { waitUntil: "networkidle" });

    const dropdown = page.locator(".composa-layer-header-dropdown");
    await dropdown.hover();

    const layerMetrics = await page.evaluate(() => {
      const dropdownNode = document.querySelector(".composa-layer-header-dropdown");
      const titleNode = document.querySelector(".composa-layer-header-title");
      const chevronNode = document.querySelector(".composa-layer-header-chevron");
      const actionIcons = [...document.querySelectorAll(".composa-layer-header-action .composa-icon")];
      const bounds = (node) => {
        const box = node.getBoundingClientRect();
        return { left: box.left, right: box.right, width: box.width, height: box.height };
      };
      const styles = (node) => getComputedStyle(node);
      const dropdownBox = bounds(dropdownNode);
      const titleBox = bounds(titleNode);
      const chevronBox = bounds(chevronNode);
      return {
        frameHover: {
          leftPadding: titleBox.left - dropdownBox.left,
          rightPadding: dropdownBox.right - chevronBox.right,
          background: styles(dropdownNode).backgroundColor,
          dropdown: dropdownBox,
          title: titleBox,
          chevron: chevronBox,
        },
        actionIcons: actionIcons.map((node) => ({
          text: node.textContent.trim(),
          ...bounds(node),
          fontSize: styles(node).fontSize,
          fontVariationSettings: styles(node).fontVariationSettings,
        })),
      };
    });

    await page.screenshot({ path: path.join(outputDir, "layer-header-hover.png"), fullPage: true });

    await page.goto(stories.inspectorHeader, { waitUntil: "networkidle" });
    const inspectorMetrics = await page.evaluate(() => {
      const icons = [...document.querySelectorAll(".composa-inspector-play-split .composa-icon")];
      const bounds = (node) => {
        const box = node.getBoundingClientRect();
        return { left: box.left, right: box.right, width: box.width, height: box.height };
      };
      return icons.map((node) => ({
        text: node.textContent.trim(),
        ...bounds(node),
        fontSize: getComputedStyle(node).fontSize,
        fontVariationSettings: getComputedStyle(node).fontVariationSettings,
      }));
    });
    await page.screenshot({ path: path.join(outputDir, "inspector-header.png"), fullPage: true });

    const report = { stories, layerMetrics, inspectorMetrics };
    await writeFile(path.join(outputDir, "layer-header-report.json"), `${JSON.stringify(report, null, 2)}\n`);

    const failures = [];
    if (!within(layerMetrics.frameHover.leftPadding, 8)) failures.push(`Frame left hover padding expected 8px, got ${round(layerMetrics.frameHover.leftPadding)}px`);
    if (!within(layerMetrics.frameHover.rightPadding, 8)) failures.push(`Frame right hover padding expected 8px, got ${round(layerMetrics.frameHover.rightPadding)}px`);
    for (const icon of layerMetrics.actionIcons) {
      if (!within(icon.width, 24)) failures.push(`Layer action icon ${icon.text} expected 24px width, got ${round(icon.width)}px`);
      if (!icon.fontVariationSettings.includes('"wght" 200')) failures.push(`Layer action icon ${icon.text} expected weight 200, got ${icon.fontVariationSettings}`);
    }
    for (const icon of inspectorMetrics) {
      if (!within(icon.width, 24)) failures.push(`Inspector split icon ${icon.text} expected 24px width, got ${round(icon.width)}px`);
      if (!icon.fontVariationSettings.includes('"wght" 200')) failures.push(`Inspector split icon ${icon.text} expected weight 200, got ${icon.fontVariationSettings}`);
    }

    if (failures.length > 0) {
      console.error(JSON.stringify(report, null, 2));
      throw new Error(failures.join("\n"));
    }

    console.log(JSON.stringify(report, null, 2));
  } finally {
    await browser.close();
    await cleanup();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
