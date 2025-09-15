import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";

export default function ManifestPage() {
  return (
    <div className="min-h-screen bg-[#0d0b0e] px-5">
      <Header title="MAN IF EST" />

      <div className="max-w-4xl mx-auto relative">
        {/* Quote Section */}
        <section className="my-20 pt-20 mx-5 md:w-[60vw]  md:mx-auto">
          <div className=" pl-1 flex flex-row items-start z-100 relative">
            <div className="text-7xl font-mono rotate-180">„</div>
            <div className="text-lg md:text-2xl md:leading-10 font-mono mr-4 mt-1">
              Dobry wpływ wcale nie istnieje, panie Gray. Ze stanowiska naukowego każdy wpływ jest niemoralny.
            </div>
          </div>
        </section>

        {/* Beyond Schema */}
        <section className="my-10 py-10">
          <div className="flex flex-col items-center font-defectica text-3xl md:my-10">
            <h2 className=" md:text-5xl mb-4">POZA SCHEMATEM</h2>
            <p className=" md:text-5xl mb-4">=</p>
            <h2 className="md:text-5xl ">POZA KONTEKSTEM</h2>
          </div>
          <div className="flex flex-col text-left font-mono mx-5 md:text-xl md:leading-10">
            <p className="mt-20 mb-5">
              <strong>
                Działamy z myślą o tworzeniu innowacyjnych doświadczeń artystycznych, które przełamują granice tradycyjnych form wyrazu.
              </strong>
            </p>
            <p>
              Poprzez łączenie immersyjnego dźwięku, eksperymentów teatralnych oraz interdyscyplinarnych projektów edukacyjnych wprowadzamy
              odbiorców w świat, gdzie teatr spotyka się z cyfrową rzeczywistością.
            </p>
          </div>
        </section>

        {/* Our Logo */}
        <section className="my-10 py-10 ml-20 text-right mx-5">
          <h1 className=" mb-12">NASZE LOGO</h1>
          <div className="flex flex-col text-right font-mono leading-relaxed md:text-xl md:leading-10">
            <p className=" mb-5">
              <strong>Ma charakter pieczęci- hipnotyzującej, niepowtarzalnej i pełnej ukrytych znaczeń.</strong>
            </p>
            <p>
              Inspirowane cymatyką oraz obrazami mózgu z badania MRI, to ręcznie narysowany symbol łączący teatr z cyfrową rzeczywistością.
              W negatywie ukrywa 12 otworów - jak tajemnicza pieczęć zapraszająca do zgłębienia wzoru.
            </p>
          </div>
        </section>

        {/* Our Goal */}
        <section className="my-10 py-10 ml-3 mx-5">
          <h1 className="mb-12">NASZ CEL</h1>
          <p className="font-mono leading-relaxed md:text-xl md:leading-10">
            <strong>Naszym głównym celem jest interdyscyplinarność. </strong>Fundacja działa lokalnie i europejsko, korzystając z programów
            Interreg oraz Programów Ministerialnych, aby
            <strong>wspierać młodych twórców, rozwijać edukację kulturalną i promować międzynarodową wymianę doświadczeń.</strong>
          </p>
        </section>

        {/* Our Vision */}
        <section className="my-10 py-10 text-right mx-5">
          <h1 className="mb-12">NASZA WIZJA</h1>
          <p className="leading-relaxed font-mono md:text-xl md:leading-10">
            Opiera się na przekonaniu, że prawdziwy rozwój sektora kreatywnego zależy od
            <strong> ciągłego poszukiwania nowatorskich rozwiązań</strong> - zarówno pod względem form artystycznych, jak i organizacji
            współpracy.
          </p>
        </section>

        {/* Our Cooperation */}
        <section className="my-10 py-10 mx-5">
          <h1>NASZE</h1>
          <h1 className=" mb-12">WSPÓŁPRACE</h1>
          <div className="font-mono md:text-xl md:leading-10">
            <p className="mt-7 mb-6">
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
        </section>

        {/* Artists */}
        <section className="text-center my-10 py-10 mx-5">
          <h1 className="mb-12">ARTYŚCI</h1>
          <div className=" font-mono md:text-xl md:leading-10">
            <p className="mb-10">Realizację naszych projektów wspierała także współpraca z wyjątkowymi artystami, m.in.</p>
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
        </section>

        {/* Fuzsion */}
        <section className="mt-10 mb-5 pt-10 mx-5">
          <h1 className="mb-12">FUZJA</h1>
          <div className="mt-10 font-mono md:text-xl md:leading-10">
            <p>
              Wszystkich elementów —
              <strong>zaawansowanej technologii, odwagi w poszukiwaniu innowacji oraz twórczego potencjału ludzi </strong>, z którymi
              współpracujemy — pozwala nam wciąż odkrywać nowe obszary ekspresji.
            </p>

            <p className="ml-16 my-6 py-6 md:w-[50vw] md:mx-auto md:ml-72 md:my-10">
              I choć stawiamy na eksperyment, jedno pozostaje niezmienne:{" "}
            </p>

            <p className="text-center text-lg md:text-2xl md:leading-10 md:w-[70vw] md:mx-auto">
              <strong>Teatr jest miejscem, które przyjmie wszystko — każdą ideę, każdą emocję, każdy impuls do zmiany.</strong>
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
