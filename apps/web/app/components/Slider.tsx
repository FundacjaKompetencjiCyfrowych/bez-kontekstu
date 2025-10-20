"use client";

import { useRef, useEffect, ReactNode } from "react";
import { useStep } from "usehooks-ts";
import Image from "next/image";
import prevIcon from "@/app/assets/icons/prev.png";
import nextIcon from "@/app/assets/icons/next.png";
import { cn } from "../lib/utils";

type SliderProps = {
  itemsPerSlide?: number;
  gap?: number;
  children: ReactNode[];
  className?: string;
  onSlideChange?: (slide: number) => void;
};

export function Slider({ itemsPerSlide = 4, gap = 24, children, className, onSlideChange }: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalSlides = Math.ceil(children.length / itemsPerSlide);
  const [currentSlide, { goToNextStep, goToPrevStep }] = useStep(totalSlides);

  useEffect(() => {
    if (!sliderRef.current) return;

    const containerWidth = sliderRef.current.clientWidth;
    const cardWidth = containerWidth / itemsPerSlide;
    const slideWidth = cardWidth * itemsPerSlide + gap * (itemsPerSlide - 1);

    sliderRef.current.scrollTo({
      left: slideWidth * (currentSlide - 1),
      behavior: "smooth",
    });

    onSlideChange?.(currentSlide);
  }, [currentSlide, itemsPerSlide, gap, onSlideChange]);

  const isFirstSlide = currentSlide === 1;
  const isLastSlide = currentSlide === totalSlides;
  const cardWidthPercent = 100 / itemsPerSlide;
  const gapAdjustment = (gap * (itemsPerSlide - 1)) / itemsPerSlide;

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide pb-4 justify-center"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          gap: `${gap}px`,
        }}
      >
        {children.map((child, index) => (
          <div key={index} className="flex-shrink-0" style={{ width: `calc(${cardWidthPercent}% - ${gapAdjustment}px)` }}>
            {child}
          </div>
        ))}
      </div>

      {totalSlides > 1 && (
        <div className="flex justify-between items-center px-4 mt-6">
          <button
            onClick={goToPrevStep}
            disabled={isFirstSlide}
            className={`transition-all duration-200 flex-shrink-0 ${
              isFirstSlide ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100 hover:scale-110 cursor-pointer"
            }`}
            aria-label="Previous slide"
          >
            <Image src={prevIcon} alt="" width={25} height={25} />
          </button>

          <div className="flex items-center space-x-2 text-white font-mono text-sm">
            <span>{currentSlide}</span>
            <span>/</span>
            <span>{totalSlides}</span>
          </div>

          <button
            onClick={goToNextStep}
            disabled={isLastSlide}
            className={`transition-all duration-200 flex-shrink-0 ${
              isLastSlide ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100 hover:scale-110 cursor-pointer"
            }`}
            aria-label="Next slide"
          >
            <Image src={nextIcon} alt="" width={25} height={25} />
          </button>
        </div>
      )}
    </div>
  );
}
