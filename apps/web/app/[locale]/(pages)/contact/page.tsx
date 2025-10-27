import Link from "next/link";
import { Metadata } from "next";
import LogoViolet from "@/app/components/LogoViolet";
import titleCutWord from "@/app/lib/titleCutWord";
import { sanityFetch } from "@/app/lib/sanity/live";
import { cache } from "react";
import { contactPageQuery } from "@/app/lib/sanity/queries";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { ContentIcon } from "@/app/components/cms/ContentIcon";

const getContactPage = cache(async (locale: string) => {
  return await sanityFetch({ query: contactPageQuery, params: { lang: locale } });
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getContactPage(locale);
  return mapMetadata(data?.meta);
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await getContactPage(locale);
  return (
    <div className="flex w-full h-screen flex-col justify-between px-2 md:px-5 xl:min-h-[1024px] xl:flex xl:flex-col">
      {/*Title mobile*/}
      <LogoViolet pageType="contact" isHidden={true} />

      <div className="relative flex px-5 md:px-0 xl:mt-[90px] xl:h-full xl:items-center xl:justify-center">
        {/*Title desktop*/}
        <div className="hidden xl:block absolute right-0 top-0 text-right">
          {titleCutWord("KO N", "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3")}
        </div>
        <div className="xl:block hidden absolute left-0 bottom-0">
          {titleCutWord("T AKT", "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3")}
        </div>

        <div className="relative flex flex-col font-mono sm:landscape:pt-10 md:text-xl md:leading-12 lg:landscape:h-screen xl:flex xl:justify-center xl:text-base xl:landscape:h-auto">
          {/* Contact Information */}
          <div className="xl:text-xl md:mx-8">
            <dl className="space-y-6 sm:landscape:space-y-3">
              {data?.fields &&
                data.fields.map((field) => {
                  if (field.link?.url)
                    return (
                      <div key={field._key} className="flex items-center">
                        <dt className="mr-2 flex items-center md:mr-4">
                          <ContentIcon name={field.icon?.asset?.name || ""} className="w-6 h-6 md:w-7 md:h-7" />
                          <span className="sr-only">{field.link?.label}:</span>
                        </dt>
                        <dd>
                          <Link href={field.link.url} target="_blank" rel="noopener noreferrer">
                            {field.link.label}
                          </Link>
                        </dd>
                      </div>
                    );
                  else
                    return (
                      <div key={field._key} className="flex items-center">
                        <dt className="mr-2 flex items-center md:mr-4">
                          <ContentIcon name={field.icon?.asset?.name || ""} className="w-6 h-6 md:w-7 md:h-7" />
                          <span className="sr-only">{field.link?.label}:</span>
                        </dt>
                        <dd>{field.link?.label}</dd>
                      </div>
                    );
                })}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
