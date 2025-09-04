import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/app/lib/projects";
import { Footer } from "@/app/components/Footer";
import LogoViolet from "@/app/assets/images/logo_violet.png";

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

// This function tells Next.js which paths to pre-generate at build time
export async function generateStaticParams() {
  // In a real app, you might fetch this from an API
  const projects = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];

  return projects;
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
      <div className="flex justify-between items-center px-8 py-6">
        <Link href="/projects" className="flex items-center gap-2  hover:text-gray-300 transition-colors">
          <span>←</span>
          <span>Wstecz</span>
        </Link>
      </div>

      {/* Fioletowe logo - sticky  */}
      <div className="h-[5vh]"></div>
      <div className="sticky top-1/2 h-0 z-0">
        <Image
          src={LogoViolet}
          priority
          alt="Bez Kontekstu"
          className="absolute blur-[3px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-80 h-80 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 opacity-50"
        />
      </div>

      {/* Main Content */}
      <div className="px-8 pb-16">
        {/* Title and Year */}
        <div className="mb-8">
          <p className="text-xl text-gray-300">{project.year}</p>
        </div>

        {/* Description with background pattern */}
        <div className="relative mb-12">
          <div className="absolute "></div>
          <div className="relative  p-6 rounded-lg">
            <p className="text-lg leading-relaxed ">{project.description}</p>
          </div>
        </div>

        {/* Video Section */}
        {project.videoUrl && (
          <div className="mb-12">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <div className="w-0 h-0 border-l-[12px] border-l-black border-y-[8px] border-y-transparent ml-1"></div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        )}

        {/* Performers Section */}
        <div className="mb-12">
          <h2 className="mb-6">WYKONAWCY</h2>
        </div>

        <div className="mb-12 text-right text-md mr-3">
          <div className="space-y-2">
            {project.performers.map((performer, index) => (
              <div key={index}>{performer}</div>
            ))}
          </div>

          {/* Voice Over Section */}

          {project.voiceOver && project.voiceOver.length > 0 && (
            <div className="mb-12 mt-12">
              <h3 className="mb-4">Głos gas:</h3>
              <div className="space-y-2">
                {project.voiceOver.map((voice, index) => (
                  <div key={index}>{voice}</div>
                ))}
              </div>
            </div>
          )}

          {/* Narrators Section */}
          {project.narrators && project.narrators.length > 0 && (
            <div className="mb-12">
              <h3 className="mb-4">Lektorzy:</h3>
              <div className="space-y-2">
                {project.narrators.map((narrator, index) => (
                  <div key={index}>{narrator}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Creators Section */}
        {project.creators && (
          <div className="mb-12">
            <h2 className="mb-6">TWÓRCY</h2>

            {project.creators.direction && (
              <div className="mb-6">
                <h3 className="mb-3">Reżyseria</h3>
                <div className="space-y-2">
                  {project.creators.direction.map((director, index) => (
                    <div key={index} className="text-lg">
                      {director}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.creators.choreography && (
              <div className="mb-6">
                <h3 className="mb-3">Choreografia</h3>
                <div className="space-y-2">
                  {project.creators.choreography.map((choreographer, index) => (
                    <div key={index} className="text-lg">
                      {choreographer}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.creators.soundDirection && (
              <div className="mb-6">
                <h3 className="mb-3">Reżyseria dźwięku</h3>
                <div className="space-y-2">
                  {project.creators.soundDirection.map((soundDirector, index) => (
                    <div key={index} className="text-lg">
                      {soundDirector}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.creators.scenography && (
              <div className="mb-6">
                <h3 className="mb-3">Scenografia</h3>
                <div className="space-y-2">
                  {project.creators.scenography.map((scenographer, index) => (
                    <div key={index} className="text-lg">
                      {scenographer}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.creators.production && (
              <div className="mb-6">
                <h3 className="mb-3">Produkcja</h3>
                <div className="space-y-2">
                  {project.creators.production.map((producer, index) => (
                    <div key={index} className="text-lg">
                      {producer}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Multimedia Section */}
        {project.images && project.images.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6">MULTIMEDIA</h2>
            <div className="grid grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className=" text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gray-600 rounded"></div>
                    <p className="text-sm">Image {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
