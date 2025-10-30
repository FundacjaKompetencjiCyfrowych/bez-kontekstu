"use client";

import { ContentImage, type Image } from "@/app/components/cms/ContentImage";
import { Lightbox } from "@/app/components/projects/Lightbox";
import { twSizes } from "@/app/lib/twSizes";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export function MultimediaGallery({ images }: { images: Image[] }) {
  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSliderIndex(index);
    setSliderOpen(true);
  };

  // 🧩 Pause ScrollSmoother when Lightbox is open
  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.paused(sliderOpen);
    }
  }, [sliderOpen]);

  return (
    <>
      <h2 className="mb-6 md:text-6xl">MULTIMEDIA</h2>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(index)}
            className="aspect-square bg-gray-800 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label={`View image ${index + 1} in full screen`}
          >
            <ContentImage
              image={image}
              fill
              aspect={1}
              className="hover:scale-105 transition-transform duration-300 ease-in-out"
              sizes={twSizes("50vw max:630px")}
            />
          </button>
        ))}
      </div>

      {images.length > 0 &&
        typeof document !== "undefined" &&
        createPortal(
          <Lightbox images={images} isOpen={sliderOpen} onClose={() => setSliderOpen(false)} initialIndex={sliderIndex} />,
          document.body
        )}
    </>
  );
}
