import CopyOfCopyOfNpc1 from "@/app/assets/images/copy_of_copy_of_npc/1.png";
import CopyOfCopyOfNpc2 from "@/app/assets/images/copy_of_copy_of_npc/2.png";
import CopyOfCopyOfNpc3 from "@/app/assets/images/copy_of_copy_of_npc/3.png";
import CopyOfCopyOfNpc4 from "@/app/assets/images/copy_of_copy_of_npc/4.png";
import PrawdyZaGrosz1 from "@/app/assets/images/prawdy_za_grosz/1.jpg";
import PrawdyZaGrosz2 from "@/app/assets/images/prawdy_za_grosz/2.jpg";
import PrawdyZaGrosz3 from "@/app/assets/images/prawdy_za_grosz/3.jpg";
import PrawdyZaGrosz4 from "@/app/assets/images/prawdy_za_grosz/4.jpg";
import GanglionyGangliony1 from "@/app/assets/images/gangliony_gangliony/1.jpg";
import GanglionyGangliony2 from "@/app/assets/images/gangliony_gangliony/2.jpg";
import GanglionyGangliony3 from "@/app/assets/images/gangliony_gangliony/3.jpg";
import GanglionyGangliony4 from "@/app/assets/images/gangliony_gangliony/4.jpg";
import Limbo1 from "@/app/assets/images/limbo/1.jpg";
import Limbo2 from "@/app/assets/images/limbo/2.jpg";
import Limbo3 from "@/app/assets/images/limbo/3.jpg";
import Limbo4 from "@/app/assets/images/limbo/4.jpg";

export interface Project {
  id: number;
  name: string;
  year: string;
  poster?: string;
  description: string;
  performers: string[];
  voiceOver?: string[];
  narrators?: string[];
  creators?: {
    direction?: string[];
    choreography?: string[];
    soundDirection?: string[];
    lightDirection?: string[];
    scenography?: string[];
    production?: string[];
  };
  images?: string[];
  videoUrl?: string;
}

// Mock projects data - you can replace this with real data from API or CMS
export const projects: Project[] = [
  {
    id: 1,
    name: "Copy of Copy of NPC",
    year: "2025",
    poster: "/assets/images/copy_of_copy_of_npc.png",
    description:
      '"Copy of Copy of NPC" w Teatrze Rozbark stanowi refleksję nad cyfrowymi tożsamościami i pojęciem Main Character w przestrzeni społecznej.',
    performers: ["Olga Bury", "Zuzanna Predygier", "Jan Sarata", "Piotr Stanek", "Mateusz Wierzbicki"],
    voiceOver: ["Marcin Sanakiewicz", "Robert Czeobotar"],
    narrators: ["Jan Butruk", "Piotr Choroba", "Maciej Marcinkowski"],
    creators: {
      direction: ["Jan Łuć"],
      choreography: ["Olga Bury", "Zuzanna Predygier", "Jan Sarata", "Piotr Stanek", "Mateusz Wierzbicki"],
      soundDirection: ["Olga Bury", "Zuzanna Predygier", "Jan Sarata", "Piotr Stanek", "Mateusz Wierzbicki"],
      scenography: ["Olga Bury", "Zuzanna Predygier", "Jan Sarata", "Piotr Stanek", "Mateusz Wierzbicki"],
      production: ["Fundacja Bez Kontekstu"],
    },
    images: getProjectImages("Copy of Copy of NPC"),
    videoUrl: "https://youtu.be/dkAwO54wQ9E",
  },
  {
    id: 2,
    name: "PRAWDY ZA GROSZ",
    year: "2024",
    poster: "/assets/images/prawdy_za_grosz.png",
    description: "Eksperymentalny spektakl łączący teatr z technologią, eksplorujący granice między rzeczywistością a wirtualnością.",
    performers: ["Anna Kowalska", "Michał Nowak", "Katarzyna Wiśniewska"],
    creators: {
      direction: ["Maria Zielińska"],
      choreography: ["Tomasz Krawczyk"],
      soundDirection: ["Piotr Dąbrowski"],
      scenography: ["Agnieszka Lewandowska"],
      production: ["Fundacja Bez Kontekstu"],
    },
    images: getProjectImages("PRAWDY ZA GROSZ"),
    videoUrl: "/api/assets/video/prawdy_za_grosz.webm",
  },
  {
    id: 3,
    name: "GANGLIONY, GANGLIONY...",
    year: "2024",
    poster: "/assets/images/gangliony_gangliony.png",
    description:
      "To spektakl eksperymentalny, który bada granice między ciałem a technologią za pomocą immersji dźwiękowej i przestrzennej. Dźwięk w tym spektaklu pełni rolę zarówno narracyjną, jak i sensoryczną, wpływając na percepcję przestrzeni i ruchu. Widzowie stają się częścią przestrzeni performatywnej, w której dźwięk stymuluje ich zmysły i zmienia ich postrzeganie ciała. Spektakl jest częścią projektu „Przestrzenie Sztuki”, który koncentruje się na nowoczesnych formach sztuki performatywnej.",
    performers: ["Mateusz Wierzbicki"],
    voiceOver: ["Piotr Klauza"],
    creators: {
      direction: ["Jan Łuć"],
      choreography: ["Mateusz Wierzbicki / Olga Bury"],
      production: ["Centrum Kultury w Lublinie, Fundacja Bez Kontekstu"],
      scenography: ["Adrianna Urbańska"],
      lightDirection: ["Szymon Stęchły"],
    },
    images: getProjectImages("GANGLIONY GANGLIONY"),
    videoUrl: "https://www.youtube.com/watch?v=-MJFk5q0DeE",
  },
  {
    id: 4,
    name: "LIMBO",
    year: "2022",
    poster: "/assets/images/limbo.png",
    description: `„Limbo” to eksperymentalny spektakl immersyjny, który koncentruje się na doświadczeniu
dźwiękowym widza. Spektakl łączy nowoczesne technologie dźwiękowe z interakcją aktorów,
pozwalając na pełne zanurzenie publiczności w przestrzeń performatywną. Dźwięk odgrywa
tutaj kluczową rolę – jest nie tylko tłem, ale także jednym z głównych nośników narracji, tworząc
poczucie niepewności i surrealistycznej przestrzeni. Spektakl został finalistą konkursu „The Best
OFF” i zdobył 2. Nagrodę na MonoFest 2024.`,
    performers: ["Sebastian Dela"],
    creators: {
      direction: ["Jan Łuć"],
      soundDirection: ["Piotr Klauza / Łukasz Niemancewicz"],
      scenography: ["Jan Łuć"],
      production: ["Fundacja Bez Kontekstu"],
    },
    images: getProjectImages("LIMBO"),
    videoUrl: "https://www.youtube.com/watch?v=0m4tgoVBQKg",
  },
];

// Function to get project by ID
export function getProjectById(id: number): Project | undefined {
  return projects.find((project) => project.id === id);
}

// Function to get all projects
export function getAllProjects(): Project[] {
  return projects;
}

// Function to get previous project ID
export function getPreviousProjectId(currentId: number): number | null {
  const currentIndex = projects.findIndex((project) => project.id === currentId);
  if (currentIndex <= 0) return null;
  return projects[currentIndex - 1].id;
}

// Function to get next project ID
export function getNextProjectId(currentId: number): number | null {
  const currentIndex = projects.findIndex((project) => project.id === currentId);
  if (currentIndex === -1 || currentIndex >= projects.length - 1) return null;
  return projects[currentIndex + 1].id;
}

// Function to generate image paths for a project based on its name
export function getProjectImages(projectName: string): string[] {
  // Convert project name to lowercase and replace spaces with underscores
  const folderName = projectName.toLowerCase().replace(/\s+/g, "_");

  // Define known project images based on existing folders
  const projectImageMap: { [key: string]: string[] } = {
    copy_of_copy_of_npc: [
      CopyOfCopyOfNpc1.src,
      CopyOfCopyOfNpc2.src,
      CopyOfCopyOfNpc3.src,
      CopyOfCopyOfNpc4.src,
    ],
    prawdy_za_grosz: [ PrawdyZaGrosz1.src, PrawdyZaGrosz2.src, PrawdyZaGrosz3.src, PrawdyZaGrosz4.src ],
    gangliony_gangliony: [ GanglionyGangliony1.src, GanglionyGangliony2.src, GanglionyGangliony3.src, GanglionyGangliony4.src ],
    limbo: [ Limbo1.src, Limbo2.src, Limbo3.src, Limbo4.src ],
  };

  // Return images for the project if they exist, otherwise return empty array
  return projectImageMap[folderName] || [];
}
