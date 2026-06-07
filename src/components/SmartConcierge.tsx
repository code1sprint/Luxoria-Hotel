/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Crown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

const PREDEFINED_PROMPTS = [
  { id: "p1", text: "تعرفه اتاق‌ها؟", keyword: "اتاق" },
  { id: "p2", text: "ساعت کار اسپا؟", keyword: "استخر" },
  { id: "p3", text: "ترانسفر فرودگاهی؟", keyword: "ترانسفر" },
  { id: "p4", text: "منوی رستوران؟", keyword: "رستوران" },
  { id: "p5", text: "ساعت تخلیه اتاق؟", keyword: "ساعت" }
];

export default function SmartConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-init",
      sender: "ai",
      text: "سلام و درود شاهانه خدمت شما مهمان گرانقدر هتل بین‌المللی لوکسوریا. من «کیان» کانسیرژ هوشمند و مشاور تفریحی اقامت شما هستم. چطور می‌توانم رویای اقامت شما را برآورده سازم؟",
      timestamp: "پذیرش"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const getKnowledgeResponse = (text: string): string => {
    const q = text.toLowerCase();
    
    if (q.includes("اتاق") || q.includes("رزرو") || q.includes("قیمت") || q.includes("هزینه")) {
      return "هتل لوکسوریا دارای ۴ تیپ واحد اقامتی مجلل می‌باشد:\n۱. اتاق استاندارد دبل معادل ۲.۵ میلیون تومان آغاز نرخ\n۲. اتاق لوکس با تراس رو به دریا معادل ۴.۵ میلیون تومان\n۳. سوئیت رویال ۸۵ متری با جکوزی و مینی‌بار دبل معادل ۸.۵ میلیون تومان\n۴. ویلای اختصاصی ساحلی با استخر آب‌گرم اختصاصی معادل ۱۵ میلیون تومان.\nجهت ثبت واچر نهایی کافیست روی دکمه‌ی «مشاهده و رزرو» اتاق دلخواه کلیک کنید.";
    }
    
    if (q.includes("استخر") || q.includes("اسپا") || q.includes("سونا") || q.includes("ماساژ")) {
      return "خدمات آرامش‌بخش مرکز اسپا روزانه فعال است:\n- سانس بانوان گرامی: ۱۰:۰۰ صبح الی ۱۵:۰۰ عصر\n- سانس آقایان محترم: ۱۶:۰۰ عصر الی ۲۲:۰۰ شب\nاستفاده از سونا، جکوزی، اینفینیتی استخر و حمام سنتی ترکی برای مراجعین مقیم هتل کاملاً رایگان است. جزییات رزرو ماساژ تخصصی را می‌توانید با کلیک بر روی منوی امکانات استعلام نمایید.";
    }
    
    if (q.includes("ترانسفر") || q.includes("فرودگاه") || q.includes("بی‌ام‌و") || q.includes("ماشین") || q.includes("خودرو")) {
      return "بله، ترانسفر فرودگاهی مجلل با خودروهای بی‌ام‌و و لندروور برای سوئیت‌های رویال و ویلاهای ساحلی ما بدون کارمزد اضافی ارائه می‌شود. راننده تشریفاتی شخصی با تابلوی نام شما منتظرتان خواهد بود. لطفاً ساعت پرواز را در فیلد رزرو نهایی یادداشت نمایید.";
    }
    
    if (q.includes("رستوران") || q.includes("غذا") || q.includes("کباب") || q.includes("کافه") || q.includes("صبحانه")) {
      return "رستوران خلیجی لوکسوریا با منوی ممتاز آماده پذیرایی است:\n- کباب برگ سلطنتی: ۶۸۰ هزار تومان\n- ماهی سالمون گریل نروژی: ۵۹۰ هزار تومان\n- ماکتل زعفران بهارنارنج دبل: ۹۵ هزار تومان\n- قهوه اسپرسو عربیکا: ۹۵ هزار تومان\nسفارش به صورت ۲۴ ساعته درون اتاق شما (روم‌سرویس) قابل سرو می‌باشد. بوفه صبحانه نیز روزانه از ساعت ۷:۰۰ الی ۱۰:۳۰ مهیا است.";
    }
    
    if (q.includes("ساعت") || q.includes("تحویل") || q.includes("ورود") || q.includes("خروج") || q.includes("تخلیه")) {
      return "ساعت استاندارد تحویل اتاق‌ها در هتل لوکسوریا به شرح زیر است:\n- تحویل اتاق‌ها (Check-In) در راس ساعت ۱۴:۰۰ ظهر صورت می‌گیرد.\n- تخلیه اتاق‌ها (Check-Out) در ساعت ۱۲:۰۰ ظهر انجام می‌شود.\nپذیرش اداری هتل به صورت ۲۴ ساعته آماده هماهنگی دیرهنگام یا زودهنگام شماست.";
    }

    if (q.includes("برنامه") || q.includes("تفریح") || q.includes("تور") || q.includes("کاتاماران") || q.includes("کویر")) {
      return "پکیج‌های تفریحی ویژه مهمانان مقیم عبارتند از:\n۱. گشت آبی قایق کاتاماران: ۵ ساعت عصرگاهی همراه مینی بار و غواصی معادل ۲.۲ میلیون تومان\n۲. آفرود کویر گرگ و میش به همراه تلسکوپ سلسترون معادل ۱.۸ میلیون تومان.\nبرای نهایی کردن تفریح روی گزینه «رزرو آنلاین» در بخش تفریحات کلیک فرمایید.";
    }

    return "پیغام شما در دبیرخانه تشریفات هتل لوکسوریا قرار گرفت. کادر مجرب کانسیرژ آمادگی کاملی برای تدارک بوفه چیده‌شده، روم‌سرویس، اسپا، یا لندروور خودروی شما دارند. در صورت نیاز می‌توانید با پذیرش هتل تماس حاصل فرمایید یا مجدداً با کلمات کلیدی دیگری مانند (اتاق، اسپا، رستوران، پرواز) بپرسید.";
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    const reply = getKnowledgeResponse(text);

    // Simulate luxury concierge reading & composing reply
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: reply,
        timestamp: new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 text-right" dir="rtl">
      {/* Floating expandable button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#2D2A26] hover:bg-[#4A5D4E] text-white rounded-full shadow-2xl flex items-center justify-center border border-white/10 select-none relative cursor-pointer font-bold"
        id="smart-concierge-floating-button"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
        
        {/* Notification badge */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#4A5D4E] text-[10px] text-white font-bold flex items-center justify-center rounded-full animate-bounce">
            ۱
          </div>
        )}
      </motion.button>

      {/* Main chat interface pane */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            className="absolute bottom-16 left-0 w-[350px] sm:w-[380px] bg-white border border-[#2D2A26]/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
            id="smart-concierge-chat-panel"
          >
            {/* Header */}
            <div className="bg-[#2D2A26] p-4 flex justify-between items-center text-white select-none">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-white/10 border border-white/5 rounded-2xl flex items-center justify-center text-white">
                  <Crown size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-tight flex items-center gap-1.5 font-serif">
                    کانسیرژ هوشمند کیان
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-ping" />
                  </h3>
                  <p className="text-[9px] text-[#E2DFD9] font-medium mt-0.5">مشاور تفریحی و اقامتی لوکسوریا</p>
                </div>
              </div>

              {/* Close Button Inside */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages Area Track */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar bg-[#F5F2EE]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-start gap-2.5`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-7 h-7 rounded-xl bg-white border border-[#2D2A26]/5 text-[#4A5D4E] flex items-center justify-center text-xs shrink-0 mt-1 shadow-sm">
                      <Crown size={12} />
                    </div>
                  )}

                  <div className="max-w-[80%] space-y-1 text-right">
                    <div
                      className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm ${
                        msg.sender === "user"
                          ? "bg-[#4A5D4E] text-white rounded-tr-none font-bold"
                          : "bg-white border border-[#2D2A26]/5 text-[#2D2A26] rounded-tl-none whitespace-pre-line"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[8px] text-stone-400 block text-left px-1 font-semibold">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Simulated typing animation */}
              {isTyping && (
                <div className="flex justify-start items-center gap-2.5 text-right">
                  <div className="w-7 h-7 rounded-xl bg-white border border-[#2D2A26]/5 text-[#4A5D4E] flex items-center justify-center text-xs shrink-0 shadow-sm">
                    <Crown size={12} />
                  </div>
                  <div className="bg-white border border-[#2D2A26]/5 text-stone-500 text-xs px-3 py-2 rounded-2xl flex items-center gap-1 rounded-tl-none shadow-sm font-semibold">
                    <span className="w-1 h-1 bg-[#4A5D4E] rounded-full animate-bounce delay-100" />
                    <span className="w-1 h-1 bg-[#4A5D4E] rounded-full animate-bounce delay-200" />
                    <span className="w-1 h-1 bg-[#4A5D4E] rounded-full animate-bounce delay-300" />
                    <span className="text-[9px] font-bold text-stone-400 pr-1 select-none">کیان در حال بررسی قوانین...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompts Helper list */}
            <div className="p-2 border-t border-stone-100 bg-white flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
              {PREDEFINED_PROMPTS.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handleSendMessage(prompt.keyword)}
                  className="px-2.5 py-1 bg-[#F5F2EE] border border-[#2D2A26]/5 hover:bg-[#2D2A26] hover:text-white text-[10px] text-stone-600 rounded-full transition whitespace-nowrap cursor-pointer block font-bold shrink-0"
                  id={`quick-prompt-${prompt.id}`}
                >
                  {prompt.text}
                </button>
              ))}
            </div>

            {/* Send Input Bar Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 bg-white border-t border-stone-100 flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder="برگه تعرفه، تفریح کاتاماران یا ساعت اسپا..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-[#F5F2EE] border border-[#2D2A26]/5 focus:border-[#4A5D4E] text-xs p-2.5 rounded-xl outline-none text-[#2D2A26] text-right font-semibold"
                id="smart-concierge-text-input"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-[#2D2A26] hover:bg-[#4A5D4E] text-white flex items-center justify-center transition shrink-0 active:scale-95 cursor-pointer"
                id="smart-concierge-send-message"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
