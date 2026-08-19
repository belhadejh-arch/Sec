const fs = require('fs');
let html = fs.readFileSync('attached_assets/index.html', 'utf8');

// 1. We need to extract the parts from #home-secondary-content
// The structure is:
// <div id="home-secondary-content" class="home-secondary-content">
//     <div class="slider-container">...</div>
//     <!-- عجلة الحظ -->
//     <div class="wheel-card">...</div>
//     <div class="stats-bar">...</div>
//     <div class="card">...</div>
// </div>

const secondaryContentStart = html.indexOf('<div id="home-secondary-content"');
if (secondaryContentStart === -1) {
    console.log("Could not find home-secondary-content");
    process.exit(1);
}

// Find the end of home-screen
const homeScreenEnd = html.indexOf('        <div id="about-screen"', secondaryContentStart);

const secondaryContentHTML = html.substring(secondaryContentStart, homeScreenEnd);

// Extract slider
const sliderMatch = secondaryContentHTML.match(/<div class="slider-container">[\s\S]*?<\/div>\s*<!-- عجلة الحظ -->/);
const wheelMatch = secondaryContentHTML.match(/<div class="wheel-card">[\s\S]*?<\/div>\s*<div class="stats-bar">/);
const statsMatch = secondaryContentHTML.match(/<div class="stats-bar">[\s\S]*?<\/div>\s*<div class="card">/);
const cardMatch = secondaryContentHTML.match(/<div class="card">\s*<h3>🇺🇸 عن شركة SECURO[\s\S]*?<\/div>\s*<\/div>/);

let sliderStr = sliderMatch ? sliderMatch[0].replace('<!-- عجلة الحظ -->', '').trim() : '';
let wheelStr = wheelMatch ? wheelMatch[0].replace('<div class="stats-bar">', '').trim() : '';
let statsStr = statsMatch ? statsMatch[0].replace('<div class="card">', '').trim() : '';
let cardStr = cardMatch ? cardMatch[0].replace(/<\/div>$/, '').trim() : ''; // removes the closing div for secondary-content

// Clean up the cardStr (remove the extra </div> at the end)
if (cardStr.endsWith('</div>\n            </div>')) {
    cardStr = cardStr.substring(0, cardStr.lastIndexOf('</div>')).trim();
} else if (cardStr.endsWith('</div>\r\n            </div>')) {
    cardStr = cardStr.substring(0, cardStr.lastIndexOf('</div>')).trim();
}

// Now replace #home-secondary-content with just an empty div (or remove it entirely)
html = html.replace(secondaryContentHTML, '            <div id="home-secondary-content" class="home-secondary-content" style="display:none;"></div>\n        </div>\n\n');

// 2. Put slider, stats, card into #about-screen-content
const aboutContentStart = html.indexOf('<div id="about-screen-content"></div>');
if (aboutContentStart !== -1) {
    const newAboutContent = `<div id="about-screen-content">\n${sliderStr}\n${statsStr}\n${cardStr}\n</div>`;
    html = html.replace('<div id="about-screen-content"></div>', newAboutContent);
}

// 3. Create #spin-screen
const tasksScreenStart = html.indexOf('<!-- 4. شاشة المهام -->');
if (tasksScreenStart !== -1) {
    const spinScreenHTML = `
        <!-- عجلة الحظ -->
        <div id="spin-screen" class="screen">
            <h2 style="margin-bottom: 15px; color: var(--text-white);">🎡 عجلة الحظ</h2>
            ${wheelStr}
        </div>
        
    `;
    html = html.slice(0, tasksScreenStart) + spinScreenHTML + html.slice(tasksScreenStart);
}

// 4. Update Quick Actions to link to Spin screen
// Current quick actions:
// Deposit, Withdraw, Tasks, Support
// Change them to:
// Deposit, Withdraw, Spin, Tasks
// (Or add a 5th? But grid is 4 columns on desktop, 2 on mobile. So let's keep 4 or make it 6).
// Let's replace 'الدعم' (Support) with 'عجلة الحظ' (Wheel) and move Support to the platform menu.
// Support is already in the platform menu anyway.

let quickActionsMatch = html.match(/<div class="action-item" onclick="openSupportModal\(\)">[\s\S]*?<\/div>/);
if (quickActionsMatch) {
    html = html.replace(quickActionsMatch[0], `<div class="action-item" onclick="switchTab('spin')">\n                    <div class="action-icon">🎡</div>\n                    <div class="action-title">عجلة الحظ</div>\n                </div>`);
}

fs.writeFileSync('attached_assets/index.html', html);
console.log("Success");
