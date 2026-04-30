import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const Input = ({ label, error, rightElement, className = "", ...props }: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          className={`w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:bg-white/[0.05] focus:ring-4 focus:ring-indigo-500/10 ${
            rightElement ? "pr-12" : ""
          } ${className} ${
            error ? "border-red-500/50 focus:border-red-500" : ""
          }`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-4 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-400 mt-1 ml-1 font-medium">{error}</p>}
    </div>
  );
};
