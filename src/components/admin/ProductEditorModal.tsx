import React, { useState } from "react";
import { X, Plus, Trash2, Upload, Image as ImageIcon, Sparkles, Check } from "lucide-react";
import { Product } from "../../types";

interface ProductEditorModalProps {
  product: Product | null; // null for adding new
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => Promise<void>;
  onUploadImage: (file: File, title?: string) => Promise<string | null>;
}

export default function ProductEditorModal({
  product,
  isOpen,
  onClose,
  onSave,
  onUploadImage,
}: ProductEditorModalProps) {
  if (!isOpen) return null;

  const isEditing = !!product;

  const [formData, setFormData] = useState<Product>(() => {
    if (product) return { ...product };
    return {
      id: `product-${Date.now()}`,
      name: "",
      tagline: "",
      price: 49,
      rating: 4.8,
      reviewsCount: 12,
      category: "cellular",
      image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400",
      bgGradient: "from-emerald-500/20 to-teal-500/10",
      benefits: [
        "Clinically verified cellular absorption",
        "Supports endogenous mitochondrial enzymes"
      ],
      ingredients: [
        { name: "Bioactive Compound", dose: "250 mg", form: "Nanoliposomal carrier", function: "Cellular antioxidant reinforcement" }
      ],
      scientificExplanation: "",
      suggestedUse: "Take 1 serving daily with a glass of water.",
      warnings: "Consult your healthcare provider before use if pregnant or taking medications.",
      features: ["Nanoliposomal Carrier", "Bioactive Chelate", "Spectrometry Verified"],
      subscriptionDiscount: 15,
      faqs: [
        { q: "How should I take this supplement?", a: "Take one serving daily with a meal." }
      ]
    };
  });

  const [newBenefit, setNewBenefit] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // File upload handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await onUploadImage(file, formData.name || file.name);
      if (url) {
        setFormData((prev) => ({ ...prev, image: url }));
      }
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddBenefit = () => {
    if (!newBenefit.trim()) return;
    setFormData((prev) => ({ ...prev, benefits: [...prev.benefits, newBenefit.trim()] }));
    setNewBenefit("");
  };

  const handleRemoveBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setFormData((prev) => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
    setNewFeature("");
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleAddIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { name: "New Ingredient", dose: "100 mg", form: "Liposomal extract", function: "Active synergy" },
      ],
    }));
  };

  const handleUpdateIngredient = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) =>
        i === index ? { ...ing, [field]: value } : ing
      ),
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { q: "Question here?", a: "Scientific explanation here." }],
    }));
  };

  const handleUpdateFaq = (index: number, field: "q" | "a", value: string) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
    }));
  };

  const handleRemoveFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
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
      <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-slate-950/40">
          <div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {isEditing ? "EDIT COMPOUND" : "ADD NEW COMPOUND"}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              {isEditing ? formData.name || "Edit Product" : "New Therapeutic Product"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Liposomal Glutathione & Ergothioneine"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as any })
                }
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="cellular">Cellular Defense</option>
                <option value="mitochondrial">Mitochondrial Energy</option>
                <option value="personalized">Personalized Genomic</option>
                <option value="defense">Antioxidant Shield</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tagline / Subheading
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. Targeted intracellular redox balance & lipid encapsulation"
            />
          </div>

          {/* Pricing, Rating, Discount */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Rating (0-5)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Reviews Count
              </label>
              <input
                type="number"
                value={formData.reviewsCount}
                onChange={(e) => setFormData({ ...formData, reviewsCount: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Sub Discount (%)
              </label>
              <input
                type="number"
                value={formData.subscriptionDiscount}
                onChange={(e) =>
                  setFormData({ ...formData, subscriptionDiscount: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Product Image & Upload */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
            <label className="block text-xs font-semibold text-slate-300">
              Product Image
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-slate-950 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name}
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
                  placeholder="Paste image URL (https://... or /src/assets/...)"
                  className="w-full px-3.5 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white"
                />
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? "Uploading..." : "Upload New Image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Supports JPG, PNG, WebP, SVG
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scientific Explanation & Suggested Use */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Scientific Explanation / Mechanism of Action
              </label>
              <textarea
                rows={3}
                value={formData.scientificExplanation}
                onChange={(e) =>
                  setFormData({ ...formData, scientificExplanation: e.target.value })
                }
                className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                placeholder="Molecular mechanisms, receptors, gene cofactors, and biochemical pathways..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Suggested Use
                </label>
                <input
                  type="text"
                  value={formData.suggestedUse}
                  onChange={(e) => setFormData({ ...formData, suggestedUse: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Warnings / Alerts
                </label>
                <input
                  type="text"
                  value={formData.warnings}
                  onChange={(e) => setFormData({ ...formData, warnings: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Key Features Chips */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Highlight Tags / Catalog Badges
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-white/10 border border-white/10 rounded-lg text-xs text-emerald-300"
                >
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add tag (e.g. Catalog: CDPR-0005)"
                className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium"
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Benefits List */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Key Benefits
            </label>
            <div className="space-y-2 mb-2">
              {formData.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-200"
                >
                  <span className="flex-1">{benefit}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(idx)}
                    className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Add bullet benefit..."
                className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-xs font-semibold"
              >
                Add Benefit
              </button>
            </div>
          </div>

          {/* Ingredients Breakdown */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Active Formulation Ingredients ({formData.ingredients.length})
              </label>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Ingredient</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-950/60 border border-white/10 rounded-xl space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      Ingredient #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      className="text-rose-400 hover:text-rose-300 text-xs flex items-center space-x-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={ing.name}
                      onChange={(e) => handleUpdateIngredient(idx, "name", e.target.value)}
                      placeholder="Name"
                      className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white"
                    />
                    <input
                      type="text"
                      value={ing.dose}
                      onChange={(e) => handleUpdateIngredient(idx, "dose", e.target.value)}
                      placeholder="Dose (e.g. 250 mg)"
                      className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white"
                    />
                    <input
                      type="text"
                      value={ing.form}
                      onChange={(e) => handleUpdateIngredient(idx, "form", e.target.value)}
                      placeholder="Form (e.g. Liposomal matrix)"
                      className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white"
                    />
                  </div>
                  <input
                    type="text"
                    value={ing.function}
                    onChange={(e) => handleUpdateIngredient(idx, "function", e.target.value)}
                    placeholder="Function / biological target"
                    className="w-full px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product FAQs */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Product-Specific FAQs ({formData.faqs.length})
              </label>
              <button
                type="button"
                onClick={handleAddFaq}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product FAQ</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.faqs.map((faq, idx) => (
                <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-400">FAQ #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(idx)}
                      className="text-rose-400 hover:text-rose-300 text-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={faq.q}
                    onChange={(e) => handleUpdateFaq(idx, "q", e.target.value)}
                    placeholder="Question"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs text-white"
                  />
                  <textarea
                    rows={2}
                    value={faq.a}
                    onChange={(e) => handleUpdateFaq(idx, "a", e.target.value)}
                    placeholder="Answer"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-slate-950/60 flex justify-end items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-colors"
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
              <span>Saving Changes...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>{isEditing ? "Update Product" : "Publish Product"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
