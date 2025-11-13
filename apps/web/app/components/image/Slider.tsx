"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
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

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) setContainerWidth(sliderRef.current.clientWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Scroll to current slide
  useEffect(() => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    const slideOffset = (currentSlide - 1) * containerWidth;
    el.scrollTo({ left: slideOffset, behavior: "smooth" });
    onSlideChange?.(currentSlide);
  }, [currentSlide, containerWidth, onSlideChange]);

  // Split children into pages
  const slides = [];
  for (let i = 0; i < children.length; i += itemsPerSlide) {
    slides.push(children.slice(i, i + itemsPerSlide));
  }

  const isFirstSlide = currentSlide === 1;
  const isLastSlide = currentSlide === totalSlides;

  return (
    <div className="relative w-full">
      <div
        ref={sliderRef}
        className="flex overflow-x-hidden snap-x snap-mandatory relative z-0"
        style={{ gap: `${gap}px` }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {slides.map((slideItems, slideIndex) => {
          const isCurrent = slideIndex + 1 === currentSlide;

          // Calculate item widths
          const totalGapPx = (itemsPerSlide - 1) * gap; // always use itemsPerSlide
          const available = containerWidth - totalGapPx;
          const hoveredPx = hoveredIndex !== null && isCurrent ? available * 0.55 : available / itemsPerSlide;
          const othersPx =
            hoveredIndex !== null && isCurrent && slideItems.length > 1
              ? (available - hoveredPx) / (itemsPerSlide - 1)
              : available / itemsPerSlide;

          return (
            <div
              key={slideIndex}
              className={cn(
                "flex flex-shrink-0 snap-start justify-center" // center items
              )}
              style={{ gap: `${gap}px`, width: "100%" }}
            >
              {slideItems.map((child, index) => {
                const basisPx =
                  hoveredIndex !== null && isCurrent ? (hoveredIndex === index ? hoveredPx : othersPx) : available / itemsPerSlide;

                return (
                  <div
                    key={index}
                    className="transition-[flex-basis] duration-500 ease-in-out"
                    style={{ flex: `0 0 ${basisPx}px` }}
                    onMouseEnter={() => isCurrent && setHoveredIndex(index)}
                  >
                    {child}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Navigation */}
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
