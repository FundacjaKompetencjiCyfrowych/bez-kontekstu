import Image, { StaticImageData } from "next/image";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import Link from "next/link";
import { getAllProjects } from "@/app/lib/projects";

import CopyOfCopyOfNpcPoster from "@/app/assets/images/copy_of_copy_of_npc.png";
import PrawdyZaGroszPoster from "@/app/assets/images/prawdy_za_grosz.png";
import GanglionyPoster from "@/app/assets/images/gangliony_gangliony.png";
import LimboPoster from "@/app/assets/images/limbo.png";

export default function ProjectsPage() {
  const projects = getAllProjects();

  // Map project IDs to imported poster images
  const posterImages: { [key: number]: StaticImageData } = {
    1: CopyOfCopyOfNpcPoster,
    2: PrawdyZaGroszPoster,
    3: GanglionyPoster,
    4: LimboPoster,
  };

  return (
    <div className="min-h-screen bg-[#0d0b0e] px-5">
      <Header title="PRO JEK TY" />

      {/* PROJECTS Section */}
      <section className="overflow-hidden h-auto flex flex-col items-center mx-4 mt-[170px]">
        <div className="w-[85vw] text-center text-md sm:text-3xl md:text-4xl lg:text-5xl font-mono">
          <div className="w-100%] mx-auto flex flex-col gap-y-14 font-defectica">
            {projects.map((project) => {
              const posterImage = posterImages[project.id];

              return (
                <Link key={project.id} href={`/projects/${project.id}`} className="block transition-transform duration-200 hover:scale-105">
                  <div className="relative w-full h-[250px] mb-5 cursor-pointer overflow-hidden">
                    {posterImage ? (
                      <Image
                        src={posterImage}
                        alt={`Poster for ${project.name}`}
                        width={800}
                        className="w-full h-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 85vw"
                        priority={project.id <= 2}
                      />
                    ) : (
                      <p className="text-gray-400 text-sm font-mono text-center pt-14">(brak plakatu)</p>
                    )}

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 p-3 z-10 ">
                      <p className="text-md mb-4 ml-3 text-left text-md font-mono">{project.year}</p>
                      <h2 className="mb-4 ml-3 text-2xl">{project.name.toUpperCase()}</h2>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
