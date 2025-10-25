import Link from "next/link";
import { ContentImage, Image } from "@/app/components/cms/ContentImage";
import { cn } from "@/app/lib/utils";
import { getDictionary } from "../lib/intl/dictionaries/dynamic";

type ImageCardProps = {
  title: string;
  tag?: string;
  href: string;
  priority?: boolean;
  image?: Image | null;
  lang: string;
  variant?: "mobile" | "slider";
};

export async function ImageCard({ title, tag, priority = false, image, href, lang, variant = "mobile" }: ImageCardProps) {
  const dictionary = await getDictionary(lang);
  const isMobile = variant === "mobile";

  return (
    <Link href={href} className="block transition-transform duration-200 hover:scale-105">
      <div className={cn("relative w-full cursor-pointer overflow-hidden", isMobile ? "h-[250px] md:h-[350px] mb-5" : "h-[400px]")}>
        {image ? (
          <ContentImage
            lqip
            image={image}
            className={cn(
              "w-full h-full object-cover",
              isMobile ? "object-top md:object-center" : "object-center grayscale hover:grayscale-0"
            )}
            sizes={isMobile ? "(max-width: 768px) 100vw, 85vw" : "25vw"}
            priority={priority}
            fill
          />
        ) : (
          <p className={cn("text-gray-400 font-mono text-center", isMobile ? "text-sm md:text-xl pt-14" : "text-xl pt-32")}>
            {dictionary.noImage}
          </p>
        )}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none",
            isMobile ? "h-20" : "h-24"
          )}
        />
        <div
          className={cn(
            "absolute font-defectica bottom-0 left-0 z-10 text-left",
            isMobile ? "p-3 mb-4 ml-3 text-2xl md:text-3xl xl:text-4xl" : "p-4 mb-4 ml-4 text-3xl"
          )}
        >
          {tag && <p className={cn("font-mono mb-2", isMobile ? "text-md" : "text-lg xl:hidden")}>{tag}</p>}
          <h2 className={cn(isMobile ? "text-2xl md:text-3xl" : "text-2xl xl:hidden")}>{title}</h2>
        </div>
      </div>
    </Link>
  );
}
