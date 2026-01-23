"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react"; 
import Image from "next/image"; 
import { useUI } from "../context/UIContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function DraggableChatWidget() {
  const { isAiOpen, toggleAi } = useUI();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Animation State
  const [showAttention, setShowAttention] = useState(false);

  useEffect(() => {
    // 1. Wait 3 seconds before showing the text (Let the button appear first)
    const showTimer = setTimeout(() => {
      setShowAttention(true);
    }, 3000);

    // 2. Hide the text after 8 seconds (Total 5s visibility)
    const hideTimer = setTimeout(() => {
      setShowAttention(false);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (isAiOpen) {
      setShowAttention(false); 
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAiOpen, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      if (!response.ok) throw new Error("Failed");
      const botData = await response.json();
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: botData.content };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 500 }}
        
        // --- 1. ENTRANCE ANIMATION (Button Appears after load) ---
        initial={{ opacity: 0, y: 50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          delay: 1.5,       // Wait 1.5s after page load
          duration: 0.5,    // Take 0.5s to appear
          type: "spring",   // Bouncy entrance
          stiffness: 260,
          damping: 20
        }}
        // ---------------------------------------------------------

        className="fixed bottom-14 right-3 md:right-28 z-50 cursor-grab active:cursor-grabbing flex flex-col items-center gap-3"
      >
        {/* --- 2. TEXT BUBBLE ANIMATION --- */}
        <AnimatePresence>
          {showAttention && !isAiOpen && (
             <motion.div
               initial={{ opacity: 0, y: 10, scale: 0.8 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 10, scale: 0.8 }} // Smooth fade out
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-xl whitespace-nowrap relative border border-gray-200"
             >
               Chat with my AI
               {/* Tiny Arrow pointing down */}
               <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-gray-200"></div>
             </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => {
            toggleAi();
            setShowAttention(false); 
          }}
          // --- 3. BOUNCE ANIMATION (Synced with Text) ---
          animate={showAttention && !isAiOpen ? {
            y: [0, -8, 0], // Gentle bounce
            scale: [1, 1.05, 1]
          } : {
            y: 0,
            scale: 1
          }}
          transition={{
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
          // ---------------------------------------------
          className="w-14 md:w-20 h-14 md:h-20 bg-primary bg-opacity-90 text-white rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center justify-center border-2 border-white/20 hover:scale-110 transition-transform overflow-hidden relative"
        >
          {isAiOpen ? (
            <X size={24} />
          ) : (
            <div className="relative w-full h-full">
               <Image 
                 src="/images/myAI2.png" 
                 alt="My AI" 
                 fill 
                 className="object-cover"
               />
            </div>
          )}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isAiOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-40 right-5 w-[90vw] md:w-[350px] h-[450px] z-50 bg-[#0a0a16] border border-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
             {/* Header */}
             <div className="bg-primary/10 p-4 border-b border-primary/20 flex items-center gap-2 justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-primary/50">
                        <Image 
                          src="/images/myAI2.png" 
                          alt="AI" 
                          fill 
                          className="object-cover"
                        />
                    </div>
                    <span className="font-bold text-white text-sm">Ask AI about me</span>
                </div>
                <button onClick={toggleAi} className="text-gray-400 hover:text-white">
                    <X size={18} />
                </button>
             </div>

             {/* Messages */}
             <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                   <p className="text-center text-gray-500 text-xs mt-10">
                      Go ahead, ask me anything about Nendang's experience!
                   </p>
                )}
                {messages.map((m) => (
                   <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {m.role === 'assistant' && (
                        <div className="w-6 h-6 rounded-full overflow-hidden relative border border-gray-700 mr-2 shrink-0">
                           <Image src="/images/myAI2.png" alt="AI" fill className="object-cover" />
                        </div>
                      )}

                      <div className={`max-w-[85%] p-3 rounded-xl text-xs ${
                         m.role === 'user' 
                         ? 'bg-primary text-white rounded-tr-none' 
                         : 'bg-gray-800 text-gray-200 rounded-tl-none'
                      }`}>
                         {m.content}
                      </div>
                   </div>
                ))}
                {isLoading && (
                   <div className="text-xs text-gray-500 italic ml-2">Thinking...</div>
                )}
                <div ref={messagesEndRef} />
             </div>

             {/* Input */}
             <form onSubmit={handleSendMessage} className="p-3 bg-black/20 border-t border-primary/20 flex gap-2">
                <input 
                   className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 text-sm text-white focus:border-primary focus:outline-none"
                   placeholder="Type a message..."
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                />
                <button 
                  type="submit" 
                  disabled={!inputValue.trim()}
                  className="bg-primary p-2 rounded-lg text-white disabled:opacity-50"
                >
                   <Send size={16} />
                </button>
             </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}