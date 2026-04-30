"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) router.push("/items");
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);

    try {
      await login({ email, password });
      router.push("/items");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Access Denied.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-lg flex flex-col gap-12 reveal relative z-10">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center text-3xl font-black shadow-2xl">
            M
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white leading-none">Access Granted.</h1>
          <p className="sub-text text-zinc-500 text-[10px] font-bold tracking-[0.4em] uppercase">Collective Membership Login</p>
        </div>

        <Card className="p-10 border-white/5 bg-[#050505] card-fancy cursor-default">
          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest text-center animate-bounce">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <Input
              label="EMAIL IDENTIFIER"
              type="email"
              placeholder="COLLECTOR@ARCHIVE.NET"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            
            <div className="flex flex-col gap-2">
              <Input
                label="PASSKEY"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[10px] font-black text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                }
              />
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full mt-4 py-8 text-[11px] font-black tracking-[0.3em] btn-shimmer uppercase">
              INITIALIZE SESSION
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">
              NEW TO THE NETWORK?{" "}
              <Link href="/register" className="text-white hover:text-indigo-400 transition-colors underline decoration-white/20 underline-offset-4">
                JOIN NOW
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
