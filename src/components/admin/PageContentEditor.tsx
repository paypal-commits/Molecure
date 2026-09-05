import React, { useState } from "react";
import { Save, Plus, Trash2, Check, Upload, User, Image as ImageIcon } from "lucide-react";
import { HeroContent, ScienceContent, AboutContent, ContactContent } from "../../types";

interface PageContentEditorProps {
  hero: HeroContent;
  science: ScienceContent;
  about: AboutContent;
  contact: ContactContent;
  onSaveHero: (hero: HeroContent) => Promise<void>;
  onSaveScience: (science: ScienceContent) => Promise<void>;
  onSaveAbout: (about: AboutContent) => Promise<void>;
  onSaveContact: (contact: ContactContent) => Promise<void>;
  onUploadImage: (file: File, title?: string) => Promise<string | null>;
}

export default function PageContentEditor({
  hero,
  science,
  about,
  contact,
  onSaveHero,
  onSaveScience,
  onSaveAbout,
  onSaveContact,
  onUploadImage,
}: PageContentEditorProps) {
  const [activeTab, setActiveTab] = useState<"hero" | "science" | "about" | "contact">("hero");

  // Hero state
  const [heroForm, setHeroForm] = useState<HeroContent>({ ...hero });
  // Science state
  const [scienceForm, setScienceForm] = useState<ScienceContent>({ ...science });
  // About state
  const [aboutForm, setAboutForm] = useState<AboutContent>({ ...about });
  // Contact state
  const [contactForm, setContactForm] = useState<ContactContent>({ ...contact });

  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  const showSuccess = (section: string) => {
    setSavedSuccess(section);
    setTimeout(() => setSavedSuccess(null), 3000);
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSection("hero");
    try {
      await onSaveHero(heroForm);
      showSuccess("hero");
    } finally {
      setSavingSection(null);
    }
  };

  const handleSaveScience = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSection("science");
    try {
      await onSaveScience(scienceForm);
      showSuccess("science");
    } finally {
      setSavingSection(null);
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSection("about");
    try {
      await onSaveAbout(aboutForm);
      showSuccess("about");
    } finally {
      setSavingSection(null);
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSection("contact");
    try {
      await onSaveContact(contactForm);
      showSuccess("contact");
    } finally {
      setSavingSection(null);
    }
  };

  // Team member manipulation
  const handleAddTeamMember = () => {
    setAboutForm((prev) => ({
      ...prev,
      team: [
        ...prev.team,
        {
          id: `member-${Date.now()}`,
          name: "Dr. New Advisor",
          role: "Genomic Researcher",
          bio: "Specializing in cell biology and micronutrient transporters.",
          image: "https://images.unsplash.com/photo-1594824813576-92931d8e1c66?auto=format&fit=crop&q=80&w=400",
        },
      ],
    }));
  };

  const handleUpdateTeamMember = (index: number, field: string, value: string) => {
    setAboutForm((prev) => ({
      ...prev,
      team: prev.team.map((m, i) => (i === index ? { ...m, [field]: value } : m)),
    }));
  };

  const handleRemoveTeamMember = (index: number) => {
    setAboutForm((prev) => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index),
    }));
  };

  const handleTeamAvatarUpload = async (index: number, file: File) => {
    const url = await onUploadImage(file, `team_${index}`);
    if (url) {
      handleUpdateTeamMember(index, "image", url);
    }
  };

  // Stat item update
  const handleUpdateStat = (index: number, field: string, value: string) => {
    setHeroForm((prev) => ({
      ...prev,
      stats: prev.stats.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex border-b border-white/10 space-x-2">
        <button
          onClick={() => setActiveTab("hero")}
          className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === "hero"
              ? "text-emerald-400 border-emerald-400 bg-emerald-500/5"
              : "text-slate-400 border-transparent hover:text-white"
          }`}
        >
          Home Hero & Video
        </button>
        <button
          onClick={() => setActiveTab("science")}
          className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === "science"
              ? "text-emerald-400 border-emerald-400 bg-emerald-500/5"
              : "text-slate-400 border-transparent hover:text-white"
          }`}
        >
          The Science Section
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === "about"
              ? "text-emerald-400 border-emerald-400 bg-emerald-500/5"
              : "text-slate-400 border-transparent hover:text-white"
          }`}
        >
          About & Team Members
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === "contact"
              ? "text-emerald-400 border-emerald-400 bg-emerald-500/5"
              : "text-slate-400 border-transparent hover:text-white"
          }`}
        >
          Contact Coordinates
        </button>
      </div>

      {/* Success notification */}
      {savedSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-300 text-xs flex items-center space-x-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>
            {savedSuccess.toUpperCase()} section content updated successfully! Live website refreshed.
          </span>
        </div>
      )}

      {/* ================= HERO FORM ================= */}
      {activeTab === "hero" && (
        <form onSubmit={handleSaveHero} className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-5">
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <div>
              <h4 className="text-base font-bold text-white">Homepage Hero & Genetic Equation</h4>
              <p className="text-xs text-slate-400">Edit top headline, background video, CTAs and numbers.</p>
            </div>
            <button
              type="submit"
              disabled={savingSection === "hero"}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{savingSection === "hero" ? "Saving..." : "Save Hero"}</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Notification Badge Text</label>
            <input
              type="text"
              value={heroForm.badgeText}
              onChange={(e) => setHeroForm({ ...heroForm, badgeText: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Headline (Line 1)</label>
              <input
                type="text"
                value={heroForm.headline}
                onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Gradient Highlight (Line 2)</label>
              <input
                type="text"
                value={heroForm.headlineGradient}
                onChange={(e) => setHeroForm({ ...heroForm, headlineGradient: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subheadline Description</label>
            <textarea
              rows={3}
              value={heroForm.subheadline}
              onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Background Video Stream URL (MP4 / WebM)</label>
            <input
              type="url"
              value={heroForm.videoUrl}
              onChange={(e) => setHeroForm({ ...heroForm, videoUrl: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary CTA Button</label>
              <input
                type="text"
                value={heroForm.shopButtonText}
                onChange={(e) => setHeroForm({ ...heroForm, shopButtonText: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Secondary CTA Button</label>
              <input
                type="text"
                value={heroForm.scienceButtonText}
                onChange={(e) => setHeroForm({ ...heroForm, scienceButtonText: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          {/* Genetic equation texts */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Genetic Equation Section (Home Fold)</h5>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Section Title</label>
              <input
                type="text"
                value={heroForm.geneticEquationTitle}
                onChange={(e) => setHeroForm({ ...heroForm, geneticEquationTitle: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Paragraph 1 (The Problem)</label>
              <textarea
                rows={2}
                value={heroForm.geneticEquationText1}
                onChange={(e) => setHeroForm({ ...heroForm, geneticEquationText1: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Paragraph 2 (Molecure Solution)</label>
              <textarea
                rows={2}
                value={heroForm.geneticEquationText2}
                onChange={(e) => setHeroForm({ ...heroForm, geneticEquationText2: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          {/* Metrics / Stats */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">Hero Metrics / Proof Numbers</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {heroForm.stats.map((stat, idx) => (
                <div key={idx} className="p-3 bg-slate-950/60 border border-white/10 rounded-xl space-y-2">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleUpdateStat(idx, "value", e.target.value)}
                    placeholder="Value (e.g. 99.8%)"
                    className="w-full px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-bold text-emerald-400"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleUpdateStat(idx, "label", e.target.value)}
                    placeholder="Label"
                    className="w-full px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white"
                  />
                  <input
                    type="text"
                    value={stat.desc}
                    onChange={(e) => handleUpdateStat(idx, "desc", e.target.value)}
                    placeholder="Description"
                    className="w-full px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-slate-400"
                  />
                </div>
              ))}
            </div>
          </div>
        </form>
      )}

      {/* ================= SCIENCE FORM ================= */}
      {activeTab === "science" && (
        <form onSubmit={handleSaveScience} className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-5">
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <div>
              <h4 className="text-base font-bold text-white">The Science Page Content</h4>
              <p className="text-xs text-slate-400">Headings, simulation titles, and clinical descriptions.</p>
            </div>
            <button
              type="submit"
              disabled={savingSection === "science"}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{savingSection === "science" ? "Saving..." : "Save Science"}</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Eyebrow Badge</label>
            <input
              type="text"
              value={scienceForm.badge}
              onChange={(e) => setScienceForm({ ...scienceForm, badge: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Page Title</label>
            <input
              type="text"
              value={scienceForm.title}
              onChange={(e) => setScienceForm({ ...scienceForm, title: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Clinical Overview</label>
            <textarea
              rows={3}
              value={scienceForm.subtitle}
              onChange={(e) => setScienceForm({ ...scienceForm, subtitle: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Highlight Notice</label>
            <input
              type="text"
              value={scienceForm.heroNotice}
              onChange={(e) => setScienceForm({ ...scienceForm, heroNotice: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Interactive Simulator Title</label>
              <input
                type="text"
                value={scienceForm.simulationTitle}
                onChange={(e) => setScienceForm({ ...scienceForm, simulationTitle: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Simulator Description</label>
              <input
                type="text"
                value={scienceForm.simulationDescription}
                onChange={(e) =>
                  setScienceForm({ ...scienceForm, simulationDescription: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </form>
      )}

      {/* ================= ABOUT & TEAM FORM ================= */}
      {activeTab === "about" && (
        <form onSubmit={handleSaveAbout} className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <div>
              <h4 className="text-base font-bold text-white">About & Scientific Advisory Board</h4>
              <p className="text-xs text-slate-400">Edit company story, mission, vision, and team member profiles.</p>
            </div>
            <button
              type="submit"
              disabled={savingSection === "about"}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{savingSection === "about" ? "Saving..." : "Save About Page"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Badge</label>
              <input
                type="text"
                value={aboutForm.badge}
                onChange={(e) => setAboutForm({ ...aboutForm, badge: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Section Title</label>
              <input
                type="text"
                value={aboutForm.title}
                onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Story</label>
            <textarea
              rows={3}
              value={aboutForm.story}
              onChange={(e) => setAboutForm({ ...aboutForm, story: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nutrigenomics Concept (Simple Terms)</label>
            <textarea
              rows={4}
              value={aboutForm.nutrigenomicsExplanation}
              onChange={(e) =>
                setAboutForm({ ...aboutForm, nutrigenomicsExplanation: e.target.value })
              }
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mission</label>
              <textarea
                rows={2}
                value={aboutForm.mission}
                onChange={(e) => setAboutForm({ ...aboutForm, mission: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Vision</label>
              <textarea
                rows={2}
                value={aboutForm.vision}
                onChange={(e) => setAboutForm({ ...aboutForm, vision: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          {/* Team Members */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-bold text-white">Scientific Advisors & Leadership ({aboutForm.team.length})</h5>
              <button
                type="button"
                onClick={handleAddTeamMember}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Team Member</span>
              </button>
            </div>

            <div className="space-y-4">
              {aboutForm.team.map((member, idx) => (
                <div key={member.id || idx} className="p-4 bg-slate-950/60 border border-white/10 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-400">Team Member #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTeamMember(idx)}
                      className="text-rose-400 hover:text-rose-300 text-xs flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    {/* Avatar preview and uploader */}
                    <div className="sm:col-span-3 flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/10 overflow-hidden flex items-center justify-center">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <User className="w-6 h-6 text-slate-600" />
                        )}
                      </div>
                      <label className="cursor-pointer text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1">
                        <Upload className="w-3 h-3" />
                        <span>Change Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleTeamAvatarUpload(idx, file);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="sm:col-span-9 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleUpdateTeamMember(idx, "name", e.target.value)}
                          placeholder="Name & Title (e.g. Dr. Evelyn Vance)"
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white font-semibold"
                        />
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => handleUpdateTeamMember(idx, "role", e.target.value)}
                          placeholder="Role (e.g. Chief Scientific Officer)"
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white"
                        />
                      </div>
                      <input
                        type="text"
                        value={member.image}
                        onChange={(e) => handleUpdateTeamMember(idx, "image", e.target.value)}
                        placeholder="Avatar Image URL"
                        className="w-full px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-[11px] text-slate-300 font-mono"
                      />
                      <textarea
                        rows={2}
                        value={member.bio}
                        onChange={(e) => handleUpdateTeamMember(idx, "bio", e.target.value)}
                        placeholder="Scientific background and research focus..."
                        className="w-full px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      )}

      {/* ================= CONTACT FORM ================= */}
      {activeTab === "contact" && (
        <form onSubmit={handleSaveContact} className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-5">
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <div>
              <h4 className="text-base font-bold text-white">Contact & Clinic Coordinates</h4>
              <p className="text-xs text-slate-400">Headquarters location, customer support email, and hours.</p>
            </div>
            <button
              type="submit"
              disabled={savingSection === "contact"}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{savingSection === "contact" ? "Saving..." : "Save Contact Page"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Badge</label>
              <input
                type="text"
                value={contactForm.badge}
                onChange={(e) => setContactForm({ ...contactForm, badge: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Section Title</label>
              <input
                type="text"
                value={contactForm.title}
                onChange={(e) => setContactForm({ ...contactForm, title: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle</label>
            <textarea
              rows={2}
              value={contactForm.subtitle}
              onChange={(e) => setContactForm({ ...contactForm, subtitle: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Street Address</label>
              <input
                type="text"
                value={contactForm.address}
                onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">City, State, Zip</label>
              <input
                type="text"
                value={contactForm.cityStateZip}
                onChange={(e) => setContactForm({ ...contactForm, cityStateZip: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Support Phone</label>
              <input
                type="text"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Inquiry Email</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Operating Hours</label>
              <input
                type="text"
                value={contactForm.hours}
                onChange={(e) => setContactForm({ ...contactForm, hours: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Clinical Advisory Notice</label>
              <input
                type="text"
                value={contactForm.labNotice}
                onChange={(e) => setContactForm({ ...contactForm, labNotice: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
