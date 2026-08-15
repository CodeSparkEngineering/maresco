async function extractThemeColors() {
  const url = 'https://maresco.bardapraia.com.pt/';
  const res = await fetch(url);
  const html = await res.text();
  
  // Find elementor kit settings or inline style blocks
  const inlineStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n');
  
  console.log('Inline styles length:', inlineStyles.length);
  
  // Find color variables and properties
  const matches = inlineStyles.match(/(--e-global-color-[a-z]+:\s*[^;]+|--primary:\s*[^;]+|--secondary:\s*[^;]+|--accent:\s*[^;]+|--background:\s*[^;]+|background(?:-color)?:\s*#[0-9a-fA-F]{3,6}|color:\s*#[0-9a-fA-F]{3,6})/gi) || [];
  
  [...new Set(matches)].forEach(m => console.log(m));
}

extractThemeColors();
