import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import EmailCapture from "@/components/ui/EmailCapture";
import RelatedArticles from "@/components/sections/RelatedArticles";
import TableOfContents from "@/components/ui/TableOfContents";
import ShareWidget from "@/components/ui/ShareWidget";
import FAQAccordion from "@/components/ui/FAQAccordion";

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

const createHeadingId = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^\w\s-]/g, "") // Remove non-word characters
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

const H2 = ({ children }: { children: React.ReactNode }) => {
  const text = typeof children === "string" ? children : "";
  const id = createHeadingId(text);
  return (
    <h2 id={id} className="scroll-mt-24">
      {children}
    </h2>
  );
};

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
    ? format(parseISO(article.date), "MMMM yyyy", { locale: es })
    : "";

  // Parse H2 headings from content for TOC
  const h2Reg = /^##\s+(.*)$/gm;
  const matches = [...article.content.matchAll(h2Reg)];
  const headings = matches.map((m) => {
    const text = m[1].replace(/[*_`]/g, "").trim();
    return {
      text,
      id: createHeadingId(text),
    };
  });

  const components = {
    AnswerBox: ({ children }: { children: React.ReactNode }) => (
      <div className="bg-te-orange/8 border-l-4 border-te-orange rounded-r-[18px] p-6 mb-8 relative">
        <div className="text-[10px] font-bold uppercase tracking-widest text-te-orange mb-2.5 flex items-center gap-1.5">
          ⚡ Respuesta rápida
        </div>
        <div className="font-body text-[15px] sm:text-[16px] text-te-text leading-relaxed font-normal">
          {children}
        </div>
      </div>
    ),
    Callout: ({ type = "tip", title, children }: { type?: "tip" | "warning" | "info"; title?: string; children: React.ReactNode }) => {
      const styles = {
        tip: { border: "border-l-4 border-[#4AF5A0]", bg: "bg-[#4AF5A0]/6", icon: "💡" },
        warning: { border: "border-l-4 border-[#F5A623]", bg: "bg-[#F5A623]/6", icon: "⚠️" },
        info: { border: "border-l-4 border-[#4A9EF5]", bg: "bg-[#4A9EF5]/6", icon: "ℹ️" }
      }[type];
      return (
        <div className={`flex gap-4 p-5 rounded-[18px] my-6 ${styles.bg} ${styles.border}`}>
          <span className="text-xl shrink-0 mt-0.5">{styles.icon}</span>
          <div>
            {title && <h4 className="font-display font-semibold text-[13.5px] uppercase tracking-wider text-te-text mb-1">{title}</h4>}
            <div className="font-body text-[14.4px] text-te-muted leading-relaxed">{children}</div>
          </div>
        </div>
      );
    },
    InlineMedia: ({ src, alt, caption }: { src?: string; alt?: string; caption?: string }) => (
      <div className="w-full md:w-[42%] md:float-right md:ml-6 md:mb-6 rounded-[18px] overflow-hidden border border-te-glass-border bg-te-glass-bg p-3 flex flex-col gap-2">
        {src ? (
          <div className="relative aspect-[4/3] w-full rounded-[12px] overflow-hidden">
            <img src={src} alt={alt || caption} className="object-cover w-full h-full" />
          </div>
        ) : (
          <div className="aspect-[4/3] w-full bg-te-bg-alt border border-dashed border-te-glass-border rounded-[12px] flex flex-col items-center justify-center text-center p-4 gap-2">
            <span className="text-xl">🖼️</span>
            <span className="font-display font-bold text-[10px] uppercase tracking-wider text-te-orange">Recurso de Apoyo</span>
            <span className="font-body text-[11px] text-te-muted leading-tight">{alt || "Ilustración conceptual"}</span>
          </div>
        )}
        {caption && <span className="font-body text-[12px] text-te-subtle text-center italic">{caption}</span>}
      </div>
    ),
    FAQAccordion: ({ items }: { items: { q: string; a: string }[] }) => (
      <FAQAccordion items={items} />
    ),
    ArticleCTA: ({ title, description }: { title?: string; description?: string }) => (
      <div className="article-cta w-full bg-gradient-to-br from-te-card-start to-te-card-end border border-te-glass-border rounded-[28px] p-6 md:p-8 my-8 text-center flex flex-col items-center gap-4 relative overflow-hidden shadow-lg">
        <div className="flex flex-col gap-2 z-10">
          <div className="text-[10px] font-bold uppercase tracking-widest text-te-orange">
            📋 Recurso gratuito
          </div>
          <h3 className="font-display font-semibold text-lg md:text-[22px] tracking-tight text-te-text">
            {title || "Lo que deberías saber antes de ir al taller"}
          </h3>
          <p className="font-body text-[13.5px] text-te-muted max-w-md mx-auto">
            {description || "La guía completa del dueño inteligente. Sin tecnicismos. Sin sorpresas."}
          </p>
        </div>
        <div className="w-full flex justify-center z-10">
          <EmailCapture
            tag="article-inner-cta"
            placeholder="Tu correo electrónico"
            cta="Descargar gratis →"
            variant="light"
          />
        </div>
      </div>
    ),
    DataTable: ({ headers = [], rows = [] }: { headers?: string[]; rows?: string[][] }) => {
      const safeHeaders = headers || [];
      const safeRows = rows || [];
      return (
        <div className="overflow-x-auto border border-te-glass-border rounded-[18px] my-6">
          <table className="w-full border-collapse text-left font-body text-[13.5px] md:text-[14.4px] text-te-muted">
            <thead className="bg-te-glass-bg border-b border-te-glass-border">
              <tr>
                {safeHeaders.map((h, i) => (
                  <th key={i} className="p-4 font-display font-bold text-[10.5px] uppercase tracking-widest text-te-orange">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {safeRows.map((row, i) => (
                <tr key={i} className="border-b border-te-glass-border/40 last:border-b-0 hover:bg-te-glass-bg/10">
                  {row.map((cell, j) => (
                    <td key={j} className="p-4" dangerouslySetInnerHTML={{ __html: cell }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    table: ({ children }: { children: React.ReactNode }) => (
      <div className="overflow-x-auto border border-te-glass-border rounded-[18px] my-6">
        <table className="w-full border-collapse text-left font-body text-[13.5px] md:text-[14.4px] text-te-muted">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: { children: React.ReactNode }) => (
      <thead className="bg-te-glass-bg border-b border-te-glass-border">
        {children}
      </thead>
    ),
    tr: ({ children }: { children: React.ReactNode }) => (
      <tr className="border-b border-te-glass-border/40 last:border-b-0 hover:bg-te-glass-bg/10">
        {children}
      </tr>
    ),
    th: ({ children }: { children: React.ReactNode }) => (
      <th className="p-4 font-display font-bold text-[10.5px] uppercase tracking-widest text-te-orange">
        {children}
      </th>
    ),
    td: ({ children }: { children: React.ReactNode }) => (
      <td className="p-4">
        {children}
      </td>
    ),
    FullMedia: ({ src, alt, caption }: { src?: string; alt?: string; caption?: string }) => (
      <div className="relative w-full aspect-[16/7] rounded-[18px] overflow-hidden border border-te-glass-border my-6 bg-te-glass-bg flex flex-col items-center justify-center text-center p-6 gap-2">
        {src ? (
          <>
            <img src={src} alt={alt || caption} className="absolute inset-0 object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </>
        ) : (
          <div className="z-10 flex flex-col items-center justify-center gap-2">
            <span className="text-2xl">🎬</span>
            <span className="font-display font-bold text-[10px] uppercase tracking-wider text-te-orange">Video Ilustrativo (Fase Reveal)</span>
            <span className="font-body text-[12px] text-te-muted leading-tight max-w-sm">{alt || "Visual del proceso de mantenimiento"}</span>
          </div>
        )}
        {caption && <span className="absolute bottom-4 left-4 z-10 font-body text-[12px] text-white italic">{caption}</span>}
      </div>
    ),
    h2: H2,
  };

  return (
    <div className="min-h-screen bg-te-bg py-10 flex flex-col">
      {/* 1. Article Hero Section */}
      <header className="py-8 px-6 sm:px-8 border-b border-te-glass-border">
        <div className="max-w-[800px] mx-auto w-full flex flex-col items-start gap-4">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 font-body text-[12.8px] text-te-muted select-none">
            <Link href="/" className="hover:text-te-orange transition-colors">
              Inicio
            </Link>
            <span className="opacity-30">/</span>
            <Link href="/blog" className="hover:text-te-orange transition-colors">
              Artículos
            </Link>
            <span className="opacity-30">/</span>
            <span className="text-te-text">
              {categoryNames[article.category] || article.category}
            </span>
          </nav>

          {/* Pillar Badge */}
          <div className="inline-flex items-center gap-2 bg-te-orange/8 border border-te-orange/20 px-3 py-1.5 rounded-full select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-te-orange animate-pulse" />
            <span className="font-body text-[10px] font-bold uppercase tracking-widest text-te-orange">
              {categoryNames[article.category] || article.category}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="font-display font-semibold text-[2rem] sm:text-[2.75rem] md:text-[3.25rem] leading-[1.15] tracking-tight text-te-text max-w-3xl">
            {article.title}
          </h1>

          {/* Meta Info Row */}
          <div className="flex flex-wrap items-center gap-3 text-[13px] text-te-muted">
            <span className="font-bold text-te-text">Taller Express</span>
            <span className="opacity-35">●</span>
            <span className="capitalize">{formattedDate}</span>
            <span className="opacity-35">●</span>
            <span className="flex items-center gap-1">
              ⏱ {article.readTime}
            </span>
            <span className="opacity-35 hidden sm:inline">●</span>
            <span className="hidden sm:inline text-te-orange font-medium">
              Validado con fuentes técnicas
            </span>
          </div>

        </div>
      </header>

      {/* 2. Hero Image Banner (Below Title) */}
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 mt-8">
        <div className="relative w-full aspect-[16/7] md:aspect-[16/6] rounded-[24px] overflow-hidden border border-te-glass-border bg-gradient-to-br from-te-card-start to-te-card-end flex flex-col items-center justify-center gap-2 shadow-lg">
          {article.ogImage ? (
            <Image
              src={article.ogImage}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-center p-4">
              <span className="text-3xl">🖼️</span>
              <span className="font-display font-bold text-[11px] uppercase tracking-widest text-te-orange">IMAGE — Hero</span>
              <span className="font-body text-[12.8px] text-te-muted max-w-xs">Imagen conceptual del artículo. Ratio 16:7</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Main 2-column Grid (Article Content + Sidebar) */}
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">
        
        {/* Main Content Column */}
        <article className="prose w-full text-te-muted leading-relaxed te-anime-top">
          <MDXRemote source={article.content} components={components} />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-te-glass-border">
            <span className="font-body text-[12px] font-bold uppercase tracking-wider text-te-subtle pr-2 flex items-center">Etiquetas:</span>
            {["aceite de motor", "mantenimiento preventivo", "El Salvador", "taller confiable"].map((tag, idx) => (
              <span
                key={idx}
                className="bg-te-glass-bg border border-te-glass-border text-te-muted font-body text-[11px] px-3 py-1 rounded-full select-none"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom Ebook Form Capture */}
          <div className="article-cta w-full bg-gradient-to-br from-te-card-start to-te-card-end border border-te-glass-border rounded-[28px] p-6 md:p-8 my-8 text-center flex flex-col items-center gap-4 relative overflow-hidden shadow-lg mt-12">
            <div className="flex flex-col gap-2 z-10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-te-orange">
                📋 Recurso gratuito
              </div>
              <h3 className="font-display font-semibold text-lg md:text-[22px] tracking-tight text-te-text">
                Guía del dueño inteligente
              </h3>
              <p className="font-body text-[13.5px] text-te-muted max-w-md mx-auto">
                Lo que deberías saber antes de ir al taller. Gratis para los suscriptores de Taller Express.
              </p>
            </div>
            <div className="w-full flex justify-center z-10">
              <EmailCapture
                tag="article-footer-cta"
                placeholder="Tu correo electrónico"
                cta="Descargar ahora →"
                variant="light"
              />
            </div>
          </div>

          {/* Comments Section Placeholder */}
          <div className="bg-te-glass-bg border border-te-glass-border rounded-[24px] p-8 text-center flex flex-col items-center gap-2 mt-8 shadow-sm">
            <span className="text-2xl">💬</span>
            <h4 className="font-display font-semibold text-[15.5px] tracking-tight text-te-text">
              ¿Tienes alguna pregunta o comentario?
            </h4>
            <p className="font-body text-[13px] text-te-muted max-w-sm">
              Déjanos tu modelo de vehículo en las redes sociales de Taller Express y te orientaremos con gusto.
            </p>
          </div>

          {/* Related Articles Component */}
          <RelatedArticles slug={slug} category={article.category} />
        </article>

        {/* Sidebar Column */}
        <aside className="lg:sticky lg:top-28 flex flex-col gap-6 w-full z-20">
          
          {/* 1. Dynamic Table of Contents */}
          <TableOfContents headings={headings} />

          {/* 2. Sidebar Newsletter Signup Card */}
          <div className="sidebar-cta bg-gradient-to-br from-te-card-start to-te-card-end border border-te-glass-border rounded-[24px] p-6 text-center flex flex-col gap-4 shadow-md">
            <span className="text-2xl">📋</span>
            <div className="flex flex-col gap-1">
              <h4 className="font-display font-semibold text-[15px] tracking-tight text-te-text">
                Guía del dueño inteligente
              </h4>
              <p className="font-body text-[12.8px] text-te-muted">
                Lo que deberías saber antes de ir al taller. Gratis.
              </p>
            </div>
            <div className="w-full">
              <EmailCapture
                tag="article-sidebar"
                placeholder="Tu correo electrónico"
                cta="Descargar gratis"
                variant="light"
              />
            </div>
            <span className="font-body text-[10.5px] text-te-subtle">
              Sin spam. Puedes darte de baja cuando quieras.
            </span>
          </div>

          {/* 3. Sharing Widget */}
          <ShareWidget title={article.title} />

        </aside>

      </div>
    </div>
  );
}

