"use client";

import { useState } from "react";
import { Lock, Send, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MessagePage() {
  const [formData, setFormData] = useState({ email: "", topic: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false); // Controls the modal

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowModal(true); // Open Modal
        setFormData({ email: "", topic: "", message: "" }); // Clear form
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 pt-4 min-h-full flex flex-col relative">
      
      {/* --- CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
             {/* Backdrop */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowModal(false)}
               className="absolute inset-0 bg-black/80 backdrop-blur-sm"
             />
             
             {/* Modal Content */}
             <motion.div 
               initial={{ scale: 0.5, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.5, opacity: 0 }}
               className="bg-[#11112b] border border-green-500/50 p-8 rounded-3xl relative w-full max-w-sm text-center shadow-[0_0_50px_rgba(34,197,94,0.3)]"
             >
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>

                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle size={40} className="text-green-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Thanks for reaching out. I've received your message and will get back to you shortly!
                </p>

                <button 
                  onClick={() => setShowModal(false)}
                  className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-xl transition-all w-full"
                >
                  Awesome
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Main Container */}
      <div className="flex-1 w-full border-2 border-dashed border-cyan-500/30 rounded-3xl p-5 md:p-8 relative bg-[#0a0a16] flex flex-col justify-center items-center">
        
        {/* Available Badge */}
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-3 py-1.5 rounded-full">
           <Lock size={12} className="text-yellow-500" />
           <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-wider">
             Hey! I'm Available for Work
           </span>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-md bg-[#0f0f1a] border border-primary/20 rounded-2xl p-6 md:p-8 shadow-2xl relative mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div className="space-y-2">
                <label className="text-white font-mono text-sm">Your Email Address</label>
                <input 
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-[#05050A] border-2 border-dashed border-primary/40 rounded-lg p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors font-mono text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-white font-mono text-sm">Message Topic</label>
                <input 
                  type="text"
                  required
                  placeholder="Let's Talk?"
                  className="w-full bg-[#05050A] border-2 border-dashed border-primary/40 rounded-lg p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors font-mono text-sm"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-white font-mono text-sm">Message</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="I typically Reply Messages within 2 hours"
                  className="w-full bg-[#05050A] border-2 border-dashed border-primary/40 rounded-lg p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors font-mono text-sm resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-[0_0_20px_rgba(139,92,246,0.4)] mt-2 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send size={18} />}
              </button>

            </form>
        </div>

      </div>
    </div>
  );
}