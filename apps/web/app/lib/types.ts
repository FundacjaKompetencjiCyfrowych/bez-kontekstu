// Podstawowe typy dla aplikacji

export interface NavItem {
  key: "home" | "manifest" | "projects" | "collaborators" | "sounds" | "support" | "contact";
  href: string;
  description?: string;
}

// Typy dla responsywności
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export type NullableOptional<T> = {
  [K in keyof T]?: T[K] | null;
};
