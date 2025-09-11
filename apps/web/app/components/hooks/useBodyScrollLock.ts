import { useEffect } from "react";

/**
 * Custom hook for preventing body scroll when modal/slider is open
 * Automatically restores scroll when component unmounts
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLocked]);
}
