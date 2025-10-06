import { getProjectById } from "@/app/lib/projects";

// This function generates the metadata for each project page
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(parseInt(id));

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} - Bez Kontekstu`,
    description: project.description,
  };
}

// Layout component that just renders children
export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
