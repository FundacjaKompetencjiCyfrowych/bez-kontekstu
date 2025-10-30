import ManifestSection from "@/app/components/manifest/ManifestSection";
import titleCutWord from "@/app/lib/titleCutWord";
import { Metadata } from "next";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { cache } from "react";
import { sanityFetch } from "@/app/lib/sanity/live";
import { manifestPageQuery } from "@/app/lib/sanity/queries";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { ContentImage } from "@/app/components/cms/ContentImage";
import { twSizes } from "@/app/lib/twSizes";
import { LogoContainer } from "@/app/components/Logo";

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
    <div className="flex w-full min-h-screen flex-col justify-between px-2 md:px-5 xl:flex xl:flex-col">
      {/* Main content */}
      <main className="relative mx-auto xl:max-w-7xl">
        <LogoContainer variant="mobileOffset" semiMorph />
        {data?.hero && (
          <div className="relative flex md:landscape:justify-center xl:min-h-[90vh] xl:items-center xl:justify-center">
            {/*Title desktop*/}
            <div className="hidden xl:block absolute right-0 top-0 text-right">
              {titleCutWord(dictionary.split2.manifest[0], "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl ml-2 sm:ml-3 mt-2 sm:mt-3")}
            </div>
            <div className="xl:block hidden absolute left-0 bottom-0">
              {titleCutWord(dictionary.split2.manifest[1], "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl ml-2 sm:ml-3 mt-2 sm:mt-3")}
            </div>

            {/* Two column layout for desktop */}
            <div className="relative mt-10 lg:mt-0 xl:mx-auto xl:grid xl:w-full xl:max-w-7xl xl:grid-cols-2">
              {/* Left Column - Quote */}
              <div className="flex w-3/4 flex-col font-mono mx-auto md:w-[60%] md:mx-auto md:text-xl md:leading-16 xl:col-span-1 xl:w-[80%]">
                <div className="md:mx-4">
                  <div className="relative z-10 flex flex-row items-start mt-0 md:landscape:mt-20 xl:landscape:mt-0 xl:justify-end">
                    <div className="text-7xl font-mono rotate-180 md:mr-4">„</div>
                    <div className="text-lg font-mono md:text-2xl xl:text-right xl:text-3xl xl:leading-12">
                      <strong>{data.hero.quote}</strong>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Column - Empty space */}
              <div className="xl:col-span-1"></div>
            </div>

            {/* Man Image */}
            <div className="hidden xl:block absolute bottom-0 left-1/2">
              <div className="relative w-[400px] min-h-[500px]">
                {data.hero.image && (
                  <ContentImage image={data.hero.image} fill sizes={twSizes("0px xl:400px")} className="object-cover" priority />
                )}
              </div>
            </div>
          </div>
        )}

        {data?.sections && data.sections.map((section, index) => <ManifestSection key={index} section={section} locale={locale} />)}
      </main>
    </div>
  );
}
