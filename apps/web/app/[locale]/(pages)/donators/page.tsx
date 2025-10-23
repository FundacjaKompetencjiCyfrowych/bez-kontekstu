import Image from "next/image";
import DonatorsLeftImage from "@/app/assets/images/donators_left.png";
import DonatorsRightImage from "@/app/assets/images/donators_right.png";
import titleCutWord from "@/app/lib/titleCutWord";
import CopyField from "@/app/components/CopyField";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";

export default async function DonorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const buttonClasses =
    "border border-violet-300 rounded-3xl p-3 mb-10 md:mb-16 bg-neutral-600/50 cursor-pointer w-full text-left relative z-10";
  const containerClasses = "border border-violet-300 rounded-3xl p-3 mb-4 bg-neutral-600/70";

  return (
    <div className="px-2 flex flex-col justify-between font-mono w-full min-h-screen md:px-5 xl:flex xl:flex-col xl:min-h-[1024px]">
      <div className="relative flex xl:justify-center xl:items-center xl:h-[90vh] xl:mt-[90px] xl:min-h-[1024px]">
        {/*Title desktop */}
        <div className="hidden xl:block absolute right-0 top-0 text-right">
          {titleCutWord("DL A", "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3")}
        </div>
        <div className="xl:block hidden absolute left-0 bottom-0">
          {titleCutWord("DAR CZYŃCÓW", "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3")}
        </div>

        {/* Two column layout for desktop */}
        <div className="relative xl:mt-[100px] xl:grid xl:grid-cols-2 xl:gap-16 xl:w-full xl:max-w-7xl xl:mx-auto">
          {/* Left Column - Empty space */}
          <div className="xl:col-span-1"></div>

          {/* Right Column - Support message */}
          <div className="xl:col-span-1 xl:flex xl:items-center">
            <div className="hidden xl:flex flex-col text-left font-mono xl:text-4xl xl:leading-12">
              <p>Twoje wsparcie</p>
              <p>=</p>
              <p>nowe przestrzenie sztuki</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of content */}
      <div className="max-w-4xl xl:max-w-7xl mx-auto relative">
        {/* Support section - Mobile/Tablet */}
        <section className="relative text-sm my-12 mx-3 mt-[100px] py-10 text-left xl:hidden">
          <div className="pl-3 mx-auto flex flex-col sm:text-2xl md:text-2xl lg:text-5xl font-mono">
            <p className="leading-8  md:leading-14 ">Twoje wsparcie</p>
            <p className="leading-8  md:leading-14">=</p>
            <p className="leading-8  md:leading-14">nowe przestrzenie sztuki</p>
          </div>
        </section>

        {/* Info - Desktop 2-column layout */}
        <div className="relative mb-8 text-sm z-50 xl:grid xl:grid-cols-2 xl:gap-16 xl:max-w-7xl xl:mx-auto xl:py-20">
          {/* Left Column - Image */}
          <div className="hidden xl:flex xl:col-span-1 xl:items-center xl:justify-center">
            <div className="relative w-full h-96 xl:h-[800px] xl:w-[500px]">
              <Image src={DonatorsLeftImage} alt="Wsparcie dla fundacji" fill sizes="auto" className="object-cover" />
            </div>
          </div>

          {/* Right Column - Payment details */}
          <div className="xl:col-span-1">
            <div className="mx-5 mb-4 md:text-2xl xl:text-3xl xl:mx-0">
              <h3 className="mb-6">
                <strong>Przelew jednorazowy</strong>
              </h3>
              <p className="leading-6 xl:leading-10">Przekaż dowolną bezpośrednio na konto fundacji</p>
            </div>

            {/* Transfer details */}
            <div className="space-y-4 mt-10 mx-5 md:text-xl md:leading-10 xl:mx-0 xl:text-xl xl:leading-8">
              {/* Recipient */}
              <CopyField
                className={buttonClasses}
                label="Odbiorca:"
                value="Fundacja Bez Kontekstu"
                elementId="foundation"
                copiedText={dictionary.copied + " ✓"}
                ariaLiveCopiedMessage={dictionary.copiedToClipboard}
                ariaLabel="Skopiuj nazwę fundacji: Fundacja Bez Kontekstu"
              />

              {/* Account number */}
              <CopyField
                className={buttonClasses}
                label="Numer konta:"
                value="00 1140 2004 0000 3502 9481 8053"
                elementId="account"
                copiedText={dictionary.copied + " ✓"}
                ariaLiveCopiedMessage={dictionary.copiedToClipboard}
                ariaLabel="Skopiuj numer konta: 00 1140 2004 0000 3502 9481 8053"
              />

              {/* Title */}
              <CopyField
                className={buttonClasses}
                label="Tytuł:"
                value="Wsparcie dla fundacji"
                elementId="title"
                copiedText={dictionary.copied + " ✓"}
                ariaLiveCopiedMessage={dictionary.copiedToClipboard}
                ariaLabel="Skopiuj tytuł przelewu: Wsparcie dla fundacji"
              />

              {/* Address */}
              <CopyField
                className={buttonClasses}
                label="Adres:"
                value="ul. Smulikowskiego 2 500-389 Warszawa"
                elementId="address"
                copiedText={dictionary.copied + " ✓"}
                ariaLiveCopiedMessage={dictionary.copiedToClipboard}
                valueClassName="w-[160px] md:w-auto"
                ariaLabel="Skopiuj adres fundacji: ul. Smulikowskiego 2 500-389 Warszawa"
              />

              {/* Foundation data */}
              <CopyField
                className={buttonClasses}
                label="REGON:"
                value="528434787"
                elementId="regon"
                copiedText={dictionary.copied + " ✓"}
                ariaLiveCopiedMessage={dictionary.copiedToClipboard}
                valueClassName="w-[160px] md:w-[250px]"
                ariaLabel="Skopiuj REGON: 528434787"
              />

              {/* NIP */}
              <CopyField
                className={buttonClasses}
                label="NIP:"
                value="5253000932"
                elementId="nip"
                copiedText={dictionary.copied + " ✓"}
                ariaLiveCopiedMessage={dictionary.copiedToClipboard}
                valueClassName="w-[160px] md:w-[250px]"
                ariaLabel="Skopiuj NIP: 5253000932"
              />
            </div>
          </div>
        </div>

        {/* 1% PIT - Desktop 2-column layout */}
        <div className="mb-8 mx-5 relative md:text-xl xl:grid xl:grid-cols-2 xl:gap-16 xl:max-w-7xl xl:mx-auto xl:py-20">
          {/* Left Column - 1% PIT content */}
          <div className="xl:col-span-1">
            <h3 className="mb-4 mx-2 md:text-3xl xl:text-4xl xl:mx-0">
              <strong>1% PIT</strong>
            </h3>
            <p className="mb-10 mx-2 leading-6 md:leading-10 xl:text-xl xl:leading-8 xl:mx-0">
              Przekaż darowiznę bezpośrednio na konto fundacji. W zeznaniu podatkowym wpisz nasz numer KRS.
            </p>

            <CopyField
              className={buttonClasses}
              label="KRS:"
              value="0001102013"
              elementId="krs"
              copiedText="Skopiowano ✓"
              ariaLiveCopiedMessage={dictionary.copiedToClipboard}
              ariaLabel="Skopiuj numer KRS: 0001102013"
            />

            {/* Patronite */}
            <div className="relative md:text-xl md:leading-10 xl:py-20">
              <h3 className="mb-4 mx-2 md:text-3xl">
                <strong>Patronite</strong>
              </h3>
              <p className="mb-10 mx-2">Wspieraj nas regularnie przez platformę Patronite</p>

              <div className={containerClasses}>
                <button className="w-full text-left space-y-3 py-2 mx-2">
                  <p>Profil na Patronite</p>
                  <p>będzie dostępny wkrótce</p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="hidden xl:flex xl:col-span-1 xl:items-center xl:justify-center">
            <div className="relative w-full h-96 xl:h-[800px] xl:w-[500px]">
              <Image src={DonatorsRightImage} alt="1% PIT dla fundacji" fill sizes="auto" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
