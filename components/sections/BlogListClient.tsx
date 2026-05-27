"use client";

import { useState } from "react";
import CategoryFilter from "@/components/ui/CategoryFilter";
import ArticleCard from "@/components/cards/ArticleCard";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
}

interface BlogListClientProps {
  initialArticles: Article[];
}

export default function BlogListClient({ initialArticles }: BlogListClientProps) {
  const [category, setCategory] = useState("todos");

  const filteredArticles =
    category === "todos"
      ? initialArticles
      : initialArticles.filter((a) => a.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="w-full">
      {/* Client-side Category Tabs */}
      <CategoryFilter selectedCategory={category} onChange={setCategory} />

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 te-anime-top">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="w-full py-24 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[28px] bg-white/[0.01]">
          <p className="font-body text-te-muted text-[14.4px]">
            No se encontraron artículos en esta categoría.
          </p>
        </div>
      )}
    </div>
  );
}
