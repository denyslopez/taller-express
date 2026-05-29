"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="faq-section mt-12 pt-10 border-t border-te-glass-border">
      <div className="faq-title font-display font-semibold text-lg md:text-[22px] tracking-tight text-te-text mb-6 flex items-center gap-4">
        <span>Preguntas frecuentes</span>
        <div className="flex-grow h-[1px] bg-te-glass-border" />
      </div>

      <div className="flex flex-col border border-te-glass-border rounded-[24px] bg-te-glass-bg overflow-hidden shadow-sm">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`faq-item border-b border-te-glass-border/40 last:border-b-0 transition-colors duration-300 ${
                isOpen ? "bg-te-glass-bg/10" : ""
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                type="button"
                className="faq-question w-full bg-none border-none cursor-pointer flex justify-between items-center px-6 py-5 gap-4 text-left font-body text-[14.4px] md:text-[15.5px] font-bold text-te-text transition-colors duration-300 hover:text-te-orange outline-none"
              >
                <span>{item.q}</span>
                <span
                  className={`faq-chevron w-[26px] h-[26px] rounded-full border border-te-glass-border flex items-center justify-center shrink-0 text-[10px] transition-all duration-300 ${
                    isOpen
                      ? "rotate-180 bg-te-orange border-te-orange text-white"
                      : "text-te-muted hover:border-te-orange/30 hover:text-te-orange"
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`faq-answer overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="faq-answer-inner px-6 pb-6 pt-1 font-body text-[13.5px] md:text-[14.4px] text-te-muted leading-relaxed">
                  {item.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
