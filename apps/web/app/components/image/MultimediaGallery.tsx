"use client";

import { ContentImage, type Image } from "@/app/components/cms/ContentImage";
import { Lightbox } from "@/app/components/image/Lightbox";
import { twSizes } from "@/app/lib/twSizes";
import { useState } from "react";
import { createPortal } from "react-dom";

export function MultimediaGallery({ images }: { images: Image[] }) {
  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSliderIndex(index);
    setSliderOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:gap-10 xl:gap-24">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(index)}
            className="aspect-square bg-gray-800 relative overflow-hidden focus:outline-none focus-brand"
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
