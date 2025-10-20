"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCooperatorById, getPreviousCooperatorId, getNextCooperatorId, getCooperatorImage } from "@/app/lib/cooperators";
import { Footer } from "@/app/components/Footer";
import LogoViolet from "@/app/components/LogoViolet";
import ArrowRight from "@/app/assets/icons/next.png";
import ArrowLeft from "@/app/assets/icons/prev.png";

interface CooperatorPageProps {
  params: Promise<{
    id: string;
  }>;
}

// This is the main component for the cooperator's bio page
export default function CooperatorBioPage({ params }: CooperatorPageProps) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = React.use(params);
  const id = parseInt(resolvedParams.id);

  if (isNaN(id)) {
    notFound();
    return null;
  }

  const cooperator = getCooperatorById(id);

  // Get the image for current cooperator
  const cooperatorImage = cooperator ? getCooperatorImage(cooperator.id) : null;

  if (!cooperator) {
    notFound();
  }

  return (
    <div className="bg-[#0d0b0e] px-5 xl:min-h-screen max-w-7xl mx-auto font-mono flex flex-col xl:justify-between justify-center">

      <LogoViolet />

      {/* XL Desktop Back Button - Top */}
      <div className="hidden xl:block px-8">
        <div className="relative py-6 md:py-12 xl:py-0 xl:mt-25 xl:ml-8">
          <Link href="/cooperators" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <Image src={ArrowLeft} alt="Poprzedni" className="w-2 h-2  md:w-4 md:h-4 xl:w-6 xl:h-6" />
            <p className="ml-4 md:text-xl">Wstecz</p>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative px-4">
        {/* Back button */}
        <div className="relative xl:hidden w-fit px-4 my-[50px]">
          <Link href="/cooperators" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <Image src={ArrowLeft} alt="Poprzedni" className="w-2 h-3" />
            <p className="ml-2 text-sm">Wstecz</p>
          </Link>
        </div>

        <div className="xl:hidden">
          {/* Portrait Section */}
          <div className="mb-8">
            <div className="relative w-full h-[250px] md:h-[350px] mb-5 cursor-pointer overflow-hidden">
              {cooperatorImage ? (
                <Image
                  src={cooperatorImage}
                  alt={`Image of ${cooperator.name}`}
                  width={800}
                  height={250}
                  className="w-full h-full object-cover object-top sm:object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 85vw"
                  priority={cooperator.id <= 2}
                />
              ) : (
                <p className="text-gray-400 text-sm md:text-xl font-mono text-center pt-14">(brak zdjęcia)</p>
              )}

              {/* Gradient overlay for better text readability */}
              <div className="absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-t from-black/95 to-transparent pointer-events-none"></div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 p-3 z-10 mb-4 ml-3 text-2xl md:text-4xl text-left">
                <h3>{cooperator.name.toUpperCase()}</h3>
                <h3>{cooperator.surname.toUpperCase()}</h3>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="relative mb-12">
            <p className="text-md md:text-xl leading-relaxed">{cooperator.description}</p>
          </div>

          {/* Social Media Section */}
          <div className="mb-8 flex flex-row gap-2 justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-base md:text-xl mb-4">social media:</h3>
            </div>

            <div className="flex flex-col gap-2">
              {cooperator.socialMedia.instagram && (
                <a
                  href={cooperator.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                >
                  <span className="md:text-xl">Instagram</span>
                  <span className="text-xl">↗</span>
                </a>
              )}
              {cooperator.socialMedia.facebook && (
                <a
                  href={cooperator.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                >
                  <span className="md:text-xl">Facebook</span>
                  <span className="text-xl">↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-12">
            <h3 className="text-base md:text-xl mb-4 font-bold">projekty:</h3>
            <div className="flex flex-col gap-2">
              {cooperator.projects.map((project, index) => (
                <div key={index} className="text-sm md:text-lg">
                  <span>
                    &quot;{project.title}&quot;, {project.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile and Tablet Navigation */}
        <div className="xl:hidden relative text-sm z-10">
          <div className="flex justify-between xl:justify-around items-center">
            {/* Previous Cooperator */}
            <div>
              {getPreviousCooperatorId(id) ? (
                <Link
                  href={`/cooperators/${getPreviousCooperatorId(id)}`}
                  className="flex items-center hover:text-gray-300 transition-colors"
                >
                  <div>
                    <Image src={ArrowLeft} alt="Poprzedni" className="inline-block mr-4 w-2 h-2 md:w-4 md:h-4" />
                    <span>Poprzedni</span>
                  </div>
                </Link>
              ) : (
                <div></div>
              )}
            </div>

            {/* Next Cooperator */}
            <div className="text-right">
              {getNextCooperatorId(id) ? (
                <Link
                  href={`/cooperators/${getNextCooperatorId(id)}`}
                  className="flex items-center justify-end gap-2 hover:text-gray-300 transition-colors"
                >
                  <div>
                    <span>Następny</span>
                    <Image src={ArrowRight} alt="Następny" className="inline-block ml-4 w-2 h-2 md:w-4 md:h-4" />
                  </div>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* XL Desktop Layout (2 columns) */}
        <div className="px-8 hidden xl:flex xl:gap-12 xl:max-w-7xl xl:mx-auto">
          {/* Left Column - Biography */}
          <div className="w-1/2 flex flex-col justify-center">

            {/* Name Section */}
            <div className="mb-8">
              <h2 className="text-4xl xl:text-6xl mb-2">{cooperator.name.toUpperCase()}</h2>
              <h2 className="text-4xl xl:text-6xl mb-8">{cooperator.surname.toUpperCase()}</h2>
            </div>

            {/* Description Section */}
            <div className="relative mb-12">
              <p className="text-xl xl:text-base leading-relaxed">{cooperator.description}</p>
            </div>

            {/* Social Media Section */}
            <div className="mb-8 flex flex-row gap-2 justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl xl:text-base mb-4">social media:</h3>
              </div>

              <div className="flex flex-col gap-2">
                {cooperator.socialMedia.instagram && (
                  <a
                    href={cooperator.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                  >
                    <span className="text-xl xl:text-base">Instagram</span>
                    <span className="text-xl">↗</span>
                  </a>
                )}
                {cooperator.socialMedia.facebook && (
                  <a
                    href={cooperator.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                  >
                    <span className="text-xl xl:text-base">Facebook</span>
                    <span className="text-xl">↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Projects Section */}
            <div className="mb-12 flex flex-row gap-2 justify-between">
              <div className="flex flex-row gap-2 ">
                <h3 className="text-xl xl:text-base mb-4 font-bold">projekty:</h3>
              </div>

              <div className="flex flex-col gap-2">
                {cooperator.projects.map((project, index) => (
                  <div key={index} className="text-base text-right">
                    <span>
                      &quot;{project.title}&quot;, {project.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Image and Navigation */}
          <div className="w-1/2 flex flex-col justify-center">
            {/* Portrait Section */}
            <div className="mb-8">
              <div className="relative w-full h-[500px] overflow-hidden">
                {cooperatorImage ? (
                  <Image
                    src={cooperatorImage}
                    alt={`Image of ${cooperator.name}`}
                    // width={800}
                    // height={500}
                    className="w-full h-full object-contain"
                    sizes="(max-width: 1280px) 0px, 50vw"
                    priority={cooperator.id <= 2}
                  />
                ) : (
                  <p className="text-gray-400 text-xl font-mono text-center pt-20">(brak zdjęcia)</p>
                )}
              </div>
            </div>

            {/* Navigation Section */}
            <div className="text-base">
              <div className="flex justify-evenly items-center">
                {/* Previous Cooperator */}
                <div>
                  {getPreviousCooperatorId(id) ? (
                    <Link
                      href={`/cooperators/${getPreviousCooperatorId(id)}`}
                      className="flex items-center hover:text-gray-300 transition-colors"
                    >
                      <div>
                        <Image src={ArrowLeft} alt="Poprzedni" className="inline-block mr-4 w-5 h-6 xl:w-3 xl:h-4 " />
                        <span>Poprzedni</span>
                      </div>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>

                {/* Next Cooperator */}
                <div className="text-right">
                  {getNextCooperatorId(id) ? (
                    <Link
                      href={`/cooperators/${getNextCooperatorId(id)}`}
                      className="flex items-center justify-end gap-2 hover:text-gray-300 transition-colors"
                    >
                      <div>
                        <span>Następny</span>
                        <Image src={ArrowRight} alt="Następny" className="inline-block ml-4 w-5 h-5 xl:w-3 xl:h-4" />
                      </div>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
