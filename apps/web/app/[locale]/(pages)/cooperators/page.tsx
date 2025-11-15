import { CollectionShowcase } from "@/app/components/image/CollectionShowcase";
import { cache } from "react";
import { cooperatorsPageQuery } from "@/app/lib/sanity/queries";
import { sanityFetch } from "@/app/lib/sanity/live";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { Metadata } from "next";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { PageContainer } from "@/app/components/layout/PageContainer";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
}

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
    <PageContainer>
      <CollectionShowcase
        collection={cooperators}
        lang={locale}
        directory="cooperators"
        title={dictionary.split2.collaborators}
        srTitle={dictionary.collaborators}
        multilineTitle
      />
    </PageContainer>
  );
}
