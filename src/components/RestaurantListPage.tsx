/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MenuItem } from "../types";
import { hotelMenuItems } from "../data/hotelData";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  Sparkles, 
  Clock, 
  MapPin, 
  Utensils, 
  Flame, 
  ArrowLeft,
  CalendarCheck,
  Star,
  Users
} from "lucide-react";

export interface DiningOutlet {
  id: string;
  name: string;
  tagline: string;
  image: string;
  hours: string;
  rating: number;
  featuredDishes: string[];
  description: string;
  cuisine: string;
}

export const DINING_OUTLETS: DiningOutlet[] = [
  {
    id: "imperial-saffron",
    name: "رستوران سلطنتی شاهین زعفران",
    tagline: "IMPERIAL PERSIA FINE DINING",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=650&q=80",
    hours: "۱۳:۰۰ الی ۲۴:۰۰",
    rating: 4.9,
    cuisine: "آشپزی اصیل ایرانی و خاویار",
    featuredDishes: ["کباب برگ سلطنتی لوکسوریا", "شیشلیک گوسفندی سنتی", "پلو دودی با خاویار طلایی"],
    description: "شکوه مهمان‌نوازی پارسی در محیطی آراسته به لوسترهای کریستال و جام‌های دست‌ساز طلاکوب. غرق در عطر ناب زعفران قائنات و برنج دودی ممتاز شمال."
  },
  {
    id: "marina-grill",
    name: "مارینا بریز - کلوپ گریل ملل ساحل",
    tagline: "SEAFRONT SEAFOOD & CATAMARAN BAR",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=650&q=80",
    hours: "۱۲:۰۰ الی ۲۳:۳۰",
    rating: 4.8,
    cuisine: "غذاهای دریایی گریل و بین‌المللی",
    featuredDishes: ["ماهی سالمون نروژی ممتاز", "میگو پفکی با سس کاری", "پاستا ترافل صدف‌های دریایی"],
    description: "طعم صیدهای تازه صخره‌های مرجانی خلیج فارس روی بستر گریل ذغالی نخل. کلوپی ساحلی با هوای معتدل، آلاچیق‌های لوکس معلق بر آب و موسیقی آرامش‌بخش."
  },
  {
    id: "onyx-lounge",
    name: "کافه لژ مخمل اونیکس و روف‌گاردن",
    tagline: "VELVET ROOF ONYX & DESSERT ATELIER",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=650&q=80",
    hours: "۰۸:۰۰ صبح الی ۰۲:۰۰ بامداد",
    rating: 5.0,
    cuisine: "قهوه عربیکا اختصاصی و دسر دست‌ساز فرانسوی",
    featuredDishes: ["چیزکیک نیویورکی با شاه‌توت تازه", "قهوه دبل اسپرسو گلد", "ماکتل خنک استوایی"],
    description: "گوشه‌ای دنج از آرامش غرق در مبلمان زمردی مخملین و نورپردازی ملایم شمع. ایده‌آل برای قرارهای صمیمانه تجاری یا ریلکسیشن عصرگاهی با تماشای غروب خط افق."
  }
];

interface RestaurantListPageProps {
  onBackToHome: () => void;
  onOutletSelect: (outletId: string) => void;
}

export default function RestaurantListPage({ onBackToHome, onOutletSelect }: RestaurantListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "food" | "beverage" | "dessert">("all");

  const menuItemsFiltered = hotelMenuItems.filter((item) => {
    return selectedCategory === "all" ? true : item.category === selectedCategory;
  });

  return (
    <div className="bg-[#121110] text-stone-100 min-h-screen text-right font-sans pt-24 pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs Back */}
        <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <button onClick={onBackToHome} className="hover:text-[#4A5D4E] cursor-pointer">صفحه نخست</button>
            <span>/</span>
            <span className="text-[#C5A880]">عمارت غذا و هنر آشپزی</span>
          </div>
          <button 
            onClick={onBackToHome} 
            className="flex items-center gap-1.5 text-xs font-bold text-[#C5A880] hover:text-[#b49872] bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition cursor-pointer border border-white/10"
          >
            <span>بازگشت به صفحه اصلی</span>
            <ChevronLeft size={14} />
          </button>
        </div>

        {/* Header content section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-white/5 px-4 py-1.5 rounded-full text-[10px] text-[#C5A880] font-bold mb-3 border border-white/10">
            <Sparkles size={11} className="text-[#C5A880] animate-pulse" />
            <span>۳ تالار مجزا با استانداردهای میشلن</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-white tracking-tight">رستوران‌ها و کافی‌شاپ‌ها</h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            کشف طعم‌های ماندگار در مجلل‌ترین تالارهای غذاخوری کشور. هر مجموعه دارای منوها و کادر آشپزی مستقل تراز جهانی است.
          </p>
        </div>

        {/* GRID OF OUTLETS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {DINING_OUTLETS.map((outlet) => (
            <div 
              key={outlet.id}
              className="bg-[#1C1B19] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col justify-between hover:border-[#4A5D4E]/30 transition-all duration-300 group shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={outlet.image} 
                  alt={outlet.name}
                  className="w-full h-full object-cover group-hover:scale-105 duration-700 filter brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B19] via-transparent to-transparent" />
                
                <span className="absolute top-4 right-4 bg-[#4A5D4E] text-white text-[10px] font-black px-3 py-1.5 rounded-xl border border-white/10 shadow-lg">
                  {outlet.cuisine}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2 text-right">
                  <span className="text-[9.5px] font-black text-[#C5A880] tracking-[0.15em] block">{outlet.tagline}</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#4A5D4E] transition">{outlet.name}</h3>
                  <p className="text-[10.5px] text-stone-400 leading-relaxed font-semibold">
                    {outlet.description}
                  </p>
                </div>

                {/* Specific features overview */}
                <div className="space-y-2 pt-2 border-t border-white/5 text-[10px] text-stone-300">
                  <div className="flex gap-2 items-center">
                    <Clock size={12} className="text-[#4A5D4E] shrink-0" />
                    <span>ساعات کاری فعال: <strong className="text-white">{outlet.hours}</strong></span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Star size={12} className="text-[#C5A880] shrink-0" />
                    <span>امتیاز مهمانان مقیم: <strong className="text-white">{outlet.rating.toLocaleString("fa-IR")} / ۵</strong></span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <MapPin size={12} className="text-sky-300 shrink-0" />
                    <span>موقعیت: بال خاوری تفریحگاه ساحلی لوکسوریا</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOutletSelect(outlet.id)}
                    className="w-full py-3 bg-[#4A5D4E] hover:bg-[#3B4C3F] text-white font-black rounded-2xl text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-95"
                  >
                    <CalendarCheck size={14} />
                    <span>مشاهده منو و رزرو میز VIP</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SIGNATURE MENU SELECTOR */}
        <div className="bg-[#1C1B19] p-8 rounded-[3rem] border border-white/10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/10 pb-6">
            <div className="text-right space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Utensils size={18} className="text-[#C5A880]" />
                <span>برگزیده دست‌سازه‌های غذایی شف (Signature Dishes)</span>
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed max-w-xl">
                نمای کلی از لوکس‌ترین و محبوب‌ترین غذاها و نوشیدنی‌های ارائه شده در هر ۳ مجموعه رویال لوکسوریا
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-end gap-1.5 self-center">
              {[
                { id: "all", label: "تمام خوراک‌ها" },
                { id: "food", label: "مستطاب ایرانی و ملل" },
                { id: "beverage", label: "ماکتل‌های خنک و باریستا" },
                { id: "dessert", label: "دسرهای آتلیه پاریس" }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as any)}
                  className={`px-4 py-2 rounded-xl text-[10.5px] font-bold border transition cursor-pointer ${
                    selectedCategory === category.id
                      ? "bg-[#4A5D4E] border-[#4A5D4E] text-white font-extrabold"
                      : "bg-white/5 border-white/10 text-stone-300 hover:bg-white/10"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {menuItemsFiltered.map((dish) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden p-3.5 flex items-center gap-4 hover:border-white/15 transition-all group"
                >
                  <div className="w-20 h-20 bg-[#121110] rounded-xl overflow-hidden shrink-0">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-1.5 text-right flex-1 select-none">
                    <div className="flex justify-between items-baseline gap-1 font-sans">
                      <h4 className="text-xs font-bold text-stone-100 group-hover:text-[#C5A880] transition line-clamp-1">{dish.name}</h4>
                      {dish.isPopular && (
                        <span className="text-[8px] bg-red-500/10 text-red-300 border border-red-500/20 px-1.5 py-0.5 rounded shrink-0 font-extrabold flex items-center gap-0.5">
                          <Flame size={8} />
                          <span>محبوب</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[9.5px] text-stone-400 line-clamp-2 leading-relaxed h-[26px]">
                      {dish.description}
                    </p>
                    <div className="flex justify-between items-center text-[10.5px]">
                      <span className="text-[9.5px] text-stone-500 font-bold">بذل سلیقه مهمانان</span>
                      <span className="font-serif font-black text-[#C5A880]">{(dish.price).toLocaleString("fa-IR")} ریال</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
