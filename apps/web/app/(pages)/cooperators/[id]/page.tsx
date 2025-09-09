import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCooperatorById, getPreviousCooperatorId, getNextCooperatorId } from "@/app/lib/cooperators";
import { Footer } from "@/app/components/Footer";
import LogoViolet from "@/app/assets/images/logo_violet.png";
import ArrowRight from "@/app/assets/icons/next.png";
import ArrowLeft from "@/app/assets/icons/prev.png";

interface CooperatorPageProps {
  params: {
    id: string;
  };
}

export default function CooperatorPage({ params }: CooperatorPageProps) {
  const { id } = params;
  const cooperator = getCooperatorById(parseInt(id));

  if (!cooperator) {
    notFound();
  }

  return (
    <div className="bg-[#0d0b0e] min-h-screen font-mono">
      {/* Navigation Header */}
      <div className="relative px-8 py-6">
        <Link href="/cooperators" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
          <Image src={ArrowLeft} alt="Poprzedni" />
          <p className="ml-4">Wstecz</p>
        </Link>
      </div>

      {/* Violet logo - sticky  */}
      <div className="sticky top-1/2 h-0 z-0">
        <Image
          src={LogoViolet}
          priority
          alt="Bez Kontekstu"
          className="absolute blur-[3px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-80 h-80 sm:w-128 sm:h-128 md:w-160 md:h-160 lg:w-192 lg:h-192 opacity-50"
        />
      </div>

      {/* Main Content */}
      <div className="relative px-8 pb-16">
        {/* Portrait Section */}
        <div className="mb-8">
          {cooperator.image && (
            <div className="relative w-full h-[400px] mb-4">
              <Image src={cooperator.image} alt={cooperator.name} fill className="object-cover rounded-lg" priority />
              {/* Name overlay */}
              <div className="absolute bottom-4 left-4">
                <h1 className="text-2xl font-bold text-white">{cooperator.name}</h1>
                <h1 className="text-2xl font-bold text-white">{cooperator.surname}</h1>
              </div>
            </div>
          )}
        </div>

        {/* Description Section */}
        <div className="relative mb-12">
          <p className="text-sm leading-relaxed text-white">{cooperator.description}</p>
        </div>

        {/* Social Media Section */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold mb-4">social media:</h2>
          <div className="flex flex-col gap-2">
            {cooperator.socialMedia.instagram && (
              <a
                href={cooperator.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gray-300 transition-colors"
              >
                <span>Instagram</span>
                <span className="text-xs">↗</span>
              </a>
            )}
            {cooperator.socialMedia.facebook && (
              <a
                href={cooperator.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gray-300 transition-colors"
              >
                <span>Facebook</span>
                <span className="text-xs">↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold mb-4">projekty:</h2>
          <div className="flex flex-col gap-2">
            {cooperator.projects.map((project, index) => (
              <div key={index} className="text-sm">
                <span>
                  "{project.title}", {project.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cooperator Navigation */}
      <div className="px-8 text-sm">
        <div className="flex justify-around items-center">
          {/* Previous Cooperator */}
          <div>
            {getPreviousCooperatorId(parseInt(id)) ? (
              <Link
                href={`/cooperators/${getPreviousCooperatorId(parseInt(id))}`}
                className="flex items-center hover:text-gray-300 transition-colors"
              >
                <div>
                  <Image src={ArrowLeft} alt="Poprzedni" className="inline-block mr-4" />
                  <span>Poprzedni</span>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* Next Cooperator */}
          <div className="text-right">
            {getNextCooperatorId(parseInt(id)) ? (
              <Link
                href={`/cooperators/${getNextCooperatorId(parseInt(id))}`}
                className="flex items-center justify-end gap-2 hover:text-gray-300 transition-colors"
              >
                <div>
                  <span>Następny</span>
                  <Image src={ArrowRight} alt="Następny" className="inline-block ml-4" />
                </div>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
