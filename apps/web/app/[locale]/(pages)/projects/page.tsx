import { sanityFetch } from "@/app/lib/sanity/live";
import { projectsPageQuery } from "@/app/lib/sanity/queries";
import { cache } from "react";
import { Metadata } from "next";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import LogoViolet from "@/app/components/LogoViolet";
import { CollectionShowcase } from "@/app/components/CollectionShowcase";

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
  const projects = data?.projects || [];

  return (
    <div className="h-screen px-5 xl:overflow-hidden flex flex-col">
      <Header title="PRO JEK TY" className="xl:hidden" showLogo={false} />
      <LogoViolet />
      <CollectionShowcase collection={projects} lang={locale} directory="projects" />
      <Footer />
    </div>
  );
}
