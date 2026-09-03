import React, { useState } from "react";
import { Activity, Shield, Sparkles, BookOpen, Clock, AlertTriangle, ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";

export default function TheScience() {
  const [antioxidantIntake, setAntioxidantIntake] = useState(50); // Slider 0 - 100

  // Calculate oxidative stress values based on genotype and antioxidant intake
  // Formula mimics the research paper: Ala/Ala carriers have higher baseline oxidative stress if antioxidant is low,
  // but see the greatest benefit (sharpest drop) as antioxidant intake increases!
  const getOxidativeStressVal = (genotype: string, intake: number) => {
    switch (genotype) {
      case "Ala/Ala (rs4880 variants)":
        // Starts high, drops fast with antioxidants (highly sensitive)
        return Math.max(15, Math.round(90 - intake * 0.85));
      case "Val/Ala (Heterozygous)":
        // Intermediate
        return Math.max(20, Math.round(75 - intake * 0.55));
      case "Val/Val (Standard genotype)":
        // Lower baseline, steady drop
        return Math.max(25, Math.round(55 - intake * 0.35));
      default:
        return 50;
    }
  };

  const genotypes = [
    {
      name: "Ala/Ala (rs4880 variants)",
      color: "#ef4444", // Red
      description: "Impaired mitochondrial transport sequence. High susceptibility to oxidative stress; requires substantial carotenoid cofactors.",
    },
    {
      name: "Val/Ala (Heterozygous)",
      color: "#3b82f6", // Blue
      description: "Moderate mitochondrial transport efficiency. Beneficial response seen with moderate daily antioxidant synergy.",
    },
    {
      name: "Val/Val (Standard genotype)",
      color: "#10b981", // Emerald
      description: "Standard mitochondrial targeting sequence. Solid baseline defenses; maintains redox homeostasis easily.",
    },
  ];

  return (
    <div id="science-section" className="py-12 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
            Nutrigenomics & Cellular Longevity
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-4 tracking-tight">
            The Molecular Proof Behind Molecure
          </h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg">
            Translating complex clinical reviews into targeted bioavailable cofactors. Discover how your unique DNA influences cellular defense.
          </p>
        </div>

        {/* 1. Explaining Oxidative Stress & ROS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="text-left space-y-6">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">PATHOLOGY EXPLAINED</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              What is Oxidative Stress?
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Every day, during aerobic energy production, your mitochondria experience small 'electron leakages.' These leaked electrons bind with oxygen, creating highly unstable chemical particles known as <strong>Reactive Oxygen Species (ROS)</strong> and free radicals.
            </p>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              When the creation of these free radicals outpaces your body's capacity to neutralize them, your cells enter a state of <strong>Oxidative Stress</strong>. Left unchecked, free radicals strip electrons from your lipids, proteins, and DNA, leading to macromolecular damage and accelerated cellular aging.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
                <AlertTriangle className="w-5 h-5 text-rose-400 mb-2" />
                <h4 className="text-xs font-bold text-rose-400">Intracellular Damage</h4>
                <p className="text-[11px] text-rose-200 mt-1">Free radicals degrade membrane lipids and cause mutations in nuclear DNA.</p>
              </div>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <Shield className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-xs font-bold text-emerald-400">Redox Homeostasis</h4>
                <p className="text-[11px] text-emerald-200 mt-1">Maintained when antioxidant cofactors neutralize radicals before damage occurs.</p>
              </div>
            </div>
          </div>

          {/* Graphical diagram representing neutralization */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl bg-slate-950/20">
            <h3 className="font-display font-bold text-sm text-emerald-400 text-left mb-6 uppercase tracking-wider">
              Clinical Visualization: ROS Neutralization
            </h3>
            
            <div className="space-y-6">
              {/* Step 1: Free radical */}
              <div className="flex items-center space-x-4 bg-slate-950/40 p-4 rounded-xl border border-white/5 shadow-md">
                <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center font-mono text-xs font-bold text-rose-400 animate-pulse">
                  O₂⁻
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">1. Superoxide Anion (ROS)</h4>
                  <p className="text-[11px] text-slate-300">Unstable oxygen byproduct of mitochondrial respiration with an unpaired electron.</p>
                </div>
              </div>

              {/* Step 2: Conversion enzyme */}
              <div className="flex items-center space-x-4 bg-slate-950/40 p-4 rounded-xl border border-white/5 shadow-md">
                <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center font-mono text-xs font-bold text-sky-400">
                  MnSOD
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">2. Enzymatic Disputation</h4>
                  <p className="text-[11px] text-slate-300">Manganese Superoxide Dismutase converts toxic O₂⁻ into less reactive hydrogen peroxide.</p>
                </div>
              </div>

              {/* Step 3: Resolution */}
              <div className="flex items-center space-x-4 bg-slate-950/40 p-4 rounded-xl border border-white/5 shadow-md">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-mono text-xs font-bold text-emerald-400">
                  GPX
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">3. Resolution to H₂O</h4>
                  <p className="text-[11px] text-slate-300">Selenium-dependent Glutathione Peroxidase converts the peroxide safely into water.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Chart demonstrating the Gene-Diet Interaction (Clinical Core) */}
        <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-12 mb-24 bg-slate-950/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Chart description & slider */}
            <div className="lg:col-span-5 text-left flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">INTERACTIVE GENOME MODEL</span>
                <h3 className="font-display font-bold text-2xl text-white mt-2 tracking-tight">
                  The MnSOD Gene-Diet Interaction
                </h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  The Val16Ala polymorphism (rs4880) impairs how effectively your MnSOD enzyme is transported into your mitochondria. 
                </p>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  Use the slider below to adjust your **Dietary Antioxidant Intake** (carotenoids and tocopherols). Watch how the Ala/Ala genotype suffers from elevated oxidative stress at low intakes but achieves a remarkable drop when antioxidant status is optimized!
                </p>
              </div>

              {/* Slider Controller */}
              <div className="bg-slate-950/40 p-5 rounded-2xl border border-white/5 mt-6 shadow-md">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-white">DIETARY ANTIOXIDANT INTAKE</span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase">
                    {antioxidantIntake}% (Optimal)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={antioxidantIntake}
                  onChange={(e) => setAntioxidantIntake(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-900 border border-white/5 rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                  <span>DEFICIT (0%)</span>
                  <span>MEDIAN (50%)</span>
                  <span>SATURATED (100%)</span>
                </div>
              </div>
            </div>

            {/* Dynamic SVG Interactive Chart */}
            <div className="lg:col-span-7 bg-slate-950/40 rounded-2xl border border-white/5 p-6 shadow-md relative">
              <h4 className="text-xs font-bold text-emerald-400 text-left mb-6 uppercase tracking-wider flex items-center space-x-2">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Simulated Intracellular Oxidative Stress Levels vs. Intake</span>
              </h4>

              {/* Dynamic Readouts */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {genotypes.map((gen, idx) => {
                  const val = getOxidativeStressVal(gen.name, antioxidantIntake);
                  return (
                    <div key={idx} className="p-3 bg-slate-900/60 border border-white/5 rounded-xl text-left">
                      <span className="text-[10px] text-slate-300 font-medium truncate block">{gen.name}</span>
                      <div className="flex items-baseline space-x-1.5 mt-1">
                        <span className="font-display font-bold text-xl" style={{ color: gen.color }}>
                          {val}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">Index</span>
                      </div>
                      {/* Stress level badge */}
                      <span className={`text-[9px] font-bold uppercase ${
                        val > 65 ? "text-red-400 bg-red-500/10 border border-red-500/20" : val > 40 ? "text-amber-400 bg-amber-500/10 border border-amber-500/20" : "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      } px-1.5 py-0.5 rounded-md mt-1.5 inline-block`}>
                        {val > 65 ? "Elevated" : val > 40 ? "Moderate" : "Homeostatic"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Custom SVG Graph representing the curve lines */}
              <div className="w-full h-48 relative">
                <svg className="w-full h-full" viewBox="0 0 400 150">
                  {/* Grid Lines */}
                  <line x1="20" y1="10" x2="380" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="20" y1="50" x2="380" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="20" y1="90" x2="380" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="20" y1="130" x2="380" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1" /> {/* X axis */}
                  
                  {/* Y Axis line */}
                  <line x1="20" y1="10" x2="20" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                  {/* Curve 1: Ala/Ala - Sharp drop from 120 (mapped to y coords) to 30 */}
                  <path
                    d="M 20,20 Q 200,90 380,115"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    className="opacity-70"
                  />
                  {/* Curve 2: Val/Ala - Mid drop */}
                  <path
                    d="M 20,40 Q 200,85 380,105"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    className="opacity-70"
                  />
                  {/* Curve 3: Val/Val - Low stable drop */}
                  <path
                    d="M 20,65 Q 200,80 380,95"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    className="opacity-70"
                  />

                  {/* Active Intake Indicator vertical line */}
                  {(() => {
                    const activeX = 20 + (antioxidantIntake / 100) * 360;
                    return (
                      <g>
                        <line
                          x1={activeX}
                          y1="10"
                          x2={activeX}
                          y2="130"
                          stroke="#94a3b8"
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                        />
                        {/* Active points on the lines */}
                        {/* Y coordinate math: map value 0-100 to y=130 to y=10 */}
                        {genotypes.map((gen, idx) => {
                          const val = getOxidativeStressVal(gen.name, antioxidantIntake);
                          const valY = 130 - (val / 100) * 120;
                          return (
                            <circle
                              key={idx}
                              cx={activeX}
                              cy={valY}
                              r="4.5"
                              fill={gen.color}
                              stroke="#000000"
                              strokeWidth="1.5"
                            />
                          );
                        })}
                      </g>
                    );
                  })()}
                </svg>
                <div className="flex justify-between text-[8px] text-slate-500 font-mono px-5">
                  <span>0% DIET</span>
                  <span>50% DIET</span>
                  <span>100% DIET</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3. The Scientific Timeline / Gene Breakdown */}
        <div className="text-left mb-16">
          <h3 className="font-display font-bold text-2xl text-white mb-8 tracking-tight">
            Key Genomic Markers Addressed in Formulation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                gene: "MnSOD (SOD2)",
                title: "Mitochondrial Defense Core",
                function: "The primary enzyme essential for neutralizing superoxide anions inside mitochondria.",
                snps: "Val16Ala (rs4880)",
                impact: "Alters the mitochondrial transport signal. Carriers of the Alanine (Ala) variation show restricted enzyme entry, rendering mitochondrial DNA highly vulnerable to oxidative lesions unless dietary carotenoids are heavily saturated.",
              },
              {
                gene: "SLC23A1 (SVCT1)",
                title: "Vitamin C Active Transporter",
                function: "Controls active transport and absorption of Vitamin C within the small intestine.",
                snps: "Solute Carrier SNPs",
                impact: "Restricts standard active absorption pathways, capping systemic Vitamin C plasma concentrations regardless of generic oral supplement doses. Requires buffered non-acidic ascorbate pairs that leverage secondary passive absorption channels.",
              },
              {
                gene: "SR-B1 & CYP4F2",
                title: "Lipid & Vitamin E Carriers",
                function: "Governs cellular absorption and transport of fat-soluble tocopherols and carotenoids.",
                snps: "Uptake & Receptor Variants",
                impact: "Reduces intracellular uptake of essential alpha and gamma tocopherols. Standard single-tocopherol formulations are rendered inefficient, necessitating mixed-tocopherol matrices in lipid-rich suspensions.",
              },
            ].map((g, idx) => (
              <div key={idx} className="border border-white/10 rounded-2xl p-6 bg-slate-950/20 glass-card relative overflow-hidden group hover:border-white/20 transition-all shadow-2xl">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md">
                    {g.gene}
                  </span>
                  <span className="text-[10px] font-mono font-medium text-slate-500">
                    {g.snps}
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-white mb-2">
                  {g.title}
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  {g.function}
                </p>
                <div className="border-t border-white/5 pt-3 mt-3">
                  <span className="text-[10px] font-mono font-bold text-rose-400 block mb-1 uppercase">
                    GENETIC BOTTLENECK:
                  </span>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {g.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
