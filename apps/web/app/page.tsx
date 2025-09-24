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

  // Function to render responsive titles - different layouts for mobile and desktop
  const renderResponsiveTitle = (
    mobileText: string | string[],
    desktopText: string, // Text to be split by spaces for desktop layout
    textAlign: "left" | "right" = "right"
  ) => {
    const mobileLines = Array.isArray(mobileText) ? mobileText : [mobileText];

    return (
      <>
        {/* Mobile version - on screens smaller than xl (1280px) */}
        <div className="block xl:hidden">
          {mobileLines.map((line, index) => (
            <h1 key={index} className="sm:text-4xl md:text-5xl lg:text-6xl ml-2 sm:ml-3 mt-2 sm:mt-3">
              {line}
            </h1>
          ))}
        </div>

        {/* Desktop version - text separately on xl screens and larger (1280px+) */}
        <div className={`hidden xl:block xl:text-${textAlign}`}>{titleCutWord(desktopText)}</div>
      </>
    );
  };

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

        {/* Logo w tle - białe */}
        <Image
          src={Logo}
          priority
          alt="Bez Kontekstu logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-62 h-62 sm:w-128 sm:h-128 md:w-160 md:h-160 xl:w-192 xl:h-192"
        />
      </section>

      <div className="relative">
        {/* Violet logo - sticky for all sections from Manifest */}
        <div className="h-[30vh] xl:h-[40vh]"></div>
        <div className="sticky xl:relative top-1/2 h-0 z-0">
          <Image
            src={LogoViolet}
            priority
            alt="Bez Kontekstu logo"
            className="absolute blur-[3px] xl:blur-[6px] xl:top-[100px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-80 h-80 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 xl:w-220 xl:h-220 opacity-50"
          />
        </div>

        {/* MANIFEST Section*/}
        <section className="overflow-hidden h-screen xl:h-[800px] flex flex-col justify-around mx-8 mt-[-120px] xl:mt-[-280px]">
          <div className="relative flex flex-col items-start xl:items-end justify-start z-10">
            {renderResponsiveTitle(["MANIF", "EST"], "MA N I", "right")}
          </div>

          <div className="w-[75vw] lg:w-[50vw] xl:w-[60vw]  leading-6 xl:leading-8 mx-auto z-10 text-center text-md font-mono">
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
            <Link href={"/manifest"}>
              <Button
                variant="dark"
                size="sm"
                className="xl:!bg-gradient-to-b xl:!from-white-900 xl:!via-black-900/30 xl:!to-[#6852f5] xl:!rounded-2xl xl:!text-white xl:!border xl:!border-violet-400 xl:hover:!bg-violet-900/30 xl:hover:!border-violet-300 xl:!shadow-lg"
              >
                Poznaj nas lepiej
              </Button>
            </Link>
          </div>

          {/* Desktop version - text separately on xl screens and larger (1280px+) */}
          {renderResponsiveTitle("", "F EST", "left")}
        </section>

        {/* PROJECTS Section */}
        <section className="relative overflow-hidden h-screen xl:h-[1000px] flex flex-col justify-around mx-8 bg-transparent">
          <div className="relative flex flex-col items-end justify-start z-10">
            {renderResponsiveTitle(["PROJ", "EKTY"], "PR O", "right")}
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
          {renderResponsiveTitle("", "J EKTY", "left")}
        </section>

        {/* PEOPLE Section */}
        <section className="relative h-screen xl:h-[1100px] flex flex-col justify-evenly mx-8 bg-transparent">
          <div className="absolute right-0 top-0 flex flex-col items-end justify-start z-10">
            <div className="">{renderResponsiveTitle(["WSPÓŁ", "PRACE"], "WSP Ó Ł", "right")}</div>
          </div>

          <div className="w-[90%] max-w-[800px] mx-auto grid grid-cols-2 gap-5 xl:gap-8 aspect-square xl:aspect-[2 / 1] z-10 place-items-center content-center">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="relative w-full md:h-70 sm:top-10 md:top-10 xl:top-0 aspect-square xl:w-[400px] xl:h-[300px] flex flex-col items-start justify-end p-3 overflow-hidden"
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
                <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black/80 to-transparent"></div>
                {/* Name */}
                <h3 className="relative z-10 text-sm text-white">
                  {member.name} {member.surname}
                </h3>
              </div>
            ))}
          </div>

          <div className="relative xl:absolute xl:bottom-15 xl:left-0 xl:right-0  flex justify-center items-center transform z-10">
            <Link href={"/cooperators"}>
              <Button variant="dark" size="sm">
                Poznaj nasz zespół
              </Button>
            </Link>
          </div>

          {/* Desktop version - text separately on xl screens and larger (1280px+) */}
          <div className="absolute bottom-0 left-0">{renderResponsiveTitle("", "P RACE", "left")}</div>
        </section>

        {/* DONATORS Section */}
        <section className="relative xl:mb-20 h-[80vh] xl:h-[700px] flex flex-col md:justify-between justify-evenly mx-8 bg-transparent">
          <div className=" flex flex-col items-end ">
            <div>{renderResponsiveTitle(["DLA", "DARCZY", "ŃCOW"], "DL A", "right")}</div>
          </div>

          <div className="mx-auto flex flex-col items-center text-center text-base sm:text-2xl font-mono">
            <p className="leading-10">Twoje wsparcie</p>
            <p className="leading-10">=</p>
            <p className="leading-10">nowe przestrzenie sztuki</p>
          </div>

          <div className="flex justify-center items-center transform z-10">
            <Link href={"/donators"}>
              <Button variant="dark" size="sm">
                Wesprzyj nas
              </Button>
            </Link>
          </div>

          {/* Desktop version - text separately on xl screens and larger (1280px+) */}
          <div>{renderResponsiveTitle("", "DAR CZYŃCÓW", "left")}</div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
