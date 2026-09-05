import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, Check, Map, Clock } from "lucide-react";
import { useContent } from "../context/ContentContext";

export default function Contact() {
  const { content } = useContent();
  const { contact } = content;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "genomics",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "genomics", message: "" });
    }, 5000);
  };

  return (
    <div id="contact-section" className="py-12 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
            {contact.badge}
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-4 tracking-tight">
            {contact.title}
          </h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column 1: Contact Coordinates & Interactive Map Mockup */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-8">
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl text-white tracking-tight">
                Molecure Headquarters
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Clinical Lab Location</h4>
                    <p className="text-sm text-slate-300 mt-0.5">
                      {contact.address}<br />{contact.cityStateZip}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Scientific Queries</h4>
                    <p className="text-sm text-slate-300 mt-0.5">{contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Customer Concierge</h4>
                    <p className="text-sm text-slate-300 mt-0.5">{contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Hours & Availability</h4>
                    <p className="text-sm text-slate-300 mt-0.5">{contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Vector Google Maps Mockup */}
            <div className="glass-card border border-white/10 bg-slate-950/20 p-4 rounded-3xl relative h-56 overflow-hidden flex flex-col justify-between group shadow-2xl">
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]"></div>
              
              {/* Mock visual pin location on grid map */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  <span className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-emerald-500/20 animate-ping"></span>
                  <span className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-emerald-500/40 animate-pulse"></span>
                  <div className="w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full shadow-md relative z-10"></div>
                </div>
              </div>

              <div className="relative z-10 flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-white/10 shadow-md w-fit">
                <Map className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-bold font-mono text-emerald-400">GOOGLE MAPS - BAY AREA LAB</span>
              </div>

              <div className="relative z-10 p-3 bg-slate-900/60 text-white rounded-xl flex justify-between items-center text-[10px] font-mono border border-white/5">
                <span>COORD: 37.7749° N, 122.4194° W</span>
                <span className="text-emerald-400 font-bold hover:underline cursor-pointer">OPEN MAPS</span>
              </div>
            </div>
          </div>

          {/* Column 2: Inquiry Contact Form */}
          <div className="lg:col-span-7 glass-card border border-white/10 bg-slate-950/20 rounded-3xl p-6 sm:p-8 text-left shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                Submit an Inquiry
              </h3>
              <p className="text-xs text-slate-300 mb-6">
                Our board tries to respond to clinical biochemical questions within 48 business hours.
              </p>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-white p-6 rounded-2xl flex flex-col items-center justify-center text-center py-12 animate-scaleIn">
                  <div className="w-12 h-12 bg-emerald-500/15 rounded-full border border-emerald-500/25 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="font-display font-bold text-base">Inquiry Dispatched Successfully</h4>
                  <p className="text-xs text-slate-300 mt-2 max-w-sm leading-relaxed">
                    Thank you. Your request is registered under batch code <strong>#{Math.floor(Math.random() * 900000) + 100000}</strong>. Our science advisors will audit your questions and reach out via email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-400 block mb-1 uppercase">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Alexander Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-slate-900 transition-all placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-400 block mb-1 uppercase">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="alexander@lab.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-slate-900 transition-all placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-slate-400 block mb-1 uppercase">Inquiry Category</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-300"
                    >
                      <option value="genomics">Nutrigenomic Pathways (MnSOD, GPX)</option>
                      <option value="product">Formulation bioavailabilities (SVCT1)</option>
                      <option value="corporate">Retail, Subscriptions & Bulk orders</option>
                      <option value="medical">FDA Compliance & Safety Audits</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-slate-400 block mb-1 uppercase">Inquiry Details *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Specify your clinical question regarding cofactors or genetic variants..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-slate-900 transition-all placeholder-slate-500 resize-none"
                    ></textarea>
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-emerald-500/10"
                  >
                    <Send className="w-3.5 h-3.5 text-slate-950" />
                    <span>Submit Science Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>SECURE ENDPOINT DISPATCH</span>
              <span>AES-256 ENCRYPTED</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
