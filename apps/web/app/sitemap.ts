import { MetadataRoute } from "next";
import { supportedLocales } from "@/app/lib/intl/locale";
import { allSlugsQuery } from "@/app/lib/sanity/queries";
import { CONFIG } from "config";
import { sanityFetch } from "./lib/sanity/live";

export const revalidate = 21600; // 6 hours

const baseUrl = CONFIG.baseUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = supportedLocales.flatMap((locale: string) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${locale}/cooperators`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${locale}/donators`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/${locale}/manifest`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ]);

  const { data: slugs } = await sanityFetch({ query: allSlugsQuery });

  const dynamicRoutes = slugs
    .filter(
      (slug): slug is { slug: string; language: string; _type: "project" | "sounds" | "cooperator" } =>
        slug.slug !== null && slug.language !== null
    )
    .flatMap((slug: { slug: string; language: string; _type: "project" | "sounds" | "cooperator" }) => {
      const path = slug._type === "cooperator" ? "cooperators" : "projects";
      return {
        url: `${baseUrl}/${slug.language}/${path}/${slug.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    });

  return [...staticRoutes, ...dynamicRoutes];
}
