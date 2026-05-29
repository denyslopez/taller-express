"use client";

import React, { useState } from "react";
import { clsx } from "clsx";

interface EmailCaptureProps {
  tag: string; // 'hero-home' | 'leadmagnet-home' | 'intriga-home' | 'end-article' | 'guia-page'
  placeholder?: string;
  cta?: string;
  variant?: "light" | "dark"; // light = home hero, blog posts, cards; dark = S5-Intriga
  showName?: boolean; // true in S4-LeadMagnet and /guia
}

export default function EmailCapture({
  tag,
  placeholder = "Tu correo electrónico",
  cta = "Avisame →",
  variant = "light",
  showName = false,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset status
    setStatus("loading");
    setErrorMessage("");

    // Client-side validations
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (showName && !name.trim()) {
      setStatus("error");
      setErrorMessage("Por favor, ingresa tu nombre.");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, tag }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Ocurrió un error. Intenta nuevamente.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setStatus("error");
      setErrorMessage("Error de conexión. Intenta de nuevo más tarde.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-6 rounded-[18px] bg-te-orange/10 border border-te-orange/30 max-w-md w-full">
        <h3 className="font-display text-lg font-semibold text-te-text mb-1">
          ¡Listo! Te has registrado
        </h3>
        <p className="font-body text-[14px] text-te-muted">
          Te avisaremos en cuanto tengamos novedades. Gracias por tu confianza.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md">
      <div className={clsx("flex flex-col gap-2.5", showName ? "sm:flex-col" : "sm:flex-row")}>
        {showName && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
            placeholder="Tu nombre completo"
            required
            className={clsx(
              "font-body text-[14.4px] px-6 py-4 rounded-[18px] w-full border outline-none transition-all duration-300",
              variant === "dark"
                ? "bg-white/10 border-white/10 text-white placeholder-zinc-500 focus:border-te-orange/50 focus:bg-white/15"
                : "bg-te-input-bg border-te-input-border text-te-text placeholder-te-muted focus:border-te-orange/50 focus:bg-te-input-bg/80"
            )}
          />
        )}

        <div className="flex flex-col sm:flex-row gap-2.5 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            placeholder={placeholder}
            required
            className={clsx(
              "font-body text-[14.4px] px-6 py-4 rounded-full flex-grow border outline-none transition-all duration-300",
              variant === "dark"
                ? "bg-white/10 border-white/10 text-white placeholder-zinc-500 focus:border-te-orange/50 focus:bg-white/15"
                : "bg-te-input-bg border-te-input-border text-te-text placeholder-te-muted focus:border-te-orange/50 focus:bg-te-input-bg/80",
              showName && "rounded-[18px]" // matching border radius scales per design.md
            )}
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className={clsx(
              "font-body font-bold text-[14.4px] text-[#111111] px-8 py-4 rounded-full transition-all duration-300 select-none",
              status === "loading"
                ? "bg-te-orange/50 cursor-not-allowed"
                : "bg-gradient-to-r from-te-orange to-te-orange-hover hover:scale-102 hover:shadow-te-orange/20 shadow-md",
              showName && "rounded-[18px]" // matching border radius scales per design.md
            )}
          >
            {status === "loading" ? "Enviando..." : cta}
          </button>
        </div>
      </div>

      {status === "error" && (
        <p className="text-red-400 font-body text-[12.8px] px-2">{errorMessage}</p>
      )}
    </form>
  );
}
