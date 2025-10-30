import { RandomRectangles } from "@/app/components/home/RandomRectangles";
import { Metadata } from "next";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { cache } from "react";
import { sanityFetch } from "@/app/lib/sanity/live";
import { homePageQuery } from "@/app/lib/sanity/queries";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { ContentText } from "@/app/components/cms/ContentText";
import { LogoContainer } from "@/app/components/Logo";
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
    <div className="px-5 lg:px-0 flex flex-1 flex-col gap-12 lg:gap-16 mb-16">
      <h1 className="sr-only">{dictionary.noContext}</h1>

      {/* Hero Section */}
      <div aria-labelledby="hero-title" className="relative h-[60vh] xl:h-[75vh] min-h-[450px]">
        <LogoContainer variant="centered" morph />
        <div className="absolute right-0 top-0" aria-hidden="true">
          {titleCutWord(dictionary.split2.noContext[0], "text-8xl")}
        </div>
        <div className="absolute left-0 bottom-0" aria-hidden="true">
          {titleCutWord(dictionary.split2.noContext[1], "text-8xl")}
        </div>
      </div>

      {/* MANIFEST Section */}
      <SectionContainer ariaLabelledby="manifest-title">
        <ResponsiveTitle
          mobileText={dictionary.split.manifest}
          desktopText={dictionary.split2.manifest[0]}
          desktopAlign="right"
          mobileAlign="left"
        />

        <div className="z-10 mx-auto max-w-3xl text-center text-sm md:text-lg lg:text-xl font-mono leading-relaxed">
          {data?.manifest?.body && <ContentText value={data.manifest.body} />}
        </div>

        <SectionButton
          href={data?.manifest?.button?.url || "/manifest"}
          label={data?.manifest?.button?.label || ""}
          newTab={data?.manifest?.button?.newTab}
          className="xl:!bg-violet-400/30 xl:!border-violet-400 xl:hover:!bg-violet-900/30"
        />

        <ResponsiveTitle mobileText="" desktopText={dictionary.split2.manifest[1]} desktopAlign="left" mobileAlign="left" />
      </SectionContainer>

      {/* PROJECTS Section */}
      <SectionContainer ariaLabelledby="projects-title">
        <ResponsiveTitle
          mobileText={dictionary.split.projects}
          desktopText={dictionary.split2.projects[0]}
          desktopAlign="right"
          mobileAlign="right"
        />

        <RandomRectangles
          className="-mt-12"
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

        <ResponsiveTitle mobileText="" desktopText={dictionary.split2.projects[1]} desktopAlign="left" mobileAlign="left" />
      </SectionContainer>

      {/* PEOPLE Section */}
      <SectionContainer ariaLabelledby="people-title">
        <ResponsiveTitle
          mobileText={dictionary.split.collaborators}
          desktopText={dictionary.split2.collaborators[0]}
          desktopAlign="right"
          mobileAlign="left"
        />

        <TeamGrid members={teamMembers} />

        <SectionButton
          href={data?.cooperators?.button?.url || "/cooperators"}
          label={data?.cooperators?.button?.label || ""}
          newTab={data?.cooperators?.button?.newTab}
        />

        <ResponsiveTitle mobileText="" desktopText={dictionary.split2.collaborators[1]} desktopAlign="left" mobileAlign="left" />
      </SectionContainer>

      {/* SUPPORT Section */}
      <SectionContainer ariaLabelledby="donators-title">
        <ResponsiveTitle
          mobileText={dictionary.split.support}
          desktopText={dictionary.split2.support[0]}
          desktopAlign="right"
          mobileAlign="right"
        />

        <div className="mx-auto flex flex-col items-center text-center text-base md:text-xl lg:text-2xl font-mono">
          {data?.support?.body && <ContentText value={data.support.body} />}
        </div>

        <SectionButton
          href={(data?.support?.button?.url as string) || "/donators"}
          label={data?.support?.button?.label || ""}
          newTab={data?.support?.button?.newTab}
        />

        <ResponsiveTitle mobileText="" desktopText={dictionary.split2.support[1]} desktopAlign="left" mobileAlign="left" />
      </SectionContainer>
    </div>
  );
}
