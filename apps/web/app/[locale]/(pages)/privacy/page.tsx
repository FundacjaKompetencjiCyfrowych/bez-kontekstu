import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";
import { sanityFetch } from "@/app/lib/sanity/live";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { privacyPageQuery } from "@/app/lib/sanity/queries";
import { Metadata } from "next";
import { cache } from "react";
import titleCutWord from "@/app/lib/titleCutWord";
import { LogoContainer } from "@/app/components/Logo";

const getPrivacyPage = cache(async (locale: string) => {
  return await sanityFetch({ query: privacyPageQuery, params: { lang: locale } });
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getPrivacyPage(locale);
  return mapMetadata(data?.meta);
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data } = await getPrivacyPage(locale);
  const dictionary = await getDictionary(locale);
  console.log(data && "data received");
  return (
    <div className="flex flex-1 w-full min-h-full md:landscape:h-full flex-col justify-between px-2 md:px-5">
      <div className="w-full flex flex-1 flex-col px-5 md:px-0 xl:self-center z-10">
        {/*Title desktop*/}
        {titleCutWord(
          dictionary.split2.privacy[0],
          "hidden xl:block xl:self-end sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3"
        )}

        <div className="flex flex-1 flex-col pt-10 xl:pt-0 font-mono sm:landscape:pt-10 xl:landscape:pt-0 md:text-xl xl:flex xl:justify-center xl:items-center xl:text-base">
          <LogoContainer variant="centered" />
          <div className="xl:text-xl md:mx-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </div>
        </div>

        {titleCutWord(
          dictionary.split2.privacy[1],
          "hidden xl:block sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 xl:self-start ml-2 sm:ml-3 mt-2 sm:mt-3"
        )}
      </div>
    </div>
  );
}
