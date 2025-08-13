import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-0">
          {/* Adres */}
          <div>
            <p>Fundacja Bez Kontekstu</p>
            <p>ul. Smulikowskiego 2/5</p>
            <p>00-389 Warszawa</p>
          </div>

          {/* Kontakt */}
          <div>
            <ul className="text-gray-400 my-2">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                fundacjabezkontekstu@gmail.com
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +48 608 486 769
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p>
              <Link href="https://www.instagram.com/fundacjabezkontekstu/">Instagram</Link>
            </p>
            <p>
              <Link href="https://www.facebook.com/fundacjabezkontekstu/">Facebook</Link>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-500 mt-4 pt-4 text-right text-gray-500">
          <p>Page made with ❤️ by </p>
          <p>
            <Link href="https://cyfrowe.org/?utm_source=itgirls&utm_medium=referral&utm_campaign=partners">
              Fundacja Kompetencji Cyfrowych
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
