import { sanityFetch } from "@/app/lib/sanity/live";
import { SoundsClient } from "./client";
import { Metadata } from "next";
import { mapMetadata } from "@/app/lib/sanity/mappers";
import { cache } from "react";
import { soundsPageQuery } from "@/app/lib/sanity/queries";
import { LogoContainer } from "@/app/components/Logo";
import { getDictionary } from "@/app/lib/intl/dictionaries/dynamic";

const getSoundsPage = cache(async (locale: string) => {
  return await sanityFetch({ query: soundsPageQuery, params: { lang: locale } });
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getSoundsPage(locale);
  return mapMetadata(data?.meta);
}

interface Track {
  id: number;
  title: string;
}

const TRACKS_COUNT = 6;

export default async function SoundsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  const tracks: Track[] = Array.from({ length: TRACKS_COUNT }, (_, i) => ({
    id: i + 1,
    title: dictionary.track,
  }));

  return (
    <section className="flex flex-1 justify-center xl:justify-start w-full items-center flex-col px-5 mb-15">
      <LogoContainer variant="centered" />

      <h2 className="hidden xl:block w-full self-start text-8xl leading-tight p-10 pl-20">
        BEATS&apos;N&apos;
        <br />
        PIECES
      </h2>

      <div className="w-full self-end">
        <h2 id="tracklist-title" className="sr-only">
          {dictionary.tracklist}
        </h2>
        <SoundsClient tracks={tracks} dictionary={dictionary} className="xl:w-1/2 ml-auto" />
      </div>
    </section>
  );
}
