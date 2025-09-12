"use client";
import * as React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCooperatorById, getPreviousCooperatorId, getNextCooperatorId } from "@/app/lib/cooperators";
import { Footer } from "@/app/components/Footer";
import LogoViolet from "@/app/assets/images/logo_violet.png";
import ArrowRight from "@/app/assets/icons/next.png";
import ArrowLeft from "@/app/assets/icons/prev.png";
import CatImage from "@/app/assets/images/cooperators/cat.png";

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

  // Map cooperator IDs to imported images
  const cooperatorImages: { [key: number]: StaticImageData } = {
    1: CatImage,
    // Add more images here as you import them
    // 2: AnnaImage,
    // 3: PiotrImage,
    // 4: MariaImage,
  };

  // Get the image for current cooperator
  const cooperatorImage = cooperator ? cooperatorImages[cooperator.id] : null;

  if (!cooperator) {
    notFound();
  }

  return (
    <div className="bg-[#0d0b0e] min-h-screen font-mono flex flex-col justify-between">
      {/* Navigation Header */}
      <div className="relative px-8 py-6">
        <Link href="/cooperators" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
          <Image src={ArrowLeft} alt="Poprzedni" className="w-2 h-2 md:w-4 md:h-4" />
          <p className="ml-4 md:text-xl">Wstecz</p>
        </Link>
      </div>

      {/* Violet logo - sticky  */}
      <div className="sticky top-1/2 h-0 z-0">
        <Image
          src={LogoViolet}
          priority
          alt="Bez Kontekstu"
          className="absolute blur-[3px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-80 h-80 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 opacity-50"
        />
      </div>

      {/* ------------------------------------ */}
      {/* Main Content */}
      <div className="relative top-[30px] px-8 ">
        {/* Portrait Section */}
        <div className="mb-8">
          <div className="relative w-full h-[250px] md:h-[350px] mb-5 cursor-pointer overflow-hidden">
            {cooperatorImage ? (
              <Image
                src={cooperatorImage}
                alt={`Image of ${cooperator.name}`}
                width={800}
                className="w-full h-full object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 85vw"
                priority={cooperator.id <= 2}
              />
            ) : (
              <p className="text-gray-400 text-sm md:text-xl font-mono text-center pt-14">(brak zdjęcia)</p>
            )}

            {/* Gradient overlay for better text readability */}
            <div className="absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-t from-black/95 to-transparent pointer-events-none"></div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 p-3 z-10 mb-4 ml-3 text-2xl md:text-4xl xl:text-5xl text-left">
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
        <div className="mb-8 flex flex-row gap-2 justify-between md:justify-start">
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
                  "{project.title}", {project.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------ */}

      {/* Cooperator Navigation */}
      <div className="px-8 text-sm md:text-lg pt-10">
        <div className="flex justify-around items-center">
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

      <Footer />
    </div>
  );
}
