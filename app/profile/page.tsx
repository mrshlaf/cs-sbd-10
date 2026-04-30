"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { fetchTransactionHistory, topUpBalance, type Transaction } from "@/lib/api";

export default function ProfilePage() {
  const { user, isLoggedIn, isLoading, logout, refreshUser } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<Transaction[]>([]);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [topUpMsg, setTopUpMsg] = useState("");

  useEffect(() => {
    if (!isLoading && !isLoggedIn) router.push("/login");
    if (isLoggedIn) {
      fetchTransactionHistory().then(res => setHistory(res.payload));
    }
  }, [isLoading, isLoggedIn, router]);

  const handleTopUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(topUpAmount);
    if (isNaN(amount) || amount <= 0) return;

    setTopUpLoading(true);
    try {
      await topUpBalance(amount);
      setTopUpMsg(`CREDIT ADDED: ${formatRupiah(amount)}`);
      setTopUpAmount("");
      refreshUser();
      setTimeout(() => setTopUpMsg(""), 3000);
    } catch (err: any) {
      setTopUpMsg(err.message);
    } finally {
      setTopUpLoading(false);
    }
  };

  const formatRupiah = (n: number) => {
    return "Rp " + n.toLocaleString("id-ID");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-16">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center md:items-end gap-10 reveal">
          <div className="w-32 h-32 rounded-[2.5rem] bg-white text-black flex items-center justify-center text-5xl font-black shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-[0.4em] text-indigo-400">
              Verified Collector Identity
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">{user.name}</h1>
          </div>
          <div className="md:ml-auto">
            <Button variant="ghost" onClick={logout} className="sub-text text-[10px] font-bold tracking-[0.3em] text-zinc-500 hover:text-red-400 uppercase">
              Terminate Session
            </Button>
          </div>
        </header>

        {/* Dashboard Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
           <Card className="md:col-span-2 p-10 bg-indigo-600 border-none flex flex-col justify-between min-h-[280px] card-fancy hover:scale-[1.01]">
              <p className="sub-text text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">Available Credit</p>
              <div className="flex flex-col gap-2">
                <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">{formatRupiah(user.balance)}</h2>
                <p className="sub-text text-white/30 text-[10px] font-bold uppercase tracking-widest">Digital Asset Valuation</p>
              </div>
           </Card>

           <Card className="p-10 flex flex-col justify-between items-center text-center bg-zinc-950/40 border-white/5 card-fancy">
              <div className="text-5xl">🛡️</div>
              <div className="flex flex-col gap-2">
                <p className="sub-text text-[10px] font-bold uppercase tracking-widest text-zinc-600">Identity Status</p>
                <p className="sub-text text-sm font-bold text-green-400 uppercase tracking-widest">Secure & Active</p>
              </div>
           </Card>

           <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-10 flex flex-col gap-8 bg-zinc-950/40 border-white/5 card-fancy">
                 <p className="sub-text text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Collector Identity</p>
                 <div className="flex flex-col gap-6">
                    <div className="flex justify-between border-b border-white/5 pb-4">
                       <span className="sub-text text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Handle</span>
                       <span className="text-xs font-black text-white">@{user.username.toLowerCase()}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-4">
                       <span className="sub-text text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Endpoint</span>
                       <span className="text-xs font-black text-white">{user.email.toLowerCase()}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="sub-text text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Access Line</span>
                       <span className="text-xs font-black text-white">{user.phone || "UNVERIFIED"}</span>
                    </div>
                 </div>
              </Card>

              <Card className="p-10 flex flex-col gap-8 bg-zinc-950/40 border-white/5 card-fancy">
                <p className="sub-text text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Initialize Credit</p>
                <form onSubmit={handleTopUp} className="flex flex-col gap-6">
                   <input 
                     type="number"
                     placeholder="AMOUNT (IDR)" 
                     value={topUpAmount} 
                     onChange={(e) => setTopUpAmount(e.target.value)}
                     className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] font-black tracking-widest focus:outline-none focus:border-white transition-all uppercase placeholder:text-zinc-700 text-white"
                   />
                   <Button type="submit" size="lg" loading={topUpLoading} className="w-full py-6 text-[10px] font-black tracking-[0.3em] btn-shimmer uppercase">
                     Add Credit
                   </Button>
                   {topUpMsg && <p className="sub-text text-[10px] text-center font-bold text-indigo-400 uppercase tracking-widest animate-pulse">{topUpMsg}</p>}
                </form>
              </Card>
           </div>
        </div>

        {/* Transaction History */}
        <section className="flex flex-col gap-8 reveal">
           <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black tracking-tighter text-white">Archive Logs.</h2>
              <p className="sub-text text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{history.length} Entries Found</p>
           </div>
           
           <Card className="bg-zinc-950/40 border-white/5 overflow-hidden p-0 card-fancy">
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="border-b border-white/5 bg-white/[0.02]">
                       <th className="p-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">ID</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Asset</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Vol</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Valuation</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Status</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Timestamp</th>
                     </tr>
                   </thead>
                   <tbody>
                     {history.length === 0 ? (
                       <tr>
                         <td colSpan={6} className="p-20 text-center sub-text text-[10px] font-bold text-zinc-700 uppercase tracking-[0.4em] italic">No archive logs generated.</td>
                       </tr>
                     ) : (
                       history.map((t) => (
                         <tr key={t.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors group">
                           <td className="p-6 text-[10px] font-black text-zinc-500">#{t.id}</td>
                           <td className="p-6 text-[10px] font-black text-white group-hover:text-indigo-400 transition-colors">{t.item_name || "Unknown Asset"}</td>
                           <td className="p-6 text-[10px] font-black text-zinc-400">{t.quantity}</td>
                           <td className="p-6 text-[10px] font-black text-indigo-400">{formatRupiah(t.total)}</td>
                           <td className="p-6">
                             <span className={`text-[8px] font-black uppercase px-3 py-1 rounded-full border ${t.status === 'paid' ? 'bg-green-500/5 border-green-500/20 text-green-400' : 'bg-yellow-500/5 border-yellow-500/20 text-yellow-400'}`}>
                               {t.status}
                             </span>
                           </td>
                           <td className="p-6 sub-text text-[10px] text-zinc-600">{new Date(t.created_at).toLocaleDateString()}</td>
                         </tr>
                       ))
                     )}
                   </tbody>
                 </table>
              </div>
           </Card>
        </section>

        <footer className="flex justify-center mt-8">
          <Link href="/items">
            <Button variant="outline" className="px-12 py-6 text-[10px] font-black tracking-[0.3em] uppercase">
              Return to Gallery
            </Button>
          </Link>
        </footer>
      </div>
    </div>
  );
}
