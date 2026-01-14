import { motion } from "framer-motion";

export default function SlideTwo() {
  return (
    <motion.div className="flex flex-col h-full justify-center relative py-2">
      
      {/* Reduced margin mb-12 -> mb-6 */}
      <div className="self-end inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1.5 mb-6">
         <span className="text-yellow-500 text-xs">🔓</span>
         <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-wider">Hey! I&apos;m Available for Work</span>
      </div>
      
      {/* Reduced text-3xl -> text-xl */}
      <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white leading-relaxed font-mono mb-8">
        I&apos;m a Frontend Developer who cares Deeply about Clarity, Quality and Real-world Impact.
      </h2>
      
      <div className="self-end mt-auto">
         <div className="text-6xl filter drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            🎖️
         </div>
      </div>

    </motion.div>
  );
}