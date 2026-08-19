const fs = require('fs');
let html = fs.readFileSync('attached_assets/index.html', 'utf8');

const spinHTML = `
        <div id="spin-screen" class="screen">
            <h2 style="margin-bottom: 15px; color: var(--text-white);">🎡 عجلة الحظ المباشرة</h2>
            <div class="wheel-card">
                <p style="font-size: 0.78rem; color: #c7d2fe; text-align: center; margin-bottom: 12px;">تُمنح محاولات عجلة الحظ تلقائياً عند إجراء الترقية أو إيداع صديق عن طريق رابط دعواتك!</p>
                
                <div class="wheel-container-wrapper">
                    <div class="wheel-pointer"></div>
                    <canvas id="wheel-canvas" class="wheel-canvas" width="230" height="230"></canvas>
                    <button class="spin-center-btn" id="spin-wheel-button" type="button" onclick="spinWheel()" disabled>دوران</button>
                </div>

                <div style="background: rgba(0, 0, 0, 0.3); border-radius: 12px; padding: 8px 12px; display: inline-block; border: 1px solid rgba(255, 255, 255, 0.1); margin-top: 15px;">
                    <span style="font-size: 0.85rem; color: #a5f3fc; font-weight: bold;">المحاولات المتاحة لديك: </span>
                    <span id="wheel-spins-count" style="font-size: 1.1rem; font-weight: 900; color: #fbbf24;">0</span>
                </div>
            </div>
        </div>
`;

if (!html.includes('id="spin-screen"')) {
    // insert right before the closing </main> tag or at a specific section
    const vipScreenIndex = html.indexOf('<div id="vip-screen"');
    if (vipScreenIndex !== -1) {
        html = html.substring(0, vipScreenIndex) + spinHTML + html.substring(vipScreenIndex);
        fs.writeFileSync('attached_assets/index.html', html);
        console.log("Spin screen added.");
    } else {
        console.log("VIP screen not found.");
    }
} else {
    console.log("Spin screen already exists.");
}

