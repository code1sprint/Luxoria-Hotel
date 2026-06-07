/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  MapPin, 
  ChevronLeft, 
  Sparkles, 
  Maximize2, 
  Compass, 
  Image as ImageIcon 
} from "lucide-react";

interface GalleryViewPageProps {
  onBackToHome: () => void;
}

const GALLERY_PHOTOS = [
  {
    id: 1,
    category: "exteriors",
    title: "میدان ورودی عمارت و ستون‌های باستانی",
    description: "نماد شکوه معماری ایران باستان همراه با نورپردازی داینامیک شامگاهی هتل لوکسوریا.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=95"
  },
  {
    id: 2,
    category: "rooms",
    title: "تراس سلطنتی سوئیت ملل رویال",
    description: "تلفیقی زیبا از آبشارهای تزئینی، وان معلق در فضای باز و چشم‌انداز افق دریایی.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=95"
  },
  {
    id: 3,
    category: "rooms",
    title: "اتاق خواب تریپل لوکس با حمام مرمر",
    description: "مبلمان نفیس مخمل طلاکاری شده شاهانه، نورگیری فوق‌العاده پانورامیک خلیجی.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=95"
  },
  {
    id: 4,
    category: "dining",
    title: "رستوران غوطه‌ور روف‌گاردن و کلوپ پیانو",
    description: "سرو بی‌نظیرترین طعم‌های دریایی ارگانیک با همراهی اجرای زنده ارکستر بومی خلیج.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=95"
  },
  {
    id: 5,
    category: "dining",
    title: "مجموعه پذیرایی کاتاماران ملل کینگ‌دوم",
    description: "باربیکیو داغ ملل روی عرشه قایق مجلل کاتاماران اختصاصی هتل با طبخ مستقیم آشپز اختصاصی.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=95"
  },
  {
    id: 6,
    category: "pools",
    title: "استخر اینفینیتی معلق بام اقیانوس",
    description: "آب‌گرم بسیار تمیز بدون کلر با تزریق هیدروژن فعال، مناسب ریلکسیشن عمیق غازگاهی.",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=95"
  },
  {
    id: 7,
    category: "pools",
    title: "کلاب ساحلی و کاناپه‌های معلق چوبی",
    description: "حریم کاملاً خصوصی با منظره خلیج فیروزه‌ای برای استراحت ملوکانه.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=95"
  },
  {
    id: 8,
    category: "exteriors",
    title: "تفرجگاه پیاده‌روی سواحل نیلگون",
    description: "مسیری پوشیده از نخل‌های آفریقایی غول‌پیکر و فواره‌های چرخشی ریتمیک اتمسفری.",
    image: "https://images.unsplash.com/photo-1611891404724-5f9a241f1d14?auto=format&fit=crop&w=1200&q=95"
  }
];

export default function GalleryViewPage({ onBackToHome }: GalleryViewPageProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "exteriors" | "rooms" | "dining" | "pools">("all");
  const [selectedPhoto, setSelectedPhoto] = useState<typeof GALLERY_PHOTOS[0] | null>(null);

  const categories = [
    { id: "all", label: "همه تصاویر" },
    { id: "exteriors", label: "عمارت بیرونی هتل" },
    { id: "rooms", label: "اتاق‌ها و عمارات سوئیت" },
    { id: "dining", label: "رستوران و کترینگ" },
    { id: "pools", label: "مجموعه آبی و کلوپ ساحلی" }
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter(photo => 
    activeCategory === "all" ? true : photo.category === activeCategory
  );

  return (
    <div className="bg-[#121110] text-stone-100 min-h-screen text-right font-sans pt-24 pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb Back */}
        <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <button onClick={onBackToHome} className="hover:text-[#4A5D4E] cursor-pointer">صفحه نخست</button>
            <span>/</span>
            <span className="text-[#C5A880]">گالری تصاویر سلطنتی</span>
          </div>
          <button 
            onClick={onBackToHome} 
            className="flex items-center gap-1.5 text-xs font-bold text-[#C5A880] hover:text-[#b49872] bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition cursor-pointer border border-white/10"
          >
            <span>بازگشت به صفحه اصلی</span>
            <ChevronLeft size={14} />
          </button>
        </div>

        {/* Title details */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full text-[10px] text-[#C5A880] font-bold mb-3 border border-white/10">
            <ImageIcon size={10} />
            <span>تصویربرداری تایید شده ۳۶۰ درجه</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-white tracking-tight">گالری فریم‌های مجلل</h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            حس حضور واقعی در بخش‌های گوناگون مجتمع تفریحی لوکسوریا را از لنز عکاسان ملی و بین‌المللی با رزولوشن گلد تماشا کنید.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold border transition cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#4A5D4E] border-[#4A5D4E] text-white font-extrabold"
                  : "bg-white/5 border-white/10 text-stone-300 hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photographic Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedPhoto(photo)}
                className="bg-[#1C1B19] border border-white/10 rounded-3xl overflow-hidden shadow-lg aspect-square relative cursor-pointer group"
              >
                <img 
                  src={photo.image} 
                  alt={photo.title}
                  className="w-full h-full object-cover filter brightness-[0.75] transition-all duration-700 group-hover:scale-105 group-hover:brightness-50"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual feedback hover overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 text-right flex flex-col justify-end h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] font-black text-[#C5A880] mb-1 flex items-center gap-1">
                    <Sparkles size={9} />
                    <span>کلیک برای نمایش بزرگ</span>
                  </span>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{photo.title}</h4>
                  <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">{photo.description}</p>
                </div>

                <div className="absolute top-3 right-3 w-7 h-7 bg-black/50 border border-white/15 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                  <Maximize2 size={12} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Photo Lightbox Popup Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 left-6 w-11 h-11 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition cursor-pointer z-50"
              >
                <X size={20} />
              </button>

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-[#1C1B19] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
              >
                {/* Cover Image */}
                <div className="md:w-2/3 aspect-video md:aspect-auto md:h-[60vh] relative">
                  <img 
                    src={selectedPhoto.image} 
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B19] via-transparent to-transparent md:bg-transparent" />
                </div>

                {/* Details pane */}
                <div className="p-6 md:w-1/3 flex flex-col justify-between text-right space-y-6">
                  <div className="space-y-4">
                    <span className="text-[9px] font-black text-[#C5A880] bg-[#C5A880]/10 px-3 py-1 rounded-full border border-[#C5A880]/20 inline-block uppercase">
                      گروه: {categories.find(c => c.id === selectedPhoto.category)?.label}
                    </span>
                    
                    <h3 className="text-lg font-bold text-white leading-snug">{selectedPhoto.title}</h3>
                    <p className="text-xs text-stone-3300/90 leading-relaxed font-semibold">
                      {selectedPhoto.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2.5 items-center text-[10px] text-stone-400 font-bold border-t border-white/5 pt-4">
                      <MapPin size={12} className="text-[#4A5D4E] shrink-0" />
                      <span>منطقه لوکسوریا - کیش</span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      بستن کاتالوگ
                    </button>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
