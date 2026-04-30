"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  const { register, isLoggedIn } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", username: "", email: "", phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) router.push("/items");
  }, [isLoggedIn, router]);

  const updateField = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);
    try {
      await register(form);
      setSuccess("MEMBERSHIP INITIALIZED.");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Initialization failed.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-2xl flex flex-col gap-12 reveal relative z-10">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center text-3xl font-black shadow-2xl">
            M
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white leading-none">Join the Network.</h1>
          <p className="sub-text text-zinc-500 text-[10px] font-bold tracking-[0.4em] uppercase">Initialize Your Unique Identifier</p>
        </div>

        <Card className="p-10 border-white/5 bg-[#050505] card-fancy cursor-default">
          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest text-center animate-bounce">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-8 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest text-center">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="FULL NAME"
                placeholder="JOHN DOE"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
              <Input
                label="USERNAME"
                placeholder="COLLECTOR_V3"
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="EMAIL IDENTIFIER"
                type="email"
                placeholder="NAME@ARCHIVE.NET"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
                autoComplete="email"
              />
              <Input
                label="CONTACT LINE"
                type="tel"
                placeholder="+62 000 000"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>

            <Input
              label="SECRET PASSKEY"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
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

            <Button type="submit" size="lg" loading={loading} className="w-full mt-4 py-8 text-[11px] font-black tracking-[0.3em] btn-shimmer uppercase">
              INITIALIZE ACCOUNT
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">
              ALREADY REGISTERED?{" "}
              <Link href="/login" className="text-white hover:text-indigo-400 transition-colors underline decoration-white/20 underline-offset-4">
                SIGN IN
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
