"use client";

import { useState } from "react";
import { Send, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "@/context/UIContext";

export default function ContactModal() {
  const { isContactOpen, toggleContact } = useUI();
  
  // Form State
  const [formData, setFormData] = useState({ name:"", email: "", topic: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowSuccess(true);
        setFormData({ name:"", email: "", topic: "", message: "" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isContactOpen && (
        <>
          {/* 1. Backdrop (Click to close) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleContact}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          />

          {/* 2. Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed inset-0 z-[65] flex items-center justify-center pointer-events-none px-4"
          >
            {/* Modal Content Card */}
            <div className="w-full max-w-[700px] pointer-events-auto flex flex-col max-h-[90vh]">
              
              <div className="w-full border-2 border-dashed border-cyan-500/30 rounded-3xl py-8 px-4 md:p-8 relative bg-primary/10 dark:bg-[#05050A] shadow-2xl flex flex-col justify-center items-center overflow-y-auto no-scrollbar">
                
                {/* Close Button */}
                <button 
                  onClick={toggleContact}
                  className="absolute top-4 left-4 p-2 text-primary dark:text-white hover:text-primary transition"
                >
                  <X size={24} />
                </button>

                {/* Available Badge */}
                <div className="absolute top-6 right-6 flex items-center gap-2 bg-gray-900 dark:bg-yellow-500/10 border border-yellow-500/30 px-3 py-1.5 rounded-full">
                  <span className="text-yellow-500 text-xs">🔓</span>
                  <span className="text-white dark:text-yellow-500 text-[10px] font-bold uppercase tracking-wider">Available for Work</span>
                </div>

                {/* --- SUCCESS STATE --- */}
                {showSuccess ? (
                   <div className="text-center py-10 w-full max-w-sm">
                      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-gray-400 text-sm mb-6">
                        Thanks for reaching out. I've received your message and will get back to you shortly!
                      </p>
                      <button 
                        onClick={() => { setShowSuccess(false); toggleContact(); }}
                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-xl transition-all w-full"
                      >
                        Awesome
                      </button>
                   </div>
                ) : (
                  /* --- FORM STATE --- */
                  <div className="w-full max-w-md relative mt-10">
                     <h2 className="text-2xl font-black text-white text-center mb-6">
                        Let's Discuss Solutions for your Needs
                     </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="space-y-2">
                        <input 
                          required placeholder="Name"
                          className="w-full border-2 border-dashed border-primary/70 rounded-sm p-2 bg-transparent text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors font-mono text-sm"
                          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <input 
                          required type="email" placeholder="Email Address"
                          className="w-full border-2 border-dashed border-primary/70 rounded-sm p-2 bg-transparent text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors font-mono text-sm"
                          value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <input 
                          required placeholder="Message Topic?"
                          className="w-full border-2 border-dashed border-primary/70 rounded-sm p-2 bg-transparent text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors font-mono text-sm"
                          value={formData.topic} onChange={(e) => setFormData({...formData, topic: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <textarea 
                          required rows={4} placeholder="Your Message..."
                          className="w-full border-2 border-dashed border-primary/70 rounded-sm p-2 bg-transparent text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors font-mono text-sm resize-none"
                          value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>

                      <button 
                        type="submit" disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        {!isSubmitting && <Send size={18} />}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}