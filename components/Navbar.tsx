"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";

export default function Navbar() {
  const { user, logout, isLoggedIn, isLoading } = useAuth();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/items", label: "SHOP" },
    { href: "/trending", label: "TRENDING" },
    { href: "/exclusive", label: "EXCLUSIVE" },
    { href: "/drops", label: "DROPS" },
    { href: "/journal", label: "JOURNAL" },
    { href: "/manifesto", label: "MANIFESTO" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${
          isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center text-lg font-black group-hover:rotate-12 transition-transform duration-500">
              M
            </div>
            <span className="text-sm font-black tracking-[0.2em] uppercase text-white">MARSHAL</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[10px] font-black tracking-[0.3em] transition-colors ${
                  isActive(link.href) ? "text-white" : "text-zinc-500 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoading && (
              <>
                {isLoggedIn ? (
                  <>
                    <Link href="/profile">
                      <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                        <div className="w-5 h-5 rounded-full bg-indigo-500" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{user?.username}</span>
                      </div>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={logout} className="text-[10px] font-black tracking-widest text-zinc-500 hover:text-red-400">
                      LOGOUT
                    </Button>
                  </>
                ) : (
                  <Link href="/login">
                    <Button size="sm" className="px-8 btn-shimmer">SIGN IN</Button>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden flex flex-col gap-1.5 p-2 z-[110]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={`w-6 h-[2px] bg-white transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-6 h-[2px] bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-[2px] bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] bg-black transition-all duration-700 md:hidden ${
        mobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-10"
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-4xl font-black tracking-tighter text-zinc-800 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px w-24 bg-white/10" />
          {!isLoading && (
            <>
              {isLoggedIn ? (
                <div className="flex flex-col items-center gap-8">
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black tracking-widest">{user?.username.toUpperCase()}</Link>
                  <Button onClick={() => { logout(); setMobileMenuOpen(false); }} variant="outline" className="text-xl px-12 py-6">LOGOUT</Button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="text-xl px-12 py-6">SIGN IN</Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
