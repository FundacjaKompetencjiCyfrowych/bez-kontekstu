import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import Logo from "@/app/assets/images/logo.png";
import LogoViolet from "@/app/assets/images/logo_violet.png";
import { Footer } from "@/app/components/Footer";
import { RandomRectangles } from "@/app/components/RandomRectangles";
import Link from "next/link";

export default function Home() {
  const teamMembers = [
    { id: 1, name: "Anna Kowalska" },
    { id: 2, name: "Piotr Nowak" },
    { id: 3, name: "Maria Wiśniewska" },
    { id: 4, name: "Tomasz Zieliński" },
  ];

  return (
    <div className="bg-[#0d0b0e]">
      {/*Title*/}
      <div className="flex justify-end h-20 items-center mt-5 mb-24 mx-8 z-10">
        <Image src={SoundIcon} alt="Logo" width={30} height={30} />
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden h-[80vh] flex flex-col justify-between mx-8  z-10">
        <div className="relative flex flex-col justify-end items-end z-10">
          <h1>BEZ</h1>
        </div>

        <div className="relative flex flex-col justify-start items-start bottom-0 transform z-10">
          <div className="flex flex-col">
            <h1>K</h1>
            <h1>O</h1>
            <h1>N</h1>
          </div>
          <h1 className="flex flex-col">TEKSTU</h1>
        </div>

        {/* Logo w tle - koło z rozmyciem */}
        <Image
          src={Logo}
          priority
          alt="Bez Kontekstu"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-62 h-62 md:w-96 md:h-96"
        />
      </section>

      <div className="relative">
        {/* Violet logo - sticky for all sections from Manifest */}
        <div className="h-[30vh]"></div>
        <div className="sticky top-1/2 h-0 z-0">
          <Image
            src={LogoViolet}
            priority
            alt="Bez Kontekstu"
            className="absolute blur-[3px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-80 h-80 md:w-96 md:h-96 opacity-50"
          />
        </div>

        {/* MANIFEST Section*/}
        <section className="overflow-hidden h-screen flex flex-col justify-around mx-8 mt-[-120px]">
          <div className="relative flex flex-col items-start justify-start z-10">
            <h1 className="ml-2 sm:ml-3 mt-2 sm:mt-3">MANIF</h1>
            <h1 className="ml-2 sm:ml-3 mt-2 sm:mt-3">EST</h1>
          </div>

          <div className="w-[80vw] leading-6 md:leading-10 mx-auto z-10 text-center text-md md:text-2xl font-mono">
            <p className="mb-4">
              Fundacja Bez Kontekstu to przestrzeń, w której FUZJA sztuki i nowoczesnych technologii wyznacza nowe horyzonty.
            </p>
            <p className="mb-4">
              Działamy z myślą o tworzeniu innowacyjnych doświadczeń artystycznych, które przełamują granice tradycyjnych form wyrazu.
            </p>
            <p className="mb-4">
              Poprzez łączenie immersyjnego dźwięku, eksperymentów teatralnych oraz interdyscyplinarnych projektów edukacyjnychwprowadzamy
              odbiorców w świat, gdzie teatr spotyka się z cyfrową rzeczywistością.
            </p>
          </div>

          <div className="relative flex justify-center items-center bottom-0 transform mr-2 sm:mr-3 mb-2 sm:mb-3 right-0 z-10">
            <Link href={"/manifest"}>
              <Button variant="dark" size="sm">
                Poznaj nas lepiej
              </Button>
            </Link>
          </div>
        </section>

        {/* PROJECTS Section */}
        <section className="relative overflow-hidden h-screen flex flex-col justify-around mx-8 bg-transparent">
          <div className="relative flex flex-col items-end justify-start z-10">
            <h1 className="ml-2 sm:ml-3 mt-2 sm:mt-3">PROJ</h1>
            <h1 className="ml-2 sm:ml-3 mt-2 sm:mt-3">EKTY</h1>
          </div>

          <div className="w-[100%] h-[70vh] mx-auto z-10">
            <RandomRectangles />
          </div>

          <div className="relative flex justify-center items-center bottom-0 transform mr-2 sm:mr-3 mb-2 sm:mb-3 right-0 z-10">
            <Link href={"/projects"}>
              <Button variant="dark" size="sm">
                Sprawdź projekty
              </Button>
            </Link>
          </div>
        </section>

        {/* PEOPLE Section */}
        <section className="relative overflow-hidden h-screen flex flex-col justify-evenly mx-8 bg-transparent">
          <div className="relative flex flex-col items-start justify-start z-10">
            <h1 className="ml-2 sm:ml-3 mt-2 sm:mt-3">WSPÓŁ</h1>
            <h1 className="ml-2 sm:ml-3 mt-2 sm:mt-3">PRACE</h1>
          </div>

          <div className="w-[95%] mx-auto grid grid-cols-2 gap-x-5 gap-y-8 aspect-square z-10">
            {teamMembers.map((member) => (
              <div key={member.id} className="relative flex flex-col items-start justify-end font-mono p-3 bg-amber-200 overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
                <h3 className="relative z-10 text-sm md:text-2xl">{member.name.toUpperCase()}</h3>
              </div>
            ))}
          </div>

          <div className="relative flex justify-center items-center bottom-0 transform mr-2 sm:mr-3 mb-2 sm:mb-3 right-0 z-10">
            <Link href={"/cooperators"}>
              <Button variant="dark" size="sm">
                Poznaj nasz zespół
              </Button>
            </Link>
          </div>
        </section>

        {/* DONATORS Section */}
        <section className="relative overflow-hidden h-[60vh] flex flex-col justify-around mx-8 bg-transparent">
          <div className="relative flex flex-col items-end ">
            <h1>DLA</h1>
            <h1>DARCZY</h1>
            <h1>ŃCOW</h1>
          </div>

          <div className="mx-auto flex flex-col items-center text-center text-base md:text-2xl font-mono">
            <p className="leading-10">Twoje wsparcie</p>
            <p className="leading-10">=</p>
            <p className="leading-10">nowe przestrzenie sztuki</p>
          </div>

          <div className="relative flex justify-center items-center bottom-0 transform mr-2 sm:mr-3 mb-2 sm:mb-3 right-0 z-10">
            <Link href={"/donators"}>
              <Button variant="dark" size="sm">
                Wesprzyj nas
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
