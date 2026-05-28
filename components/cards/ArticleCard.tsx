import Link from "next/link";
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
      className="arrow-box-wrapper te-anime-top block bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] rounded-[28px] p-8 relative overflow-hidden transition-all duration-300 hover:bg-white/[0.05] hover:scale-[1.01] cursor-pointer"
    >
      <div className="flex flex-col gap-5 h-full justify-between">
        <div className="flex flex-col gap-4">
          {/* Header Row: Category Badge & Arrow Box */}
          <div className="flex items-center justify-between w-full">
            <span className="inline-block px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-wider rounded-full bg-[#ff8c1a]/12 border border-[#ff8c1a]/20 text-te-orange">
              {categoryNames[article.category] || article.category}
            </span>

            {/* Rotating Arrow Indicator */}
            <div className="arrow-box w-10 h-10 text-white flex items-center justify-center">
              <svg
                className="w-4 h-4 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Article Title */}
          <h3 className="font-display font-semibold text-xl md:text-[22px] leading-tight text-te-text line-clamp-2 tracking-tight group-hover:text-te-orange transition-colors duration-200">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="font-body text-[14.4px] text-te-muted leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        </div>

        {/* Footer Metadata */}
        <div className="flex items-center gap-4 text-[12.8px] text-te-subtle border-t border-white/5 pt-4 mt-2">
          <span>{formattedDate}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span>{article.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
