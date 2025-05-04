import PersianCalendar from '@/components/calendar/PersianCalendar';
import CalendarHero from '@/components/hero/CalendarHero';
import CalendarConverter from '@/components/convertor';


export default function Calendar() {
  
  return (
    <main className="p-4 min-h-screen bg-ai-bg">
     


      <div className="container mx-auto py-8">
        <CalendarHero />
        <PersianCalendar />
        <div className="container mx-auto py-8">
      <CalendarConverter />
    </div>
      </div>
    </main>
  );
}