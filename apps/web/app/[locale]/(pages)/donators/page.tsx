import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { sanityFetch } from "@/app/lib/sanity/live";
import { cache } from "react";
import { donatorsPageQuery } from "@/app/lib/sanity/queries";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { Metadata } from "next";
import { Logo } from "@/app/components/image/Logo";
import { PageContainer } from "@/app/components/layout/PageContainer";
import { SectionContainer } from "@/app/components/layout/SectionContainer";
import { SplitTitle } from "@/app/components/ui/SplitTitle";
import { DonatorSection } from "@/app/components/layout/DonatorSection";

// Cache and metadata functions
const getDonatorsPage = cache(async (locale: string) => {
  return await sanityFetch({ query: donatorsPageQuery, params: { lang: locale } });
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getDonatorsPage(locale);
  return mapMetadata(data?.meta);
}

// Main component
export default async function DonorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const { data } = await getDonatorsPage(locale);

  return (
    <PageContainer>
      <SectionContainer variant="heroCollapsedOnMobile" className="pt-16 xl:pt-0 lg:-mb-10">
        <Logo container="mobileOffset" semiMorph />
        <SplitTitle
          desktop="topRight"
          desktopText={dictionary.split2.support[0]}
          srText={dictionary.split2.support[0]}
          srId="donators-title"
          variant="hero"
        />
        <SplitTitle
          desktop="bottomLeft"
          desktopText={dictionary.split2.support[1]}
          srText={dictionary.split2.support[1]}
          srId="donators-title"
          variant="hero"
        />
        <div className="flex w-full">
          <div className="hidden xl:block flex-1"></div>
          <p className="relative flex-1 xl:pt-44 xl:font-bold text-[1rem] leading-[2.5rem] xl:text-[2.5rem] xl:leading-[3.125rem]">
            Twoje wsparcie
            <br />=<br />
            nowe przestrzenie sztuki
          </p>
        </div>
      </SectionContainer>

      {/* Info - Desktop 2-column layout */}
      <div className="relative xl:pt-20 xl:flex xl:flex-col xl:gap-20">
        {data?.sections &&
          data.sections.map((section, index) => (
            <DonatorSection
              key={section._key}
              section={section}
              dictionary={dictionary}
              imagePosition={index % 2 === 0 ? "left" : "right"}
            />
          ))}
      </div>
    </PageContainer>
  );
}
