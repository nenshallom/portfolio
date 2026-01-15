import { getProfileData } from "@/sanity/queries";
import { client } from "@/sanity/client"; // Ensure client is imported if needed for direct fetch, or use helper
import { CheckCircle2, Lock, ArrowDown, Users } from "lucide-react";
import ExperienceList from "@/components/ExperienceList";

// We separate the component to allow async data fetching
export default async function ExperiencePage() {
  // 1. Fetch Data from Sanity
  const { experience } = await getProfileData();

  return (
    <div className="px-3 min-h-full flex justify-center">
       
       {/* 2. Main Dashed Container */}
       <div className="flex-1 max-w-[700px] border-2 border-dashed border-primary/30 rounded-3xl p-3 relative bg-gradient-to-b from-transparent to-primary/5 flex flex-col gap-8">
          
          {/* Title */}
          <h1 className="text-3xl font-black text-black dark:text-white text-center tracking-wide border-b border-primary/20 pb-4">
            My Experience
          </h1>

          {/* --- INTRO SECTION (Static from Design) --- */}
          <div className="flex flex-col gap-6">
            
            {/* Item 1 */}
            <div className="relative pl-4 border-l-2 border-green-500/50">
               <div className="flex items-center gap-2 mb-1 text-green-500 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 size={16} /> First Know This
               </div>
               <p className="text-black dark:text-gray-300 text-xs leading-relaxed font-mono">
                 I&apos;ve built and shipped real-world web applications from SaaS platforms and e-commerce products to AI-powered content systems — with a strong focus on clarity, usability, and performance.
               </p>
            </div>

            {/* Item 2 */}
            <div className="relative pl-4 border-l-2 border-green-500/50">
               <div className="flex items-center gap-2 mb-1 text-green-500 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 size={16} /> Then Know This
               </div>
               <p className="text-black dark:text-gray-300 text-xs leading-relaxed font-mono">
                 I work primarily with React, TypeScript, and modern CSS. I&apos;ve worked in remote, fast-moving environments, contributed to production codebases, and helped evolve products.
               </p>
            </div>

            {/* Item 3 */}
            <div className="relative pl-4 border-l-2 border-yellow-500/50">
               <div className="flex items-center gap-2 mb-1 text-yellow-500 font-bold text-xs uppercase tracking-wider">
                  <Lock size={16} /> Most Importantly Know This
               </div>
               <p className="text-black dark:text-gray-300 text-xs leading-relaxed font-mono">
                 I value ownership, good communication, and continuous improvement, and I bring that mindset into every project I work on.
               </p>
            </div>

          </div>

          {/* Divider */}
          <div className="w-full h-px bg-primary/20 my-2"></div>

          {/* --- DYNAMIC JOB CARDS (From Sanity) --- */}
          <ExperienceList jobs={experience} />

       </div>
    </div>
  );
}