import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import LogoViolet from "@/app/components/LogoViolet";
import { CollectionShowcase } from "@/app/components/CollectionShowcase";
import { cache } from "react";
import { cooperatorsPageQuery } from "@/app/lib/sanity/queries";
import { sanityFetch } from "@/app/lib/sanity/live";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { Metadata } from "next";

const getCooperatorsPage = cache(async (locale: string) => {
  return await sanityFetch({ query: cooperatorsPageQuery, params: { lang: locale } });
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getCooperatorsPage(locale);
  return mapMetadata(data?.meta);
}

export default async function CooperatorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await getCooperatorsPage(locale);
  const cooperators = data?.cooperators || [];

  return (
    <div className="h-screen px-5 xl:overflow-hidden flex flex-col">
      <Header title="WSPÓ ŁPR ACE" className="xl:hidden" showLogo={false} />
      <LogoViolet />
      <CollectionShowcase collection={cooperators} lang={locale} directory="cooperators" />
      <Footer />
    </div>
  );
}
