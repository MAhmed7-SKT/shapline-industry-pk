import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { categories } from "@/data/catalog";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  WHATSAPP_NUMBER,
  whatsappLink,
  GENERAL_INQUIRY,
} from "@/lib/whatsapp";

const socials = [
  { Icon: Instagram, href: SOCIAL_INSTAGRAM, label: "Instagram", hover: "hover:bg-gradient-to-br hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5] hover:text-white hover:border-transparent" },
  { Icon: Facebook, href: SOCIAL_FACEBOOK, label: "Facebook", hover: "hover:bg-[#1877F2] hover:text-white hover:border-transparent" },
  { Icon: MessageCircle, href: whatsappLink(GENERAL_INQUIRY), label: "WhatsApp", hover: "hover:bg-[#25D366] hover:text-white hover:border-transparent" },
  { Icon: Mail, href: `mailto:${CONTACT_EMAIL}`, label: "Email", hover: "hover:bg-[#EA4335] hover:text-white hover:border-transparent" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-slate-dark text-steel border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="font-bebas text-3xl tracking-widest text-white mb-1">SHAPLINE</div>
          <div className="text-[10px] tracking-[0.42em] uppercase text-electric font-semibold mb-4">Industry</div>
          <p className="text-sm text-steel/70 leading-relaxed mb-6 max-w-xs">
            Precision-crafted surgical & beauty instruments. Made in Sialkot, exported to 50+ countries.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2 items-start"><MapPin className="size-4 mt-0.5 text-electric" /><span>{CONTACT_ADDRESS}</span></li>
            <li className="flex gap-2 items-start"><Phone className="size-4 mt-0.5 text-electric" /><a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-electric">{CONTACT_PHONE}</a></li>
            <li className="flex gap-2 items-start"><Mail className="size-4 mt-0.5 text-electric" /><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-electric break-all">{CONTACT_EMAIL}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-electric mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-electric">Home</Link></li>
            <li><Link to="/products" className="hover:text-electric">Products</Link></li>
            <li><Link to="/blog" className="hover:text-electric">Blog</Link></li>
            <li><Link to="/about" className="hover:text-electric">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-electric">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-electric mb-6">Categories</h4>
          <ul className="space-y-2 text-sm max-h-72 overflow-hidden">
            {categories.slice(0, 10).map((c) => (
              <li key={c.slug}>
                <Link to="/products/$slug" params={{ slug: c.slug }} className="hover:text-electric">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-electric mb-6">Stay In Touch</h4>
          <p className="text-sm text-steel/70 mb-4">Follow us or send a direct WhatsApp inquiry.</p>
          <a
            href={whatsappLink(GENERAL_INQUIRY)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition mb-6"
          >
            <MessageCircle className="size-4" /> WhatsApp Chat
          </a>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className={`size-10 grid place-items-center border border-white/10 transition-all rounded-sm ${s.hover}`}
              >
                <s.Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 lg:px-10 py-6 text-[10px] uppercase tracking-[0.3em] text-steel/50 flex flex-col md:flex-row justify-between gap-3 max-w-[1440px] mx-auto">
        <span>© 2025 Shapline Industry. All Rights Reserved.</span>
        <span>Made in Sialkot 🇵🇰</span>
      </div>
    </footer>
  );
}
