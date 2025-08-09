import { FC } from "react";

const Home: FC = () => {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">خوش آمدید به صفحه اصلی</h1>
      <p className="text-gray-700 leading-relaxed bg-gray-50 p-8">
        این یک صفحهٔ سادهٔ خانگی است که به عنوان نقطه شروع اپلیکیشن شما عمل
        می‌کند. می‌توانید در اینجا معرفی کوتاهی از سامانه‌تان، لینک‌های مهم یا
        اخبار قرار دهید.
      </p>
    </main>
  );
};

export default Home;
