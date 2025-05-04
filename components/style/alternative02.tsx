'use client';
import React, { useState } from 'react';
import { Brain, Calendar, ArrowRight, ArrowLeft, Search, Zap, Clock } from 'lucide-react';

const PersianCalendarAI = () => {
  // Sample Persian months
  const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 
    'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 
    'دی', 'بهمن', 'اسفند'
  ];
  
  // Sample events
  const events = [
    { id: 1, day: 1, month: 'فروردین', title: 'نوروز', description: 'آغاز سال نو ایرانی', category: 'فرهنگی' },
    { id: 2, day: 13, month: 'فروردین', title: 'سیزده به در', description: 'روز طبیعت', category: 'سنتی' },
    { id: 3, day: 29, month: 'اردیبهشت', title: 'بزرگداشت فردوسی', description: 'روز پاسداشت زبان فارسی', category: 'ادبی' }
  ];
  
  const [selectedMonth, setSelectedMonth] = useState(persianMonths[0]);
  const [searchActive, setSearchActive] = useState(false);
  const [glowEffect, setGlowEffect] = useState(false);
  
  // AI recommendation simulation
  const simulateAIThinking = () => {
    setGlowEffect(true);
    setTimeout(() => setGlowEffect(false), 1500);
  };
  
  return (
    <div dir="rtl" className="font-['IRANSans'] bg-black text-white p-6 rounded-2xl border border-cyan-500/20 max-w-4xl mx-auto relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 z-0"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10">
        {/* Header with AI branding */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className={`flex justify-center items-center h-10 w-10 bg-cyan-900/50 rounded-lg mr-3 ${glowEffect ? 'animate-pulse ring-2 ring-cyan-400' : ''}`}>
              <Brain className="h-6 w-6 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              تقویم هوشمند ایرانی
            </h1>
          </div>
          <div className="relative">
            {searchActive ? (
              <input 
                type="text" 
                className="bg-gray-900/70 border border-cyan-500/30 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:border-cyan-500 backdrop-blur-sm"
                placeholder="جستجو رویدادها..."
                autoFocus
                onBlur={() => setSearchActive(false)}
              />
            ) : (
              <button 
                onClick={() => setSearchActive(true)}
                className="p-2 bg-gray-900/70 rounded-full hover:bg-gray-800 transition-all border border-gray-700"
              >
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>
        
        {/* AI Assistant Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-gray-900/60 to-gray-800/60 rounded-xl border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="bg-cyan-900/40 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-1">پیشنهاد هوشمند</h3>
              <p className="text-white text-lg">مناسبت‌های مهم فرهنگی این ماه برای شما انتخاب شده‌اند</p>
              <button 
                onClick={simulateAIThinking}
                className="mt-3 text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center"
              >
                نمایش بیشتر
                <ArrowLeft className="h-4 w-4 mr-1" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Interactive Month Selector with Futuristic Design */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button className="bg-gray-800/70 hover:bg-gray-700/70 p-1 rounded">
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button className="bg-gray-800/70 hover:bg-gray-700/70 p-1 rounded">
              <ArrowLeft className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          
          <div className="flex justify-center py-2 px-10 overflow-hidden">
            {persianMonths.slice(0, 5).map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`px-4 py-1 mx-1 rounded-md transition-all ${
                  selectedMonth === month 
                    ? 'bg-gradient-to-r from-cyan-600/50 to-purple-600/50 text-white border border-cyan-500/30' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
        
        {/* Visualization Area */}
        <div className="mb-6 p-1 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
          <div className="bg-gray-900/80 backdrop-blur-md p-5 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">تقویم {selectedMonth}</h2>
              <div className="flex items-center text-xs text-gray-400">
                <Calendar className="h-4 w-4 ml-1" />
                <span>۱۴۰۴ هجری شمسی</span>
              </div>
            </div>
            
            {/* AI Calendar Visualization */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {Array.from({length: 7}, (_, i) => (
                <div key={i} className="text-center text-xs text-gray-500 mb-2">
                  {["ش", "ی", "د", "س", "چ", "پ", "ج"][i]}
                </div>
              ))}
              
              {Array.from({length: 35}, (_, i) => {
                const hasEvent = events.some(e => e.day === (i + 1) % 31);
                const isToday = i === 0;
                return (
                  <div 
                    key={i} 
                    className={`aspect-square flex flex-col justify-center items-center rounded text-sm cursor-pointer transition-all
                    ${isToday ? 'bg-cyan-900/50 text-cyan-300 border border-cyan-500/30' : hasEvent ? 'bg-gray-800/50 text-white' : 'bg-gray-800/20 text-gray-500 hover:bg-gray-800/40'}`}
                  >
                    {(i + 1) % 31 === 0 ? 31 : (i + 1) % 31}
                    {hasEvent && <span className="h-1 w-1 bg-cyan-400 rounded-full mt-1"></span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Event Cards with Futuristic Design */}
        <div className="space-y-3">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="p-4 bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all group backdrop-blur-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-800 p-2 rounded text-gray-400 group-hover:bg-cyan-900/40 group-hover:text-cyan-400 transition-all">
                    <span className="text-lg font-bold">{event.day}</span>
                  </div>
                  <div>
                    <div className="flex items-center text-xs text-cyan-400 mb-1">
                      <span className="px-2 py-0.5 bg-cyan-900/30 rounded-full">{event.category}</span>
                    </div>
                    <h4 className="font-medium text-white group-hover:text-cyan-300 transition-colors">{event.title}</h4>
                    <p className="text-sm text-gray-400">{event.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <Clock className="h-3 w-3 ml-1" />
                <span>رویداد روزانه</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* AI Interaction Floating Button */}
        <div className="fixed bottom-6 left-6 z-20">
          <button 
            onClick={simulateAIThinking}
            className={`p-3 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 shadow-lg hover:shadow-cyan-500/20 transition-all ${
              glowEffect ? 'animate-pulse ring-2 ring-cyan-400' : ''
            }`}
          >
            <Brain className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersianCalendarAI;