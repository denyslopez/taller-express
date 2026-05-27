import { getRelatedArticles } from "@/lib/articles";
import ArticleCard from "@/components/cards/ArticleCard";

interface RelatedArticlesProps {
  slug: string;
  category: string;
}

export default async function RelatedArticles({ slug, category }: RelatedArticlesProps) {
  const related = await getRelatedArticles(slug, category, 2);

  if (related.length === 0) return null;

  return (
    <div className="w-full mt-20 pt-16 border-t border-white/5">
      <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-8 tracking-tight">
        Artículos relacionados
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {related.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
