"use client";

import { useRef, useEffect, useState, useMemo, ReactNode } from "react";
import { useStep } from "usehooks-ts";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/app/lib/utils";
import { useIntl } from "@/app/lib/intl/context";

type SliderProps = {
  itemsPerSlide?: number;
  gap?: number;
  children: ReactNode[];
  className?: string;
  onSlideChange?: (slide: number) => void;
};

export function Slider({ itemsPerSlide = 4, gap = 24, children, onSlideChange }: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const totalSlides = Math.ceil(children.length / itemsPerSlide);
  const [currentSlide, { goToNextStep, goToPrevStep }] = useStep(totalSlides);
  const { dictionary } = useIntl();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sizes = useMemo(() => {
    const totalGapPx = (itemsPerSlide - 1) * gap;
    const available = Math.max(0, containerWidth - totalGapPx);
    const equalPx = itemsPerSlide > 0 ? available / itemsPerSlide : 0;
    const hoveredPx = available * 0.55;
    const othersPx = itemsPerSlide > 1 ? (available - hoveredPx) / (itemsPerSlide - 1) : 0;
    return { equalPx, hoveredPx, othersPx };
  }, [containerWidth, itemsPerSlide, gap]);

  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) setContainerWidth(sliderRef.current.clientWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (!sliderRef.current || !containerWidth) return;

    const slideOffset = (currentSlide - 1) * containerWidth;
    const el = sliderRef.current;

    // Disable inline scroll-behavior to avoid Chrome conflicts
    el.style.scrollBehavior = "auto";

    // Use requestAnimationFrame to ensure layout is stable before scrolling
    requestAnimationFrame(() => {
      el.scrollTo({
        left: slideOffset,
        behavior: "smooth",
      });
    });

    onSlideChange?.(currentSlide);
  }, [currentSlide, containerWidth, onSlideChange]);

  const isFirstSlide = currentSlide === 1;
  const isLastSlide = currentSlide === totalSlides;

  return (
    <div className="relative w-full">
      {/* Slider container */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide pb-4 justify-start snap-x snap-mandatory relative z-0"
        onMouseLeave={() => setHoveredIndex(null)}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          willChange: "scroll-position",
          gap: `${gap}px`,
        }}
      >
        {children.map((child, index) => {
          const basisPx = hoveredIndex === null ? sizes.equalPx : hoveredIndex === index ? sizes.hoveredPx : sizes.othersPx;

          return (
            <div
              key={index}
              className="snap-start transition-[flex-basis] duration-500 ease-in-out"
              style={{ flex: "0 0 auto", flexBasis: `${basisPx}px` }}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {child}
            </div>
          );
        })}
      </div>

      {/* Navigation below */}
      {totalSlides > 1 && (
        <div className="relative z-10 flex justify-between items-center px-4 mt-6">
          <button
            onClick={goToPrevStep}
            disabled={isFirstSlide}
            className={cn(
              "transition-all duration-200 flex-shrink-0 focus-brand",
              isFirstSlide ? "opacity-50 cursor-not-allowed" : "hover:opacity-100 hover:text-brand-300 cursor-pointer"
            )}
            aria-label={dictionary.previousSlide}
          >
            <FiChevronLeft width={25} height={25} aria-hidden="true" />
          </button>

          <div className="flex items-center space-x-2 text-white font-space-mono text-[1.5rem]">
            <span>{currentSlide}</span>
            <span>/</span>
            <span>{totalSlides}</span>
          </div>

          <button
            onClick={goToNextStep}
            disabled={isLastSlide}
            className={cn(
              "transition-all duration-200 flex-shrink-0 focus-brand",
              isLastSlide ? "opacity-50 cursor-not-allowed" : "hover:opacity-100 hover:text-brand-300 cursor-pointer"
            )}
            aria-label={dictionary.nextSlide}
          >
            <FiChevronRight width={25} height={25} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
