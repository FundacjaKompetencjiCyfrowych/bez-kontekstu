import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { sanityFetch } from "@/app/lib/sanity/live";
import { cooperatorPageQuery } from "@/app/lib/sanity/queries";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { Metadata } from "next";
import { ContentImage } from "@/app/components/cms/ContentImage";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { twSizes } from "@/app/lib/twSizes";
import { Logo } from "@/app/components/image/Logo";
import { NavigationButton, NavigationButtonGroup } from "@/app/components/ui/NavigationButton";
import { PageContainer } from "@/app/components/layout/PageContainer";
import { SectionContainer } from "@/app/components/layout/SectionContainer";
import { FiArrowUpRight } from "react-icons/fi";

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

  if (!data) notFound();

  const dictionary = await getDictionary(locale);
  const { name, description, projects, socials, image, next, previous } = data || {};

  return (
    <PageContainer>
      <SectionContainer variant="heroFullscreen" className="xl:pt-10">
        <NavigationButton variant="previous" asChild className="self-start xl:hidden">
          <Link href="/cooperators">{dictionary.back}</Link>
        </NavigationButton>
        <Logo container="centered" />
        <div className="flex flex-col-reverse xl:grid xl:grid-cols-2 xl:items-center gap-8 w-full xl:flex-1">
          <div className="flex flex-col h-full">
            <NavigationButton variant="previous" asChild className="self-start hidden xl:inline-flex mb-8">
              <Link href="/cooperators">{dictionary.back}</Link>
            </NavigationButton>
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="uppercase hidden xl:block font-defectica text-[4rem] leading-relaxed whitespace-pre-line mb-8">
                {name?.replace(/\s/g, "\n")}
              </h1>
              <div className="font-space-mono text-[1rem] xl:text-[1.25rem] space-y-12">
                {description && <p>{description}</p>}
                {socials && socials?.length > 0 && (
                  <div className="flex gap-8 justify-between">
                    <div>Social media:</div>
                    <div className="flex flex-col gap-6">
                      {socials.map((social) => (
                        <a
                          key={social.label}
                          href={social.url}
                          target={social.newTab ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 justify-end hover:text-gray-300 transition-colors text-right"
                        >
                          {social.label}
                          <FiArrowUpRight className="w-[1.5em] h-[1.5em]" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {projects && projects?.length > 0 && (
                  <div className="md:flex space-y-6 gap-8 justify-between">
                    <div className="font-bold xl:font-normal">{dictionary.projects}:</div>
                    <div className="flex flex-col gap-2 xl:gap-6 text-right">
                      {projects.map((project: string) => (
                        <span key={project}>{project}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-14">
            <div className="relative">
              <h1 className="uppercase xl:hidden font-defectica text-[1.5rem] leading-[2rem] md:text-[2rem] md:leading-[2.5rem] z-10 absolute bottom-6 left-6 whitespace-pre-line">
                {name?.replace(/\s/g, "\n")}
              </h1>
              <div className="relative aspect-[4/3] lg:aspect-[3/2] xl:aspect-[3/4] overflow-hidden">
                {image ? (
                  <>
                    <ContentImage lqip image={image} fill sizes={twSizes("90vw lg:45vw max:580px")} />
                    <div className="xl:hidden absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                  </>
                ) : (
                  <div className="text-gray-400 text-xl font-mono text-center absolute inset-0 border grid place-items-center">
                    (brak zdjęcia)
                  </div>
                )}
              </div>
            </div>
            <NavigationButtonGroup
              previousSlug={previous?.slug?.current}
              previousLabel={dictionary.previous}
              nextSlug={next?.slug?.current}
              nextLabel={dictionary.next}
              pathname="cooperators"
              className="hidden xl:flex"
            />
          </div>
        </div>
        <NavigationButtonGroup
          previousSlug={previous?.slug?.current}
          previousLabel={dictionary.previous}
          nextSlug={next?.slug?.current}
          nextLabel={dictionary.next}
          pathname="cooperators"
          className="xl:hidden"
        />
      </SectionContainer>
    </PageContainer>
  );
}
