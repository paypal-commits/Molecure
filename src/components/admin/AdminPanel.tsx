import React, { useState } from "react";
import {
  Shield,
  LayoutDashboard,
  Package,
  BookOpen,
  FileText,
  HelpCircle,
  Layers,
  Image as ImageIcon,
  LogOut,
  Globe,
  Plus,
  Edit2,
  Trash2,
  Search,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { useContent } from "../../context/ContentContext";
import AdminLogin from "./AdminLogin";
import ProductEditorModal from "./ProductEditorModal";
import ArticleEditorModal from "./ArticleEditorModal";
import PostEditorModal from "./PostEditorModal";
import FaqEditorModal from "./FaqEditorModal";
import MediaManager from "./MediaManager";
import PageContentEditor from "./PageContentEditor";
import { Product, ResearchArticle, BlogPost, FAQItem } from "../../types";

interface AdminPanelProps {
  onBackToSite: () => void;
}

export default function AdminPanel({ onBackToSite }: AdminPanelProps) {
  const {
    content,
    isAdminAuthenticated,
    adminUser,
    loginAdmin,
    logoutAdmin,
    resetContent,
    addProduct,
    updateProduct,
    deleteProduct,
    addArticle,
    updateArticle,
    deleteArticle,
    addPost,
    updatePost,
    deletePost,
    addFaq,
    updateFaq,
    deleteFaq,
    updateHero,
    updateScience,
    updateAbout,
    updateContact,
    addMediaAsset,
    deleteMediaAsset,
    uploadImage,
  } = useContent();

  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "articles" | "posts" | "faqs" | "pages" | "media"
  >("overview");

  // Search queries
  const [productSearch, setProductSearch] = useState("");
  const [articleSearch, setArticleSearch] = useState("");
  const [postSearch, setPostSearch] = useState("");
  const [faqSearch, setFaqSearch] = useState("");

  // Modals state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [editingArticle, setEditingArticle] = useState<ResearchArticle | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  // Delete confirmation modal state
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: "product" | "article" | "post" | "faq" | "media";
    id: string;
    title: string;
  } | null>(null);

  // Reset confirmation state
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Toast notification
  const [notification, setNotification] = useState<string | null>(null);
  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // If not logged in, render the login screen
  if (!isAdminAuthenticated) {
    return (
      <AdminLogin
        loginAdmin={loginAdmin}
        onLoginSuccess={() => triggerNotification("Welcome to Molecure Admin Portal.")}
        onBackToSite={onBackToSite}
      />
    );
  }

  // Deletion execute
  const handleConfirmDelete = async () => {
    if (!deleteConfirmation) return;
    const { type, id } = deleteConfirmation;

    if (type === "product") {
      await deleteProduct(id);
      triggerNotification("Product deleted successfully.");
    } else if (type === "article") {
      await deleteArticle(id);
      triggerNotification("Research article deleted.");
    } else if (type === "post") {
      await deletePost(id);
      triggerNotification("Blog post deleted.");
    } else if (type === "faq") {
      await deleteFaq(id);
      triggerNotification("FAQ item deleted.");
    } else if (type === "media") {
      await deleteMediaAsset(id);
      triggerNotification("Media asset deleted.");
    }

    setDeleteConfirmation(null);
  };

  // Reset factory defaults execute
  const handleResetFactory = async () => {
    await resetContent();
    setShowResetConfirm(false);
    triggerNotification("All site content has been reset to initial factory data.");
  };

  // Filtered lists
  const filteredProducts = content.products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.tagline.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredArticles = content.articles.filter(
    (a) =>
      a.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      a.geneInvolved.toLowerCase().includes(articleSearch.toLowerCase()) ||
      a.citation.toLowerCase().includes(articleSearch.toLowerCase())
  );

  const filteredPosts = content.posts.filter(
    (p) =>
      p.title.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.author.toLowerCase().includes(postSearch.toLowerCase())
  );

  const filteredFaqs = content.faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.answer.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.category.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 p-4 bg-emerald-500 text-slate-950 rounded-2xl shadow-2xl font-semibold text-xs flex items-center space-x-2 animate-slide-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-bold text-base text-white tracking-tight">
                Molecure Admin Portal
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                SUPER ADMIN
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Logged in as <span className="text-slate-200 font-medium">{adminUser?.email}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onBackToSite}
            className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-white/10 transition-colors flex items-center space-x-1.5"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>View Live Site</span>
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-xl text-xs font-semibold border border-rose-500/20 transition-colors flex items-center space-x-1"
            title="Reset all content to original defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-rose-400 rounded-xl text-xs font-semibold border border-white/10 transition-colors flex items-center space-x-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-3 space-y-1 sticky top-20">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-3 py-1.5 block font-bold">
              WEBSITE SECTIONS
            </span>

            {[
              { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard, count: null },
              { id: "products", label: "Products & Formulas", icon: Package, count: content.products.length },
              { id: "articles", label: "NutriGenDB Research", icon: BookOpen, count: content.articles.length },
              { id: "posts", label: "Science Insights Blog", icon: FileText, count: content.posts.length },
              { id: "faqs", label: "FAQ Knowledge Base", icon: HelpCircle, count: content.faqs.length },
              { id: "pages", label: "Pages Content (Hero, etc.)", icon: Layers, count: null },
              { id: "media", label: "Images & Media Library", icon: ImageIcon, count: content.media.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </span>
                  {tab.count !== null && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        isActive
                          ? "bg-slate-950/20 text-slate-950"
                          : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 min-w-0">
          {/* ================= 1. OVERVIEW DASHBOARD ================= */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="p-6 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 rounded-3xl border border-emerald-500/20 relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    CENTRAL CONTENT MANAGEMENT SYSTEM
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-3">
                    Welcome to the Molecure Site Manager
                  </h2>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    You have complete administrative authority to add, update, and delete all therapeutic compounds, clinical research studies, blog articles, page copywriting, and high-resolution imagery. Every change you make immediately updates the live production site.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setIsProductModalOpen(true);
                      }}
                      className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Product</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditingArticle(null);
                        setIsArticleModalOpen(true);
                      }}
                      className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-xs flex items-center space-x-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Research Study</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("media")}
                      className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-xs flex items-center space-x-1.5"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Upload Images</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab("products")}
                  className="p-5 bg-slate-900/70 border border-white/10 rounded-2xl cursor-pointer hover:border-emerald-500/40 transition-all group"
                >
                  <div className="flex justify-between items-center text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Products</span>
                    <Package className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-3xl font-bold text-white font-display">
                    {content.products.length}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Live formulas</p>
                </div>

                <div
                  onClick={() => setActiveTab("articles")}
                  className="p-5 bg-slate-900/70 border border-white/10 rounded-2xl cursor-pointer hover:border-emerald-500/40 transition-all group"
                >
                  <div className="flex justify-between items-center text-slate-400 mb-2">
                    <span className="text-xs font-semibold">NutriGenDB</span>
                    <BookOpen className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-3xl font-bold text-white font-display">
                    {content.articles.length}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Clinical studies</p>
                </div>

                <div
                  onClick={() => setActiveTab("posts")}
                  className="p-5 bg-slate-900/70 border border-white/10 rounded-2xl cursor-pointer hover:border-emerald-500/40 transition-all group"
                >
                  <div className="flex justify-between items-center text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Science Insights</span>
                    <FileText className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-3xl font-bold text-white font-display">
                    {content.posts.length}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Published articles</p>
                </div>

                <div
                  onClick={() => setActiveTab("media")}
                  className="p-5 bg-slate-900/70 border border-white/10 rounded-2xl cursor-pointer hover:border-emerald-500/40 transition-all group"
                >
                  <div className="flex justify-between items-center text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Media Assets</span>
                    <ImageIcon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-3xl font-bold text-white font-display">
                    {content.media.length}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Stored images</p>
                </div>
              </div>

              {/* Quick Products Preview */}
              <div className="bg-slate-900/70 border border-white/10 rounded-3xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-bold text-white">Current Products in Store</h3>
                    <p className="text-xs text-slate-400">Manage catalog numbers, pricing, and active ingredients.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("products")}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.products.slice(0, 4).map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3 bg-slate-950/60 rounded-2xl border border-white/5 flex items-center justify-between gap-3 hover:border-emerald-500/20 transition-all"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-900 border border-white/10 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{prod.name}</h4>
                          <p className="text-[10px] text-slate-400 truncate">${prod.price} • {prod.category}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setIsProductModalOpen(true);
                        }}
                        className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center space-x-1 flex-shrink-0"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. PRODUCTS TAB ================= */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 p-5 rounded-2xl border border-white/10">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    Therapeutic Compounds & Supplements
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Add new botanical cofactors, update catalog codes, dosages, images, and pricing.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsProductModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Compound</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by title, category, or benefit..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Products Table / Cards */}
              <div className="space-y-3">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 bg-slate-900/70 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-500/30 transition-all"
                  >
                    <div className="flex items-center space-x-4 min-w-0 flex-1">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-950 border border-white/10 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-white truncate">{prod.name}</h4>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                            {prod.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{prod.tagline}</p>
                        <div className="flex items-center space-x-4 mt-2 text-[11px] text-slate-400 font-mono">
                          <span className="text-white font-bold">${prod.price}</span>
                          <span>★ {prod.rating} ({prod.reviewsCount} reviews)</span>
                          <span>{prod.ingredients.length} Active Ingredients</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center">
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setIsProductModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() =>
                          setDeleteConfirmation({
                            type: "product",
                            id: prod.id,
                            title: prod.name,
                          })
                        }
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 3. RESEARCH ARTICLES TAB ================= */}
          {activeTab === "articles" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 p-5 rounded-2xl border border-white/10">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    NutriGenDB Clinical Studies
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage evidence-backed nutrigenomic literature, gene variants, biomarkers, and citations.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingArticle(null);
                    setIsArticleModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Research Study</span>
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  placeholder="Search articles by title, gene (e.g. MnSOD), or citation..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-3">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    className="p-5 bg-slate-900/70 border border-white/10 rounded-2xl space-y-3 hover:border-emerald-500/30 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                          {art.geneInvolved}
                        </span>
                        <h4 className="text-sm font-bold text-white">{art.title}</h4>
                      </div>
                      <div className="flex items-center space-x-2 self-end sm:self-auto">
                        <button
                          onClick={() => {
                            setEditingArticle(art);
                            setIsArticleModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() =>
                            setDeleteConfirmation({
                              type: "article",
                              id: art.id,
                              title: art.title,
                            })
                          }
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{art.summary}</p>
                    <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-2 border-t border-white/5">
                      <span><strong>Dietary Factor:</strong> {art.dietaryFactor}</span>
                      <span><strong>Reference:</strong> {art.clinicalReference}</span>
                      <span className="text-emerald-400 font-mono"><strong>Citation:</strong> {art.citation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 4. BLOG & SCIENCE INSIGHTS TAB ================= */}
          {activeTab === "posts" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 p-5 rounded-2xl border border-white/10">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    Science Insights Articles
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Publish educational blog posts regarding cellular longevity, free radicals, and nutrigenomics.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setIsPostModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Post</span>
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={postSearch}
                  onChange={(e) => setPostSearch(e.target.value)}
                  placeholder="Search articles by title, author, or category..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-3">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 bg-slate-900/70 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-500/30 transition-all"
                  >
                    <div className="flex items-center space-x-4 min-w-0 flex-1">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-950 border border-white/10 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-white truncate">{post.title}</h4>
                          <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                            {post.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 mt-1.5 text-[11px] text-slate-500">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center">
                      <button
                        onClick={() => {
                          setEditingPost(post);
                          setIsPostModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() =>
                          setDeleteConfirmation({
                            type: "post",
                            id: post.id,
                            title: post.title,
                          })
                        }
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 5. FAQS TAB ================= */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 p-5 rounded-2xl border border-white/10">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    FAQ Knowledge Base
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage common inquiries on clinical formulation, genomics, ingredients, and delivery.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingFaq(null);
                    setIsFaqModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Question</span>
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  placeholder="Search questions or answers..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-3">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="p-4 bg-slate-900/70 border border-white/10 rounded-2xl space-y-2 hover:border-emerald-500/30 transition-all"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {faq.category}
                        </span>
                        <h4 className="text-sm font-bold text-white pt-1">{faq.question}</h4>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingFaq(faq);
                            setIsFaqModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() =>
                            setDeleteConfirmation({
                              type: "faq",
                              id: faq.id,
                              title: faq.question,
                            })
                          }
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 6. PAGE CONTENT EDITORS ================= */}
          {activeTab === "pages" && (
            <PageContentEditor
              hero={content.hero}
              science={content.science}
              about={content.about}
              contact={content.contact}
              onSaveHero={updateHero}
              onSaveScience={updateScience}
              onSaveAbout={updateAbout}
              onSaveContact={updateContact}
              onUploadImage={uploadImage}
            />
          )}

          {/* ================= 7. MEDIA ASSETS MANAGER ================= */}
          {activeTab === "media" && (
            <MediaManager
              mediaList={content.media}
              onAddMedia={addMediaAsset}
              onDeleteMedia={(id) =>
                setDeleteConfirmation({
                  type: "media",
                  id,
                  title: "Selected Media Asset",
                })
              }
              onUploadFile={uploadImage}
            />
          )}
        </main>
      </div>

      {/* Product Editor Modal */}
      <ProductEditorModal
        product={editingProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={async (prod) => {
          if (editingProduct) {
            await updateProduct(prod);
            triggerNotification("Product updated successfully.");
          } else {
            await addProduct(prod);
            triggerNotification("New product created successfully.");
          }
        }}
        onUploadImage={uploadImage}
      />

      {/* Article Editor Modal */}
      <ArticleEditorModal
        article={editingArticle}
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        onSave={async (art) => {
          if (editingArticle) {
            await updateArticle(art);
            triggerNotification("Research article updated.");
          } else {
            await addArticle(art);
            triggerNotification("New research article created.");
          }
        }}
      />

      {/* Post Editor Modal */}
      <PostEditorModal
        post={editingPost}
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSave={async (pst) => {
          if (editingPost) {
            await updatePost(pst);
            triggerNotification("Science insight post updated.");
          } else {
            await addPost(pst);
            triggerNotification("New science insight post published.");
          }
        }}
        onUploadImage={uploadImage}
      />

      {/* FAQ Editor Modal */}
      <FaqEditorModal
        faq={editingFaq}
        isOpen={isFaqModalOpen}
        onClose={() => setIsFaqModalOpen(false)}
        onSave={async (fq) => {
          if (editingFaq) {
            await updateFaq(fq);
            triggerNotification("FAQ item updated.");
          } else {
            await addFaq(fq);
            triggerNotification("New FAQ item added.");
          }
        }}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="text-lg font-bold text-white">Confirm Deletion</h4>
            </div>
            <p className="text-xs text-slate-300">
              Are you sure you want to permanently delete{" "}
              <strong className="text-white">"{deleteConfirmation.title}"</strong>? This will immediately remove it from all relevant public pages on the website.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-amber-400">
              <RotateCcw className="w-6 h-6" />
              <h4 className="text-lg font-bold text-white">Reset to Initial Defaults?</h4>
            </div>
            <p className="text-xs text-slate-300">
              This will restore all products, research articles, blog posts, page texts, and default images back to their initial factory definitions. Any added or modified items will be cleared.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetFactory}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-md"
              >
                Reset Site Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
