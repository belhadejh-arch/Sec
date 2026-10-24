---
name: Render وVercel deployment
description: قاعدة ربط واجهة Vercel مع Backend Render مع جلسات تسجيل الدخول.
---

عند نشر الواجهة والـ Backend على نطاقين مختلفين، لا يكفي تغيير رابط API؛ يجب
ضبط CORS المسموح، إرسال credentials، وCookie من نوع `SameSite=None` مع `Secure`.

**Why:** تسجيل الدخول يعتمد على جلسة Express محفوظة في Cookie، والمتصفح يمنع
إرسالها عبر النطاقين ما لم تُضبط هذه العناصر معاً.

**How to apply:** عند تغيير رابط خدمة Render أو نطاق Vercel، حدّث رابط rewrite
في إعدادات الواجهة وقيمة `FRONTEND_URL` في Backend معاً، ثم أعد النشر.

عند النشر خارج Replit، قد يحتوي `package-lock.json` المولّد داخل Replit على
روابط تنزيل داخلية لا تعمل على Render. تشغيل `npm install --package-lock-only`
على lockfile موجود لا يبدّل هذه الروابط تلقائياً. لإزالتها مع إبقاء
الإصدارات المقفلة، استخدم:
`npm install --package-lock-only --ignore-scripts --registry=https://registry.npmjs.org/ --omit-lockfile-registry-resolved=true`
مع ضبط `.npmrc` على سجل npm العام.

**Why:** Render يتبع روابط `resolved` المحفوظة قبل الرجوع إلى registry؛ وعند
حذفها، يختار npm الحزم من السجل العام من دون تغيير نسخ القفل.

**How to apply:** افحص القفل بحثاً عن `package-firewall.replit.internal`، ثم
اختبر `npm install` من مجلد نظيف قبل النشر.

لا تسمح بكل نطاقات `*.vercel.app` في فحص Origin؛ اسمح بعنوان الإنتاج ومعاينات
المشروع التابعة لفريقه فقط، ثم أعد نشر Backend Render بعد التعديل.

**Why:** السماح الشامل قد يتيح لمواقع Vercel غير المرتبطة إرسال طلبات موثقة
عبر Cookie؛ كما أن نشر الواجهة وحده لا يغيّر سياسة CORS لدى Backend.

**How to apply:** اربط معاينات Vercel بنمط اسم المشروع والفريق المحدد في
`server.js`، واطلب من Render نشر التغيير قبل اختبار تسجيل الدخول مجدداً.