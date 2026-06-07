/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      alert("لطفاً فیلدهای اجباری (نام و پیام) را تکمیل فرمایید.");
      return;
    }
    alert("پیام ارزشمند شما بابت دبیرخانه با موفقیت واصل گردید. کادر تشریفاتی در کمتر از ۲ ساعت بر روی ایمیل یا شماره اتاق به شما پاسخ خواهند داد.");
    setName("");
    setSubject("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-20 bg-transparent text-right font-sans text-stone-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <p className="text-[#C5A880] text-xs font-black uppercase tracking-widest mb-2 font-serif">GET IN TOUCH WITH LUXORIA</p>
          <h2 className="text-3xl font-serif-title font-bold text-white">راه‌های ارتباطی و موقعیت مکانی تفریحگاه ساحلی</h2>
          <p className="text-xs text-stone-300 mt-2 max-w-xl mx-auto leading-relaxed font-medium">
            روابط عمومی و پذیرش شبانه‌روزی هتل لوکسوریا آماده تحویل مدارک، درخواست ترانسفر بی‌ام‌و، هماهنگی بوفه اختصاصی سالن عقد و همایش‌های شرکت شماست.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Columns 1: Contact card items (4 cols) */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between" id="contact-info-panel">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6 bento-shadow flex-1 backdrop-blur-md">
              <h3 className="text-base font-bold text-white border-r-2 border-[#C5A880] pr-2 pb-0.5">مشخصات تماس رسمی</h3>
              
              <div className="space-y-5">
                {/* Map item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#C5A880]/10 border border-[#C5A880]/25 text-[#C5A880] rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-1">نشانی مجتمع ساحلی هتل:</h4>
                    <p className="text-xs text-stone-300 leading-relaxed font-semibold">
                      منطقه آزاد کیش، نوار ساحلی شمالی، بلوار خلیج فارس، مجتمع تفریحی لوکسوریا
                    </p>
                  </div>
                </div>

                {/* Phone item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#C5A880]/10 border border-[#C5A880]/25 text-[#C5A880] rounded-2xl flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-1">شماره پذیرش و رزرواسیون:</h4>
                    <p className="text-xs text-stone-300 font-serif tracking-wider font-bold" dir="ltr">
                      ۰۷۶-۴۴۰۰۰۰۰۰ / ۰۲۱-۸۸۰۰۰۰۰۰
                    </p>
                  </div>
                </div>

                {/* Email item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#C5A880]/10 border border-[#C5A880]/25 text-[#C5A880] rounded-2xl flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-1">پست رسمی:</h4>
                    <p className="text-xs text-[#C5A880] font-serif tracking-wider font-bold hover:underline transition">
                      concierge@luxoriahotel-resort.com
                    </p>
                  </div>
                </div>

                {/* Clock info */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#C5A880]/10 border border-[#C5A880]/25 text-[#C5A880] rounded-2xl flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-1">تحویل و تخلیه اتاق‌ها:</h4>
                    <p className="text-xs text-stone-300 font-semibold leading-relaxed">
                      تحویل پذیرش (Check-In) در ساعت ۱۴:۰۰ و تخلیه اتاق (Check-Out) در ساعت ۱۲:۰۰ ظهر مرز قانونی هتل می‌باشد.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick tips */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 bento-shadow flex items-start gap-3 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-[#C5A880] shrink-0 mt-1.5" />
              <p className="text-[10.5px] text-stone-300 leading-relaxed font-semibold">
                <strong>ترانسفر فرودگاهی مجلل:</strong> هلی‌پد و خودرویی ویژه (VIP) از فرودگاه کیش به هتل مهیا است. ارسال شماره بلیط به دپارتمان تشریفات، حداقل ۲۴ ساعت پیش از پرواز الزامی است.
              </p>
            </div>
          </div>

          {/* Columns 2: Custom Interactive Mock Map Frame (4 cols) */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col justify-between bento-shadow backdrop-blur-md" id="contact-map-panel">
            <div className="text-right mb-4">
              <h3 className="text-xs font-bold text-white block">نقشه جغرافیایی اختصاصی هتل لوکسوریا</h3>
              <p className="text-[10.5px] text-stone-300 mt-1 leading-relaxed font-semibold">
                دسترسی اختصاصی به ساحل نقره‌ای مرجانی و اسکله قایق کاتاماران هتل در نوار شمالی خلیج فارس.
              </p>
            </div>

            {/* Map Visual Simulation Canvas */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-[#121110] flex items-center justify-center shadow-inner group">
              <div className="absolute inset-0 bg-[#C5A880]/5" />
              
              {/* Waves lines simulation elements */}
              <div className="absolute w-[180px] h-[180px] rounded-full border border-white/5 animate-pulse" />
              <div className="absolute w-[280px] h-[280px] rounded-full border border-white/5" />
              
              {/* Shoreline Sand bar visualization element */}
              <div className="absolute bottom-0 left-0 right-0 h-44 bg-[#C5A880]/5 border-t border-white/5 flex items-center justify-center select-none">
                <span className="text-[9px] tracking-wider text-[#C5A880] font-bold opacity-30 rotate-2">رستوران ساحلی و ریل ساحلی لوکسوریا</span>
              </div>

              <div className="absolute top-10 left-12 text-center text-[9px] text-stone-400 font-bold">
                <div className="w-1.5 h-1.5 bg-stone-500 rounded-full mx-auto mb-1" />
                <span>اسکله تفریحی ساحل</span>
              </div>

              <div className="absolute top-24 right-14 text-center text-[9px] text-stone-400 font-bold">
                <div className="w-1.5 h-1.5 bg-stone-500 rounded-full mx-auto mb-1" />
                <span>فرودگاه کیش</span>
              </div>

              {/* Main Luxoria Pin representation with shining ring effect */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-28 left-1/2 -scroll-mx-24 text-center z-10"
              >
                {/* Pin Circle point */}
                <div className="w-10 h-10 bg-[#C5A880] text-stone-950 rounded-2xl flex items-center justify-center mx-auto border-2 border-white shadow-lg cursor-pointer">
                  <MapPin size={18} className="text-stone-950" />
                </div>
                {/* Shining ripple */}
                <div className="absolute -inset-1 border-2 border-[#C5A880] rounded-2xl -z-10 animate-ping opacity-30" />
                <span className="block text-[11px] font-bold text-white mt-2 font-sans">عمارت شاهانه لوکسوریا</span>
                <span className="block text-[8px] font-bold tracking-tight text-[#C5A880] mb-1">۲دقیقه تا نوار ساحلی مرجان</span>
              </motion.div>

              {/* Map Zoom Controls */}
              <div className="absolute bottom-3 left-3 bg-stone-950 border border-white/10 p-1 rounded-xl flex flex-col gap-1 z-10 text-xs font-bold text-white">
                <button className="w-6 h-6 hover:bg-white/10 flex items-center justify-center rounded-lg border border-white/5 cursor-pointer" onClick={() => alert("بزرگنمایی نقشه فعال شد.")}>+</button>
                <button className="w-6 h-6 hover:bg-white/10 flex items-center justify-center rounded-lg border border-white/5 cursor-pointer" onClick={() => alert("کوچکنمایی نقشه فعال شد.")}>-</button>
              </div>

            </div>
          </div>

          {/* Columns 3: Contact messaging form (4 cols) */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-6 bento-shadow backdrop-blur-md" id="contact-form-panel">
            <h3 className="text-base font-bold text-white mb-1">ارسال پیام مستقیم به مدیریت</h3>
            <p className="text-[10px] text-stone-300 leading-relaxed mb-6 font-medium">
              مکاتبات برگزاری سمینار، درخواست تورهای شرکتی و ارزیابی بخش پذیرش لوکسوریا را ارسال فرموده تا در سریع‌ترین زمان ممکنه با شما تماس بگیریم.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] text-stone-300 mb-1 font-bold">نام کامل شما</label>
                <input
                  type="text"
                  required
                  placeholder="مانند: مهدی قاسمی"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/10 border border-white/5 focus:border-[#C5A880] outline-none p-3 rounded-2xl text-xs text-white placeholder:text-stone-400 transition text-right font-medium"
                  id="contact-form-name"
                />
              </div>

              <div>
                <label className="block text-[10px] text-stone-300 mb-1 font-bold">موضوع درخواست</label>
                <input
                  type="text"
                  placeholder="رزرو بیزنس‌لانژ / تالار عقد..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white/10 border border-white/5 focus:border-[#C5A880] outline-none p-3 rounded-2xl text-xs text-white placeholder:text-stone-400 transition text-right font-medium"
                  id="contact-form-subject"
                />
              </div>

              <div>
                <label className="block text-[10px] text-stone-300 mb-1 font-bold">متن خواسته یا پرسش شما</label>
                <textarea
                  required
                  rows={4}
                  placeholder="پرسش خود را مرقوم فرموده و یک راه ارتباطی درج نمایید..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/10 border border-white/5 focus:border-[#C5A880] outline-none p-3 rounded-2xl text-xs text-white placeholder:text-stone-400 transition text-right leading-relaxed resize-none font-medium"
                  id="contact-form-message"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C5A880] hover:bg-[#b49872] text-stone-950 font-bold rounded-2xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                id="contact-submit-btn"
              >
                <Send size={12} />
                <span>ارسال مکاتبات رسمی</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
