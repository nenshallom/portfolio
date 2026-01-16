import { getProfileData } from "@/sanity/queries";
import ProjectList from "@/components/ProjectList";

export default async function ProjectsPage() {
  // 1. Fetch Data
  const { projects } = await getProfileData();

  return (
    <div className="px-3 min-h-full flex justify-center">
       
       {/* 2. Main Dashed Container */}
       <div className="flex-1 max-w-[700px] border-2 border-dashed border-primary/30 rounded-3xl p-3 relative bg-gradient-to-b from-transparent to-primary/5 flex flex-col gap-8">
          
          {/* Title */}
          <h1 className="text-3xl text-black dark:text-white text-center tracking-wide border-b border-primary/20 pb-4 font-mono">
            My Projects
          </h1>

          {/* --- DYNAMIC PROJECT LIST --- */}
          {/* We pass the Sanity data down to the client component */}
          <ProjectList projects={projects} />

       </div>
    </div>
  );
}