import { Logo } from "@/app/components/image/Logo";
import { PageContainer } from "@/app/components/layout/PageContainer";
import { SplitTitle } from "@/app/components/ui/SplitTitle";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
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
  const dictionary = await getDictionary(locale);
  console.log(data && "data received");
  return (
    <PageContainer>
      <Logo container="centered" />
      <SplitTitle
        mobileText={dictionary.split2.privacy[0]}
        tabletText={dictionary.split2.privacy[0]}
        desktopText={dictionary.split2.privacy[0]}
        srText={dictionary.split2.privacy[0]}
        srId="privacy-title"
        variant="hero"
      />
      <SplitTitle
        mobileText={dictionary.split2.privacy[1]}
        tabletText={dictionary.split2.privacy[1]}
        desktopText={dictionary.split2.privacy[1]}
        srText={dictionary.split2.privacy[1]}
        srId="privacy-title"
        variant="hero"
      />

      <div className="flex flex-1 flex-col pt-10 xl:pt-0 font-mono sm:landscape:pt-10 xl:landscape:pt-0 md:text-xl xl:flex xl:justify-center xl:items-center xl:text-base">
        <div className="xl:text-xl md:mx-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</div>
      </div>
    </PageContainer>
  );
}
