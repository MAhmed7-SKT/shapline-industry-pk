import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { whatsappLink, GENERAL_INQUIRY } from "@/lib/whatsapp";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-charcoal/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-bebas text-3xl md:text-4xl tracking-[0.18em] font-bold text-white uppercase">
            SHAPLINE
          </span>
          <span className="text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-electric font-semibold mt-1">
            Industry
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-10 text-xs font-semibold tracking-[0.22em] uppercase text-steel">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative py-2 hover:text-electric transition-colors"
              activeProps={{ className: "text-electric" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-[10px] tracking-[0.3em] uppercase text-steel/70">
            Exporting Worldwide
          </span>
          <a
            href={whatsappLink(GENERAL_INQUIRY)}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex items-center gap-2 rounded-full bg-whatsapp/15 border border-whatsapp/40 text-whatsapp px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-whatsapp hover:text-white transition-colors"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-75 animate-ping-dot"></span>
              <span className="relative inline-flex rounded-full size-2 bg-whatsapp"></span>
            </span>
            <MessageCircle className="size-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 text-white"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-charcoal animate-fade-in lg:hidden">
          <div className="flex items-center justify-between h-20 px-6">
            <span className="font-bebas text-2xl tracking-widest text-white">
              SHAPLINE<span className="text-electric">.</span>
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 text-white">
              <X className="size-6" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-8 mt-16">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-bebas text-5xl tracking-widest text-white hover:text-electric"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
