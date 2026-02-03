import { Jimp } from 'jimp';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// #f8fafc (slate-50) as 0xRRGGBBAA
const BG = 0xf8fafcff;

async function createIcon(size) {
  const image = new Jimp({ width: size, height: size, color: BG });
  return image;
}

async function main() {
  await mkdir(publicDir, { recursive: true });
  for (const size of [192, 512, 180]) {
    const name = size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`;
    const image = await createIcon(size);
    await image.write(join(publicDir, name));
    console.log('Written', name);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
