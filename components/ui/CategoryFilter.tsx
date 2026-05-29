"use client";

import { clsx } from "clsx";

interface CategoryFilterProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onChange,
}: CategoryFilterProps) {
  const categories = [
    { slug: "todos", label: "Todos" },
    { slug: "educacion", label: "Educación" },
    { slug: "costos", label: "Precios" },
    { slug: "confianza", label: "Confianza" },
    { slug: "comunidad", label: "Comunidad" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-start md:justify-center gap-3 w-full mb-12 py-2">
      {categories.map((cat) => {
        const isActive = selectedCategory.toLowerCase() === cat.slug.toLowerCase();
        return (
          <button
            key={cat.slug}
            type="button"
            onClick={() => onChange(cat.slug)}
            className={clsx(
              "font-body text-[13.5px] font-semibold px-5 py-2.5 rounded-full border transition-all duration-300 select-none cursor-pointer outline-none",
              isActive
                ? "bg-te-orange/12 border-te-orange text-te-orange shadow-[0_0_15px_rgba(255,140,26,0.12)] font-bold"
                : "bg-te-glass-bg border-te-glass-border text-te-muted hover:text-te-text hover:border-te-glass-border/30 hover:bg-te-glass-bg/15"
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
