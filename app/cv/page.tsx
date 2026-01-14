import { getProfileData } from "@/sanity/queries";
import { Mail, Phone, Github, MapPin, Linkedin, Download } from "lucide-react";
import Link from "next/link";

export default async function CvPage() {
  const { profile, experience, projects, education } = await getProfileData();

  return (
    <div className="px-3 pt-4 min-h-full flex flex-col">
      
      {/* Main Dashed Container */}
      <div className="flex-1 w-full border-2 border-dashed border-primary/30 rounded-3xl p-3 md:p-8 relative bg-gradient-to-b from-transparent to-primary/5 flex flex-col gap-8 overflow-hidden">
        
        {/* --- HEADER TITLE --- */}
        <h1 className="text-3xl font-black text-black dark:white text-center tracking-wide border-b border-primary/20 pb-4 font-mono">
           Curriculum Vitae
        </h1>

        {/* --- 1. PERSONAL INFO (Design 1) --- */}
        <div className="bg-[#11112b] border border-primary/20 rounded-xl p-6 relative overflow-hidden">
            {/* Name */}
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {profile.fullName}
            </h2>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 text-sm text-gray-300">
               {profile.email && (
                 <div className="flex items-center gap-2">
                   <Mail size={16} className="text-primary" /> {profile.email}
                 </div>
               )}
               {profile.phoneNumber && (
                 <div className="flex items-center gap-2">
                   <Phone size={16} className="text-primary" /> {profile.phoneNumber}
                 </div>
               )}
               {profile.githubLink && (
                 <Link href={profile.githubLink} target="_blank" className="flex items-center gap-2 hover:text-white">
                   <Github size={16} className="text-primary" /> GitHub Profile
                 </Link>
               )}
               {profile.linkedinLink && (
                 <Link href={profile.linkedinLink} target="_blank" className="flex items-center gap-2 hover:text-white">
                   <Linkedin size={16} className="text-primary" /> LinkedIn Profile
                 </Link>
               )}
               {profile.location && (
                 <div className="flex items-center gap-2 md:col-span-2">
                   <MapPin size={16} className="text-primary" /> {profile.location}
                 </div>
               )}
            </div>

            {/* Professional Summary */}
            <div className="mb-6">
               <h3 className="text-green-500 font-bold font-mono text-sm mb-2">Professional Summary</h3>
               <p className="text-gray-300 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                 {profile.summary}
               </p>
            </div>

            {/* Technical Skills (Categorized) */}
            <div className="space-y-3">
               <h3 className="text-green-500 font-bold font-mono text-sm">Technical Skills</h3>
               
               {/* Helper to render skill row */}
               <SkillRow label="Languages & Frameworks" items={profile.skillsLanguages} />
               <SkillRow label="Tools & Systems" items={profile.skillsTools} />
               <SkillRow label="UI/UX" items={profile.skillsUiUx} />
               <SkillRow label="Other" items={profile.skillsOther} />
            </div>

            {/* Download Button (Floating) */}
            {profile.resumeURL?.url && (
              <a href={`${profile.resumeURL.url}?dl=`} className="absolute bottom-4 right-4 bg-primary p-3 rounded text-white shadow-lg hover:bg-primary/80 transition">
                 <Download size={20} />
              </a>
            )}
        </div>


        {/* --- 2. EXPERIENCE (Design 2) --- */}
        <div className="bg-[#11112b] border border-primary/20 rounded-xl p-6">
            <h3 className="text-green-500 font-bold font-mono text-lg mb-6 border-b border-gray-800 pb-2">
              Professional Experience
            </h3>

            <div className="flex flex-col gap-8">
              {experience.map((job: any) => (
                <div key={job._id} className="relative pl-4 border-l-2 border-primary/30">
                   {/* Role & Company */}
                   <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                      <h4 className="text-white font-bold text-base">
                        {job.role} <span className="text-gray-500 mx-1">|</span> {job.company}
                      </h4>
                      <span className="text-xs text-gray-400 font-mono">
                        {job.location} | {new Date(job.startDate).getFullYear()} - {job.isCurrent ? "Present" : new Date(job.endDate).getFullYear()}
                      </span>
                   </div>

                   {/* Bullets */}
                   <ul className="mt-2 space-y-1">
                     {job.description?.map((point: string, i: number) => (
                       <li key={i} className="text-xs md:text-sm text-gray-300 flex gap-2">
                         <span className="text-primary mt-1.5 text-[8px]">●</span>
                         {point}
                       </li>
                     ))}
                   </ul>
                </div>
              ))}
            </div>
        </div>

        {/* --- 3. PROJECTS (Design 3) --- */}
        <div className="bg-[#11112b] border border-primary/20 rounded-xl p-6">
            <h3 className="text-green-500 font-bold font-mono text-lg mb-6 border-b border-gray-800 pb-2">
              Projects
            </h3>
            <div className="space-y-6">
               {projects.map((proj: any) => (
                 <div key={proj._id}>
                    <div className="flex justify-between items-baseline mb-1">
                       <span className="text-white font-bold text-sm">{proj.title}</span>
                       <span className="text-xs text-gray-500 font-mono italic">
                         {proj.tags?.slice(0, 3).join(", ")}
                       </span>
                    </div>
                    <ul className="space-y-1">
                       {proj.description?.slice(0, 2).map((pt: string, i: number) => (
                          <li key={i} className="text-xs text-gray-400 flex gap-2">
                             <span className="text-gray-600 mt-1.5 text-[8px]">●</span> {pt}
                          </li>
                       ))}
                    </ul>
                 </div>
               ))}
            </div>
        </div>

        {/* --- 4. EDUCATION & CERTIFICATIONS (Design 3) --- */}
        <div className="bg-[#11112b] border border-primary/20 rounded-xl p-6">
            
            {/* Education */}
            <h3 className="text-green-500 font-bold font-mono text-lg mb-4">Education</h3>
            <div className="mb-8 space-y-4">
              {education?.map((edu: any) => (
                <div key={edu._id}>
                   <h4 className="text-white font-bold text-sm">{edu.degree}</h4>
                   <p className="text-xs text-gray-400">
                     {edu.school} | {edu.startDate ? new Date(edu.startDate).getFullYear() : ""} - {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                   </p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            {profile.certifications && profile.certifications.length > 0 && (
              <>
                <h3 className="text-green-500 font-bold font-mono text-lg mb-4">Certifications</h3>
                <ul className="space-y-2">
                  {profile.certifications.map((cert: any, i: number) => (
                    <li key={i} className="text-xs text-gray-300 flex gap-2 items-center">
                       <span className="text-primary mt-1 text-[8px] self-start">●</span> 
                       
                       {/* Check if a link exists */}
                       {cert.link ? (
                         <a 
                           href={cert.link} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="hover:text-primary hover:underline transition-colors decoration-dotted underline-offset-4"
                         >
                           {cert.name}
                         </a>
                       ) : (
                         <span>{cert.name}</span>
                       )}
                    </li>
                  ))}
                </ul>
              </>
            )}
        </div>

      </div>
    </div>
  );
}

// Helper Component for Skill Rows
function SkillRow({ label, items }: { label: string, items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="text-xs md:text-sm">
       <span className="text-white font-bold">{label}: </span>
       <span className="text-gray-400 leading-relaxed">
         {items.join(", ")}
       </span>
    </div>
  );
}