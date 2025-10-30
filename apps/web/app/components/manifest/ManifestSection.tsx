import { ManifestPageQueryResult } from "@/app/lib/sanity/types";
import { ContentText } from "@/app/components/cms/ContentText";
import { ContentImage } from "../cms/ContentImage";
import { cn } from "@/app/lib/utils";
import { twSizes } from "../../lib/twSizes";

type ManifestSectionProps = {
  section: NonNullable<NonNullable<ManifestPageQueryResult>["sections"]>[number];
  locale: string;
};

export default function ManifestSection({ section }: ManifestSectionProps) {
  const { style, title, body, feature } = section;

  const alignment = style?.desktop || "left";
  const isContentRight = alignment === "right";

  // Render image or text on one side (featured element)
  const renderFeature = () => {
    if (!feature) return null;

    if (feature.image) {
      return (
        <div className="relative w-full xl:w-[500px] aspect-[3/4]">
          <ContentImage image={feature.image} fill className="object-cover" sizes={twSizes("50vw max:500px")} />
        </div>
      );
    }

    if (feature.altTitle) {
      return <h2 className="text-4xl font-space-mono font-bold whitespace-pre-line xl:text-right">{feature.altTitle}</h2>;
    }

    return null;
  };

  return (
    <section className="relative py-10 xl:py-20 px-5 xl:px-0">
      <div className={cn("xl:flex xl:gap-8 xl:items-center", !isContentRight && "xl:flex-row-reverse")}>
        {/* Feature column */}
        <div className="hidden xl:flex xl:flex-1 xl:justify-end">{renderFeature()}</div>

        {/* Content column */}
        <div
          className={cn(
            "xl:flex-1",
            style?.mobile === "center" && "text-center",
            style?.mobile === "right" && "text-right",
            style?.mobile === "left" && "text-left",
            !style?.mobile && "text-left",
            isContentRight ? "xl:text-left" : "xl:text-right"
          )}
        >
          {/* Title */}
          {title && (
            <h2
              className={cn(
                "my-12 text-5xl md:text-6xl",
                feature?.altTitle && "text-4xl leading-16 md:leading-22 whitespace-pre-line text-center xl:hidden"
              )}
            >
              {feature?.altTitle || title}
            </h2>
          )}
          {/* Body */}
          {body && (
            <div
              className={cn(
                `font-mono leading-relaxed md:text-xl md:leading-8 xl:leading-10`,
                style?.mobile === "fusion" &&
                  "[&>*]:w-full [&>*:nth-child(3)]:w-1/2 [&>*:nth-child(3)]:my-10 lg:[&>*:nth-child(3)]:w-full [&>*:last-child]:text-center [&>*:nth-child(3)]:ml-30 lg:[&>*:nth-child(3)]:ml-0 sm:[&>*:nth-child(even)]:mr-0 sm:[&>*:nth-child(4n+2)]:ml-0 sm:[&>*:nth-child(4n+2)]:mr-auto",
                style?.tablet === "fusion" &&
                  "md:[&>*]:w-full md:[&>*:last-child]:text-center lg:[&>*:last-child]:text-left md:[&>*:nth-child(even)]:w-1/2 md:[&>*:nth-child(even)]:ml-auto md:[&>*:nth-child(even)]:mr-0 md:[&>*:nth-child(4n+2)]:ml-0 md:[&>*:nth-child(4n+2)]:mr-auto"
              )}
            >
              <ContentText value={body} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
