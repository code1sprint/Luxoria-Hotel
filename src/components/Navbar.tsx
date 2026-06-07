/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Globe, Menu, X, Crown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onBookOnlineClick: () => void;
  activeSection: string;
  currentPage?: string;
  onPageChange?: (page: "landing" | "rooms-list" | "gallery-view" | "restaurant-list") => void;
}

export default function Navbar({ onBookOnlineClick, activeSection, currentPage = "landing", onPageChange }: NavbarProps) {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "صفحه اصلی", href: "#home", id: "home" },
    { label: "اتاق‌ها", href: "#rooms", id: "rooms" },
    { label: "رستوران", href: "#restaurant", id: "restaurant" },
    { label: "امکانات", href: "#amenities", id: "amenities" },
    { label: "گالری", href: "#gallery", id: "gallery" },
    { label: "تور و تفریحات", href: "#tours", id: "tours" },
    { label: "تماس با ما", href: "#contact", id: "contact" }
  ];

  const handleScroll = (id: string, href: string) => {
    setMobileMenuOpen(false);
    if (onPageChange) {
      if (id === "rooms") {
        onPageChange("rooms-list");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (id === "restaurant") {
        onPageChange("restaurant-list");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (id === "gallery") {
        onPageChange("gallery-view");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (id === "home") {
        onPageChange("landing");
        setTimeout(() => {
          document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return;
      }

      if (currentPage !== "landing") {
        onPageChange("landing");
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#F5F2EE]/90 backdrop-blur-md border-b border-[#2D2A26]/10 text-right text-[#2D2A26]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Emblem */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onPageChange?.("landing")}>
            <div className="relative flex items-center justify-center w-10 h-10 bg-[#4A5D4E] rounded-full shadow-md text-white">
              <Crown size={18} className="text-white" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            </div>
            <div className="text-right">
              <span className="block text-lg font-serif-title font-bold tracking-widest text-[#2D2A26] leading-none">LUXORIA</span>
              <span className="block text-[8px] font-bold tracking-widest text-[#4A5D4E] mt-1 uppercase">HOTEL & RESORT</span>
            </div>
          </div>

          {/* Center Navigation Links (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-7">
            {menuItems.map((item) => {
              const active = (currentPage === "landing" && activeSection === item.id) ||
                             (item.id === "rooms" && currentPage === "rooms-list") ||
                             (item.id === "restaurant" && currentPage === "restaurant-list") ||
                             (item.id === "gallery" && currentPage === "gallery-view");
              return (
                <button
                  key={item.href}
                  onClick={() => handleScroll(item.id, item.href)}
                  className={`text-xs font-bold transition relative py-2 ${
                    active ? "text-[#4A5D4E]" : "text-[#2D2A26]/80 hover:text-[#2D2A26]"
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A5D4E]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-4">
            
            {/* Lang Dropdown Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 border border-[#2D2A26]/10 rounded-full bg-white hover:bg-zinc-50 text-xs font-bold text-[#2D2A26]/80 hover:text-[#2D2A26] transition"
                id="language-dropdown-toggle"
              >
                <span>FA</span>
                <Globe size={13} className="text-stone-400" />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-28 bg-white border border-[#2D2A26]/10 rounded-xl overflow-hidden shadow-xl z-50 text-center"
                  >
                    <button
                      onClick={() => setLangOpen(false)}
                      className="w-full py-2 hover:bg-[#F5F2EE] text-xs text-[#2D2A26] block font-semibold border-b border-[#2D2A26]/5"
                    >
                      فارسی (FA)
                    </button>
                    <button
                      onClick={() => {
                        setLangOpen(false);
                        alert("زبان انگلیسی برای نگهداری فنی به صورت موقت در دسترس نیست.");
                      }}
                      className="w-full py-2 hover:bg-[#F5F2EE] text-xs text-[#2D2A26]/60 block font-semibold"
                    >
                      English (EN)
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book online Button */}
            <button
              onClick={onBookOnlineClick}
              className="px-6 py-2.5 bg-[#2D2A26] hover:bg-[#4A5D4E] text-white text-xs font-bold rounded-full shadow-md transition active:scale-95"
              id="book-online-nav-button"
            >
              رزرو آنلاین
            </button>
          </div>

          {/* Hamburger (Mobile Menu Toggle Button) */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={onBookOnlineClick}
              className="sm:hidden px-3 py-1.5 bg-[#2D2A26] text-white text-[11px] font-bold rounded-full"
              id="book-online-mobile-compact"
            >
              رزرو اتاق
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#2D2A26]/10 bg-white rounded-full text-[#2D2A26]"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#F5F2EE] border-b border-[#2D2A26]/10 px-4 pt-2 pb-6 space-y-2 text-right"
          >
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleScroll(item.id, item.href)}
                className="w-full text-right py-2 text-xs font-semibold text-[#2D2A26]/80 hover:text-[#4A5D4E] hover:bg-white/50 rounded-lg px-3 block transition"
                id={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}

            <div className="h-px bg-[#2D2A26]/10 my-4" />
            <div className="flex items-center justify-between px-3">
              <span className="text-xs text-stone-500">زبان نمایش سایت:</span>
              <span className="text-xs text-[#4A5D4E] font-bold">فارسی (FA)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
