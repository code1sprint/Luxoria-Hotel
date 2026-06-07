/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Eye, Sparkles, X, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryItem {
  id: string;
  category: "all" | "exterior" | "wellness" | "dining";
  title: string;
  image: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    category: "exterior",
    title: "نمای شبانه و محوطه اقیانوسی هتل",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    description: "شکوه معماری مدرن قرن در تلاقی با آب‌های کریستالی اقیانوس."
  },
  {
    id: "g2",
    category: "exterior",
    title: "لابی باشکوه و کانسیرژ ورودی لوکسوریا",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    description: "پذیرایی شاهانه با لوسترهای کریستال عظیمی و مبلمان دست‌ساز مخمل."
  },
  {
    id: "g3",
    category: "wellness",
    title: "سالن ماساژ و مراقبت‌های پوستی اسپا",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    description: "بکارگیری روغن‌های آروماتراپی ارگانیک سوئدی زیر نظر درمانگران مجرب."
  },
  {
    id: "g4",
    category: "wellness",
    title: "مرکز تندرستی و مجهزترین فیتنس تفریحی",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    description: "امکانات هوازی پیشرفته Technogym ایتالیا با مربی همراه مربی همراه تغذیه."
  },
  {
    id: "g5",
    category: "dining",
    title: "روف‌گاردن و فضای نشیمن تفریحگاهی رستوران",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
    description: "میزهای لوکس با منوهای غذاهای ملل و چشم‌انداز افق دریای مرجانی."
  },
  {
    id: "g6",
    category: "dining",
    title: "ساحل رویایی کینگ‌تاون با شن‌های گلدن",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "فضای استقرار تخت‌های ساحلی آفتاب‌گیر با سرو ماکتل‌های خنک استوایی هتل."
  }
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "exterior" | "wellness" | "dining">("all");
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState<number | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const handleNext = () => {
    if (fullscreenImageIndex !== null) {
      setFullscreenImageIndex((fullscreenImageIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (fullscreenImageIndex !== null) {
      setFullscreenImageIndex((fullscreenImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-transparent text-right" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center mb-12">
          <p className="text-[#4A5D4E] text-xs font-black uppercase tracking-widest mb-2 font-serif">VISUAL LUXURY EXPERIENCE</p>
          <h2 className="text-3xl font-serif-title font-bold text-[#2D2A26]">گالری تصاویر و جلوه‌های باشکوه هتل پنج ستاره</h2>
          <p className="text-xs text-stone-500 mt-2 max-w-xl mx-auto leading-relaxed font-medium">
            گوشه‌ای از جلوه‌های رویایی دکوراسیون، مناظر افق تماشایی استخرها، اتاق‌های VIP تمبردار و خدمات رفاهی منحصربه‌فرد هتل لوکسوریا را ملاحظه فرمایید.
          </p>
        </div>

        {/* Gallery categories filter buttons */}
        <div className="flex justify-center gap-2.5 mb-10 overflow-x-auto pb-2">
          {[
            { id: "all", label: "تمام بخش‌ها" },
            { id: "exterior", label: "نمای هتل و لابی" },
            { id: "wellness", label: "اسپا و تندرستی" },
            { id: "dining", label: "ساحل و کافی‌شاپ" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 border rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#4A5D4E] border-[#4A5D4E] text-white shadow-sm"
                  : "bg-white border-[#2D2A26]/10 text-[#2D2A26]/80 hover:text-[#2D2A26]"
              }`}
              id={`gallery-filter-${cat.id}`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Gallery Bento Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-masonry-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setFullscreenImageIndex(index)}
                key={item.id}
                className="group cursor-pointer relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#2D2A26]/10 bento-shadow"
                id={`gallery-item-card-${item.id}`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Cover Overlay with detail text */}
                <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-[#2D2A26]/90 via-[#2D2A26]/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-5 text-right pointer-events-none">
                  <div className="flex items-center gap-1 text-[10px] text-yellow-300 font-bold mb-1">
                    <Sparkles size={10} />
                    <span>کشف تجمل لوکسوریا</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-1 leading-tight">{item.title}</h4>
                  <p className="text-[10px] text-zinc-300 leading-relaxed font-semibold line-clamp-2">{item.description}</p>
                </div>

                {/* Eye icon floating indicator */}
                <div className="absolute top-4 left-4 w-9 h-9 rounded-2xl bg-white/90 border border-[#2D2A26]/10 text-[#2D2A26] flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow">
                  <Eye size={14} className="text-[#4A5D4E]" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Fullscreen Slider Overlay Block */}
        <AnimatePresence>
          {fullscreenImageIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFullscreenImageIndex(null)}
                className="absolute inset-0 bg-[#2D2A26]/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden border border-[#2D2A26]/20 shadow-2xl bg-white z-10 text-right text-[#2D2A26]"
                dir="rtl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setFullscreenImageIndex(null)}
                  className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white hover:bg-zinc-50 border border-[#2D2A26]/10 text-[#2D2A26] hover:scale-105 active:scale-95 flex items-center justify-center transition cursor-pointer"
                  id="close-gallery-fullscreen"
                >
                  <X size={18} />
                </button>

                {/* Slider layout arrows */}
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 -translate-y-1/2 right-4 z-20 w-12 h-12 rounded-full bg-white hover:bg-zinc-200 border border-[#2D2A26]/10 text-[#2D2A26] hover:text-[#4A5D4E] flex items-center justify-center transition cursor-pointer"
                  id="gallery-slider-next"
                >
                  <ChevronRight size={24} />
                </button>
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 -translate-y-1/2 left-4 z-20 w-12 h-12 rounded-full bg-white hover:bg-zinc-200 border border-[#2D2A26]/10 text-[#2D2A26] hover:text-[#4A5D4E] flex items-center justify-center transition cursor-pointer"
                  id="gallery-slider-prev"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Image & Text block details */}
                <div className="flex flex-col h-full justify-between select-none">
                  <div className="aspect-[16/9] w-full max-h-[60vh] bg-[#F5F2EE] flex items-center justify-center overflow-hidden">
                    <img
                      src={filteredItems[fullscreenImageIndex].image}
                      alt={filteredItems[fullscreenImageIndex].title}
                      className="max-w-full max-h-[60vh] object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Footer Description bar */}
                  <div className="bg-[#F5F2EE] p-6 border-t border-[#2D2A26]/10">
                    <span className="text-[10px] text-[#4A5D4E] font-black tracking-widest block uppercase mb-1">
                      {filteredItems[fullscreenImageIndex].category}
                    </span>
                    <h3 className="text-base font-bold text-[#2D2A26] mb-1">
                      {filteredItems[fullscreenImageIndex].title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-medium">
                      {filteredItems[fullscreenImageIndex].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
