import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { FAQItem } from "../../types";

interface FaqEditorModalProps {
  faq: FAQItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (faq: FAQItem) => Promise<void>;
}

export default function FaqEditorModal({
  faq,
  isOpen,
  onClose,
  onSave,
}: FaqEditorModalProps) {
  if (!isOpen) return null;

  const isEditing = !!faq;

  const [formData, setFormData] = useState<FAQItem>(() => {
    if (faq) return { ...faq };
    return {
      id: `faq-${Date.now()}`,
      question: "",
      answer: "",
      category: "science",
    };
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) return;

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
      <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-slate-950/40">
          <div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {isEditing ? "EDIT FAQ" : "NEW FAQ ITEM"}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              {isEditing ? "Modify Question" : "Add Frequently Asked Question"}
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
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Question *
            </label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
              placeholder="e.g. What causes GSH depletion in human cells?"
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
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
              <option value="science">Biochemical & Clinical Science</option>
              <option value="supplements">Supplements & Ingredients</option>
              <option value="general">General & Philosophy</option>
              <option value="shipping">Orders & Shipping</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Comprehensive Answer *
            </label>
            <textarea
              rows={6}
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              required
              placeholder="Provide a thorough, scientifically accurate, and customer-friendly explanation..."
              className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
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
                <span>{isEditing ? "Update FAQ" : "Save FAQ"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
