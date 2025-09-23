import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import Image from "next/image";
import ManifestManImage from "@/app/assets/images/manifest_man.png";
import ManifestOurGoalImage from "@/app/assets/images/manifest_our-goal.png";
import ManifestFusionImage from "@/app/assets/images/manifest_fusion.png";
import LogoViolet from "@/app/assets/images/logo_violet.png";

export default function ManifestPage() {
  const titleCutWord = (title: string) =>
    title.split(" ").map((word, index) => (
      <h1 className="sm:text-4xl md:text-5xl lg:text-6xl ml-2 sm:ml-3 mt-2 sm:mt-3" key={index}>
        {word}
      </h1>
    ));

  return (
    <div className="justify-between w-full min-h-screen px-7 xl:flex xl:flex-col">
      {/*Title mobile*/}
      <Header title="MAN IF EST" className="xl:hidden" />
      <div className="relative flex xl:justify-center xl:items-center xl:h-screen xl:mt-[90px]">
        {/*Title desktop*/}
        <div className="hidden xl:block absolute right-0 top-0 text-right">{titleCutWord("MA N I")}</div>

        <div className="hidden xl:block">
          <Image
            src={LogoViolet}
            alt="Bez Kontekstu"
            className="absolute blur-[3px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain xl:w-140 xl:h-140 opacity-50"
          />
        </div>

        {/* Two column layout for desktop */}
        <div className="relative xl:mt-[90px] xl:grid xl:grid-cols-2 xl:gap-16 xl:w-full xl:max-w-7xl xl:mx-auto">
          {/* Left Column - Quote */}
          <div className="xl:w-[70%] xl:col-span-1 flex flex-col font-mono md:text-xl md:leading-16 xl:text-base xl:leading-5 xl:ml-auto">
            <div className="md:mx-4">
              <div className="pl-1 flex flex-row items-start z-100 relative xl:justify-end">
                <div className="text-7xl font-mono rotate-180">„</div>
                <div className="xl:text-right text-lg md:text-2xl xl:text-xl xl:leading-8 font-mono mr-4 mt-1">
                  Dobry wpływ wcale nie istnieje, panie Gray. Ze stanowiska naukowego każdy wpływ jest niemoralny.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Empty space */}
          <div className="xl:col-span-1"></div>
        </div>

        {/* Man Image - Absolute positioned in bottom center */}
        <div className="hidden xl:block absolute bottom-0 left-1/2">
          <div className="relative w-[400px] h-[500px]">
            <Image src={ManifestManImage} alt="Mężczyzna z mikrofonem" fill className="object-cover" priority />
          </div>
        </div>

        {/*Title desktop*/}
        <div className="xl:block hidden absolute left-0 bottom-0">{titleCutWord("F EST")}</div>
      </div>

      {/* Rest of content */}
      <div className="max-w-4xl xl:max-w-7xl mx-auto relative">
        {/* Beyond Schema - Desktop Layout */}
        <section className="my-10 py-10 xl:grid xl:grid-cols-2 xl:gap-16 xl:items-center">
          {/* Left Column - Titles */}
          <div className="xl:col-span-1 xl:flex xl:items-center">
            <div className="flex flex-col items-center xl:font-bold text-3xl md:my-10 xl:items-end xl:my-0 xl:ml-auto">
              <h2 className="md:text-5xl xl:text-2xl mb-4 xl:font-mono">POZA SCHEMATEM</h2>
              <p className="md:text-5xl xl:text-2xl mb-4">=</p>
              <h2 className="md:text-5xl xl:text-2xl">POZA KONTEKSTEM</h2>
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="xl:col-span-1">
            <div className="flex flex-col text-left font-mono mx-5 md:text-xl md:leading-10 xl:mx-0 xl:mt-0">
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

        {/* Our Logo - Desktop Layout */}
        <section className="my-10 py-10 ml-20 text-right mx-5 xl:grid xl:grid-cols-2 xl:gap-16 xl:items-start xl:ml-0 xl:mx-0">
          {/* Left Column - Empty for spacing */}
          <div className="xl:col-span-1"></div>

          {/* Right Column - Logo content */}
          <div className="xl:col-span-1">
            <h1 className="mb-12">NASZE LOGO</h1>
            <div className="flex flex-col text-right font-mono leading-relaxed md:text-xl md:leading-10">
              <p className="mb-5">
                <strong>Ma charakter pieczęci- hipnotyzującej, niepowtarzalnej i pełnej ukrytych znaczeń.</strong>
              </p>
              <p>
                Inspirowane cymatyką oraz obrazami mózgu z badania MRI, to ręcznie narysowany symbol łączący teatr z cyfrową
                rzeczywistością. W negatywie ukrywa 12 otworów - jak tajemnicza pieczęć zapraszająca do zgłębienia wzoru.
              </p>
            </div>
          </div>
        </section>

        {/* Our Goal - Desktop Layout */}
        <section className="my-10 py-10 ml-3 mx-5 xl:grid xl:grid-cols-2 xl:gap-16 xl:items-start xl:ml-0 xl:mx-0">
          {/* Left Column - Image */}
          <div className="xl:col-span-1 xl:justify-start hidden xl:block">
            <div className="relative w-full h-96 xl:h-[500px] xl:w-[400px] mt-8 xl:mt-0">
              <Image src={ManifestOurGoalImage} alt="Nasz cel - osoba w świetle" fill className="object-cover" />
            </div>
          </div>

          {/* Right Column - Text */}
          <div className="xl:col-span-1">
            <h1 className="mb-12">NASZ CEL</h1>
            <p className="font-mono leading-relaxed md:text-xl md:leading-10">
              <strong>Naszym głównym celem jest interdyscyplinarność. </strong>Fundacja działa lokalnie i europejsko, korzystając z
              programów Interreg oraz Programów Ministerialnych, aby
              <strong>wspierać młodych twórców, rozwijać edukację kulturalną i promować międzynarodową wymianę doświadczeń.</strong>
            </p>
          </div>
        </section>

        {/* Our Vision - Desktop Layout */}
        <section className="my-10 py-10 text-right mx-5 xl:grid xl:grid-cols-2 xl:gap-16 xl:items-start xl:mx-0">
          {/* Left Column - Empty for spacing */}
          <div className="xl:col-span-1"></div>

          {/* Right Column - Vision content */}
          <div className="xl:col-span-1">
            <h1 className="mb-12">NASZA WIZJA</h1>
            <p className="leading-relaxed font-mono md:text-xl md:leading-10">
              Opiera się na przekonaniu, że prawdziwy rozwój sektora kreatywnego zależy od
              <strong> ciągłego poszukiwania nowatorskich rozwiązań</strong> - zarówno pod względem form artystycznych, jak i organizacji
              współpracy.
            </p>
          </div>
        </section>

        {/* Our Cooperation - Desktop Layout */}
        <section className="my-10 py-10 mx-5 xl:grid xl:grid-cols-2 xl:gap-16 xl:items-start xl:mx-0">
          {/* Left Column - Title */}
          <div className="xl:col-span-1">
            <h1>NASZE</h1>
            <h1 className="mb-12">WSPÓŁPRACE</h1>
          </div>

          {/* Right Column - Content */}
          <div className="xl:col-span-1">
            <div className="font-mono md:text-xl md:leading-10">
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

        {/* Artists - Desktop Layout */}
        <section className="text-center my-10 py-10 mx-5 xl:grid xl:grid-cols-2 xl:gap-16 xl:items-start xl:mx-0 xl:text-left">
          {/* Left Column - Title and intro */}
          <div className="xl:col-span-1">
            <h1 className="mb-12 xl:text-left">ARTYŚCI</h1>
            <div className="font-mono md:text-xl md:leading-10">
              <p className="mb-10">Realizację naszych projektów wspierała także współpraca z wyjątkowymi artystami, m.in.</p>
            </div>
          </div>

          {/* Right Column - Artists list */}
          <div className="xl:col-span-1">
            <div className="font-mono md:text-xl md:leading-10">
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
        </section>

        {/* Fusion - Desktop Layout */}
        <section className="mt-10 mb-5 pt-10 mx-5 xl:grid xl:grid-cols-2 xl:gap-16 xl:items-start xl:mx-0">
          {/* Left Column - Image */}
          <div className="xl:col-span-1 xl:justify-start hidden xl:block">
            <div className="relative w-full h-96 xl:h-[500px] xl:w-[400px] mt-8 xl:mt-0">
              <Image src={ManifestFusionImage} alt="Fuzja - grupa artystów na scenie" fill className="object-cover" />
            </div>
          </div>

          {/* Right Column - Text */}
          <div className="xl:col-span-1">
            <h1 className="mb-12">FUZJA</h1>
            <div className="mt-10 font-mono md:text-xl md:leading-10">
              <p>
                Wszystkich elementów —
                <strong>zaawansowanej technologii, odwagi w poszukiwaniu innowacji oraz twórczego potencjału ludzi </strong>, z którymi
                współpracujemy — pozwala nam wciąż odkrywać nowe obszary ekspresji.
              </p>

              <p className="ml-16 my-6 py-6 md:w-[50vw] md:mx-auto md:ml-72 md:my-10 xl:ml-0 xl:w-full">
                I choć stawiamy na eksperyment, jedno pozostaje niezmienne:{" "}
              </p>

              <p className="text-center text-lg md:text-2xl md:leading-10 md:w-[70vw] md:mx-auto xl:text-left xl:w-full">
                <strong>Teatr jest miejscem, które przyjmie wszystko — każdą ideę, każdą emocję, każdy impuls do zmiany.</strong>
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
