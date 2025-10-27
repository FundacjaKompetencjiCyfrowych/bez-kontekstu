"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CopyOfCopyOfNpcPoster from "@/app/assets/images/copy_of_copy_of_npc.png";
import PrawdyZaGroszPoster from "@/app/assets/images/prawdy_za_grosz.png";
import GanglionyPoster from "@/app/assets/images/gangliony_gangliony.png";
import LimboPoster from "@/app/assets/images/limbo.png";

// Type for rectangle position and size
interface Rectangle {
  id: number;
  x: number; // position X in percentage
  y: number; // position Y in percentage
  width: number; // width in percentage
  height: number; // height in percentage
  imagePath: string; // path to project image
}

// Array of project images for rectangles
const projectImages = [CopyOfCopyOfNpcPoster, PrawdyZaGroszPoster, GanglionyPoster, LimboPoster];

// Function to check if two rectangles overlap (including gap)
// This ensures rectangles never touch each other
const checkCollision = (rect1: Rectangle, rect2: Rectangle, gap: number = 4): boolean => {
  // Calculate actual boundaries of rectangles with required gap
  const rect1Left = rect1.x;
  const rect1Right = rect1.x + rect1.width;
  const rect1Top = rect1.y;
  const rect1Bottom = rect1.y + rect1.height;

  const rect2Left = rect2.x;
  const rect2Right = rect2.x + rect2.width;
  const rect2Top = rect2.y;
  const rect2Bottom = rect2.y + rect2.height;

  // Check if rectangles are too close (within gap distance)
  // Rectangles collide if the distance between them is less than the gap
  return !(
    rect1Right + gap <= rect2Left || // rect1 is far enough to the left of rect2
    rect2Right + gap <= rect1Left || // rect2 is far enough to the left of rect1
    rect1Bottom + gap <= rect2Top || // rect1 is far enough above rect2
    rect2Bottom + gap <= rect1Top // rect2 is far enough above rect1
  );
};

// Function to generate random position for rectangle
const generateRandomPosition = (
  existingRectangles: Rectangle[],
  rectWidth: number,
  rectHeight: number,
  maxAttempts: number = 100
): { x: number; y: number } | null => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Generate random position (with smaller margin from edges for larger rectangles)
    const margin = 2; // 2% margin from edges
    const maxX = 100 - rectWidth - margin;
    const maxY = 100 - rectHeight - margin;

    // Ensure we don't go below minimum values
    if (maxX <= margin || maxY <= margin) {
      continue; // Skip this attempt if rectangle is too big for container
    }

    const x = Math.random() * (maxX - margin) + margin;
    const y = Math.random() * (maxY - margin) + margin;

    const newRect: Rectangle = {
      id: 0,
      x,
      y,
      width: rectWidth,
      height: rectHeight,
      imagePath: "",
    };

    // Check collision with existing rectangles
    let hasCollision = false;
    for (const existingRect of existingRectangles) {
      if (checkCollision(newRect, existingRect, 3)) {
        // 3% gap between rectangles to ensure they never touch
        hasCollision = true;
        break;
      }
    }

    // If no collision, return position
    if (!hasCollision) {
      return { x, y };
    }
  }

  // If couldn't find position after max attempts, return null
  return null;
};

// Function to generate all rectangles
const generateRectangles = () => {
  const rectanglesList: Rectangle[] = [];

  // Predefined fallback positions to ensure all 4 rectangles are always placed
  const fallbackPositions = [
    { x: 5, y: 5 }, // top-left
    { x: 50, y: 5 }, // top-right
    { x: 5, y: 50 }, // bottom-left
    { x: 50, y: 50 }, // bottom-right
  ];

  // Generate 4 horizontal rectangles with 2:1 proportions
  for (let i = 0; i < 4; i++) {
    let rectWidth, rectHeight;

    // Define base width size as percentage of parent width
    const baseWidthPercent = 40; // Base width in percentage of parent width

    // All rectangles have consistent proportions based on parent width
    // Calculate height based on width and aspect ratio for collision detection
    // All rectangles are horizontal with aspect ratio 2:1
    rectWidth = baseWidthPercent; // width as percentage of parent width
    rectHeight = baseWidthPercent / 2; // height = width/2 for 2:1 ratio

    // Try to find random position first
    let position = generateRandomPosition(rectanglesList, rectWidth, rectHeight, 50);

    if (!position) {
      // If random position failed, try with smaller size while maintaining exact proportions
      const scaleFactor = 0.8;

      // Scale both dimensions by the same factor to maintain exact proportions
      const smallerWidth = rectWidth * scaleFactor;
      const smallerHeight = rectHeight * scaleFactor;

      position = generateRandomPosition(rectanglesList, smallerWidth, smallerHeight, 50);

      if (position) {
        rectWidth = smallerWidth;
        rectHeight = smallerHeight;
      }
    }

    if (!position) {
      // If still no position, try even smaller size while maintaining exact proportions
      const scaleFactor = 0.6;

      // Scale both dimensions by the same factor to maintain exact proportions
      const evenSmallerWidth = rectWidth * scaleFactor;
      const evenSmallerHeight = rectHeight * scaleFactor;

      position = generateRandomPosition(rectanglesList, evenSmallerWidth, evenSmallerHeight, 30);

      if (position) {
        rectWidth = evenSmallerWidth;
        rectHeight = evenSmallerHeight;
      }
    }

    // If still no position found, use fallback position
    if (!position) {
      // Use smaller size for fallback while maintaining exact proportions
      const scaleFactor = 0.4;

      // Scale both dimensions by the same factor to maintain exact proportions
      let fallbackWidth = rectWidth * scaleFactor;
      let fallbackHeight = rectHeight * scaleFactor;

      // Try each fallback position until we find one that doesn't collide
      let fallbackPosition = null;
      for (const fallback of fallbackPositions) {
        const testRect: Rectangle = {
          id: 0,
          x: fallback.x,
          y: fallback.y,
          width: fallbackWidth,
          height: fallbackHeight,
          imagePath: "",
        };

        let hasCollision = false;
        for (const existingRect of rectanglesList) {
          if (checkCollision(testRect, existingRect, 3)) {
            hasCollision = true;
            break;
          }
        }

        if (!hasCollision) {
          fallbackPosition = fallback;
          break;
        }
      }

      // If even fallback positions collide, use the assigned fallback position with even smaller size
      if (!fallbackPosition) {
        fallbackPosition = fallbackPositions[i];
        const finalScaleFactor = 0.25;

        // Scale both dimensions by the same factor to maintain exact proportions
        fallbackWidth = rectWidth * finalScaleFactor;
        fallbackHeight = rectHeight * finalScaleFactor;
      }

      position = fallbackPosition;
      rectWidth = fallbackWidth;
      rectHeight = fallbackHeight;
    }

    // Always add the rectangle (guaranteed position)
    rectanglesList.push({
      id: i + 1,
      x: position.x,
      y: position.y,
      width: rectWidth,
      height: rectHeight,
      imagePath: projectImages[i].src,
    });
  }

  return rectanglesList;
};

export function RandomRectangles() {
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [containerWidth, setContainerWidth] = useState(1200); // Default container width

  const regenerate = () => {
    setRectangles(generateRectangles());
  };

  // Update container width when component mounts and window resizes
  useEffect(() => {
    const updateContainerWidth = () => {
      if (typeof window !== "undefined") {
        // Assuming the container is 90vw (from the parent div)
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

  // Generate rectangles when component mounts or container width changes
  useEffect(() => {
    if (containerWidth > 0) {
      regenerate();
    }
  }, [containerWidth]);

  return (
    <div className="w-full min-h-[400px] max-h-full grow-1 md:top-[-100px] relative py-4 z-10">
      {rectangles.map((rect) => (
        <div
          key={rect.id}
          className="absolute shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
          style={{
            left: `${rect.x}%`,
            top: `${rect.y}%`,
            width: `${rect.width}%`,
            aspectRatio: "2/1", // All rectangles are horizontal with 2:1 proportions
          }}
        >
          <Image
            src={rect.imagePath}
            alt={`Project image ${rect.id}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}
