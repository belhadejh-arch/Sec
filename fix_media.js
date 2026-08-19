const fs = require('fs');
let html = fs.readFileSync('attached_assets/index.html', 'utf8');

const oldStr = `        /* Ultimate Mobile Gap Removal */
            .home-overview { margin-top: 0 !important; margin-bottom: 8px !important; border-top-left-radius: 0 !important; border-top-right-radius: 0 !important; } 
        @media (max-width: 760px) {`;
const newStr = `        /* Ultimate Mobile Gap Removal */
        @media (max-width: 760px) { 
            .home-overview { margin-top: 0 !important; margin-bottom: 8px !important; border-top-left-radius: 0 !important; border-top-right-radius: 0 !important; } `;

html = html.replace(oldStr, newStr);
fs.writeFileSync('attached_assets/index.html', html);
console.log("Fixed media query");
