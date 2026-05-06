import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import PageHeader from "@/components/PageHeader";
import featureImg from "@/assets/blog-feature.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import blog5 from "@/assets/blog-5.jpg";
import blog6 from "@/assets/blog-6.jpg";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — From Sialkot to the World | Shapline Industry" },
      { name: "description", content: "Stories on Sialkot's surgical instrument heritage, manufacturing craft and global export of professional scissors." },
      { property: "og:title", content: "From Sialkot to the World" },
      { property: "og:description", content: "Inside Sialkot's century of surgical and beauty instrument craftsmanship." },
      { property: "og:image", content: featureImg },
    ],
  }),
  component: BlogPage,
});

const featured = {
  title: "Sialkot: The Surgical Instruments Capital of the World",
  excerpt: "How a single Pakistani city quietly grew into the global heartland of surgical and beauty instrument manufacturing — and what keeps it on top.",
  date: "April 2026",
  category: "Heritage",
};

const posts = [
  { title: "How Sialkot Became the World's Scissors Manufacturing Hub", excerpt: "From colonial repair workshops to a billion-dollar export industry.", category: "Heritage", date: "Mar 2026", img: blog1 },
  { title: "The Art of EDM CNC Wire Cutting in Surgical Scissors", excerpt: "Why electric-discharge machining defines modern blade geometry.", category: "Manufacturing", date: "Mar 2026", img: blog2 },
  { title: "Why Pakistani Scissors Are Trusted by Barbers in 50+ Countries", excerpt: "Craft, price and quality — the export equation explained.", category: "Export", date: "Feb 2026", img: blog3 },
  { title: "From Raw Steel to Mirror Polish: Our Manufacturing Journey", excerpt: "The 14-step path from German billet to packed export crate.", category: "Process", date: "Feb 2026", img: blog4 },
  { title: "Quality Control Standards We Follow for Global Export", excerpt: "Forty checkpoints, two inspectors, zero compromise.", category: "Quality", date: "Jan 2026", img: blog5 },
  { title: "Sialkot's Legacy: 100 Years of Craftsmanship", excerpt: "A century of metalwork and the families that built it.", category: "Heritage", date: "Jan 2026", img: blog6 },
];

function BlogPage() {
  return (
    <SiteShell>
      <PageHeader title="FROM SIALKOT TO THE WORLD" subtitle="The legacy & glory of Pakistan's manufacturing capital" crumbs={[{ label: "Blog" }]} />

      <section className="py-16 md:py-24 bg-charcoal border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <article className="group grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative overflow-hidden aspect-[4/3] border-t-[3px] border-electric">
              <img src={featureImg} alt={featured.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex gap-3 text-[10px] uppercase tracking-[0.3em] text-electric font-bold mb-4">
                <span>Featured</span><span className="text-steel/40">·</span><span>{featured.category}</span><span className="text-steel/40">·</span><span className="text-steel/60">{featured.date}</span>
              </div>
              <h2 className="font-bebas text-4xl md:text-6xl text-white leading-none mb-6">{featured.title}</h2>
              <p className="text-steel/80 leading-relaxed mb-8">{featured.excerpt}</p>
              <a href="#" className="inline-flex items-center gap-2 text-electric text-xs font-bold uppercase tracking-widest border-b border-electric pb-1 hover:gap-4 transition-all">
                Read Article <ArrowRight className="size-4" />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-dark">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <h2 className="font-bebas text-3xl md:text-5xl text-white mb-12">LATEST STORIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((p, i) => (
              <article
                key={i}
                className="group border-t-[3px] border-electric hover:-translate-y-1 transition-all duration-500 bg-[#111827]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 text-[10px] uppercase tracking-[0.3em] text-electric font-bold mb-3">
                    <span>{p.category}</span><span className="text-steel/40">·</span><span className="text-steel/60">{p.date}</span>
                  </div>
                  <h3 className="font-bebas text-2xl text-white mb-2 leading-tight">{p.title}</h3>
                  <p className="text-sm text-steel/70 mb-5">{p.excerpt}</p>
                  <a href="#" className="inline-flex items-center gap-1 text-electric text-[10px] font-bold uppercase tracking-widest hover:gap-3 transition-all">
                    Read More <ArrowRight className="size-3" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
