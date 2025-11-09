import { cn } from "@/app/lib/utils";
import { cva } from "class-variance-authority";
import { ComponentProps, ReactNode } from "react";

const pageContainer = cva("px-container flex flex-1 flex-col gap-12 lg:gap-[7.75rem]", {
  variants: {
    variant: {
      default: "pb-[7.75rem]",
      noPadding: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type PageContainerProps = {
  children: ReactNode;
  variant?: "default" | "noPadding";
} & ComponentProps<"div">;

export function PageContainer({ children, className, variant, ...props }: PageContainerProps) {
  return (
    <div className={cn(pageContainer({ variant }), className)} {...props}>
      {children}
    </div>
  );
}
