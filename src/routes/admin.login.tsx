import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate({ to: "/admin" });
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = login(username, password);
    if (success) {
      navigate({ to: "/admin" });
    } else {
      setError("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-dark border border-white/10 p-8 md:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center size-16 bg-electric/10 rounded-full mb-6">
            <Lock className="size-8 text-electric" />
          </div>
          <h1 className="font-bebas text-4xl text-white tracking-widest uppercase">Admin Login</h1>
          <p className="text-steel/60 text-xs mt-2 font-mono uppercase tracking-widest">Authorized Access Only</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.3em] text-steel/60">Email ID / Username</label>
            <input 
              required
              type="text" 
              autoComplete="username"
              className="w-full bg-charcoal border border-white/10 px-4 py-4 text-white focus:border-electric outline-none transition-colors font-mono"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Admin1"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.3em] text-steel/60">Password</label>
            <input 
              required
              type="password" 
              autoComplete="current-password"
              className="w-full bg-charcoal border border-white/10 px-4 py-4 text-white focus:border-electric outline-none transition-colors font-mono"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-electric hover:bg-electric-glow text-white py-4 font-bold uppercase tracking-[0.4em] transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-8"
          >
            {loading ? <Loader2 className="size-5 animate-spin" /> : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
