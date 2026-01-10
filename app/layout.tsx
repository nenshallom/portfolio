import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "NSG Portfolio",
  description: "My AI-Powered Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 1. App Shell Container (100dvh = 100% of visible mobile screen) */}
      <body className="antialiased bg-background h-[100dvh] flex flex-col overflow-hidden">
        
        {/* Header - Fixed Height */}
        <div className="flex-none z-50">
          <Header />
        </div>

        {/* Main Content Area 
            - flex-1: Fills ALL available space between Header and Footer
            - pt-16: Space for header
            - pb-4: Small padding at bottom of scroll area
        */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 pb-4 scroll-smooth">
          {children}
        </main>

        {/* Footer - Natural Height (Always visible at bottom) */}
        <div className="flex-none z-40">
          <Footer />
        </div>

      </body>
    </html>
  );
}