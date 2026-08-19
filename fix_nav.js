const fs = require('fs');
let html = fs.readFileSync('attached_assets/index.html', 'utf8');

const navTeamRegex = /<div id="nav-team" class="nav-link" onclick="switchTab\('team'\)">\s*<span>👥<\/span> فريقي\s*<\/div>/;
if (html.match(navTeamRegex)) {
    html = html.replace(navTeamRegex, `<div id="nav-spin" class="nav-link" onclick="switchTab('spin')">\n            <span>🎡</span> عجلة الحظ\n        </div>`);
    fs.writeFileSync('attached_assets/index.html', html);
    console.log("Nav replaced");
} else {
    console.log("Nav not found");
}
