/**
 * Render the LinkedIn infographic HTML into animated GIFs + static PNGs.
 *
 *   node marketing/assets/render.mjs
 *
 * Each frame is a deterministic screenshot of infographic.html?v=<variant>&t=<s>
 * taken with the installed Chrome. Pillow assembles the GIF; sharp writes the
 * static end frame. No ffmpeg, no browser automation dependency.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const html = path.join(here, "linkedin", "infographic.html");
const outDir = path.join(here, "linkedin", "out");
const tmpRoot = path.join(outDir, ".frames");

const W = 1080;
const H = 1350;
const FPS = 10;
const DURATION = 5;
const FRAMES = FPS * DURATION;

const VARIANTS = [
  { id: "l1", label: "authority model" },
  { id: "l2", label: "tool surface" },
];

fs.mkdirSync(outDir, { recursive: true });

for (const variant of process.argv[2]
  ? VARIANTS.filter((item) => item.id === process.argv[2])
  : VARIANTS) {
  const dir = path.join(tmpRoot, variant.id);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  process.stdout.write(`\n${variant.id} (${variant.label}) `);
  for (let i = 0; i < FRAMES; i += 1) {
    const t = i / FPS;
    execFileSync(
      "google-chrome",
      [
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        `--window-size=${W},${H}`,
        "--virtual-time-budget=1200",
        `--screenshot=${path.join(dir, `${String(i).padStart(3, "0")}.png`)}`,
        `file://${html}?v=${variant.id}&t=${t.toFixed(3)}`,
      ],
      { stdio: "ignore" }
    );
    if (i % 10 === 0) process.stdout.write(".");
  }

  const gifPath = path.join(outDir, `${variant.id}.gif`);
  execFileSync("python3", [path.join(here, "gif.py"), dir, gifPath, String(FPS), "96"], {
    stdio: "inherit",
  });

  await sharp(path.join(dir, `${String(FRAMES - 1).padStart(3, "0")}.png`))
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, `${variant.id}.png`));

  fs.rmSync(dir, { recursive: true, force: true });
}

fs.rmSync(tmpRoot, { recursive: true, force: true });
console.log(`\nDone: ${outDir}`);
