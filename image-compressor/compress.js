const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IN = path.join(__dirname, 'in');
const OUT = path.join(__dirname, 'out');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff']);

async function compress(file) {
  const ext = path.extname(file).toLowerCase();
  if (!SUPPORTED.has(ext)) return;

  const src = path.join(IN, file);
  const dest = path.join(OUT, file);
  const img = sharp(src);
  const meta = await img.metadata();

  let pipeline = img.resize(meta.width, meta.height);

  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: 60, mozjpeg: true });
  } else if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: 60 });
  } else if (ext === '.avif') {
    pipeline = pipeline.avif({ quality: 40 });
  } else if (ext === '.tiff') {
    pipeline = pipeline.tiff({ compression: 'lzw' });
  }

  await pipeline.toFile(dest);

  const before = fs.statSync(src).size;
  const after = fs.statSync(dest).size;
  const saved = (((before - after) / before) * 100).toFixed(1);
  console.log(`${file}: ${kb(before)} → ${kb(after)} (−${saved}%)`);
}

function kb(bytes) {
  return (bytes / 1024).toFixed(0) + ' KB';
}

async function run() {
  const files = fs.readdirSync(IN);
  for (const file of files) {
    await compress(file);
  }
}

run().catch(console.error);
