const fs = require('fs');
let html = fs.readFileSync('attached_assets/index.html', 'utf8');

const strToReplace = `.screen { padding-top: 0 !important; margin-top: 0 !important; }`;
const newStr = `.screen { padding-top: 0 !important; margin-top: 0 !important; }\n            .screen:not(#home-screen):not(#admin-screen) { padding-top: 15px !important; }`;

if (html.includes(strToReplace)) {
    html = html.replace(strToReplace, newStr);
    fs.writeFileSync('attached_assets/index.html', html);
    console.log("Padding fixed");
}
