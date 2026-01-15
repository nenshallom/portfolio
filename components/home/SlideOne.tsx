import { motion } from "framer-motion";
import Image from "next/image"; 

export default function SlideOne() {
  return (
    <motion.div className="flex flex-col items-center relative h-full justify-center">
      
      <div className="w-full flex  flex-col relative z-10">
        
      <div className="flex flex-col min-[375px]:flex-row items-center justify-between w-full gap-4">
      {/* 1. flex-col: Default (mobile-first), stacks items vertically.
          2. min-[300px]:flex-row: Applies flex-row ONLY when width is > 300px.
          3. gap-4: Adds space between the text and the image.
          4. p-4: Added padding so content doesn't touch the border edges.
      */}
      
      <div className="w-full">
        <p className="text-accent font-bold tracking-wide text-left self-start text-sm">
          Hey, I&apos;m
        </p>

        <h1 className="text-2xl min-[300px]:text-3xl md:text-5xl font-black text-left leading-tight flex-1 break-word">
          <span className="text-blue-500">Nendang</span>
          <span className="text-primary"> Shallom</span>
          <span className="text-blue-500"> Goshit</span>
        </h1>
      </div>

      <div className="hidden min-[375px]:flex w-40 h-40 max-[375px]:w-24 max-[375px]:h-24 rounded-full border-gray-800 overflow-hidden shrink-0 bg-gray-900 relative z-20 shadow-xl aspect-square">
        <Image
          src="/images/profile.jpg"
          alt="Nendang Shallom Goshit"
          width={160}
          height={160}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </div>
      </div>

      <div className="self-start inline-flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-full px-3 py-1.5 mb-1 shadow-lg relative z-10 mt-4">
        <span className="text-blue-400 text-[10px]">💎</span>
        <span className="text-white text-[7px] md:text-xs font-bold tracking-wider uppercase">
          I&apos;m a Curious Catalyst
        </span>
      </div>

      <h2 className="self-start text-xl md:text-3xl font-bold text-black dark:text-white leading-snug font-mono relative z-10">
        Engineering Clean, <br />
        Beautiful & Performant <br />
        Web Solutions
      </h2>

      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>

    </motion.div>
  );
}