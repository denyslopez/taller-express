"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ClientEffects() {
  useEffect(() => {
    // Check if user prefers reduced motion (accessibility check)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // SSR safety check
    if (typeof window === "undefined") return;

    // 1. Text split character stagger animation (.te-anime-text)
    const textElements = document.querySelectorAll(".te-anime-text");
    textElements.forEach((element) => {
      // Prevent double splitting if component re-renders
      if (element.querySelector(".te-split-char")) return;

      const text = element.textContent || "";
      const words = text.trim().split(/\s+/);
      element.innerHTML = words
        .map((word) => {
          const chars = word
            .split("")
            .map(
              (char) =>
                `<span class="te-split-char" style="display:inline-block">${char}</span>`
            )
            .join("");
          return `<span class="te-word" style="display:inline-block;white-space:nowrap">${chars}</span>`;
        })
        .join('<span style="display:inline-block">&nbsp;</span>');

      const chars = element.querySelectorAll(".te-split-char");
      gsap.set(chars, { opacity: 0, x: 30 });

      gsap.to(chars, {
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.5)",
        stagger: 0.02,
      });
    });


    // 2. Elements animation from bottom (.te-anime-top)
    const animTopElements = document.querySelectorAll(".te-anime-top");
    if (animTopElements.length > 0) {
      gsap.fromTo(
        animTopElements,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: animTopElements[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
        }
      );
    }

    // 3. Elements animation from left (.te-anime-left)
    const animLeftElements = document.querySelectorAll(".te-anime-left");
    animLeftElements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: -40 },
        {
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    });

    // Cleanup: destroy scroll triggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
