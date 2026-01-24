"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { UIProvider } from "@/context/UIContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <UIProvider>
        {children}
      </UIProvider>
    </NextThemesProvider>
  );
}