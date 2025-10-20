import Image from "next/image";
import LogoVioletImage from "@/app/assets/images/logo_violet.png";

interface LogoVioletProps {
  pageType?: 'home' | 'sounds' | 'contact' | 'default';
}

export default function LogoViolet({ pageType = 'default' }: LogoVioletProps) {
  // Get positioning classes based on page type
  const getMobilePositioning = () => {
    switch (pageType) {
      case 'home':
        return 'top-[200px] md:top-[300px] md:landscape:top-[340px] lg:landscape:top-[42vh]';
      case 'sounds':
        return 'top-[10vh] sm:landscape:top-0 md:landscape:top-0 md:landscape:max-h-screen lg:landscape:top-0 sm:landscape:max-h-screen';
      case 'contact':
        return 'top-[10vh] sm:landscape:top-0 md:landscape:top-0 md:landscape:max-h-screen lg:landscape:top-0 sm:landscape:max-h-screen';
      default:
        return 'top-[30vh]  sm:landscape:top-[300px] lg:landscape:top-[42vh] md:landscape:max-h-[450px] lg:landscape:max-h-screen';
    }
  };

  return (
    <>
      {/* Mobile Logo - positioned under menu icon */}
      <Image
        src={LogoVioletImage}
        alt="Bez Kontekstu"
        className={`absolute left-1/2 transform -translate-x-1/2 w-80 h-80 sm:w-128 sm:h-128 md:w-190 md:h-190 object-contain blur-[6px] opacity-50 xl:hidden ${getMobilePositioning()}`}
      />

      {/* Desktop Logo - positioned at 50vh, blurred */}
      <Image
        src={LogoVioletImage}
        alt="Bez Kontekstu"
        className="hidden xl:block absolute left-1/2 top-[50vh] xl:top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-200 h-200 object-contain blur-[4px] opacity-50"
      />

      {/* Desktop Second Logo - positioned at bottom for donators/manifest pages */}
      <Image
        src={LogoVioletImage}
        alt="Bez Kontekstu"
        className={`hidden xl:block absolute left-1/2 top-[100vh] transform -translate-x-1/2 w-250 h-250 object-contain blur-[8px] opacity-25 ${pageType === 'sounds' || pageType === 'contact' ? 'xl:hidden' : ''}`}
      />
    </>
  )
}
