import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-1 bg-black flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 relative overflow-hidden">
        <div className="flex flex-col items-end justify-start h-full z-10">
          <h1 className="text-6xl text-white mr-3 mt-3 font-defectica">BEZ</h1>
        </div>

        <div className="absolute bottom-0 transform ml-3 mb-3 left-0 z-10">
          <h1 className="text-6xl text-white mt-3 flex flex-col font-defectica">
            <span>K</span>
            <span>O</span>
            <span>N</span>
          </h1>
          <h1 className="text-6xl text-white font-defectica">TEKSTU</h1>
        </div>

        {/* Logo w tle - koło z rozmyciem */}
        <Image
          src="/logo.png"
          priority
          width={400}
          height={400}
          alt="Bez Kontekstu"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain"
        />
      </section>
    </div>
  );
}
