import { cache } from "react";
import { sanityFetch } from "@/app/lib/sanity/live";
import { projectPageQuery } from "@/app/lib/sanity/queries";
import { Metadata } from "next";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

import { isYouTube, getYouTubeEmbedUrl } from "./utils";
import { cn } from "@/app/lib/utils";
import { MultimediaGallery } from "./gallery";
import { Fragment } from "react";
import { LogoContainer } from "@/app/components/Logo";
import { PaginationNav } from "@/app/components/PaginationNav";

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
    <div className="w-full bg-[#0d0b0e] px-5 xl:px-0 min-h-screen font-mono xl:max-w-7xl">
      {/* Navigation Header */}
      <div className="relative px-8 py-6 md:py-12 z-10">
        <Link href="/projects" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
          <FiArrowLeft className="w-2 h-2 md:w-4 md:h-4 xl:w-6 xl:h-6" />
          <p className="ml-4 md:text-xl">Wstecz</p>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative pb-8">
        <LogoContainer variant="justified" semiMorph />
        {/* Title and Year */}
        <div className="mb-8">
          <h2 className="mt-4 mb-16">{name?.toUpperCase()}</h2>
          <p className="text-xl md:text-3xl">{timestamp?.slice(0, 4)}</p>
        </div>

        {/* Description  */}
        <div className="relative mb-12">
          <p className="text-sm md:text-xl leading-relaxed ">{description}</p>
        </div>

        {/* Video Section */}
        {featured?._type === "video" && (
          <div className="mb-12">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video w-full">
              {isYouTube(featured?.url ?? "") && (
                <iframe
                  src={getYouTubeEmbedUrl(featured?.url ?? "")}
                  title={`${name} - Video`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  // Mobile accessibility: ensure proper touch targets and viewport
                  style={{ minHeight: "200px" }}
                />
              )}
            </div>
          </div>
        )}

        {/* Contributors */}
        {contributors &&
          contributors.length > 0 &&
          contributors.map((item, i) => {
            const { category, people, subcategories } = item;
            const isEven = i % 2 === 0;
            const isOdd = !isEven;
            return (
              <Fragment key={category}>
                {/* Heading */}
                <div className={cn(`mb-4 flex`, { "flex-row-reverse": isEven })}>
                  <div className="flex-[1_1_50%]"></div>
                  <h2 className={cn("md:text-6xl uppercase flex-[1_1_50%]", { "text-right": isEven })}>{category}</h2>
                </div>
                {/* Content */}
                <div className="mb-12 md:mb-24 grid grid-cols-2 gap-0">
                  <>
                    <div className={cn({ "order-2": isOdd })}></div>
                    <div className={cn("relative text-sm md:text-xl", { "text-right": isOdd })}>
                      {people && (
                        <div className="space-y-3">
                          {people.map((person, index) => (
                            <div key={index}>{person}</div>
                          ))}
                        </div>
                      )}
                      {subcategories &&
                        subcategories.map((sub) => (
                          <div className="mt-8" key={sub.subCategory}>
                            <h3 className="mb-4">
                              <strong>{sub.subCategory}:</strong>
                            </h3>
                            <div className="space-y-2">
                              {sub.people?.map((voice: string, index: number) => (
                                <div key={index}>{voice}</div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                </div>
              </Fragment>
            );
          })}

        {/* Multimedia Section */}
        <MultimediaGallery images={images} />
      </div>

      {/* Project Navigation */}
      <PaginationNav
        previous={previous}
        next={next}
        basePath="projects"
        dictionary={dictionary}
        variant="default"
      />
    </div>
  );
}
