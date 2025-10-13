"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { getProjectById, getPreviousProjectId, getNextProjectId, Project } from "@/app/lib/projects";
import { Footer } from "@/app/components/Footer";
import { ImageSlider } from "@/app/components/ImageSlider";
import LogoViolet from "@/app/components/LogoViolet";
import ArrowRight from "@/app/assets/icons/next.png";
import ArrowLeft from "@/app/assets/icons/prev.png";
import LogoVioletImage from "@/app/assets/images/logo_violet.png";

// Function to convert YouTube URL to embed format
function getYouTubeEmbedUrl(url: string): string {
  // Handle youtu.be format
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Handle youtube.com/watch format
  if (url.includes("youtube.com/watch")) {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    const videoId = urlParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }

  // Return original URL if it's not a recognized YouTube format
  return url;
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);

  // We need to handle async params in client component
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState<number | null>(null);

  React.useEffect(() => {
    const loadProject = async () => {
      const resolvedParams = await params;
      const id = parseInt(resolvedParams.id);
      const projectData = getProjectById(id);
      if (!projectData) {
        notFound();
      }
      setProject(projectData);
      setProjectId(id);
      setLoading(false);
    };
    loadProject();
  }, [params]);

  const handleImageClick = (index: number) => {
    setSliderIndex(index);
    setSliderOpen(true);
  };

  const handleCloseSlider = () => {
    setSliderOpen(false);
  };

  if (loading || !project) {
    return <div className="bg-[#0d0b0e] min-h-screen font-mono flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-[#0d0b0e] px-5 xl:px-0 min-h-screen font-mono xl:absolute xl:top-[50px]">
      {/* Navigation Header */}
      <div className="relative px-8 py-6 md:py-12">
        <Link href="/projects" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
          <Image src={ArrowLeft} alt="Poprzedni" className="w-2 h-2  md:w-4 md:h-4 xl:w-6 xl:h-6" />
          <p className="ml-4 md:text-xl">Wstecz</p>
        </Link>
      </div>

      <LogoViolet />
              {/*Second violet logo - desktop */}
              <div className="hidden xl:block">              
          <Image
            src={LogoVioletImage}
            alt="Bez Kontekstu"
            className="hidden xl:block xl:absolute blur-[8px] left-1/2 top-[100vh] transform -translate-x-1/2 xl:w-200 xl:h-200 opacity-25"
          />
        </div>


      {/* Main Content */}
      <div className="relative px-8 pb-16">
        {/* Title and Year */}
        <div className="mb-8">
          <h1 className="mt-4 mb-16">{project.name.toUpperCase()}</h1>
          <p className="text-xl md:text-3xl">{project.year}</p>
        </div>

        {/* Description  */}
        <div className="relative mb-12">
          <p className="text-sm md:text-xl leading-relaxed ">{project.description}</p>
        </div>

        {/* Video Section */}
        {project.videoUrl && (
          <div className="mb-12">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video w-full">
              <iframe
                src={getYouTubeEmbedUrl(project.videoUrl)}
                title={`${project.name} - Video`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                // Mobile accessibility: ensure proper touch targets and viewport
                style={{ minHeight: "200px" }}
              />
            </div>
          </div>
        )}

        {/* Performers Section */}
        <div className="mb-4">
          <h2 className="md:text-6xl">WYKONAWCY</h2>
        </div>

        <div className="mb-12 md:mb-24 grid grid-cols-2 gap-0">
          {/* Left Column */}
          <div></div>

          {/* Right Column - Data */}
          <div className="relative text-sm md:text-xl">
            <div className="space-y-3">
              {project.performers.map((performer: string, index: number) => (
                <div key={index}>{performer}</div>
              ))}
            </div>

            {/* Voice Over Section */}
            {project.voiceOver && project.voiceOver.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4">
                  <strong>Głos GAS:</strong>
                </h3>
                <div className="space-y-2">
                  {project.voiceOver.map((voice: string, index: number) => (
                    <div key={index}>{voice}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Narrators Section */}
            {project.narrators && project.narrators.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4">
                  <strong>Lektorzy:</strong>
                </h3>
                <div className="space-y-2">
                  {project.narrators.map((narrator: string, index: number) => (
                    <div key={index}>{narrator}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Creators Section */}
        <div className="mb-4 flex">
          <div className="w-[50%]"></div>
          <h2 className="text-left w-[50%] md:text-6xl">TWÓRCY</h2>
        </div>

        {project.creators && (
          <div className="mb-12 grid grid-cols-2 gap-0">
            {/* Left Column - Data */}
            <div className="text-right text-sm md:text-xl">
              {project.creators.direction && (
                <div className="mb-10">
                  <h3 className="mb-4">
                    <strong>Reżyseria:</strong>
                  </h3>
                  <div className="space-y-2">
                    {project.creators.direction.map((director: string, index: number) => (
                      <div key={index}>{director}</div>
                    ))}
                  </div>
                </div>
              )}

              {project.creators.choreography && (
                <div className="mb-10">
                  <h3 className="mb-4">
                    <strong>Choreografia:</strong>
                  </h3>
                  <div className="space-y-2">
                    {project.creators.choreography.map((choreographer: string, index: number) => (
                      <div key={index}>{choreographer}</div>
                    ))}
                  </div>
                </div>
              )}

              {project.creators.soundDirection && (
                <div className="mb-10">
                  <h3 className="mb-4">
                    <strong>Reżyseria dźwięku:</strong>
                  </h3>
                  <div className="space-y-2">
                    {project.creators.soundDirection.map((soundDirector: string, index: number) => (
                      <div key={index}>{soundDirector}</div>
                    ))}
                  </div>
                </div>
              )}

              {project.creators.scenography && (
                <div className="mb-10">
                  <h3 className="mb-4">
                    <strong>Scenografia:</strong>
                  </h3>
                  <div className="space-y-2">
                    {project.creators.scenography.map((scenographer: string, index: number) => (
                      <div key={index}>{scenographer}</div>
                    ))}
                  </div>
                </div>
              )}

              {project.creators.production && (
                <div className="mb-10">
                  <h3 className="mb-4">
                    <strong>Produkcja:</strong>
                  </h3>
                  <div className="space-y-2">
                    {project.creators.production.map((producer: string, index: number) => (
                      <div key={index}>{producer}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Multimedia Section */}
        {project.images && project.images.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 md:text-6xl ">MULTIMEDIA</h2>
            <div className="grid grid-cols-2 gap-4">
              {project.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(index)}
                  className="aspect-square bg-gray-800 relative overflow-hidden hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  aria-label={`View image ${index + 1} in full screen`}
                >
                  <Image
                    src={image}
                    alt={`${project.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Project Navigation */}
      <div className="px-8 text-sm">
        <div className="flex justify-around items-center">
          {/* Previous Project */}
          <div>
            {projectId && getPreviousProjectId(projectId) ? (
              <Link
                href={`/projects/${getPreviousProjectId(projectId)}`}
                className="flex items-center md:text-xl hover:text-gray-300 transition-colors"
              >
                <div>
                  <Image src={ArrowLeft} alt="Poprzedni" className="inline-block mr-4 w-2 h-2 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  <span>Poprzedni</span>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* Next Project */}
          <div className="text-right">
            {projectId && getNextProjectId(projectId) ? (
              <Link
                href={`/projects/${getNextProjectId(projectId)}`}
                className="flex items-center justify-end gap-2 md:text-xl hover:text-gray-300 transition-colors"
              >
                <div>
                  <span>Następny</span>
                  <Image src={ArrowRight} alt="Następny" className="inline-block ml-4 w-2 h-2 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                </div>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>

      {/* Image Slider Modal */}
      {project.images && project.images.length > 0 && (
        <ImageSlider images={project.images} isOpen={sliderOpen} onClose={handleCloseSlider} initialIndex={sliderIndex} />
      )}

      <Footer />
    </div>
  );
}
