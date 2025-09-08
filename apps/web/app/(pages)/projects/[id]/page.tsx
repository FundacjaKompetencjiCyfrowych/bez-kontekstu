import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById, getPreviousProjectId, getNextProjectId } from "@/app/lib/projects";
import { Footer } from "@/app/components/Footer";
import LogoViolet from "@/app/assets/images/logo_violet.png";
import ArrowRight from "@/app/assets/icons/next.png";
import ArrowLeft from "@/app/assets/icons/prev.png";

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

// This function generates the metadata for each project page
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(parseInt(id));

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} - Bez Kontekstu`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(parseInt(id));

  // If project doesn't exist, show 404 page
  if (!project) {
    notFound();
  }

  return (
    <div className="bg-[#0d0b0e] min-h-screen font-mono">
      {/* Navigation Header */}
      <div className="relative px-8 py-6">
        <Link href="/projects" className="flex items-center gap-2  hover:text-gray-300 transition-colors">
          <Image src={ArrowLeft} alt="Poprzedni" />
          <p>Wstecz</p>
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

      {/* Main Content */}
      <div className="relative px-8 pb-16">
        {/* Title and Year */}
        <div className="mb-8">
          <h1 className="mt-4 mb-16">{project.name.toUpperCase()}</h1>
          <p className="text-xl">{project.year}</p>
        </div>

        {/* Description  */}
        <div className="relative mb-12">
          <p className="text-sm leading-relaxed ">{project.description}</p>
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
          <h2>WYKONAWCY</h2>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-0">
          {/* Left Column */}
          <div></div>

          {/* Right Column - Data */}
          <div className="text-sm">
            <div className="space-y-3">
              {project.performers.map((performer, index) => (
                <div key={index}>{performer}</div>
              ))}
            </div>

            {/* Voice Over Section */}
            {project.voiceOver && project.voiceOver.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 font-bold">Głos GAS:</h3>
                <div className="space-y-2">
                  {project.voiceOver.map((voice, index) => (
                    <div key={index}>{voice}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Narrators Section */}
            {project.narrators && project.narrators.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 font-bold">Lektorzy:</h3>
                <div className="space-y-2">
                  {project.narrators.map((narrator, index) => (
                    <div key={index}>{narrator}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Creators Section */}
        <div className="mb-4">
          <h2 className="text-right">TWÓRCY</h2>
        </div>

        {project.creators && (
          <div className="mb-12 grid grid-cols-2 gap-0">
            {/* Left Column - Data */}
            <div className="text-right text-sm">
              {project.creators.direction && (
                <div className="mb-8">
                  <h3 className="mb-4 font-bold">Reżyseria:</h3>
                  <div className="space-y-2">
                    {project.creators.direction.map((director, index) => (
                      <div key={index}>{director}</div>
                    ))}
                  </div>
                </div>
              )}

              {project.creators.choreography && (
                <div className="mb-8">
                  <h3 className="mb-4 font-bold">Choreografia:</h3>
                  <div className="space-y-2">
                    {project.creators.choreography.map((choreographer, index) => (
                      <div key={index}>{choreographer}</div>
                    ))}
                  </div>
                </div>
              )}

              {project.creators.soundDirection && (
                <div className="mb-8">
                  <h3 className="mb-4 font-bold">Reżyseria dźwięku:</h3>
                  <div className="space-y-2">
                    {project.creators.soundDirection.map((soundDirector, index) => (
                      <div key={index}>{soundDirector}</div>
                    ))}
                  </div>
                </div>
              )}

              {project.creators.scenography && (
                <div className="mb-8">
                  <h3 className="mb-4 font-bold">Scenografia:</h3>
                  <div className="space-y-2">
                    {project.creators.scenography.map((scenographer, index) => (
                      <div key={index}>{scenographer}</div>
                    ))}
                  </div>
                </div>
              )}

              {project.creators.production && (
                <div className="mb-8">
                  <h3 className="mb-4 font-bold">Produkcja:</h3>
                  <div className="space-y-2">
                    {project.creators.production.map((producer, index) => (
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
            <h2 className="mb-6">MULTIMEDIA</h2>
            <div className="grid grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-800 relative overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
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
            {getPreviousProjectId(parseInt(id)) ? (
              <Link
                href={`/projects/${getPreviousProjectId(parseInt(id))}`}
                className="flex items-center hover:text-gray-300 transition-colors"
              >
                <div>
                  <Image src={ArrowLeft} alt="Poprzedni" className="inline-block mr-4" />
                  <span>Poprzedni</span>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* Next Project */}
          <div className="text-right">
            {getNextProjectId(parseInt(id)) ? (
              <Link
                href={`/projects/${getNextProjectId(parseInt(id))}`}
                className="flex items-center justify-end gap-2 hover:text-gray-300 transition-colors"
              >
                <div>
                  <span>Następny</span>
                  <Image src={ArrowRight} alt="Następny" className="inline-block ml-4" />
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
