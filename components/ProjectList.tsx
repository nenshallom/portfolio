"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, Wrench } from "lucide-react";
import Link from "next/link";

export default function ProjectList({ projects }: { projects: any[] }) {
  return (
    <div className="flex flex-col gap-6">
      {projects?.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-[#11112b] border border-primary/20 rounded-xl p-5 shadow-xl relative overflow-hidden group hover:border-primary/50 transition-all"
        >
          {/* 1. Header: Icon + Title */}
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Code2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">
              {project.title}
            </h3>
          </div>

          {/* 2. Tech Stack (Green Monospace Text) */}
          <div className="flex items-center gap-2 mb-4 text-accent text-xs font-mono">
            <Wrench size={14} className="shrink-0" />
            <span className="truncate">
              {/* Join the tags array with commas */}
              {project.tags?.join(", ")}
            </span>
          </div>

          {/* 3. Bullet Points */}
          <ul className="space-y-2 mb-6">
            {project.description?.map((point: string, i: number) => (
              <li key={i} className="flex gap-3 text-xs text-gray-300 leading-relaxed">
                <span className="text-white mt-1">•</span>
                {point}
              </li>
            ))}
          </ul>

          {/* 4. 'Visit' Button (Link) */}
          {project.link && (
            <div className="mt-auto">
              <Link 
                href={project.link} 
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors"
              >
                Visit <ExternalLink size={12} />
              </Link>
            </div>
          )}

          {/* Decorative Glow */}
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-colors"></div>

        </motion.div>
      ))}
    </div>
  );
}