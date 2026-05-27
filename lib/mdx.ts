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
    if (!data[field]) {
      throw new Error(
        `Error de validación en ${filename}: Falta el campo requerido del frontmatter '${field}'`
      );
    }
  }

  return {
    title: data.title,
    slug: data.slug,
    date: data.date,
    category: data.category,
    readTime: data.readTime,
    excerpt: data.excerpt,
    canal: data.canal || "ambos",
    segmento: data.segmento || "todos",
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
