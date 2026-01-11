"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  isAiOpen: boolean;
  toggleAi: () => void;
  openAi: () => void;
  closeAi: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isAiOpen, setIsAiOpen] = useState(false);

  const toggleAi = () => setIsAiOpen((prev) => !prev);
  const openAi = () => setIsAiOpen(true);
  const closeAi = () => setIsAiOpen(false);

  return (
    <UIContext.Provider value={{ isAiOpen, toggleAi, openAi, closeAi }}>
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