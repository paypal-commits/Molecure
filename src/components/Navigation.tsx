import React, { useState } from "react";
import { Search, ShoppingBag, Heart, Menu, X, Dna, ArrowRight, Activity, BookOpen, User, Sparkles, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  toggleCart: () => void;
  toggleWishlist: () => void;
  products: Product[];
  onProductSelect: (product: Product) => void;
  startPersonalizationQuiz: () => void;
}

export default function Navigation({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  toggleCart,
  toggleWishlist,
  products,
  onProductSelect,
  startPersonalizationQuiz,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", name: "Home" },
    { id: "science", name: "The Science" },
    { id: "products", name: "Therapeutic Compounds" },
    { id: "research", name: "NutriGenDB Database" },
    { id: "about", name: "Dec0ded Clinic" },
    { id: "blog", name: "Science Insights" },
    { id: "faq", name: "FAQ" },
    { id: "contact", name: "Contact" },
  ];

  const filteredProducts = searchQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSelect = (product: Product) => {
    onProductSelect(product);
    setSearchQuery("");
    setSearchOpen(false);
  };

  return (
    <nav
      id="main-navigation"
      className="sticky top-0 z-40 w-full transition-all duration-300 bg-slate-950/40 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18">
          {/* Logo and Brand Identity */}
          <div className="flex items-center">
            <button
              id="brand-logo-btn"
              onClick={() => setActiveTab("home")}
              className="flex items-center space-x-2 text-white focus:outline-hidden group"
            >
              <div className="p-1 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors overflow-hidden w-10 h-10 flex items-center justify-center">
                <img
                  src="https://sf5jobmydr0lqlek.public.blob.vercel-storage.com/Upscale_logo_quality_enhance_2K_202607132201.jpeg"
                  alt="Molecure Logo"
                  className="w-8 h-8 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Molecure
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-1 items-center">
            {menuItems.map((item) => (
              <button
                id={`nav-item-${item.id}`}
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMegaMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "text-emerald-400 bg-white/5 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Utility / Ecommerce Icons */}
          <div className="flex items-center space-x-2">
            {/* Search Toggle */}
            <div className="relative">
              <button
                id="search-toggle-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Search Supplements"
              >
                <Search className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-slate-950/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-4 z-50 overflow-hidden"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search formulas or ingredients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-slate-900 transition-all"
                        autoFocus
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {searchQuery && (
                      <div className="mt-3 max-h-60 overflow-y-auto divide-y divide-white/5 no-scrollbar">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => handleSearchSelect(p)}
                              className="w-full py-2.5 px-2 text-left hover:bg-white/5 rounded-lg flex items-center space-x-3 transition-colors"
                            >
                              <img
                                src={p.image}
                                alt={p.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-white/10"
                              />
                              <div>
                                <h4 className="text-xs font-semibold text-slate-200">
                                  {p.name}
                                </h4>
                                <p className="text-[10px] text-slate-400 truncate max-w-[180px]">
                                  {p.tagline}
                                </p>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="py-4 text-center text-xs text-slate-400">
                            No molecular formulas found.
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Smart Assessment Quiz Quick Link */}
            <button
              id="navbar-quiz-btn"
              onClick={startPersonalizationQuiz}
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition-all group"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>DNA Match</span>
            </button>

            {/* Wishlist Link */}
            <button
              id="wishlist-toggle-btn"
              onClick={toggleWishlist}
              className="p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Link */}
            <button
              id="cart-toggle-btn"
              onClick={toggleCart}
              className="p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-500 text-slate-950 rounded-full text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Portal Quick Access */}
            <button
              id="navbar-admin-btn"
              onClick={() => setActiveTab("admin")}
              className={`p-2.5 rounded-xl transition-colors relative ${
                activeTab === "admin"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "hover:bg-white/10 text-slate-400 hover:text-white"
              }`}
              title="Admin Content Manager"
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>

            {/* Mobile Menu Icon */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 lg:hidden rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slider */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl overflow-hidden shadow-inner"
          >
            <div className="px-4 pt-2 pb-6 space-y-1.5">
              {menuItems.map((item) => (
                <button
                  id={`mobile-nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? "text-emerald-400 bg-white/5 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  id="mobile-nav-quiz-btn"
                  onClick={() => {
                    startPersonalizationQuiz();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 bg-emerald-500 text-slate-950 rounded-xl text-sm font-bold shadow-lg"
                >
                  <span className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Take DNA Personalization Quiz</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="mobile-nav-admin-btn"
                  onClick={() => {
                    setActiveTab("admin");
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === "admin"
                      ? "text-emerald-400 bg-white/5 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Admin Content Panel</span>
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400">
                    Restricted
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
