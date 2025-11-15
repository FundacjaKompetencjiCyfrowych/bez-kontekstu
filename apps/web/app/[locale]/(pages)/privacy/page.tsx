import { Logo } from "@/app/components/image/Logo";
import { PageContainer } from "@/app/components/layout/PageContainer";
import { ContentText } from "@/app/components/cms/ContentText";
import { sanityFetch } from "@/app/lib/sanity/live";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { privacyPageQuery } from "@/app/lib/sanity/queries";
import { Metadata } from "next";
import { cache } from "react";
import { SectionContainer } from "@/app/components/layout/SectionContainer";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
}

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
  const dictionary = await getDictionary(locale);
  const { data } = await getPrivacyPage(locale);
  return (
    <PageContainer>
      <SectionContainer className="pt-10">
        <Logo container="mobileOffset" />
        <h1 className="hidden xl:block font-defectica uppercase text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] xl-tall:text-[8rem] leading-[0.8]">
          {dictionary.privacy}
        </h1>
        <ContentText value={data?.content || []} />
      </SectionContainer>
    </PageContainer>
  );
}
