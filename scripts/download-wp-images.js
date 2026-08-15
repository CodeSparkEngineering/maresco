const fs = require('fs');
const path = require('path');

const wpImages = [
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2024/01/25072023-7K1A5805.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/11/u25072023-_51A4372.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/04102023-_51A5278.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2024/01/04102023-_51A5304.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2024/01/04102023-_51A5262.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/04102023-_51A5246.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/04102023-_51A5234.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2024/01/04102023-_51A5190.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2024/01/25072023-7K1A5834.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2024/01/25072023-7K1A5809.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2024/01/25072023-7K1A5798.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2024/01/25072023-7K1A5785.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2024/01/25072023-7K1A5570.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2024/01/25072023-7K1A5559.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/maresco_98.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/maresco_92.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/maresco_78.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/maresco_72.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/maresco_89-1.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/maresco_95.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/maresco_99.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/04102023-_51A4877.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/04102023-_51A4906.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/04102023-_51A5047.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/04102023-_51A5362.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/04102023-_51A5297.jpg',
  'https://maresco.bardapraia.com.pt/wp-content/uploads/2023/12/04102023-_51A5314.jpg'
];

const tempDir = path.join(__dirname, '..', 'public', 'media', 'wp-temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

async function downloadAll() {
  for (const url of wpImages) {
    const filename = path.basename(url);
    const dest = path.join(tempDir, filename);
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(buffer));
        console.log(`Downloaded ${filename} (${buffer.byteLength} bytes)`);
      } else {
        console.log(`Failed ${url}: status ${res.status}`);
      }
    } catch (e) {
      console.log(`Error ${url}: ${e.message}`);
    }
  }
}

downloadAll();
