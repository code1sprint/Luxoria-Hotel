/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Room } from "../types";
import { hotelRooms } from "../data/hotelData";
import { motion, AnimatePresence } from "motion/react";
import { 
  SlidersHorizontal, 
  MapPin, 
  Users, 
  Maximize2, 
  Sparkles, 
  Eye, 
  ArrowLeftRight, 
  CheckCircle2, 
  ChevronLeft,
  DollarSign
} from "lucide-react";

interface RoomsListPageProps {
  onBookRoom: (room: Room) => void;
  onRoomSelect: (roomId: string) => void;
  onBackToHome: () => void;
}

export default function RoomsListPage({ onBookRoom, onRoomSelect, onBackToHome }: RoomsListPageProps) {
  const [selectedCapacity, setSelectedCapacity] = useState<number | "all">("all");
  const [maxPrice, setMaxPrice] = useState<number>(16000000);
  const [selectedView, setSelectedView] = useState<string>("all");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Collect all unique amenities for filtering
  const allAmenities = useMemo(() => {
    const list = new Set<string>();
    hotelRooms.forEach(r => r.amenities.forEach(a => list.add(a)));
    return Array.from(list);
  }, []);

  // Filter logic
  const filteredRooms = useMemo(() => {
    return hotelRooms.filter(room => {
      if (selectedCapacity !== "all" && room.capacity < (selectedCapacity as number)) {
        return false;
      }
      if (room.price > maxPrice) {
        return false;
      }
      if (selectedView !== "all" && !room.view.includes(selectedView)) {
        return false;
      }
      if (selectedAmenities.length > 0) {
        const hasAllSelected = selectedAmenities.every(amenity => 
          room.amenities.includes(amenity)
        );
        if (!hasAllSelected) return false;
      }
      return true;
    });
  }, [selectedCapacity, maxPrice, selectedView, selectedAmenities]);

  const toggleAmenity = (name: string) => {
    setSelectedAmenities(prev => 
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR") + " ریال";
  };

  return (
    <div className="py-24 bg-[#121110] text-stone-100 min-h-screen text-right font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation Back */}
        <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <button onClick={onBackToHome} className="hover:text-[#4A5D4E] transition cursor-pointer">صفحه نخست</button>
            <span>/</span>
            <span className="text-[#C5A880]">عمارت اقامتی و سوئیت‌ها</span>
          </div>
          <button 
            onClick={onBackToHome} 
            className="flex items-center gap-1.5 text-xs font-bold text-[#C5A880] hover:text-[#b49872] bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition cursor-pointer border border-white/10"
          >
            <span>بازگشت به صفحه اصلی</span>
            <ChevronLeft size={14} />
          </button>
        </div>

        {/* Header Title */}
        <div className="text-center mb-12">
          <p className="text-[#4A5D4E] text-xs font-black uppercase tracking-widest mb-2 font-serif">LUXORIA ACCOMMODATIONS</p>
          <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-white tracking-tight">واحدهای اقامتی شاهانه</h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            از اتاق‌های مجلل تا ویلاهای اختصاصی با حریم مطلق، هر واحد داستان منحصربه‌فرد خودش را تحت نظر کانسیرژ لول طلایی روایت می‌کند.
          </p>
        </div>

        {/* Dynamic Filter Layout Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Right Column Content - Filter sidebar (4/12 cols) */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-[2rem] p-6 space-y-6 backdrop-blur-md h-fit">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <span className="text-xs font-black text-[#C5A880] tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal size={14} />
                <span>تنظیمات و شخصی‌سازی نتایج</span>
              </span>
              <button 
                onClick={() => {
                  setSelectedCapacity("all");
                  setMaxPrice(16000000);
                  setSelectedView("all");
                  setSelectedAmenities([]);
                }}
                className="text-[10px] text-stone-400 hover:text-white transition underline cursor-pointer"
              >
                پاک کردن فیلترها
              </button>
            </div>

            {/* Filter 1: Capacity */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-white">حداقل ظرفیت مسافرین</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "همه", value: "all" },
                  { label: "۲ نفره", value: 2 },
                  { label: "۴ نفره", value: 4 },
                  { label: "+۶ نفر", value: 6 }
                ].map((item, idx) => {
                  const active = selectedCapacity === item.value;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedCapacity(item.value as any)}
                      className={`py-2 text-[10px] font-bold rounded-xl transition cursor-pointer text-center border ${
                        active 
                          ? "bg-[#4A5D4E] text-white border-[#4A5D4E] font-extrabold" 
                          : "bg-white/5 text-stone-300 border-white/5 hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter 2: Price range */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-white">بازه قیمت هر شب (ریال)</label>
                <span className="font-serif text-[11px] text-[#C5A880] font-bold">تا {maxPrice.toLocaleString("fa-IR")}</span>
              </div>
              <input 
                type="range"
                min={2000000}
                max={16000000}
                step={500000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#4A5D4E] bg-white/10 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-stone-500 font-bold">
                <span>۲,۰۰۰,۰۰۰ ریال</span>
                <span>۱۶,۰۰۰,۰۰۰ ریال</span>
              </div>
            </div>

            {/* Filter 3: Views */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-white">منظره پنجره و تراس</label>
              <select
                value={selectedView}
                onChange={(e) => setSelectedView(e.target.value)}
                className="w-full bg-[#1A1B1F] border border-white/10 rounded-xl p-2.5 text-xs text-stone-300 outline-none focus:border-[#4A5D4E] cursor-pointer font-semibold"
              >
                <option value="all">همه چشم‌اندازها</option>
                <option value="باغ">رو به باغ سرسبز عمارت</option>
                <option value="اقیانوس">رو به اقیانوس نیلگون و اسکله</option>
                <option value="ساحل اختصاصی">ساحل اختصاصی شنی بدون همسایه</option>
              </select>
            </div>

            {/* Filter 4: Amenities checkbox checklist */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-white">امکانات فوق‌برتر تخصصی</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {allAmenities.map((amenity, idx) => {
                  const checked = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleAmenity(amenity)}
                      className="w-full flex items-center gap-2.5 text-right p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition cursor-pointer text-[10.5px] font-semibold text-stone-300"
                    >
                      <span className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${
                        checked ? "bg-[#4A5D4E] border-[#4A5D4E] text-white" : "border-stone-500"
                      }`}>
                        {checked && <CheckCircle2 size={10} className="stroke-[3]" />}
                      </span>
                      <span>{amenity}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Left Column Content - Interactive Listing Cards Grid (8/12 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center text-xs text-stone-400 font-bold">
              <span>یافتن {filteredRooms.length.toLocaleString("fa-IR")} واحد مناسب با فیلتر شما</span>
              <span>قیمت‌ها بر اساس کف زمان لایسنسینگ</span>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredRooms.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center space-y-4"
                >
                  <Maximize2 size={36} className="text-stone-500 mx-auto animate-pulse" />
                  <h3 className="text-sm font-bold text-white">واحدی با مشخصات فوق پیدا نشد!</h3>
                  <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
                    با افزایش محدوده قیمت یا غیرفعال کردن برخی تجهیزات تخصصی، سایر عمارات و سوئیت‌ها را در فهرست جاری بررسی فرمایید.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCapacity("all");
                      setMaxPrice(16000000);
                      setSelectedView("all");
                      setSelectedAmenities([]);
                    }}
                    className="px-5 py-2.5 bg-[#4A5D4E] hover:bg-[#3B4C3F] text-white text-xs font-black rounded-xl transition cursor-pointer"
                  >
                    نمایش همه واحدهای مجلل
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredRooms.map((room) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      key={room.id}
                      className="bg-[#1C1B19] border border-white/15 rounded-3xl overflow-hidden shadow-xl hover:border-[#4A5D4E]/30 flex flex-col justify-between transition-all duration-300 group"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={room.image} 
                          alt={room.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B19] via-transparent to-black/35" />
                        
                        {/* Price Tag Overlay */}
                        <div className="absolute bottom-3 right-3 bg-[#121110]/95 border border-white/10 px-3 py-1.5 rounded-xl text-right">
                          <span className="text-[8px] text-stone-400 block">شروع قیمت هر شب:</span>
                          <span className="text-[11px] font-bold text-[#C5A880] font-serif leading-none">{formatPrice(room.price)}</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                           <div className="flex justify-between items-center">
                            <h3 className="text-base font-bold text-white group-hover:text-[#4A5D4E] transition">{room.title}</h3>
                            <span className="text-[9px] font-black text-[#C5A880] bg-[#C5A880]/10 px-2.5 py-1 rounded-full border border-[#C5A880]/20 flex items-center gap-1">
                              <Sparkles size={10} />
                              <span>ویژه ملوکانه</span>
                            </span>
                          </div>
                          
                          <p className="text-[10.5px] text-stone-400 leading-relaxed font-semibold line-clamp-2 h-8">
                            {room.description}
                          </p>
                        </div>

                        {/* Specs list */}
                        <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-[9.5px] text-stone-300 font-bold text-right">
                          <div className="flex items-center gap-1">
                            <Users size={11} className="text-[#4A5D4E]" />
                            <span>حدود {room.capacity.toLocaleString("fa-IR")} مهمان</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Maximize2 size={11} className="text-[#4A5D4E]" />
                            <span>{room.size.toLocaleString("fa-IR")} مترمربع</span>
                          </div>
                          <div className="flex items-center gap-1 col-span-1 overflow-hidden whitespace-nowrap text-ellipsis">
                            <MapPin size={11} className="text-[#4A5D4E] shrink-0" />
                            <span className="overflow-hidden text-ellipsis">{room.view}</span>
                          </div>
                        </div>

                        {/* Actions btn and view Single detail Page link */}
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={() => onRoomSelect(room.id)}
                            className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-[10px] font-bold transition cursor-pointer text-center flex items-center justify-center gap-1.5"
                          >
                            <Eye size={11} className="text-[#4A5D4E]" />
                            <span>بررسی سوئیت و جزئیات</span>
                          </button>
                          
                          <button
                            onClick={() => onBookRoom(room)}
                            className="px-4 py-2.5 bg-[#4A5D4E] hover:bg-[#3B4C3F] text-white font-black rounded-xl text-[10px] transition cursor-pointer"
                          >
                            رزرو سریع
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
