import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { ResearchArticle } from "../../types";

interface ArticleEditorModalProps {
  article: ResearchArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: ResearchArticle) => Promise<void>;
}

export default function ArticleEditorModal({
  article,
  isOpen,
  onClose,
  onSave,
}: ArticleEditorModalProps) {
  if (!isOpen) return null;

  const isEditing = !!article;

  const [formData, setFormData] = useState<ResearchArticle>(() => {
    if (article) return { ...article };
    return {
      id: `article-${Date.now()}`,
      title: "",
      summary: "",
      findings: "",
      geneInvolved: "",
      biomarkers: ["Mitochondrial ROS", "Serum Carotenoids"],
      dietaryFactor: "",
      clinicalReference: "",
      citation: "",
    };
  });

  const [biomarkersInput, setBiomarkersInput] = useState(() =>
    formData.biomarkers ? formData.biomarkers.join(", ") : ""
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSaving(true);
    try {
      const parsedBiomarkers = biomarkersInput
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean);

      await onSave({
        ...formData,
        biomarkers: parsedBiomarkers,
      });
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
              {isEditing ? "EDIT RESEARCH ARTICLE" : "ADD CLINICAL STUDY"}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              {isEditing ? formData.title || "Edit Article" : "New NutriGenDB Article"}
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
              Paper Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g. Nutrigenetics and Modulation of Oxidative Stress: MnSOD Val16Ala"
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Genes Involved
              </label>
              <input
                type="text"
                value={formData.geneInvolved}
                onChange={(e) => setFormData({ ...formData, geneInvolved: e.target.value })}
                placeholder="e.g. MnSOD (SOD2), GPX1, SLC23A1"
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Dietary Factor / Target Cofactors
              </label>
              <input
                type="text"
                value={formData.dietaryFactor}
                onChange={(e) => setFormData({ ...formData, dietaryFactor: e.target.value })}
                placeholder="e.g. Carotenoids, Curcumin, Liposomal GSH"
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Biomarkers Measured (comma separated)
            </label>
            <input
              type="text"
              value={biomarkersInput}
              onChange={(e) => setBiomarkersInput(e.target.value)}
              placeholder="e.g. 8-OHdG, F2-Isoprostanes, Serum beta-carotene"
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Executive Summary
            </label>
            <textarea
              rows={3}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="High-level overview of the hypothesis and investigation..."
              className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Detailed Clinical Findings & Biochemical Mechanisms
            </label>
            <textarea
              rows={5}
              value={formData.findings}
              onChange={(e) => setFormData({ ...formData, findings: e.target.value })}
              placeholder="Specific percentages, statistical significance, molecular docking, and transport observations..."
              className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white font-mono text-[11px] leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Clinical Reference / Journal
              </label>
              <input
                type="text"
                value={formData.clinicalReference}
                onChange={(e) =>
                  setFormData({ ...formData, clinicalReference: e.target.value })
                }
                placeholder="e.g. Karger Archives of Nutrition, Vol. 60"
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Citation / DOI / PMC ID
              </label>
              <input
                type="text"
                value={formData.citation}
                onChange={(e) => setFormData({ ...formData, citation: e.target.value })}
                placeholder="e.g. Sokolov et al., 2023; PMC9811786"
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
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
                <span>{isEditing ? "Update Article" : "Publish Article"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
