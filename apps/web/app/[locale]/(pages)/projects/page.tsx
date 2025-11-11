import { sanityFetch } from "@/app/lib/sanity/live";
import { projectsPageQuery } from "@/app/lib/sanity/queries";
import { cache } from "react";
import { Metadata } from "next";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { CollectionItem, CollectionShowcase } from "@/app/components/image/CollectionShowcase";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { PageContainer } from "@/app/components/layout/PageContainer";

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
  const projects = (data?.projects || []) as unknown as CollectionItem[];

  return (
    <PageContainer>
      <CollectionShowcase
        collection={projects}
        lang={locale}
        directory="projects"
        title={dictionary.split2.projects}
        srTitle={dictionary.projects}
      />
    </PageContainer>
  );
}
