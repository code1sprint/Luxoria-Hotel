/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { hotelMenuItems } from "../data/hotelData";
import { Utensils, Coffee, Cake, Heart, Check, Flame, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RestaurantSectionProps {
  onRestaurantClick?: () => void;
}

export default function RestaurantSection({ onRestaurantClick }: RestaurantSectionProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "food" | "beverage" | "dessert">("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookedTable, setBookedTable] = useState(false);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const [tableName, setTableName] = useState("");
  const [tableTime, setTableTime] = useState("");
  const [tableGuests, setTableGuests] = useState(2);

  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableName || !tableTime) {
      alert("لطفاً اطلاعات را به طور کامل پر کنید.");
      return;
    }
    setBookedTable(true);
  };

  const filteredItems = hotelMenuItems.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  return (
    <section id="restaurant" className="py-20 bg-transparent text-right font-sans text-stone-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/5 pb-6 gap-4">
          <div className="text-right">
            <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-1 font-serif">FINE CULINARY & DINING</p>
            <h2 className="text-3xl font-serif-title font-bold text-white">رستوران‌های ملل و کلوپ پیانوبار</h2>
            <p className="text-xs text-stone-300 mt-2 max-w-xl leading-relaxed font-medium">
              شامل ۳ تالار منحصربه‌فرد با طعم‌های پارسی، مدیترانه‌ای و آتلیه شیرینی فرانسوی تحت هدایت مستقیم شف ستاره‌دار میشلن.
            </p>
          </div>
          {onRestaurantClick && (
            <button
              onClick={onRestaurantClick}
              className="px-6 py-2.5 bg-[#4A5D4E] hover:bg-[#3B4C3F] text-white text-xs font-semibold rounded-full transition cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <span>مشاهده و رزرو تالارهای اختصاصی غذا</span>
              <ChevronLeft size={14} />
            </button>
          )}
        </div>

        {/* Categories togglers */}
        <div className="flex justify-center gap-3 mb-10 overflow-x-auto pb-2">
          {[
            { id: "all", label: "همه طعم‌ها", icon: <Utensils size={14} /> },
            { id: "food", label: "غذاهای اصلی", icon: <Utensils size={14} /> },
            { id: "beverage", label: "کافه و ماکتل پیانو بار", icon: <Coffee size={14} /> },
            { id: "dessert", label: "دسرها و شیرینی روز", icon: <Cake size={14} /> }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 border cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-[#4A5D4E] border-[#4A5D4E] text-white shadow-sm"
                  : "bg-white/5 border-white/10 text-stone-300 hover:text-white hover:bg-white/10"
              }`}
              id={`cat-toggler-${cat.id}`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Core Layout Grid: Menu on right, Table booking on left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Menu Items Explorer (8 columns) */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4 border-r-2 border-emerald-400 pr-2">پیشنهادهای سرآشپز</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-4 flex gap-4 transition duration-300 bento-shadow hover:shadow-lg backdrop-blur-sm"
                    id={`menu-item-${item.id}`}
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 relative bg-[#F5F2EE] border border-[#2D2A26]/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover animate-fade-in"
                        referrerPolicy="no-referrer"
                      />
                      {item.isPopular && (
                        <span className="absolute top-1 right-1 bg-[#4A5D4E] text-white font-black text-[8px] px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <Flame size={8} />
                          محبوب
                        </span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between text-right">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-white leading-tight-none">{item.name}</h4>
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            className="text-stone-400 hover:text-rose-400 transition cursor-pointer"
                            id={`fav-${item.id}`}
                          >
                            <Heart size={14} fill={favorites.includes(item.id) ? "#f43f5e" : "transparent"} className={favorites.includes(item.id) ? "text-rose-500" : ""} />
                          </button>
                        </div>
                        <p className="text-[10px] text-stone-300 leading-relaxed mt-1.5 line-clamp-2 font-medium">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/10">
                        <span className="text-xs font-bold text-emerald-300 font-serif">
                          {item.price.toLocaleString("fa-IR")} تومان
                        </span>

                        <button
                          onClick={() => {
                            alert(`یک عدد ${item.name} به فاکتور نهایی صورت‌حساب مینی‌بار اتاق افزوده شد.`);
                          }}
                          className="px-2.5 py-1.5 bg-white/10 border border-white/5 hover:bg-[#4A5D4E] hover:text-white text-[10px] rounded-xl text-stone-200 font-bold transition cursor-pointer"
                          id={`add-to-cart-${item.id}`}
                        >
                          سفارش روم سرویس
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Table VIP Dining Booking form (4 columns) */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-6 h-fit bento-shadow relative backdrop-blur-md">
            <h3 className="text-base font-serif-title font-bold text-white mb-1">رزرو میز تشریفاتی VIP</h3>
            <p className="text-[11px] text-stone-300 leading-relaxed mb-6 font-medium">
              موقعیت میز ایده‌آل خود را با چشم‌انداز پیانوبار، روف‌گاردن یا تراس معلق ساحلی هتل لوکسوریا هماهنگ نمایید.
            </p>

            <AnimatePresence mode="wait">
              {!bookedTable ? (
                <motion.form
                  key="table-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleTableSubmit}
                  className="space-y-4 text-right"
                >
                  <div>
                    <label className="block text-[10px] text-stone-300 mb-1 font-bold">نام کامل نماینده رزرو کننده میز</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: جناب دکتر افشار"
                      value={tableName}
                      onChange={(e) => setTableName(e.target.value)}
                      className="w-full bg-white/10 border border-white/5 focus:border-[#4A5D4E] outline-none p-3 rounded-2xl text-xs transition text-white text-right font-medium placeholder:text-stone-400"
                      id="table-booking-name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-stone-300 mb-1 font-bold">ساعت حضور</label>
                      <input
                        type="time"
                        required
                        value={tableTime}
                        onChange={(e) => setTableTime(e.target.value)}
                        className="w-full bg-white/10 border border-white/5 focus:border-[#4A5D4E] outline-none p-3 rounded-2xl text-xs transition text-white font-medium"
                        id="table-booking-time"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-300 mb-1 font-bold">تعداد همراهان</label>
                      <select
                        value={tableGuests}
                        onChange={(e) => setTableGuests(Number(e.target.value))}
                        className="w-full bg-white/10 border border-white/5 focus:border-[#4A5D4E] outline-none p-3 rounded-2xl text-xs transition text-white font-medium"
                        id="table-booking-count"
                      >
                        {[2, 4, 6, 8, 12].map((g) => (
                           <option key={g} value={g} className="bg-[#18221B] text-white font-semibold">
                             {g.toLocaleString("fa-IR")} نفر
                           </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#4A5D4E] hover:bg-[#3d4c40] text-white font-bold rounded-2xl text-xs transition cursor-pointer"
                    id="table-booking-btn"
                  >
                    صدور رزرواسیون قطعی میز
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="table-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-4 text-right"
                >
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check size={24} />
                  </div>
                  <div className="text-center">
                    <h4 className="text-base font-bold text-emerald-400 mb-2">رزرو میز تشریفاتی نهایی شد!</h4>
                    <p className="text-[11.5px] text-stone-300 leading-relaxed font-semibold">
                      میز مجهز به نام <span className="font-bold text-white">{tableName}</span> برای ساعت {tableTime.toLocaleString("fa-IR")} با ظرفیت {tableGuests.toLocaleString("fa-IR")} نفر فیکس گردید. کارت ورود الکترونیک رخت آویز میز برای شماره اتاق رزروشده ارسال می‌شود.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setBookedTable(false);
                      setTableName("");
                      setTableTime("");
                    }}
                    className="w-full py-2.5 bg-white/10 border border-white/10 hover:bg-[#4A5D4E] hover:text-white rounded-xl text-[10px] font-bold text-stone-200 transition cursor-pointer"
                  >
                    رزرو مجدد یا افزایش ظرفیت میز
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
