import { sanityFetch } from "@/app/lib/sanity/live";
import { projectsPageQuery } from "@/app/lib/sanity/queries";
import { cache } from "react";
import { Metadata } from "next";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { CollectionShowcase } from "@/app/components/CollectionShowcase";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { Logo } from "@/app/components/Logo";

const getProjectsPage = cache(async (locale: string) => {
  return await sanityFetch({ query: projectsPageQuery, params: { lang: locale } });
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getProjectsPage(locale);
  return mapMetadata(data?.meta);
}

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const { data } = await getProjectsPage(locale);
  const dictionary = await getDictionary(locale);
  const projects = data?.projects || [];

  return (
    <div className="h-screen xl:min-h-[1024px] px-5 xl:overflow-hidden flex flex-col">
      <div className="absolute right-0 left-0 top-0 h-[90vh]">
        <Logo offset className="w-8/10" />
      </div>
      <CollectionShowcase collection={projects} lang={locale} directory="projects" title={dictionary.split2.projects} />
    </div>
  );
}
