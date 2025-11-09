import { sanityFetch } from "@/app/lib/sanity/live";
import { SoundsClient } from "./client";
import { Metadata } from "next";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { cache } from "react";
import { soundsPageQuery } from "@/app/lib/sanity/queries";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { PageContainer } from "@/app/components/layout/PageContainer";
import { SectionContainer } from "@/app/components/layout/SectionContainer";
import { Logo } from "@/app/components/image/Logo";

const getSoundsPage = cache(async (locale: string) => {
  return await sanityFetch({ query: soundsPageQuery, params: { lang: locale } });
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getSoundsPage(locale);
  return mapMetadata(data?.meta);
}

export default async function SoundsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await getSoundsPage(locale);
  const { trackUrls } = data || {};
  const dictionary = await getDictionary(locale);

  return (
    <PageContainer>
      <SectionContainer variant="heroFullscreen">
        <Logo container="mobileOffset" />
        <h1 className="hidden xl:block w-full self-start font-defectica text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] xl-tall:text-[8rem] leading-none">
          BEATS&apos;N&apos;
          <br />
          PIECES
        </h1>

        <div className="w-full self-end">
          <h2 id="tracklist-title" className="sr-only">
            {dictionary.tracklist}
          </h2>
          <SoundsClient tracks={trackUrls ?? []} dictionary={dictionary} className="xl:w-1/2 ml-auto" />
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
