"use client";

import Marquee from "react-fast-marquee";

export default function CategoryMarquee() {
  const categories = [
    "Educación",
    "Precios",
    "Confianza",
    "Comunidad",
    "Mantenimiento",
    "Consejos Prácticos",
    "Ahorro inteligente",
    "Transparencia total",
  ];

  return (
    <section className="te-anime-top bg-te-bg-alt py-10 border-y border-te-glass-border overflow-hidden">
      <Marquee speed={50} pauseOnHover={true} gradient={false}>
        <div className="flex items-center gap-12 pl-12">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-4">
              {/* Category Pill */}
              <div className="font-body text-[14px] font-semibold text-te-muted border border-te-glass-border px-[19px] py-[10px] rounded-full bg-te-glass-bg select-none hover:border-te-orange hover:text-te-text hover:bg-te-glass-bg/25 transition-all duration-300">
                {cat}
              </div>

              {/* Decorative separator between pills */}
              <span className="w-1.5 h-1.5 rounded-full bg-te-orange/30 shrink-0" />
            </div>
          ))}
          {/* Repeating for smooth seamless scrolling loop */}
          {categories.map((cat, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-4">
              {/* Category Pill */}
              <div className="font-body text-[14px] font-semibold text-te-muted border border-te-glass-border px-[19px] py-[10px] rounded-full bg-te-glass-bg select-none hover:border-te-orange hover:text-te-text hover:bg-te-glass-bg/25 transition-all duration-300">
                {cat}
              </div>

              {/* Decorative separator between pills */}
              <span className="w-1.5 h-1.5 rounded-full bg-te-orange/30 shrink-0" />
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
