import React, { useState } from "react";
import { X, Upload, Check, Image as ImageIcon } from "lucide-react";
import { BlogPost } from "../../types";

interface PostEditorModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: BlogPost) => Promise<void>;
  onUploadImage: (file: File, title?: string) => Promise<string | null>;
}

export default function PostEditorModal({
  post,
  isOpen,
  onClose,
  onSave,
  onUploadImage,
}: PostEditorModalProps) {
  if (!isOpen) return null;

  const isEditing = !!post;

  const [formData, setFormData] = useState<BlogPost>(() => {
    if (post) return { ...post };
    return {
      id: `post-${Date.now()}`,
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Cellular Health",
      readTime: "5 min read",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      author: "Dr. Evelyn Vance, Chief Scientific Officer",
      image: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600",
    };
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleTitleChange = (newTitle: string) => {
    const slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({ ...prev, title: newTitle, slug: prev.slug ? prev.slug : slug }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await onUploadImage(file, formData.title || file.name);
      if (url) {
        setFormData((prev) => ({ ...prev, image: url }));
      }
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-slate-950/40">
          <div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {isEditing ? "EDIT SCIENCE INSIGHT" : "NEW SCIENCE ARTICLE"}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              {isEditing ? formData.title || "Edit Post" : "Create Science Insight Post"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Post Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                placeholder="e.g. Understanding Oxidative Stress & Free Radicals"
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="understanding-oxidative-stress"
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Cellular Health"
                className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="e.g. 5 min read"
                className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Publication Date
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Author & Credentials
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="e.g. Dr. Evelyn Vance, Chief Scientific Officer"
              className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
            />
          </div>

          {/* Featured Image */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
            <label className="block text-xs font-semibold text-slate-300">
              Featured Post Image
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-24 h-16 rounded-xl bg-slate-950 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-600" />
                )}
              </div>
              <div className="flex-1 w-full space-y-2">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Paste image URL (https://...)"
                  className="w-full px-3.5 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white"
                />
                <label className="cursor-pointer px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium inline-flex items-center space-x-1.5 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? "Uploading..." : "Upload Cover Image"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Short Summary / Excerpt
            </label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief introductory hook shown in cards..."
              className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Full Article Body (Markdown supported)
            </label>
            <textarea
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write the full scientific breakdown..."
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white font-mono leading-relaxed"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-slate-950/60 flex justify-end items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5"
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>{isEditing ? "Update Post" : "Publish Post"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
