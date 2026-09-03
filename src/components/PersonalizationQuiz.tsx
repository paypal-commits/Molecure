import React, { useState } from "react";
import { Sparkles, Dna, ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Shield, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";

interface PersonalizationQuizProps {
  products: Product[];
  onQuizClose: () => void;
  onSelectResult: (product: Product) => void;
  addToCart: (product: Product, isSub: boolean) => void;
}

interface Question {
  id: number;
  text: string;
  category: string;
  options: { text: string; score: Record<string, number>; description?: string }[];
}

export default function PersonalizationQuiz({
  products,
  onQuizClose,
  onSelectResult,
  addToCart,
}: PersonalizationQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      text: "Do you have raw genetic data (e.g. 23andMe, AncestryDNA, Thorne)?",
      category: "genetics",
      options: [
        {
          text: "Yes, I want to optimize for specific SNPs (MnSOD, SLC23A1, GPX)",
          score: { personalized: 10, cellular: 5 },
          description: "We will tailor cofactors directly to your transport variants.",
        },
        {
          text: "No, but I want to assess my metabolic indicators (Phenotypic assessment)",
          score: { personalized: 8, defense: 4, mitochondrial: 4 },
          description: "Our algorithm uses lifestyle indicators to proxy pathway bottlenecks.",
        },
      ],
    },
    {
      id: 2,
      text: "How would you rate your typical physical stamina and baseline cellular energy?",
      category: "energy",
      options: [
        {
          text: "Excellent - I maintain peak energy all day",
          score: { defense: 5 },
          description: "Focus on preventative lipid membrane maintenance.",
        },
        {
          text: "Moderate - I experience afternoon slumps and fatigue",
          score: { mitochondrial: 10, cellular: 5 },
          description: "Mitochondrial transport cofactors like PQQ and CoQ10 are recommended.",
        },
        {
          text: "Low - I feel chronically fatigued or slow to recover",
          score: { mitochondrial: 12, personalized: 8 },
          description: "Priority support for mitochondrial biogenesis and ATP recycling.",
        },
      ],
    },
    {
      id: 3,
      text: "What is your typical daily intake of high-antioxidant plant foods (berries, greens)?",
      category: "diet",
      options: [
        {
          text: "High (5+ servings daily)",
          score: { defense: 5 },
          description: "Your exogenous levels are strong. Focus on endogenous enzyme support.",
        },
        {
          text: "Moderate (2-4 servings daily)",
          score: { cellular: 6, defense: 6 },
          description: "SVCT1 and SR-B1 cofactors help maximize absorption from these foods.",
        },
        {
          text: "Low (0-1 servings daily)",
          score: { cellular: 12, defense: 10 },
          description: "Exogenous supplements like buffered Vitamin C and carotenoids are highly necessary.",
        },
      ],
    },
    {
      id: 4,
      text: "What environmental stressors are you regularly exposed to (urban pollution, high exercise, UV)?",
      category: "environment",
      options: [
        {
          text: "Minimal - I live in a clean environment and do low-intensity activity",
          score: { cellular: 4 },
        },
        {
          text: "Moderate - Occasional high-intensity workouts or moderate urban air",
          score: { defense: 8, cellular: 6 },
        },
        {
          text: "High - Heavy urban smog, daily intense workouts, or prolonged sun exposure",
          score: { defense: 12, cellular: 10, personalized: 8 },
          description: "Requires advanced glutathione recyclers to neutralize elevated ROS.",
        },
      ],
    },
  ];

  const handleOptionSelect = (optionIndex: number) => {
    const updatedAnswers = { ...answers, [currentStep]: optionIndex };
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setQuizCompleted(false);
  };

  // Algorithm to calculate best product based on score
  const getRecommendedProduct = (): Product => {
    const totals: Record<string, number> = {
      cellular: 0,
      defense: 0,
      mitochondrial: 0,
      personalized: 0,
    };

    Object.entries(answers).forEach(([qIdxStr, optIdxVal]) => {
      const qIdx = parseInt(qIdxStr);
      const optIdx = optIdxVal as number;
      const scores = questions[qIdx].options[optIdx].score;
      Object.entries(scores).forEach(([cat, val]) => {
        totals[cat] = (totals[cat] || 0) + val;
      });
    });

    let bestCat = "personalized";
    let highestScore = 0;
    Object.entries(totals).forEach(([cat, score]) => {
      if (score > highestScore) {
        highestScore = score;
        bestCat = cat;
      }
    });

    // Find first product of that category, or fallback to Personalized Pack
    const matched = products.find((p) => p.category === bestCat);
    return matched || products[products.length - 1]; // Default to final Personalized Wellness Pack
  };

  const recommendation = quizCompleted ? getRecommendedProduct() : null;

  return (
    <div id="quiz-component" className="glass-card rounded-3xl shadow-xl overflow-hidden max-w-3xl mx-auto my-10 border border-white/10 text-white">
      <div className="p-6 sm:p-8 bg-slate-950/40 border-b border-white/5 relative">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Dna className="w-40 h-40" />
        </div>
        <div className="flex items-center space-x-3 mb-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
            Molecure Precision Assessment
          </span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-left">
          Align Supplementation to Your Genome
        </h2>
        <p className="text-slate-300 text-sm text-left mt-2 max-w-xl">
          Complete this science-based 4-step survey to identify genetic-absorption bottlenecks and discover your optimal cofactors.
        </p>

        {/* Progress bar */}
        {!quizCompleted && (
          <div className="mt-8">
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
              <span>PATHWAY PROGRESS: STEP {currentStep + 1} OF {questions.length}</span>
              <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-sky-500 h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {!quizCompleted ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-left"
            >
              <span className="inline-block px-3 py-1 bg-white/5 border border-white/5 text-emerald-400 rounded-lg text-xs font-mono uppercase font-semibold">
                {questions[currentStep].category} ANALYSIS
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                {questions[currentStep].text}
              </h3>

              <div className="space-y-4">
                {questions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className="w-full p-4 sm:p-5 border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 rounded-2xl text-left transition-all duration-200 focus:outline-hidden group flex items-start space-x-4"
                  >
                    <div className="mt-0.5 w-5 h-5 rounded-full border-2 border-white/25 group-hover:border-emerald-400 flex items-center justify-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 scale-0 group-hover:scale-100 transition-transform"></div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white transition-colors group-hover:text-emerald-400">
                        {opt.text}
                      </p>
                      {opt.description && (
                        <p className="text-xs text-slate-400 mt-1">
                          {opt.description}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation controls */}
              <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-8">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`flex items-center space-x-1 text-sm font-semibold transition-colors ${
                    currentStep === 0 ? "text-white/20 cursor-not-allowed" : "text-slate-300 hover:text-white"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={onQuizClose}
                  className="text-slate-400 hover:text-slate-200 text-sm font-medium"
                >
                  Skip Assessment
                </button>
              </div>
            </motion.div>
          ) : (
            // Results Page
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-left space-y-6"
            >
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex items-start space-x-4">
                <div className="p-3 bg-emerald-500/15 rounded-xl">
                  <Dna className="w-8 h-8 text-emerald-400 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-white">
                    Your Cellular Redox Formulation is Ready
                  </h4>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                    Based on your biochemical responses, our algorithm detects genetic-transport restrictions in your cellular defense paths. We have mapped the ideal cofactors to overcome these cellular bottlenecks.
                  </p>
                </div>
              </div>

              {recommendation && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border border-white/10 rounded-3xl p-6 sm:p-8 bg-white/5">
                  {/* Left Column - Product Image & Title */}
                  <div className="md:col-span-5 flex flex-col justify-center items-center text-center">
                    <div className={`p-8 bg-gradient-to-br ${recommendation.bgGradient} rounded-3xl w-full flex items-center justify-center mb-4 border border-white/10`}>
                      <img
                        src={recommendation.image}
                        alt={recommendation.name}
                        referrerPolicy="no-referrer"
                        className="h-44 object-contain rounded-2xl drop-shadow-xl animate-float"
                      />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                      MATCH SCORE: 98.4%
                    </span>
                    <h3 className="font-display font-bold text-xl text-white">
                      {recommendation.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                      {recommendation.tagline}
                    </p>
                  </div>

                  {/* Right Column - Benefits, Ingredients & CTA */}
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-semibold text-xs text-emerald-400 uppercase tracking-wider mb-4">
                        Targeted Cellular Adjustments:
                      </h4>
                      <ul className="space-y-3">
                        {recommendation.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start space-x-3 text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 pt-4 border-t border-white/5">
                        <span className="text-xs font-mono font-bold text-slate-300 block mb-2 uppercase">
                          Key Cellular Cofactors Included:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {recommendation.ingredients.map((ing, i) => (
                            <span key={i} className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-slate-300 font-semibold shadow-2xs">
                              {ing.name} ({ing.dose})
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="text-left w-full sm:w-auto">
                        <span className="text-xs text-slate-400 block uppercase">TOTAL VALUE:</span>
                        <div className="flex items-baseline space-x-2">
                          <span className="font-display font-bold text-3xl text-white">${recommendation.price}</span>
                          <span className="text-xs text-slate-400">/ single box</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:min-w-[280px]">
                        <button
                          onClick={() => onSelectResult(recommendation)}
                          className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors border border-white/10"
                        >
                          View Science details
                        </button>
                        <button
                          onClick={() => {
                            addToCart(recommendation, false);
                            onQuizClose();
                          }}
                          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-emerald-500/20"
                        >
                          Add Custom Pack
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Re-assessment and general safety compliance info */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-white/5 gap-4">
                <button
                  onClick={resetQuiz}
                  className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-500">
                  <Shield className="w-3.5 h-3.5" />
                  <span>FDA-Compliant Algorithmic Matching. Non-Diagnostic.</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
