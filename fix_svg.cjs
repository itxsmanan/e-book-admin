const fs = require('fs');

const files = fs.readdirSync('src/components').filter(f => f.endsWith('Tab.tsx') && f !== 'DashboardTab.tsx');

files.forEach(file => {
    let content = fs.readFileSync('src/components/' + file, 'utf-8');
    
    // Replace the problematic select className containing the svg background
    content = content.replace(/bg-\[url\(\\"[^"]+\\"\)]/g, '');
    
    // Additionally, some might have \ escaped differently depending on how it was written
    content = content.replace(/bg-\[url\(\\"data:image\/svg\+xml;charset=utf-8,.*?\\"\)\]/g, '');
    
    // Just to be absolutely safe, let's look for the known broken string literal
    content = content.replace(/bg-\[url\(\\"data:image\/svg\+xml;charset=utf-8,%3Csvg_xmlns='http:\/\/www\.w3\.org\/2000\/svg'_viewBox='0_0_24_24'_fill='none'_stroke='%23A8AAB8'_stroke-width='2'_stroke-linecap='round'_stroke-linejoin='round'%3E%3Cpolyline_points='6_9_12_15_18_9'\/%3E%3C\/svg%3E\\"\)\]/g, '');
    
    // Let's also just fix any instance of \" inside className="
    // The easiest fix is to find className="..." and replace \" inside it with '
    // But since the svg has single quotes already, it might break.
    // The best is to just remove the `bg-[url(\"...")]` entirely.
    const regex = /bg-\[url\(\\"data:image\/svg\+xml[^\]]+\)\]/g;
    content = content.replace(regex, '');

    fs.writeFileSync('src/components/' + file, content, 'utf-8');
});

console.log('Fixed SVG syntax in tabs');
