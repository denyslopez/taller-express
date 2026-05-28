import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: "educacion" | "costos" | "confianza" | "comunidad" | string;
  readTime: string;
  excerpt: string;
  canal?: "facebook" | "instagram" | "ambos";
  segmento?: "todos" | "mujer" | "joven" | "profesional";
  ogImage?: string;
  author?: string;
  authorImage?: string;
}

export interface Article extends ArticleFrontmatter {
  content: string;
}

// Ensure directory exists
function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

export async function parseArticleFile(filename: string): Promise<Article> {
  ensureBlogDir();
  const filePath = path.join(BLOG_DIR, filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  // Fallbacks to handle both schema variations (original CLAUDE.md and user's updated version)
  const title = data.title;
  const slug = data.slug;
  const date = data.date || data.publishedAt;
  const category = data.category;
  const readTime = data.readTime || (data.readingTime ? `${data.readingTime} min` : undefined);
  const excerpt = data.excerpt || data.description;
  const ogImage = data.ogImage || `/images/blog/${slug}-og.png`;
  const author = data.author || "Taller Express";
  const authorImage = data.authorImage || "/images/author-1.png";

  const normalizedData = {
    title,
    slug,
    date,
    category,
    readTime,
    excerpt,
    canal: data.canal || "ambos",
    segmento: data.segmento || "todos",
    ogImage,
    author,
    authorImage,
  };

  // Validate required frontmatter fields (CLAUDE.md Capa 8)
  const requiredFields: (keyof ArticleFrontmatter)[] = [
    "title",
    "slug",
    "date",
    "category",
    "readTime",
    "excerpt",
  ];

  for (const field of requiredFields) {
    if (!normalizedData[field]) {
      throw new Error(
        `Error de validación en ${filename}: Falta el campo requerido del frontmatter '${field}'`
      );
    }
  }

  return {
    ...normalizedData,
    content,
  };
}

export async function getRawArticleFiles(): Promise<string[]> {
  ensureBlogDir();
  try {
    return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
  } catch (err) {
    console.error("Error reading blog directory:", err);
    return [];
  }
}
