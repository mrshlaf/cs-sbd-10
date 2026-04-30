"use client";

import { Card } from "@/components/ui/Card";

export default function ManifestoPage() {
  const pillars = [
    {
      title: "Tactile Digitality",
      desc: "We believe digital ownership should feel as substantial as physical possession. Every interaction is designed to provide tactile feedback and high-performance satisfaction."
    },
    {
      title: "Obsidian Standards",
      desc: "Our quality standard is absolute. We curate only the most essential hardware, ensuring that every archive entry meets the highest technical and aesthetic criteria."
    },
    {
      title: "The Collective Ethos",
      desc: "The archive is more than a store—it is a decentralized infrastructure for high-end commerce. We prioritize the network over the individual, ensuring sustainable growth for all collectors."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col gap-32">
        <header className="flex flex-col items-center text-center gap-10 reveal">
           <div className="h-20 w-[1px] bg-gradient-to-b from-transparent to-indigo-500" />
           <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none italic">
              The <br /> Manifesto.
           </h1>
           <p className="sub-text text-2xl md:text-3xl max-w-3xl leading-relaxed text-zinc-400">
             Our vision for a decentralized, high-end digital future. Built for the modern collector, defined by performance.
           </p>
        </header>

        <section className="flex flex-col gap-12 reveal delay-100">
           <div className="h-px w-full bg-white/5" />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-8">
              <h2 className="text-4xl font-black tracking-tighter leading-tight">
                Defining the <br /> Archive Standard.
              </h2>
              <div className="flex flex-col gap-8">
                <p className="sub-text text-xl leading-relaxed">
                  The Marshal Store exists at the intersection of raw performance and minimalist luxury. We do not just sell objects; we curate a standard for digital living.
                </p>
                <p className="sub-text text-lg text-zinc-500 leading-relaxed">
                  In an era of fleeting trends and digital noise, we focus on the essential. Our archive is a testament to the belief that fewer, better things are the foundation of true luxury.
                </p>
              </div>
           </div>
           <div className="h-px w-full bg-white/5" />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal delay-200">
           {pillars.map((pill, idx) => (
             <Card key={idx} className="bg-zinc-950/40 border-white/5 p-10 flex flex-col gap-6 card-fancy">
                <span className="text-4xl font-black text-indigo-500">0{idx + 1}.</span>
                <h3 className="text-2xl font-black tracking-tight">{pill.title}</h3>
                <p className="sub-text text-sm text-zinc-500 leading-relaxed">
                   {pill.desc}
                </p>
             </Card>
           ))}
        </section>

        <footer className="text-center py-20 reveal delay-300">
           <p className="sub-text text-[10px] font-bold tracking-[0.5em] text-zinc-700">
              MARSHAL ARCHIVE PROTOCOL • EST. 2026
           </p>
        </footer>
      </div>
    </div>
  );
}
