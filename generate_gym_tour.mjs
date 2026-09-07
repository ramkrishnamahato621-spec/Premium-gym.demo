import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function main() {
  const sourceImage = 'C:/Users/Asus/.gemini/antigravity/brain/8f673c2c-babb-4abe-8f67-42016ddfb095/premium_gym_amber_1788721414002.jpg';
  const outDir = path.resolve('./public/sequence');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // We will generate 100 frames simulating walking forward by zooming into the center
  const totalFrames = 100;
  console.log(`Generating ${totalFrames} frames for gym tour...`);

  // Get original image metadata
  const metadata = await sharp(sourceImage).metadata();
  const width = metadata.width || 1024;
  const height = metadata.height || 1024;

  for (let i = 0; i < totalFrames; i++) {
    const frameStr = (i + 1).toString().padStart(4, '0');
    const dest = path.join(outDir, `frame_${frameStr}.jpg`);
    
    // Zoom factor: 1.0 at frame 0, zooming into 0.5 (extracting center 50%) at frame 100
    // This creates a continuous forward movement
    const zoomProgress = i / (totalFrames - 1); // 0 to 1
    const zoomFactor = 1.0 - (zoomProgress * 0.5); // 1.0 to 0.5
    
    const extractWidth = Math.floor(width * zoomFactor);
    const extractHeight = Math.floor(height * zoomFactor);
    const extractLeft = Math.floor((width - extractWidth) / 2);
    const extractTop = Math.floor((height - extractHeight) / 2);
    
    await sharp(sourceImage)
      .extract({ left: extractLeft, top: extractTop, width: extractWidth, height: extractHeight })
      .resize(width, height) // resize back to original resolution so the canvas doesn't shift
      .jpeg({ quality: 80 })
      .toFile(dest);
      
    if ((i + 1) % 10 === 0) {
      console.log(`Generated ${i + 1} frames...`);
    }
  }
  
  console.log('Gym tour sequence generation complete!');
}

main().catch(console.error);
