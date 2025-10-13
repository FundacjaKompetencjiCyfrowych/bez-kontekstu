"use client";
import Image, { StaticImageData } from "next/image";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import Link from "next/link";
import { getAllProjects } from "@/app/lib/projects";
import { useState, useRef } from "react";
import prevIcon from "@/app/assets/icons/prev.png";
import nextIcon from "@/app/assets/icons/next.png";
import LogoViolet from "@/app/components/LogoViolet";

import CopyOfCopyOfNpcPoster from "@/app/assets/images/copy_of_copy_of_npc.png";
import PrawdyZaGroszPoster from "@/app/assets/images/prawdy_za_grosz.png";
import GanglionyPoster from "@/app/assets/images/gangliony_gangliony.png";
import LimboPoster from "@/app/assets/images/limbo.png";

export default function ProjectsPage() {
  const projects = getAllProjects();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate how many slides we have (4 projects per slide)
  const totalSlides = Math.ceil(projects.length / 4);

  const scrollToSlide = (slideIndex: number) => {
    if (sliderRef.current) {
      // Calculate the width of one project card (25% of container width)
      const containerWidth = sliderRef.current.clientWidth;
      const cardWidth = containerWidth * 0.25; // 25% width per card
      const gap = 24; // gap-6 = 1.5rem = 24px
      const slideWidth = cardWidth * 4 + gap * 3; // 4 cards + 3 gaps between them

      sliderRef.current.scrollTo({
        left: slideWidth * slideIndex,
        behavior: "smooth",
      });
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);
      scrollToSlide(newSlide);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);
      scrollToSlide(newSlide);
    }
  };

  const titleCutWord = (title: string) =>
    title.split(" ").map((word, index) => (
      <h1 className="sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3" key={index}>
        {word}
      </h1>
    ));

  // Map project IDs to imported poster images
  const posterImages: { [key: number]: StaticImageData } = {
    1: CopyOfCopyOfNpcPoster,
    2: PrawdyZaGroszPoster,
    3: GanglionyPoster,
    4: LimboPoster,
  };

  return (
    <div className="h-screen px-5 xl:overflow-hidden flex flex-col">
      <Header title="DLA DARCZYŃ CÓW" className="xl:hidden" showLogo={false} />
      <LogoViolet />

      <div className="relative flex xl:justify-center xl:items-center flex-1 xl:mt-[90px]">
        {/*Title desktop*/}
        <div className="hidden xl:block absolute right-0 top-0 text-right">{titleCutWord("PR O")}</div>

        {/* Content */}
        <section className="xl:overflow-hidden h-auto mx-auto flex flex-col items-center mt-[50px] xl:mt-0">
          <div className="w-[85vw] md:w-[70vw] text-center text-md sm:text-3xl md:text-4xl lg:text-5xl">
            {/* Mobile and tablet layout - vertical stack */}
            <div className="xl:hidden mx-auto flex flex-col gap-y-14 font-defectica">
              {projects.map((project) => {
                const posterImage = posterImages[project.id];

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="block transition-transform duration-200 hover:scale-105"
                  >
                    <div className="relative w-full h-[250px] md:h-[350px] mb-5 cursor-pointer overflow-hidden">
                      {posterImage ? (
                        <Image
                          src={posterImage}
                          alt={`Poster for ${project.name}`}
                          className="w-full h-full object-cover object-top md:object-center"
                          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 85vw"
                          priority={project.id <= 2}
                        />
                      ) : (
                        <p className="text-gray-400 text-sm md:text-xl font-mono text-center pt-14">(brak plakatu)</p>
                      )}

                      {/* Gradient overlay for better text readability */}
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 p-3 z-10 mb-4 ml-3 text-2xl md:text-3xl xl:text-4xl text-left">
                        <p className="text-md mb-2 font-mono">{project.year}</p>
                        <h2 className="text-2xl md:text-3xl">{project.name.toUpperCase()}</h2>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Desktop layout - horizontal slider */}
            <div className="hidden xl:block w-full">
              <div
                ref={sliderRef}
                className="flex overflow-x-auto scrollbar-hide gap-6 pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {projects.map((project) => {
                  const posterImage = posterImages[project.id];

                  return (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className="block transition-transform duration-200 hover:scale-105 flex-shrink-0"
                      style={{ width: "calc(25% - 18px)" }}
                    >
                      <div className="relative w-full h-[400px] cursor-pointer overflow-hidden">
                        {posterImage ? (
                          <Image
                            src={posterImage}
                            alt={`Poster for ${project.name}`}
                            className="w-full h-full object-cover object-center grayscale hover:grayscale-0"
                            sizes="25vw"
                            priority={project.id <= 4}
                          />
                        ) : (
                          <p className="text-gray-400 text-xl font-mono text-center pt-32">(brak plakatu)</p>
                        )}

                        {/* Gradient overlay for better text readability */}
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>

                        {/* Content overlay */}
                        <div className="absolute font-defectica bottom-0 left-0 p-4 z-10 mb-4 ml-4 text-3xl text-left">
                          <p className="text-lg mb-2 font-mono xl:hidden">{project.year}</p>
                          <h2 className="text-2xl xl:hidden">{project.name.toUpperCase()}</h2>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center px-4">
                {/* Previous button */}
                <button
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  className={`transition-all duration-200 ${currentSlide === 0 ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100 hover:scale-110 cursor-pointer"
                    }`}
                >
                  <Image src={prevIcon} alt="Previous slide" width={25} height={25} />
                </button>

                {/* Page indicator */}
                <div className="flex items-center space-x-2 text-white font-mono text-sm">
                  <span>{currentSlide + 1}</span>
                  <span>/</span>
                  <span>{totalSlides}</span>
                </div>

                {/* Next button */}
                <button
                  onClick={handleNextSlide}
                  disabled={currentSlide === totalSlides - 1}
                  className={`transition-all duration-200 ${currentSlide === totalSlides - 1
                      ? "opacity-30 cursor-not-allowed"
                      : "opacity-70 hover:opacity-100 hover:scale-110 cursor-pointer"
                    }`}
                >
                  <Image src={nextIcon} alt="Next slide" width={25} height={25} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/*Title desktop*/}
        <div className="hidden xl:block absolute left-0 bottom-0 text-left">{titleCutWord("J EKTY")}</div>
      </div>

      <Footer />
    </div>
  );
}
