import fs from 'fs';
import https from 'https';
import path from 'path';

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function main() {
  const totalFrames = 60;
  console.log(`Downloading ${totalFrames} frames...`);
  
  // Ensure the sequence directory exists
  const sequenceDir = path.resolve('./public/sequence');
  if (!fs.existsSync(sequenceDir)) {
    fs.mkdirSync(sequenceDir, { recursive: true });
  }

  for (let i = 1; i <= totalFrames; i++) {
    const frameStr = i.toString().padStart(4, '0');
    // Using a fake image generator for dummy frames
    const url = `https://fakeimg.pl/1280x720/1a1a1a/ffffff/?text=Frame+${i}`;
    const dest = path.join(sequenceDir, `frame_${frameStr}.jpg`);
    await download(url, dest);
    if (i % 10 === 0) console.log(`Downloaded ${i} frames...`);
  }
  console.log('Sequence generation complete!');
}

main();
