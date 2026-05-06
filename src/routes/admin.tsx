import { createFileRoute, useNavigate, Outlet, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { LogOut, LayoutDashboard } from "lucide-react";
import SiteNav from "@/components/SiteNav";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { isLoggedIn, isReady, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isReady) return;
    if (!isLoggedIn && !isLoginPage) {
      navigate({ to: "/admin/login", replace: true });
      return;
    }
    if (isLoggedIn && isLoginPage) {
      navigate({ to: "/admin", replace: true });
    }
  }, [isLoggedIn, isLoginPage, isReady, navigate]);

  if (!isReady) return <div className="min-h-screen bg-charcoal" />;
  if (isLoginPage) return <Outlet />;
  if (!isLoggedIn) return null;

  return (
    <div className="bg-charcoal min-h-screen">
      <SiteNav />
      <div className="pt-20">
        <div className="bg-slate-dark border-b border-white/10 py-4">
          <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="size-5 text-electric" />
              <span className="font-bebas text-xl text-white tracking-widest uppercase">Admin Panel</span>
            </div>
            <button
              onClick={() => {
                logout();
                navigate({ to: "/admin/login", replace: true });
              }}
              className="flex items-center gap-2 text-steel hover:text-red-500 transition-colors text-[10px] font-bold uppercase tracking-widest"
            >
              <LogOut className="size-4" /> Logout
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
