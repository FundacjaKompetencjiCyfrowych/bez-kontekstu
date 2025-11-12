import { cache } from "react";
import { sanityFetch } from "@/app/lib/sanity/live";
import { projectPageQuery } from "@/app/lib/sanity/queries";
import { Metadata } from "next";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";

import { isYouTube, getYouTubeEmbedUrl } from "./utils";
import { cn } from "@/app/lib/utils";
import { Fragment } from "react";
import { MultimediaGallery } from "@/app/components/image/MultimediaGallery";
import { Logo } from "@/app/components/image/Logo";
import { PageContainer } from "@/app/components/layout/PageContainer";
import { NavigationButton, NavigationButtonGroup } from "@/app/components/ui/NavigationButton";
import { SectionContainer } from "@/app/components/layout/SectionContainer";
import { ContentImage } from "@/app/components/cms/ContentImage";
import { twSizes } from "@/app/lib/twSizes";

const getProjectPage = cache(async (locale: string, slug: string) => {
  return await sanityFetch({ query: projectPageQuery, params: { lang: locale, slug } });
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const { data } = await getProjectPage(locale, slug);
  return mapMetadata(data?.meta);
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const { data } = await getProjectPage(locale, slug);

  if (!data) notFound();

  const dictionary = await getDictionary(locale);
  const { name, description, multimedia, contributors, next, previous, timestamp } = data;
  const featured = Array.isArray(data.featured) ? data.featured[0] : null;

  // ! TODO replace with added video support
  const images = multimedia?.filter((item) => item._type === "img") || [];

  return (
    <PageContainer className="space-y-15">
      <Logo container="justified" semiMorph />
      <SectionContainer variant="regular">
        <NavigationButton variant="previous" asChild>
          <Link href="/projects">{dictionary.back}</Link>
        </NavigationButton>
        <h1 className="font-defectica uppercase text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] xl-tall:text-[8rem] leading-none">{name}</h1>
        <p className="text-[1rem] xl:text-[2rem]">{timestamp?.slice(0, 4)}</p>
        <p className="text-sm md:text-xl leading-relaxed ">{description}</p>
        {featured?._type === "img" && (
          <div className="w-full aspect-video">
            <ContentImage image={featured} fill aspect={16 / 9} sizes={twSizes("90vw max:690px")} />
          </div>
        )}
        {featured?._type === "video" && (
          <div className="relative bg-gray-900 overflow-hidden aspect-video w-full">
            {isYouTube(featured?.url ?? "") && (
              <iframe
                src={getYouTubeEmbedUrl(featured?.url ?? "")}
                title={`${name} - Video`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{ minHeight: "200px" }}
              />
            )}
          </div>
        )}
      </SectionContainer>

      <div className="space-y-36">
        {contributors &&
          contributors.length > 0 &&
          contributors.map((item, i) => {
            const { category, people, subcategories } = item;
            const isEven = i % 2 === 0;
            const isOdd = !isEven;
            return (
              <SectionContainer variant="regular" key={category}>
                {/* Heading */}
                <div className={cn(`flex`, { "flex-row-reverse": isEven })}>
                  <div className="flex-[1_1_50%]"></div>
                  <h2
                    className={cn("xl:hidden text-[2rem] md:text-[4rem] font-defectica uppercase flex-[1_1_50%]", { "text-right": isEven })}
                  >
                    {category}
                  </h2>
                </div>
                {/* Content */}
                <div className="grid grid-cols-2">
                  <>
                    <div className={cn({ "order-2": isOdd })}>
                      <h2
                        className={cn("hidden -mt-3 xl:block text-[2rem] md:text-[4rem] font-defectica uppercase flex-[1_1_50%]", {
                          "pr-11 text-right": isEven,
                          "pl-11": isOdd,
                        })}
                      >
                        {category}
                      </h2>
                    </div>
                    <div className={cn("relative text-sm md:text-xl", { "text-right": isOdd })}>
                      {people && (
                        <div className="space-y-4 xl:space-y-6 pb-8 xl:pb-10">
                          {people.map((person, index) => (
                            <div key={index} className="xl:font-bold">
                              {person}
                            </div>
                          ))}
                        </div>
                      )}
                      {subcategories &&
                        subcategories.map((sub) => (
                          <div key={sub.subCategory} className="pb-10 space-y-4 xl:space-y-6">
                            <h3 className="font-bold xl:font-normal">{sub.subCategory}</h3>
                            <div className="xl:font-bold space-y-4 xl:space-y-6">
                              {sub.people?.map((person: string, index: number) => (
                                <div key={index} className="">
                                  {person}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                </div>
              </SectionContainer>
            );
          })}
      </div>
      <MultimediaGallery images={images} />

      <NavigationButtonGroup
        previousSlug={previous?.slug?.current}
        nextSlug={next?.slug?.current}
        previousLabel={dictionary.previousMasc}
        nextLabel={dictionary.nextMasc}
        pathname="projects"
      />
    </PageContainer>
  );
}
