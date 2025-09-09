import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { getAllCooperators } from "@/app/lib/cooperators";
import Link from "next/link";

export default function CooperatorsPage() {
  const cooperators = getAllCooperators();
  return (
    <div className="bg-[#0d0b0e] px-5">
      <Header title="WSPÓ ŁPR ACE" />

      {/* Content */}
      <section className="overflow-hidden h-auto flex flex-col justify-around mx-4 mt-[200px]">
        <div className="w-[85vw] text-white text-center text-md sm:text-3xl md:text-4xl lg:text-5xl font-mono">
          <div className="w-100%] mx-auto flex flex-col gap-y-14 font-defectica">
            {cooperators.map((cooperator) => (
              <Link
                key={cooperator.id}
                href={`/cooperators/${cooperator.id}`}
                className="relative flex flex-col items-start justify-end p-3 bg-orange-500 w-[100%] h-[250px] mb-5 hover:bg-orange-600 transition-colors"
              >
                {/* Gradient overlay  */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
                <h2 className="relative text-2xl ml-4 z-10">{cooperator.name.toUpperCase()}</h2>
                <h2 className="relative text-2xl ml-4 z-10">{cooperator.surname.toUpperCase()}</h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
