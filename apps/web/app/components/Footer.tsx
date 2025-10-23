import Link from "next/link";
import Image from "next/image";
import HeartIcon from "../assets/icons/heart.png";
import InstagramIcon from "../assets/icons/instagram.png";
import FacebookIcon from "../assets/icons/facebook.png";
import { Dictionary } from "../lib/intl/dictionaries/type";

export async function Footer({ dictionary }: { dictionary: Dictionary }) {
  return (
    <footer className="py-6 w-[90%] mx-auto md:w-full font-mono text-xs">
      <div className="mx-auto">
        {/* Copyright */}
        <div className="border-t border-[#f5f5f5] mt-4 pt-2 text-center text-[#f5f5f5]">
          <span className="hidden xl:inline"> {dictionary.noContextFoundation} | </span>
          <Link href={"/contact"}>{dictionary.contact} |</Link>
          <Link href={"/privacy-policy"} className=" ml-2">
            {dictionary.privacy}
          </Link>

          {/* Socials */}
          <div className="my-3">
            <Link href="https://www.instagram.com/fundacjabezkontekstu/" className="mr-1 inline-block">
              <Image src={InstagramIcon} alt="Instagram" width={20} height={20} />
            </Link>
            <Link href="https://www.facebook.com/fundacjabezkontekstu/" className="ml-1 inline-block">
              <Image src={FacebookIcon} alt="Facebook" width={18} height={18} />
            </Link>
          </div>
          <div className="text-[#3f3f42]">
            <span className="block lg:inline">
              Page made with <Image src={HeartIcon} alt="Heart" width={15} className="inline-block" /> by{" "}
            </span>
            <Link href="https://cyfrowe.org/?utm_source=itgirls&utm_medium=referral&utm_campaign=partners">
              {dictionary.noContextFoundation}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
