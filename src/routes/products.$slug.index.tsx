import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Loader2 } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductImage from "@/components/ProductImage";
import { getCategory, productsByCategory, type Category, type Product } from "@/data/catalog";
import { productInquiryMessage } from "@/lib/whatsapp";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/products/$slug/")({
  loader: async ({ params }) => {
    const cat = await getCategory(params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.name} — Shapline Industry` },
          { name: "description", content: `${loaderData.cat.blurb} Shop ${loaderData.cat.name.toLowerCase()} from Sialkot, Pakistan. WhatsApp inquiry for export pricing.` },
          { property: "og:title", content: `${loaderData.cat.name} — Shapline Industry` },
          { property: "og:description", content: loaderData.cat.blurb },
          { property: "og:image", content: loaderData.cat.cover },
        ]
      : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <SiteShell>
      <PageHeader title="CATEGORY NOT FOUND" crumbs={[{ label: "Products", to: "/products" }, { label: "Not found" }]} />
      <div className="py-24 text-center"><Link to="/products" className="text-electric underline">Back to all products</Link></div>
    </SiteShell>
  ),
  errorComponent: () => (
    <SiteShell>
      <PageHeader title="SOMETHING WENT WRONG" />
      <div className="py-24 text-center"><Link to="/products" className="text-electric underline">Back to products</Link></div>
    </SiteShell>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData() as { cat: Category };
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const p = await productsByCategory(cat.slug);
        setItems(p);
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
  }, [cat.slug]);

  if (loading) {
    return (
      <SiteShell>
        <PageHeader title={cat.name.toUpperCase()} subtitle={cat.blurb} crumbs={[{ label: "Products", to: "/products" }, { label: cat.name }]} />
        <section className="py-16 md:py-24 bg-charcoal">
          <div className="flex flex-col items-center justify-center py-24 text-steel">
            <Loader2 className="size-12 animate-spin text-electric mb-4" />
            <p className="font-bebas text-2xl tracking-widest uppercase">Loading Products...</p>
          </div>
        </section>
      </SiteShell>
    );
  }

  if (error) {
    return (
      <SiteShell>
        <PageHeader title={cat.name.toUpperCase()} subtitle={cat.blurb} crumbs={[{ label: "Products", to: "/products" }, { label: cat.name }]} />
        <section className="py-16 md:py-24 bg-charcoal">
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
        title={cat.name.toUpperCase()}
        subtitle={cat.blurb}
        crumbs={[{ label: "Products", to: "/products" }, { label: cat.name }]}
      />
      <section className="py-16 md:py-24 bg-charcoal">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {items.length === 0 ? (
            <div className="text-center py-24 text-steel">
              <p className="font-bebas text-3xl tracking-widest uppercase mb-4">No Products Found</p>
              <Link to="/products" className="text-electric underline">Back to all products</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((p) => (
                <article key={p.id} className="group bg-slate-dark border border-white/10 hover:border-electric/40 hover:shadow-glow transition-all duration-500 hover:-translate-y-1">
                  <Link to="/products/$slug/$id" params={{ slug: cat.slug, id: p.id }} className="block aspect-square overflow-hidden">
                    <ProductImage productId={p.id} className="group-hover:scale-105 transition-transform duration-700" />
                  </Link>
                  <div className="p-6">
                    <div className="text-[10px] font-mono text-electric uppercase tracking-widest mb-2">Art No: {p.artNo}</div>
                    <h3 className="font-bebas text-2xl text-white mb-3 leading-tight">{p.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.sizes.map((s) => (
                        <span key={s} className="text-[10px] font-mono px-2 py-1 border border-white/15 text-steel rounded-sm">{s}</span>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <WhatsAppButton message={productInquiryMessage({ name: p.name, artNo: p.artNo })} label="WhatsApp Inquiry" size="sm" className="w-full" />
                      <Link to="/products/$slug/$id" params={{ slug: cat.slug, id: p.id }} className="inline-flex items-center justify-center gap-1 text-electric text-[10px] font-bold uppercase tracking-widest py-2 hover:gap-3 transition-all">
                        View Details <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
