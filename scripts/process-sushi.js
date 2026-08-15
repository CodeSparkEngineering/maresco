const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'public', 'media', 'sushi');
const outDir = path.join(__dirname, '..', 'public', 'media', 'sushi');

const items = [
  { name: 'neta', file: 'neta.jpg', threshold: 245 },
  { name: 'shari', file: 'shari.jpg', threshold: 245 },
  { name: 'nori', file: 'nori.jpg', threshold: 240 },
  { name: 'wasabi', file: 'wasabi.jpg', threshold: 240 },
  { name: 'topping', file: 'topping.jpg', threshold: 248 },
];

async function processAll() {
  for (const item of items) {
    const inputPath = path.join(srcDir, item.file);
    const outPng = path.join(outDir, `${item.name}.png`);
    const outWebp = path.join(outDir, `${item.name}.webp`);

    const image = sharp(inputPath);
    const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const minVal = Math.min(r, g, b);
      if (minVal >= item.threshold) {
        data[i + 3] = 0; // Transparent
      } else if (minVal > item.threshold - 20) {
        const factor = (item.threshold - minVal) / 20;
        data[i + 3] = Math.round(255 * factor);
      }
    }

    await sharp(data, { raw: { width, height, channels } })
      .png()
      .toFile(outPng);

    await sharp(data, { raw: { width, height, channels } })
      .webp({ quality: 90 })
      .toFile(outWebp);

    console.log(`Generated: ${item.name}.png & ${item.name}.webp`);
  }
}

processAll().catch(console.error);
