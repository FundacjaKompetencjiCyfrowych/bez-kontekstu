import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  ariaLabelledby: string;
  className?: string;
}

export function SectionContainer({ children, ariaLabelledby, className = "" }: SectionContainerProps) {
  return (
    <section
      className={cn("min-h-[45rem] md:pb-30 md:pt-25 md:px-20 flex flex-col gap-4 items-center justify-center relative", className)}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </section>
  );
}
