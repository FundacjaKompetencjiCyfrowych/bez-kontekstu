import Image from "next/image";
import LogoVioletImage from "@/app/assets/images/logo_violet.png";

export default function LogoViolet() {
  return (
      <Image
        src={LogoVioletImage}
        alt="Bez Kontekstu"
        className="absolute blur-[6px] md:blur-[8px] md:opacity-25 xl:opacity-50 xl:blur-[6px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-80 h-80 sm:w-128 sm:h-128 md:w-190 md:h-190 opacity-50"
      />
  );
}
