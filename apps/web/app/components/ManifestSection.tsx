import { ManifestPageQueryResult } from "@/app/lib/sanity/types";
import { ContentText } from "@/app/components/cms/ContentText";
import { urlFor } from "@/app/lib/sanity/image";
import titleCutWord from "@/app/lib/titleCutWord";
import { cn } from "@/app/lib/utils";
import { ContentImage } from "./cms/ContentImage";

type ManifestSectionProps = {
  section: NonNullable<NonNullable<ManifestPageQueryResult>["sections"]>[number];
  locale: string;
};

const getSectionClasses = (style: ManifestSectionProps["section"]["style"]) => {
  if (!style) return "py-10 md:py-20 xl:py-40 mx-5 xl:grid xl:grid-cols-2 xl:gap-8 xl:items-center xl:mx-0";
  return cn("py-10 md:py-20 xl:py-40 mx-5 xl:grid xl:grid-cols-2 xl:gap-8 xl:items-center xl:mx-0", {
    "xl:text-left": style.desktop === "left",
    "xl:text-right": style.desktop === "right",
    "xl:text-center": style.desktop === "center",
    "md:text-left": style.tablet === "left",
    "md:text-right": style.tablet === "right",
    "md:text-center": style.tablet === "center",
    "text-left": style.mobile === "left",
    "text-right": style.mobile === "right",
    "text-center": style.mobile === "center",
  });
};

const getTitleClasses = (style: ManifestSectionProps["section"]["style"]) => {
  if (!style) return "mb-12 xl:text-6xl";
  return cn("mb-12 xl:text-6xl", {
    "xl:ml-auto": style.desktop === "right",
    "xl:mr-auto": style.desktop === "left",
    "xl:mx-auto": style.desktop === "center",
  });
};

const getBodyClasses = (style: ManifestSectionProps["section"]["style"]) => {
  if (!style) return "font-mono leading-relaxed md:text-xl md:leading-8 xl:leading-10";
  return cn("font-mono leading-relaxed md:text-xl md:leading-8 xl:leading-10", {
    "xl:text-right": style.desktop === "right",
    "xl:text-left": style.desktop === "left",
    "xl:text-center": style.desktop === "center",
  });
};

const getFeatureImageClasses = (style: ManifestSectionProps["section"]["style"]) => {
  if (!style) return "relative w-full h-96 xl:h-[600px] xl:w-[500px] mt-8 xl:mt-0";
  return cn("relative w-full h-96 xl:h-[600px] xl:w-[500px] mt-8 xl:mt-0", {
    "xl:justify-self-start": style.desktop === "left",
    "xl:justify-self-end": style.desktop === "right",
    "xl:justify-self-center": style.desktop === "center",
  });
};

export default function ManifestSection({ section }: ManifestSectionProps) {
  const { style, title, body, feature } = section;

  const sectionClasses = getSectionClasses(style);
  const titleClasses = getTitleClasses(style);
  const bodyClasses = getBodyClasses(style);
  const featureImageClasses = getFeatureImageClasses(style);

  const renderFeature = () => {
    if (!feature) return null;

    if (feature.image) {
      return (
        <div className={`hidden xl:block ${featureImageClasses}`}>
          <ContentImage image={feature.image} fill className="object-cover" sizes="(max-width: 1280px) 0px, 500px" />
        </div>
      );
    }

    if (feature.altTitle) {
      return (
        <div className="hidden xl:col-span-1 xl:flex xl:items-center xl:justify-center">
          {titleCutWord(feature.altTitle, "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl ml-2 sm:ml-3 mt-2 xl:ml-0 xl:mt-0 sm:mt-3")}
        </div>
      );
    }

    return null;
  };

  const isImageLeft = style?.desktop === "right" && feature?.image;
  const isImageRight = style?.desktop === "left" && feature?.image;
  const isAltTitleLeft = style?.desktop === "right" && feature?.altTitle;
  const isAltTitleRight = style?.desktop === "left" && feature?.altTitle;

  return (
    <section className={sectionClasses}>
      {(isImageLeft || isAltTitleLeft) && <div className="xl:col-span-1 xl:flex xl:justify-center">{renderFeature()}</div>}

      <div className="xl:col-span-1 xl:flex xl:flex-col xl:justify-center">
        {title && <h2 className={titleClasses}>{title}</h2>}
        {body && (
          <div className={bodyClasses}>
            <ContentText value={body} />
          </div>
        )}
      </div>

      {(isImageRight || isAltTitleRight) && <div className="xl:col-span-1 xl:flex xl:justify-center">{renderFeature()}</div>}
    </section>
  );
}
