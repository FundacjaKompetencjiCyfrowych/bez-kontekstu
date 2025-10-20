import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import Logo from "@/app/assets/images/logo.png";
import { Footer } from "@/app/components/Footer";
import { RandomRectangles } from "@/app/components/RandomRectangles";
import Link from "next/link";
import { cooperators } from "@/app/lib/placeholders_old/cooperators";
import LogoVioletImage from "@/app/assets/images/logo_violet.png";
import { Header } from "../components/Header";

export default function Home() {
  // Get first 4 team members from cooperators data
  const teamMembers = cooperators.slice(0, 4);

  const titleCutWord = (title: string) =>
    title.split(" ").map((word, index) => (
      <h2 className="xl:mt-0 xl:ml-0" key={index}>
        {word}
      </h2>
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
            <h3 key={index} className="sm:text-4xl md:text-6xl ml-2 sm:ml-3 mt-2 sm:mt-3">
              {line}
            </h3>
          ))}
        </div>

        {/* Desktop version - text separately on xl screens and larger (1280px+) */}
        <div className={`hidden xl:block xl:text-${textAlign}`}>{titleCutWord(desktopText)}</div>
      </>
    );
  };

  return (
    <div className="max-w-7xl mx-auto bg-[#0d0b0e]">
      <h1 className="sr-only">Fundacja Bez Kontekstu</h1>

      {/*Title mobile*/}
      <div className="mx-4">
        <Header title="STRONA GŁÓ WNA" className="xl:hidden" showLogo={false} />
      </div>

      {/* Hero Section */}
      <section className="relative top-[50px] xl:top-[100px] overflow-hidden h-[65vh] xl:h-[800px] flex flex-col justify-between mx-6 z-10">
        {/*Title */}
        <div className="block absolute right-0 top-0 text-right">{titleCutWord("BEZ")}</div>
        <div className="block absolute left-0 bottom-0">{titleCutWord("K O N TEKSTU")}</div>

        {/* Logo - white */}
        <Image
          src={Logo}
          priority
          alt="Bez Kontekstu logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-[40vw] h-[40vw] max-w-192 max-h-192 min-w-48 min-h-48"
        />
      </section>

      <div className="relative xl:top-40 px-5 xl:px-0">
        {/* MANIFEST Section*/}
        <section className="overflow-hidden h-screen md:h-[70vh] lg:h-[80vh] mt-[150px] xl:h-[800px] xl:mb-20 flex flex-col justify-around">
          {/* Violet logo - sticky for all sections from Manifest */}
          <Image
            src={LogoVioletImage}
            alt="Bez Kontekstu"
            className="hidden md:block md:absolute blur-[8px] left-1/2 transform -translate-x-1/2 md:w-160 md:h-160 xl:w-200 xl:h-200 opacity-25"
          />

          <div className="relative flex flex-col items-start xl:items-end justify-start z-10">
            {renderResponsiveTitle(["MAN", "IF", "EST"], "MA N I", "right")}
          </div>

          <div className="w-[75vw] lg:w-[65vw] xl:w-[60vw] lg:text-xl lg:leading-10 xl:text-xl leading-6 xl:leading-10 mx-auto z-10 text-center text-md font-mono">
            <p className="mb-4">
              Fundacja Bez Kontekstu to przestrzeń, w której FUZJA sztuki i nowoczesnych technologii wyznacza nowe horyzonty.
            </p>
            <p className="mb-4">
              Działamy z myślą o tworzeniu innowacyjnych doświadczeń artystycznych, które przełamują granice tradycyjnych form wyrazu.
            </p>
            <p className="mb-8">
              Poprzez łączenie immersyjnego dźwięku, eksperymentów teatralnych oraz interdyscyplinarnych projektów edukacyjnychwprowadzamy
              odbiorców w świat, gdzie teatr spotyka się z cyfrową rzeczywistością.
            </p>

            <div className="flex justify-center items-center transform z-10">
              <Link href={"/manifest"} className="w-full md:w-full lg:w-auto">
                <Button
                  variant="dark"
                  size="sm"
                  className="w-full md:w-full lg:w-auto xl:w-[250px] xl:text-base xl:!bg-gradient-to-b xl:!from-white-900 xl:!via-black-900/30 xl:!to-[#6852f5] xl:!rounded-2xl xl:!text-white xl:!border xl:!border-violet-400 xl:hover:!bg-violet-900/30 xl:hover:!border-violet-300 xl:!shadow-lg"
                >
                  Poznaj nas lepiej
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop version - text separately on xl screens and larger (1280px+) */}
          {renderResponsiveTitle("", "F EST", "left")}
        </section>

        {/* PROJECTS Section */}
        <section className="relative overflow-hidden h-[70vh] xl:h-[1000px] xl:mb-20 flex flex-col justify-around bg-transparent">
          <div className="relative flex flex-col items-end justify-start z-10">
            {renderResponsiveTitle(["PRO", "JEK", "TY"], "PR O", "right")}
          </div>

          <div className="w-[100%] h-[70vh] mx-auto z-10">
            <RandomRectangles />
          </div>

          <div className="relative flex justify-center items-center transform z-10">
            <Link href={"/projects"} className="w-full md:w-full lg:w-auto">
              <Button variant="dark" size="sm" className="w-full md:w-full lg:w-auto">
                Sprawdź projekty
              </Button>
            </Link>
          </div>

          {/* Desktop version - text separately on xl screens and larger (1280px+) */}
          {renderResponsiveTitle("", "J EKTY", "left")}
        </section>

        {/* PEOPLE Section */}
        <section className="relative h-screen md:mt-[150px] lg:h-[1200px] xl:h-[1100px] xl:mb-20 flex flex-col justify-center bg-transparent">
          <div className="absolute xl:right-0 top-[50px] xl:top-0 flex flex-col z-10">
            <div className="">{renderResponsiveTitle(["WSP", "ÓŁ", "PRACE"], "WSP Ó Ł", "right")}</div>
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
                <h3 className="relative z-10 text-sm md:text-base text-white">
                  {member.name} {member.surname}
                </h3>
              </div>
            ))}
          </div>

          <div className="relative mt-[50px] xl:mt-[0px] flex justify-center items-center transform z-10">
            <Link href={"/cooperators"} className="w-full md:w-full lg:w-auto">
              <Button variant="dark" size="sm" className="w-full md:w-full lg:w-auto">
                Poznaj nasz zespół
              </Button>
            </Link>
          </div>

          {/* Desktop version - text separately on xl screens and larger (1280px+) */}
          <div className="absolute bottom-0 left-0">{renderResponsiveTitle("", "P RACE", "left")}</div>
        </section>

        {/* DONATORS Section */}
        <section className="relative xl:mb-20 h-[50vh] md:h-[60vh] xl:h-[700px] flex flex-col md:justify-between justify-evenly bg-transparent">
          <div className=" flex flex-col items-end ">
            <div>{renderResponsiveTitle(["DLA", "DARCZY", "ŃCOW"], "DL A", "right")}</div>
          </div>

          <div className="mx-auto flex flex-col items-center text-center text-base sm:text-2xl font-mono">
            <p className="leading-10">Twoje wsparcie</p>
            <p className="leading-10">=</p>
            <p className="leading-10">nowe przestrzenie sztuki</p>
          </div>

          <div className="relative flex justify-center items-center transform z-10">
            <Link href={"/donators"} className="w-full md:w-full lg:w-auto">
              <Button variant="dark" size="sm" className="w-full md:w-full lg:w-auto">
                Wesprzyj nas
              </Button>
            </Link>
          </div>

          {/* Desktop version - text separately on xl screens and larger (1280px+) */}
          <div>{renderResponsiveTitle("", "DAR CZYŃCÓW", "left")}</div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
