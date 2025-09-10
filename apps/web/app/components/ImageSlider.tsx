"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function ImageSlider({ images, isOpen, onClose, initialIndex = 0 }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [animationDirection, setAnimationDirection] = useState<"left" | "right" | "fade">("fade");

  // Reset current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          event.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const goToNext = () => {
    setAnimationDirection("right");
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setAnimationDirection("left");
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    // Determine direction based on index difference
    const diff = index - currentIndex;
    if (Math.abs(diff) === 1) {
      setAnimationDirection(diff > 0 ? "right" : "left");
    } else {
      setAnimationDirection("fade");
    }
    setCurrentIndex(index);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col">
      {/* Header with close button */}
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="text-white text-2xl font-bold hover:text-gray-300 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
          aria-label="Close slider"
        >
          ✕
        </button>
      </div>

      {/* Main image container */}
      <div className="flex-1 flex items-center justify-center relative px-4">
        {/* Previous arrow */}
        <button
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
              key={currentIndex} // Force re-render for animation
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1} of ${images.length}`}
              width={800}
              height={600}
              className={`max-w-full max-h-full object-contain transition-all duration-500 ease-in-out transform ${
                animationDirection === "left"
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
          onClick={goToNext}
          className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-all duration-300 transform hover:scale-150 "
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      {/* Thumbnails */}
      <div className="p-4 pb-6">
        <div className="flex justify-center gap-2 overflow-x-auto overflow-y-hidden py-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2 transition-all duration-300 transform hover:scale-110 ${
                index === currentIndex ? "border-violet-800 scale-105" : "border-transparent"
              }`}
              aria-label={`Go to image ${index + 1}`}
            >
              <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
