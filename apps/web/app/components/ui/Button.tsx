"use client";

import { ButtonProps } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";

export function Button({ children, variant = "primary", size = "md", onClick, disabled = false, className }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-[#6852f5] text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
    dark: "bg-gradient-to-b from-white-900 via-black-900/30 to-neutral-900 rounded-2xl text-white border-1 border-violet-400 hover:bg-violet-900/30 hover:border-violet-300 shadow-lg",
  };

  const sizes = {
    sm: "h-10 px-7 py-6 w-[80vw] md:w-[30vw] xl:w-[250px] mx-auto",
    md: "h-10 px-4 py-2 w-[70vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] xl:w-[20vw]",
    lg: "h-12 px-6 text-lg w-[60vw] sm:w-[45vw] md:w-[30vw] lg:w-[20vw] xl:w-[15vw]",
  };

  return (
    <button onClick={onClick} disabled={disabled} className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {children}
    </button>
  );
}
