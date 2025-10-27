import Link from "next/link";
import { Dictionary } from "../lib/intl/dictionaries/type";
import { LinkIconList, LinkList } from "../lib/sanity/types";
import { ContentIcon } from "./cms/ContentIcon";
import { FiHeart } from "react-icons/fi";

type FooterData = {
  links?: LinkList;
  socials?: LinkIconList;
};

export async function Footer({ dictionary, data }: { dictionary: Dictionary; data: FooterData }) {
  const { links, socials } = data;
  return (
    <footer className="py-6 w-[90%] mx-auto md:w-full font-mono text-xs">
      <div className="mx-auto">
        {/* Copyright */}
        <div className="border-t border-[#f5f5f5] mt-4 pt-2 text-center text-[#f5f5f5]">
          {links?.map((link) => (
            <Link
              key={link.url}
              href={link.url || "/"}
              className="mr-1 inline-block after:content-['|'] after:pl-1 last-of-type:after:content-none"
            >
              <span className="hover:underline">{link.label}</span>
            </Link>
          ))}
          {/* Socials */}
          <div className="my-3">
            {socials &&
              socials.map((social) => (
                <Link key={social.link?.url} href={social.link?.url || "/"} className="mr-1 inline-block">
                  {social.icon && <ContentIcon name={social.icon.asset?.name} size={20} />}
                  {social.link?.label}
                </Link>
              ))}
          </div>
          <div className="text-[#3f3f42]">
            <span className="block lg:inline">Page made with {<FiHeart size={15} className="inline-block text-white" />} by </span>
            <Link href="https://cyfrowe.org/?utm_source=itgirls&utm_medium=referral&utm_campaign=partners" rel="noopener noreferrer">
              Fundacja Kompetencji Cyfrowych
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
