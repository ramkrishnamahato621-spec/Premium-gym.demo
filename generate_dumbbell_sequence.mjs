import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function main() {
  const sourceImage = 'C:/Users/Asus/.gemini/antigravity/brain/8f673c2c-babb-4abe-8f67-42016ddfb095/premium_gym_amber_1788721414002.jpg';
  const outDir = path.resolve('./public/sequence');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const totalFrames = 100;
  console.log(`Generating ${totalFrames} frames for full-page premium dumbbell (Depth of Field, High Contrast, Maroon Light)...`);

  const metadata = await sharp(sourceImage).metadata();
  const width = metadata.width || 1920;
  const height = metadata.height || 1080;

  // Pre-process background: High contrast, Maroon tint, Depth of Field (blur)
  const processedBgBuffer = await sharp(sourceImage)
    .blur(15) // Depth of Field (Day Fox / Defocus)
    .tint({ r: 90, g: 20, b: 30 }) // Maroon light (Mehuram)
    .modulate({
      brightness: 0.8,
      saturation: 1.5,
    }) // High contrast / moody
    .jpeg({ quality: 90 })
    .toBuffer();

  for (let i = 0; i < totalFrames; i++) {
    const frameStr = (i + 1).toString().padStart(4, '0');
    const dest = path.join(outDir, `frame_${frameStr}.jpg`);
    
    // Sine wave for smooth up/down motion (1 full rep)
    const progress = i / (totalFrames - 1);
    const yOffset = Math.sin(progress * Math.PI) * 450; 
    
    const dumbbellWidth = 800;
    const dumbbellHeight = 350;
    const xPos = Math.floor((width - dumbbellWidth) / 2);
    const baseY = Math.floor(height * 0.85) - dumbbellHeight;
    const yPos = Math.floor(baseY - yOffset);

    // Premium Dumbbell SVG
    const svgDumbbell = `
      <svg width="${dumbbellWidth}" height="${dumbbellHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="handleMetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#d4af37;stop-opacity:1" /> <!-- Golden/Premium touch -->
            <stop offset="50%" style="stop-color:#fff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#997a00;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="weightMetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#2a2a2a;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#4a4a4a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#111;stop-opacity:1" />
          </linearGradient>
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="20" stdDeviation="15" flood-color="#000" flood-opacity="0.8"/>
          </filter>
        </defs>
        
        <g filter="url(#dropShadow)">
          <!-- Handle -->
          <rect x="250" y="150" width="300" height="50" fill="url(#handleMetal)" rx="10" />
          
          <!-- Left Weights -->
          <rect x="180" y="50" width="70" height="250" fill="url(#weightMetal)" rx="15" />
          <rect x="120" y="75" width="60" height="200" fill="url(#weightMetal)" rx="15" />
          <rect x="70" y="100" width="50" height="150" fill="url(#weightMetal)" rx="15" />
          
          <!-- Right Weights -->
          <rect x="550" y="50" width="70" height="250" fill="url(#weightMetal)" rx="15" />
          <rect x="620" y="75" width="60" height="200" fill="url(#weightMetal)" rx="15" />
          <rect x="680" y="100" width="50" height="150" fill="url(#weightMetal)" rx="15" />
        </g>
      </svg>
    `;

    const svgBuffer = Buffer.from(svgDumbbell);

    await sharp(processedBgBuffer)
      .composite([
        {
          input: svgBuffer,
          top: yPos,
          left: xPos,
        },
      ])
      .jpeg({ quality: 80 })
      .toFile(dest);
      
    if ((i + 1) % 10 === 0) {
      console.log(`Generated ${i + 1} frames...`);
    }
  }
  
  console.log('Premium Dumbbell full-page animation complete!');
}

main().catch(console.error);
