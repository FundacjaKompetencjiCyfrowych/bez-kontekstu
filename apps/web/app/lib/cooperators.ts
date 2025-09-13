import { StaticImageData } from "next/image";

// Import all cooperator images
import PiotrKlauzaImage from "@/app/assets/images/cooperators/piotr_klauza.jpg";
import AdriannaUrbanskaImage from "@/app/assets/images/cooperators/adrianna_urbanska.jpeg";
import KirylPietruczukImage from "@/app/assets/images/cooperators/kiryl_pietruczuk.jpeg";
import OlgaBuryImage from "@/app/assets/images/cooperators/olga_bury.jpg";
import PiotrStanekImage from "@/app/assets/images/cooperators/piotr_stanek.jpg";
import MateuszWierzbickiImage from "@/app/assets/images/cooperators/mateusz_wierzbicki.jpg";
import BogumilaTrzeciakowskaImage from "@/app/assets/images/cooperators/bogumła_trzeciakowska.jpeg";
import OliwiaAdamowiczImage from "@/app/assets/images/cooperators/oliwia_adamowicz.jpeg";

// Cooperators data structure and mock data
export interface Cooperator {
  id: number;
  name: string;
  surname: string;
  description: string;
  image?: StaticImageData;
  socialMedia: {
    instagram?: string;
    facebook?: string;
  };
  projects: {
    title: string;
    year: string;
  }[];
}

// Mock cooperators data
export const cooperators: Cooperator[] = [
  {
    id: 1,
    name: "PIOTR",
    surname: "KLAUZA",
    description:
      "Współtwórca Fundacji. Specjalista w dziedzinie przestrzennych systemów nagłośnieniowych. Absolwent Wydziału Reżyserii Dźwięku na Uniwersytecie Muzycznym Fryderyka Chopina w Warszawie i absolwent Zespołu Szkół Muzycznych II stopnia im. Ignacego Paderewskiego w Białymstoku w klasie wiolonczeli.",
    image: PiotrKlauzaImage,
    socialMedia: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    projects: [
      { title: "tytuł projektu", year: "2024" },
      { title: "tytuł projektu", year: "2023" },
    ],
  },
  {
    id: 2,
    name: "ADRIANNA",
    surname: "URBAŃSKA",
    description:
      "Twórczyni, z którą eksplorujemy formy obecności sztuki w przestrzeniach analogowych i wirtualnych. Współpracujemy przy projektach łączących sztukę, przestrzeń i narrację, tworząc wielowarstwowe doświadczenia wizualne.",
    image: AdriannaUrbanskaImage,
    socialMedia: {
      instagram: "https://www.instagram.com/au___aua",
      facebook: "https://www.facebook.com/aua.adrianna.urbanska",
    },
    projects: [
      { title: `Copy of Copy of NPC", scenografia, identyfikacja wizualna`, year: "2024" },
      { title: `Rondo straconego czasu", przedsięwzięcie wystawiennicze`, year: "2024" },
      { title: `Prawdy za grosz",  scenografia, identyfikacja wizualna`, year: "2024" },
      { title: `Gangliony, gangliony...", scenografia, identyfikacja wizualna`, year: "2023" },
    ],
  },
  {
    id: 3,
    name: "KIRYŁ",
    surname: "PIETRUCZUK",
    description: "Aktor, absolwent wydziału aktorskiego Łódzkiej Szkoły Filmowej. Wspólpracuje z Fundacją w projektach teatralnych.",
    image: KirylPietruczukImage,
    socialMedia: {
      instagram: "https://www.instagram.com/kirylpietruczuk/?hl=en",
      facebook: "https://facebook.com",
    },
    projects: [
      { title: "---", year: "2024" },
      { title: "---", year: "2023" },
    ],
  },
  {
    id: 4,
    name: "OLGA",
    surname: "BURY",
    description:
      "Aktorka, tancerka, choreografka. Ukończyła studia dziennikarskie. Absolwentka Akademii Sztuk Teatralnych im. Stanisława Wyspiańskiego w Krakowie, Wydziału Teatru Tańca w Bytomiu. Działa jako niezależna twórczyni, interesuje ją łączenie sztuki tańca, filmu i opery oraz to w jaki sposób przestrzeń wpływa na odbieraną sztukę.",
    image: OlgaBuryImage,
    socialMedia: {
      instagram: "https://www.instagram.com/olgabury_",
      facebook: "https://www.facebook.com/share/1CdpMbG45K/?mibextid=wwXIfr",
    },
    projects: [
      { title: "---", year: "2024" },
      { title: "---", year: "2023" },
    ],
  },
  {
    id: 5,
    name: "PIOTR",
    surname: "STANEK",
    description:
      "Działa jako niezależny twórca w obszarze teatru, choreografii, filmu oraz opery.  Absolwent Akademii Sztuk Teatralnych im. Stanisława Wyspiańskiego w Krakowie, Wydziału Teatru Tańca w Bytomiu. Współpracuje z Teatrem O.de.la, kolektywem Sticky Fingers Club.",
    image: PiotrStanekImage,
    socialMedia: {
      instagram: "https://www.instagram.com/piotrstanek_",
      facebook: "https://www.facebook.com/share/1CbZ43WK1J/?mibextid=wwXIfr",
    },
    projects: [
      { title: "---", year: "2024" },
      { title: "---", year: "2023" },
    ],
  },
  {
    id: 6,
    name: "MATEUSZ",
    surname: "WIERZBICKI",
    description:
      "Tancerz, aktor, choreograf, absolwent Wydziału Teatru Tańca Akademii Sztuk Teatralnych im. St. Wyspiańskiego w Krakowie.Ukończył także Szkołę Aktorską Haliny i Jana Machulskich w Warszawie oraz studiował dziennikarstwo na Uniwersytecie Kardynała Stefana Wyszyńskiego. Wraz z Janem Łuciem i Fundacją Bez Kontekstu współtworzył monodram “Gangliony, Gangliony...” i spektakl “Copy of Copy of NPC”, które powstały w ramach programu Przestrzenie Sztuki.",
    image: MateuszWierzbickiImage,
    socialMedia: {
      instagram: "https://www.instagram.com",
      facebook: "https://www.facebook.com/profile.php?id=100007072501564",
    },
    projects: [
      { title: "---", year: "2024" },
      { title: "---", year: "2023" },
    ],
  },
  {
    id: 7,
    name: "BOGUMIŁA",
    surname: "TRZECIAKOWSKA",
    description:
      "Aktorka, autorka tekstów, uwielbia improwizację oraz eksperymenty w obszarze sztuki. Zgłębia psychologię granych przez siebie postaci bardziej, niż wydawałoby się to możliwe. W spektaklach docenia intertekstualność oraz wszelki absurd.",
    image: BogumilaTrzeciakowskaImage,
    socialMedia: {
      instagram: "https://www.instagram.com",
      facebook: "https://www.facebook.com",
    },
    projects: [
      { title: "---", year: "2024" },
      { title: "---", year: "2023" },
    ],
  },
  {
    id: 8,
    name: "OLIWIA",
    surname: "ADAMOWICZ",
    description:
      "Dyplomowana perkusista, pianistka i rytmiczka. Absolwentka Wydziału Aktorskiego PWSFTviT w Łodzi oraz Wydziału Wiedzy o Teatrze (specjalność: Zarządzanie Instytucjami Kultury) na Akademii Teatralnej w Warszawie. ",
    image: OliwiaAdamowiczImage,
    socialMedia: {
      instagram: "https://www.instagram.com/heyimoliw/",
      facebook: "https://www.facebook.com",
    },
    projects: [
      { title: "---", year: "2024" },
      { title: "---", year: "2023" },
    ],
  },
];

// Function to get cooperator by ID
export function getCooperatorById(id: number): Cooperator | undefined {
  return cooperators.find((cooperator) => cooperator.id === id);
}

// Function to get all cooperators
export function getAllCooperators(): Cooperator[] {
  return cooperators;
}

// Function to get previous cooperator ID
export function getPreviousCooperatorId(currentId: number): number | null {
  const currentIndex = cooperators.findIndex((cooperator) => cooperator.id === currentId);
  if (currentIndex <= 0) return null;
  return cooperators[currentIndex - 1].id;
}

// Function to get next cooperator ID
export function getNextCooperatorId(currentId: number): number | null {
  const currentIndex = cooperators.findIndex((cooperator) => cooperator.id === currentId);
  if (currentIndex === -1 || currentIndex >= cooperators.length - 1) return null;
  return cooperators[currentIndex + 1].id;
}

// Map cooperator IDs to imported images
const cooperatorImages: { [key: number]: StaticImageData } = {
  1: PiotrKlauzaImage,
  2: AdriannaUrbanskaImage,
  3: KirylPietruczukImage,
  4: OlgaBuryImage,
  5: PiotrStanekImage,
  6: MateuszWierzbickiImage,
  7: BogumilaTrzeciakowskaImage,
  8: OliwiaAdamowiczImage,
};

// Function to get cooperator image by ID
export function getCooperatorImage(id: number): StaticImageData | null {
  return cooperatorImages[id] || null;
}

// Export the images mapping for direct access if needed
export { cooperatorImages };
