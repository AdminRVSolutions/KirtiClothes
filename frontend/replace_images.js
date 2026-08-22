const fs = require('fs');
const path = require('path');

const imgDir = '/img/img2.webp';
const images = [
  'http://localhost:5029/img/Men/type1/img1.avif',
  'http://localhost:5029/img/Men/type2/img2.avif',
  'http://localhost:5029/img/Woman/type1/img1.avif',
  'http://localhost:5029/img/Woman/salwarkameej/img3.avif',
  'http://localhost:5029/img/img2.webp',
  'http://localhost:5029/img/imge3.webp'
];

let imgIndex = 0;

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules')) {
        processDirectory(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modified = false;
      content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[^?"]*(?:\?[^"]*)?/g, () => {
        modified = true;
        const currentImg = images[imgIndex % images.length];
        imgIndex++;
        return currentImg;
      });
      
      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated images in ${fullPath}`);
      }
    }
  }
}

processDirectory('./src');
