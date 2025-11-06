import { cn } from "@/app/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { createElement } from "react";

const SplitTitleVariants = cva("flex flex-col font-defectica gap-[0.1em] tracking-[0.1em]", {
  variants: {
    mobile: {
      left: "self-start text-left",
      right: "self-end text-right",
      bottomLeft: "absolute bottom-0 left-0 text-left",
      topRight: "absolute top-0 right-0 text-right",
    },
    tablet: {
      left: "md:text-left",
      right: "md:text-right",
      bottomLeft: "md:absolute md:bottom-0 md:left-0 md:text-left",
      topRight: "md:absolute md:top-0 md:right-0 md:text-right",
    },
    desktop: {
      left: "xl:text-left",
      right: "xl:text-right",
      bottomLeft: "xl:absolute xl:bottom-0 xl:left-0 xl:text-left",
      topRight: "xl:absolute xl:top-0 xl:right-0 xl:text-right",
    },
    variant: {
      hero: "text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] xl-tall:text-[8rem] leading-[0.8]",
      section: "text-[2.5rem] md:text-[4rem] leading-[0.85]",
    },
  },
  defaultVariants: {
    mobile: "right",
    tablet: "right",
    desktop: "right",
    variant: "section",
  },
});

type Tag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface SplitTitleProps extends VariantProps<typeof SplitTitleVariants> {
  mobileText?: string;
  tabletText?: string;
  desktopText?: string;
  className?: string;
  srText: string | null;
  srId?: string;
  mobileTag?: Tag;
  desktopTag?: Tag;
  tabletTag?: Tag;
}

export function SplitTitle({
  mobileText,
  tabletText,
  desktopText,
  srText,
  srId,
  mobile,
  tablet,
  desktop,
  variant,
  className,
  mobileTag = "h2",
  tabletTag = "h2",
  desktopTag = "h2",
}: SplitTitleProps) {
  if (!mobileText && !tabletText && !desktopText) return null;

  const baseClasses = SplitTitleVariants({ mobile, tablet, desktop, variant });

  // Hide the wrapper itself when there's no content at each breakpoint
  const wrapperVisibility = cn(
    !mobileText && "hidden",
    !tabletText && mobileText && "md:hidden",
    tabletText && "md:flex",
    !desktopText && (mobileText || tabletText) && "xl:hidden",
    desktopText && "xl:flex"
  );

  return (
    <div className={cn(baseClasses, wrapperVisibility, className)}>
      {/* Screen reader text */}
      {srText && (
        <>
          {mobileText && createElement(mobileTag, { className: "sr-only md:hidden", id: srId }, srText)}
          {tabletText && createElement(tabletTag, { className: "sr-only hidden md:block xl:hidden", id: srId }, srText)}
          {desktopText && createElement(desktopTag, { className: "sr-only hidden xl:block", id: srId }, srText)}
        </>
      )}
      {/* Visible titles */}
      {mobileText &&
        mobileText.split(" ").map((line, index) => (
          <div key={`mobile-${index}-${line}`} className="md:hidden" aria-hidden="true">
            {line}
          </div>
        ))}
      {tabletText &&
        tabletText.split(" ").map((line, index) => (
          <div key={`tablet-${index}-${line}`} className="hidden md:block xl:hidden" aria-hidden="true">
            {line}
          </div>
        ))}
      {desktopText &&
        desktopText.split(" ").map((line, index) => (
          <div key={`desktop-${index}-${line}`} className="hidden xl:block" aria-hidden="true">
            {line}
          </div>
        ))}
    </div>
  );
}
