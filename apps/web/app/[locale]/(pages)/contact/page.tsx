import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import Image, { StaticImageData } from "next/image";
import LocationIcon from "@/app/assets/icons/location.png";
import InstagramIcon from "@/app/assets/icons/instagram.png";
import FacebookIcon from "@/app/assets/icons/facebook.png";
import EmailIcon from "@/app/assets/icons/email.png";
import PhoneIcon from "@/app/assets/icons/phone.png";
import { Header } from "@/app/components/Header";
import LogoViolet from "@/app/components/LogoViolet";

export default function ContactPage() {
  // Icon component for responsive icons
  const ContactIcon = ({ src, alt }: { src: StaticImageData | string; alt: string }) => {
    return (
      <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
        {/* Mobile icon - visible on small screens */}
        <Image src={src} alt={alt} width={20} height={20} className="block md:hidden" />
        {/* Tablet/Desktop icon - visible on md+ screens */}
        <Image src={src} alt={alt} width={32} height={32} className="hidden md:block" />
      </div>
    );
  };

  const titleCutWord = (title: string) =>
    title.split(" ").map((word, index) => (
      <h1 className="sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3" key={index}>
        {word}
      </h1>
    ));

  return (
    <div className="flex flex-col justify-between w-full h-screen px-2 md:px-5 xl:flex xl:flex-col xl:min-h-[1024px]">
      {/*Title mobile*/}
      <Header title="KON TA KT" className="xl:hidden" showLogo={false} />
      <LogoViolet pageType="contact" />
      <div className="relative px-5 md:px-0  flex xl:justify-center xl:items-center xl:h-full xl:mt-[90px]">


        {/*Title desktop*/}
        <div className="hidden xl:block absolute right-0 top-0 text-right">{titleCutWord("KO N")}</div>

        <div className="relative flex flex-col font-mono sm:landscape:pt-10 md:text-xl lg:landscape:h-screen xl:landscape:h-auto md:leading-12 xl:text-base xl:leading-5 xl:flex xl:justify-center">
          {/* Adres */}
          <div className="xl:text-xl md:mx-8">
            <ul className="space-y-6 sm:landscape:space-y-3">
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
                608 486 769
              </li>
              <li className="flex items-center">
                <div className="mr-3 md:mr-6">
                  <ContactIcon src={LocationIcon} alt="Location" />
                </div>
                ul.Smulikowskiego 2/5
              </li>
              <li className="flex items-center ml-9 md:ml-14">00-389 Warszawa</li>
            </ul>
          </div>

          {/* Socials */}
          <div className="flex xl:text-xl md:mx-8">
            <ul className=" my-6 space-y-6 sm:landscape:space-y-3">
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

        {/*Title desktop*/}
        <div className="xl:block hidden absolute left-0 bottom-0">{titleCutWord("T AKT")}</div>
      </div>

      <Footer />
    </div>
  );
}
