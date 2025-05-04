export default function TestStylePage() {
    return (
      <div className="min-h-screen bg-(--color-ai-bg) text-(--color-ai-text) p-8 space-y-8">
        
        {/* عناوین */}
        <section>
          <h1 className="text-4xl font-bold">عنوان ۱ (h1)</h1>
          <h2 className="text-3xl font-bold">عنوان ۲ (h2)</h2>
          <h3 className="text-2xl font-bold">عنوان ۳ (h3)</h3>
          <h4 className="text-xl font-bold">عنوان ۴ (h4)</h4>
          <h5 className="text-lg font-bold">عنوان ۵ (h5)</h5>
          <h6 className="text-base font-bold">عنوان ۶ (h6)</h6>
        </section>
  
        {/* پاراگراف */}
        <section>
          <p className="text-base leading-relaxed">
            این یک متن نمونه برای تست رنگ متن، فاصله خطوط و ظاهر کلی تایپوگرافی است. این متن باید به خوبی خوانا باشد و با رنگی که تعریف شده نمایش داده شود.
          </p>
        </section>
  
        {/* دکمه‌ها */}
        <section className="space-x-4">
          <button className="px-4 py-2 bg-(--color-ai-primary) text-white rounded hover:bg-(--color-ai-primary-dark)">
            دکمه اصلی
          </button>
          <button className="px-4 py-2 bg-(--color-ai-secondary) text-white rounded hover:bg-(--color-ai-secondary-dark)">
            دکمه ثانویه
          </button>
          <button className="px-4 py-2 bg-(--color-ai-success) text-white rounded hover:bg-green-700">
            موفقیت
          </button>
          <button className="px-4 py-2 bg-(--color-ai-error) text-white rounded hover:bg-red-700">
            خطا
          </button>
        </section>
  
        {/* کارت */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-(--color-ai-card) p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">کارت نمونه ۱</h3>
            <p className="text-sm">
              این یک کارت ساده است که دارای پس‌زمینه کاستوم، گوشه‌های گرد و سایه می‌باشد.
            </p>
          </div>
          <div className="bg-(--color-ai-panel) p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">کارت نمونه ۲</h3>
            <p className="text-sm">
              این یک کارت دیگر برای تست رنگ‌های پس‌زمینه متفاوت است تا ببینیم ظاهر کلی چگونه خواهد بود.
            </p>
          </div>
        </section>
  
        {/* فیلد ورودی */}
        <section className="space-y-4">
          <label className="block">
            <span className="block mb-1">ورودی متن:</span>
            <input
              type="text"
              placeholder="متن خود را وارد کنید"
              className="w-full p-2 rounded border border-(--color-ai-border) bg-transparent text-(--color-ai-text) placeholder-gray-400 focus:outline-none focus:border-(--color-ai-primary)"
            />
          </label>
        </section>
  
        {/* آیکن / لودینگ */}
        <section className="flex space-x-4 items-center">
          <div className="w-12 h-12 rounded-full bg-(--color-ai-primary) animate-ai-pulse"></div>
          <div className="w-12 h-12 rounded-full bg-(--color-ai-secondary) animate-ai-float"></div>
          <div className="w-12 h-12 rounded-full bg-(--color-ai-accent) animate-ai-glow"></div>
        </section>
  
        {/* متن گرادیانت */}
        <section>
          <h2 className="text-3xl font-bold text-gradient bg-ai-gradient-vibrant">
            متن گرادیانت تستی
          </h2>
        </section>
  
      </div>
    );
  }