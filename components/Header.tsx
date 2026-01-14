"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sun, FileText, Bot, Moon } from "lucide-react";
import { useUI } from "../context/UIContext";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleAi, isAiOpen } = useUI();

  // Theme Hooks
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch (wait for client load)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to toggle
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* --- TOP HEADER (Unchanged) --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-dashed border-primary/30 h-16 flex items-center justify-between px-4">
        
        <div className="font-bold text-2xl tracking-wider text-primary">
          NSG
        </div>

        <div className="flex items-center gap-3">
          {/* --- THEME TOGGLE BUTTON --- */}
          <button 
            onClick={toggleTheme}
            className="p-2 border border-dashed border-primary/50 rounded hover:bg-primary/10 transition text-muted-foreground hover:text-primary"
            aria-label="Toggle Theme"
          >
            {/* Show nothing until mounted to avoid flickering */}
            {mounted && (theme === "dark" ? <Sun size={16} /> : <Moon size={16} />)}
          </button>
          {/* --------------------------- */}
          <button 
            onClick={toggleAi}
            className={`p-2 border border-dashed border-primary/50 rounded transition font-mono text-xs font-bold flex items-center justify-center ${
              isAiOpen ? "bg-primary text-white" : "hover:bg-primary/10  hover:text-white"
            }`}
          >
            AI
          </button>
          {/* ------------------------- */}
        </div>

        <button 
          onClick={() => setIsMenuOpen(true)}
          className="bg-primary p-2 rounded text-white hover:bg-primary/80 transition"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* --- MOBILE MENU OVERLAY (Updated Animation) --- */}
      {/* 1. fixed inset-0: Covers the screen
          2. translate-x-full: Moves it 100% to the right (hidden) by default
          3. translate-x-0: Moves it to center (visible) when open
          4. transition-transform: Animates the movement
      */}
      <div 
        className={`fixed inset-0 z-[60] bg-background/95 backdrop-blur-md flex flex-col p-6 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
          
        {/* Close Button */}
        <div className="flex justify-end mb-8">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="text-black dark:text-white p-2 hover:text-primary transition"
          >
            <X size={32} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-6">
          <div className="text-center text-primary font-bold tracking-widest mb-4">
            [NAVIGATION]
          </div>

          <Link href="/" onClick={() => setIsMenuOpen(false)} className="group border border-primary/30 p-6 rounded-xl bg-primary dark:bg-gray-900/50 hover:border-primary transition flex flex-col gap-2">
            <div className="flex items-center gap-3 text-white font-bold text-lg">
              <Sun size={20} className="text-white dark:text-primary"/> HOME
            </div>
            <p className="text-xs text-accent pl-8">Return to the Amazing Home Page</p>
          </Link>

          <Link href="/cv" onClick={() => setIsMenuOpen(false)} className="group border border-primary/30 p-6 rounded-xl bg-primary dark:bg-gray-900/50 hover:border-primary transition flex flex-col gap-2">
            <div className="flex items-center gap-3 text-white font-bold text-lg">
              <FileText size={20} className="text-white dark:text-primary"/> CV
            </div>
            <p className="text-xs text-accent pl-8">View my CV professionally</p>
          </Link>

          <Link href="/ai" onClick={() => setIsMenuOpen(false)} className="group border border-primary/30 p-6 rounded-xl bg-primary dark:bg-gray-900/50 hover:border-primary transition flex flex-col gap-2">
            <div className="flex items-center gap-3 text-white font-bold text-lg">
              <Bot size={20} className="text-white dark:text-primary"/> ASK ME?
            </div>
            <p className="text-xs text-accent pl-8">Let AI Answer Questions about me</p>
          </Link>
        </nav>
        
        {/* Decorative Side Border */}
        <div className="absolute left-0 top-20 bottom-20 w-px border-l-2 border-dashed border-primary/30 ml-4 pointer-events-none"></div>
      </div>
    </>
  );
}