"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { useStep } from "usehooks-ts";
import Image from "next/image";
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
    <div className={cn("w-full", className)}>
      {/* Outer container */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide pb-4 justify-start snap-x snap-mandatory"
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          gap: `${gap}px`,
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-start"
            style={{
              // Each item takes exactly 1/itemsPerSlide of the container width, minus gaps
              flex: `0 0 calc((100% - ${(itemsPerSlide - 1) * gap}px) / ${itemsPerSlide})`,
            }}
          >
            {child}
          </div>
        ))}
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
    </div>
  );
}
