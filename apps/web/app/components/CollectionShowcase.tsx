import { Image } from "./cms/ContentImage";
import { ImageCard } from "./ImageCard";
import LogoViolet from "./LogoViolet";
import { Slider } from "./Slider";
import titleCutWord from "@/app/lib/titleCutWord";

type CollectionItem = {
  name?: string | null;
  timestamp?: string | null;
  slug: { current?: string | undefined } | null;
  _id: string | null;
  cover?: Image | null;
  image?: Image | null;
  [key: string]: unknown;
};

type CollectionShowcaseProps = {
  lang: string;
  collection: CollectionItem[];
  directory: string;
};

/* CollectionShowcase: displays a collection of items as a vertical stack on mobile/tablet and a horizontal slider on desktop */
export function CollectionShowcase({ collection = [], lang, directory }: CollectionShowcaseProps) {
  return (
    <div className="relative flex xl:justify-center xl:items-center flex-1 xl:mt-[90px]">
      <LogoViolet />
      <div className="hidden xl:block absolute right-0 top-0 text-right">{titleCutWord("PR O", "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3")}</div>
      <div className="hidden xl:block absolute left-0 bottom-0 text-left">{titleCutWord("J EKTY", "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3")}</div>

      <section className="xl:overflow-hidden h-auto mx-auto flex flex-col items-center mt-[50px] xl:mt-0 w-full max-w-[1600px]">
        <div className="w-[85vw] md:w-[70vw] xl:w-full text-center text-md sm:text-3xl md:text-4xl lg:text-5xl">
          {/* Mobile and tablet layout - vertical stack */}
          <div className="xl:hidden mx-auto flex flex-col gap-y-14 font-defectica">
            {collection.map((item, index) => {
              return (
                <ImageCard
                  key={item._id}
                  priority={index <= 2}
                  image={item.cover || item.image}
                  href={`/${directory}/${item.slug?.current}`}
                  tag={item.timestamp?.slice(0, 4)}
                  title={item.name ?? ""}
                  lang={lang}
                />
              );
            })}
          </div>

          {/* Desktop layout - horizontal slider */}
          <div className="hidden xl:block">
            <Slider itemsPerSlide={4} gap={24}>
              {collection.map((item, index) => {
                return (
                  <ImageCard
                    key={item._id}
                    title={item.name?.toUpperCase() || ""}
                    tag={item.timestamp?.slice(0, 4)}
                    href={`/${directory}/${item.slug?.current}`}
                    image={item.cover || item.image}
                    priority={index <= 3}
                    variant="slider"
                    lang={lang}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
      </section>


    </div>
  );
}
