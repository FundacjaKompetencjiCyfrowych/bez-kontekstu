import Link from "next/link";
import Image from "next/image";
import heartIcon from "../assets/icons/heart.png";

export function Footer() {
  return (
    <footer className="py-6 px-4 w-[90vw] mx-auto font-mono text-sm">
      <div className="max-w-6xl mx-auto">
        {/* Copyright */}
        <div className="border-t border-gray-400 mt-4 pt-4 text-center text-gray-600">
          <p className="text-gray-400">Kontakt | Polityka prywatności</p>

          {/* Socials */}
          <p className="my-2">
            <Link href="https://www.instagram.com/fundacjabezkontekstu/" className="mr-1">
              📷
            </Link>
            <Link href="https://www.facebook.com/fundacjabezkontekstu/" className="ml-1 ">
              📘
            </Link>
          </p>

          <p>Page made with 🤍 by</p>
          <p>
            <Link href="https://cyfrowe.org/?utm_source=itgirls&utm_medium=referral&utm_campaign=partners">
              Fundacja Kompetencji Cyfrowych
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
