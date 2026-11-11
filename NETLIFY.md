# إعداد نشر Tarnoy بالكامل على Netlify

يستضيف Netlify الواجهة وExpress API عبر Netlify Functions. تبقى قاعدة PostgreSQL
على Neon، وهي خدمة خارج Netlify؛ بياناتها السرية تُضاف إلى إعدادات Netlify
لتصل إليها الـFunctions.

## القيم في إعدادات Netlify

| الخانة | القيمة |
| --- | --- |
| Base directory | اتركها فارغة (جذر المستودع) |
| Build command | `npm ci --no-audit --no-fund && npm run build` |
| Publish directory | `attached_assets` |
| Functions directory | `netlify/functions` |

الإعدادات موجودة أيضاً في `netlify.toml`. ملف `attached_assets/_redirects` يمرر
`/api/*` إلى Express Function ثم يوجّه مسارات الواجهة إلى `index.html`.

## متغيرات البيئة على Netlify

أضف القيم التالية في إعدادات الموقع، من دون وضعها في GitHub:

- `NEON_DATABASE_URL` — رابط PostgreSQL الحالي على Neon.
- `SESSION_SECRET` — قيمة عشوائية طويلة وخاصة بالإنتاج.
- `NODE_ENV=production`
- `FRONTEND_URL` — عنوان Netlify، وأضف النطاق المخصص بعد ربطه، مفصولين بفاصلة.
- `COOKIE_SAME_SITE=none`

بعد إنشاء الموقع استخدم عنوانه الفعلي في `FRONTEND_URL`، مثلاً:

```text
https://اسم-الموقع.netlify.app,https://tarnoy.xyz,https://www.tarnoy.xyz
```

لا حاجة إلى `FRONTEND_URL` خاص بـRender بعد نقل API إلى Netlify. لا توقف خدمة
Render القديمة حتى تتأكد من عمل التسجيل والدخول وبيانات المستخدمين على Netlify؛
بعد ذلك يمكن إيقافها. لا تغيّر قاعدة Neon أو تنقلها؛ الـFunction يتصل بقاعدة
البيانات نفسها.
