"use client";

import { useEffect, useState } from "react";

interface HeadingItem {
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="toc-widget bg-te-glass-bg border border-te-glass-border rounded-[24px] p-5">
      <div className="toc-label font-display font-semibold text-[11px] text-te-muted uppercase tracking-widest mb-4 flex items-center gap-3">
        <span>En este artículo</span>
        <div className="flex-grow h-[1px] bg-te-glass-border" />
      </div>
      <ul className="toc-list flex flex-col gap-1.5 list-none pl-0">
        {headings.map((heading) => (
          <li key={heading.id} className="m-0 p-0">
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                });
                setActiveId(heading.id);
              }}
              className={`block py-1.5 px-3 rounded-[12px] font-body text-[13px] transition-all duration-300 leading-normal no-underline ${
                activeId === heading.id
                  ? "text-te-orange bg-te-orange/8 font-bold border-l-2 border-te-orange pl-2"
                  : "text-te-muted hover:text-te-text hover:bg-te-glass-bg/20"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
