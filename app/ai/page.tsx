"use client";

import { useState, useRef, useEffect } from "react"; // <--- 1. Import useRef & useEffect
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- 2. Create the Ref ---
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- 3. Scroll to bottom whenever 'messages' or 'isLoading' changes ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent, manualText?: string) => {
    e?.preventDefault();
    const textToSend = manualText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      if (!response.ok) throw new Error("Failed to fetch");
      const botData = await response.json();
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: botData.content };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 pt-4 h-[calc(100dvh-80px)] flex flex-col">
      <div className="flex-1 w-full border-2 border-dashed border-primary/30 rounded-3xl p-5 relative bg-gradient-to-b from-transparent to-primary/5 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-6">
           <h1 className="text-3xl font-black text-white leading-tight">
             Hello, <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
               Have a Question?
             </span>
           </h1>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 mb-4 pr-2"> {/* Added pr-2 for spacing */}
            
            {messages.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {[
                  "Does this candidate have experience with React?",
                  "What was their role in the Farman NG project?",
                  "Has Nendang used TypeScript in production?",
                  "What are his key technical skills?"
                ].map((q, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleSendMessage(undefined, q)}
                    className="p-4 bg-[#11112b] border border-primary/20 rounded-xl text-left text-sm text-gray-300 hover:border-primary hover:bg-primary/10 transition-all active:scale-95 flex flex-col justify-between h-24"
                  >
                    {q}
                    <Sparkles size={16} className="self-end text-primary/50" />
                  </motion.button>
                ))}
              </div>
            )}

            <AnimatePresence>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    m.role === "user" ? "bg-primary text-white" : "bg-gray-800 text-green-400"
                  }`}>
                    {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                    m.role === "user" 
                      ? "bg-primary/20 border border-primary/30 text-white rounded-tr-none" 
                      : "bg-gray-900 border border-gray-800 text-gray-300 rounded-tl-none"
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                       <Bot size={16} className="text-green-400 animate-pulse" />
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded-2xl text-xs text-gray-500 italic">Thinking...</div>
                 </div>
              )}
            </AnimatePresence>

            {/* --- 4. Invisible Div at the bottom to scroll to --- */}
            <div ref={messagesEndRef} /> 

        </div>

        {/* Input Area */}
        <form onSubmit={(e) => handleSendMessage(e)} className="relative mt-auto">
           <input
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             placeholder="Ask to Discover About me..."
             className="w-full bg-[#05050A] border border-primary/30 rounded-full py-4 pl-6 pr-14 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
           />
           <button 
             type="submit"
             disabled={!inputValue.trim() || isLoading}
             className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <Send size={18} />
           </button>
        </form>
      </div>
    </div>
  );
}