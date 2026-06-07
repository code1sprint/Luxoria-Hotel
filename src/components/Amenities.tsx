/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { hotelAmenities } from "../data/hotelData";
import { AmenityItem } from "../types";
import { Truck, BedDouble, Award, Droplet, UtensilsCrossed, Clock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Icon mapping helper
const getAmenityIcon = (iconName: string, active = false) => {
  const iconClass = `transition duration-300 ${active ? "text-white" : "text-[#4A5D4E] group-hover:text-white"}`;
  switch (iconName) {
    case "Truck":
      return <Truck size={24} className={iconClass} />;
    case "BedDouble":
      return <BedDouble size={24} className={iconClass} />;
    case "Award":
      return <Award size={24} className={iconClass} />;
    case "Droplet":
      return <Droplet size={24} className={iconClass} />;
    case "UtensilsCrossed":
      return <UtensilsCrossed size={24} className={iconClass} />;
    case "Clock":
      return <Clock size={24} className={iconClass} />;
    default:
      return <CheckCircle size={24} className={iconClass} />;
  }
};

export default function Amenities() {
  const [activeSpotlight, setActiveSpotlight] = useState<AmenityItem>(hotelAmenities[3]);
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityItem | null>(null);

  return (
    <section id="amenities" className="py-20 bg-transparent text-right" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sublime Section Title */}
        <div className="text-center mb-12">
          <p className="text-[#4A5D4E] text-xs font-black uppercase tracking-widest mb-2 font-serif">LUXURY AMENITIES</p>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#2D2A26] tracking-tight">امکانات ویژه و تفریحگاه ساحلی</h2>
          <p className="text-xs text-stone-500 mt-3 max-w-xl mx-auto leading-relaxed font-medium">
            ما در هتل لوکسوریا برترین خدمات صنعت مهمان‌نوازی و امکانات رفاهی درجه یک را با دکوراسیون و جانمایی غنی مدرن در هم آمیخته‌ایم. روی هر مورد کلیک کنید تا جزئیات تفصیلی آن نمایان شود.
          </p>
        </div>

        {/* Feature Bento Grid matching the exact icon row shown in the layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5" id="amenities-horizontal-bar">
          {hotelAmenities.map((amenity) => {
            const isSelected = activeSpotlight.id === amenity.id;
            return (
              <motion.div
                whileHover={{ y: -6, borderColor: "#4A5D4E" }}
                key={amenity.id}
                onClick={() => setActiveSpotlight(amenity)}
                className={`group cursor-pointer bg-white border rounded-3xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 bento-shadow hover:shadow-xl ${
                  isSelected 
                    ? "border-[#4A5D4E] bg-neutral-50/50 ring-2 ring-[#4A5D4E]/10" 
                    : "border-[#2D2A26]/10 hover:bg-neutral-50"
                }`}
                id={`amenity-card-${amenity.id}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                  isSelected 
                    ? "bg-[#4A5D4E] text-white" 
                    : "bg-[#4A5D4E]/10 group-hover:bg-[#4A5D4E] group-hover:text-white"
                }`}>
                  {getAmenityIcon(amenity.iconName, isSelected)}
                </div>
                <h4 className={`text-xs font-bold transition ${
                  isSelected ? "text-[#4A5D4E] font-black" : "text-[#2D2A26] group-hover:text-[#4A5D4E]"
                }`}>
                  {amenity.title}
                </h4>
              </motion.div>
            );
          })}
        </div>

        {/* On-Page Dynamic Showcase Panel that enriches the content level significantly */}
        <div className="mt-12 bg-white/65 border border-[#2D2A26]/10 rounded-[2.5rem] p-8 md:p-10 bento-shadow backdrop-blur-md relative overflow-hidden text-right">
          {/* Decorative background flare */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#4A5D4E]/5 rounded-full blur-3xl -translate-x-12 -translate-y-12 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Column 1: Feature Description & Badges (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#4A5D4E] text-white rounded-2xl flex items-center justify-center shadow-md">
                  {getAmenityIcon(activeSpotlight.iconName, true)}
                </div>
                <div>
                  <span className="text-[10px] text-[#4A5D4E] font-black uppercase tracking-wider block">ویژگی بارز برگزیده</span>
                  <h3 className="text-lg sm:text-xl font-serif-title font-bold text-[#2D2A26] mt-0.5">{activeSpotlight.title}</h3>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-semibold">
                {activeSpotlight.description} ما در هتل عمارت شاهانه و تفریحگاه ساحلی لوکسوریا با اتکا به کادر ممتاز مهمان‌نوازی خود، خدمات را به شیوه‌‌ای فراتر از کلیه استانداردها هماهنگ می‌سازیم. امنیت، حریم شخصی مطلق، و پرفورمنس عالی جز جدایی‌ناپذیر این امکانات نوین است.
              </p>

              {/* Action Buttons to trigger the classic modal experience */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setSelectedAmenity(activeSpotlight)}
                  className="px-4 py-2 bg-[#4A5D4E]/10 hover:bg-[#4A5D4E]/25 text-[#4A5D4E] font-bold rounded-xl text-[10px] transition cursor-pointer text-center"
                >
                  مشاهده کاتالوگ الکترونیک
                </button>
              </div>

              {/* Simulated Specs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-stone-50 border border-[#2D2A26]/5 rounded-2xl p-3 text-right">
                  <span className="text-[10px] text-stone-400 block mb-0.5">وضعیت کاربری</span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.55">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    <span>فعال و شبانه‌روزی</span>
                  </span>
                </div>
                <div className="bg-stone-50 border border-[#2D2A26]/5 rounded-2xl p-3 text-right">
                  <span className="text-[10px] text-stone-400 block mb-0.5">دقت کانی‌پردازی</span>
                  <span className="text-xs font-bold text-[#4A5D4E]">VIP تمام مهمانان مقیم</span>
                </div>
              </div>
            </div>

            {/* Column 2: Detailed Bullet Points (4 cols) */}
            <div className="lg:col-span-4 space-y-4 lg:border-r lg:border-[#2D2A26]/10 lg:pr-8">
              <h4 className="text-xs font-black text-[#2D2A26] border-r-2 border-[#4A5D4E] pr-2 uppercase tracking-wide">جزئیات اقدامات تفصیلی:</h4>
              <div className="space-y-3.5">
                {activeSpotlight.details.map((detail, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    key={index} 
                    className="flex items-start gap-2.5 text-xs text-stone-600 font-medium"
                  >
                    <span className="w-2 h-2 bg-[#4A5D4E] rounded-full mt-1.5 shrink-0 shadow-sm shadow-[#4A5D4E]/30" />
                    <span className="leading-relaxed">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Column 3: Interactive Request / Inquiry form (3 cols) */}
            <div className="lg:col-span-3 bg-stone-50 border border-[#2D2A26]/10 p-5 rounded-3xl space-y-4">
              <h4 className="text-xs font-black text-[#2D2A26]">هماهنگی و رزرواسیون سریع</h4>
              <p className="text-[10.5px] text-stone-500 leading-relaxed font-semibold">
                علاقه دارید از این خدمت تفصیلی استفاده کنید؟ شماره سوئیت یا اتاق خود را ثبت کنید تا در کوتاه‌ترین بازه، پذیرش با اتاق شما تماس برقرار کند.
              </p>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`درخواست استفاده از سرویس ${activeSpotlight.title} برای اتاق شما ثبت شد و مراتب هماهنگی با پذیرش کلید خورد.`);
                  const input = document.getElementById("amenities-room-input") as HTMLInputElement;
                  if (input) input.value = "";
                }}
                className="space-y-3 text-right"
              >
                <div>
                  <label className="block text-[10px] text-[#2D2A26]/60 mb-1 font-bold">شماره سوئیت یا اتاق شما</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: سوئیت رویال ۳۰۲"
                    className="w-full bg-white border border-[#2D2A26]/10 focus:border-[#4A5D4E] focus:ring-1 focus:ring-[#4A5D4E]/20 outline-none p-2.5 rounded-xl text-xs transition text-[#2D2A26] text-right font-medium placeholder:text-stone-300"
                    id="amenities-room-input"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#4A5D4E] hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition cursor-pointer shadow-sm text-center"
                >
                  ثبت درخواست سرویس
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Selected Amenity Info Modal / Overlay */}
        <AnimatePresence>
          {selectedAmenity && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedAmenity(null)}
                className="absolute inset-0 bg-[#2D2A26]/40 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-white border border-[#2D2A26]/10 p-6 rounded-3xl shadow-2xl overflow-hidden z-10 text-right text-[#2D2A26]"
              >
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-stone-200">
                  <div className="w-12 h-12 bg-[#4A5D4E]/10 rounded-2xl flex items-center justify-center text-[#4A5D4E]">
                    {getAmenityIcon(selectedAmenity.iconName, false)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#2D2A26]">{selectedAmenity.title}</h3>
                    <p className="text-[10px] text-[#4A5D4E] font-black uppercase">GOLDEN SPA & CONCIERGE</p>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-6 font-medium">
                  {selectedAmenity.description}
                </p>

                <div className="space-y-3 mb-6">
                  <span className="block text-xs font-black text-[#2D2A26] border-r-2 border-[#4A5D4E] pr-2 pb-1">اقدامات تفصیلی و مراجع پذیرایی:</span>
                  {selectedAmenity.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-stone-600 font-medium">
                      <span className="w-1.5 h-1.5 bg-[#4A5D4E] rounded-full mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      alert(`درخواست ویژه برای استفاده فعال بابت ${selectedAmenity.title} با کادر مهمان‌نوازی و کانسیرژ هماهنگ شد.`);
                      setSelectedAmenity(null);
                    }}
                    className="flex-1 py-3 bg-[#4A5D4E] hover:bg-emerald-800 text-white font-bold rounded-2xl text-xs transition cursor-pointer"
                  >
                    ارسال استعلام و هماهنگی ترجیحات
                  </button>
                  <button
                    onClick={() => setSelectedAmenity(null)}
                    className="px-5 py-3 bg-[#F5F2EE] hover:bg-stone-200 text-xs text-stone-600 rounded-2xl font-bold transition cursor-pointer"
                  >
                    بستن
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
