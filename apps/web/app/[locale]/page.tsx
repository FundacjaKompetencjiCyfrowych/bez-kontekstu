import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import { RandomRectangles } from "@/app/components/RandomRectangles";
import Link from "next/link";
import titleCutWord from "@/app/lib/titleCutWord";
import { Metadata } from "next";
import { getDictionary } from "../lib/intl/dictionaries/dynamic";
import { cache } from "react";
import { sanityFetch } from "../lib/sanity/live";
import { homePageQuery } from "../lib/sanity/queries";
import { mapMetadata } from "../lib/sanity/mappers";
import { ContentImage } from "../components/cms/ContentImage";
import { ContentText } from "../components/cms/ContentText";

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

  // Get first 4 team members from cooperators data
  const teamMembers = (data?.cooperators?.featured ?? []).slice(0, 4);

  // Function to render responsive titles - different layouts for mobile and desktop
  const renderResponsiveTitle = (
    mobileText: string,
    desktopText: string, // Text to be split by spaces for desktop layout
    textAlign: "left" | "right" = "right"
  ) => {
    const mobileLines = mobileText.split(" ");

    return (
      <>
        {/* Mobile version */}
        <div className="block xl:hidden">
          {mobileLines.map((line, index) => (
            <h3 key={index} className="sm:text-4xl md:text-6xl md:z-50 leading-10 md:leading-16">
              {line}
            </h3>
          ))}
        </div>

        {/* Desktop version */}
        <div className={`hidden xl:block xl:text-${textAlign}`}>{titleCutWord(desktopText)}</div>
      </>
    );
  };

  const buttonClasses =
    "h-10 px-7 py-6 w-[80vw] md:w-[30vw] xl:w-[250px] mx-auto inline-flex items-center justify-center transition-all duration-300 rounded-2xl text-white border-1 border-violet-400 hover:bg-violet-900/30 hover:border-violet-300 shadow-lg hover:cursor-pointer";

  return (
    <div className="px-5 xl:px-0 flex flex-col gap-[50px]">
      <h1 className="sr-only">{dictionary.noContext}</h1>

      {/* Hero Section */}
      <section
        className="relative flex flex-col min-h-[400px] sm:min-h-[70vh] md:landscape:min-h-[150vh] lg:landscape:min-h-[1000px] xl:min-h-[1000px] items-center justify-center"
        aria-labelledby="hero-title"
      >
        {/*Title */}
        <h2 className="sr-only" id="hero-title">
          Bez Kontekstu
        </h2>
        <div className="absolute right-0 top-0 block text-right" aria-hidden="true">
          {titleCutWord(dictionary.split2.noContext[0], "xl:mt-0 xl:ml-0")}
        </div>
        <div className="absolute left-0 bottom-0 block" aria-hidden="true">
          {titleCutWord(dictionary.split2.noContext[1], "xl:mt-0 xl:ml-0")}
        </div>
      </section>

      {/* MANIFEST Section*/}
      <section
        className="flex min-h-[90vh] flex-col justify-between md:landscape:h-[150vh] lg:landscape:h-[800px] md:min-h-[60vh] xl:min-h-[1000px]"
        aria-labelledby="manifest-title"
      >
        <div className="relative flex flex-col items-start xl:items-end justify-start z-10">
          {renderResponsiveTitle(dictionary.split.manifest, dictionary.split2.manifest[0], "right")}
        </div>

        <div className="z-10 mx-auto w-[75vw] text-center text-md font-mono leading-6 lg:w-[65vw] lg:text-xl lg:leading-10 xl:w-[60vw] xl:text-xl xl:leading-10">
          {data?.manifest?.body && <ContentText value={data.manifest.body} />}
        </div>

        <div className="z-10 flex transform items-center justify-center">
          <Link
            href={data?.manifest?.button?.url || "/manifest"}
            className={`w-full md:w-full lg:w-auto ${buttonClasses} w-full md:w-full lg:w-auto xl:w-[250px] xl:text-base xl:rounded-2xl xl:text-white xl:!bg-violet-400/30 xl:!border-violet-400 xl:hover:!bg-violet-900/30 xl:hover:!border-violet-500`}
            target={data?.manifest?.button?.newTab ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {data?.manifest?.button?.label}
          </Link>
        </div>

        {renderResponsiveTitle("", dictionary.split2.manifest[1], "left")}
      </section>

      {/* PROJECTS Section */}
      <section
        className="min-h-auto md:landscape:h-[150vh] lg:landscape:h-[1000px] xl:min-h-[1000px] flex flex-col justify-between bg-transparent"
        aria-labelledby="projects-title"
      >
        <div className="flex flex-col items-end justify-start">
          {renderResponsiveTitle(dictionary.split.projects, dictionary.split2.projects[0], "right")}
        </div>

        <RandomRectangles
          images={data?.projects?.featured?.map((project) => project?.cover).filter((image) => image !== null && image !== undefined) ?? []}
        />

        <div className="relative flex justify-center items-center transform z-10">
          <Link
            href={data?.projects?.button?.url || "/projects"}
            className={`w-full md:w-full lg:w-auto ${buttonClasses}`}
            target={data?.projects?.button?.newTab ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {data?.projects?.button?.label}
          </Link>
        </div>
        {renderResponsiveTitle("", dictionary.split2.projects[1], "left")}
      </section>

      {/* PEOPLE Section */}
      <section
        className="min-h-auto md:landscape:h-[300vh] lg:landscape:h-[1200px] lg:h-[1200px] xl:min-h-[1000px] flex flex-col justify-between sm:landscape:mt-10 lg:landscape:mt-0 bg-transparent"
        aria-labelledby="people-title"
      >
        <div className="flex flex-col z-10">
          {renderResponsiveTitle(dictionary.split.collaborators, dictionary.split2.collaborators[0], "right")}
        </div>

        <div className="w-[90%] max-w-[800px] my-4 mx-auto grid grid-cols-2 gap-5 xl:gap-8 aspect-square xl:aspect-[2 / 1] z-10 place-items-center content-center">
          {teamMembers.map((member) => (
            <div
              key={member._id}
              className="relative w-full md:h-70 sm:top-10 md:top-10 xl:top-0 aspect-square xl:w-[400px] xl:h-[300px] flex flex-col items-start justify-end p-3 overflow-hidden"
            >
              {/* Cooperator image */}
              {member.image && (
                <ContentImage
                  image={member.image}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 50vw, 400px"
                />
              )}
              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black/80 to-transparent"></div>
              {/* Name */}
              <h3 className="relative z-10 text-sm md:text-base text-white">{member.name}</h3>
            </div>
          ))}
        </div>

        <div className="relative mt-[50px] xl:mt-[0px] flex justify-center items-center transform z-10">
          <Link
            href={data?.cooperators?.button?.url || "/cooperators"}
            className={`w-full md:w-full lg:w-auto ${buttonClasses}`}
            target={data?.cooperators?.button?.newTab ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {data?.cooperators?.button?.label}
          </Link>
        </div>
        {renderResponsiveTitle("", dictionary.split2.collaborators[1], "left")}
      </section>

      {/* DONATORS Section */}
      <section
        className="relative md:landscape:h-[150vh] min-h-auto lg:landscape:h-[65vh] xl:mb-20 h-[50vh] md:h-[50vh] xl:h-[700px] flex flex-col md:justify-between justify-evenly bg-transparent"
        aria-labelledby="donators-title"
      >
        <div className=" flex flex-col items-end ">
          {renderResponsiveTitle(dictionary.split.support, dictionary.split2.support[0], "right")}
        </div>
        <div className="mx-auto flex flex-col items-center text-center text-base sm:text-2xl font-mono">
          {data?.support?.body && <ContentText value={data.support.body} />}
        </div>
        <div className="relative flex justify-center items-center transform z-10">
          <Link
            href={(data?.support?.button?.url as string) || "/donators"}
            className={`w-full md:w-full lg:w-auto ${buttonClasses}`}
            target={data?.support?.button?.newTab ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {data?.support?.button?.label}
          </Link>
        </div>
        {renderResponsiveTitle("", dictionary.split2.support[1], "left")}
      </section>
    </div>
  );
}
