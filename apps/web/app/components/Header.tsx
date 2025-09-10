import Image from "next/image";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import LogoViolet from "@/app/assets/images/logo_violet.png";

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showTitle?: boolean;
}

export function Header({ title = "", showLogo = true, showTitle = true }: HeaderProps) {
  // Split title into words for vertical display
  const titleWords = title.split(" ");

  return (
    <>
      {/* Title Section */}
      {showTitle && (
        <div className="flex justify-between items-center my-10 mx-4 md:my-12 md:mx-6 z-10">
          <div className="flex flex-col">
            {titleWords.map((word, index) => (
              <h1 key={index}>{word}</h1>
            ))}
          </div>
          <Image src={SoundIcon} alt="Sound button" width={30} height={30} className="md:w-10 md:h-10" />
        </div>
      )}

      {/* Violet logo - sticky background */}
      {showLogo && (
        <div className="sticky top-1/2 h-0 z-0">
          <Image
            src={LogoViolet}
            priority
            alt="Bez Kontekstu"
            className="absolute blur-[3px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-80 h-80 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 xl:w-200 xl:h-200 opacity-50"
          />
        </div>
      )}
    </>
  );
}
