import React from "react";
import { ArrowRight, Shield, Award, CheckCircle2, Star, Sparkles, TrendingUp, Heart } from "lucide-react";
import { motion } from "motion/react";
import ThreeMolecularCanvas from "./ThreeMolecularCanvas";
import { Product } from "../types";
import { useContent } from "../context/ContentContext";

interface HeroProps {
  onShopNow: () => void;
  onLearnScience: () => void;
  bestSellers: Product[];
  onProductSelect: (product: Product) => void;
  addToCart: (product: Product, isSub: boolean) => void;
}

export default function Hero({
  onShopNow,
  onLearnScience,
  bestSellers,
  onProductSelect,
  addToCart,
}: HeroProps) {
  const { content } = useContent();
  const hero = content.hero;

  // Simple animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div id="hero-section" className="relative overflow-hidden bg-slate-950">
      {/* Background Video with optimized overlays - limited to the top hero fold */}
      <div className="absolute top-0 left-0 right-0 h-[650px] sm:h-[750px] lg:h-[820px] z-0 select-none pointer-events-none overflow-hidden">
        <video
          key={hero.videoUrl}
          src={hero.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-70"
        />
        {/* Gradients to blend the background smoothly */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#020617_90%)]"></div>
      </div>

      {/* Dynamic Grid Background with Glow effects - limited to the top hero fold */}
      <div className="absolute top-0 left-0 right-0 h-[650px] sm:h-[750px] lg:h-[820px] z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
      
      {/* Decorative Blur Spheres representing Cellular fields - limited to the top hero fold */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse-slow z-0"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse-slow [animation-delay:4s] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Copywriting Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-12 flex flex-col space-y-6 items-center text-center max-w-4xl mx-auto"
          >
            {/* Live Science Notification Badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-full w-fit text-xs font-semibold shadow-xs"
            >
              <Sparkles className="w-4.5 h-4.5 text-emerald-400" />
              <span>{hero.badgeText}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight"
            >
              {hero.headline} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                {hero.headlineGradient}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 justify-center"
            >
              <button
                id="hero-shop-now-btn"
                onClick={onShopNow}
                className="flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all text-sm group"
              >
                <span>{hero.shopButtonText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                id="hero-learn-science-btn"
                onClick={onLearnScience}
                className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl shadow-xs transition-all text-sm"
              >
                <span>{hero.scienceButtonText}</span>
              </button>
            </motion.div>

            {/* Clinical Certification / Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-lg mx-auto w-full text-center"
            >
              {hero.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col space-y-1">
                  <span className="font-display font-bold text-xl text-white">{stat.value}</span>
                  <span className="text-xs text-slate-400">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>

        {/* Brand Core Badges / Certification Icons banner */}
        <div className="mt-16 py-6 border-y border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex items-center justify-center space-x-3 text-slate-300">
            <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-medium tracking-wide">FDA COMPLIANT FORMULAS</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-medium tracking-wide">NON-GMO & ALLERGEN FREE</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-slate-300">
            <Award className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-medium tracking-wide">MADE IN THE USA</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-slate-300">
            <TrendingUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-medium tracking-wide">DNA-ALIGNED BIOAVAILABILITY</span>
          </div>
        </div>

        {/* Customer Review Highlights */}
        <div className="mt-16 text-center">
          <h2 className="font-display font-bold text-2xl text-white mb-8">
            Empowering Cellular Health Globally
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "The science-first philosophy really sold me. Seeing how the MnSOD gene variants impact mitochondria made me realize why generic vitamins didn't work for me. The Cell Defense formula has changed my daily stamina.",
                name: "Dr. Clara Jenkins",
                role: "Biochemist",
                stars: 5,
              },
              {
                text: "Being a carrier of the SLC23A1 transport variation, I always struggled with low vitamin C absorption. Molecure's buffered complex keeps me feeling active and resilient through winter seasons.",
                name: "Alexander K.",
                role: "Elite Triathlete",
                stars: 5,
              },
              {
                text: "Outstanding premium supplement experience. High-quality ingredients with fully explained clinical references. No exaggerated claims, just pure scientific formulation.",
                name: "Sophia L.",
                role: "Health Optimizer",
                stars: 5,
              },
            ].map((rev, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl text-left flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm italic mb-4">"{rev.text}"</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-2">
                  <span className="text-xs font-bold text-white">{rev.name}</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">{rev.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Sellers Shelf */}
        <div className="mt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 text-left">
            <div>
              <h2 className="font-display font-bold text-3xl text-white">
                Best Sellers Aligned to Your Genome
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Formulations addressing core absorption pathways and defense enzymes.
              </p>
            </div>
            <button
              id="hero-see-all-products-btn"
              onClick={onShopNow}
              className="mt-4 md:mt-0 flex items-center space-x-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Explore Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestSellers.map((prod) => (
              <div
                key={prod.id}
                className="glass-card rounded-3xl overflow-hidden hover:shadow-2xl hover:border-white/20 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div className={`p-6 bg-gradient-to-br ${prod.bgGradient} relative h-48 overflow-hidden flex items-center justify-center`}>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="h-32 w-32 object-contain rounded-2xl drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-emerald-400 border border-white/10 uppercase tracking-wider">
                    {prod.category}
                  </span>
                </div>

                {/* Info and Purchase */}
                <div className="p-6 text-left flex-grow flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => onProductSelect(prod)}
                      className="font-display font-bold text-lg text-white hover:text-emerald-400 cursor-pointer transition-colors line-clamp-1"
                    >
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 min-h-[32px]">{prod.tagline}</p>
                    
                    {/* Benefits bullet points */}
                    <ul className="mt-4 space-y-1.5">
                      {prod.benefits.slice(0, 2).map((b, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-display font-bold text-2xl text-white">
                        ${prod.price}
                      </span>
                      <div className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                        <span className="text-xs font-bold text-amber-300">{prod.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onProductSelect(prod)}
                        className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/5 rounded-xl text-xs font-semibold transition-colors"
                      >
                        Learn Science
                      </button>
                      <button
                        onClick={() => addToCart(prod, false)}
                        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-emerald-500/20"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
