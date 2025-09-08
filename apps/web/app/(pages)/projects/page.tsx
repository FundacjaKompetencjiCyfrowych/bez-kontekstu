import Image from "next/image";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import LogoViolet from "@/app/assets/images/logo_violet.png";
import { Footer } from "@/app/components/Footer";
import Link from "next/link";
import { getAllProjects } from "@/app/lib/projects";
// Import poster images
import CopyOfCopyOfNpcPoster from "@/app/assets/images/copy_of_copy_of_npc.png";
import PrawdyZaGroszPoster from "@/app/assets/images/prawdy_za_grosz.png";
import GanglionyPoster from "@/app/assets/images/gangliony_gangliony.png";
import LimboPoster from "@/app/assets/images/limbo.png";
import LogoFallback from "@/app/assets/images/logo.png";

export default function ProjectsPage() {
  const projects = getAllProjects();

  // Map project IDs to imported poster images
  const posterImages: { [key: number]: any } = {
    1: CopyOfCopyOfNpcPoster,
    2: PrawdyZaGroszPoster,
    3: GanglionyPoster,
    4: LimboPoster,
  };

  return (
    <div className="bg-[#0d0b0e]">
      {/*Title*/}
      <div className=" flex justify-between items-center mt-12 mx-8 z-10">
        <div className="flex flex-col">
          <h1 className="text-5xl font-defectica">PRO</h1>
          <h1 className="text-5xl font-defectica">JEK</h1>
          <h1 className="text-5xl font-defectica">TY</h1>
        </div>
        <Image src={SoundIcon} alt="Logo" width={35} height={35} />
      </div>

      <div>
        {/* Violet logo - sticky  */}
        <div className="h-[20vh]"></div>
        <div className="sticky top-1/2 h-0 z-0">
          <Image
            src={LogoViolet}
            priority
            alt="Bez Kontekstu"
            className="absolute blur-[3px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-80 h-80 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 opacity-50"
          />
        </div>

        {/* PROJECTS Section */}
        <section className="overflow-hidden h-auto flex flex-col justify-around mx-8 mt-[-50px]">
          <div className="w-[85vw] text-white text-center text-md sm:text-3xl md:text-4xl lg:text-5xl font-mono">
            <div className="w-100%] mx-auto flex flex-col gap-y-14 font-defectica">
              {projects.map((project) => {
                const posterImage = posterImages[project.id] || LogoFallback;
                console.log(`Project ${project.id}:`, posterImage);

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="block transition-transform duration-200 hover:scale-105"
                  >
                    <div className="relative w-full h-[250px] mb-5 cursor-pointer overflow-hidden">
                      {/* Optimized background image using Next.js Image component */}
                      <Image
                        src={posterImage}
                        alt={`Poster for ${project.name}`}
                        width={800}
                        height={250}
                        className="w-full h-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 85vw"
                        priority={project.id <= 2}
                      />
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
      </div>
      <Footer />
    </div>
  );
}
