"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { useMailerLite } from "@/hooks/useMailerLite";

interface EmailCaptureProps {
  tag: string; // 'hero-home' | 'leadmagnet-home' | 'intriga-home' | 'end-article' | 'guia-page'
  placeholder?: string;
  cta?: string;
  variant?: "light" | "dark"; // light = home hero, blog posts, cards; dark = S5-Intriga
  showName?: boolean; // true in S4-LeadMagnet and /guia
  forceCol?: boolean; // forces a vertical flex column layout even on md/lg screens
  compact?: boolean; // reduces padding and uses rounded-[18px] instead of rounded-full
}

export default function EmailCapture({
  tag,
  placeholder = "Tu correo electrónico",
  cta = "Avisame →",
  variant = "light",
  showName = false,
  forceCol = false,
  compact = false,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { status, message, submit } = useMailerLite();

  const formType = (tag === "hero-home" || tag === "intriga-home") ? "waitlist" : "lead-magnet";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      return;
    }

    if (showName && !name.trim()) {
      return;
    }

    await submit(email, formType);
  };

  if (status === "success") {
    return (
      <div className="p-6 rounded-[18px] bg-te-orange/10 border border-te-orange/30 max-w-md w-full animate-fadeIn">
        <h3 className="font-display text-lg font-semibold text-te-text mb-1">
          {formType === "waitlist" ? "¡Listo! Te has registrado" : "¡Revisá tu correo!"}
        </h3>
        <p className="font-body text-[14px] text-te-muted">
          {message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={clsx("flex flex-col gap-3 w-full max-w-md", compact && "mx-auto")}>
      <div className={clsx("flex flex-col gap-2.5 w-full", (showName || forceCol) ? "flex-col" : "sm:flex-row")}>
        {showName && (
          <input
            type="text"
            id={`name-${tag}`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
            placeholder="Tu nombre completo"
            required
            className={clsx(
              "font-body text-[14.4px] w-full border outline-none transition-all duration-300",
              compact ? "px-5 py-3" : "px-6 py-4",
              variant === "dark"
                ? "bg-white/10 border-white/10 text-white placeholder-zinc-500 focus:border-te-orange/50 focus:bg-white/15"
                : "bg-te-input-bg border-te-input-border text-te-text placeholder-te-muted focus:border-te-orange/50 focus:bg-te-input-bg/80",
              (compact || showName) ? "rounded-[18px]" : "rounded-full"
            )}
          />
        )}

        <div className={clsx("flex gap-2.5 w-full", forceCol ? "flex-col" : "flex-col sm:flex-row")}>
          <input
            type="email"
            id={`email-${tag}`}
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            placeholder={placeholder}
            required
            className={clsx(
              "font-body text-[14.4px] border outline-none transition-all duration-300",
              forceCol ? "w-full" : "w-full sm:w-auto sm:flex-grow",
              compact ? "px-5 py-3" : "px-6 py-4",
              variant === "dark"
                ? "bg-white/10 border-white/10 text-white placeholder-zinc-500 focus:border-te-orange/50 focus:bg-white/15"
                : "bg-te-input-bg border-te-input-border text-te-text placeholder-te-muted focus:border-te-orange/50 focus:bg-te-input-bg/80",
              (compact || showName) ? "rounded-[18px]" : "rounded-full"
            )}
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className={clsx(
              "font-body font-bold text-[14.4px] text-[#111111] transition-all duration-300 select-none shrink-0",
              forceCol ? "w-full" : "w-full sm:w-auto",
              compact ? "px-5 py-3" : "px-8 py-4",
              status === "loading"
                ? "bg-te-orange/50 cursor-not-allowed"
                : "bg-gradient-to-r from-te-orange to-te-orange-hover hover:scale-102 hover:shadow-te-orange/20 shadow-md",
              (compact || showName) ? "rounded-[18px]" : "rounded-full"
            )}
          >
            {status === "loading" ? "Enviando..." : cta}
          </button>
        </div>
      </div>

      {status === "error" && (
        <p className="text-red-400 font-body text-[12.8px] px-2">{message}</p>
      )}
    </form>
  );
}
