"use client";

import { useState, useEffect } from "react";
import { fetchItems, type Item, createTransaction, payTransaction } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/lib/auth";

export default function ExclusivePage() {
  const { isLoggedIn, refreshUser } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchaseStatus, setPurchaseStatus] = useState<{id: number, msg: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const res = await fetchItems();
      // Simulate exclusive by taking higher priced items or specific ones
      setItems(res.payload.filter(i => i.price > 5000000));
    } catch (err: any) {
      console.error(err);
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

  const getItemImage = (name: string) => {
    const q = name.toLowerCase();
    if (q.includes('macbook') || q.includes('apple')) 
      return "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800";
    if (q.includes('chair') || q.includes('aeron')) 
      return "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800";
    if (q.includes('monitor') || q.includes('oled')) 
      return "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800";
    return "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800";
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden bg-[#050505]">
      <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-yellow-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-20">
        <header className="flex flex-col gap-6 reveal">
           <div className="px-4 py-1 w-fit rounded-full border border-yellow-500/20 bg-yellow-500/5 text-[9px] font-black uppercase tracking-[0.4em] text-yellow-500">
             Elite Tier Protocol
           </div>
           <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-white italic">EXCLUSIVE <br /><span className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-800">COLLECTIBLES.</span></h1>
           <p className="text-zinc-600 text-sm max-w-lg uppercase font-black tracking-widest leading-relaxed">Reserved for the most dedicated collectors. High-valuation assets only. Restricted access enabled.</p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-video bg-zinc-900/50 rounded-[3rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 reveal">
            {items.map((item) => (
              <Card key={item.id} className="group p-8 flex flex-col gap-10 bg-zinc-950/60 border-yellow-500/10 hover:border-yellow-500/30 card-fancy rounded-[3rem]">
                <div className="w-full aspect-video rounded-[2rem] bg-black overflow-hidden relative border border-white/5">
                   <img 
                      src={getItemImage(item.name)} 
                      alt={item.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                   />
                   <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-xl border border-yellow-500/50 text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em]">💎 S-TIER ASSET</span>
                   </div>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                     <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white group-hover:text-yellow-500 transition-colors leading-none">{item.name}</h3>
                  </div>
                  
                  <div className="flex items-center justify-between pt-8 border-t border-white/5">
                     <div className="flex flex-col">
                        <span className="sub-text text-[9px] font-bold text-zinc-600 mb-1">Market Price</span>
                        <div className="flex items-baseline gap-1">
                           <span className="sub-text text-xs font-bold text-yellow-500">Rp</span>
                           <span className="text-4xl font-black text-white tracking-tighter">{item.price.toLocaleString("id-ID")}</span>
                        </div>
                     </div>
                     <Button 
                       onClick={() => handleBuy(item.id)}
                       className="px-12 py-6 text-[10px] font-black tracking-[0.4em] bg-yellow-600 hover:bg-yellow-500 text-black border-none uppercase"
                     >
                       {purchaseStatus?.id === item.id ? purchaseStatus.msg : "ACQUIRE NOW"}
                     </Button>
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
