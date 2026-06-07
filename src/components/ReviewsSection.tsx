/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { hotelReviews } from "../data/hotelData";
import { Review } from "../types";
import { Star, Send, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(hotelReviews);
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(5);
  const [roomType, setRoomType] = useState("اتاق لوکس");
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !reviewText) {
      alert("لطفاً فیلدهای نام و متن نظر را تکمیل فرمایید.");
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: authorName,
      rating: rating,
      date: "امروز",
      text: reviewText,
      roomType: roomType
    };

    setReviews([newReview, ...reviews]);
    setAuthorName("");
    setReviewText("");
    alert("با تشکر؛ دیدگاه ارزشمند شما ثبت گردید و پس از تأیید تیم تشریفات هتل لوکسوریا نمایش داده خواهد شد.");
  };

  return (
    <section id="reviews" className="py-20 bg-transparent text-right" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <p className="text-[#4A5D4E] text-xs font-black uppercase tracking-widest mb-2 font-serif">GUEST EXPERIENCE & TESTIMONIALS</p>
          <h2 className="text-3xl font-serif-title font-bold text-[#2D2A26]">نظرات و تفصیلی‌های مهمانان گرامی</h2>
          <p className="text-xs text-stone-500 mt-2 max-w-xl mx-auto leading-relaxed font-medium">
            روایت اقامت در لوکسوریا حاصل دیدگاه‌های ارزشمند مهمانان ماست. میزان رضایت و دیدگاه‌های خود را بابت اسپا، پذیرایی و خدمات روم‌سرویس منعکس فرمایید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Reviews list (8 columns) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-black text-[#4A5D4E] uppercase tracking-widest mb-4 border-r-2 border-[#4A5D4E] pr-2">خاطرات اخیر مهمانان</h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
              <AnimatePresence initial={false}>
                {reviews.map((rev) => (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={rev.id}
                    className="bg-white border border-[#2D2A26]/10 rounded-3xl p-5 bento-shadow flex gap-4 text-right"
                  >
                    <UserCircle size={36} className="text-[#4A5D4E]/50 shrink-0 mt-1" />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-xs font-bold text-[#2D2A26]">{rev.author}</h4>
                          <span className="text-[10px] text-stone-400 font-bold block mt-0.5">اقامت در {rev.roomType}</span>
                        </div>
                        <span className="text-[10px] text-stone-400 font-bold">{rev.date}</span>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < rev.rating ? "#4A5D4E" : "transparent"}
                            className={i < rev.rating ? "text-[#4A5D4E]" : "text-stone-200"}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed font-medium">
                        {rev.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Create feedback block (5 columns) */}
          <div className="lg:col-span-5 bg-white border border-[#2D2A26]/10 rounded-3xl p-6 bento-shadow text-right text-[#2D2A26]">
            <h3 className="text-sm font-bold text-[#2D2A26] mb-1">نگارش خاطره سفر و ارزیابی هتل</h3>
            <p className="text-[10px] text-stone-500 leading-relaxed mb-6 font-medium">
              تجارب صمیمی خود را در خصوص اقامت، اسپا، رستوران و برخورد پرسنل لوکسوریا به اشتراک گذاشته و کادر ما را کمک فرمایید.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] text-stone-500 mb-1 font-bold">نام و نام خانوادگی ارجمند</label>
                <input
                  type="text"
                  required
                  placeholder="مانند: سرکار خانم صبوری"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-[#F5F2EE] border border-[#2D2A26]/5 focus:border-[#4A5D4E] outline-none p-3 rounded-2xl text-xs text-[#2D2A26] transition text-right font-medium"
                  id="review-author"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-stone-500 mb-1 font-bold">میزان ارزیابی</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-[#F5F2EE] border border-[#2D2A26]/5 focus:border-[#4A5D4E] outline-none p-3 rounded-2xl text-xs text-[#2D2A26] transition font-medium"
                    id="review-rating"
                  >
                    <option value={5}>۵ ستاره - تماماً شاهانه</option>
                    <option value={4}>۴ ستاره - بسیار مرغوب و شکیل</option>
                    <option value={3}>۳ ستاره - متوسط و معمولی</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-stone-500 mb-1 font-bold">واحد اقامتی مورد استفاده</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full bg-[#F5F2EE] border border-[#2D2A26]/5 focus:border-[#4A5D4E] outline-none p-3 rounded-2xl text-xs text-[#2D2A26] transition font-medium"
                    id="review-room-type"
                  >
                    <option value="اتاق استاندارد">اتاق استاندارد</option>
                    <option value="اتاق لوکس">اتاق لوکس</option>
                    <option value="سوئیت رویال">سوئیت رویال</option>
                    <option value="ویلای اختصاصی">ویلای اختصاصی</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-stone-500 mb-1 font-bold">متن بازخورد یا شرح خاطره</label>
                <textarea
                  required
                  rows={4}
                  placeholder="تجربیات مادی و معنوی خود را در خصوص ملوانی تفریحات، کترینگ، اسپا و دکوراسیون سوئیت‌ها مرقوم فرمایید..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-[#F5F2EE] border border-[#2D2A26]/5 focus:border-[#4A5D4E] outline-none p-3 rounded-2xl text-xs text-[#2D2A26] transition text-right leading-relaxed resize-none font-medium"
                  id="review-text-input"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#2D2A26] hover:bg-[#4A5D4E] text-white font-bold rounded-2xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                id="review-submit-btn"
              >
                <Send size={12} />
                <span>ارسال نهایی برای تشریفات هتل</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
