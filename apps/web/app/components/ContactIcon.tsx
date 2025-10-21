import Image, { StaticImageData } from "next/image";

interface ContactIconProps {
    src: StaticImageData | string;
    alt: string;
}

export const ContactIcon = ({ src, alt }: ContactIconProps) => {
    return (
        <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
            {/* Mobile icon */}
            <Image
                src={src}
                alt={alt}
                width={20}
                height={20}
                className="block md:hidden"
                sizes="20px"
            />
            {/* Tablet/Desktop icon */}
            <Image
                src={src}
                alt={alt}
                width={32}
                height={32}
                className="hidden md:block"
                sizes="32px"
            />
        </div>
    );
};
