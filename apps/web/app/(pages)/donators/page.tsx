"use client";
import Image from "next/image";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import CopyIcon from "@/app/assets/icons/copy.png";
import { Footer } from "@/app/components/Footer";
import LogoViolet from "@/app/assets/images/logo_violet.png";

export default function DonorsPage() {
  const iconSize = { width: 30, height: 30 };
  const bgBorder = "violet-400";
  const bgGrayOpacity = "neutral-600/70";

  const handleCopy = (elementId: string) => {
    // navigator.clipboard.writeText("Fundacja Bez Kontekstu");
    console.log(elementId);
  };

  return (
    <div className="min-h-screen bg-[#0d0b0e] text-[#F5F5F5] pt-5 px-4 font-mono">
      <div className="max-w-md mx-auto">
        {/*Title*/}
        <div className="flex justify-end h-20 items-center mt-5 mb-24 mx-8">
          <Image src={SoundIcon} alt="Logo" width={30} height={30} />
        </div>

        {/* Violet logo - sticky for all sections from Manifest */}
        <div className="sticky top-1/2 h-0 z-0">
          <Image
            src={LogoViolet}
            priority
            alt="Bez Kontekstu"
            className="absolute blur-[3px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-80 h-80 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 opacity-50"
          />
        </div>

        {/* Support section */}
        <section className="text-sm my-12 mx-5 py-10 text-left">
          <div className="w-[90vw] mx-auto flex flex-col sm:text-3xl md:text-4xl lg:text-5xl font-mono">
            <p className="leading-10">Twoje wsparcie</p>
            <p className="leading-10">=</p>
            <p className="leading-10">nowe przestrzenie sztuki</p>
          </div>
        </section>

        {/* One-time transfer */}
        <div className="mb-8 text-sm">
          <div className="mx-5 mb-4">
            <h3 className="mb-6 font-bold">Przelew jednorazowy</h3>
            <p className="leading-6">Przekaż dowolną bezpośrednio na konto fundacji</p>
          </div>

          {/* Transfer details */}
          <div className="space-y-4 mt-10 mx-5">
            {/* Recipient */}
            {/* <button onClick={() => handleCopy()}> */}
            <div
              className={`border border-${bgBorder} rounded-3xl p-3 mb-10 bg-${bgGrayOpacity}`}
              onClick={() => handleCopy("foundation-name")}
            >
              <div className="flex justify-between items-end mx-2 my-2 ">
                <div>
                  <p className="mb-4">Odbiorca:</p>
                  <p id="foundation-name">Fundacja Bez Kontekstu</p>
                </div>
                <button className="w-6 h-6  flex items-center justify-center">
                  <Image src={CopyIcon} alt="Copy" {...iconSize} />
                </button>
              </div>
            </div>
            {/* </button> */}

            {/* Account number */}
            <div className={`border border-${bgBorder} rounded-3xl p-3 mb-10 bg-${bgGrayOpacity}`}>
              <div className="flex justify-between items-end mx-2 my-2">
                <div>
                  <p className="mb-4">Numer konta:</p>
                  <p>00 1140 2004 0000 3502</p>
                  <p>9481 8053</p>
                </div>
                <button className="w-6 h-6 flex items-center justify-center">
                  <Image src={CopyIcon} alt="Copy" {...iconSize} />
                </button>
              </div>
            </div>

            {/* Title */}
            <div className={`border border-${bgBorder} rounded-3xl p-3 mb-10 bg-${bgGrayOpacity}`}>
              <div className="flex justify-between items-end mx-2 my-2">
                <div>
                  <p className="mb-4">Tytuł:</p>
                  <p>Wsparcie dla fundacji</p>
                </div>
                <button className="w-6 h-6 flex items-center justify-center">
                  <Image src={CopyIcon} alt="Copy" {...iconSize} />
                </button>
              </div>
            </div>

            {/* Address */}
            <div className={`border border-${bgBorder} rounded-3xl p-3 mb-10 bg-${bgGrayOpacity}`}>
              <div className="flex justify-between items-end mx-2 my-2">
                <div>
                  <p className="mb-4">Adres:</p>
                  <p>ul. Smulikowskiego</p>
                  <p>2/600 389 Warszawa</p>
                </div>
                <button className="w-6 h-6  flex items-center justify-center">
                  <Image src={CopyIcon} alt="Copy" {...iconSize} />
                </button>
              </div>
            </div>

            {/* Foundation data */}
            <div className={`border border-${bgBorder} rounded-3xl p-3 mb-10 bg-${bgGrayOpacity}`}>
              <p className="mb-4 mx-2">Dane fundacji:</p>
              <div className="space-y-3 mx-2">
                <p>KRS 0001102013</p>
                <p>REGON 528434787</p>
                <p>NIP 525 300 09 32</p>
              </div>
            </div>
          </div>
        </div>

        {/* 1% PIT */}
        <div className="mb-8 mx-5">
          <h3 className="mb-4 mx-2">1% PIT</h3>
          <p className="mb-10 mx-2 leading-6">
            Przekaż darowiznę bezpośrednio na konto fundacji. W zeznaniu podatkowym wpisz nasz numer KRS.
          </p>

          <div className={`border border-${bgBorder} rounded-3xl p-3 mb-10 bg-${bgGrayOpacity}`}>
            <div className="flex justify-between items-end mx-2 my-2">
              <div>
                <p className="mb-4">KRS:</p>
                <p>0001102013</p>
              </div>
              <button className="w-6 h-6 flex items-center justify-center">
                <Image src={CopyIcon} alt="Copy" {...iconSize} />
              </button>
            </div>
          </div>
        </div>

        {/* Patronite */}
        <div className="mb-20 mx-5">
          <h3 className="mb-4 mx-2">Patronite</h3>
          <p className="mb-10 mx-2">Wspieraj nas regularnie przez platformę Patronite</p>

          <div className={`border border-${bgBorder} rounded-3xl p-3 mb-10 bg-${bgGrayOpacity}`}>
            <button className="w-full text-left space-y-3 mx-2">
              <p>Profil na Patronite</p>
              <p>będzie dostępny wkrótce</p>
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
