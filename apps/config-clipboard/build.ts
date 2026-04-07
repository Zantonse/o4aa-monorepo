import * as esbuild from "esbuild";
import { cpSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const watch = process.argv.includes("--watch");

const outdir = resolve(__dirname, "dist");

// Ensure dist directory exists
mkdirSync(outdir, { recursive: true });

// Copy static files to dist (skip missing files gracefully)
const staticFiles = [
  "manifest.json",
  "sidepanel.html",
  "sidepanel.css",
  "popup.html",
  "popup.css",
];

for (const file of staticFiles) {
  const src = resolve(__dirname, file);
  const dest = resolve(outdir, file);
  try {
    if (existsSync(src)) {
      cpSync(src, dest);
    }
  } catch {
    // Skip missing files silently
  }
}

// Copy icons directory if it exists
const iconsSrc = resolve(__dirname, "icons");
const iconsDest = resolve(outdir, "icons");
try {
  if (existsSync(iconsSrc)) {
    cpSync(iconsSrc, iconsDest, { recursive: true });
  }
} catch {
  // Skip if icons directory doesn't exist
}

const buildOptions: esbuild.BuildOptions = {
  entryPoints: [
    resolve(__dirname, "background.ts"),
    resolve(__dirname, "content.ts"),
    resolve(__dirname, "sidepanel.ts"),
    resolve(__dirname, "popup.ts"),
  ],
  outdir,
  bundle: true,
  format: "esm",
  target: "chrome114",
  sourcemap: true,
  logLevel: "info",
};

async function main() {
  if (watch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log("Watching for changes...");
  } else {
    await esbuild.build(buildOptions);
    console.log("Build complete.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
