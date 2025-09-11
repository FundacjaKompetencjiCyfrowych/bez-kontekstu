import { useState, useEffect, useCallback } from "react";

// Animation direction types for better type safety
export type AnimationDirection = "left" | "right" | "fade";

interface UseSliderNavigationProps {
  totalItems: number;
  initialIndex?: number;
}

interface UseSliderNavigationReturn {
  currentIndex: number;
  animationDirection: AnimationDirection;
  goToNext: () => void;
  goToPrevious: () => void;
  goToItem: (index: number) => void;
}

/**
 * Custom hook for managing slider navigation logic
 * Handles current index, animation direction, and navigation functions
 */
export function useSliderNavigation({ totalItems, initialIndex = 0 }: UseSliderNavigationProps): UseSliderNavigationReturn {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>("fade");

  // Reset current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goToNext = useCallback(() => {
    setAnimationDirection("right");
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const goToPrevious = useCallback(() => {
    setAnimationDirection("left");
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const goToItem = useCallback(
    (index: number) => {
      // Determine direction based on index difference
      const diff = index - currentIndex;
      if (Math.abs(diff) === 1) {
        setAnimationDirection(diff > 0 ? "right" : "left");
      } else {
        setAnimationDirection("fade");
      }
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  return {
    currentIndex,
    animationDirection,
    goToNext,
    goToPrevious,
    goToItem,
  };
}
