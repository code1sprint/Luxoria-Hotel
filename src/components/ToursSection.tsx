/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { hotelTours } from "../data/hotelData";
import { TourItem } from "../types";
import { Clock, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ToursSection() {
  const [selectedTour, setSelectedTour] = useState<TourItem | null>(null);
  const [tourBookedId, setTourBookedId] = useState<string | null>(null);

  const formatPrice = (value: number) => {
    return value.toLocaleString("fa-IR") + " تومان";
  };

  const handleBookTour = (tourId: string) => {
    setTourBookedId(tourId);
    setTimeout(() => {
      setTourBookedId(null);
      alert("درخواست رزرو تور تفریحی با موفقیت به دپارتمان تشریفات کانسیرژ هتل ارسال شد. فاکتور مربوطه به صورت‌حساب دیجیتال اتاق الصاق خواهد گردید.");
    }, 1500);
  };

  return (
    <section id="tours" className="py-20 bg-transparent text-right text-stone-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="text-center mb-12">
          <p className="text-[#C5A880] text-xs font-black uppercase tracking-widest mb-2 font-serif">SENSATIONAL EXCURSIONS</p>
          <h2 className="text-3xl font-serif-title font-bold text-white">گشت سواحل و تورهای لوکسوریا</h2>
          <p className="text-xs text-stone-300 mt-2 max-w-xl mx-auto leading-relaxed font-medium">
            سفر رویایی شما با اقامت خاتمه نمی‌یابد. کانسیرژ اختصاصی هتل با ترانسفر خودروهای بی‌ام‌و و لندروور مجهزترین برنامه‌های آفرود نجومی و گشت کاتاماران را برای شما مهیا کرده است.
          </p>
        </div>

        {/* Grid cards content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hotelTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden bento-shadow flex flex-col sm:flex-row transition-all duration-300 hover:shadow-xl hover:border-[#C5A880]/30 text-right backdrop-blur-md"
              id={`tour-panel-${tour.id}`}
            >
              
              {/* Media layout (1/2 wide) */}
              <div className="w-full sm:w-5/12 min-h-[220px] relative">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover animate-fade-in"
                  referrerPolicy="no-referrer"
                />
                
                {/* Duration Badge */}
                <span className="absolute top-3 right-3 px-3 py-1 bg-[#1A1B1F]/90 border border-white/10 text-[9px] font-bold text-[#C5A880] rounded-full flex items-center gap-1 shadow-sm">
                  <Clock size={10} />
                  <span>{tour.duration}</span>
                </span>
              </div>

              {/* Specs layout (7/12 wide) */}
              <div className="w-full sm:w-7/12 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-[#C5A880] mb-2">
                    <Sparkles size={11} />
                    <span>آرامش و ماجراجویی ویژه مهمانان مقیم</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{tour.title}</h3>
                  <p className="text-[11px] text-stone-300 leading-relaxed mb-4 font-medium">
                    {tour.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    {tour.highlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] text-stone-200 font-medium">
                        <Check size={10} className="text-[#C5A880] shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-right">
                    <span className="text-[9px] text-stone-400 block mb-0.5">قیمت هر بلیط:</span>
                    <span className="text-xs sm:text-sm font-bold text-[#C5A880] font-serif">{formatPrice(tour.price)}</span>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleBookTour(tour.id)}
                      disabled={tourBookedId === tour.id}
                      className="px-3.5 py-2.5 bg-[#C5A880] hover:bg-[#b49872] disabled:bg-emerald-700 text-stone-950 font-bold rounded-xl text-[10px] sm:text-xs transition shadow cursor-pointer uppercase flex items-center gap-0.5"
                      id={`book-tour-btn-${tour.id}`}
                    >
                      {tourBookedId === tour.id ? "درخواست شد" : "رزرو آنلاین"}
                    </button>
                    <button
                      onClick={() => setSelectedTour(tour)}
                      className="px-3 py-2 border border-white/10 text-[10px] font-bold hover:bg-white/10 rounded-xl text-stone-300 transition cursor-pointer"
                      id={`open-tour-modal-${tour.id}`}
                    >
                      جزئیات
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Dynamic details modal helper */}
        <AnimatePresence>
          {selectedTour && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTour(null)}
                className="absolute inset-0 bg-[#2D2A26]/40 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg bg-white border border-[#2D2A26]/10 p-6 rounded-3xl shadow-2xl z-10 text-right text-[#2D2A26]"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-stone-100 mb-4 h-48">
                  <img
                    src={selectedTour.image}
                    alt={selectedTour.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 text-[10px] text-[#4A5D4E] rounded-full font-bold shadow-sm">
                    {selectedTour.duration}
                  </div>
                </div>

                <div className="mb-4 text-right">
                  <h3 className="text-base sm:text-lg font-bold text-[#2D2A26]">{selectedTour.title}</h3>
                  <p className="text-xs text-stone-500 mt-2 leading-relaxed font-semibold">
                    {selectedTour.description}
                  </p>
                </div>

                <div className="space-y-2 mb-6 text-right">
                  <span className="block text-xs font-black text-[#2D2A26] border-r-2 border-[#4A5D4E] pr-2 pb-1">برنامه‌های تفصیلی تفریحگاهی نهایی:</span>
                  {selectedTour.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-stone-600 font-medium">
                      <span className="w-1.5 h-1.5 bg-[#4A5D4E] rounded-full mt-1.5 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      const id = selectedTour.id;
                      setSelectedTour(null);
                      handleBookTour(id);
                    }}
                    className="px-6 py-3 bg-[#2D2A26] hover:bg-[#4A5D4E] text-white font-bold rounded-2xl text-xs transition cursor-pointer"
                  >
                    رزرو مسافر با قیمت {formatPrice(selectedTour.price)}
                  </button>
                  <button
                    onClick={() => setSelectedTour(null)}
                    className="px-5 py-3 bg-[#F5F2EE] text-stone-600 font-bold rounded-2xl text-xs hover:bg-[#E2DFD9] transition cursor-pointer"
                  >
                    انصراف
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
