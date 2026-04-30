import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest transition-all duration-300 active:scale-90 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group";
  
  const variants = {
    primary: "bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5",
    outline: "bg-transparent border border-white/10 text-white hover:border-white/40 hover:bg-white/5 hover:-translate-y-0.5",
    ghost: "bg-transparent text-zinc-500 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-[9px] rounded-xl",
    md: "px-8 py-3.5 text-[10px] rounded-2xl",
    lg: "px-10 py-4.5 text-[11px] rounded-[1.25rem]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {/* Shimmer Effect for Primary */}
      {variant === "primary" && !loading && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
      )}
      
      {loading ? (
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="opacity-70">Processing</span>
        </div>
      ) : (
        <span className="relative z-10">{children}</span>
      )}
    </button>
  );
};
