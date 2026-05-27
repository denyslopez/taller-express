import SectionTitle from "@/components/ui/SectionTitle";
import ArticleCard from "@/components/cards/ArticleCard";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
}

interface ArticlesGridProps {
  articles: Article[];
}

export default function ArticlesGrid({ articles }: ArticlesGridProps) {
  return (
    <section className="py-[120px] px-8 bg-te-bg max-w-[1280px] mx-auto w-full">
      <SectionTitle
        title="Lo último"
        description="Contenido fresco para mantenerte al día con tu carro."
        viewMoreHref="/blog"
        viewMoreLabel="Ver todos"
      />

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="w-full py-16 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[28px] bg-white/[0.01]">
          <p className="font-body text-te-muted text-[14.4px]">
            No hay artículos disponibles por el momento.
          </p>
        </div>
      )}
    </section>
  );
}
