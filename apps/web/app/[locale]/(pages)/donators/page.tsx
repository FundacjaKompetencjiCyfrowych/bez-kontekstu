"use client";
import React, { useRef, useState } from "react";
import { useCopyToClipboard, useTimeout } from "usehooks-ts";
import Image from "next/image";
import copyIcon from "@/app/assets/icons/copy.png";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import DonatorsLeftImage from "@/app/assets/images/donators_left.png";
import DonatorsRightImage from "@/app/assets/images/donators_right.png";
import LogoViolet from "@/app/components/LogoViolet";
import LogoVioletImage from "@/app/assets/images/logo_violet.png";

export default function DonorsPage() {
  const buttonClasses =
    "border border-violet-300 rounded-3xl p-3 mb-10 md:mb-16 bg-neutral-600/50 cursor-pointer w-full text-left relative z-10";
  const containerClasses = "border border-violet-300 rounded-3xl p-3 mb-4 bg-neutral-600/70";

  const titleCutWord = (title: string) =>
    title.split(" ").map((word, index) => (
      <h1 className="sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl ml-2 sm:ml-3 mt-2 sm:mt-3" key={index}>
        {word}
      </h1>
    ));

  // Create references to all copyable elements
  const foundationNameRef = useRef<HTMLParagraphElement>(null);
  const accountNumberRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const addressRef = useRef<HTMLParagraphElement>(null);
  const krsRef = useRef<HTMLParagraphElement>(null);

  // State to track which elements are showing "copied" message
  const [copiedElements, setCopiedElements] = useState<Set<string>>(new Set());
  const [, copy] = useCopyToClipboard();

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

  // Copy icon component
  const CopyIcon = () => {
    return (
      <div className="w-6 h-6 md:w-12 md:h-12 flex items-center justify-center">
        {/* Mobile icon - visible on small screens */}
        <Image src={copyIcon} alt="Copy" width={24} height={24} className="block md:hidden" />
        {/* Tablet/Desktop icon - visible on md+ screens */}
        <Image src={copyIcon} alt="Copy" width={40} height={40} className="hidden md:block" />
      </div>
    );
  };

  return (
    <div className="justify-between font-mono w-full min-h-screen px-7 xl:flex xl:flex-col">
      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {copiedElements.size > 0 && "Tekst został skopiowany do schowka"}
      </div>

      {/*Title mobile*/}
      <Header title="DLA DARCZYŃ CÓW" className="xl:hidden" />
      <div className="relative flex xl:justify-center xl:items-center xl:h-[70vh] xl:mt-[90px]">
        {/*Title desktop - top right*/}
        <div className="hidden xl:block absolute right-0 top-0 text-right">{titleCutWord("DL A")}</div>

        <LogoViolet />
                {/*Second violet logo - desktop */}
                <div className="hidden xl:block">              
          <Image
            src={LogoVioletImage}
            alt="Bez Kontekstu"
            className="hidden xl:block xl:absolute blur-[8px] left-1/2 top-[100vh] transform -translate-x-1/2 xl:w-200 xl:h-200 opacity-25"
          />
        </div>


        {/* Two column layout for desktop */}
        <div className="relative xl:mt-[100px] xl:grid xl:grid-cols-2 xl:gap-16 xl:w-full xl:max-w-7xl xl:mx-auto">
          {/* Left Column - Empty space */}
          <div className="xl:col-span-1"></div>

          {/* Right Column - Support message */}
          <div className="xl:col-span-1 xl:flex xl:items-center">
            <div className="hidden xl:flex flex-col text-left font-mono xl:text-2xl xl:leading-8">
              <p>Twoje wsparcie</p>
              <p>=</p>
              <p>nowe przestrzenie sztuki</p>
            </div>
          </div>
        </div>

        {/*Title desktop - bottom left*/}
        <div className="xl:block hidden absolute left-0 bottom-0">{titleCutWord("DAR CZYŃCÓW")}</div>
      </div>

      {/* Rest of content */}
      <div className="max-w-4xl xl:max-w-7xl mx-auto relative">
        {/* Support section - Mobile/Tablet */}
        <section className="relative text-sm my-12 mx-5 mt-[100px] py-10 text-left xl:hidden">
          <div className="w-[90vw] mx-auto flex flex-col sm:text-3xl md:text-4xl lg:text-5xl font-mono">
            <p className="leading-8  md:leading-14 ">Twoje wsparcie</p>
            <p className="leading-8  md:leading-14">=</p>
            <p className="leading-8  md:leading-14">nowe przestrzenie sztuki</p>
          </div>
        </section>

        {/* Info - Desktop 2-column layout */}
        <div className="relative mb-8 md:mb-18 text-sm z-50 xl:grid xl:grid-cols-2 xl:gap-16 xl:max-w-7xl xl:mx-auto xl:py-20">
          {/* Left Column - Image */}
          <div className="hidden xl:flex xl:col-span-1 xl:items-center xl:justify-center">
            <div className="relative w-full h-96 xl:h-[800px] xl:w-[500px]">
              <Image src={DonatorsLeftImage} alt="Wsparcie dla fundacji" fill className="object-cover" />
            </div>
          </div>

          {/* Right Column - Payment details */}
          <div className="xl:col-span-1">
            <div className="mx-5 mb-4 xl:mx-0">
              <h3 className="mb-6 md:text-2xl xl:text-3xl">
                <strong>Przelew jednorazowy</strong>
              </h3>
              <p className="leading-6 md:text-2xl xl:text-xl xl:leading-8">Przekaż dowolną bezpośrednio na konto fundacji</p>
            </div>

            {/* Transfer details */}
            <div className="space-y-4 mt-10 mx-5 md:text-2xl md:leading-10 xl:mx-0 xl:text-xl xl:leading-8">
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
                  <CopyIcon />
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
                  <CopyIcon />
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
                  <CopyIcon />
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
                    <p ref={addressRef} className="w-[160px] md:w-[250px]">
                      {copiedElements.has("address") ? "Skopiowano ✓" : "ul. Smulikowskiego 2 500-389 Warszawa"}
                    </p>
                  </div>
                  <CopyIcon />
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
        </div>

        {/* 1% PIT - Desktop 2-column layout */}
        <div className="mb-8 mx-5 relative md:text-2xl xl:grid xl:grid-cols-2 xl:gap-16 xl:max-w-7xl xl:mx-auto xl:py-20">
          {/* Left Column - 1% PIT content */}
          <div className="xl:col-span-1">
            <h3 className="mb-4 mx-2 md:text-3xl xl:text-4xl xl:mx-0">
              <strong>1% PIT</strong>
            </h3>
            <p className="mb-10 mx-2 leading-6 md:leading-10 xl:text-xl xl:leading-8 xl:mx-0">
              Przekaż darowiznę bezpośrednio na konto fundacji. W zeznaniu podatkowym wpisz nasz numer KRS.
            </p>

            <button className={buttonClasses} onClick={handleCopy("0001102013", "krs")} aria-label="Skopiuj numer KRS: 0001102013">
              <div className="flex justify-between items-end mx-2 my-2">
                <div>
                  <p className="mb-4">KRS:</p>
                  <p ref={krsRef}>{copiedElements.has("krs") ? "Skopiowano ✓" : "0001102013"}</p>
                </div>
                <CopyIcon />
              </div>
            </button>

            {/* Patronite */}
            <div className="relative md:text-2xl md:leading-10 xl:py-20">
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
              <Image src={DonatorsRightImage} alt="1% PIT dla fundacji" fill className="object-cover" />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
