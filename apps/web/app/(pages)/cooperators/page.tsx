import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { getAllCooperators, getCooperatorImage } from "@/app/lib/cooperators";
import Image from "next/image";
import Link from "next/link";

export default function CooperatorsPage() {
  const cooperators = getAllCooperators();

  return (
    <div className="bg-[#0d0b0e] px-5">
      <Header title="WSPÓ ŁPR ACE" />

      {/* Content */}
      <section className="overflow-hidden h-auto flex flex-col items-center mx-4 mt-[200px]">
        <div className="w-[85vw] md:w-[70vw] text-center text-md sm:text-3xl md:text-4xl lg:text-5xl">
          <div className="mx-auto flex flex-col gap-y-14 font-defectica">
            {cooperators.map((cooperator) => {
              const cooperatorImage = getCooperatorImage(cooperator.id);

              return (
                <Link
                  key={cooperator.id}
                  href={`/cooperators/${cooperator.id}`}
                  className="block transition-transform duration-200 hover:scale-105"
                >
                  <div className="relative w-full h-[250px] md:h-[350px] mb-5 cursor-pointer overflow-hidden">
                    {cooperatorImage ? (
                      <Image
                        src={cooperatorImage}
                        alt={`Image of ${cooperator.name} ${cooperator.surname}`}
                        width={800}
                        height={250}
                        className="w-full h-full object-cover object-top md:object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 85vw"
                        priority={cooperator.id <= 2}
                      />
                    ) : (
                      <p className="text-gray-400 text-sm md:text-xl font-mono text-center pt-14">(brak zdjęcia)</p>
                    )}

                    {/* Gradient overlay for better text readability */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 p-3 z-10 mb-4 ml-3 text-2xl md:text-3xl xl:text-4xl text-left">
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
