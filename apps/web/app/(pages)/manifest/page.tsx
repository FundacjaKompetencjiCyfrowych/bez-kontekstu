import Image from "next/image";
import logoViolet from "../../assets/images/logo_violet.png";

export default function ManifestPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1>MANI</h1>
          <h1 className=" mb-4">FEST</h1>
        </div>

        {/* Content */}
        {/* Quote Section */}
        <section className="my-12 pb-10">
          <div className=" pl-1 flex flex-row items-start z-100 relative">
            <div className="text-7xl font-mono rotate-180">„</div>
            <div className="text-xl font-mono font-bold ml-4 mt-1">
              Dobry wpływ wcale nie istnieje, panie Gray. Ze stanowiska naukowego każdy wpływ jest niemoralny.
            </div>
          </div>
          <Image src={logoViolet} alt="logo violet" width={370} height={370} className="absolute top-[130px] z-0" />
        </section>

        {/* Mission Statement */}
        <section className="my-10 py-5">
          <p className="font-mono text-xl leading-relaxed">
            <span className="font-bold">Fundacja Bez Kontekstu</span> to przestrzeń, w której
            <span className="font-bold"> fuzja sztuki i nowoczesnych technologii </span>
            wyznacza nowe horyzonty.
          </p>
        </section>

        {/* Beyond Schema */}
        <section className="my-10 py-10 font-mono">
          <h2 className="text-3xl font-bold text-center">Poza schematem</h2>
          <p className="text-center  font-bold">=</p>
          <h2 className="text-3xl font-bold text-center">Poza kontekstem</h2>
          <p className=" mt-20 mb-4 font-bold">
            Działamy z myślą o tworzeniu innowacyjnych doświadczeń artystycznych, które przełamują granice tradycyjnych form wyrazu.
          </p>
          <p>
            Poprzez łączenie immersyjnego dźwięku, eksperymentów teatralnych oraz interdyscyplinarnych projektów edukacyjnych wprowadzamy
            odbiorców w świat, gdzie teatr spotyka się z cyfrową rzeczywistością.
          </p>
        </section>

        {/* Our Vision */}
        <section className="my-12 py-12">
          <h1 className=" font-bold mb-4">NASZA WIZJA</h1>
          <p className="font-mono w-[80%] leading-relaxed">
            Opiera się na przekonaniu, że prawdziwy rozwój sektora kreatywnego zależy od
            <span className="font-bold">ciągłego poszukiwania nowatorskich rozwiązań</span> - zarówno pod względem form artystycznych, jak i
            organizacji współpracy.
          </p>
        </section>

        {/* Our Goal */}
        <section className="my-12 py-12 ml-20">
          <h1 className=" font-bold mb-4">NASZ CEL</h1>
          <p className="font-mono leading-relaxed">
            Naszym głównym celem jest interdyscyplinarność. Fundacja działa lokalnie i europejsko, korzystając z programów Interreg oraz
            Programów Ministerialnych, aby wspierać młodych twórców, rozwijać edukację kulturalną i promować międzynarodową wymianę
            doświadczeń.
          </p>
        </section>

        {/* Our Cooperation */}
        <section className="mb-20 pb-10">
          <h1>NASZE</h1>
          <h1 className=" mb-4">WSPÓŁPRACE</h1>
          <div className="font-mono">
            <p className="mt-7 mb-18">
              W czasie naszej działalności współpracowaliśmy z uznanymi instytucjami kultury, takimi jak: <br />
            </p>
            <p className="font-bold">
              Instytut Teatralny im. Zbigniewa Raszewskiego w Warszawie, Teatr Szwalnia w Łodzi, Teatr Rozbark w Bytomiu, Teatr Nowy Proxima
              w Krakowie, OPT we Wrocławiu, Ursynowskie Centrum Kultury ALTERNATYWY, Wioska Artystyczna Janowo, Jeleniogórskie Centrum
              Kultury, Centrum Kultury w Lublinie, Teatr Wschodni w Lublinie, Teatr Odnaleziony, Gminny Klub Kultury w Karnicach oraz
              MOKSiAL w Szklarskiej Porębie.
            </p>
          </div>
        </section>

        {/* Artists */}
        <section className="text-center my-20 pb-6">
          <h1 className=" font-bold mb-4">ARTYŚCI</h1>
          <div className=" font-mono">
            <p className="mb-10">Realizację naszych projektów wspierała także współpraca z wyjątkowymi artystami, m.in.</p>
            <div className="font-bold leading-10">
              <p>Jakub Dzis</p>
              <p>Wirgil Płatkowski</p>
              <p>Jakub Sierenberg</p>
              <p>Jakub Sierenberg</p>
              <p>Piotr Żółtowski</p>
              <p>Robert Grzelecki</p>
              <p>Marcin Sosnalewski</p>
              <p>Jan Łuc</p>
            </div>
          </div>
        </section>

        {/* Fuzsion */}
        <section className="mb-10">
          <h1 className=" font-bold mb-4">FUZJA</h1>
          <div className="mt-10 font-mono">
            <p>
              Wszystkich elementów —{" "}
              <span className="font-bold">zaawansowanej technologii, odwagi w poszukiwaniu innowacji oraz twórczego potencjału ludzi </span>
              , z którymi współpracujemy — pozwala nam wciąż odkrywać nowe obszary ekspresji.
            </p>

            <p className="ml-25 my-10 py-10">I choć stawiamy na eksperyment, jedno pozostaje niezmienne: </p>

            <p className="text-center text-lg font-bold">
              Teatr jest miejscem, które przyjmie wszystko — każdą ideę, każdą emocję, każdy impuls do zmiany.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
