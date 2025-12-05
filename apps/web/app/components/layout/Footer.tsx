import Link from "next/link";
import { LinkIconList, LinkList } from "@/app/lib/sanity/types";
import { ContentIcon } from "@/app/components/cms/ContentIcon";
import { FiHeart } from "react-icons/fi";

type FooterData = {
  links?: LinkList;
  socials?: LinkIconList;
};

export async function Footer({ data }: { data: FooterData }) {
  const { links, socials } = data;
  return (
    <footer className="pb-6 xl:pb-12 px-container font-space-mono text-xs xl:text-base">
      <div className="w-full mx-auto border-t border-light-200 pt-3 xl:pt-5 text-center text-light-200">
        {/* Links */}
        {links?.map((link) => (
          <Link
            key={link.url}
            href={link.url || "/"}
            className="mr-1 xl:mr-3 inline-block after:content-['|'] after:pl-1 xl:after:pl-3 last-of-type:after:content-none focus-brand"
          >
            <span className="hover:text-brand-300">{link.label}</span>
          </Link>
        ))}
        {/* Socials */}
        <div className="my-3">
          {socials &&
            socials.map(
              (social) =>
                social.link?.url && (
                  <Link
                    key={social._key}
                    href={social.link.url || "/"}
                    className="mr-1 xl:mr-3 inline-block focus-brand hover:text-brand-300"
                    aria-label={social.link.label ? `Visit ${social.link.label}` : "Visit social media"}
                  >
                    {social.icon && <ContentIcon name={social.icon.asset?.name} size={20} />}
                    <span className="sr-only">{social.link.label}</span>
                    <span aria-hidden="true">{social.link.label}</span>
                  </Link>
                )
            )}
        </div>
        <div className="text-muted">
          <span className="block lg:inline">
            Page made with <FiHeart size={15} className="inline-block" aria-hidden="true" /> by{" "}
          </span>
          <Link
            href="https://cyfrowe.org/?utm_source=itgirls&utm_medium=referral&utm_campaign=partners"
            rel="noopener noreferrer"
            className="focus-brand hover:text-brand-300"
          >
            Fundacja Kompetencji Cyfrowych
          </Link>
        </div>
      </div>
    </footer>
  );
}
