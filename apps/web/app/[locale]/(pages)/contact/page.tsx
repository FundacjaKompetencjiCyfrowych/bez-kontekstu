import Link from "next/link";
import { Metadata } from "next";
import titleCutWord from "@/app/lib/titleCutWord";
import { sanityFetch } from "@/app/lib/sanity/live";
import { cache } from "react";
import { contactPageQuery } from "@/app/lib/sanity/queries";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { ContentIcon } from "@/app/components/cms/ContentIcon";
import { LogoContainer } from "@/app/components/Logo";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";

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
  const dictionary = await getDictionary(locale);
  return (
    <div className="flex flex-1 w-full min-h-full md:landscape:h-full flex-col justify-between px-2 md:px-5">
      {/*Title mobile*/}

      <div className="w-full flex flex-1 flex-col px-5 md:px-0 xl:self-center z-10">
        {/*Title desktop*/}
        {titleCutWord(
          dictionary.split2.contact[0],
          "hidden xl:block xl:self-end sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3"
        )}

        <div className="flex flex-1 flex-col pt-10 xl:pt-0 font-mono sm:landscape:pt-10 xl:landscape:pt-0 md:text-xl xl:flex xl:justify-center xl:items-center xl:text-base">
          <LogoContainer variant="centered" />
          {/* Contact Information */}
          <div className="xl:text-xl md:mx-8">
            <dl className="space-y-10 sm:landscape:space-y-3 xl:leading-12">
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

        {titleCutWord(
          dictionary.split2.contact[1],
          "hidden xl:block sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 xl:self-start ml-2 sm:ml-3 mt-2 sm:mt-3"
        )}
      </div>
    </div>
  );
}
