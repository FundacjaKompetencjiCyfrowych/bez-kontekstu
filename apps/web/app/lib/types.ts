// Podstawowe typy dla aplikacji

export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "dark";
  size?: "sm" ;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

// Typy dla responsywności
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export type NullableOptional<T> = {
  [K in keyof T]?: T[K] | null;
};
