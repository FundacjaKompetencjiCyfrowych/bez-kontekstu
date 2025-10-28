import { CollectionShowcase } from "@/app/components/CollectionShowcase";
import { cache } from "react";
import { cooperatorsPageQuery } from "@/app/lib/sanity/queries";
import { sanityFetch } from "@/app/lib/sanity/live";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { Metadata } from "next";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";

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
  const dictionary = await getDictionary(locale);

  return (
    <div className="min-h-screen xl:min-h-[1000px] px-5 xl:overflow-hidden flex flex-col">
      <CollectionShowcase collection={cooperators} lang={locale} directory="cooperators" title={dictionary.split2.collaborators} />
    </div>
  );
}
