import { sanityFetch } from "@/app/lib/sanity/live";
import { SoundsClient } from "./client";
import { Metadata } from "next";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { cache } from "react";
import { soundsPageQuery } from "@/app/lib/sanity/queries";

const getProjectsPage = cache(async (locale: string) => {
  return await sanityFetch({ query: soundsPageQuery, params: { lang: locale } });
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getProjectsPage(locale);
  return mapMetadata(data?.meta);
}

export default async function SoundsPage() {
  return <SoundsClient />;
}
