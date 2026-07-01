# Sabai Careers — sabai.pink

صفحة توظيف ساباي (عربي / English / ไทย) — React + Vite.
معالِجات مساج تايلندي · راتب + سكن + طيران · ربط واتساب + Google Sheet.

## تشغيل محلي
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # ينتج dist/
```

## الإعدادات (Vercel → Settings → Environment Variables) — اختياري
- VITE_WA_NUMBER       رقم واتساب التوظيف
- VITE_LICENSE         رقم الترخيص
- VITE_SHEET_ENDPOINT  رابط Apps Script /exec لحفظ الطلبات
(القيم الافتراضية مضمّنة، فالموقع يشتغل بدونها.)

## النشر على GitHub + Vercel + الدومين
1. ارفع هذا المجلد إلى مستودع GitHub جديد.
2. Vercel → Add New → Project → استورد المستودع (Framework: Vite يُكتشف تلقائيًا).
3. Deploy.
4. Settings → Domains → أضِف sabai.pink و www.sabai.pink.
5. عند مزوّد DNS:
   - A     @   → 76.76.21.21
   - CNAME www → cname.vercel-dns.com
   (Cloudflare؟ اجعل الـ Proxy = OFF)
6. انتظر HTTPS → https://sabai.pink

> الصورة في public/hero.webp · أيقونة favicon.svg · ميتا SEO ثلاثية اللغة جاهزة.
