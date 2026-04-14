#!/usr/bin/env node
/*
  Generate thumbnail versions of blog and site images.

  Uses macOS `sips` — no npm dependencies needed.

  Output: public/images/thumbs/<filename>   (JPEG, max 480px wide)

  Usage:
    node scripts/generate-thumbnails.cjs            # generate missing thumbs
    node scripts/generate-thumbnails.cjs --force     # regenerate all
*/
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const THUMBS_DIR = path.join(IMAGES_DIR, 'thumbs');
const MAX_WIDTH = 480;
const JPEG_QUALITY = 80; // sips doesn't support quality for jpg, but we convert png→jpg

const force = process.argv.includes('--force');

if (process.platform !== 'darwin') {
  console.log(
    'generate-thumbnails: skipped (requires macOS `sips`). Commit public/images/thumbs/ or run `npm run thumbs` on a Mac before deploy.'
  );
  process.exit(0);
}

// All images that appear as blog hero images or site thumbnails
const SOURCES = fs
  .readdirSync(IMAGES_DIR)
  .filter((f) => {
    const ext = path.extname(f).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return false;
    // skip files already small or irrelevant
    if (f.startsWith('charles-bridge-hero-')) return false; // already responsive set
    if (f.startsWith('stitch/')) return false;
    return true;
  })
  .sort();

fs.mkdirSync(THUMBS_DIR, { recursive: true });

let created = 0;
let skipped = 0;

for (const file of SOURCES) {
  const src = path.join(IMAGES_DIR, file);
  // Always output as .jpg for consistency and smaller size
  const outName = file.replace(/\.png$/i, '.jpg');
  const dest = path.join(THUMBS_DIR, outName);

  if (!force && fs.existsSync(dest)) {
    skipped++;
    continue;
  }

  try {
    // Get current width
    const info = execSync(`sips -g pixelWidth "${src}"`, { encoding: 'utf8' });
    const widthMatch = info.match(/pixelWidth:\s*(\d+)/);
    const currentWidth = widthMatch ? parseInt(widthMatch[1], 10) : 0;

    if (currentWidth <= MAX_WIDTH) {
      // Already small enough — just copy (convert png to jpg if needed)
      if (file.toLowerCase().endsWith('.png')) {
        execSync(`sips -s format jpeg "${src}" --out "${dest}" 2>/dev/null`);
      } else {
        fs.copyFileSync(src, dest);
      }
    } else {
      // Resize to MAX_WIDTH, maintaining aspect ratio
      if (file.toLowerCase().endsWith('.png')) {
        // Convert PNG → JPEG and resize
        execSync(
          `sips -s format jpeg --resampleWidth ${MAX_WIDTH} "${src}" --out "${dest}" 2>/dev/null`,
        );
      } else {
        // Resize JPEG in place (copy first to avoid mutating original)
        fs.copyFileSync(src, dest);
        execSync(`sips --resampleWidth ${MAX_WIDTH} "${dest}" 2>/dev/null`);
      }
    }

    const srcSize = (fs.statSync(src).size / 1024).toFixed(0);
    const destSize = (fs.statSync(dest).size / 1024).toFixed(0);
    console.log(`  ✓ ${file} (${srcSize}KB → ${destSize}KB)`);
    created++;
  } catch (err) {
    console.warn(`  ✗ ${file}: ${err.message}`);
  }
}

console.log(
  `\nThumbnails: ${created} created, ${skipped} skipped (already exist) → public/images/thumbs/`,
);
if (!force && skipped > 0) {
  console.log('  Run with --force to regenerate all.');
}
