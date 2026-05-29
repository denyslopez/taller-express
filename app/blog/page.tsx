import { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import BlogListClient from "@/components/sections/BlogListClient";

export const revalidate = 3600; // ISR - revalidate cache every hour

export const metadata: Metadata = {
  title: "Artículos y Consejos",
  description:
    "Aprende sobre mantenimiento, precios y cuidado de tu vehículo con guías prácticas sin tecnicismos en El Salvador.",
};

export default async function BlogPage() {
  const articles = await getAllArticles();

  return (
    <section className="py-16 px-8 bg-te-bg min-h-[80vh]">
      <div className="max-w-[1280px] mx-auto w-full flex flex-col items-center">
        {/* Page Header */}
        <div className="text-center max-w-2xl flex flex-col gap-4 mb-16 te-anime-top">
          <span className="font-body text-[12px] font-bold uppercase tracking-widest text-te-orange">
            Blog Editorial
          </span>
          <h1 className="font-display font-semibold text-[2.25rem] md:text-[3.125rem] leading-tight text-white tracking-tight">
            Artículos y Consejos
          </h1>
          <p className="font-body text-zinc-400 text-sm md:text-base leading-relaxed">
            Explicaciones sencillas, rangos reales de costos y guías de mantenimiento hechas específicamente para el conductor en El Salvador.
          </p>
        </div>

        {/* Client side filtrable list */}
        <BlogListClient initialArticles={articles} />
      </div>
    </section>
  );
}
