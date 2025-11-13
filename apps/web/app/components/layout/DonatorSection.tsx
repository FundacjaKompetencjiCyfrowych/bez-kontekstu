import CopyField from "@/app/components/ui/CopyField";
import { ContentImage, Image } from "@/app/components/cms/ContentImage";
import { twSizes } from "@/app/lib/twSizes";

interface DonatorSectionProps {
  section: {
    _key: string;
    image?: Image | undefined;
    body?: Array<{
      _key: string;
      heading?: {
        title?: string;
        subtitle?: string;
      };
      fields?: Array<{
        _key: string;
        title?: string;
        text?: string;
        enableCopy?: boolean;
      }>;
    }>;
  };
  dictionary: {
    copyToClipboard: string;
    copied: string;
  };
  imagePosition: "left" | "right";
}

export function DonatorSection({ section, dictionary, imagePosition }: DonatorSectionProps) {
  const isImageLeft = imagePosition === "left";

  const imageColumn = (
    <div className="hidden xl:flex-shrink-0 w-[41%] xl:block">
      <div className="relative w-full aspect-[5/8]">
        {section.image && <ContentImage image={section.image} fill shimmer aspect={5 / 8} sizes={twSizes("0px xl:500px")} />}
      </div>
    </div>
  );

  const contentColumn = (
    <div className="flex-1 space-y-10 xl:space-y-22">
      {section.body &&
        section.body.map((body) => (
          <div key={body._key}>
            <h3 className="pb-4 md:text-2xl xl:text-3xl font-bold">{body.heading?.title}</h3>
            <p className="mb-10 leading-6 md:leading-10 xl:text-xl xl:leading-8">{body.heading?.subtitle}</p>
            <div className="space-y-12 md:text-xl md:leading-10 xl:text-xl xl:leading-8">
              {body.fields &&
                body.fields.map((field) => (
                  <CopyField
                    key={field._key}
                    label={field.title || ""}
                    value={field.text || ""}
                    elementId={field._key}
                    ariaLabel={dictionary.copyToClipboard}
                    ariaLiveCopiedMessage={dictionary.copied}
                    copiedText={dictionary.copied + " ✓"}
                    disabled={field.enableCopy}
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="xl:flex xl:gap-24 mb-8 justify-center items-center">
      {isImageLeft ? (
        <>
          {imageColumn}
          {contentColumn}
        </>
      ) : (
        <>
          {contentColumn}
          {imageColumn}
        </>
      )}
    </div>
  );
}
