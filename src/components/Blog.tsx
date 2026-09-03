import React, { useState } from "react";
import { Clock, BookOpen, User, ChevronRight, ArrowLeft, ArrowUpRight, Share2 } from "lucide-react";
import { BlogPost } from "../types";

interface BlogProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "Cellular Health", "Nutrigenomics", "Formulation Science"];

  const filteredPosts = selectedCategory === "all"
    ? posts
    : posts.filter((p) => p.category === selectedCategory);

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title,
        text: `Check out this science article from Molecure: ${title}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <div id="blog-section" className="py-12 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button for Full Article View */}
        {activePost ? (
          <div className="text-left max-w-3xl mx-auto animate-fadeIn">
            <button
              onClick={() => setActivePost(null)}
              className="flex items-center space-x-2 text-xs font-semibold text-slate-300 hover:text-white mb-8 p-2 bg-white/5 rounded-xl border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Library</span>
            </button>

            {/* Article Content Layout */}
            <article className="space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase">
                  {activePost.category}
                </span>
                <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                  {activePost.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-b border-white/5 pb-4">
                  <span className="flex items-center space-x-1.5 font-semibold text-white">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>{activePost.author}</span>
                  </span>
                  <span className="w-1.5 h-1.5 bg-white/10 rounded-full"></span>
                  <span className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{activePost.readTime}</span>
                  </span>
                  <span className="w-1.5 h-1.5 bg-white/10 rounded-full"></span>
                  <span>Published {activePost.date}</span>
                </div>
              </div>

              {/* Cover Image */}
              <div className="w-full h-64 sm:h-96 rounded-3xl overflow-hidden shadow-xs border border-white/10">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Rich Body Text rendering paragraphs with beautiful typography */}
              <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6 pt-4">
                {activePost.content.split("\n\n").map((para, i) => {
                  if (para.startsWith("###")) {
                    return (
                      <h3 key={i} className="font-display font-bold text-xl text-white pt-4">
                        {para.replace("###", "").trim()}
                      </h3>
                    );
                  }
                  return (
                    <p key={i} className="text-justify font-normal">
                      {para}
                    </p>
                  );
                })}
              </div>

              {/* Footer Share Action */}
              <div className="pt-8 border-t border-white/5 flex justify-between items-center text-xs text-slate-400">
                <span>Molecure Scientific Editorial Board © 2026</span>
                <button
                  onClick={() => handleShare(activePost.title)}
                  className="flex items-center space-x-1.5 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Article</span>
                </button>
              </div>
            </article>
          </div>
        ) : (
          // List View
          <div>
            {/* Section Header */}
            <div className="text-left mb-12">
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
                EDUCATIONAL BLOG
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mt-4 tracking-tight">
                The Nutrigenomic Chronicles
              </h1>
              <p className="text-slate-300 mt-2 text-sm sm:text-base">
                Discover actionable guides on dietary modulation, cellular signaling, and free-radical defense mechanisms.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                      : "bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {cat === "all" ? "All Topics" : cat}
                </button>
              ))}
            </div>

            {/* Blog Post Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="glass-card rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Visual Card Header */}
                    <div className="h-48 overflow-hidden relative border-b border-white/5">
                      <img
                        src={post.image}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                      <span className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-mono font-bold text-emerald-400 border border-white/10 uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="p-6">
                      <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-500 mb-2">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime}</span>
                        </span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>

                      <h3
                        onClick={() => setActivePost(post)}
                        className="font-display font-bold text-base text-white hover:text-emerald-400 cursor-pointer transition-colors line-clamp-2 leading-tight"
                      >
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 pt-0 border-t border-white/5 mt-4 flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-slate-300 flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[120px]">{post.author.split(",")[0]}</span>
                    </span>
                    
                    <button
                      onClick={() => setActivePost(post)}
                      className="flex items-center space-x-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group"
                    >
                      <span>Read Article</span>
                      <ChevronRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
