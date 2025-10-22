"use client";

import { ButtonProps } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";

export function Button({ children, variant = "dark", size = "sm", onClick, disabled = false, className }: ButtonProps) {


  const variants = {
    dark: "inline-flex items-center justify-center transition-all duration-300 rounded-2xl text-white border-1 border-violet-400 hover:bg-violet-900/30 hover:border-violet-300 shadow-lg hover:cursor-pointer",
  };

  const sizes = {
    sm: "h-10 px-7 py-6 w-[80vw] md:w-[30vw] xl:w-[250px] mx-auto",
  };

  return (
    <button onClick={onClick} disabled={disabled} className={cn(variants[variant], sizes[size], className)}>
      {children}
    </button>
  );
}
