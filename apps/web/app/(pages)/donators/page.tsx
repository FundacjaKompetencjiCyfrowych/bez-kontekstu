import Image from "next/image";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import CopyIcon from "@/app/assets/icons/copy.png";
import { Footer } from "@/app/components/Footer";

export default function DonorsPage() {
  const iconSize = { width: 20, height: 20 };

  return (
    <div className="min-h-screen bg-black text-[#F5F5F5] pt-5 px-4 font-mono">
      <div className="max-w-md mx-auto">
        {/*Title*/}
        <div className="flex justify-between items-center my-10">
          <div className="flex flex-col">
            <h1 className=" leading-tight font-defectica">
              DLA
              <br />
              DARCZYŃ
              <br />
              CÓW
            </h1>
          </div>
          <Image src={SoundIcon} alt="Logo" width={45} height={45} />
        </div>

        {/* Support section */}
        <section className="text-sm my-16 py-10 text-left">
          <h2>Twoje wsparcie</h2>
          <p>=</p>
          <h2>nowe przestrzenie sztuki</h2>
        </section>

        {/* One-time transfer */}
        <div className="mb-8 text-sm">
          <div className="mx-2 mb-4">
            <h3 className="mb-6 font-bold">Przelew jednorazowy</h3>
            <p className="leading-6">Przekaż dowolną bezpośrednio na konto fundacji</p>
          </div>

          {/* Transfer details */}
          <div className="space-y-4 mt-10">
            {/* Recipient */}
            <div className="border border-white rounded-3xl p-3 mb-10">
              <div className="flex justify-between items-end mx-2 my-2">
                <div>
                  <p className="mb-4">Odbiorca:</p>
                  <p>Fundacja Bez Kontekstu</p>
                </div>
                <button className="w-6 h-6  flex items-center justify-center">
                  <Image src={CopyIcon} alt="Copy" {...iconSize} />
                </button>
              </div>
            </div>

            {/* Account number */}
            <div className="border border-white rounded-3xl p-3 mb-10">
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
            <div className="border border-white rounded-3xl p-3 mb-10">
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
            <div className="border border-white rounded-3xl p-3 mb-10">
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
            <div className="border border-white rounded-3xl p-3 mb-10">
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
        <div className="mb-8">
          <h3 className="mb-4 mx-2">1% PIT</h3>
          <p className="mb-10 mx-2 leading-6">
            Przekaż darowiznę bezpośrednio na konto fundacji. W zeznaniu podatkowym wpisz nasz numer KRS.
          </p>

          <div className="border border-white rounded-3xl p-3 mb-10">
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
        <div className="mb-20">
          <h3 className="mb-4 mx-2">Patronite</h3>
          <p className="mb-10 mx-2">Wspieraj nas regularnie przez platformę Patronite</p>

          <div className="border border-white rounded-3xl p-3 mb-10">
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
