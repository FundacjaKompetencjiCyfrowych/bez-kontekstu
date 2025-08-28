import Image from "next/image";
import { Button } from "@/app/components/ui/Button";

import Logo from "@/app/assets/images/logo.png";
import LogoViolet from "@/app/assets/images/logo_violet.png";
import { Footer } from "@/app/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen flex flex-col justify-around mx-4 ">
        <div className="relative flex flex-col justify-end items-end z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">BEZ</h1>
        </div>

        <div className="relative flex flex-col justify-start items-start bottom-0 transform z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white flex flex-col">
            <span>K</span>
            <span>O</span>
            <span>N</span>
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white flex flex-col">TEKSTU</h1>
        </div>

        {/* Logo w tle - koło z rozmyciem */}
        <Image
          src={Logo}
          priority
          width={400}
          height={400}
          alt="Bez Kontekstu"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-76 h-76 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192"
        />
      </section>

      {/* MANIFEST Section */}
      <section className="relative overflow-hidden h-screen flex flex-col justify-around">
        <div className="relative flex flex-col items-start justify-start z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3">MANIF</h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3">EST</h1>
        </div>

        <div className="w-[90vw] mx-auto flex items-center z-10 text-white text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl font-mono">
          Fundacja Bez Kontekstu to przestrzeń, w której FUZJA sztuki i nowoczesnych technologii wyznacza nowe horyzonty. Działamy z myślą o
          tworzeniu innowacyjnych doświadczeń artystycznych, które przełamują granice tradycyjnych form wyrazu. Poprzez łączenie
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

        {/* Logo w tle - koło z rozmyciem */}
        <Image
          src={LogoViolet}
          priority
          width={400}
          height={400}
          alt="Bez Kontekstu"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-96 h-96 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 opacity-50"
        />
      </section>

      {/* PROJECTS Section */}
      <section className="relative overflow-hidden h-screen flex flex-col justify-around">
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
      <section className="relative overflow-hidden h-screen flex flex-col justify-evenly">
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
      <section className="relative overflow-hidden h-screen flex flex-col justify-around">
        <div className="relative flex flex-col items-start justify-start z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3">DLA DAR</h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3">CZYŃCÓW</h1>
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

        {/* Logo w tle - koło z rozmyciem */}
        <Image
          src={LogoViolet}
          priority
          width={400}
          height={400}
          alt="Bez Kontekstu"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-96 h-96 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 opacity-50"
        />
      </section>
      <Footer />
    </div>
  );
}
