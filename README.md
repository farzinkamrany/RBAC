# 🛒 Role-Based Access Control (RBAC) Dashboard

یک داشبورد مدیریتی ماژولار با **React + TypeScript** که قابلیت کنترل دسترسی بر اساس نقش (Role-Based Access Control) دارد.  
کاربران بر اساس نقش خود (Admin یا User) به بخش‌های مختلف برنامه دسترسی دارند.  
امکانات شامل مدیریت کاربران، مدیریت محصولات، آپلود چندعکس با پیش‌نمایش و Single Product Page می‌باشد.

---

## 🚀 ویژگی‌ها

- **ورود بر اساس نقش (Admin/User)**
- **محافظت از مسیرها** با React Router v6 و `ProtectedRoute`
- **مدیریت کاربران** (فقط Admin)
- **مدیریت محصولات**
- **آپلود چند عکس با Preview**
- **نمایش عکس‌ها در سایز بزرگ با کلیک**
- **صفحه جزئیات محصول (Single Product Page)**
- **ویرایش محصولات فقط توسط Admin**
- **کنترل دسترسی دقیق بر اساس مجوزهای Role-Based Access Control (RBAC)**
- **State Management** با Zustand (`useAppStore`)
- **طراحی واکنش‌گرا** با Tailwind CSS

---

## 🛠 تکنولوژی‌ها

- **React 18**
- **TypeScript**
- **React Router v6**
- **Zustand** (State Management)
- **Tailwind CSS**

---

## 🏗 معماری پروژه

پروژه بر اساس ساختار ماژولار ساخته شده است. هر ماژول دارای:

- **کامپوننت‌ها** داخل پوشه‌ی `components`
- **مسیرها (Routes)** در فایل `routes.ts` با آرایه‌ای از `RouteObject`
- **مجوزها (Permissions)** در فایل `permissions.ts`
- **ثبت ماژول و مجوزها** در فایل `index.ts`

فایل مرکزی `core/moduleRegistry.ts` مسئول ثبت ماژول‌ها و مسیرهای آنهاست و به کمک `import.meta.glob` در `core/loadModules.ts` تمام ماژول‌ها به صورت خودکار بارگذاری می‌شوند.

---

## ⚙️ نحوه راه‌اندازی پروژه

1. کلون کردن پروژه و نصب وابستگی‌ها:

   ```bash
   git clone <repository-url>
   npm install
   npm run dev
   ```
