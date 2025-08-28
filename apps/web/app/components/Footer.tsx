import Link from "next/link";
import Image from "next/image";
import HeartIcon from "../assets/icons/heart.png";
import InstagramIcon from "../assets/icons/instagram.png";
import FacebookIcon from "../assets/icons/facebook.png";

export function Footer() {
  return (
    <footer className="py-6 px-4 w-[90vw] mx-auto font-mono text-sm">
      <div className="max-w-6xl mx-auto">
        {/* Copyright */}
        <div className="border-t border-gray-400 mt-4 pt-2 text-center text-gray-600">
          <Link href={"/contact"} className="text-gray-400">
            Kontakt |
          </Link>
          <Link href={"/privacy-policy"} className="text-gray-400 ml-2">
            Polityka prywatności
          </Link>

          {/* Socials */}
          <div className="my-3">
            <Link href="https://www.instagram.com/fundacjabezkontekstu/" className="mr-1 inline-block">
              <Image src={InstagramIcon} alt="Instagram" width={20} height={20} />
            </Link>
            <Link href="https://www.facebook.com/fundacjabezkontekstu/" className="ml-1 inline-block">
              <Image src={FacebookIcon} alt="Facebook" width={20} height={20} />
            </Link>
          </div>
          <p>
            Page made with <Image src={HeartIcon} alt="Heart" width={15} height={15} className="inline-block" /> by
          </p>
          <Link href="https://cyfrowe.org/?utm_source=itgirls&utm_medium=referral&utm_campaign=partners">
            Fundacja Kompetencji Cyfrowych
          </Link>
        </div>
      </div>
    </footer>
  );
}
