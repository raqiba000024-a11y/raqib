import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';
import { Mail, Phone, Copy, Check, Send, Calendar, ArrowUpRight, Github, Linkedin, Twitter, FileText } from 'lucide-react';

export const Contact: React.FC = () => {
  const { data, soundEnabled } = usePortfolio();
  const { profile, services, socials } = data;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: services[0]?.title || '',
    budget: '$25,000 – $50,000',
    timeline: 'Q3 2026',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Listen for 'select-service' custom event from Services component
  useEffect(() => {
    const handleServiceSelect = (e: CustomEvent<string>) => {
      setFormData((prev) => ({ ...prev, service: e.detail }));
    };
    window.addEventListener('select-service', handleServiceSelect as EventListener);
    return () => window.removeEventListener('select-service', handleServiceSelect as EventListener);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    playSound('success', soundEnabled);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    playSound('click', soundEnabled);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playSound('success', soundEnabled);
    }, 700);
  };

  const getSocialIcon = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('git')) return <Github size={16} />;
    if (lower.includes('linked')) return <Linkedin size={16} />;
    if (lower.includes('twit') || lower.includes('x')) return <Twitter size={16} />;
    return <FileText size={16} />;
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono-tabular block mb-3">
            Initiate Collaboration
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
            Let&apos;s build an indelible landmark.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Direct executive inquiry form for bespoke flagships, spatial engineering, or strategic advisory. Inquiries are answered directly within 24 business hours.
          </p>
        </div>

        {/* 2-Column Grid: Left Contact Info / Quick Actions, Right Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries, Fast Copy & Socials */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Email Copy Card */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="text-xs uppercase tracking-wider text-zinc-500 font-mono-tabular">
                Direct Electronic Mail
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-base sm:text-lg font-medium text-white truncate font-mono-tabular">
                  {profile.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Line & Studio Hours */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="text-xs uppercase tracking-wider text-zinc-500 font-mono-tabular">
                Studio Telephony & Hours
              </div>
              <div className="space-y-1">
                <div className="text-base font-medium text-white font-mono-tabular">
                  {profile.phone}
                </div>
                <div className="text-xs text-zinc-400">
                  Monday – Friday · 09:00 – 18:00 CET / PST
                </div>
              </div>
            </div>

            {/* Book 30-min Consultation */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                  <Calendar size={15} style={{ color: 'var(--accent-color)' }} />
                  <span>Executive Consultation</span>
                </div>
                <div className="text-xs text-zinc-400">
                  30-minute introductory architecture briefing
                </div>
              </div>
              <a
                href={`mailto:${profile.email}?subject=Executive%20Briefing%20Inquiry`}
                onClick={() => playSound('open', soundEnabled)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-black transition-all hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                <span>Book Briefing</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Social Network Links */}
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500 font-mono-tabular mb-4">
                Verified Social Channels
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {socials.map((soc, sIdx) => (
                  <a
                    key={sIdx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound('click', soundEnabled)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/25 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer font-mono-tabular"
                  >
                    {getSocialIcon(soc.platform)}
                    <span>{soc.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Project Brief Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl glass-panel border border-white/10">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div
                    className="w-14 h-14 rounded-full mx-auto flex items-center justify-center text-black shadow-lg"
                    style={{ backgroundColor: 'var(--accent-color)' }}
                  >
                    <Check size={26} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Transmission Received
                  </h3>
                  <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Your project brief has been logged. Alexander will review your specifications and follow up within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        service: services[0]?.title || '',
                        budget: '$25,000 – $50,000',
                        timeline: 'Q3 2026',
                        message: ''
                      });
                    }}
                    className="mt-4 px-4 py-2 rounded-lg border border-white/15 text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider text-zinc-400 font-mono-tabular mb-2">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Marcella Sterling"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/15 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-400/80 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-zinc-400 font-mono-tabular mb-2">
                        Corporate Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. m.sterling@conglomerate.com"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/15 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-400/80 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Service */}
                    <div>
                      <label htmlFor="contact-service" className="block text-xs uppercase tracking-wider text-zinc-400 font-mono-tabular mb-2">
                        Service of Interest
                      </label>
                      <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#0d0d12] border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400/80 transition-colors"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget Bracket */}
                    <div>
                      <label htmlFor="contact-budget" className="block text-xs uppercase tracking-wider text-zinc-400 font-mono-tabular mb-2">
                        Anticipated Capital Scope
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#0d0d12] border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400/80 transition-colors"
                      >
                        <option value="$15,000 – $25,000">$15,000 – $25,000 (Advisory Sprint)</option>
                        <option value="$25,000 – $50,000">$25,000 – $50,000 (Core Flagship)</option>
                        <option value="$50,000 – $100,000">$50,000 – $100,000 (Spatial / Enterprise)</option>
                        <option value="$100,000+">$100,000+ (Full Multi-Modal Architecture)</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Brief */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider text-zinc-400 font-mono-tabular mb-2">
                      Brief Narrative & Ambition *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your strategic objectives, desired launch window, and brand vision..."
                      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/15 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-400/80 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-lg text-sm font-semibold text-black transition-all hover:opacity-90 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                    style={{ backgroundColor: 'var(--accent-color)' }}
                  >
                    {isSubmitting ? (
                      <span>Transmitting Brief...</span>
                    ) : (
                      <>
                        <span>Transmit Project Brief</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
