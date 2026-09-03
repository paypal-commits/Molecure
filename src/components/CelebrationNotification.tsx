import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Check, ChevronRight, ShoppingBag, FlaskConical, Cpu } from "lucide-react";
import { Product } from "../types";

interface CelebrationNotificationProps {
  item: { product: Product; isSubscription: boolean } | null;
  onClose: () => void;
  onOpenCart: () => void;
}

// Generate unique scientific particles for the molecular dispersion effect
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export default function CelebrationNotification({
  item,
  onClose,
  onOpenCart,
}: CelebrationNotificationProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hudProgress, setHudProgress] = useState(0);

  useEffect(() => {
    if (item) {
      // Reset progress
      setHudProgress(0);

      // Generate 25 custom molecular dispersion particles
      const colors = ["#10b981", "#06b6d4", "#8b5cf6", "#3b82f6", "#14b8a6"];
      const newParticles = Array.from({ length: 25 }).map((_, i) => {
        // Calculate coordinate burst vector radiating outwards
        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 120;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: 4 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.15,
          duration: 0.8 + Math.random() * 0.8,
        };
      });
      setParticles(newParticles);

      // HUD loading scan line simulation
      const interval = setInterval(() => {
        setHudProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 4;
        });
      }, 30);

      // Auto dismiss after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    } else {
      setParticles([]);
    }
  }, [item, onClose]);

  if (!item) return null;

  const { product, isSubscription } = item;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-start justify-center sm:items-start sm:justify-end p-4 sm:p-6 overflow-hidden">
      {/* 1. MOLECULAR PARTICLE DISPERSION BURST (Centered screen overlay effect) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: 0,
                scale: [1, 1.2, 0],
                rotate: Math.random() * 360,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeOut",
              }}
              className="absolute rounded-full pointer-events-none flex items-center justify-center"
              style={{
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, ${p.color} 0%, rgba(255,255,255,0) 70%)`,
                boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}`,
              }}
            >
              {/* Occasional floating technical symbols inside particles */}
              {p.id % 5 === 0 && (
                <span className="text-[6px] font-mono font-bold text-white opacity-60">
                  +
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 2. HUD SCIENTIFIC DIAGNOSTIC TOAST CARD */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          exit={{ opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="pointer-events-auto w-full max-w-sm sm:max-w-md bg-slate-950/90 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl p-5 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden"
        >
          {/* Neon side accents */}
          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-indigo-600"></div>

          {/* Holographic grid scanner line */}
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: [0, 280, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent pointer-events-none"
            style={{ boxShadow: "0 0 8px #10b981" }}
          />

          {/* Header diagnostics line */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-mono text-emerald-400 tracking-widest font-bold uppercase flex items-center gap-1">
                <Cpu className="w-3 h-3 text-emerald-400" /> SEQUENCE_AUTH_OK
              </span>
            </div>
            <span className="text-[8px] font-mono text-slate-500">
              SYS_REF: {product.id.slice(0, 8).toUpperCase()}
            </span>
          </div>

          <div className="flex items-start space-x-4">
            {/* Visual Capsule Display */}
            <div className="relative flex-shrink-0">
              {/* Spinning active ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-emerald-500/20"
              />
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.bgGradient} p-2 border border-white/10 flex items-center justify-center relative overflow-hidden group`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-contain drop-shadow-lg"
                  referrerPolicy="no-referrer"
                />
                {/* Micro tech overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-emerald-500/10 to-transparent opacity-60"></div>
              </div>
              {/* Micro badge */}
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full shadow-md shadow-emerald-500/30 border border-slate-950 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 stroke-[4]" />
              </div>
            </div>

            {/* Notification content */}
            <div className="flex-grow text-left space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                {isSubscription ? "Subscription Active" : "Compound Formulated"}
              </span>
              <h4 className="font-display font-bold text-white text-base tracking-tight leading-tight">
                {product.name}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-1">
                {product.tagline}
              </p>
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-xs font-mono font-bold text-slate-300">
                  ${isSubscription ? Math.round(product.price * (1 - product.subscriptionDiscount / 100)) : product.price}
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase">
                  {isSubscription ? "Monthly Cycle" : "Single Dose"}
                </span>
              </div>
            </div>
          </div>

          {/* Scientific parameters & metrics */}
          <div className="mt-4 bg-white/[0.02] border border-white/5 rounded-2xl p-3 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-slate-400 flex items-center gap-1">
                <FlaskConical className="w-3 h-3 text-cyan-400" /> Dynamic Transport Bioavailability:
              </span>
              <span className="text-emerald-400 font-bold">OPTIMIZED (99.8%)</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-slate-400">Target Cellular Pathway:</span>
              <span className="text-white uppercase font-bold text-[9px]">{product.category} defense</span>
            </div>
            {/* System loader simulation */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[8px] font-mono text-slate-500">
                <span>FORMULATING COMPOUND MATRIX</span>
                <span>{hudProgress}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-500"
                  style={{ width: `${hudProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Footer Controls */}
          <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-2 gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 rounded-xl text-[10px] font-bold font-mono uppercase tracking-wider transition-all"
            >
              Resume Inspection
            </button>
            <button
              onClick={() => {
                onOpenCart();
                onClose();
              }}
              className="px-3 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-[10px] font-bold font-mono uppercase tracking-wider transition-all flex items-center justify-center space-x-1 shadow-lg shadow-emerald-500/20"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Dispense Cart</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
