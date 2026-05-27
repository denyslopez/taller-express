import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import EmailCapture from "@/components/ui/EmailCapture";
import RelatedArticles from "@/components/sections/RelatedArticles";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      locale: "es_SV",
      publishedTime: article.date,
      url: `https://tallerexpress.one/blog/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Format category name for human readable view
  const categoryNames: Record<string, string> = {
    educacion: "Educación",
    costos: "Precios",
    confianza: "Confianza",
    comunidad: "Comunidad",
  };

  const formattedDate = article.date
    ? format(parseISO(article.date), "dd 'de' MMMM, yyyy", { locale: es })
    : "";

  return (
    <article className="py-16 px-8 bg-te-bg min-h-screen">
      <div className="max-w-[680px] mx-auto w-full flex flex-col items-start">
        
        {/* Category Badge */}
        <span className="inline-block px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-wider rounded-full bg-[#ff8c1a]/12 border border-[#ff8c1a]/20 text-te-orange mb-6 te-anime-top">
          {categoryNames[article.category] || article.category}
        </span>

        {/* Article H1 Title */}
        <h1 className="te-anime-text font-display font-extrabold text-[32px] sm:text-[44px] md:text-[52px] leading-[1.1] tracking-tight text-white mb-6">
          {article.title}
        </h1>

        {/* Date & Metadata */}
        <div className="flex items-center gap-3 text-[13.5px] text-te-muted mb-8 te-anime-top">
          <span>{formattedDate}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span>Lectura de {article.readTime}</span>
        </div>

        {/* Divider */}
        <hr className="w-full border-t border-white/5 mb-10" />

        {/* Main Prose Reading Section */}
        <div className="prose w-full text-zinc-300 te-anime-top">
          <MDXRemote source={article.content} />
        </div>

        {/* Divider */}
        <hr className="w-full border-t border-white/5 my-12" />

        {/* Post-article Email Capture */}
        <div className="w-full bg-white/[0.02] border border-white/[0.05] rounded-[28px] p-8 flex flex-col items-center justify-center text-center gap-6 te-anime-top">
          <div className="flex flex-col gap-2">
            <h3 className="font-display font-bold text-xl text-white">
              ¿Te fue útil? Hay más contenido como este.
            </h3>
            <p className="font-body text-[14px] text-te-muted max-w-md">
              Regístrate y te enviaremos directamente a tu correo los mejores consejos de mantenimiento sin letra pequeña.
            </p>
          </div>
          <EmailCapture
            tag="end-article"
            placeholder="Tu correo electrónico"
            cta="Avisame →"
            variant="light"
          />
        </div>

        {/* Related Articles Component */}
        <RelatedArticles slug={slug} category={article.category} />

      </div>
    </article>
  );
}
