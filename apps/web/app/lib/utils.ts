import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Funkcja do łączenia klas CSS z Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Funkcja do formatowania daty
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
