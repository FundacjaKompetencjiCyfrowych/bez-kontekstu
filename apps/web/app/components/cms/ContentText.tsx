import { PortableText, type PortableTextComponents } from "next-sanity";
import Link from "next/link";
import { BlockContent } from "@/app/lib/sanity/types";

// TODO: Customize styling
/**
 * Configures components rendered from Portable Text blocks (blockContent type in Sanity).
 * @see https://github.com/portabletext/react-portabletext
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    // h1: ({ children }) => <h1 className="">{children}</h1>,
    // h2: ({ children }) => <h2 className="">{children}</h2>,
    // h3: ({ children }) => <h3 className="">{children}</h3>,
    // h4: ({ children }) => <h4 className="">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700 mb-4">{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const target = value.href.startsWith("http") ? "_blank" : undefined;
      return (
        <Link href={value.href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className="underline">
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

export function ContentText({ value }: { value: BlockContent }) {
  return <PortableText value={value} components={components} />;
}
