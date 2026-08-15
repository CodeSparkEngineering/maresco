async function getImages(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const matches = html.match(/https?:\/\/[^\s"'<>]+?\.(?:jpg|jpeg|png|webp)/gi) || [];
    return [...new Set(matches.filter(m => m.includes('wp-content/uploads')))];
  } catch (e) {
    return [];
  }
}

async function run() {
  const pages = [
    'https://maresco.bardapraia.com.pt/',
    'https://maresco.bardapraia.com.pt/menu/',
    'https://maresco.bardapraia.com.pt/galeria/',
    'https://maresco.bardapraia.com.pt/sushi/',
    'https://maresco.bardapraia.com.pt/restaurante/',
    'https://maresco.bardapraia.com.pt/carta/'
  ];
  const allImages = new Set();
  for (const p of pages) {
    const imgs = await getImages(p);
    console.log(`Page: ${p} found ${imgs.length} images`);
    imgs.forEach(i => allImages.add(i));
  }
  console.log('\n--- ALL UNIQUE UPLOADS ---');
  Array.from(allImages).forEach(img => console.log(img));
}

run();
