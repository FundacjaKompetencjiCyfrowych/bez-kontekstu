import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  ariaLabelledby: string;
  className?: string;
}

export function SectionContainer({ children, ariaLabelledby, className = "" }: SectionContainerProps) {
  return (
    <section className={`flex flex-col justify-between ${className}`} aria-labelledby={ariaLabelledby}>
      {children}
    </section>
  );
}
