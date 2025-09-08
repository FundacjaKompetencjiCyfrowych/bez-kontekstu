import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";

export default function CooperatorsPage() {
  const teamMembers = [
    { id: 1, name: "Anna ", surname: "Kowalska" },
    { id: 2, name: "Piotr ", surname: "Nowak" },
    { id: 3, name: "Maria ", surname: "Wiśniewska" },
    { id: 4, name: "Tomasz ", surname: "Zieliński" },
  ];
  return (
    <div className="bg-[#0d0b0e] px-5">
      <Header title="WSPÓ ŁPR ACE" />

      {/* Content */}
      <section className="overflow-hidden h-auto flex flex-col justify-around mx-4 mt-[200px]">
        <div className="w-[85vw] text-white text-center text-md sm:text-3xl md:text-4xl lg:text-5xl font-mono">
          <div className="w-100%] mx-auto flex flex-col gap-y-14 font-defectica">
            {teamMembers.map((teamMember) => (
              <div key={teamMember.id} className="relative flex flex-col items-start justify-end p-3 bg-orange-500 w-[100%] h-[250px] mb-5">
                {/* Gradient overlay  */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
                <h2 className="relative text-2xl ml-4 z-10">{teamMember.name.toUpperCase()}</h2>
                <h2 className="relative mb-4 ml-4 text-2xl z-10">{teamMember.surname.toUpperCase()}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
