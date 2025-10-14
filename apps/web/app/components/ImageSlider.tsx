"use client";

import React, { useId } from "react";
import Image from "next/image";
import { useSliderNavigation } from "./hooks/useSliderNavigation";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";

interface ImageSliderProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

function ImageSliderComponent({ images, isOpen, onClose, initialIndex = 0 }: ImageSliderProps) {
  // Generate unique IDs for accessibility
  const sliderId = useId();
  const closeButtonId = useId();
  const prevButtonId = useId();
  const nextButtonId = useId();
  const mainImageId = useId();
  const thumbnailsId = useId();

  // Use custom hooks for better separation of concerns
  const { currentIndex, animationDirection, goToNext, goToPrevious, goToItem } = useSliderNavigation({
    totalItems: images.length,
    initialIndex,
  });

  // Handle keyboard navigation
  useKeyboardNavigation({
    isActive: isOpen,
    onEscape: onClose,
    onArrowLeft: goToPrevious,
    onArrowRight: goToNext,
  });

  // Prevent body scroll when modal is open
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div
      id={sliderId}
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col overflow-y-auto md:landscape:h-screen"
      role="dialog"
      aria-modal="true"
      aria-labelledby={mainImageId}
      aria-describedby={thumbnailsId}
    >
      {/* Header with close button */}
      <div className="absolute right-4 p-4 z-10">
        <button
          id={closeButtonId}
          onClick={onClose}
          className="text-white text-2xl font-bold hover:text-gray-300 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
          aria-label="Close image slider"
        >
          ✕
        </button>
      </div>

      {/* Main image container */}
      <div className="flex-1 flex items-center justify-center relative px-4 lg:min-h-[60vh]">
        {/* Previous arrow */}
        <button
          id={prevButtonId}
          onClick={goToPrevious}
          className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-all duration-300 transform hover:scale-150 z-10"
          aria-label="Previous image"
        >
          ‹
        </button>

        {/* Current image */}
        <div className="relative max-w-full max-h-full">
          <div className="relative overflow-hidden">
            <Image
              id={mainImageId}
              key={currentIndex} // Force re-render for animation
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1} of ${images.length}`}
              width={800}
              height={600}
              className={`max-w-full max-h-full md:landscape:h-screen object-contain transition-all duration-500 ease-in-out transform ${animationDirection === "left"
                ? "animate-slideInLeft"
                : animationDirection === "right"
                  ? "animate-slideInRight"
                  : "animate-fadeIn"
                }`}
              priority
            />
          </div>
        </div>

        {/* Next arrow */}
        <button
          id={nextButtonId}
          onClick={goToNext}
          className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-all duration-300 transform hover:scale-150 "
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      {/* Thumbnails */}
      <div className="p-4 pb-6 flex-shrink-0">
        <div
          id={thumbnailsId}
          className="flex justify-center gap-2 overflow-x-auto overflow-y-hidden py-2 max-w-full"
          role="tablist"
          aria-label="Image thumbnails"
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToItem(index)}
              className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2 transition-all duration-300 transform hover:scale-110 ${index === currentIndex ? "border-violet-800 scale-105" : "border-transparent"
                }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to image ${index + 1} of ${images.length}`}
              aria-controls={mainImageId}
            >
              <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Export with React.memo for performance optimization
export const ImageSlider = React.memo(ImageSliderComponent);
