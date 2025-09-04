// Project data structure and mock data
export interface Project {
  id: number;
  name: string;
  year: string;
  description: string;
  performers: string[];
  voiceOver?: string[];
  narrators?: string[];
  creators?: {
    direction?: string[];
    choreography?: string[];
    soundDirection?: string[];
    scenography?: string[];
    production?: string[];
  };
  images?: string[];
  videoUrl?: string;
  liveUrl?: string;
}

// Mock projects data - you can replace this with real data from API or CMS
export const projects: Project[] = [
  {
    id: 1,
    name: "Copy of Copy of NPC",
    year: "2025",
    description:
      '"Copy of Copy of NPC" w Teatrze Rozbark stanowi refleksję nad cyfrowymi tożsamościami i pojęciem Main Character w przestrzeni społecznej.',
    performers: ["Olga Bury", "Zuzanna Predygier", "Jan Sarata", "Piotr Stanek", "Mateusz Wierzbicki"],
    voiceOver: ["Marcin Sanakiewicz", "Robert Czeobotar"],
    narrators: ["Jan Butruk", "Piotr Choroba", "Maciej Marcinkowskic"],
    creators: {
      direction: ["Jan Łuć"],
      choreography: ["Olga Bury", "Zuzanna Predygier", "Jan Sarata", "Piotr Stanek", "Mateusz Wierzbicki"],
      soundDirection: ["Olga Bury", "Zuzanna Predygier", "Jan Sarata", "Piotr Stanek", "Mateusz Wierzbicki"],
      scenography: ["Olga Bury", "Zuzanna Predygier", "Jan Sarata", "Piotr Stanek", "Mateusz Wierzbicki"],
      production: ["Fundacja Bez Kontekstu"],
    },
    images: ["/placeholder1.jpg", "/placeholder2.jpg", "/placeholder3.jpg", "/placeholder4.jpg"],
    videoUrl: "https://example.com/video.mp4",
    liveUrl: "https://project1.example.com",
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
