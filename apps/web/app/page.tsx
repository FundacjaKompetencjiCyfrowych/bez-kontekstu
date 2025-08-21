import Image from "next/image";
import { Button } from "@/app/components/ui/Button";

export default function Home() {
  return (
    <div className="bg-blue-500">
      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <div className="flex flex-col items-end justify-start z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mr-2 sm:mr-3 mt-2 sm:mt-3 font-defectica">BEZ</h1>
        </div>

        <div className="absolute bottom-0 transform ml-2 sm:ml-3 mb-2 sm:mb-3 left-0 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mt-2 sm:mt-3 flex flex-col font-defectica">
            <span>K</span>
            <span>O</span>
            <span>N</span>
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-defectica">TEKSTU</h1>
        </div>

        {/* Logo w tle - koło z rozmyciem */}
        <Image
          src="/logo.png"
          priority
          width={400}
          height={400}
          alt="Bez Kontekstu"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-96 h-96 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192"
        />
      </section>

      {/* MANIFEST Section */}
      <section className="relative overflow-hidden h-screen flex flex-col justify-between">
        <div className="relative flex flex-col items-start justify-start z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3 font-defectica">MANIF</h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3 font-defectica">EST</h1>
        </div>

        <div className="w-[90vw] mx-auto flex items-center z-10 text-white text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl font-sans">
          Fundacja Bez Kontekstu to przestrzeń, w której FUZJA sztuki i nowoczesnych technologii wyznacza nowe horyzonty. Działamy z myślą o
          tworzeniu innowacyjnych doświadczeń artystycznych, które przełamują granice tradycyjnych form wyrazu. Poprzez łączenie
          immersyjnego dźwięku, eksperymentów teatralnych oraz interdyscyplinarnych projektów edukacyjnych wprowadzamy odbiorców w świat,
          gdzie teatr spotyka się z cyfrową rzeczywistością.
        </div>

        <div className="relative flex justify-end items-center bottom-0 transform mr-2 sm:mr-3 mb-2 sm:mb-3 right-0 z-10">
          <Button>test</Button>
        </div>

        {/* Logo w tle - koło z rozmyciem */}
        <Image
          src="/logo.png"
          priority
          width={400}
          height={400}
          alt="Bez Kontekstu"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-96 h-96 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 brightness-0 invert sepia hue-rotate-270 opacity-50"
        />
      </section>

      {/* PROJECTS Section */}
      <section className="relative overflow-hidden h-screen flex flex-col justify-between">
        <div className="relative flex flex-col items-start justify-start z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3 font-defectica">PROJ</h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-2 sm:ml-3 mt-2 sm:mt-3 font-defectica">EKTY</h1>
        </div>

        <div className="w-[90vw] h-[70vh] mx-auto flex items-center z-10 bg-red-500">...........</div>

        <div className="relative flex justify-end items-center bottom-0 transform mr-2 sm:mr-3 mb-2 sm:mb-3 right-0 z-10">
          <Button>test</Button>
        </div>

        {/* Logo w tle - koło z rozmyciem */}
        <Image
          src="/logo.png"
          priority
          width={400}
          height={400}
          alt="Bez Kontekstu"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-96 h-96 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 brightness-0 invert sepia hue-rotate-270 opacity-50"
        />
      </section>
    </div>
  );
}
