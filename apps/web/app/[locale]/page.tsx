import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import Logo from "@/app/assets/images/logo.png";
import { RandomRectangles } from "@/app/components/RandomRectangles";
import Link from "next/link";
import LogoVioletImage from "@/app/assets/images/logo_violet.png";
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
            <h3 key={index} className="sm:text-4xl md:text-6xl ml-2 sm:ml-3 leading-10 sm:leading-18">
              {line}
            </h3>
          ))}
        </div>

        {/* Desktop version */}
        <div className={`hidden xl:block xl:text-${textAlign}`}>{titleCutWord(desktopText)}</div>
      </>
    );
  };

  return (
    <div className="">
      <h1 className="sr-only">{dictionary.noContext}</h1>
      {/* Hero Section */}
      <section className="relative flex flex-col min-h-[70vh] items-center justify-center" aria-labelledby="hero-title">
        {/*Title */}
        <h2 className="sr-only" id="hero-title">
          Bez Kontekstu
        </h2>
        <div className="absolute right-0 top-0 block text-right" aria-hidden="true">
          {titleCutWord(dictionary.split2.noContext[0], "xl:mt-0 xl:ml-0")}
        </div>
        <div className="absolute bottom-0 left-0 block" aria-hidden="true">
          {titleCutWord(dictionary.split2.noContext[1], "xl:mt-0 xl:ml-0")}
        </div>
        {/* Logo - white */}
        <Image
          src={Logo}
          priority
          alt={dictionary.noContextFoundation + " logo"}
          className="absolute left-1/2 top-1/2 h-[40vw] w-[40vw] min-h-48 min-w-48 max-h-192 max-w-192 -translate-x-1/2 -translate-y-1/2 transform object-contain"
          sizes="(max-width: 768px) 40vw, (max-width: 1280px) 40vw, 192px"
        />
      </section>

      <div className="relative px-5 xl:top-40 xl:px-0">
        {/* MANIFEST Section*/}
        <section
          className="flex h-screen flex-col justify-around overflow-hidden mt-[150px] md:landscape:h-[150vh] lg:landscape:h-[800px] md:h-[70vh] lg:h-[80vh] xl:mb-20 xl:h-[800px]"
          aria-labelledby="manifest-title"
        >
          {/* Violet logo */}
          <Image
            src={LogoVioletImage}
            alt="Bez Kontekstu"
            className="absolute left-1/2 hidden -translate-x-1/2 transform blur-[8px] opacity-25 md:block md:h-160 md:w-160 xl:h-200 xl:w-200"
            sizes="(max-width: 1280px) 160px, 200px"
          />
          <div className="relative flex flex-col items-start xl:items-end justify-start z-10">
            {renderResponsiveTitle(dictionary.split.manifest, dictionary.split2.manifest[0], "right")}
          </div>

          <div className="z-10 mx-auto w-[75vw] text-center text-md font-mono leading-6 lg:w-[65vw] lg:text-xl lg:leading-10 xl:w-[60vw] xl:text-xl xl:leading-10">
            {data?.manifest?.body && <ContentText value={data.manifest.body} />}

            <div className="z-10 flex transform items-center justify-center">
              {/* //! TODO FIX BUTTON NESTED IN ANCHOR - INVALID HTML  */}
              <Link
                href={data?.manifest?.button?.url || "/manifest"}
                className="w-full md:w-full lg:w-auto"
                target={data?.manifest?.button?.newTab ? "_blank" : "_self"}
              >
                <Button
                  variant="dark"
                  size="sm"
                  className="w-full md:w-full lg:w-auto xl:w-[250px] xl:text-base xl:rounded-2xl xl:text-white xl:!bg-violet-400/30 xl:!border-violet-400 xl:hover:!bg-violet-900/30 xl:hover:!border-violet-500"
                >
                  {data?.manifest?.button?.label}
                </Button>
              </Link>
            </div>
          </div>
          {renderResponsiveTitle("", dictionary.split2.manifest[1], "left")}
        </section>

        {/* PROJECTS Section */}
        <section
          className="relative overflow-hidden h-[70vh]  md:landscape:h-[150vh] lg:landscape:h-[1000px] xl:h-[1000px] xl:mb-20 flex flex-col justify-around bg-transparent"
          aria-labelledby="projects-title"
        >
          <div className="relative flex flex-col items-end justify-start z-10">
            {renderResponsiveTitle(dictionary.split.projects, dictionary.split2.projects[0], "right")}
          </div>

          <RandomRectangles
            images={
              data?.projects?.featured?.map((project) => project?.cover).filter((image) => image !== null && image !== undefined) ?? []
            }
          />

          <div className="relative flex justify-center items-center transform z-10">
            {/* //! TODO FIX BUTTON NESTED IN ANCHOR - INVALID HTML  */}
            <Link
              href={data?.projects?.button?.url || "/projects"}
              className="w-full md:w-full lg:w-auto"
              target={data?.projects?.button?.newTab ? "_blank" : "_self"}
            >
              <Button variant="dark" size="sm" className="w-full md:w-full lg:w-auto">
                {data?.projects?.button?.label}
              </Button>
            </Link>
          </div>
          {renderResponsiveTitle("", dictionary.split2.projects[1], "left")}
        </section>

        {/* PEOPLE Section */}
        <section
          className="relative h-screen md:mt-[150px] md:landscape:h-[300vh] lg:landscape:h-[1200px] lg:h-[1200px] xl:h-[1100px] xl:mb-20 flex flex-col justify-center bg-transparent"
          aria-labelledby="people-title"
        >
          <div className="absolute xl:right-0 top-[50px] xl:top-0 flex flex-col z-10">
            <div className="">{renderResponsiveTitle(dictionary.split.collaborators, dictionary.split2.collaborators[0], "right")}</div>
          </div>

          <div className="w-[90%] max-w-[800px] mx-auto grid grid-cols-2 gap-5 xl:gap-8 aspect-square xl:aspect-[2 / 1] z-10 place-items-center content-center">
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
            {/* //! TODO FIX BUTTON NESTED IN ANCHOR - INVALID HTML  */}
            <Link
              href={data?.cooperators?.button?.url || "/cooperators"}
              className="w-full md:w-full lg:w-auto"
              target={data?.cooperators?.button?.newTab ? "_blank" : "_self"}
            >
              <Button variant="dark" size="sm" className="w-full md:w-full lg:w-auto">
                {data?.cooperators?.button?.label}
              </Button>
            </Link>
          </div>
          <div className="absolute bottom-0 left-0">{renderResponsiveTitle("", dictionary.split2.collaborators[1], "left")}</div>
        </section>

        {/* DONATORS Section */}
        <section
          className="relative md:landscape:h-[150vh] lg:landscape:h-[65vh] xl:mb-20 h-[50vh] md:h-[60vh] xl:h-[700px] flex flex-col md:justify-between justify-evenly bg-transparent"
          aria-labelledby="donators-title"
        >
          <div className=" flex flex-col items-end ">
            <div>{renderResponsiveTitle(dictionary.split.support, dictionary.split2.support[0], "right")}</div>
          </div>
          <div className="mx-auto flex flex-col items-center text-center text-base sm:text-2xl font-mono">
            {data?.support?.body && <ContentText value={data.support.body} />}
          </div>
          <div className="relative flex justify-center items-center transform z-10">
            {/* //! TODO FIX BUTTON NESTED IN ANCHOR - INVALID HTML  */}
            <Link
              href={(data?.support?.button?.url as string) || "/donators"}
              className="w-full md:w-full lg:w-auto"
              target={data?.support?.button?.newTab ? "_blank" : "_self"}
            >
              <Button variant="dark" size="sm" className="w-full md:w-full lg:w-auto">
                {data?.support?.button?.label}
              </Button>
            </Link>
          </div>
          <div>{renderResponsiveTitle("", dictionary.split2.support[1], "left")}</div>
        </section>
      </div>
    </div>
  );
}
