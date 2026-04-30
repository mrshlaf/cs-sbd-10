"use client";

import { useState, useEffect } from "react";
import { fetchItems, type Item, createTransaction, payTransaction } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/lib/auth";

export default function ItemsPage() {
  const { isLoggedIn, refreshUser } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [filtered, setFiltered] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchaseStatus, setPurchaseStatus] = useState<{id: number, msg: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const res = await fetchItems();
      setItems(res.payload);
      setFiltered(res.payload);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (itemId: number) => {
    if (!isLoggedIn) {
      alert("Please login to purchase items.");
      return;
    }

    try {
      setPurchaseStatus({ id: itemId, msg: "PROCESSING...", type: 'success' });
      const transRes = await createTransaction(itemId, 1);
      await payTransaction(transRes.payload.id);
      
      setPurchaseStatus({ id: itemId, msg: "ACQUIRED!", type: 'success' });
      refreshUser();
      loadItems();
      setTimeout(() => setPurchaseStatus(null), 2000);
    } catch (err: any) {
      setPurchaseStatus({ id: itemId, msg: err.message || "FAILED", type: 'error' });
      setTimeout(() => setPurchaseStatus(null), 3000);
    }
  };

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(items.filter((i) => 
      i.name.toLowerCase().includes(q) || 
      i.category?.toLowerCase().includes(q)
    ));
  }, [search, items]);

  const getItemImage = (name: string) => {
    const q = name.toLowerCase();
    
    // Monitors / OLED
    if (q.includes('monitor') || q.includes('oled') || q.includes('ultrafine') || q.includes('swift') || q.includes('samsung') || q.includes('odyssey') || q.includes('lg') || q.includes('asus')) 
      return "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800";
    
    // Keyboards
    if (q.includes('keyboard') || q.includes('keychron') || q.includes('varmilo') || q.includes('va87m')) 
      return "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800";
    
    // Mice
    if (q.includes('mouse') || q.includes('logitech') || q.includes('razer') || q.includes('deathadder') || q.includes('zowie') || q.includes('g pro') || q.includes('model o')) 
      return "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800";
    
    // Audio / Headphones
    if (q.includes('headphones') || q.includes('sony') || q.includes('bose') || q.includes('quietcomfort')) 
      return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800";
    
    // Laptops
    if (q.includes('macbook') || q.includes('apple') || q.includes('laptop')) 
      return "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800";
    
    // Microphones
    if (q.includes('mic') || q.includes('yeti') || q.includes('blue')) 
      return "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800";
    
    // Controllers / Stream Deck
    if (q.includes('deck') || q.includes('elgato') || q.includes('controller')) 
      return "https://images.unsplash.com/photo-1616423641454-ca70059f1304?auto=format&fit=crop&q=80&w=800";

    // Furniture / Chairs
    if (q.includes('chair') || q.includes('aeron') || q.includes('miller') || q.includes('herman')) 
      return "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800";

    // Lighting / Desk Accessories
    if (q.includes('light') || q.includes('screenbar') || q.includes('halo')) 
      return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800";
    
    return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800";
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-20">
        <header className="flex flex-col md:flex-row justify-between items-end gap-12 reveal">
          <div className="flex flex-col gap-4">
             <div className="px-4 py-1 w-fit rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-[0.4em] text-indigo-400">
               Archive Collection
             </div>
             <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-white">THE <br /><span className="text-gradient">OBJECTS.</span></h1>
          </div>
          
          <div className="w-full md:w-80 relative group">
             <input 
               type="text" 
               placeholder="SEARCH ARCHIVE..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-[10px] font-black tracking-widest focus:outline-none focus:border-white transition-all uppercase placeholder:text-zinc-700 text-white"
             />
             <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-700 group-focus-within:w-full" />
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-zinc-900/50 rounded-3xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : error ? (
          <div className="p-20 text-center glass-panel rounded-[3rem]">
             <p className="text-red-400 font-black uppercase tracking-widest text-xs">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 reveal">
            {filtered.map((item) => (
              <Card key={item.id} className="group p-5 flex flex-col gap-6 border-white/5 hover:border-white/10 bg-zinc-950/40 hover:-translate-y-2 transition-all duration-700 card-fancy">
                <div className="w-full aspect-[4/5] rounded-2xl bg-black border border-white/5 overflow-hidden relative">
                   <img 
                      src={getItemImage(item.name)} 
                      alt={item.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                   
                   <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] backdrop-blur-md border ${
                        item.stock > 0 ? "bg-white/5 border-white/10 text-white" : "bg-red-500/10 border-red-500/20 text-red-400"
                      }`}>
                        {item.stock > 0 ? `VOL: ${item.stock}` : "DEPLETED"}
                      </span>
                   </div>
                </div>

                <div className="flex flex-col gap-5 flex-1 text-left">
                  <div className="flex flex-col gap-1.5">
                     <h3 className="text-xl font-black tracking-tight leading-none text-white group-hover:text-indigo-400 transition-colors uppercase">{item.name}</h3>
                     <p className="sub-text text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                        {item.description}
                     </p>
                  </div>
                  
                  <div className="flex flex-col gap-4 mt-auto">
                     <div className="h-px w-full bg-white/5" />
                     <div className="flex items-center justify-between gap-4">
                        <div className="flex items-baseline gap-1">
                           <span className="sub-text text-[10px] font-bold text-indigo-400">Rp</span>
                           <span className="text-2xl font-black text-white tracking-tighter">
                              {item.price.toLocaleString("id-ID")}
                           </span>
                        </div>
                        <Button 
                          size="sm" 
                          variant={purchaseStatus?.id === item.id ? "ghost" : "primary"}
                          onClick={() => handleBuy(item.id)}
                          className={`px-6 py-4 text-[9px] tracking-[0.2em] transition-all ${
                            purchaseStatus?.id === item.id 
                              ? (purchaseStatus.type === 'success' ? 'text-green-400' : 'text-red-400') 
                              : ''
                          }`}
                          disabled={item.stock === 0}
                        >
                          {purchaseStatus?.id === item.id ? purchaseStatus.msg : "ACQUIRE"}
                        </Button>
                     </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
