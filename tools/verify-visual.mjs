#!/usr/bin/env node
// Composa visual-verification harness
// ---------------------------------------------------------------------------
// Render any Storybook story headlessly to a PNG so agents and humans can diff
// the rendered component against its Figma reference. This is the "show me the
// pixels" step that catches empty-icon / clipped / off-spec components before
// they ship.
//
// Usage:
//   node tools/verify-visual.mjs <storyId> [--viewport WxH] [--out DIR]
//                                          [--url http://host:port] [--full-page]
//
//   <storyId>   Storybook story id, e.g. composa-ui-components-base-buttons--toggle
//               You may also pass a fuzzy fragment (e.g. "buttons--toggle" or
//               "editortoolbar--default"); the tool resolves it against the live
//               Storybook index and errors with suggestions if it is ambiguous.
//
// Options:
//   --viewport WxH   Browser viewport, default 1280x800.
//   --out DIR        Output directory, default tools/.visual-output (gitignored).
//   --url URL        Use an already-running Storybook at URL instead of booting
//                    one. When omitted, the tool boots `storybook dev` from this
//                    worktree on a free port and shuts it down on exit.
//   --full-page      Capture the full scrollable page instead of just the story
//                    root element.
//   --figma-file KEY    Record a Figma fileKey for the companion reference file.
//   --figma-node  ID    Record a Figma nodeId for the companion reference file.
//
// Disk note: this tool reuses the locally installed system Chrome via CDP when
// present (no browser download). If it falls back to Playwright's bundled
// chromium, that download honours PLAYWRIGHT_BROWSERS_PATH — keep it on the SSD.
// ---------------------------------------------------------------------------

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const SYSTEM_CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// --- arg parsing ------------------------------------------------------------

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--full-page") args.fullPage = true;
    else if (token === "--viewport") args.viewport = argv[++i];
    else if (token === "--out") args.out = argv[++i];
    else if (token === "--url") args.url = argv[++i];
    else if (token === "--figma-file") args.figmaFile = argv[++i];
    else if (token === "--figma-node") args.figmaNode = argv[++i];
    else if (token === "--help" || token === "-h") args.help = true;
    else args._.push(token);
  }
  return args;
}

function printHelp() {
  console.log(
    [
      "verify-visual — render a Storybook story to a PNG",
      "",
      "Usage:",
      "  node tools/verify-visual.mjs <storyId> [options]",
      "",
      "Options:",
      "  --viewport WxH     viewport size (default 1280x800)",
      "  --out DIR          output dir (default tools/.visual-output)",
      "  --url URL          use a running Storybook instead of booting one",
      "  --full-page        capture full page instead of the story root",
      "  --figma-file KEY   record a Figma fileKey in the reference sidecar",
      "  --figma-node ID    record a Figma nodeId in the reference sidecar",
    ].join("\n"),
  );
}

// --- utilities --------------------------------------------------------------

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseViewport(value) {
  if (!value) return { width: 1280, height: 800 };
  const match = /^(\d+)x(\d+)$/.exec(value.trim());
  if (!match) throw new Error(`Invalid --viewport "${value}". Use WxH, e.g. 1280x800.`);
  return { width: Number(match[1]), height: Number(match[2]) };
}

function safeFileName(id) {
  return id.replace(/[^a-z0-9.-]+/gi, "_");
}

async function findFreePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

async function fetchJson(url, attempts = 1) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {
      // server may still be starting
    }
    if (i < attempts - 1) await sleep(500);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

// --- Storybook lifecycle ----------------------------------------------------

// The Storybook chrome references a TRIAL ABC Whyte font that is gitignored and
// usually absent. Vite/esbuild hard-fails on the unresolvable url() at build
// time (the "degrades to Inter" promise only holds at runtime). Drop a 0-byte,
// gitignored placeholder so the import resolves; the browser then fails to load
// it and falls back to Inter exactly as intended. No-op when the real font (or
// a placeholder) is already present.
async function ensureFontPlaceholder() {
  const fontPath = path.join(repoRoot, ".storybook/fonts/ABCWhytePlusVariableTrial.ttf");
  if (!existsSync(fontPath)) {
    await writeFile(fontPath, "");
    console.log("• created gitignored font placeholder (Whyte trial absent; falling back to Inter)");
  }
}

async function bootStorybook() {
  await ensureFontPlaceholder();
  const port = await findFreePort();
  const env = {
    ...process.env,
    HOME: path.join(repoRoot, ".cache/storybook-home"),
    STORYBOOK_DISABLE_TELEMETRY: "1",
  };
  console.log(`• booting Storybook dev server on :${port} (this can take ~20-40s)`);
  const child = spawn(
    "npx",
    ["storybook", "dev", "--port", String(port), "--no-open", "--quiet"],
    { cwd: repoRoot, env, stdio: ["ignore", "ignore", "pipe"] },
  );
  const stderr = [];
  child.stderr.on("data", (chunk) => {
    stderr.push(String(chunk));
    if (stderr.length > 40) stderr.shift();
  });

  const baseUrl = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 120000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Storybook exited early.\n${stderr.join("")}`);
    }
    try {
      const response = await fetch(`${baseUrl}/index.json`);
      if (response.ok) {
        return { baseUrl, cleanup: async () => child.kill("SIGTERM") };
      }
    } catch {
      // not up yet
    }
    await sleep(1000);
  }
  child.kill("SIGTERM");
  throw new Error(`Storybook did not become ready in time.\n${stderr.join("")}`);
}

async function resolveStoryId(baseUrl, requested) {
  const index = await fetchJson(`${baseUrl}/index.json`, 3);
  const entries = index.entries || index.stories || {};
  const ids = Object.keys(entries).filter((id) => entries[id].type !== "docs");

  if (ids.includes(requested)) return { id: requested, entry: entries[requested] };

  const needle = requested.toLowerCase();
  const matches = ids.filter((id) => id.toLowerCase().includes(needle));
  if (matches.length === 1) return { id: matches[0], entry: entries[matches[0]] };
  if (matches.length === 0) {
    const sample = ids.slice(0, 12).map((id) => `  ${id}`).join("\n");
    throw new Error(
      `No story matches "${requested}".\nKnown story ids (first 12 of ${ids.length}):\n${sample}`,
    );
  }
  const list = matches.slice(0, 12).map((id) => `  ${id}`).join("\n");
  throw new Error(`"${requested}" is ambiguous. Candidates:\n${list}`);
}

// --- browser lifecycle ------------------------------------------------------

async function launchBrowser() {
  const executablePath =
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
    (existsSync(SYSTEM_CHROME) ? SYSTEM_CHROME : undefined);

  if (!executablePath) {
    // Fallback: Playwright's bundled chromium. Download path is governed by
    // PLAYWRIGHT_BROWSERS_PATH — keep that pointed at the SSD.
    console.log("• using Playwright bundled chromium");
    const browser = await chromium.launch({ headless: true });
    return { browser, cleanup: async () => browser.close() };
  }

  console.log("• using system Chrome via CDP (no browser download)");
  const port = await findFreePort();
  const profile = path.join("/tmp", `composa-verify-profile-${Date.now()}`);
  const child = spawn(
    executablePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--no-first-run",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--remote-debugging-address=127.0.0.1",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
  const stderr = [];
  child.stderr.on("data", (chunk) => {
    stderr.push(String(chunk));
    if (stderr.length > 8) stderr.shift();
  });

  try {
    await fetchJson(`http://127.0.0.1:${port}/json/version`, 60);
    const browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
    return {
      browser,
      cleanup: async () => {
        await browser.close().catch(() => {});
        child.kill("SIGTERM");
        // Remove the throwaway Chrome user-data-dir — otherwise these pile up in
        // /tmp (root volume) and can fill the disk over a long audit run.
        spawn("rm", ["-rf", profile], { stdio: "ignore" });
      },
    };
  } catch (error) {
    child.kill("SIGTERM");
    spawn("rm", ["-rf", profile], { stdio: "ignore" });
    throw new Error(`${error.message}\nChrome stderr:\n${stderr.join("").trim()}`);
  }
}

// --- render -----------------------------------------------------------------

async function renderStory({ browser, baseUrl, storyId, viewport, fullPage }) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  const iframeUrl = `${baseUrl}/iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story`;
  await page.goto(iframeUrl, { waitUntil: "load", timeout: 60000 });

  // Storybook signals a finished render by removing the "preparing" state and
  // mounting #storybook-root content. Wait for that, then settle the network.
  await page
    .waitForFunction(
      () => {
        const root = document.querySelector("#storybook-root") || document.querySelector("#root");
        return root && root.children.length > 0 && !document.querySelector(".sb-preparing-story");
      },
      { timeout: 30000 },
    )
    .catch(() => {});
  await page.waitForLoadState("networkidle").catch(() => {});
  // Let fonts/icons settle one frame.
  await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
  await sleep(250);

  const target = fullPage
    ? page
    : (await page.$("#storybook-root")) || (await page.$("#root")) || page;

  return { context, page, target, consoleErrors };
}

// --- main -------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args._.length === 0) {
    printHelp();
    process.exit(args.help ? 0 : 1);
  }

  const requestedId = args._[0];
  const viewport = parseViewport(args.viewport);
  const outDir = path.resolve(repoRoot, args.out || "tools/.visual-output");
  await mkdir(outDir, { recursive: true });

  const cleanups = [];
  const runCleanups = async () => {
    for (const fn of cleanups.reverse()) {
      try {
        await fn();
      } catch {
        // best effort
      }
    }
  };

  try {
    // 1. Storybook (boot or reuse)
    let baseUrl = args.url;
    if (!baseUrl) {
      const sb = await bootStorybook();
      baseUrl = sb.baseUrl;
      cleanups.push(sb.cleanup);
    } else {
      console.log(`• using running Storybook at ${baseUrl}`);
    }

    // 2. Resolve the story id against the live index
    const { id: storyId, entry } = await resolveStoryId(baseUrl, requestedId);
    console.log(`• story: ${storyId}${entry?.title ? `  (${entry.title})` : ""}`);

    // 3. Browser
    const { browser, cleanup: browserCleanup } = await launchBrowser();
    cleanups.push(browserCleanup);

    // 4. Render + screenshot
    const { context, target, consoleErrors } = await renderStory({
      browser,
      baseUrl,
      storyId,
      viewport,
      fullPage: Boolean(args.fullPage),
    });
    cleanups.push(async () => context.close());

    const fileBase = safeFileName(storyId);
    const pngPath = path.join(outDir, `${fileBase}.png`);
    await target.screenshot({ path: pngPath });
    console.log(`✓ wrote ${path.relative(repoRoot, pngPath)}`);

    // 5. Figma reference sidecar (v1: record-only, for human/AI side-by-side)
    const figmaUrl =
      args.figmaFile && args.figmaNode
        ? `https://www.figma.com/file/${args.figmaFile}/?node-id=${encodeURIComponent(args.figmaNode)}`
        : null;
    const sidecar = {
      storyId,
      title: entry?.title || null,
      viewport,
      renderedPng: path.relative(repoRoot, pngPath),
      figma: args.figmaFile
        ? { fileKey: args.figmaFile, nodeId: args.figmaNode || null, url: figmaUrl }
        : null,
      consoleErrors,
      capturedAt: new Date().toISOString(),
      // How to pull the Figma reference for comparison (see docs/verify-visual.md):
      //   Figma MCP get_screenshot({ fileKey, nodeId })  →  reference PNG
      compareHint:
        "Pull the Figma node with get_screenshot(fileKey,nodeId), then diff it against renderedPng.",
    };
    const jsonPath = path.join(outDir, `${fileBase}.json`);
    await writeFile(jsonPath, JSON.stringify(sidecar, null, 2));
    console.log(`✓ wrote ${path.relative(repoRoot, jsonPath)}`);

    if (consoleErrors.length > 0) {
      console.log(`⚠ ${consoleErrors.length} console error(s) during render:`);
      for (const line of consoleErrors.slice(0, 5)) console.log(`    ${line}`);
    }
  } finally {
    await runCleanups();
  }
}

main().catch((error) => {
  console.error(`\n✗ verify-visual failed: ${error.message}`);
  process.exit(1);
});
