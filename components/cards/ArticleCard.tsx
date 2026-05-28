import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface ArticleCardProps {
  article: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    ogImage?: string;
    author?: string;
    authorImage?: string;
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  // Format category name for human readable view
  const categoryNames: Record<string, string> = {
    educacion: "Educación",
    costos: "Precios",
    confianza: "Confianza",
    comunidad: "Comunidad",
  };

  const formattedDate = article.date
    ? format(parseISO(article.date), "dd MMM, yyyy", { locale: es })
    : "";

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group te-anime-top relative block w-full rounded-[32px] cursor-pointer pb-28 sm:pb-32"
    >
      {/* Outer Card / Background Image Container */}
      <div className="relative w-full aspect-[1.2/1] rounded-[32px] overflow-hidden border border-te-glass-border/30 shadow-xl bg-te-bg-alt">
        <Image
          src={article.ogImage || "/images/blog/default.jpg"}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority
        />
        {/* Overlay gradient to darken bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/5 transition-opacity duration-500 group-hover:from-black/75" />

        {/* Floating Category Badge (Top Left) */}
        <div className="absolute top-6 left-6 z-10">
          <span className="inline-block px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-widest rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-te-orange shadow-sm">
            {categoryNames[article.category] || article.category}
          </span>
        </div>
      </div>

      {/* Floating Glassmorphism Panel: Positioned absolutely, overflowing the bottom edge by -70px / -100px */}
      <div className="absolute bottom-6 sm:bottom-8 left-4 right-4 sm:left-6 sm:right-6 z-10 bg-te-bg-alt/45 dark:bg-te-bg-alt/45 backdrop-blur-xl border border-te-glass-border/40 rounded-[24px] p-5 md:p-6 flex flex-col gap-3 shadow-2xl transition-all duration-500 group-hover:bg-te-bg-alt/55">
        
        {/* Title */}
        <h3 className="font-display font-semibold text-lg md:text-[20px] leading-snug text-te-text tracking-tight line-clamp-2 transition-colors duration-300 group-hover:text-te-orange">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="font-body text-[13px] text-te-muted/95 leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        {/* Footer Metadata & Author Info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-t border-te-glass-border/20 pt-4 mt-1">
          {/* Author Avatar */}
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-te-glass-border/30 shrink-0">
            <Image
              src={article.authorImage || "/images/author-1.png"}
              alt={article.author || "Taller Express"}
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          {/* Author Name */}
          <span className="font-body text-[12px] font-bold text-te-text shrink-0">
            {article.author || "Taller Express"}
          </span>
          {/* Divider Bullet */}
          <span className="text-te-muted/40 text-[10px] shrink-0">●</span>
          {/* Date */}
          <span className="font-body text-[11px] text-te-muted shrink-0">
            {formattedDate}
          </span>
          {/* Divider Bullet */}
          <span className="text-te-muted/40 text-[10px] hidden xs:inline shrink-0">●</span>
          {/* Read Time */}
          <span className="font-body text-[11px] text-te-muted hidden xs:inline shrink-0">
            {article.readTime}
          </span>
        </div>
      </div>

      {/* Floating Corner Arrow Button: Positioned on the glass card's bottom corner border overlap */}
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-12 h-12 rounded-full border border-te-glass-border/80 bg-[#0c1328]/95 dark:bg-[#0c1328]/95 text-te-text transition-all duration-300 group-hover:bg-te-orange group-hover:text-te-bg-alt group-hover:scale-105 z-20 shadow-xl flex items-center justify-center">
        <svg
          className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M13.75 6.75L19.25 12L13.75 17.25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 12H4.75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
}
