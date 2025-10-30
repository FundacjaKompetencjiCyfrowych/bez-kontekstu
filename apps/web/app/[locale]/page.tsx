import { RandomRectangles } from "@/app/components/home/RandomRectangles";
import { Metadata } from "next";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { cache } from "react";
import { sanityFetch } from "@/app/lib/sanity/live";
import { homePageQuery } from "@/app/lib/sanity/queries";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { ContentText } from "@/app/components/cms/ContentText";
import { Logo } from "@/app/components/Logo";
import titleCutWord from "@/app/lib/titleCutWord";
import { SectionContainer } from "@/app/components/home/SectionContainer";
import { ResponsiveTitle } from "@/app/components/home/ResponsiveTitle";
import { SectionButton } from "@/app/components/home/SectionButton";
import { TeamGrid } from "@/app/components/home/TeamGrid";

const getHomepage = cache(async (locale: string) => {
  return await sanityFetch({ query: homePageQuery, params: { lang: locale } });
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getHomepage(locale);
  return mapMetadata(data?.meta);
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const { data } = await getHomepage(locale);

  const teamMembers = (data?.cooperators?.featured ?? []).slice(0, 4);

  return (
    <div className="px-5 xl:px-0 flex flex-col gap-12 lg:gap-16">
      <h1 className="sr-only">{dictionary.noContext}</h1>

      {/* Hero Section */}
      <SectionContainer ariaLabelledby="hero-title" className="relative min-h-[50vh] lg:min-h-[90vh] items-center justify-center">
        <Logo morph />
        <h2 className="sr-only" id="hero-title">
          {dictionary.noContext}
        </h2>

        <div className="absolute right-0 top-0" aria-hidden="true">
          {titleCutWord(dictionary.split2.noContext[0])}
        </div>
        <div className="absolute left-0 bottom-0" aria-hidden="true">
          {titleCutWord(dictionary.split2.noContext[1])}
        </div>
      </SectionContainer>

      {/* MANIFEST Section */}
      <SectionContainer ariaLabelledby="manifest-title" className="min-h-[70vh] lg:min-h-[90vh] gap-8 lg:gap-12">
        <ResponsiveTitle mobileText={dictionary.split.manifest} desktopText={dictionary.split2.manifest[0]} align="right" />

        <div className="z-10 mx-auto w-[85%] max-w-3xl text-center text-sm md:text-lg lg:text-xl font-mono leading-relaxed">
          {data?.manifest?.body && <ContentText value={data.manifest.body} />}
        </div>

        <SectionButton
          href={data?.manifest?.button?.url || "/manifest"}
          label={data?.manifest?.button?.label || ""}
          newTab={data?.manifest?.button?.newTab}
          className="xl:!bg-violet-400/30 xl:!border-violet-400 xl:hover:!bg-violet-900/30"
        />

        <ResponsiveTitle mobileText="" desktopText={dictionary.split2.manifest[1]} align="left" />
      </SectionContainer>

      {/* PROJECTS Section */}
      <SectionContainer ariaLabelledby="projects-title" className="min-h-[70vh] lg:min-h-[90vh] gap-8 lg:gap-12">
        <ResponsiveTitle mobileText={dictionary.split.projects} desktopText={dictionary.split2.projects[0]} align="right" />

        <RandomRectangles
          images={
            data?.projects?.featured
              ?.filter((project) => project?.cover && project.slug?.current)
              .map((project) => ({
                image: project.cover!,
                slug: project.slug!.current!,
              })) ?? []
          }
        />

        <SectionButton
          href={data?.projects?.button?.url || "/projects"}
          label={data?.projects?.button?.label || ""}
          newTab={data?.projects?.button?.newTab}
        />

        <ResponsiveTitle mobileText="" desktopText={dictionary.split2.projects[1]} align="left" />
      </SectionContainer>

      {/* PEOPLE Section */}
      <SectionContainer ariaLabelledby="people-title" className="min-h-[70vh] lg:min-h-[90vh] gap-8 lg:gap-12">
        <ResponsiveTitle mobileText={dictionary.split.collaborators} desktopText={dictionary.split2.collaborators[0]} align="right" />

        <TeamGrid members={teamMembers} />

        <SectionButton
          href={data?.cooperators?.button?.url || "/cooperators"}
          label={data?.cooperators?.button?.label || ""}
          newTab={data?.cooperators?.button?.newTab}
        />

        <ResponsiveTitle mobileText="" desktopText={dictionary.split2.collaborators[1]} align="left" />
      </SectionContainer>

      {/* SUPPORT Section */}
      <SectionContainer ariaLabelledby="donators-title" className="min-h-[50vh] lg:min-h-[70vh] gap-8 lg:gap-12 mb-12 lg:mb-20">
        <ResponsiveTitle mobileText={dictionary.split.support} desktopText={dictionary.split2.support[0]} align="right" />

        <div className="mx-auto flex flex-col items-center text-center text-base md:text-xl lg:text-2xl font-mono px-4">
          {data?.support?.body && <ContentText value={data.support.body} />}
        </div>

        <SectionButton
          href={(data?.support?.button?.url as string) || "/donators"}
          label={data?.support?.button?.label || ""}
          newTab={data?.support?.button?.newTab}
        />

        <ResponsiveTitle mobileText="" desktopText={dictionary.split2.support[1]} align="left" />
      </SectionContainer>
    </div>
  );
}
