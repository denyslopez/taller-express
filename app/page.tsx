import Hero from "@/components/sections/Hero";
import CategoryMarquee from "@/components/sections/CategoryMarquee";
import ArticlesGrid from "@/components/sections/ArticlesGrid";
import Pillars from "@/components/sections/Pillars";
import LeadMagnet from "@/components/sections/LeadMagnet";
import Intriga from "@/components/sections/Intriga";
import { getLatestArticles } from "@/lib/articles";

export const revalidate = 3600; // Revalidate page cache every hour

export default async function HomePage() {
  const latestArticles = await getLatestArticles(3);

  return (
    <div className="flex flex-col w-full bg-te-bg min-h-screen">
      <Hero />
      <CategoryMarquee />
      <ArticlesGrid articles={latestArticles} />
      <Pillars />
      <LeadMagnet />
      <Intriga />
    </div>
  );
}
