"use client";

import { useState, useEffect } from "react";
import { fetchItems, type Item, createTransaction, payTransaction } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/lib/auth";

export default function TrendingPage() {
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
      // Simulate trending by taking a slice or filtering
      setItems(res.payload.slice(0, 6));
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
    if (q.includes('monitor') || q.includes('oled') || q.includes('samsung') || q.includes('asus')) 
      return "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800";
    if (q.includes('keyboard') || q.includes('keychron')) 
      return "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800";
    if (q.includes('mouse') || q.includes('logitech') || q.includes('razer')) 
      return "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800";
    if (q.includes('headphones') || q.includes('sony') || q.includes('bose')) 
      return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800";
    return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800";
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden bg-black">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-20">
        <header className="flex flex-col gap-6 reveal">
           <div className="px-4 py-1 w-fit rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[9px] font-black uppercase tracking-[0.4em] text-indigo-400">
             High Demand Protocol
           </div>
           <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-white">TRENDING <br /><span className="text-gradient">NOW.</span></h1>
           <p className="text-zinc-500 text-sm max-w-lg uppercase font-black tracking-widest leading-relaxed">The most coveted digital assets in the current collective cycle. Dynamic stock allocation active.</p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-zinc-900/50 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
            {items.map((item) => (
              <Card key={item.id} className="group p-6 flex flex-col gap-8 bg-zinc-950/40 border-white/5 card-fancy">
                <div className="w-full aspect-[4/3] rounded-2xl bg-black overflow-hidden relative">
                   <img 
                      src={getItemImage(item.name)} 
                      alt={item.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                   />
                   <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-indigo-600 text-[8px] font-black text-white uppercase tracking-widest animate-pulse">🔥 TRENDING</span>
                   </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                     <h3 className="text-3xl font-black tracking-tighter uppercase text-white group-hover:text-indigo-400 transition-colors">{item.name}</h3>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                     <div className="flex items-baseline gap-1">
                        <span className="sub-text text-[10px] font-bold text-indigo-400">Rp</span>
                        <span className="text-3xl font-black text-white tracking-tighter">{item.price.toLocaleString("id-ID")}</span>
                     </div>
                     <Button 
                       onClick={() => handleBuy(item.id)}
                       loading={purchaseStatus?.id === item.id && purchaseStatus.msg === "PROCESSING..."}
                       className="px-8 py-5 text-[10px] font-black tracking-widest btn-shimmer"
                     >
                       {purchaseStatus?.id === item.id ? purchaseStatus.msg : "ACQUIRE"}
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
