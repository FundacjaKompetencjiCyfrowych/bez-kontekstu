import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 font-space-mono font-bold py-6 lg:py-4 px-8 lg:px-12 text-xs leading-4 md:text-lg lg:leading-8 relative overflow-hidden w-full lg:w-auto focus-brand",
  {
    variants: {
      variant: {
        glass:
          "glass border-brand-200/50 rounded-2xl transition-all duration-300 hover:text-brand-300 hover:backdrop-brightness-100 hover:backdrop-saturate-100 hover:bg-[#a0a0a007]",
      },
    },
    defaultVariants: {
      variant: "glass",
    },
  }
);

type ButtonProps = {
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
} & VariantProps<typeof buttonVariants>;

export function Button({ asChild = false, variant = "glass", className, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant }), className);

  return asChild ? (
    <Slot className={classes}>{children}</Slot>
  ) : (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
