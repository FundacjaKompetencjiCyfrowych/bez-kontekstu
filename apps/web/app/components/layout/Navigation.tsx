"use client";
import { NavItem } from "@/app/lib/types";
import { useRoutePath } from "@/app/lib/intl/hooks";
import { NavigationMobile } from "./NavigationMobile";
import { NavigationDesktop } from "./NavigationDesktop";

export const navigationItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "manifest", href: "/manifest" },
  { key: "projects", href: "/projects" },
  { key: "collaborators", href: "/cooperators" },
  { key: "support", href: "/donators" },
  { key: "contact", href: "/contact" },
];

export function Navigation() {
  const routePath = useRoutePath();

  const isProjectDetailPage = routePath.startsWith("/projects/") && routePath !== "/projects";
  const isCooperatorDetailPage = routePath.startsWith("/cooperators/") && routePath !== "/cooperators";
  const isSoundsPage = routePath.startsWith("/beats-n-pieces/");
  const isMobileMenuEnabled = !isProjectDetailPage && !isCooperatorDetailPage && !isSoundsPage;

  return (
    <nav className="w-full flex flex-col justify-center relative z-50 mb-10 xl:mb-0">
      <NavigationMobile isMobileMenuEnabled={isMobileMenuEnabled} routePath={routePath} />
      <NavigationDesktop />
    </nav>
  );
}
