"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";
import { useUI } from "../context/UIContext"; // <--- Import Context

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function DraggableChatWidget() {
  // REMOVE local state: const [isOpen, setIsOpen] = useState(false);
  // USE global state:
  const { isAiOpen, toggleAi } = useUI();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAiOpen) { // Updated to use isAiOpen
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
        className="fixed bottom-15 right-3  z-50 cursor-grab active:cursor-grabbing"
      >
        <button
          onClick={toggleAi} // Updated to use toggleAi
          className="w-14 h-14 bg-primary bg-opacity-50 text-black dark:text-white rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center justify-center border-2 border-white/20 hover:scale-110 transition-transform"
        >
          {/* Icons automatically swap based on global state */}
          {isAiOpen ? <X size={24} /> : <Bot size={28} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {isAiOpen && ( // Updated to use isAiOpen
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-40 right-5 w-[90vw] md:w-[350px] h-[450px] z-50 bg-[#0a0a16] border border-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
             {/* Header */}
             <div className="bg-primary/10 p-4 border-b border-primary/20 flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                    <Bot size={18} className="text-primary" />
                    <span className="font-bold text-white text-sm">Ask AI about me</span>
                </div>
                {/* Close button inside modal */}
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