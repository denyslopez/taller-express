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
    <div className="group te-anime-top relative block w-full rounded-[24px] select-none">
      {/* 1. Main visual container: Image with rounded corners and hidden overflow */}
      <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-white/[0.08] shadow-lg">
        <Image
          src={article.ogImage || "/images/blog/default.jpg"}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority
        />
        {/* Shadow Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Brand Category Badge (Top Left of image) */}
        <div className="absolute top-5 left-5 z-10">
          <span className="inline-block px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-te-orange shadow-sm">
            {categoryNames[article.category] || article.category}
          </span>
        </div>
      </div>

      {/* 2. Glassmorphic Overlapping Content Panel: 
          - Overflowing the bottom boundary natively using negative relative translation/margins
          - Highly translucent white glass with light border and distinct blur factor
      */}
      <div className="relative z-10 mx-4 sm:mx-6 -mt-20 bg-white/[0.03] dark:bg-white/[0.07] backdrop-blur-2xl border border-white/[0.08] dark:border-white/[0.12] rounded-[24px] p-5 sm:p-6 pr-16 sm:pr-20 flex flex-col gap-3 shadow-xl transition-all duration-300 group-hover:bg-white/[0.06] dark:group-hover:bg-white/[0.1] group-hover:border-white/[0.16]">
        
        {/* Title */}
        <Link href={`/blog/${article.slug}`} className="focus:outline-none">
          <h3 className="font-display font-semibold text-lg md:text-[20px] leading-snug text-white tracking-tight line-clamp-2 transition-colors duration-300 group-hover:text-te-orange">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="font-body text-[13px] text-zinc-400 leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        {/* Footer Metadata & Author Info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-t border-white/[0.08] pt-4 mt-1">
          {/* Author Avatar */}
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/[0.1] shrink-0">
            <Image
              src={article.authorImage || "/images/author-1.png"}
              alt={article.author || "Taller Express"}
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          {/* Author Name */}
          <span className="font-body text-[12px] font-bold text-white shrink-0">
            {article.author || "Taller Express"}
          </span>
          {/* Divider Bullet */}
          <span className="text-zinc-600 text-[10px] shrink-0">●</span>
          {/* Date */}
          <span className="font-body text-[11px] text-zinc-400 shrink-0">
            {formattedDate}
          </span>
          {/* Divider Bullet */}
          <span className="text-zinc-600 text-[10px] hidden xs:inline shrink-0">●</span>
          {/* Read Time */}
          <span className="font-body text-[11px] text-zinc-400 hidden xs:inline shrink-0">
            {article.readTime}
          </span>
        </div>

        {/* Floating Navigation Arrow Button */}
        <Link
          href={`/blog/${article.slug}`}
          className="absolute bottom-5 right-5 w-[44px] h-[44px] rounded-full border border-white/[0.12] bg-[#0c1328]/90 dark:bg-[#0c1328]/90 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-te-orange group-hover:text-te-bg-alt group-hover:scale-105 shadow-md z-20"
          aria-label="Leer artículo completo"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
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
        </Link>
      </div>
    </div>
  );
}
