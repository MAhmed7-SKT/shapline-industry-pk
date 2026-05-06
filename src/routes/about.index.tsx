import { createFileRoute } from "@tanstack/react-router";
import { Award, Crosshair, Handshake, ShieldCheck } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";

import { GENERAL_INQUIRY } from "@/lib/whatsapp";
import workshop from "@/assets/about-workshop.jpg";
import a1 from "@/assets/about-1.jpg";
import a2 from "@/assets/about-2.jpg";
import a3 from "@/assets/about-3.jpg";
import a4 from "@/assets/about-4.jpg";
import a5 from "@/assets/about-5.jpg";
import a6 from "@/assets/about-6.jpg";

const galleryTiles = [
  { img: a1, label: "Precision Cutting" },
  { img: a2, label: "Quality Inspection" },
  { img: a3, label: "Mirror Polish" },
  { img: a4, label: "Export Packaging" },
  { img: a5, label: "Quality Standards" },
  { img: a6, label: "Master Craftsmanship" },
];

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About — Shapline Industry | 25+ Years in Sialkot" },
      { name: "description", content: "Shapline Industry has crafted surgical and beauty instruments in Sialkot for over 25 years, exporting to 50+ countries with ISO-certified quality." },
      { property: "og:title", content: "Our Story — Shapline Industry" },
      { property: "og:description", content: "Heritage smithing meets modern CNC precision in the heart of Sialkot, Pakistan." },
      { property: "og:image", content: workshop },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      {/* Parallax-ish hero */}
      <section className="relative h-[80vh] flex items-end pb-20 overflow-hidden">
        <img src={workshop} alt="Sialkot workshop" className="absolute inset-0 w-full h-full object-cover scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 w-full">
          <p className="font-playfair italic text-electric text-lg mb-4 animate-fade-up">Our Story</p>
          <h1 className="font-bebas text-7xl md:text-[10rem] text-white leading-[0.85] tracking-tight animate-fade-up delay-100">
            FORGED IN <br /> SIALKOT
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-charcoal border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 border border-electric/30 translate-x-4 translate-y-4" />
            <img src={workshop} alt="Workshop craftsman" loading="lazy" className="relative w-full aspect-[4/5] object-cover" />
          </div>
          <div>
            <p className="font-playfair italic text-electric text-lg mb-4">Twenty Five Years of Craft</p>
            <h2 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-6">A LEGACY OF PRECISION</h2>
            <div className="space-y-4 text-steel/80 leading-relaxed">
              <p>Shapline Industry was founded in Sialkot, Pakistan — the city renowned worldwide for surgical and beauty instrument manufacturing.</p>
              <p>With more than twenty-five years of craftsmanship, we combine traditional metallurgical expertise with modern CNC precision technology to produce scissors trusted by barbers, beauticians and medical professionals across 50+ countries.</p>
              <p>Every blade leaves our facility hand-finished, individually inspected and ready for the most demanding professional environments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-dark border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.4em] text-electric font-bold mb-3">What We Stand For</p>
            <h2 className="font-bebas text-5xl md:text-7xl text-white">OUR VALUES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Award, t: "Quality", d: "Every instrument is hand-finished and inspected against forty separate quality checkpoints." },
              { icon: Crosshair, t: "Precision", d: "EDM CNC wire-cutting and hollow grinding deliver tolerances within ±0.005mm." },
              { icon: Handshake, t: "Trust", d: "Long-term partnerships with distributors, brands and clinics across five continents." },
            ].map((v, i) => (
              <div key={i} className="bg-charcoal border border-white/10 p-10 hover:border-electric/40 hover:-translate-y-1 transition-all duration-500">
                <v.icon className="size-8 text-electric mb-6" />
                <h3 className="font-bebas text-3xl text-white mb-3">{v.t}</h3>
                <p className="text-steel/70 leading-relaxed text-sm">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-charcoal border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.4em] text-electric font-bold mb-3">Inside the Facility</p>
            <h2 className="font-bebas text-4xl md:text-6xl text-white">MANUFACTURING GALLERY</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryTiles.map((tile, i) => (
              <div
                key={i}
                className={`relative overflow-hidden border-t-[3px] border-electric group bg-charcoal ${i === 0 ? "md:row-span-2 md:col-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}
              >
                <img src={tile.img} alt={tile.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em] text-white font-bold">{tile.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-slate-dark border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-electric font-bold mb-3">Certified Quality</p>
          <h2 className="font-bebas text-5xl md:text-6xl text-white mb-12">CERTIFICATIONS & STANDARDS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {["ISO 9001", "CE Marked", "SGS Tested", "FDA Listed"].map((b) => (
              <div key={b} className="border border-white/10 p-8 hover:border-electric transition-colors">
                <ShieldCheck className="size-10 mx-auto text-electric mb-4" />
                <div className="font-bebas text-xl text-white tracking-widest">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-electric text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bebas text-5xl md:text-6xl text-white mb-6">PARTNER WITH SHAPLINE</h2>
          <p className="text-white/90 mb-8 font-playfair italic text-lg">For OEM, private label and bulk export inquiries.</p>
          <WhatsAppButton message={GENERAL_INQUIRY} label="Chat on WhatsApp" size="lg" className="!bg-white !text-whatsapp" />
        </div>
      </section>
    </SiteShell>
  );
}
