import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Sparkles, AlertCircle, Bot, User, Dna } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I am Molecure's AI Genomic Advisor. I have been trained on clinical literature regarding nutrigenetics, antioxidant regulation, and the MnSOD / GPX enzymes. How can I help align your daily cofactors with your genetic profile today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    try {
      // Structure chat history to match the API requirements
      const formattedHistory = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: formattedHistory,
        }),
      });

      if (!res.ok) {
        throw new Error("Endpoint returned non-200");
      }

      const data = await res.json();
      if (data && data.response) {
        setMessages((prev) => [...prev, { role: "model", text: data.response }]);
      } else {
        throw new Error("Missing response payload");
      }
    } catch (err) {
      console.warn("AI Chatbot API fallback triggered:", err);
      // Scientific local fallback responses if backend is temporarily disconnected or API key missing
      let fallbackText = "I understand your interest in cellular health. Based on general nutrigenomic guidelines, individuals with mitochondrial transport efficiency polymorphisms (like MnSOD Val16Ala Ala/Ala) generally show optimal redox balance when supplementing with mixed carotenoids and tocopherols to protect lipid membranes.";
      
      if (userText.toLowerCase().includes("vla") || userText.toLowerCase().includes("mnsod") || userText.toLowerCase().includes("sod2") || userText.toLowerCase().includes("rs4880")) {
        fallbackText = "For the MnSOD Val16Ala polymorphism (rs4880), carrier status determines how effectively Manganese Superoxide Dismutase is transported into your mitochondria. Ala/Ala carriers have a restricted transport signal, leading to potentially elevated mitochondrial ROS unless protected by targeted carotenoids and selenium cofactors.";
      } else if (userText.toLowerCase().includes("vit") || userText.toLowerCase().includes("c") || userText.toLowerCase().includes("slc23")) {
        fallbackText = "The SLC23A1 gene controls the SVCT1 transporter, regulating Vitamin C absorption. Standard oral doses are capped due to saturation, so our 'Cellular Defense Ascorbate' utilizes non-acidic buffered ascorbates which bypass primary transporters via secondary passive channels.";
      } else if (userText.toLowerCase().includes("gpx") || userText.toLowerCase().includes("selen")) {
        fallbackText = "Glutathione Peroxidase (GPX1-3) is selenium-dependent. If dietary selenium is low, the enzymatic recycling of toxic peroxides to water is severely compromised. Formulations like 'Endogenous Enzyme Activator' supply L-selenomethionine to maintain peak GPX activity.";
      }

      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "model", text: fallbackText }]);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-chatbot" className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          id="chat-toggle-btn"
          onClick={() => setIsOpen(true)}
          className="p-4 bg-slate-950/80 backdrop-blur-md hover:bg-slate-900/80 text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border border-white/10 group animate-float"
        >
          <MessageSquare className="w-6 h-6 text-emerald-400 group-hover:scale-105 transition-transform" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:pl-2 transition-all duration-300 text-xs font-semibold whitespace-nowrap">
            Consult Genomes
          </span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[480px] bg-slate-950/85 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between animate-scaleIn">
          
          {/* Header */}
          <div className="p-4 bg-slate-950/40 text-white flex justify-between items-center relative border-b border-white/10">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Dna className="w-16 h-16 text-emerald-400" />
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold font-display text-white">Molecure Genomic Advisor</h4>
                <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase">
                  REDOX CHANNELS SECURED
                </span>
              </div>
            </div>

            <button
              id="chat-close-btn"
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 text-slate-400 rounded-full transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-transparent scroll-smooth no-scrollbar">
            {messages.map((m, idx) => {
              const isAI = m.role === "model";
              return (
                <div key={idx} className={`flex ${isAI ? "justify-start" : "justify-end"} items-end space-x-2`}>
                  {isAI && (
                    <div className="w-7 h-7 rounded-full bg-slate-950 flex items-center justify-center flex-shrink-0 border border-white/10">
                      <Bot className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  )}
                  
                  <div className={`p-3 rounded-2xl max-w-[80%] text-xs text-left leading-relaxed ${
                    isAI
                      ? "bg-slate-900/60 border border-white/5 text-slate-100 rounded-bl-none shadow-md"
                      : "bg-emerald-500 text-white rounded-br-none shadow-md shadow-emerald-500/10"
                  }`}>
                    {m.text}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start items-end space-x-2">
                <div className="w-7 h-7 rounded-full bg-slate-950 flex items-center justify-center border border-white/10">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-2xl rounded-bl-none flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef}></div>
          </div>

          {/* Chat Form Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-slate-950/40 flex space-x-2">
            <input
              type="text"
              placeholder="Ask about MnSOD, GPX, or Vitamin C transport..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow px-3 py-2 bg-slate-950/60 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <button
              id="chat-send-btn"
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-slate-950 border border-white/10 hover:bg-slate-900 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4 text-emerald-400" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
