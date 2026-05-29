"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-te-bg/75 backdrop-blur-lg border-b border-te-glass-border flex items-center">
      {/* Desktop Navbar layout - perfectly untouched */}
      <div className="hidden md:flex w-full max-w-[1280px] mx-auto px-8 items-center justify-between">
        {/* Logo / Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 font-display text-xl md:text-2xl font-extrabold tracking-tight select-none group">
          <div className="relative w-8 h-8 md:w-9 md:h-9 transition-transform duration-300 group-hover:scale-105 shrink-0">
            <Image
              src="/images/taller-express-icon.png"
              alt="Taller Express Icon"
              fill
              sizes="(max-width: 768px) 32px, 36px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-center">
            <span className="text-te-text">Taller</span>
            <span className="text-te-orange">Express</span>
          </div>
        </Link>

        {/* Navigation Links - Desktop Only */}
        <nav className="flex items-center gap-10">
          <Link href="/blog" className="font-body text-[0.95rem] font-medium text-te-muted hover:text-te-text transition-colors duration-200">
            Artículos
          </Link>
          <Link href="/guia" className="font-body text-[0.95rem] font-medium text-te-muted hover:text-te-text transition-colors duration-200">
            La Guía
          </Link>
          <Link href="/blog?cat=comunidad" className="font-body text-[0.95rem] font-medium text-te-muted hover:text-te-text transition-colors duration-200">
            Comunidad
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-gradient-to-r from-te-orange to-te-orange-hover text-te-bg-alt font-body font-bold text-[14px] px-5 py-2.5 rounded-full shadow-md transition-all duration-300 hover:scale-102 hover:shadow-te-orange/20 shrink-0"
          >
            Síguenos
          </a>
        </div>
      </div>

      {/* Mobile Navbar layout (Magzin Design Sync) */}
      <div className="flex md:hidden w-full items-center justify-between px-6 h-full">
        {/* Left Area: Brand and Vertical Divider */}
        <div className="flex items-center gap-4 h-full">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight select-none group"
          >
            <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-105 shrink-0">
              <Image
                src="/images/taller-express-icon.png"
                alt="Taller Express Icon"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex items-center">
              <span className="text-te-text">Taller</span>
              <span className="text-te-orange">Express</span>
            </div>
          </Link>
          
          {/* Vertical divider line */}
          <div className="w-[1px] h-6 bg-te-glass-border" />
        </div>

        {/* Right Area: Theme Toggle & Hamburger */}
        <div className="flex items-center gap-4">
          <ThemeToggle isMobile />
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-te-text hover:text-te-orange transition-colors duration-300 cursor-pointer select-none outline-none group p-2 flex items-center justify-center"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? (
              // Close Icon from Magzin
              <svg 
                className="w-6 h-6 transition-transform duration-300 hover:rotate-90" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M17.25 6.75L6.75 17.25" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M6.75 6.75L17.25 17.25" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            ) : (
              // Staggered Hamburger Icon from Magzin
              <svg 
                className="w-[26px] h-[26px] fill-current transition-transform duration-300 group-hover:scale-105" 
                viewBox="0 0 26 26"
              >
                <path d="M6.5 5.19999C6.5 4.48205 7.08206 3.89999 7.8 3.89999H24.7C25.4179 3.89999 26 4.48205 26 5.19999C26 5.91794 25.4179 6.49999 24.7 6.49999H7.8C7.08206 6.49999 6.5 5.91789 6.5 5.19999ZM24.7 11.7H1.3C0.582055 11.7 0 12.2821 0 13C0 13.7179 0.582055 14.3 1.3 14.3H24.7C25.4179 14.3 26 13.7179 26 13C26 12.2821 25.4179 11.7 24.7 11.7ZM24.7 19.5H13C12.2821 19.5 11.7 20.082 11.7 20.8C11.7 21.5179 12.2821 22.1 13 22.1H24.7C25.4179 22.1 26 21.5179 26 20.8C26 20.082 25.4179 19.5 24.7 19.5Z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Overlay */}
      <div 
        className={`absolute top-20 left-0 right-0 bg-te-bg-alt/95 backdrop-blur-xl border-b border-te-glass-border py-8 px-6 flex flex-col gap-6 md:hidden transition-all duration-300 ease-in-out origin-top shadow-2xl ${
          isOpen ? "opacity-100 scale-y-100 translate-y-0 visible" : "opacity-0 scale-y-95 -translate-y-2 invisible"
        }`}
      >
        <nav className="flex flex-col">
          <Link 
            href="/blog" 
            onClick={() => setIsOpen(false)}
            className="font-body text-[1.1rem] font-semibold text-te-muted hover:text-te-text transition-colors duration-200 py-3.5 border-b border-te-glass-border/30 flex items-center justify-between group"
          >
            <span>Artículos</span>
            <span className="text-te-orange opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">➔</span>
          </Link>
          <Link 
            href="/guia" 
            onClick={() => setIsOpen(false)}
            className="font-body text-[1.1rem] font-semibold text-te-muted hover:text-te-text transition-colors duration-200 py-3.5 border-b border-te-glass-border/30 flex items-center justify-between group"
          >
            <span>La Guía</span>
            <span className="text-te-orange opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">➔</span>
          </Link>
          <Link 
            href="/blog?cat=comunidad" 
            onClick={() => setIsOpen(false)}
            className="font-body text-[1.1rem] font-semibold text-te-muted hover:text-te-text transition-colors duration-200 py-3.5 border-b border-te-glass-border/30 flex items-center justify-between group"
          >
            <span>Comunidad</span>
            <span className="text-te-orange opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">➔</span>
          </Link>
        </nav>
        
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center bg-gradient-to-r from-te-orange to-te-orange-hover text-te-bg-alt font-body font-bold text-[15px] py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-102 hover:shadow-te-orange/30 mt-2"
        >
          Síguenos
        </a>
      </div>
    </header>
  );
}

