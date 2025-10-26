import Image, { StaticImageData } from "next/image";

interface ContactIconProps {
  src: StaticImageData | string;
  alt: string;
}

export const ContactIcon = ({ src, alt }: ContactIconProps) => {
  return (
    <div className="flex items-center justify-center">
      <Image src={src} alt={alt} className="w-6 h-6 md:w-7 md:h-7" />
    </div>
  );
};
