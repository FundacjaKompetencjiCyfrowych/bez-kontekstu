"use client";

import { useRef, useEffect, useState, useMemo, ReactNode } from "react";
import { useStep } from "usehooks-ts";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "../lib/utils";
import { useIntl } from "../lib/intl/context";

type SliderProps = {
  itemsPerSlide?: number;
  gap?: number;
  children: ReactNode[];
  className?: string;
  onSlideChange?: (slide: number) => void;
};

/**
 * Fixed + pixel-perfect slider:
 * - Consistent spacing across slides
 * - No clipping or empty gaps
 * - Fully responsive
 */
export function Slider({ itemsPerSlide = 4, gap = 24, children, className, onSlideChange }: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const totalSlides = Math.ceil(children.length / itemsPerSlide);
  const [currentSlide, { goToNextStep, goToPrevStep }] = useStep(totalSlides);
  const { dictionary } = useIntl();

  // Accordion hover state (desktop use in parent)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Precompute pixel widths for equal / hovered / others
  const sizes = useMemo(() => {
    const totalGapPx = (itemsPerSlide - 1) * gap;
    const available = Math.max(0, containerWidth - totalGapPx);
    const equalPx = itemsPerSlide > 0 ? available / itemsPerSlide : 0;
    const hoveredPx = available * 0.55; // emphasis
    const othersPx = itemsPerSlide > 1 ? (available - hoveredPx) / (itemsPerSlide - 1) : 0;
    return { equalPx, hoveredPx, othersPx };
  }, [containerWidth, itemsPerSlide, gap]);

  // Watch for resize to recalc widths
  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) setContainerWidth(sliderRef.current.clientWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Scroll to correct slide
  useEffect(() => {
    if (!sliderRef.current || !containerWidth) return;

    const slideOffset = (currentSlide - 1) * containerWidth;

    sliderRef.current.scrollTo({
      left: slideOffset,
      behavior: "smooth",
    });

    onSlideChange?.(currentSlide);
  }, [currentSlide, containerWidth, onSlideChange]);

  const isFirstSlide = currentSlide === 1;
  const isLastSlide = currentSlide === totalSlides;

  return (
    <>
      {/* Outer container */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide pb-4 justify-start snap-x snap-mandatory"
        onMouseLeave={() => setHoveredIndex(null)}
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          gap: `${gap}px`,
        }}
      >
        {children.map((child, index) => {
          const basisPx =
            hoveredIndex === null
              ? sizes.equalPx
              : hoveredIndex === index
                ? sizes.hoveredPx
                : sizes.othersPx;

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

      {/* Navigation */}
      {totalSlides > 1 && (
        <div className="flex justify-between items-center px-4 mt-6">
          <button
            onClick={goToPrevStep}
            disabled={isFirstSlide}
            className={cn(
              "transition-all duration-200 flex-shrink-0",
              isFirstSlide ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100 hover:scale-110 cursor-pointer"
            )}
            aria-label={dictionary.previousSlide}
          >
            <FiChevronLeft width={25} height={25} />
          </button>

          <div className="flex items-center space-x-2 text-white font-mono text-sm">
            <span>{currentSlide}</span>
            <span>/</span>
            <span>{totalSlides}</span>
          </div>

          <button
            onClick={goToNextStep}
            disabled={isLastSlide}
            className={cn(
              "transition-all duration-200 flex-shrink-0",
              isLastSlide ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100 hover:scale-110 cursor-pointer"
            )}
            aria-label={dictionary.nextSlide}
          >
            <FiChevronRight width={25} height={25} />
          </button>
        </div>
      )}
    </>
  );
}
