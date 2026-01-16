"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, X, Sun, Moon, House,
  FileText, Bot, Folder, Briefcase, Wrench 
} from "lucide-react"; // Added Folder, Briefcase, Wrench
import { useUI } from "../context/UIContext";
import { useTheme } from "next-themes";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleAi, isAiOpen } = useUI();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { name: "Experience", href: "/experience", icon: <Briefcase size={20} className="text-white dark:text-primary"/> },
    { name: "Projects", href: "/projects", icon: <Folder size={20} className="text-white dark:text-primary"/> },
    { name: "Tool Box", href: "/tools", icon: <Wrench size={20} className="text-white dark:text-primary"/> },
    { name: "CV", href: "/cv", icon: <FileText size={20} className="text-white dark:text-primary"/> },
  ];

  return (
    <div className="flex justify-center">
      {/* --- TOP HEADER --- */}
      <header className="top-0 left-0 right-0 w-[700px] z-50 bg-background/95 backdrop-blur-sm border-b border-dashed border-primary/30 h-16 flex items-center justify-between px-4">
        
        {/* LOGO */}
        <Link href="/" className="font-bold text-2xl tracking-wider text-primary shrink-0">
          NSG
        </Link>

        {/* --- DESKTOP NAVIGATION (Hidden on Mobile) --- */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs font-bold text-muted-foreground">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* --- RIGHT ACTIONS --- */}
        <div className="flex items-center gap-3">
          
          {/* THEME TOGGLE */}
          <button 
            onClick={toggleTheme}
            className="p-2 border border-dashed border-primary/50 rounded hover:bg-primary/10 transition text-muted-foreground hover:text-primary"
            aria-label="Toggle Theme"
          >
            {mounted && (theme === "dark" ? <Sun size={16} /> : <Moon size={16} />)}
          </button>

          {/* AI BUTTON */}
          <button 
            onClick={toggleAi}
            className={`p-2 border border-dashed border-primary/50 rounded transition font-mono text-xs font-bold flex items-center justify-center ${
              isAiOpen ? "bg-primary text-white" : "hover:bg-primary/10 hover:text-primary"
            }`}
          >
            AI
          </button>

          {/* HAMBURGER (Visible only on Mobile) */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden bg-primary p-2 rounded text-white hover:bg-primary/80 transition"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div 
        className={`fixed inset-0 z-[60] bg-background/95 backdrop-blur-md flex flex-col p-6 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
          
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="text-primary dark:text-white p-2 hover:text-primary transition"
          >
            <X size={32} />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col gap-4 overflow-y-auto">
          <div className="text-center text-primary font-bold tracking-widest mb-2">
            [NAVIGATION]
          </div>

          <Link href="/" onClick={() => setIsMenuOpen(false)} className="group border border-primary/30 p-4 rounded-xl bg-[#11112b] dark:bg-gray-900/50 hover:border-primary transition flex flex-col gap-1">
            <div className="flex items-center gap-3 text-white font-bold text-lg">
              <House size={20} className="text-white dark:text-primary"/> HOME
            </div>
            <p className="text-xs text-gray-500 pl-8">Return to Home</p>
          </Link>

          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)} 
              className="group border border-primary/30 p-4 rounded-xl bg-[#11112b] dark:bg-gray-900/50 hover:border-primary transition flex flex-col gap-1"
            >
              <div className="flex items-center gap-3 text-white font-bold text-lg">
                {link.icon} {link.name.toUpperCase()}
              </div>
            </Link>
          ))}
          
        </nav>
        
        {/* Decorative Side Border */}
        <div className="absolute left-0 top-20 bottom-20 w-px border-l-2 border-dashed border-primary/30 ml-4 pointer-events-none"></div>
      </div>
    </div>
  );
}