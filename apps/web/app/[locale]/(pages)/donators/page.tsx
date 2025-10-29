import titleCutWord from "@/app/lib/titleCutWord";
import CopyField from "@/app/components/CopyField";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { sanityFetch } from "@/app/lib/sanity/live";
import { cache } from "react";
import { donatorsPageQuery } from "@/app/lib/sanity/queries";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { Metadata } from "next";
import { ContentImage } from "@/app/components/cms/ContentImage";
import { LogoContainer } from "@/app/components/Logo";
import { twSizes } from "@/app/lib/twSizes";

const getDonatorsPage = cache(async (locale: string) => {
  return await sanityFetch({ query: donatorsPageQuery, params: { lang: locale } });
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getDonatorsPage(locale);
  return mapMetadata(data?.meta);
}

export default async function DonorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const { data } = await getDonatorsPage(locale);

  const buttonClasses =
    "border border-violet-300 rounded-3xl p-3 mb-10 md:mb-16 bg-neutral-600/50 cursor-pointer w-full text-left relative z-10 ";

  return (
    <div className="font-mono">
      <div className="relative flex xl:justify-center xl:items-center xl:h-[80vh] xl:min-h-[1024px]">
        <LogoContainer variant="mobileOffset" />
        {/*Title desktop */}
        <div className="hidden xl:block absolute right-0 top-0 text-right">
          {titleCutWord(
            dictionary.split2.support[0],
            "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3"
          )}
        </div>
        <div className="xl:block hidden absolute left-0 bottom-0">
          {titleCutWord(
            dictionary.split2.support[1],
            "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3"
          )}
        </div>

        {/* Two column layout for desktop */}
        <div className="relative xl:mt-[100px] xl:grid xl:grid-cols-2 xl:gap-16 xl:w-full xl:max-w-7xl xl:mx-auto">
          {/* Left Column - Empty space */}
          <div className="xl:col-span-1"></div>

          {/* Right Column - Support message */}
          <div className="xl:col-span-1 xl:flex xl:items-center">
            <div className="hidden xl:flex flex-col text-left font-mono xl:text-4xl xl:leading-12">
              <p>Twoje wsparcie</p>
              <p>=</p>
              <p>nowe przestrzenie sztuki</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of content */}
      <div className="max-w-4xl xl:max-w-7xl mx-auto relative">
        {/* Support section - Mobile/Tablet */}
        <section className="relative text-sm my-12 mx-3 mt-[100px] py-10 text-left xl:hidden">
          <div className="pl-3 mx-auto flex flex-col sm:text-2xl md:text-2xl lg:text-5xl font-mono">
            <p className="leading-8  md:leading-14 ">Twoje wsparcie</p>
            <p className="leading-8  md:leading-14">=</p>
            <p className="leading-8  md:leading-14">nowe przestrzenie sztuki</p>
          </div>
        </section>

        {/* Info - Desktop 2-column layout */}
        <div className="relative mb-8 text-sm z-50 xl:grid xl:grid-cols-2 xl:gap-16 xl:max-w-7xl xl:mx-auto xl:py-20">
          {data?.sections &&
            data.sections.map((section, index) => (
              <div key={section._key} className="contents">
                {index % 2 === 0 ? (
                  <>
                    {/* Left Column - Image */}
                    <div className="hidden xl:flex xl:col-span-1 xl:items-center xl:justify-center">
                      <div className="relative w-full aspect-[5/8]">
                        {section.image && (
                          <ContentImage image={section.image} fill shimmer aspect={5 / 8} sizes={twSizes("0px xl:500px")} />
                        )}
                      </div>
                    </div>
                    {/* Right Column - Payment details */}
                    <div className="xl:col-span-1">
                      {section.body &&
                        section.body.map((body) => (
                          <div key={body._key}>
                            <div className="mx-6 mb-4 md:text-2xl xl:text-3xl xl:mx-0">
                              <h3 className="mb-6">
                                <strong>{body.heading?.title}</strong>
                              </h3>
                              <p className="leading-6 xl:leading-10">{body.heading?.subtitle}</p>
                            </div>
                            <div className="space-y-4 mt-10 mx-5 md:text-xl md:leading-10 xl:mx-0 xl:text-xl xl:leading-8">
                              {body.fields &&
                                body.fields.map((field) => (
                                  <CopyField
                                    key={field._key}
                                    className={buttonClasses}
                                    label={field.title || ""}
                                    value={field.text || ""}
                                    elementId={field._key}
                                    ariaLabel={dictionary.copyToClipboard}
                                    ariaLiveCopiedMessage={dictionary.copied}
                                    copiedText={dictionary.copied + " ✓"}
                                  />
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Left Column - 1% PIT / Patronite */}
                    <div className="xl:col-span-1">
                      {section.body &&
                        section.body.map((body) => (
                          <div key={body._key}>
                            <h3 className="mb-4 mx-7 md:text-3xl xl:text-4xl xl:mx-0">
                              <strong>{body.heading?.title}</strong>
                            </h3>
                            <p className="mb-10 mx-6 leading-6 md:leading-10 xl:text-xl xl:leading-8 xl:mx-0">
                              {body.heading?.subtitle}
                            </p>
                            <div className="space-y-4 mt-10 mx-5 md:text-xl md:leading-10 xl:mx-0 xl:text-xl xl:leading-8">
                              {body.fields &&
                                body.fields.map((field) => (
                                  <CopyField
                                    key={field._key}
                                    className={buttonClasses}
                                    label={field.title || ""}
                                    value={field.text || ""}
                                    elementId={field._key}
                                    copiedText={dictionary.copied + " ✓"}
                                    ariaLiveCopiedMessage={dictionary.copied}
                                    ariaLabel={dictionary.copyToClipboard}
                                  />
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                    {/* Right Column - Image */}
                    <div className="hidden xl:flex xl:col-span-1 xl:items-center xl:justify-center">
                      <div className="relative w-full aspect-[5/8]">
                        {section.image && (
                          <ContentImage image={section.image} aspect={5 / 8} fill shimmer sizes={twSizes("0px xl:500px")} />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
