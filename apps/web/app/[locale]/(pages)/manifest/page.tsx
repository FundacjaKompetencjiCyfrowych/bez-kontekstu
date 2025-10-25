import Image from "next/image";
import ManifestManImage from "@/app/assets/images/manifest_man.png";
import ManifestOurGoalImage from "@/app/assets/images/manifest_our-goal.png";
import ManifestFusionImage from "@/app/assets/images/manifest_fusion.png";
import LogoViolet from "@/app/components/LogoViolet";
import titleCutWord from "@/app/lib/titleCutWord";
import { Metadata } from "next";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";

export const metadata: Metadata = {
  title: "Manifest - Fundacja Bez Kontekstu",
  description: "Poznaj manifest Fundacji Bez Kontekstu. Nasza wizja, cele i współpraca w dziedzinie sztuki i nowoczesnych technologii.",
  keywords: ["manifest", "fundacja", "bez kontekstu", "sztuka", "technologia", "teatr", "wizja", "cele"],
};

export default async function ManifestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return (
    <div className="flex w-full min-h-screen flex-col justify-between px-2 md:px-5 xl:flex xl:flex-col">
      <LogoViolet />

      {/* Main content */}
      <main className="relative mx-auto xl:max-w-7xl">
        <div className="relative flex md:landscape:justify-center xl:mt-[90px] xl:h-[90vh] xl:items-center xl:justify-center">
          {/*Title desktop*/}
          <div className="hidden xl:block absolute right-0 top-0 text-right">
            {titleCutWord(
              dictionary.split2.manifest[0],
              "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl ml-2 sm:ml-3 mt-2 xl:ml-0 xl:mt-0 sm:mt-3"
            )}
          </div>
          <div className="xl:block hidden absolute left-0 bottom-0">
            {titleCutWord(
              dictionary.split2.manifest[1],
              "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl ml-2 sm:ml-3 mt-2 xl:ml-0 xl:mt-0 sm:mt-3"
            )}
          </div>

          {/* Two column layout for desktop */}
          <div className="relative top-[10vh] lg:top-0 xl:mx-auto xl:grid xl:w-full xl:max-w-7xl xl:grid-cols-2">
            {/* Left Column - Quote */}
            <div className="flex w-3/4 flex-col font-mono mx-auto md:w-[60%] md:mx-auto md:text-xl md:leading-16 xl:col-span-1 xl:ml-auto xl:mx-0 xl:w-[80%]">
              <div className="md:mx-4">
                <div className="relative z-10 flex flex-row items-start mt-0 md:landscape:mt-20 xl:landscape:mt-0 xl:justify-end">
                  <div className="text-7xl font-mono rotate-180 md:mr-4">„</div>
                  <div className="text-lg font-mono md:text-2xl xl:mr-4 xl:text-right xl:text-3xl xl:leading-12">
                    Dobry wpływ wcale nie istnieje, panie Gray.
                    <br />
                    Ze stanowiska naukowego każdy wpływ jest <strong> niemoralny.</strong>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column - Empty space */}
            <div className="xl:col-span-1"></div>
          </div>

          {/* Man Image */}
          <div className="hidden xl:block absolute bottom-0 left-1/2">
            <div className="relative w-[400px] h-[500px]">
              <Image src={ManifestManImage} alt="Mężczyzna z mikrofonem" fill sizes="400px" className="object-cover" priority />
            </div>
          </div>
        </div>

        {/* Beyond Schema */}
        <section className="py-20 md:py-40 xl:mt-20 xl:grid xl:grid-cols-2 xl:gap-16 xl:items-center" aria-labelledby="beyond-schema-title">
          {/* Left Column - Titles */}
          <div className="my-30 xl:my-0 xl:col-span-1 xl:flex xl:items-center">
            <div className="flex flex-col items-center xl:font-mono md:text-5xl text-3xl xl:text-4xl md:my-10 xl:items-end xl:my-0 xl:ml-auto">
              {/* Mobile and desktop versions of the title */}
              <h3 className="mb-4 xl:hidden md:text-5xl">POZA SCHEMATEM</h3>
              <p className="mb-4 hidden xl:inline-block xl:font-bold">Poza schematem</p>
              <p className="mb-4 md:text-6xl md:mb-8 xl:mb-4">=</p>
              <h3 className="xl:hidden md:text-5xl">POZA KONTEKSTEM</h3>
              <p className="hidden xl:inline-block xl:font-bold">Poza kontekstem</p>
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="xl:col-span-1">
            <div className="flex flex-col text-left font-mono mx-5 md:text-xl md:leading-8 xl:leading-10 xl:mx-0 xl:mt-0">
              <p>
                <strong> Fundacja Bez Kontekstu</strong> to przestrzeń, w której <strong>fuzja sztuki i nowoczesnych technologii</strong>{" "}
                wyznacza nowe horyzonty.
              </p>
              <p className="mt-20 mb-5 xl:mt-0">
                <strong>
                  Działamy z myślą o tworzeniu innowacyjnych doświadczeń artystycznych, które przełamują granice tradycyjnych form wyrazu.
                </strong>
              </p>
              <p>
                Poprzez łączenie immersyjnego dźwięku, eksperymentów teatralnych oraz interdyscyplinarnych projektów edukacyjnych
                wprowadzamy odbiorców w świat, gdzie teatr spotyka się z cyfrową rzeczywistością.
              </p>
            </div>
          </div>
        </section>

        {/* Our Logo */}
        <section
          className="pb-20 xl:pb-40 ml-20 text-right mx-5 xl:grid xl:grid-cols-2 xl:gap-8 xl:items-start xl:ml-0 xl:mx-0"
          aria-labelledby="our-logo-title"
        >
          {/* Left Column - Empty for spacing */}
          <div className="xl:col-span-1">
            <h2 className="mb-12 xl:text-6xl">NASZE LOGO</h2>
            <div className="flex flex-col text-right font-mono leading-relaxed md:text-xl md:leading-8 xl:leading-10">
              <p className="mb-5">
                <strong>Ma charakter pieczęci- hipnotyzującej, niepowtarzalnej i pełnej ukrytych znaczeń.</strong>
              </p>
              <p>
                Inspirowane cymatyką oraz obrazami mózgu z badania MRI, to ręcznie narysowany symbol łączący teatr z cyfrową
                rzeczywistością. W negatywie ukrywa 12 otworów - jak tajemnicza pieczęć zapraszająca do zgłębienia wzoru.
              </p>
            </div>
          </div>
          {/* Right Column - Logo content */}
          <div className="xl:col-span-1"></div>
        </section>

        {/* Our Goal */}
        <section
          className="py-10 md:py-20 xl:py-40 mx-5 xl:grid xl:grid-cols-2 xl:gap-8 xl:items-center xl:ml-0 xl:mx-0"
          aria-labelledby="our-goal-title"
        >
          {/* Left Column - Image */}
          <div className="xl:col-span-1 xl:justify-self-center hidden xl:block">
            <div className="relative w-full h-96 xl:h-[600px] xl:w-[500px] mt-8 xl:mt-0">
              <Image
                src={ManifestOurGoalImage}
                alt="Nasz cel - osoba w świetle"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 0px, 500px"
              />
            </div>
          </div>

          {/* Right Column - Text */}
          <div className="xl:col-span-1 xl:flex xl:flex-col xl:justify-center">
            <h2 className="mb-12 xl:text-6xl">NASZ CEL</h2>
            <p className="font-mono leading-relaxed md:text-xl md:leading-8 xl:leading-10">
              <strong>Naszym głównym celem jest interdyscyplinarność. </strong>Fundacja działa lokalnie i europejsko, korzystając z
              programów Interreg oraz Programów Ministerialnych, aby
              <strong> wspierać młodych twórców, rozwijać edukację kulturalną i promować międzynarodową wymianę doświadczeń.</strong>
            </p>
          </div>
        </section>

        {/* Our Vision */}
        <section
          className="py-10 md:py-20 xl:py-40 text-right mx-5 xl:grid xl:grid-cols-2 xl:gap-8 xl:items-start xl:mx-0"
          aria-labelledby="our-vision-title"
        >
          {/* Left Column - Empty for spacing */}
          <div className="xl:col-span-1">
            <h2 className="mb-12 xl:text-6xl">NASZA WIZJA</h2>
            <p className="leading-relaxed font-mono md:text-xl md:leading-8 xl:leading-10">
              Opiera się na przekonaniu, że prawdziwy rozwój sektora kreatywnego zależy od
              <strong> ciągłego poszukiwania nowatorskich rozwiązań</strong> - zarówno pod względem form artystycznych, jak i organizacji
              współpracy.
            </p>
          </div>
          {/* Right Column - Vision content */}
          <div className="xl:col-span-1"></div>
        </section>

        {/* Our Cooperation */}
        <section
          className="py-10 md:py-20 xl:py-40 mx-5 xl:grid xl:grid-cols-2 xl:gap-8 xl:items-start xl:mx-0"
          aria-labelledby="our-cooperation-title"
        >
          {/* Left Column - Title */}
          <div className="xl:col-span-1"></div>
          {/* Right Column - Content */}
          <div className="xl:col-span-1">
            <h2 className="xl:text-6xl">NASZE</h2>
            <h2 className="mb-12 xl:text-6xl">WSPÓŁPRACE</h2>
            <div className="font-mono md:text-xl md:leading-8 xl:w-[90%] xl:leading-10">
              <p className="mt-7 mb-6 xl:mt-0">
                W czasie naszej działalności współpracowaliśmy z uznanymi instytucjami kultury, takimi jak: <br />
              </p>
              <p>
                <strong>
                  Instytut Teatralny im. Zbigniewa Raszewskiego w Warszawie, Teatr Szwalnia w Łodzi, Teatr Rozbark w Bytomiu, Teatr Nowy
                  Proxima w Krakowie, OPT we Wrocławiu, Ursynowskie Centrum Kultury ALTERNATYWY, Wioska Artystyczna Janowo, Jeleniogórskie
                  Centrum Kultury, Centrum Kultury w Lublinie, Teatr Wschodni w Lublinie, Teatr Odnaleziony, Gminny Klub Kultury w Karnicach
                  oraz MOKSiAL w Szklarskiej Porębie.
                </strong>
              </p>
            </div>
          </div>
        </section>

        {/* Artists */}
        <section
          className="text-center py-10 md:py-20 xl:py-40 mx-5 xl:grid xl:grid-cols-2 xl:gap-8 xl:items-start xl:mx-0 xl:text-left"
          aria-labelledby="artists-title"
        >
          {/* Left Column - Title and intro */}
          <div className="xl:col-span-1 xl:text-right ">
            <h2 className="mb-12 xl:text-6xl">ARTYŚCI</h2>
            <div className="font-mono md:text-xl md:leading-8 xl:leading-10">
              <p className="mb-10">Realizację naszych projektów wspierała także współpraca z wyjątkowymi artystami, m.in.</p>
            </div>
            <div className="font-mono md:text-xl md:leading-8 xl:leading-10">
              <div className="leading-10">
                <p>
                  <strong>Sebastian Dela</strong>
                </p>
                <p>
                  <strong>Kirył Pietruczuk</strong>
                </p>
                <p>
                  <strong>Jakub Sierenberg</strong>
                </p>
                <p>
                  <strong>Piotr Klauza</strong>
                </p>
                <p>
                  <strong>Robert Czebotar</strong>
                </p>
                <p>
                  <strong>Marcin Sanakiewicz</strong>
                </p>
                <p>
                  <strong>Jan Łuć</strong>
                </p>
              </div>
            </div>
          </div>
          {/* Right Column - Artists list */}
          <div className="xl:col-span-1"></div>
        </section>

        {/* Fusion */}
        <section
          className="py-10 md:py-20 xl:py-40 mx-5 xl:grid xl:grid-cols-2 xl:gap-8 xl:items-center xl:mx-0"
          aria-labelledby="fusion-title"
        >
          {/* Left Column - Image */}
          <div className="xl:col-span-1 xl:flex xl:justify-center hidden">
            <div className="relative w-full h-96 xl:h-[600px] xl:w-[500px] mt-8 xl:mt-0">
              <Image
                src={ManifestFusionImage}
                alt="Fuzja - grupa artystów na scenie"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 0px, 500px"
              />
            </div>
          </div>
          {/* Right Column - Text */}
          <div className="xl:col-span-1 xl:flex xl:flex-col xl:justify-center">
            <h2 className="mb-12 xl:mb-4 xl:text-6xl">FUZJA</h2>
            <div className="mt-10 font-mono md:text-xl md:leading-8 xl:leading-10">
              <p>
                Wszystkich elementów —
                <strong>zaawansowanej technologii, odwagi w poszukiwaniu innowacji oraz twórczego potencjału ludzi </strong>, z którymi
                współpracujemy — pozwala nam wciąż odkrywać nowe obszary ekspresji.
              </p>
              <p className="ml-16 my-6 xl:my-2 py-6 md:w-[30vw] md:mx-auto md:ml-100 md:my-10 xl:ml-0 xl:w-full">
                I choć stawiamy na eksperyment, jedno pozostaje niezmienne:{" "}
              </p>
              <p className="text-center text-lg md:text-2xl md:w-[50vw] md:leading-10 md:mx-auto xl:text-left xl:leading-8 xl:w-full">
                <strong>Teatr jest miejscem, które przyjmie wszystko — każdą ideę, każdą emocję, każdy impuls do zmiany.</strong>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
