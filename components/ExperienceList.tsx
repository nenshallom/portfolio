"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronDown } from "lucide-react";

export default function ExperienceList({ jobs }: { jobs: any[] }) {
  // Sort jobs by start date (newest first)
  const sortedJobs = jobs?.sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <div className="flex flex-col gap-6">
      {sortedJobs?.map((job, index) => (
        <motion.div
          key={job._id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gray-900/80 border border-primary/20 rounded-xl p-5 relative overflow-hidden group hover:border-primary/50 transition-colors"
        >
          {/* Header */}
          <div className="flex flex-col gap-1 mb-4 relative z-10">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
              <Briefcase size={14} /> {job.company}
            </div>
            <h3 className="text-xl font-bold text-white">{job.role}</h3>
            
            <div className="flex items-center gap-4 text-[10px] text-gray-400 font-mono mt-1">
               <span className="flex items-center gap-1">
                 <Calendar size={10} /> 
                 {new Date(job.startDate).getFullYear()} - {job.isCurrent ? "Present" : new Date(job.endDate).getFullYear()}
               </span>
               <span className="flex items-center gap-1">
                 <MapPin size={10} /> {job.type}
               </span>
            </div>
          </div>

          {/* Bullet Points */}
          <ul className="space-y-2 relative z-10">
            {job.description?.map((point: string, i: number) => (
              <li key={i} className="flex gap-3 text-xs text-gray-300 leading-relaxed">
                <span className="text-primary mt-1">•</span>
                {point}
              </li>
            ))}
          </ul>

          {/* Decorative Green Box (Matches Design) */}
          <div className="absolute bottom-0 right-0 bg-accent/20 w-10 h-10 rounded-tl-xl flex items-center justify-center text-accent">
             <ChevronDown size={20} />
          </div>

          {/* Subtle Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        </motion.div>
      ))}
    </div>
  );
}