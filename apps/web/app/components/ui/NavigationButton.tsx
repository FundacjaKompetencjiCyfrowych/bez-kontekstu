import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { cloneElement, ComponentProps, ReactElement, ReactNode } from "react";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center w-fit justify-center gap-[0.6em] cursor-pointer text-[1rem] xl:text-[1.25rem] hover:text-gray-300 font-space-mono",
  {
    variants: {
      variant: {
        previous: "pr-3",
        next: "pl-3",
      },
    },
  }
);

type ButtonProps = {
  asChild?: boolean;
  className?: string;
  children?: ReactElement;
} & VariantProps<typeof buttonVariants>;

export function NavigationButton({ asChild = false, variant, className, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant }), className);

  if (variant === "previous" || variant === "next") {
    const Icon = variant === "previous" ? FiChevronLeft : FiChevronRight;
    const iconClasses = cn("w-[1.65em] h-[1.65em]");

    if (asChild) {
      const child = children as ReactElement<{ children?: ReactNode }>;
      return (
        <Slot className={classes}>
          {cloneElement(
            child,
            {},
            <>
              {variant === "previous" && <Icon className={iconClasses} />}
              <span>{child.props.children}</span>
              {variant === "next" && <Icon className={iconClasses} />}
            </>
          )}
        </Slot>
      );
    }

    return (
      <button className={classes} {...props}>
        {variant === "previous" && <Icon className={iconClasses} />}
        <span>{children}</span>
        {variant === "next" && <Icon className={iconClasses} />}
      </button>
    );
  }
}

type NavigationButtonGroupProps = {
  previousSlug?: string;
  nextSlug?: string;
  previousLabel: string;
  nextLabel: string;
  pathname: string;
} & ComponentProps<"div">;

export function NavigationButtonGroup({
  previousSlug,
  previousLabel,
  nextSlug,
  nextLabel,
  pathname,
  className,
  ...props
}: NavigationButtonGroupProps) {
  return (
    <div className={cn("w-full flex justify-between", className)} {...props}>
      {previousSlug ? (
        <NavigationButton variant="previous" asChild>
          <Link href={`/${pathname}/${previousSlug}`}>{previousLabel}</Link>
        </NavigationButton>
      ) : (
        <div />
      )}

      {nextSlug && (
        <NavigationButton variant="next" asChild>
          <Link href={`/${pathname}/${nextSlug}`}>{nextLabel}</Link>
        </NavigationButton>
      )}
    </div>
  );
}
