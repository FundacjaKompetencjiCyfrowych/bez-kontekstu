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
    <Link href={href} className={cn("group block transition-all duration-300", variant === "slider" ? "xl:w-full" : "xl:w-[70%] hover:scale-105")} rel="noopener noreferrer">
      <div className={cn("relative w-full cursor-pointer overflow-hidden", isMobile ? "h-[250px] md:h-[350px] mb-5" : "h-[500px]")}>
        {image ? (
          <ContentImage
            lqip
            image={image}
            className={cn(
              "w-full h-full object-cover",
              isMobile ? "object-top md:object-center" : "object-center grayscale group-hover:grayscale-0"
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
            isMobile ? "h-20" : "h-24 xl:opacity-0 xl:group-hover:opacity-100 xl:transition-opacity xl:duration-300"
          )}
        />
        <div
          className={cn(
            "absolute font-defectica bottom-0 left-0 z-10 text-left",
            isMobile ? "p-3 mb-4 ml-3 text-2xl md:text-3xl xl:text-4xl" : "p-4 mb-4 ml-4 text-3xl xl:opacity-0 xl:group-hover:opacity-100 xl:translate-y-2 xl:group-hover:translate-y-0 xl:transition-all xl:duration-500"
          )}
        >
          {tag && <p className={cn("font-mono mb-2", isMobile ? "text-md" : "text-lg")}>{tag}</p>}
          <h2 className={cn(isMobile ? "text-2xl md:text-3xl" : "text-2xl")}>{title}</h2>
        </div>
      </div>
    </Link>
  );
}
