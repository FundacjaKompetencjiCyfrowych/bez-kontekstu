import Link from "next/link";
import { Metadata } from "next";
import { sanityFetch } from "@/app/lib/sanity/live";
import { cache } from "react";
import { contactPageQuery } from "@/app/lib/sanity/queries";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { ContentIcon } from "@/app/components/cms/ContentIcon";
import { Logo } from "@/app/components/image/Logo";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { PageContainer } from "@/app/components/layout/PageContainer";
import { SectionContainer } from "@/app/components/layout/SectionContainer";
import { SplitTitle } from "@/app/components/ui/SplitTitle";
import { cn } from "@/app/lib/utils";
import { LinkIcon } from "@/app/lib/sanity/types";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
}

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
  const fields = data?.fields || ([] as (LinkIcon & { _key: string })[]);
  const dictionary = await getDictionary(locale);
  return (
    <PageContainer>
      <SectionContainer variant="heroBoxedOnDesktop" aria-labelledby="contact-title">
        <Logo container="mobileOffset" />
        <SplitTitle
          desktop="topRight"
          desktopText={dictionary.split2.contact[0]}
          srText={dictionary.split2.contact[0]}
          srId="contact-title"
          variant="hero"
        />
        <SplitTitle
          desktop="bottomLeft"
          desktopText={dictionary.split2.contact[1]}
          srText={dictionary.split2.contact[1]}
          srId="contact-title"
          variant="hero"
        />
        {/* Contact Information */}
        <dl className="tall:space-y-8 space-y-6 font-space-mono text-[1rem] leading-6 xl:text-[1.25rem] xl:leading-8">
          {fields &&
            fields.length > 0 &&
            fields.map((field) => (
              <div key={field._key} className={cn("flex items-center", field.link?.url && "hover:text-brand-300")}>
                <dt className="flex items-center mr-4">
                  <ContentIcon name={field.icon?.asset?.name || ""} className="w-[1.4em] h-[1.4em] xl:w-[1.1em] xl:h-[1.1em]" />
                  <span className="sr-only">{field.link?.label}:</span>
                </dt>
                <dd className="wrap-break-word [@media(max-width:350px)]:break-all min-w-0 whitespace-pre-line">
                  {field.link?.url ? (
                    <Link href={field.link.url} target="_blank" rel="noopener noreferrer">
                      {field.link.label}
                    </Link>
                  ) : (
                    field.link?.label
                  )}
                </dd>
              </div>
            ))}
        </dl>
      </SectionContainer>
    </PageContainer>
  );
}
