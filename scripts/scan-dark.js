const fs = require('fs');
const files = ['IntroSection','ChefSection','MenuSection','ReservationSection','Footer','Gallery','SushiExperience','IngredientShowcase','Hero','LocaleSwitcher'];
files.forEach(f => {
  const p = `src/components/${f}.tsx`;
  try {
    const c = fs.readFileSync(p, 'utf8');
    const has = [];
    if (c.includes('bg-ink')) has.push('bg-ink');
    if (c.includes('text-bone')) has.push('text-bone');
    if (c.includes('border-bone')) has.push('border-bone');
    if (c.includes('bg-ink-800')) has.push('bg-ink-800');
    console.log(f + ': ' + (has.join(', ') || 'clean'));
  } catch (e) {
    console.log(f + ': NOT FOUND');
  }
});
