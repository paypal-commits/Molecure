import React, { useState, useEffect } from "react";
import { ArrowUp, Sparkles, CheckCircle2, ShieldCheck, Heart, ShoppingBag, Eye, Calendar } from "lucide-react";

// Import custom page & layout components
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import PersonalizationQuiz from "./components/PersonalizationQuiz";
import TheScience from "./components/TheScience";
import Products from "./components/Products";
import ResearchCenter from "./components/ResearchCenter";
import Blog from "./components/Blog";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import About from "./components/About";
import CartDrawer from "./components/CartDrawer";
import Chatbot from "./components/Chatbot";
import CelebrationNotification from "./components/CelebrationNotification";

// Import data matrices & type definitions
import { PRODUCTS, RESEARCH_ARTICLES, BLOG_POSTS, FAQ_ITEMS } from "./data/molecureData";
import { Product, CartItem } from "./types";

export default function App() {
  const [activePage, setActivePage] = useState<string>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [recentAddedItem, setRecentAddedItem] = useState<{ product: Product; isSubscription: boolean } | null>(null);

  // Scroll to top visibility state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Smooth scroll check
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // State actions
  const addToCart = (product: Product, isSub: boolean) => {
    // Clear first to re-trigger animation if adding same item sequentially
    setRecentAddedItem(null);
    setTimeout(() => {
      setRecentAddedItem({ product, isSubscription: isSub });
    }, 50);

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.isSubscription === isSub
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { product, quantity: 1, isSubscription: isSub }];
      }
    });
  };

  const updateQuantity = (id: string, isSub: boolean, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === id && item.isSubscription === isSub
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const removeFromCart = (id: string, isSub: boolean) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === id && item.isSubscription === isSub))
    );
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleProductSelect = (product: Product) => {
    setActiveProduct(product);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 4);
    });
  };

  const handleSelectResult = (product: Product) => {
    handleProductSelect(product);
  };

  // Nav page redirection wrapper
  const navigateTo = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans select-none antialiased relative overflow-x-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[45%] h-[45%] bg-blue-600 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
      </div>
      
      {/* Top Banner Disclaimer */}
      <div className="bg-slate-950/80 backdrop-blur-md text-slate-300 py-2.5 px-4 text-center text-[10px] sm:text-xs border-b border-white/5 relative z-10">
        <span className="font-mono font-bold text-emerald-400 mr-2">FDA NOTICE:</span>
        These statements have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent any disease.
      </div>

      {/* Navigation Header */}
      <Navigation
        activeTab={activePage}
        setActiveTab={navigateTo}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        toggleCart={() => setIsCartOpen(true)}
        toggleWishlist={() => navigateTo("products")}
        products={PRODUCTS}
        onProductSelect={handleProductSelect}
        startPersonalizationQuiz={() => navigateTo("quiz")}
      />

      {/* Main Routing Stage */}
      <main className="flex-grow relative z-10">
        {activePage === "home" && (
          <div className="space-y-4">
            <Hero
              onShopNow={() => navigateTo("products")}
              onLearnScience={() => navigateTo("science")}
              bestSellers={PRODUCTS}
              onProductSelect={handleProductSelect}
              addToCart={addToCart}
            />
            {/* Embedded Mini TheScience summary in home page */}
            <div className="py-20 bg-white/5 backdrop-blur-xl border-y border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md uppercase">
                      THE GENETIC EQUATION
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-4 tracking-tight leading-tight">
                      Why Generic Vitamins Fail Your Antioxidant Defenses
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                      Studies show that common polymorphisms (like MnSOD Val16Ala rs4880) restrict enzyme entry into mitochondrial space, leaving cell DNA vulnerable to oxidative decay. Regular supplements can't target these transport limitations.
                    </p>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2">
                      Molecure delivers precise, bioavailable manganese and selenium chelates suspended in active lipid matrices, utilizing secondary pathways to bypass genetic bottlenecks.
                    </p>
                    <button
                      onClick={() => navigateTo("science")}
                      className="mt-6 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-bold transition-all inline-block shadow-lg shadow-emerald-500/20"
                    >
                      Read Clinical Proof
                    </button>
                  </div>
                  <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
                    <h4 className="font-display font-bold text-sm text-white uppercase">Cofactor Active Synergies</h4>
                    {[
                      { marker: "MnSOD / SOD2", cofactor: "Manganese Bisglycinate Chelate", role: "Fuels endogenous superoxide dismutation inside mitochondria." },
                      { marker: "GPX1-3 / Selenium", cofactor: "L-Selenomethionine matrix", role: "Fuels cellular peroxide neutralization to safe water molecules." },
                      { marker: "SVCT1 / Vitamin C", cofactor: "Buffered Calcium Ascorbate + Lipids", role: "Bypasses transport blockages, maximizing systemic absorption." }
                    ].map((row, idx) => (
                      <div key={idx} className="flex items-start space-x-4 p-3 hover:bg-white/5 rounded-xl transition-colors">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md flex-shrink-0">
                          {row.marker}
                        </span>
                        <div>
                          <h5 className="text-xs font-bold text-white">{row.cofactor}</h5>
                          <p className="text-[11px] text-slate-400 mt-0.5">{row.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === "science" && <TheScience />}

        {activePage === "products" && (
          <Products
            products={PRODUCTS}
            activeProduct={activeProduct}
            setActiveProduct={setActiveProduct}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            recentlyViewed={recentlyViewed}
            onProductSelect={handleProductSelect}
          />
        )}

        {activePage === "research" && <ResearchCenter articles={RESEARCH_ARTICLES} />}

        {activePage === "blog" && <Blog posts={BLOG_POSTS} />}

        {activePage === "faq" && <FAQ items={FAQ_ITEMS} />}

        {activePage === "about" && <About />}

        {activePage === "contact" && <Contact />}

        {activePage === "quiz" && (
          <div className="py-12 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PersonalizationQuiz
                products={PRODUCTS}
                onQuizClose={() => navigateTo("products")}
                onSelectResult={handleSelectResult}
                addToCart={addToCart}
              />
            </div>
          </div>
        )}
      </main>

      {/* Centered Premium Footer containing the requested link */}
      <footer className="bg-slate-950/40 backdrop-blur-md text-slate-400 py-12 border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.05),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          
          <div className="flex justify-center items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="font-display font-bold text-xl text-white tracking-tight">Molecure</span>
          </div>

          <p className="text-xs max-w-md mx-auto text-slate-500 leading-relaxed">
            Clinically formulated nutrigenomic supplements supporting cellular redox balance, endogenous mitochondrial enzymes, and healthy aging pathways.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <button onClick={() => navigateTo("about")} className="hover:text-white transition-colors">Our Philosophy</button>
            <button onClick={() => navigateTo("science")} className="hover:text-white transition-colors">Interactive Science</button>
            <button onClick={() => navigateTo("products")} className="hover:text-white transition-colors">Products</button>
            <button onClick={() => navigateTo("research")} className="hover:text-white transition-colors">Research</button>
            <button onClick={() => navigateTo("faq")} className="hover:text-white transition-colors">FDA FAQs</button>
          </div>

          <div className="pt-6 border-t border-white/5 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span>© 2026 Molecure Inc. All rights reserved.</span>
            <span>
              Developed by{" "}
              <a
                href="https://iwebnext.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 hover:underline font-semibold"
              >
                iWebNext
              </a>
            </span>
          </div>

        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          id="scroll-to-top-btn"
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 p-3.5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full border border-white/10 shadow-2xl transition-all duration-300 hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-emerald-400" />
        </button>
      )}

      {/* Floating Chatbot Widget */}
      <Chatbot />

      {/* Sliding Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      {/* Modern Scientific Celebration Notification */}
      <CelebrationNotification
        item={recentAddedItem}
        onClose={() => setRecentAddedItem(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />

    </div>
  );
}
