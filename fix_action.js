const fs = require('fs');
let html = fs.readFileSync('attached_assets/index.html', 'utf8');

// The malformed part is:
//                 <div class="action-item" onclick="switchTab('spin')">
//                     <div class="action-icon">🎡</div>
//                     <div class="action-title">عجلة الحظ</div>
//                 </div>
//                     <div class="action-title">الدعم</div>
//                 </div>

const badString = `<div class="action-item" onclick="switchTab('spin')">
                    <div class="action-icon">🎡</div>
                    <div class="action-title">عجلة الحظ</div>
                </div>
                    <div class="action-title">الدعم</div>
                </div>`;

const goodString = `<div class="action-item" onclick="switchTab('spin')">
                    <div class="action-icon">🎡</div>
                    <div class="action-title">عجلة الحظ</div>
                </div>`;

if (html.includes(badString)) {
    html = html.replace(badString, goodString);
    fs.writeFileSync('attached_assets/index.html', html);
    console.log("Fixed actions");
} else {
    console.log("Not found");
}

