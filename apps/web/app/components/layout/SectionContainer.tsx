import { cn } from "@/app/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, ReactNode } from "react";

const sectionContainer = cva("flex flex-col gap-12 relative", {
  variants: {
    variant: {
      regular: "",
      centered: "items-center justify-center",
      boxed: "items-center justify-center xl:pb-30 xl:pt-30 xl:px-44",
      heroMain:
        "items-center justify-center h-[calc(92vh-18rem)] md:h-[calc(92vh-20rem)] xl:h-[calc(92vh-10rem)] min-h-80 md:min-h-120 xl:min-h-160 pb-20",
      heroCollapsedOnMobile: "items-center justify-center h-fit xl:h-[calc(92vh-10rem)] xl:min-h-160",
      heroBoxedOnDesktop: "items-center justify-center flex-1 xl:pb-40 xl:pt-35 xl:px-20",
      heroFullscreen: "flex-1 justify-center xl:justify-start items-center flex-col",
    },
  },
  defaultVariants: {
    variant: "centered",
  },
});

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"section"> &
  VariantProps<typeof sectionContainer>;

export function SectionContainer({ children, className, variant, ...props }: SectionContainerProps) {
  return (
    <section {...props} className={cn(sectionContainer({ variant }), className)}>
      {children}
    </section>
  );
}
