"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    // REMOVED "fixed bottom-0 left-0 right-0"
    // ADDED "w-full"
    <footer className="w-full z-40 bg-background/95 backdrop-blur-md pb-6 pt-2 px-4">
      
      {/* 1. Navigation Tabs */}
      <div className="flex justify-between gap-2 mb-2 text-xs font-mono">
        <Link href="/projects" className="flex-1 text-center py-1 border border-dashed border-primary text-primary hover:bg-primary/10 transition rounded">
          Projects
        </Link>
        <Link href="/experience" className="flex-1 text-center py-1 border border-dashed border-primary text-primary hover:bg-primary/10 transition rounded">
          Experience    
        </Link>
        <Link href="/tools" className="flex-1 text-center py-1 border border-dashed border-primary text-primary hover:bg-primary/10 transition rounded">
          Tools
        </Link>
      </div>

      {/* 2. Badge */}
      <div className="flex justify-center mb-3">
      <Link 
  href="/message" 
  className="border border-dashed border-primary/50 text-primary/70 px-4 py-1 text-[10px] tracking-widest rounded-full uppercase hover:bg-primary hover:text-white transition-colors"
>
  Work with Me ? 
</Link>
      </div>

      {/* 3. Bottom Row */}
      <div className="flex items-center gap-3">
        {/* Socials */}
        <div className="flex gap-2">
          <a href="https://github.com/nenshallom" target="_blank" className="p-2 border border-dashed border-primary/50 rounded text-black dark:text-white hover:text-primary hover:border-primary transition">
            <Github size={15} />
          </a>
          <a href="https://linkedin.com/in/nenshallom/" target="_blank" className="p-2 border border-dashed border-primary/50 rounded text-black dark:text-white hover:text-primary hover:border-primary transition">
            <Linkedin size={15} />
          </a>
        </div>

        {/* CTA */}
        <Link href="/cv" className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold text-sm py-2 rounded shadow-[0_0_15px_rgba(139,92,246,0.5)] text-center uppercase tracking-wide transition transform active:scale-95">
          View My CV
        </Link>

        {/* Contact */}
        <div className="flex gap-2">
          <a href="mailto:sshallom92@email.com" className="p-2 border border-dashed border-primary/50 rounded text-black dark:text-white hover:text-primary hover:border-primary transition">
            <Mail size={15} />
          </a>
          <a href="tel:+2349065679171" className="p-2 border border-dashed border-primary/50 rounded text-black dark:text-white hover:text-primary hover:border-primary transition">
            <Phone size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}