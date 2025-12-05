import ManifestSection from "@/app/components/layout/ManifestSection";
import { Metadata } from "next";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { cache } from "react";
import { sanityFetch } from "@/app/lib/sanity/live";
import { manifestPageQuery } from "@/app/lib/sanity/queries";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { ContentImage } from "@/app/components/cms/ContentImage";
import { twSizes } from "@/app/lib/twSizes";
import { SectionContainer } from "@/app/components/layout/SectionContainer";
import { PageContainer } from "@/app/components/layout/PageContainer";
import { SplitTitle } from "@/app/components/ui/SplitTitle";
import { FaQuoteLeft } from "react-icons/fa";
import { Logo } from "@/app/components/image/Logo";
import { ContentText } from "@/app/components/cms/ContentText";
import { BlockContent } from "@/app/lib/sanity/types";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
}

const getManifestPage = cache(async (locale: string) => {
  return await sanityFetch({ query: manifestPageQuery, params: { lang: locale } });
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getManifestPage(locale);
  return mapMetadata(data?.meta);
}

export default async function ManifestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const { data } = await getManifestPage(locale);

  return (
    <PageContainer>
      <SectionContainer variant="heroCollapsedOnMobile" aria-labelledby="manifest-title" className="pt-20 lg:-mb-18 xl:mb-15 xl:pt-0">
        <Logo container="mobileOffset" semiMorph />
        <SplitTitle
          desktop="topRight"
          desktopText={dictionary.split2.manifest[0]}
          srText={dictionary.manifest}
          srId="manifest-title"
          variant="hero"
        />
        <SplitTitle
          desktop="bottomLeft"
          desktopText={dictionary.split2.manifest[1]}
          srText={dictionary.manifest}
          srId="manifest-title"
          variant="hero"
        />
        {data?.hero && (
          <>
            {/* Quote */}
            {/* <p className="relative max-w-[32rem] xl:mr-auto xl:ml-[5rem] pl-[1.5em] text-emphasis font-bold xl:text-right xl:font-normal">
              <FaQuoteLeft className="w-[1rem] h-[1rem] absolute left-0 top-[0.3rem]" />
              {data.hero.quote}
            </p> */}

            {/* Quote */}
            <div className="relative max-w-lg xl:mr-auto xl:ml-20 pl-[1.5em] text-emphasis font-bold xl:text-right xl:font-normal">
              <FaQuoteLeft className="w-4 h-4 absolute left-0 top-[0.3rem]" />
              <ContentText value={(data.hero.quote ?? {}) as BlockContent} variant="hero" />
            </div>

            {/* Image */}
            <div className="hidden xl:block bottom-0 left-1/2 absolute w-[400px] min-h-[500px]">
              {data.hero.image && (
                <ContentImage image={data.hero.image} fill sizes={twSizes("0px xl:400px")} className="object-cover" priority />
              )}
            </div>
          </>
        )}
      </SectionContainer>

      {data?.sections && data.sections.map((section, index) => <ManifestSection key={index} section={section} locale={locale} />)}
    </PageContainer>
  );
}
