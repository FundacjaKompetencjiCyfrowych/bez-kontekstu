// Cooperators data structure and mock data
export interface Cooperator {
  id: number;
  name: string;
  surname: string;
  description: string;
  image?: string;
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
    name: "PHILIP",
    surname: "STONE",
    description:
      "Twórczyni, z którą eksplorujemy nowe formy wyrazu - od performansu po interaktywne formaty. Współpracujemy przy projektach łączących sztukę i technologię.",
    image: "/assets/images/cooperators/cat.png",
    socialMedia: {
      instagram: "https://instagram.com/philipstone",
      facebook: "https://facebook.com/philipstone",
    },
    projects: [
      { title: "tytuł projektu", year: "2024" },
      { title: "tytuł projektu", year: "2023" },
    ],
  },
  {
    id: 2,
    name: "ANNA",
    surname: "KOWALSKA",
    description:
      "Artystka wizualna specjalizująca się w nowoczesnych formach ekspresji. Współpracuje z nami przy projektach łączących tradycyjne techniki z nowoczesnymi technologiami.",
    image: "/assets/images/cooperators/anna_kowalska.jpg",
    socialMedia: {
      instagram: "https://instagram.com/annakowalska",
      facebook: "https://facebook.com/annakowalska",
    },
    projects: [
      { title: "projekt wizualny", year: "2024" },
      { title: "instalacja interaktywna", year: "2023" },
    ],
  },
  {
    id: 3,
    name: "PIOTR",
    surname: "NOWAK",
    description:
      "Reżyser i choreograf, który eksploruje granice między ciałem a przestrzenią. Jego prace charakteryzują się innowacyjnym podejściem do ruchu i narracji.",
    image: "/assets/images/cooperators/piotr_nowak.jpg",
    socialMedia: {
      instagram: "https://instagram.com/piotrnowak",
      facebook: "https://facebook.com/piotrnowak",
    },
    projects: [
      { title: "spektakl eksperymentalny", year: "2024" },
      { title: "performance site-specific", year: "2023" },
    ],
  },
  {
    id: 4,
    name: "MARIA",
    surname: "WIŚNIEWSKA",
    description:
      "Kompozytorka i artystka dźwiękowa, która tworzy immersyjne doświadczenia audio. Współpracuje z nami przy projektach wykorzystujących przestrzenną technologię dźwiękową.",
    image: "/assets/images/cooperators/maria_wisniewska.jpg",
    socialMedia: {
      instagram: "https://instagram.com/mariawisniewska",
      facebook: "https://facebook.com/mariawisniewska",
    },
    projects: [
      { title: "kompozycja przestrzenna", year: "2024" },
      { title: "instalacja dźwiękowa", year: "2023" },
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
