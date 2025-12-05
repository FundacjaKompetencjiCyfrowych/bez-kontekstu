import { RandomRectangles } from "@/app/components/image/RandomRectangles";
import { Metadata } from "next";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { cache } from "react";
import { sanityFetch } from "@/app/lib/sanity/live";
import { homePageQuery } from "@/app/lib/sanity/queries";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { ContentText } from "@/app/components/cms/ContentText";
import { SectionContainer } from "@/app/components/layout/SectionContainer";
import { SplitTitle } from "@/app/components/ui/SplitTitle";
import { TeamGrid } from "@/app/components/image/TeamGrid";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { PageContainer } from "../components/layout/PageContainer";
import { Logo } from "../components/image/Logo";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
}

function getFeaturedItems<T>(
  section:
    | {
        featureRandom?: boolean;
        randomCount?: number;
        featured?: T[] | null;
      }
    | null
    | undefined,
  defaultCount: number = 4
): T[] {
  if (!section?.featured) return [];
  if (section.featureRandom) {
    return [...section.featured].sort(() => Math.random() - 0.5).slice(0, section.randomCount ?? defaultCount);
  }
  return section.featured;
}

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

  const teamMembers = getFeaturedItems(data?.cooperators);
  const projects = getFeaturedItems(data?.projects);

  return (
    <PageContainer>
      {/* Hero Section */}
      <SectionContainer aria-labelledby="hero-title" variant="heroMain">
        <Logo container="centered" morph />
        <SplitTitle
          mobile="topRight"
          mobileText={dictionary.split2.noContext[0]}
          tablet="topRight"
          tabletText={dictionary.split2.noContext[0]}
          desktop="topRight"
          desktopText={dictionary.split2.noContext[0]}
          srText={dictionary.noContext}
          srId="hero-title"
          variant="hero"
        />
        <SplitTitle
          mobile="bottomLeft"
          mobileText={dictionary.split2.noContext[1]}
          tablet="bottomLeft"
          tabletText={dictionary.split2.noContext[1]}
          desktop="bottomLeft"
          desktopText={dictionary.split2.noContext[1]}
          srText={null}
          variant="hero"
        />
      </SectionContainer>

      {/* MANIFEST Section */}
      <SectionContainer variant="boxed" aria-labelledby="manifest-title">
        <SplitTitle
          mobile="right"
          mobileText={dictionary.split.manifest}
          tablet="right"
          tabletText={dictionary.split.manifest}
          desktop="topRight"
          desktopText={dictionary.split2.manifest[0]}
          srText={dictionary.manifest}
          srId="manifest-title"
        />

        <div className="text-body text-center">{data?.manifest?.body && <ContentText value={data.manifest.body} />}</div>

        <Button asChild>
          <Link href={data?.manifest?.button?.url || "/manifest"} target={data?.manifest?.button?.newTab ? "_blank" : undefined}>
            {data?.manifest?.button?.label}
          </Link>
        </Button>

        <SplitTitle desktop="bottomLeft" desktopText={dictionary.split2.manifest[1]} srText={null} />
      </SectionContainer>

      {/* PROJECTS Section */}
      <SectionContainer variant="boxed" aria-labelledby="projects-title">
        <SplitTitle
          mobile="left"
          mobileText={dictionary.split.projects}
          tablet="left"
          tabletText={dictionary.split.projects}
          desktop="topRight"
          desktopText={dictionary.split2.projects[0]}
          srText={dictionary.projects}
          srId="projects-title"
        />

        <RandomRectangles
          className="h-100 -mb-4 sm:mb-12 md:mb-28 lg:mb-40 xl:mb-20 -mt-8 sm:mt-0"
          images={
            projects
              ?.filter((project) => project?.cover && project.slug?.current)
              .map((project) => ({
                image: project.cover!,
                slug: project.slug!.current!,
              })) ?? []
          }
        />

        <Button asChild>
          <Link href={data?.projects?.button?.url || "/projects"} target={data?.projects?.button?.newTab ? "_blank" : undefined}>
            {data?.projects?.button?.label}
          </Link>
        </Button>

        <SplitTitle desktop="bottomLeft" desktopText={dictionary.split2.projects[1]} srText={null} />
      </SectionContainer>

      {/* PEOPLE Section */}
      <SectionContainer variant="boxed" aria-labelledby="people-title">
        <SplitTitle
          mobile="right"
          mobileText={dictionary.split.collaborators}
          tablet="right"
          tabletText={dictionary.split.collaborators}
          desktop="topRight"
          desktopText={dictionary.split2.collaborators[0]}
          srText={dictionary.collaborators}
          srId="people-title"
        />

        <TeamGrid members={teamMembers} />

        <Button asChild>
          <Link href={data?.cooperators?.button?.url || "/cooperators"} target={data?.cooperators?.button?.newTab ? "_blank" : undefined}>
            {data?.cooperators?.button?.label}
          </Link>
        </Button>

        <SplitTitle desktop="bottomLeft" desktopText={dictionary.split2.collaborators[1]} srText={null} />
      </SectionContainer>

      {/* SUPPORT Section */}
      <SectionContainer variant="boxed" aria-labelledby="donators-title" className="pb-0 xl:pb-44">
        <SplitTitle
          mobile="left"
          mobileText={dictionary.split.support}
          tablet="left"
          tabletText={dictionary.split.support}
          desktop="topRight"
          desktopText={dictionary.split2.support[0]}
          srText={dictionary.support}
          srId="donators-title"
        />

        <div className="text-body xl:text-emphasis text-center">{data?.support?.body && <ContentText value={data.support.body} />}</div>

        <Button asChild>
          <Link href={(data?.support?.button?.url as string) || "/donators"} target={data?.support?.button?.newTab ? "_blank" : undefined}>
            {data?.support?.button?.label}
          </Link>
        </Button>

        <SplitTitle desktopText={dictionary.split2.support[1]} desktop="bottomLeft" srText={null} />
      </SectionContainer>
    </PageContainer>
  );
}
