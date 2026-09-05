import React, { useState } from "react";
import { Shield, Lock, Mail, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle, Key } from "lucide-react";
import { motion } from "motion/react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
}

export default function AdminLogin({ onLoginSuccess, onBackToSite, loginAdmin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both administrator email and password.");
      return;
    }

    setIsSubmitting(true);
    const result = await loginAdmin(email, password);
    setIsSubmitting(false);

    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.error || "Invalid administrator credentials.");
    }
  };

  const handleFillCredentials = () => {
    setEmail("pappuott@gmail.com");
    setPassword("Admin@2026");
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none opacity-30"></div>

      {/* Back button */}
      <button
        onClick={onBackToSite}
        className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center space-x-2 text-slate-400 hover:text-white text-xs font-semibold py-2 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Website</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10"
      >
        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
            <Shield className="w-8 h-8" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
            RESTRICTED ACCESS
          </span>
          <h1 className="font-display font-bold text-2xl text-white mt-3 tracking-tight">
            Molecure Administrative Portal
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Authenticate to manage store products, scientific database, research papers, and pages.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start space-x-3 text-rose-300 text-xs"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Admin Email ID
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                id="admin-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                autoComplete="off"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Security Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                id="admin-password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
                required
                className="w-full pl-10 pr-11 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            id="admin-login-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <span className="inline-block animate-spin w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full"></span>
            ) : (
              <>
                <Key className="w-4 h-4" />
                <span>Authorize & Enter Admin Panel</span>
              </>
            )}
          </button>
        </form>

        {/* Quick fill shortcut for tester convenience */}
        <div className="mt-6 pt-6 border-t border-white/5 flex flex-col items-center">
          <button
            type="button"
            onClick={handleFillCredentials}
            className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 transition-colors"
          >
            Auto-fill authorized credentials
          </button>
        </div>
      </motion.div>
    </div>
  );
}
