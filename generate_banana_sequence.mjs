import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function main() {
  const sourceImage = 'C:/Users/Asus/.gemini/antigravity/brain/8f673c2c-babb-4abe-8f67-42016ddfb095/luxury_banana_1788714393887.jpg';
  const outDir = path.resolve('./public/sequence');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const totalFrames = 60;
  console.log(`Generating ${totalFrames} frames from banana image...`);

  for (let i = 0; i < totalFrames; i++) {
    const angle = i * (360 / totalFrames);
    const frameStr = (i + 1).toString().padStart(4, '0');
    const dest = path.join(outDir, `frame_${frameStr}.jpg`);
    
    // Rotate the image
    await sharp(sourceImage)
      .rotate(angle, { background: { r: 0, g: 0, b: 0, alpha: 1 } })
      .jpeg({ quality: 80 })
      .toFile(dest);
      
    if ((i + 1) % 10 === 0) {
      console.log(`Generated ${i + 1} frames...`);
    }
  }
  
  console.log('Banana sequence generation complete!');
}

main().catch(console.error);
