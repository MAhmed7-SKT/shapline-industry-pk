import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Mail, ZoomIn, Loader2 } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductImage from "@/components/ProductImage";
import { getCategory, getProduct, productsByCategory, type Product, type Category } from "@/data/catalog";
import { productInquiryMessage } from "@/lib/whatsapp";

export const Route = createFileRoute("/products/$slug/$id")({
  loader: async ({ params }) => {
    const cat = await getCategory(params.slug);
    if (!cat) throw notFound();
    return { cat, productId: params.id };
  },
  component: ProductPage,
});

function ProductPage() {
  const { cat, productId } = Route.useLoaderData() as { cat: Category; productId: string };
  const [p, setP] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState<string>("");
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const product = await getProduct(productId);
        if (!product || product.categorySlug !== cat.slug) {
          setLoading(false);
          return;
        }
        setP(product);
        setSize(product.sizes[0]);
        const rel = await productsByCategory(cat.slug);
        setRelated(rel.filter((x) => x.id !== product.id).slice(0, 4));
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
  }, [productId, cat.slug]);

  if (loading) {
    return (
      <SiteShell>
        <PageHeader title="LOADING PRODUCT..." />
        <div className="flex flex-col items-center justify-center py-24 text-steel">
          <Loader2 className="size-12 animate-spin text-electric mb-4" />
        </div>
      </SiteShell>
    );
  }

  if (error) {
    return (
      <SiteShell>
        <PageHeader title="SOMETHING WENT WRONG" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-24">
          <div className="bg-red-500/10 border border-red-500/20 p-8 text-center rounded-lg">
            <p className="font-bebas text-3xl text-red-500 mb-4 tracking-widest">COULD NOT LOAD PRODUCT</p>
            <button onClick={() => window.location.reload()} className="bg-electric text-white px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-electric-glow transition-colors">
              Retry
            </button>
          </div>
        </div>
      </SiteShell>
    );
  }

  if (!p) {
    return (
      <SiteShell>
        <PageHeader title="PRODUCT NOT FOUND" />
        <div className="py-24 text-center">
          <Link to="/products" className="text-electric underline">Back to products</Link>
        </div>
      </SiteShell>
    );
  }

  const message = productInquiryMessage({ name: p.name, artNo: p.artNo, size });
  const mailto = `mailto:export@shapline.com?subject=${encodeURIComponent(`Inquiry: ${p.name} (${p.artNo})`)}&body=${encodeURIComponent(message)}`;

  const next = () => setImgIdx((i) => (i + 1) % p.images.length);
  const prev = () => setImgIdx((i) => (i - 1 + p.images.length) % p.images.length);

  return (
    <SiteShell>
      <PageHeader
        title={p.name.toUpperCase()}
        subtitle={`Art No: ${p.artNo}`}
        crumbs={[
          { label: "Products", to: "/products" },
          { label: cat.name, to: `/products/${cat.slug}` as never },
          { label: p.artNo },
        ]}
      />

      <section className="py-16 md:py-24 bg-charcoal border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-[3fr_2fr] gap-12">
          {/* Gallery */}
          <div>
            <div
              className="relative bg-white aspect-square overflow-hidden group cursor-zoom-in"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
            >
              <div className={`w-full h-full transition-transform duration-500 ${zoom ? "scale-150" : "scale-100"}`}>
                <ProductImage productId={`${p.id}-${imgIdx}`} />
              </div>
              <button onClick={prev} aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 size-12 grid place-items-center bg-charcoal/80 text-white hover:bg-electric transition-colors">
                <ChevronLeft className="size-5" />
              </button>
              <button onClick={next} aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 size-12 grid place-items-center bg-charcoal/80 text-white hover:bg-electric transition-colors">
                <ChevronRight className="size-5" />
              </button>
              <div className="absolute top-4 right-4 size-10 grid place-items-center bg-charcoal/80 text-white">
                <ZoomIn className="size-4" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {p.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`aspect-square overflow-hidden border-2 transition-colors ${imgIdx === i ? "border-electric" : "border-white/10 hover:border-white/30"}`}
                >
                  <ProductImage productId={`${p.id}-${i}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="inline-block text-[10px] font-mono px-2 py-1 bg-electric/10 border border-electric/30 text-electric uppercase tracking-widest mb-4">
              Art No: {p.artNo}
            </div>
            <h1 className="font-bebas text-4xl md:text-5xl text-white leading-tight mb-3">{p.name}</h1>
            <p className="font-playfair italic text-electric mb-6">{cat.name}</p>
            <p className="text-steel/80 leading-relaxed mb-8">{p.description}</p>

            <div className="mb-8">
              <div className="text-[10px] uppercase tracking-[0.3em] text-steel/60 mb-3">Available Sizes</div>
              <div className="flex flex-wrap gap-2">
                {p.sizes.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 text-sm font-mono border transition-colors ${size === s ? "bg-electric border-electric text-white" : "border-white/15 text-steel hover:border-electric"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="text-[10px] uppercase tracking-[0.3em] text-steel/60 mb-3">Material</div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-white border border-white/15 px-4 py-2">
                {p.material}
              </span>
            </div>

            <div className="space-y-3">
              <WhatsAppButton message={message} label="Inquire on WhatsApp" size="lg" className="w-full !text-base" />
              <a href={mailto} className="w-full inline-flex items-center justify-center gap-2 border border-white/15 text-white px-6 py-4 text-xs font-bold uppercase tracking-widest hover:border-electric hover:text-electric transition-colors">
                <Mail className="size-4" /> Send Email Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-dark">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <h2 className="font-bebas text-3xl md:text-5xl text-white mb-8">RELATED PRODUCTS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((r) => (
                <Link key={r.id} to="/products/$slug/$id" params={{ slug: cat.slug, id: r.id }} className="group">
                  <div className="aspect-square overflow-hidden">
                    <ProductImage productId={r.id} />
                  </div>
                  <div className="mt-3">
                    <div className="text-[10px] font-mono text-electric uppercase tracking-widest">{r.artNo}</div>
                    <div className="font-bebas text-lg text-white leading-tight">{r.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
