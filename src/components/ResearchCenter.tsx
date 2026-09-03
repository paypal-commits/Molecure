import React, { useState } from "react";
import { BookOpen, Search, Clock, Award, ShieldCheck, FileText, ChevronRight, Share2, HelpCircle } from "lucide-react";
import { ResearchArticle } from "../types";

interface ResearchCenterProps {
  articles: ResearchArticle[];
}

export default function ResearchCenter({ articles }: ResearchCenterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<ResearchArticle | null>(null);

  const filteredArticles = articles.filter(
    (art) =>
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.geneInvolved.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Discovery Timeline representing scientific evolution from 1996 to 2026
  const clinicalTimeline = [
    {
      year: "1996",
      title: "MnSOD Targeting Deciphered",
      desc: "Discovery of the mitochondrial targeting sequence in Manganese Superoxide Dismutase, establishing the foundation of mitochondrial transport biochemistry.",
    },
    {
      year: "2006",
      title: "Biomarker Proliferation Study",
      desc: "Comprehensive review identifying 71 distinct clinical biomarkers of oxidative stress, highlighting the necessity for standardized measurement metrics.",
    },
    {
      year: "2015",
      title: "Nutrigenetics Field Launch",
      desc: "First international genome studies demonstrating how dietary exogenous antioxidants directly modulate health risks of endogenous variant carriers.",
    },
    {
      year: "2023",
      title: "GPX Selenium Sensitivity Review",
      desc: "Groundbreaking publication mapping the exact selenocysteine activation parameters of GPX1-3 enzymes in relation to L-selenomethionine supplements.",
    },
    {
      year: "2026",
      title: "Molecure Redox Modeling Engine",
      desc: "Development of predictive metabolic matching, enabling consumers to align dietary cofactors directly with their phenotypic and genomic profiles.",
    },
  ];

  return (
    <div id="research-center-section" className="py-12 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
            Molecure Knowledge Hub
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-4 tracking-tight">
            The Research Library
          </h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg">
            Grounded in peer-reviewed scientific investigations. Review clinical studies detailing gene-diet antioxidant interactions.
          </p>
        </div>

        {/* Search Bar for Research Library */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search genomic markers (e.g. MnSOD, GPX1, SLC23A1)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-slate-900 text-white transition-all placeholder-slate-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: List of Peer-Reviewed Article Summaries */}
          <div className="lg:col-span-8 text-left space-y-6">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>Study Summaries</span>
            </h3>

            <div className="space-y-6">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    className="glass-card rounded-3xl p-6 hover:shadow-2xl hover:border-white/20 transition-all duration-300 relative group"
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md uppercase">
                        Marker: {art.geneInvolved}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {art.clinicalReference}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 italic leading-relaxed">
                      "{art.summary}"
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/5 text-xs text-slate-300 space-y-2">
                      <p><strong>Primary Finding:</strong> {art.findings}</p>
                      <p><strong>Exogenous Co-Modulators:</strong> <span className="font-semibold text-emerald-400">{art.dietaryFactor}</span></p>
                      <p><strong>Measured Biomarkers:</strong> {art.biomarkers.join(", ")}</p>
                    </div>

                    <div className="mt-4 pt-3 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                      <span>Source: {art.citation}</span>
                      <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform cursor-pointer">
                        <span>Read Full Text</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400 text-sm">
                  No medical reviews matched your genomic query. Try "MnSOD" or "Selenium".
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Discoveries Timeline (Clinical Breakthroughs) */}
          <div className="lg:col-span-4 text-left space-y-6">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>Scientific Timeline</span>
            </h3>

            <div className="relative border-l-2 border-white/10 pl-6 space-y-8 ml-3">
              {clinicalTimeline.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-9 top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-emerald-500 group-hover:bg-emerald-500 transition-colors flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-white"></div>
                  </div>

                  <span className="font-mono font-bold text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    {item.year}
                  </span>
                  <h4 className="font-display font-bold text-sm text-white mt-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Scientific Verification Seal */}
            <div className="glass-card bg-slate-950/40 border border-white/15 text-white rounded-3xl p-6 mt-8 relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent)] pointer-events-none"></div>
              <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
              <h4 className="font-display font-bold text-sm text-white">
                Nutrigenomic Quality Seals
              </h4>
              <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
                All Molecure formulas are held to a clinical standard of documentation. Every batch undergoes full independent spectrometry auditing to ensure maximum cofactor density.
              </p>
              <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>MEMBER, NUTRIGENOMICS COALITION</span>
                <span>SINCE 2024</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
