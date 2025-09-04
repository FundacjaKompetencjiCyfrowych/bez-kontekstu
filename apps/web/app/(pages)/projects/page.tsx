import Image from "next/image";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import LogoViolet from "@/app/assets/images/logo_violet.png";
import { Footer } from "@/app/components/Footer";
import Link from "next/link";
import { getAllProjects } from "@/app/lib/projects";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="bg-[#0d0b0e]">
      {/*Title*/}
      <div className=" flex justify-between items-center mt-5 mx-8 z-10">
        <div className="flex flex-col text-white">
          <h1 className="text-5xl font-defectica">PRO</h1>
          <h1 className="text-5xl font-defectica">JEK</h1>
          <h1 className="text-5xl font-defectica">TY</h1>
        </div>
        <Image src={SoundIcon} alt="Logo" width={35} height={35} />
      </div>
      {/* PROJECTS Section */}
      {/* ------------------------- */}
      <div>
        {/* Fioletowe logo - sticky  */}
        <div className="h-[35vh]"></div>
        <div className="sticky top-1/2 h-0 z-0">
          <Image
            src={LogoViolet}
            priority
            alt="Bez Kontekstu"
            className="absolute blur-[3px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-80 h-80 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 opacity-50"
          />
        </div>

        {/* Content */}
        <section className="overflow-hidden h-auto flex flex-col justify-around mx-8 mt-[-50px]">
          <div className="w-[85vw] text-white text-center text-md sm:text-3xl md:text-4xl lg:text-5xl font-mono">
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
      </div>
      {/* ------------------------- */}

      <Footer />
    </div>
  );
}
