import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown, Award, Globe2, Package, Sparkles, Wrench, Hammer, Scissors, Shield, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getCategories, getFeaturedProducts, getProducts } from "@/data/catalog";
import { GENERAL_INQUIRY, productInquiryMessage } from "@/lib/whatsapp";
import heroImg from "@/assets/hero-scissors.jpg";
import workshopImg from "@/assets/about-workshop.jpg";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import ProductImage from "@/components/ProductImage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shapline Industry — Surgical Beauty Scissors Made in Sialkot" },
      { name: "description", content: "Premium barber shears, thinning scissors, cuticle nippers and tweezers manufactured in Sialkot, Pakistan. B2B export to 50+ countries. Inquire on WhatsApp." },
      { property: "og:title", content: "Shapline Industry — Precision Crafted in Sialkot" },
      { property: "og:description", content: "Surgical-grade beauty instruments for professionals worldwide. WhatsApp inquiry, OEM available." },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <TrustStrip />
      <AboutIntro />
      <CategoryPreview />
      <WhyChooseUs />
      <FeaturedProducts />
      <Process />
      <Testimonials />
      <GlobalReach />
      <CtaBanner />
    </SiteShell>
  );
}

type Slide = {
  eyebrow: string;
  headline: string;
  subline: string;
  image: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Forged for the master craftsman",
    headline: "PRECISION CRAFTED IN SIALKOT",
    subline: "Premium Surgical Beauty Scissors — Exported to 50+ Countries",
    image: heroSlide1,
  },
  {
    eyebrow: "Trusted by professionals",
    headline: "FROM SIALKOT TO THE WORLD",
    subline: "Trusted by Barbers, Beauticians & Medical Professionals Globally",
    image: heroSlide2,
  },
  {
    eyebrow: "Engineered for performance",
    headline: "QUALITY YOU CAN FEEL",
    subline: "German Stainless Steel · Mirror Polish · OEM Available",
    image: heroSlide3,
  },
];

/* =================== Hero Slider =================== */
function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((v) => (v + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);
  const go = (dir: 1 | -1) =>
    setActive((v) => (v + dir + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative min-h-dvh overflow-hidden border-b border-white/10">
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${i === active ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          aria-hidden={i !== active}
        >
          <img
            src={s.image}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 to-charcoal/30" />
          <div className="absolute inset-0 technical-grid opacity-20" />

          <div className="relative max-w-[1440px] w-full mx-auto px-6 lg:px-10 h-full min-h-dvh flex items-center pt-32 pb-24">
            <div className="max-w-3xl">
              <p
                key={`eb-${i}-${active}`}
                className="font-playfair italic text-electric text-lg md:text-xl mb-6 animate-fade-up"
              >
                {s.eyebrow}
              </p>
              <h1 className="font-bebas text-[clamp(3rem,10vw,8.5rem)] leading-[0.85] tracking-tight text-white">
                {i === active && <RevealWords text={s.headline} />}
                {i !== active && <span>{s.headline}</span>}
              </h1>
              <p
                key={`sub-${i}-${active}`}
                className="mt-8 max-w-xl text-base md:text-lg text-steel/85 leading-relaxed animate-fade-up delay-500"
              >
                {s.subline}
              </p>
              <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-600">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-electric text-white px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-electric-glow transition-colors"
                >
                  Explore Products <ArrowRight className="size-4" />
                </Link>
                <WhatsAppButton message={GENERAL_INQUIRY} label="WhatsApp Us" size="lg" />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 size-12 grid place-items-center bg-charcoal/60 border border-white/15 backdrop-blur hover:border-electric hover:text-electric text-white transition-colors"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 size-12 grid place-items-center bg-charcoal/60 border border-white/15 backdrop-blur hover:border-electric hover:text-electric text-white transition-colors"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            aria-label={`Go to slide ${k + 1}`}
            className={`h-1.5 rounded-full transition-all ${active === k ? "w-10 bg-electric" : "w-3 bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 right-6 hidden md:flex z-20 items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-steel/80 border border-white/10 bg-charcoal/60 backdrop-blur px-4 py-2 rounded-full">
        🇵🇰 Made in Sialkot · Exported Globally
      </div>
    </section>
  );
}

function RevealWords({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block animate-word mr-[0.25em]"
          style={{ animationDelay: `${startDelay + i * 120}ms` }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

/* =================== Trust Strip =================== */
function TrustStrip() {
  const stats = [
    { icon: Award, n: 25, suffix: "+", label: "Years Manufacturing" },
    { icon: Package, n: 100, suffix: "+", label: "Product Variants" },
    { icon: Globe2, n: 50, suffix: "+", label: "Countries Exported" },
    { icon: Shield, n: 1, suffix: " · ISO", label: "Certified Quality" },
  ];
  return (
    <section className="bg-slate-dark border-y border-white/10 py-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-4">
            <s.icon className="size-8 text-electric shrink-0" />
            <div>
              <div className="font-bebas text-3xl md:text-4xl text-white tabular-nums">
                <Counter to={s.n} />
                <span>{s.suffix}</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-steel/70">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

/* =================== About Intro =================== */
function AboutIntro() {
  return (
    <section className="py-24 md:py-32 bg-charcoal border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute inset-0 border border-electric/30 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />
          <img src={workshopImg} alt="Sialkot workshop" loading="lazy" width={1200} height={1500} className="relative w-full aspect-[4/5] object-cover" />
        </div>
        <div>
          <p className="font-playfair italic text-electric text-lg mb-4">Our Heritage</p>
          <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none mb-6">
            PRECISION FORGED <br /> IN SIALKOT
          </h2>
          <p className="text-steel/80 leading-relaxed mb-4">
            Shapline Industry has spent more than two decades perfecting surgical and beauty instruments at the heart of Pakistan's manufacturing capital. Every blade is hand-finished by master craftsmen using high-grade German and Japanese stainless steel.
          </p>
          <p className="text-steel/80 leading-relaxed mb-8">
            Our products meet international standards and are trusted by barbers, beauticians and clinics across more than fifty countries.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 text-electric text-xs font-bold uppercase tracking-widest border-b border-electric pb-1 hover:gap-4 transition-all">
            Learn More <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =================== Category Preview =================== */
function CategoryPreview() {
  const [cats, setCats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const c = await getCategories();
        setCats(c.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-slate-dark border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-electric font-bold mb-3">Product Range</p>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight">OUR PRODUCT RANGE</h2>
          </div>
          <p className="font-playfair italic text-steel/70 max-w-md">
            Six core families, every instrument hand-finished and inspected before export.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-steel">
            <Loader2 className="size-12 animate-spin text-electric mb-4" />
            <p className="font-bebas text-2xl tracking-widest uppercase">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/10">
            {cats.map((c, i) => (
              <Link
                key={c.slug}
                to="/products/$slug"
                params={{ slug: c.slug }}
                className="group relative bg-charcoal aspect-[4/5] overflow-hidden block"
              >
                <img
                  src={c.cover}
                  alt={c.name}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                <div className="absolute inset-0 bg-electric/0 group-hover:bg-electric/15 transition-colors" />
                <div className="absolute top-6 left-6 font-bebas text-5xl text-white/20 group-hover:text-electric transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <h3 className="font-bebas text-3xl md:text-4xl text-white leading-none">{c.name}</h3>
                  <div className="mt-4 flex items-center gap-2 text-electric text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                    View Products <ArrowRight className="size-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/products" className="inline-flex items-center gap-2 border border-white/15 hover:border-electric hover:text-electric text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors">
            View All Products <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =================== Why Choose Us =================== */
function WhyChooseUs() {
  const features = [
    { icon: Scissors, title: "German Stainless Steel", body: "Finest grade surgical steel for absolute edge retention." },
    { icon: Wrench, title: "Precision Engineering", body: "EDM CNC wire-cut technology with ±0.005mm tolerance." },
    { icon: Globe2, title: "Global Export", body: "Shipped reliably to barbers and clinics in 50+ countries." },
    { icon: Sparkles, title: "Custom OEM", body: "Private label and bespoke fabrication for B2B clients." },
  ];
  return (
    <section className="py-24 md:py-32 bg-[#0D0D0D] border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-electric font-bold mb-3">Why Shapline</p>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight">UNCOMPROMISED CRAFT</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/10">
          {features.map((f, i) => (
            <div key={i} className="group bg-charcoal p-8 border-t-2 border-transparent hover:border-electric hover:-translate-y-1 transition-all duration-500">
              <f.icon className="size-8 text-electric mb-6" />
              <h3 className="font-bebas text-2xl text-white mb-3 tracking-wide">{f.title}</h3>
              <p className="text-sm text-steel/70 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== Featured Products carousel =================== */
function FeaturedProducts() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const p = await getFeaturedProducts();
        if (p.length > 0) {
          setFeatured(p);
          return;
        }
        const fallback = await getProducts();
        setFeatured(fallback.slice(0, 10));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    const refresh = () => {
      setLoading(true);
      load();
    };
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

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32 bg-charcoal border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-electric font-bold mb-3">Selected</p>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight">FEATURED PRODUCTS</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scrollBy(-1)} aria-label="Scroll left" className="size-12 grid place-items-center border border-white/15 hover:border-electric hover:text-electric transition-colors">
              <ChevronLeft className="size-5" />
            </button>
            <button onClick={() => scrollBy(1)} aria-label="Scroll right" className="size-12 grid place-items-center border border-white/15 hover:border-electric hover:text-electric transition-colors">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-steel">
            <Loader2 className="size-12 animate-spin text-electric mb-4" />
            <p className="font-bebas text-2xl tracking-widest uppercase">Loading Featured Products...</p>
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-24 text-steel">
            <p className="font-bebas text-2xl tracking-widest uppercase">No Featured Products Found</p>
          </div>
        ) : (
          <div ref={scrollerRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6 [&::-webkit-scrollbar]:hidden">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ p }: { p: { id: string; name: string; artNo: string; categorySlug: string; images: string[] } }) {
  return (
    <div className="snap-start shrink-0 w-[85vw] sm:w-[360px] group">
      <Link
        to="/products/$slug/$id"
        params={{ slug: p.categorySlug, id: p.id }}
        className="block aspect-square overflow-hidden relative"
      >
        <ProductImage productId={p.id} className="group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 ring-0 ring-electric group-hover:ring-2 transition-all" />
      </Link>
      <div className="bg-charcoal border border-t-0 border-white/10 p-5">
        <div className="text-[10px] font-mono text-electric uppercase tracking-widest mb-2">Art No: {p.artNo}</div>
        <h3 className="font-bebas text-xl text-white mb-4 leading-tight">{p.name}</h3>
        <WhatsAppButton message={productInquiryMessage({ name: p.name, artNo: p.artNo })} label="Inquire" size="sm" className="w-full" />
      </div>
    </div>
  );
}

/* =================== Process =================== */
function Process() {
  const steps = [
    { icon: Hammer, t: "Raw Material", d: "Premium German & Japanese stainless steel selected per batch." },
    { icon: Wrench, t: "EDM CNC Cutting", d: "Wire-cut precision shaping to exact blade geometry." },
    { icon: Sparkles, t: "Grinding & Sharpening", d: "Hollow ground edges, calibrated by master smiths." },
    { icon: Scissors, t: "Mirror Polishing", d: "Hand-buffed mirror finish for clinical-grade surface." },
    { icon: Shield, t: "QC & Export", d: "Forty-point inspection then sealed and shipped." },
  ];
  return (
    <section className="py-24 md:py-32 bg-slate-dark border-b border-white/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-electric font-bold mb-3">Manufacturing</p>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight">HOW WE MAKE THEM</h2>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="relative size-16 mx-auto mb-6 rounded-full bg-charcoal border border-electric/40 grid place-items-center text-electric">
                  <s.icon className="size-7" />
                  <span className="absolute -top-2 -right-2 size-6 rounded-full bg-electric text-white text-[10px] font-bold grid place-items-center">{i + 1}</span>
                </div>
                <h4 className="font-bebas text-xl text-white tracking-wide mb-2">{s.t}</h4>
                <p className="text-xs text-steel/70 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== Testimonials =================== */
function Testimonials() {
  const items = [
    { q: "Shapline's offset shears are now standard in every chair of our salon chain. Edge retention is exceptional.", n: "James Carter", c: "Carter Barber Co.", flag: "🇬🇧" },
    { q: "Reliable export partner for the past five years. Quality and finish rival anything coming out of Solingen.", n: "Mareike Bauer", c: "BeautyTools GmbH", flag: "🇩🇪" },
    { q: "Their cuticle nippers have the best jaw alignment we have tested. Clients ask for them by name.", n: "Akira Yamamoto", c: "Tokyo Nail Studio", flag: "🇯🇵" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);
  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A] border-b border-white/10">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-electric font-bold mb-3">Trusted Worldwide</p>
        <div className="font-playfair italic text-2xl md:text-3xl text-white leading-relaxed mb-8 min-h-[180px]">
          “{items[i].q}”
        </div>
        <div className="text-sm text-steel">
          <span className="text-white font-semibold">{items[i].n}</span> · {items[i].c} {items[i].flag}
        </div>
        <div className="flex gap-2 justify-center mt-8">
          {items.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} className={`h-1.5 rounded-full transition-all ${i === k ? "w-8 bg-electric" : "w-2 bg-white/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== Global Reach =================== */
function GlobalReach() {
  const dots = [
    { x: 25, y: 38, c: "USA" }, { x: 47, y: 32, c: "UK" }, { x: 50, y: 35, c: "Germany" },
    { x: 56, y: 48, c: "UAE" }, { x: 60, y: 50, c: "Pakistan" }, { x: 78, y: 42, c: "Japan" },
    { x: 85, y: 75, c: "Australia" }, { x: 47, y: 38, c: "Spain" }, { x: 28, y: 50, c: "Mexico" },
  ];
  return (
    <section className="py-24 md:py-32 bg-charcoal border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-electric font-bold mb-3">Global Reach</p>
          <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none mb-6">EXPORTING TO <span className="text-electric">50+</span> COUNTRIES</h2>
          <p className="text-steel/80 leading-relaxed max-w-lg">
            From Sialkot to studios across North America, Europe, the Middle East, Asia and Oceania — every shipment carries our unconditional craftsmanship guarantee.
          </p>
        </div>
        <div className="relative aspect-[2/1] bg-slate-dark border border-white/10">
          <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full">
            {/* Stylized world silhouette */}
            <path d="M5,30 Q15,20 25,25 T45,28 Q55,18 70,22 T95,30 L95,45 Q80,52 65,48 T40,50 Q25,55 10,48 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.2" />
            {dots.map((d, i) => (
              <g key={i}>
                <circle cx={d.x} cy={d.y} r="2" fill="var(--electric)" opacity="0.3">
                  <animate attributeName="r" values="1.5;3.5;1.5" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={d.x} cy={d.y} r="0.8" fill="var(--electric)" />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}

/* =================== CTA Banner =================== */
function CtaBanner() {
  return (
    <section className="bg-electric py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none mb-4">READY TO PLACE AN EXPORT ORDER?</h2>
        <p className="text-white/90 text-lg mb-10 font-playfair italic">
          Contact us on WhatsApp for pricing, samples and bulk inquiries.
        </p>
        <WhatsAppButton message={GENERAL_INQUIRY} label="Chat on WhatsApp" size="lg" className="!bg-white !text-whatsapp hover:!bg-charcoal hover:!text-white" />
      </div>
    </section>
  );
}
