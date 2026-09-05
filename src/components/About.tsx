import React from "react";
import { Info, Award, Heart, ShieldAlert, Sparkles, Target, Eye, Users } from "lucide-react";
import { motion } from "motion/react";
import { useContent } from "../context/ContentContext";

export default function About() {
  const { content } = useContent();
  const { about } = content;

  return (
    <div id="about-section" className="py-12 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
            {about.badge}
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-4 tracking-tight">
            {about.title}
          </h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg">
            {about.story}
          </p>
        </div>

        {/* Introduction to Nutrigenomics in Simple Language */}
        <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-12 mb-20 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 bg-slate-950/40 rounded-3xl border border-white/5 shadow-md">
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase block text-center mb-4">
                  GENOMICS FOR EVERYONE
                </span>
                <p className="text-4xl sm:text-5xl font-bold font-display text-white text-center">DNA</p>
                <p className="text-xs text-slate-400 text-center mt-2 max-w-[180px] mx-auto">
                  Your genetic blueprint determines how your cells handle oxidative insults.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                Nutrigenomics Explained Simply
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {about.nutrigenomicsExplanation}
              </p>
            </div>
          </div>
        </div>

        {/* Vision, Mission & Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-left">
          
          <div className="p-6 border border-white/10 bg-slate-950/20 glass-card rounded-2xl relative">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 w-fit rounded-xl mb-4 text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-base text-white mb-2">Our Mission</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {about.mission}
            </p>
          </div>

          <div className="p-6 border border-white/10 bg-slate-950/20 glass-card rounded-2xl relative">
            <div className="p-2.5 bg-sky-500/10 border border-sky-500/20 w-fit rounded-xl mb-4 text-sky-400">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-base text-white mb-2">Our Vision</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {about.vision}
            </p>
          </div>

          <div className="p-6 border border-white/10 bg-slate-950/20 glass-card rounded-2xl relative">
            <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 w-fit rounded-xl mb-4 text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-base text-white mb-2">Evidence-Based Core</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We never exaggerate claims or make disease treatment promises. Our formulations are derived strictly from published medical reviews, utilizing natural cofactors with validated biological synergy.
            </p>
          </div>

        </div>

        {/* Scientific Advisory Board & Leadership */}
        {about.team && about.team.length > 0 && (
          <div className="mb-20 text-left">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
                SCIENTIFIC LEADERSHIP
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-3">
                Dec0ded Scientific Advisory Board
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Pioneering clinicians and biochemists directing our cellular nutrigenomic research.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {about.team.map((member) => (
                <div
                  key={member.id}
                  className="glass-card border border-white/10 bg-slate-950/30 p-6 rounded-3xl space-y-4 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover bg-slate-900 border border-white/10 group-hover:border-emerald-400/50 transition-colors"
                    />
                    <div>
                      <h4 className="font-display font-bold text-base text-white">{member.name}</h4>
                      <p className="text-xs text-emerald-400 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quality Commitment Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">QUALITY ASSURANCE</span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Our Clinical Quality Standards
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Unlike traditional supplement brands that rely on raw synthetic isolates, Molecure compounds are manufactured inside FDA-audited, GMP-compliant facilities in the USA.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every single raw material undergoes rigorous gas chromatography and mass spectrometry testing to guarantee absolute purity, free-from heavy metals, and complete allergen clearance.
            </p>

            <div className="space-y-4">
              {[
                "Spectrometry verified raw materials",
                "Strict adherence to FDA Dietary Supplement Guidelines",
                "Formulated with natural lipid-matrix carriers for absorption",
                "Non-GMO, vegan-friendly, and free from synthetic flow agents",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-5 h-5 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400 font-bold">✓</span>
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual representations of testing / laboratory */}
          <div className="glass-card border border-white/10 p-6 sm:p-8 rounded-3xl relative overflow-hidden text-left bg-slate-950/20">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Sparkles className="w-32 h-32 text-emerald-400" />
            </div>
            <h4 className="font-display font-bold text-sm text-emerald-400 uppercase tracking-wider mb-6">
              Molecure Quality Timeline
            </h4>

            <div className="space-y-6">
              {[
                { step: "Stage 01", title: "Cofactor Spectrometry", desc: "Verifying exact elemental weight of incoming cofactors (like manganese and selenium chelates)." },
                { step: "Stage 02", title: "Lipid Encapsulation", desc: "Suspending tocopherols and carotenoids in natural MCT structures to ensure cell-wall passive permeability." },
                { step: "Stage 03", title: "Purity Independent Auditing", desc: "Batch verification by third-party clinical laboratories. Quality certificate of analysis published publicly." },
              ].map((st, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md">
                    {st.step}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-white">{st.title}</h5>
                    <p className="text-[11px] text-slate-300 mt-1">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
