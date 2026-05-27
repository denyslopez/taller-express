import React from "react";

export default function PDFPlaceholder() {
  return (
    <div className="relative w-[240px] h-[340px] select-none transform -rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105">
      {/* Heavy drop shadow backplate */}
      <div className="absolute inset-0 bg-[#ff8c1a]/20 blur-2xl rounded-[26px] transform scale-95 translate-y-6" />

      {/* Actual Book Content */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#ff8c1a] to-[#ffb14a] rounded-[26px] p-8 border border-white/20 shadow-te-ebook flex flex-col justify-between overflow-hidden">
        {/* Subtle background abstract graphic circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#050811]/10 blur-lg pointer-events-none" />

        {/* Ebook Header */}
        <div className="flex justify-between items-center z-10">
          <div className="font-display font-extrabold text-[14px] text-[#050811] tracking-tight">
            Taller<span className="text-white">Express</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider bg-[#050811] text-white px-2 py-0.5 rounded-md">
            Gratis
          </span>
        </div>

        {/* Ebook Graphic / Badge */}
        <div className="my-auto flex flex-col items-center justify-center gap-4 z-10">
          {/* Abstract graphic representing vehicle shield or agent badge */}
          <div className="w-16 h-16 rounded-2xl bg-[#050811] flex items-center justify-center text-[#ff8c1a] shadow-lg">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
        </div>

        {/* Ebook Footer Info */}
        <div className="flex flex-col gap-2 z-10">
          <h4 className="font-display font-extrabold text-xl text-[#050811] leading-tight tracking-tight">
            La Guía Inteligente para tu Carro
          </h4>
          <p className="font-body text-[11px] font-semibold text-[#050811]/70 leading-normal">
            Todo lo que debes entender antes de pisar el taller mecánico en El Salvador.
          </p>
          <div className="h-1 w-12 bg-[#050811] rounded mt-1" />
        </div>
      </div>
    </div>
  );
}
