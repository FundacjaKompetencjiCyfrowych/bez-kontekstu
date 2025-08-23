export default function ManifestPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MANIFEST</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Nasze zasady i wartości, które kierują naszymi projektami.</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Nasza Misja</h2>
            <p className="text-gray-300 leading-relaxed">
              Tworzymy innowacyjne rozwiązania, które łączą kreatywność z funkcjonalnością. Każdy projekt to nowa historia, którą opowiadamy
              poprzez kod i design.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
