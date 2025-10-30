"use client";

import { useCallback, useEffect, useState } from "react";
import { ContentImage, Image } from "../cms/ContentImage";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

// Type for rectangle position and size
interface Rectangle {
  id: number;
  x: number; // position X in percentage
  y: number; // position Y in percentage
  width: number; // width in percentage
  height: number; // height in percentage
  image: Image; // Sanity image object
  slug: string; // Slug for the project link
}

// Function to check if two rectangles overlap (including gap)
const checkCollision = (rect1: Rectangle, rect2: Rectangle, gap: number = 4): boolean => {
  const rect1Left = rect1.x;
  const rect1Right = rect1.x + rect1.width;
  const rect1Top = rect1.y;
  const rect1Bottom = rect1.y + rect1.height;

  const rect2Left = rect2.x;
  const rect2Right = rect2.x + rect2.width;
  const rect2Top = rect2.y;
  const rect2Bottom = rect2.y + rect2.height;

  // Check if rectangles are too close (within gap distance)
  return !(
    rect1Right + gap <= rect2Left ||
    rect2Right + gap <= rect1Left ||
    rect1Bottom + gap <= rect2Top ||
    rect2Bottom + gap <= rect1Top
  );
};

// Function to check if rectangle is within container bounds
const isWithinBounds = (rect: Rectangle): boolean => {
  return rect.x >= 0 && rect.y >= 0 && rect.x + rect.width <= 100 && rect.y + rect.height <= 100;
};

// Function to generate random position for rectangle
const generateRandomPosition = (
  existingRectangles: Rectangle[],
  rectWidth: number,
  rectHeight: number,
  maxAttempts: number = 100
): { x: number; y: number } | null => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const margin = 2;

    // Calculate max positions ensuring rectangle stays within bounds
    const maxX = 100 - rectWidth - margin;
    const maxY = 100 - rectHeight - margin;

    // Skip if rectangle can't fit
    if (maxX <= margin || maxY <= margin) {
      return null;
    }

    const x = Math.random() * (maxX - margin) + margin;
    const y = Math.random() * (maxY - margin) + margin;

    const newRect: Rectangle = {
      id: 0,
      x,
      y,
      width: rectWidth,
      height: rectHeight,
      image: {} as Image,
      slug: "",
    };

    // Verify rectangle is within bounds
    if (!isWithinBounds(newRect)) {
      continue;
    }

    // Check collision with existing rectangles
    let hasCollision = false;
    for (const existingRect of existingRectangles) {
      if (checkCollision(newRect, existingRect, 4)) {
        hasCollision = true;
        break;
      }
    }

    if (!hasCollision) {
      return { x, y };
    }
  }

  return null;
};

// Function to generate all rectangles
const generateRectangles = (images: { image: Image; slug: string }[]) => {
  const rectanglesList: Rectangle[] = [];

  // Predefined positions with guaranteed no overlap
  const fallbackPositions = [
    { x: 5, y: 5, width: 35, height: 17.5 },
    { x: 60, y: 5, width: 35, height: 17.5 },
    { x: 5, y: 50, width: 35, height: 17.5 },
    { x: 60, y: 50, width: 35, height: 17.5 },
  ];

  const maxRectangles = Math.min(4, images.length);

  for (let i = 0; i < maxRectangles; i++) {
    const rectWidth = 40;
    const rectHeight = 20; // 2:1 aspect ratio

    // Try progressively smaller sizes
    const sizeAttempts = [
      { scale: 1.0, attempts: 50 },
      { scale: 0.8, attempts: 50 },
      { scale: 0.6, attempts: 30 },
      { scale: 0.5, attempts: 20 },
    ];

    let position = null;
    let finalWidth = rectWidth;
    let finalHeight = rectHeight;

    for (const { scale, attempts } of sizeAttempts) {
      const scaledWidth = rectWidth * scale;
      const scaledHeight = rectHeight * scale;

      position = generateRandomPosition(rectanglesList, scaledWidth, scaledHeight, attempts);

      if (position) {
        finalWidth = scaledWidth;
        finalHeight = scaledHeight;
        break;
      }
    }

    // Use fallback position if random positioning failed
    if (!position && fallbackPositions[i]) {
      const fallback = fallbackPositions[i];
      position = { x: fallback.x, y: fallback.y };
      finalWidth = fallback.width;
      finalHeight = fallback.height;

      // Verify fallback doesn't collide with existing rectangles
      const testRect: Rectangle = {
        id: 0,
        x: position.x,
        y: position.y,
        width: finalWidth,
        height: finalHeight,
        image: {} as Image,
        slug: "",
      };

      let hasCollision = false;
      for (const existingRect of rectanglesList) {
        if (checkCollision(testRect, existingRect, 4)) {
          hasCollision = true;
          break;
        }
      }

      // If fallback collides, make it smaller
      if (hasCollision) {
        finalWidth = fallback.width * 0.7;
        finalHeight = fallback.height * 0.7;
      }
    }

    // Only add rectangle if we have a valid position
    if (position) {
      const newRect: Rectangle = {
        id: i + 1,
        x: position.x,
        y: position.y,
        width: finalWidth,
        height: finalHeight,
        image: images[i].image,
        slug: images[i].slug,
      };

      // Final bounds check before adding
      if (isWithinBounds(newRect)) {
        rectanglesList.push(newRect);
      }
    }
  }

  return rectanglesList;
};

export function RandomRectangles({ images, className }: { images: { image: Image; slug: string }[]; className?: string }) {
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [containerWidth, setContainerWidth] = useState(1200);

  const regenerate = useCallback(() => {
    setRectangles(generateRectangles(images));
  }, [images]);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (typeof window !== "undefined") {
        setContainerWidth(window.innerWidth * 0.9);
      }
    };

    updateContainerWidth();

    const handleResize = () => {
      updateContainerWidth();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (containerWidth > 0) {
      regenerate();
    }
  }, [containerWidth, regenerate]);

  return (
    <div className={cn("w-full aspect-[4/3] max-h-full grow-1 relative z-10 overflow-hidden", className)}>
      {rectangles.map((rect) => {
        return (
          <Link
            key={rect.id}
            href={`/projects/${rect.slug}`}
            className="absolute transition-all duration-300 hover:scale-105 overflow-hidden"
            style={{
              left: `${rect.x}%`,
              top: `${rect.y}%`,
              width: `${rect.width}%`,
              aspectRatio: "2/1",
            }}
          >
            <ContentImage
              image={rect.image}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 25vw"
            />
          </Link>
        );
      })}
    </div>
  );
}
