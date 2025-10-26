import { sanityFetch } from "@/app/lib/sanity/live";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { privacyPageQuery } from "@/app/lib/sanity/queries";
import { Metadata } from "next";
import { cache } from "react";

const getPrivacyPage = cache(async (locale: string) => {
  return await sanityFetch({ query: privacyPageQuery, params: { lang: locale } });
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getPrivacyPage(locale);
  return mapMetadata(data?.meta);
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await getPrivacyPage(locale);
  return <div>Privacy Policy</div>;
}
