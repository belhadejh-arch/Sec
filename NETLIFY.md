# إعداد نشر Tarnoy على Netlify

يستضيف Netlify ملفات الواجهة فقط. يبقى Backend وPostgreSQL والجلسات على Render
كما هي؛ وتُمرَّر طلبات `/api` من Netlify إلى خدمة Render.

## القيم في إعدادات Netlify

| الخانة | القيمة |
| --- | --- |
| Base directory | `attached_assets` |
| Build command | `npm ci --no-audit --no-fund && npm run build` |
| Publish directory | `.` |
| Functions directory | اترك القيمة الافتراضية `netlify/functions`؛ لا يستخدم المشروع Netlify Functions |

الإعدادات موجودة أيضاً في `netlify.toml`. ملف `attached_assets/_redirects` يمرر
`/api/*` إلى Backend على Render، ثم يوجّه مسارات الواجهة إلى `index.html`.

## بعد إنشاء موقع Netlify

1. انسخ عنوان الموقع الذي أعطاه Netlify، مثل `https://اسم-الموقع.netlify.app`.
2. في إعدادات خدمة Render، اضبط `FRONTEND_URL` على عنوان Netlify، وأضف النطاق
   المخصص إن استُخدم، مفصولاً بفاصلة. مثال:

   ```text
   https://اسم-الموقع.netlify.app,https://tarnoy.xyz,https://www.tarnoy.xyz
   ```

3. أعد نشر خدمة Render كي تقبل طلبات الواجهة من نطاق Netlify.
4. اختبر تسجيل الدخول والتسجيل من موقع Netlify. قاعدة البيانات و`SESSION_SECRET`
   يبقيان في Render؛ لا تنقلهما إلى إعدادات Netlify.

إذا تغير عنوان خدمة Render، عدّل وجهة `/api/*` في `attached_assets/_redirects`
وأعد نشر الواجهة.
