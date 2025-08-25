export default function DonorsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">DLA DARCZYŃCÓW</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Wspieraj nasze projekty i bądź częścią naszej kreatywnej społeczności.</p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Dlaczego warto nas wspierać?</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Tworzymy innowacyjne rozwiązania</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Wspieramy młodych twórców</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">Masz pytania dotyczące wsparcia? Skontaktuj się z nami!</p>
          <a
            href="/contact"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Skontaktuj się
          </a>
        </div>
      </div>
    </div>
  );
}
