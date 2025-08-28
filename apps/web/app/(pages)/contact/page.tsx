import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import Image from "next/image";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import LocationIcon from "@/app/assets/icons/location.png";
import InstagramIcon from "@/app/assets/icons/instagram.png";
import FacebookIcon from "@/app/assets/icons/facebook.png";
import EmailIcon from "@/app/assets/icons/email.png";
import PhoneIcon from "@/app/assets/icons/phone.png";

export default function ContactPage() {
  return (
    <div className="flex justify-between flex-col w-full h-full px-7 bg-black text-gray-400">
      {/*Title*/}
      <div className="flex justify-between items-center mt-10">
        <div className="flex flex-col">
          <h1 className="text-white text-4xl font-defectica">KON</h1>
          <h1 className="text-white text-4xl font-defectica">TA</h1>
          <h1 className="text-white text-4xl font-defectica">KT</h1>
        </div>
        <Image src={SoundIcon} alt="Logo" width={45} height={45} />
      </div>

      <div className="grid md:grid-cols-4 gap-0 font-mono text-gray-200">
        {/* Adres */}
        <div>
          <ul className=" my-2">
            <li className="flex items-center pb-3">
              <Image src={EmailIcon} alt="Email" width={25} height={25} className="mr-4" />
              fundacjabezkontekstu@gmail.com
            </li>
            <li className="flex items-center pb-3">
              <Image src={PhoneIcon} alt="Phone" width={25} height={25} className="mr-4" />
              608 486 769
            </li>
            <li className="flex items-center pb-3">
              <Image src={LocationIcon} alt="Location" width={25} height={25} className="mr-4" />
              ul.Smulikowskiego 2/5
            </li>
            <li className="flex items-center ml-10">00-389 Warszawa</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <ul className=" my-6">
            <li className="flex items-center pb-3">
              <Image src={InstagramIcon} alt="Instagram" width={25} height={25} className="mr-4" />
              <Link href="https://www.instagram.com/fundacjabezkontekstu/">Instagram</Link>
            </li>

            <li className="flex items-center pb-3">
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
