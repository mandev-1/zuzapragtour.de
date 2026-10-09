#!/usr/bin/env node
/*
  Generate responsive AVIF + WebP variants of selected site images.

  Uses macOS `sips` (AVIF) and `cwebp` (WebP, `brew install webp`) — no npm
  dependencies needed.

  Output:
    public/images/sized/<name>-<width>.avif|webp
    src/data/responsiveImages.json   (manifest read by <ResponsivePicture>)

  Usage:
    node scripts/generate-responsive-images.cjs           # generate missing variants
    node scripts/generate-responsive-images.cjs --force   # regenerate all

  To optimise another image, add it to IMAGES below and use
  <ResponsivePicture src="/images/..."> (src/components/site/ResponsivePicture.tsx).
*/
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const OUT_DIR = path.join(IMAGES_DIR, 'sized');
const MANIFEST = path.join(ROOT, 'src', 'data', 'responsiveImages.json');

const AVIF_QUALITY = 60;
const WEBP_QUALITY = 75;
const DEFAULT_WIDTHS = [320, 640, 960, 1280];

// Images on the homepage (both variants). Widths are capped at the original's width.
const IMAGES = [
  // Tour catalogue (src/data/tours.ts)
  { file: 'prague-castle.jpg' },
  { file: 'blog-jewish-quarter-2-min.jpg' },
  { file: 'blog-night-prague-min.jpg' },
  { file: 'blog-hidden-gems-min.jpg' },
  { file: 'prague-castle-cathedral.jpg' },
  { file: 'havel-tour.jpg' },
  // Guest gallery (Home GALLERY)
  { file: 'guest-tourguide.jpg' },
  { file: 'guest-night.jpeg' },
  { file: 'guest-food.jpeg' },
  { file: 'boat-vltava.jpg' },
  // Full-bleed CTA / enquiry background (under a dark overlay)
  { file: 'charles-bridge-statue.jpg', widths: [640, 1280, 1920] },
];

const force = process.argv.includes('--force');

if (process.platform !== 'darwin') {
  console.log(
    'generate-responsive-images: skipped (requires macOS `sips`). Commit public/images/sized/ and src/data/responsiveImages.json, or run `npm run images` on a Mac before deploy.'
  );
  process.exit(0);
}

try {
  execSync('command -v cwebp', { stdio: 'ignore' });
} catch {
  console.log('generate-responsive-images: skipped (`cwebp` not found — `brew install webp`).');
  process.exit(0);
}

const dimensions = (file) => {
  const info = execSync(`sips -g pixelWidth -g pixelHeight "${file}"`, { encoding: 'utf8' });
  return {
    w: parseInt(info.match(/pixelWidth:\s*(\d+)/)[1], 10),
    h: parseInt(info.match(/pixelHeight:\s*(\d+)/)[1], 10),
  };
};

fs.mkdirSync(OUT_DIR, { recursive: true });

const manifest = {};
let created = 0;
let skipped = 0;

for (const { file, widths = DEFAULT_WIDTHS } of IMAGES) {
  const src = path.join(IMAGES_DIR, file);
  if (!fs.existsSync(src)) {
    console.warn(`  ✗ ${file}: not found, skipped`);
    continue;
  }
  const { w, h } = dimensions(src);
  const name = path.basename(file, path.extname(file));

  // Requested widths below the original, plus the original width if any was cut off.
  const targets = widths.filter((x) => x < w);
  if (targets.length < widths.length) targets.push(w);

  for (const width of targets) {
    const base = path.join(OUT_DIR, `${name}-${width}`);
    if (force || !fs.existsSync(`${base}.avif`)) {
      execSync(
        `sips -s format avif -s formatOptions ${AVIF_QUALITY} --resampleWidth ${width} "${src}" --out "${base}.avif"`,
        { stdio: 'ignore' }
      );
      created++;
    } else skipped++;
    if (force || !fs.existsSync(`${base}.webp`)) {
      execSync(`cwebp -quiet -q ${WEBP_QUALITY} -metadata none -resize ${width} 0 "${src}" -o "${base}.webp"`);
      created++;
    } else skipped++;
  }

  manifest[`/images/${file}`] = { base: `/images/sized/${name}`, widths: targets, w, h };
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`generate-responsive-images: ${created} created, ${skipped} up to date → public/images/sized/`);
