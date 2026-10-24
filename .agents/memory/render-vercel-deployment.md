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

عند النشر خارج Replit، يجب ألا تصل روابط `package-firewall.replit.local`
إلى Render؛ هذه الروابط تعمل داخل Replit فقط وتفشل على Render. إذا تعذر
إعادة توليد lockfile بروابط npm الرسمية، استخدم `npm install` من registry
العام في إعداد البناء بدل شحن lockfile المولّد داخل Replit.

**Why:** `npm ci` على Render يقرأ الروابط المحفوظة في lockfile مباشرة، حتى مع
تحديد registry عام في أمر البناء.

**How to apply:** بعد أي تثبيت حزم داخل Replit، افحص lockfile قبل النشر وابحث عن
`package-firewall.replit.local`؛ أعد توليده رسميًا أو احذفه واضبط Render على
`npm install --registry=https://registry.npmjs.org/`.

لا تسمح بكل نطاقات `*.vercel.app` في فحص Origin؛ اسمح بعنوان الإنتاج ومعاينات
المشروع التابعة لفريقه فقط، ثم أعد نشر Backend Render بعد التعديل.

**Why:** السماح الشامل قد يتيح لمواقع Vercel غير المرتبطة إرسال طلبات موثقة
عبر Cookie؛ كما أن نشر الواجهة وحده لا يغيّر سياسة CORS لدى Backend.

**How to apply:** اربط معاينات Vercel بنمط اسم المشروع والفريق المحدد في
`server.js`، واطلب من Render نشر التغيير قبل اختبار تسجيل الدخول مجدداً.