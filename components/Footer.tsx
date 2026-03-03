"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { useUI } from "@/context/UIContext";

export default function Footer() {
  const { toggleContact, isContactOpen } = useUI();

  return (
    <footer className="flex justify-center z-40 bg-background/95 backdrop-blur-md pb-6 pt-2 px-4 relative">
      <div className="w-[700px]">
      
      {/* 1. Badge (Converted to Button) */}
      <div className="flex justify-center block mb-3 mt-2">
        <button 
          onClick={toggleContact}
          className={`border border-dashed border-primary/70 px-4 py-1 text-[10px] tracking-widest rounded-full uppercase transition-colors ${
            isContactOpen 
             ? "bg-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.6)]" 
             : "text-primary hover:bg-primary hover:text-white"
          }`}
        >
          {isContactOpen ? "Close Message" : "Let's Talk ?"}
        </button>
      </div>

      {/* 2. Bottom Row */}
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
        <Link href="/experience" className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold text-sm py-2 rounded shadow-[0_0_15px_rgba(139,92,246,0.5)] text-center uppercase tracking-wide transition transform active:scale-95">
          My Experience
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
      </div>
    </footer>
  );
}