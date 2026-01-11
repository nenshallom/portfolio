import { motion } from "framer-motion";
import Image from "next/image"; // <--- 1. Import this

export default function SlideOne() {
  return (
    <motion.div className="flex flex-col items-center relative h-full justify-center">
      
      <div className="w-full flex flex-col gap-2 mb-4 relative z-10">
        <p className="text-accent font-bold tracking-wide text-left self-start text-sm">
          Welcome, I&apos;m
        </p>

        <div className="flex items-center justify-between w-full">
            <h1 className="text-3xl md:text-5xl font-black text-left leading-tight flex-1">
                <span className="text-blue-500 block">Nendang</span>
                <span className="text-primary block">Shallom</span>
                <span className="text-blue-500 block">Goshit</span>
            </h1>

            {/* --- PROFILE IMAGE SECTION --- */}
            <div className="w-40 h-40 md:w-40 md:h-40 rounded-full border-[3px] border-gray-800 overflow-hidden shrink-0  bg-gray-900 relative z-20 shadow-xl">
                {/* Next.js Image Component:
                   - src: starts from 'public' folder (so /images/...)
                   - width/height: required for aspect ratio (matches w-40 = 160px)
                   - object-cover: ensures image fills the circle without stretching
                   - priority: loads it instantly (no blur/pop-in)
                */}
                <Image 
                  src="/images/profile.jpg" 
                  alt="Nendang Shallom Goshit" 
                  width={160} 
                  height={160} 
                  className="w-full h-full object-cover"
                  priority 
                />
            </div>
            {/* ----------------------------- */}
        </div>
      </div>

      <div className="self-start inline-flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-full px-3 py-1.5 mb-4 shadow-lg relative z-10">
        <span className="text-blue-400 text-xs">💎</span>
        <span className="text-white text-[10px] md:text-xs font-bold tracking-wider uppercase">
          I&apos;m a Curious Catalyst
        </span>
      </div>

      <h2 className="self-start text-lg md:text-2xl font-bold text-black dark:text-white leading-snug font-mono relative z-10">
        Engineering Clean, <br />
        Beautiful & Performant <br />
        Frontend for the Web
      </h2>

       <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>

    </motion.div>
  );
}