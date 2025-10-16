import Image from "next/image";
import LogoVioletImage from "@/app/assets/images/logo_violet.png";

export default function LogoViolet() {
  const sizes = "max-h-[100%] w-80 h-80 sm:w-128 sm:h-128 md:w-190 md:h-190 object-contain";
  const smLandscape = "sm:landscape:absolute sm:landscape:left-1/2 sm:landscape:top-1/2 sm:landscape:transform sm:landscape:-translate-x-1/2 sm:landscape:-translate-y-1/2";
  const mdLandscape = "md:landscape:absolute md:landscape:left-1/2 md:landscape:top-1/2 md:landscape:transform md:landscape:-translate-x-1/2 md:landscape:-translate-y-1/2";
  const lgLandscape = "lg:landscape:absolute lg:landscape:left-1/2 lg:landscape:top-1/2 lg:landscape:transform lg:landscape:-translate-x-1/2 lg:landscape:-translate-y-1/2";
  const xlLandscape = "xl:landscape:top-1/2";
  const landscape = `${smLandscape} ${mdLandscape} ${lgLandscape} ${xlLandscape}`;

  return (
    <Image
      src={LogoVioletImage}
      alt="Bez Kontekstu"
      className={`absolute blur-[6px] ${sizes} md:blur-[8px] md:opacity-25 xl:opacity-50 xl:blur-[6px] left-1/2 top-[20vh] ${landscape} transform -translate-x-1/2 -translate-y-1/2 opacity-50`}
    />
  )
}
