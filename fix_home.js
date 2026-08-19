const fs = require('fs');
let html = fs.readFileSync('attached_assets/index.html', 'utf8');

// Also remove margin-top from .home-overview on mobile
const homeOverviewCss = `.home-overview { margin-top: 0 !important; margin-bottom: 8px !important; }`;
html = html.replace('/* Ultimate Mobile Gap Removal */', '/* Ultimate Mobile Gap Removal */\n            .home-overview { margin-top: 0 !important; margin-bottom: 8px !important; border-top-left-radius: 0 !important; border-top-right-radius: 0 !important; }');

// Clean up the empty home-secondary-content
html = html.replace('<div id="home-secondary-content" class="home-secondary-content" style="display:none;"></div>', '');

fs.writeFileSync('attached_assets/index.html', html);
console.log("Home fixed");
