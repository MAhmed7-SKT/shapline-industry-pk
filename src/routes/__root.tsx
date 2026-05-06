import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthProvider } from "@/hooks/useAuth";

import appCss from "../styles.css?url";

const IMG_FALLBACK = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=90";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shapline Industry — Surgical Beauty Scissors from Sialkot" },
      { name: "description", content: "Premium surgical and beauty scissors manufactured in Sialkot, Pakistan. B2B export to 50+ countries." },
      { name: "author", content: "Shapline Industry" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          {children}
          <Scripts />
        </body>
      </html>
    </AuthProvider>
  );
}

function RootComponent() {
  useEffect(() => {
    const handler = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t && t.tagName === "IMG") {
        const img = t as HTMLImageElement;
        if (img.src !== IMG_FALLBACK) {
          img.src = IMG_FALLBACK;
        }
      }
    };
    window.addEventListener("error", handler, true);
    // Set lazy loading on all existing images
    document.querySelectorAll("img").forEach((img) => {
      if (!img.loading) img.loading = "lazy";
    });
    return () => window.removeEventListener("error", handler, true);
  }, []);
  return <Outlet />;
}
