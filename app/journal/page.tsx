"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function JournalPage() {
  const articles = [
    {
      id: 1,
      tag: "Curation",
      title: "The Art of Digital Possession",
      excerpt: "Exploring the intersection of luxury, minimalism, and the digital archive in the modern era.",
      date: "APR 30, 2026",
      image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      tag: "Technology",
      title: "Obsidian Hardware Systems",
      excerpt: "A deep dive into the high-performance components that define the Marshal hardware standard.",
      date: "APR 28, 2026",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      tag: "Community",
      title: "The Collective Protocol",
      excerpt: "Understanding the decentralized infrastructure powering the next generation of commerce.",
      date: "APR 25, 2026",
      image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden bg-black">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-24">
        <header className="flex flex-col gap-8 reveal">
           <div className="px-4 py-1 w-fit rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 backdrop-blur-md">
             Collective Intelligence
           </div>
           <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-white">THE <br /><span className="text-gradient">JOURNAL.</span></h1>
           <p className="sub-text text-xl max-w-2xl leading-relaxed">
             Insights, archives, and tactical deep-dives into the digital landscape. Curated weekly for the collective.
           </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 reveal">
           {articles.map((art, idx) => (
             <Card 
               key={art.id} 
               className={`group bg-zinc-950/40 border-white/5 p-0 overflow-hidden card-fancy ${
                 idx === 0 ? "md:col-span-12" : "md:col-span-6"
               }`}
             >
                <div className={`flex flex-col ${idx === 0 ? "md:flex-row" : ""}`}>
                   <div className={`relative overflow-hidden ${idx === 0 ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video"}`}>
                      <img 
                        src={art.image} 
                        alt={art.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                   </div>
                   <div className="p-10 md:p-16 flex flex-col justify-center gap-8">
                      <div className="flex items-center justify-between">
                         <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest">{art.tag}</span>
                         <span className="sub-text text-[10px] uppercase font-bold text-zinc-600">{art.date}</span>
                      </div>
                      <div className="flex flex-col gap-4">
                         <h2 className={`font-black tracking-tighter text-white group-hover:text-indigo-400 transition-colors ${idx === 0 ? "text-4xl md:text-6xl" : "text-3xl"}`}>
                            {art.title}
                         </h2>
                         <p className="sub-text text-lg text-zinc-500 leading-relaxed max-w-xl">
                            {art.excerpt}
                         </p>
                      </div>
                      <Link href="#" className="flex items-center gap-3 group/link">
                         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Read Entry</span>
                         <div className="h-px w-8 bg-indigo-500 group-hover/link:w-12 transition-all" />
                      </Link>
                   </div>
                </div>
             </Card>
           ))}
        </section>
      </div>
    </div>
  );
}
