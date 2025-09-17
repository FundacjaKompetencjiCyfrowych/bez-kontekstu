import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import Logo from "@/app/assets/images/logo.png";
import LogoViolet from "@/app/assets/images/logo_violet.png";
import { Footer } from "@/app/components/Footer";
import { RandomRectangles } from "@/app/components/RandomRectangles";
import Link from "next/link";
import { cooperators } from "@/app/lib/cooperators";

export default function Home() {
  // Get first 4 team members from cooperators data
  const teamMembers = cooperators.slice(0, 4);

  const titleCutWord = (title: string) =>
    title.split(" ").map((word, index) => (
      <h1 className="sm:text-4xl md:text-5xl lg:text-6xl  ml-2 sm:ml-3 mt-2 sm:mt-3" key={index}>
        {word}
      </h1>
    ));

  return (
    <div className="max-w-7xl mx-auto bg-[#0d0b0e]">
      {/*Title*/}
      <div className="flex justify-end xl:hidden h-20 items-center mt-5 mb-24 mx-8 z-10">
        <Image src={SoundIcon} alt="Sound button" width={30} height={30} />
      </div>
      {/* Hero Section */}
      <section className="relative xl:top-[100px] overflow-hidden h-[80vh] flex flex-col justify-between mx-8 z-10">
        <div className="relative flex flex-col justify-end items-end z-10">
          {/* Mobile version - shows "BEZ" on screens smaller than xl (1280px) */}
          <h1 className="block xl:hidden">BEZ</h1>

          {/* Desktop version - shows "BE" and "Z" separately on xl screens and larger (1280px+) */}
          <div className="hidden xl:block xl:text-right">
            <h1>BE</h1>
            <h1>Z</h1>
          </div>
        </div>

        <div className="relative flex flex-col justify-start items-start bottom-0 transform z-10">
          <div className="flex flex-col">
            <h1>K</h1>
            <h1>O</h1>
            <h1>N</h1>
          </div>
          <h1>TEKSTU</h1>
        </div>

        {/* Logo w tle - koło z rozmyciem */}
        <Image
          src={Logo}
          priority
          alt="Bez Kontekstu logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-62 h-62 sm:w-128 sm:h-128 md:w-160 md:h-160"
        />
      </section>

      <div className="relative">
        {/* Violet logo - sticky for all sections from Manifest */}
        <div className="h-[30vh] xl:h-[60vh]"></div>
        <div className="sticky xl:relative top-1/2 h-0 z-0">
          <Image
            src={LogoViolet}
            priority
            alt="Bez Kontekstu logo"
            className="absolute blur-[3px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-80 h-80 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 opacity-50"
          />
        </div>

        {/* MANIFEST Section*/}
        <section className="overflow-hidden h-screen flex flex-col justify-around mx-8 mt-[-120px] xl:mt-[-280px]">
          <div className="relative flex flex-col items-start xl:items-end justify-start z-10">
            {/* Mobile version - on screens smaller than xl (1280px) */}
            <div className="block xl:hidden">
              <h1 className="sm:text-4xl md:text-5xl lg:text-6xl  ml-2 sm:ml-3 mt-2 sm:mt-3">MANIF</h1>
              <h1 className="sm:text-4xl md:text-5xl lg:text-6xl  ml-2 sm:ml-3 mt-2 sm:mt-3">EST</h1>
            </div>

            {/* Desktop version - text separately on xl screens and larger (1280px+) */}
            <div className="hidden xl:block xl:text-right">{titleCutWord("MA N I")}</div>
          </div>

          <div className="w-[75vw] lg:w-[50vw] leading-6 xl:leading-8 mx-auto z-10 text-center text-md font-mono">
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

          <div className="relative flex justify-center items-center transform z-10">
            {" "}
            <Link href={"/manifest"}>
              <Button variant="dark" size="sm">
                Poznaj nas lepiej
              </Button>
            </Link>
          </div>

          {/* Desktop version - text separately on xl screens and larger (1280px+) */}
          <div className="hidden xl:block xl:text-left">{titleCutWord("F EST")}</div>
        </section>

        {/* PROJECTS Section */}
        <section className="relative overflow-hidden h-screen flex flex-col justify-around mx-8 bg-transparent">
          <div className="relative flex flex-col items-end justify-start z-10">
            {/* Mobile version - on screens smaller than xl (1280px) */}
            <div className="block xl:hidden">
              <h1 className="sm:text-4xl md:text-5xl lg:text-6xl  ml-2 sm:ml-3 mt-2 sm:mt-3">PROJ</h1>
              <h1 className="sm:text-4xl md:text-5xl lg:text-6xl  ml-2 sm:ml-3 mt-2 sm:mt-3">EKTY</h1>
            </div>

            {/* Desktop version - text separately on xl screens and larger (1280px+) */}
            <div className="hidden xl:block xl:text-right">{titleCutWord("PR O")}</div>
          </div>

          <div className="w-[100%] h-[70vh] mx-auto z-10">
            <RandomRectangles />
          </div>

          <div className="relative flex justify-center items-center transform z-10">
            {" "}
            <Link href={"/projects"}>
              <Button variant="dark" size="sm">
                Sprawdź projekty
              </Button>
            </Link>
          </div>

          {/* Desktop version - text separately on xl screens and larger (1280px+) */}
          <div className="hidden xl:block xl:text-left">{titleCutWord("J EKTY")}</div>
        </section>

        {/* PEOPLE Section */}
        <section className="relative overflow-hidden h-screen flex flex-col justify-evenly mx-8 bg-transparent">
          <div className="relative flex flex-col items-end justify-start z-10">
            {/* Mobile version - on screens smaller than xl (1280px) */}
            <div className="block xl:hidden">
              <h1 className="sm:text-4xl md:text-5xl lg:text-6xl  ml-2 sm:ml-3 mt-2 sm:mt-3">WSPÓŁ</h1>
              <h1 className="sm:text-4xl md:text-5xl lg:text-6xl  ml-2 sm:ml-3 mt-2 sm:mt-3">PRACE</h1>
            </div>

            {/* Desktop version - text separately on xl screens and larger (1280px+) */}
            <div className="hidden xl:block absolute top-0 xl:text-right ">{titleCutWord("WSP Ó Ł")}</div>
          </div>

          <div className="w-[90%] max-w-[800px] mx-auto grid grid-cols-2 gap-5 xl:gap-8 aspect-square xl:aspect-[2 / 1] z-10 place-items-center content-center">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="relative w-full aspect-square xl:w-[400px] xl:h-[300px] flex flex-col items-start justify-end p-3 bg-amber-200 overflow-hidden"
              >
                {/* Cooperator image */}
                {member.image && (
                  <Image
                    src={member.image}
                    alt={`${member.name} ${member.surname}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 50vw, 400px"
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
                {/* Name */}
                <h3 className="relative z-10 text-sm text-white">
                  {member.name} {member.surname}
                </h3>
              </div>
            ))}
          </div>

          <div className="relative flex justify-center items-center transform z-10">
            <Link href={"/cooperators"}>
              <Button variant="dark" size="sm">
                Poznaj nasz zespół
              </Button>
            </Link>
          </div>

          {/* Desktop version - text separately on xl screens and larger (1280px+) */}
          <div className="hidden xl:block absolute bottom-0 left-0 xl:text-left">{titleCutWord("P RACE")}</div>
        </section>

        {/* DONATORS Section */}
        <section className="relative overflow-hidden h-[60vh] flex flex-col justify-around mx-8 bg-transparent">
          <div className="relative flex flex-col items-end ">
            {/* Mobile version - on screens smaller than xl (1280px) */}
            <div className="block xl:hidden">
              <h1 className="sm:text-4xl md:text-5xl lg:text-6xl  ml-2 sm:ml-3 mt-2 sm:mt-3">DLA</h1>
              <h1 className="sm:text-4xl md:text-5xl lg:text-6xl  ml-2 sm:ml-3 mt-2 sm:mt-3">DARCZY</h1>
              <h1 className="sm:text-4xl md:text-5xl lg:text-6xl  ml-2 sm:ml-3 mt-2 sm:mt-3">ŃCOW</h1>
            </div>

            {/* Desktop version - text separately on xl screens and larger (1280px+) */}
            <div className="hidden xl:block absolute top-0 xl:text-right ">{titleCutWord("DL A")}</div>
          </div>

          <div className="mx-auto flex flex-col items-center text-center text-base sm:text-2xl font-mono">
            <p className="leading-10">Twoje wsparcie</p>
            <p className="leading-10">=</p>
            <p className="leading-10">nowe przestrzenie sztuki</p>
          </div>

          <div className="relative flex justify-center items-center transform z-10">
            <Link href={"/donators"}>
              <Button variant="dark" size="sm">
                Wesprzyj nas
              </Button>
            </Link>
          </div>

          {/* Desktop version - text separately on xl screens and larger (1280px+) */}
          <div className="hidden xl:block absolute bottom-0 left-0 xl:text-left">{titleCutWord("DAR CZYŃCÓW")}</div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
