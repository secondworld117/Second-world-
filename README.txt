# عالم ثاني 🌏 | Second World — 2027

موقع عربي/إنجليزي بتصميم مستوحى من الصورة المرفقة: خلفية سماوية مضيئة، موجات ذهبية/زرقاء، بطاقات زجاجية، معرض أعمال، خدمات، تواصل، وتسجيل دخول.

## الملفات
- index.html — الصفحة الرئيسية
- style.css — التصميم المتجاوب
- script.js — التفاعل + Firebase Authentication
- firebase-config.js — إعدادات Firebase (تُملأ منك)

## تفعيل تسجيل الدخول بحساب Google
1. افتح Firebase Console وأنشئ مشروعًا.
2. Authentication → Sign-in method → فعّل Google و Email/Password.
3. أضف Web App وانسخ إعدادات Firebase إلى `firebase-config.js`.
4. في Authentication → Settings → Authorized domains أضف النطاق الذي ستستضيف عليه الموقع.
5. استضف الموقع على HTTPS. لا تعتمد على فتح `index.html` مباشرة من مدير الملفات لتسجيل الدخول.
6. بعد النشر اختبر زر «تسجيل الدخول» ثم Google.

## بيانات الموقع
البريد: king.of.happiness.design@gmail.com
واتساب: https://wa.me/967773546637
Pinterest: https://pin.it/6uFYoGdKw

ملاحظة: ملف `firebase-config.js` لا يحتوي أسرار خادم؛ مع ذلك لا تضع فيه أي Service Account أو private key.
