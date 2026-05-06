import type { ReactNode } from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-charcoal text-steel font-inter selection:bg-electric selection:text-white">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
