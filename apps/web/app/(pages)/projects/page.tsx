import Image, { StaticImageData } from "next/image";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import LogoViolet from "@/app/assets/images/logo_violet.png";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
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
      <section className="overflow-hidden h-auto flex flex-col justify-around mx-4 mt-[170px]">
        <div className="w-[85vw] text-center text-md sm:text-3xl md:text-4xl lg:text-5xl font-mono">
          <div className="w-100%] mx-auto flex flex-col gap-y-14 font-defectica">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="block transition-transform duration-200 hover:scale-105">
                <div className="relative flex flex-col items-start justify-end p-3 bg-green-500 w-[100%] h-[250px] mb-5 cursor-pointer">
                  <p className="relative text-md mb-4 ml-4">{project.year}</p>
                  <h2 className="relative mb-4 ml-4 text-xl">{project.name.toUpperCase()}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
