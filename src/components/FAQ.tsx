import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { FAQItem } from "../types";

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All FAQs" },
    { id: "science", name: "Clinical Science" },
    { id: "supplements", name: "Formulations" },
    { id: "general", name: "Company & Compliance" },
  ];

  const filteredItems = selectedCategory === "all"
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="faq-section" className="py-12 bg-transparent relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
            REDOX SUPPORT
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mt-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 mt-2 text-sm sm:text-base">
            Detailed, evidence-based responses. Review FDA compliance parameters and clinical explanations.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                  : "bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Accordions List */}
        <div className="space-y-4 text-left">
          {filteredItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="glass-card border border-white/10 hover:border-white/20 rounded-2xl bg-slate-950/20 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-hidden"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-white pr-4 flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">Q.</span>
                    <span>{item.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 border-t border-white/5 pt-4 bg-slate-950/40">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FDA Compliance Disclaimer Banner */}
        <div className="mt-12 p-5 border border-white/10 rounded-2xl bg-slate-950/30 glass-card flex items-start space-x-4 text-left">
          <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-white uppercase">FDA Regulatory Compliance Seal</h5>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              *The statements made on this website have not been evaluated by the Food and Drug Administration. Molecure products are dietary supplements and are not intended to diagnose, treat, cure, or prevent any disease. Our formulations are designed exclusively to support, promote, and maintain healthy physiological processes like cellular energy, oxidative defense, and redox balance.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
