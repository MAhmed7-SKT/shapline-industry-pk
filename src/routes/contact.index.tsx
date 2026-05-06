import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  GENERAL_INQUIRY,
  whatsappLink,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_ADDRESS,
  SOCIAL_INSTAGRAM,
  SOCIAL_FACEBOOK,
} from "@/lib/whatsapp";
import { categories } from "@/data/catalog";

export const Route = createFileRoute("/contact/")({
  head: () => ({
    meta: [
      { title: "Contact — Shapline Industry | Export Inquiries" },
      { name: "description", content: "Contact Shapline Industry in Sialkot, Pakistan for B2B export pricing, samples and OEM inquiries. WhatsApp, email, and contact form." },
      { property: "og:title", content: "Get in Touch — Shapline Industry" },
      { property: "og:description", content: "Direct factory communication for export and OEM partnerships." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  country: z.string().trim().min(1, "Country required").max(80),
  email: z.string().trim().email("Invalid email").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  interest: z.string().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message required").max(1000),
});

const flags = ["🇺🇸","🇬🇧","🇩🇪","🇦🇺","🇯🇵","🇦🇪","🇨🇦","🇫🇷","🇪🇸","🇮🇹","🇧🇷","🇿🇦"];

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = schema.safeParse(Object.fromEntries(fd));
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const i of result.error.issues) errs[String(i.path[0])] = i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    // Route the inquiry through WhatsApp pre-filled message
    const d = result.data;
    const msg = `Hello SHAPLINE INDUSTRY,\n\nName: ${d.name}\nCompany: ${d.company || "-"}\nCountry: ${d.country}\nEmail: ${d.email}\nPhone: ${d.phone || "-"}\nInterest: ${d.interest || "-"}\n\n${d.message}`;
    window.open(whatsappLink(msg), "_blank");
    setSent(true);
  };

  return (
    <SiteShell>
      <PageHeader title="GET IN TOUCH" subtitle="Direct factory communication for export & OEM" crumbs={[{ label: "Contact" }]} />

      <section className="py-16 md:py-24 bg-charcoal border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
          {/* Left */}
          <div>
            <h2 className="font-bebas text-4xl md:text-5xl text-white mb-8">CONTACT DETAILS</h2>
            <ul className="space-y-5 mb-10">
              <li className="flex gap-4"><MapPin className="size-5 text-electric mt-1" /><div><div className="text-[10px] uppercase tracking-[0.3em] text-steel/60 mb-1">Address</div><div className="text-white">{CONTACT_ADDRESS}</div></div></li>
              <li className="flex gap-4"><Phone className="size-5 text-electric mt-1" /><div><div className="text-[10px] uppercase tracking-[0.3em] text-steel/60 mb-1">Phone</div><a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="text-white hover:text-electric">{CONTACT_PHONE}</a></div></li>
              <li className="flex gap-4"><Mail className="size-5 text-electric mt-1" /><div><div className="text-[10px] uppercase tracking-[0.3em] text-steel/60 mb-1">Email</div><a href={`mailto:${CONTACT_EMAIL}`} className="text-white hover:text-electric">{CONTACT_EMAIL}</a></div></li>
              <li className="flex gap-4"><Clock className="size-5 text-electric mt-1" /><div><div className="text-[10px] uppercase tracking-[0.3em] text-steel/60 mb-1">Hours</div><div className="text-white">Mon — Sat · 09:00 to 18:00 PKT</div></div></li>
            </ul>

            <div className="mb-10">
              <WhatsAppButton message={GENERAL_INQUIRY} label="Start WhatsApp Chat" size="lg" className="w-full" />
            </div>

            <div className="flex gap-3 mb-10">
              <a href={SOCIAL_INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="size-11 grid place-items-center border border-white/10 hover:bg-gradient-to-br hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5] hover:text-white hover:border-transparent transition-all">
                <Instagram className="size-4" />
              </a>
              <a href={SOCIAL_FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook" className="size-11 grid place-items-center border border-white/10 hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-all">
                <Facebook className="size-4" />
              </a>
              <a href={whatsappLink(GENERAL_INQUIRY)} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="size-11 grid place-items-center border border-white/10 hover:bg-[#25D366] hover:text-white hover:border-transparent transition-all">
                <MessageCircle className="size-4" />
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email" className="size-11 grid place-items-center border border-white/10 hover:bg-[#EA4335] hover:text-white hover:border-transparent transition-all">
                <Mail className="size-4" />
              </a>
            </div>

            <div className="aspect-[16/9] border border-white/10 overflow-hidden">
              <iframe
                title="Sialkot map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=74.45%2C32.45%2C74.60%2C32.55&layer=mapnik&marker=32.4945%2C74.5229"
                className="w-full h-full grayscale"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-dark border border-white/10 p-8 md:p-10">
            <h2 className="font-bebas text-3xl text-white mb-2">SEND AN INQUIRY</h2>
            <p className="text-sm text-steel/70 mb-8">We typically respond within one business day.</p>

            {sent ? (
              <div className="border border-electric/40 bg-electric/10 p-6 text-center">
                <MessageCircle className="size-8 text-electric mx-auto mb-3" />
                <p className="text-white font-semibold mb-2">Inquiry routed to WhatsApp</p>
                <p className="text-steel/70 text-sm">Please confirm and send the pre-filled message in the WhatsApp window.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Name *" name="name" error={errors.name} />
                <Field label="Company" name="company" />
                <Field label="Country *" name="country" error={errors.country} />
                <Field label="Email *" name="email" type="email" error={errors.email} />
                <Field label="Phone" name="phone" />
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-steel/70 mb-2">Product Interest</label>
                  <select name="interest" className="w-full bg-charcoal border border-white/10 px-3 py-3 text-sm text-white focus:outline-none focus:border-electric">
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-steel/70 mb-2">Message *</label>
                  <textarea name="message" rows={5} maxLength={1000} className="w-full bg-charcoal border border-white/10 px-3 py-3 text-sm text-white focus:outline-none focus:border-electric" />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="md:col-span-2 bg-electric text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-electric-glow transition-colors">
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Flags */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mt-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-electric font-bold mb-4">Export Markets</p>
          <div className="text-3xl md:text-4xl tracking-wider">{flags.join(" ")}</div>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.3em] text-steel/70 mb-2">{label}</label>
      <input name={name} type={type} maxLength={200} className="w-full bg-charcoal border border-white/10 px-3 py-3 text-sm text-white focus:outline-none focus:border-electric" />
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}
