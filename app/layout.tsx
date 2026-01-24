import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DraggableChatWidget from "../components/DraggableChatWidget";
import ContactModal from "../components/ContactModal"; // <--- 1. Import
import { Providers } from "@/components/Providers";

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
    <html lang="en" suppressHydrationWarning> 
      {/* suppressHydrationWarning is needed by next-themes to prevent errors */}
      <body className="antialiased bg-background h-[100dvh] flex flex-col overflow-hidden">
        
        <Providers>
          
          <div className="flex-none z-50">
             <Header /> 
          </div>

          <main className="flex-1 overflow-y-auto overflow-x-hidden pt-10 pb-4 scroll-smooth relative">
            {children}
            <DraggableChatWidget /> 
          </main>
          
          <ContactModal />

          <div className="flex-none z-40">
             <Footer />
          </div>

        </Providers>

      </body>
    </html>
  );
}