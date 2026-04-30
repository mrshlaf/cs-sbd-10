import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-white/5 pt-32 pb-12 px-6 overflow-hidden">
      {/* Visual Flare */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center text-xl font-black group-hover:rotate-12 transition-transform duration-500">
                M
              </div>
              <span className="text-xl font-black tracking-tighter text-white">MARSHAL</span>
            </Link>
            <p className="text-zinc-500 text-xs max-w-xs leading-relaxed font-black uppercase tracking-wider">
              DEFINING THE NEXT GENERATION OF DIGITAL COMMERCE THROUGH MINIMALIST LUXURY AND HIGH-PERFORMANCE TECHNOLOGY.
            </p>
            <div className="flex gap-4">
              {['TW', 'IG', 'GH', 'LI'].map((social) => (
                <Link 
                  key={social} 
                  href="#" 
                  className="w-12 h-12 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-[10px] font-black text-zinc-500 hover:text-white hover:border-white/20 hover:-translate-y-1 transition-all"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Column 1: Commerce */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">ARCHIVE</h4>
            <nav className="flex flex-col gap-5">
              <Link href="/items" className="sub-text text-[11px] text-zinc-500 hover:text-white transition-colors">Digital Archive</Link>
              <Link href="/trending" className="sub-text text-[11px] text-zinc-500 hover:text-white transition-colors">Trending Now</Link>
              <Link href="/exclusive" className="sub-text text-[11px] text-zinc-500 hover:text-white transition-colors">Elite Assets</Link>
              <Link href="/drops" className="sub-text text-[11px] text-zinc-500 hover:text-white transition-colors">Limited Drops</Link>
            </nav>
          </div>

          {/* Links Column 2: Content */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">DISCOVERY</h4>
            <nav className="flex flex-col gap-5">
              <Link href="/journal" className="sub-text text-[11px] text-zinc-500 hover:text-white transition-colors">Journal Entry</Link>
              <Link href="/manifesto" className="sub-text text-[11px] text-zinc-500 hover:text-white transition-colors">Manifesto</Link>
              <Link href="/profile" className="sub-text text-[11px] text-zinc-500 hover:text-white transition-colors">Collector Hub</Link>
            </nav>
          </div>

          {/* Links Column 3: Legal */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-800">PROTOCOL</h4>
            <nav className="flex flex-col gap-5">
              <Link href="#" className="sub-text text-[11px] text-zinc-500 hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="sub-text text-[11px] text-zinc-500 hover:text-white transition-colors">Access</Link>
            </nav>
          </div>

          {/* Academic Column */}
          <div className="md:col-span-3 flex flex-col gap-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">IDENTIFIER</h4>
            <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] flex flex-col gap-4 card-fancy">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">SBD MODUL 10</p>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-black text-white uppercase tracking-tighter">Marshal Aufa</p>
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">ID: 2406346913</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.5em]">
            © {currentYear} MARSHAL STORE. SYSTEM_STATUS_STABLE.
          </p>
          <div className="flex gap-8">
            <p className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.3em]">CRAFTED WITH PRECISION</p>
          </div>
        </div>
      </div>

      {/* Large Decorative Text */}
      <div className="absolute -bottom-16 -right-16 text-[15rem] font-black text-white/[0.01] pointer-events-none select-none tracking-tighter uppercase italic">
        MARSHAL
      </div>
    </footer>
  );
}
