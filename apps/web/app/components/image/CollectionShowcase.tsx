import { Image } from "@/app/components/cms/ContentImage";
import { ImageCard } from "@/app/components/image/ImageCard";
import { Slider } from "@/app/components/image/Slider";
import { SectionContainer } from "../layout/SectionContainer";
import { SplitTitle } from "../ui/SplitTitle";
import { Logo } from "./Logo";

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
  title?: string[];
  srTitle: string;
};

/* CollectionShowcase: displays a collection of items as a vertical stack on mobile/tablet and a horizontal slider on desktop */
export function CollectionShowcase({ collection = [], lang, directory, title, srTitle }: CollectionShowcaseProps) {
  return (
    <SectionContainer variant="heroBoxedOnDesktop">
      <Logo container="mobileOffset" />
      <SplitTitle variant="hero" desktop="topRight" desktopText={title ? title[0] : ""} srText={srTitle} srId="collection-title" />
      <SplitTitle variant="hero" desktop="bottomLeft" desktopText={title ? title[1] : ""} srText={null} />

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
            <div className="w-[80%] mx-auto">
              <Slider itemsPerSlide={4} gap={10}>
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
        </div>
      </section>
    </SectionContainer>
  );
}
