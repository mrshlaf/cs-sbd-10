import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const Card = ({ children, className = "", hover = true, glow = false }: CardProps) => {
  return (
    <div
      className={`
        bg-[#0a0a0a] border border-white/[0.06] rounded-3xl p-6 relative overflow-hidden transition-all duration-500
        ${hover ? "hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black" : ""}
        ${glow ? "before:absolute before:inset-0 before:bg-indigo-500/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
