/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Room } from "../types";
import { X, Calendar, Users, ShieldCheck, Coffee, Plane, Gift } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BookingModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  prefilledDates?: { checkIn: string; checkOut: string; guests: number };
}

export default function BookingModal({ room, isOpen, onClose, prefilledDates }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [checkIn, setCheckIn] = useState(prefilledDates?.checkIn || "");
  const [checkOut, setCheckOut] = useState(prefilledDates?.checkOut || "");
  const [guestsCount, setGuestsCount] = useState(prefilledDates?.guests || 2);
  const [breakfast, setBreakfast] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [insurance, setInsurance] = useState(true);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [days, setDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    if (prefilledDates) {
      if (prefilledDates.checkIn) setCheckIn(prefilledDates.checkIn);
      if (prefilledDates.checkOut) setCheckOut(prefilledDates.checkOut);
      if (prefilledDates.guests) setGuestsCount(prefilledDates.guests);
    }
  }, [prefilledDates]);

  useEffect(() => {
    if (checkIn && checkOut) {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const timeDiff = d2.getTime() - d1.getTime();
      const calculatedDays = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
      setDays(isNaN(calculatedDays) ? 1 : calculatedDays);
    } else {
      setDays(1);
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    if (!room) return;
    let base = room.price * days;
    if (breakfast) base += 250000 * guestsCount * days;
    if (transfer) base += 850000;
    if (insurance) base += 120000 * days;
    setTotalPrice(base);
  }, [room, days, breakfast, transfer, insurance, guestsCount]);

  if (!room || !isOpen) return null;

  const handleNext = () => {
    if (step === 1) {
      if (!checkIn || !checkOut) {
        alert("لطفاً تاریخ ورود و خروج را مشخص نمایید.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!fullName || !phone) {
        alert("وارد کردن نام کامل و شماره تماس الزامی است.");
        return;
      }
      setBookingId(`LX-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep(3);
    }
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString("fa-IR") + " تومان";
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#2D2A26]/40 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white border border-[#2D2A26]/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] text-right text-[#2D2A26]"
          dir="rtl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 text-[#2D2A26]/60 hover:text-[#2D2A26] transition bg-white p-2 rounded-full border border-[#2D2A26]/10 cursor-pointer shadow-sm"
            id="close-booking-modal"
          >
            <X size={16} />
          </button>

          {/* Left panel: Info Summary */}
          <div className="w-full md:w-5/12 bg-[#F5F2EE] p-6 border-b md:border-b-0 md:border-l border-[#2D2A26]/10 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="inline-block px-3 py-1 bg-[#4A5D4E]/10 text-[#4A5D4E] text-[10px] rounded-full border border-[#4A5D4E]/20 mb-3 font-black">
                انتخاب شما برای اقامتی جاودان
              </div>
              <h3 className="text-lg font-bold text-[#2D2A26] mb-2">{room.title}</h3>
              <p className="text-stone-500 text-xs leading-relaxed mb-4 font-medium">{room.description}</p>

              <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#2D2A26]/5 mb-4 h-32 select-none">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4 text-[#2D2A26]/80 font-semibold">
                <div className="bg-white p-2.5 rounded-xl border border-[#2D2A26]/5">
                  <span className="text-stone-400 block mb-0.5 text-[10px]">ظرفیت قانونی:</span>
                  <span className="font-bold text-[#4A5D4E]">{room.capacity.toLocaleString("fa-IR")} نفر</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#2D2A26]/5">
                  <span className="text-stone-400 block mb-0.5 text-[10px]">مساحت تقریبی:</span>
                  <span className="font-bold text-[#4A5D4E]">{room.size.toLocaleString("fa-IR")} متر مربع</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#2D2A26]/5 col-span-2">
                  <span className="text-stone-400 block mb-0.5 text-[10px]">چشم‌انداز اختصاصی:</span>
                  <span className="font-bold text-[#4A5D4E]">{room.view}</span>
                </div>
              </div>
            </div>

            {/* Calculations widget */}
            <div className="bg-white p-4 rounded-2xl border border-[#2D2A26]/10 mt-4 shadow-sm">
              <div className="flex justify-between items-center mb-2 text-xs text-stone-500 font-semibold">
                <span>تعرفه پایه هر شب:</span>
                <span className="font-serif font-bold text-[#2D2A26]">{formatPrice(room.price)}</span>
              </div>
              {days > 1 && (
                <div className="flex justify-between items-center mb-2 text-xs text-stone-500 font-semibold">
                  <span>مدت اقامت:</span>
                  <span className="font-bold text-[#2D2A26]">{days.toLocaleString("fa-IR")} شب</span>
                </div>
              )}
              {breakfast && (
                <div className="flex justify-between items-center mb-2 text-xs text-[#4A5D4E] font-bold">
                  <span>بوفه صبحانه لاکچری:</span>
                  <span className="font-serif">{formatPrice(250000 * guestsCount * days)}</span>
                </div>
              )}
              {transfer && (
                <div className="flex justify-between items-center mb-2 text-xs text-[#4A5D4E] font-bold">
                  <span>ترانسفر VIP با خودرو:</span>
                  <span className="font-serif">{formatPrice(850000)}</span>
                </div>
              )}
              <div className="h-px bg-stone-100 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-[#2D2A26]">جمع برآورد نهایی:</span>
                <span className="text-base font-bold text-[#4A5D4E] font-serif">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Right panel: Steps Content */}
          <div className="w-full md:w-7/12 p-6 flex flex-col justify-between overflow-y-auto">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 border-b border-stone-100 pb-4 text-xs font-semibold select-none">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 flex items-center justify-center rounded-3xl text-[10px] font-black ${step >= 1 ? "bg-[#2D2A26] text-white" : "bg-stone-100 text-stone-400"}`}>۱</span>
                <span className={step >= 1 ? "text-[#2D2A26] font-bold" : "text-stone-400"}>خدمات و تاریخ</span>
              </div>
              <div className="w-8 h-px bg-stone-250" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 flex items-center justify-center rounded-3xl text-[10px] font-black ${step >= 2 ? "bg-[#2D2A26] text-white" : "bg-stone-100 text-stone-400"}`}>۲</span>
                <span className={step >= 2 ? "text-[#2D2A26] font-bold" : "text-stone-400"}>مشخصات سرپرست</span>
              </div>
              <div className="w-8 h-px bg-stone-250" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 flex items-center justify-center rounded-3xl text-[10px] font-black ${step >= 3 ? "bg-[#4A5D4E] text-white" : "bg-stone-100 text-stone-400"}`}>۳</span>
                <span className={step >= 3 ? "text-[#4A5D4E] font-bold" : "text-stone-400"}>تأیید نهایی واچر</span>
              </div>
            </div>

            {/* STEP 1: Dates & Services */}
            {step === 1 && (
              <div className="space-y-5 text-right">
                <h4 className="text-base font-bold text-[#2D2A26] mb-1">تعیین تاریخ و آپشن‌های فوق لوکس اقامتی</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1.5 font-bold">تاریخ ورود (Check-In)</label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-3 text-stone-400" size={16} />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-[#F5F2EE] border border-[#2D2A26]/5 focus:border-[#4A5D4E] outline-none text-[#2D2A26] rounded-2xl p-3 pr-10 text-xs transition font-semibold"
                        id="checkin-date-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1.5 font-bold">تاریخ خروج (Check-Out)</label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-3 text-stone-400" size={16} />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-[#F5F2EE] border border-[#2D2A26]/5 focus:border-[#4A5D4E] outline-none text-[#2D2A26] rounded-2xl p-3 pr-10 text-xs transition font-semibold"
                        id="checkout-date-input"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-stone-500 mb-1.5 font-bold">تعداد همراهان مقیم</label>
                  <div className="relative">
                    <Users className="absolute right-3 top-3 text-stone-400" size={16} />
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full bg-[#F5F2EE] border border-[#2D2A26]/5 focus:border-[#4A5D4E] outline-none text-[#2D2A26] rounded-2xl p-3 pr-10 text-xs transition font-bold"
                      id="guests-count-select"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num} className="bg-white font-bold">
                          {num.toLocaleString("fa-IR")} نفر {num > room.capacity ? "(بیشتر از ظرفیت اسمی اتاق)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3 pt-3">
                  <span className="block text-xs font-black text-[#2D2A26] border-r-2 border-[#4A5D4E] pr-2">افزودنی‌های تشریفاتی</span>
                  
                  <label className={`flex items-center justify-between p-3 rounded-2xl border transition cursor-pointer select-none ${breakfast ? "bg-[#4A5D4E]/10 border-[#4A5D4E] text-[#2D2A26]" : "bg-[#F5F2EE] border-[#2D2A26]/5 text-stone-500 hover:border-stone-200"}`}>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-white rounded-xl text-[#4A5D4E] border border-[#2D2A26]/5">
                        <Coffee size={16} />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold block text-[#2D2A26]">بوفه صبحانه شاهنشاهی روزانه</span>
                        <span className="text-[9.5px] text-stone-400 block font-semibold">ارائه منوی ملل گرم و سرد به همراه میوه استوایی تازه</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] bg-white border border-[#2D2A26]/5 px-2 py-0.5 rounded-lg text-stone-600 font-bold">۲۵۰,۰۰۰ تومان</span>
                      <input
                        type="checkbox"
                        checked={breakfast}
                        onChange={() => setBreakfast(!breakfast)}
                        className="w-4 h-4 accent-[#4A5D4E] rounded cursor-pointer"
                        id="addon-breakfast"
                      />
                    </div>
                  </label>

                  <label className={`flex items-center justify-between p-3 rounded-2xl border transition cursor-pointer select-none ${transfer ? "bg-[#4A5D4E]/10 border-[#4A5D4E] text-[#2D2A26]" : "bg-[#F5F2EE] border-[#2D2A26]/5 text-stone-500 hover:border-stone-200"}`}>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-white rounded-xl text-[#4A5D4E] border border-[#2D2A26]/5">
                        <Plane size={16} />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold block text-[#2D2A26]">ترانسفر متقابل با خودرو بی‌ام‌و</span>
                        <span className="text-[9.5px] text-stone-400 block font-semibold">حضور راهنمای تشریفاتی ویژه با تابلو اختصاصی نام شما</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] bg-white border border-[#2D2A26]/5 px-2 py-0.5 rounded-lg text-stone-600 font-bold">۸۵۰,۰۰۰ تومان</span>
                      <input
                        type="checkbox"
                        checked={transfer}
                        onChange={() => setTransfer(!transfer)}
                        className="w-4 h-4 accent-[#4A5D4E] rounded cursor-pointer"
                        id="addon-transfer"
                      />
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 2: Personal Info */}
            {step === 2 && (
              <div className="space-y-4 text-right">
                <h4 className="text-base font-bold text-[#2D2A26]">مشخصات مسافر و سرپرست اتاق</h4>
                <p className="text-xs text-stone-500 leading-relaxed font-semibold">
                  لطفاً نام گرانقدر خود را به همراه کد ملی معتبر ثبت نمایید تا مدارک واچر به منزله سند رسمی تلقی شود.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1.5 font-bold">نام و نام خانوادگی کامل (مطابق کارشناس ملی)</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: سهراب علیزاده"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#F5F2EE] border border-[#2D2A26]/5 focus:border-[#4A5D4E] outline-none text-[#2D2A26] rounded-2xl p-3 text-xs text-right transition font-medium"
                      id="input-full-name"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1.5 font-bold">شماره تلفن همراه (ارسال پیامک تایید و مدارک مانیتور)</label>
                    <input
                      type="tel"
                      required
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F5F2EE] border border-[#2D2A26]/5 focus:border-[#4A5D4E] outline-none text-[#2D2A26] rounded-2xl p-3 text-xs text-left transition font-serif font-black"
                      dir="ltr"
                      id="input-phone"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1.5 font-bold">نشانی ایمیل</label>
                    <input
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F5F2EE] border border-[#2D2A26]/5 focus:border-[#4A5D4E] outline-none text-[#2D2A26] rounded-2xl p-3 text-xs text-left transition font-serif font-bold"
                      dir="ltr"
                      id="input-email"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <label className={`flex items-start gap-3 p-3 rounded-2xl border transition cursor-pointer select-none ${insurance ? "bg-[#4A5D4E]/10 border-[#4A5D4E]" : "bg-[#F5F2EE] border-[#2D2A26]/5"}`}>
                    <input
                      type="checkbox"
                      checked={insurance}
                      onChange={() => setInsurance(!insurance)}
                      className="w-4 h-4 accent-[#4A5D4E] rounded mt-0.5 cursor-pointer"
                      id="insurance-checkbox"
                    />
                    <div className="text-right">
                      <span className="text-xs font-bold block text-[#2D2A26]">پوشش بیمه لغو سفر ویژه هتل لوکسوریا</span>
                      <span className="text-[10px] text-stone-400 block font-semibold leading-relaxed">استرداد وجه ۱۰۰٪ بدون کسر جریمه در صورت لغو اتاق تا ۴۸ ساعت قبل از ورود</span>
                      <span className="text-[10px] text-[#4A5D4E] block mt-1 font-serif">ناچیز ۱۲۰,۰۰۰ تومان به ازای کل روزها</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 3: Complete Success */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-5 text-right text-[#2D2A26]"
              >
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <ShieldCheck size={36} />
                </div>

                <div className="text-center">
                  <h4 className="text-xl font-bold text-emerald-700 mb-1">اقامت رؤیایی شما تایید شد!</h4>
                  <p className="text-xs text-stone-500 leading-relaxed max-w-md mx-auto font-medium">
                    جناب آقای/سرکار خانم <span className="font-bold text-[#2D2A26]">{fullName}</span>، منتظر حضور گرم شما پیشاپیش در تفریحگاه و هتل لوکسوریا هستیم. ووچر شناسایی موقت به همراه کلید دیجیتال ثبت گردید.
                  </p>
                </div>

                {/* Digital Ticket */}
                <div className="bg-[#F5F2EE] border border-[#2D2A26]/10 rounded-2xl p-5 max-w-md mx-auto text-right space-y-3 relative overflow-hidden bento-shadow">
                  {/* Gold Stamp Accent */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] border border-amber-200 rounded-full font-bold">
                    <Gift size={10} />
                    لوکسوریا VIP
                  </div>

                  <div className="text-xs border-b border-stone-200 pb-2 text-stone-400 flex justify-between items-center font-bold">
                    <span>شناسه پیگیری هماهنگی:</span>
                    <span className="font-serif text-[#4A5D4E] font-bold text-sm tracking-wider">{bookingId}</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-600 font-semibold leading-relaxed">
                    <div className="flex justify-between">
                      <span className="text-stone-400">واحد اقامتی رزروشده:</span>
                      <span className="text-[#2D2A26] font-bold">{room.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">تعداد همراهان مقیم:</span>
                      <span className="text-[#2D2A26] font-bold">{guestsCount.toLocaleString("fa-IR")} نفر</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">مدت زمان اقامت:</span>
                      <span className="text-[#2D2A26] font-bold">{days.toLocaleString("fa-IR")} شب (ورود: {checkIn.toLocaleString("fa-IR")})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">ترانسفر همراه با خودرو:</span>
                      <span className={transfer ? "text-[#4A5D4E] font-bold" : "text-stone-400"}>
                        {transfer ? "فعال و ثبت خودرو" : "عدم ثبت"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">بوفه صبحانه روزانه:</span>
                      <span className={breakfast ? "text-[#4A5D4E] font-bold" : "text-stone-400"}>
                        {breakfast ? "فعال دارد" : "عدم ثبت"}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-stone-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-stone-500 font-bold">مجموع مبلغ فاکتور:</span>
                    <span className="text-sm font-bold text-[#4A5D4E] font-serif">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <p className="text-[10px] text-stone-400 max-w-sm mx-auto text-center font-semibold leading-relaxed">
                  پیامک تایید رسمی و لینک واچر الکترونیکی حراست به شماره همراه {phone.toLocaleString("fa-IR")} ارسال گردید.
                </p>
              </motion.div>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-between items-center border-t border-stone-100 pt-4 mt-6">
              {step < 3 ? (
                <>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-[#F5F2EE] hover:bg-[#E2DFD9] text-stone-600 rounded-xl text-xs font-bold transition cursor-pointer"
                    id="booking-modal-cancel"
                  >
                    انصراف
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-[#2D2A26] hover:bg-[#4A5D4E] text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    id="booking-modal-next"
                  >
                    {step === 2 ? "صدور واچر و رزرو نهایی" : "ادامه رزرو اتاق"}
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-[#2D2A26] hover:bg-[#4A5D4E] text-white font-bold rounded-xl text-xs transition cursor-pointer"
                  id="booking-modal-finish"
                >
                  پایان و بازگشت به صفحه اصلی
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
