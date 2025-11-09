import { PortableText, type PortableTextComponents } from "next-sanity";
import Link from "next/link";
import { BlockContentWithHeadings } from "@/app/lib/sanity/types";

// TODO: Customize styling
/**
 * Configures components rendered from Portable Text blocks (blockContent type in Sanity).
 * @see https://github.com/portabletext/react-portabletext
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-body mb-4 xl:mb-7">{children}</p>,
    h1: ({ children }) => <h1 className="uppercase font-defectica text-[2.5rem] md:text-[4rem] xl:text-[8rem]">{children}</h1>,
    h2: ({ children }) => <h2 className="uppercase font-defectica text-[2.5rem] md:text-[4rem]">{children}</h2>,
    h3: ({ children }) => <h3 className="uppercase font-defectica text-[2rem] md:text-[3rem]">{children}</h3>,
    h4: ({ children }) => <h4 className="uppercase font-defectica text-[2rem] md:text-[3rem]">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="text-lg md:text-2xl">{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const target = value.href.startsWith("http") ? "_blank" : undefined;
      return (
        <Link href={value.href} target={target} rel="noopener noreferrer" className="underline">
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
  },
};

export function ContentText({ value }: { value: BlockContentWithHeadings }) {
  return <PortableText value={value} components={components} />;
}
