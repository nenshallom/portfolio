"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  isAiOpen: boolean;
  toggleAi: () => void;
  openAi: () => void;
  closeAi: () => void;
  // --- NEW: Contact Modal State ---
  isContactOpen: boolean;
  toggleContact: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false); // <--- New State

  const toggleAi = () => {
    setIsAiOpen((prev) => !prev);
    if (isContactOpen) setIsContactOpen(false); // Close contact if AI opens
  };

  const openAi = () => {
    setIsAiOpen(true);
    setIsContactOpen(false);
  };
  
  const closeAi = () => setIsAiOpen(false);

  // Toggle Contact Logic
  const toggleContact = () => {
    setIsContactOpen((prev) => !prev);
    if (isAiOpen) setIsAiOpen(false); // Close AI if Contact opens
  };

  return (
    <UIContext.Provider value={{ 
      isAiOpen, 
      toggleAi, 
      openAi, 
      closeAi,
      isContactOpen, 
      toggleContact 
    }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}