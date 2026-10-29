# تشغيل Tarnoy على استضافة Octenium عبر cPanel

المشروع تطبيق Node.js/Express واحد؛ يقدّم الواجهة من `attached_assets` ويقدّم
مسارات `/api` من الخادم نفسه. ملف `app.js` هو نقطة البدء التي يتوقعها Passenger
في cPanel. يبقى أمر Render الحالي `npm start` كما هو.

## متطلبات باقة Octenium

- تطبيق Node.js عبر cPanel / Passenger.
- Node.js 22 أو 24.
- السماح باتصالات PostgreSQL الخارجية عبر SSL إلى قاعدة Neon.
- نطاق مع HTTPS.

إن كانت الباقة لا تعرض Node.js 22 أو 24، أو تمنع اتصالات PostgreSQL الخارجية،
اطلب من Octenium تأكيد التوافق قبل رفع التطبيق.

## الرفع والإعداد

1. ارفع مستودع GitHub كاملاً إلى مجلد التطبيق في حسابك، أو استخدم Git Version
   Control في cPanel. يجب أن يحتوي مجلد الجذر على `app.js` و`server.js`
   و`package.json` و`package-lock.json` ومجلد `attached_assets`.
2. من **cPanel → Setup Node.js App** أنشئ التطبيق:
   - **Node.js version:** `22.x` أو `24.x`.
   - **Application mode:** `Production`.
   - **Application root:** مسار مجلد المشروع الذي رفعته.
   - **Application URL:** النطاق المطلوب، مثل `https://tarnoy.xyz/`.
   - **Application startup file:** `app.js`.
3. أضف متغيرات البيئة من إعداد التطبيق في cPanel، ولا تضع قيمها في Git:
   - `NODE_ENV=production`
   - `NEON_DATABASE_URL` أو `DATABASE_URL` — رابط PostgreSQL مع تفعيل SSL.
   - `SESSION_SECRET` — قيمة سرية طويلة وعشوائية.
   - `FRONTEND_URL=https://tarnoy.xyz,https://www.tarnoy.xyz`
   - `COOKIE_SAME_SITE=lax`
4. فعّل البيئة الافتراضية التي يعرضها cPanel في Terminal، ثم من مجلد المشروع
   ثبّت الاعتماديات:

   ```bash
   npm ci --omit=dev
   ```

5. اضغط **Restart** من صفحة تطبيق Node.js في cPanel. إذا كانت الواجهة أو API
   تعرض خطأً، راجع سجل التطبيق في cPanel قبل تغيير الإعدادات.
6. اختبر `https://tarnoy.xyz/api/health`، ثم افتح الصفحة الرئيسية وسجّل الدخول.

## قاعدة البيانات والجلسات

يستمر التطبيق باستخدام قاعدة Neon الحالية؛ لا تُنشأ قاعدة فارغة ولا تُنقل
البيانات لمجرد تغيير الاستضافة. تأكد من أن Octenium يسمح باتصالات الخروج إلى
Neon. يستخدم التطبيق `NEON_DATABASE_URL` أو `DATABASE_URL` و`SESSION_SECRET`، ويتحقق `app.js`
من وجودهما قبل بدء التشغيل.

## ملاحظات

- لا ترفع `node_modules` أو أي ملف `.env` إلى المستودع.
- ملف `attached_assets/vercel.json` خاص بتوجيهات Vercel، ولا يلزم لـOctenium؛
  الخادم يخدم الواجهة و`/api` من النطاق نفسه.
- Passenger يتولى ربط المنفذ الخاص بالتطبيق. لا تفتح منفذاً عاماً يدوياً.
- يشرح cPanel طريقة إنشاء وتشغيل تطبيق Node.js عبر Passenger في:
  https://docs.cpanel.net/knowledge-base/web-services/how-to-install-a-node.js-application/
