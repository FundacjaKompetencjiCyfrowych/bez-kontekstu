import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import Logo from "@/app/assets/images/logo.png";
import LogoViolet from "@/app/assets/images/logo_violet.png";
import { Footer } from "@/app/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#0d0b0e]">
      {/*Title*/}
      <div className=" flex justify-between items-center mt-20 mx-8 z-10">
        <div className="flex flex-col text-white">
          <h1 className="text-4xl font-defectica">STRO</h1>
          <h1 className="text-4xl font-defectica">NAGL</h1>
          <h1 className="text-4xl font-defectica">OWN</h1>
          <h1 className="text-4xl font-defectica">A</h1>
        </div>
        <Image src={SoundIcon} alt="Logo" width={45} height={45} />
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden h-[80vh] flex flex-col justify-around mx-8  z-10">
        <div className="relative flex flex-col justify-end items-end z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">BEZ</h1>
        </div>

        <div className="relative flex flex-col justify-start items-start bottom-0 transform z-10">
          <div className=" flex flex-col">
            <h1 className="text-white text-4xl font-defectica">K</h1>
            <h1 className="text-white text-4xl font-defectica">O</h1>
            <h1 className="text-white text-4xl font-defectica">N</h1>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white flex flex-col">TEKSTU</h1>
        </div>

        {/* Logo w tle - koło z rozmyciem */}
        <Image
          src={Logo}
          priority
          // width={350}
          // height={350}
          alt="Bez Kontekstu"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-62 h-62 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192"
        />
      </section>

      {/* ------------------------- */}
      <div className="relative">
        {/* Fioletowe logo - sticky dla wszystkich sekcji od Manifest */}
        <div className="h-[30vh]"></div>
        <div className="sticky top-1/2 h-0 z-0">
          <Image
            src={LogoViolet}
            priority
            // width={350}
            // height={350}
            alt="Bez Kontekstu"
            className="absolute blur-[3px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-80 h-80 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 opacity-50"
          />
        </div>

        {/* MANIFEST Section*/}
        <section className="overflow-hidden h-screen flex flex-col justify-around mx-8 -mt-[35vh]">
          <div className="relative flex flex-col items-start justify-start z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3">MANIF</h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3">EST</h1>
          </div>

          <div className="w-[85vw] flex items-center z-10 text-white text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl font-mono">
            Fundacja Bez Kontekstu to przestrzeń, w której FUZJA sztuki i nowoczesnych technologii wyznacza nowe horyzonty. Działamy z myślą
            o tworzeniu innowacyjnych doświadczeń artystycznych, które przełamują granice tradycyjnych form wyrazu. Poprzez łączenie
            immersyjnego dźwięku, eksperymentów teatralnych oraz interdyscyplinarnych projektów edukacyjnych wprowadzamy odbiorców w świat,
            gdzie teatr spotyka się z cyfrową rzeczywistością.
          </div>

          <div className="relative flex justify-end items-center bottom-0 transform mr-2 sm:mr-3 mb-2 sm:mb-3 right-0 z-10">
            <Link href={"/manifest"}>
              <Button variant="dark" size="sm">
                Poznaj nas lepiej
              </Button>
            </Link>
          </div>
        </section>

        {/* PROJECTS Section */}
        <section className="relative overflow-hidden h-screen flex flex-col justify-around mx-8 bg-transparent">
          <div className="relative flex flex-col items-start justify-start z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3">PROJ</h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3">EKTY</h1>
          </div>

          <div className="w-[90vw] h-[50vh] mx-auto flex items-center z-10 bg-red-500">...........</div>

          <div className="relative flex justify-end items-center bottom-0 transform mr-2 sm:mr-3 mb-2 sm:mb-3 right-0 z-10">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3">OSOBY</h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3">WSPÓŁPRACUJĄCE</h1>
          </div>

          <div className="w-[95vw] h-[50vh] mx-auto flex items-center z-10 bg-green-500">
            <div className="flex flex-col items-center justify-center bg-amber-200 w-1/4 h-1/2">1</div>
            <div className="flex flex-col items-center justify-center bg-amber-200 w-1/4 h-1/2">2</div>
            <div className="flex flex-col items-center justify-center bg-amber-200 w-1/4 h-1/2">3</div>
            <div className="flex flex-col items-center justify-center bg-amber-200 w-1/4 h-1/2">4</div>
          </div>

          <div className="relative flex justify-end items-center bottom-0 transform mr-2 sm:mr-3 mb-2 sm:mb-3 right-0 z-10">
            <Link href={"/cooperators"}>
              <Button variant="dark" size="sm">
                Poznaj nasz zespół
              </Button>
            </Link>
          </div>
        </section>

        {/* DONATORS Section */}
        <section className="relative overflow-hidden h-[60vh] flex flex-col justify-around mx-8 bg-transparent">
          <div className="relative flex flex-col items-end text-4xl text-white z-10">
            <h1 className="sm:text-4xl md:text-5xl lg:text-6xl ">DLA</h1>
            <h1 className="sm:text-4xl md:text-5xl lg:text-6xl ">DARCZY</h1>
            <h1 className="sm:text-4xl md:text-5xl lg:text-6xl ">NCOW</h1>
          </div>

          <div className="w-[90vw] mx-auto flex flex-col items-center z-10 text-white text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl font-mono">
            <p>Twoje wsparcie</p>
            <p>=</p>
            <p>nowe przestrzenie sztuki</p>
          </div>

          <div className="relative flex justify-end items-center bottom-0 transform mr-2 sm:mr-3 mb-2 sm:mb-3 right-0 z-10">
            <Link href={"/donators"}>
              <Button variant="dark" size="sm">
                Wesprzyj nas
              </Button>
            </Link>
          </div>
        </section>
      </div>
      {/* ------------------------- */}

      <Footer />
    </div>
  );
}
