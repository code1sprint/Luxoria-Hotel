/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { hotelRooms } from "../data/hotelData";
import { Room } from "../types";
import { ChevronRight, ChevronLeft, Info } from "lucide-react";
import { motion } from "motion/react";

interface RoomsSectionProps {
  onBookRoom: (room: Room) => void;
  onRoomSelect?: (roomId: string) => void;
}

export default function RoomsSection({ onBookRoom, onRoomSelect }: RoomsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDetailsRoom, setSelectedDetailsRoom] = useState<Room | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollAmount = clientWidth * 0.75;
      containerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString("fa-IR") + " تومان";
  };

  return (
    <section id="rooms" className="py-20 bg-transparent text-right" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header section with styling matching user image atmosphere */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-right">
            <p className="text-[#4A5D4E] text-xs font-black uppercase tracking-widest mb-2 font-serif">EXQUISITE ACCOMMODATION</p>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#2D2A26] tracking-tight">واحدهای اقامتی و عمارت‌های سلطنتی</h2>
            <p className="text-xs text-stone-500 mt-2 max-w-xl leading-relaxed font-medium">
              اتاق‌ها و سوئیت‌های هتل لوکسوریا با معماری مدیترانه‌ای، جدیدترین امکانات رفاهی روز دنیا و چشم‌اندازی بی‌انتها به اقیانوس، پناهگاه آرامش شما هستند.
            </p>
          </div>

          {/* Simple controls aligned on the left */}
          <div className="flex gap-2.5 mt-6 md:mt-0">
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 border border-[#2D2A26]/10 hover:border-[#4A5D4E]/30 bg-white hover:bg-neutral-50 rounded-full flex items-center justify-center text-[#2D2A26] hover:text-[#4A5D4E] transition cursor-pointer"
              aria-label="برو به بعدی"
              id="carousel-next-btn"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 border border-[#2D2A26]/10 hover:border-[#4A5D4E]/30 bg-white hover:bg-neutral-50 rounded-full flex items-center justify-center text-[#2D2A26] hover:text-[#4A5D4E] transition cursor-pointer"
              aria-label="برو به قبلی"
              id="carousel-prev-btn"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>

        {/* Outer container with sliding track */}
        <div className="relative px-2">
          
          {/* Inner scrolling track */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8 snap-x snap-mandatory px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {hotelRooms.map((room) => (
              <motion.div
                key={room.id}
                className="w-full sm:w-[320px] md:w-[360px] flex-shrink-0 bg-white border border-[#2D2A26]/10 rounded-3xl overflow-hidden bento-shadow snap-start flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
                whileHover={{ y: -8 }}
                id={`room-card-panel-${room.id}`}
              >
                {/* Room Image */}
                <div className="relative aspect-[3/2] overflow-hidden group">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating badging */}
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <span className="px-3 py-1 bg-white/90 border border-[#2D2A26]/10 text-[9px] font-bold text-[#4A5D4E] rounded-full">
                      {room.view}
                    </span>
                  </div>

                  {/* Quick info icon */}
                  <button
                    onClick={() => setSelectedDetailsRoom(room)}
                    className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-white/90 hover:bg-[#4A5D4E] hover:text-white text-[#2D2A26] flex items-center justify-center border border-[#2D2A26]/10 transition shadow cursor-pointer"
                    title="جزئیات اتاق"
                    id={`room-details-${room.id}`}
                  >
                    <Info size={14} />
                  </button>
                </div>

                {/* Card description details */}
                <div className="p-6 text-right flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#2D2A26] mb-2">{room.title}</h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4 font-medium">
                      {room.description}
                    </p>
                  </div>

                  {/* Pricing and Action exactly like Image structure */}
                  <div className="mt-2 space-y-4 pt-4 border-t border-stone-100">
                    <div className="text-center">
                      <span className="text-[10px] text-stone-400 block mb-0.5">شروع قیمت از</span>
                      <span className="text-lg font-bold text-[#4A5D4E] font-serif">
                        {formatPrice(room.price)}
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">به ازای هر شب اقامت مجهز</span>
                    </div>

                    <button
                      onClick={() => {
                        if (onRoomSelect) {
                          onRoomSelect(room.id);
                        } else {
                          onBookRoom(room);
                        }
                      }}
                      className="w-full py-3 bg-[#2D2A26] hover:bg-[#4A5D4E] text-white text-xs font-bold rounded-2xl transition duration-300 active:scale-98 shadow-sm cursor-pointer"
                      id={`book-now-btn-${room.id}`}
                    >
                      مشاهده و رزرو نهایی
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ROOM DETAILS OVERLAY */}
        {selectedDetailsRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => setSelectedDetailsRoom(null)}
              className="absolute inset-0 bg-[#2D2A26]/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-2xl bg-white border border-[#2D2A26]/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row text-right text-[#2D2A26]"
              dir="rtl"
            >
              {/* Media Part */}
              <div className="w-full md:w-1/2 relative min-h-[220px]">
                <img
                  src={selectedDetailsRoom.image}
                  alt={selectedDetailsRoom.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t md:bg-gradient-to-l from-white/95 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Specs part */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#2D2A26] mb-2">{selectedDetailsRoom.title}</h3>
                  <div className="flex gap-2.5 text-[10px] text-[#4A5D4E] font-black mb-4 bg-[#F5F2EE] p-2.5 rounded-xl border border-[#2D2A26]/5">
                    <span>مساحت: {selectedDetailsRoom.size.toLocaleString("fa-IR")} متر</span>
                    <span className="text-stone-300">|</span>
                    <span>ظرفیت: {selectedDetailsRoom.capacity.toLocaleString("fa-IR")} نفر</span>
                    <span className="text-stone-300">|</span>
                    <span>{selectedDetailsRoom.view}</span>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed mb-4 font-medium">
                    {selectedDetailsRoom.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="block text-xs font-bold text-[#2D2A26]">امکانات رفاهی ممتاز:</span>
                    {selectedDetailsRoom.amenities.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                        <span className="w-1.5 h-1.5 bg-[#4A5D4E] rounded-full shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-stone-100 items-center">
                  <div className="text-right flex-1">
                    <span className="text-[10px] text-stone-400 block">شروع نرخ پایه:</span>
                    <span className="text-base font-bold text-[#4A5D4E] font-serif">{formatPrice(selectedDetailsRoom.price)}</span>
                  </div>
                  <button
                    onClick={() => {
                      const r = selectedDetailsRoom;
                      setSelectedDetailsRoom(null);
                      onBookRoom(r);
                    }}
                    className="px-5 py-3 bg-[#2D2A26] hover:bg-[#4A5D4E] text-white text-xs font-bold rounded-2xl transition cursor-pointer"
                    id="room-modal-view-book-btn"
                  >
                    رزرو فوری اتاق
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
}
