import Link from "next/link";
import { ContentImage, Image } from "@/app/components/cms/ContentImage";
import { twSizes } from "@/app/lib/twSizes";

interface TeamMember {
  _id: string;
  name?: string | null;
  image?: Image | null;
  slug?: { current?: string } | null;
}

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className="w-full mx-auto grid grid-cols-2 gap-6 xl:gap-8 z-10">
      {members.map((member) => (
        <Link
          href={`/cooperators/${member?.slug?.current || ""}`}
          key={member._id}
          className="relative w-full aspect-[3/4] md:aspect-[4/3] flex flex-col items-start justify-end p-3 overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out rounded-sm"
          aria-label={member.name || ""}
        >
          {member.image && <ContentImage image={member.image} fill sizes={twSizes("42vw md:390px")} aspect={4 / 3} />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="relative z-10 text-[1rem] xl:text-[1.125rem] text-white uppercase">{member.name}</div>
        </Link>
      ))}
    </div>
  );
}
