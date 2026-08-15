async function analyzeOldSiteStyles() {
  const url = 'https://maresco.bardapraia.com.pt/';
  const res = await fetch(url);
  const html = await res.text();
  
  // Extract CSS link tags
  const cssLinks = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi)].map(m => m[1]);
  console.log('Found CSS links:', cssLinks.length);
  
  const allCss = [];
  for (const link of cssLinks) {
    try {
      const cssRes = await fetch(link);
      if (cssRes.ok) {
        const text = await cssRes.text();
        allCss.push(text);
      }
    } catch(e) {}
  }
  
  const combinedCss = allCss.join('\n') + html;
  
  // Extract hex colors
  const hexColors = combinedCss.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g) || [];
  // Extract rgb/rgba colors
  const rgbColors = combinedCss.match(/rgba?\([^)]+\)/g) || [];
  
  const colorCounts = {};
  hexColors.forEach(c => {
    const norm = c.toLowerCase();
    colorCounts[norm] = (colorCounts[norm] || 0) + 1;
  });
  
  const sortedColors = Object.entries(colorCounts).sort((a,b) => b[1] - a[1]);
  console.log('Top hex colors on old site:');
  sortedColors.slice(0, 30).forEach(([col, count]) => {
    console.log(`${col}: ${count}`);
  });

  // Extract CSS variables if any
  const vars = combinedCss.match(/--[a-zA-Z0-9-_]+:\s*[^;]+/g) || [];
  console.log('\nCSS Variables:');
  [...new Set(vars)].forEach(v => console.log(v));
}

analyzeOldSiteStyles();
