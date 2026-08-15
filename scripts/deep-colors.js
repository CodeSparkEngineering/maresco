async function deepInspectColors() {
  const res = await fetch('https://maresco.bardapraia.com.pt/');
  const html = await res.text();
  
  // Find all stylesheet URLs
  const cssUrls = [...html.matchAll(/href=["'](https?:\/\/[^"']+\.css[^"']*)["']/g)].map(m => m[1]);
  
  let totalCss = '';
  for (const u of cssUrls) {
    if (u.includes('elementor') || u.includes('theme') || u.includes('kababi') || u.includes('style.css')) {
      try {
        const cRes = await fetch(u);
        if (cRes.ok) {
          const t = await cRes.text();
          totalCss += '\n' + t;
        }
      } catch(e) {}
    }
  }
  
  // Find background colors in sections
  const bgMatches = totalCss.match(/background(?:-color)?:\s*([^;]+);/gi) || [];
  const colorMatches = totalCss.match(/color:\s*([^;]+);/gi) || [];
  
  console.log('--- BACKGROUNDS ---');
  const bgCounts = {};
  bgMatches.forEach(b => bgCounts[b] = (bgCounts[b] || 0) + 1);
  Object.entries(bgCounts).sort((a,b)=>b[1]-a[1]).slice(0, 25).forEach(([k,v])=>console.log(`${k} -> ${v}`));

  console.log('\n--- TEXT COLORS ---');
  const colCounts = {};
  colorMatches.forEach(c => colCounts[c] = (colCounts[c] || 0) + 1);
  Object.entries(colCounts).sort((a,b)=>b[1]-a[1]).slice(0, 25).forEach(([k,v])=>console.log(`${k} -> ${v}`));
}

deepInspectColors();
