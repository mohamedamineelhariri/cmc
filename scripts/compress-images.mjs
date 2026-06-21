import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 75;
const PNGOUT_QUALITY = 65;
const MIN_SIZE = 100 * 1024;
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png"]);
const SKIP_DIRS = new Set(["node_modules", ".git"]);

const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { if (!SKIP_DIRS.has(entry.name)) walk(full); }
    else if (IMAGE_EXTS.has(extname(entry.name).toLowerCase()) && statSync(full).size > MIN_SIZE) files.push(full);
  }
}
walk(PUBLIC);

console.log(`Compressing ${files.length} images...\n`);
const { renameSync, unlinkSync } = await import("fs");

let done = 0;
for (const file of files) {
  const ext = extname(file).toLowerCase();
  const isPng = ext === ".png";
  const img = sharp(file);
  const meta = await img.metadata();
  let pipeline = img;
  if (meta.width > MAX_WIDTH) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const tmp = file + ".tmp";
  if (isPng) {
    await pipeline.png({ quality: PNGOUT_QUALITY, palette: true }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmp);
  }
  const before = statSync(file).size;
  const after = statSync(tmp).size;
  const saved = ((before - after) / before * 100).toFixed(1);
  unlinkSync(file);
  renameSync(tmp, file);
  done++;
  const short = file.slice(PUBLIC.length + 1);
  console.log(`${done}/${files.length} ${saved}% saved  ${short}`);
}
console.log("\nDone.");
