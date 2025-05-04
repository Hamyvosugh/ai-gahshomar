'use client';
import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Bookmark } from 'lucide-react';

const PersianCalendarBrand = () => {
  // Sample Persian months
  const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 
    'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 
    'دی', 'بهمن', 'اسفند'
  ];
  
  // Sample historical events
  const historicalEvents = [
    { day: 1, month: 'فروردین', title: 'نوروز', description: 'آغاز سال نو ایرانی' },
    { day: 13, month: 'فروردین', title: 'سیزده به در', description: 'روز طبیعت' },
    { day: 29, month: 'اردیبهشت', title: 'بزرگداشت فردوسی', description: 'روز پاسداشت زبان فارسی' }
  ];
  
  const [selectedMonth, setSelectedMonth] = useState(persianMonths[0]);
  
  return (
    <div dir="rtl" className="font-['IRANSans'] w-full bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-lg  mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="bg-purple-900 text-white p-3 rounded-xl rotate-3 transform hover:rotate-0 transition-all">
            <Calendar className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold mr-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-indigo-600">
            تقویم فرهنگی ایران
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all">
            <BookOpen className="h-5 w-5 text-purple-700" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all">
            <Bookmark className="h-5 w-5 text-purple-700" />
          </button>
        </div>
      </div>
      
      {/* Month Selector */}
      <div className="overflow-x-auto mb-6 pb-2">
        <div className="flex gap-3 min-w-max">
          {persianMonths.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedMonth === month 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
      
      {/* Featured Event Card */}
      <div className="bg-white rounded-xl p-5 shadow-lg mb-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-200 to-transparent rounded-bl-full opacity-70"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 text-purple-800 font-bold text-xl p-3 rounded-lg">
              ١
            </div>
            <h2 className="text-xl font-bold text-gray-800">نوروز</h2>
          </div>
          <p className="text-gray-600 mb-4">آغاز سال نو ایرانی و جشن باستانی ایرانیان</p>
          <div className="flex items-center text-purple-700 text-sm">
            <Clock className="h-4 w-4 ml-1" />
            <span>۱۳:۰۰ الی ۱۸:۰۰</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"></div>
      </div>
      
      {/* Event List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3">رویدادهای فرهنگی</h3>
        <div className="space-y-3">
          {historicalEvents.map((event, index) => (
            <div key={index} className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition-all cursor-pointer">
              <div className="bg-indigo-100 text-indigo-800 font-bold p-2 rounded-lg min-w-8 text-center">
                {event.day}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersianCalendarBrand;