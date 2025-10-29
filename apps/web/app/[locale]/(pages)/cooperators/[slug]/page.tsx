import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { cache } from "react";
import { sanityFetch } from "@/app/lib/sanity/live";
import { cooperatorPageQuery } from "@/app/lib/sanity/queries";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { Metadata } from "next";
import { ContentImage } from "@/app/components/cms/ContentImage";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { twSizes } from "@/app/lib/twSizes";
import { LogoContainer } from "@/app/components/Logo";
import { PaginationNav } from "@/app/components/PaginationNav";

const getCooperatorPage = cache(async (locale: string, slug: string) => {
  return await sanityFetch({ query: cooperatorPageQuery, params: { lang: locale, slug } });
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const { data } = await getCooperatorPage(locale, slug);
  return mapMetadata(data?.meta);
}

interface CooperatorPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function CooperatorBioPage({ params }: CooperatorPageProps) {
  const { slug, locale } = await params;

  const { data } = await getCooperatorPage(locale, slug);

  if (!data) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const { name, description, projects, socials, image, next, previous } = data || {};

  return (
    <div className="px-5 xl:min-h-full max-w-7xl mx-auto font-mono flex flex-col justify-center w-full">
      <div className="relative px-4">
        <LogoContainer variant="centered" />

        {/* MOBILE AND TABLET Layout */}
        {/* Back button */}
        <div className="relative lg:hidden w-fit px-4 my-[50px]">
          <Link href="/cooperators" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <FiArrowLeft className="w-2 h-3" />
            <p className="ml-2 text-sm">{dictionary.back}</p>
          </Link>
        </div>

        <div className="lg:hidden">
          {/* Portrait */}
          <div className="mb-8">
            <div className="relative w-full aspect-[4/3] mb-5 cursor-pointer overflow-hidden">
              <div className="w-full h-full [mask-image:linear-gradient(to_bottom,black_70%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
                {image ? (
                  <ContentImage image={image} lqip fill sizes={twSizes("90vw lg:955px max:955px")} />
                ) : (
                  <p className="text-gray-400 text-sm md:text-xl font-mono text-center pt-14">(brak zdjęcia)</p>
                )}
              </div>
              <div className="absolute bottom-0 left-0 p-3 z-10 mb-4 ml-3 text-2xl md:text-4xl text-left">
                <h3>
                  {name?.split(" ").map((word, index) => (
                    <div key={index}>{word}</div>
                  ))}
                </h3>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="relative mb-12">
            <p className="text-md md:text-xl leading-relaxed">{description}</p>
          </div>

          {/* Social Media */}
          <div className="mb-8 flex flex-row gap-2 justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-base md:text-xl mb-4">social media:</h3>
            </div>

            <div className="flex flex-col gap-2">
              {socials &&
                socials.length > 0 &&
                socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target={social.newTab ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                  >
                    <span className="md:text-xl">{social.label}</span>
                    <span className="text-xl">↗</span>
                  </a>
                ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-12">
            <h3 className="text-base md:text-xl mb-4 font-bold">projekty:</h3>
            <div className="flex flex-col gap-2">
              {projects &&
                projects.length > 0 &&
                projects.map((project, index) => (
                  <div key={index + project} className="text-sm md:text-lg">
                    <span>{project}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Mobile and Tablet Navigation */}
        <PaginationNav previous={previous} next={next} basePath="cooperators" dictionary={dictionary} variant="compact" />

        {/* ---------------------------------------------------------- */}
        {/* DESKTOP Layout (2 columns) */}
        {/* Back Button - Top */}
        <div className="hidden lg:block lg:mb-15 px-8">
          <div className="relative py-6 md:py-12 lg:py-0 lg:ml-2">
            <Link href="/cooperators" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
              <FiArrowLeft className="w-2 h-2 md:w-4 md:h-4 lg:w-6 lg:h-6" />
              <p className="ml-4 md:text-xl">{dictionary.back}</p>
            </Link>
          </div>
        </div>

        <div className="px-8 lg:px-0 hidden lg:flex lg:gap-12 lg:max-w-7xl lg:mx-auto">
          {/* Left Column - Biography */}
          <div className="relative w-1/2 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-6xl mb-8">
                {name?.split(" ").map((word, index) => (
                  <div key={index + word}>{word}</div>
                ))}
              </h2>
            </div>

            <div className="relative mb-12">
              <p className="text-xl lg:text-base leading-relaxed">{description}</p>
            </div>

            <div className="mb-8 flex flex-row gap-2 justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl lg:text-base mb-4">social media:</h3>
              </div>

              <div className="flex flex-col gap-2">
                {socials &&
                  socials.length > 0 &&
                  socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target={social.newTab ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                    >
                      <span className="text-xl lg:text-base">{social.label}</span>
                      <span className="text-xl">↗</span>
                    </a>
                  ))}
              </div>
            </div>

            <div className="mb-12 flex flex-row gap-2 justify-between">
              <div className="flex flex-row gap-2 ">
                <h3 className="text-xl lg:text-base mb-4 font-bold">projekty:</h3>
              </div>

              <div className="flex flex-col gap-2">
                {projects &&
                  projects.length > 0 &&
                  projects.map((project, index) => (
                    <div key={index} className="text-base text-right">
                      <span>{project}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column - Image and Navigation */}
          <div className="w-1/2 flex flex-col justify-center">
            <div className="mb-8">
              <div className="relative aspect-[3/4] overflow-hidden">
                {image ? (
                  <ContentImage lqip image={image} fill sizes={twSizes("0px lg:45vw max:580px")} />
                ) : (
                  <p className="text-gray-400 text-xl font-mono text-center pt-20">(brak zdjęcia)</p>
                )}
              </div>
            </div>

            <PaginationNav
              previous={previous}
              next={next}
              basePath="cooperators"
              dictionary={dictionary}
              variant="desktop"
              containerClassName="pb-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
