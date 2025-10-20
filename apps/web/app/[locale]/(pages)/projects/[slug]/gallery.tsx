"use client";

import { ContentImage, type Image } from "@/app/components/cms/ContentImage";
import { Lightbox } from "@/app/components/Lightbox";
import { useState } from "react";

export function MultimediaGallery({ images }: { images: Image[] }) {
  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSliderIndex(index);
    setSliderOpen(true);
  };

  return (
    <>
      <div className="mb-12">
        <h2 className="mb-6 md:text-6xl ">MULTIMEDIA</h2>
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(index)}
              className="aspect-square bg-gray-800 relative overflow-hidden hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label={`View image ${index + 1} in full screen`}
            >
              <ContentImage image={image} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
            </button>
          ))}
        </div>
      </div>

      {images.length > 0 && (
        <Lightbox images={images} isOpen={sliderOpen} onClose={() => setSliderOpen(false)} initialIndex={sliderIndex} />
      )}
    </>
  );
}
