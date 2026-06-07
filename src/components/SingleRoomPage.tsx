/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Room } from "../types";
import { hotelRooms, hotelReviews } from "../data/hotelData";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  MapPin, 
  Users, 
  Maximize2, 
  Sparkles, 
  DollarSign, 
  CheckCircle2, 
  Gift, 
  ShieldCheck, 
  CalendarRange, 
  HelpCircle,
  Quote,
  Clock,
  BedDouble,
  Compass
} from "lucide-react";

interface SingleRoomPageProps {
  roomId: string;
  onBookRoom: (room: Room) => void;
  onBackToList: () => void;
  onBackToHome: () => void;
}

export default function SingleRoomPage({ roomId, onBookRoom, onBackToList, onBackToHome }: SingleRoomPageProps) {
  const [selectedExtraServices, setSelectedExtraServices] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "amenities" | "services" | "reviews">("overview");

  const room = hotelRooms.find(r => r.id === roomId) || hotelRooms[0];

  const toggleExtraService = (item: string) => {
    setSelectedExtraServices(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const getExtraPrice = () => {
    let price = room.price;
    if (selectedExtraServices.includes("chef")) price += 3500000;
    if (selectedExtraServices.includes("transfer")) price += 2000000;
    if (selectedExtraServices.includes("massage")) price += 2500000;
    return price;
  };

  // Filter reviews for this specific room
  const matchedReviews = hotelReviews.filter(rev => 
    rev.roomType && (rev.roomType === room.title || room.title.includes(rev.roomType) || rev.roomType.includes(room.title))
  );

  const extraServices = [
    { id: "chef", label: "سرآشپز اختصاصی و منوی VIP غذایی در عمارات", price: 3500000, description: "طبخ نهار یا شام به سلیقه فرستادگان با مواد غذایی ارگانیک توسط سرآشپز ارشد" },
    { id: "transfer", label: "سرویس ترانسفر ویژه ب‌ام‌و سری ۷ اختصاصی", price: 2000000, description: "استقبال مستقیم در رمپ فرودگاه با پذیرایی نوشیدنی سرد و اسکورت چمدان" },
    { id: "massage", label: "ماساژ تمام‌ارگانیک و ریلکسیشن اختصاصی در سوئیت", price: 2500000, description: "۹۰ دقیقه ماساژ سوئدی/سنگ‌داغ همراه با اسانس گل سرخ و موزیک درمانی" }
  ];

  return (
    <div className="bg-[#121110] text-stone-100 min-h-screen text-right font-sans pt-24 pb-16" dir="rtl">
      
      {/* Absolute Full Width Parallax/Hero Block */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden">
        <img 
          src={room.image} 
          alt={room.title}
          className="w-full h-full object-cover filter brightness-[0.55]"
          referrerPolicy="no-referrer"
        />
        
        {/* Elegant top shadow & bottom gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-black/35 to-[#121110]/50" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
            
            {/* Tag Badging */}
            <div className="inline-flex items-center gap-2 bg-[#4A5D4E]/10 border border-[#4A5D4E]/20 px-4 py-1.5 rounded-full text-[10px] font-black text-[#C5A880] uppercase tracking-wider backdrop-blur-md mb-4">
              <Sparkles size={11} className="text-[#C5A880] shrink-0" />
              <span>مورد تایید کلوپ سلطنتی لوکسوریا</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-title font-black text-white leading-tight">
              {room.title}
            </h1>
            
            <p className="text-stone-300 text-xs sm:text-sm max-w-3xl leading-relaxed mt-3 font-semibold">
              تلفیق کمال طراحی مینی‌مالیستی با تجهیزات مدرن بومی و با دید همه‌جانبه‌ی {room.view}.
            </p>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Navigation Breadcrumbs / Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6 mb-8 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <button onClick={onBackToHome} className="hover:text-[#4A5D4E] cursor-pointer">صفحه نخست</button>
            <span>/</span>
            <button onClick={onBackToList} className="hover:text-[#4A5D4E] cursor-pointer">لیست اتاق‌ها</button>
            <span>/</span>
            <span className="text-[#C5A880]">{room.title}</span>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={onBackToList} 
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-stone-200 transition cursor-pointer font-bold"
            >
              <ArrowRight size={14} />
              <span>بازگشت به لیست سوئیت‌ها</span>
            </button>
          </div>
        </div>

        {/* Grid Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Right Column content (8/12 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Visual Specs Indicators */}
            <div className="grid grid-cols-3 gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="p-3 border-l border-white/10 space-y-1">
                <Users size={18} className="text-[#4A5D4E] mx-auto" />
                <span className="text-[10px] text-stone-400 block font-bold">حداکثر ظرفیت رسمی</span>
                <span className="text-xs font-black text-white">{room.capacity.toLocaleString("fa-IR")} مسافر عالی‌رتبه</span>
              </div>
              <div className="p-3 border-l border-white/10 space-y-1">
                <Maximize2 size={18} className="text-[#4A5D4E] mx-auto" />
                <span className="text-[10px] text-stone-400 block font-bold">بنای مفید سوئیت</span>
                <span className="text-xs font-black text-white font-serif">{room.size.toLocaleString("fa-IR")} مترمربع</span>
              </div>
              <div className="p-3 space-y-1">
                <Compass size={18} className="text-[#4A5D4E] mx-auto" />
                <span className="text-[10px] text-stone-400 block font-bold">چشم‌انداز پانورامیک</span>
                <span className="text-xs font-black text-white">{room.view}</span>
              </div>
            </div>

            {/* Sticky/Tabs Bar for Details navigation */}
            <div className="flex border-b border-white/10 gap-3 text-xs font-bold font-sans">
              {[
                { id: "overview", label: "توضیحات و شکوه کمال" },
                { id: "amenities", label: "امکانات لوکس سوئیت" },
                { id: "services", label: "پکیج‌های خدماتی ویژه" },
                { id: "reviews", label: `نظرات مهمانان مقیم (${matchedReviews.length.toLocaleString("fa-IR")})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 transition relative cursor-pointer ${
                    activeTab === tab.id ? "text-[#C5A880]" : "text-stone-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="roomTabActive" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A5D4E]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content renderer */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 min-h-[250px] leading-relaxed">
              
              {activeTab === "overview" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5 text-[#C5A880]">
                    <BedDouble size={16} />
                    <span>آسایش و آرامش اصیل عمارتی</span>
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-semibold">
                    {room.description}
                  </p>
                  <p className="text-xs text-stone-300 leading-relaxed font-semibold">
                    تمامی عمارات لوکسوریا مجهز به تخت‌خواب سایز کینگ‌سایز با ملافه‌های نفیس ۱۰۰٪ کتان ارگانیک، حمام‌های سنگ مرمر یکپارچه، سیستم روشنایی و تهویه صوتی دوتایی و اینترنت پرسرعت ۱۰۰ مگابیتی فیبر نوری اختصاصی هستند.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 items-center">
                      <div className="p-2 bg-emerald-500/10 text-emerald-300 rounded-xl">
                        <Gift size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">منوی بالش انحصاری</h4>
                        <p className="text-[10px] text-stone-400">امکان انتخاب از میان ۶ نوع بالش ارگانیک، پر و مموری‌فوم</p>
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 items-center">
                      <div className="p-2 bg-[#4A5D4E]/10 text-[#C5A880] rounded-xl">
                        <ShieldCheck size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">امنیت دیپلماتیک دائم</h4>
                        <p className="text-[10px] text-stone-400">تجهیزات صندوق امانات نظامی و قفل‌های هوشمند بیومتریک</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "amenities" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h3 className="text-base font-bold text-white mb-4">امکانات اختصاصی داخل واحد</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {room.amenities.length > 0 ? (
                      room.amenities.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 bg-[#1C1B19] border border-white/5 p-3 rounded-xl">
                          <CheckCircle2 size={13} className="text-[#4A5D4E] shrink-0" />
                          <span className="text-xs text-stone-200 font-bold">{item}</span>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-stone-400 text-xs">
                        در حال حاضر تمام امکانات پایه‌ای از قبیل قهوه‌ساز هوشمند، تلویزیون ۵۵ اینچی و مینی‌بار مجهز در تمامی واحدها گنجانده شده است.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "services" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h3 className="text-base font-bold text-white mb-2">خدمات تجملاتی سفارشی (VIP Upgrade)</h3>
                  <p className="text-xs text-stone-400 leading-relaxed mb-4">
                    با انتخاب هر یک از پکیج‌های اختصاصی زیر، به کیفیت سفر و لذت آرامش اقامتی خود در تفرجگاه لوکسوریا بیفزایید:
                  </p>
                  
                  <div className="space-y-3">
                    {extraServices.map((serv) => {
                      const selected = selectedExtraServices.includes(serv.id);
                      return (
                        <button
                          key={serv.id}
                          onClick={() => toggleExtraService(serv.id)}
                          className={`w-full flex items-start gap-3 text-right p-4 rounded-2xl border transition cursor-pointer ${
                            selected 
                              ? "bg-[#4A5D4E]/10 border-[#4A5D4E]" 
                              : "bg-white/5 border-white/5 hover:bg-white/10"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded mt-0.5 shrink-0 border flex items-center justify-center ${
                            selected ? "bg-[#4A5D4E] border-[#4A5D4E] text-white" : "border-stone-500"
                          }`}>
                            {selected && <CheckCircle2 size={12} className="stroke-[3]" />}
                          </span>
                          <div className="flex-1">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-white">{serv.label}</span>
                              <span className="font-serif text-[#C5A880] font-bold">+{serv.price.toLocaleString("fa-IR")} ریال</span>
                            </div>
                            <p className="text-[10px] text-stone-400 mt-1 leading-snug">{serv.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h3 className="text-base font-bold text-white mb-2">ثبت دیدگاه مهمانان ویژه ملوکانه</h3>
                  
                  {matchedReviews.length === 0 ? (
                    <div className="text-stone-400 text-xs py-8 text-center bg-white/5 rounded-2xl border border-white/10">
                      درحال حاضر نقد و بررسی مستقلی برای این واحد اقامتی به شکل مستقل ثبت نگردیده است.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {matchedReviews.map((rev) => (
                        <div key={rev.id} className="bg-[#1C1B19] border border-white/10 rounded-2xl p-4 relative space-y-2">
                          <Quote className="absolute top-4 left-4 text-white/5 shrink-0" size={32} />
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-[#C5A880]">{rev.author}</span>
                            <span className="text-[10px] text-stone-400">{rev.date}</span>
                          </div>
                          <p className="text-[10.5px] text-stone-300 leading-relaxed font-semibold">
                            {rev.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

            </div>

          </div>

          {/* Left Column Content - Inline Checkout Box Cards (4/12 cols) */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-[2rem] p-6 space-y-6 backdrop-blur-md h-fit shadow-2xl">
            
            <div className="space-y-1">
              <span className="text-[10px] text-stone-400 block font-bold">هزینه حدودی اقامت شب اول:</span>
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-serif text-[#C5A880] font-extrabold">{getExtraPrice().toLocaleString("fa-IR")}</span>
                <span className="text-[10px] text-stone-400">ریال / هر شب</span>
              </div>
            </div>

            {/* Check list summary details */}
            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex justify-between text-xs text-stone-300">
                <span>تعرفه پایه سوئیت</span>
                <span className="font-serif">{room.price.toLocaleString("fa-IR")} ریال</span>
              </div>

              {selectedExtraServices.map(id => {
                const s = extraServices.find(srv => srv.id === id);
                if (!s) return null;
                return (
                  <div key={id} className="flex justify-between text-xs text-[#C5A880] font-semibold">
                    <span>{s.label.split("در")[0]}</span>
                    <span className="font-serif">+{s.price.toLocaleString("fa-IR")} ریال</span>
                  </div>
                );
              })}

              <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-2 text-[10px] text-stone-400 font-semibold leading-relaxed">
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <Clock size={11} className="text-[#4A5D4E]" />
                  <span>زمان‌های تردد استاندارد</span>
                </div>
                <div>چک‌این (ورود): ساعت ۱۴:۰۰ ظهر</div>
                <div>چک‌اوت (خلیه): ساعت ۱۲:۰۰ ظهر</div>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => onBookRoom(room)}
              className="w-full py-4 bg-[#4A5D4E] hover:bg-[#3B4C3F] text-white font-black rounded-2xl text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-95"
              id="single-room-book-now"
            >
              <CalendarRange size={16} />
              <span>رزرو قطعی عمارت عالیه</span>
            </button>

            {/* Security Guarantee badge */}
            <div className="flex gap-2 items-center text-[9.5px] text-[#4A5D4E]/80 border-t border-white/5 pt-4">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              <span className="font-bold text-stone-300 leading-snug">ضمانت رسمی استرداد و امنیت تراکنش‌های بانکی شتاب</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
