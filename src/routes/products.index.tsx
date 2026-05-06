import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Loader2 } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import PageHeader from "@/components/PageHeader";
import { getCategories, productsByCategory, type Category } from "@/data/catalog";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Shapline Industry | Surgical Beauty Instruments" },
      { name: "description", content: "Browse our full catalog: barber shears, thinning scissors, nail and cuticle tools, tweezers, and nippers. B2B export from Sialkot." },
      { property: "og:title", content: "Our Products — Shapline Industry" },
      { property: "og:description", content: "Precision surgical beauty instruments. Inquire on WhatsApp for pricing and export." },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const [cats, setCats] = useState<Category[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const c = await getCategories();
        setCats(c);
        const countsObj: Record<string, number> = {};
        for (const cat of c) {
          const items = await productsByCategory(cat.slug);
          countsObj[cat.slug] = items.length;
        }
        setCounts(countsObj);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError("UNKNOWN_ERROR");
      } finally {
        setLoading(false);
      }
    }
    const refresh = () => load();
    load();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", refresh);
      window.addEventListener("shapline_products_updated", refresh as EventListener);
      window.addEventListener("productsUpdated", refresh as EventListener);
      return () => {
        window.removeEventListener("storage", refresh);
        window.removeEventListener("shapline_products_updated", refresh as EventListener);
        window.removeEventListener("productsUpdated", refresh as EventListener);
      };
    }
  }, []);

  if (loading) {
    return (
      <SiteShell>
        <PageHeader title="OUR PRODUCTS" subtitle="Precision Surgical Beauty Instruments" crumbs={[{ label: "Products" }]} />
        <section className="py-20 bg-charcoal">
          <div className="flex flex-col items-center justify-center py-24 text-steel">
            <Loader2 className="size-12 animate-spin text-electric mb-4" />
            <p className="font-bebas text-2xl tracking-widest uppercase">Loading Categories...</p>
          </div>
        </section>
      </SiteShell>
    );
  }

  if (error) {
    return (
      <SiteShell>
        <PageHeader title="OUR PRODUCTS" subtitle="Precision Surgical Beauty Instruments" crumbs={[{ label: "Products" }]} />
        <section className="py-20 bg-charcoal">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="bg-red-500/10 border border-red-500/20 p-8 text-center rounded-lg">
              <p className="font-bebas text-3xl text-red-500 mb-4 tracking-widest">COULD NOT LOAD PRODUCTS</p>
              <button onClick={() => window.location.reload()} className="bg-electric text-white px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-electric-glow transition-colors">
                Retry
              </button>
            </div>
          </div>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <PageHeader
        title="OUR PRODUCTS"
        subtitle="Precision Surgical Beauty Instruments — Sialkot, Pakistan"
        crumbs={[{ label: "Products" }]}
      />
      <section className="py-20 bg-charcoal">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/10">
            {cats.map((c, i) => {
              const count = counts[c.slug] ?? 0;
              return (
                <Link
                  key={c.slug}
                  to="/products/$slug"
                  params={{ slug: c.slug }}
                  className="group relative bg-slate-dark aspect-[4/5] overflow-hidden block"
                >
                  <img src={c.cover} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
                  <div className="absolute inset-0 bg-electric/0 group-hover:bg-electric/10 transition-colors" />
                  <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest text-electric">
                    {String(i + 1).padStart(2, "0")} / {String(cats.length).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <h3 className="font-bebas text-2xl md:text-3xl text-white leading-tight mb-2">{c.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-steel/70">{count} Products</span>
                      <span className="inline-flex items-center gap-1 text-electric text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Browse <ArrowRight className="size-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
