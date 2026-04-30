"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero: THE HOOK ──────────────── */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-black">
        {/* Ambient Visuals */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none float" style={{ animationDelay: '-4s' }} />

        {/* Abstract Backdrop Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 grayscale scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070"
            alt="Hardware"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 text-center max-w-7xl mx-auto flex flex-col items-center gap-16 reveal">
          <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.6em] text-indigo-400 backdrop-blur-md">
            Archive Collection • Curated for the Collective
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-7xl md:text-[14rem] font-black leading-[0.75] tracking-tighter text-white italic">
              Obsidian <br />
              <span className="text-gradient not-italic">Luxury.</span>
            </h1>
          </div>

          <p className="sub-text text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed opacity-80 text-zinc-400">
            Defining digital possession through minimalist high-performance execution.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 mt-4">
            <Link href="/items">
              <Button size="lg" className="w-full sm:w-auto px-20 py-10 text-[12px] font-black tracking-[0.4em] btn-shimmer uppercase">
                Enter Archive
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-20 py-10 text-[12px] font-black tracking-[0.4em] uppercase border-white/10 hover:border-white">
                Initialize ID
              </Button>
            </Link>
          </div>
        </div>

        {/* Dynamic Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
           <p className="sub-text text-[9px] font-bold uppercase tracking-[0.6em] text-zinc-500">Scroll Down</p>
           <div className="w-[1px] h-20 bg-gradient-to-b from-indigo-500 to-transparent" />
        </div>
      </section>

      {/* ── BENTO GRID: THE INFRASTRUCTURE ────────── */}
      <section className="max-w-7xl mx-auto px-6 py-40 w-full reveal">
        <div className="flex flex-col gap-12 mb-20">
           <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">System <br /> Components.</h2>
           <div className="h-px w-32 bg-indigo-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[280px]">

          {/* Catalog: Full Width Image Card */}
          <Link href="/items" className="md:col-span-8 md:row-span-2 group">
            <Card className="h-full bg-zinc-950 border-white/5 flex flex-col justify-end p-12 overflow-hidden relative card-fancy group-hover:border-indigo-500/20">
              <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-1000 grayscale group-hover:grayscale-0">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
                  alt="Gallery"
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              </div>
              <div className="relative z-10 flex flex-col gap-6">
                <h3 className="text-5xl md:text-8xl font-black tracking-tighter leading-none group-hover:text-indigo-400 transition-colors">Archive Access</h3>
                <p className="sub-text text-zinc-500 text-sm max-w-xs">Explore the curated collection of high-performance digital objects.</p>
              </div>
            </Card>
          </Link>

          {/* Profile Card */}
          <Link href="/profile" className="md:col-span-4 md:row-span-1 group">
            <Card className="h-full bg-indigo-600 border-none flex flex-col justify-between p-10 relative overflow-hidden card-fancy hover:scale-[1.02]">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 text-5xl">👤</div>
              <div className="relative z-10 flex flex-col gap-2">
                <h3 className="text-3xl font-black tracking-tighter text-white">Collector Dash</h3>
                <p className="sub-text text-indigo-100/60 text-[10px] font-bold uppercase tracking-widest">Real-time asset tracking</p>
              </div>
            </Card>
          </Link>

          {/* Security Card */}
          <Link href="/login" className="md:col-span-4 md:row-span-1 group">
            <Card className="h-full bg-zinc-950 border-white/5 flex flex-col justify-between p-10 relative overflow-hidden card-fancy group-hover:bg-zinc-900">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent" />
              <div className="relative z-10 text-5xl">🔐</div>
              <div className="relative z-10 flex flex-col gap-2">
                <h3 className="text-3xl font-black tracking-tighter text-white">Secure Init</h3>
                <p className="sub-text text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Encrypted collective access</p>
              </div>
            </Card>
          </Link>

        </div>
      </section>

      {/* ── FINAL CTA: MEMBERSHIP ────────────────── */}
      <section className="px-6 py-60 flex flex-col items-center text-center gap-12 reveal relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <h2 className="text-5xl md:text-[10rem] font-black tracking-tighter leading-[0.8]">Join the <br /><span className="text-gradient">Network.</span></h2>
        
        <Link href="/register">
          <Button size="lg" className="px-24 py-12 text-[14px] font-black tracking-[0.5em] btn-shimmer uppercase shadow-2xl">
            Initialize Membership
          </Button>
        </Link>
        
        <p className="sub-text text-zinc-600 text-sm mt-8">Secure your spot in the collective archive.</p>
      </section>
    </div>
  );
}
