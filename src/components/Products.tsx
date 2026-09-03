import React, { useState } from "react";
import { Star, CheckCircle2, ShoppingCart, Heart, RefreshCw, X, Filter, Plus, Shield, Check } from "lucide-react";
import { Product } from "../types";

interface ProductsProps {
  products: Product[];
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;
  addToCart: (product: Product, isSub: boolean) => void;
  toggleWishlist: (product: Product) => void;
  wishlist: string[];
  recentlyViewed: Product[];
  onProductSelect: (product: Product) => void;
}

export default function Products({
  products,
  activeProduct,
  setActiveProduct,
  addToCart,
  toggleWishlist,
  wishlist,
  recentlyViewed,
  onProductSelect,
}: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSubscription, setIsSubscription] = useState<Record<string, boolean>>({}); // tracking sub toggle per product card

  // Comparison State
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState<boolean>(false);

  const categories = [
    { id: "all", name: "All Formulations" },
    { id: "cellular", name: "Cellular Defense" },
    { id: "mitochondrial", name: "Mitochondrial Energy" },
    { id: "defense", name: "Endogenous Enzymes" },
    { id: "personalized", name: "Bespoke Personalized" },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scientificExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((cid) => cid !== id));
    } else {
      if (compareIds.length >= 3) {
        alert("You can compare up to 3 formulas simultaneously.");
        return;
      }
      setCompareIds([...compareIds, id]);
    }
  };

  const handleSubToggle = (productId: string, value: boolean) => {
    setIsSubscription((prev) => ({ ...prev, [productId]: value }));
  };

  return (
    <div id="products-section" className="py-12 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
              REDOX CATALOG
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mt-4 tracking-tight">
              Evidence-Based Nutritional Solutions
            </h1>
            <p className="text-slate-300 mt-2 text-sm sm:text-base">
              Pure cofactors and bioflavonoid synergistic complexes optimized for target cell transport.
            </p>
          </div>

          {/* Comparison Toggle button */}
          <button
            id="compare-mode-toggle-btn"
            onClick={() => {
              setCompareMode(!compareMode);
              if (compareMode) setCompareIds([]);
            }}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              compareMode
                ? "bg-emerald-500 border-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/10"
                : "bg-white/5 border-white/10 text-slate-100 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${compareMode ? "animate-spin" : ""}`} />
            <span>{compareMode ? "Cancel Comparison" : "Compare Formulas"}</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
          <div className="lg:col-span-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                id={`filter-${cat.id}`}
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
                    : "bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="lg:col-span-4 relative">
            <input
              type="text"
              placeholder="Search components, enzymes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all placeholder-slate-500"
            />
          </div>
        </div>

        {/* COMPARED DRAWER OR MATRIX (If active) */}
        {compareMode && compareIds.length > 0 && (
          <div className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl mb-12 text-left animate-fadeIn">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <h3 className="font-display font-bold text-lg text-white">
                Formula Comparison Matrix ({compareIds.length}/3)
              </h3>
              <button
                onClick={() => setCompareIds([])}
                className="text-xs font-bold text-slate-400 hover:text-white"
              >
                Clear Matrix
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
              <div className="hidden md:flex flex-col justify-between text-slate-400 font-mono text-[10px] uppercase font-bold py-4 space-y-4">
                <div className="h-24">Formula Profile</div>
                <div className="border-t border-white/5 pt-4">Category</div>
                <div className="border-t border-white/5 pt-4">MSRP Price</div>
                <div className="border-t border-white/5 pt-4">Target Pathway</div>
                <div className="border-t border-white/5 pt-4">Primary Cofactors</div>
                <div className="border-t border-white/5 pt-4">DNA Bottleneck</div>
              </div>

              {compareIds.map((cid) => {
                const prod = products.find((p) => p.id === cid);
                if (!prod) return null;
                return (
                  <div key={prod.id} className="border border-white/10 rounded-2xl p-4 bg-white/5 flex flex-col justify-between relative group">
                    <button
                      onClick={() => toggleCompare(prod.id)}
                      className="absolute top-3 right-3 p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-slate-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="h-24 flex items-center space-x-3">
                      <img src={prod.image} alt={prod.name} className="w-12 h-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-2">{prod.name}</h4>
                        <span className="text-[10px] text-emerald-400 font-mono">{prod.category}</span>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-2">
                      <span className="md:hidden text-[9px] text-slate-400 font-mono block uppercase">Category</span>
                      <span className="text-xs font-bold text-slate-300 uppercase">{prod.category}</span>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-2">
                      <span className="md:hidden text-[9px] text-slate-400 font-mono block uppercase">Price</span>
                      <span className="text-lg font-bold text-white">${prod.price}</span>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-2">
                      <span className="md:hidden text-[9px] text-slate-400 font-mono block uppercase">Target Pathway</span>
                      <span className="text-xs text-slate-300 line-clamp-2">{prod.tagline}</span>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-2">
                      <span className="md:hidden text-[9px] text-slate-400 font-mono block uppercase">Primary Cofactors</span>
                      <span className="text-xs text-slate-300 line-clamp-3 font-medium">
                        {prod.ingredients.map((i) => i.name).join(", ")}
                      </span>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-2 flex-grow">
                      <span className="md:hidden text-[9px] text-slate-400 font-mono block uppercase">DNA Bottleneck</span>
                      <span className="text-[11px] text-slate-400 italic leading-relaxed line-clamp-3">
                        {prod.scientificExplanation}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(prod, false)}
                      className="w-full mt-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/20"
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => {
            const hasSub = isSubscription[prod.id] || false;
            const finalPrice = hasSub ? prod.price * (1 - prod.subscriptionDiscount / 100) : prod.price;
            const isWishlisted = wishlist.includes(prod.id);

            return (
              <div
                key={prod.id}
                className="glass-card rounded-3xl overflow-hidden hover:shadow-2xl hover:border-white/20 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Image and quick details */}
                <div className={`p-6 bg-gradient-to-br ${prod.bgGradient} relative h-56 overflow-hidden flex items-center justify-center`}>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="h-36 w-36 object-contain rounded-2xl drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex space-x-1.5">
                    {compareMode && (
                      <button
                        onClick={() => toggleCompare(prod.id)}
                        className={`px-2.5 py-1 rounded-full text-[9px] font-bold font-mono border uppercase tracking-wider transition-colors ${
                          compareIds.includes(prod.id)
                            ? "bg-emerald-500 border-emerald-500 text-slate-950 font-bold"
                            : "bg-slate-950/90 border-white/10 text-slate-300 hover:bg-slate-900"
                        }`}
                      >
                        {compareIds.includes(prod.id) ? "Selected" : "Compare"}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => toggleWishlist(prod)}
                    className="absolute top-4 right-4 p-2 bg-slate-950/80 backdrop-blur-md rounded-full border border-white/10 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
                  </button>

                  <span className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-mono font-bold text-emerald-400 border border-white/10 uppercase tracking-wider">
                    {prod.category}
                  </span>
                </div>

                {/* Content */}
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
                      {prod.benefits.slice(0, 3).map((b, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Purchase mechanism */}
                  <div className="mt-6 pt-4 border-t border-white/5">
                    
                    {/* Subscription / One-time toggle */}
                    <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-xl mb-4 text-xs font-bold border border-white/5">
                      <button
                        onClick={() => handleSubToggle(prod.id, false)}
                        className={`py-1.5 rounded-lg text-[10px] transition-all ${
                          !hasSub ? "bg-white/10 text-white shadow-xs" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        One-Time Buy
                      </button>
                      <button
                        onClick={() => handleSubToggle(prod.id, true)}
                        className={`py-1.5 rounded-lg text-[10px] transition-all flex items-center justify-center space-x-1 ${
                          hasSub ? "bg-emerald-500 text-slate-950 shadow-xs" : "text-emerald-400 hover:text-emerald-300"
                        }`}
                      >
                        <span>Subscribe</span>
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/10 px-1 py-0.2 rounded font-mono">
                          -{prod.subscriptionDiscount}%
                        </span>
                      </button>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="flex items-baseline space-x-1.5">
                          <span className="font-display font-bold text-2xl text-white">
                            ${Math.round(finalPrice)}
                          </span>
                          {hasSub && (
                            <span className="text-[10px] text-slate-400 line-through font-mono">
                              ${prod.price}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] text-slate-400 block font-mono">
                          {hasSub ? "DELIVERED MONTHLY" : "SINGLE PURCHASE"}
                        </span>
                      </div>

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
                        Scientific Profile
                      </button>
                      <button
                        onClick={() => addToCart(prod, hasSub)}
                        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-1"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* RECENTLY VIEWED PRODUCTS SHELF */}
        {recentlyViewed.length > 0 && (
          <div className="mt-20 text-left border-t border-white/5 pt-12">
            <h3 className="font-display font-bold text-lg text-white mb-6">
              Recently Inspected Formulas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {recentlyViewed.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  onClick={() => onProductSelect(p)}
                  className="bg-white/5 border border-white/10 p-4 rounded-2xl cursor-pointer hover:border-white/20 transition-all flex items-center space-x-3 group"
                >
                  <div className={`p-2 bg-gradient-to-br ${p.bgGradient} rounded-xl`}>
                    <img src={p.image} alt={p.name} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                      {p.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">${p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* DETAILED PRODUCT INFORMATION MODAL */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-6 sm:p-8 text-left shadow-2xl animate-scaleIn no-scrollbar">
            
            {/* Close */}
            <button
              id="product-modal-close-btn"
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 p-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-full transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Product Visual */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className={`p-8 bg-gradient-to-br ${activeProduct.bgGradient} rounded-3xl w-full flex items-center justify-center mb-6 border border-white/10`}>
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    referrerPolicy="no-referrer"
                    className="h-56 object-contain rounded-2xl drop-shadow-2xl animate-float"
                  />
                </div>
                
                {/* Specific features badges */}
                <div className="w-full space-y-2">
                  {activeProduct.features.map((f, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-slate-300 bg-white/5 px-3.5 py-2 rounded-xl border border-white/5">
                      <Check className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                      <span className="font-semibold">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Content Details */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase">
                    {activeProduct.category} path-aligned
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-3 tracking-tight">
                    {activeProduct.name}
                  </h2>
                  <p className="text-sm text-slate-300 font-medium mt-1">
                    {activeProduct.tagline}
                  </p>
                </div>

                {/* Rating summary */}
                <div className="flex items-center space-x-4 bg-white/5 px-4 py-2 rounded-xl border border-white/5 w-fit">
                  <div className="flex items-center text-amber-400 space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-300">{activeProduct.rating} / 5 ({activeProduct.reviewsCount} verified audits)</span>
                </div>

                {/* Benefits List */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Primary Benefits</h4>
                  <ul className="space-y-2">
                    {activeProduct.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ingredients details (Clinical Realism) */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3">Formula Ingredients & Biological Action</h4>
                  <div className="space-y-3 divide-y divide-white/5">
                    {activeProduct.ingredients.map((ing, i) => (
                      <div key={i} className={`pt-3 text-xs ${i === 0 ? "pt-0" : ""}`}>
                        <div className="flex justify-between font-semibold text-white">
                          <span>{ing.name} ({ing.form})</span>
                          <span className="font-mono text-emerald-400">{ing.dose}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          <strong>Physiological Role:</strong> {ing.function}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scientific Justification based on our uploaded paper */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Clinical Pathway Justification</h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 italic">
                    "{activeProduct.scientificExplanation}"
                  </p>
                </div>

                {/* Suggested Use & Warnings */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                    <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase">Suggested Use</h5>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeProduct.suggestedUse}</p>
                  </div>
                  <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
                    <h5 className="text-[10px] font-mono font-bold text-rose-300 uppercase">Safety Warnings</h5>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeProduct.warnings}</p>
                  </div>
                </div>

                {/* Purchase in modal */}
                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-left w-full sm:w-auto">
                    <span className="text-xs text-slate-400 block font-mono">SUPPLEMENT PRICE</span>
                    <span className="font-display font-bold text-3xl text-white">${activeProduct.price}</span>
                  </div>
                  <div className="flex space-x-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        addToCart(activeProduct, false);
                        setActiveProduct(null);
                      }}
                      className="flex-grow sm:flex-grow-0 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/10"
                    >
                      Add Single Buy
                    </button>
                    <button
                      onClick={() => {
                        addToCart(activeProduct, true);
                        setActiveProduct(null);
                      }}
                      className="flex-grow sm:flex-grow-0 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
                    >
                      Subscribe & Save 15%
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
