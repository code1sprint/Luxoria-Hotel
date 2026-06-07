/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Users, 
  Search, 
  ArrowDownCircle, 
  Sparkles, 
  Sun, 
  Wind, 
  Compass, 
  Anchor, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroProps {
  onSearch: (searchData: { checkIn: string; checkOut: string; guests: number }) => void;
}

const HERO_SCENES = [
  {
    id: 1,
    title: "آبی بی‌کران سواحل نقره‌ای مرجانی",
    tagline: "SENSATIONAL OCEAN FRONT PIER",
    description: "غروب آفتاب جادویی ساحل شمالی کیش را با نسیم دائم فیروزه‌ای و چشم‌انداز معلق خلیج همیشه فارس تجربه کنید.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1800&q=95",
    badge: "تفرجگاه معلق و اسکله تفریحی"
  },
  {
    id: 2,
    title: "عمارت‌های شاهانه و جلال امپریال",
    tagline: "ROYAL CHALETS & PENTHOUSES",
    description: "تلفیقی سنتی و مدرن از معماری اصیل، مبلمان دست‌ساز مطلا، لوسترهای کریستال و کانسیرژ اختصاصی ۲۴ ساعته.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=95",
    badge: "ویلاهای سلطنتی با استخر اختصاصی"
  },
  {
    id: 3,
    title: "کاتاماران و کلاب دریایی نوآورانه",
    tagline: "PRIVATE YACHTING & CATAMARAN CLUB",
    description: "گشت‌های مجلل اختصاصی در حاشیه سواحل نقره‌فام، همراه با طعم‌های دست‌ساز شف ستاره‌دار و اسکورت امنیتی کامل.",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1800&q=95",
    badge: "ماجراجویی ساحلی VIP"
  }
];

export default function Hero({ onSearch }: HeroProps) {
  const [activeScene, setActiveScene] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [liveTemp, setLiveTemp] = useState(28);

  // Small organic live climate variation to excite users
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTemp(prev => {
        const delta = Math.random() > 0.5 ? 0.5 : -0.5;
        const next = prev + delta;
        return next > 30 ? 29 : next < 26 ? 27 : next;
      });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleNextScene = () => {
    setActiveScene((prev) => (prev + 1) % HERO_SCENES.length);
  };

  const handlePrevScene = () => {
    setActiveScene((prev) => (prev - 1 + HERO_SCENES.length) % HERO_SCENES.length);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("لطفاً تاریخ ورود و خروج را مشخص فرمایید.");
      return;
    }
    onSearch({ checkIn, checkOut, guests });
  };

  return (
    <section
      id="home"
      className="relative min-h-[105vh] lg:min-h-[110vh] flex flex-col justify-between pt-24 pb-16 overflow-hidden text-right"
      dir="rtl"
    >
      {/* Background Cinematic Slide Overlay Container */}
      <div className="absolute inset-4 top-20 bottom-4 z-0 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-3xl bg-neutral-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={HERO_SCENES[activeScene].image}
              alt={HERO_SCENES[activeScene].title}
              className="w-full h-full object-cover filter brightness-[0.45] contrast-[0.95]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Abstract Light Flare */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/50" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none" />
      </div>

      {/* Main Grid Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Right Column: Dynamic Poetic Titles & Luxury Introductions (7/12 cols) */}
          <div className="lg:col-span-8 text-right space-y-6">
            
            {/* Live Indicator Glass Badge & Theme Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 px-4 py-2 rounded-full text-[10px] font-black text-amber-300 uppercase tracking-widest backdrop-blur-md"
              >
                <Sparkles size={11} className="text-amber-400 shrink-0" />
                <span>{HERO_SCENES[activeScene].badge}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-[9px] font-bold text-emerald-300 backdrop-blur-md"
              >
                <Shield size={10} className="shrink-0" />
                <span>حرمت شخصی و امنیت دیپلماتیک</span>
              </motion.div>
            </div>

            {/* Main Immersive Title Carousel */}
            <div className="space-y-2.5">
              <span className="block font-serif text-[10px] sm:text-xs lg:text-sm tracking-[0.2em] text-stone-300/80 font-bold uppercase">
                {HERO_SCENES[activeScene].tagline}
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-black text-white leading-[1.15] tracking-tight max-w-3xl">
                {HERO_SCENES[activeScene].title}
              </h1>

              <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed max-w-2xl font-semibold pt-2">
                {HERO_SCENES[activeScene].description}
              </p>
            </div>

            {/* Quick Micro-Amenities Tags */}
            <div className="flex flex-wrap items-center gap-4 text-[10px] text-stone-300 font-bold pt-1.5">
              <div className="flex items-center gap-1">
                <Sun size={12} className="text-amber-400" />
                <span>۲۸ درجه مطلقا آفتابی</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1">
                <Wind size={12} className="text-sky-300" />
                <span>نسیم خنک دریا (۸ گره)</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1">
                <Anchor size={12} className="text-emerald-400" />
                <span>اسکله کاتاماران ملل</span>
              </div>
            </div>

            {/* Carousel Interactive Dots Changer */}
            <div className="flex items-center gap-5 pt-4">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handlePrevScene}
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full flex items-center justify-center transition cursor-pointer active:scale-90"
                  id="hero-scene-prev"
                  title="اسلاید قبلی"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={handleNextScene}
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full flex items-center justify-center transition cursor-pointer active:scale-90"
                  id="hero-scene-next"
                  title="اسلاید بعدی"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>

              {/* Staggered progress indicators */}
              <div className="flex items-center gap-2">
                {HERO_SCENES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveScene(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeScene === idx ? "w-8 bg-[#4A5D4E]" : "w-1.5 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Left Column: Glassmorphic live statistics panel (4/12 cols) */}
          <div className="lg:col-span-4 bg-black/35 border border-white/15 backdrop-blur-lg rounded-3xl p-6 space-y-5 text-right relative shadow-2xl">
            
            {/* Live Counter Title */}
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-black text-rose-400 tracking-wider">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                <span>زنده - وضعیت اقلیم و اسکله</span>
              </span>
              <Compass className="text-amber-400 animate-spin-slow" size={14} />
            </div>

            {/* Climate Specs and Stats */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-300">دمای فیروزه‌ای آب خلیج</span>
                <span className="font-serif font-bold text-white text-sm">{liveTemp.toFixed(1).toLocaleString("fa-IR")}° C</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-300">ظرفیت امروز پلاژهای معلق</span>
                <span className="font-bold text-amber-300">۹۴٪ تکمیل – بسیار مطلوب</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-300">پذیرش ترانسفر مجلل فرودگاهی</span>
                <span className="text-emerald-400 font-bold">ب‌ام‌و سری ۷ فیکس فعال</span>
              </div>
            </div>

            {/* Immersive Mini Location Quote Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex gap-3 items-center">
              <div className="w-9 h-9 bg-amber-400/25 text-amber-300 rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={16} />
              </div>
              <div className="text-right">
                <h4 className="text-[10px] font-bold text-white">منطقه ساحلی شمالی کیش</h4>
                <p className="text-[9px] text-stone-300 mt-0.5 leading-snug">بلوار خلیج فارس، دسترسی مستقیم به آب‌های زلال خلیج</p>
              </div>
            </div>

            {/* Live status alert code */}
            <p className="text-[9.5px] text-stone-300/80 leading-relaxed font-semibold">
              * رزرواسیون قطعی به صورت کاملا آنلاین انجام می‌پذیرد. در حین رزرو، ترانسفر تشریفاتی ب‌ام‌و برای شما فعال خواهد شد.
            </p>

          </div>

        </div>

        {/* Dynamic Glassmorphic Luxury Search Booking bar (Placed bottom) */}
        <div className="mt-12 w-full max-w-5xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSearchSubmit}
            className="w-full bg-black/45 border border-white/20 p-3 sm:p-4 rounded-[2.5rem] shadow-2xl backdrop-blur-xl flex flex-col md:flex-row gap-3 items-stretch justify-between"
            id="hero-booking-search-bar"
          >
            {/* Check-In Field with gorgeous layout */}
            <div className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-right relative hover:border-[#4A5D4E]/20 hover:bg-white/10 transition">
              <span className="p-1 px-2 border-l border-white/10 text-stone-300 ml-3 shrink-0">
                <Calendar size={18} className="text-[#4A5D4E]" />
              </span>
              <div className="w-full">
                <label className="block text-[10px] text-stone-300 font-bold mb-0.5">تاریخ ورود به عمارت</label>
                <input
                  type="date"
                  required
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent border-0 outline-none text-white text-xs w-full font-black focus:ring-0 text-right pr-0 cursor-pointer"
                  id="hero-check-in"
                />
              </div>
            </div>

            {/* Check-Out Field */}
            <div className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-right relative hover:border-[#4A5D4E]/20 hover:bg-white/10 transition">
              <span className="p-1 px-2 border-l border-white/10 text-stone-300 ml-3 shrink-0">
                <Calendar size={18} className="text-[#4A5D4E]" />
              </span>
              <div className="w-full">
                <label className="block text-[10px] text-stone-300 font-bold mb-0.5">تاریخ خروج و تخلیه</label>
                <input
                  type="date"
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent border-0 outline-none text-white text-xs w-full font-black focus:ring-0 text-right pr-0 cursor-pointer"
                  id="hero-check-out"
                />
              </div>
            </div>

            {/* Guest Count Field */}
            <div className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-right relative hover:border-[#4A5D4E]/20 hover:bg-white/10 transition">
              <span className="p-1 px-2 border-l border-white/10 text-stone-300 ml-3 shrink-0">
                <Users size={18} className="text-[#4A5D4E]" />
              </span>
              <div className="w-full">
                <label className="block text-[10px] text-stone-300 font-bold mb-0.5">تعداد بزرگسالان و همراهان</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="bg-transparent border-0 outline-none text-white text-xs w-full font-black focus:ring-0 text-right pr-0 cursor-pointer"
                  id="hero-guests"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num} className="bg-[#121110] text-stone-100 font-bold">
                      {num.toLocaleString("fa-IR")} مسافر عالی رتبه
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Majestic Search Submit button */}
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#4A5D4E] hover:bg-[#3B4C3F] text-white text-xs font-black rounded-2xl flex items-center justify-center gap-2 transition active:scale-95 shadow-md cursor-pointer shrink-0 font-sans"
              id="hero-search-submit-btn"
            >
              <Search size={16} />
              <span>جستجو واحدهای اقامتی</span>
            </button>
          </motion.form>
        </div>

      </div>

      {/* Decorative Elegant Scroll down Arrow Area */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-1 text-[#2D2A26]/60 hover:text-[#2D2A26] cursor-pointer transition"
          onClick={() => document.getElementById("amenities")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-[9.5px] font-black tracking-widest uppercase mb-0.5">کشف عمارت لوکسوریا</span>
          <ArrowDownCircle size={17} className="text-[#4A5D4E]" />
        </motion.div>
      </div>

    </section>
  );
}
