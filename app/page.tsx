"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideOne from "@/components/home/SlideOne";
import SlideTwo from "@/components/home/SlideTwo";

// Premium animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    filter: "blur(4px)",
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    filter: "blur(4px)",
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Home() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false); // Track if user is hovering

  // Calculate active slide (0 or 1) using modulo for infinite looping
  // We use Math.abs to handle negative numbers if user swipes backwards
  const slideIndex = Math.abs(page % 2);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // --- AUTO-PLAY EFFECT ---
  useEffect(() => {
    // If paused (hovering), don't set the timer
    if (isPaused) return;

    const timer = setInterval(() => {
      paginate(1); // Auto move to next slide
    }, 5000); // 5 Seconds duration

    // Cleanup timer on unmount or when dependencies change
    return () => clearInterval(timer);
  }, [page, isPaused]); // Re-run effect when page changes or pause state changes


  return (
    // 1. Reduced top padding (pt-8 -> pt-4)
    // 2. Added 'no-scrollbar' class to hide the scrolling bar
    <div className="px-4 pt-4 flex flex-col items-center h-full justify-center no-scrollbar">
      
      {/* 3. CONTAINER HEIGHT CHANGE:
         Changed min-h-[500px] to h-[400px] (fixed compact height for mobile)
         This ensures it doesn't push the footer off screen.
      */}
      <div 
        className="w-full h-[420px] md:h-[500px] border-2 border-dashed border-primary/30 rounded-3xl p-5 relative bg-gradient-to-b from-transparent to-primary/5 overflow-hidden flex flex-col"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {/* ... animation logic remains same ... */}
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              filter: { duration: 0.2 }
            }}
            className="flex-1 h-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
           >
            {slideIndex === 0 ? <SlideOne /> : <SlideTwo />}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* 4. Tighter spacing for indicators (mt-6 -> mt-4) */}
      <div className="mt-4 w-full max-w-[250px] flex flex-col items-center gap-3">
        
        {/* Dots */}
        <div className="flex gap-3">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => {
                const newDirection = index > slideIndex ? 1 : -1;
                setPage([page + (index - slideIndex), newDirection]);
              }}
              className={`rounded-full transition-all duration-300 relative ${
                slideIndex === index 
                  ? "w-3 h-3 bg-gradient-to-r from-blue-500 to-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" 
                  : "w-3 h-3 border border-gray-700 bg-transparent hover:border-primary/50"
              }`}
            >
               {slideIndex === index && (
                   <motion.div layoutId="activeIndicator" className="absolute inset-0 bg-white/20 rounded-full" />
               )}
            </button>
          ))}
        </div>

        {/* Progress Bar - Reduced height h-3 -> h-2 */}
        <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-primary to-purple-500 rounded-full relative"
            initial={false}
            animate={{ 
                width: slideIndex === 0 ? "50%" : "100%" 
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
             <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/30 blur-md filter"></div>
          </motion.div>
        </div>

      </div>

    </div>
  );
}