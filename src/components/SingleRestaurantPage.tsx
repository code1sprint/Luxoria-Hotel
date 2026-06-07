/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { DINING_OUTLETS, DiningOutlet } from "./RestaurantListPage";
import { hotelMenuItems } from "../data/hotelData";
import { MenuItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Clock, 
  MapPin, 
  Sparkles, 
  ChevronLeft, 
  Compass, 
  Star, 
  Utensils, 
  Calendar,
  Users,
  CheckCircle2,
  PhoneCall
} from "lucide-react";

interface SingleRestaurantPageProps {
  outletId: string;
  onBackToList: () => void;
  onBackToHome: () => void;
}

export default function SingleRestaurantPage({ outletId, onBackToList, onBackToHome }: SingleRestaurantPageProps) {
  const [reserveSuccess, setReserveSuccess] = useState(false);
  const [selectedTable, setSelectedTable] = useState("vip");
  const [selectedHour, setSelectedHour] = useState("20:30");
  const [guestCount, setGuestCount] = useState(2);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const outlet = DINING_OUTLETS.find(o => o.id === outletId) || DINING_OUTLETS[0];

  const matchedDishes = hotelMenuItems.filter(item => 
    outlet.featuredDishes.some(fd => fd.includes(item.name) || item.name.includes(fd))
  );

  const tableTypes = [
    { id: "vip", name: "شاه‌نشین VIP (مجهز به عودنوازی زنده و حریم خصوصی)", extraInfo: "مبلغ رزرو ۱,۰۰۰,۰۰۰ ریال مابه‌التفاوت" },
    { id: "overwater", name: "میز معلق روی آب (بر فراز استخر اینفینیتی خلیج)", extraInfo: "دارای دید مستقیم غروب آفتاب" },
    { id: "terrace", name: "بالکن خنک شیشه‌ای (نمای پانورامای اسکله)", extraInfo: "محبوب زوج‌های جوان" }
  ];

  const hoursSelections = ["13:00", "14:30", "19:00", "20:30", "22:00"];

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      alert("لطفاً نام و تلفن تماس پذیرش را وارد فرمایید.");
      return;
    }
    setReserveSuccess(true);
  };

  return (
    <div className="bg-[#121110] text-stone-100 min-h-screen text-right font-sans pt-24 pb-16" dir="rtl">
      
      {/* Cinematic Cover Banner */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        <img 
          src={outlet.image} 
          alt={outlet.name}
          className="w-full h-full object-cover filter brightness-50 contrast-95"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-black/35 to-black/50" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 space-y-2">
            <span className="text-[10px] text-[#C5A880] font-extrabold tracking-widest bg-[#C5A880]/10 px-3 py-1 rounded-full border border-[#C5A880]/20 uppercase inline-block font-sans">
              {outlet.cuisine}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif-title font-black text-white">{outlet.name}</h1>
            <p className="text-stone-300 text-xs sm:text-sm font-semibold max-w-3xl leading-relaxed">
              {outlet.tagline} • بالاترین ارجاع کیفی در نظرسنجی‌های لوکسوریا
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Navigation Breadcrumbs Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6 mb-8 text-xs text-stone-400 font-bold font-sans">
          <div className="flex items-center gap-2 font-sans">
            <button onClick={onBackToHome} className="hover:text-[#4A5D4E] cursor-pointer">صفحه نخست</button>
            <span>/</span>
            <button onClick={onBackToList} className="hover:text-[#4A5D4E] cursor-pointer">رستوران‌ها</button>
            <span>/</span>
            <span className="text-[#C5A880]">{outlet.name}</span>
          </div>

          <button 
            onClick={onBackToList} 
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-stone-200 transition cursor-pointer"
          >
            <ArrowRight size={14} />
            <span>بازگشت به عمارت غذا</span>
          </button>
        </div>

        {/* Contents grid split screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Right Column content (7/12 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Overview Card */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 space-y-4">
              <span className="text-[#C5A880] font-bold text-xs flex items-center gap-1.5">
                <Utensils size={14} />
                <span>فضای غذاخوری و داستان طراحی</span>
              </span>
              <p className="text-xs text-stone-300 leading-relaxed font-semibold">
                {outlet.description}
              </p>
              <p className="text-xs text-stone-400 leading-relaxed font-semibold">
                تمامی غذاها در این تالار سلطنتی با استفاده از مواد ارگانیک، سبزیجات محلی دست‌چین و با بالاترین استانداردهای بهداشتی خاورمیانه تدارک دیده می‌شوند. موسیقی زنده کلاسیک بومی یا پیانو نوازی آرامش‌بخش اتمسفر این لژ را به منتهی‌الیه شکوه می‌رساند.
              </p>
            </div>

            {/* Signature menu items in this outlet */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5 text-[#C5A880] pr-1">
                <Sparkles size={16} />
                <span>برخی از غذاهای شاخص این تالار</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedDishes.map(dish => (
                  <div key={dish.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex gap-4 hover:border-white/15 transition-all">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-16 h-16 object-cover rounded-lg shrink-0 bg-stone-900"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-right space-y-1">
                      <h4 className="text-xs font-bold text-white">{dish.name}</h4>
                      <p className="text-[10px] text-stone-400 line-clamp-2 leading-relaxed font-semibold h-[28px]">{dish.description}</p>
                      <span className="text-[11px] font-serif font-black text-[#C5A880] block font-sans">{(dish.price).toLocaleString("fa-IR")} ریال</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Chef profile */}
            <div className="bg-[#4A5D4E]/5 border border-[#4A5D4E]/10 rounded-[2rem] p-5 flex flex-col sm:flex-row items-center gap-5">
              <div className="w-16 h-16 bg-[#121110] rounded-full overflow-hidden border-2 border-[#4A5D4E] shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80" 
                  alt="Executive Chef" 
                  className="w-full h-full object-cover filter brightness-95"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-center sm:text-right space-y-1 flex-1">
                <h4 className="text-xs font-bold text-white flex justify-center sm:justify-start items-center gap-1.5">
                  <span>سرآشپز ارشد: شف بنجامین نیکولاس</span>
                  <span className="text-[9px] bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/20 px-2 py-0.5 rounded-full font-sans">میشلن ۲ ستاره</span>
                </h4>
                <p className="text-[10.5px] text-stone-300 leading-relaxed font-semibold">
                  بیش از ۱۵ سال سابقه طبخ غذاهای مدرن فیوژن در مجلل‌ترین هتل‌های ۵ ستاره فرانسه و خاورمیانه، ناظر مستقیم بر طعم و چیدمان تک‌تک بشقاب‌ها.
                </p>
              </div>
            </div>

          </div>

          {/* Left Column content: Booking Table slot form (5/12 cols) */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 space-y-6 backdrop-blur-md shadow-2xl relative">
            
            <span className="flex items-center gap-2 text-rose-400 text-[10px] font-black tracking-wider uppercase border-b border-white/10 pb-3">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>پذیرش رزرو رسمی آنلاین لژ شاه‌نشین</span>
            </span>

            {reserveSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/15 border border-emerald-500/20 rounded-3xl p-6 text-center space-y-4"
              >
                <CheckCircle2 size={36} className="text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-sm font-bold text-white">میز ویژه شما با موفقیت رزرو گردید!</h3>
                <p className="text-[10.5px] text-stone-300 leading-relaxed font-semibold">
                  جناب آقا/خانم <strong className="text-stone-100">{contactName}</strong>، کد پیگیری موقت و تاییدیه پیامکی رزرو برای شماره تلفن وارد شده ارسال گردید. سرآشپز منتظر میزبانی گرم از شماست.
                </p>
                <div className="text-[10px] text-stone-400/80 leading-relaxed text-right border-t border-white/5 pt-3 space-y-1 font-semibold">
                  <div>* تالار مرجع: {outlet.name}</div>
                  <div>* موقعیت میز: {tableTypes.find(t => t.id === selectedTable)?.name.split("(")[0]}</div>
                  <div>* ساعت رزرو: {selectedHour} شامگاهی امروز</div>
                </div>
                <button
                  type="button"
                  onClick={() => setReserveSuccess(false)}
                  className="w-full py-2.5 bg-[#4A5D4E] hover:bg-[#3B4C3F] text-white font-black rounded-xl text-[10.5px] cursor-pointer"
                >
                  انجام رزرو دیگر
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-4 text-right">
                
                {/* Field 1: Table choice selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-300">موقعیت استقرار میز شما:</label>
                  <div className="space-y-2">
                    {tableTypes.map(t => {
                      const active = selectedTable === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedTable(t.id)}
                          className={`w-full flex items-start text-right p-3.5 rounded-2xl border transition text-xs font-bold cursor-pointer ${
                            active 
                              ? "bg-[#4A5D4E]/10 border-[#4A5D4E]" 
                              : "bg-white/5 border-white/5 hover:bg-white/10"
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded mt-0.5 shrink-0 border flex items-center justify-center ${
                            active ? "bg-[#4A5D4E] border-[#4A5D4E] text-white" : "border-stone-500"
                          }`}>
                            {active && <CheckCircle2 size={10} className="stroke-[3]" />}
                          </span>
                          <span className="mr-2">
                            <span className="block text-white font-bold">{t.name}</span>
                            <span className="block text-[9px] text-stone-400 mt-0.5">{t.extraInfo}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 2: Hour choice selection */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-stone-300">ساعت حضور شما:</label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {hoursSelections.map(h => {
                      const active = selectedHour === h;
                      return (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setSelectedHour(h)}
                          className={`py-2 text-[10.5px] font-black rounded-lg text-center border cursor-pointer transition ${
                            active 
                              ? "bg-[#4A5D4E] border-[#4A5D4E] text-white font-extrabold" 
                              : "bg-white/5 border-white/5 text-stone-300 hover:bg-white/10"
                          }`}
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 3: Guest count count */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-stone-300">تعداد مسافر بزرگسالان:</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-[#1C1B19] border border-white/10 rounded-xl p-2.5 text-xs text-stone-200 outline-none focus:border-[#4A5D4E] cursor-pointer text-right font-semibold"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(num => (
                      <option key={num} value={num} className="bg-[#1C1B19] text-stone-100 font-semibold">
                        {num.toLocaleString("fa-IR")} همراه تراز بالا
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field 4: Name input */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-stone-300">نام و نام خانوادگی رزرو کننده:</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    placeholder="جناب آقای / سرکار خانم شایسته"
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-stone-500 outline-none focus:border-[#4A5D4E] text-right font-medium"
                  />
                </div>

                {/* Field 5: Phone input */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-stone-300">تلفن تماس مستقیم جهت تایید نهایی:</label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: ۰۹۱۲۰۰۰۰۰۰۰"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-stone-500 outline-none focus:border-[#4A5D4E] text-left font-serif"
                    dir="ltr"
                  />
                </div>

                {/* Confirm reserve table button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#4A5D4E] hover:bg-[#3B4C3F] text-white font-black rounded-2xl text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-lg pt-4"
                  id="restaurant-reserve-submit"
                >
                  <Calendar size={15} />
                  <span>تأیید و صدور بیلت رزرو با رمز موقت</span>
                </button>

                <p className="text-[9.5px] text-stone-400 leading-relaxed font-semibold">
                  * کاتالوگ ترجیحی غذا به صورت دیجیتال در زمان لایو در تالار قابل دریافت خواهد بود. رزرو شما تا ۲۵ دقیقه بعد از زمان توافق شده اعتبار دارد.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
