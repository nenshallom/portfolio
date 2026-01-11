"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { UIProvider } from "@/context/UIContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // attribute="class" tells it to toggle the 'dark' class on the <html> tag
    // defaultTheme="dark" ensures your original design is the default
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <UIProvider>
        {children}
      </UIProvider>
    </NextThemesProvider>
  );
}