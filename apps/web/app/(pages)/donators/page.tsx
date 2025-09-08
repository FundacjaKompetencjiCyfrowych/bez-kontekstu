"use client";
import React, { useRef, useState } from "react";
import { useCopyToClipboard, useTimeout } from "usehooks-ts";
import Image from "next/image";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import CopyIcon from "@/app/assets/icons/copy.png";
import { Footer } from "@/app/components/Footer";
import LogoViolet from "@/app/assets/images/logo_violet.png";

export default function DonorsPage() {
  const iconSize = { width: 30, height: 30 };
  const buttonClasses = "border border-violet-300 rounded-3xl p-3 mb-10 bg-neutral-600/50 cursor-pointer w-full text-left relative z-10";
  const containerClasses = "border border-violet-300 rounded-3xl p-3 mb-10 bg-neutral-600/70";

  // Create references to all copyable elements
  const foundationNameRef = useRef<HTMLParagraphElement>(null);
  const accountNumberRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const addressRef = useRef<HTMLParagraphElement>(null);
  const krsRef = useRef<HTMLParagraphElement>(null);

  // State to track which elements are showing "copied" message
  const [copiedElements, setCopiedElements] = useState<Set<string>>(new Set());
  const [copiedText, copy] = useCopyToClipboard();

  // Use useTimeout to hide "copied" messages after 2 seconds
  useTimeout(() => setCopiedElements(new Set()), copiedElements.size > 0 ? 2000 : null);

  const handleCopy = (text: string, elementId: string) => () => {
    copy(text)
      .then(() => {
        // Show "copied" message
        setCopiedElements((prev) => new Set([...prev, elementId]));
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  return (
    <div className="min-h-screen bg-[#0d0b0e] pt-5 px-4 font-mono">
      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {copiedElements.size > 0 && "Tekst został skopiowany do schowka"}
      </div>
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

        {/* Info */}
        <div className="mb-8 text-sm z-50">
          <div className="mx-5 mb-4">
            <h3 className="mb-6 font-bold">Przelew jednorazowy</h3>
            <p className="leading-6">Przekaż dowolną bezpośrednio na konto fundacji</p>
          </div>

          {/* Transfer details */}
          <div className="space-y-4 mt-10 mx-5">
            {/* Recipient */}
            <button
              className={buttonClasses}
              onClick={handleCopy("Fundacja Bez Kontekstu", "foundation")}
              aria-label="Skopiuj nazwę fundacji: Fundacja Bez Kontekstu"
            >
              <div className="flex justify-between items-end mx-2 my-2 ">
                <div>
                  <p className="mb-4">Odbiorca:</p>
                  <p ref={foundationNameRef}>{copiedElements.has("foundation") ? "Skopiowano ✓" : "Fundacja Bez Kontekstu"}</p>
                </div>
                <div className="w-6 h-6  flex items-center justify-center">
                  <Image src={CopyIcon} alt="Copy" {...iconSize} />
                </div>
              </div>
            </button>

            {/* Account number */}
            <button
              className={buttonClasses}
              onClick={handleCopy("00114020040000350294818053", "account")}
              aria-label="Skopiuj numer konta: 00 1140 2004 0000 3502 9481 8053"
            >
              <div className="flex justify-between items-end mx-2 my-2">
                <div ref={accountNumberRef}>
                  <p className="mb-4">Numer konta:</p>
                  <p>{copiedElements.has("account") ? "Skopiowano ✓" : "00 1140 2004 0000 3502 9481 8053"}</p>
                </div>
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image src={CopyIcon} alt="Copy" {...iconSize} />
                </div>
              </div>
            </button>

            {/* Title */}
            <button
              className={buttonClasses}
              onClick={handleCopy("Wsparcie dla fundacji", "title")}
              aria-label="Skopiuj tytuł przelewu: Wsparcie dla fundacji"
            >
              <div className="flex justify-between items-end mx-2 my-2">
                <div>
                  <p className="mb-4">Tytuł:</p>
                  <p ref={titleRef}>{copiedElements.has("title") ? "Skopiowano ✓" : "Wsparcie dla fundacji"}</p>
                </div>
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image src={CopyIcon} alt="Copy" {...iconSize} />
                </div>
              </div>
            </button>

            {/* Address */}
            <button
              className={buttonClasses}
              onClick={handleCopy("ul. Smulikowskiego 2, 500-389 Warszawa", "address")}
              aria-label="Skopiuj adres fundacji: ul. Smulikowskiego 2, 500-389 Warszawa"
            >
              <div className="flex justify-between items-end mx-2 my-2">
                <div>
                  <p className="mb-4">Adres:</p>
                  <p ref={addressRef} className="w-[160px]">
                    {copiedElements.has("address") ? "Skopiowano ✓" : "ul. Smulikowskiego 2 500-389 Warszawa"}
                  </p>
                </div>
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image src={CopyIcon} alt="Copy" {...iconSize} />
                </div>
              </div>
            </button>

            {/* Foundation data */}
            <div className={containerClasses}>
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

          <button className={buttonClasses} onClick={handleCopy("0001102013", "krs")} aria-label="Skopiuj numer KRS: 0001102013">
            <div className="flex justify-between items-end mx-2 my-2">
              <div>
                <p className="mb-4">KRS:</p>
                <p ref={krsRef}>{copiedElements.has("krs") ? "Skopiowano ✓" : "0001102013"}</p>
              </div>
              <div className="w-6 h-6 flex items-center justify-center">
                <Image src={CopyIcon} alt="Copy" {...iconSize} />
              </div>
            </div>
          </button>
        </div>

        {/* Patronite */}
        <div className="mb-20 mx-5">
          <h3 className="mb-4 mx-2">Patronite</h3>
          <p className="mb-10 mx-2">Wspieraj nas regularnie przez platformę Patronite</p>

          <div className={containerClasses}>
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
