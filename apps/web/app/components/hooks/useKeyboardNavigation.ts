import { useEffect } from "react";

interface UseKeyboardNavigationProps {
  isActive: boolean;
  onEscape: () => void;
  onArrowLeft: () => void;
  onArrowRight: () => void;
}

/**
 * Custom hook for handling keyboard navigation
 * Manages keyboard event listeners for slider controls
 */
export function useKeyboardNavigation({ isActive, onEscape, onArrowLeft, onArrowRight }: UseKeyboardNavigationProps) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onEscape();
          break;
        case "ArrowLeft":
          event.preventDefault();
          onArrowLeft();
          break;
        case "ArrowRight":
          event.preventDefault();
          onArrowRight();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, onEscape, onArrowLeft, onArrowRight]);
}
