import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import { Metadata } from "next";

import LocationIcon from "@/app/assets/icons/location.png";
import InstagramIcon from "@/app/assets/icons/instagram.png";
import FacebookIcon from "@/app/assets/icons/facebook.png";
import EmailIcon from "@/app/assets/icons/email.png";
import PhoneIcon from "@/app/assets/icons/phone.png";

import { Header } from "@/app/components/Header";
import LogoViolet from "@/app/components/LogoViolet";
import { ContactIcon } from "@/app/components/ContactIcon";
import titleCutWord from "@/app/lib/titleCutWord";

export const metadata: Metadata = {
  title: "Kontakt - Fundacja Bez Kontekstu",
  description: "Skontaktuj się z Fundacją Bez Kontekstu. Adres, telefon, email i media społecznościowe.",
  keywords: ["kontakt", "fundacja", "bez kontekstu", "warszawa", "email", "telefon"],
};

export default function ContactPage() {

  return (
    <div className="flex w-full h-screen flex-col justify-between px-2 md:px-5 xl:min-h-[1024px] xl:flex xl:flex-col">
      {/*Title mobile*/}
      <Header title="KON TA KT" className="xl:hidden" showLogo={false} />
      <LogoViolet pageType="contact" isHidden={true} />

      <div className="relative flex px-5 md:px-0 xl:mt-[90px] xl:h-full xl:items-center xl:justify-center">
        {/*Title desktop*/}
        <div className="hidden xl:block absolute right-0 top-0 text-right">{titleCutWord("KO N", "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3")}</div>
        <div className="xl:block hidden absolute left-0 bottom-0">{titleCutWord("T AKT", "sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl xl:ml-0 xl:mt-0 ml-2 sm:ml-3 mt-2 sm:mt-3")}</div>

        <div className="relative flex flex-col font-mono sm:landscape:pt-10 md:text-xl md:leading-12 lg:landscape:h-screen xl:flex xl:justify-center xl:text-base xl:landscape:h-auto">
          {/* Contact Information */}
          <div className="xl:text-xl md:mx-8">
            <dl className="space-y-6 sm:landscape:space-y-3">
              <div className="flex items-center">
                <dt className="mr-2 flex items-center md:mr-4">
                  <ContactIcon src={EmailIcon} alt="Email" />
                  <span className="sr-only">Email:</span>
                </dt>
                <dd>fundacjabezkontekstu@gmail.com</dd>
              </div>
              <div className="flex items-center pb-3">
                <dt className="mr-2 flex items-center md:mr-4">
                  <ContactIcon src={PhoneIcon} alt="Phone" />
                  <span className="sr-only">Telefon:</span>
                </dt>
                <dd>608 486 769</dd>
              </div>
              <div className="flex items-center">
                <dt className="mr-2 flex items-center md:mr-4">
                  <ContactIcon src={LocationIcon} alt="Location" />
                  <span className="sr-only">Adres:</span>
                </dt>
                <dd>
                  <div>ul.Smulikowskiego 2/5</div>
                  <div>00-389 Warszawa</div>
                </dd>
              </div>
            </dl>
          </div>

          {/* Social Media */}
          <div className="flex xl:text-xl md:mx-8">
            <dl className="my-6 space-y-6 sm:landscape:space-y-3">
              <div className="flex items-center">
                <dt className="mr-2 flex items-center md:mr-4">
                  <ContactIcon src={InstagramIcon} alt="Instagram" />
                  <span className="sr-only">Instagram:</span>
                </dt>
                <dd>
                  <Link
                    href="https://www.instagram.com/fundacjabezkontekstu/"
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 rounded"
                    aria-label="Odwiedź nasz profil na Instagramie"
                  >
                    Instagram
                  </Link>
                </dd>
              </div>

              <div className="flex items-center pb-3">
                <dt className="mr-2 flex items-center md:mr-4">
                  <ContactIcon src={FacebookIcon} alt="Facebook" />
                  <span className="sr-only">Facebook:</span>
                </dt>
                <dd>
                  <Link
                    href="https://www.facebook.com/fundacjabezkontekstu/"
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 rounded"
                    aria-label="Odwiedź nasz profil na Facebooku"
                  >
                    Facebook
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
