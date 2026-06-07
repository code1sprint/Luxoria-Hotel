/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Amenities from "./components/Amenities";
import RoomsSection from "./components/RoomsSection";
import RestaurantSection from "./components/RestaurantSection";
import ToursSection from "./components/ToursSection";
import GallerySection from "./components/GallerySection";
import ReviewsSection from "./components/ReviewsSection";
import ContactSection from "./components/ContactSection";
import BookingModal from "./components/BookingModal";
import SmartConcierge from "./components/SmartConcierge";
import StackingSectionWrapper from "./components/StackingSectionWrapper";
import RoomsListPage from "./components/RoomsListPage";
import SingleRoomPage from "./components/SingleRoomPage";
import GalleryViewPage from "./components/GalleryViewPage";
import RestaurantListPage from "./components/RestaurantListPage";
import SingleRestaurantPage from "./components/SingleRestaurantPage";
import { Room } from "./types";
import { Crown, Sparkles, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [prefilledDates, setPrefilledDates] = useState<{ checkIn: string; checkOut: string; guests: number } | undefined>(undefined);

  // Dynamic Routing Page States
  const [currentPage, setCurrentPage] = useState<"landing" | "rooms-list" | "room-detail" | "gallery-view" | "restaurant-list" | "restaurant-detail">("landing");
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [activeRestaurantId, setActiveRestaurantId] = useState<string | null>(null);

  // Monitor scroll in order to update navbar active tab highlighted in user's image
  useEffect(() => {
    const handleScroll = () => {
      if (currentPage !== "landing") return;
      const sections = ["home", "rooms", "restaurant", "amenities", "gallery", "tours", "contact"];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler for Hero Search submission which opens BookingModal
  const handleHeroSearch = (searchDetails: { checkIn: string; checkOut: string; guests: number }) => {
    // Select standard room by default when search bar is clicked
    const standardRoom = {
      id: "standard",
      title: "اتاق استاندارد",
      price: 2500000,
      image: "https://images.unsplash.com/photo-1611891404724-5f9a241f1d14?auto=format&fit=crop&w=800&q=80",
      capacity: 2,
      size: 32,
      view: "نمای رو به باغ سرسبز",
      amenities: [],
      description: "اتاق‌های دیلاکس استاندارد با دکوراسیون گرم و ملایم، محیطی ایده‌آل را برای استراحت بعد از یک روز شلوغ فراهم می‌کنند."
    };
    setSelectedRoom(standardRoom);
    setPrefilledDates(searchDetails);
    setIsBookingOpen(true);
  };

  // Handler to view/book from room cards
  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EE] font-sans selection:bg-[#4A5D4E] selection:text-white text-right text-[#2D2A26]" dir="rtl">
      
      {/* Dynamic Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onBookOnlineClick={() => {
          setSelectedRoom({
            id: "standard",
            title: "اتاق استاندارد",
            price: 2500000,
            image: "https://images.unsplash.com/photo-1611891404724-5f9a241f1d14?auto=format&fit=crop&w=800&q=80",
            capacity: 2,
            size: 32,
            view: "نمای رو به باغ سرسبز",
            amenities: [],
            description: "اتاق‌های دیلاکس استاندارد با دکوراسیون گرم و ملایم، محیطی ایده‌آل را برای استراحت بعد از یک روز شلوغ فراهم می‌کنند."
          });
          setIsBookingOpen(true);
        }}
        activeSection={activeSection}
      />

      {/* Main Sections with Layered Scroll / Stacking Sections effect OR Conditional Pages */}
      <main className="relative z-10">
        {currentPage === "landing" && (
          <>
            {/* Section 1: Hero Area */}
            <StackingSectionWrapper id="home" zIndex={10} bgColor="bg-[#F5F2EE]" roundedTop={false}>
              <Hero onSearch={handleHeroSearch} />
            </StackingSectionWrapper>

            {/* Section 2: Amenities */}
            <StackingSectionWrapper id="amenities" zIndex={12} bgColor="bg-[#F5F2EE]">
              <Amenities />
            </StackingSectionWrapper>

            {/* Section 3: Accommodation units & suites */}
            <StackingSectionWrapper id="rooms" zIndex={15} bgColor="bg-[#FBFAF5]">
              <RoomsSection 
                onBookRoom={handleBookRoom} 
                onRoomSelect={(id) => {
                  setActiveRoomId(id);
                  setCurrentPage("room-detail");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </StackingSectionWrapper>

            {/* Section 4: Fine Dining restaurant */}
            <StackingSectionWrapper id="restaurant" zIndex={18} bgColor="bg-[#18221B]">
              <RestaurantSection 
                onRestaurantClick={() => {
                  setCurrentPage("restaurant-list");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </StackingSectionWrapper>

            {/* Section 5: Gallery Experience showcase */}
            <StackingSectionWrapper id="gallery" zIndex={20} bgColor="bg-[#F5F2EE]">
              <GallerySection />
            </StackingSectionWrapper>

            {/* Section 6: Excursions & tours */}
            <StackingSectionWrapper id="tours" zIndex={22} bgColor="bg-[#1A1B1F]">
              <ToursSection />
            </StackingSectionWrapper>

            {/* Section 7: Reviews panel */}
            <StackingSectionWrapper id="reviews" zIndex={25} bgColor="bg-[#FAF7F2]">
              <ReviewsSection />
            </StackingSectionWrapper>

            {/* Section 8: Location & support coordinates */}
            <StackingSectionWrapper id="contact" zIndex={28} bgColor="bg-[#2D2A26]">
              <ContactSection />
            </StackingSectionWrapper>
          </>
        )}

        {currentPage === "rooms-list" && (
          <RoomsListPage 
            onBookRoom={handleBookRoom}
            onBackToHome={() => {
              setCurrentPage("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onRoomSelect={(id) => {
              setActiveRoomId(id);
              setCurrentPage("room-detail");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {currentPage === "room-detail" && (
          <SingleRoomPage 
            roomId={activeRoomId || "royal-ocean"}
            onBookRoom={handleBookRoom}
            onBackToList={() => {
              setCurrentPage("rooms-list");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onBackToHome={() => {
              setCurrentPage("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {currentPage === "gallery-view" && (
          <GalleryViewPage 
            onBackToHome={() => {
              setCurrentPage("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {currentPage === "restaurant-list" && (
          <RestaurantListPage 
            onBackToHome={() => {
              setCurrentPage("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onOutletSelect={(id) => {
              setActiveRestaurantId(id);
              setCurrentPage("restaurant-detail");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {currentPage === "restaurant-detail" && (
          <SingleRestaurantPage 
            outletId={activeRestaurantId || "imperial-saffron"}
            onBackToList={() => {
              setCurrentPage("restaurant-list");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onBackToHome={() => {
              setCurrentPage("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

      </main>

      {/* FOOTER: Highly Polished Elegant Design */}
      <footer className="relative z-30 bg-[#2D2A26] border-t border-white/5 py-16 text-[#E2DFD9] text-xs text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="text-white" size={20} />
              <span className="text-lg font-serif-title font-bold text-white tracking-widest">LUXORIA</span>
            </div>
            <p className="text-stone-400 leading-relaxed max-w-sm font-semibold">
              مجتمع خدمات عالی هتل ۵ ستاره و تفریحگاه بین‌المللی لوکسوریا با ارائه مجهزترین خدمات گردشگری، آرامش مطلق را تقدیم حضور گرم مهمانان می‌دارد.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 hover:border-white text-stone-400 hover:text-white flex items-center justify-center transition">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 hover:border-white text-stone-400 hover:text-white flex items-center justify-center transition">
                <Facebook size={14} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3 font-semibold">
            <h4 className="text-sm font-serif-title font-bold text-white mb-2">لینک‌های ارزشمند</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-amber-200 transition">صفحه نخست سایت</a></li>
              <li><a href="#rooms" className="hover:text-amber-200 transition">واحدهای اقامتی و قیمت‌ها</a></li>
              <li><a href="#restaurant" className="hover:text-amber-200 transition">رستوران ستاره‌دار و روف‌گاردن</a></li>
              <li><a href="#amenities" className="hover:text-amber-200 transition">امکانات رفاهی و آبی اسپا</a></li>
            </ul>
          </div>

          {/* Contacts Summary */}
          <div className="space-y-3 font-semibold">
            <h4 className="text-sm font-serif-title font-bold text-white mb-2">اطلاعات کلوپ ساحلی</h4>
            <ul className="space-y-2 leading-relaxed text-stone-300">
              <li className="flex items-center gap-2"><MapPin size={12} className="text-[#4A5D4E]" /> آدرس: بلوار خلیج فارس، هتل لوکسوریا</li>
              <li className="flex items-center gap-2"><Phone size={12} className="text-[#4A5D4E]" /> پذیرش: ۰۷۶-۴۴۰۰۰۰۰۰</li>
              <li className="flex items-center gap-2"><Mail size={12} className="text-[#4A5D4E]" /> مکاتبات: info@luxoriahotel.com</li>
            </ul>
          </div>

          {/* Golden Seal of Excellence */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-3xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-amber-200 font-bold block mb-1">تضمین اعتبار لایسنس</span>
              <p className="text-[10.5px] text-stone-400 leading-relaxed font-semibold">
                تمامی واچرهای صادر شده بر روی بستر دیجیتال کانسیرژ هتل لوکسوریا، دارای تاییدیه معتبر گردشگری خلیج می‌باشند.
              </p>
            </div>
            <div className="flex gap-1.5 items-center mt-3 pt-2 text-[10px] text-amber-200 border-t border-white/10 font-bold justify-end">
              <Sparkles size={10} className="text-amber-200" />
              <span>پک طلایی گردشگری پنج‌ستاره</span>
            </div>
          </div>

        </div>

        {/* Lower bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/10 text-center text-stone-500 text-[10px] font-semibold">
          <p>© کلیه حقوق مادی و معنوی این پیش‌نویس طرح تفصیلی متعلق به هتل بین‌المللی LUXORIA می‌باشد.</p>
        </div>
      </footer>

      {/* Persistent Checkout Wizard Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        room={selectedRoom}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedRoom(null);
        }}
        prefilledDates={prefilledDates}
      />

      {/* Elegant AI Chatbot Assistant floating widget */}
      <SmartConcierge />

    </div>
  );
}
