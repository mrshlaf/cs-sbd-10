"use client";

import { useState, useEffect } from "react";
import { fetchItems, type Item, createTransaction, payTransaction } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/lib/auth";

export default function DropsPage() {
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
      // Simulate drops by taking items with low stock
      setItems(res.payload.filter(i => i.stock < 15));
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
    if (q.includes('mouse') || q.includes('razer')) 
      return "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800";
    if (q.includes('mic') || q.includes('yeti')) 
      return "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800";
    if (q.includes('sony') || q.includes('headphones')) 
      return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800";
    return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800";
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-20">
        <header className="flex flex-col gap-6 reveal">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div className="px-4 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-[9px] font-black uppercase tracking-[0.4em] text-red-500">
                Live Velocity Protocol
              </div>
           </div>
           <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-white uppercase">LIMITED <br /><span className="text-red-600">DROPS.</span></h1>
           <p className="text-zinc-600 text-sm max-w-lg uppercase font-black tracking-widest leading-relaxed">High-velocity acquisition active. Limited stock remaining for these archive entries. Immediate action required.</p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-zinc-900/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
            {items.map((item) => (
              <Card key={item.id} className="group p-5 flex flex-col gap-6 bg-zinc-950/40 border-red-500/10 hover:border-red-500/30 card-fancy transition-all duration-500">
                <div className="w-full aspect-[3/4] rounded-xl bg-black overflow-hidden relative border border-white/5">
                   <img 
                      src={getItemImage(item.name)} 
                      alt={item.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                   />
                   <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                      <div className="flex justify-between items-center bg-red-600/90 backdrop-blur-md px-3 py-2 rounded-lg">
                        <span className="text-[9px] font-black text-white uppercase tracking-tighter">STOCK_LEFT</span>
                        <span className="text-xs font-black text-white">{item.stock} UNITS</span>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                     <h3 className="text-lg font-black tracking-tight uppercase text-white group-hover:text-red-500 transition-colors leading-tight">{item.name}</h3>
                  </div>
                  
                  <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                     <div className="flex items-baseline gap-1">
                        <span className="sub-text text-[9px] font-bold text-red-500">Rp</span>
                        <span className="text-xl font-black text-white tracking-tighter">{item.price.toLocaleString("id-ID")}</span>
                     </div>
                     <Button 
                       onClick={() => handleBuy(item.id)}
                       size="sm"
                       className="w-full py-5 text-[9px] font-black tracking-[0.3em] bg-white text-black hover:bg-red-600 hover:text-white border-none uppercase"
                     >
                       {purchaseStatus?.id === item.id ? purchaseStatus.msg : "FAST ACQUIRE"}
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
