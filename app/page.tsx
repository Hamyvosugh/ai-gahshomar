import PersianCalendarBrand from '@/components/style/alternative01';
import PersianCalendarAI from '@/components/style/alternative02';
import PersianAndMiladi from '@/components/calendar/currentdate';


export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
     
      <div className="flex flex-col items-center justify-center">
     
        
        {/* استفاده از کامپوننت تاریخ فارسی */}
 
        <PersianAndMiladi />
        <PersianCalendarAI />
        <PersianCalendarBrand />
        <div className='mb-7'></div>

      </div>
    </main>
  );
}

