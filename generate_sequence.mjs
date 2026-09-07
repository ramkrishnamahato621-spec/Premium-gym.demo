import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function main() {
  const sourceImage = 'C:/Users/Asus/.gemini/antigravity/brain/8f673c2c-babb-4abe-8f67-42016ddfb095/empty_premium_gym_1788725183180.jpg';
  const outDir = path.resolve('./public/sequence');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const totalFrames = 100;
  console.log(`Generating ${totalFrames} frames for gym tour (without dumbbell)...`);

  const metadata = await sharp(sourceImage).metadata();
  const width = metadata.width || 1920;
  const height = metadata.height || 1080;

  // Process base image
  const processedBgBuffer = await sharp(sourceImage)
    .modulate({
      brightness: 0.9,
    }) // Slight dim for text readability
    .toBuffer();

  for (let i = 0; i < totalFrames; i++) {
    const frameStr = (i + 1).toString().padStart(4, '0');
    const dest = path.join(outDir, `frame_${frameStr}.jpg`);
    
    // Zoom factor: 1.0 to 0.6 (Simulating walking forward into the gym)
    const zoomProgress = i / (totalFrames - 1); 
    const zoomFactor = 1.0 - (zoomProgress * 0.4); 
    
    const extractWidth = Math.floor(width * zoomFactor);
    const extractHeight = Math.floor(height * zoomFactor);
    const extractLeft = Math.floor((width - extractWidth) / 2);
    const extractTop = Math.floor((height - extractHeight) / 2);

    await sharp(processedBgBuffer)
      .extract({ left: extractLeft, top: extractTop, width: extractWidth, height: extractHeight })
      .resize(width, height)
      .jpeg({ quality: 80 })
      .toFile(dest);
      
    if ((i + 1) % 10 === 0) {
      console.log(`Generated ${i + 1} frames...`);
    }
  }
  
  console.log('Gym tour animation complete!');
}

main().catch(console.error);
