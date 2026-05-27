import { getRawArticleFiles, parseArticleFile, Article } from "./mdx";

export async function getAllArticles(): Promise<Article[]> {
  const files = await getRawArticleFiles();
  const articles = await Promise.all(
    files.map(async (file) => {
      try {
        return await parseArticleFile(file);
      } catch (err) {
        console.error(`Skipping invalid article file ${file}:`, err);
        return null;
      }
    })
  );

  // Filter out any failed parses and sort by date descending
  return (articles.filter((a) => a !== null) as Article[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find((article) => article.slug === slug) || null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await getAllArticles();
  if (category.toLowerCase() === "todos") return articles;
  return articles.filter((article) => article.category.toLowerCase() === category.toLowerCase());
}

export async function getLatestArticles(limit: number): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.slice(0, limit);
}

export async function getRelatedArticles(
  slug: string,
  category: string,
  limit: number = 2
): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles
    .filter((article) => article.slug !== slug && article.category === category)
    .slice(0, limit);
}
