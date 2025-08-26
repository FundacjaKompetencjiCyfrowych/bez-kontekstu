export default function CooperatorsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-defectica">OSOBY WSPÓŁPRACUJĄCE</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Poznaj nasz zespół i osoby, które tworzą z nami wyjątkowe projekty.</p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"></div>
      </div>
    </div>
  );
}
