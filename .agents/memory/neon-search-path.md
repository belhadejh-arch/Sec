---
name: Neon search path
description: The production Neon connection can start with an empty PostgreSQL search_path.
---

اتصالات Neon في هذا المشروع قد تبدأ بـ`search_path` فارغ (`current_schema()` يساوي NULL)، رغم وجود جداول `public`. الاستعلامات غير المؤهلة عندها تفشل بخطأ مخطط غير صالح.

**Why:** فشل بدء المنصة عند إنشاء/قراءة إعدادات `public`، بينما الاستعلامات المؤهلة بـ`public` كانت تعمل.

**How to apply:** حافظ على تهيئة `SET search_path TO public` لكل اتصال جديد في مجمّع PostgreSQL، ولا تعتمد على إعداد افتراضي من رابط Neon.
