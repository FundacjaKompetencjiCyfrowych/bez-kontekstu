// Podstawowe typy dla aplikacji

export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "dark";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

// Typy dla responsywności
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
