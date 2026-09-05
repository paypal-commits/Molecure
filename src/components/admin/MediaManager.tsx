import React, { useState } from "react";
import { Upload, Trash2, Copy, Check, Plus, ExternalLink, Image as ImageIcon, Filter, Search } from "lucide-react";
import { MediaAsset } from "../../types";

interface MediaManagerProps {
  mediaList: MediaAsset[];
  onAddMedia: (asset: MediaAsset) => Promise<void>;
  onDeleteMedia: (assetId: string) => Promise<void>;
  onUploadFile: (file: File, title?: string, category?: MediaAsset["category"]) => Promise<string | null>;
}

export default function MediaManager({
  mediaList,
  onAddMedia,
  onDeleteMedia,
  onUploadFile,
}: MediaManagerProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddUrlModal, setShowAddUrlModal] = useState(false);
  const [newAssetUrl, setNewAssetUrl] = useState("");
  const [newAssetTitle, setNewAssetTitle] = useState("");
  const [newAssetCategory, setNewAssetCategory] = useState<MediaAsset["category"]>("product");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Media" },
    { id: "product", label: "Products" },
    { id: "article", label: "Articles" },
    { id: "team", label: "Team" },
    { id: "banner", label: "Banners" },
    { id: "general", label: "General" },
  ];

  const filteredMedia = mediaList.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        await onUploadFile(files[i], files[i].name.replace(/\.[^/.]+$/, ""), "general");
      }
    } catch (err) {
      console.error("Batch upload error", err);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleAddExternalUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetUrl.trim()) return;

    const asset: MediaAsset = {
      id: `media_${Date.now()}`,
      title: newAssetTitle.trim() || "External Image Asset",
      url: newAssetUrl.trim(),
      category: newAssetCategory,
      createdAt: new Date().toISOString().split("T")[0],
    };

    await onAddMedia(asset);
    setNewAssetUrl("");
    setNewAssetTitle("");
    setShowAddUrlModal(false);
  };

  const handleCopyUrl = (item: MediaAsset) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 p-5 rounded-2xl border border-white/10">
        <div>
          <h3 className="font-display font-bold text-xl text-white">
            Media & Asset Gallery
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Upload new brand photos, packaging mockups, team portraits, or manage URLs for all site pages.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="cursor-pointer px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 flex-1 sm:flex-initial">
            <Upload className="w-4 h-4" />
            <span>{isUploading ? "Uploading..." : "Upload Images"}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>

          <button
            onClick={() => setShowAddUrlModal(true)}
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add by URL</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search images..."
            className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-white/5 rounded-3xl">
          <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h4 className="text-sm font-semibold text-slate-300">No media assets found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Upload images or add external links to build your site media library.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((asset) => (
            <div
              key={asset.id}
              className="group bg-slate-900/70 rounded-2xl border border-white/10 overflow-hidden flex flex-col transition-all hover:border-emerald-500/30 hover:shadow-lg"
            >
              {/* Image Thumbnail with Overlay Preview */}
              <div
                onClick={() => setPreviewImage(asset.url)}
                className="relative aspect-square bg-slate-950 cursor-pointer overflow-hidden flex items-center justify-center"
              >
                <img
                  src={asset.url}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white bg-slate-900/80 px-2.5 py-1 rounded-full border border-white/20">
                    Preview
                  </span>
                </div>
              </div>

              {/* Asset Info & Actions */}
              <div className="p-3 flex flex-col justify-between flex-1">
                <div>
                  <h5 className="text-xs font-semibold text-white truncate" title={asset.title}>
                    {asset.title}
                  </h5>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500">
                    <span className="capitalize">{asset.category}</span>
                    <span>{asset.createdAt}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/5">
                  <button
                    onClick={() => handleCopyUrl(asset)}
                    className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-emerald-400 transition-colors"
                    title="Copy image URL"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onDeleteMedia(asset.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add by URL Modal */}
      {showAddUrlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h4 className="text-lg font-bold text-white">Add Image by URL</h4>
            <form onSubmit={handleAddExternalUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Image Title
                </label>
                <input
                  type="text"
                  value={newAssetTitle}
                  onChange={(e) => setNewAssetTitle(e.target.value)}
                  placeholder="e.g. Clinical Study Graph"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Image Direct URL *
                </label>
                <input
                  type="url"
                  value={newAssetUrl}
                  onChange={(e) => setNewAssetUrl(e.target.value)}
                  required
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={newAssetCategory}
                  onChange={(e) => setNewAssetCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                >
                  <option value="product">Product</option>
                  <option value="article">Article / Study</option>
                  <option value="team">Team Member</option>
                  <option value="banner">Banner / Background</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddUrlModal(false)}
                  className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs shadow-md"
                >
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox / Preview modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 flex flex-col items-center"
          >
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[75vh] w-auto object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 w-full flex justify-between items-center text-xs text-slate-400">
              <span className="truncate max-w-md">{previewImage}</span>
              <button
                onClick={() => setPreviewImage(null)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
