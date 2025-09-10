import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { getAllCooperators } from "@/app/lib/cooperators";
import Image from "next/image";
import Link from "next/link";
import CatImage from "@/app/assets/images/cooperators/cat.png";
import type { StaticImageData } from "next/image";

export default function CooperatorsPage() {
  const cooperators = getAllCooperators();

  // Map project IDs to imported poster images
  const posterImages: { [key: number]: StaticImageData } = {
    1: CatImage,
  };

  return (
    <div className="bg-[#0d0b0e] px-5">
      <Header title="WSPÓ ŁPR ACE" />

      {/* Content */}
      <section className="overflow-hidden h-auto flex flex-col justify-around mx-4 mt-[170px]">
        <div className="w-[85vw] text-center text-md sm:text-3xl md:text-4xl lg:text-5xl ">
          <div className="w-100%] mx-auto flex flex-col gap-y-14 font-defectica">
            {cooperators.map((cooperator) => {
              const posterImage = posterImages[cooperator.id];

              return (
                <Link
                  key={cooperator.id}
                  href={`/cooperators/${cooperator.id}`}
                  className="block transition-transform duration-200 hover:scale-105"
                >
                  <div className="relative w-full h-[250px] mb-5 cursor-pointer overflow-hidden">
                    {posterImage ? (
                      <Image
                        src={posterImage}
                        alt={`Image of ${cooperator.name}`}
                        width={800}
                        className="w-full h-full object-cover object-top"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 85vw"
                        priority={cooperator.id <= 2}
                      />
                    ) : (
                      <p className="text-gray-400 text-sm font-mono text-center pt-14">(brak zdjęcia)</p>
                    )}

                    {/* Gradient overlay for better text readability */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 p-3 z-10 mb-4 ml-3 text-2xl text-left">
                      <h3>{cooperator.name.toUpperCase()}</h3>
                      <h3>{cooperator.surname.toUpperCase()}</h3>
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
