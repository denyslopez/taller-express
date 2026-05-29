"use client";

import { useState, useEffect } from "react";

interface ShareWidgetProps {
  title: string;
}

export default function ShareWidget({ title }: ShareWidgetProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy url:", err);
    }
  };

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="share-widget bg-te-glass-bg border border-te-glass-border rounded-[24px] p-5">
      <div className="share-label font-display font-semibold text-[11px] text-te-muted uppercase tracking-widest mb-4 flex items-center gap-3">
        <span>Compartir artículo</span>
        <div className="flex-grow h-[1px] bg-te-glass-border" />
      </div>
      <div className="share-buttons flex flex-col gap-2">
        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn flex items-center gap-3 bg-te-glass-bg border border-te-glass-border rounded-[14px] px-4 py-3 font-body text-[13px] text-te-text no-underline hover:border-te-orange/30 hover:bg-te-orange/6 hover:text-te-orange transition-all duration-300 select-none cursor-pointer"
        >
          <span className="text-base">📱</span>
          <span className="font-semibold">WhatsApp</span>
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn flex items-center gap-3 bg-te-glass-bg border border-te-glass-border rounded-[14px] px-4 py-3 font-body text-[13px] text-te-text no-underline hover:border-te-orange/30 hover:bg-te-orange/6 hover:text-te-orange transition-all duration-300 select-none cursor-pointer"
        >
          <span className="text-base">📘</span>
          <span className="font-semibold">Facebook</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          type="button"
          className="share-btn w-full flex items-center gap-3 bg-te-glass-bg border border-te-glass-border rounded-[14px] px-4 py-3 font-body text-[13px] text-te-text no-underline hover:border-te-orange/30 hover:bg-te-orange/6 hover:text-te-orange transition-all duration-300 select-none cursor-pointer text-left outline-none"
        >
          <span className="text-base">{copied ? "✅" : "🔗"}</span>
          <span className="font-semibold">{copied ? "¡Copiado!" : "Copiar enlace"}</span>
        </button>
      </div>
    </div>
  );
}
