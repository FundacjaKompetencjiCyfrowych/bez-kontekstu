import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import Image from "next/image";
import LocationIcon from "@/app/assets/icons/location.png";
import InstagramIcon from "@/app/assets/icons/instagram.png";
import FacebookIcon from "@/app/assets/icons/facebook.png";
import EmailIcon from "@/app/assets/icons/email.png";
import PhoneIcon from "@/app/assets/icons/phone.png";
import { Header } from "@/app/components/Header";

export default function ContactPage() {
  return (
    <div className="flex justify-between flex-col w-full h-full px-4 bg-[#0d0b0e] ">
      <Header title="KON TA KT" />

      <div className="relative grid md:grid-cols-2 mx-2 gap-4 font-mono leading-8">
        {/* Adres */}
        <div>
          <ul className="my-2 space-y-2">
            <li className="flex items-center">
              <Image src={EmailIcon} alt="Email" width={25} height={25} className="mr-4" />
              fundacjabezkontekstu@gmail.com
            </li>
            <li className="flex items-center">
              <Image src={PhoneIcon} alt="Phone" width={25} height={25} className="mr-4" />
              608 486 769
            </li>
            <li className="flex items-center">
              <Image src={LocationIcon} alt="Location" width={25} height={25} className="mr-4" />
              ul.Smulikowskiego 2/5
            </li>
            <li className="flex items-center ml-10">00-389 Warszawa</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <ul className=" my-6 space-y-2">
            <li className="flex items-center">
              <Image src={InstagramIcon} alt="Instagram" width={25} height={25} className="mr-4" />
              <Link href="https://www.instagram.com/fundacjabezkontekstu/">Instagram</Link>
            </li>

            <li className="flex items-center">
              <Image src={FacebookIcon} alt="Facebook" width={25} height={25} className="mr-4" />
              <Link href="https://www.facebook.com/fundacjabezkontekstu/">Facebook</Link>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
