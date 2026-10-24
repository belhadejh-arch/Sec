---
name: Neon destructive backups
description: Safe backup and validation practices before destructive actions on the external production Neon database.
---

قبل أي حذف إنتاجي، تأكد أن إصدار `pg_dump` لا يقل عن إصدار خادم Neon. إذا تعذر ذلك، لا تتابع من دون نسخة بيانات متسقة وخاصة، والتحقق من أن بيانات القاعدة لم تتغير منذ أخذها؛ نفّذ الحذف في معاملة مع فحص الأدمن والنتائج قبل `COMMIT`.

**Why:** خادم الإنتاج قد يسبق إصدار أدوات PostgreSQL المحلية، و`pg_dump` الأقدم يرفض إنشاء النسخة.

**How to apply:** عند تنفيذ عمليات تنظيف أو حذف إنتاجية في هذا المشروع، تحقق من الاتصال والنسخة أولاً، ولا تثبت أي معاملة إذا اختلفت البيانات عن النسخة المحفوظة أو لم يبقَ الأدمن كما هو.
