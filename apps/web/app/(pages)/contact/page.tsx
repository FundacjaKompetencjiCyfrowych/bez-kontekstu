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
  // Icon component for responsive icons
  const ContactIcon = ({ src, alt }: { src: any; alt: string }) => {
    return (
      <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
        {/* Mobile icon - visible on small screens */}
        <Image src={src} alt={alt} width={20} height={20} className="block md:hidden" />
        {/* Tablet/Desktop icon - visible on md+ screens */}
        <Image src={src} alt={alt} width={32} height={32} className="hidden md:block" />
      </div>
    );
  };

  return (
    <div className="flex justify-between flex-col w-full h-full px-7 bg-[#0d0b0e] ">
      {/*Title*/}
      <Header title="KON TA KT" />
      <div className="relative flex flex-col font-mono md:text-3xl md:leading-16">
        {/* Adres */}
        <div className="flex-1 md:mx-4">
          <ul className="my-2 space-y-2">
            <li className="flex items-center">
              <div className="mr-3 md:mr-6">
                <ContactIcon src={EmailIcon} alt="Email" />
              </div>
              fundacjabezkontekstu@gmail.com
            </li>
            <li className="flex items-center pb-3">
              <div className="mr-3 md:mr-6">
                <ContactIcon src={PhoneIcon} alt="Phone" />
              </div>
              <div className="mr-3 md:mr-6">
                <ContactIcon src={PhoneIcon} alt="Phone" />
              </div>
              608 486 769
            </li>
            <li className="flex items-center">
              <div className="mr-3 md:mr-6">
                <ContactIcon src={LocationIcon} alt="Location" />
              </div>
              ul.Smulikowskiego 2/5
            </li>
            <li className="flex items-center ml-9 md:ml-14">00-389 Warszawa</li>
            <li className="flex items-center ml-9 md:ml-14">00-389 Warszawa</li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex-1 md:mx-4">
          <ul className=" my-6 space-y-2">
            <li className="flex items-center">
              <div className="mr-3 md:mr-6">
                <ContactIcon src={InstagramIcon} alt="Instagram" />
              </div>
              <Link href="https://www.instagram.com/fundacjabezkontekstu/">Instagram</Link>
            </li>

            <li className="flex items-center pb-3">
              <div className="mr-3 md:mr-6">
                <ContactIcon src={FacebookIcon} alt="Facebook" />
              </div>
              <Link href="https://www.facebook.com/fundacjabezkontekstu/">Facebook</Link>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
